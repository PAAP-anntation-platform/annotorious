function i() {
}
function l(t, n) {
  for (const e in n)
    t[e] = n[e];
  return (
    /** @type {T & S} */
    t
  );
}
function _(t) {
  return t();
}
function d() {
  return /* @__PURE__ */ Object.create(null);
}
function g(t) {
  t.forEach(_);
}
function y(t) {
  return typeof t == "function";
}
function h(t, n) {
  return t != t ? n == n : t !== n || t && typeof t == "object" || typeof t == "function";
}
function x(t) {
  return Object.keys(t).length === 0;
}
function b(t, ...n) {
  if (t == null) {
    for (const r of n)
      r(void 0);
    return i;
  }
  const e = t.subscribe(...n);
  return e.unsubscribe ? () => e.unsubscribe() : e;
}
function a(t, n, e) {
  t.$$.on_destroy.push(b(n, e));
}
function p(t, n, e, r) {
  if (t) {
    const u = s(t, n, e, r);
    return t[0](u);
  }
}
function s(t, n, e, r) {
  return t[1] && r ? l(e.ctx.slice(), t[1](r(n))) : e.ctx;
}
function j(t, n, e, r) {
  if (t[2] && r) {
    const u = t[2](r(e));
    if (n.dirty === void 0)
      return u;
    if (typeof u == "object") {
      const c = [], f = Math.max(n.dirty.length, u.length);
      for (let o = 0; o < f; o += 1)
        c[o] = n.dirty[o] | u[o];
      return c;
    }
    return n.dirty | u;
  }
  return n.dirty;
}
function m(t, n, e, r, u, c) {
  if (u) {
    const f = s(n, e, r, c);
    t.p(f, u);
  }
}
function k(t) {
  if (t.ctx.length > 32) {
    const n = [], e = t.ctx.length / 32;
    for (let r = 0; r < e; r++)
      n[r] = -1;
    return n;
  }
  return -1;
}
function O(t) {
  return t && y(t.destroy) ? t.destroy : i;
}
export {
  O as action_destroyer,
  l as assign,
  d as blank_object,
  a as component_subscribe,
  p as create_slot,
  k as get_all_dirty_from_scope,
  j as get_slot_changes,
  x as is_empty,
  y as is_function,
  i as noop,
  _ as run,
  g as run_all,
  h as safe_not_equal,
  b as subscribe,
  m as update_slot_base
};
//# sourceMappingURL=annotorious-svelte.es5.js.map
