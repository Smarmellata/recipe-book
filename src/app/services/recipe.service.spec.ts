import { TestBed } from "@angular/core/testing";
import { RecipeService } from "./recipe.service";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { ApiRecipe } from "./recipe.mapper";
import { Recipe } from "../models/recipe.model";

describe("RecipeService", () => {
  let service: RecipeService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const apiRecipe: ApiRecipe = {
    idMeal: "1",
    strMeal: "Test Meal",
    strMealAlternate: null,
    strCategory: "Category",
    strArea: "Area",
    strInstructions: "Instructions",
    strMealThumb: "img.jpg",
    strTags: "tag1,tag2",
    strYoutube: "youtube.com",
    strIngredient1: "Chicken",
    strIngredient2: "Salt",
    strIngredient3: "",
    strIngredient4: "",
    strIngredient5: "",
    strIngredient6: "",
    strIngredient7: "",
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
    strMeasure5: "",
    strMeasure6: "",
    strMeasure7: "",
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

  const mappedRecipe: Recipe = {
    idMeal: "1",
    name: "Test Meal",
    category: "Category",
    area: "Area",
    instructions: "Instructions",
    image: "img.jpg",
    tags: "tag1,tag2",
    description: "Instructions...",
    ingredients: [
      { type: "Chicken", quantity: "200g" },
      { type: "Salt", quantity: "1 tsp" },
    ],
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
    TestBed.configureTestingModule({
      providers: [
        RecipeService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    service = TestBed.inject(RecipeService);
    // spyOn<any>(service, "callAndMap").and.callThrough();
    // Mock the mapper to always return mappedRecipe for simplicity
    spyOn<any>(service, "callAndMap").and.returnValue(of([mappedRecipe]));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should call searchRecipesByName", (done) => {
    service.searchRecipesByName("pasta").subscribe((recipes) => {
      expect(recipes[0].name).toBe("Test Meal");
      done();
    });
    expect((service as any).callAndMap).toHaveBeenCalledWith(
      jasmine.stringMatching(/search\.php\?s=pasta/)
    );
  });

  it("should call filterRecipesByIngredient", (done) => {
    service.filterRecipesByIngredient("chicken").subscribe((recipes) => {
      expect(recipes[0].name).toBe("Test Meal");
      done();
    });
    expect((service as any).callAndMap).toHaveBeenCalledWith(
      jasmine.stringMatching(/filter\.php\?i=chicken/)
    );
  });

  it("should call filterRecipesByCategory", (done) => {
    service.filterRecipesByCategory("main").subscribe((recipes) => {
      expect(recipes[0].name).toBe("Test Meal");
      done();
    });
    expect((service as any).callAndMap).toHaveBeenCalledWith(
      jasmine.stringMatching(/filter\.php\?c=main/)
    );
  });

  it("should call filterRecipesByArea", (done) => {
    service.filterRecipesByArea("italian").subscribe((recipes) => {
      expect(recipes[0].name).toBe("Test Meal");
      done();
    });
    expect((service as any).callAndMap).toHaveBeenCalledWith(
      jasmine.stringMatching(/filter\.php\?a=italian/)
    );
  });

  it("should get recipe details", (done) => {
    httpClientSpy.get.and.returnValue(of({ meals: [apiRecipe] }));
    service.getRecipeDetails("1").subscribe((recipe) => {
      expect(recipe.idMeal).toBe("1");
      done();
    });
  });

  it("should get random recipe", (done) => {
    httpClientSpy.get.and.returnValue(of({ meals: [apiRecipe] }));
    service.getRandomRecipe().subscribe((recipe) => {
      expect(recipe.idMeal).toBe("1");
      done();
    });
  });

  it("should get random recipes", (done) => {
    spyOn(service, "getRandomRecipe").and.returnValue(of(mappedRecipe));
    service.getRandomRecipes(3).subscribe((recipes) => {
      expect(recipes.length).toBe(3);
      expect(service.getRandomRecipe).toHaveBeenCalledTimes(3);
      done();
    });
  });

  it("should get favorites from localStorage", () => {
    localStorage.setItem("favorites", JSON.stringify([mappedRecipe]));
    const favorites = service.getFavorites();
    expect(favorites.length).toBe(1);
    expect(favorites[0].idMeal).toBe("1");
  });

  it("should return empty array if no favorites in localStorage", () => {
    localStorage.removeItem("favorites");
    const favorites = service.getFavorites();
    expect(favorites).toEqual([]);
  });

  it("should get single favorite by id", () => {
    localStorage.setItem("favorites", JSON.stringify([mappedRecipe]));
    const fav = service.getSingleFavorite("1");
    expect(fav?.idMeal).toBe("1");
  });

  it("should return null if single favorite not found", () => {
    localStorage.setItem("favorites", JSON.stringify([]));
    const fav = service.getSingleFavorite("notfound");
    expect(fav).toBeNull();
  });

  it("should save favorites to localStorage", () => {
    service.saveFavorites([mappedRecipe]);
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    expect(stored.length).toBe(1);
    expect(stored[0].idMeal).toBe("1");
  });
});
