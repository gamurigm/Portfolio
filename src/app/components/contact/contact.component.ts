import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { ScrollAnimationService } from '../../services/scroll-animation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {
  socialLinks$: Observable<any[]>;

  constructor(
    private portfolioService: PortfolioService,
    private scrollAnimationService: ScrollAnimationService,
    private elementRef: ElementRef
  ) {
    this.socialLinks$ = this.portfolioService.getSocialLinks();
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
