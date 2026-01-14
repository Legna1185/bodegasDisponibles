import { Injectable } from '@angular/core';
import { Bodega } from '../models/bodega.model';
import { Observable, of } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class BodegasService {
private data: Bodega[] = [

];


getAll(): Observable<Bodega[]> { return of(this.data); }
getById(id: number): Observable<Bodega | undefined> { return of(this.data.find(x => x.id === id)); }
create(b: Bodega): Observable<Bodega> {
b.id = Math.max(...this.data.map(x => x.id), 0) + 1;
this.data.push(b);
return of(b);
}
update(id: number, b: Bodega): Observable<Bodega> {
const i = this.data.findIndex(x => x.id === id);
if (i > -1) this.data[i] = { ...b, id };
return of(this.data[i]);
}
remove(id: number): Observable<void> {
this.data = this.data.filter(x => x.id !== id);
return of(void 0);
}
}