import { Route, Routes } from 'react-router-dom';

import App from '@pages/App';
import Button from '@pages/Button';
import Connect from '@pages/Connect';
import NoMatch from '@pages/404';
import PageProfile from '@pages/Profile';
import Properties from '@pages/Properties';

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/button" element={<Button />}></Route>
      <Route path="/connect" element={<Connect />}></Route>
      <Route path="/profile" element={<PageProfile />}></Route>
      <Route path='/props' element={<Properties />}></Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
