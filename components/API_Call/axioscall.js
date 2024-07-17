import Axios from "axios";

const axioscall = async (url, dataFromCaller) => {
  var response;

  await Axios(`/api/${url}`, {
    method: "POST",
    data: { dataFromCaller },
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((dat) => {
      let resp = dat.data;
      response = resp.message;
    })
    .catch((error) => {
      response = "Error";
      console.log(error);
    });
  return response;
};

export default axioscall;
