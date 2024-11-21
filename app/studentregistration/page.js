import StudentRegistration from "@/components/StudentRegistration";
import GetAllNames from "../api/getallnames";
import CheckLoggedStatus from "../api/checkloggedstatus";
import Login_Page from "@/components/Login_Page";
import { cookies } from "next/headers";

const StudentsRegistration = async () => {
  const getStudentsNames = async () => {
    const All_StudentsNames = await GetAllNames();
    return All_StudentsNames;
  };
  const Stat = await CheckLoggedStatus();
  let StudentsNames = "{}";
  const Cookies = await cookies();
  if (Stat) {
    StudentsNames = await getStudentsNames();
  }

  return Stat ? (
    <StudentRegistration StudentsNames={StudentsNames} />
  ) : (
    <Login_Page Redirection={true} />
  );
};

export default StudentsRegistration;
