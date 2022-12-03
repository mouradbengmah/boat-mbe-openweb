import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Boat } from '../model/Boat';
import { BoatService } from '../service/boat.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-boat-details',
  templateUrl: './boat-details.component.html',
  styleUrls: ['./boat-details.component.scss']
})
export class BoatDetailsComponent implements OnInit {

  boat: Boat = new Boat;

  constructor(
    private boatService: BoatService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getBoat();
  }

  private getBoat(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.boatService.recupererUnBateauParId(id).subscribe(
        response => {
          this.boat = response;
        }
      )
    }
  }

  goBack(): void {
    this.location.back();
  }

}
