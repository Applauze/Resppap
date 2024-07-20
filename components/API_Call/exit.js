import axioscall from "./axioscall";
import Cookies from "universal-cookie";
const LogoutFunction = async () => {
  const cookies = new Cookies();
  cookies.remove("this_staff", { path: "/" });
  cookies.remove("this_category", { path: "/" });
  cookies.remove("this_fullname", { path: "/" });
  cookies.remove("Logged", { path: "/" });

  let Ex = await axioscall("loose_access", { WayOut: "WayOut" });
  console.log(Ex);
  if (Ex === "Success") {
    return true;
  } else {
    return false;
  }
};

export default LogoutFunction;
