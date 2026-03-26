import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { charactersReducer } from './store/characters.reducer';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NavbarComponent } from './components/nav/nav.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FooterComponent } from './components/footer/footer.component';
import { CharactersComponent } from './components/characters/characters.component';
import { DetailsComponent } from './components/details/details.component';
import { JoinPipe } from './pipes/join.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { httpLoaderInterceptor } from './interceptors/http-loader.interceptor';
import { InternalErrorComponent } from './components/internal-error/internal-error.component';
import { AuthComponent } from './components/auth/auth.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { EffectsModule } from '@ngrx/effects';
import { CharactersEffect } from './store/characters.effects';

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    NavbarComponent,
    FavoritesComponent,
    FooterComponent,
    CharactersComponent,
    DetailsComponent,
    JoinPipe,
    SpinnerComponent,
    InternalErrorComponent,
    AuthComponent,
    LogoutComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({ charactersStore: charactersReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([CharactersEffect])
  ],
  providers: [
    provideHttpClient(
      withInterceptors([httpLoaderInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
