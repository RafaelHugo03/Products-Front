import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Users from '../components/users'
import NavBar from '../components/navbar';
import Products from '../components/products';

export default function Router()
{
    return(
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route exact path="/" Component={Users} />
                <Route exact path="/products" Component={Products} />
            </Routes>
        </BrowserRouter>
    );
}