(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunches = "";

  $scope.checkIfTooMuch = () => {
    var lunchAmount = $scope.lunches;
    var res = lunchAmount.split(",");
    if (res.length < 4 && lunchAmount !== "") {
      $scope.display = "Enjoy!";
    } else if (lunchAmount === "" && lunchAmount.length === 0) {
      $scope.display = "Please enter data first";
      // I do NOT consider an empty item, i.e., , , as an item towards to the count.
    } else {
      $scope.display = "Too Much!";
    }
  };
}

})();
