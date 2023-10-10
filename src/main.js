const shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map(({ name, id, price, desc, img }) => {
      let search = basket.find((item) => item.id === id) || [];
      return `<div class="item" id="product-id-${id}">
         <img src="${img}" width="220" alt="" />
         <div class="details">
         <h3>${name}</h3>
         <p>${desc}</p>
         
         <div class="price-quantity">
         <h2>${price}</h2>
         <div class="buttons">
         <i class="fa-solid fa-minus" onclick="decrement(${id})"></i>
         <div id=${id} class="quantity">${
        search.item == undefined ? 0 : search.item
      }</div>
         
         <i class="fa-solid fa-plus"   onclick="increment(${id})"></i>
         </div>
         </div>
         </div>
         </div>`;
    })
    .join(""));
};

generateShop();

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
};

const calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.reduce((acc, curr) => acc + curr.item, 0);
};
calculation();
