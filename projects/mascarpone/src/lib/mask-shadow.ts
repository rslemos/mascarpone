import { InjectionToken } from '@angular/core';

export const MASKSHADOW = new InjectionToken<MaskShadow>('MaskShadow');

export interface MaskShadow {
  readonly maskshadow: string;
}
