'use strict';

class SettingsController {
  //start-non-standard
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, userService) {
    this.Auth = Auth;
    this.userService = userService;

    Auth.getCurrentUser(userObject => {
      this.info = {
        name: userObject.name,
        city: userObject.city,
        state: userObject.state
      };
    });
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }

  updateInfo() {
    this.userService.updateInfo(this.info);
  }
}

angular.module('tradingappApp')
  .controller('SettingsController', SettingsController);
