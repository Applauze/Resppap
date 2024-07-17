import { NextResponse } from "next/server";
import {
  connectDatabase,
  selectTable,
  insertTable,
  updateTable,
} from "@/db/createtable";
export async function POST(request, response) {
  const body = await request.json();
  const {
    student_id,
    Session,
    Term,
    Claz,
    AllAttributes,
    CTComment,
    PComment,
    PresentTimes,
    SchoolOpens,
    Resumption,
    ResumptionCheck,
  } = body.dataFromCaller;
  let update_sql = "";
  let update_params = [];
  let result = 1;
  const connect = await connectDatabase();

  AllAttributes.forEach(async (element) => {
    update_params = [
      element[`${Term}_term_value`],
      student_id,
      element[`${Term}_term_attribute`],
    ];

    update_sql = `Update ${Session}_psycomotor_ratings SET ${Term}_term_value = ? WHERE student_id = ? AND ${Term}_term_attribute = ?`;

    let update_result = await updateTable(connect, update_sql, update_params);
    result = update_result === 1 ? 1 : 0;
  });

  update_params = [CTComment, PComment, PresentTimes, student_id];
  update_sql = `Update ${Session}_all_comments_and_attendance SET ${Term}_term_ctc = ?, ${Term}_term_pc = ?, ${Term}_term_attendance = ? WHERE student_id = ?`;
  let upd_result = await updateTable(connect, update_sql, update_params);
  result = upd_result === 1 ? 1 : 0;

  if (ResumptionCheck) {
    update_params = [SchoolOpens, Resumption, Session, Term];
    update_sql = `Update term_properties SET SchoolOpens = ?, Resumption = ? WHERE Session = ? AND  Term = ?`;
    let upd_result = await updateTable(connect, update_sql, update_params);
  } else {
    let sql = `INSERT into term_properties (Session, Term, SchoolOpens, Resumption) VALUES ?`;
    const params = [[Session, Term, SchoolOpens, Resumption]];
    result = await insertTable(connect, sql, params);
  }

  return result > 0
    ? NextResponse.json({ message: "Saved Successfully", success: true })
    : NextResponse.json({ message: "Failed woefully", success: true });
}
