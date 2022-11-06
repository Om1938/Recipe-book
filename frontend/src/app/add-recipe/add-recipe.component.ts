import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent implements OnInit {
  recipeForm = this.fb.group({
    name: ['Biryani', [Validators.required]],
    description: ['Rice with spices', [Validators.required]],
    ingredients: ['Rice Spice', [Validators.required]],
    category: ['Indian'],
  });
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {}

  addRecipe() {
    console.log(this.recipeForm.value);
    const { name, description, category, ingredients } = this.recipeForm.value;
    const changedIngredients = ingredients?.split(' ');
    if (name && description && category && changedIngredients)
      this.recipeService
        .addRecipe({
          name,
          description,
          category,
          ingredients: changedIngredients,
        })
        .subscribe((resp) => console.log(resp));
  }
}
