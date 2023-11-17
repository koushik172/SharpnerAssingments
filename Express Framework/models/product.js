import fs from "fs";

export class Product {
  constructor(title, size) {
    this.title = title;
    this.size = size;
  }

  save() {
    let data;
    try {
      data = JSON.parse(fs.readFileSync("./data.txt"));
    } catch {
      data = [];
    }
    data.push(this);
    fs.writeFileSync("./data.txt", JSON.stringify(data));
  }

  static fetchAll() {
    let data = JSON.parse(fs.readFileSync("./data.txt"));
    return data;
  }
}
