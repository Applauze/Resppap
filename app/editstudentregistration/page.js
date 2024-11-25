import EditStudentRegistration from "@/components/EditStudentRegistration";
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
  let StudentsProperties = "{}";

  if (Stat) {
    StudentsProperties = await getStudentsNames();
  }

  return Stat ? (
    <EditStudentRegistration StudentsProperties={StudentsProperties} />
  ) : (
    <Login_Page Redirection={true} />
  );
};

export default StudentsRegistration;
