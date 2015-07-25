(function() {
  angular.module('hashtrax.controllers.buy', [])
  .controller('BuyCtrl', function($scope, $http) {
    $(document).ready(function() {
        $('select').material_select();
    });
    $scope.test = 'Test string';

    function stripeResponseHandler(status, response) {
      if (response.error) {
      } else {
        var user = $scope.user
        user.token = response.id;

        $http.post("http://api.hashtrack.us/theMoney", user)
          .success(function() {
            console.log(user);
          })
          .catch(function(err) {
            console.log(err);
          })
      }
    };

    $scope.stripeToken = function() {
      event.preventDefault();
      var $form = angular.element("#payment-form");

      // Disable the submit button to prevent repeated clicks
      $form.find('button').prop('disabled', true);

      Stripe.card.createToken($form, stripeResponseHandler);

      // Prevent the form from submitting with the default action
      return false;
    };
  });
})();
