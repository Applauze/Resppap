import Class_Allocation from "@/components/Class_Allocation";
import CheckLoggedStatus from "../api/checkloggedstatus";
import GetAllTeachersNames from "../api/getallteachersname";
import Login_Page from "@/components/Login_Page";

const ClassAllocation = async () => {
  // const getSubjects = async () => {
  //   const All_Subjects = await GetAllSubjects();
  //   return All_Subjects;
  // };
  const getTeachersNames = async () => {
    const All_TeachersNames = await GetAllTeachersNames();
    return All_TeachersNames;
  };
  const Stat = await CheckLoggedStatus();
  let TeachersNames = "{}";
  if (Stat) {
    TeachersNames = await getTeachersNames();
  }
  return Stat ? (
    <Class_Allocation TeachersNames={TeachersNames} />
  ) : (
    <Login_Page Redirection={true} />
  );
};

export default ClassAllocation;
