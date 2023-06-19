import {Button} from 'antd'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import ProtectedPage from './components/ProtectedPage'
import Register from './pages/Register';
function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path="/" element = {<ProtectedPage><Home/></ProtectedPage>} />
        <Route path="/login" element = {<Login/>} />
        <Route path="/register" element = {<Register/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
