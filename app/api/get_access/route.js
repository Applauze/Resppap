import { NextResponse } from "next/server";
import { connectDatabase, selectTable } from "@/db/createtable";
import { cookies } from "next/headers";
export async function POST(request, response) {
  const body = await request.json();
  const connect = await connectDatabase();
  const { TeacherID, Gateway } = body.dataFromCaller;

  var GTW = Gateway;
  var CryptoJS = require("crypto-js");
  const Cookies = new cookies();
  let LogStatus = false;
  let select_sql = "";

  let AD = {};
  let AccessDetails = "";
  let AD2 = {};
  let AccessDetails2 = "";

  select_sql = `SELECT gateway, title, surname, firstname, middlename, category FROM teachers_details WHERE teacher_id = '${TeacherID}'`;

  const result = await selectTable(connect, select_sql);
  if (result.length > 0) {
    let gateway = result[0].gateway;
    let Category = result[0].category;
    let middlename =
      result[0].middlename || result[0].middlename != ""
        ? result[0].middlename[0]
        : "";
    let username = `${result[0].title} ${result[0].surname} ${result[0].firstname[0]}.${middlename}`;
    let PIN = process.env.mypin;
    let RPIN = process.env.Rmypin;
    var bytes = CryptoJS.AES.decrypt(gateway, PIN);
    var Allowance = bytes.toString(CryptoJS.enc.Utf8);
    bytes = CryptoJS.AES.decrypt(Allowance, RPIN);
    Allowance = bytes.toString(CryptoJS.enc.Utf8);
    bytes = CryptoJS.AES.decrypt(GTW, RPIN);
    GTW = bytes.toString(CryptoJS.enc.Utf8);
    if (Allowance === GTW) {
      await Cookies.set("username", username, {
        httpOnly: false, // Prevent client-side JavaScript access
        sameSite: "lax", // Mitigate cross-site request forgery (CSRF)
        secure: false, // Secure cookie for HTTPS in production
        maxAge: 60 * 60 * 1, // Expires in 24 hours (adjust as needed)
      });
      await Cookies.set("accessStatus", true, {
        httpOnly: false, // Prevent client-side JavaScript access
        sameSite: "lax", // Mitigate cross-site request forgery (CSRF)
        secure: false, // Secure cookie for HTTPS in production
        maxAge: 60 * 60 * 1, // Expires in 24 hours (adjust as needed)
      });
      await Cookies.set("Category", Category, {
        httpOnly: false, // Prevent client-side JavaScript access
        sameSite: "lax", // Mitigate cross-site request forgery (CSRF)
        secure: false, // Secure cookie for HTTPS in production
        maxAge: 60 * 60 * 1, // Expires in 24 hours (adjust as needed)
      });

      //Check the properties and the comment there for future use
      // await Cookies.set("Category", Category, {
      //   httpOnly: true, // Prevent client-side JavaScript access
      //   sameSite: "strict", // Mitigate cross-site request forgery (CSRF)
      //   secure: true, // Secure cookie for HTTPS in production
      // OR secure: process.env.NODE_ENV === "production", // Secure cookie for HTTPS in production
      //   maxAge: 60 * 60 * 1, // Expires in 24 hours (adjust as needed)
      // });

      LogStatus = true;
    }

    AD = { Username: username, Category: Category, LogStatus: LogStatus };
    AccessDetails = JSON.stringify(AD);
    AD2 = { LogStatus: LogStatus };
    AccessDetails2 = JSON.stringify(AD2);
  } else {
    LogStatus = false;
    AD2 = { LogStatus: LogStatus };
    AccessDetails2 = JSON.stringify(AD2);
  }

  return LogStatus
    ? NextResponse.json({ message: AccessDetails, success: true })
    : NextResponse.json({
        message: AccessDetails2,
        success: true,
      });
}
