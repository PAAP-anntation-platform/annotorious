import { safe_not_equal as H, noop as v, component_subscribe as I, action_destroyer as T, is_function as X, run_all as Y } from "./annotorious-svelte.es5.js";
import { empty as q, insert as y, detach as P, element as x, text as G, attr as L, append as R, listen as _, set_data as U } from "./annotorious-svelte.es6.js";
import { onMount as z } from "./annotorious-svelte.es8.js";
import { SvelteComponent as B, init as F } from "./annotorious-svelte.es9.js";
import "./annotorious-svelte.es10.js";
import { draggable as J } from "./annotorious-svelte.es12.js";
import b from "openseadragon";
import "./annotorious-svelte.es13.js";
function w(n) {
  let o, e = (
    /*$selection*/
    n[0].selected.map(S).join(", ") + ""
  ), t, s, r, d;
  return {
    c() {
      o = x("div"), t = G(e), L(o, "class", "a9s-popup a9s-osd-popup svelte-1xuxeat");
    },
    m(a, l) {
      y(a, o, l), R(o, t), r || (d = [
        T(s = J.call(null, o, {
          position: { x: (
            /*left*/
            n[1]
          ), y: (
            /*top*/
            n[2]
          ) }
        })),
        _(
          o,
          "neodrag:start",
          /*onDragStart*/
          n[4]
        ),
        _(
          o,
          "neodrag:end",
          /*onDragEnd*/
          n[5]
        )
      ], r = !0);
    },
    p(a, l) {
      l & /*$selection*/
      1 && e !== (e = /*$selection*/
      a[0].selected.map(S).join(", ") + "") && U(t, e), s && X(s.update) && l & /*left, top*/
      6 && s.update.call(null, {
        position: { x: (
          /*left*/
          a[1]
        ), y: (
          /*top*/
          a[2]
        ) }
      });
    },
    d(a) {
      a && P(o), r = !1, Y(d);
    }
  };
}
function K(n) {
  let o, e = (
    /*$selection*/
    n[0] && w(n)
  );
  return {
    c() {
      e && e.c(), o = q();
    },
    m(t, s) {
      e && e.m(t, s), y(t, o, s);
    },
    p(t, [s]) {
      /*$selection*/
      t[0] ? e ? e.p(t, s) : (e = w(t), e.c(), e.m(o.parentNode, o)) : e && (e.d(1), e = null);
    },
    i: v,
    o: v,
    d(t) {
      t && P(o), e && e.d(t);
    }
  };
}
const S = (n) => n.id;
function Q(n, o, e) {
  let t, { state: s } = o, { viewer: r } = o, d, a, l = !1, p;
  const { selection: u, store: f } = s;
  I(n, u, (i) => e(0, t = i));
  const g = (i) => {
    var c;
    return ((c = i.selected) == null ? void 0 : c.length) > 0;
  }, E = () => {
    l = !0, r.setMouseNavEnabled(!1);
  }, D = () => {
    r.setMouseNavEnabled(!0);
  }, N = () => {
    p && f.unobserve(p), g(t) && (l = !1, m(t), p = (i) => {
      l || m(t);
    }, f.observe(p, {
      annotations: t.selected.map((i) => i.id)
    }));
  }, m = (i) => {
    const c = i.selected[0].id, O = f.getAnnotation(c), { minX: h, minY: k, maxX: C, maxY: M } = O.target.selector.geometry.bounds, V = 14, j = r.viewport.imageToViewerElementCoordinates(new b.Point(h, k)), A = r.viewport.imageToViewerElementCoordinates(new b.Point(C, M));
    e(1, d = A.x + V), e(2, a = j.y);
  };
  return z(() => {
    const i = () => {
      g(t) && !l && m(t);
    };
    return r.addHandler("update-viewport", i), () => {
      r.removeHandler("update-viewport", i);
    };
  }), n.$$set = (i) => {
    "state" in i && e(6, s = i.state), "viewer" in i && e(7, r = i.viewer);
  }, n.$$.update = () => {
    n.$$.dirty & /*$selection*/
    1 && N();
  }, [t, d, a, u, E, D, s, r];
}
class W extends B {
  constructor(o) {
    super(), F(this, o, Q, K, H, { state: 6, viewer: 7 });
  }
}
const re = W;
export {
  re as default
};
//# sourceMappingURL=annotorious-svelte.es4.js.map
