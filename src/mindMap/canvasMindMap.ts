// https://medium.freecodecamp.org/d3-and-canvas-in-3-steps-8505c8b27444
import {
  Relation,
  attachIdAndSkill,
  recursiveLeveling,
  toForceLink,
  getNodeFilter,
  filterRelations,
  filterNodes,
  getParent,
  isParent,
  AnimationTimer,
  attachAnimationAttributes,
  getCurrentLevel,
  ForceNode,
  ForceLink,
  getFontSizeToLevel,
  minCap,
  addTransparency,
  getTextColor,
  restrainToRange
} from "./mindMapHelper";

import * as d3 from "d3";

export default class CanvasForceMap {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private simulation: any;

  private linkElements: any;
  private nodeElements: any;
  private nodes: ForceNode[];
  private links: ForceLink[];
  private relations: Relation[];
  private originalLinks: ForceLink[];
  private originalNodes: ForceNode[];
  private animationTimer: AnimationTimer;
  private globalAnimationStatus: number = 0;
  private currentNode: string = "Web Dev";
  private currentLevel: number = 0;

  // public settings
  public animationDuration: number = 100;
  public linkColor: string = `#9095a0`;
  public linkWidth: number = 2;
  public textColorRange: string[] = [
    "#72dbe5",
    "#62abd6",
    "#5fa7dd",
    "#4678c4",
    "#284a96"
  ];
  public strokeColor: string = "#FFF";
  public textStrokeWidth: number = 5;
  public textAlign: string = "center";

  public fontSizeRange: number[] = [60, 35, 20];
  public fontFamily: string = "Open Sans";
  public fontWeight:
    | "bolder"
    | "normal"
    | "bold"
    | "lighter"
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900 = "bolder";

  constructor(selector: string, nameAndSkills: any[], relations: Relation[], tags: Relation[]) {
    this.initialSetup(selector, nameAndSkills, relations, tags);
  }

  initialDataToNodesAndLinks(
    namesAndSkills: any[],
    relations: Relation[]
  ): { nodes: ForceNode[]; links: ForceLink[] } {
    const nodes = attachIdAndSkill(namesAndSkills);
    recursiveLeveling("Web Dev", relations, nodes, 0);
    return {
      nodes,
      links: toForceLink(relations)
    };
  }

  private initialSetup = (
    selector: string,
    nameAndSkills: any[],
    relations: Relation[],
    tags: Relation,
  ) => {
    this.relations = relations;
    const nodeAndLinks = this.initialDataToNodesAndLinks(
      nameAndSkills,
      relations
    );
    if(tags){

    }
    this.links = nodeAndLinks.links;
    this.originalLinks = [...this.links];
    this.nodes = nodeAndLinks.nodes;
    this.originalNodes = [...this.nodes];
    this.animationTimer = new AnimationTimer(this.animationDuration);
    this.animationTimer.on("timer", d => {
      this.globalAnimationStatus = d
    });

    this.canvas = document.querySelector(selector);
    this.context = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  };

