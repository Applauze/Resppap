import { NextResponse } from "next/server";
import { connectDatabase, selectTable } from "@/db/createtable";

export async function POST(request, response) {
  const body = await request.json();
  const connect = await connectDatabase();

  const { Session, Term, Claz, EPIN, SID } = body.dataFromCaller;
  let responder = false;
  let StdDetails = {};

  let select_sql = `SELECT  session, term, class, gate,  status FROM ${Session}_resultchecker WHERE student_id = '${SID}'`;

  let result = await selectTable(connect, select_sql);
  var CryptoJS = require("crypto-js");
  let PIN = process.env.mypin;
  let bytes = CryptoJS.AES.decrypt(result[0].gate, PIN);
  let Allowance = bytes.toString(CryptoJS.enc.Utf8);
  Allowance = Allowance.replace(/\s+/g, "");

  bytes = CryptoJS.AES.decrypt(EPIN, PIN);
  let APIN = bytes.toString(CryptoJS.enc.Utf8);
  APIN = APIN.replace(/\s+/g, "");

  if (result.length > 0) {
    if (
      result[0].session === Session &&
      result[0].term === Term &&
      Allowance === APIN &&
      result[0].class === Claz
    ) {
      responder = true;

      select_sql = `SELECT student_id , surname, firstname, middlename, dob, sex, picture_directory FROM students_details WHERE student_id = '${SID}'`;
      console.log(select_sql);
      result = await selectTable(connect, select_sql);

      let Fullname = `${result[0].surname} ${result[0].firstname} ${result[0].middlename}`;
      StdDetails = {
        Fullname: Fullname,
        dob: result[0].dob,
        sex: result[0].sex,
        pixurl: result[0].picture_directory,
      };
    }
  }

  const theDat = { responder: responder, StudentDetails: StdDetails };
  const theData = JSON.stringify(theDat);

  connect.end();
  return responder
    ? NextResponse.json({ message: theData, success: true })
    : NextResponse.json({ message: "Error", success: true });
}
