import { NextResponse } from "next/server";
import { connectDatabase, createTable, insertTable } from "@/db/createtable";
export async function POST(request, response) {
  const body = await request.json();
  const connect = await connectDatabase();
  const {
    TeachersID,
    Title,
    Gateway,
    Surname,
    Firstname,
    Middlename,
    Category,
  } = body.dataFromCaller;
  var CryptoJS = require("crypto-js");
  let eGateway = CryptoJS.AES.encrypt(Gateway, "Applause143").toString();
  //   let SID = Date.now() + Math.floor(Math.random() * 100 + 0);
  //   SID = SID.toString();
  //   SID = SID.substring(2);
  //   let Student_Id = "STD_" + SID;
  const create_sql =
    "ssn INT PRIMARY KEY AUTO_INCREMENT,teacher_id VARCHAR(30), title VARCHAR(30),  gateway VARCHAR(30), surname VARCHAR(30), firstname VARCHAR(30), middlename VARCHAR(30),  category VARCHAR(20),  UNIQUE (teacher_id)";

  const sql = `INSERT into teachers_details (teacher_id, title, gateway,  surname, firstname, middlename, Category) VALUES ?`;

  const params = [
    [TeachersID, Title, eGateway, Surname, Firstname, Middlename, Category],
  ];
  await createTable(connect, "teachers_details", create_sql);
  const result = await insertTable(connect, sql, params);

  return result === 1
    ? NextResponse.json({ message: "Saved Successfully", success: true })
    : NextResponse.json({ message: "Failed woefully", success: true });
}
