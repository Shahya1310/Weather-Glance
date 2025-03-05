import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // ✅ Import this
import { FormsModule } from '@angular/forms'; // ✅ Needed for [(ngModel)]

import { SearchComponent } from './components/search/search.component'; // ✅ Correct path
import { WeatherDisplayComponent } from './components/weather-display/weather-display.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    WeatherDisplayComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // ✅ Add this for API calls
    FormsModule // ✅ Needed for two-way data binding in search input
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
