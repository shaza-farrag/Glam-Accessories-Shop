const hellomsg = document.querySelector("#hellomsg")
const userInfo = JSON.parse(localStorage.getItem("userInfo"))
hellomsg.innerHTML = `Hello, ${userInfo.fname}`

const logoutBtn = document.querySelector(".logout-btn")
logoutBtn.addEventListener("click" , (e) => {
    e.preventDefault()
    
    localStorage.clear()
    localStorage.setItem("userInfo" , JSON.stringify(userInfo))

    localStorage.setItem("logedin" , "false")
    window.location.href = "index.html"
})





// //////////////////////////////////////////////////////////
const numOfProductsDiv = document.querySelector("#numofproduct")
let numOfProducts = JSON.parse(localStorage.getItem("numOfProductsInCart")) || 0;
numOfProductsDiv.innerHTML = numOfProducts

// ///////////////////////////////////////////////////////////////

const semiCart = document.querySelector(".products-in-cart")
const cartLogo = document.querySelector(".cartlogo")

cartLogo.addEventListener("click" , () => semiCart.classList.toggle("d-none"))


// /////////////////////////////////////////////////////////////////
let products = JSON.parse(localStorage.getItem("products"))
let productsInCart = JSON.parse(localStorage.getItem("productsInCart"))
const parentCartDiv = document.querySelector(".parent-cart")
const totalPrice = document.querySelector(".totalPrice")

function drawProductsInCart(listInCart){
    listInCart = listInCart.map((id) => products.find((item) => item.id === id))
    let total = 0
    let x = listInCart.map((item , index) => {
        total += item.price*item.num
        return `
        <div class="cart-item col-sm-12 col-lg-5 d-flex gap-4 align-items-center mt-5 p-3">
                        <div class="cart-img cart-img-div-${item.id}">
                            <img src="Images/${item.name}.jpg" alt="">
                        </div><!--cart-img-->
                        <div class="cart-details d-flex flex-column gap-2">
                            <h4 class="card-title">${item.name}</h4>
                            <p class="">Category: ${item.category} </p>
                            <p class="">Price: ${item.price*item.num}$</p>
                            <div class="item-actions">
                                <button class="btn" onClick="addAndRemove(${item.id},'-',event)">-</button>
                                <span>${item.num}</span>
                                <button class="btn" onClick="addAndRemove(${item.id},'+',event)">+</button>
                                 <a href="#" class="btn btn-danger ms-5" onClick="removeFromCart(${item.id} , event)">Remove From Cart</a>
                            </div><!--/item-actions-->
                        </div><!--cart-details-->
                    </div><!--cart-item"-->

                     <div class="col-lg-2 ${index%2 === 0 ? "d-block" : "d-none"}"></div>
                    `
}).join("")

    totalPrice.innerHTML = `Total Price: ${total.toFixed(2)}$`
    parentCartDiv.innerHTML = 
    x + `<div class="emptymsgDiv">
                        <h5 class="emptymsg w-100 ps-4 pt-3 pb-4 d-none">Your cart is empty<h5>
                    </div>`

    const emptyMsg = document.querySelector(".emptymsg")

    if(productsInCart.length === 0){
        emptyMsg.classList.remove("d-none")
        parentCartDiv.classList.add("align-items-center")
    }else{
        emptyMsg.classList.add("d-none")
        parentCartDiv.classList.remove("align-items-center")
    }
}

drawProductsInCart(productsInCart)

function saveAndWrite(){
    numOfProductsDiv.innerHTML = numOfProducts
   
   localStorage.setItem("numOfProductsInCart", JSON.stringify(numOfProducts));
   localStorage.setItem("products", JSON.stringify(products))
   localStorage.setItem("productsInCart", JSON.stringify(productsInCart))

   drawProductsInCart(productsInCart)
}

function removeFromCart(id , e){
    e.preventDefault()
    let choosenItem = products.find((item) => item.id === id)
    productsInCart = productsInCart.filter((item) => item !== id)
    choosenItem.cart = "off"
    numOfProducts = numOfProducts-choosenItem.num

    saveAndWrite()
}

function addAndRemove(id,char,e){
    e.preventDefault()
    let choosenItem = products.find((item) => item.id === id)
   if(char === "+"){
    choosenItem.num = choosenItem.num + 1
    numOfProducts = numOfProducts + 1
   }else{
    choosenItem.num = choosenItem.num - 1
    numOfProducts = numOfProducts - 1
    if(choosenItem.num === 0){
       removeFromCart(id , event)
    }
   }
   saveAndWrite()
}

// /////////////////////////////////////////////////////////////////////////

const parentFav = document.querySelector(".parent-fav")
let favItems = (localStorage.getItem("favItems")) ? JSON.parse(localStorage.getItem("favItems")) : []

function DrawFavItems(){
    let listInFav = favItems.map((id) => products.find((item) => item.id === id))
    let x = listInFav.map((item , index) => {
        return `
        <div class="fav-item">
                        <div class="fav-img">
                            <img src="Images/${item.name}.jpg" alt="">
                        </div><!--fav-img-->
                        <div class="fav-detailes">
                            <h4 class="card-title mt-3">${item.name}</h4>
                            <p class="my-3">Category: ${item.category} </p>
                            <i class="fa-solid fa-heart text-danger" onClick="removeFromFav(${item.id} , ${index} , event)"></i>
                        </div><!--fav-detailes-->
                    </div><!--fav-item-->
        `
    }).join("")

    parentFav.innerHTML = x +`<div class="emptymsgDiv">
                        <h5 class="emptymsg2 w-100 ps-4 pt-3 pb-4 d-none">Your Favorite list is empty<h5>
                    </div>`

    const emptyMsg = document.querySelector(".emptymsg2")

    if(favItems.length === 0){
        emptyMsg.classList.remove("d-none")
        parentFav.classList.add("align-items-center")
    }else{
        emptyMsg.classList.add("d-none")
        parentFav.classList.remove("align-items-center")
    }

}
DrawFavItems()


function removeFromFav(id , index , e){
    e.preventDefault()
    let choosenItem = products.find((item) => item.id === id)
    favItems.splice(index,1)
    choosenItem.fav = "off"
    localStorage.setItem("products" , JSON.stringify(products))
    localStorage.setItem("favItems" , JSON.stringify(favItems))
    DrawFavItems()
}