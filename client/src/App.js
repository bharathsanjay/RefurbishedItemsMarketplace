import {Button} from 'antd'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedPage from './components/ProtectedPage'
import Register from './pages/Register';
import Spinner from "./components/Spinner";
import {useSelector} from "react-redux";
import Profile from "./pages/profile";
import Admin from "./pages/Admin";
import ProductInfo from './pages/ProductInfo';
import SearchInfo from './pages/SearchInfo';
import AnonymousHome from "./components/AnonymousHome";
import ProductInfoay from "./components/ProductInfoay";

function App() {
    const {loading} = useSelector(state => state.loaders);
    return (
        <div>
            {loading && <Spinner/>}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProtectedPage><Home/></ProtectedPage>}/>
                    <Route path="/product/:id" element={<ProtectedPage><ProductInfo/></ProtectedPage>}/>
                    <Route path="/product-ay/:id" element={<ProductInfoay/>}/>
                    <Route path="/search/category/:category/details/:id" element={<ProtectedPage><SearchInfo/></ProtectedPage>}/>
                    <Route path="/profile" element={<ProtectedPage><Profile/></ProtectedPage>}/>
                    <Route path="/admin" element={<ProtectedPage><Admin/></ProtectedPage>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/anymHome" element={<AnonymousHome/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
