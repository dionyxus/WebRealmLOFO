'use strict';

//setting up the Router with pages
Router.init('mainArea', [
  new Page('#homepage', '../src/pages/homepage.html'), // 1st Page is default if no URL match
  new Page('#useracc', '../src/pages/useracc.html'),
  new Page('#addpost', '../src/pages/addpost.html'),
  new Page('#chat', '../src/pages/chat.html'),
  new Page('#viewpost', '../src/pages/viewpost.html')
  // add new pages here
]);



