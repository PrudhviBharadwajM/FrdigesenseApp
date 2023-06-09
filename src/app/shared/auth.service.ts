import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  //login
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['dashboard']);
      }, err =>{
        alert(err.message);
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  //register
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        alert('Registration successful');
        this.router.navigate(['/login']);
      }, err =>{
        alert(err.message);
        this.router.navigate(['/register']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  
  //logout
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err =>{
      alert(err.message);
    });
  }

}
