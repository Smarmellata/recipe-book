import { recipeDetailResolver } from "./recipe-detail.resolver";
import { RecipeService } from "../../services/recipe.service";
import { of } from "rxjs";
import { ActivatedRouteSnapshot } from "@angular/router";
import { TestBed } from "@angular/core/testing";
import { Recipe } from "../../models/recipe.model";

describe("recipeDetailResolver", () => {
  let recipeServiceSpy: jasmine.SpyObj<RecipeService>;

  beforeEach(() => {
    recipeServiceSpy = jasmine.createSpyObj("RecipeService", [
      "getRecipeDetails",
    ]);
    TestBed.configureTestingModule({
      providers: [{ provide: RecipeService, useValue: recipeServiceSpy }],
    });
  });

  function createRouteSnapshot(id: string | null): ActivatedRouteSnapshot {
    return {
      paramMap: {
        get: (key: string) => (key === "id" ? id : null),
      },
    } as any as ActivatedRouteSnapshot;
  }

  it("should return recipe details when id is present", (done) => {
    const mockRecipe: Recipe = {
      idMeal: "1",
      name: "Test",
      ingredients: [{ quantity: "1", type: "test" }],
    } as Recipe;
    recipeServiceSpy.getRecipeDetails.and.returnValue(of(mockRecipe));
    const route = createRouteSnapshot("1");
    const mockState = {} as any;

    const result$ = TestBed.runInInjectionContext(() =>
      recipeDetailResolver(route, mockState)
    );
    if (result$ && typeof (result$ as any).subscribe === "function") {
      (result$ as any).subscribe((result: Recipe | null) => {
        expect(recipeServiceSpy.getRecipeDetails).toHaveBeenCalledWith("1");
        expect(result).toEqual(mockRecipe);
        done();
      });
    } else {
      fail("result$ is not an Observable");
      done();
    }
  });

  it("should return null when id is not present", (done) => {
    const route = createRouteSnapshot(null);
    const mockState = {} as any;

    const result$ = TestBed.runInInjectionContext(() =>
      recipeDetailResolver(route, mockState)
    );
    if (result$ && typeof (result$ as any).subscribe === "function") {
      (result$ as any).subscribe((result: any) => {
        expect(recipeServiceSpy.getRecipeDetails).not.toHaveBeenCalled();
        expect(result).toBeNull();
        done();
      });
    } else {
      fail("result$ is not an Observable");
      done();
    }
  });
});
