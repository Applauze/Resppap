import StudentRegistration from "@/components/StudentRegistration";
import GetAllNames from "../api/getallnames";
import CheckLoggedStatus from "../api/checkloggedstatus";
import Login_Page from "@/components/Login_Page";

const StudentsRegistration = async () => {
  const getStudentsNames = async () => {
    const All_StudentsNames = await GetAllNames();
    return All_StudentsNames;
  };
  const Stat = await CheckLoggedStatus();
  let StudentsNames = "{}";
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
