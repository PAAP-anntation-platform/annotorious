import { j as r } from "./annotorious-react-manifold.es7.js";
import { useContext as s, useEffect as a } from "react";
import { OSDViewerContext as m } from "./annotorious-react-manifold.es3.js";
import { OpenSeadragonViewer as w, useViewer as d } from "@annotorious/react";
const f = (e) => {
  const n = d(), { setViewers: i } = s(m);
  return a(() => {
    if (n)
      return i((t) => new Map(t.entries()).set(e.id, n)), () => {
        i((t) => new Map(Array.from(t.entries()).filter(([o, p]) => o !== e.id)));
      };
  }, [n]), null;
}, S = (e) => /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
  /* @__PURE__ */ r.jsx(w, { ...e }),
  /* @__PURE__ */ r.jsx(f, { id: e.id })
] });
export {
  S as OpenSeadragonViewer
};
//# sourceMappingURL=annotorious-react-manifold.es2.js.map
