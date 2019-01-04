import { InjectionToken } from '@angular/core';

export const MASK = new InjectionToken<Mask>('Mask');

export type MaskFn = (value: string) => string;

export interface Mask {
  mask: MaskFn;
}

export type SelectionDirection = 'forward' | 'backward' | 'none';
