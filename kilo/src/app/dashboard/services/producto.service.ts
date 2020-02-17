import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, DocumentChangeAction, DocumentSnapshot, Action } from '@angular/fire/firestore';
import { Producto } from '../models/producto.interface';
import { ProductoDto } from '../models/dto/producto.dto';
import { Observable } from 'rxjs';
import { FirestoreResponse } from '../models/firestoreresponse.interface';


const collectionName = 'productos'

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private db: AngularFirestore) { }

  public getProductos() {
    return this.db.collection<Producto>(collectionName).snapshotChanges();
  }

  public createProducto(productoDto: ProductoDto): Promise<DocumentReference> {
    const productoCollection = this.db.collection<Producto>(collectionName);
    // TODO: faltaría pasar un dto.
    return productoCollection.add(productoDto.transformarDto());
  }

  public findById(id: string) {
    return this.db.collection(collectionName).doc<Producto>(id).snapshotChanges();
  }

  public anyadirCantidad(id: string, cantidadAnterior: number, cantidadEscrita: number): Promise<void> {
    let max = 9999;

    if (cantidadEscrita < 0) {
      cantidadEscrita = 0;
    }

    let cantidadTotal = Number(cantidadAnterior) + Number(cantidadEscrita);

    if (cantidadTotal > 10000) {
      cantidadTotal = max;
    }

    return this.db.collection(collectionName).doc(id).update({
      cantidad: cantidadTotal
    });
  }

  public updateCantidad(cantidad: number, idProducto: string): Promise<void> {

    return this.db.collection(collectionName).doc(idProducto).update({
      cantidad: cantidad
    })
  }


  public eliminarCantidad(id: string, cantidadAnterior: number, cantidadEscrita: number): Promise<void> {
    let min = 0;
    let cantidadTotal = Number(cantidadAnterior) - Number(cantidadEscrita);

    if (cantidadTotal > cantidadAnterior) {
      cantidadTotal = min;
    }

    return this.db.collection(collectionName).doc(id).update({
      cantidad: cantidadTotal
    });
  }

  public editProducto(id: string, productoDto: ProductoDto): Promise<DocumentReference> {
    const productoCollection = this.db.collection<Producto>(collectionName);
    // TODO: faltaría pasar un dto.
    productoCollection.doc(id).delete();
    return productoCollection.add(productoDto.transformarDto());
  }

  public deleteProducto(id: string): Promise<void> {
    const productoCollection = this.db.collection<Producto>(collectionName);
    return productoCollection.doc(id).delete();
  }

}
