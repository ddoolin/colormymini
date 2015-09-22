(function(){
  var app = angular.module('colorSearch', ['ngMaterial']);

  app.factory('ColorService', ['$q', '$http', function ($q, $http) {
    var deferred = $q.defer();

    $http.get('/js/colors.json')
      .success(function (colors) {
        deferred.resolve(colors);
      })
      .error(function (err) {
        console.log('Error getting colors.', err);
        deferred.reject(err);
      });

    return deferred.promise;
  }]);

  app.controller('ColorCtrl', ['$scope', 'ColorService', function ($scope, ColorService) {
    var self = $scope;
    self.colors = [];

    self.filterColors = function(searchText){
      searchText = searchText ? searchText.toLowerCase() : '';
      return self.colors.filter(function (color) {
        var colorName = color.name.toLowerCase();
        return colorName.indexOf(searchText) !== -1;
      });
    };

    self.selectColor = function(color){
      // console.log('SelectBank', color);
    };

    ColorService.then(function (colors) {
      self.colors = colors;
    }, function (err) {
      // TODO: Error, handle it
    });
  }]);
})();
