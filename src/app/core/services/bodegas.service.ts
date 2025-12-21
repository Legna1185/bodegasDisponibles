import { Injectable } from '@angular/core';
import { Bodega } from '../models/bodega.model';
import { Observable, of } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class BodegasService {
private data: Bodega[] = [
{ id: 1, nombre: 'Bodega Norte', ubicacion: 'Monterrey, NL', superficieM2: 1200, precioMensual: 45000, disponible: true },
{ id: 2, nombre: 'Bodega Centro', ubicacion: 'San Nicolás, NL', superficieM2: 800, precioMensual: 32000, disponible: false },
{ id: 3, nombre: 'Bodega Sur', ubicacion: 'Guadalupe, NL', superficieM2: 1500, precioMensual: 60000, disponible: true }
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