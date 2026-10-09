import { Routes, Route } from 'react-router';
import { PrivateWrapper } from '../../helpers/index';
import { Login } from '../Login/Login';
import MainLayout from '../MainLayout/MainLayout';

function App() {
  return (
    <Routes>
      <Route element={<PrivateWrapper />}>
        <Route path="*" element={<MainLayout />} />
      </Route>

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
