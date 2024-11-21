RenderGioHang(); // load các sản phẩm giỏ hàng nếu có

////
function RenderGioHang() {
  cart = JSON.parse(localStorage.getItem("data")) || []; // lấy thông tin giỏ hàng đã lưu nếu có
  // nếu cart rỗng thì xóa nội dung giỏ hàng trên màn hình
  if (cart.length == 0) {
    const viTriThem = document.getElementsByClassName("cacSpCart")[0];
    viTriThem.innerHTML = "";
    // ẩn nút thanh toán, nút xóa
    let tt1 = document.getElementsByClassName("thanhToanCartXoaCart")[0];
    tt1.style.display = "none";
    // và ẩn thông tin thanh toán,
    let tt2 = document.getElementsByClassName(
      "khuyenMaiCartTongTienCartVATCartTongTTCart"
    )[0];
    tt2.style.display = "none";
    return;
  }
  let viTriThem = document.getElementsByClassName("cacSpCart")[0];
  for (i = 0; i < cart.length; i++) {
    // tạo dòng mới
    var nodeMoi = document.createElement("nodeMoiSp");
    nodeMoi.classList.add("dongSpCart");
    // thêm thông tin sản phẩm
    var str = ` <div class="hinhCartThongTinCart">
          <div class="hinhCart">
            <img src="imgs/${cart[i].hinhanh}" alt="Hình sản phẩm" />
          </div>
          <div class="ThongTinCart">
            <div class="TenSpCart">${cart[i].tenSp}</div>
            <div class="ThongTinSpCart">
            ${cart[i].thongtinSp}
            </div>
            <div class="GiaSpCart">${convertMoney(cart[i].gia)}</div>
          </div>
        </div>
        <div class="soLuongCartNutXoaCart">
          <div class="soLuongCart">
            <input type="number" value=${cart[i].soLuong} onchange="thaydoiSL(${
      cart[i].idSp
    });" />
          </div>
          <div class="NutXoaCart">
            <button type="button" class="fa fa-times" onclick="XoaSp(${
              cart[i].idSp
            })"></button>
          </div>
        </div>`;
    nodeMoi.innerHTML = str;
    // thêm node mới vào trang html
    viTriThem.appendChild(nodeMoi);
  }
  updateMainTongSLCart(); // sau khi vẽ giỏ hàng thì cập nhập tổng số lượng, thông tin thanh toán
}

let maKhuyenMai = {
  A: 30,
};

function KhuyenMai() {
  // tại thời điểm thanh toán: xét xem thời gian khuyến mãi, có còn hay không
  var tKM = localStorage.getItem("nbdkm") || false;
  if (!tKM) {
    // nếu không có thời gian khuyến mãi hay đã hết hạn thì thông báo đã hết thời gian khuyến mãi
    // tính theo giá bình thường
    alert("Chú ý: Thời gian khuyến mãi đã hết !!!");
    return;
  }
  // có khuyến mãi, nhưng tại thời điểm thanh toán, đã hết hạn
  var currDate = new Date();
  thoiGianConLai = Date.parse(tKM) - Date.parse(currDate);
  if (thoiGianConLai < 0) {
    localStorage.removeItem("nbdkm");
    alert("Chú ý: Thời gian khuyến mãi đã hết !!!");
    return;
  }

  // nếu còn thời gian khuyến mãi
  var ttTongTien = 0; // tổng tiền sản phẩm
  var ttVAT = 0; // tổng tiền VAT 5%
  var ttTongTienGG = 0; // tổng tiền khuyến mãi
  var ttTongThanhToan = 0; // tổng tiền thanh toán
  var tongGiaTriSp = 0; // tổng giả trị mổi sản phẩm = số lượng * đơn giá
  for (i = 0; i < cart.length; i++) {
    tongGiaTriSp = cart[i].soLuong * cart[i].gia;
    ttTongTien += tongGiaTriSp;
  }
  // lấy và kiểm tra mã giảm giá
  var maGG = document.querySelector(".codekhuyenMai").value; // kiểu input- value
  maGG = maGG.toUpperCase(); // chuyển ký tự nhập thành hoa
  phanTramGG = 0;
  if (maKhuyenMai[maGG]) {
    phanTramGG = maKhuyenMai[maGG];
  }

  // tính toán nếu có mã khyến mãi,mã hợp lệ, và thời gian khuyến mãi còn
  var viTriGG = document.getElementsByClassName("giamGiaCart")[0];
  vitriGGHienThi = viTriGG.getElementsByTagName("span")[0]; // vị trí hiển thị giảm giá
  if (phanTramGG > 0) {
    ttTongTienGG = (ttTongTien * phanTramGG) / 100;
    ttTongThanhToan = ttTongTien + ttVAT - ttTongTienGG; // giảm (tổng tiền phải thanh toán) = ((tổng tiền) + vat) - khuyến mãi
    viTriGG.style.display = "flex";
  } else {
    // mã khuyến mãi không hợp lệ
    ttTongThanhToan = ttTongTien + ttVAT; // (tổng tiền phải thanh toán) = ((tổng tiền) + vat)
    viTriGG.style.display = "none";
  }
  ttVAT = (ttTongTien * 5) / 100;
  // hiển thị thông tin
  let ttKM = document.querySelectorAll(
    ".clsTongTienCartVATCartTongTTCart span"
  );
  ttKM[0].innerHTML = convertMoney(ttTongTien);
  ttKM[1].innerHTML = convertMoney(ttVAT);
  ttKM[3].innerHTML = convertMoney(ttTongThanhToan);
  vitriGGHienThi.innerHTML = convertMoney(ttTongTienGG);
}

