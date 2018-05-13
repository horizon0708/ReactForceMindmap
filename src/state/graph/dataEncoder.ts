//@ts-ignore
import "json-url/dist/browser/json-url-msgpack";
import "json-url/dist/browser/json-url-lzw";
import "json-url/dist/browser/json-url-lzma";
import "json-url/dist/browser/json-url-lzstring";
import "json-url/dist/browser/json-url-safe64";
if(typeof window !== 'undefined'){
  const jsonurl = require("../../../node_modules/json-url/dist/browser/json-url");

}

import { GraphState } from "./reducer";
import { getOriginId } from './helper';

export function EncodeJSON(graphState: GraphState): Promise<String> {
  return new Promise((res, err) => {
    // const { categories, tags, skills } = graphState;
    // const filteredCategories = categories.filter(
    //   category => category.children.length > 0
    // );
    // const filteredTags = tags.filter(tag => tag.children.length > 0);
    // const data = {
    //   categories: filteredCategories,
    //   tags: filteredTags,
    //   skills,
    //   origin: getOriginId(categories)
    // };
    if(window !== undefined) {
    const codec = jsonurl("lzma");
    codec
      .compress(graphState)
      .then((result:any) => {
        res(result);
      })
      .catch((error: any) => err(error));
    } else{
      err();
    }

  });
}

export function decodeJSON(data: string) {
  return new Promise((res, err )=>{
    if(window !== undefined) {
    const codec = jsonurl("lzma");
    codec
      .decompress(data)
      .then((result: any) => {
        res(result);
      })
      .catch((error: any) => err(error));
    }
    else {
      err()
    }
  });
}