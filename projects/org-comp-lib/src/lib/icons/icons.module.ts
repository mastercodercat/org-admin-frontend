import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';

const orgForm
  = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.3333 0L2.66667 0C1.2 0 0 1.2 0 2.66667L0 21.3333C0 22.8 1.2 24 2.66667 24L21.3333 24C22.8 24 24 22.8 24 21.3333L24 6.66667L17.3333 0ZM21.3333 21.3333L2.66667 21.3333L2.66667 2.66667L16 2.66667V8L21.3333 8L21.3333 21.3333ZM5.33333 18.6667L18.6667 18.6667V16L5.33333 16V18.6667ZM12 5.33333L5.33333 5.33333V8L12 8L12 5.33333ZM5.33333 13.3333L18.6667 13.3333L18.6667 10.6667L5.33333 10.6667V13.3333Z"/>
    </svg>`;

  @NgModule({
  declarations: [],
  imports: [
    // Angular modules
    CommonModule,

    // Antd module
    NzIconModule,
  ],
  providers: [],
  exports: [NzIconModule],
})
export class IconsModule {
  constructor(private iconService: NzIconService) {
    this.iconService.addIconLiteral('org:form', orgForm);
  }
}
