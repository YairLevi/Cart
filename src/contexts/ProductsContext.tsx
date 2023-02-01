import { useContext, createContext, PropsWithChildren } from "react";

const ProductsContext = createContext<object>({})

export function useProducts() {
  return useContext(ProductsContext)
}

interface Props extends PropsWithChildren {}

export default function ProductsProvider(props: Props) {

  const value = {}

  return (
    <ProductsContext.Provider value={value}>
      {props.children}
    </ProductsContext.Provider>
  )
}