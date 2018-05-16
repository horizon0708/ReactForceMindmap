import * as React from "react";
import Link from "gatsby-link";
// import MindMap from "../mindMap/canvasMindMap";
import ColorLegend from "../components/colorLegend";
import MindMap from "force-mindmap";
import { nameAndSkills, langRelations, langTags } from "../mindMap/sampleData";
//@ts-ignore
import axios from "axios";
import { getUrlParamByName } from "../utilities/urlParamHelper";
import { connect } from "react-redux";
import { ApplicationState } from "../state/index";
import { ReduxProps } from "../state/types";
import { generateMindMapData } from "../state/graphUI/helper";
import { actionImportData } from "../state/graph/actions";
import { GraphState } from "../state/graph/reducer";
import SaveModal from '../components/modal';
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
const apiUrl = "http://159.89.132.99:4000/";

class IndexPage extends React.Component<any, any> {
  constructor(props: IndexPageProps, context: any) {
    super(props, context);
    this.state = {
      data: null,
      mindMap: null,
      example: false,
      error: null,
      client: false,
    };
  }

  startExample = () => {
    this.setState({client: true});
    this.setState(
      {
        mindMap: new MindMap(
          "#d3forcegraph",
          nameAndSkills,
          langRelations,
          "Web Dev",
          langTags
        ),
        example: true
      },
      () => {
        this.state.mindMap.startGraph();
      }
    );
  };

  startLoaded = (data: GraphState) => {
    const { origin, categories, tags, skills } = generateMindMapData(data);
    this.setState({data})
    this.setState(
      {
        mindMap: new MindMap("#d3forcegraph", skills, categories, origin, tags),
        example: false
      },
      () => {this.state.mindMap.startGraph()
       }
    );
  };

  componentDidMount() {
    const { generated } = this.props.graphUI;
    this.setState({client: true})
    if (this.props.location.search) {
      const param = getUrlParamByName("example", this.props.location.search);
      const id = getUrlParamByName("id", this.props.location.search);
      if (param) {
        this.startExample();
      } else if (id) {
        axios.get(apiUrl + `?url=${id}`).then(res => {
          if (res.status === 200) {
            const data = JSON.parse(res.data.data);
            this.props.dispatch(actionImportData({ data }));
            this.startLoaded(data);
          } else if(res.status === 400) {
            this.startExample();
            this.setState({error: "the mindmap was not found, check your url!"});
          } else {
            this.setState({error: "The server is boom. Try again later."})
          }
        });
      }
    } else if (generated) {
      this.startLoaded(this.props.graph.present);
      
    } else {
      this.startExample();
    }
  }

  public renderShareButton() {
    const { client, example} = this.state;
    if(client && !example){
      return <SaveModal buttonText="Share" graph={this.props.graph} />
    }
    return null;
  }

  public render() {
    const { data } = this.state;
    return (
      <div style={{ marginTop: "1rem" }}>
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="container"
        >
          <h3 className="title is-2">
            {data ? data.title : "My web dev skills"}
          </h3>
          
        </div>
        <div style={{marginTop: '1rem'}}>
        <a
            className="button is-primary mr-1"
            onClick={
              this.state.mindMap ? this.state.mindMap.gotoParentNode : null
            }
          >
            Go up one level
          </a>
          
          {this.renderShareButton()}
        </div>
        <canvas id="d3forcegraph" width="1000" height="600" />
        <ColorLegend show={this.state.example} colorRange={colorRange} />
      </div>
    );
  }
}
const colorRange: string[] = [
  "#72dbe5",
  "#62abd6",
  "#5fa7dd",
  "#4678c4",
  "#284a96"
];

const mapStateToProps = (state: ApplicationState) => {
  return { graph: state.graph, graphUI: state.graphUI };
};
// not sure why ts is throwing errors here but in other components...
// @ts-ignore
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
