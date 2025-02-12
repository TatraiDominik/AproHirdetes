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
    category: 'Elektronika',    // Kategória
    title: 'Eladó laptop',      // Cím
    description: 'Használt, jó állapotú laptop, erős teljesítménnyel.',  // Leírás
    price: 75000,               // Ár
    image: 'https://example.com/laptop.jpg'  // Kép URL
  };
}