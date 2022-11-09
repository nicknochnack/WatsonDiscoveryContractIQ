import { Provider } from "react-redux";
import store from "./store";
import Query from "./components/layout/query";
import { ChakraProvider, Container, Heading } from "@chakra-ui/react";

const App = () => {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Query />
      </Provider>
    </ChakraProvider>
  );
};

export default App;
