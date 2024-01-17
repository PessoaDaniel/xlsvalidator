import { Routes } from '@angular/router';

export const routes: Routes = [{
  path: '',
  redirectTo: 'rules',
  pathMatch: 'full'
},
{
  path: 'rules',
  loadChildren: () => import('./rules/rules.module').then(m => m.RulesModule)
}
];
