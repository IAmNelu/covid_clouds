import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private phUser = "https://firebasestorage.googleapis.com/v0/b/covid2-36557.appspot.com/o/user_holder.png?alt=media&token=880699ee-62cc-470d-b730-a3cdc156877b"
  private user: User;
  private _subject = new Subject<any>();

  constructor(private afAuth: AngularFireAuth, private fireStore: AngularFirestore) { }

  async signInWithGoogle() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(async credentials => {
      this.user = {
        email: credentials.additionalUserInfo.profile['email'],
        displayName: credentials.additionalUserInfo.profile['name'],
        uid: credentials.additionalUserInfo.profile['id'],
        plink: credentials.additionalUserInfo.profile['picture'],
        permissions: await this.getPermissions(credentials.additionalUserInfo.profile['id'])
      }
      localStorage.setItem("user", JSON.stringify(this.user));
      return "OK";
    }).catch((error) => {
      return error;
    });



  }

  async sigInWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(async credentials => {
      let idUser = credentials.user.uid;
      await this.fireStore.collection("users_mails").doc(idUser).get().toPromise().then(all_data => {
        if (all_data.exists) {
          let res = all_data.data();
          this.user = {
            email: res.email,
            displayName: res.displayName,
            uid: res.uid,
            plink: res.plink,
            permissions: res.permissions
          }
          localStorage.setItem("user", JSON.stringify(this.user));
        }
      });
      return "OK";
    }).catch((error) => {
      return error;
    });

  }
  async sigUpWithEmailAndPassword(email: string, password: string, name: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(async credentials => {
      let idUser = credentials.user.uid;
      this.user = {
        email: email,
        displayName: name,
        uid: credentials.user.uid,
        plink: this.phUser,
        permissions: await this.getPermissions(credentials.user.uid)
      }
      this.fireStore.collection("users_mails").doc(idUser).set(
        {
          email: email,
          displayName: name,
          uid: credentials.user.uid,
          plink: this.phUser,
          permissions: this.user.permissions
        },
        { merge: true });
      localStorage.setItem("user", JSON.stringify(this.user));
      return "OK";
    }).catch((error) => {
      return error;
    });

  }


  async getPermissions(user_id: string) {
    let doc = await this.fireStore.collection('users').doc(user_id).get().toPromise();
    if (doc.exists) {
      return doc.data()['permissions']
    }
    return []
  }

  isUserLogged() {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) return true;
    return false;
  }

  get_user_id() {
    let user: User = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return "";
    }
    return user.uid;
  }

  newEvent(event) {
    this._subject.next(event);
  }

  get events$() {
    return this._subject.asObservable();
  }

  async isAlowedToPost(country: string): Promise<boolean> {
    let usr_id = this.get_user_id();
    let persmission_list = await this.getPermissions(usr_id);
    if (persmission_list[0] == "all") {
      return true;
    }
    if (persmission_list.includes(country)) {
      return true;
    }
    return false;
  }

}
