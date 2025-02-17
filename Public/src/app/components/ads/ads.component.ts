import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-ads',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdsComponent {
  ad = {
    date: '2025-02-12',         // Dátum
    category: 'Használt termék',    // Kategória
    title: 'Eladó Kulimák és legjobb barátja',      // Cím
    description: 'Használt, jó állapotúak, erős teljesítménnyel.',  // Leírás
    price: 1,               // Ár
    image: 'https://scontent-vie1-1.xx.fbcdn.net/v/t39.30808-6/453253610_2586090811778637_1866650338569238067_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=iVSzzA-eGc8Q7kNvgHagBp7&_nc_zt=23&_nc_ht=scontent-vie1-1.xx&_nc_gid=ArH6nh1I_Sm3RkqI5rke9hI&oh=00_AYCMp8vTarA41K40L2F_1bAMr0TcMJJKG2KB0ul7nqan3Q&oe=67B8D1A0'  // Kép URL
  };
}