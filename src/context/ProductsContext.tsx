import { useContext, createContext, PropsWithChildren, useState, useEffect } from "react";
import { Category } from "../types/category";
import { DiskController } from "../controllers/products/disk";
import { ProductService } from '../services/productService';

interface ContextProps {
  categories: Category[],
  service: ProductService,
}

const ProductsContext = createContext<ContextProps>({} as ContextProps)

export function useProducts() {
  return useContext(ProductsContext)
}

interface Props extends PropsWithChildren {}

export default function ProductsProvider(props: Props) {
  const [categories, setCategories] = useState<Category[]>([])
  const service: ProductService = new ProductService(new DiskController(), setCategories)

  useEffect(() => {
    service.initProductsState()
  }, [])


  const value = {
    categories,
    service
  }

  return (
    <ProductsContext.Provider value={value}>
      {props.children}
    </ProductsContext.Provider>
  )
}