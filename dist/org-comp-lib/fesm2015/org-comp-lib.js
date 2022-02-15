import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { NgModule, Injectable, Component, Input } from '@angular/core';
import * as i1 from 'ng-zorro-antd/icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i1$1 from 'ng-zorro-antd/button';
import { NzButtonModule } from 'ng-zorro-antd/button';
import * as i2 from 'ng-zorro-antd/core/wave';
import * as i3 from 'ng-zorro-antd/core/transition-patch';

const orgForm = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.3333 0L2.66667 0C1.2 0 0 1.2 0 2.66667L0 21.3333C0 22.8 1.2 24 2.66667 24L21.3333 24C22.8 24 24 22.8 24 21.3333L24 6.66667L17.3333 0ZM21.3333 21.3333L2.66667 21.3333L2.66667 2.66667L16 2.66667V8L21.3333 8L21.3333 21.3333ZM5.33333 18.6667L18.6667 18.6667V16L5.33333 16V18.6667ZM12 5.33333L5.33333 5.33333V8L12 8L12 5.33333ZM5.33333 13.3333L18.6667 13.3333L18.6667 10.6667L5.33333 10.6667V13.3333Z"/>
    </svg>`;
class IconsModule {
    constructor(iconService) {
        this.iconService = iconService;
        this.iconService.addIconLiteral('org:form', orgForm);
    }
}
IconsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: IconsModule, deps: [{ token: i1.NzIconService }], target: i0.ɵɵFactoryTarget.NgModule });
IconsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: IconsModule, imports: [
        // Angular modules
        CommonModule,
        // Antd module
        NzIconModule], exports: [NzIconModule] });
IconsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: IconsModule, providers: [], imports: [[
            // Angular modules
            CommonModule,
            // Antd module
            NzIconModule,
        ], NzIconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: IconsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [],
                    imports: [
                        // Angular modules
                        CommonModule,
                        // Antd module
                        NzIconModule,
                    ],
                    providers: [],
                    exports: [NzIconModule],
                }]
        }], ctorParameters: function () { return [{ type: i1.NzIconService }]; } });

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
  `, isInline: true, components: [{ type: i1$1.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }], directives: [{ type: i2.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }, { type: i3.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }] });
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
OrgCompLibModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: OrgCompLibModule, declarations: [OrgCompLibComponent], imports: [NzButtonModule,
        IconsModule], exports: [OrgCompLibComponent,
        IconsModule] });
OrgCompLibModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: OrgCompLibModule, imports: [[
            NzButtonModule,
            IconsModule
        ], IconsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0, type: OrgCompLibModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        OrgCompLibComponent,
                    ],
                    imports: [
                        NzButtonModule,
                        IconsModule
                    ],
                    exports: [
                        OrgCompLibComponent,
                        IconsModule,
                    ],
                }]
        }] });

/*
 * Public API Surface of org-comp-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { IconsModule, OrgCompLibComponent, OrgCompLibModule, OrgCompLibService };
//# sourceMappingURL=org-comp-lib.js.map
