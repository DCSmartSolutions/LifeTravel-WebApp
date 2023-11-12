import {Component, OnInit} from '@angular/core';
import {FormGroup, UntypedFormBuilder, Validators} from "@angular/forms";
import {FirebaseAuthCustomService} from "../../services/firebase-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  signUpForm: FormGroup = new FormGroup({});
  constructor(    private fireAuthCustomService: FirebaseAuthCustomService,
                  private formBuilder: UntypedFormBuilder,
                  private router: Router) {
    this.signUpForm = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.email],updateOn: 'change'}],
      password: ['', { validators: [Validators.required, Validators.minLength(6)]}],
      confirmPassword: ['', { validators: [Validators.required, Validators.minLength(6)]}],
    });
  }
  roles: any[] = [
    {name: 'Agency', selected: false, icon: 'assets/images/authentication/travel-agency.png'},
    {name: 'Tourist', selected: false, icon: 'assets/images/authentication/tour-guide.png'},
  ]
  ngOnInit() {
  }
  signUp(){
    this.fireAuthCustomService.register(this.signUpForm.value)
      .then((response: any) => {
        console.log(response);
        this.router.navigate(['/authentication', 'login']);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
  back(){
    this.router.navigate(['/authentication', 'login']);
  }
  get doesPasswordsMatch(){
    return this.signUpForm.get('password')?.value === this.signUpForm.get('confirmPassword')?.value;
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get hasLessThanSixCharacters(){
    return this.signUpForm.get('password')?.value.length < 6 && this.signUpForm.get('password')?.touched;
  }

  selectRole(role: any) {
    if(role.name === 'Agency'){
      this.roles[0].selected = true;
      this.roles[1].selected = false;
    }else{
      this.roles[0].selected = false;
      this.roles[1].selected = true;
    }
  }
}
