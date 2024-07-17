import { NextResponse } from "next/server";
import { connectDatabase, selectTable } from "@/db/createtable";
const GetAllNames = async (request, response) => {
  const connect = await connectDatabase();
  const select_sql =
    " SELECT teacher_id, surname, firstname, middlename FROM teachers_details";

  const result = await selectTable(connect, select_sql);

  let AllNames = [];
  let AllTIDs = [];
  let AllTeachersDetails = {};
  result.forEach((Teacher) => {
    AllNames = [
      ...AllNames,
      Teacher.surname + " " + Teacher.firstname + " " + Teacher.middlename,
    ];
    AllTIDs = [...AllTIDs, Teacher.teacher_id];
  });

  AllTeachersDetails = { AllTeachersNames: AllNames, AllTeachersID: AllTIDs };

  const theData = JSON.stringify(AllTeachersDetails);
  connect.end();
  return theData;
};
export default GetAllNames;
