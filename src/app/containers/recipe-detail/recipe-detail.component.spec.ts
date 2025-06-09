import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RecipeDetailComponent } from "./recipe-detail.component";
import { ActivatedRoute } from "@angular/router";
import { RecipeService } from "../../services/recipe.service";
import { of } from "rxjs";
import { Recipe } from "../../models/recipe.model";

describe("RecipeDetailComponent", () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;
  let recipeServiceSpy: jasmine.SpyObj<RecipeService>;
  let activatedRouteStub: any;

  const mockRecipe: Recipe = {
    idMeal: "123",
    name: "Test Recipe",
  } as Recipe;

  beforeEach(async () => {
    recipeServiceSpy = jasmine.createSpyObj("RecipeService", [
      "getRecipeDetails",
    ]);
    activatedRouteStub = {
      snapshot: {
        paramMap: {
          get: (key: string) => (key === "id" ? "123" : null),
        },
      },
    };

    await TestBed.configureTestingModule({
      declarations: [RecipeDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: RecipeService, useValue: recipeServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
    // Pulisci localStorage prima di ogni test
    localStorage.clear();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set recipe and isFavorite on ngOnInit if recipe is present in route data", () => {
    activatedRouteStub.snapshot.data = { recipe: mockRecipe };
    spyOn(component, "checkIfFavorite").and.returnValue(true);

    component.ngOnInit();

    expect(component.recipe).toEqual(mockRecipe);
    expect(component.checkIfFavorite).toHaveBeenCalledWith("123");
    expect(component.isFavorite).toBeTrue();
  });

  it("should not set recipe or isFavorite if recipe is missing in route data", () => {
    activatedRouteStub.snapshot.data = {};
    spyOn(component, "checkIfFavorite");

    component.ngOnInit();

    expect(component.recipe).toBeUndefined();
    expect(component.checkIfFavorite).not.toHaveBeenCalled();
    expect(component.isFavorite).toBeFalse();
  });

  it("should add recipe to favorites if not favorite", () => {
    component.recipe = mockRecipe;
    component.isFavorite = false;
    localStorage.setItem("favorites", JSON.stringify([]));

    component.toggleFavorite();

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    expect(favorites.length).toBe(1);
    expect(favorites[0].idMeal).toBe("123");
    expect(component.isFavorite).toBeTrue();
  });

  it("should remove recipe from favorites if already favorite", () => {
    component.recipe = mockRecipe;
    component.isFavorite = true;
    localStorage.setItem("favorites", JSON.stringify([mockRecipe]));

    component.toggleFavorite();

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    expect(favorites.length).toBe(0);
    expect(component.isFavorite).toBeFalse();
  });

  it("should do nothing in toggleFavorite if recipe is undefined", () => {
    component.recipe = undefined as any;
    expect(() => component.toggleFavorite()).not.toThrow();
    // Nessun errore, nessuna modifica a localStorage
    expect(localStorage.getItem("favorites")).toBeNull();
  });

  it("should return true if recipe is in favorites (checkIfFavorite)", () => {
    localStorage.setItem("favorites", JSON.stringify([mockRecipe]));
    expect(component.checkIfFavorite("123")).toBeTrue();
  });

  it("should return false if recipe is not in favorites (checkIfFavorite)", () => {
    localStorage.setItem("favorites", JSON.stringify([]));
    expect(component.checkIfFavorite("123")).toBeFalse();
  });

  it("should handle missing favorites in localStorage (checkIfFavorite)", () => {
    localStorage.removeItem("favorites");
    expect(component.checkIfFavorite("123")).toBeFalse();
  });
});
