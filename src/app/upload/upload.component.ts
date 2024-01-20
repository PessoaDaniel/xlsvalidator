import {Component} from '@angular/core';
import {RulesService} from "../shared/services/rules.service";

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  rules: Array<any> = [];

  constructor(private rulesService: RulesService) {}
  ngOnInit() {
    this.rulesService.rules.subscribe((rule) => {
      if (rule) {
        this.rules.push(rule);
      }
    });
  }
}
