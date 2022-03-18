import { StyleSheet, View } from "react-native";
import TourNavigator from "./navigation/TourNavigator";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import PlacesReducer from "./store/PlacesReducer";
import { init } from "./utils/db";

//initiale the databse:
init()
  .then(() => {
    console.log("Database initialized");
  })
  .catch((err) => {
    console.log("initializing the database failed");
  });
const rootReducer = combineReducers({
  places: PlacesReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <TourNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
