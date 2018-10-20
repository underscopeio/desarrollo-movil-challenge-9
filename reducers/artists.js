// Action types
export const ADD_ARTISTS_TYPE = 'ADD_ARTISTS'
export const SET_AS_FAVORITE_TYPE = 'SET_AS_FAVORITE'

// Initial state
const initialState = {
  artistas: [],
  favoritos: {}, // objeto que tiene como key el nombre del artista y como valor si es favorito o no
}

//  Reducer
const artistsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_ARTISTS_TYPE:
      return {
        ...state,
        artistas: action.payload.artistas,
      }

    case SET_AS_FAVORITE_TYPE:
      return {
        ...state,
        favoritos: {
          ...state.favoritos,
          [action.payload.id]: !state.favoritos[action.payload.id],
        },
      }

    default:
      return state
  }
}

export default artistsReducer
