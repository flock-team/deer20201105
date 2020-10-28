import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { UserData } from 'src/app/interfaces/user-data';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { DeleteUserDialogComponent } from '../../delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  readonly titleMaxLength = 30;
  readonly messageMaxLength = 500;
  readonly nameMaxLength = 20;

  processing = false;

  form = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.maxLength(this.titleMaxLength)],
    ],
    message: [
      '',
      [Validators.required, Validators.maxLength(this.messageMaxLength)],
    ],
    name: ['', [Validators.required, Validators.maxLength(this.nameMaxLength)]],
    status: ['', [Validators.required, Validators.pattern(/leaved|playing/)]],
    joinedDate: ['', [Validators.required]],
    leavedDate: [''],
    isPublic: [false],
  });

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authService.user$
      .pipe(take(1))
      .toPromise()
      .then((user: UserData) => {
        this.form.patchValue({
          name: user.name || '',
          title: user.title || '',
          message: user.message || '',
          status: user.status || '',
          joinedDate: user.joinedDate || '',
          leavedDate: user.leavedDate || '',
          isPublic: user.isPublic || false,
        });
      });
  }

  updateUser() {
    this.processing = true;
    const formData = this.form.value;
    this.userService.updateUser(formData, this.authService.uid).then(() => {
      this.processing = false;
    });
  }

  openDeleteUserDialog() {
    this.dialog.open(DeleteUserDialogComponent, {
      width: '400px',
      autoFocus: false,
      restoreFocus: false,
    });
  }
}
