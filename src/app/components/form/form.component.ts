/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Output } from '@angular/core';
import { AreaService } from 'src/app/area.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  @Output() outSelected = new EventEmitter<any>();

  selected: any;
  layers: any[] = [];

  constructor(private areaService: AreaService) {
    this.areaService.myLayers$.pipe().subscribe((res) => {
      this.layers.push(res);
    });
  }

  changeArea(layer: any) {
    this.outSelected.emit(layer);
  }
}
