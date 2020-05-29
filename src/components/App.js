import React from 'react';
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import Header from './common/Header';
import NotFoundPage from './NotFoundPage';
import CoursesPage from './courses/CoursesPage'
import ManageCoursePage from './courses/ManageCoursePage'; //eslint-disable-line import/no-named-as-default
import AuthorsPage from './authors/AuthorsPage';
import ManageAuthorPage from './authors/ManageAuthorPage';

const App = () => {

    return (
      <div className="container-fluid">
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/about" component={AboutPage}/>
            <Route path="/courses" component={CoursesPage}/>
            <Route path="/authors" component={AuthorsPage}/>
            <Route path="/author/:slug" component={ManageAuthorPage}/>
            <Route path="/author" component={ManageAuthorPage}/>
            <Route path="/course/:slug" component={ManageCoursePage}/>
            <Route path="/course/" component={ManageCoursePage}/>
            <Route component={NotFoundPage} />
          </Switch>

          <ToastContainer autoClose={3000} hideProgressBar />
      </div>  
    );

};

export default App;