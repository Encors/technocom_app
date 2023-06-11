import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Polygon } from 'leaflet';
import { AreaService } from 'src/app/area.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map: L.Map;
  features;
  geojson: L.GeoJSON<GeoJSON.FeatureCollection>;

  constructor(private areaService: AreaService) {
    this.features = this.areaService.getFeatures();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: L.latLng(51.50853, -0.12574),
      zoom: 10,
      minZoom: 7,
      maxZoom: 15,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 20,
        minZoom: 1,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }

  private addGeoJsonFeatures(): L.GeoJSON<GeoJSON.FeatureCollection> {
    return L.geoJSON(this.features, {
      style: this.setStyleFeature,
      onEachFeature: this.onEachFeature,
    });
  }

  private setStyleFeature(feature: any): object {
    return {
      color: 'red',
    };
  }

  // highlightFeature(e: any) {
  //   const layer = e.target;

  //   layer.setStyle({
  //     weight: 4,
  //     color: 'blue',
  //     fillOpacity: 0.2,
  //   });

  //   layer.bringToFront();
  // }

  // resetHighlight(e: any) {
  //   this.geojson.resetStyle(e.target);
  // }

  private zoomToFeatureOnClick(e: L.LeafletMouseEvent): void {
    this.map.fitBounds(e.target.getBounds());
  }

  private onEachFeature = (feature: object, layer: Polygon): void => {
    //отправляем каждый слой в ReplaySubject, где кэшируем слои
    this.areaService.addLayer(layer);

    // конфликтует с выбором полигона через форму
    // layer.on('mouseover', (e: any) => {
    //   this.highlightFeature(e);
    // });

    // layer.on('mouseout', (e: any) => {
    //   this.resetHighlight(e);
    // });

    layer.on('click', (e) => {
      this.zoomToFeatureOnClick(e);
    });
  };

  public zoomMapOnSelected(selected: L.LatLngBoundsExpression): void {
    this.map.flyToBounds(selected);
  }

  ngOnInit(): void {
    this.geojson = this.addGeoJsonFeatures();
    this.initMap();
    this.geojson.addTo(this.map);
  }
}
