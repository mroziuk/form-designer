import { Component, inject } from '@angular/core';
import { FieldTypesService } from '../../services/field-types.service';
import { FieldButtonComponent } from './field-button/field-button.component';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-form-elements-menu',
  imports: [FieldButtonComponent, DragDropModule],
  template: `
    <div
      class="p-4 bg-white rounded-lg h-[calc(100vh-150px)] overflow-y-auto border-gray-200 shadow-sm mb-4"
    >
      <h3 class="text-lg font-medium">Form elements</h3>
      <div
        class="flex flex-col gap-4 elements-menu"
        cdkDropList
        cdkDropListSortingDisabled="true"
        cdkDropListData="field-selector"
        [cdkDropListEnterPredicate]="noDropAllowed"
      >
        @for (type of fieldTypes; track type.type) {
        <app-field-button [field]="type" />
        }
      </div>
    </div>
  `,
  styles: ``,
})
export class FormElementsMenuComponent {
  fieldTypesService = inject(FieldTypesService);

  fieldTypes = this.fieldTypesService.getAllFieldTypes();

  noDropAllowed = (item: CdkDrag<any>) => false;
}
