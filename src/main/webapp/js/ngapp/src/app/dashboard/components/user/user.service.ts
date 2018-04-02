import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { MessageService } from '../common/message/message.service';
import { IUserDetails } from './user.interface';
import { AppConstants } from '../../../app.constants';


@Injectable()
export class UserService {

    constructor(
        private http: Http,
        private messageService: MessageService,
        private authenticationService: AuthenticationService) {

    }

    getUsers(): Observable<IUserDetails[]> {
        const headers = new Headers();
        this.authenticationService.createAuthorizationHeader(headers);
        return this.http.get(AppConstants.USER_SHOW_DETAILS_URL, { headers: headers })
            .map(result => result.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateUserById(dialogModel): Promise<IUserDetails[]> {
        const headers = new Headers();
        this.authenticationService.createAuthorizationHeader(headers);
        const formData: FormData = new FormData();
        this.messageService.showMessage('info', 'Info', 'Vehicle has been submitted.');
        formData.append('value', JSON.stringify(dialogModel));
        return this.http.post(AppConstants.USER_UPDATE_BY_ID_URL, formData, { headers: headers })
            .toPromise()
            .catch(this.handleError);
    }

    removeUserById(id) {
        const headers = new Headers();
        this.authenticationService.createAuthorizationHeader(headers);
        const formData: FormData = new FormData();
        this.messageService.showMessage('info', 'Info', 'Vehicle has been submitted.');
        formData.append('id', id);
        return this.http.post(AppConstants.USER_REMOVE_BY_ID_URL, formData, { headers: headers })
            .toPromise()
            .catch(this.handleError);
    }
    addNewUser(userDialogModel): Promise<IUserDetails[]> {
        const headers = new Headers();
        this.authenticationService.createAuthorizationHeader(headers);
        const formData: FormData = new FormData();
        this.messageService.showMessage('info', 'Info', 'Vehicle has been submitted.');
        formData.append('value', JSON.stringify(userDialogModel));
        return this.http.post(AppConstants.USER_ADD_NEW_URL, formData, { headers: headers })
            .toPromise()
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

}
