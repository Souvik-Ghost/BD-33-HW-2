let express = require('express');
let app = express();
let port = 3000;
app.listen(port, () => {});

let products = [
  { productId: 1, name: 'Laptop', inStock: true },
  { productId: 2, name: 'Phone', inStock: true },
  { productId: 3, name: 'Tablet', inStock: false }
];
let employees = [
  { employeeId: 1, name: 'Alice', active: true },
  { employeeId: 2, name: 'Bob', active: true },
  { employeeId: 3, name: 'Charlie', active: false }
];
let orders = [
  { orderId: 1, product: 'Laptop', delivered: false },
  { orderId: 2, product: 'Phone', delivered: true },
  { orderId: 3, product: 'Tablet', delivered: false }
];
let reservations = [
  { reservationId: 1, name: 'John', confirmed: false },
  { reservationId: 2, name: 'Jane', confirmed: true },
  { reservationId: 3, name: 'Jack', confirmed: false }
];
let subscriptions = [
  { subscriptionId: 1, service: 'Netflix', active: false },
  { subscriptionId: 2, service: 'Spotify', active: true },
  { subscriptionId: 3, service: 'Amazon Prime', active: false }
];

//1
function removeOutOfStockProducts(products) {
  return products.filter(product => product.inStock);
}
app.get('/products/remove-out-of-stock', (req, res) => {
  let result = removeOutOfStockProducts(products);
  products = result;
  res.json(result);
});
//products/remove-out-of-stock

//2
function updateEmployeeStatusById(employees, employeeId, active) {
  for (let i=0; i<employees.length; i++) {
    if (employees[i].employeeId === employeeId) {
      employees[i].active = active;
    }
  }
  return employees;
}
app.get('/employees/update', (req, res) => {
  let employeeId = parseInt(req.query.employeeId);
  let active = req.query.active === 'true';
  let result = updateEmployeeStatusById(employees, employeeId, active);
  res.json(result);
});
//employees/update?employeeId=1&active=false

//3
function updateOrderStatusById(orders, orderId, delivered) {
  for (let i=0; i<orders.length; i++){
    if (orders[i].orderId === orderId) {
      orders[i].delivered = delivered;
      break;
    }
  }
  return orders;
}
app.get('/orders/update', (req, res) => {
  let orderId = parseInt(req.query.orderId);
  let delivered = req.query.delivered === 'true';
  let result = updateOrderStatusById(orders, orderId, delivered);
  res.json(result);
});
//orders/update?orderId=1&delivered=true

//4
function removeUnconfirmedReservations(reservations) {
  return reservations.filter(reservation => reservation.confirmed);
}
app.get('/reservations/remove-unconfirmed', (req, res) => {
  let result = removeUnconfirmedReservations(reservations);
  reservations = result;
  res.json(result);
});
//reservations/remove-unconfirmed

//5
function updateSubscriptionStatusById(subscriptions, subscriptionId, active) {
  for (let i=0; i<subscriptions.length; i++) {
    if (subscriptions[i].subscriptionId === subscriptionId) {
      subscriptions[i].active = active;
      break;
    }
  }
  return subscriptions;
}
app.get('/subscriptions/update', (req, res) => {
  let subscriptionId = parseInt(req.query.subscriptionId);
  let active = req.query.active === 'true';
  let result = updateSubscriptionStatusById(subscriptions, subscriptionId, active);
  res.json(result);
});
//subscriptions/update?subscriptionId=1&active=true
