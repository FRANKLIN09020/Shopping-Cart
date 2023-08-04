let cartIcon=document.querySelector(".cart-icon");
let cart=document.querySelector(".cart");
let close=document.querySelector("#close");

cartIcon.addEventListener('click',()=>{
    cart.classList.add('active')
});

close.addEventListener('click',()=>{
    cart.classList.remove('active')
});

//cart working js
if(document.readyState=="loading"){
    document.addEventListener("DOMContentLoaded",ready);
}else{
    ready();
}

//making function
function ready(){
    var removeCartButtons=document.getElementsByClassName("cart-remove");
    for (var i=0; i < removeCartButtons.length ; i++){
        var button=removeCartButtons[i];
        button.addEventListener('click',removeCartItem);
    }
    //quantity changes
    let quantityInputs=document.getElementsByClassName("cart-quantity");
    for(let i=0;i<quantityInputs.length;i++){
        let input=quantityInputs[i];
        input.addEventListener("change",quantityChanged);
    }
    //add to cart
    var addCart=document.getElementsByClassName("addcart");
    for(let i=0;i<addCart.length;i++){
        var button=addCart[i];
        button.addEventListener("click",addCartClicked);
    }
      //buy button work
      document.getElementsByClassName("btn-buy")[0].addEventListener("click",buyButtonClicked);
}
//buy button
function buyButtonClicked(){
    alert("Your order is placed");
    let cartContent=document.getElementsByClassName("cart-content")[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild); 
    }
    Updatetotal();
}
function removeCartItem(event){
    var buttonClicked=event.target;
    buttonClicked.parentElement.remove();
    Updatetotal();
}
//quantity changes
function quantityChanged(e){
   let input=e.target;
   if(isNaN(input.value)||input.value<=0){
    input.value=1;

   }

   Updatetotal();
}
//Add to cart
function addCartClicked(e){
   let button=e.target;
    let shopProducts=button.parentElement;
    let title=shopProducts.getElementsByClassName("product-title")[0].innerText;
    let price=shopProducts.getElementsByClassName("price")[0].innerText;
    let productImg=shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title,price,productImg);
    console.log( price);
    Updatetotal();
}
function addProductToCart(title,price,productImg){
    let cartShopBox=document.createElement("div");
    cartShopBox.classList.add("cart-box");
   var cartItems=document.getElementsByClassName('cart-content')[0];
   var CartItemsNames=cartItems.getElementsByClassName('cart-product-title');
   for(let i=0;i<CartItemsNames.length;i++){
    if(CartItemsNames[i].innerText==title){
     alert("You have already add this item to cart ");
    return;
    }
    
}

let cartBoxContent=` 
<img src="${productImg}" alt="" class="cart-img">
<div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number"  value="1" class="cart-quantity">
</div> 
<!--Remove cart-->
<i class="fa-regular fa-trash-can cart-remove" ></i>`;

cartShopBox.innerHTML= cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityChanged);

}
//updte total

function Updatetotal(){
    var cartContent=document.getElementsByClassName("cart-content")[0];
    var cartBoxes=cartContent.getElementsByClassName("cart-box");
    var total=0;
    for (var i=0; i < cartBoxes.length ; i++){
           var cartBox=cartBoxes[i];
           var priceElement=cartBox.getElementsByClassName("cart-price")[0];
           var quantityElement =cartBox.getElementsByClassName("cart-quantity")[0];
           var price=parseFloat(priceElement.innerText.replace("$",""));
           var quantity=quantityElement.value;
          total=total+price*quantity;
    }
        total=Math.round(total*100)/100;
        document.getElementsByClassName("total-price")[0].innerText="$"+total;
  
}