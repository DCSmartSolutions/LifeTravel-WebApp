import { Injectable } from '@angular/core';
import {
  Auth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut,
  signInWithPopup, GoogleAuthProvider
} from '@angular/fire/auth';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthCustomService {

  constructor(private auth: Auth,private cookieService: CookieService) { }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    setTimeout(() => {
      this.cookieService.delete('JSESSIONID');
      this.cookieService.delete('JUID');
    }, 3000);
    return signOut(this.auth);
  }
}
