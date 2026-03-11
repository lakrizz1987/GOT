import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CharactersComponent } from './components/characters/characters.component';
import { DetailsComponent } from './components/details/details.component';
import { Paths } from './enums/paths.enum'
import { InternalErrorComponent } from './components/internal-error/internal-error.component';
import { AuthComponent } from './components/auth/auth.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: Paths.CHARACTERS, component: CharactersComponent },
  { path: Paths.FAVORITES, component: FavoritesComponent, canActivate: [authGuard] },
  { path: `${Paths.DETAILS}/:id`, component: DetailsComponent },
  { path: Paths.LOGIN, component: AuthComponent, canActivate: [authGuard] },
  { path: Paths.REGISTER, component: AuthComponent, canActivate: [authGuard] },
  { path: Paths.LOGOUT, component: LogoutComponent },
  { path: Paths.INTERNAL_ERROR, component: InternalErrorComponent },
  { path: '**', redirectTo: Paths.INTERNAL_ERROR, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
