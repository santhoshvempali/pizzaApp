function cartController() {
  return {
    cart(req, res) {
      res.render("customer/cart");
    },
    update(req,res){

      // return res.json({data:"All ok"})
      if(!req.session.cart){
        req.session.cart={
          items:{},
          totalQty: 0,
          totalPrice: 0
        }
      }
      let cart=req.session.cart
      // console.log(req.body)
      if(!cart.items[req.body._id]){
        cart.items[req.body._id]={
          item: req.body,
          qty: 1

        }
        cart.totalQty=cart.totalQty+1
        cart.totalPrice=cart.totalPrice+parseInt(req.body.price)
      }
      else{
        cart.items[req.body._id].qty=cart.items[req.body._id].qty+1  
        cart.totalQty=cart.totalQty+1
        cart.totalPrice=cart.totalPrice+parseInt(req.body.price)
        console.log(typeof(cart.totalPrice))
        }
      return res.json({totalQty: req.session.cart.totalQty})
    }
  };
}

module.exports = cartController;
