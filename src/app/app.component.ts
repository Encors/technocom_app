import { Component, ViewChild } from '@angular/core';
import { MapComponent } from './components/map/map.component';
import { Polygon } from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(MapComponent) mapComponent: MapComponent;

  selectArea(layer: Polygon) {
    this.mapComponent.geojson.resetStyle();
    layer.setStyle({ fillColor: 'blue' });
    this.mapComponent.zoomMapOnSelected(layer.getBounds());
  }
}
