/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  constructor() {}

  public myLayers$ = new Subject<any>();

  public addLayer(layer: any) {
    this.myLayers$.next(layer);
  }

  areas: any = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { id: 1, name: 'Северо-восток', isSelected: false },
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
      },
      {
        type: 'Feature',
        properties: { id: 2, name: 'Центральный', isSelected: false },
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
      },
      {
        type: 'Feature',
        properties: { id: 3, name: 'Юго-запад', isSelected: false },
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
      },
    ],
  };

  getAreas() {
    return this.areas;
  }
}
