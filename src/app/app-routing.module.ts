import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginComponent } from './core/login/login.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./templates/templates.module').then(m => m.TemplatesModule) },
  { path: 'manager', loadChildren: () => import('./manager/manager/manager.module').then(m => m.ManagerModule),canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
