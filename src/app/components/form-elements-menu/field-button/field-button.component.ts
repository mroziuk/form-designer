import { Component, input } from '@angular/core';
import { FieldTypeDefinition } from '../../../models/field';
import {MatIconModule} from '@angular/material/icon'
@Component({
  selector: 'app-field-button',
  imports: [MatIconModule],
  template: `
    <button class="w-full p-3 border border-gray-200 hover:border-black shadow-md transition-shadow rounded-lg flex items-center gap-3 cursor-pointer">
  <div class="rounded-md bg-gray-100 flex items-center justify-center p-1">
  <mat-icon>{{field().icon}}</mat-icon>
  <span>{{field().label}}</span>
</div>
</button>
  `,
  styles: ``
})
export class FieldButtonComponent {
  field = input.required<FieldTypeDefinition>();
}
