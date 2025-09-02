const addToCartBtns = document.querySelectorAll(".parent-products .btn")
const addToFavBtns = document.querySelectorAll(".parent-products i")

const userDiv = document.querySelector(".user-div")
const registrationDiv = document.querySelector(".registration")
const hellomsg = document.querySelector("#hellomsg")
const userInfo = JSON.parse(localStorage.getItem("userInfo"))
const logoutBtn = document.querySelector(".logout-btn")


if(localStorage.getItem("logedin")==="true"){    
    userDiv.classList.remove("d-none")
    registrationDiv.classList.add("d-none")
    hellomsg.innerHTML = `Hello, ${userInfo.fname}`
}else{
    userDiv.classList.add("d-none")
    registrationDiv.classList.remove("d-none")
}

logoutBtn.addEventListener("click" , (e) => {
    e.preventDefault()
    
    // products = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : []
    localStorage.clear()
    localStorage.setItem("userInfo" , JSON.stringify(userInfo))
    // localStorage.setItem("products" , JSON.stringify(products))

    localStorage.setItem("logedin" , "false")
    window.location.reload()
})

// /////////////////////////////////////////////////////////////

const allProducts = document.querySelector(".parent-products")

let products = JSON.parse(localStorage.getItem("products")) || [
    {
        id : 1 ,
        name : "Butterfly Earrings",
        category : "Earrings",
        color : "Blue" , 
        price : 20,
        fav : "off",
        cart : "off",
        num : 0

    },
    {
        id : 2 ,
        name : "Heart Bracelet",
        category : "Bracelet",
        color : "Blue" , 
        price : 25,
        fav : "off",
        cart : "off",
        num : 0

    },
    {
        id : 3 ,
        name : "Butterfly Necklace",
        category : "Necklace",
        color : "Blue" , 
        price : 30,
        fav : "off",
        cart : "off",
        num : 0

    },
    {
        id : 4 ,
        name : "Green Earrings",
        category : "Earrings",
        color : "Green" , 
        price : 20,
        fav : "off",
        cart : "off",
        num : 0

    },
    {
        id : 5 ,
        name : "leafs Bracelet",
        category : "Bracelet",
        color : "Green" , 
        price : 25,
        fav : "off",
        cart : "off",
        num : 0

    },
    {
        id : 6 ,
        name : "Heart Necklace",
        category : "Necklace",
        color : "Green" , 
        price : 30,
        fav : "off",
        cart : "off",
        num : 0

    },
    {
        id : 7 ,
        name : "Butterfly Bracelet",
        category : "Bracelet",
        color : "Silver" , 
        price : 20,
        fav : "off",
        cart : "off",
        num : 0

    },
    {
        id : 8 ,
        name : "Silver Earrings",
        category : "Earrings",
        color : "Silver" , 
        price : 25,
        fav : "off",
        cart : "off",
        num : 0

    },
    {
        id : 9 ,
        name : "Silver Necklace",
        category : "Necklace",
        color : "Silver" , 
        price : 30,
        fav : "off",
        cart : "off",
        num : 0

    },
]

// /////////////////////////////// Products
function drawItems(arrOfProducts){
    let x = arrOfProducts.map((item) => {
        return `
        <div class="card card-${item.id} mt-5">
                        <div class="item-img">
                            <img class="card-img-top" src="Images/${item.name}.jpg" alt="Card image">
                        </div><!--/item-img-->
                        <div class="card-body">
                            <h4 class="card-title">${item.name}</h4>
                            <p class="">Price: ${item.price}$</p>
                            <p class="">Category: ${item.category} </p>
                            <div class="card-actions">
                                <i class="fa-solid fa-heart ${item.fav === "on" ? "text-danger" : "text-dark"}" onClick="addToFav(${item.id},event)"></i>
                                <a href="#" class="btn ${item.cart === "off" ? "btn-primary" : "btn-danger"}" onClick="addToCart(${item.id},event)">${item.cart === "off" ? "Add to Cart" : "Remove From Cart"}</a>
                            </div> <!--/card-actions-->
                        </div><!--/card-body-->
                    </div><!--/card-->
        `
    }).join("")
    
    let remainder = arrOfProducts.length % 3;
    let fillers = "";

    if (remainder > 0) {
        let emptyNeeded = 3 - remainder;
        for (let i = 0; i < emptyNeeded; i++) {
            fillers += `<div class="card invisible"></div>`;
        }
    }

    allProducts.innerHTML = x + fillers;
}
drawItems(products)

// //////////////////////////////////////// Products in cart
const productsInCartDiv = document.querySelector(".products-in-cart")

