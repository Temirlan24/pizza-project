import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart:string[] = [];

  constructor() { }

  getCarts(){
    return this.cart;
  }
  addToBasket(items:any){
    this.cart.push(items);
  }

  removeFromBasket(items:any){
    let index = this.cart.indexOf(items);
    this.cart.splice(index,1);
  }
}
