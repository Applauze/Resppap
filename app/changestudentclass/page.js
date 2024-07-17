import GetAllNames from "../api/getallnames";
import Change_Class from "@/components/Change_Class";
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

const ChangeClass = async () => {
  const Stat = await CheckLoggedStatus();
  let Stds = "{}";
  if (Stat) {
    Stds = await getStudents();
  }
  return Stat ? (
    <Change_Class Stds={Stds} />
  ) : (
    <Login_Page Redirection={true} />
  );
};

export default ChangeClass;
