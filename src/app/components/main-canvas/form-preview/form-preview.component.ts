import { Component, inject } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { FieldPreviewComponent } from '../field-preview/field-preview.component';

@Component({
  selector: 'app-form-preview',
  imports: [FieldPreviewComponent],
  template: `
    <div class="py-6">
      <div
        class="p-6 flex flex-col shadow-md rounded-lg border border-gray-200"
      >
        @for (row of formService.rows(); track row.id) {
        <div class="flex gap-4">
          @for (field of row.fields; track field.id) {
          <app-field-preview class="flex-1" [field]="field" />
          }
        </div>
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class FormPreviewComponent {
  formService = inject(FormService);
}
