import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CharactersComponent } from './components/characters/characters.component';
import { DetailsComponent } from './components/details/details.component';
import { Paths } from './enums/paths.enum'

const routes: Routes = [
  { path: '', redirectTo: Paths.Characters, pathMatch: 'full' },
  { path: Paths.Characters, component: CharactersComponent },
  { path: Paths.Favorites, component: FavoritesComponent },
  { path: `${Paths.Details}/:id`, component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
