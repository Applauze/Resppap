import { NextResponse } from "next/server";
import { connectDatabase, selectTable } from "@/db/createtable";

export async function POST(request, response) {
  const body = await request.json();

  const connect = await connectDatabase();
  const { Session, Term, Claz, TeacherID, Category } = body.dataFromCaller;
  let select_sql = "";
  if (Category === "Admin") {
    select_sql = `SELECT A.teacher_id, B.title, B.surname, B.firstname, B.middlename, B.phone from ${Session}_class_allocation A, teachers_details B  WHERE A.Term = '${Term}' AND A.Class = '${Claz}' AND A.teacher_id = B.teacher_id`;
  } else {
    select_sql = `SELECT A.teacher_id, B.title, B.surname, B.firstname, B.middlename, B.phone from ${Session}_class_allocation A, teachers_details B  WHERE A.Term = '${Term}' AND A.Class = '${Claz}' AND A.teacher_id = '${TeacherID}' AND A.teacher_id = B.teacher_id`;
  }

  let result = await selectTable(connect, select_sql);
  let theData = "";

  if ((result && result.length > 0) || Category === "Admin") {
    let TITLE = "";
    let SURNAME = "";
    let FIRSTNAME = "";
    let MIDDLENAME = "";
    let PHONENUMBER = "";

    if (result && result.length > 0) {
      TITLE = result[0].title;
      SURNAME = result[0].surname;
      FIRSTNAME = result[0].firstname;
      MIDDLENAME = result[0].middlename;
      PHONENUMBER = result[0].phone;
    }

    select_sql = `SELECT DISTINCT A.student_id , A.surname, A.firstname, A.middlename, A.dob, A.sex, A.picture_directory FROM students_details A, ${Session}_subjects_registered B  WHERE A.student_id = B.student_id AND B.class = '${Claz}' ORDER BY A.surname`;

    result = await selectTable(connect, select_sql);

    let TheStudents = { AllStudents: result };
    let std = TheStudents;

    select_sql = `SELECT comment, term from samplecomments`;
    result = await selectTable(connect, select_sql);
    TheStudents = {
      ...TheStudents,
      AllComments: result,
      Surname: SURNAME,
      Firstname: FIRSTNAME,
      Middlename: MIDDLENAME,
      Phone: PHONENUMBER,
      Title: TITLE,
    };

    theData = JSON.stringify(TheStudents);
  } else {
    theData = "Not Authorized";
  }
  connect.end();
  return result.length > 0 || theData === "Not Authorized"
    ? NextResponse.json({ message: theData, success: true })
    : NextResponse.json({ message: "Error", success: true });
}
