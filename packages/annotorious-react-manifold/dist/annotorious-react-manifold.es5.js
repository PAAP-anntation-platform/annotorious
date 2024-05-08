import { j as _ } from "./annotorious-react-manifold.es7.js";
import { createContext as I, useState as M, useRef as O, useEffect as P, useContext as f } from "react";
import { createManifoldInstance as k } from "./annotorious-react-manifold.es6.js";
const i = I(), D = (t) => {
  const [r, S] = M(/* @__PURE__ */ new Map()), [g, d] = M(/* @__PURE__ */ new Map()), [u, b] = M({ selected: [] }), p = O(!1), C = (n, a) => {
    S((e) => new Map(e.entries()).set(n, a));
    const { store: o } = a.state, j = a.state.selection;
    d((e) => new Map(e.entries()).set(n, o.all()));
    const v = () => d((e) => new Map(e.entries()).set(n, o.all()));
    o.observe(v);
    let l;
    const y = j.subscribe(({ selected: e, pointerEvent: s }) => {
      l && o.unobserve(l);
      const m = (e || []).map(({ id: c, editable: A }) => ({ annotation: o.getAnnotation(c), editable: A }));
      p.current || b({ id: n, selected: m, pointerEvent: s }), l = (c) => {
        const { updated: A } = c.changes;
        b(({ id: E, selected: R }) => ({
          id: E,
          selected: R.map(({ annotation: w, editable: x }) => {
            const h = A.find((V) => V.oldValue.id === w.id);
            return h ? { annotation: h.newValue, editable: x } : { annotation: w, editable: x };
          }),
          pointerEvent: s
        }));
      }, o.observe(l, { annotations: e.map(({ id: c }) => c) });
    });
    return () => {
      S((e) => new Map(Array.from(e.entries()).filter(([s, m]) => s !== n))), d((e) => new Map(Array.from(e.entries()).filter(([s, m]) => s !== n))), o.unobserve(v), y();
    };
  };
  return P(() => {
    u.id && (p.current = !0, Array.from(r.entries()).forEach(([n, a]) => {
      n !== u.id && a.setSelected();
    }), p.current = !1);
  }, [u, r]), /* @__PURE__ */ _.jsx(i.Provider, { value: {
    annotators: r,
    annotations: g,
    selection: u,
    connectAnnotator: C
  }, children: t.children });
}, F = () => {
  const { annotators: t } = f(i);
  return k(t);
}, G = (t) => {
  const { annotators: r } = f(i);
  return r.get(t);
}, H = () => {
  const { annotations: t } = f(i);
  return t;
}, J = () => {
  const { selection: t } = f(i);
  return t;
};
export {
  D as AnnotoriousManifold,
  i as AnnotoriousManifoldContext,
  H as useAnnotations,
  G as useAnnotator,
  F as useAnnotoriousManifold,
  J as useSelection
};
//# sourceMappingURL=annotorious-react-manifold.es5.js.map
