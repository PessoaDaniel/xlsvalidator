import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

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

  addRule() {
    this.rules.push({});
  }
}
