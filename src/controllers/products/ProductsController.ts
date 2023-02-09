import { Category } from "../../types/category";

export interface ProductsController {
  getData: () => Promise<Category[]>

  // Category functions
  addCategory: (name: string) => void
  deleteCategory: (name: string) => void

  // Single Product functions
  addProduct: (name: string, category: string) => void
  deleteProduct: (name: string, category: string) => void
}