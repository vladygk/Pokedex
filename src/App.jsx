import { BrowserRouter, Routes, Route } from "react-router-dom";
import {

  QueryClient,
  QueryClientProvider,
} from "react-query";
import Details from "./components/Details";

import Main from "./components/Main.jsx";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            
            <Route path="/" element={<Main />} />
            <Route path="details" element={<Details />} />
            
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
