import View_Pins from "@/components/View_Pins";
import CheckLoggedStatus from "../api/checkloggedstatus";
import "bootstrap/dist/css/bootstrap.min.css";
import Login_Page from "@/components/Login_Page";

const DisplayResults = async () => {
  const Stat = await CheckLoggedStatus();
  return <View_Pins />;
  // return Stat ? <View_Pins /> : <Login_Page Redirection={true} />;
};

export default DisplayResults;
