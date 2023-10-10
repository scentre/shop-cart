let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

const calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.reduce((acc, curr) => acc + curr.item, 0);
};
calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map(({ item, id }) => {
        let search = shopItemsData.find((y) => y.id == id) || [];

        return `<div class="cart-item">
          
          <img src=""/>    
          
          </div>`;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
        
        <h2>Cart is Empty</h2>
        <a href="index.html">
        
        <button class="HomeBtn">
        
        Back To Home
        </button>
        
        </a>   
        `;
  }
};
generateCartItems();
