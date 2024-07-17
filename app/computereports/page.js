import Compute_Reports from "@/components/Compute_Reports";
import CheckLoggedStatus from "../api/checkloggedstatus";
import Login_Page from "@/components/Login_Page";

const ComputeScores = async () => {
  const Stat = await CheckLoggedStatus();

  return Stat ? <Compute_Reports /> : <Login_Page Redirection={true} />;
};

export default ComputeScores;
