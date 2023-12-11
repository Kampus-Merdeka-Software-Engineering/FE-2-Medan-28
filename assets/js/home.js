// Fetch News from API - Move it to api specifically for APIs
const baseUrl = 'https://medan-28-backend.up.railway.app';

// Fetch Carousel
// ------------------------
fetch(`${baseUrl}/articles`)
.then(res => res.json())
.then(data => renderCarousel(data));

function renderCarousel(items){
  
  // get element content
  let fullContent = document.getElementById("mainHead_item");
  let subContent = document.getElementById("subHead_item");
  let content = document.getElementById("cWrapper");
  // let id = 1;

  for (item of items.slice(0,3)){
    let date = dateFormat(item.createdAt);
    content.innerHTML+=`
        <div class="inews_carousel">
          <a href="./src/news_detail.html?id=${item.id}"><img src="..${item.urlImage}" alt="Inews"></a>
          <div class="inews_content">
              <h2><a href="./src/news_detail.html?id=${item.id}">${item.title}</a></h2>
              <blockquote><a href="./src/search.html?kategori=${item.category}">${item.category}</a></blockquote>
          </div>
        </div>
        
    `
    // Getting Trending News 1
    if(items[0]){
      let News1 = items[0];
      fullContent.innerHTML=`
      <img src="..${News1.urlImage}" />
      <div class="item_content">
        <div class="title_content">
          <a href="./src/news_detail.html?id=${News1.id}">${News1.title}</a>
        </div>
        <span class="content_category">
          <a href="./src/search.html?kategori=${News1.category}">${News1.category}</a>
        </span>
      </div>
      `
    }
  }

  // Getting Sub Trending News
  for (item of items.slice(1,3)){
    let date = dateFormat(item.createdAt);
    subContent.innerHTML+=`
      <div class="item_news">
        <img src="..${item.urlImage}"/>
        <div class="item_content">
          <div class="title_content">
            <a href="./src/news_detail.html?id=${item.id}">${item.title}</a
            >
          </div>
          <span class="content_category">
            <a href="./src/search.html?kategori=${item.category}">${item.category}</a>
          </span>
        </div>
      </div>
    `
  }
}

// Fetch Body News
fetch(`${baseUrl}/articles/index`)
.then(res => res.json())
.then(data => renderBodyNews(data));

function renderBodyNews(articles){
    // get element content
    let content = document.getElementById("bodyNews");
    let id = 1;

    for (article of articles.slice(0, 4)){
      let date = dateFormat(article.createdAt)
      content.innerHTML+=`
      <div class="card_news">
          <div class="card_head">
            <a class="card_link" href="./src/news_detail.html?id=${article.id}"></a>
            <img class="card_image" src="..${article.urlImage}" alt="">
        </div>
          <div class="card_content">
            <a onclick="redirectToDetail(${article.id})"><h3>${article.title}</h3></a>
            <p><a class="content_category" onclick="redirectToSearch('${article.category}')">${article.category}</a> | ${date}</p>
          </div>
        </div>
      `
      id++;
    }
}

function redirectToDetail(newsId) {
  // You can use window.location.href to redirect to the detail page
  window.location.href = './src/news_detail.html?id=' + newsId;
}

function redirectToSearch(newsCategory) {
  // You can use window.location.href to redirect to the detail page
  window.location.href = './src/search.html?kategori=' + newsCategory;
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