import MenuDisplayPage from "@/components/MenuDisplayPage";
import Login_Page from "@/components/Login_Page";
import CheckLoggedStatus from "./api/checkloggedstatus";
const Home = async () => {
  const Stat = await CheckLoggedStatus();
  return Stat ? <MenuDisplayPage /> : <Login_Page />;
};
export default Home;
