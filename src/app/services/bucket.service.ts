import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IFruit } from '../interfaces/fruit.interface';
import { IBucketService } from '../interfaces/bucket-service';
import { ComponentStore } from '@ngrx/component-store';

export interface BucketState {
  bucket: IFruit[];
}
@Injectable({
  providedIn: 'root',
})
export class BucketService
  extends ComponentStore<BucketState>
  implements IBucketService
{
  readonly bucket$: Observable<IFruit[]> = this.select((state) => state.bucket);
  constructor() {
    super({
      bucket: [],
    });
  }

  loadItems() {
    const bucket = JSON.parse(window.localStorage.getItem('bucket') || '[]');
    this.setState({ bucket });
  }

  readonly addItem = this.updater((state, fruit: IFruit) => {
    // va a traer lo que este en el state y agregara el nuevo fruit
    const bucket = [fruit, ...state.bucket];
    window.localStorage.setItem('bucket', JSON.stringify(bucket));
    return {
      bucket,
    };
  });

  readonly removeItem = this.updater((state, fruit: IFruit) => {
    // filtramos el state y traemos todo lo que no sea igual al id del fruit
    const bucket = state.bucket.filter((item) => item.id !== fruit.id);
    window.localStorage.setItem('bucket', JSON.stringify(bucket));
    return {
      bucket,
    };
  });
}
