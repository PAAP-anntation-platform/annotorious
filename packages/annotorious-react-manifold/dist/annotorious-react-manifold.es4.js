import { j as o } from "./annotorious-react-manifold.es7.js";
import { useContext as i, useEffect as e } from "react";
import { Annotorious as s, useAnnotator as c } from "@annotorious/react";
import { AnnotoriousManifoldContext as u } from "./annotorious-react-manifold.es5.js";
const m = (n) => {
  const t = c(), { connectAnnotator: r } = i(u);
  return e(() => {
    if (t)
      return r(n.id, t);
  }, [t]), /* @__PURE__ */ o.jsx(o.Fragment, { children: n.children });
}, A = (n) => /* @__PURE__ */ o.jsx(s, { children: /* @__PURE__ */ o.jsx(m, { id: n.id, children: n.children }) });
export {
  A as Annotorious
};
//# sourceMappingURL=annotorious-react-manifold.es4.js.map
