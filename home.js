
let uname= localStorage.getItem('userfullname')
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
let cartdata = JSON.parse(localStorage.getItem('cartdata')) || [];
let wishdata = JSON.parse(localStorage.getItem('wishdata')) || [];

let fetchdata=async function() {
    let result= await fetch(
        "https://dummyjson.com/products"
    );
    let data =await result.json();
    displaydata(data)
}
fetchdata();

let product_block=document.getElementById('product-block')
let displaydata=(data)=>{
    data.products.forEach(element => {
        // console.log(element);
        // let cartdisabled='';
        // if(cartdata.length!=0){
        //     cartdata.forEach(element => {
        //         if(element.id===element.id){
        //             cartdisabled='disabled'
        //         }
        //     });
        // }
        let inCart = cartdata.some(item => item.id === element.id);
        let inWishlist = wishdata.some(item => item.id === element.id);
        let subdiv=document.createElement('div')
        subdiv.innerHTML=`<img src=${element.images} height='200px' width='150px'>
        <p>${element.title}</p>
        <strong>Price : ${element.price}$</strong>
        <div>
        <button class = 'wishbtn'${inWishlist ? 'disabled' : ''} id = ${element.id}> ADD to Wishlist </button>
        <button class ='crtbtn'${inCart ? 'disabled' : ''} id=${element.id}>ADD to Cart </button>
        </div>`
        product_block.appendChild(subdiv)

        //pop-up block 
        let popbox= document.getElementById('popup')
        subdiv.addEventListener('click',(e)=>{
            if(e.target.tagName.toLowerCase()!=='button'){
                popbox.style.display='flex';
                popbox.innerHTML=
                `<div>
                <img src= ${element.images[0]} height ='250px' width ='200px'>
                <h2>${element.title}</h2>
                <p>${element.description}</p>
                <strong> Price : ${element.price} $</strong>
                <strong> Rating : ${element.rating}/5</strong>
                <button id='clsbtn'>Close</button>
    
                </div>`;
    
                let clsbtn=document.getElementById('clsbtn')
                clsbtn.addEventListener('click' , ()=>{
                    popbox.style.display='none'
                })
                
            }
            

        })
     });
     let crtbtn = document.getElementsByClassName('crtbtn');
        // console.log(crtbtn);
        for (let index = 0; index < crtbtn.length; index++) {
            crtbtn[index].addEventListener('click', (e) => {
                // console.log("Add to Cart Button");
                e.stopPropagation();
                // console.log(crtbtn[index]);
                 let pid=parseInt(crtbtn[index].id)
                 let products=data.products.find(ele=>ele.id===pid);
                 if(products){
                    cartdata.push(products)
                    // console.log(cartdata)
                    localStorage.setItem("cartdata" , JSON.stringify(cartdata))
                    crtbtn[index].disabled=true;
                    }
                // localStorage.clear()
            });
        }

        let wishbtn = document.getElementsByClassName('wishbtn')
        console.log("wishbtn: ", wishbtn);
        for(let i=0;i<wishbtn.length;i++){
            wishbtn[i].addEventListener('click',(e)=>{
                e.stopPropagation();
                let pid=parseInt(wishbtn[i].id)
                let products=data.products.find(ele=>ele.id===pid);
                wishdata.push(products)
                console.log("WishlistData: ",wishdata);
                localStorage.setItem('wishdata', JSON.stringify(wishdata))
                wishbtn[i].disabled=true
            })
        }
            // cartdata.push(element);
            // localStorage.setItem('carttdata', JSON.stringify(cartdata));
    

            

 
    
}


// console.log(cartdata);















// document.getElementById('backToTopLink').addEventListener('click', function(event) {
//     event.preventDefault();
//     window.scrollTo({ top: 0, behavior: 'smooth' });
// });
// })
//console.log(document.getElementById('backToTopLink'));
//  let backToTopLink = document.getElementById("backToTopLink");
//     window.onscroll = function() {
//     scrollFunction();
//     };

// function scrollFunction() {
//     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//         backToTopLink.style.display = "block";
//     } else {
//         backToTopLink.style.display = "none";
//     }
// }

// backToTopLink.addEventListener("click", function(event) {
//     event.preventDefault();
//     document.documentElement.scrollTop = 0;
// });


       
