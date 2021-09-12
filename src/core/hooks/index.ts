import { useDialog } from './useDialog';
import { useAppStore } from './useAppStore';

export * from './useDialog';
export * from './useAppStore';

export function useHooks() {
  return {
    DIALOG: useDialog(),
    APP_STORE: useAppStore(),
  };
}
