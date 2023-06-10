/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { AreaService } from 'src/app/area.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map: L.Map;
  startLocation = L.latLng(51.50853, -0.12574);
  features: any;
  geojson: any;

  constructor(private areaService: AreaService) {
    this.features = this.areaService.getAreas();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.startLocation,
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

  addGeoJsonFeatures() {
    return L.geoJSON(this.features, {
      style: this.setStyleFeature,
      onEachFeature: this.onEachFeature,
    });
  }

  setStyleFeature(feature: any) {
    return {
      color: 'red',
    };
  }

  highlightFeature(e: any) {
    const layer = e.target;

    layer.setStyle({
      weight: 4,
      color: 'blue',
      fillOpacity: 0.2,
    });

    layer.bringToFront();
  }

  resetHighlight(e: any) {
    this.geojson.resetStyle(e.target);
  }

  zoomToFeature(e: any) {
    this.map.fitBounds(e.target.getBounds());
  }

  onEachFeature = (feature: any, layer: any) => {
    this.areaService.addLayer(layer);

    layer.on('mouseover', (e: any) => {
      this.highlightFeature(e);
    });

    layer.on('mouseout', (e: any) => {
      this.resetHighlight(e);
    });

    layer.on('click', (e: any) => {
      this.zoomToFeature(e);
    });
  };

  zoomMapOnSelected(selected: any) {
    this.map.flyToBounds(selected);
  }

  ngOnInit(): void {
    this.initMap();
    this.geojson = this.addGeoJsonFeatures();
    this.geojson.addTo(this.map);
  }
}
