import axios from "axios";
import swal from "sweetalert";
const maNhom = "";

const axiosClient = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgMzMiLCJIZXRIYW5TdHJpbmciOiIxNy8wMi8yMDI0IiwiSGV0SGFuVGltZSI6IjE3MDgxMjgwMDAwMDAiLCJuYmYiOjE2ODk2OTk2MDAsImV4cCI6MTcwODI3NTYwMH0.MRV8WJfRstSWSH-VhvCRNFTjrswM_3tM8u5u-EZysxk",
  },
});

axiosClient.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    config.headers.token = user.token;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // xử lý lỗi chung, vd 401
    if (error?.response?.status === 403) {
     
      // khác navigate của react-router-dom là sẽ reload trình duyệt mất luôn state của redux
      // window.lo.replaceState(null, "/signin")
      swal({
        title: "Không có quyền thay đổi",
        text: "Nhấn Ok để tiếp tục",
        icon: "error",
      }).then((willSuccess) => {
        if (willSuccess) {
        //   window.location.href = "/signin";
        }
      });
    }
    throw error;
  }
);

export default axiosClient;
