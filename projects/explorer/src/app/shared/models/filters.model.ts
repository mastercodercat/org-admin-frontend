export interface FilterModel {
  id: string;
  filters: any;
  filter?: FilterOption[];
}

export interface FilterOption {
  label: string;
  value: CardSelectedFiltersValue | string;
  checked?: boolean;
}

interface CardSelectedFiltersValue {
  property: string;
  selected: string | number[];
}

