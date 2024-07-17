import Subject_Allocation from "@/components/Subject_Allocation";
import GetAllSubjects from "../api/getallsubjects";
import GetAllTeachersNames from "../api/getallteachersname";
import CheckLoggedStatus from "../api/checkloggedstatus";
import Login_Page from "@/components/Login_Page";

const SubjectAllocation = async () => {
  const getSubjects = async () => {
    const All_Subjects = await GetAllSubjects();
    return All_Subjects;
  };
  const getTeachersNames = async () => {
    const All_TeachersNames = await GetAllTeachersNames();

    return All_TeachersNames;
  };
  const Stat = await CheckLoggedStatus();
  let Subjects = "{}";
  let TeachersNames = "{}";
  if (Stat) {
    Subjects = await getSubjects();
    TeachersNames = await getTeachersNames();
  }

  return Stat ? (
    <Subject_Allocation Subjects={Subjects} TeachersNames={TeachersNames} />
  ) : (
    <Login_Page Redirection={true} />
  );
};

export default SubjectAllocation;
