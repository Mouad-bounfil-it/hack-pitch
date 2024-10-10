import { useMemo } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

let store;

const initialState = {
  activeMembershipId: null,
  mediaUploads: [],
};

const activeMembershipId = (state = null, action) => {
  if (action.type === "SET_ACTIVE_MEMBERSHIP_ID") {
    return action.payload.id;
  }

  return state;
};

const mediaUploads = (state = [], action) => {
  if (action.type === "ADD_MEDIA_FILES_UPLOAD") {
    const { _id, fileName } = action.payload;
    return state.concat({ _id, fileName, progress: 0 });
  } else if (action.type === "REMOVE_MEDIA_FILES_UPLOAD") {
    const { _id } = action.payload;
    return state.filter((m) => m._id !== _id);
  } else if (action.type === "UPDATE_MEDIA_FILES_UPLOAD_PROGRESS") {
    const { _id, progress } = action.payload;
    return state.map((media) => {
      if (media._id === _id)
        return {
          ...media,
          progress,
        };
      return media;
    });
  }

  return state;
};

const finalReducer = combineReducers({
  activeMembershipId,
  mediaUploads,
});

function initStore(preloadedState = initialState) {
  return createStore(
    finalReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

export function getStoreInstance() {
  return store;
}

export default function getStoreState() {
  if (typeof store?.getState === "function") {
    return store.getState();
  }

  return null;
}
