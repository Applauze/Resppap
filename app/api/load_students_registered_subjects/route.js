import { NextResponse } from "next/server";
import { connectDatabase, selectTable } from "@/db/createtable";

export async function POST(request, response) {
  const body = await request.json();

  const connect = await connectDatabase();
  const { SID, Session, Claz } = body.dataFromCaller;

  const select_sql = `SELECT subject_name, status FROM ${Session}_subjects_registered WHERE student_id = '${SID}' AND class = '${Claz}'`;

  const result = await selectTable(connect, select_sql);

  let AlRegistered = { AlreadyRegistered: result };

  const theData = JSON.stringify(AlRegistered);
  connect.end();
  return result.length > 0
    ? NextResponse.json({ message: theData, success: true })
    : NextResponse.json({ message: "Error", success: true });
}
