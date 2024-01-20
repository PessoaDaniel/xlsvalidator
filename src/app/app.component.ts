import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {SystemService} from "./shared/services/system.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'XLS Validator';
  canUpload: boolean|null = true;
  readyResults: boolean|null = true;
  isDark: boolean|null = true;

  constructor(private systemService: SystemService) {
  }

  ngOnInit() {
    this.systemService.isDarkMode.subscribe((isDark:boolean|null) => {
      this.isDark = isDark;
    });
  }

  toggleDark() {
    if (this.isDark) {
      this.systemService.isDarkMode.next(null);
    } else {
      this.systemService.isDarkMode.next(true);
    }
  }
}
