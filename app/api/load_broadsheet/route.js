import { NextResponse } from "next/server";
import { connectDatabase, selectTable } from "@/db/createtable";

export async function POST(request, response) {
  const body = await request.json();

  const connect = await connectDatabase();
  const { Session, Term, Claz } = body.dataFromCaller;
  let select_sql = "";
  let AllSubjects = [];
  let theData = null;
  select_sql = `SELECT DISTINCT subject_name FROM ${Session}_subjects_registered WHERE Class = '${Claz}'`;

  let result = await selectTable(connect, select_sql);

  if (result && result.length > 0) {
    AllSubjects = result;

    let AllStudents = [];
    select_sql = `SELECT DISTINCT A.student_id , A.surname, A.firstname, A.middlename, A.sex FROM students_details A, ${Session}_subjects_registered B  WHERE A.student_id = B.student_id AND B.class = '${Claz}' ORDER BY A.surname`;

    result = await selectTable(connect, select_sql);

    AllStudents = result;

    let AllBroadSheetInfo = [];
    let Info = [];

    Info[0] = "Student_ID";
    Info[1] = "Names of Students";
    let n = 2;
    AllSubjects.forEach((element) => {
      Info[n] = element.subject_name;
      n++;
    });
    Info[n] = "TOTAL";
    Info[n + 1] = "NO OFFERED";
    Info[n + 2] = "NO PASSED";
    Info[n + 3] = "NO FAILED";
    Info[n + 4] = "REMARKS";

    AllBroadSheetInfo.push(Info);
    n = 0;
    for (n = 0; n < AllStudents.length; n++) {
      let Info = [];
      let No_Offered = 0;
      let No_Passed = 0;
      let No_Failed = 0;
      let Total_Sum = 0;
      Info[0] = AllStudents[n].student_id;
      Info[1] = `${AllStudents[n].surname} ${AllStudents[n].firstname} ${AllStudents[n].middlename}`;
      let p = 2;
      for (var k = 0; k < AllSubjects.length; k++) {
        if (Term === "Third") {
          select_sql = `SELECT overall_average_score FROM ${Session}_subjects_registered WHERE student_id = '${AllStudents[n].student_id}' AND subject_name = '${AllSubjects[k].subject_name}' `;
        } else {
          select_sql = `SELECT ${Term}_term_total_score FROM ${Session}_subjects_registered WHERE student_id = '${AllStudents[n].student_id}' AND subject_name = '${AllSubjects[k].subject_name}' `;
        }

        result = await selectTable(connect, select_sql);

        if (result.length < 1) {
          Info[p] = "-";
        } else {
          let Res = result[0];

          if (Term === "Third") {
            if (
              Res["overall_average_score"] == null ||
              Res["overall_average_score"] == undefined
            ) {
              Info[p] = "-";
            } else {
              let Mark = parseFloat(Res["overall_average_score"]);

              No_Offered++;
              Total_Sum += Mark;
              if (Mark >= 50) {
                No_Passed++;
              } else {
                No_Failed++;
              }
              Info[p] = Res["overall_average_score"];
            }
          } else {
            if (
              Res[`${Term}_term_total_score`] &&
              Res[`${Term}_term_total_score`] != 0
            ) {
              let Mark = parseFloat(Res[`${Term}_term_total_score`]);
              No_Offered++;
              Total_Sum += Mark;
              if (Mark >= 40) {
                No_Passed++;
              } else {
                No_Failed++;
              }
              Info[p] = Res[`${Term}_term_total_score`];
            } else {
              Info[p] = "-";
            }
          }
        }

        p++;
      }
      Info[p] = Total_Sum;
      Info[p + 1] = No_Offered;
      Info[p + 2] = No_Passed;
      Info[p + 3] = No_Failed;
      Info[p + 4] = "";

      AllBroadSheetInfo.push(Info);
    }

    theData = JSON.stringify(AllBroadSheetInfo);
  } else {
    theData = "No result";
  }
  connect.end();

  return theData === "No result"
    ? NextResponse.json({ message: "Error", success: true })
    : NextResponse.json({ message: theData, success: true });
}
