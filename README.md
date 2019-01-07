# mascarpone

[![](https://img.shields.io/npm/v/mascarpone.svg)](https://github.com/rslemos/mascarpone)
[![](https://img.shields.io/bundlephobia/min/mascarpone.svg)](https://github.com/rslemos/mascarpone)
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
    <input type="text" maskOnBlur [maskFn]="myMaskingFn">
</parent>
```

The masking function `myMaskingFn` should be declared on the parent component.

```ts
@Component({
    selector: 'parent',
})
export class ParentComponent {
    /*...*/

    public myMaskingFn(value: string): string { /*...*/ }
}
```

If the masking function makes use of `this`, it should be bound externally:

```html
<parent>
    <input type="text" maskOnBlur [maskFn]="myMaskingFn.bind(this)">
</parent>
```

```ts
    public myMaskingFn(value: string): string {
        /*... this is bound to the component's instance ...*/
    }
```

#### Masking input on input

Applying `maskOnInput` directive to an `<input>` component will trigger a
masking function when the component's value changes. A grace period (by default
500ms) will be given for the value to settle. If this delay is set to 0,
the mask will be applied immediately. The `<input>` value will change to
reflect the new masked value (whatever the function returns).

```html
<parent>
    <input type="text" maskOnInput maskDelay="3000" [maskFn]="myMaskingFn">
</parent>
```


#### Providing a masking function

The `[maskFn]` is not the only way to provide a masking function. Is is also
possible to provide it through injection. For example, it could be provided in
the current view component, via `providers` member of `@Component` decorator:

```html
<parent>
    <input type="text" maskOnBlur>
</parent>
```

```ts
import { MASK } from 'mascarpone';
import { Mask } from 'mascarpone';

class MyCustomMask implements Mask {
    public mask(value: string): string { /*...*/ }
}

@Component({
    selector: 'parent',
    providers: [{provide: MASK, useClass: MyCustomMask, multi: false},]
})
export class ParentComponent { /*...*/ }
```


#### The masking function: simple

The simplest masking function takes a string as input and spews this string,
masked, as output:

```ts
myMaskingFn(value: string): string {
    /*...*/
}
```

The `<input>`'s selection attributes (`selectionStart`, `selectionEnd` and
`selectionDirection`) are computed by their previous values and the changes
introduced in the value string by the masking function.

##### How are selection attributes computed from masked and unmasked values?

First the
[longest common subsequence problem](https://en.wikipedia.org/wiki/Longest_common_subsequence_problem)
is solved over both strings (including the traceback). The result is an edit
list, which describe which edits (insertion, deletion) were necessary to go
from the unmasked value to the masked one.

Given the previous selection attributes and the edit list, the new selection
attributes are computed.

One should bear in mind that this process is not perfect, because usually there
are more than one minimal edit list. Worse, the edit actions which best
describe how to mask the input value may not be minimal at all.


#### The masking function: advanced

Sometimes the automatic guessing of selection attributes based on the changes
made by a simple masking function may be less than perfect.

A more perfect masking function can take this burden for itself and produce
better results:

```ts
myMaskingFn(value: string, selectionStart: number, selectionEnd: number, selectionDirection: SelectionDirection): {
  value: string,
  selectionStart: number,
  selectionEnd: number,
  selectionDirection: SelectionDirection,
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
