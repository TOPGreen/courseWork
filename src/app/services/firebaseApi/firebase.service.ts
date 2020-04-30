import {Injectable} from '@angular/core';
import {AngularFirestore, QuerySnapshot} from "@angular/fire/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) {
  }

  public updateData(collection: string, data: any, doc: any): void {
    console.log(data);
    if (!doc) {
      this.firestore.collection(collection).add(data)
    } else {
      this.firestore.collection(collection).ref.doc(doc.id).set(data);
    }
  }

  // public getData(collection: string): Observable<any> {
    // return new Promise<any>((resolve, reject) => {
    //   this.firestore.collection(collection).snapshotChanges()
    //     .subscribe(snapshots => {
    //       resolve(snapshots.map((el: any) => Object.assign(el.payload.doc.data(), {id: el.payload.doc.id})))
    //     });
    // })
    // return this.firestore.collection(collection).snapshotChanges();

    //this.firestore.collection(collection).valueChanges();
  // }

  // public updateData(collection: string, filmId: string, data: any): Promise<void> {
  //   return this.firestore.collection(collection).doc(filmId).set(data);
  // }

  // public deleteData(collection: string, filmId: string): Promise<void> {
  //   return this.firestore.collection(collection).doc(filmId).delete();
  // }

  public async getDocumentById(collection: string, id: string): Promise<any> {
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

  getUsersList(collection: string, userId: string): Promise<QuerySnapshot<any>> {
    return this.firestore.collection(collection).ref.where("userId", "==", userId).get();
  }
}
