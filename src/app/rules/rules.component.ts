import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {SystemService} from "../shared/services/system.service";

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.scss'
})
export class RulesComponent {
  rules: Array<Object> = [];
  constructor(private systemService: SystemService) {}
  addRule() {
    this.rules.push({});
    this.systemService.cantUpload.next(false);
  }
}
