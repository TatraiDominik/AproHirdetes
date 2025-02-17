import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent { 
  userValue: string | undefined;
  addressValue: string | undefined;
  emailValue: string | undefined;
  passValue: string | undefined;
  cpassValue: string | undefined;
}
