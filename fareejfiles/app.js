var app = angular.module('Fareejportal', []);

app.factory('userService', function() {
return {
  getAuthorization: function() {
    return 'Authorized';
  }
}
});

app.config(function($httpProvider) {
  $httpProvider.interceptors.push(function(userService) {
    return {
      response: function(res) {
        /* This is the code that transforms the response. */
        res.data.meta =  "status: 000";
        return res;
      },

       request: function(req) {
        console.log("Before: "+ JSON.stringify(req));

    req.headers.Authorization =
      userService.getAuthorization(); // Setting authorization header for every ougoing request

      var $toastContent = $('<span> Added authrization header using interceptors to post request </span>');
      Materialize.toast($toastContent, 5000);

      console.log("After: "+ JSON.stringify(req));

    return req;
  }
    };
  });
});


app.controller('fareejcontrol', function($scope, $http) {
  $scope.sendinfo = function(){



    var $toastContent = $('<span> Posting data to fake rest api : "https://api.myjson.com/bins"</span>');
    Materialize.toast($toastContent, 4000);

  $http.post("https://api.myjson.com/bins", JSON.stringify($scope.user))
  .then(function(response) {


    var $toastContent = $('<span> Response recieved from server"</span>');
    Materialize.toast($toastContent, 5000);



      console.log(JSON.stringify(response.data));
      console.log(response.status);
      console.log(response.statusText);

      $scope.content = response.data;
      $scope.statuscode = response.status;
      $scope.statustext = response.statusText;



  });

}
});
