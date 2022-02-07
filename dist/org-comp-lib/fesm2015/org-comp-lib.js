import * as i0 from '@angular/core';
import { Injectable, Component, Input, NgModule } from '@angular/core';
import * as i1 from 'ng-zorro-antd/button';
import { NzButtonModule } from 'ng-zorro-antd/button';
import * as i2 from 'ng-zorro-antd/core/wave';
import * as i3 from 'ng-zorro-antd/core/transition-patch';

class OrgCompLibService {
    constructor() { }
}
OrgCompLibService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: OrgCompLibService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OrgCompLibService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: OrgCompLibService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: OrgCompLibService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });

class OrgCompLibComponent {
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

class OrgCompLibModule {
}
OrgCompLibModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: OrgCompLibModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrgCompLibModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: OrgCompLibModule, declarations: [OrgCompLibComponent], imports: [NzButtonModule], exports: [OrgCompLibComponent] });
OrgCompLibModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: OrgCompLibModule, imports: [[
            NzButtonModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: OrgCompLibModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        OrgCompLibComponent,
                    ],
                    imports: [
                        NzButtonModule,
                    ],
                    exports: [
                        OrgCompLibComponent,
                    ],
                }]
        }] });

/*
 * Public API Surface of org-comp-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { OrgCompLibComponent, OrgCompLibModule, OrgCompLibService };
//# sourceMappingURL=org-comp-lib.js.map
