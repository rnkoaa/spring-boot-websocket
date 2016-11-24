import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {FooterComponent} from "./footer/footer.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ResultsComponent} from "./results/results.component";
import {RequestStartedService} from "./shared/request-started.service";
import {ItemsRequestService} from "./results/items.request.service";
import {AppStompClient} from "./shared/app-stomp-client.service";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    PageNotFoundComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    RequestStartedService,
    ItemsRequestService,
    AppStompClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}
