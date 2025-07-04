import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollAnimationService {
  private observer!: IntersectionObserver;

  constructor() {
    this.initObserver();
  }

  private initObserver(): void {
    const options = {
      root: null,
      rootMargin: '-20% 0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Animar tarjetas si es la sección proyectos
          if (entry.target.id === 'proyectos') {
            const tarjetas = entry.target.querySelectorAll('.tarjeta-proyecto');
            tarjetas.forEach((tarjeta, index) => {
              setTimeout(() => {
                tarjeta.classList.add('visible');
              }, index * 150);
            });
          }
        } else {
          entry.target.classList.remove('visible');
          
          // Remover clase de las tarjetas si es la sección proyectos
          if (entry.target.id === 'proyectos') {
            const tarjetas = entry.target.querySelectorAll('.tarjeta-proyecto');
            tarjetas.forEach(tarjeta => {
              tarjeta.classList.remove('visible');
            });
          }
        }
      });
    }, options);
  }

  observeElement(element: Element): void {
    this.observer.observe(element);
  }

  unobserveElement(element: Element): void {
    this.observer.unobserve(element);
  }

  disconnect(): void {
    this.observer.disconnect();
  }
}
