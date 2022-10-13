import { createContext, useReducer } from "react";
import { ADD_ALBUM } from "../constants";
import initialAlbumData from "../data/albums";

const initialState = {
    albums: initialAlbumData
}

const AlbumReducer = (state, action) => {
    switch (action.type) {
        case ADD_ALBUM:
            return {
                ...state,
                albums: [...state.albums, action.payload]
            }
            break;
        default: return state
    }
}

export const AlbumContext = createContext(initialState)

export const AlbumProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AlbumReducer, initialState)

    const addAlbum = (album) => {
        dispatch({ type: ADD_ALBUM, payload: album })
    }

    return <AlbumContext.Provider value={{ albums: state.albums, addAlbum }}>
        {children}
    </AlbumContext.Provider>
}
