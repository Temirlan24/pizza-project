import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { ForkifyService } from 'src/app/services/forkify.service';
import { IRecipeDetails } from '../../models/forkify.model';

const REGEX = /[\d|/|\+]+/g;


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  ingredients$ = new Subject();

  filteredIngredients$ = this.forkifyService.count$.pipe(
    mergeMap(count => this.ingredients$.pipe(
      tap((ingredients: any) => {
        console.log('ingredients', ingredients);
        if (ingredients?.length) {
          const ingredientsList = ingredients.map((text: any) => {
            const countIng = text.match(REGEX);

            const value = countIng?.length ? countIng[0] : 1;
            console.log(countIng[0]);

            return count * +value;
          })

          console.log(ingredientsList);

        }
      }),
    ))
  );


  _recipe: IRecipeDetails | null = null;
  @Input() set recipe(value: any) {
    this._recipe = value;

    if (value?.ingredients?.length) {
      this.ingredients$.next(value?.ingredients);
    }
  }
  get recipe() {
    return this._recipe;
  }

  constructor(private forkifyService: ForkifyService, private cartService: CartService) {

  }
  carts:any[] = [];
  ngOnInit() {
    this.carts = this.cartService.getCarts();
  }

  addToCart(ingredient: any){
      this.cartService.addToBasket(ingredient);
  }
  removeFromCart(ingredient: any){
    this.cartService.removeFromBasket(ingredient);
  }
}
