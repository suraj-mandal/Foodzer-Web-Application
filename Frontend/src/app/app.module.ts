import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {MainComponent} from './main/main.component';
import {RouterService} from './services/router.service';
import {HttpClientModule} from '@angular/common/http';
import {FoodApiService} from './services/food-api.service';
import {HomeComponent} from './main/home/home.component';
import {FoodDisplayComponent} from './main/home/food-display/food-display.component';
import {FoodSearchComponent} from './main/home/food-search/food-search.component';
import {FavouritesComponent} from './main/favourites/favourites.component';
import {BrandsComponent} from './main/brands/brands.component';
import {RecommendedFoodComponent} from './main/recommended-food/recommended-food.component';
import {MealCreatorComponent} from './main/meal-creator/meal-creator.component';
import {SideNavigationComponent} from './main/side-navigation/side-navigation.component';
import { CanActivateGuard } from './can-activate.guard';
import { AuthenticationService } from './services/authentication.service';
import { FoodComponent } from './main/utils/food/food.component';
import { LoaderComponent } from './main/utils/loader/loader.component';
import { FavouriteFoodComponent } from './main/favourites/favourite-food/favourite-food.component';
import {RecommendationService} from './services/recommendation.service';
import { FavouritesService } from './services/favourites.service';
import { MealService } from './services/meal.service';
import { RegisterService } from './services/register.service';
import { NgModule } from '@angular/core';

import { LandingPageComponent } from './landing-page/landing-page.component';


const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
};

const routes: Routes = [
  {
    path: 'intro',
    component: LandingPageComponent
  },
  {
    path: 'auth',
    component: AuthenticationComponent
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [CanActivateGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'meal',
        component: MealCreatorComponent
      },
      {
        path: 'favorites',
        component: FavouritesComponent
      },
      {
        path: 'recommended',
        component: RecommendedFoodComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  }

];


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    MainComponent,
    HomeComponent,
    FoodDisplayComponent,
    FoodSearchComponent,
    FavouritesComponent,
    BrandsComponent,
    RecommendedFoodComponent,
    MealCreatorComponent,
    SideNavigationComponent,
    FoodComponent,
    LoaderComponent,
    FavouriteFoodComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, routerOptions),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
        RouterService,
        FoodApiService,
        AuthenticationService,
        CanActivateGuard,
        RecommendationService,
        FavouritesService,
        MealService,
        RegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
