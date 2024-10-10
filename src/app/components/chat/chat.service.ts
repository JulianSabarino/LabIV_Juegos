import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getFirestore, onSnapshot, orderBy, QueryDocumentSnapshot, QuerySnapshot, doc, setDoc, query } from '@angular/fire/firestore';
import { MensajeChat } from './chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  private path = 'messages'
  dbFirebase =inject(Firestore)

  saveMessage(message: any)
  {
    addDoc(collection(getFirestore(),this.path),message);
  }

  getMensajes(funcion:(mensajes:MensajeChat[])=>void,finaly?:()=>void) {
    // Crear una consulta ordenada por el campo 'fecha' en orden ascendente
    const mensajeRef = collection(this.dbFirebase,this.path)
    
    const q = query(mensajeRef,orderBy('date'))
   // console.log(q);
    try{
      return onSnapshot(q,(snapshot:QuerySnapshot)=>{
        let mensajes :MensajeChat[] = [];
        snapshot.forEach((doc:QueryDocumentSnapshot)=>{
          let mensajeIn =  doc.data() as MensajeChat
          mensajes.push(mensajeIn)
        })
        //console.log(mensajes)
        funcion(mensajes)
        finaly?finaly():""
      })
    }catch(error){
      finaly?finaly():""
      return error
    }
  }

}
