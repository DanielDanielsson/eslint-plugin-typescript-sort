import { JSONSchema4 } from '@typescript-eslint/utils/json-schema';

export enum SortingOrder {
  Ascending = 'asc',
  Descending = 'desc',
}

export const sortingOrderOptionSchema: JSONSchema4 = {
  type: 'string',
  enum: [SortingOrder.Ascending, SortingOrder.Descending],
};

export type SortingOrderOption = SortingOrder;

interface CaseSensitiveSortingOption {
  readonly caseSensitive: boolean;
}

interface NaturalSortingOption {
  readonly natural: boolean;
}

interface RequiredFirstSortingOption {
  readonly requiredFirst: boolean;
}

export interface SortingParamsOptions {
  readonly caseSensitive: CaseSensitiveSortingOption;
  readonly natural: NaturalSortingOption;
  readonly requiredFirst: RequiredFirstSortingOption;
}

export enum ErrorMessage {
  DefaultPropsInvalidOrder = `Expected default props to component to be in {{ requiredFirst }}{{ natural }}{{ insensitive }}{{ order }}ending order. '{{ thisName }}' should be before '{{ prevName }}'.`,
  InterfaceInvalidOrder = `Expected interface keys to be in {{ requiredFirst }}{{ natural }}{{ insensitive }}{{ order }}ending order. '{{ thisName }}' should be before '{{ prevName }}'.`,
  StringEnumInvalidOrder = `Expected string enum members to be in {{ natural }}{{ insensitive }}{{ order }}ending order. '{{ thisName }}' should be before '{{ prevName }}'.`,
  TypeInvalidOrder = `Expected type keys to be in {{ requiredFirst }}{{ natural }}{{ insensitive }}{{ order }}ending order. '{{ thisName }}' should be before '{{ prevName }}'.`,
}
