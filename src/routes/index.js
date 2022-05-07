import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import NotFound from '../pages/Page404';

export default function Rotas() {
    return (
        <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
    )
}