import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { FirebaseAuthCustomService } from '../../services/firebase-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AgencyService } from '../../services/agency.service';
import { CookieService } from 'ngx-cookie-service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { set } from '@angular/fire/database';
import { Agency } from '../../models/agency.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({});
  private dialog: MatDialogRef<SpinnerComponent> | undefined;

  constructor(
    private fireAuthCustomService: FirebaseAuthCustomService,
    private userService: UserService,
    private agencyService: AgencyService,
    private formBuilder: UntypedFormBuilder,
    private cookieService: CookieService,
    private matDialog: MatDialog,
    private router: Router,
  ) {
    this.signUpForm = this.formBuilder.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'change',
        },
      ],
      password: [
        '',
        { validators: [Validators.required, Validators.minLength(6)] },
      ],
      confirmPassword: [
        '',
        { validators: [Validators.required, Validators.minLength(6)] },
      ],
      role: ['Agency', { validators: [Validators.required] }],
    });
  }

  roles: any[] = [
    {
      name: 'Agency',
      selected: true,
      icon: 'assets/images/authentication/travel-agency.png',
    },
    {
      name: 'Tourist',
      selected: false,
      icon: 'assets/images/authentication/tour-guide.png',
    },
  ];

  ngOnInit() {}

  signUp() {
    this.cookieService.delete('JSESSIONID');
    this.cookieService.delete('JUID');
    this.showSpinnerDialog();
    this.signUpForm
      .get('role')
      ?.setValue(this.roles.find((role) => role.selected)?.name);
    const user = this.signUpForm.value;

    this.fireAuthCustomService
      .register(this.signUpForm.value)
      .then(async (response: any) => {
        user.id = response.user.uid;

        await this.cookieService.set('JUID', response.user.uid, 1, '/');
        await this.cookieService.set(
          'JSESSIONID',
          response.user.accessToken,
          1,
          '/',
        );

        if (user.role === 'Agency') {
          this.userService
            .registerAgency(user, response.user.accessToken)
            .subscribe(() => {
              const agency = new Agency();
              this.agencyService
                .registerAgencyWithUserId(
                  user.id,
                  agency,
                  response.user.accessToken,
                )
                .subscribe((agencyResponse) =>
                  // !delete this console.log before merging with develop
                  console.log(agencyResponse),
                );
              this.hideSpinnerDialog();
              this.router.navigate(['/authentication', 'login']);
            });
        } else {
          this.userService
            .registerTourist(user, response.user.accessToken6)
            .subscribe(() => {
              this.hideSpinnerDialog();
              this.router.navigate(['/authentication', 'login']);
            });
        }
      })
      .catch((error: any) => {
        //console.log(error);
        this.hideSpinnerDialog();
      });
  }

  back() {
    this.router.navigate(['/authentication', 'login']);
  }

  get doesPasswordsMatch() {
    return (
      this.signUpForm.get('password')?.value ===
      this.signUpForm.get('confirmPassword')?.value
    );
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get hasLessThanSixCharacters() {
    return (
      this.signUpForm.get('password')?.value.length < 6 &&
      this.signUpForm.get('password')?.touched
    );
  }

  selectRole(role: any) {
    if (role.name === 'Agency') {
      this.roles[0].selected = true;
      this.roles[1].selected = false;
    } else {
      this.roles[0].selected = false;
      this.roles[1].selected = true;
    }
  }

  showSpinnerDialog() {
    this.dialog = this.matDialog.open(SpinnerComponent, {
      panelClass: 'custom-dialog',
      disableClose: true,
    });
  }

  hideSpinnerDialog() {
    this.dialog?.close();
  }

  clearCookies() {
    this.cookieService.delete('JUID');
    this.cookieService.delete('JSESSIONID');
  }
}
