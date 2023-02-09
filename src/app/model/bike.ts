import { Brand } from 'src/app/model/brand';
import { Model } from './model';
import { Size } from './size';
export class Bike {
    id: number;
    brand: Brand;
    model: Model;
    size: Size;
    use: string;
    units: number;
  }
  