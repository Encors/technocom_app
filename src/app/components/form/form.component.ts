import {
  Component,
  DestroyRef,
  EventEmitter,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Polygon } from 'leaflet';
import { AreaService } from 'src/app/area.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Output() outSelected = new EventEmitter<Polygon>();

  private destroyRef: DestroyRef = inject(DestroyRef);

  public selected: Polygon;
  public areas$: Polygon[] = [];

  constructor(private areaService: AreaService) {}

  private getAreasArray(): void {
    this.areaService
      .getLayers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.areas$.push(res);
      });
  }

  public changeArea(layer: Polygon): void {
    this.outSelected.emit(layer);
  }

  ngOnInit(): void {
    this.getAreasArray();
  }
}
