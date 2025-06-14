import { Component, Injectable } from '@angular/core';
import { FieldTypeDefinition } from '../models/field';
import { TextFieldComponent } from '../components/field-types/text-field/text-field.component';
import { CheckboxFieldComponent } from '../components/field-types/checkbox-field/checkbox-field.component';

const TEXT_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'text',
  label: 'Text field',
  icon: 'text_fields',
  defaultConfig: {
    label: 'Text Field',
    required: false,
  },
  settingsConfig: [
    {
      type:'text',
      key: 'label',
      label:'Label'
    },
    {
      type:'text',
      key: 'placeholder',
      label:'Placeholder'
    },
    {
      type:'checkbox',
      key: 'required',
      label:'Required'
    },
    {
      type: 'select',
      key: 'inputType',
      label: 'InputType',
      options: [
        {value: 'text', label:'Text'},
        {value: 'number', label:'Number'},
        {value: 'email', label:'Email'},
        {value: 'tel', label:'Phone'},
      ]
    }
  ],
  component: TextFieldComponent,
};
const CHECKBOX_FIELD_DEFINITION: FieldTypeDefinition = {
  type: 'checkbox',
  label: 'Checkbox',
  icon: 'check_box',
  defaultConfig: {
    label: 'Checkbox',
    required: false,
  },
  settingsConfig: [
    {
      type:'text',
      key: 'label',
      label:'Label'
    },
    {
      type:'checkbox',
      key: 'required',
      label:'Required'
    },
  ],
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
