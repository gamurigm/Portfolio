import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, OnDestroy {

  constructor(
    private scrollAnimationService: ScrollAnimationService,
    private elementRef: ElementRef
  ) { }

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
