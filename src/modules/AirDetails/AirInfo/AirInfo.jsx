import React, { useState, useEffect } from 'react';
import { apiPhongID } from '../../../apis/bnbApi';
import Calendar from 'react-calendar';
import LinesEllipsis from 'react-lines-ellipsis';
import 'react-calendar/dist/Calendar.css';

import "./AirInfo.scss"

function AirInfo({ id }) {
  const [phongThue, setPhongThue] = useState({});
  const [err, setErr] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState([new Date(), new Date()]);
  const startDate = selectedDateRange[0];
  const endDate = selectedDateRange[1];
  const diffInTime = endDate.getDate() - startDate.getDate() + 1;
  const totalPrice = phongThue.giaTien * diffInTime;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleShowFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const getPhongThue = async () => {
    try {
      const data = await apiPhongID(id);
      setPhongThue(data);
    } catch (err) {
      console.log(err);
      setErr(err);
    }
  };

  useEffect(() => {
    getPhongThue();
  }, []);

  if(err) return null;

  const handleDateChange = (date) => {
    setSelectedDateRange(date);
  };

  const handleBooking = () => {
    const startDate = selectedDateRange[0];
    const endDate = selectedDateRange[1];
    console.log("Ngày bắt đầu:", startDate);
    console.log("Ngày kết thúc:", endDate);
  };

  return (
    <div className='container'>
      <div className="row">
        <div className="col-sm-6">
          <div className='mt-4 pb-3 chiTiet'>
          <span className='phong'>{phongThue.khach} khách</span>
          <span className='phong'> . {phongThue.phongNgu} phòng ngủ</span>
          <span className='phong'> . {phongThue.giuong} giường</span>
          <span className='phong'> . {phongThue.phongTam} phòng tắm</span>
          </div>
          <div className='mt-3 chiTiet'>
            <span className='info'><i class="bi bi-info"></i> Mô tả</span>
            {phongThue?.moTa?.length > 80 ? (
              showFullDescription ? (
                <div>
                  <p className='moTa'>{phongThue.moTa}</p>
                  <span className='moRong' onClick={toggleShowFullDescription}>Thu gọn</span>
                </div>
              ) : (
                <div>
                  <LinesEllipsis
                    className='moTa'
                    text={phongThue.moTa}
                    maxLine={showFullDescription ? '50' : '1'}
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                  />
                  <span className='moRong' onClick={toggleShowFullDescription}>Xem thêm</span>
                </div>
              )
            ) : (
              <p className='moTa'>{phongThue.moTa}</p>
            )}
          </div>
          <div className='mt-4 chiTiet'>
            <h2 className='gioiThieu'>Nơi này có những gì cho bạn</h2>
            <div className='suDung pb-3'>
              <div className='me-5'>
                <div>
                <span className={phongThue.wifi ? '' : 'gach-ngang'}><i className="bi bi-wifi me-2"></i> Wifi</span>
                </div>
                <div>
                  <span className={phongThue.hoBoi ? '' : 'gach-ngang'}><i class="bi bi-water me-2"></i> Hồ bơi</span>
                </div>
                <div>
                  <span className={phongThue.dieuHoa ? '' : 'gach-ngang'}><i class="bi bi-snow me-2"></i> Điều hòa</span>
                </div>
                <div>
                  <span className={phongThue.tivi ? '' : 'gach-ngang'}><i class="bi bi-tv me-2"></i> Tivi</span>
                </div>
              </div>
              
              <div>
                <div>
                  <span className={phongThue.doXe ? '' : 'gach-ngang'}><i class="bi bi-car-front-fill me-2"></i> Chỗ đỗ xe miễn phí tại nơi ở</span>
                </div>
                <div>
                  <span className={phongThue.bep ? '' : 'gach-ngang'}><i class="bi bi-kanban-fill me-2"></i> Bếp</span>
                </div>
                <div>
                  <span className={phongThue.banUi ? '' : 'gach-ngang'}> <i class="bi bi-thermometer-high me-2"></i> Bàn ủi</span>
                </div>
                <div>
                  <span className={phongThue.banLa ? '' : 'gach-ngang'}><i class="bi bi-thermometer-low me-2"></i> Bàn là</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-sm-4' style={{marginTop:"47px"}}>
          <div className='datPhong'>
            <div className='tongQuat'>
              <div>
                <span className='giaTien'>{totalPrice}.000.000đ</span>
              </div>
              <div className='danhGia'>
                <span><i class="bi bi-star-fill"></i></span>
                <span> .</span>
                <span> đánh giá</span>
              </div>
            </div>
            <div className='mt-3'>
              <Calendar
                onChange={handleDateChange}
                value={selectedDateRange}
                selectRange={true}
                minDate={new Date()}
              />
            </div>
            <div className='mt-2 text-center'>
              <button type="button" class="btn btn-danger datCho" onClick={handleBooking}>Đặt Phòng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AirInfo;