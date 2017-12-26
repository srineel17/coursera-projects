(function() {
  var NarrowItDownApp = angular.module('NarrowItDownApp', []);
  NarrowItDownApp.controller('NarrowItDownController', NItDownController);
  NarrowItDownApp.service('MenuSearchService', MenuSearchService);
  NarrowItDownApp.directive('foundItems', FoundItems);

  // service
  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: 'GET',
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
      }).then(function (result) {
        let foundItems = [];
        let menuItems = result.data.menu_items;
        for ( let i = 0; i < menuItems.length; i++) {
          if ( searchTerm !== '' && menuItems[i].description.indexOf(searchTerm) !== -1 ) {
            foundItems.push({
              short_name : menuItems[i].short_name,
              name : menuItems[i].name,
              description : menuItems[i].description
            });
          }
        }
        return foundItems;
      }, function (error) {
          console.log(error);
      });
    };
  }

  // controller
  NItDownController.$inject = ['$scope', 'MenuSearchService'];
  function NItDownController($scope, MenuSearchService) {
    var nid = this;
    nid.searchTerm = '';
    nid.found = [];
    nid.totalItems = -1;
    nid.remove = function (index) {
      nid.found.splice(index,1);
      nid.totalItems = nid.found.length;
    };

    nid.narrowItems = function () {
      nid.found = [];
      nid.totalItems = -1;
      MenuSearchService.getMatchedMenuItems(nid.searchTerm).then(function(result) {
        nid.found = result;
        nid.totalItems = nid.found.length;
        nid.searchTerm = '';
      });
    }
  }

  // directive
  function FoundItems() {
    let ddo = {
      templateUrl: 'items.html',
      restrict: 'E',
      scope: {
        'foundItems' : '<',
        'totalItems' : '<',
        'onRemove' : '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'foundItemsDC',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController() {
    var foundItemsDC = this;

    foundItemsDC.hasItems = function () {
      return foundItemsDC.totalItems > 0;
    };

    foundItemsDC.hasNoItems = function () {
      return foundItemsDC.totalItems === 0;
    };
  }
})();
