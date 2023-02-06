import { ProductsController } from "./ProductsController";
import { Directory, Filesystem as fs } from "@capacitor/filesystem";
import { Category } from "../types";

const DEFAULT_APP_PATH = '.cart/'
const DEFAULT_APP_DIRECTORY = Directory.Documents
const CATEGORY_FILE_EXTENSION = '.json'
const Types = {
  File: 'file',
  Directory: 'directory'
}

export class DiskController implements ProductsController {

  path: string
  directory: Directory

  constructor(path: string = DEFAULT_APP_PATH, directory: Directory = DEFAULT_APP_DIRECTORY) {
    this.path = path
    this.directory = directory
  }

  async exists(path: string): Promise<boolean> {
    try {
      await fs.stat({
        path: path,
        directory: this.directory
      })
      return true
    }
    catch (e) {
      return false
    }
  }

  getCategoryPath(name: string): string {
    return this.path + name + CATEGORY_FILE_EXTENSION
  }

  getPathAndDir() {
    return { path: this.path, directory: this.directory }
  }

  async addCategory(name: string): Promise<void> {
    const categoryExists = await this.fs.exists(this.getCategoryPath(name), Types.File)
  }

  addProduct(name: string, category: string): void {
  }

  deleteCategory(name: string): void {
  }

  deleteProduct(name: string, category: string): void {
  }

  async loadData(): Promise<Category[]> {
    const dirExists = await this.exists(this.path)
    if (!dirExists) {
      await fs.mkdir({
        ...this.getPathAndDir(),
        recursive: true
      })
      return []
    }
    const readResult = await fs.readdir(this.getPathAndDir())
    const files = readResult.files
    return await Promise.all(files.map(async file => fs.readFile()readFile(this.path + file.name)))
  }
}