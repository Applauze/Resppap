import { NextResponse } from "next/server";
import { connectDatabase, createTable, insertTable } from "@/db/createtable";
export async function POST(request, response) {
  const body = await request.json();
  const connect = await connectDatabase();
  const { TeacherID, Subject, Session, Term, Claz } = body.dataFromCaller;

  const create_sql =
    "ssn INT PRIMARY KEY AUTO_INCREMENT,teacher_id VARCHAR(30), term VARCHAR(30), class VARCHAR(30), subject VARCHAR(30)";
  const sql = `INSERT into ${Session}_subject_allocation (teacher_id, term, class, subject) VALUES ?`;

  const params = [[TeacherID, Term, Claz, Subject]];
  await createTable(connect, `${Session}_subject_allocation`, create_sql);
  const result = await insertTable(connect, sql, params);

  return result === 1
    ? NextResponse.json({ message: "Saved Successfully", success: true })
    : NextResponse.json({ message: "Failed woefully", success: true });
}
