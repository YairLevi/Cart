import { Dispatch, SetStateAction}  from 'react'
import { ProductsController } from "../controllers/products/productsController";
import { Category } from "../types/category";

export class ProductService {
  controller: ProductsController
  setState: Dispatch<SetStateAction<Category[]>>
  
  constructor(controller: ProductsController, setState: Dispatch<SetStateAction<Category[]>>) {
    this.controller = controller
    this.setState = setState
  }

  async initProductsState() {
    const data = await this.controller.loadData()
    this.setState(data)
  }

  addCategory(name: string) {
    this.setState(prev => {
      const categoryExists = prev.some(category => category.name === name)
      if (categoryExists) return prev

      return [...prev, { name, products: [] }]
    })
    this.controller.addCategory(name)
  }

  deleteCategory(name: string) {
    this.setState(prev => prev.filter(category => category.name !== name))
    this.controller.deleteCategory(name)
  }

  addProduct(productName: string, categoryName: string) {
    this.setState(prev => prev.map(category => {
      if (category.name !== categoryName)
        return category

      return {
        name: category.name,
        products: [...category.products, productName]
      }
    }))
    this.controller.addProduct(productName, categoryName)
  }

  deleteProduct(productName: string, categoryName: string) {
    this.setState(prev => prev.map(category => {
      if (category.name !== categoryName)
        return category

      return {
        name: category.name,
        products: category.products.filter(product => product !== productName)
      }
    }))
    this.controller.deleteProduct(productName, categoryName)
  }
}