loadSlider();

///////////////////////////////////
function loadSlider() {
  let tSlider = document.getElementsByClassName("pSlider")[0];
  tSlider.innerHTML = `<div id="imgHinh" class="Slider">
        <div><i onclick="Pre();" class="fa-solid fa-less-than"></i></div>
        <div><i onclick="Next();"  class="fa-solid fa-greater-than"></i> </div>
      </div>`;
  loadAnhTruoc();
  currentIndex = 0;
}

function loadAnhTruoc() {
  anhAr = [];
  for (var i = 0; i < 3; i++) {
    anhAr[i] = new Image();
    anhAr[i].src = "imgs/slider/" + i + ".jpg";
  }
}

function Next() {
  if (currentIndex < 9) {
    currentIndex++;
    let v = document.getElementById("imgHinh");
    v.style.backgroundImage = `url("${anhAr[currentIndex].src}")`;
  }
}

function Pre() {
  if (currentIndex > 0) {
    currentIndex--;
    let v = document.getElementById("imgHinh");
    v.style.backgroundImage = `url("${anhAr[currentIndex].src}")`;
  }
}
