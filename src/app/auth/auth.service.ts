import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

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
  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD-8fiHOu5vp12KxNZPaLiviK3uuwTd2pU",
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(this.errorHandler));
    //return because it's an observable
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD-8fiHOu5vp12KxNZPaLiviK3uuwTd2pU",
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(this.errorHandler));
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
}
