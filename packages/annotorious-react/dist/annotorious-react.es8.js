import { j as c } from "./annotorious-react.es11.js";
import { createContext as w, useState as u, useContext as a, useEffect as i } from "react";
import { createOSDAnnotator as g } from "@annotorious/openseadragon";
import { AnnotoriousContext as m } from "./annotorious-react.es2.js";
const d = w({ viewer: null, setViewer: null }), S = (e) => {
  const { children: x, tool: r, ...f } = e, [o, s] = u(), { anno: t, setAnno: l } = a(m);
  return i(() => {
    if (o) {
      const n = g(o, f);
      return e.drawingEnabled !== void 0 && n.setDrawingEnabled(e.drawingEnabled), e.filter && n.setFilter(e.filter), e.style && n.setStyle(e.style), e.tool && n.setDrawingTool(e.tool), l(n), () => {
        n.destroy(), l(void 0);
      };
    }
  }, [o]), i(() => {
    t && t.setDrawingEnabled(e.drawingEnabled);
  }, [e.drawingEnabled]), i(() => {
    t && t.setFilter(e.filter);
  }, [e.filter]), i(() => {
    t && t.setStyle(e.style);
  }, [e.style]), i(() => {
    t && t.setDrawingTool(r);
  }, [r]), /* @__PURE__ */ c.jsx(d.Provider, { value: { viewer: o, setViewer: s }, children: e.children });
}, A = () => {
  const { viewer: e } = a(d);
  return e;
};
export {
  S as OpenSeadragonAnnotator,
  d as OpenSeadragonAnnotatorContext,
  A as useViewer
};
//# sourceMappingURL=annotorious-react.es8.js.map
