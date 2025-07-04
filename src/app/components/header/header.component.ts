import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private themeService: ThemeService) {}

  // Acceso directo a los signals del servicio
  get isDarkMode() {
    return this.themeService.isDarkMode;
  }
  
  get themeName() {
    return this.themeService.themeName;
  }
  
  get themeIcon() {
    return this.themeService.themeIcon;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
