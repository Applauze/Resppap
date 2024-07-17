import { NextResponse } from "next/server";
import { connectDatabase, selectTable } from "@/db/createtable";

export async function POST(request, response) {
  const body = await request.json();

  const connect = await connectDatabase();
  const { Session, Term, Claz, PickedSubject, TeacherID, Category } =
    body.dataFromCaller;
  let select_sql = "";
  let GenClaz = Claz.substring(0, 3);
  select_sql = `SELECT teacher_id from ${Session}_subject_allocation  WHERE Term = '${Term}' AND Class = '${GenClaz}' AND teacher_id = '${TeacherID}' AND subject = '${PickedSubject}'`;
  let result = await selectTable(connect, select_sql);
  let theData = "";
  if ((result && result.length > 0) || Category === "Admin") {
    if (Term === "Third") {
      select_sql = `SELECT A.surname, A.firstname, A.middlename, A.student_id, B.${Term}_term_ca_score1, B.${Term}_term_ca_score2, B.${Term}_term_exam_score, B.${Term}_term_total_score, B.${Term}_term_highest_score, B.${Term}_term_lowest_score, B.${Term}_term_average_score, B.${Term}_term_position, B.${Term}_term_grade, B.${Term}_term_remark, first_term_total_score, second_term_total_score, divisor  FROM students_details A, ${Session}_subjects_registered B  WHERE B.class = '${Claz}' AND B.subject_name = '${PickedSubject}' AND A.student_id = B.student_id AND status = 'Active' ORDER BY A.surname`;
    } else {
      select_sql = `SELECT A.surname, A.firstname, A.middlename, A.student_id, B.${Term}_term_ca_score1, B.${Term}_term_ca_score2, B.${Term}_term_exam_score, B.${Term}_term_total_score, B.${Term}_term_highest_score, B.${Term}_term_lowest_score, B.${Term}_term_average_score, B.${Term}_term_position, B.${Term}_term_grade, B.${Term}_term_remark, divisor  FROM students_details A, ${Session}_subjects_registered B  WHERE B.class = '${Claz}' AND B.subject_name = '${PickedSubject}' AND A.student_id = B.student_id AND status = 'Active' ORDER BY A.surname`;
    }
    result = await selectTable(connect, select_sql);

    let TheStudents = { AllStudents: result };

    theData = JSON.stringify(TheStudents);
  } else {
    theData = "Not Authorized";
  }
  connect.end();

  return result.length > 0 || theData === "Not Authorized"
    ? NextResponse.json({ message: theData, success: true })
    : NextResponse.json({ message: "Error", success: true });
}
