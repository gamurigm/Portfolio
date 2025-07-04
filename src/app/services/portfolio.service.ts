import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor() { }

  getProjects(): Observable<Project[]> {
    return of([
      {
        id: 1,
        title: 'Optimización Criptográfica con CUDA',
        description: 'Implementación del algoritmo AES en modo CTR utilizando CUDA para cifrado de bloques de 128 bits con paralelización.',
        imageUrl: 'https://www.kiteworks.com/wp-content/uploads/2023/09/AES-256-Encryption-EN.png',
        projectUrl: 'https://github.com/gamurigm/AES-CTR_CUDA/tree/master'
      },
      {
        id: 2,
        title: 'Distributed Load Balancer',
        description: 'Aplicación para distribuir tráfico de red entre múltiples servidores backend usando Go y gRPC.',
        imageUrl: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*i2skbfmDsHayHhqPfwt6pA.png',
        projectUrl: 'https://github.com/gamurigm/Distributed_load_balancer/'
      },
      {
        id: 3,
        title: 'AVLGraphic',
        description: 'Herramienta de visualización gráfica de árboles AVL en C++ con balanceo, rotaciones y recorridos.',
        imageUrl: 'https://media.geeksforgeeks.org/wp-content/uploads/20240710111326/AVL-Tree-768.png',
        projectUrl: 'https://github.com/gamurigm/AVLGraphic'
      }
    ]);
  }

  getSkills(): Observable<string[]> {
    return of([
      'Lenguajes: JavaScript, Python, Java, C++, C#',
      'Frameworks/Librerías: .Net Core',
      'Bases de Datos: MongoDB, PostgreSQL, MySQL',
      'Herramientas: Git, Docker',
      'Desarrollo Web: HTML, CSS, JavaScript'
    ]);
  }

  getSocialLinks(): Observable<any[]> {
    return of([
      {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/gamuridev',
        icon: 'fab fa-linkedin',
        handle: '@gamuridev'
      },
      {
        name: 'GitHub',
        url: 'https://github.com/gamurigm',
        icon: 'fab fa-github',
        handle: '@gamurigm'
      },
      {
        name: 'Twitter',
        url: 'https://twitter.com/',
        icon: 'fab fa-twitter',
        handle: ''
      },
      {
        name: 'Instagram',
        url: 'https://instagram.com',
        icon: 'fab fa-instagram',
        handle: ''
      }
    ]);
  }
}
