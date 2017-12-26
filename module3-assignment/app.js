(function () {
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");




NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

  var nid = this;
  // nid.searchTerm = "";

  var promise = MenuSearchService.getMatchedMenuItems();

  promise.then(function (response) {
    nid.items = response.data;
    nid.items = nid.items["menu_items"];


  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http,ApiBasePath) {

  var service = this;

  service.getMatchedMenuItems = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
      // params: {
      //   category: searchTerm
      // }
    });

    return response;
  };

}

})();
