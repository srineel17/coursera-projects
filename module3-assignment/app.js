(function () {
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");




NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {

  var nid = this;
  nid.searchTerm = "";
  nid.showlist=[];

  // var promise = MenuSearchService.getMatchedMenuItems();

  nid.logMenuItems = function(searchTerm){
    var promise = MenuSearchService.getMatchedMenuItems();
    promise.then(function (response) {
      nid.items = response.data;
      nid.items = nid.items["menu_items"];
      for(var i = 0 ; i<nid.items.length;i++){
        if(nid.items.indexOf(searchTerm)!==-1){
          nid.showlist.push(nid.items[i]);
        }
      }
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http,ApiBasePath) {

  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
      // params: {
      //   category: searchTerm
      // }
    });

    return response;
    // .then(function (response) {
    //
    //   var temp = response.data["menu_items"];
    //   var foundItems = function(searchTerm){
    //
    //     var retarr = [];
    //     for(var i =0;i<temp.length; i++){
    //       if(temp[i]["description"].indexOf(searchTerm)!==-1){
    //         retarr.push(temp[i]);
    //       }
    //     }
    //     return retarr;
    //   }
    //   return foundItems;
    //
    // });
  };

}

})();
