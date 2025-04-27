// --- Firebase Configuration and Initialization ---
var firebaseConfig = {
    apiKey: "AIzaSyBoy7rGO2fi_eH8dIobdgTUcBXWyqyElbY",
    authDomain: "sahasraabharana-e9031.firebaseapp.com",
    databaseURL: "https://sahasraabharana-e9031-default-rtdb.firebaseio.com",
    projectId: "sahasraabharana-e9031",
    storageBucket: "sahasraabharana-e9031.firebasestorage.app",
    messagingSenderId: "181364738938",
    appId: "1:181364738938:web:83f0a5ff719362a899e4c3"
  };
    
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  
  // --- Fetch Products Function ---
  function fetchProducts() {
    const productsRef = database.ref('products');
    const productList = document.getElementById('product-list');
  
    productsRef.once('value', (snapshot) => {
      productList.innerHTML = ''; // Clear old content
  
      snapshot.forEach((childSnapshot) => {
        const product = childSnapshot.val();

        const productHTML = `
        <div class="product-box">
          <span class="p-discount">${product.discount}</span>
          <div class="p-img-container">
            <div class="p-img">
              <a href="#">
                <img src="${product.frontImage}" class="p-img-front" alt="front" />
                <img src="${product.backImage}" class="p-img-back" alt="back" />
              </a>
            </div>
          </div>
          <div class="p-box-text">
            <div class="product-category">
              <span>${product.category}</span>
            </div>
            <a href="#" class="product-title">${product.title}</a>
            <div class="price-buy">
              <span class="p-price">${product.price}</span>
              <a href="#" class="p-buy-btn">Buy Now</a>
            </div>
          </div>
        </div>
      `;

        productList.innerHTML += productHTML;
      });
  
      initializeGlider();
    });
  }
  
  // --- Initialize Glider Slider ---
  function initializeGlider() {
    new Glider(document.querySelector(".glider"), {
  slidesToScroll: 1,
  slidesToShow: 4,
  draggable: true,
  dots: ".dots",
  arrows: {
    prev: ".glider-prev",
    next: ".glider-next",
  },

  responsive: [
    {
      // screens greater than >= 775px
      breakpoint: 1200,
      settings: {
        // Set to `auto` and provide item width to adjust to viewport
        slidesToShow: 4,
        slidesToScroll: 2,
      },
    },
    {
      // screens greater than >= 1024px
      breakpoint: 0,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});
  }
  
  // --- Fetch products on page load ---
  window.onload = fetchProducts;
  