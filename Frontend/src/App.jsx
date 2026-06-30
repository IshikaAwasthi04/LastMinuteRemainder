import { BrowserRouter,Routes,Route } from "react-router-dom";
import{useEffect} from "react";
import Home from "./pages/Home";
import SchedulePage from "./pages/SchedulePage";
import { requestNotificationPermission } from "./utils/notification";

function App(){
useEffect(() => {
        requestNotificationPermission();
    }, []);
    return(

         

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Home/>}/>

                <Route  path="/schedule" element={<SchedulePage/>}/>

            </Routes>

        </BrowserRouter>

    );

}

export default App;