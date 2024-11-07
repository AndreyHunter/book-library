import { useSelector, useDispatch } from 'react-redux';
import type { TypeRootState, TypeAppDispatch } from './store';

export const useAppSelector = useSelector.withTypes<TypeRootState>();
export const useAppDispatch = useDispatch.withTypes<TypeAppDispatch>();
