
// Fetch News from API - Move it to api specifically for APIs
const baseUrl = 'https://medan-28-backend.up.railway.app';
const originUrl = window.location.origin;

fetch(`${baseUrl}/articles`)
.then(res => res.json())
.then(data => renderDataToContent(data));

// Get selected news on detail
function renderDataToContent(articles){
  // get element content
  const urlParams = new URLSearchParams(window.location.search);
  const newsCategory = urlParams.get('kategori');
  const keyword = urlParams.get('keyword');
  const index = urlParams.get('index');

  let header = document.getElementById("searchHeader");
  let headerDesc = document.getElementById("listHead");
  let content = document.getElementById("listNews");

  if (newsCategory) {
    header.innerHTML=`
    <a href="../">HOME</a> | <a href="./search.html?kategori=${newsCategory}">${newsCategory.toUpperCase()}</a>
    <hr>
    `

    headerDesc.innerHTML=`
    <div class="listHead_desc">
      <h3>${newsCategory}</h3>
    </div>
    `
    for (article of articles){
      let date = dateFormat(article.createdAt)
      if (newsCategory == article.category) {
        content.innerHTML+=`
        <div class="card_news">
            <div class="card_head">
              <a class="card_link" href="./news_detail.html?id=${article.id}"></a>
              <img class="card_image" src="..${article.urlImage}" alt="">
          </div>
            <div class="card_content">
              <a href="./news_detail.html?id=${article.id}"><h3>${article.title}</h3></a>
              <p><a class="content_category" href="./search.html?kategori=${article.category}">${article.category}</a> | ${date}</p>
            </div>
          </div>
        `
      }
    }
  }else if (keyword) {
    header.innerHTML=`
    <a href="../">HOME</a> | <a>NEWS</a>
    <br>
    <hr>
    `
    headerDesc.innerHTML=`
    <div class="listHead_desc">
      <h3>Search Result: ${keyword}</h3>
    </div>
    <form method="get" class="listHead_form" action="../src/search.html">
      <input type="text" placeholder="Kata Kunci.." name="keyword" autocomplete="off">
      <button type="submit" class="listHead_btn">Search</button>
    </form>
    `

    for (article of articles){
      let date = dateFormat(article.createdAt);
      let searchTitle = article.title.toLowerCase();
      searchKeyword = keyword.toLowerCase();

      if(searchTitle.includes(searchKeyword)){
        content.innerHTML+=`
        <div class="card_news">
          <div class="card_head">
            <a class="card_link" href="./news_detail.html?id=${article.id}"></a>
            <img class="card_image" src=${originUrl}${article.urlImage} alt="">
        </div>
          <div class="card_content">
            <a href="./news_detail.html?id=${article.id}"><h3>${article.title}</h3></a>
            <p><a class="content_category" href="./search.html?kategori=${article.category}">${article.category}</a> | ${date}</p>
          </div>
        </div>
      `
      }
    }
  }else if (!index) {
    fetch(`${baseUrl}/articles/index`)
    .then(res => res.json())
    .then(data => renderContentIndex(data));
  }
}




function renderContentIndex(articles){
  let header = document.getElementById("searchHeader");
  let headerDesc = document.getElementById("listHead");
  let content = document.getElementById("listNews");
  let dateIndex = nowDate();
  
  header.innerHTML=`
  <a href="../">HOME</a> | <a>INDEX</a>
  <hr>
  `

  headerDesc.innerHTML=`
  <div class="listHead_desc">
    <h3>Index by: ${dateIndex}</h3>
  </div>
  `
  for (article of articles){
    let date = dateFormat(article.createdAt)
    content.innerHTML+=`
    <div class="card_news">
        <div class="card_head">
          <a class="card_link" href="./news_detail.html?id=${article.id}"></a>
          <img class="card_image" src=${originUrl}${article.urlImage} alt="">
      </div>
        <div class="card_content">
          <a href="./news_detail.html?id=${article.id}"><h3>${article.title}</h3></a>
          <p><a class="content_category" href="./search.html?kategori=${article.category}">${article.category}</a> | ${date}</p>
        </div>
      </div>
    `
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