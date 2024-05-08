import { run_all as i } from "./annotorious-svelte.es5.js";
import { set_current_component as a, current_component as u } from "./annotorious-svelte.es8.js";
const r = [], h = [];
let c = [];
const d = [], p = /* @__PURE__ */ Promise.resolve();
let f = !1;
function w() {
  f || (f = !0, p.then(m));
}
function _(e) {
  c.push(e);
}
const s = /* @__PURE__ */ new Set();
let l = 0;
function m() {
  if (l !== 0)
    return;
  const e = u;
  do {
    try {
      for (; l < r.length; ) {
        const t = r[l];
        l++, a(t), g(t.$$);
      }
    } catch (t) {
      throw r.length = 0, l = 0, t;
    }
    for (a(null), r.length = 0, l = 0; h.length; )
      h.pop()();
    for (let t = 0; t < c.length; t += 1) {
      const n = c[t];
      s.has(n) || (s.add(n), n());
    }
    c.length = 0;
  } while (r.length);
  for (; d.length; )
    d.pop()();
  f = !1, s.clear(), a(e);
}
function g(e) {
  if (e.fragment !== null) {
    e.update(), i(e.before_update);
    const t = e.dirty;
    e.dirty = [-1], e.fragment && e.fragment.p(e.ctx, t), e.after_update.forEach(_);
  }
}
function y(e) {
  const t = [], n = [];
  c.forEach((o) => e.indexOf(o) === -1 ? t.push(o) : n.push(o)), n.forEach((o) => o()), c = t;
}
export {
  _ as add_render_callback,
  h as binding_callbacks,
  r as dirty_components,
  m as flush,
  y as flush_render_callbacks,
  w as schedule_update
};
//# sourceMappingURL=annotorious-svelte.es14.js.map
