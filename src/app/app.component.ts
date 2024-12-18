import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NameListComponent } from './components/name-list/name-list.component';

@Component({
  selector: '.app-root',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NameListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  
}
