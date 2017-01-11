import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {MarvelService} from "../providers/marvel-service";
import {StoreModule} from "@ngrx/store";
import {rootReducer} from "../reducer/index";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {ComicsEffects} from "../effects/comics";
import {ComicsActions} from "../actions/comics";
import {ComicListComponent} from "../components/comic-list/comic-list";
import {ComicItemComponent} from "../components/comic-item/comic-item";
import {ComicPage} from "../pages/comic/comic";
import {ComicDetailsComponent} from "../components/comic-details/comic-details";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ComicListComponent,
    ComicItemComponent,
    ComicPage,
    ComicDetailsComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    StoreModule.provideStore(rootReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(ComicsEffects)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ComicListComponent,
    ComicItemComponent,
    ComicPage,
    ComicDetailsComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}
    ,MarvelService
    ,ComicsActions]
})
export class AppModule {}
