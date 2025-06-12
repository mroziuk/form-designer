import { Component, Injectable } from '@angular/core';
import { FieldTypeDefinition } from '../models/field';
import { TextFieldComponent } from '../components/field-types/text-field/text-field.component';
import { CheckboxFieldComponent } from '../components/field-types/checkbox-field/checkbox-field.component';

const TEXT_FIELD_DEFINITION = {
  type: 'text',
  label: 'Text field',
  icon: 'text_fields',
  defaultConfig: {
    label: 'Text Field',
    required: false,
  },
  component: TextFieldComponent,
};
const CHECKBOX_FIELD_DEFINITION = {
  type: 'checkbox',
  label: 'Checkbox',
  icon: 'check_box',
  defaultConfig: {
    label: 'Checkbox',
    required: false,
  },
  component: CheckboxFieldComponent,
};
@Injectable({
  providedIn: 'root',
})
export class FieldTypesService {
  fieldtypes = new Map<string, FieldTypeDefinition>([
    ['text', TEXT_FIELD_DEFINITION],
    ['checkbox', CHECKBOX_FIELD_DEFINITION],
  ]);

  getFieldType(type: string): FieldTypeDefinition | undefined {
    return this.fieldtypes.get(type);
  }

  getAllFieldTypes(): FieldTypeDefinition[] {
    return Array.from(this.fieldtypes.values());
  }
}
