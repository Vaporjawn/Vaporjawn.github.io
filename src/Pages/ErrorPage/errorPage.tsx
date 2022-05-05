import React from 'react';
import './errorPage.css';


// NEED TO ADD AN AUTOMATIC REDIRECT TO THE HOMEPAGE AFTER 7 SECONDS
function ErrorPage() {
  return (
    <div className='errorContainer'>
      <h1 className='errorh1'>404 ERROR</h1>

      <img src="https://media0.giphy.com/media/12BQY6Nj4ZDAFG/giphy.gif" alt="Crying Pikachu"/>

      <p><strong> Page not found :(</strong></p>

      <p>The page that you are looking for could not be found.</p>
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-48129201-1"/>
    </div>
  );
}

export default ErrorPage;
