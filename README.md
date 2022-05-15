# Getting Started

## What is Angular

Angular is an application design framework and development platform for creating efficient and sophisticated single-page apps.

As a platform, Angular includes:

- A component-based framework for building scalable web applications
- A collection of well=integrated libraries that cover a wide variety of features,  including routing, forms management, client-server communication, and more
- A suite of developer tools to help you develop, build, test, and update your code

## Features

![image-20220430115343178](/Users/opsmind/Library/Application Support/typora-user-images/image-20220430115343178.png)

![image-20220430115359303](/Users/opsmind/Library/Application Support/typora-user-images/image-20220430115359303.png)

![image-20220430115417670](/Users/opsmind/Library/Application Support/typora-user-images/image-20220430115417670.png)

## The Essentials

### Components

A component includes a TypeScript class with a `@Component()` decorator, an HTML template, and styles.

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
  // OR 👇
  // styles: [
  //   `.custom {
  //     color: gray;
  //     background: #F5F5F5
  //   }`
  // ]
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}
```

### Templates

Every component has an HTML template that declares how that component renders. You can define this template either inline or by file path

Interpolation, Property Binding and Event Binding

```html
<!-- hello-world-bindings.component.html -->
<button
  [disabled]="canClick"
  (click)="sayMessage()">
  Trigger alert message
</button>
<p
  [id]="sayHelloId"
  [style.color]="fontColor">
  You can set my color in the component!
</p>
<p>My color is {{ fontColor }}</p>
```

```typescript
// hello-world-bindings.component.ts
<button
  [disabled]="canClick"
  (click)="sayMessage()">
  Trigger alert message
</button>
<p
  [id]="sayHelloId"
  [style.color]="fontColor">
  You can set my color in the component!
</p>
<p>My color is {{ fontColor }}</p>
```
Additionally, Angular adds additional functionality to your templates through the use of directives

### Dependency injection

Dependency injection lets you declare the dependencies of your TypeScript classes without taking care of their instantiation. Instead, Angular handles the instantiation for you. This design pattern lets you write more testable and flexible code. Even though understanding dependency injection is not critical to start using Angular, we strongly recommend it as a best practice and many aspects of Angular take advantage of it to some degree.

To illustrate how dependency injection works, consider the following example. The first file, `logger.service.ts`, defines a `Logger` class. This class contains a `writeCount` function that logs a number to the console.

```typescript
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class Logger {
  writeCount(count: number) {
    console.warn(count);
  }
}
```

Next, the `hello-world-di.component.ts` file defines an Angular component. This component contains a button that uses the `writeCount` function of the Logger class. To access that function, the `Logger` service is injected into the `HelloWorldDI` class by adding `private logger: Logger` to the constructor.


```typescript
import { Component } from '@angular/core';
import { Logger } from '../logger.service';

@Component({
  selector: 'hello-world-di',
  templateUrl: './hello-world-di.component.html'
})
export class HelloWorldDependencyInjectionComponent  {
  count = 0;

  constructor(private logger: Logger) { }

