import { j as I } from "./annotorious-react.es11.js";
import { createContext as O, forwardRef as R, useState as f, useImperativeHandle as U, useEffect as h, useContext as c } from "react";
import { useDebounce as C } from "./annotorious-react.es12.js";
const o = O({
  anno: void 0,
  setAnno: void 0,
  annotations: [],
  selection: { selected: [] }
}), B = R((t, s) => {
  const [n, a] = f(null), [p, r] = f([]), [m, u] = f({ selected: [] });
  return U(s, () => n), h(() => {
    if (n) {
      const { selection: A, store: e } = n.state;
      e.all().length > 0 && r(e.all());
      const v = () => r(() => e.all());
      e.observe(v);
      let i;
      const b = A.subscribe(({ selected: l, pointerEvent: w }) => {
        i && e.unobserve(i);
        const j = (l || []).map(({ id: d, editable: S }) => ({ annotation: e.getAnnotation(d), editable: S }));
        u({ selected: j, pointerEvent: w }), i = (d) => {
          const { updated: S } = d.changes;
          u(({ selected: D }) => ({
            selected: D.map(({ annotation: V, editable: x }) => {
              const g = S.find((E) => E.oldValue.id === V.id);
              return g ? { annotation: g.newValue, editable: x } : { annotation: V, editable: x };
            })
          }));
        }, e.observe(i, { annotations: l.map(({ id: d }) => d) });
      });
      return () => {
        e.unobserve(v), b();
      };
    }
  }, [n]), /* @__PURE__ */ I.jsx(o.Provider, { value: {
    anno: n,
    setAnno: a,
    annotations: p,
    selection: m
  }, children: t.children });
}), F = () => {
  const { anno: t } = c(o);
  return t;
}, G = () => {
  const { anno: t } = c(o);
  return t == null ? void 0 : t.state.store;
}, H = () => {
  const { annotations: t } = c(o);
  return t;
}, P = (t) => {
  const { annotations: s } = c(o);
  return C(s, t);
}, J = (t) => t ? P(t) : H(), K = () => {
  const { selection: t } = c(o);
  return t;
}, L = () => {
  const { anno: t } = c(o);
  return t == null ? void 0 : t.getUser();
}, _ = () => {
  const { anno: t } = c(o), [s, n] = f([]);
  return h(() => {
    if (t) {
      const { store: a, viewport: p } = t.state;
      if (!p)
        return;
      let r;
      const m = p.subscribe((u) => {
        r && a.unobserve(r);
        const A = u.map((e) => a.getAnnotation(e));
        n(A), r = (e) => {
          const { updated: v } = e.changes;
          n((i) => i.map((b) => {
            const l = v.find((w) => w.oldValue.id === b.id);
            return l ? l.newValue : b;
          }));
        }, a.observe(r, { annotations: u });
      });
      return () => {
        m();
      };
    }
  }, [t]), s;
}, k = (t) => {
  const s = _();
  return C(s, t);
}, M = (t) => t ? k(t) : _();
export {
  B as Annotorious,
  o as AnnotoriousContext,
  G as useAnnotationStore,
  J as useAnnotations,
  F as useAnnotator,
  L as useAnnotatorUser,
  K as useSelection,
  M as useViewportState
};
//# sourceMappingURL=annotorious-react.es2.js.map
