'use strict';

/* Services */

angular.module('adminServices', ['ngResource'])
.factory('LocationCar', function($resource){
	var RentalLocation = $resource('/api/rentallocation/:locationId', {
			locationId: '@locationId'
		}, {
			'query':  {
				method:'GET',
				isArray: true
			}
		}),
		RentalCar = $resource('/api/rentallocation/:rentallocation_id/rentalcar/:id', {
			id: '@angularShortId',
			rentallocation_id: '@rentallocation_id'
		}, {
			'query':  {
				method:'GET',
				isArray: true
			}
		});
  	return { Location: RentalLocation, Car: RentalCar };
});


angular.module('userServices', ['ngResource', 'ngCookies', 'ui.bootstrap'])
.factory('User', function($resource, $cookieStore, $location, $dialog){
	var User,
		UserResource = $resource('/api/user/find', {
			email: '@email',
			password: '@password'
		}, {
			find: {
				method: 'GET',
				isArray: true
			}
		}),
		loginInfo = {
			loggedIn: $cookieStore.get("loggedIn") || "false",
			user: $cookieStore.get("user") || {}
		};
	User = {
		login: function (email, password) {
			var users = UserResource.find({email: email, password: password});
			users.$then(function () {
				if(users.length === 1) {
					loginInfo.loggedIn = "true";
					loginInfo.user = users[0];
					$cookieStore.put('user', users[0]);
					$cookieStore.put('loggedIn', "true");
				}
			});
			return loginInfo;
		},
		logout: function () {
			loginInfo.loggedIn = "false";
			loginInfo.user = {};
			$cookieStore.remove('user');
			$cookieStore.put('loggedIn', "false");
			$location.path('/home');
			return loginInfo;
		},
		getLoginInfo: function (redirect) {
			var title, msg, btns;
			if (redirect && loginInfo.loggedIn !== "true") {
				title = 'Nicht angemeldet';
		  		msg = 'Bitte melde dich erst an!';
		  		btns = [{result:'ok', label: 'OK', cssClass: 'btn-primary'}];
		  		$dialog.messageBox(title, msg, btns)
			    	.open()
			    	.then(function(result){
			    		$location.path('/home');
			    	});
			}
			return loginInfo;
		}
	};
  	return User;
}).factory('Booking', function($resource){
	var Booking = $resource('/api/user/:user_id/booking/:id', {
			id: '@angularShortId',
			user_id: '@user_id'
		}, {
			'query':  {
				method:'GET',
				isArray: true
			}
	});
	return Booking;
}).factory('CalculatePrice', function($resource){
	var CalculatePrice = $resource('/api/booking/calculateprice', {
			id: '@email',
			rentalcar_id: '@rentalcar_id',
			days: '@days',
			currency: '@currency'
		}, {
			calculate: {
				method: 'GET'
			}
		});
	return CalculatePrice;
});
