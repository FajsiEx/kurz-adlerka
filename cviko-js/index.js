var items = [
  {
    id: 0,
    name: "Item one",
    price: 12.20,
    description: "Lorem ipsum",
    rating: 4
  },
  {
    id: 1,
    name: "Item two",
    price: 12.20,
    description: "Lorem ipsum",
    rating: 4
  },
  {
    id: 2,
    name: "Item three",
    price: 12.20,
    description: "Lorem ipsum",
    rating: 4
  },
  {
    id: 3,
    name: "Item four",
    price: 12.20,
    description: "Lorem ipsum",
    rating: 4
  },
  {
    id: 4,
    name: "Item five",
    price: 12.20,
    description: "Lorem ipsum",
    rating: 1
  },
  {
    id: 5,
    name: "Item six",
    price: 12.20,
    description: "Lorem ipsum",
    rating: 4
  }
];

var cart = JSON.parse(sessionStorage.getItem("cart"));
cart = cart == null ? [] : cart;

generateCart();

function generateRating (rating) {
  var res = "";

  for (var i = 0; i < rating; i++) {
    res += "&#9733;";
  }
  for (i = rating; i < 5; i++) {
    res += "&#9734;";
  }

  return res;
}

items.forEach(function (value) {
  var elem = $('' +
    '<div class="col-lg-4 col-md-6 mb-4 js-item">\n' +
    '            <div class="card h-100">\n' +
    '              <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>\n' +
    '              <div class="card-body">\n' +
    '                <h4 class="card-title">\n' +
    '                  <a href="#">' + value.name + '</a>\n' +
    '                </h4>\n' +
    '                <h5>' + value.price + '€</h5>\n' +
    '                <p class="card-text">' + value.description + '</p>\n' +
    '                <button class="btn btn-primary js-add">Buy</button>\n' +
    '              </div>\n' +
    '              <div class="card-footer">\n' +
    '                <small class="text-muted">' + generateRating(value.rating) + '</small>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </div>');

  elem.appendTo("#products");
});

function round(num) {
  return Math.round(num * 100) / 100;
}

function generateCart() {
  var res = cart.reduce(function (acc, value) {
    return acc + '' +
      '<div class="list-group-item js-cart-item">' +
      value.num + 'x ' + value.name + ': ' +
      value.price + '€' +
      '<button class="btn btn-success js-add-cart">+</button>' +
      '<button class="btn btn-warning js-remove">-</button>' +
      '<button class="btn btn-danger js-delete">x</button>' +
      '</div>';
  }, "");
  $('#cart').html(res);
  var sum = cart.reduce(function (acc, value) {
    return acc + value.num * value.price;
  }, 0);
  $('#cart-total').html(round(sum));
}

$(document).on("click", '.js-add', function () {
  var i = $(this).parents('.js-item').index();

  var possibleCartItems = cart.filter(function (value) { return value.id === items[i].id });

  if(possibleCartItems.length > 0) {
    var cartIndex = cart.indexOf(possibleCartItems[0]);
    cart[cartIndex].num++;
  }
  else {
    var cartItem = items[i];
    cartItem.num = 1;
    cart.push(cartItem);
  }

  sessionStorage.setItem("cart", JSON.stringify(cart));

  generateCart();
});

$(document).on("click", '.js-remove', function () {
  var i = $(this).parents('.js-cart-item').index();

  cart = cart.map(function (value) {
    if(value.id !== cart[i].id) {
      return value;
    }
    else {
      value.num--;
      return value;
    }
  });

  sessionStorage.setItem("cart", JSON.stringify(cart));

  generateCart();
});

$(document).on("click", '.js-delete', function () {
  var i = $(this).parents('.js-cart-item').index();

  cart = cart.filter(function (value) { return value.id !== cart[i].id });

  sessionStorage.setItem("cart", JSON.stringify(cart));

  generateCart();
});

$(document).on("click", '.js-add-cart', function () {
  var i = $(this).parents('.js-cart-item').index();

  cart = cart.map(function (value) {
    if(value.id !== cart[i].id) {
      return value;
    }
    else {
      value.num++;
      return value;
    }
  });

  sessionStorage.setItem("cart", JSON.stringify(cart));

  generateCart();
});