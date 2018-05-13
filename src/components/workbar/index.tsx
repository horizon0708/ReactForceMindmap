import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../state/index";
import { navigateTo } from "gatsby-link";
import { ActionCreators } from "redux-undo";
import {
  actionClearAll,
  actionAddTagParent,
  actionUpdateCurrentTag,
  actionUIChange
} from "../../state/graph/actions";
import { UIState } from "../../state/graph/reducer";
import { actionGenerateMindMap } from "../../state/graphUI/actions";
import ReactModal from "../modal";
import LoadModal from '../loadModal';

class Workbar extends React.Component<any, any> {
  undo = () => {
    this.props.dispatch(ActionCreators.undo());
  };

  redo = () => {
    this.props.dispatch(ActionCreators.redo());
  };

  clearAll = () => {
    this.props.dispatch(actionClearAll({}));
  };

  addNewParentTag = () => {
    this.props.dispatch(actionAddTagParent({ name: "New Tag" }));
  };

  renderStopAddTag = () => {
    const { UIstate, currentTag } = this.props.graphUI;
    if (UIstate === UIState.TagAdd) {
      return (
        <a
          onClick={this.onStopAddTag}
          className="button is-info is-outlined mr-half"
        >
          Stop tagging nodes
        </a>
      );
    }
    return null;
  };

  onStopAddTag = () => {
    this.props.dispatch(actionUpdateCurrentTag({ name: null }));
    this.props.dispatch(actionUIChange({ UIstate: UIState.Normal }));
  };

  onMindMapGenerate = () => {
    this.props.dispatch(actionGenerateMindMap({ data: this.props.graph.present }));
    navigateTo("/");
  };

  render() {
    return (
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="is-marginless"
      >
        <div>
          <a onClick={this.undo} className="button is-info is-outlined mr-half">
            Undo
          </a>
          <a onClick={this.redo} className="button is-info is-outlined mr-half">
            Redo
          </a>
          <a
            onClick={this.clearAll}
            className="button is-info is-outlined mr-half"
          >
            Clear All
          </a>
          <a
            onClick={this.addNewParentTag}
            className="button is-info is-outlined mr-half"
          >
            Add a new tag
          </a>
          {this.renderStopAddTag()}
        </div>
        <div>
          <ReactModal buttonText="Export/Save" graph={this.props.graph}/>
          <LoadModal dispatch={this.props.dispatch}></LoadModal>
          <a
            onClick={this.onMindMapGenerate}
            className="button is-primary ml-half"
          >
            Generate Mind Map!
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return { graph: state.graph, graphUI: state.graphUI };
};

export default connect(mapStateToProps)(Workbar);
