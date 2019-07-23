import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {HighlightContainerComponent} from './highlight-container/highlight-container.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  IgxButtonModule, IgxInputGroupModule,
  IgxIconModule, IgxRippleModule, IgxTextHighlightModule, IgxChipsModule
} from 'igniteui-angular';


@NgModule({
  declarations: [
    AppComponent,
    HighlightContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, IgxButtonModule, IgxInputGroupModule,
    IgxIconModule, IgxRippleModule, IgxTextHighlightModule, FormsModule, HttpClientModule, IgxChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
