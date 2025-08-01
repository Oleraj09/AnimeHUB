import React from "react";
import { RouterProvider} from "react-router-dom";
import PublicRouter from "./routes/PublicRouter";
const App = () =>{
  return(
    <RouterProvider router={PublicRouter}></RouterProvider>
  )
}
export default App;