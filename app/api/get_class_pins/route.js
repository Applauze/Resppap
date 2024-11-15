import { NextResponse } from "next/server";
import {
  connectDatabase,
  createTable,
  insertTable,
  updateTable,
  selectTable,
} from "@/db/createtable";

export async function POST(request, response) {
  const body = await request.json();

  const connect = await connectDatabase();
  const { Session, Term, Claz } = body.dataFromCaller;

  let select_sql = `SELECT A.surname, A.firstname, A.middlename, B.student_id, B.Session, B.Term, B.Class, B.gate FROM students_details A, ${Session}_resultchecker B WHERE A.student_id = B.student_id AND B.Class = '${Claz}' AND B.session =  '${Session}' AND B.term =  '${Term}' ORDER BY A.surname`;

  let result = await selectTable(connect, select_sql);

  let Cl = result.length > 0 ? result : "Error";

  connect.end();
  return NextResponse.json({ message: Cl, success: true });
}
