const registerBtn = document.querySelector("#registerbtn")
const registerinfo = document.querySelectorAll(".register-form input")
let imptyFlag = false

registerBtn.addEventListener("click" , (e)=>{
    e.preventDefault()
    const user = {
            fname : `${registerinfo[0].value}`,
            lname : `${registerinfo[1].value}`,
            email : `${registerinfo[2].value}`,
            pass : `${registerinfo[3].value}`
        }
        if(user.fname && user.lname && user.email && user.pass ){
            localStorage.setItem("userInfo" , JSON.stringify(user))
            alert("Account created successfuly!")
            window.location.href = "login.html"
        }else{
            alert("Please Enter your information")
            return
        }
})
