function u(e, t) {
  e.appendChild(t);
}
function c(e, t, n) {
  e.insertBefore(t, n || null);
}
function f(e) {
  e.parentNode && e.parentNode.removeChild(e);
}
function o(e) {
  return document.createElement(e);
}
function i(e) {
  return document.createTextNode(e);
}
function d() {
  return i("");
}
function l(e, t, n, r) {
  return e.addEventListener(t, n, r), () => e.removeEventListener(t, n, r);
}
function m(e, t, n) {
  n == null ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n);
}
function s(e) {
  return Array.from(e.childNodes);
}
function p(e, t) {
  t = "" + t, e.data !== t && (e.data = /** @type {string} */
  t);
}
export {
  u as append,
  m as attr,
  s as children,
  f as detach,
  o as element,
  d as empty,
  c as insert,
  l as listen,
  p as set_data,
  i as text
};
//# sourceMappingURL=annotorious-svelte.es6.js.map
