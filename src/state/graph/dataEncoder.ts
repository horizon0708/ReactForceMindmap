import * as jsonh from "../../../node_modules/json-url/dist/browser/json-url";
import "json-url/dist/browser/json-url-msgpack";
import "json-url/dist/browser/json-url-lzw";
import "json-url/dist/browser/json-url-lzma";
import "json-url/dist/browser/json-url-lzstring";
import "json-url/dist/browser/json-url-safe64";
import { GraphState } from "./reducer";
import { getOriginId } from './helper';

export function EncodeJSON(graphState: GraphState): Promise<String> {
  return new Promise((res, err) => {
    const { categories, tags, skills } = graphState;
    const filteredCategories = categories.filter(
      category => category.children.length > 0
    );
    const filteredTags = tags.filter(tag => tag.children.length > 0);
    const data = {
      categories: filteredCategories,
      tags: filteredTags,
      skills,
      origin: getOriginId(categories)
    };
    const codec = jsonh("lzma");
    codec
      .compress(data)
      .then(result => {
        res(result);
      })
      .catch(error => err(error));
  });
}
