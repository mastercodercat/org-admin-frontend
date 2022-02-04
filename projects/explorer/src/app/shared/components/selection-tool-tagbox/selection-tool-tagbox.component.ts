import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TreeRegion } from '../geo-filters-drawer/tree-region.model';

@Component({
  selector: 'exp-selection-tool-tagbox',
  templateUrl: './selection-tool-tagbox.component.html',
  styleUrls: ['./selection-tool-tagbox.component.scss']
})
export class SelectionToolTagboxComponent implements OnInit {
  @Input() regions: TreeRegion[] = [];
  @Input() closeable: boolean = false;
  @Output() remove = new EventEmitter<TreeRegion>();

  constructor() { }

  ngOnInit(): void {
  }

  removeCommunity(region: TreeRegion, index: number): void {
    this.regions.splice(index, 1);
    this.remove.emit(region);
  }
}
