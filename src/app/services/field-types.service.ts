import { Injectable } from '@angular/core';
import { FieldTypeDefinition } from '../models/field';

const TEXT_FIELD_DEFINITION = {
  type: 'text',
  label: 'Text field',
  icon: 'text_fields',
}
const CHECKBOX_FIELD_DEFINITION = {
  type: 'checkbox',
  label: 'Checkbox',
  icon: 'check_box',
}
@Injectable({
  providedIn: 'root'
})
export class FieldTypesService {

  fieldtypes = new Map<string,FieldTypeDefinition>([
    ['text', TEXT_FIELD_DEFINITION],
    ['checkbox',CHECKBOX_FIELD_DEFINITION],
  ])

  getAllFieldTypes(): FieldTypeDefinition[] {
    return Array.from(this.fieldtypes.values());
  }
}
