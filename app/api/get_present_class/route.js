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
  const { SID, Session } = body.dataFromCaller;

  let create_sql =
    "ssn INT PRIMARY KEY AUTO_INCREMENT, student_id VARCHAR(30),  session VARCHAR(20), class VARCHAR(20),  UNIQUE (student_id, session, class)";
  await createTable(connect, "students_class_track", create_sql);
  let select_sql = `SELECT class FROM students_class_track WHERE student_id = '${SID}' AND session =  '${Session}'`;
  let result = await selectTable(connect, select_sql);
  console.log(result);
  let Cl = "";
  if (result.length > 0) {
    Cl = result[0].class;
  } else {
    Cl = "Not registered for the selected Session";
  }
  connect.end();
  return NextResponse.json({ message: Cl, success: true });
}
