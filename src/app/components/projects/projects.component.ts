import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { ScrollAnimationService } from '../../services/scroll-animation.service';
import { Project } from '../../interfaces/project.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects$: Observable<Project[]>;

  constructor(
    private portfolioService: PortfolioService,
    private scrollAnimationService: ScrollAnimationService,
    private elementRef: ElementRef
  ) {
    this.projects$ = this.portfolioService.getProjects();
  }

  ngOnInit(): void {
    const section = this.elementRef.nativeElement.querySelector('section');
    if (section) {
      this.scrollAnimationService.observeElement(section);
    }
  }

  ngOnDestroy(): void {
    const section = this.elementRef.nativeElement.querySelector('section');
    if (section) {
      this.scrollAnimationService.unobserveElement(section);
    }
  }
}
