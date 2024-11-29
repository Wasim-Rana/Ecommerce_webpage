let uname= localStorage.getItem('userfullname')

//console.log(uname[0].name);
let ublock=document.getElementById('uname')
ublock.innerHTML=`<p>Hello ${uname}</p>`

let picon= document.getElementById('profile-icon');
let pblock=document.getElementById('profile-details')
picon.addEventListener('click' ,() =>{
    
    pblock.style.display='block'
})

let pclose=document.getElementById('close')
pclose.addEventListener('click',()=>{
    pblock.style.display='none'
})

let btn=document.getElementById('btn')
btn.addEventListener('click',()=>{
    location.href='./login.html'
})

// let fetchdata=async function() {
//     let result= await fetch(
//         "https://api.escuelajs.co/api/v1/products"
//     );
//     let data =await result.json();
//     displaydata(data)
    


// }

// fetchdata();

let cartdata=JSON.parse(localStorage.getItem('cartdata'))
console.log("CartData: ",cartdata);
let totalprice=0
//localStorage.clear(cartdata)
let product_block=document.getElementById('product-block')
cartdata.forEach (element => {
    // console.log("element: ", element);
    totalprice+=element.price
    // console.log(element);
    product_block.innerHTML+=`
    <div>
    
    <img src=${element} height='200px' width = '150px'>
    <p>${element.title}</p>
    <strong>Price : ${element.price} $</strong>
    <div>
    <button>Wishlist</button>
    <button class ="crtbtn" id=${element.id}>remove </button>
    </div>
    </div>`
    product_block.style.alignItems="center"
    product_block.style.textAlign="center"
   // let cartdata = JSON.parse(localStorage.getItem('cartdata')) || [];
    let crtbtn=document.getElementsByClassName('crtbtn')
    for (let i=0;i<crtbtn.length;i++){
        crtbtn[i].addEventListener('click',()=>{
            cartdata=cartdata.filter(element=>element.id!=parseInt(crtbtn[i].id))
            localStorage.setItem('cartdata',JSON.stringify(cartdata))
            crtbtn[i].parentElement.parentElement.style.display='none'
        })
    }
        
    let price=document.createElement('h3')
    price.innerHTML=`Total price=${totalprice}`
    product_block.appendChild(price)

    let checkout=document.getElementById('checkout')
    checkout.innerHTML='<button> Check Out </button>'

});

// localStorage.removeItem("cartdata");
