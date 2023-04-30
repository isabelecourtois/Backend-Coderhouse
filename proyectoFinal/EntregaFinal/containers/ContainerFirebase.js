import admin from "firebase-admin";
import fs from "fs";

export const serviceAccount = JSON.parse(fs.readFileSync( "./FirebaseDb/backendcoder-8a09a-firebase-adminsdk-2twaq-1a20208756.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

class ContainerFirebase {

  constructor(collection, serviceAccount) {
    this.collection = collection;
    this.db = admin.firestore();

   /*  admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    }); */
    
  }

  async save(producto) {
    try {
      const query = this.db.collection(this.collection);
      return (await query.add(producto)).id;
    } catch (error) {
      console.log(error);
    } 
  }

  async getById(id) {
    try {
      const doc = this.db.collection(this.collection).doc(id);
      return (await doc.get()).data();
    } catch (error) {
      console.log(error);
    } 
  }

  async getAll() {

    try {
      const doc = this.db.collection(this.collection);
      const docs = [];
      const response = await doc.get();
      response.forEach(doc => {
        docs.push(doc.data())
      })
      return docs;
    } catch (error) {
      console.log(error);
    } 
  }

  async deleteById(id) {
    try {
        const doc = this.db.collection(this.collection).doc(id);
        return await doc.delete();
      } catch (error) {
        console.log(error);
      } 
  }
  async update(id, newObject) {
    try {
      const query = this.db.collection(this.collection).doc(id);
      return await query.update(newObject);
    } catch (error) {
      console.log(error);
    } 
  }

}
export default ContainerFirebase