import {
  Directory,
  Encoding,
  FileInfo,
  Filesystem as fs
} from "@capacitor/filesystem";


export const Types = {
  File: 'file',
  Directory: 'directory'
}

export class FileSystem {
  directory: Directory

  constructor(dir: Directory = Directory.Documents) {
    this.directory = dir
  }

  async exists(path: string, type: string): Promise<boolean> {
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

  async createDir(path: string): Promise<void> {
    const dirExists = await this.exists(path, Types.Directory)
    if (dirExists) return

    await fs.mkdir({
      path: path,
      directory: this.directory,
      recursive: true
    })
  }

  async readDir(path: string): Promise<FileInfo[]> {
    const folderExists = await this.exists(path, Types.Directory)
    if (!folderExists) return []

    const folderContents = await fs.readdir({
      path: path,
      directory: this.directory
    })

    return folderContents.files
  }

  async readFile(path: string) {
    const contents = await fs.readFile({
      path: path,
      directory: Directory.Documents,
      encoding: Encoding.UTF8
    })
    return JSON.parse(contents.data)
  }
}