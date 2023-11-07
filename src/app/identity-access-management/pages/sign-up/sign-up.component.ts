import {Component, OnInit} from '@angular/core';
import {FormGroup, UntypedFormBuilder, Validators} from "@angular/forms";
import {FirebaseAuthCustomService} from "../../services/firebase-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  signUpForm: FormGroup = new FormGroup({});
  constructor(    private fireAuthCustomService: FirebaseAuthCustomService,
                  private formBuilder: UntypedFormBuilder,
                  private router: Router) {
    this.signUpForm = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.email],updateOn: 'change'}],
      password: ['', { validators: [Validators.required]}],
      confirmPassword: ['', { validators: [Validators.required]}]
    });
  }
  ngOnInit() {
  }
  signUp(){

  }
  back(){
    this.router.navigate(['/authentication', 'login']);
  }
}
