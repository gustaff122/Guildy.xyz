import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { MainLayoutResolver } from './layout/main-layout/main-layout.resolver';
import { ProjectReuseStrategy } from './core/strategies/project-reuse-strategy';
import { AppComponent } from './app.component';

const redirectLoggedInToProject = () => redirectLoggedInTo(['project']);
const redirectUnauthorizedToAuth = () => redirectUnauthorizedTo(['auth']);

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'auth', component: AppComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToProject }, loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'project', component: MainLayoutComponent, resolve: [MainLayoutResolver], runGuardsAndResolvers: 'always', canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToAuth }, loadChildren: () => import('./pages/project/project.module').then(m => m.ProjectModule) },
  { path: 'welcome', loadChildren: () => import('./pages/main-pages/main-pages.module').then(m => m.MainPagesModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: ProjectReuseStrategy
  }],
  exports: [RouterModule]
})
export class AppRoutingModule { }
