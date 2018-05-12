import * as React from "react";
import Link from "gatsby-link";
// import MindMap from "../mindMap/canvasMindMap";

import * as MindMap from "force-mindmap";
import { nameAndSkills, langRelations, langTags } from "../mindMap/sampleData";
//@ts-ignore
import * as jsonh from "../../node_modules/json-url/dist/browser/json-url";
import "json-url/dist/browser/json-url-msgpack";
import "json-url/dist/browser/json-url-lzw";
import "json-url/dist/browser/json-url-lzma";
import "json-url/dist/browser/json-url-lzstring";
import "json-url/dist/browser/json-url-safe64";
import { getUrlParamByName } from "../utilities/urlParamHelper";
import { connect } from "react-redux";
import { ApplicationState } from "../state/index";
import { ReduxProps } from '../state/types';
interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
}

type AllProps = IndexPageProps & ApplicationState & ReduxProps;

class IndexPage extends React.Component<any, any> {
  constructor(props: IndexPageProps, context: any) {
    super(props, context);
    this.state = {
      mindMap: null,
    };
  }

  componentDidMount() {
    const { mindMap } = this.props.graphUI;
    if (this.props.location.search) {
      const param = getUrlParamByName("example", this.props.location.search);
      if (param) {
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
    } else if (mindMap) {
      const { origin, categories, tags, skills } = mindMap;
      this.setState(
        {
          mindMap: new MindMap(
            "#d3forcegraph",
            skills,
            categories,
            origin,
            tags
          )
        },
        () => {
          this.state.mindMap.startGraph();
        }
      );
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
        <div style={{display: "flex", justifyContent:"space-between"}}className="container">
          <a
            className="button is-primary"
            onClick={
              this.state.mindMap ? this.state.mindMap.gotoParentNode : null
            }
          >
            Go up one level
          </a>
          <div>

          </div>
        </div>
        <canvas id="d3forcegraph" width="1000" height="600" />
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return { graphUI: state.graphUI };
};
// not sure why ts is throwing errors here but in other components...
export default connect(mapStateToProps)(IndexPage);

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
