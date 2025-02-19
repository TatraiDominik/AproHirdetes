import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

  constructor(
    private authService: AuthService,
    private router: Router 
  ) {}

  loginUser() {
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {
        const userData = {
            email: this.emailFormControl.value as string,  
            password: this.passwordFormControl.value as string  
        };

        this.authService.login(userData).subscribe({
            next: (response) => {
                console.log('Bejelentkezés sikeres:', response);
                
                this.router.navigate(['/ads']); 
            },
            error: (error) => {
                console.error('Hiba a bejelentkezéskor:', error);
                
            }
        });
    } else {
        console.log('Érvénytelen űrlap');
    }
}

}
