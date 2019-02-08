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


#### The masking function

The masking function takes a string as input and spews this string, masked, as
output:

```ts
myMaskingFn(value: string): string {
    /*...*/
}
```
