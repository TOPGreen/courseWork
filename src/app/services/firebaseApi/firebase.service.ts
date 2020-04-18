import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) {
  }

  public addData(collection, data) {
    this.firestore.collection(collection).add(data)
  }

  public getData(collection) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection(collection).snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots.map((el: any) => Object.assign(el.payload.doc.data(), {id: el.payload.doc.id})))
        });
    })

    //this.firestore.collection(collection).valueChanges();
  }

  public updateData(collection, filmId, data) {
    return this.firestore.collection(collection).doc(filmId).set(data);
  }

  public deleteData(collection, filmId) {
    return this.firestore.collection(collection).doc(filmId).delete();
  }

  public async getDocumentById(collection, id) {
    let doc;
    let data = await new Promise<any>((resolve, reject) => {
      this.firestore.collection(collection).snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots.map((el: any) => Object.assign(el.payload.doc.data(), {id: el.payload.doc.id})))
        })
    });

    data.forEach(el => {
      if (el.id === id) {
        doc = el
      }
    });

    return doc;
  }
}
