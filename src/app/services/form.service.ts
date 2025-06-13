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

  addField(field: FormField, rowId: string, index?: number) {
    const rows = this._rows();
    const newRows = rows.map((row) => {
      if (row.id === rowId) {
        /**
         * jak chcemy zmienić wartość w signal, w takim Array
         * to nie podstawiamy do signal tego signala, tylko jego immutable copy.
         * Musimy tak zrobić, bo angular pilnuje referencji do obiektów
         * i jak zobaczy że podstawiamy ten sam obiekt to może nie zaktualizować ui
         */
        const updatedFields = [...row.fields];
        if (index !== undefined) {
          updatedFields.splice(index, 0, field);
        } else {
          updatedFields.push(field);
        }
        return { ...row, fields: updatedFields };
      }
      return row;
    });
    this._rows.set(newRows);
  }

  deleteField(fieldId: string) {
    const rows = this._rows();
    const newRows = rows.map((row) => ({
      ...row,
      fields: row.fields.filter((f) => f.id !== fieldId),
    }));

    this._rows.set(newRows);
  }
  addRow() {
    const newRow: FormRow = {
      id: crypto.randomUUID(),
      fields: [],
    };

    const rows = this._rows();
    this._rows.set([...rows, newRow]);
  }
  deleteRow(rowId: string) {
    if (this._rows().length === 1) return;

    const rows = this._rows();
    const newRows = rows.filter((r) => r.id !== rowId);
    this._rows.set(newRows);
  }
  moveField(
    fieldId: string,
    sourceRowId: string,
    targetRowId: string,
    targetIndex: number = -1
  ) {
    const rows = this._rows();
    let fieldToMove: FormField | undefined;
    let sourceRowIndex = -1;
    let sourceFieldIndex = -1;
    console.log(fieldId,sourceRowId,targetRowId,targetIndex)
    rows.forEach((row, rowIndex) => {
      if (row.id === sourceRowId) {
        sourceRowIndex = rowIndex;
        sourceFieldIndex = row.fields.findIndex((f) => f.id === fieldId);
        if (sourceFieldIndex >= 0) {
          fieldToMove = row.fields[sourceFieldIndex];
        }
      }
    });

    if (!fieldToMove) return;

    const newRows = [...rows];
    const fieldsWithRemoveFields = newRows[sourceRowIndex].fields.filter(
      (f) => f.id !== fieldId
    );
    newRows[sourceRowIndex].fields = fieldsWithRemoveFields;

    const targetRowIndex = newRows.findIndex((r) => r.id === targetRowId);
    if (targetRowIndex >= 0) {
      const targetFields = [...newRows[targetRowIndex].fields];
      targetFields.splice(targetIndex, 0, fieldToMove);
      newRows[targetRowIndex].fields = targetFields;
    }

    this._rows.set(newRows);
  }
}
