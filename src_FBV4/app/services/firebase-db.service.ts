import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';

export interface Objeto{
  id?: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseDBService {

 
  constructor( public afDB: AngularFireDatabase) { }
  private ObjetosRef = this.afDB.list('objetos');
  getObjeto(){
    return this.ObjetosRef.valueChanges();
  }
  guardarObjeto(object: Objeto){
    if(object.name ==""){
      object.name = "Antonio";
    }
    return this.afDB.database.ref('objetos/'+ object.name).set(object);
  }
}
