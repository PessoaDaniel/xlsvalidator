import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {SystemService} from "../shared/services/system.service";
import {RulesService} from "../shared/services/rules.service";
import {Rule} from "../../models/Rule";

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
  rules: Array<Rule> = [];
  constructor(
    private systemService: SystemService,
    private rulesService: RulesService
    ) {}

  ngOnInit() {
    this.rules = this.rulesService.getStored();
  }
  ngAfterViewInit() {
    if (this.rules.length) {
     setTimeout(() =>this.systemService.cantUpload.next(false), 200);
    }
  }
  addRule() {
    let rule = new Rule();
    this.rules.push(rule);
    this.systemService.cantUpload.next(false);
    this.rulesService.rules.next(rule);
    this.rulesService.store(rule);
  }

}
