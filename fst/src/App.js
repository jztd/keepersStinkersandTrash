import { Provider } from '@reduxjs/toolkit';
import store from './core/store.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProvideAuth } from './components/use-auth.js';
import Layout from './containers/Layout.js';
import { LoginForm } from './components/Login.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import './App.css';

function App() {
    return (
        <ProvideAuth>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route path='test' element={<div style={{marginTop:"200px"}}> nest </div>} />
                        <Route path='login' element={<LoginForm />} />
                        <Route path='superSecretPath' element={<ProtectedRoute> <div style={{ marginTop: "200px" }}> SEECRET </div> </ProtectedRoute>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ProvideAuth>
  );
}

export default App;
