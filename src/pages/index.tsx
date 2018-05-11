import * as React from "react";
import Link from "gatsby-link";
import MindMap from "../mindMap/canvasMindMap";
// import * as MindMap from "force-mindmap";
import { nameAndSkills, langRelations, langTags } from '../mindMap/sampleData';
import * as jsonh from "../../node_modules/json-url/dist/browser/json-url";
import "json-url/dist/browser/json-url-msgpack";
import "json-url/dist/browser/json-url-lzw";
import "json-url/dist/browser/json-url-lzma";
import "json-url/dist/browser/json-url-lzstring";
import "json-url/dist/browser/json-url-safe64";
import { getUrlParamByName } from "../utilities/urlParamHelper";
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

export default class extends React.Component<any, any> {
  constructor(props: IndexPageProps, context: any) {
    super(props, context);
    this.state = {
      mindMap: null
    };
  }

  componentDidMount() {
    if (this.props.location.search) {
      console.log("from url!");
      const param = getUrlParamByName("data", this.props.location.search);
      const encoder = jsonh("lzma");
      encoder.decompress(param).then(json => {
        console.log(json);
        this.setState(
          {
            mindMap: new MindMap(
              "#d3forcegraph",
              json.skills,
              json.categories,
              json.origin,
              json.tags
            )
          },

          () => {
            this.state.mindMap.startGraph();
          }
        );
      });
    } else {
      this.setState(
        {
          mindMap: new MindMap(
            "#d3forcegraph",
            nameAndSkills,
            langRelations,
            "Web Dev",
            langTags
          )
        },

        () => {
          this.state.mindMap.startGraph();
        }
      );
    }
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
          onClick={
            this.state.mindMap ? this.state.mindMap.gotoParentNode : null
          }
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
