import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormField } from '../../../models/field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select-field',
  imports: [MatFormFieldModule, MatSelectModule],
  template: `
    <mat-form-field appearance="outline" class="w-full">
      <mat-label>
        {{ field().label }}
      </mat-label>
      <mat-select [required]="field().required" appearance="outline">
        @if(field().options){
           @for (option of field().options; track option.label) {
            <mat-option [value]="option.value">{{ option.label }}</mat-option>
        } 
        } @else {
          <mat-option value="option1">Option 1</mat-option>
          <mat-option value="option1">Option 2</mat-option>
          <mat-option value="option1">Option 3</mat-option>
        }
      </mat-select>
    </mat-form-field>
  `,
  styles: ``,
})
export class SelectFieldComponent {
  field = input.required<FormField>();
}
