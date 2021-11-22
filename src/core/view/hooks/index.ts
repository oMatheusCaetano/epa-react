import { useParams } from 'react-router-dom';

export * from './useDialog';
export * from './useAppStore';
export const useRoute = () => useParams<any>();
