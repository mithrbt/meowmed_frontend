import { Component } from '@angular/core';
import { MitarbeiterComponent } from './mitarbeiter/mitarbeiter.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MitarbeiterComponent  ],
  template: `
  <main>
    <header class="brand-name">
      <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
    </header>
    <section class="content">
      <app-mitarbeiter></app-mitarbeiter>
    </section>
  </main>
`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Mitarbeiterdashboard';
}
