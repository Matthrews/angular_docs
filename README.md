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

## Directives

## Dependency Injesction