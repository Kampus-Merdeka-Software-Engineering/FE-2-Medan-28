// for Base use of Website's Interactive

// Navbar Interactive - Responsive
let resNav = document.getElementById('iconNav')

resNav.addEventListener("click", ()=>{
    var x = document.getElementById("resNavbar");
    var y = document.getElementById("iconLogo");
  
    if (x.className === "navbar") {
      x.className += " responsive";
      y.className = "fa fa-close"
    } else {
      x.className = "navbar";
      y.className = "fa fa-bars"
    }
});