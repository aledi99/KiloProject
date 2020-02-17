import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Caja } from '../models/cajas.interface';
import { CajaDto } from '../models/dto/cajas.dto';
import { FirestoreResponse } from '../models/firestoreresponse.interface';
import { Producto } from '../models/producto.interface';
import { ProductoService } from './producto.service';

const collectionName = 'cajas'
const collectionName2 = 'productos' 

@Injectable({
  providedIn: 'root'
})
export class CajasService {

  constructor(private db: AngularFirestore, private productoService: ProductoService) { }

  public getCajas() {
    return this.db.collection<Caja>(collectionName).snapshotChanges();
  }

  public getTotal(total: number) {
    total = 0;
    const lista = this.db.collection<Caja>(collectionName).snapshotChanges();

    lista.forEach((caja:any) => {
      total = Number(total) + 1
    })

    return total;
  }

  public createCaja(cajaDto: CajaDto): Promise<DocumentReference> {
    const productoCollection = this.db.collection<Caja>(collectionName);
    // TODO: faltaría pasar un dto.
    return productoCollection.add(cajaDto.transformarDto());
  }

  public anyadirCantidad(id: string, cantidadAnterior: number, cantidadEscrita: number): Promise<void> {
    let max = 9999;
    let cantidadACambiar = 0;

    if (cantidadEscrita < 0) {
      cantidadEscrita = 0;
    }

    let cantidadTotal = Number(cantidadAnterior) + Number(cantidadEscrita);

    if (cantidadTotal > 10000) {
      cantidadTotal = max;
    }

    return this.db.collection(collectionName).doc(id).update({
      cantidadTotal: cantidadTotal
    });
  }

  public deleteCaja(id: string): Promise<void> {
    const entidadCollection = this.db.collection<Caja>(collectionName);
    return entidadCollection.doc(id).delete();
  }

  public getByEntidad(idEntidad: string) {
    return this.db.collection<Caja>(collectionName, ref =>
      ref.where('idEntidad', '==', idEntidad)).valueChanges();
  }

  public eliminarCantidad(id: string, cantidadAnterior: number, cantidadEscrita: number): Promise<void> {
    let min = 0;
    let cantidadTotal = Number(cantidadAnterior) - Number(cantidadEscrita);

    if (cantidadTotal > cantidadAnterior) {
      cantidadTotal = min;
    }

    return this.db.collection(collectionName).doc(id).update({
      cantidadTotal: cantidadTotal
    });
  }


}
