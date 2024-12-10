import { NextResponse } from "next/server";
import { connectDatabase, updateTable } from "@/db/createtable";
export async function POST(request, response) {
  const body = await request.json();
  const connect = await connectDatabase();
  const {
    Title,
    Gateway,
    Surname,
    Firstname,
    Middlename,
    Category,
    TeachersID,
    Phone,
    Email,
  } = body.dataFromCaller;
  let params = [];
  let update_sql = "";
  if (Gateway != "") {
    var CryptoJS = require("crypto-js");
    let eGateway = CryptoJS.AES.encrypt(Gateway, "Applause143").toString();

    params = [
      Surname,
      Firstname,
      Middlename,
      eGateway,
      Title,
      Category,
      Phone,
      Email,
      TeachersID,
    ];

    update_sql = `Update teachers_details SET surname = ?, firstname = ?, middlename = ?, gateway = ?,  title = ?,  category = ?, phone = ?, email = ? WHERE teacher_id = ?`;
  } else {
    update_sql = `Update teachers_details SET surname = ?, firstname = ?, middlename = ?, title = ?,  category = ?, phone = ?, email = ? WHERE teacher_id = ?`;
    params = [
      Surname,
      Firstname,
      Middlename,
      Title,
      Category,
      Phone,
      Email,
      TeachersID,
    ];
  }

  const update_result = await updateTable(connect, update_sql, params);
  console.log(update_result);
  let result = update_result === 1 ? 1 : 0;

  return result === 1
    ? NextResponse.json({ message: "Saved Successfully", success: true })
    : NextResponse.json({ message: "Failed woefully", success: true });
}
