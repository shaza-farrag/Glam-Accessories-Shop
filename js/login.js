const email = document.querySelector("#email")
const pwd = document.querySelector("#pwd")

const loginBtn = document.querySelector("#loginBtn")

const userInfo = JSON.parse(localStorage.getItem("userInfo"))


loginBtn.addEventListener("click" , (e) => {
    e.preventDefault()
    if(!userInfo){
        alert("Please Creat An Account First")
    }
    else if( email.value.trim() === "" || pwd.value.trim() === "" ){
        alert("Please Enter your information")
    }else if ( email.value.trim() !== userInfo.email.trim() ||  pwd.value.trim() !== userInfo.pass.trim() ) {
        alert("Invalid Email Or Password")
    }else{
        localStorage.setItem("logedin" , "true")
        window.location = "index.html"
    }
})