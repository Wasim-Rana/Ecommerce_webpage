let uname=document.getElementById('uname')
let email= document.getElementById('email')
let pswd=document.getElementById('pswd')
let btn=document.getElementById('btn')
let registerddata= new Array()

btn.addEventListener('click',(e)=>{
    e.preventDefault()
   // console.log(email.value);
    //console.log(pswd.value);
    if (!uname.value || !email.value || !pswd.value) {
    alert('Please fill in all the details.')
    return
   }
    let jsondata=localStorage.getItem('registerddata')
    
    if(jsondata){
        registerddata=JSON.parse(jsondata)
        let userdetail=registerddata.find(Element=>Element.email===email.value)
        if(userdetail){
            alert('Email is already registered!')
        }
        else{
            registerddata.push({name:uname.value, email:email.value, password:pswd.value})
            localStorage.setItem('registerddata' ,JSON.stringify(registerddata))
            location.href='./login.html'
        }

    }
    else{
        if(email.value || pswd.value){
            registerddata.push({name:uname.value, email:email.value, password:pswd.value})
    localStorage.setItem('registerddata' ,JSON.stringify(registerddata))
    location.href='./login.html'
        }
        else{
            alert('fill the deatils ')
        }
    

    }
})
//localStorage.removeItem('registereddata')
console.log(registerddata);

