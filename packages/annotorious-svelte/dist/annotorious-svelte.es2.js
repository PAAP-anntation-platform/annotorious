import { safe_not_equal as O, component_subscribe as T, create_slot as q, update_slot_base as w, get_all_dirty_from_scope as A, get_slot_changes as N } from "./annotorious-svelte.es5.js";
import { empty as S, insert as E, detach as L, element as X, attr as c } from "./annotorious-svelte.es6.js";
import { transition_in as u, transition_out as p, check_outros as Y, group_outros as j } from "./annotorious-svelte.es7.js";
import { getContext as z, onMount as B } from "./annotorious-svelte.es8.js";
import { SvelteComponent as D, init as F } from "./annotorious-svelte.es9.js";
import "./annotorious-svelte.es10.js";
const G = (o) => ({ hovered: o & /*hovered*/
16 }), b = (o) => ({ hovered: (
  /*hovered*/
  o[4]
) });
function g(o) {
  let r, s, e;
  const t = (
    /*#slots*/
    o[8].default
  ), n = q(
    t,
    o,
    /*$$scope*/
    o[7],
    b
  );
  return {
    c() {
      r = X("div"), n && n.c(), c(r, "class", "a9s-tooltip"), c(r, "style", s = `left:${/*left*/
      o[2]}px; top:${/*top*/
      o[1]}px; position: absolute;`);
    },
    m(i, l) {
      E(i, r, l), n && n.m(r, null), e = !0;
    },
    p(i, l) {
      n && n.p && (!e || l & /*$$scope, hovered*/
      144) && w(
        n,
        t,
        i,
        /*$$scope*/
        i[7],
        e ? N(
          t,
          /*$$scope*/
          i[7],
          l,
          G
        ) : A(
          /*$$scope*/
          i[7]
        ),
        b
      ), (!e || l & /*left, top*/
      6 && s !== (s = `left:${/*left*/
      i[2]}px; top:${/*top*/
      i[1]}px; position: absolute;`)) && c(r, "style", s);
    },
    i(i) {
      e || (u(n, i), e = !0);
    },
    o(i) {
      p(n, i), e = !1;
    },
    d(i) {
      i && L(r), n && n.d(i);
    }
  };
}
function H(o) {
  let r, s, e = (
    /*$hover*/
    o[0] && /*show*/
    o[3] && g(o)
  );
  return {
    c() {
      e && e.c(), r = S();
    },
    m(t, n) {
      e && e.m(t, n), E(t, r, n), s = !0;
    },
    p(t, [n]) {
      /*$hover*/
      t[0] && /*show*/
      t[3] ? e ? (e.p(t, n), n & /*$hover, show*/
      9 && u(e, 1)) : (e = g(t), e.c(), u(e, 1), e.m(r.parentNode, r)) : e && (j(), p(e, 1, 1, () => {
        e = null;
      }), Y());
    },
    i(t) {
      s || (u(e), s = !0);
    },
    o(t) {
      p(e), s = !1;
    },
    d(t) {
      t && L(r), e && e.d(t);
    }
  };
}
function I(o, r, s) {
  let e, t, { $$slots: n = {}, $$scope: i } = r, { container: l } = r;
  const k = z("anno"), { store: M, hover: _ } = k.state;
  T(o, _, (f) => s(0, t = f));
  let m, v, a = !0;
  return B(() => {
    const f = () => {
      s(3, a = !0);
    }, d = (y) => {
      const { offsetX: P, offsetY: C } = y;
      s(2, v = P), s(1, m = C);
    }, h = () => {
      s(3, a = !1);
    };
    return l.addEventListener("pointerenter", f), l.addEventListener("pointermove", d), l.addEventListener("pointerleave", h), () => {
      l.removeEventListener("pointerenter", f), l.removeEventListener("pointermove", d), l.removeEventListener("pointerleave", h);
    };
  }), o.$$set = (f) => {
    "container" in f && s(6, l = f.container), "$$scope" in f && s(7, i = f.$$scope);
  }, o.$$.update = () => {
    o.$$.dirty & /*$hover*/
    1 && s(4, e = t ? M.getAnnotation(t) : void 0);
  }, [t, m, v, a, e, _, l, i, n];
}
class J extends D {
  constructor(r) {
    super(), F(this, r, I, H, O, { container: 6 });
  }
}
const Z = J;
export {
  Z as default
};
//# sourceMappingURL=annotorious-svelte.es2.js.map
