import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  authForm: FormGroup;
  controlName = new FormControl('', [Validators.required, Validators.minLength(6)]);

  configs = {
    isLogin: true,
    action: 'Login',
    actionChange: 'Create Account'
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.authForm = this.createForm();
  }

  get name(): FormControl {
    return this.authForm.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.authForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.authForm.get('password') as FormControl;
  }

  private createForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onsubmit() {
  }

  changeActionAuth() {
    this.configs.isLogin = !this.configs.isLogin;
    const { isLogin } = this.configs;

    this.configs.action = isLogin ? 'Login' : 'Sign Up';
    this.configs.actionChange = isLogin ? 'Create Account' : 'Already have an account';

    !isLogin
      ? this.authForm.addControl('name', this.controlName)
      : this.authForm.removeControl('name');
  }
}
