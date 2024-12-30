import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementNodeId, selectNodeIDs } from '../redux/flowSlice';
import type { NodeIDs } from '../redux/flowSlice';

export const useNodeId = () => {
  const dispatch = useDispatch();
  const nodeIDs = useSelector(selectNodeIDs);

  return useCallback((type: keyof NodeIDs) => {
    dispatch(incrementNodeId(type));
    const nextId = (nodeIDs[type] ?? 0) + 1;
    return `${type}-${nextId}`;
  }, [dispatch, nodeIDs]);
};