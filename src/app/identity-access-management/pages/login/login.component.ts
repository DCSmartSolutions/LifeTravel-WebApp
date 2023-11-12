import {Component, OnInit} from '@angular/core';
import {FormGroup, UntypedFormBuilder, Validators} from "@angular/forms";
import {FirebaseAuthCustomService} from "../../services/firebase-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup = new FormGroup({});
  credentialsError: boolean = false;

  constructor(
    private fireAuthCustomService: FirebaseAuthCustomService,
    private formBuilder: UntypedFormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.email],updateOn: 'change'}],
      password: ['', { validators: [Validators.required]}]
    });
  }

  ngOnInit():void {

  }

  onSubmit() {
    console.log(this.loginForm.value)
    this.fireAuthCustomService.login(this.loginForm.value)
      .then((response: any) => {
        console.log(response);
        this.router.navigate(['./peru']);
      })
      .catch((error: any) => {
        console.log(error);
        this.credentialsError = true;
      });

  }

  onClick() {
    this.fireAuthCustomService.loginWithGoogle()
      .then((response: { user: any; }) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        console.log(response);
        this.router.navigate(['/peru']);
      })
      .catch((error: any) => console.log(error))
  }

  goToRegister() {
    this.router.navigate(['/authentication', 'sign-up']);
  }

  get password() {
    return this.loginForm.get('password');
  }

  get email() {
    return this.loginForm.get('email');
  }

}
