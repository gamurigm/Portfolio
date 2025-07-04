import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { ScrollAnimationService } from '../../services/scroll-animation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit, OnDestroy {
  skills$: Observable<string[]>;

  constructor(
    private portfolioService: PortfolioService,
    private scrollAnimationService: ScrollAnimationService,
    private elementRef: ElementRef
  ) {
    this.skills$ = this.portfolioService.getSkills();
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
