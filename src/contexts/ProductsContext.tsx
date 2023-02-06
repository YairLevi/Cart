import { useContext, createContext, PropsWithChildren, useState, useEffect } from "react";
import { DiskController } from "../controllers/products/DiskController";
import { Category } from "../controllers/types";
import { ProductsController } from "../controllers/products/ProductsController";

interface ContextProps {
  controller: Controller
  products: Category[]
}

const ProductsContext = createContext<ContextProps | object>({})

export function useProducts() {
  return useContext(ProductsContext)
}

interface Props extends PropsWithChildren {}

export default function ProductsProvider(props: Props) {
  const controller: ProductsController = new DiskController()
  const [products, setProducts] = useState<Category[]>([])

  useEffect(() => {
    (async function() {
      const data = await controller.loadData()
      setProducts(data)
    })()
  }, [])

  const value = {
    controller,
    products
  }

  return (
    <ProductsContext.Provider value={value}>
      {props.children}
    </ProductsContext.Provider>
  )
}