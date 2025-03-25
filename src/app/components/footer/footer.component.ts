import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Heart } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly HeartIcon = Heart;
}
