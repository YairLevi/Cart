import { Category } from "../types";

export interface ProductsController {
  loadData: () => Promise<Category[]>

  // Category functions
  addCategory: (name: string) => void
  deleteCategory: (name: string) => void

  // Single Product functions
  addProduct: (name: string, category: string) => void
  deleteProduct: (name: string, category: string) => void
}