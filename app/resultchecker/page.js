import GetAllNames from "../api/getallnames";
import ResultCheckerComponent from "@/components/ResultCheckerComponent";
import CheckLoggedStatus from "../api/checkloggedstatus";
import Login_Page from "@/components/Login_Page";

const ResultChecker = async () => {
  const Stat = await CheckLoggedStatus();

  //   return Stat ? <Promote_Students /> : <Login_Page Redirection={true} />;
  return <ResultCheckerComponent />;
};

export default ResultChecker;
