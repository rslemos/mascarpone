import { InjectionToken } from '@angular/core';

export const MASK = new InjectionToken<Mask>('Mask');

export type MaskFn = (value: string, selectionStart?: number, selectionEnd?: number, selectionDirection?: string) => string | {
  value: string,
  selectionStart: number,
  selectionEnd: number,
  selectionDirection: string,
};

export interface Mask {
  mask: MaskFn;
}
