import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import StarterKitPage from './containers/StarterKitPage'
import ExamplePage_3dModel from './containers/ExamplePage_3dModel'
import ExamplePage_images from './containers/ExamplePage_images'
export default (
  <Route path="/" component={App}>
  	<IndexRoute component={ExamplePage_3dModel}/>
  	<Route path="/example-images-as-source"
           component={ExamplePage_images} />
  	<Route path="/StarterKitPage"
           component={StarterKitPage} />
  </Route>
)
