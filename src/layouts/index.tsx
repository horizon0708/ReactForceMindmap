import * as React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import "font-awesome/scss/font-awesome.scss";
import '../styles/main.scss';
// import './index.css'
const Header = () => (
  <nav className="container">
    <div className="brand">
    </div>
    <div className="navbar-menu is-active">
      <div className="navbar-start">
      </div>
      <div className="navbar-end">
        <Link to="/create-your-own"><a className="navbar-item">Create your own</a></Link>
        <Link to="/"><a className="navbar-item">Example Mindmap</a></Link>
        <Link to="about"><a className="navbar-item">About</a></Link>
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
