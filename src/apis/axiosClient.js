import axios from "axios";
import swal from "sweetalert";
const maNhom = "";

const axiosClient = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgNDIiLCJIZXRIYW5TdHJpbmciOiIyNi8xMS8yMDI0IiwiSGV0SGFuVGltZSI6IjE3MzI1NzkyMDAwMDAiLCJuYmYiOjE3MTUxMDEyMDAsImV4cCI6MTczMjcyNjgwMH0.ajklFRwbyDlc2iK9_3GbN_A9MdF7qg_CX7iXJqYMc4I",
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
