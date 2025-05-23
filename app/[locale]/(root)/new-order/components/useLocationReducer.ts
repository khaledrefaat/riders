import { useReducer } from "react";
import {
  GovernorateType,
  AreaType,
  BlockType,
  StreetType,
} from "@/types/locationTypes";
import {
  UPDATE_AREAS,
  UPDATE_BLOCKS,
  UPDATE_STREETS,
  RESET_ALL,
} from "@/constants/location";

interface LocationState {
  governorate: GovernorateType | null;
  areas: AreaType[];
  blocks: BlockType[];
  streets: StreetType[];
}

// Action types
type Action =
  | { type: "UPDATE_AREAS"; payload: AreaType[] }
  | { type: "UPDATE_BLOCKS"; payload: BlockType[] }
  | { type: "UPDATE_STREETS"; payload: StreetType[] }
  | { type: "RESET_ALL" };

// Initial state
const initialState: LocationState = {
  governorate: null,
  areas: [],
  blocks: [],
  streets: [],
};

// Reducer function
const locationReducer = (
  state: LocationState,
  action: Action
): LocationState => {
  switch (action.type) {
    case UPDATE_AREAS:
      return {
        ...state,
        areas: action.payload,
      };
    case UPDATE_BLOCKS:
      return {
        ...state,
        blocks: action.payload,
      };
    case UPDATE_STREETS:
      return {
        ...state,
        streets: action.payload,
      };
    case RESET_ALL:
      return initialState;
    default:
      return state;
  }
};

// useReducer hook export
export const useLocationReducer = () => {
  const [state, dispatch] = useReducer(locationReducer, initialState);

  return {
    state,
    dispatch,
  };
};
