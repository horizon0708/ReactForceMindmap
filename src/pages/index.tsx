import * as React from "react";
import Link from "gatsby-link";
import MindMap from "../mindMap/canvasMindMap";
import { nameAndSkills, langRelations } from "../mindMap/sampleData";
// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
}

export default class extends React.Component<IndexPageProps, any> {
  constructor(props: IndexPageProps, context: any) {
    super(props, context);
    this.state = {
      mindMap: null
    };
  }

  componentDidMount() {
    this.setState(
      { mindMap: new MindMap("#d3forcegraph", nameAndSkills, langRelations) },
      () => {
        this.state.mindMap.startGraph();
      }
    );
  }

  public render() {
    return (
      <div>
        <h1>Hi people</h1>
        <p>
          Welcome to your new{" "}
          <strong>{this.props.data.site.siteMetadata.title}</strong> site.
        </p>

        <p>Now go build something great.</p>
        <button
          onClick={this.state.mindMap ? this.state.mindMap.gotoParentNode : null}

        >
          {" "}
          back{" "}
        </button>
        <canvas id="d3forcegraph" width="1000" height="600" />
        <Link to="/page-2/">Go to page 2</Link>
      </div>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
