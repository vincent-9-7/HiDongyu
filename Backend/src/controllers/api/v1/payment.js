const stripe = require("stripe")("sk_test_51IcU7EIhWqpXGeJaZVYKoKpKQIIYk3bRvwl7WvnnMuDJF30EmSjEyRIbywbRc1Rx5qvCmbYBx33lFG9Wq2UwMXif00eURX1acL");


const calculateOrderAmount = (items,price) => {
  let totalprice = price * 100 
  return totalprice
};


exports.paynow = async (ctx, next) => {
  const { items,price } = ctx.request.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items,price),
    currency: "aud"
  });
  ctx.body = {
    clientSecret: paymentIntent.client_secret
  };
}
