
var paypal = requiere('paypal-rest-sdk')
//configuracion de paypal
paypal.configure({
    'mode': 'sandbox', //PUEDE SER LIVE TAMBIEN
    'client_id': 'el cliente id que tengamos',
    'client_secret' : 'el cliente secret'
});

export function makeapayment(product_name, product_price,product_moneda,calidad){
    var payment ={
        "intent": "sale",
        "payer": {
          "payment_method": "paypal"
        },
        "redirect_urls": {
          "return_url": "http://localhost:3000/payment/success",
          "cancel_url": "http://localhost:3000/payment/cancel"
        },
        "transactions": [{
            "amount": {
              "total": precio,
              "currency": moneda
            },
            "description": nombreProducto,
            "item_list": {
              "items": [{
                "name": nombreProducto,
                "price": precio,
                "currency": moneda
              }]
            }
           }]

    }
    paypal.payment.create(payment, function (error, payment) {
        if (error) {
          throw error;
        } else {
          console.log("Pago realizado con exito, muchas gracias");
          console.log(payment);
        }
      });

}

//un ejemplo para crear el pago aseria
//makeapayment('Mi Producto', '10.00','USD')
