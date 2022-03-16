import { ADD_PLACE } from "./PlacesActions";
import Place from "../models/place";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (key) {
    case ADD_PLACE:
      const newPlace = new Place(new Date().toString(), action.payload.title);
      return {
        places: state.places.concat(newPlace),
      };

    default:
      return state;
  }
};
