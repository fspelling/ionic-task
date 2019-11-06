import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';
import { AuthProvider } from 'src/app/core/services/auth.type';
import { OverlayService } from 'src/app/core/services/overlay/overlay.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  authProvider = AuthProvider;
  authForm: FormGroup;
  controlName = new FormControl('', [Validators.required, Validators.minLength(6)]);

  configs = {
    isLogin: true,
    action: 'Login',
    actionChange: 'Create Account'
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private overlayService: OverlayService,
    private navCtrl: NavController,
    private route: ActivatedRoute) { }

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

  async onsubmit(provider: AuthProvider): Promise<void> {
    const loading = await this.overlayService.loading();

    try {
      const credentials = await this.authService.signIn({
        isSignIn: this.configs.isLogin,
        provider,
        user: this.authForm.value
      });

      this.navCtrl.navigateForward(this.route.snapshot.queryParamMap.get('redirect') || '/tasks');
    } catch (error) {
      console.log('Auth error: ', error);
      await this.overlayService.toast({ message: error.message });
    } finally {
      loading.dismiss();
    }
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
