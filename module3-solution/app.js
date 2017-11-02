(function () {
'use strict';

angular.module('MenuApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiPath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


// ======== DIRECTIVE =================
// ====================================
function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'narrowList.html',
    scope: {
      found: '<'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'ctrl',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController($scope) {

  $scope.remove = (index) => {
    this.found.splice(index, 1);
  };
}

// ======== Narrow CONTROLLER =========
// ====================================
NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
function NarrowItDownController($scope, MenuSearchService) {
  const narrow = this;

  $scope.searchTerm = "";
  //var promise = MenuSearchService.getMatchedMenuItems();

  $scope.narrow.search = searchTerm => {
    //return MenuSearchService.getMatchedMenuItems(searchTerm);
    MenuSearchService.getMatchedMenuItems(searchTerm).then((response) => {
      $scope.narrow.found = response;
      console.log(response);
    })
  }

}
// ======== SERVICE ===================
// ====================================
MenuSearchService.$inject = ['$http', 'ApiPath'];
  function MenuSearchService($http, ApiPath) {
    const service = this;

    service.getMatchedMenuItems = (searchTerm) => {
      let response = $http({
        method: "GET",
        url: (ApiPath + "/menu_items.json")
      })
      .then(response => {
        const menuItems = response.data.menu_items;
        const found = menuItems.filter(menuItem => menuItem.name.includes(searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)));
        // for (let i = 0; i < menuItems.length; i++) {
        //   if(menuItems[i].name.includes(searchTerm)) {
        //     found.push(menuItems[i]);
        //   }
        // }

        console.log(found);
        console.log(searchTerm);
        return found;

      })
      .catch(error => {
        console.log(error);
      });

      return response;
    };
  }

})();
