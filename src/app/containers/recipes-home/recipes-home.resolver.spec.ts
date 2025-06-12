import { recipesHomeResolver } from "./recipes-home.resolver";
import { RecipeService } from "../../services/recipe.service";
import { of } from "rxjs";
import { Recipe } from "../../models/recipe.model";
import { TestBed } from "@angular/core/testing";

describe("recipesHomeResolver", () => {
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
      providers: [{ provide: RecipeService, useValue: recipeServiceSpy }],
    });
  });

  it("should resolve recipes using RecipeService", (done) => {
    recipeServiceSpy.getRandomRecipes.and.returnValue(of(mockRecipes));
    // Create mock ActivatedRouteSnapshot and RouterStateSnapshot
    const mockRoute = {} as any;
    const mockState = {} as any;
    const result = TestBed.runInInjectionContext(() =>
      recipesHomeResolver(mockRoute, mockState)
    );
    if (result && typeof (result as any).subscribe === "function") {
      (result as any).subscribe((recipes: Recipe[]) => {
        expect(recipes).toEqual(mockRecipes);
        expect(recipeServiceSpy.getRandomRecipes).toHaveBeenCalledWith(10);
        done();
      });
    } else {
      expect(result).toEqual(mockRecipes);
      expect(recipeServiceSpy.getRandomRecipes).toHaveBeenCalledWith(10);
      done();
    }
  });
});
