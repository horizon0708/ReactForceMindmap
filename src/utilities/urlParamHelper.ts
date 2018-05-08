export function getUrlParamByName (name:string, query = ''): string |null {
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(query)
  if (!results || !results[2]) return null
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}
