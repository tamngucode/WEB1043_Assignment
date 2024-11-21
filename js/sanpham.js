//////
themDemo(); // thêm sản phẩm vào mảng
themSp(); // render mảng sản phẩm lên trang chủ
checkCart(); // kiểm tra giỏ hàng đã có thông tin hay chưa, hiển thị số lượng sản phẩm trong giỏ hàng

/////////////////////////////////
function Product(idSp, hinhanh, tenSp, thongtinSp, gia) {
  // Tạo lớp Product
  this.idSp = idSp;
  this.hinhanh = hinhanh;
  this.tenSp = tenSp;
  this.thongtinSp = thongtinSp;
  this.gia = gia;
}

function themDemo() {
  inventory = []; // mảng lưu trữ các mặt hàng
  let sp1 = new Product(
    1,
    "sp1.jpg",
    "SẢN PHẨM 1",
    "iphone 11",
    1200000
  ); // Tạo các đối tượng cho lớp Product
  let sp2 = new Product(
    2,
    "sp2.jpg",
    "SẢN PHẨM 2",
    "iphone 12 ",
    150000
  ); // Tạo các đối tượng cho lớp Product
  let sp3 = new Product(
    3,
    "sp3.jpg",
    "SẢN PHẨM 3",
    "iphone 13 ",
    120000
  ); // Tạo các đối tượng cho lớp Product
  let sp4 = new Product(
    4,
    "sp4.jpg",
    "SẢN PHẨM 4",
    "iphone 14 ",
    190000
  );
  let sp5 = new Product(
    5,
    "sp5.jpg",
    "SẢN PHẨM 5",
    "iphone 15 ",
    100000
  ); // Tạo các đối tượng cho lớp Product
  let sp6 = new Product(
    6,
    "sp6.jpg",
    "SẢN PHẨM 6",
    "iphone 11 pro ",
    150000
  ); // Tạo các đối tượng cho lớp Product
  let sp7 = new Product(
    7,
    "sp7.jpg",
    "SẢN PHẨM 7",
    "iphone 12 pro ",
    120000
  ); // Tạo các đối tượng cho lớp Product
  let sp8 = new Product(
    8,
    "sp8.jpg",
    "SẢN PHẨM 8",
    "iphone 13 pro ",
    190000
  );

  let sp9 = new Product(
    9,
    "sp9.jpg",
    "SẢN PHẨM 9",
    "iphone 14 pro ",
    190000
  );
  // Tạo các đối tượng cho lớp Product

  inventory.push(sp1); // thêm đối tượng vào - mảng lưu trữ các mặt hàng
  inventory.push(sp2);
  inventory.push(sp3);
  inventory.push(sp4);

  inventory.push(sp5);
  inventory.push(sp6);
  inventory.push(sp7);
  inventory.push(sp8);

  inventory.push(sp9);
}

function themSp() {
  // Tạo 1 dòng sản phẩm, mổi dòng có 4 sản phẩm
  var dongMoi = document.createElement("div"); // Tạo dòng mới cho dòng đầu tiên
  dongMoi.classList.add("dongSp"); // sẽ lưu 4 sản phẩm
  for (i = 0; i < inventory.length; i++) {
    var dem = i + 1; // đếm xem đang thực hiện đến sản phẩm thứ mấy
    var nodeSp = document.createElement("div"); // Bước 2 -  Tạo phần tử HTML mới
    nodeSp.classList.add("Sp"); // Bước 3 - thêm class Sp cho node mới
    // Bước 4- Tạo nội dung node mới
    str = ` <div class="hinhSp">
          <img src="imgs/${inventory[i].hinhanh}" alt="Hình sản phẩm 1"/>
        </div>
        <div class="tenSp"> ${inventory[i].tenSp}</div>
        <div class="thongtinSp"> ${inventory[i].thongtinSp} </div>
        <div class="giaNutMua">
            <div class="gia">${convertMoney(inventory[i].gia)} </div>
      <div class="NutMua" onclick="ThemSpVaoGioHang(${
        inventory[i].idSp
      });">Thêm vào giỏ</div>
       </div>`;
    nodeSp.innerHTML = str; // Bước 4 - Gắn nội dung cho node mới
    dongMoi.appendChild(nodeSp); // Bước 5-Thêm phần tử HTML đã tạo vào dòng mới tạo
    if (dem % 4 == 0) {
      // nếu dòng đã đủ 4 phần tử vào
      var viTriGan = document.getElementsByClassName("pSanPham")[0];
      viTriGan.appendChild(dongMoi);
      // tạo dòng mới
      var dongMoi = document.createElement("dong"); // Tạo dòng mới
      dongMoi.classList.add("dongSp"); // sẽ lưu 4 sản phẩm
    }
  }
  // cuối vòng for, nếu dem % 4 > 0 -> có sản phẩm lẻ -> gắn vào
  if (dem % 4 > 0) {
    let viTriGan = document.getElementsByClassName("pSanPham")[0];
    viTriGan.appendChild(dongMoi);
  }
}

