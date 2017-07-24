(function(){
	"use strict";
	angular.module("app").service("dataService", function($http) {
		let baseUrl = "http://localhost:5000";
		
		this.getRecipes = function(callback) {
			$http.get(baseUrl + "/api/recipes").then(callback);
		};
		
		this.getCategories = function(callback) {
			$http.get(baseUrl + "/api/categories").then(callback);
		};

		this.getFoodItems = function(callback) {
			$http.get(baseUrl + "/api/fooditems").then(callback);
		};
		
		this.getRecipesByCategory = function(categoryName, callback) {
			$http.get(baseUrl + "/api/recipes?category=" + categoryName).then(callback);
		};
		
		this.getRecipeById = function(id, callback) {
			$http.get(baseUrl + "/api/recipes/" + id).then(callback);
		};
		
		this.updateRecipeById = function(id, recipe, callback) {
			$http.put(baseUrl + "/api/recipes/" + id, recipe).then(callback);
		};
		
		this.addRecipe = function(recipe, callback) {
			$http.post(baseUrl + "/api/recipes/", recipe).then(callback);
		};
		
		this.deleteRecipeById = function(id, callback) {
			$http.delete(baseUrl + "/api/recipes/" + id).then(callback);
		};
	});
})();