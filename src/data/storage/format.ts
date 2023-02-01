export interface Controller {
  getData: (url: string) => object
  putData: (url: string, data: string) => void
}

class Storage implements Controller {
  getData(url: string): object {
    return {}
  }

  putData(url: string, data: string): void {
    return
  }
}