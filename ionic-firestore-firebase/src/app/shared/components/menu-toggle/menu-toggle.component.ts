import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-toggle',
  templateUrl: './menu-toggle.component.html'
})
export class MenuToggleComponent {
  @Input() menu: string;
}
