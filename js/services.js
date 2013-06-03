'use strict';

/* Services */

angular.module('couchDb', ['ngResource'])
.factory('CouchDbService', function($resource){
	var Couch = $resource('/couchdb/aloha-angular/:_id', {
			_id: '@_id'
		}, {
			'query':  {
				method:'GET'
			},
			'save': {
				method: 'PUT'
			}
		});
  	return Couch;
});
