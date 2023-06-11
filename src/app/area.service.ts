import { Injectable } from '@angular/core';
import { Polygon } from 'leaflet';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  constructor() {}

  layers$ = new ReplaySubject<Polygon>();

  features: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          coordinates: [
            [
              [-0.07564015574146765, 51.56591004555301],
              [-0.07564015574146765, 51.524377490948325],
              [0.01155912068858811, 51.524377490948325],
              [0.01155912068858811, 51.56591004555301],
              [-0.07564015574146765, 51.56591004555301],
            ],
          ],
          type: 'Polygon',
        },
        properties: { id: 1, name: 'Северо-восток' },
      },
      {
        type: 'Feature',
        geometry: {
          coordinates: [
            [
              [-0.16586590960233139, 51.50846088096935],
              [-0.24891283953562038, 51.50846088096935],
              [-0.24891283953562038, 51.46752257432823],
              [-0.16586590960233139, 51.46752257432823],
              [-0.16586590960233139, 51.50846088096935],
            ],
          ],
          type: 'Polygon',
        },
        properties: { id: 2, name: 'Центр' },
      },
      {
        type: 'Feature',
        geometry: {
          coordinates: [
            [
              [-0.08510808006420234, 51.47860837720495],
              [-0.08510808006420234, 51.434839039959115],
              [0.02250689997453037, 51.434839039959115],
              [0.02250689997453037, 51.47860837720495],
              [-0.08510808006420234, 51.47860837720495],
            ],
          ],
          type: 'Polygon',
        },
        properties: { id: 3, name: 'Юго-восток' },
      },
    ],
  };

  public addLayer(layer: Polygon): void {
    this.layers$.next(layer);
  }

  public getLayers(): ReplaySubject<Polygon> {
    return this.layers$;
  }

  public getFeatures(): GeoJSON.FeatureCollection {
    return this.features;
  }
}
