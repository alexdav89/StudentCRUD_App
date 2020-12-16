import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import {
  SharedModule
} from './shared';
import {NgbModule,NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
  BrowserModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AppRoutingModule,
    NgbModule
  ],
  exports:[NgbNav],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
