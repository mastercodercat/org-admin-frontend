import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/icon";
const orgForm = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.3333 0L2.66667 0C1.2 0 0 1.2 0 2.66667L0 21.3333C0 22.8 1.2 24 2.66667 24L21.3333 24C22.8 24 24 22.8 24 21.3333L24 6.66667L17.3333 0ZM21.3333 21.3333L2.66667 21.3333L2.66667 2.66667L16 2.66667V8L21.3333 8L21.3333 21.3333ZM5.33333 18.6667L18.6667 18.6667V16L5.33333 16V18.6667ZM12 5.33333L5.33333 5.33333V8L12 8L12 5.33333ZM5.33333 13.3333L18.6667 13.3333L18.6667 10.6667L5.33333 10.6667V13.3333Z"/>
    </svg>`;
export class IconsModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvb3JnLWNvbXAtbGliL3NyYy9saWIvaWNvbnMvaWNvbnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQWlCLE1BQU0sb0JBQW9CLENBQUM7OztBQUVqRSxNQUFNLE9BQU8sR0FDVDs7V0FFTyxDQUFDO0FBY1osTUFBTSxPQUFPLFdBQVc7SUFDdEIsWUFBb0IsV0FBMEI7UUFBMUIsZ0JBQVcsR0FBWCxXQUFXLENBQWU7UUFDNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7O3lHQUhVLFdBQVc7MEdBQVgsV0FBVztRQVRwQixrQkFBa0I7UUFDbEIsWUFBWTtRQUVaLGNBQWM7UUFDZCxZQUFZLGFBR0osWUFBWTswR0FFWCxXQUFXLGFBSFgsRUFBRSxZQVBKO1lBQ1Asa0JBQWtCO1lBQ2xCLFlBQVk7WUFFWixjQUFjO1lBQ2QsWUFBWTtTQUNiLEVBRVMsWUFBWTs0RkFFWCxXQUFXO2tCQVpyQixRQUFRO21CQUFDO29CQUNWLFlBQVksRUFBRSxFQUFFO29CQUNoQixPQUFPLEVBQUU7d0JBQ1Asa0JBQWtCO3dCQUNsQixZQUFZO3dCQUVaLGNBQWM7d0JBQ2QsWUFBWTtxQkFDYjtvQkFDRCxTQUFTLEVBQUUsRUFBRTtvQkFDYixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7aUJBQ3hCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOekljb25Nb2R1bGUsIE56SWNvblNlcnZpY2UgfSBmcm9tICduZy16b3Jyby1hbnRkL2ljb24nO1xuXG5jb25zdCBvcmdGb3JtXG4gID0gYDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICA8cGF0aCBkPVwiTTE3LjMzMzMgMEwyLjY2NjY3IDBDMS4yIDAgMCAxLjIgMCAyLjY2NjY3TDAgMjEuMzMzM0MwIDIyLjggMS4yIDI0IDIuNjY2NjcgMjRMMjEuMzMzMyAyNEMyMi44IDI0IDI0IDIyLjggMjQgMjEuMzMzM0wyNCA2LjY2NjY3TDE3LjMzMzMgMFpNMjEuMzMzMyAyMS4zMzMzTDIuNjY2NjcgMjEuMzMzM0wyLjY2NjY3IDIuNjY2NjdMMTYgMi42NjY2N1Y4TDIxLjMzMzMgOEwyMS4zMzMzIDIxLjMzMzNaTTUuMzMzMzMgMTguNjY2N0wxOC42NjY3IDE4LjY2NjdWMTZMNS4zMzMzMyAxNlYxOC42NjY3Wk0xMiA1LjMzMzMzTDUuMzMzMzMgNS4zMzMzM1Y4TDEyIDhMMTIgNS4zMzMzM1pNNS4zMzMzMyAxMy4zMzMzTDE4LjY2NjcgMTMuMzMzM0wxOC42NjY3IDEwLjY2NjdMNS4zMzMzMyAxMC42NjY3VjEzLjMzMzNaXCIvPlxuICAgIDwvc3ZnPmA7XG5cbiAgQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgaW1wb3J0czogW1xuICAgIC8vIEFuZ3VsYXIgbW9kdWxlc1xuICAgIENvbW1vbk1vZHVsZSxcblxuICAgIC8vIEFudGQgbW9kdWxlXG4gICAgTnpJY29uTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtdLFxuICBleHBvcnRzOiBbTnpJY29uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgSWNvbnNNb2R1bGUge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGljb25TZXJ2aWNlOiBOekljb25TZXJ2aWNlKSB7XG4gICAgdGhpcy5pY29uU2VydmljZS5hZGRJY29uTGl0ZXJhbCgnb3JnOmZvcm0nLCBvcmdGb3JtKTtcbiAgfVxufVxuIl19