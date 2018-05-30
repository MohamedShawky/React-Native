
import { SET_PLACES, REMOVE_PLACE } from '../actions/ActionType';

const initialState = {
  places: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        ...state,
        places: action.places
      };
      
    case REMOVE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.key;
        })
      };
    default:
      return state;
  }
};

export default reducer;

// import {ADD_PLACE, DELET_PLACE} from '../actions/ActionType';
// const intialStat = {
//     places: [],
    
// }
// const reducer = (state = intialStat, actoin)=>{

//     switch (actoin.type) {
//         case ADD_PLACE:
//             return{
//                 ...state,
//                 places: state.places.concat({
//                     key: Math.random(),
//                     name: actoin.placeName,
//                     location :actoin.location,
//                     image: {
//                       uri: actoin.image.uri
//                     }
//                   })
//             };

//             case DELET_PLACE:
//                 return{
//                     ...state,
//                         places: state.places.filter(place => {
//                           return place.key !== actoin.placeKey;
//                         }),
                 

//                 }
            
            
    
//         default:
//             return state;
//     }

// }

// export default reducer;