loadMenu();

function loadMenu() {
  let t = document.getElementsByClassName("pMenu")[0];
  t.innerHTML = ` <div class="logo"> 
           <a href="index.html">
          <img src="imgs/logo.jpg " /></a></div>
        <div class="menu">
          <ul class="menuTop">
            <li><a href="thoigianKM.html">Thời gian khuyến mãi</a></li>
          </ul>
        </div>
        <div class="DangNhapGioHangTongSL">
          <div class="GioHang">
            <a href="giohang.html" class="fa-solid fa-cart-shopping"></a> 
          </div>
          <div class="TongSL">
            0
          </div>
        </div>`;
}
