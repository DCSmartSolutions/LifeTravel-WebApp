import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormGroup, UntypedFormBuilder, Validators} from "@angular/forms";
import {FirebaseAuthCustomService} from "../../services/firebase-auth.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SpinnerComponent} from "../../../shared/components/spinner/spinner.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  credentialsError: boolean = false;
  private dialog: MatDialogRef<SpinnerComponent> | undefined;
  constructor(
    private fireAuthCustomService: FirebaseAuthCustomService,
    private formBuilder: UntypedFormBuilder,
    private cookieService: CookieService,
    private router: Router,
    private matDialog: MatDialog,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', {validators: [Validators.required, Validators.email], updateOn: 'change'}],
      password: ['', {validators: [Validators.required]}]
    });
  }

  ngOnInit(): void {
    if (this.cookieService.get('JSESSIONID')) {
      this.router.navigate(['/peru']);
    }
  }

  onSubmit() {
    this.showSpinnerDialog();
    this.clearCookies()
    this.fireAuthCustomService.login(this.loginForm.value)
      .then((response: any) => {
        console.log(response)
        this.cookieService.delete('JSESSIONID')
        this.cookieService.delete('JUID')
        this.cookieService.set('JUID', response.user.uid);
        this.cookieService.set('JSESSIONID', response.user.accessToken);
        this.hideSpinnerDialog()
        this.router.navigate(['/peru']);
      })
      .catch((error: any) => {
        console.log(error);
        this.credentialsError = true;
        this.hideSpinnerDialog()
      });

  }

  onClick() {
    this.showSpinnerDialog()
    this.clearCookies()
    this.fireAuthCustomService.loginWithGoogle()
      .then((response: { user: any; }) => {
        this.cookieService.delete('JSESSIONID')
        this.cookieService.delete('JUID')
        this.cookieService.set('JUID', response.user.uid);
        this.cookieService.set('JSESSIONID', response.user.accessToken);
        this.hideSpinnerDialog()
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

  clearCookies() {
    this.cookieService.delete('JUID');
    this.cookieService.delete('JSESSIONID');
  }
  showSpinnerDialog() {
    this.dialog = this.matDialog.open(SpinnerComponent, {
      panelClass: 'custom-dialog',
      disableClose: true
    });
  }

  hideSpinnerDialog() {
    this.dialog?.close();
  }
}
