import { Relation } from './mindMapHelper';
export const nameAndSkills = [
  ["Web Dev", 5],
  ["FrontEnd", 5],
  ["JavaScript", 5],
  ["TypeScript", 5],
  ["ES6", 5],
  ["React", 5],
  ["MoBX", 4],
  ["Redux", 4],
  ["Gatsby", 3],
  ["Flux", 4],
  ["D3", 4],
  ["SVG", 3],
  ["Jest", 4],
  ["Enzyme", 4],
  ["Webpack", 3],
  ["Gulp", 1],
  ["HTML5", 5],
  ["CSS", 5],
  ["SCSS", 5],
  ["Bootstrap", 5],
  ["Bulma", 5],
  ["BackEnd", 3],
  ["Glamorous", 1],
  ["Mocha", 3],
  ["Chai", 2],
  ["Jasmine", 3],
  ["Styled-Components", 3],
  ["JSS", 2],
  ["SocketIO", 2],
  //
  ["Phoenix", 3],
  ["Wordpress", 4],
  ["Docker", 2],
  ["Bash", 2],
  ["Database", 3],
  ["MongoDB", 2],
  ["RethinkDB", 2],
  ["PostgreSQL", 3],
  ["MYSQL", 2],
  ["Express", 3],
  ["Cloud & Serverless", 2],
  ["Amazon Lambda", 2],
  ["Amazon S3", 2],
  ["Netlify", 2],
  ["Contentful", 2],
  ["Next", 1],
  ["DevOps/Other", 3],
  ["Git", 4],
  ["Server", 3],
  ["Root Sage", 4],
  ["ACF",4],
  ["Understrap", 3]
];

export const langRelations: Relation[] = [
  {
    parent: "Web Dev",
    children: ["FrontEnd", "BackEnd", "DevOps/Other"]
  },
  {
    parent: "FrontEnd",
    children: ["JavaScript", "CSS", "HTML5"]
  },
  {
    parent: "JavaScript",
    children: ["Gulp","SocketIO","TypeScript", "ES6", "React", "D3", "SVG", "Jest", "Webpack", "Mocha", "Chai", "Jasmine"]
  },
  {
    parent: "React",
    children: ["MoBX", "Redux", "Gatsby", "Flux", "Enzyme", "Styled-Components", "JSS", "Glamorous"]
  },
  {
    parent: "CSS",
    children: ["SCSS", "Bootstrap", "Bulma"]
  },
  {
    parent: "BackEnd",
    children: ["Server", "Database", "Cloud & Serverless"]
  },
  {
    parent: "Server",
    children: ["Express", "Wordpress", "Phoenix"]
  },
  {
    parent: "Database",
    children: ["MongoDB", "RethinkDB", "PostgreSQL", "MYSQL"]
  },
  {
    parent: "DevOps/Other",
    children: ["Docker", "Bash", "Git"]
  },
  {
    parent: "Cloud & Serverless",
    children: ["Amazon Lambda","Amazon S3", "Netlify", "Next", "Contentful"]
  },
  {
    parent: "Wordpress",
    children:["Root Sage", "ACF", "Understrap"]
  },
 // in the react editor each node must have respective parent AND child even if it will have no children
 // parents with no children will be filtered out before sent
 // for testing purposes i am adding one example 'BackEnd' node 
  // {
  //   parent: "BackEnd",
  //   children: []
  // }
];

export const langTags: Relation[] = [
  {
    parent: "State Management",
    children: ["MoBX", "Flux", "Redux"]
  },
  {
    parent: "Testing",
    children: ["Mocha", "Chai", "Jasmine", "Jest", "Enzyme"]
  },
  {
    parent: "Styling",
    children: ["Styled-Components", "JSS", "Glamorous"] 
  },
  {
    parent: "Task Runner",
    children: ["Webpack", "Gulp"]
  },
  {
    parent: "PHP",
    children: ["Wordpress", "Root Sage"]
  },

  {
    parent: "Elixir",
    children: ["Phoenix"]
  },
  {
    parent: "NodeJS",
    children: ["Express"]
  },
  {
    parent: "NoSQL",
    children: ["MongoDB", "RethinkDB"]
  },
  {
    parent: "SQL",
    children: ["PostgreSQL", "MYSQL"]
  }
]