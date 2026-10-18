document.addEventListener('DOMContentLoaded',()=>{
    const products =[//dynamically object created in JS
        {id:1,name:'Product 1', price:29.99},
        {id:2,name:'Product 2',price:19.99},
        {id:3,name:'Product 3',price:59.99},
    ];
    const cart = []; 
    const Productlist= document.getElementById("Product-list");
    const cartItems= document.getElementById("cart-items");
    const emptyCartMessage= document.getElementById("empty-cart");
    const cartTotalMessage= document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

products.forEach((Product)=>{
     const ProductDiv=document.createElement('div');
     ProductDiv.classList.add('Product')
     ProductDiv.innerHTML=`<span> ${Product.name} - ${Product.price.toFixed(2)}</span>
     <button data-id ="${Product.id}"> Add to Cart</button>
      <button class="remove-btn" data-id="${Product.id}">Remove</button>
      `;
     
     Productlist.appendChild(ProductDiv)
});
Productlist.addEventListener('click',(e)=>{
  if (e.target.tagName==='BUTTON'){
    const ProductID = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p=>p.id===ProductID);
    // addToCart(product);
    if(e.target.classList.contains('remove-btn')){
      removeFromCart(ProductID);
    }
    else if(e.target.tagName==="BUTTON"){
      addToCart(product);
    }
  }
});

function removeFromCart(ProductID){
  const index=cart.findIndex(
    item=>item.id===ProductID
  );
  if(index!==-1){
    cart.splice(index,1);
  }
  renderCart();
}
function addToCart(product) {
    cart.push(product);
    renderCart();
}
function renderCart(){
  cartItems.innerText="";
  let totalPrice=0;
  if(cart.length>0){
    emptyCartMessage.classList.add('hidden');
    cartTotalMessage.classList.remove('hidden');
    cart.forEach((item)=>{
      totalPrice+=item.price;
      const cartItem=document.createElement('div');
      cartItem.innerHTML=`${item.name} - ${item.price.toFixed(2)}`;
      cartItems.appendChild(cartItem);

      totalPriceDisplay.textContent=`${totalPrice.toFixed(2)}`;
    });
  }
      else {
        emptyCartMessage.classList.remove('hidden');
        totalPriceDisplay.textContent=`$0.00`;
       } }

checkOutBtn.addEventListener('click',()=>{
  cart.length=0;
   alert("Checkout successfully");
    renderCart();
  });
});