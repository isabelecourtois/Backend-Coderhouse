import mongoose from "mongoose";
import * as model from "./data/modelsMongo/producto.js";
//import * as model from "./modelsMongo/carrito.js";


class ContainerMongo {
  constructor(model) {
    //this.URL = URL;
    this.model = model;
  }

  async save(producto) {
    try {
       
      const saveModel = new this.model(producto);
      return await saveModel.save();
    } catch (error) {
      console.log(error);
    } 
  }

  async getById(id) {
    try {
        /* await mongoose.connect(this.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }); */
      return await this.model.find({ _id: id });
    } catch (error) {
      console.log(error);
    } 
  }

  async getAll() {
    try {
       /*  await mongoose.connect(this.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }); */
      return await this.model.find();
    } catch (error) {
      console.log(error);
    } 
  }

  async deleteById(id) {
    try {
        /* await mongoose.connect(this.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }); */
      return await this.model.deleteOne({_id: id});
    } catch (error) {
      console.log(error);
    } 
  }

  async update(id, elemento) {
    try {
        /* await mongoose.connect(this.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }); */
      return await this.model.updateOne({ _id: id }, elemento);
    } catch (error) {
      console.log(error);
    } 
  }

}
export default ContainerMongo