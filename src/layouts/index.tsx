import * as React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import "font-awesome/scss/font-awesome.scss";
import '../styles/main.scss';
// import './index.css'
const Header = () => (
  <nav style={{display: 'flex', justifyContent:"space-between" }}className="container">
    <div>
      <Link style={{fontWeight: 800, fontSize: '1.2rem', color: '#007acc'}} className="navbar-item" to="/">Force Mindmap</Link>
    </div>
    <div style={{display: 'flex'}}>
        <Link className="navbar-item" to="/create-your-own">Create your own</Link>
        <Link className="navbar-item" to="/">Example Graph</Link>
        <Link className="navbar-item" to="about">About</Link>
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
