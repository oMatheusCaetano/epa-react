import { useDialog } from './useDialog';
import { useDate } from './useDate';
import { useMath } from './useMath';

export * from './useDialog';
export * from './useDate';
export * from './useMath';

export function useHelpers() {
  return {
    DIALOG: useDialog(),
    DATE: useDate(),
    MATH: useMath(),
  };
}
