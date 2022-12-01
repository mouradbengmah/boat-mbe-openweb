import { Component, OnInit } from '@angular/core';
import { Boat } from '../model/Boat';
import { BoatService } from '../service/boat.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

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
    this.retrieveAllBoatBoards();
  }

  ouvrirDialogPourNouveauBateau(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      boat: new Boat()
    };
    //this.dialog.open(BoatDialogComponent, dialogConfig)
  }

  private retrieveAllBoatBoards(): void {
    this.boatService.recupererLesBateaux().subscribe(

      response => {
        this.boatList = response;
      }
    )
  }

}
