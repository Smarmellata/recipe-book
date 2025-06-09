import { mapApiRecipeToRecipe, ApiRecipe } from "./recipe.mapper";
import { Recipe } from "../models/recipe.model";

describe("mapApiRecipeToRecipe", () => {
  it("should map all fields and ingredients correctly", () => {
    const apiRecipe: ApiRecipe = {
      idMeal: "1",
      strMeal: "Test Meal",
      strMealAlternate: null,
      strCategory: "Category",
      strArea: "Area",
      strInstructions: "Some instructions for the recipe.",
      strMealThumb: "image.jpg",
      strTags: "tag1,tag2",
      strYoutube: "youtube.com",
      strIngredient1: "Chicken",
      strIngredient2: "Salt",
      strIngredient3: "",
      strIngredient4: "  ",
      strIngredient5: undefined,
      strIngredient6: null as any,
      strIngredient7: "Pepper",
      strIngredient8: "",
      strIngredient9: "",
      strIngredient10: "",
      strIngredient11: "",
      strIngredient12: "",
      strIngredient13: "",
      strIngredient14: "",
      strIngredient15: "",
      strIngredient16: "",
      strIngredient17: "",
      strIngredient18: "",
      strIngredient19: "",
      strIngredient20: "",
      strMeasure1: "200g",
      strMeasure2: "1 tsp",
      strMeasure3: "",
      strMeasure4: "",
      strMeasure5: undefined,
      strMeasure6: null as any,
      strMeasure7: "2 tsp",
      strMeasure8: "",
      strMeasure9: "",
      strMeasure10: "",
      strMeasure11: "",
      strMeasure12: "",
      strMeasure13: "",
      strMeasure14: "",
      strMeasure15: "",
      strMeasure16: "",
      strMeasure17: "",
      strMeasure18: "",
      strMeasure19: "",
      strMeasure20: "",
      strSource: "source.com",
      strImageSource: null,
      strCreativeCommonsConfirmed: null,
      dateModified: null,
    };

    const recipe: Recipe = mapApiRecipeToRecipe(apiRecipe);

    expect(recipe.idMeal).toBe("1");
    expect(recipe.name).toBe("Test Meal");
    expect(recipe.category).toBe("Category");
    expect(recipe.area).toBe("Area");
    expect(recipe.instructions).toBe("Some instructions for the recipe.");
    expect(recipe.image).toBe("image.jpg");
    expect(recipe.tags).toBe("tag1,tag2");
    expect(recipe.description).toContain("Some instructions for the recipe.");
    expect(recipe.ingredients.length).toBe(3);
    expect(recipe.ingredients[0]).toEqual({
      type: "Chicken",
      quantity: "200g",
    });
    expect(recipe.ingredients[1]).toEqual({ type: "Salt", quantity: "1 tsp" });
    expect(recipe.ingredients[2]).toEqual({
      type: "Pepper",
      quantity: "2 tsp",
    });
  });

  it("should handle missing/empty ingredients and measures", () => {
    const apiRecipe: ApiRecipe = {
      idMeal: "2",
      strMeal: "No Ingredients",
      strMealAlternate: null,
      strCategory: "Cat",
      strArea: "Area",
      strInstructions: "Instructions",
      strMealThumb: "img.jpg",
      strTags: null,
      strYoutube: null,
      strSource: undefined,
      strImageSource: null,
      strCreativeCommonsConfirmed: null,
      dateModified: null,
    };

    const recipe: Recipe = mapApiRecipeToRecipe(apiRecipe);

    expect(recipe.ingredients.length).toBe(0);
    expect(recipe.description).toContain("Instructions...");
  });

  it("should handle missing instructions", () => {
    const apiRecipe: ApiRecipe = {
      idMeal: "3",
      strMeal: "No Instructions",
      strMealAlternate: null,
      strCategory: "Cat",
      strArea: "Area",
      strInstructions: "",
      strMealThumb: "img.jpg",
      strTags: null,
      strYoutube: null,
      strSource: undefined,
      strImageSource: null,
      strCreativeCommonsConfirmed: null,
      dateModified: null,
    };

    const recipe: Recipe = mapApiRecipeToRecipe(apiRecipe);

    expect(recipe.description).toBe("No description available");
  });
});
