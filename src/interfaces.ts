export interface Product {
  id: number;
  name: string;
  price: number;
  weight: number;
  calories: number | null | undefined;
  section: "food" | "cleaning";
  expirationDate: Date;
}
