import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CharactersComponent } from './components/characters/characters.component';
import { DetailsComponent } from './components/details/details.component';
import { Paths } from './enums/paths.enum'
import { InternalErrorComponent } from './components/internal-error/internal-error.component';

const routes: Routes = [
  { path: '', redirectTo: Paths.CHARACTERS, pathMatch: 'full' },
  { path: Paths.CHARACTERS, component: CharactersComponent },
  { path: Paths.FAVORITES, component: FavoritesComponent },
  { path: `${Paths.DETAILS}/:id`, component: DetailsComponent },
  { path: Paths.INTERNAL_ERROR, component: InternalErrorComponent },
  { path: '**', redirectTo: Paths.INTERNAL_ERROR, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
