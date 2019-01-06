# mascarpone

[![](https://img.shields.io/npm/v/@rslemos/mascarpone.svg)](https://github.com/rslemos/mascarpone)
[![](https://img.shields.io/bundlephobia/min/@rslemos/mascarpone.svg)](https://github.com/rslemos/mascarpone)
[![](https://img.shields.io/github/license/rslemos/mascarpone.svg)](https://github.com/rslemos/mascarpone)

Input masking components for angular.

## Install
```
$ npm install mascarpone
```

## Usage

### Masking input data

#### Masking input on blur

Applying `maskOnBlur` directive to an `<input>` component will trigger a
masking function when the component loses focus. The `<input>` value will
change to reflect the new masked value (whatever the function returns).

```html
<parent>
    <input type="text" maskOnBlur>
</parent>
```

The masking function should be provided elsewhere, by injection. For example,
it could be provided in the current view component, via `providers` member of
`@Component` decorator:

```ts
import { MASK } from '@rslemos/mascarpone';
import { Mask } from '@rslemos/mascarpone';

class MyCustomMask implements Mask {
    public mask(value: string): string { /*...*/ }
}

@Component({
    selector: 'parent',
    providers: [{provide: MASK, useClass: MyCustomMask, multi: false},]
})
export class ParentComponent { /*...*/ }
```

#### Masking input on input

Applying `maskOnInput` directive to an `<input>` component will trigger a
masking function when the component's value changes. A grace period (by default
500ms) will be given for the value to settle. If this delay is set to 0,
the mask will be applied immediately. The `<input>` value will change to
reflect the new masked value (whatever the function returns).

```html
<parent>
    <input type="text" maskOnInput maskDelay="3000">
</parent>
```

The masking function should be provided elsewhere, by injection. For example,
it could be provided in the current view component, via `providers` member of
`@Component` decorator:

```ts
import { MASK } from '@rslemos/mascarpone';
import { Mask } from '@rslemos/mascarpone';

class MyCustomMask implements Mask {
    public mask(value: string): string { /*...*/ }
}

@Component({
    selector: 'parent',
    providers: [{provide: MASK, useClass: MyCustomMask, multi: false},]
})
export class ParentComponent { /*...*/ }
```
