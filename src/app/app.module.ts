import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { VaccinationListComponent } from './vaccination-list/vaccination-list.component';
import { VaccinationListItemComponent } from './vaccination-list-item/vaccination-list-item.component';
import { VaccinationDetailsComponent } from './home/vaccination-details/vaccination-details.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [AppComponent, HomeComponent, VaccinationListComponent, VaccinationListItemComponent, VaccinationDetailsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
