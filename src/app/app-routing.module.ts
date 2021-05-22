import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { VaccinationFactory } from "./shared/vaccination-factory";
import { UserListComponent } from "./user-list/user-list.component";
import { VaccinationDetailsComponent } from "./vaccination-details/vaccination-details.component";
import { VaccinationFormComponent } from "./vaccination-form/vaccination-form.component";
import { VaccinationListComponent } from "./vaccination-list/vaccination-list.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "vaccinations", component: VaccinationListComponent },
  { path: "vaccinations/:id", component: VaccinationDetailsComponent },
  { path: "vaccination", component: VaccinationFormComponent },
  { path: "vaccination/:id", component: VaccinationFormComponent },
  { path: "login", component: LoginComponent },
  { path: "admin", component: AdminComponent },
  { path: "admin/:id", component: VaccinationFactory },
  { path: "users", component: UserListComponent },
  { path: "vaccinations/:id/book", component: VaccinationDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