function updateMainTongSLCart() {
  // đếm tổng số lượng sp trong mảng cart
  var dem = 0;
  for (i = 0; i < cart.length; i++) {
    dem += cart[i].soLuong;
  }
  // Cập nhập thông tin tổng số lượng ở trang main
  var tongSL = document.getElementsByClassName("TongSL")[0];
  tongSL.innerHTML = dem;
  updateThongTinTT(); // đồng thời, cập nhập thông tin thanh toán
}

function updateThongTinTT() {
  // cập nhập thông tin thanh toán: tổng tiền, vat, khuyến mãi, tổng thanh toán
  var ttTongTien = 0;
  var tongGiaTriSp = 0; // tổng giả trị sản phẩm = số lượng * đơn giá
  for (i = 0; i < cart.length; i++) {
    tongGiaTriSp = cart[i].soLuong * cart[i].gia;
    ttTongTien += tongGiaTriSp;
  }
  var ttVAT = (ttTongTien * 5) / 100;
  var ttTongThanhToan = ttTongTien + ttVAT;
  let tt = document.querySelectorAll(".clsTongTienCartVATCartTongTTCart span");
  tt[0].innerHTML = convertMoney(ttTongTien);
  tt[1].innerHTML = convertMoney(ttVAT);
  tt[3].innerHTML = convertMoney(ttTongThanhToan);
}

function XoaGioHang() {
  cart = []; //cart hiện tại trong bộ nhớ bằng rỗng
  localStorage.setItem("data", JSON.stringify(cart)); // ghi lại vào localStorage
  updateMainTongSLCart(); // cập nhập tổng số lượng sản phẩm giỏ hàng
  RenderGioHang(cart); // render trang giỏ hàng
}

function thanhToanGioHang() {
  XoaGioHang();
  alert(" Cám ơn quý khách đã thanh toán");
  window.location.href = "index.html";
}
function convertMoney(num) {
  return num.toLocaleString("it-IT", { style: "currency", currency: "VND" });
}

function XoaSp(idSpXoa) {
  // khi xóa 1 sản phẩm
  // cập nhập lại mảng
  // ghi lại json
  // cập nhập tổng số lượng sản phẩm + thông tin thanh toán
  // vẽ lại giao diện
  for (i = 0; i < cart.length; i++) {
    // cập nhập cart hiện tại trong bộ nhớ
    if (cart[i].idSp == idSpXoa) cart.splice(i, 1);
  }
  localStorage.setItem("data", JSON.stringify(cart)); // ghi lại vào localStorage
  updateMainTongSLCart(); // cập nhập lại tổng số lượng sản phẩm trong giỏ hàng
  const viTriThem = document.getElementsByClassName("cacSpCart")[0]; // xóa render của giỏ hàng hiện tại
  viTriThem.innerHTML = ""; // xóa nội dung giỏ hàng trên giao diện HTML
  RenderGioHang(cart); // vẽ lại giỏ hàng
}

function thaydoiSL(idSp) {
  let giaTri = event.target.value; // lấy giá trị nhập
  if (parseInt(giaTri) < 0) {
    // nếu là số âm
    event.target.value = 1; // giá trị input là 1, trên giao diện
    giaTri = 1;
  }
  for (i = 0; i < cart.length; i++) {
    // cập nhập vào phần tử mảng
    if (cart[i].idSp == idSp) cart[i].soLuong = Number(giaTri); // nếu không chuyển, tự động sai
    //  parseInt(giaTri) hay Number(giaTri)
  }
  updateMainTongSLCart(); // cập nhập lại tổng số lượng sản phẩm trong giỏ hàng
}
