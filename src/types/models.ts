export type User = {
  name: string;
  age: number;
  email?: string;
};

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface DigitalProduct extends Product {
  downloadUrl: string;
  fileSizeMb: number;
}

export const featuredProduct: DigitalProduct = {
  id: 101,
  name: 'React field notes',
  price: 18,
  downloadUrl: '/downloads/react-field-notes.pdf',
  fileSizeMb: 2.4,
};
