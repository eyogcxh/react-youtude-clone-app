import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { TypedUseSelectorHook } from "react-redux"
import { AppDispatch, RootState } from "./index"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector