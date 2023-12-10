const baseUrl = 'https://medan-28-backend.up.railway.app';

var items = document.querySelectorAll(".items_related");

for (var i=0; i<items.length; i++) {
    items[i].addEventListener('click', function(e) {
    var link = this.querySelector(".items_link");
    link.click();
  }, false);
}

fetch(`${baseUrl}/articles`)
.then(res => res.json())
.then(data => renderDetail(data));


// Get selected news on detail
function renderDetail(articles){
  const urlParams = new URLSearchParams(window.location.search);
  const newsId = urlParams.get('id');

  // get element content
  let content = document.getElementById("mainNews");
  let related = document.getElementById("moreRelated");
  let other = document.getElementById("moreOther");
  

  for (news of articles){
    if(news.id == newsId){

      // get data for related news
      fetch(`${baseUrl}/articles/category/${news.category}`)
      .then(res => res.json())
      .then(data => renderRelated(data));

      // get data for other news
      fetch(`${baseUrl}/articles/index`)
      .then(res => res.json())
      .then(data => renderOther(data));
      
      let date = dateFormat(news.createdAt);
      content.innerHTML = `
              <div class="details_head">
                <div class="news_image">
                    <img src="${news.urlImage}">
                </div>
                <div class="news_description">
                    <h2>${news.title}</h2>
                    <section> Penulis: ${news.author} | ${date}</section>
                </div>
              </div>
              <hr>
              <div class="details_content" id="detailsContent">
                  <p>${news.content}</p>
              </div>
              <hr>
              <div class="details_category">
                  <div class="item_category">
                    <i class="fa-sharp fa-solid fa-list fa-xl"></i>
                    <a href="/./src/search.html?kategori=${news.category}">${news.category}</a>
                  </div>
              </div>
        `
        related.innerHTML = `
          <a onclick="redirectToSearchCategory('${news.category}')">Selengkapnya &nbsp;<i class="fa-regular fa-arrow-right-to-bracket"></i></a>
        `

      other.innerHTML = `
          <a onclick="redirectToSearch()">Selengkapnya &nbsp;<i class="fa-regular fa-arrow-right-to-bracket"></i></a>
        `
    }
  }
}

function renderOther (articles){
  const urlParams = new URLSearchParams(window.location.search);
  const newsId = urlParams.get('id');
  
  // get element content
  let list = document.getElementById("listOther");

  // Get Other News
  for (news of articles.slice(0,3)){
    if (news.id != newsId) {
      let otherDate = dateFormat(news.createdAt);
      list.innerHTML += `
      <div class="items_other">
        <div class="image_other">
          <img src="${news.urlImage}">
        </div>
        <div class="content_other">
          <h4><a class="items_link" href="../src/news_detail.html?id=${news.id}">${news.title}</a></h4>
          <p>${otherDate}</p>
        </div>
      </div>
      `
    }
  }
}

function renderRelated  (articles){
  const urlParams = new URLSearchParams(window.location.search);
  const newsId = urlParams.get('id');

  // get element content
  let list = document.getElementById("listRelated");
  let detailsHead = document.getElementById("detailsHeader");

  // Get Related News
  for (news of articles.slice(0,3)){
    if (news.id != newsId) {
      let listDate = dateFormat(news.createdAt);
      let headCategory = news.category;
      list.innerHTML += `
        <div class="items_related">
          <div class="image_related">
            <img src="${news.urlImage}">
          </div>
          <div class="content_related">
            <h4><a class="items_link" href="../src/news_detail.html?id=${news.id}">${news.title}</a></h4>
            <p>${listDate}</p>
          </div>
        </div>
      `
      detailsHead.innerHTML = `<a href="/">HOME</a> | <a onclick="redirectToSearchCategory('${news.category}')">${headCategory.toUpperCase()}</a>`
    }
  }

}

function nowDate(){
  const today = new Date();
  
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Tambah 1 karena indeks bulan dimulai dari 0
  const day = String(today.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
  }

function dateFormat(newsDate){
  date = new Date(newsDate);
  // Format tanggal dalam beberapa format standar menggunakan toLocaleDateString()
  const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('id-ID', optionsDate); // Ganti 'id-ID' sesuai dengan preferensi lokal Anda

  // Format waktu menggunakan toLocaleTimeString()
  const optionsTime = { hour: '2-digit', minute: '2-digit'};
  let formattedTime = date.toLocaleTimeString('id-ID', optionsTime); // Ganti 'id-ID' sesuai dengan preferensi lokal Anda
  formattedTime = formattedTime.replace(/\./g, ':');

  // Menggabungkan informasi tanggal dan waktu
  const formattedDateTime = `${formattedDate} ${formattedTime}`;
  return formattedDateTime;
}

// Redirect to Search Pages
function redirectToSearch() {
  // You can use window.location.href to redirect to the detail page
  window.location.href = '/./src/search.html?index';
}

function redirectToSearchCategory(newsCategory) {
  // You can use window.location.href to redirect to the detail page
  window.location.href = '/./src/search.html?kategori=' + newsCategory;
}