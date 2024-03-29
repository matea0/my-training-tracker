import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({providedIn: "root"})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(this.errorHandler), tap(response => {
        this.handleAuth(
          response.email,
          response.localId,
          response.idToken,
          +response.expiresIn);
      }));
    //return because it's an observable
  }

  private handleAuth(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn*1000);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD-8fiHOu5vp12KxNZPaLiviK3uuwTd2pU",
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(this.errorHandler), tap(response => {
        this.handleAuth(
          response.email,
          response.localId,
          response.idToken,
          +response.expiresIn
        );
      }));
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if(loadedUser.token) {
      this.user.next(loadedUser);
      const expiration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expiration);
    }
  }

  private errorHandler(errorResponse: HttpErrorResponse) {
    let errorMessage = "Error!";
    switch (errorResponse.error.error.massage) {
      case 'EMAIL_EXISTS':
        errorMessage = "Email already exists!";
        break;
      case 'USER_DISABLED':
        errorMessage = "User has been disabled!";
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "Incorrect email!";
        break;
      case 'INVALID_PASSWORD':
        errorMessage = "Incorrect password!";
        break;
    }
    return throwError(errorMessage);
  }

  logout () {
    this.user.next(null);
    this.router.navigate(["/auth"]);
    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout (expirationDuration: number) {
    this.tokenExpirationTimer =
    setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
