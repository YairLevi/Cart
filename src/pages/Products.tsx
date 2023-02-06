import React, { useEffect, useRef, useState } from 'react'
import { IonButton, IonContent, IonIcon, IonPage, IonSelect, IonSelectOption } from "@ionic/react";
import If from '../components/If'
import Dropdown from "../components/Dropdown/Dropdown";
import { Category } from "../controllers/types";
import { trashOutline } from "ionicons/icons";
import './Products.scss'
import { DiskController } from "../controllers/disk/diskController";


export default function Products() {
  // const { products, addProduct, addCategory, deleteProduct, deleteCategory } = useProducts()
  const [open, setOpen] = useState(false)
  const [categorySelection, setCategorySelection] = useState('')
  const productInputRef = useRef<HTMLInputElement>(null)
  const categoryInputRef = useRef<HTMLInputElement>(null)
  const [isDeleteMode, setIsDeleteMode] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [items, setItems] = useState<Category[]>([
    {
      name: "Dairy",
      products: ["Milk", 'Cheese']
    },
    {
      name: "Meats",
      products: ['Rib-eye', 'Stake']
    },
    {
      name: "Vegetables",
      products: [],
    }
  ])

  function matchingProducts(category: Category): string[] {
    return category.products.filter(product => product.toLowerCase().includes(searchValue.toLowerCase()))
  }

  // async function writeFile() {
  //   await Filesystem.writeFile({
  //     path: 'text2.txt',
  //     data: "This is a test 1",
  //     directory: Directory.Documents,
  //     encoding: Encoding.UTF8,
  //   })
  // }

  useEffect(() => {
    const controller = new DiskController()
    controller.loadData()

  }, [])

  function addProduct() {
    if (productInputRef.current!.value === '' || categorySelection === '') return
    const product = productInputRef.current!.value
    setItems(prev => prev.map(category => {
      if (category.name !== categorySelection) return category
      return { name: category.name, products: [...category.products, product] }
    }))
    productInputRef.current!.value = ''
  }

  function addCategory() {
    if (categoryInputRef.current!.value === '') return
    const category = categoryInputRef.current!.value
    setItems(prev => [...prev, { name: category, products: [] }])
    categoryInputRef.current!.value = ''
  }

  function deleteProduct(product: string) {
    setItems(prev => {
      return prev.map(category => {
        return {
          name: category.name,
          products: category.products.filter(prod => prod !== product)
        }
      })
    })
  }

  function deleteCategory(category: string) {
    setItems(prev => {
      return prev.filter(cat => cat.name !== category)
    })
  }

  function generateTitle(text: string): JSX.Element {
    if (isDeleteMode) {
      return (
        <div className={'line-container'}>
          <IonIcon icon={trashOutline}/>
          {text}
        </div>
      )
    }

    return <>{text}</>
  }


  return (
    <IonPage>
      <div className={"header"}>
        <p>Products</p>
      </div>
      <IonContent>
        <div className={'container'}>
          <input placeholder={"Search products"} onChange={e => setSearchValue(e.target.value)}/>
        </div>
        <div className={"container"}>
          <IonButton onClick={() => setOpen(prev => !prev)}>Add</IonButton>
          <IonButton onClick={() => setIsDeleteMode(prev => !prev)} color={'danger'}>Delete</IonButton>
        </div>
        <If condition={open}>
          <div className={'container'}>
            <div className={'container modal'}>
              <input placeholder={'New product name'} ref={productInputRef}/>
              <p>Under Category:</p>
              <IonSelect placeholder={'Choose a category'} onIonChange={e => setCategorySelection(e.detail.value)}>
                {
                  items.map((value, index) => (
                    <IonSelectOption key={index}>{value.name}</IonSelectOption>
                  ))
                }
              </IonSelect>
              <IonButton onClick={addProduct}>Add</IonButton>
            </div>
            <div className={'container modal'}>
              <input placeholder={'New category'} ref={categoryInputRef}/>
              <IonButton onClick={addCategory}>Add</IonButton>
            </div>
          </div>
        </If>
        <If condition={items.length === 0}>
          <div className="container empty">
            <p>You have no products here...</p>
          </div>
        </If>
        <If condition={items.length > 0}>
          {
            items.map((category, index) => (
              <Dropdown title={generateTitle(category.name)} key={index} onClick={() => isDeleteMode && deleteCategory(category.name)}>
                {
                  matchingProducts(category).map((product, index) => (
                    <Dropdown.Item key={index} onClick={() => isDeleteMode && deleteProduct(product)}>
                      {generateTitle(product)}
                    </Dropdown.Item>
                  ))
                }
              </Dropdown>
            ))
          }
        </If>
      </IonContent>
    </IonPage>
  )
}