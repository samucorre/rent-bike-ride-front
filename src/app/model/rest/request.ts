import { Contact } from '../contact';

export class QuerySortPaginationRequest {
  query: string;
  pageIndex: number;
  pageSize: number;
  sortDirection: string;
  sortColumn: string;

  constructor(query: string, pageIndex: number, pageSize: number, sortDirection: string, sortColumn: string) {
    this.query = query;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sortDirection = sortDirection;
    this.sortColumn = sortColumn;
  }
}

export class CreateContactRequest {
  name: string;
  surname1: string;
  surname2: string;
  phone: number;
  email: string;

  constructor(contact: Contact) {
    this.name = contact.name;
    this.surname1 = contact.surname1;
    this.surname2 = contact.surname2;
    this.phone = contact.phone;
    this.email = contact.email;
  }
}

export class EditContactRequest extends CreateContactRequest {
  id: number;

  constructor(contact: Contact) {
    super(contact);
    this.id = contact.id;
  }
}
import { Bike } from '../bike';

export class CreateBikeRequest {
  brand: Brand;
  model: Model;
  size: Size;
  use: string;
  units: number;

  constructor(bike: Bike) {
    this.brand = bike.brand;
    this.model = bike.model;
    this.size = bike.size;
    this.use= bike.use;
    this.units=bike.units;
  }
}

export class EditBikeRequest extends CreateBikeRequest {
  id: number;

  constructor(bike: Bike) {
    super(bike);
    this.id = bike.id;
  }
}
import { Brand } from '../brand';

export class CreateBrandRequest {
  brand:Brand["brand"];
 
  constructor(brand: Brand) {
    this.brand = brand.brand;
  }
}

export class EditBrandRequest extends CreateBrandRequest {
  id: number;

  constructor(brand: Brand) {
    super(brand);
    this.id = brand.id;
  }
}
import { Model } from '../model';

export class CreateModelRequest {
  model: Model ["model"]

  constructor(model: Model) {
  this.model = model.model;
  }
}

export class EditModelRequest extends CreateModelRequest {
  id: number;

  constructor(model: Model) {
    super(model);
    this.id = model.id;
  }
}
import { Size } from '../size';

export class CreateSizeRequest {
   size: Size  ["size"]

  constructor(size: Size) {
  this.size = size.size;
  }
}

export class EditSizeRequest extends CreateSizeRequest {
  id: number;

  constructor(size: Size) {
    super(size);
    this.id = size.id;
  }
}
  
 import { Rent } from '../rent';

export class CreateRentRequest {
   rent: Rent  ["rent"]

  constructor(rent: Rent) {
  this.rent = rent.rent;
  }
}

export class EditRentRequest extends CreateRentRequest {
  id: number;

  constructor(rent: Rent) {
    super(rent);
    this.id = rent.id;
  }
}