function convertMoney(num) {
  return num.toLocaleString("it-IT", { style: "currency", currency: "VND" });
  // num.toLocaleString(locale, options);
  // •  locale: Một chuỗi chỉ định ngôn ngữ và quy tắc định dạng khu vực.
  //•  options: Một đối tượng cung cấp các thuộc tính để tùy chỉnh định dạng.
  // Các thuộc tính này có thể bao gồm style, currency
}

/////////////////
cart = []; // giỏ hàng, mảng lưu trữ các mặt hàng
function ProductCart(idSp, hinhanh, tenSp, thongtinSp, gia, soLuong) {
  // Tạo lớp Product trong giỏ hàng
  this.idSp = idSp;
  this.hinhanh = hinhanh;
  this.tenSp = tenSp;
  this.thongtinSp = thongtinSp;
  this.gia = gia;
  this.soLuong = soLuong;
}

function checkCart() {
  // Kiểm tra số lượng sản phẩm của giỏ hàng - nếu có
  cart = JSON.parse(localStorage.getItem("data")) || []; // lấy thông tin giỏ hàng đã lưu
  updateMainTongSL(); // cập nhập tổng số lượng sản phẩm nếu có
}

function ThemSpVaoGioHang(idSThem) {
  // khi bấm nút, thêm sản phẩm vào giỏ hàng
  var chuaCo = true; // giả sử đây là sản phẩm mới, trong giỏ hàng chưa có
  // Nếu sản phẩm chưa có trong giỏ hàng thì tạo mới sản phẩm
  for (i = 0; i < cart.length; i++) {
    if (cart[i].idSp == idSThem) {
      // Nếu sản phẩm có trong giỏ hàng thì tăng số lượng sản phẩm lên 1, mổi khi bấm nút thêm
      cart[i].soLuong += 1;
      chuaCo = false; // sản phẩm đã có trong giỏ hàng
      break;
    }
  }
  if (chuaCo) {
    // nếu sản phẩm chưa có trong giỏ hàng -> sản phẩm mới
    for (i = 0; i < inventory.length; i++) {
      // lấy thông tin sản phẩm có id
      if (inventory[i].idSp == idSThem) break;
    } // xác định phần tử nguồn thông tin
    let spCart = new ProductCart(); // tạo sản phẩm mới cho giỏ hàng
    spCart.idSp = idSThem;
    spCart.tenSp = inventory[i].tenSp;
    spCart.hinhanh = inventory[i].hinhanh;
    spCart.thongtinSp = inventory[i].thongtinSp;
    spCart.gia = inventory[i].gia;
    spCart.soLuong = 1;
    cart.push(spCart);
  }
  updateMainTongSL(); // cập nhập tổng số lượng sản phẩm của giỏ hàng
  localStorage.setItem("data", JSON.stringify(cart)); // lưu giỏ hàng
}

function updateMainTongSL() {
  // đếm tổng số lượng sp trong mảng cart
  var dem = 0;
  for (i = 0; i < cart.length; i++) {
    dem += cart[i].soLuong;
  }
  // Cập nhập thông tin tổng số lượng ở trang main
  var tongSL = document.getElementsByClassName("TongSL")[0];
  tongSL.innerHTML = dem;
}
