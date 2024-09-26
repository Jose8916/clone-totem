import Gasolina from "./Gasolina1.json"

export class ProductService {

  getProductsMini() {
      return fetch(Gasolina).then(res => res.json()).then(d => d.data);
  }

  getProducts() {
      return fetch(Gasolina).then(res => res.json()).then(d => d.data);
  }

  getProductsWithOrdersSmall() {
      return fetch(Gasolina).then(res => res.json()).then(d => d.data);
  }
}