import React, { useRef, useState } from 'react'
import { IonButton, IonContent, IonIcon, IonPage, IonSelect, IonSelectOption } from "@ionic/react";
import If from '../components/If'
import Dropdown from "../components/Dropdown/Dropdown";
import { Category } from "../types/category";
import { trashOutline } from "ionicons/icons";
import './Products.scss'
import { useProducts } from "../context/ProductsContext";


export default function Products() {
  const { categories, service } = useProducts()
  const [open, setOpen] = useState(false)
  const [categorySelection, setCategorySelection] = useState('')
  const [isDeleteMode, setIsDeleteMode] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const productInputRef = useRef<HTMLInputElement>(null)
  const categoryInputRef = useRef<HTMLInputElement>(null)

  const getProduct = () => productInputRef.current!.value
  const getCategory = () => categoryInputRef.current!.value

  function matchingProducts(category: Category): string[] {
    return category.products.filter(product => product.toLowerCase().includes(searchValue.toLowerCase()))
  }

  function addProduct() {
    const product = getProduct()
    if (!product || !categorySelection) return

    service.addProduct(product, categorySelection)
    productInputRef.current!.value = ''
  }

  function addCategory() {
    const category = getCategory()
    if (!category) return

    service.addCategory(category)
    categoryInputRef.current!.value = ''
  }

  function deleteProduct(product: string, category: string) {
    service.deleteProduct(product, category)
  }

  function deleteCategory(category: string) {
    service.deleteCategory(category)
  }

  function deleteTitle(text: string) {
    return (
      <div className={'line-container'}>
        <IonIcon icon={trashOutline}/>
        {text}
      </div>
    )
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
                  categories.map((category, index) => (
                    <IonSelectOption key={index}>{category.name}</IonSelectOption>
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
        <If condition={categories.length === 0}>
          <div className="container empty">
            <p>You have no products here...</p>
          </div>
        </If>
        <If condition={categories.length > 0}>
          <If condition={isDeleteMode}>
            {
              categories.map((category, index) => (
                <Dropdown title={deleteTitle(category.name)} key={index} onClick={() => deleteCategory(category.name)}>
                  {
                    matchingProducts(category).map((product, index) => (
                      <Dropdown.Item key={index} onClick={() => deleteProduct(product, category.name)}>
                        {deleteTitle(product)}
                      </Dropdown.Item>
                    ))
                  }
                </Dropdown>
              ))
            }
          </If>
          <If condition={!isDeleteMode}>
            {
              categories.map((category, index) => (
                <Dropdown title={category.name} key={index}>
                  {
                    matchingProducts(category).map((product, index) => (
                      <Dropdown.Item key={index}>
                        {product}
                      </Dropdown.Item>
                    ))
                  }
                </Dropdown>
              ))
            }
          </If>
        </If>
      </IonContent>
    </IonPage>
  )
}
