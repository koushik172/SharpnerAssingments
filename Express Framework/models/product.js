import fs from "fs";

const products = [];
const p = "./products.txt";

export class Product {
  constructor(title, size) {
    this.title = title;
    this.size = size;
  }

  save() {
    products.push(this);
    fs.writeFileSync(p, JSON.stringify(products), (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  static fetchAll() {
    fs.readFileSync(p, (err, fileContent) => {
      if (err) {
        return [];
      }
      let data = JSON.parse(fileContent);
      return data;
    });
  }
}
