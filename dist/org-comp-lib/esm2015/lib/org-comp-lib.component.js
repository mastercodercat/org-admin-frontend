import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/button";
import * as i2 from "ng-zorro-antd/core/wave";
import * as i3 from "ng-zorro-antd/core/transition-patch";
export class OrgCompLibComponent {
    constructor() {
        this.type = 'primary';
        this.label = 'Button';
    }
}
OrgCompLibComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: OrgCompLibComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
OrgCompLibComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: OrgCompLibComponent, selector: "lib-org-comp-lib", inputs: { type: "type", label: "label" }, ngImport: i0, template: `
    <p>
      example ant design button component
    </p>
    <button nz-button [nzType]="type">{{label}}</button>
  `, isInline: true, components: [{ type: i1.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }], directives: [{ type: i2.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }, { type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: OrgCompLibComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'lib-org-comp-lib',
                    template: `
    <p>
      example ant design button component
    </p>
    <button nz-button [nzType]="type">{{label}}</button>
  `,
                    styles: [],
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { type: [{
                type: Input
            }], label: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnLWNvbXAtbGliLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL29yZy1jb21wLWxpYi9zcmMvbGliL29yZy1jb21wLWxpYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBYWpELE1BQU0sT0FBTyxtQkFBbUI7SUFLOUI7UUFIUyxTQUFJLEdBQStDLFNBQVMsQ0FBQztRQUM3RCxVQUFLLEdBQUcsUUFBUSxDQUFDO0lBRVYsQ0FBQzs7aUhBTE4sbUJBQW1CO3FHQUFuQixtQkFBbUIsa0dBVHBCOzs7OztHQUtUOzRGQUlVLG1CQUFtQjtrQkFYL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUU7Ozs7O0dBS1Q7b0JBQ0QsTUFBTSxFQUFFLEVBQ1A7aUJBQ0Y7MEVBR1UsSUFBSTtzQkFBWixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW9yZy1jb21wLWxpYicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICBleGFtcGxlIGFudCBkZXNpZ24gYnV0dG9uIGNvbXBvbmVudFxuICAgIDwvcD5cbiAgICA8YnV0dG9uIG56LWJ1dHRvbiBbbnpUeXBlXT1cInR5cGVcIj57e2xhYmVsfX08L2J1dHRvbj5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE9yZ0NvbXBMaWJDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpIHR5cGU6ICdwcmltYXJ5J3wnZGFzaGVkJ3wnbGluayd8J3RleHQnfCdkZWZhdWx0JyA9ICdwcmltYXJ5JztcbiAgQElucHV0KCkgbGFiZWwgPSAnQnV0dG9uJztcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG59XG4iXX0=