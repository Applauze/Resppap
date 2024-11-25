import { NextResponse } from "next/server";
import { connectDatabase, selectTable } from "@/db/createtable";
const GetAllNames = async (request, response) => {
  const connect = await connectDatabase();
  const select_sql =
    " SELECT student_id, surname, firstname, middlename, dob, sex, session_admitted, term_admitted, class_admitted, picture_directory FROM students_details";

  const result = await selectTable(connect, select_sql);

  let AllNames = [];
  let AllSIDs = [];
  let AllSurname = [];
  let AllFirstname = [];
  let AllMiddlename = [];
  let AllDob = [];
  let AllSex = [];
  let AllAdmSession = [];
  let AllAdmTerm = [];
  let AllAdmClass = [];
  let AllPixUrl = [];
  let AllStudentsDetails = {};
  result.forEach((Std) => {
    AllNames = [
      ...AllNames,
      Std.surname + " " + Std.firstname + " " + Std.middlename,
    ];
    AllSIDs = [...AllSIDs, Std.student_id];
    AllSurname = [...AllSurname, Std.surname];
    AllFirstname = [...AllFirstname, Std.firstname];
    AllMiddlename = [...AllMiddlename, Std.middlename];
    AllDob = [...AllDob, Std.dob];
    AllSex = [...AllSex, Std.sex];
    AllAdmSession = [...AllAdmSession, Std.session_admitted];
    AllAdmTerm = [...AllAdmTerm, Std.term_admitted];
    AllAdmClass = [...AllAdmClass, Std.class_admitted];
    AllPixUrl = [...AllPixUrl, Std.picture_directory];
  });

  AllStudentsDetails = {
    AllStudentsNames: AllNames,
    AllStudentsID: AllSIDs,
    AllPictureUrl: AllPixUrl,
    AllStudentsSurname: AllSurname,
    AllStudentsFirstname: AllFirstname,
    AllStudentsMiddlename: AllMiddlename,
    AllStudentsDob: AllDob,
    AllStudentsSex: AllSex,
    AllStudentsAdmSession: AllAdmSession,
    AllStudentsAdmTerm: AllAdmTerm,
    AllStudentsAdmClass: AllAdmClass,
  };

  const theData = JSON.stringify(AllStudentsDetails);
  connect.end();
  return theData;
};
export default GetAllNames;
