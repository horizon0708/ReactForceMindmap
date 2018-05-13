import * as React from 'react';
import * as FA from 'react-fontawesome';

interface LegendProps {
  show: boolean;
  colorRange: string[];
}

const Legend: React.SFC<LegendProps> = ({ show, colorRange }) => {
  return show ? <div>
    <h3 className="title is-3">What do the colors mean?</h3>
    <div><FA style={{color: colorRange[0]}} name="stop" /> I've used it once</div>
    <div><FA style={{color: colorRange[1]}} name="stop"/> I've used it a couple of times</div>
    <div><FA style={{color: colorRange[2]}} name="stop"/> I've used it for multiple projects</div>
    <div><FA style={{color: colorRange[3]}} name="stop"/> I know my way around it</div>
    <div><FA style={{color: colorRange[4]}} name="stop"/> I am confident with it</div>
  </div> : null
}

const colorRange: string[] = [
  "#72dbe5",
  "#62abd6",
  "#5fa7dd",
  "#4678c4",
  "#284a96"
];

export default Legend;