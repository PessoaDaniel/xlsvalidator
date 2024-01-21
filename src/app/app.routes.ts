import { Routes } from '@angular/router';
import {UploadGuard} from "./shared/guards/upload.guard";
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'rules',
    pathMatch: 'full'
  },
  {
    path: 'rules',
    loadChildren: () => import('./rules/rules.module').then(m => m.RulesModule)
  },
  {
    path: 'upload',
    canActivate: [UploadGuard],
    loadChildren: () => import('./upload/upload.module').then(m => m.UploadModule)
  }
];
