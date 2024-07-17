import { NextResponse } from "next/server";
import { connectDatabase, selectTable } from "@/db/createtable";
const GetAllNames = async (request, response) => {
  const connect = await connectDatabase();
  const select_sql =
    " SELECT student_id, surname, firstname, middlename, picture_directory FROM students_details";

  const result = await selectTable(connect, select_sql);

  let AllNames = [];
  let AllSIDs = [];
  let AllPixUrl = [];
  let AllStudentsDetails = {};
  result.forEach((Std) => {
    AllNames = [
      ...AllNames,
      Std.surname + " " + Std.firstname + " " + Std.middlename,
    ];
    AllSIDs = [...AllSIDs, Std.student_id];
    AllPixUrl = [...AllPixUrl, Std.picture_directory];
  });

  AllStudentsDetails = {
    AllStudentsNames: AllNames,
    AllSttudentsID: AllSIDs,
    AllPictureUrl: AllPixUrl,
  };

  const theData = JSON.stringify(AllStudentsDetails);
  connect.end();
  return theData;
};
export default GetAllNames;
