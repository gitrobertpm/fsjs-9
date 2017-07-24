(function(){
	"use strict";
	angular.module("app")
		
		.controller("RecipesController", function($scope, $location, dataService) {

			dataService.getRecipes(function(response) {
				$scope.recipes = response.data;
			});

			dataService.getCategories(function(response) {
				$scope.categories = response.data;
			});

			$scope.showCategory = function() {
				dataService.getRecipesByCategory($scope.alaCategory, function(response) {
					$scope.recipes = response.data;
				});
			};

			$scope.addRecipe = function() {
				$location.path('/add');
			};

			$scope.deleteRecipe = function(i, id) {
				dataService.deleteRecipeById(id, function() {
					$scope.recipes.splice(i, 1);
				});	
			};

			$scope.confirmDelete = function(callback) {
				let confirmation = confirm("Are you sure you want to delete this?");
				if (confirmation === true) {
					callback;
				}
			};
		})
	
	.controller("RecipeDetailController", function($scope, $location, dataService) {

		if ($location.path().search('add') === -1) {
			dataService.getRecipeById($location.path().slice(5), function(response) {
				$scope.recipe = response.data;
			});
		} else {
			$scope.recipe = {
				name: "New Recipe",
				description: "Recipe Description",
				category: "",
				prepTime: "",
				cookTime: "",
				ingredients: [],
				steps: [],
				_id: ""
			};
			$scope.recipe._id = Math.floor((Math.random() * 999999999) + 1).toString();
		}
		
		dataService.getCategories(function(response) {
			$scope.categories = response.data;
		});
		
		dataService.getFoodItems(function(response) {
      $scope.foodItems = response.data;
    });
		
		$scope.saveRecipe = function() {
			if ($location.path().search('add') === -1) {
				let url = $location.url();
				let id = url.replace('/edit/', '');
				dataService.updateRecipeById(id, $scope.recipe, function() {
					$location.path('/');
				});
			} else {
				dataService.addRecipe($scope.recipe, function() {
					$location.path('/');
				});
			}
		};
		
		$scope.goHome = function() {
			$location.path("/");
		};
	
		$scope.addIngredient = function() {
			let newIngredient = {
				foodItem: "",
				condition: "",
				amount: ""
			};
			$scope.recipe.ingredients.push(newIngredient);
		};
		
		$scope.addStep = function() {
			let newStep = {
				descritpion: ""
			};
			$scope.recipe.steps.push(newStep);
		};
		
		$scope.deleteIngredient = function(i) {
      $scope.recipe.ingredients.splice(i, 1);
    };

    $scope.deleteStep = function(i) {
      $scope.recipe.steps.splice(i, 1);
    };
		
		$scope.confirmDelete = function(callback) {
      let confirmation = confirm("Are you sure you want to delete this item?");
      if (confirmation === true) {
        callback;
      }
    };
	});
})();