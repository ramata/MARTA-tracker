//hello van
// get user info ,
// add favorites (post)
// reorder favorites
//delete favorites
// UPDATE email address (with check for already taken)
// UPDATE username (with check for already taken)
// UPDATE password (with confirm password and current password)
// DELETE user (close account, with client side validation)
angular.module('martaApp')

.service('userService', function($http) {
  console.log('userService is working!');
  this.getUsers = function() {
    return $http.get("http://localhost:3000/users/");
  };
  this.getOneUser = function(id) {
    return $http.get("http://localhost:3000/users/" + id, {
      params: { id:id}
    });
  };

})

// test service for ngResource
.service('UsersService', function($resource){
  let vm = this;
  vm.users = $resource("http://localhost:3000/users/:id", {id:'@id'});
  vm.getUser = function(id){
      console.log('hello frm getUser');
      vm.user = users.get({id:currentUser.id});
      console.log('user is ', vm.user);
    };

  // return $resource("http://localhost:3000/users/:id");
})


// .controller('userController', function(userService){
//   console.log('hello from user contorlelr !');
//   userService.getUsers()
//   .then( (response) => {
//     this.users = response.data.users;
//     console.log(this.users);
//   })
//   .catch(function(err){
//     console.log('Error: ' + err);
//   });
//   userService.getOneUser('586d728a411f310a80930fa7')
//   .then( (response) => {
//     this.favorites = response.data.user.favorites;
//     console.log('this.favorites is ', this.favorites);
//   })
// })

//test controller
.controller('getUsersController', ['$resource', '$http', function($resource, $http, UsersService){
  var vm = this;
  var users = $resource("http://localhost:3000/users/:id", {id:'@id'});
  vm.getUser = function(id){
    vm.user = users.get({id:id},function(success){
      console.log('success', success);
    }, function(err){
      console.log('error:', err);
    });
    // vm.user.$promise.then(function(response){
    //   console.log(response);
    //   vm.foundUser = vm.user;
    // });
    console.log('foundUser is: ',vm.user);
  };

  // vm.getUser('587024073be0ce0b8d177128');
  // userService.getOneUser("5872e302551dae200b87733c")
  //  .then(function(response){
  //    vm.user = response.data;
  //    console.log('this.user is ', success);
  //  })
  //  .catch(function(err){
  //    console.log('err: ',err);
  //  });
  //this adds favorites
  this.postUser = function(){
    $http.post("http://localhost:3000/users/:id", {favorites:vm.favorites})
    .then(function(success){
      console.log(success);
    })
    .catch(function(err){
      console.log(err);
    })
  }

  this.removeThisFavorite = function(){
    $http.put("http://localhost:3000/users/:id", {nonFavorites:vm.removeFavorite})
    .then(function(success){
      console.log('success',success);
    })
    .catch(function(err){
      console.log('error:',err);
    })
  }
}]);
