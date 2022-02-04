// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { OrgCompLibComponent } from '../../../projects/org-comp-lib/src/lib/org-comp-lib.component';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Atomics/Library Component Example',
  component: OrgCompLibComponent,
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<OrgCompLibComponent> = (args: OrgCompLibComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Primary.args = {
  type: 'primary',
  label: 'Primary Button',
};

