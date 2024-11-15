import GetAllNames from "../api/getallnames";
import Promote_Students from "@/components/Promote_Students";
import CheckLoggedStatus from "../api/checkloggedstatus";
import Login_Page from "@/components/Login_Page";

const getStudents = async () => {
  const All_Students = await GetAllNames();
  return All_Students;
};
// const getSubjects = async () => {
//   const All_Subjects = await GetAllSubjects();
//   return All_Subjects;
// };

const Promotion = async () => {
  const Stat = await CheckLoggedStatus();

  return Stat ? <Promote_Students /> : <Login_Page Redirection={true} />;
};

export default Promotion;
