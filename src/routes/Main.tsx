import { Route, Routes } from 'react-router-dom';

import App from '@pages/App';
import Button from '@pages/Button';
import Connect from '@pages/Connect';
import NoMatch from '@pages/404';
import PageProfile from '@pages/Profile';
import Properties from '@pages/Properties';
import ReadPrint from '@pages/ReadPrint';
import PageArray from '@pages/Array';
import PageHttpGet from '@pages/HttpGet';
import PageState from '@pages/State';
import PageRecoil from '@pages/Recoil';

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/button" element={<Button />}></Route>
      <Route path="/connect" element={<Connect />}></Route>
      <Route path="/profile" element={<PageProfile />}></Route>
      <Route path='/props' element={<Properties />}></Route>
      <Route path='/readprint' element={<ReadPrint />}></Route>
      <Route path='/array' element={<PageArray />}></Route>
      <Route path='/http-get' element={<PageHttpGet />}></Route>
      <Route path='/state' element={<PageState />}></Route>
      <Route path='/recoil' element={<PageRecoil />}></Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
