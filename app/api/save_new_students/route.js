import { NextResponse } from "next/server";
import { connectDatabase, createTable, insertTable } from "@/db/createtable";
import fs from "fs";
const sharp = require("sharp");

export async function POST(request, response) {
  const data = await request.formData();
  const StudentD = data.get("StudentData");

  const StudentData = JSON.parse(StudentD);
  const connect = await connectDatabase();
  const {
    Surname,
    Firstname,
    Middlename,
    Dob,
    SessionAdmitted,
    TermAdmitted,
    ClassAdmitted,
    Sex,
  } = StudentData;

  let SID = Date.now() + Math.floor(Math.random() * 100 + 0);
  SID = SID.toString();
  SID = SID.substring(2);
  let Student_Id = "STD_" + SID;
  let PixDirectory = "";

  const file = data.get("pictureSelected") ? data.get("pictureSelected") : null;
  const fileName = Student_Id;
  if (file) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const folderPath = "./public/uploads";

    try {
      await fs.promises.access(folderPath, fs.constants.F_OK);
      console.log(`Folder ${folderPath} already exists`);
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.promises.mkdir(folderPath);
        console.log(`Folder ${folderPath} created successfully`);
      } else {
        console.error("Error checking folder:", error);
      }
    }
    try {
      const targetWidth = 100;
      const targetHeight = 120;
      const image = await sharp(buffer);
      await image
        .resize(targetWidth, targetHeight)
        .jpeg({ quality: 80 })
        .toFile(`${folderPath}/${fileName}.jpg`);
      PixDirectory = `/uploads/${fileName}.jpg`;
    } catch (error) {
      console.log(error);
    }
  }

  const create_sql =
    "ssn INT PRIMARY KEY AUTO_INCREMENT,student_id VARCHAR(30), surname VARCHAR(30), firstname VARCHAR(30), middlename VARCHAR(30), dob VARCHAR(50), sex VARCHAR(10), session_admitted VARCHAR(20), term_admitted VARCHAR(10), class_admitted VARCHAR(10), picture_directory VARCHAR(1000), UNIQUE (student_id)";
  const sql = `INSERT into students_details (student_id, surname, firstname, middlename, dob, sex, session_admitted, term_admitted, class_admitted, picture_directory) VALUES ?`;

  const params = [
    [
      Student_Id,
      Surname,
      Firstname,
      Middlename,
      Dob,
      Sex,
      SessionAdmitted,
      TermAdmitted,
      ClassAdmitted,
      PixDirectory,
    ],
  ];
  await createTable(connect, "students_details", create_sql);
  const result = await insertTable(connect, sql, params);

  return result === 1
    ? NextResponse.json({ message: "Saved Successfully", success: true })
    : NextResponse.json({ message: "Failed woefully", success: true });
}
