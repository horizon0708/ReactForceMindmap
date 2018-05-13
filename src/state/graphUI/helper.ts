import { Relation } from '../../components/customData/index';
import { getOriginId } from '../graph/helper';
import { GraphState } from '../graph/reducer';


export function generateTagColorMap(tagRelation: Relation[], tagColorRange: string[]){
  let counter = 0;
  let output:any = {};
  for (let index = 0; index < tagRelation.length; index++) {
    if(counter > tagColorRange.length -1){
      counter = 0;
    }
    output[tagRelation[index].parent] = tagColorRange[counter];
    counter++;
  }
  return output;
}

// search for tag color, if it doesnt exist, return a default color.
export function getTagColor(colors: any, name: string, defaultColor:string = "#6da5ff") {
  if(colors.hasOwnProperty(name)){
    return colors[name];
  }
  return defaultColor;
}
//https://stackoverflow.com/a/13542669
export function shadeColor(color: string, percent: number) {   
  var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
  return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

export function darker(color: string) {
  return shadeColor(color, -0.1);
}

export function generateMindMapData(graphState: GraphState){
  const { categories, tags, skills, title } = graphState;
    const filteredCategories = categories.filter(
      category => category.children.length > 0
    );
    const filteredTags = tags.filter(tag => tag.children.length > 0);
    return {
      categories: filteredCategories,
      tags: filteredTags,
      skills,
      title,
      origin: getOriginId(categories)
    };
}