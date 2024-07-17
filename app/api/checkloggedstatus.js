// import { NextResponse } from "next/server";
import { connectDatabase, selectTable } from "@/db/createtable";
import { cookies } from "next/headers";
const CheckLoggedStatus = async () => {
  const Cookies = new cookies();
  const stat = Cookies.get("accessStatus");
  if (stat) {
    return true;
  } else {
    return false;
  }
};
export default CheckLoggedStatus;
