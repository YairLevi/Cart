import { ProductsController } from "./ProductsController";
import { Category } from "../../types/category";
import { Directory } from "@capacitor/filesystem";
import { FileSystem } from "../../api/filesystem";

const DEFAULT_APP_PATH = '.cart/'
const DEFAULT_APP_DIRECTORY = Directory.Documents
const CATEGORY_FILE_EXTENSION = '.json'
const fileSystem = new FileSystem(DEFAULT_APP_DIRECTORY)


export class DiskController implements ProductsController {

  path: string

  constructor(path: string = DEFAULT_APP_PATH) {
    this.path = path
  }

  getCategoryPath(category: string): string {
    return this.path + category + CATEGORY_FILE_EXTENSION
  }

  async addCategory(name: string): Promise<void> {
    const categoryExists = await fileSystem.exists(this.getCategoryPath(name))
    if (categoryExists) return

    const category: Category = {
      name: name,
      products: []
    }
    await fileSystem.writeFile(this.getCategoryPath(name), JSON.stringify(category))
  }

  async addProduct(name: string, category: string): Promise<void> {
    const categoryJson: Category = await fileSystem.readFile(this.getCategoryPath(category))
    categoryJson.products = [...categoryJson.products, name]
    await fileSystem.writeFile(this.getCategoryPath(category), JSON.stringify(categoryJson))
  }

  async deleteCategory(name: string): Promise<void> {
    await fileSystem.removeFile(this.getCategoryPath(name))
  }

  async deleteProduct(name: string, category: string): Promise<void> {
    const categoryPath = this.getCategoryPath(category)
    const categoryJson: Category = await fileSystem.readFile(categoryPath)
    categoryJson.products = categoryJson.products.filter(product => product !== name)
    await fileSystem.writeFile(categoryPath, JSON.stringify(categoryJson))
  }

  async getData(): Promise<Category[]> {
    const dirExists = await fileSystem.exists(this.path)
    if (!dirExists) {
      await fileSystem.makeDir(this.path)
      return []
    }
    const files = await fileSystem.readDir(this.path)
    return await Promise.all(files.map(async file => fileSystem.readFile(this.path + file.name)))
  }
}