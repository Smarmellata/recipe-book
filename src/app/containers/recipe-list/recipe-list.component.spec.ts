import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RecipeListComponent } from "./recipe-list.component";
import { RecipeService } from "../../services/recipe.service";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { Recipe } from "../../models/recipe.model";

describe("RecipeListComponent", () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;
  let recipeServiceSpy: jasmine.SpyObj<RecipeService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockRecipes: Recipe[] = [
    { idMeal: "1", name: "Pasta", isFavorite: false } as Recipe,
    { idMeal: "2", name: "Pizza", isFavorite: false } as Recipe,
  ];

  beforeEach(async () => {
    recipeServiceSpy = jasmine.createSpyObj("RecipeService", [
      "getRandomRecipes",
      "filterRecipesByIngredient",
      "filterRecipesByCategory",
      "filterRecipesByArea",
      "searchRecipesByName",
      "getSingleFavorite",
    ]);
    routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

    recipeServiceSpy.getRandomRecipes.and.returnValue(of(mockRecipes));
    recipeServiceSpy.filterRecipesByIngredient.and.returnValue(
      of([mockRecipes[0]])
    );
    recipeServiceSpy.filterRecipesByCategory.and.returnValue(
      of([mockRecipes[1]])
    );
    recipeServiceSpy.filterRecipesByArea.and.returnValue(of([]));
    recipeServiceSpy.searchRecipesByName.and.returnValue(of([]));
    recipeServiceSpy.getSingleFavorite.and.returnValue(null);

    await TestBed.configureTestingModule({
      declarations: [RecipeListComponent],
      providers: [
        { provide: RecipeService, useValue: recipeServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load random recipes on init", () => {
    expect(recipeServiceSpy.getRandomRecipes).toHaveBeenCalledWith(9);
    expect(component.recipes.length).toBe(2);
  });

  it("should reset recipes if search keyword is empty", () => {
    component.recipes = [];
    component.onSearch("");
    expect(recipeServiceSpy.getRandomRecipes).toHaveBeenCalledTimes(2);
  });

  it("should search recipes by keyword and deduplicate results", () => {
    // Setup: all search methods return recipes with unique ids
    recipeServiceSpy.filterRecipesByIngredient.and.returnValue(
      of([mockRecipes[0]])
    );
    recipeServiceSpy.filterRecipesByCategory.and.returnValue(
      of([mockRecipes[1]])
    );
    recipeServiceSpy.filterRecipesByArea.and.returnValue(of([]));
    recipeServiceSpy.searchRecipesByName.and.returnValue(of([]));
    recipeServiceSpy.getSingleFavorite.and.returnValue(null);

    component.onSearch("test");
    fixture.detectChanges();

    expect(recipeServiceSpy.filterRecipesByIngredient).toHaveBeenCalledWith(
      "test"
    );
    expect(recipeServiceSpy.filterRecipesByCategory).toHaveBeenCalledWith(
      "test"
    );
    expect(recipeServiceSpy.filterRecipesByArea).toHaveBeenCalledWith("test");
    expect(recipeServiceSpy.searchRecipesByName).toHaveBeenCalledWith("test");
    // recipes should be deduplicated and mapped
    expect(component.recipes.length).toBe(2);
    expect(component.recipes[0].isFavorite).toBe(false);
  });

  it("should set isFavorite to true if recipe is favorite", () => {
    recipeServiceSpy.filterRecipesByIngredient.and.returnValue(
      of([mockRecipes[0]])
    );
    recipeServiceSpy.filterRecipesByCategory.and.returnValue(of([]));
    recipeServiceSpy.filterRecipesByArea.and.returnValue(of([]));
    recipeServiceSpy.searchRecipesByName.and.returnValue(of([]));
    recipeServiceSpy.getSingleFavorite.and.callFake((id: string) =>
      id === "1" ? ({ idMeal: "34" } as Recipe) : null
    );

    component.onSearch("pasta");
    fixture.detectChanges();

    expect(component.recipes[0].isFavorite).toBe(true);
  });

  it("should navigate to recipe detail on goToRecipe", () => {
    const recipe = mockRecipes[0];
    component.goToRecipe(recipe);
    expect(routerSpy.navigate).toHaveBeenCalledWith(["/recipe", recipe.idMeal]);
  });
});
