import { NextResponse } from "next/server";
import { connectDatabase, selectTable } from "@/db/createtable";
const GetAllNames = async (request, response) => {
  const connect = await connectDatabase();
  const select_sql =
    " SELECT teacher_id, surname, firstname, middlename, title, category FROM teachers_details";

  const result = await selectTable(connect, select_sql);

  let AllNames = [];
  let AllTIDs = [];
  let AllSurname = [];
  let AllFirstname = [];
  let AllMiddlename = [];
  let AllTitle = [];
  let AllCategory = [];
  let AllTeachersDetails = {};
  result.forEach((Teacher) => {
    AllNames = [
      ...AllNames,
      Teacher.surname + " " + Teacher.firstname + " " + Teacher.middlename,
    ];
    AllTIDs = [...AllTIDs, Teacher.teacher_id];
    AllSurname = [...AllSurname, Teacher.surname];
    AllFirstname = [...AllFirstname, Teacher.firstname];
    AllMiddlename = [...AllMiddlename, Teacher.middlename];
    AllTitle = [...AllTitle, Teacher.title];
    AllCategory = [...AllCategory, Teacher.category];
  });

  AllTeachersDetails = {
    AllTeachersNames: AllNames,
    AllTeachersID: AllTIDs,
    AllSurname: AllSurname,
    AllFirstname: AllFirstname,
    AllMiddlename: AllMiddlename,
    AllTitle: AllTitle,
    AllCategory: AllCategory,
  };

  const theData = JSON.stringify(AllTeachersDetails);
  connect.end();
  return theData;
};
export default GetAllNames;
