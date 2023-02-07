import { Directory, Encoding, FileInfo, Filesystem as fs } from "@capacitor/filesystem";


export class FileSystem {
  directory: Directory

  constructor(dir: Directory = Directory.Documents) {
    this.directory = dir
  }

  setDirectory(dir: Directory) {
    this.directory = dir
  }

  async exists(path: string): Promise<boolean> {
    const options = {
      directory: this.directory,
      path: path
    }

    try {
      await fs.stat(options)
      return true
    }
    catch (e) {
      return false
    }
  }

  async makeDir(path: string): Promise<void> {
    const dirExists = await this.exists(path)
    if (dirExists) return

    await fs.mkdir({
      path: path,
      directory: this.directory,
      recursive: true
    })
  }

  async writeFile(path: string, data: string): Promise<void> {
    await fs.writeFile({
      path: path,
      directory: this.directory,
      encoding: Encoding.UTF8,
      data: data
    })
  }

  async readDir(path: string): Promise<FileInfo[]> {
    const dirExists = await this.exists(path)
    if (!dirExists) return []

    const folderContents = await fs.readdir({
      path: path,
      directory: this.directory
    })

    return folderContents.files
  }

  async readFile(path: string) {
    const fileExists = await this.exists(path)
    if (!fileExists) return {}

    const contents = await fs.readFile({
      path: path,
      directory: Directory.Documents,
      encoding: Encoding.UTF8
    })
    return JSON.parse(contents.data)
  }
}