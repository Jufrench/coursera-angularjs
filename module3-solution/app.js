(function () {
'use strict';

angular.module('MenuApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiPath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


// ======== DIRECTIVE ==================
// =====================================
function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'narrowList.html',
    scope: {
      found: '<'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'ctrl',
    bindToController: true,
    onRemove: '&'
  };

  return ddo;
}

// ===== DIRECTIVE CONTROLLER =========
// ====================================
FoundItemsDirectiveController.inject = ['$scope', 'MenuSearchService'];
function FoundItemsDirectiveController($scope) {
  let direct = this;

  $scope.remove = index => {
    direct.found.splice(index, 1);
  };

  // $scope.nothingFound =

  // $scope.this.nothingFound = searchTerm => {
  //   let promise = MenuSearchService.getMatchedMenuItems();
  //   promise.then(response => {
  //     if (searchTerm === "") {
  //       console.log('yo');
  //     }
  //
  //     return searchTerm;
  //   });
  // };

}

// ===== Narrow CONTROLLER ============
// ====================================
NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];
function NarrowItDownController($scope, MenuSearchService) {
  const narrow = this;

  $scope.searchTerm = "";
  //var promise = MenuSearchService.getMatchedMenuItems();

  $scope.narrow.search = searchTerm => {
    MenuSearchService.getMatchedMenuItems(searchTerm).then(response => {
      $scope.narrow.found = response;
      console.log(response);
      console.log(searchTerm);
    });
  }

  $scope.narrow.empty = searchTerm => {
    MenuSearchService.getMatchedMenuItems(searchTerm).then(response => {
      if (response !== []) {
        return true;
      }
    });
  };
  // $scope.narrow.empty = searchTerm => {
  //   //return MenuSearchService.getMatchedMenuItems(searchTerm);
  //   MenuSearchService.getMatchedMenuItems(searchTerm).then(response => {
  //     if (searchTerm === "") {
  //       return false;
  //     }
  //   });
  // }


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
        if (searchTerm.length === 0) {
          return [];
        }
        const menuItems = response.data.menu_items;
        const found = menuItems.filter(menuItem => menuItem.name.includes(searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)));

        return found;

      })
      .catch(error => {
        console.log(error);
      });

      return response;
    };




  }

})();
