import { Component, OnInit } from '@angular/core';
import { Boat } from '../model/Boat';
import { BoatService } from '../service/boat.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BoatNewComponent } from '../boat-new/boat-new.component';

@Component({
  selector: 'app-boat',
  templateUrl: './boat.component.html',
  styleUrls: ['./boat.component.scss']
})
export class BoatComponent implements OnInit {

  boatList: Boat[] = [];

  constructor(
    private boatService: BoatService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.retrieveAllBoat();
  }

  ouvrirDialogPourNouveauBateau(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      boat: new Boat()
    };
    this.dialog.open(BoatNewComponent, dialogConfig).afterClosed().subscribe(() => { this.retrieveAllBoat(); } );
  }

  private retrieveAllBoat(): void {
    this.boatService.recupererLesBateaux().subscribe(

      response => {
        this.boatList = response;
      }
    )
  }

}
