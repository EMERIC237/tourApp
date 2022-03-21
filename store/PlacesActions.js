import * as FileSystem from "expo-file-system";
import { inserPlace, fetchPlaces } from "../utils/db";
import ENV from "../env";
export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image, location) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.json();
    if (!resData.results) {
      throw new Error("Something went wrong");
    }
    const address = resData.results[0].formatted_address;

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
        address,
        location.lat,
        location.lng
      );
      dispatch({
        type: ADD_PLACE,
        payload: {
          id: dbResult.insertId,
          title,
          selectedImage: newPath,
          address: address,
          coords: { lat: location, lng: location.lng },
        },
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
