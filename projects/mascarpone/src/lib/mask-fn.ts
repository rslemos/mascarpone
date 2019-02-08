import { InjectionToken } from '@angular/core';

export const MASK = new InjectionToken<Mask>('Mask');

export type MaskFn = (value: string, selectionStart?: number, selectionEnd?: number, selectionDirection?: SelectionDirection) => string | {
  value: string,
  selectionStart: number,
  selectionEnd: number,
  selectionDirection: SelectionDirection,
};

export interface Mask {
  mask: MaskFn;
}

export type SelectionDirection = 'forward' | 'backward' | 'none';
