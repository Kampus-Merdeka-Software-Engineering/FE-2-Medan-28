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


function redirectToSearch(newsCategory) {
  // You can use window.location.href to redirect to the detail page
  window.location.href = './search.html?kategori=' + newsCategory;
}

// Load Screen Function
window.onload = function () {
  if (document.readyState !== "complete") {
      document.getElementById('main').style.visibility = 'hidden';
      document.querySelector("#loader").style.visibility = "visible";
  } else {
      document.querySelector("#loader").style.display = "none";
      document.getElementById("main").style.visibility = "visible";
          
  }
};