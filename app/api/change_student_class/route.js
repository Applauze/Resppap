import { NextResponse } from "next/server";
import { connectDatabase, selectTable, updateTable } from "@/db/createtable";
export async function POST(request, response) {
  const body = await request.json();
  const { SID, Session, newClass } = body.dataFromCaller;
  let result = "";
  const connect = await connectDatabase();

  let update_params = [newClass, SID];
  let update_sql = `Update ${Session}_subjects_registered SET class = ? WHERE student_id = ?`;
  let update_result = await updateTable(connect, update_sql, update_params);
  result += update_result > 0 ? "success" : "failure";

  update_sql = `Update ${Session}_all_comments_and_attendance SET class = ? WHERE student_id = ?`;
  update_result = await updateTable(connect, update_sql, update_params);
  result += update_result > 0 ? "success" : "failure";

  update_sql = `Update ${Session}_psycomotor_ratings SET class = ? WHERE student_id = ?`;
  update_result = await updateTable(connect, update_sql, update_params);
  result += update_result > 0 ? "success" : "failure";

  update_params = [newClass, Session, SID];
  update_sql = `Update students_class_track SET class = ? WHERE session = ? AND student_id = ?`;
  update_result = await updateTable(connect, update_sql, update_params);
  result += update_result > 0 ? "success" : "failure";

  return NextResponse.json({ message: result, success: true });
}
