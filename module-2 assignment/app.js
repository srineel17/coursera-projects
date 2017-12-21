(function () {
  'use strict';


  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var tb = this;


    tb.items = ShoppingListCheckOffService.getItems1();

    tb.removeItem = function (itemIndex) {

      ShoppingListCheckOffService.removeItem(itemIndex);
    };




  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
  function AlreadyBoughtController(ShoppingListCheckOffService) {
      var ab = this;

      ab.items = ShoppingListCheckOffService.getItems2();
      ab.flag = ShoppingListCheckOffService.getFlag();
      ab.message = "Nothing bought yet.";


    }

  function ShoppingListCheckOffService() {
    var service = this;

    var ToBuy = [
      {
        name: "Milk",
        quantity: "2"
      },
      {
        name: "Donuts",
        quantity: "200"
      },
      {
        name: "Cookies",
        quantity: "300"
      },
      {
        name: "Chocolate",
        quantity: "5"
      },
      {
        name: "drinks",
        quantity: "6"
      }
    ];
    var AlreadyBought =[];
    var flag = true;
    service.getItems1 = function () {


      return ToBuy;

    };
    service.getItems2 = function () {

        return AlreadyBought;

    };

    service.removeItem = function (itemIdex) {

        var temp = ToBuy.splice(itemIdex, 1);
        AlreadyBought.push(temp[0]);
        flag = false;
    };

    service.getFlag = function () {
      return flag;
    };


  }

})();
