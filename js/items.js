// --- Firebase Configuration ---
const firebaseConfig = {
    apiKey: "AIzaSyBoy7rGO2fi_eH8dIobdgTUcBXWyqyElbY",
    authDomain: "sahasraabharana-e9031.firebaseapp.com",
    databaseURL: "https://sahasraabharana-e9031-default-rtdb.firebaseio.com",
    projectId: "sahasraabharana-e9031",
    storageBucket: "sahasraabharana-e9031.firebasestorage.app",
    messagingSenderId: "181364738938",
    appId: "1:181364738938:web:83f0a5ff719362a899e4c3"
  };
  
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  let allProducts = [];
  
  function fetchProducts() {
    const productsRef = database.ref('products');
    const productList = document.getElementById('product-list');
  
    productsRef.once('value', (snapshot) => {
      productList.innerHTML = '';
      allProducts = []; // Reset array
  
      snapshot.forEach((childSnapshot) => {
        const product = childSnapshot.val();
        if (!product) return; // Skip null entries
  
        // Clean price
        const cleanedPrice = parseFloat(product.price.toString().replace(/[^\d.]/g, '')) || 0;
        
        // Clean discount
        const discountValue = parseFloat(product.discount.toString().replace(/[-%]/g, '')) || 0;
  
        let discountedPrice = cleanedPrice;
        if (discountValue > 0) {
          discountedPrice = cleanedPrice - (cleanedPrice * discountValue / 100);
        }
  
        allProducts.push({
          ...product,
          cleanedPrice,
          discountValue,
          discountedPrice
        });
      });
  
      renderProducts(allProducts);
    });
  }
  
  function renderProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
  
    products.forEach(product => {
      const productHTML = `
        <div class="product-box">
          <span class="p-discount">-${product.discountValue}%</span>
          <div class="p-img-container">
            <img src="${product.frontImage}" alt="front">
            <img src="${product.backImage}" alt="back">
          </div>
          <div class="p-box-text">
            <div class="product-category">${product.category}</div>
            <div class="product-title">${product.title}</div>
            <div class="price-buy">
              <span class="p-priceoriginal">₹${product.cleanedPrice.toFixed(2)}</span>
              <span class="p-pricediscounted">₹${product.discountedPrice.toFixed(2)}</span>
            </div>
            <a href="#" class="p-buy-btn">Buy Now</a>
          </div>
        </div>
      `;
      productList.innerHTML += productHTML;
    });
  }
  
  function filterProducts(category) {
    if (category === 'All') {
      renderProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product => product.category === category);
      renderProducts(filtered);
    }
  }
  
  fetchProducts();