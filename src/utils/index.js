export function getImageUrl(name, dir="images") {
  return new URL(`../assets/${dir}/${name}`, import.meta.url).href
}
