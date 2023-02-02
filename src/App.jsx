import { BrowserRouter, Routes, Route } from "react-router-dom";
import {

  QueryClient,
  QueryClientProvider,
} from "react-query";
import Details from "./pages/Details";

import SharedLayout from "./pages/SharedLayout";
import Main from "./pages/Main.jsx";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SharedLayout/>}>
            <Route index element={<Main />} />
            <Route path="details" element={<Details />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
