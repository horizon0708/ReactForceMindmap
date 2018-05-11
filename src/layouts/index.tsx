import * as React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import "font-awesome/scss/font-awesome.scss";
import '../styles/main.scss';
// import './index.css'
const Header = () => (
 <nav className="navbar">
    <div className="navbar-brand">
    </div>
    <div className="navbar-menu">
      <div className="navbar-start">
      </div>
      <div className="navbar-end">
        <a className="navbar-item">Custom Data</a>
        <a className="navbar-item">Example Graph</a>
        <a className="navbar-item">About</a>
      </div>
    </div>
  </nav>
)

interface DefaultLayoutProps extends React.HTMLProps<HTMLDivElement> {
  location: {
    pathname: string
  }
  children: any
}

class DefaultLayout extends React.PureComponent<DefaultLayoutProps, void> {
  public render() {
    return (
      <div>
        <Helmet
          title="Gatsby Default Starter"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Header />
        <div style={{width: `100%`}}>
          <div className="container">
          {this.props.children()}
          </div>
        </div>
      </div>
    )
  }
}

export default DefaultLayout
