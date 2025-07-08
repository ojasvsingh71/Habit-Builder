import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AddHabit from './pages/AddHabit';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import HabitList from './components/HabitList';
import HabitDetails from './components/HabitDetails';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/habits" element={<ProtectedRoute><HabitList /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/habits/addHabit" element={<ProtectedRoute><AddHabit /></ProtectedRoute>} />
                <Route path="/habits/:id" element={<ProtectedRoute><HabitDetails /></ProtectedRoute>} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    );
};

export default App;
