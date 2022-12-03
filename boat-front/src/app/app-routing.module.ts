import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoatDetailsComponent } from './boat-details/boat-details.component';
import { BoatComponent } from './boat/boat.component';

const routes: Routes = [
  { path: '', redirectTo: '/boats', pathMatch: 'full' },
  { path: 'boats', component: BoatComponent },
  { path: 'boat/details/:id', component: BoatDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
