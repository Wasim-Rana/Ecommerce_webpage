let registerddata=JSON.parse(localStorage.getItem('registerddata'))
console.log(registerddata)

let email=document.getElementById('email')
let pswd= document.getElementById('pswd')
let btn= document.getElementById('btn')

btn.addEventListener('click',(e)=>{
    e.preventDefault()
    let userdata=registerddata.find(Element=>Element.email===email.value && Element.password===pswd.value)
    if(userdata){
        alert('login successful ! ');
        location.href='./index.html';
        localStorage.setItem('userfullname', userdata.name)
    }
    else{

        alert('user not found! please write the email or password correctly!')
    }
    
    
})
//localStorage.clear(registerddata)
console.log(registerddata);
