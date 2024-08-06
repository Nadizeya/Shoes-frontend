import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "@/store";

/*
- Use throughout the app instead of plain `useDispatch` and `useSelector`
- Use this hook cux of Type Safety & Type Inference:
- It uses the types defined in Redux store (RootState) to provide automatic 
  type inference, making it safer and more convenient to use. 
*/
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