  onLogMe() {
    this.logger.writeCount(this.count);
    this.count++;
  }
}
```

Demo URL: https://stackblitz.com/edit/angular-ivy-dathnl?file=src/app/app.component.ts

## Angular CLI

| [ng build](https://v12.angular.io/cli/build)       | Compiles an Angular app into an output directory.                    |
| -------------------------------------------------- | -------------------------------------------------------------------- |
| [ng serve](https://v12.angular.io/cli/serve)       | Builds and serves your application, rebuilding on file changes.      |
| [ng generate](https://v12.angular.io/cli/generate) | Generates or modifies files based on a schematic.                    |
| [ng test](https://v12.angular.io/cli/test)         | Runs unit tests on a given project.                                  |
| [ng e2e](https://v12.angular.io/cli/e2e)           | Builds and serves an Angular application, then runs end-to-end tests |

## 3rd-party libraries

| [Angular Router](https://v12.angular.io/guide/router)            | Advanced client-side navigation and routing based on Angular components. Supports lazy-loading, nested routes, custom path matching, and more. |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [Angular Forms](https://v12.angular.io/guide/forms-overview)     | Uniform system for form participation and validation.                                                                                          |
| [Angular HttpClient](https://v12.angular.io/guide/http)          | Robust HTTP client that can power more advanced client-server communication.                                                                   |
| [Angular Animations](https://v12.angular.io/guide/animations)    | Rich system for driving animations based on application state.                                                                                 |
| [Angular PWA](https://v12.angular.io/guide/service-worker-intro) | Tools for building Progressive Web Applications (PWAs) including a service worker and Web app manifest.                                        |
| [Angular Schematics](https://v12.angular.io/guide/schematics)    | Automated scaffolding, refactoring, and update tools that simplify development at a large scale.                                               |



> [Angular First Demo](https://stackblitz.com/edit/angular-rrlxfc?file=src/app/app.component.ts)


# Understanding Angular

## Components

### Lifecycle

ngOnChanges: may not call if you have no template-bound inputs

ngOnInit: Called once

ngDoCheck: Called immediately after `ngOnChanges()` on every change detection run, and immediately after `ngOnInit()` on the first run.

ngAfterContentInit: Called *once* after the first `ngDoCheck()`

ngAfterContentChecked: Called after `ngAfterContentInit()` and every subsequent `ngDoCheck()`.

ngAfterViewInit: Called *once* after the first `ngAfterContentChecked()`.

ngAfterViewChecked: Called after the `ngAfterViewInit()` and every subsequent `ngAfterContentChecked()`.

ngOnDestroy: Called immediately before Angular destroys the directive or component.

Summary: 

ngDoCheck, ngAfterContentChecked, ngAfterViewChecked
these 3 functions are called frequently

ngDoCheck is called after ngOnChanges

`ngOnChanges` is only called for/if there is an @input variable set by parent

#### Use directives to watch the DOM

A spy directive like this can provide insight into a DOM object that you cannot change directly. You can't touch the implementation of a built-in <div>, or modify a third party component. 
You can, however watch these elements with a directive.

#### Responding to projected content changes

*Content projection* is a way to import HTML content from outside the component and insert that content into the component's template in a designated spot. Identify content projection in a template by looking for the following constructs.

- HTML between component element tags.
- The presence of `<ng-content>` tags in the component's template.

#### Using AfterContent hooks

*AfterContent* hooks are similar to the *AfterView* hooks. The key difference is in the child component.

- The *AfterView* hooks concern `ViewChildren`, the child components whose element tags appear *within* the component's template.
- The *AfterContent* hooks concern `ContentChildren`, the child components that Angular projected into the component.

Angular calls both *AfterContent* hooks before calling either of the *AfterView* hooks. Angular completes composition of the projected content *before* finishing the composition of this component's view. There is a small window between the `AfterContent...` and `AfterView...` hooks that lets you modify the host view.

#### Defining custom change detection

To monitor changes that occur where `ngOnChanges()` won't catch them, implement your own change check

While the `ngDoCheck()` hook can detect when the hero's `name` has changed, it is very expensive. 

If you use this hook, your implementation must be extremely lightweight, or the user experience suffers.

### View Encapsulation

In Angular, component CSS styles are encapsulated into the component's view and don't affect the rest of the application.

ShadowDom, Emulated, None

`Emulated` view encapsulation (the default) emulates the behavior of shadow DOM by preprocessing (and renaming) the CSS code to effectively scope the CSS to the component's view.

**Avoid mixing components that use different view encapsulation.**
### Component interaction

1. Pass data from parent to child with input binding

@Input() decorator

2. Intercept input property changes with a setter

3. Intercept input property changes with ngOnChanges()

4. Parent listens for child event

@Output() voted = new EventEmitter<boolean>();

5. Parent interacts with child using local variable

A parent component cannot use data binding to read child properties or invoke child methods. 
Do both by creating a template reference variable for the child element and then reference that variable within the parent template as seen in the following example.

Note: same like useImperativeHandle in React

6. Parent calls an @ViewChild()

You can't use the local variable technique if the parent component's class relies on the child component's class.

When the parent component class requires that kind of access, inject the child component into the parent as a ViewChild.

7. Parent and children communicate using a service

A parent component and its children share a service whose interface enables bi-directional communication within the family.

### Component styles

This scoping restriction is a styling modularity feature.

- Use the CSS class names and selectors that make the most sense in the context of each component.

- Class names and selectors are local to the component and don't collide with classes and selectors used elsewhere in the application.

- Changes to styles elsewhere in the application don't affect the component's styles.

- Co-locate the CSS code of each component with the TypeScript and HTML code of the component, which leads to a neat and tidy project structure.

- Change or remove component CSS code without searching through the whole application to find where else the code is used.

#### Special selectors

**:host**

The :host selector only targets the host element of a component.

**:host-context**

Use the :host-context() pseudo-class selector, which works just like the function form of :host(). 
The :host-context() selector looks for a CSS class in any ancestor of the component host element, up to the document root. 
The :host-context() selector is only useful when combined with another selector.

**::ng-deep**

Applying the ::ng-deep pseudo-class to any CSS rule completely disables view-encapsulation for that rule. 

Any style with ::ng-deep applied becomes a global style. 

In order to scope the specified style to the current component and all its descendants, be sure to include the :host selector before ::ng-deep. 

If the ::ng-deep combinator is used without the :host pseudo-class selector, the style can bleed into other components.

Use `/deep/`,` >>>` and `::ng-deep` only with emulated view encapsulation. Emulated is the default and most commonly used view encapsulation. 

The shadow-piercing descendant combinator is deprecated and [support is being removed from major browsers](https://www.chromestatus.com/feature/6750456638341120) and tools. 
As such we plan to drop support in Angular (for all 3 of `/deep/`, `>>>` and `::ng-deep`). Until then `::ng-deep` should be preferred for a broader compatibility with the tools.


#### Loading component styles

There are several ways to add styles to a component:

- By setting `styles` or `styleUrls` metadata.
- Inline in the template HTML.
- With CSS imports.

Note: Style strings added to the @Component.styles array must be written in CSS because the CLI cannot apply a preprocessor to inline styles.

### Sharing data between child and parent directives and components

A common pattern in Angular is sharing data between a parent component and one or more child components. 
Implement this pattern with the @Input() and @Output() decorators.

@Input() lets a parent component update data in the child component. Conversely, @Output() lets the child send data to a parent component.

@Output() marks a property in a child component as a doorway through which data can travel from the child to the parent.

The child component uses the @Output() property to raise an event to notify the parent of the change. To raise an event, an @Output() must have the type of EventEmitter, which is a class in @angular/core that you use to emit custom events.

We can use @Input() and @Output() together

Additionally, to combine property and event bindings using the banana-in-a-box syntax, `[()]`, see [Two-way Binding](https://v12.angular.io/guide/two-way-binding).

### Content projection

Content projection is a pattern in which you insert, or project, the content you want to use inside another component. 

The following sections describe common implementations of content projection in Angular, including:

- [Single-slot content projection](https://v12.angular.io/guide/content-projection#single-slot). With this type of content projection, a component accepts content from a single source.
- [Multi-slot content projection](https://v12.angular.io/guide/content-projection#multi-slot). In this scenario, a component accepts content from multiple sources.
- [Conditional content projection](https://v12.angular.io/guide/content-projection#conditional). Components that use conditional content projection render content only when specific conditions are met.

The `<ng-content>` element is a placeholder that does not create a real DOM element. Custom attributes applied to `<ng-content>` are ignored.


### Dynamic component loader

The <ng-template> element is a good choice for dynamic components because it doesn't render any additional output.

The <ng-template> element is where you apply the directive you just made. To apply the AdDirective, recall the selector from ad.directive.ts, [adHost]. Apply that to <ng-template> without the square brackets. Now Angular knows where to dynamically load components.

```typescript
template: `
  <div class="ad-banner-example">
    <h3>Advertisements</h3>
    <ng-template adHost></ng-template>
  </div>
`
```

### Angular elements overview

We are working on custom elements that can be used by web apps built on other frameworks.

#### Using custom elements

Custom elements bootstrap themselves

#### How it works

createCustomElement()

Angular provides the `createCustomElement()` function for converting an Angular component, together with its dependencies, to a custom element. The function collects the component's observable properties, along with the Angular functionality the browser needs to create and destroy instances, and to detect and respond to changes.

The conversion process implements the `NgElementConstructor` interface, and creates a constructor class that is configured to produce a self-bootstrapping instance of your component.

Use the built-in [`customElements.define()`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define) function to register the configured constructor and its associated custom-element tag with the browser's [`CustomElementRegistry`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry). When the browser encounters the tag for the registered element, it uses the constructor to create a custom-element instance.

#### Mapping

A custom element hosts an Angular component, providing a bridge between the data and logic defined in the component and standard DOM APIs. Component properties and logic maps directly into HTML attributes and the browser's event system.

## Templates

To eliminate the risk of script injection attacks, Angular does not support the `<script>` element in templates. Angular ignores the `<script> `tag and outputs a warning to the browser console.

You might also be interested in the following:

- [Interpolation](https://v12.angular.io/guide/interpolation)—learn how to use interpolation and expressions in HTML.
- [Template statements](https://v12.angular.io/guide/template-statements)—respond to events in your templates.
- [Binding syntax](https://v12.angular.io/guide/binding-syntax)—use binding to coordinate values in your application.
- [Property binding](https://v12.angular.io/guide/property-binding)—set properties of target elements or directive `@Input()` decorators.
- [Attribute, class, and style bindings](https://v12.angular.io/guide/attribute-binding)—set the value of attributes, classes, and styles.
- [Event binding](https://v12.angular.io/guide/event-binding)—listen for events and your HTML.
- [Two-way binding](https://v12.angular.io/guide/two-way-binding)—share data between a class and its template.
- [Built-in directives](https://v12.angular.io/guide/built-in-directives)—listen to and modify the behavior and layout of HTML.
- [Template reference variables](https://v12.angular.io/guide/template-reference-variables)—use special variables to reference a DOM element within a template.
- [Inputs and Outputs](https://v12.angular.io/guide/inputs-outputs)—share data between the parent context and child directives or components
- [Template expression operators](https://v12.angular.io/guide/template-expression-operators)—learn about the pipe operator, `|`, and protect against `null` or `undefined` values in your HTML.
- [SVG in templates](https://v12.angular.io/guide/svg-in-templates)—dynamically generate interactive graphics.

### Text interpolation

A template expression produces a value and appears within double curly braces, `{{ }}`.

With interpolation, Angular performs the following tasks:

1. Evaluates all expressions in double curly braces.
2. Converts the expression results to strings.
3. Links the results to any adjacent literal strings.
4. Assigns the composite to an element or directive property.

Template expressions are similar to JavaScript. Many JavaScript expressions are legal template expressions, with the following exceptions.

You can't use JavaScript expressions that have or promote side effects, including:

- Assignments (`=`, `+=`, `-=`, `...`)
- Operators such as `new`, `typeof`, or `instanceof`
- Chaining expressions with `;` or `,`
- The increment and decrement operators `++` and `--`
- Some of the ES2015+ operators

Other notable differences from JavaScript syntax include:

- No support for the bitwise operators such as `|` and `&`
- New [template expression operators](https://v12.angular.io/guide/template-expression-operators), such as `|`, `?.` and `!`


> Template expressions cannot refer to anything in the global namespace, except undefined. They can't refer to window or document. Additionally, they can't call console.log() or Math.max() and they are restricted to referencing members of the expression context.

Interpolated expressions have a context—a particular part of the application to which the expression belongs. Typically, this context is the component instance.

If you reference a name that belongs to more than one of these namespaces, Angular applies the following logic to determine the context:

1. The template variable name.
2. A name in the directive's context.
3. The component's member names.

When using template expressions, follow these best practices:

- **Use short expressions**

  Use property names or method calls whenever possible. Keep application and business logic in the component, where it is accessible to develop and test.

- **Quick execution**

  Angular executes template expressions after every [change detection](https://v12.angular.io/guide/glossary#change-detection) cycle. Many asynchronous activities trigger change detection cycles, such as promise resolutions, HTTP results, timer events, key presses and mouse moves.

  Expressions should finish quickly to keep the user experience as efficient as possible, especially on slower devices. Consider caching values when their computation requires greater resources.

- **No visible side effects**

  According to Angular's [unidirectional data flow model](https://v12.angular.io/guide/glossary#unidirectional-data-flow), a template expression should not change any application state other than the value of the target property. Reading a component value should not change some other displayed value. The view should be stable throughout a single rendering pass.

### Template statements

Template statements are methods or properties that you can use in your HTML to respond to user events. 

Responding to events is an aspect of Angular's unidirectional data flow. You can change anything in your application during a single event loop.

#### Syntax

Like template expressions, template statements use a language that looks like JavaScript. However, the parser for template statements differs from the parser for template expressions. In addition, the template statements parser specifically supports both basic assignment, `=`, and chaining expressions with semicolons, `;`.

The following JavaScript and template expression syntax is not allowed:

- `new`
- increment and decrement operators, `++` and `--`
- operator assignment, such as `+=` and `-=`
- the bitwise operators, such as `|` and `&`
- the [pipe operator](https://v12.angular.io/guide/pipes)

#### Statement context

```html
<button (click)="onSave($event)">Save</button>
<button *ngFor="let hero of heroes" (click)="deleteHero(hero)">{{hero.name}}</button>
<form #heroForm (ngSubmit)="onSubmit(heroForm)"> ... </form>
```
In this example, the context of the `$event` object, `hero`, and `#heroForm` is the template.

