import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CounterParentComponent } from './counter-parent.component'
import { CounterComponent } from './counter.component';
import { SpyDirective } from './spy.directive';

@NgModule({
  declarations: [
    AppComponent,
    CounterParentComponent,
    CounterComponent,
    SpyDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
