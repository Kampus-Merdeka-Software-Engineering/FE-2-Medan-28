function resNav() {
  var x = document.getElementById("resNavbar");

  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
}
