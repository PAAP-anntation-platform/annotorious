let t;
function r(n) {
  t = n;
}
function o() {
  if (!t)
    throw new Error("Function called outside component initialization");
  return t;
}
function u(n) {
  o().$$.on_mount.push(n);
}
function c(n, e) {
  return o().$$.context.set(n, e), e;
}
function i(n) {
  return o().$$.context.get(n);
}
export {
  t as current_component,
  i as getContext,
  o as get_current_component,
  u as onMount,
  c as setContext,
  r as set_current_component
};
//# sourceMappingURL=annotorious-svelte.es8.js.map
