import * as React from "react";
import { nameAndSkills, langRelations, langTags } from '../mindMap/sampleData';
import * as jsonh from '../../node_modules/json-url/dist/browser/json-url';
import 'json-url/dist/browser/json-url-msgpack'
import 'json-url/dist/browser/json-url-lzw'
import 'json-url/dist/browser/json-url-lzma'
import 'json-url/dist/browser/json-url-lzstring'
import 'json-url/dist/browser/json-url-safe64'

export default class extends React.Component<any, any> {
  constructor(props:any, context:any){
    super(props, context)
    this.state = {
      jsonh: '',
      json: '',
      url:'',
      jsonurl: '',
      lzw: '',
      data: {
        nameAndSkills,
        langRelations,
        langTags
      },
    }
  }

  onJsonClick = e => {
    this.setState({
      json: JSON.stringify(this.state.data).replace(
        /\u2028|\u2029/g,
        function (m) {
            return "\\u202" + (m === "\u2028" ? "8" : "9");
        })
    },()=>{
      this.setState({
        url: encodeURIComponent(this.state.json),

      })
    })
    const codec = jsonh('lzma');
    codec.compress(this.state.data).then(res => {
      console.log(res)
      this.setState({jsonurl: res})
      codec.decompress(res).then(json=> {
        console.log(json);
      })
    })
    const lzw = jsonh('lzw');
    lzw.compress(this.state.data).then(res => {
      console.log(res)
      this.setState({lzw: res})
    })
  }

  render(){
    return <div>
      <button onClick={this.onJsonClick}>generate json!</button>
      <p>{this.state.json}</p>
      <div>{this.state.json.length}</div>
      <hr/>
      <h2>url encoded no compression</h2>
      <p>{this.state.url}</p>
      <div>{this.state.url.length}</div>
      <hr/>
      <h2>json-url (lzma)</h2>
      <p>{this.state.jsonurl}</p>
      <div>{this.state.jsonurl.length}</div>
      <h2>json-url (lzw)</h2>
      <p>{this.state.lzw}</p>
      <div>{this.state.lzw.length}</div>
    </div>
  }
}