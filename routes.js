import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import UserPage from './containers/UserPage'
import RepoPage from './containers/RepoPage'
import AboutPage from './containers/AboutPage'
import RenderPage from './containers/RenderPage'
export default (
  <Route path="/" component={App}>
  	<IndexRoute component={RenderPage}/>
  	<Route path="/about"
           component={AboutPage} />
    <Route path="/:login/:name"
           component={RepoPage} />
    <Route path="/:login"
           component={UserPage} />
  </Route>
)
