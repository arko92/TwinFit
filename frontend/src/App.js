import React from "react";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';

import Layout from './hocs/Layout';
import Register from './containers/Register';
import Home from './containers/Home';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import Navbar from './components/Navbar';
import PrivateRoute from "./hocs/PrivateRoute";

import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
    return (
        <Provider store={store}> {/* Wraps the entire application with the Redux store provider */}
            <Router>
                <Layout> {/* Layout to wrap up different pages */}
                    <Navbar/> {/* Navbar to be displayed on all pages */}
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/dashboard" 
                        element={<PrivateRoute element={Dashboard} />} 
                        />
                    </Routes>
                </Layout>
            </Router>
        </Provider>
    )
}

export default App;