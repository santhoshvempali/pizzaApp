import axios from 'axios'
import Noty from "noty"
let addtoCart = document.querySelectorAll('.add-to-cart');
let cartcounter=document.querySelector("#cartcounter")

function updateCart(pizza){
    axios.post("/update-cart",pizza).then(res =>{
        cartcounter.innerText=res.data.totalQty
        new Noty({
            type: "success",
            text: "item added to cart",
            timeout: 1000,
            progressBar: false
        }).show()
    }).catch(err =>{
        new Noty({
            type: "error",
            text: "Error in adding to cart",
            timeout: 1000,
            progressBar: false
        }).show()
    })
}
addtoCart.forEach((btn) => {
    btn.addEventListener('click',(e)=>{
        let pizza=JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    })
});