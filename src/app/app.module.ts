import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestComponent } from './http-client-test/http-client-test.component';
import { TestInterceptor } from './testInterceptor';
import { TestInterceptor2 } from './testInterceptor2';

@NgModule({
  declarations: [AppComponent, HttpClientTestComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TestInterceptor2, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
