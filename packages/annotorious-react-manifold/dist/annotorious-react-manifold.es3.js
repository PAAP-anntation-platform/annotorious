import { j as o } from "./annotorious-react-manifold.es7.js";
import { createContext as i, useState as n, useContext as w } from "react";
const r = i({
  viewers: void 0,
  setViewers: void 0
}), v = (e) => {
  const [t, s] = n(/* @__PURE__ */ new Map());
  return /* @__PURE__ */ o.jsx(r.Provider, { value: { viewers: t, setViewers: s }, children: e.children });
}, x = () => {
  const { viewers: e } = w(r);
  return e;
};
export {
  r as OSDViewerContext,
  v as OSDViewerManifold,
  x as useViewers
};
//# sourceMappingURL=annotorious-react-manifold.es3.js.map
