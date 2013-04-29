'use strict';
var alohaModul = angular.module('aloha', []);

(function (Aloha) {
	var $script, pluginContext = this;
	Aloha.settings = Aloha.settings || {};
	Aloha.settings.plugins = Aloha.settings.plugins || {};
	Aloha.settings.plugins.format = {
		config : [ 'strong', 'em', 'b', 'i', 'del', 'sub', 'sup', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'removeFormat'],
		editables: {}
	};
	alohaModul.directive('alohaEditor', function ($q) {
		var count = 0;
		var config = {
			active: true
		};
		function alohaElement(element) {
			Aloha.ready(function () {
				Aloha.jQuery(element.context).aloha();
			});
		}
		function mahaloElement(element) {
			Aloha.ready(function () {
				Aloha.jQuery(element.context).mahalo();
			});
		}

		return {
			restrict: 'EAC',
			scope: {
				alohaActive: '=',
				alohaFormats: '='
			},
			link: function (scope, element, attrs) {
				var uniqeClass = "angular-aloha-element" + count++;
				element[0].classList.add(uniqeClass);
				if (scope.alohaFormats && scope.alohaFormats.length && scope.alohaFormats.length > 0) {
					Aloha.settings.plugins.format.editables['.' + uniqeClass] = scope.alohaFormats;
				}
				if (scope.alohaActive) {
					alohaElement(element);
				}
				if($script) {
					console.log($script);
				}
				scope.$watch('alohaActive', function(newValue, oldValue) {
					if (oldValue === newValue) {
						return;
					}
					if (newValue) {
						alohaElement(element);
					} else {
						mahaloElement(element);
					}
				});
			}
		};
	});
	$script = (function() {
		  var doc = document
		    , head = doc.getElementsByTagName('head')[0]
		    , validBase = /^https?:\/\//
		    , list = {}, ids = {}, delay = {}, scriptpath
		    , scripts = {}, s = 'string', f = false
		    , push = 'push', domContentLoaded = 'DOMContentLoaded', readyState = 'readyState'
		    , addEventListener = 'addEventListener', onreadystatechange = 'onreadystatechange'

		  function every(ar, fn) {
		    for (var i = 0, j = ar.length; i < j; ++i) if (!fn(ar[i])) return f
		    return 1
		  }
		  function each(ar, fn) {
		    every(ar, function(el) {
		      return !fn(el)
		    })
		  }

		  if (!doc[readyState] && doc[addEventListener]) {
		    doc[addEventListener](domContentLoaded, function fn() {
		      doc.removeEventListener(domContentLoaded, fn, f)
		      doc[readyState] = 'complete'
		    }, f)
		    doc[readyState] = 'loading'
		  }

		  function $script(paths, idOrDone, optDone) {
		    paths = paths[push] ? paths : [paths]
		    var idOrDoneIsDone = idOrDone && idOrDone.call
		      , done = idOrDoneIsDone ? idOrDone : optDone
		      , id = idOrDoneIsDone ? paths.join('') : idOrDone
		      , queue = paths.length
		    function loopFn(item) {
		      return item.call ? item() : list[item]
		    }
		    function callback() {
		      if (!--queue) {
		        list[id] = 1
		        done && done()
		        for (var dset in delay) {
		          every(dset.split('|'), loopFn) && !each(delay[dset], loopFn) && (delay[dset] = [])
		        }
		      }
		    }
		    setTimeout(function () {
		      each(paths, function (path) {
		        if (path === null) return callback()
		        if (scripts[path]) {
		          id && (ids[id] = 1)
		          return scripts[path] == 2 && callback()
		        }
		        scripts[path] = 1
		        id && (ids[id] = 1)
		        create(!validBase.test(path) && scriptpath ? scriptpath + path + '.js' : path, callback)
		      })
		    }, 0)
		    return $script
		  }

		  function create(path, fn) {
		    var el = doc.createElement('script')
		      , loaded = f
		    el.onload = el.onerror = el[onreadystatechange] = function () {
		      if ((el[readyState] && !(/^c|loade/.test(el[readyState]))) || loaded) return;
		      el.onload = el[onreadystatechange] = null
		      loaded = 1
		      scripts[path] = 2
		      fn()
		    }
		    el.async = 1
		    el.src = path
		    head.insertBefore(el, head.firstChild)
		  }

		  $script.get = create

		  $script.order = function (scripts, id, done) {
		    (function callback(s) {
		      s = scripts.shift()
		      if (!scripts.length) $script(s, id, done)
		      else $script(s, callback)
		    }())
		  }

		  $script.path = function (p) {
		    scriptpath = p
		  }
		  $script.ready = function (deps, ready, req) {
		    deps = deps[push] ? deps : [deps]
		    var missing = [];
		    !each(deps, function (dep) {
		      list[dep] || missing[push](dep);
		    }) && every(deps, function (dep) {return list[dep]}) ?
		      ready() : !function (key) {
		      delay[key] = delay[key] || []
		      delay[key][push](ready)
		      req && req(missing)
		    }(deps.join('|'))
		    return $script
		  }

		  $script.done = function (idOrDone) {
		    $script([null], idOrDone)
		  }

		  return $script
		}());
}(Aloha));
