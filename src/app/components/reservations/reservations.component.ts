import { SharedService } from './../../services/shared.service';
import { Component, Input } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent {
  constructor(private ReservationService: ReservationService,private SharedService:SharedService) {}
  loading:Boolean=false
  ifNoData:Boolean=false
  reservations:any
  userData: any;
  ngOnInit(): void {
    this.SharedService.currentUserData.subscribe((data:any)=>{
      this.userData = data

      this.reservations=data.reservations?.filter((element:any) => element.status == 'Approved');
if (this.reservations?.length == 0) {
this.ifNoData = true
}

    })


  }
  cancelReservation(id: Object) {
this.loading = !this.loading
    this.ReservationService.cancelReservation(id).subscribe((data: any) => {
      if (data.message == 'canceled') {
        this.SharedService.updateAllData()
        this.loading = !this.loading
      }
    });
  }
}