Template context names take precedence over component context names. In the preceding `deleteHero(hero)`, the `hero` is the template input variable, not the component's `hero` property.

#### Statement best practices

- **Conciseness**

  Use method calls or basic property assignments to keep template statements minimal.

- **Work within the context**

  The context of a template statement can be the component class instance or the template. Because of this, template statements cannot refer to anything in the global namespace such as `window` or `document`.

### Transforming Data Using Pipes

Use pipes to transform strings, currency amounts, dates, and other data for display. Pipes are simple functions to use in template expressions to accept an input value and return a transformed value. 

For a complete list of built-in pipes, see the [pipes API documentation](https://v12.angular.io/api/common#pipes).

To learn more about using pipes for internationalization (i18n) efforts, see [formatting data based on locale](https://v12.angular.io/guide/i18n-common-format-data-locale).

To apply a pipe, use the pipe operator (|) within a template expression

The template expression `{{ amount | currency:'EUR' }}` transforms the `amount` to currency in euros. Follow the pipe name (`currency`) with a colon (`:`) and the parameter value (`'EUR'`).

If the pipe accepts multiple parameters, separate the values with colons. For example, `{{ amount | currency:'EUR':'Euros '}}` adds the second parameter, the string literal `'Euros '`, to the output string.

We can apply two formats by chaining pipes

To mark a class as a pipe and supply configuration metadata, apply the @Pipe decorator to the class.

Include your pipe in the declarations field of the NgModule metadata in order for it to be available to a template. 

Register your custom pipes. The Angular CLI ng generate pipe command registers the pipe automatically.

#### Detecting pure changes to primitives and object references

By default, pipes are defined as *pure* so that Angular executes the pipe only when it detects a *pure change* to the input value. A pure change is either a change to a primitive input value (such as `String`, `Number`, `Boolean`, or `Symbol`), or a changed object reference (such as `Date`, `Array`, `Function`, or `Object`).

With a pure pipe, Angular ignores changes within composite objects, such as a newly added element of an existing array, because checking a primitive value or object reference is much faster than performing a deep check for differences within objects. Angular can quickly determine if it can skip executing the pipe and updating the view.

While an impure pipe can be useful, be careful using one. A long-running impure pipe could dramatically slow down your application.

#### Unwrapping data from an observable

Observables let you pass messages between parts of your application. 
Observables are recommended for event handling, asynchronous programming, and handling multiple values. 
Observables can deliver single or multiple values of any type, either synchronously (as a function delivers a value to its caller) or asynchronously on a schedule.

The pipe operator has a higher precedence than the ternary operator (`?:`), which means `a ? b : c | x` is parsed as `a ? b : (c | x)`. 

### Property binding

The brackets, [], cause Angular to evaluate the right-hand side of the assignment as a dynamic expression. Without the brackets, Angular treats the right-hand side as a string literal and sets the property to that static value.

Interpolation and property binding can set only properties, not attributes.

Property binding can help keep content secure from XSS

#### Property binding and interpolation

Often interpolation and property binding can achieve the same results.

```html
<p><img src="{{itemImageUrl}}"> is the <i>interpolated</i> image.</p>
<p><img [src]="itemImageUrl"> is the <i>property bound</i> image.</p>

<p><span>"{{interpolationTitle}}" is the <i>interpolated</i> title.</span></p>
<p>"<span [innerHTML]="propertyTitle"></span>" is the <i>property bound</i> title.</p>
```

Use either form when rendering data values as strings, though interpolation is preferable for readability. 

However, when setting an element property to a non-string data value, you must use property binding.


### Attribute, class, and style bindings

Attribute binding in Angular helps you set values for attributes directly. 
With attribute binding, you can improve accessibility, style your application dynamically, and manage multiple CSS classes or styles simultaneously.

It is recommended that you set an element property with a property binding whenever possible. However, sometimes you don't have an element property to bind. In those situations, use attribute binding.


Neither ARIA nor SVG correspond to element properties and don't set element properties. In these cases, you must use attribute binding because there are no corresponding property targets.

Attribute binding syntax resembles property binding, but instead of an element property between brackets, you precede the name of the attribute with the prefix attr, followed by a dot. 

When the expression resolves to `null` or `undefined`, Angular removes the attribute altogether.

One of the primary use cases for attribute binding is to set ARIA attributes, as in this example:

```html
<!-- create and set an aria attribute for assistive technology -->
<button [attr.aria-label]="actionName">{{actionName}} with Aria</button>
```

Another common use case for attribute binding is with the colspan attribute in tables. 

```html
<!--  expression calculates colspan=2 -->
<tr><td [attr.colspan]="1 + 1">One-Two</td></tr>
```

Sometimes there are differences between the name of property and an attribute.

colspan is an attribute of `<tr>`, while `colSpan` with a capital "S" is a property.

#### Binding to the class attribute

### Binding to multiple CSS classes

To bind to multiple classes, use `[class]` set to an expression—for example, `[class]="classExpression"`. The expression can be one of:

- A space-delimited string of class names.
- An object with class names as the keys and truthy or falsy expressions as the values.
- An array of class names.

With the object format, Angular adds a class only if its associated value is truthy.

If there are multiple bindings to the same class name, Angular uses [styling precedence](https://v12.angular.io/guide/style-precedence) to determine which binding to use.

The following table summarizes class binding syntax.

| Binding Type         | Syntax                      | Input Type              | Example Input Values                 |
| :------------------- | :-------------------------- | :---------------------- | :----------------------------------- |
| Single class binding | `[class.sale]="onSale"`     | `boolean                | undefined                            | null`  | `true`, `false`           |
| Multi-class binding  | `[class]="classExpression"` | `string`                | `"my-class-1 my-class-2 my-class-3"` |
| Multi-class binding  | `[class]="classExpression"` | `Record<string, boolean | undefined                            | null>` | `{foo: true, bar: false}` |  |  |
| Multi-class binding  | `[class]="classExpression"` | `Array`<`string`>       | `['foo', 'bar']`                     |        |                           |

#### Binding to the style attribute

You can write a style property name in either dash-case, or camelCase.

```html
<nav [style.background-color]="expression"></nav>

<nav [style.backgroundColor]="expression"></nav>
```

To toggle multiple styles, bind to the `[style]` attribute—for example, `[style]="styleExpression"`. The `styleExpression` can be one of:

- A string list of styles such as `"width: 100px; height: 100px; background-color: cornflowerblue;"`.
- An object with style names as the keys and style values as the values, such as `{width: '100px', height: '100px', backgroundColor: 'cornflowerblue'}`.

Note that binding an array to `[style]` is not supported.



If there are multiple bindings to the same style attribute, Angular uses [styling precedence](https://v12.angular.io/guide/style-precedence) to determine which binding to use.

The following table summarizes style binding syntax.

| Binding Type                    | Syntax                      | Input Type             | Example Input Values            |
| :------------------------------ | :-------------------------- | :--------------------- | :------------------------------ |
| Single style binding            | `[style.width]="width"`     | `string                | undefined                       | null`  | `"100px"`                           |
|                                 |                             |                        |                                 |
| Single style binding with units | `[style.width.px]="width"`  | `number                | undefined                       | null`  | `100`                               |
| Multi-style binding             | `[style]="styleExpression"` | `string`               | `"width: 100px; height: 100px"` |
| Multi-style binding             | `[style]="styleExpression"` | `Record<string, string | undefined                       | null>` | `{width: '100px', height: '100px'}` |  |  |

#### Styling Precedence

When there are multiple bindings to the same class name or style property, Angular uses a set of precedence rules to resolve conflicts and determine which classes or styles are ultimately applied to the element.

#### Styling precedence (highest to lowest)

1. Template bindings
   1. Property binding (for example, `<div [class.foo]="hasFoo">` or `<div [style.color]="color">`)
   2. Map binding (for example, `<div [class]="classExpr">` or `<div [style]="styleExpr">`)
   3. Static value (for example, `<div class="foo">` or `<div style="color: blue">`)
2. Directive host bindings
   1. Property binding (for example, `host: {'[class.foo]': 'hasFoo'}` or `host: {'[style.color]': 'color'}`)
   2. Map binding (for example, `host: {'[class]': 'classExpr'}` or `host: {'[style]': 'styleExpr'}`)
   3. Static value (for example, `host: {'class': 'foo'}` or `host: {'style': 'color: blue'}`)
3. Component host bindings
   1. Property binding (for example, `host: {'[class.foo]': 'hasFoo'}` or `host: {'[style.color]': 'color'}`)
   2. Map binding (for example, `host: {'[class]': 'classExpr'}` or `host: {'[style]': 'styleExpr'}`)
   3. Static value (for example, `host: {'class': 'foo'}` or `host: {'style': 'color: blue'}`)

The more specific a class or style binding is, the higher its precedence.

#### Delegating to styles with lower precedence

It is possible for higher precedence styles to "delegate" to lower precedence styles using undefined values. Whereas setting a style property to null ensures the style is removed, setting it to undefined causes Angular to fall back to the next-highest precedence binding to that style.

#### Injecting attribute values

The Attribute parameter decorator is great for passing the value of an HTML attribute to a component/directive constructor using dependency injection.

Remember, use @Input() when you want to keep track of the attribute value and update the associated property. Use @Attribute() when you want to inject the value of an HTML attribute to a component or directive constructor.

### Event binding

#### Custom events with `EventEmitter`

[Directives](https://v12.angular.io/guide/built-in-directives) typically raise custom events with an Angular [EventEmitter](https://v12.angular.io/api/core/EventEmitter) as follows.

1. The directive creates an `EventEmitter` and exposes it as a property.
2. The directive then calls `EventEmitter.emit(data)` to emit an event, passing in message data, which can be anything.
3. Parent directives listen for the event by binding to this property and accessing the data through the `$event` object.

### Two-way binding

Two-way binding gives components in your application a way to share data.

Angular's two-way binding syntax is a combination of square brackets and parentheses, `[()]`. The `[()]` syntax combines the brackets of property binding, `[]`, with the parentheses of event binding, `()`, as follows.

```html
<app-sizer [(size)]="fontSizePx"></app-sizer>
<!-- shorthand for a combination of property binding and event binding.  -->
<!-- <app-sizer [size]="fontSizePx" (sizeChange)="fontSizePx=$event"></app-sizer> -->
```

#### How two-way binding works?

The two-way binding syntax is shorthand for a combination of property binding and event binding. 

For two-way data binding to work, the `@Output()` property must use the pattern, `inputChange`, where `input` is the name of the `@Input()` property. For example, if the `@Input()` property is `size`, the `@Output()` property must be `sizeChange`.

Because no built-in HTML element follows the x value and xChange event pattern, two-way binding with form elements requires NgModel.

### Template variables

Template variables help you use data from one part of a template in another part of the template. 

A template variable can refer to the following:

- a DOM element within a template
- a directive
- an element
- TemplateRef
- a web component

In the template, you use the hash symbol,`#`, to declare a template variable. 

#### How Angular assigns values to template variables

Angular assigns a template variable a value based on where you declare the variable:

- If you declare the variable on a component, the variable refers to the component instance.
- If you declare the variable on a standard HTML tag, the variable refers to the element.
- If you declare the variable on an `<ng-template>` element, the variable refers to a `TemplateRef` instance, which represents the template. 
- If the variable specifies a name on the right-hand side, such as `#var="ngModel"`, the variable refers to the directive or component on the element with a matching `exportAs` name.

#### Template variable scope

Refer to a template variable anywhere within its surrounding template. [Structural directives](https://v12.angular.io/guide/built-in-directives), such as `*ngIf` and `*ngFor`, or `<ng-template>` act as a template boundary. 

#### Accessing in a nested template

An inner template can access template variables that the outer template defines.


### SVG as templates

You can use SVG files as templates in your Angular applications. 
When you use an SVG as the template, you are able to use directives and bindings just like with HTML templates. 



## Directives

## Dependency Injesction