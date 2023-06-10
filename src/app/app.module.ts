import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { LoadingComponent } from './components/loading/loading.component';
import { FormComponent } from './components/form/form.component';
import { AreaService } from './area.service';

@NgModule({
  declarations: [AppComponent, MapComponent, LoadingComponent, FormComponent],
  imports: [BrowserModule, FormsModule, LeafletModule],
  providers: [AreaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
