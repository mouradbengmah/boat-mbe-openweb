import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoatService } from '../service/boat.service';

@Component({
  selector: 'app-boat-new',
  templateUrl: './boat-new.component.html',
  styleUrls: ['./boat-new.component.scss']
})
export class BoatNewComponent implements OnInit {

  nom: string = "";
  description: string = "";
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BoatNewComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private boatService: BoatService) {

    this.form = fb.group({
      nom: [this.nom, Validators.required],
      description: [this.description, Validators.required]
    });
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.nom = this.form.get('nom')?.value;
    this.description = this.form.get('description')?.value;
    if (this.nom) {
      this.boatService.enregistrerUnBateau(this.nom, this.description).subscribe(

        response => {
          console.log(response)
        }
      )
    }
    this.dialogRef.close();
  }

}
