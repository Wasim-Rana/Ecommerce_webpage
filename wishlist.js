document.addEventListener('DOMContentLoaded',()=>{
let uname= localStorage.getItem('registerddata')
// uname=JSON.parse(uname)
// console.log(uname);
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
let cartdata = JSON.parse(localStorage.getItem('cartdata')) || []
// console.log(cartdata);
let wishdata=JSON.parse(localStorage.getItem('wishdata'))
// console.log(wishdata);
let totalprice=0;
let product_block=document.getElementById('product-block')

if (wishdata.length === 0) {
    product_block.innerHTML = `<p>No products available in the wishlist.</p>`;
} else {
wishdata.forEach(element => {
    totalprice+=element.price
    product_block.innerHTML+=`
    <div>
    <img src=${element.images[0]} height='200px' width = '150px'>
    <p>${element.title}</p>
    <strong>Price : ${element.price} $</strong>
    <div>
    <button class = "crtbtn" id=${element.id}>Add to cart</button>
    <button class ="wishbtn" id=${element.id}> remove item </button>
    </div>
    </div>`
    product_block.style.alignItems="center"
    product_block.style.textAlign="center"
})
}
   //let wishdata=JSON.parse(localStorage.getItem('wishdata'))
    let wishbtn=document.getElementsByClassName('wishbtn')
    for (let i=0;i<wishbtn.length;i++){
        wishbtn[i].addEventListener('click',()=>{
            wishdata=wishdata.filter(element=>element.id!=parseInt(wishbtn[i].id))
            localStorage.setItem('wishdata',JSON.stringify(wishdata))
            wishbtn[i].parentElement.parentElement.style.display='none'
            if (wishdata.length === 0) {
                product_block.innerHTML = `<p>No products available in the wishlist.</p>`;
            }
            
        })
    }

    
     let crtbtn = document.getElementsByClassName('crtbtn');
            for(let i=0;i<crtbtn.length;i++){
                crtbtn[i].addEventListener('click', (e) => {
                    // console.log(crtbtn[i]);
                    // console.log(e);
                    e.stopPropagation(); 
                    let pid=parseInt(crtbtn[i].id)
                    let prdetails=wishdata.find(ele=>ele.id===pid)
                    cartdata.push(prdetails)
                    //cartdata.push(crtbtn[i].id)
                    // console.log(cartdata)
                    localStorage.setItem("cartdata" , JSON.stringify(cartdata))
                    crtbtn[i].disabled=true;
                    wishdata = wishdata.filter(element => element.id !== parseInt(crtbtn[i].id));
                    localStorage.setItem('wishdata', JSON.stringify(wishdata));
                    crtbtn[i].parentElement.parentElement.style.display = 'none';
                })
            }

    
})