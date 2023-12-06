// Fetch News from API - Move it to api specifically for APIs
const baseUrl = 'https://dummyjson.com';

// Fetch Carousel
const fetchCarousel = async () => {
  const url = `${baseUrl}/products`;
  const res = await fetch(url);

  return res.json();
};

fetchCarousel()
.then((res) => {
  if (res) {
    const { products: listOfProducts } = res;

    if (listOfProducts.length > 0 || listOfProducts.length < 10) {
      // console.log(listOfProducts);
      const cardProduct = document.getElementById('cWrapper');
      cardProduct.innerHTML = listOfProducts.map((product) => {
        const {
          id,
          title,
          category,
          description,
          thumbnail,
          price,
          images,
        } = product;

        const thumbnaiImage = images[1];
        // console.log(thumbnaiImage);
        if(id <= 3){
        return (
          `
          <div class="inews_carousel">
            <img src="${thumbnaiImage}" alt="Inews">
            <div class="inews_content">
                <h2><a href="#">${description}</a></h2>
                <blockquote><a href="#">${category}</a></blockquote>
            </div>
          </div>
          `
        );
      }
      }).join('');
    }
  }
});

// Fetch Body News
const fetchLatest = async () => {
  const url = `${baseUrl}/products`;
  const res = await fetch(url);

  return res.json();
};

fetchLatest()
.then((res) => {
  if (res) {
    const { products: listOfProducts } = res;

    if (listOfProducts.length > 0 || listOfProducts.length < 10) {
      const cardProduct = document.getElementById('bodyNews');
      cardProduct.innerHTML = listOfProducts.map((product) => {
        const {
          id,
          title,
          category,
          description,
          thumbnail,
          price,
          images,
        } = product;

        const thumbnaiImage = images[1];

        if(id <= 5){
        return (
          `
          <div class="card_news">
          <div class="card_head">
            <a href="#"></a>
            <img class="card_image" src=${thumbnaiImage} alt="">
          </div>
          <div class="card_content">
            <a href="#"><h3>${description}</h3></a>
            <p><a class="content_category" href="#">${category}</a> | ${price}</p>
          </div>
        </div>
          `
        );
      }
      }).join('');
    }
  }
});