  public startGraph = () => {
    const { nodes, links } = this.filterNodesAndLinks(this.currentNode);
    this.simulation = d3
      .forceSimulation()
      .nodes(nodes, d => d.id)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: ForceNode) => d.id)
          .distance(this.animationDuration)
      )
      .force("collide", d3.forceCollide().radius(55))
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(this.width / 2, this.height / 2))
      .on("tick", this.ticked);

    d3.select(this.canvas).call(
      d3
        .drag()
        .container(this.canvas)
        .subject(this.dragsubject)
        .on("start", this.click)
        .on("drag", this.dragged)
        .on("end", this.dragended)
    );

    d3.select("#d3forcegraph").on("mousemove", d=>{
      // var xy = d3.mouse(this);
      // console.log(xy)

      // console.log(d)
    })

    this.update(this.currentNode);
  };

  /**
   * Main mean to update the graph.
   * Could be called after changing a varible to refresh the graph
   * To get the 'exit transition' possible, we save the deleted nodes and give them 'LEAVING' property.
   * Then, we trigger afterAnimationUpdate(), after the animation has triggered to actually take the deleted node outk
   */
  public update = (currentNodeId: string) => {
    this.animationTimer.startTimer()
    this.currentNode = currentNodeId;
    this.currentLevel = getCurrentLevel(currentNodeId, this.originalNodes);

    const { nodes, links } = this.filterNodesAndLinks(currentNodeId);

    this.nodes = attachAnimationAttributes(this.nodes, nodes);

    setTimeout(() => {
      this.afterAnimationUpdate(this.currentNode);
    }, this.animationDuration);

    this.simulation.nodes(this.nodes, d => {
      return d.id;
    });
    this.simulation.force("link").links(links, d => d.source + "-" + d.target);
    this.simulation.alpha(1).restart();
  };

  private afterAnimationUpdate = (currentNodeId: string) => {
    const { links, nodes } = this.filterNodesAndLinks(currentNodeId);
    this.nodes = nodes;
    this.links = links; 
    this.simulation.nodes(this.nodes, d => {
      return d.id;
    });
    this.simulation.force("link").links(links, d => d.source + "-" + d.target);
    this.simulation.alpha(1).restart();
  };

  /**
   * Updates the current node to the current node's parent
   * In other words, Go up the tree by on node.
   */
  public gotoParentNode = () => {
    const parent = getParent(this.currentNode, this.originalLinks);
    if (parent) {
      this.update(parent);
    }
  };

  public gotoNode = (nodeId: string) => {
    const ind = this.originalNodes.findIndex(node => node.id === nodeId);
    if(ind > -1 ){
      this.update(nodeId);
    } else {
      console.error(`gotoNode(): the node ${nodeId} does not exist!`);
    }
  }

  /**
   * This is what gets called each frame of force simulation, we use this to draw on canvas
   */
  private ticked = () => {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.beginPath();
    this.links.forEach(this.drawLink);
    this.context.strokeStyle = addTransparency(this.linkColor, 0.2);
    this.context.stroke();

    this.context.beginPath();
    this.nodes.forEach(this.drawNode);
    this.context.fill();
    this.context.lineWidth = this.linkWidth;
    this.context.strokeStyle = this.strokeColor;
    this.context.stroke();
  };

  private drawLink = d => {
    const sourcex = restrainToRange(d.source.x, 0, this.width);
    const sourcey = restrainToRange(d.source.y, 0, this.height);
    const targetX = restrainToRange(d.target.x, 0, this.width);
    const targetY = restrainToRange(d.target.y, 0, this.height);

    this.context.moveTo(sourcex, sourcey);
    this.context.lineTo(targetX, targetY);
  };

  private drawNode = (d:any) => {
    this.context.moveTo(d.x + 3, d.y);
    this.setTextContext(d);

    this.context.textAlign = this.textAlign;
    this.context.lineWidth = this.textStrokeWidth;
    this.context.strokeStyle = this.strokeColor;
    const x = restrainToRange(d.x, 0, this.width);
    const y = restrainToRange(d.y, 0, this.height);
    this.context.strokeText(d.id, x, y);
    this.context.fillText(d.id, x, y);
  };

  private setTextContext = (node: ForceNode) => {
    const fontSize = getFontSizeToLevel(node.level, this.currentLevel, this.fontSizeRange);
    this.context.fillStyle = addTransparency(getTextColor(node.skill, this.textColorRange), this.globalAnimationStatus);
    this.context.textAlign = "center";
    
    if (node.status === "ENTERING") {
      this.context.font = `${this.fontWeight} ${fontSize *
        this.globalAnimationStatus}px ${this.fontFamily}`;
    } else if (node.status === "LEAVING") {
      this.context.font = `${this.fontWeight} ${minCap(fontSize)}px ${
        this.fontFamily
      }`;
    } else {
      this.context.fillStyle = getTextColor(node.skill, this.textColorRange);
      this.context.font = `${this.fontWeight} ${fontSize}px ${this.fontFamily}`;
    }
  };

  private onMouseOver = () => {

  }

  // drag only
  private dragstarted = () => {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;
  };

  private dragged = () => {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
  };

  private dragended = () => {
    if (!d3.event.active) this.simulation.alphaTarget(0);
    d3.event.subject.fx = null;
    d3.event.subject.fy = null;
  };

  //drag and click
  private click = () => {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;

    const target = d3.event.subject.id;
    if (
      target &&
      isParent(target, this.relations) &&
      target !== this.currentNode
    ) {
      this.update(target);
    }
  };

  dragsubject = () => {
    return this.simulation.find(d3.event.x, d3.event.y);
  };



  /**
   * original nodes, links should be not be touched, but manipulated by this filter
   */
  private filterNodesAndLinks = (
    currentNodeId: string
  ): { nodes: ForceNode[]; links: ForceLink[] } => {
    const nodeFilter = getNodeFilter(this.relations, currentNodeId);
    const newRelations = filterRelations(this.relations, currentNodeId);
    return {
      nodes: filterNodes(this.originalNodes, nodeFilter),
      links: toForceLink(newRelations)
    };
  };
}
