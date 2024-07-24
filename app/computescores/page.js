import Compute_Scores from "@/components/Compute_Scores";
import GetAllSubjects from "../api/getallsubjects";
import CheckLoggedStatus from "../api/checkloggedstatus";
import Login_Page from "@/components/Login_Page";

export const metadata = {
  title: "SCORES",
  description: "Compute Scores, Enter students scores, Scores computetion",
};

const getSubjects = async () => {
  const All_Subjects = await GetAllSubjects();
  return All_Subjects;
};

const ComputeScores = async () => {
  const Stat = await CheckLoggedStatus();
  let Subjects = "{}";

  if (Stat) {
    Subjects = await getSubjects();
  }
  return Stat ? (
    <Compute_Scores Subjects={Subjects} />
  ) : (
    <Login_Page Redirection={true} />
  );
};

export default ComputeScores;
