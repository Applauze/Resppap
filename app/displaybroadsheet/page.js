import Display_Broadsheet from "@/components/Display_Broadsheet";
import CheckLoggedStatus from "../api/checkloggedstatus";
import Login_Page from "@/components/Login_Page";

const DisplayBroadsheet = async () => {
  const Stat = await CheckLoggedStatus();
  return Stat ? <Display_Broadsheet /> : <Login_Page Redirection={true} />;
};

export default DisplayBroadsheet;
