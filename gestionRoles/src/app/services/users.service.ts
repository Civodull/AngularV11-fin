import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http'
//import {HttpClient,RequestOptions} from '@angular/common/http'
//import {Http,} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _registerUrl = "http://localhost:3000/api/sendMail";
  //ajout d'un utilisateur dans la bd
  constructor(private firestore:AngularFirestore,
    private http:HttpClient) { }
  
archiver(id:string,data:any):Promise<any> {
  return this.firestore.collection('users').doc(id).update(data);
}
  ajouterUser(unUser:any):Promise<any> {
    return this.firestore.collection('users').add(unUser);
  }
  
  //recuperation d'un utilisateur dans la bd
  getUser():Observable<any> {
    return this.firestore.collection('users', ref=>ref.orderBy('nom', 'asc')).snapshotChanges();
  }

  //Suppression d'un utilisateur dans la bd a partir de son id
deleteUser(id:string):Promise<any> {
return this.firestore.collection('users').doc(id).delete();
}
//Methode de recuperer d'un utilisateur sur firebase a partir de son id
getUserFirebase(id:string):Observable<any> {
  return this.firestore.collection('users').doc(id).snapshotChanges();
}
//Mise à jour de l'utilisateur      
updateUser(id:any,data:any):Promise<any> {
  return this.firestore.collection('users').doc(id).update(data);
}
motDePasseOublier(data:any):Promise<any> {
  return this.firestore.collection('users').doc().update(data);
}
//envoie email
registerUser(unUser:any){
  return this.http.post<any>(this._registerUrl, unUser)
}

}
