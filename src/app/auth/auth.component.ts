import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

import {AuthResponseData, AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = "";

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password)
    } else {
      authObservable = this.authService.signUp(email, password)
    }

    authObservable.subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(["/trainings"]);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
      form.reset();
  }
}
