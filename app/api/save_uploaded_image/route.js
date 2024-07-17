import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

const sharp = require("sharp");

export async function POST(request, response) {
  const data = await request.formData();
  const file = data.get("pictureSelected");

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const fileName = file.name;
  // const imageData = await file.arrayBuffer();

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const folderPath = "./app/uploads";
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

  const targetWidth = 400;
  const targetHeight = 500;
  const image = await sharp(buffer);
  await image
    .resize(targetWidth, targetHeight)
    .jpeg({ quality: 80 })
    .toFile(`${folderPath}/${fileName}.jpg`);

  // fs.writeFile(`./uploads/${fileName}.jpg`, buffer, (err) => {
  //   if (err) {
  //     0;
  //     console.error(err);
  //   } else {
  //     console.log("Image Saved Successfully");
  //   }
  // });

  return NextResponse.json({ message: "Uploaded Successfully", success: true });
}
