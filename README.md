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

| [ng build](https://v12.angular.io/cli/build)       | Compiles an Angular app into an output directory.            |
| -------------------------------------------------- | ------------------------------------------------------------ |
| [ng serve](https://v12.angular.io/cli/serve)       | Builds and serves your application, rebuilding on file changes. |
| [ng generate](https://v12.angular.io/cli/generate) | Generates or modifies files based on a schematic.            |
| [ng test](https://v12.angular.io/cli/test)         | Runs unit tests on a given project.                          |
| [ng e2e](https://v12.angular.io/cli/e2e)           | Builds and serves an Angular application, then runs end-to-end tests |

## 3rd-party libraries

| [Angular Router](https://v12.angular.io/guide/router)        | Advanced client-side navigation and routing based on Angular components. Supports lazy-loading, nested routes, custom path matching, and more. |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Angular Forms](https://v12.angular.io/guide/forms-overview) | Uniform system for form participation and validation.        |
| [Angular HttpClient](https://v12.angular.io/guide/http)      | Robust HTTP client that can power more advanced client-server communication. |
| [Angular Animations](https://v12.angular.io/guide/animations) | Rich system for driving animations based on application state. |
| [Angular PWA](https://v12.angular.io/guide/service-worker-intro) | Tools for building Progressive Web Applications (PWAs) including a service worker and Web app manifest. |
| [Angular Schematics](https://v12.angular.io/guide/schematics) | Automated scaffolding, refactoring, and update tools that simplify development at a large scale. |

