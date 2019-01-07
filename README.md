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

#### Providing a masking function

A masking function should be provided for injection into either masking
directive.

The examples above use `providers` member of the element's parent component.

Another way to provide the masking function is by using the `maskFn` directive,
which accepts any masking function.

```html
<parent>
    <input type="text" maskOnInput maskFn="myMaskingFn">
</parent>
```

```ts
@Component({
    selector: 'parent'
})
export class ParentComponent {
    public myMaskingFn(value: string): string { /*...*/ }
}
```

Please note that the function's `this` should be bound externally:

```html
[example here]
```


#### The masking function: simple

The simplest masking function takes an string as input and spews this value,
masked, as output:

```ts
myMaskingFn(value: string): string {
    /*...*/
}
```

The other selection attributes (`selectionStart`, `selectionEnd` and
`selectionDirection`) are computed by their previous values and the changes
introduced in the value string by the masking function.

#### The masking function: advanced

Sometimes the automatic guessing of selection attributes based on the changes
made by a simple masking function may be less than perfect.

A more perfect masking function can take this burden for itself and produce
better results:

```ts
myMaskingFn(value: string, selectionStart: number, selectionEnd: number, selectionDirection: string): {
  value: string,
  selectionStart: number,
  selectionEnd: number,
  selectionDirection: string,
} {
    /*...*/
}
```

#### Masking function from Delphi template

Creating a masking function can be boring and error prone. Some developers are
already used to create masks using a simple syntax, such as Embarcadero's
Delphi development platform.

This syntax can also be used through use of the `maskAsDelphi` directive:

```html
<input maskOnInput maskAsDelphi="000">
```

A simple masking function will be produced and injected. The selection
attributes are implied by the changes made by the actual masking function.

#### Masking function from MS Visual Basic template

The Microsoft Visual Basic syntax for creating masks can also be used through
use of the `maskAsVisualBasic` directive:

```html
<input maskOnInput maskAsVisualBasic="000">
```

A simple masking function will be produced and injected. The selection
attributes are implied by the changes made by the actual masking function.


### Mask shadow

```html
<shadown-input maskShadow="shadow"></shadow-input>
```

#### Advanced mask shadow

```html
<parent>
    <shadown-input></shadow-input>
</parent>
```

```ts
import { MASKSHADOW } from '@rslemos/mascarpone';
import { MaskShadow } from '@rslemos/mascarpone';

class MyCustomShadow implements MaskShadow {
    public get maskshadow(): string { /*...*/ }
}

@Component({
    selector: 'parent',
    providers: [{provide: MASKSHADOW, useClass: MyCustomShadow, multi: false},]
})
export class ParentComponent { /*...*/ }
```
