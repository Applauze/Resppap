// import { NextResponse } from "next/server";
import { connectDatabase, selectTable } from "@/db/createtable";
const GetAllSubjects = async () => {
  const connect = await connectDatabase();
  const select_sql =
    " SELECT subject_name, subject_type FROM registered_subjects ORDER BY subject_name ASC";

  const result = await selectTable(connect, select_sql);

  const theData = JSON.stringify(result);
  connect.end();
  return theData;
};
export default GetAllSubjects;
