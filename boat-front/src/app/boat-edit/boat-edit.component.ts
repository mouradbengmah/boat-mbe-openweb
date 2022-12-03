import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Boat } from '../model/Boat';
import { BoatService } from '../service/boat.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-boat-edit',
  templateUrl: './boat-edit.component.html',
  styleUrls: ['./boat-edit.component.scss']
})
export class BoatEditComponent implements OnInit {

  boat: Boat = new Boat;
  form: FormGroup;
  submitted = false;

  constructor(private boatService: BoatService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      nom: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])]
    });
    this.form.get('nom')?.markAsPristine;
  }

  ngOnInit() {
    this.getBoat();
  }

  private getBoat(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.boatService.recupererUnBateauParId(id).subscribe(
        response => {
          this.boat = response;
          this.form.get('nom')?.setValue(this.boat.nom);
          this.form.get('description')?.setValue(this.boat.description);
        }
      )
    }
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    console.log(this.form);
    if (this.form.valid) {
      this.boatService.modifierUnBateau(
        this.boat.id, 
        this.form.value['nom'], 
        this.form.value['description']).subscribe();

        this._snackBar.open('Succès', 'Le bateau a bien été mis à jour.');

        this.router.navigate(['/boat/details/' + this.boat.id]);
    } else {
      this.submitted = false;
    }
  }
}
