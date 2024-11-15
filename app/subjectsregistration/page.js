import GetAllNames from "../api/getallnames";
import GetAllSubjects from "../api/getallsubjects";
import Subjects_Registration from "@/components/Subjects_Registration";
import CheckLoggedStatus from "../api/checkloggedstatus";
import Login_Page from "@/components/Login_Page";

const getStudents = async () => {
  const All_Students = await GetAllNames();
  return All_Students;
};
const getSubjects = async () => {
  const All_Subjects = await GetAllSubjects();
  return All_Subjects;
};

const SubjectRegistration = async () => {
  const Stat = await CheckLoggedStatus();
  let Stds = "{}";
  let Subjects = "{}";
  if (Stat) {
    Stds = await getStudents();
    Subjects = await getSubjects();
  }

  return Stat ? (
    <Subjects_Registration Stds={Stds} Subjects={Subjects} />
  ) : (
    <Login_Page Redirection={true} />
  );
};

export default SubjectRegistration;
