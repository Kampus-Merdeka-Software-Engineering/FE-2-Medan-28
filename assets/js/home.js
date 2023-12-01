// Fetch data on body News from API - Move it to api specifically for APIs
const baseUrl = 'https://dummyjson.com';

const fetchNews = async () => {
  const url = `${baseUrl}/products`;
  const res = await fetch(url);

  return res.json();
};

fetchNews()
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