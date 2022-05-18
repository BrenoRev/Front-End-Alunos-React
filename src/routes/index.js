import { Routes, Route } from 'react-router-dom';
 
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import Register from '../pages/Register';
import Fotos from '../pages/Fotos';
import PrivateRoute from './PrivateRoute';
 
export default function Routers() {
  return (
    <Routes>

      <Route exact path="/login/" element={<Login />} />
      <Route exact path="/register/" element={<Register />} />
      <Route exact path="/" element={<Alunos/>} />
      <Route path="*" element={<Page404 />} />

      <Route exact path="/" element={<PrivateRoute />}>
        <Route exact path="/aluno/:id/edit" element={<Aluno />} />
        <Route exact path="/aluno/" element={<Aluno />} />
        <Route exact path="/fotos/:id" element={<Fotos />} />
      </Route>



    </Routes>
  );
}