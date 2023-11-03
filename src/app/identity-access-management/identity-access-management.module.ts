import {NgModule} from '@angular/core';
import {LoginComponent} from "./pages/login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {AuthModule, getAuth, provideAuth} from "@angular/fire/auth";
import {ReactiveFormsModule} from "@angular/forms";
import {environment} from "../../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";

const routes: Routes = [
  {
    path: 'sign-in',
    component: LoginComponent,
  },
  {
    path: '',
    component: LoginComponent,
  }
]
@NgModule({
  declarations: [
    LoginComponent,
  ],
  exports: [RouterModule],
  imports: [
    RouterModule.forChild(routes),
    AuthModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgIf,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    MatInputModule,
  ]
})
export class IdentityAccessManagementModule {
}
