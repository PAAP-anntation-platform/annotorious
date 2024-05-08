import { Origin as c } from "@annotorious/react";
const B = (r) => {
  const e = (t) => Array.from(r.entries()).reduce((o, [n, s]) => {
    if (o)
      return o;
    const a = s.state.store.getAnnotation(t);
    if (a)
      return { annotation: a, annotator: s, source: n };
  }, void 0) || { annotation: void 0, annotator: void 0, source: void 0 }, i = (t, o = c.LOCAL) => {
    const { annotator: n } = e(t.annotation);
    n && n.state.store.addBody(t, o);
  }, d = (t = c.LOCAL) => Array.from(r.values()).forEach((o) => o.state.store.clear(t)), f = (t, o = c.LOCAL) => {
    const { annotation: n, annotator: s } = e(t);
    if (s)
      return s.state.store.deleteAnnotation(t, o), n;
  }, u = (t, o = c.LOCAL) => {
    const { annotator: n } = e(t.annotation);
    n && n.state.store.deleteBody(t, o);
  }, A = () => Array.from(r.values()).forEach((t) => t.destroy()), l = (t) => {
    const { annotator: o } = e(t);
    return o;
  }, y = (t) => {
    const { source: o } = e(t);
    return o;
  }, v = (t) => e(t).annotation, L = () => Array.from(r.values()).reduce((t, o) => [...t, ...o.state.store.all()], []), m = (t) => r.get(t), p = (t, o, n) => {
    const s = typeof t == "string" ? t : t.id, { annotator: a } = e(s);
    a && a.state.store.updateAnnotation(t, o, n);
  }, O = (t) => {
    const { annotator: o } = e(t);
    o && o.setSelected(t);
  };
  return {
    annotators: [...r.values()],
    sources: [...r.keys()],
    addBody: i,
    clear: d,
    deleteAnnotation: f,
    deleteBody: u,
    destroy: A,
    findAnnotator: l,
    findSource: y,
    getAnnotation: v,
    getAnnotations: L,
    getAnnotator: m,
    setSelected: O,
    updateAnnotation: p
  };
};
export {
  B as createManifoldInstance
};
//# sourceMappingURL=annotorious-react-manifold.es6.js.map
