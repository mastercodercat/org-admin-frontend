(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('ng-zorro-antd/icon'), require('ng-zorro-antd/button'), require('ng-zorro-antd/core/wave'), require('ng-zorro-antd/core/transition-patch')) :
    typeof define === 'function' && define.amd ? define('org-comp-lib', ['exports', '@angular/common', '@angular/core', 'ng-zorro-antd/icon', 'ng-zorro-antd/button', 'ng-zorro-antd/core/wave', 'ng-zorro-antd/core/transition-patch'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["org-comp-lib"] = {}, global.ng.common, global.ng.core, global.i1, global.i1$1, global.i2, global.i3));
})(this, (function (exports, common, i0, i1, i1$1, i2, i3) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i1__namespace$1 = /*#__PURE__*/_interopNamespace(i1$1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);

    var orgForm = "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M17.3333 0L2.66667 0C1.2 0 0 1.2 0 2.66667L0 21.3333C0 22.8 1.2 24 2.66667 24L21.3333 24C22.8 24 24 22.8 24 21.3333L24 6.66667L17.3333 0ZM21.3333 21.3333L2.66667 21.3333L2.66667 2.66667L16 2.66667V8L21.3333 8L21.3333 21.3333ZM5.33333 18.6667L18.6667 18.6667V16L5.33333 16V18.6667ZM12 5.33333L5.33333 5.33333V8L12 8L12 5.33333ZM5.33333 13.3333L18.6667 13.3333L18.6667 10.6667L5.33333 10.6667V13.3333Z\"/>\n    </svg>";
    var IconsModule = /** @class */ (function () {
        function IconsModule(iconService) {
            this.iconService = iconService;
            this.iconService.addIconLiteral('org:form', orgForm);
        }
        return IconsModule;
    }());
    IconsModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: IconsModule, deps: [{ token: i1__namespace.NzIconService }], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    IconsModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: IconsModule, imports: [
            // Angular modules
            common.CommonModule,
            // Antd module
            i1.NzIconModule
        ], exports: [i1.NzIconModule] });
    IconsModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: IconsModule, providers: [], imports: [[
                // Angular modules
                common.CommonModule,
                // Antd module
                i1.NzIconModule,
            ], i1.NzIconModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: IconsModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [],
                        imports: [
                            // Angular modules
                            common.CommonModule,
                            // Antd module
                            i1.NzIconModule,
                        ],
                        providers: [],
                        exports: [i1.NzIconModule],
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.NzIconService }]; } });

    var OrgCompLibService = /** @class */ (function () {
        function OrgCompLibService() {
        }
        return OrgCompLibService;
    }());
    OrgCompLibService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: OrgCompLibService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    OrgCompLibService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: OrgCompLibService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: OrgCompLibService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root',
                    }]
            }], ctorParameters: function () { return []; } });

    var OrgCompLibComponent = /** @class */ (function () {
        function OrgCompLibComponent() {
            this.type = 'primary';
            this.label = 'Button';
        }
        return OrgCompLibComponent;
    }());
    OrgCompLibComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: OrgCompLibComponent, deps: [], target: i0__namespace.ɵɵFactoryTarget.Component });
    OrgCompLibComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.16", type: OrgCompLibComponent, selector: "lib-org-comp-lib", inputs: { type: "type", label: "label" }, ngImport: i0__namespace, template: "\n    <p>\n      example ant design button component\n    </p>\n    <button nz-button [nzType]=\"type\">{{label}}</button>\n  ", isInline: true, components: [{ type: i1__namespace$1.NzButtonComponent, selector: "button[nz-button], a[nz-button]", inputs: ["nzBlock", "nzGhost", "nzSearch", "nzLoading", "nzDanger", "disabled", "tabIndex", "nzType", "nzShape", "nzSize"], exportAs: ["nzButton"] }], directives: [{ type: i2__namespace.NzWaveDirective, selector: "[nz-wave],button[nz-button]:not([nzType=\"link\"]):not([nzType=\"text\"])", inputs: ["nzWaveExtraNode"], exportAs: ["nzWave"] }, { type: i3__namespace.ɵNzTransitionPatchDirective, selector: "[nz-button], nz-button-group, [nz-icon], [nz-menu-item], [nz-submenu], nz-select-top-control, nz-select-placeholder, nz-input-group", inputs: ["hidden"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: OrgCompLibComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'lib-org-comp-lib',
                        template: "\n    <p>\n      example ant design button component\n    </p>\n    <button nz-button [nzType]=\"type\">{{label}}</button>\n  ",
                        styles: [],
                    }]
            }], ctorParameters: function () { return []; }, propDecorators: { type: [{
                    type: i0.Input
                }], label: [{
                    type: i0.Input
                }] } });

    var OrgCompLibModule = /** @class */ (function () {
        function OrgCompLibModule() {
        }
        return OrgCompLibModule;
    }());
    OrgCompLibModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: OrgCompLibModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    OrgCompLibModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: OrgCompLibModule, declarations: [OrgCompLibComponent], imports: [i1$1.NzButtonModule,
            IconsModule], exports: [OrgCompLibComponent,
            IconsModule] });
    OrgCompLibModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: OrgCompLibModule, imports: [[
                i1$1.NzButtonModule,
                IconsModule
            ], IconsModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: OrgCompLibModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            OrgCompLibComponent,
                        ],
                        imports: [
                            i1$1.NzButtonModule,
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

    exports.IconsModule = IconsModule;
    exports.OrgCompLibComponent = OrgCompLibComponent;
    exports.OrgCompLibModule = OrgCompLibModule;
    exports.OrgCompLibService = OrgCompLibService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=org-comp-lib.umd.js.map
