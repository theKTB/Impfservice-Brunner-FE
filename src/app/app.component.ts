import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'isb-root',
  templateUrl: './app.component.html'
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
}
