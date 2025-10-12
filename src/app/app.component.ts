import { Component, OnInit } from '@angular/core';
import { SupabaseService } from './services/supabase.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private supabaseService: SupabaseService) { }
  title = 'weddings';

  ngOnInit(): void {
    const data = {
      id: 321,
      name: "anh Thăng",
      phoneNumber: "0393371798",
      isInvited: false,
      inviteUrl: "https://www.facebook.com/long.thang.5680899/?locale=vi_VN",
      descriptions: "thiệp mời anh Thăng",
      templateWedding: 1,
      congratulation: "",
      confirmParticipation: false
    }
    from(this.supabaseService.updateGuest(321,data)).subscribe({
      next: res => console.log('Guests:', res),
      error: err => console.error('Error:', err)
    });
  }
}
