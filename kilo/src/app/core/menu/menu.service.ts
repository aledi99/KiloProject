import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class MenuService {

  constructor(public translate: TranslateService) {}

  getAll() {
    return [
      {
        link: '/',
        label: this.translate.instant('Inicio'),
        icon: 'home'
      },
      {
        label: this.translate.instant('Productos'),
        icon: 'shopping_basket',
        items: [
          {link: '/productos', icon: 'edit', label: this.translate.instant('Gestion')},
          {link: '', icon: 'timeline', label: this.translate.instant('Estadísticas')}
        ]
      },
      {
        label: this.translate.instant('Entidades'),
        icon: 'work',
        items: [
          {link: '/entidades', icon: 'edit', label: this.translate.instant('Gestion')},
          {link: '/entidades/estadistica', icon: 'timeline', label: this.translate.instant('Estadísticas')}
        ]
      },
      {
        label: this.translate.instant('Cajas'),
        icon: 'indeterminate_check_box',
        items: [
          {link: '/cajas', icon: 'edit', label: this.translate.instant('Gestion')},
          {link: '', icon: 'timeline', label: this.translate.instant('Estadísticas')}
        ]
      }
    ];
  }
}
