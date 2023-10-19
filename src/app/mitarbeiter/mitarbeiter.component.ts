import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mitarbeiter',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section>
    <form>
      <input type="text" placeholder="ID"> <br>
      <input type="text" placeholder="Nachname"> <br>
      <input type="text" placeholder="Vorname"> <br>
       <input type="text" placeholder="Titel"> <br>
      <input type="text" placeholder="Familienstatus"> <br>
      <input type="text" placeholder="Geburtsdatum"> <br>
      <input type="text" placeholder="Sozi-Nummer"> <br>
      <input type="text" placeholder="Steuer-ID"> <br>
      <input type="text" placeholder="Berufsland"> <br>
      <input type="text" placeholder="Brutto-Einkommen"> <br>
      <button class="primary" type="button">Anlegen</button>
    </form>
  </section>
`,
  styleUrls: ['./mitarbeiter.component.css']
})
export class MitarbeiterComponent {

}