function drawInCart(listInCart){
    listInCart = listInCart.map((id) => products.find((item) => item.id === id))
    let x = listInCart.map((item) => {
        return `
        <div class="item-in-cart d-flex ps-2 pt-2 pe-2 pb-2 mt-2 gap-2">
                        <div class="first-col">
                            <h6>${item.name}</h6>
                            <div class="item-actions">
                                <button class="btn" onClick="addAndRemove(${item.id},'-',event)">-</button>
                                <span>${item.num}</span>
                                <button class="btn" onClick="addAndRemove(${item.id},'+',event)">+</button>
                            </div><!--/item-actions-->
                        </div><!--/first-col-->
                        <div class="second-col">
                            <h6>Price:</h6>
                            <h6>${(item.num)*(item.price)}$</h6>
                        </div><!--/second-col-->
                    </div><!--/item-in-cart-->
                    `
    }).join("")
    productsInCartDiv.innerHTML = 
    x + `<h5 class="emptymsg ps-4 pt-3 pb-2 d-none">Your cart is empty</h5> 
    <button class="btn w-100 showbtn"><a href="cart.html" class="">View All Products</a></button>`

    const emptyMsg = document.querySelector(".emptymsg")
    const emptyMsgDiv = document.querySelector(".emptymsgDiv")

    if(productsInCart.length === 0){
        emptyMsg.classList.remove("d-none")
    }else{
        emptyMsg.classList.add("d-none")
    }
}

let productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];
drawInCart(productsInCart)

const numOfProductsDiv = document.querySelector("#numofproduct")
let numOfProducts = JSON.parse(localStorage.getItem("numOfProductsInCart")) || 0;
numOfProductsDiv.innerHTML = numOfProducts

function addToCart(id,e){

    e.preventDefault()
    if(localStorage.getItem("logedin")==="true"){
        let choosenItem = products.find((item) => item.id === id)

        numOfProducts = (choosenItem.cart === "off") ? numOfProducts+1 : numOfProducts-choosenItem.num
        if (choosenItem.cart === "off"){
            choosenItem.num = 1
            productsInCart.push(id)
        }else{
            choosenItem.num = 0
            productsInCart = productsInCart.filter((item) => item !== id)
        }
        choosenItem.cart = (choosenItem.cart === "off") ? "on" : "off"
    
        numOfProductsDiv.innerHTML = numOfProducts
        localStorage.setItem("numOfProductsInCart", JSON.stringify(numOfProducts));
        localStorage.setItem("products", JSON.stringify(products))
        localStorage.setItem("productsInCart", JSON.stringify(productsInCart))

        drawItems(products)
        drawInCart(productsInCart)
    }else{
        window.location = "login.html"
    }

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
        productsInCart = productsInCart.filter((item) => item !== id)
        choosenItem.cart = "off"
        drawItems(products)
    }
   }
   numOfProductsDiv.innerHTML = numOfProducts
   
   localStorage.setItem("numOfProductsInCart", JSON.stringify(numOfProducts));
   localStorage.setItem("products", JSON.stringify(products))
   localStorage.setItem("productsInCart", JSON.stringify(productsInCart))

   drawInCart(productsInCart)
}

let favItems = JSON.parse(localStorage.getItem("favItems")) || []

function addToFav(id,e){

    e.preventDefault()
    if(localStorage.getItem("logedin")==="true"){
        let choosenItem = products.find((item) => item.id === id)
        if(choosenItem.fav === "off"){
            favItems.push(id)
        }else{
            favItems = favItems.filter((item) => item !== id)
        }
        choosenItem.fav = (choosenItem.fav === "off") ? "on" : "off"
        localStorage.setItem("products" , JSON.stringify(products))
        localStorage.setItem("favItems" ,JSON.stringify(favItems))
        drawItems(products)
        
    }else{
        window.location = "login.html"
    }

}


// /////////////////////////////////////////////////////////////

const mainSearch = document.querySelector("#mainSearch")
const searchChoice = document.querySelectorAll(".search-choice li a")
localStorage.setItem("Search" , "name")

searchChoice.forEach( (item) => {
    item.addEventListener("click" , () => {
        mainSearch.innerHTML = item.textContent
        prevItem = Array.from(searchChoice).find((item) => item.classList.contains("active"))
        item.classList.add("active")
        prevItem.classList.remove("active")
        localStorage.setItem("Search" , item.getAttribute("search"))
    })
})

const searchBar = document.querySelector("#searchBar")

searchBar.addEventListener("input" , () => {
    let searchKey = localStorage.getItem("Search")
    let searchValue = searchBar.value.toLowerCase().replace(/\s+/g, '')

    let filterdProducts = products.filter((item) => item[searchKey].toLowerCase().replace(/\s+/g, '').includes(searchValue))

    if(searchValue.trim() != ""){
        drawItems(filterdProducts)
    }else{
        drawItems(products)
    }
})


// //////////////////////////////////////////////////////

const semiCart = document.querySelector(".products-in-cart")
const cartLogo = document.querySelector(".cartlogo")

cartLogo.addEventListener("click" , () => semiCart.classList.toggle("d-none"))

// ///////////////////////////////////////////////////

