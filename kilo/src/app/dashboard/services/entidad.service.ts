import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Entidad } from '../models/entidad.interface';
import { EntidadDto } from '../models/dto/entidad.dto';

const collectionName = 'entidades'

@Injectable({
  providedIn: 'root'
})
export class EntidadService {

  constructor(private db: AngularFirestore) { }

  public getEntidades() {
    return this.db.collection<Entidad>(collectionName).snapshotChanges();
  }

  public getValue() {
    return this.db.collection<Entidad>(collectionName).valueChanges();
  }

  public findById(id: string) {
    return this.db.collection(collectionName).doc<Entidad>(id).snapshotChanges();
  }

  public createEntidad(entidadDto: EntidadDto): Promise<DocumentReference> {
    const entidadCollection = this.db.collection<Entidad>(collectionName);
    // TODO: faltaría pasar un dto.
    return entidadCollection.add(entidadDto.transformarDto());
  }

  public editEntidad(id: string, entidadDto: EntidadDto): Promise<void> {
    const entidadCollection = this.db.collection<Entidad>(collectionName);
    // TODO: faltaría pasar un dto.
    entidadCollection.doc(id).delete();
    return entidadCollection.doc(id).set({
      nombre: entidadDto.nombre,
      personal: entidadDto.personal,
      telf: entidadDto.telf,
      direccion: entidadDto.direccion
    })
  }

  public deleteEntidad(id: string): Promise<void> {
    const entidadCollection = this.db.collection<Entidad>(collectionName);
    return entidadCollection.doc(id).delete();
  }

}
