var scrolled = window.addEventListener("scroll", fade_scroll);

var loaded = window.addEventListener("load", fade_scroll);

if (scrolled) {
  fade_scroll();
} else if (condition) {
  fade_scroll();
}

function fade_scroll() {
  var fade_elem = document.getElementsByClassName("post_block");
  var height = (window.innerHeight / 5) * 4;
  Object.keys(fade_elem).forEach((item) => {
    var elem_top = fade_elem[item].getBoundingClientRect().top;
    if (elem_top < height) {
      fade_elem[item].classList.add("fade");
    } else {
      fade_elem[item].classList.remove("fade");
    }
  });
}
