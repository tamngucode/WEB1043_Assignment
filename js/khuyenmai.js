loadTGKMHome(); //trang chủ Home - load HTML thời gian khuyến mãi
checkTGKM(); // trang chủ Home - kiểm tra thời gian khuyến mãi nếu còn
loadTGKMToInput(); //trang thiết lập thời gian khuyến mãi - nếu có thời gian khuyến mãi thì load và nạp lên giao diên input -

////////trang chủ Home

function loadTGKMHome() {
  let tgKM1 = document.getElementsByClassName("pTGKM")[0];
  tgKM1.innerHTML = `<div>Thời gian khuyến mãi còn lại :</div>
      <div id="idTgKM"></div> 
      <div class="ngay"></div>
      <div class="gio"></div>
      <div class="phut"></div>
      <div class="giay"></div>`;
}

function anThongTinKM() {
  let t = document.getElementsByClassName("pTGKM")[0]; // ẩn thông tin thời gian khuyến mãi
  t.style.display = "none";
}

function checkTGKM() {
  tgKM = localStorage.getItem("nbdkm") || false;
  if (!tgKM) {
    // không có thời gian khuyến mãi
    anThongTinKM();
    return;
  }
  thoiGianIn = setInterval("TinhToanCapNhapHienThi();", 1000);
}

function TinhToanCapNhapHienThi() {
  var d = TinhToanThoiGianConLai(); // tính toán thời gian còn lại
  if (d.tongMiliGiayCon < 0) {
    // đã hết hạn khuyến mãi
    localStorage.removeItem("nbdkm"); // xóa
    anThongTinKM();
    clearInterval(thoiGianIn);
    return;
  }
  // hiển thị thông tin
  var LocationNgay = document.getElementsByClassName("ngay")[0];
  LocationNgay.innerHTML = d.ngay + "Ngày";
  var LocationNgay = document.getElementsByClassName("gio")[0];
  LocationNgay.innerHTML = d.gio + "Giờ";
  var LocationNgay = document.getElementsByClassName("phut")[0];
  LocationNgay.innerHTML = d.phut + "Phút";
  var LocationNgay = document.getElementsByClassName("giay")[0];
  LocationNgay.innerHTML = d.giay + "Giây";
}

function TinhToanThoiGianConLai() {
  var currDate = new Date();
  var tgRemain = Date.parse(tgKM) - Date.parse(currDate); // số mili giây
  // Tổng thời gian khuyến mãi còn lại
  var tongSoGiay = Math.floor(tgRemain / 1000);
  var tongSoPhut = Math.floor(tongSoGiay / 60);
  var tongSoGio = Math.floor(tongSoPhut / 60);
  var tongSoNgay = Math.floor(tongSoGio / 24);

  // Tổng thời gian khuyến mãi còn lại chi tiết
  var tongSoGiayLe = tongSoGiay % 60; // số giây lẻ còn lại, sau khi đã chia cho phút
  var tongSoPhutLe = tongSoPhut % 60; // số phút lẻ còn lại, sau khi đã chia cho giờ
  var tongSoGioLe = tongSoGio % 24; // số giờ lẻ còn lại, sau khi đã chia cho ngày

  return {
    tongMiliGiayCon: tgRemain,
    ngay: tongSoNgay,
    gio: tongSoGioLe,
    phut: tongSoPhutLe,
    giay: tongSoGiayLe,
  };
}

//////// trang thiết lập thời gian khuyến mãi

function loadTGKMToInput() {
  var t1 = localStorage.getItem("nbdkm") || false;
  if (t1) {
    // nếu có thời gian khuyến mãi thì load và nạp lên giao diên input
    var nkm = document.querySelector("input[name='tgKM']");
    var ngay = new Date(t1);
    nkm.valueAsDate = ngay;
  }
}

function thietlapKMToLocal() {
  var nkm = document.querySelector("input[name='tgKM']");
  var t = new Date(nkm.value);
  localStorage.setItem("nbdkm", t);
}
