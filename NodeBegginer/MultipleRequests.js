function placeAnOrder(orderNumber) {

  console.log("Customer order: ",orderNumber);

  cookAndDeliverFood(function () {
    console.log("Delivery Food order: ",orderNumber);
  });
}

function cookAndDeliverFood(callback) {
  setTimeout(callback,5000);
}

placeAnOrder(1);
placeAnOrder(2);
placeAnOrder(3);
placeAnOrder(4);
placeAnOrder(5);
