export interface TreeRegion {
  key: string;
  name: string;
  people: number;
  households: number;
  level?: number;
  expanded?: boolean;
  showExpand?: boolean;
  children?: TreeRegion[];
  isSelected: boolean;
  isDisabled: boolean;
  parentCode?: string;
  search?: boolean;
  loading?: boolean;
  type?: string;
  communityName?: string;
}
