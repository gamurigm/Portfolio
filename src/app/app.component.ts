import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent, 
    AboutComponent, 
    ProjectsComponent, 
    SkillsComponent, 
    ContactComponent, 
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'portfolio-landing';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // El servicio de tema se inicializa automáticamente y carga el tema guardado
  }
}
