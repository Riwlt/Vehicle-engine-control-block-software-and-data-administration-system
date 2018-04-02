import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { IUserDetails } from '../../user/user.interface';
import { MessageService } from '../../common/message/message.service';
import { AppConstants } from '../../../../app.constants';
import { HeaderComponent } from '../../header/header.component';
import { AuthenticationService } from '../../../../authentication/authentication.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ReactiveFormsModule, NgForm, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
  providers: [UserService, MessageService, HeaderComponent, AuthenticationService, ConfirmationService]
})
export class ManageUsersComponent implements OnInit {
  username: String;
  kick: number;
  users: IUserDetails[] = [];
  dialogModel: IUserDetails[] = [];
  userDialogModel: IUserDetails[] = [];
  displayDialog: boolean;
  displayUserDialog: boolean;
  roleArray = AppConstants.USER_ROLE_ARRAY;
  userForm: FormGroup;

  constructor(
    private service: UserService,
    private header: HeaderComponent,
    private auth: AuthenticationService,
    private router: Router,
    private message: MessageService,
    private confirmationService: ConfirmationService,
    private _fb: FormBuilder

  ) {
    this.getUsers();
  }

  ngOnInit() {

    this.userForm = this._fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(250)]),
      password: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(250)]),
      role: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(250)])
    });
  }

  showUser() {
    this.displayUserDialog = true;
  }

  updateUser(dialogModel) {
    // Kicking the user out if he changed his own username
    this.username = dialogModel.username;
    if (this.kick === 1) {
      this.service.updateUserById(dialogModel).then(
        () => {
          this.auth.logout();
          this.router.dispose();
          window.location.href = 'http://localhost:4200/login';
        }
      );
    } else {
      this.service.updateUserById(dialogModel);
    }
  }

  onDialogHide() {
    this.kick = 0;
  }

  selectUsers(users) {
    this.dialogModel = users;
    if (this.header.returnUsername() === users.username) {
      this.kick = 1;
    }
    this.displayDialog = true;
  }

  removeUser(users) {
    if (this.kick === 1) {
      this.message.showMessage('error', 'Warning', 'You cannot remove yourself.');
    } else {
      this.service.removeUserById(users.id).then(
        () => { this.message.showMessage('success', 'Success', 'User removed successfully.'); }
      );
    }
  }

  confirmDeletion(users) {
    this.confirmationService.confirm({
      message: 'You are going to delete ' + users.username + ' are you sure?',
      header: 'Confirmation',
      icon: 'fa fa-question-circle',
      accept: () => {
        this.message.showMessage('success', 'Success', 'User deleted successfully.');
        this.removeUser(users);
      },
      reject: () => {
        this.message.showMessage('info', 'Info', 'User has not been deleted.');
      }
    });
  }

  addUser() {
    if (this.checkForDuplicates(this.userName.value) === false) {
      this.service.addNewUser(this.userForm.value);
      this.ngOnInit();
    } else {

    }
  }

  checkForDuplicates(username) {
    if (this.users.find(x => x.username === username)) {
      this.message.showMessage('error', 'Error', 'Username already exists.');
      return true;
    } else {
      return false;
    }
  }
  getUsers() {
    this.service.getUsers().subscribe(
      (users) => { this.users = users; },
      (err) => { console.log(err); },
    );
  }
  get userName() { return this.userForm.get('username'); }
  get password() { return this.userForm.get('password'); }
  get userRole() { return this.userForm.get('role'); }

}
