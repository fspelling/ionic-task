import { AngularFirestoreCollection, QueryFn, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export abstract class Firestore<T extends { id: string }> {
    protected collection: AngularFirestoreCollection<T>;

    constructor(protected db: AngularFirestore) { }

    protected setCollection(path: string, queryFn?: QueryFn) {
        this.collection = path ? this.db.collection(path, queryFn) : null;
    }

    getAll(): Observable<T[]> {
        return this.collection.valueChanges();
    }

    getById(item: string): Observable<T> {
        return this.collection.doc<T>(item).valueChanges();
    }

    create(item: T): Promise<T> {
        item.id = this.db.createId();
        return this.setItem(item, 'set');
    }

    update(item: T): Promise<T> {
        return this.setItem(item, 'update');
    }

    delete(item: T): Promise<void> {
        return this.collection.doc<T>(item.id).delete();
    }

    private setItem(item: T, operation: 'set' | 'update'): Promise<T> {
        return this.collection
            .doc<T>(item.id)
            [operation](item)
            .then(() => item);
    }
}
