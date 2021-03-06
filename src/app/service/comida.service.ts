import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { PlatoI} from '../model/plato_i';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  private comidaDoc : AngularFirestoreDocument<PlatoI>;  
  public coleccionComida : AngularFirestoreCollection<PlatoI>;

  constructor(public angularFirestore: AngularFirestore) { 
    this.coleccionComida = angularFirestore.collection<PlatoI>('food');
  }

  crearComida(comida: PlatoI){
    return this.coleccionComida.add(comida);
  }

  getAllPlatosPorRestaurante(idRestaurante: string){
    return this.coleccionComida.ref.where("restaurantId", "==", idRestaurante);
  }

  getPlatoPorId(idPlato : string){
    return this.coleccionComida.doc(idPlato).ref.get();
  }

  editarPlatoPorId(idPlato: string, plato: PlatoI){
    return this.coleccionComida.doc(idPlato).set(plato);
  }
  
  deleteComida(comida){
    this.comidaDoc = this.angularFirestore.doc<PlatoI>('food/'+comida.id);
    this.comidaDoc.delete();
  }

  getPlatosByEstado(estado: boolean){
    return this.coleccionComida.ref.where("food_state", "==", estado);
  }
}
