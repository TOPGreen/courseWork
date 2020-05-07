import {Injectable} from '@angular/core';
import {AngularFirestore, QuerySnapshot} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) {
  }

  public updateData(collection: string, data: any, doc: any): void {
    if (!doc) {
      this.firestore.collection(collection).add(data)
    } else {
      this.firestore.collection(collection).ref.doc(doc.id).set(data);
    }
  }

  getUsersList(collection: string, userId: string): Promise<QuerySnapshot<any>> {
    return this.firestore.collection(collection).ref.where("userId", "==", userId).get();
  }
}
