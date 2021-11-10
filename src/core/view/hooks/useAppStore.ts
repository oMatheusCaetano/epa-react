import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '~/core/domain/stores';

export function useAppStore() {
  const dispatch = useDispatch();
  const store: RootState = useSelector((state: RootState) => state);
  return { dispatch, store };
}
