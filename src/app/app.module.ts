import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { charactersReducer } from './store/characters.reducer';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/nav/nav.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FooterComponent } from './components/footer/footer.component';
import { CharactersComponent } from './components/characters/characters.component';
import { DetailsComponent } from './components/details/details.component';
import { JoinPipe } from './pipes/join.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    NavbarComponent,
    FavoritesComponent,
    FooterComponent,
    CharactersComponent,
    DetailsComponent,
    JoinPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ charactersStore: charactersReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
