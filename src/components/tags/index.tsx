import * as React from 'react';
import { ReduxProps } from '../../state/types';
import { GraphState, UIState } from '../../state/graph/reducer';
import { connect } from 'react-redux';
import { ApplicationState } from '../../state/index';
import { Relation } from '../customData/index';
import TagItem from './tagItem';
import { TagGroupProps } from './tagGroup';
import TagGroup from './tagGroup';
import { actionUpdateTagParent, actionAddTagParent, actionDeleteTagParent, actionAddTagChild, actionDeleteTagChild, actionUpdateCurrentTag, actionUIChange, actionCurrentEdit } from '../../state/graph/actions';
import * as FA from 'react-fontawesome';
import { getTagColor } from '../../state/graphUI/helper';

interface Props {
  graph: GraphState
}

type AllProps = Props & ApplicationState & ReduxProps

class TagComponent extends React.Component<AllProps, any> {
  constructor(props: any, context: any) {
    super(props, context);
   }

   onParentEdit= (name:string, newName:string) => {
     console.log("hllo?")
    this.props.dispatch(actionUpdateTagParent({name, newName}))
   }

   onParentAdd = (name:string) => (e:any)=> {
    this.props.dispatch(actionAddTagParent({name}));
   }

   onParentDelete = (name:string) => (e:any)=> {
    this.props.dispatch(actionDeleteTagParent({name}))
   }

   onParentEditStart =(name:string) => (e:any) => {
     this.props.dispatch(actionUpdateCurrentTag({name}))
   }

   onChildAdd = (parentName: string) => (e:any)=> {
    this.props.dispatch(actionUIChange({UIstate: UIState.TagAdd}));
    this.props.dispatch(actionUpdateCurrentTag({name: parentName}));
   }

   onChildAddEnd = () => (e:any)=> {
    this.props.dispatch(actionUpdateCurrentTag({name: null}));
    this.props.dispatch(actionUIChange({UIstate: UIState.Normal}));
   }

   onChildDelete = (parentName: string, name: string) => (e:any) => {
    this.props.dispatch(actionDeleteTagChild({parentName, name}));
   }

   renderTags = () => {
      const { tags  } = this.props.graph;
      const { currentTag, UIstate, tagColorMap }= this.props.graphUI;
      const { onParentDelete, onParentEdit, onParentEditStart, onChildAdd, onChildAddEnd, onChildDelete} = this;

      return tags.map((tag,i) => {
      const tagProps: TagGroupProps & {key: string}= {
        tag,
        onParentDelete,
        onParentEdit,
        onParentEditStart,
        onChildAdd,
        onChildAddEnd,
        onChildDelete,
        currentTag,
        UIstate,
        color: getTagColor(tagColorMap, tag.parent),
        key: tag+'_'+i
      }

        return <TagGroup {...tagProps} />
      })
   }

   render(){
     return(
       <div>
         {this.renderTags()}
         <a style={{fontSize: '1.2rem'}} onClick={this.onParentAdd("New Tag")}><FA name="plus"></FA>Add A New Tag</a>
       </div>
     )
   }
}

const mapStateToProps = (state: ApplicationState) => {
  return { graph: state.graph.present, graphUI: state.graphUI}
}

export default connect(mapStateToProps)(TagComponent);
