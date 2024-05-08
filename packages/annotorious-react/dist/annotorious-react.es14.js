import b from "openseadragon";
const L = (h, x) => {
  const { minX: e, minY: n, maxX: i, maxY: t } = x.target.selector.geometry.bounds, l = h.viewport.imageToViewerElementCoordinates(new b.Point(e, n)), s = h.viewport.imageToViewerElementCoordinates(new b.Point(i, t));
  return {
    x: l.x,
    right: s.x,
    y: l.y,
    bottom: s.y,
    width: s.x - l.x,
    height: s.y - l.y
  };
}, T = (h, x, e, n = 5) => {
  const i = h.element.getBoundingClientRect(), t = L(h, x), l = t.y - i.y, s = i.right - t.x, w = i.bottom - t.bottom, $ = t.x - i.left, o = e.firstElementChild.getBoundingClientRect(), a = l / o.height, c = s / o.width, g = w / o.height, r = $ / o.width, d = () => {
    e.style.left = `${t.x}px`, e.style.top = `${t.y - n - o.height}px`;
  }, f = () => {
    e.style.left = `${t.right - o.width}px`, e.style.top = `${t.y - n - o.height}px`;
  }, v = () => {
    e.style.left = `${t.x - o.width - n}px`, e.style.top = `${t.y}px`;
  }, B = () => {
    e.style.left = `${t.right + n}px`, e.style.top = `${t.y}px`;
  }, R = () => {
    e.style.left = `${t.x - o.width - n}px`, e.style.top = `${t.bottom - o.height}px`;
  }, C = () => {
    e.style.left = `${t.x + t.width + n}px`, e.style.top = `${t.bottom - o.height}px`;
  }, A = () => {
    e.style.left = `${t.x}px`, e.style.top = `${t.bottom + n}px`;
  }, E = () => {
    e.style.left = `${t.right - o.width}px`, e.style.top = `${t.bottom + n}px`;
  }, m = [a, c, g, r], y = m.indexOf(Math.max(...m));
  y === 0 ? c > r ? d() : f() : y === 1 ? a > g ? C() : B() : y === 2 ? c > r ? A() : E() : a > g ? R() : v();
};
export {
  T as setPosition
};
//# sourceMappingURL=annotorious-react.es14.js.map
