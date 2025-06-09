import { TestBed } from "@angular/core/testing";
import { RecipesHomeResolver } from "./recipe-home.resolver";
import { RecipeService } from "../../services/recipe.service";
import { of } from "rxjs";
import { Recipe } from "../../models/recipe.model";

describe("RecipesHomeResolver", () => {
  let resolver: RecipesHomeResolver;
  let recipeServiceSpy: jasmine.SpyObj<RecipeService>;

  const mockRecipes: Recipe[] = [
    { idMeal: "1", name: "Test", isFavorite: false } as Recipe,
    { idMeal: "2", name: "Test2", isFavorite: false } as Recipe,
  ];

  beforeEach(() => {
    recipeServiceSpy = jasmine.createSpyObj("RecipeService", [
      "getRandomRecipes",
    ]);
    TestBed.configureTestingModule({
      providers: [
        RecipesHomeResolver,
        { provide: RecipeService, useValue: recipeServiceSpy },
      ],
    });
    resolver = TestBed.inject(RecipesHomeResolver);
  });

  it("should be created", () => {
    expect(resolver).toBeTruthy();
  });

  it("should resolve recipes using RecipeService", (done) => {
    recipeServiceSpy.getRandomRecipes.and.returnValue(of(mockRecipes));
    resolver.resolve().subscribe((recipes) => {
      expect(recipes).toEqual(mockRecipes);
      expect(recipeServiceSpy.getRandomRecipes).toHaveBeenCalledWith(10);
      done();
    });
  });
});
