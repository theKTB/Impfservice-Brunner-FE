import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { VaccinationListComponent } from "./vaccination-list/vaccination-list.component";
import { VaccinationListItemComponent } from "./vaccination-list-item/vaccination-list-item.component";
import { VaccinationDetailsComponent } from "./vaccination-details/vaccination-details.component";
import { VaccinationService } from "./shared/vaccinationservice.service";
import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/de";
import { LOCALE_ID } from "@angular/core";

registerLocaleData(localeDe);

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    VaccinationListComponent,
    VaccinationListItemComponent,
    VaccinationDetailsComponent
  ],
  bootstrap: [AppComponent],
  providers: [VaccinationService, { provide: LOCALE_ID, useValue: "de" }]
})
export class AppModule {}
