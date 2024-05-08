import { run_all as u } from "./annotorious-svelte.es5.js";
const r = /* @__PURE__ */ new Set();
let i;
function s() {
  i = {
    r: 0,
    c: [],
    p: i
    // parent group
  };
}
function p() {
  i.r || u(i.c), i = i.p;
}
function d(t, e) {
  t && t.i && (r.delete(t), t.i(e));
}
function _(t, e, o, n) {
  if (t && t.o) {
    if (r.has(t))
      return;
    r.add(t), i.c.push(() => {
      r.delete(t), n && (o && t.d(1), n());
    }), t.o(e);
  } else
    n && n();
}
export {
  p as check_outros,
  s as group_outros,
  d as transition_in,
  _ as transition_out
};
//# sourceMappingURL=annotorious-svelte.es7.js.map
