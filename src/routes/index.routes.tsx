import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicRtoutes } from './index';
import ScrollToTop from './ScrollToTop';
import { PATHS } from 'configs';

const LazyHomePage = React.lazy(() => import("pages/Home/Home.page"));
const LazyAboutUsPage = React.lazy(() => import("pages/AboutUs/About-Us.page"));
const LazyNotFoundPage = React.lazy(() => import("pages/NotFound/Not-Found.page"));

export const AppRouting = () => {
  return(
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicRtoutes/>}>
          <Route path={PATHS.HOME} element={<LazyHomePage/>} />
          <Route path={PATHS.ABOUT_US} element={<LazyAboutUsPage/>} />
          <Route path={PATHS.PAGE404} element={<LazyNotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}