import Display_Results from "@/components/Display_Results";
import CheckLoggedStatus from "../api/checkloggedstatus";
import "bootstrap/dist/css/bootstrap.min.css";
import Login_Page from "@/components/Login_Page";

const DisplayResults = async () => {
  const Stat = await CheckLoggedStatus();
  return Stat ? <Display_Results /> : <Login_Page Redirection={true} />;
};

export default DisplayResults;
