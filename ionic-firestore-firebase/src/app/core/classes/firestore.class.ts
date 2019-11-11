import { AngularFirestoreCollection, QueryFn, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export abstract class Firestore<T> {
    protected collection: AngularFirestoreCollection<T>;

    constructor(protected db: AngularFirestore) { }

    protected setCollection(path: string, queryFn?: QueryFn) {
        this.collection = path ? this.db.collection(path, queryFn) : null;
    }

    getAll(): Observable<T[]> {
        return this.collection.valueChanges();
    }
}
