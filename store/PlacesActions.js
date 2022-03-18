import * as FileSystem from "expo-file-system";
import { inserPlace, fetchPlaces } from "../utils/db";
export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, selectedImage) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult = await inserPlace(
        title,
        newPath,
        "1477 snapdragon",
        15.6,
        12.3
      );
      dispatch({
        type: ADD_PLACE,
        payload: { id: dbResult.insertId, title, selectedImage: newPath },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchPlaces();
      dispatch({
        type: SET_PLACES,
        places: dbResult ? dbResult.rows._array : [],
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
