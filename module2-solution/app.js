(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
// =========================
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;


  toBuyList.toBuy = ShoppingListCheckOffService.getToBuy();

  toBuyList.removeItem = function (itemIndex) {
    var removedItem = ShoppingListCheckOffService.removeItem(itemIndex);
    ShoppingListCheckOffService.pushToBought(removedItem);
  }

  toBuyList.checkIfEmpty = function () {
    return ShoppingListCheckOffService.checkIfEmpty();
  }
}

// =========================
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;

  alreadyBought.bought = ShoppingListCheckOffService.getBought();

  alreadyBought.boughtNotEmpty = function () {
    return ShoppingListCheckOffService.boughtNotEmpty();
  }
}

// ======== SERVICE ===================
// ====================================
function ShoppingListCheckOffService() {
  var service = this;

  // List of items to buy
  var toBuy = [
    {
      name: "Cumin",
      quantity: 10
    },
    {
      name: "Berbere",
      quantity: 10
    },
    {
      name: "Cajun Spice",
      quantity: 10
    },
    {
      name: "Saffron",
      quantity: 10
    },
    {
      name: "Jerk Spice",
      quantity: 10
    }
  ];

  // List of items already bought
  var bought = [];

  service.getToBuy = function () {
    return toBuy;
  }

  service.getBought = function () {
    return bought;
  }

  service.removeItem = function (itemIndex) {
    return toBuy.splice(itemIndex, 1)[0];
    console.log(itemIndex);
  }

  service.checkIfEmpty = function () {
    if (toBuy.length <= 0) {
      return true;
    }
    return false;
  }

  service.boughtNotEmpty = function () {
    if (bought.length !== 0) {
      return false;
    }
    return true;
  }

  service.pushToBought = function (removedItem) {
    bought.push(removedItem);
    return bought;
  }
}

})();
