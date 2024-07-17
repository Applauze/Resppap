import { NextResponse } from "next/server";
import { connectDatabase, createTable, selectTable } from "@/db/createtable";

export async function POST(request, response) {
  const body = await request.json();
  let result = [];
  const connect = await connectDatabase();
  const { student_id, Session, Term, Claz } = body.dataFromCaller;
  let select_sql = "";
  if (Term === "Third") {
    select_sql = `SELECT subject_name, first_term_total_score, second_term_total_score, third_term_total_score, overall_average, overall_highest_score, overall_lowest_score, overall_position, overall_grade, overall_remark, general_average FROM  ${Session}_subjects_registered  WHERE class = '${Claz}'  AND student_id = ${student_id} AND status = 'Active'`;
  } else {
    select_sql = `SELECT subject_name, ${Term}_term_ca_score1, ${Term}_term_ca_score2, ${Term}_term_exam_score, ${Term}_term_total_score, ${Term}_term_highest_score, ${Term}_term_lowest_score, ${Term}_term_average_score, ${Term}_term_position, ${Term}_term_grade, ${Term}_term_remark  FROM ${Session}_subjects_registered  WHERE class = '${Claz}' AND student_id = '${student_id}' AND  status = 'Active'`;
  }

  result = await selectTable(connect, select_sql);
  let ThisStudentScores = result;

  select_sql = `SELECT ${Term}_term_attribute, ${Term}_term_value FROM ${Session}_psycomotor_ratings WHERE student_id = '${student_id}' `;

  result = await selectTable(connect, select_sql);
  let ThisStudentAttributes = result;

  select_sql = `SELECT ${Term}_term_ctc, ${Term}_term_pc, ${Term}_term_attendance FROM ${Session}_all_comments_and_attendance WHERE student_id = '${student_id}' `;
  result = await selectTable(connect, select_sql);
  let ThisStudentComments = result;

  let create_sql =
    "ssn INT PRIMARY KEY AUTO_INCREMENT, Session VARCHAR(10), Term VARCHAR(10), SchoolOpens VARCHAR(10), Resumption VARCHAR(10)";
  await createTable(connect, "Term_Properties", create_sql);

  select_sql = `SELECT SchoolOpens, Resumption  FROM term_properties WHERE Session= '${Session}' AND Term = '${Term}'`;

  let result9 = await selectTable(connect, select_sql);
  let ThisTermProperties = result9;

  let ThisStudentReport = {
    ThisStudentScores,
    ThisStudentAttributes,
    ThisStudentComments,
    ThisTermProperties,
  };

  const theData = JSON.stringify(ThisStudentReport);
  connect.end();
  return result.length > 0
    ? NextResponse.json({ message: theData, success: true })
    : NextResponse.json({ message: "Error", success: true });
}
