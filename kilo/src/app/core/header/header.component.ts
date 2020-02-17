import * as Screenfull from 'screenfull';

import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output()
  toggleSidenav = new EventEmitter<void>();
  @Output()
  toggleNotificationSidenav = new EventEmitter<void>();

  photoUsuarioLogueado: string;

  constructor(private authService: AuthService) {
    this.photoUsuarioLogueado = this.authService.getLocalData('photo');
  }

  fullScreenToggle(): void {
    if (Screenfull.isEnabled) {
      Screenfull.toggle();
    }
  }
}
