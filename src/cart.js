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

        console.log(search);

        return `<div class="cart-item">
          
          <img width="100" src="${search.img}" alt=""/>    

          <div class="details">
          
          <div class="title-price-x">

          <h4 class="title-price">
         <p>${search.name}</p>   
          <p class="cart-item-price">$${search.price}</p> 
          </h4>

          <i class="fa-solid fa-minus" onclick="removeItem(${id})"></i>
     

          </div>   



         <div class="buttons">
            <i class="fa-solid fa-minus" onclick="decrement(${id})"></i>
            <div id=${id} class="quantity">  ${item}</div>
            
            <i class="fa-solid fa-plus"  onclick="increment(${id})"></i>
            </div>

            <h3>${item * search.price}</h3>
          </div>   

        </div>
          
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

const increment = (id) => {
  let selectedItem = id;

  let search = basket.find((item) => item.id === selectedItem.id);
  if (!search) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  console.log(basket);

  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
  update(selectedItem.id);
};

const decrement = (id) => {
  let selectedItem = id;

  let search = basket.find((item) => item.id === selectedItem.id);

  if (!search) return;
  if (search.item == 0) return;
  else {
    search.item -= 1;

    basket = basket.filter((x) => x.item);
    update(selectedItem.id);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
  }
};

const update = (id) => {
  let search = basket.find((x) => x.id === id);

  if (search) {
    document.getElementById(id).innerHTML = search.item;
  } else {
    document.getElementById(id).innerHTML = 0;
  }
  calculation();
  totalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;

  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  totalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map(({ item, id }) => {
        let search = shopItemsData.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((acc, curr) => acc + curr, 0);
    label.innerHTML = `<h2>Total Bill : $${amount}</h2>
    
    <button class="checkout">Checkout</button>
    <button class="removeAll">Clear Cart</button>
    
    `;
  }
};
totalAmount();
