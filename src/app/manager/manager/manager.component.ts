import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnDestroy {
  ngOnDestroy(): void {
    localStorage.clear()
  }

}
