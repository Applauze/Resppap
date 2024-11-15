import { NextResponse } from "next/server";
import { connectDatabase, selectTable } from "@/db/createtable";

export async function POST(request, response) {
  const body = await request.json();

  const connect = await connectDatabase();
  const { Session, Term, Claz, TeacherID, Category } = body.dataFromCaller;
  let select_sql = "";
  select_sql = `SELECT teacher_id from ${Session}_class_allocation  WHERE Term = '${Term}' AND Class = '${Claz}' AND teacher_id = '${TeacherID}'`;
  console.log(select_sql);
  let result = await selectTable(connect, select_sql);
  let theData = "";

  if ((result && result.length > 0) || Category === "Admin") {
    select_sql = `SELECT DISTINCT A.student_id , A.surname, A.firstname, A.middlename, A.dob, A.sex, A.picture_directory FROM students_details A, ${Session}_subjects_registered B  WHERE A.student_id = B.student_id AND B.class = '${Claz}' ORDER BY A.surname`;

    result = await selectTable(connect, select_sql);

    let TheStudents = { AllStudents: result };
    let std = TheStudents;

    select_sql = `SELECT comment, term from samplecomments`;
    result = await selectTable(connect, select_sql);
    TheStudents = { ...TheStudents, AllComments: result };

    theData = JSON.stringify(TheStudents);
  } else {
    theData = "Not Authorized";
  }
  connect.end();
  return result.length > 0 || theData === "Not Authorized"
    ? NextResponse.json({ message: theData, success: true })
    : NextResponse.json({ message: "Error", success: true });
}
