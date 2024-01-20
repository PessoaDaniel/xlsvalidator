import {Component} from '@angular/core';
import {RulesService} from "../shared/services/rules.service";
import {DropzoneCdkModule} from "@ngx-dropzone/cdk";
import {DropzoneMaterialModule} from "@ngx-dropzone/material";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    MatFormFieldModule,
    DropzoneCdkModule,
    DropzoneMaterialModule,
    MatIconModule
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  rules: Array<any> = [];
  accept = ' application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
  constructor(private rulesService: RulesService) {}
  ngOnInit() {
    this.rulesService.rules.subscribe((rule) => {
      if (rule) {
        this.rules.push(rule);
      }
    });
  }
}
