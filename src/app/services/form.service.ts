import { Injectable, signal } from '@angular/core';
import { FormRow } from '../models/form';
import { FormField } from '../models/field';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private _rows = signal<FormRow[]>([]);
  public readonly rows = this._rows.asReadonly();
  constructor() {
    this._rows.set([{ id: crypto.randomUUID(), fields: [] }]);
  }

  addField(field: FormField, rowId: string, index?: number){
    const rows = this._rows();
    const newRows = rows.map(row => {
      if(row.id === rowId){
        /**
         * jak chcemy zmienić wartość w signal, w takim Array
         * to nie podstawiamy do signal tego signala, tylko jego immutable copy.
         * Musimy tak zrobić, bo angular pilnuje referencji do obiektów 
         * i jak zobaczy że podstawiamy ten sam obiekt to może nie zaktualizować ui
         */
        const updatedFields = [...row.fields];
        if(index !== undefined){
          updatedFields.splice(index,0,field);
        }
        else{
          updatedFields.push(field);
        }
        return {...row, fields: updatedFields}
      }
      return row;
    })
    this._rows.set(newRows);
  }
}
