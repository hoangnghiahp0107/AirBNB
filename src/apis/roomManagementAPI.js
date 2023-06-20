import axiosClient from "./axiosClient";

//Lấy danh sách phòng theo trang
export const apiGetRoomListPage = async (value) => {
  const payload = { ...value };
  const { data } = await axiosClient.get("/phong-thue/phan-trang-tim-kiem", {
    params: payload,
  });
  return data;
};

//Thêm phòng
export const apiCreateRoom = async (room) => {
  const { data } = await axiosClient.post("/phong-thue", room);
  return data;
};

//Xóa phòng
export const apiDeleteRoom = async (roomId) => {
  const { data } = await axiosClient.delete(`/phong-thue/${roomId}`);
  return data;
};

//update phòng
export const apiUpdateRoom = async (value) => {
  const { data } = await axiosClient.put(`/phong-thue/${value.id}`, value);
  return data;
};

//upload hình ảnh phòng
export const apiUploadRoomImg = async (value) => {
  const data = await axiosClient.post("/phong-thue/upload-hinh-phong", {
    params: {
      maViTri: value.maPhong,
    },
  });
  return data;
};

// đặt phòng
export const apiGetDatPhong = async (value) => {
  const payload = { ...value };
  const { data } = await axiosClient.get("/dat-phong/lay-theo-nguoi-dung", {
    params: payload,
  });
  return data;
};

