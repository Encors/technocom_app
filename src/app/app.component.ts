import { Component, ViewChild } from '@angular/core';
import { MapComponent } from './components/map/map.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor() {}
  @ViewChild(MapComponent) mapComponent: MapComponent;

  selectArea(layer: any) {
    this.mapComponent.geojson.resetStyle();
    layer.setStyle({ fillColor: 'blue' });
    this.mapComponent.zoomMapOnSelected(layer.getBounds());
  }
}
