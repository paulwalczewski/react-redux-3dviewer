import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


class StarterKitPage extends Component {
  render() {
    return (
      <div>
        <h1 className='page-title'>Example as an React + Redux boilerplate</h1>
        <article className='page-article'>
        	<h3>Basic info:</h3>
        	<p>This example app may be used as a React + Redux starter kit for other apps. It&apos;s small, yet consist modern app essentials:</p>
        	<ul>
        		<li><a target='_blank' href='https://webpack.github.io/'>Webpack</a> module builder</li>
        		<li>React + <a href='http://rackt.org/redux/index.html' target='_blank'>Redux</a></li>
        		<li>Redux <a href='https://github.com/gaearon/redux-devtools' target='_blank'>Devtools</a> (press ctrl + H to toggle devtools panel, ctrl + Q to change its position)</li>
        		<li>React router</li>
        		<li>Written in <a href='https://babeljs.io/docs/learn-es2015/'>es6</a>, with <a href='https://babeljs.io/'>babeljs</a> compiling to es5.</li>
        		<li>CSS/SCSS loader - you can import your styles directly in your components like so:<br/> <span className='code'>import './header.scss'</span></li>
        	</ul>
        	<h3>Installation of project:</h3>
        	<ol>
        		<li>get the project from repo</li>
        		<li>cd to project, then npm install</li>
        		<li>npm start for development server</li>
        	</ol>
        	<h3>Build to production:</h3>
        	<ol>
        		<li>npm run build</li>
        		<li>bundle scripts are generated and placed inside /dist folder</li>
        	</ol>
			
        </article>
      </div>
    )
  }
}

StarterKitPage.propTypes = {
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(StarterKitPage)
