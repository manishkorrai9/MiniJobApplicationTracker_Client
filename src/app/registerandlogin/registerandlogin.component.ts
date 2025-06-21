import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registerandlogin',
  templateUrl: './registerandlogin.component.html',
  styleUrls: ['./registerandlogin.component.scss']
})
export class RegisterandloginComponent {
  isLogin = true;
  user = { name: '', email: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  toggleMode(form: NgForm) {
    this.isLogin = !this.isLogin;
    form.resetForm();
  }

  onSubmit() {
    const action = this.isLogin ? 'login' : 'register';

    this.auth[action](this.user).subscribe({
      next: (res: any) => {
        console.log('Login/Register response:', res);
        const token = res.token; 
        const userName = res.user?.name || this.user.name; 

        if (token) {
          this.auth.storeToken(token);
          localStorage.setItem('username', userName);  
          console.log('Username stored:', userName);
          this.router.navigate(['/dashboard']);
        } else {
          alert('Login successful but token missing in response.');
        }
      },
      error: (err) => {
        console.error('Auth error:', err);
        alert(err?.error?.error || 'Something went wrong');
      }
    });
  }
}
