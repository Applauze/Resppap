import EditTeachers_Registration from "@/components/EditTeachers_Registration";
import GetAllTeachersNames from "../api/getallteachersname";
import CheckLoggedStatus from "../api/checkloggedstatus";
import Login_Page from "@/components/Login_Page";

const ComputeScores = async () => {
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
    <EditTeachers_Registration TeachersNames={TeachersNames} />
  ) : (
    <Login_Page Redirection={true} />
  );
};

export default ComputeScores;