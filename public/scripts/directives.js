(function(){
	"use strict";
	angular.module("app").directive("detailpageheading", function($location) {
		let heading;
		if ($location.path().search('add') === -1) {
			heading = "Add New Recipe";
		} else {
			heading = recipe.name;
		}
		 console.log(heading);
		return {
			template: heading
		};
	});
})();