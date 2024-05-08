var G = { dragStart: !0 }, oe = (t, s, i) => Math.min(Math.max(t, s), i), J = (t) => typeof t == "string", ue = ([t, s], i, c) => {
  const u = (w, f) => f === 0 ? 0 : Math.ceil(w / f) * f;
  return [u(i, t), u(c, s)];
}, ie = (t, s) => t.some((i) => s.some((c) => i.contains(c)));
function K(t, s) {
  if (t === void 0)
    return;
  if (O(t))
    return t.getBoundingClientRect();
  if (typeof t == "object") {
    const { top: c = 0, left: u = 0, right: w = 0, bottom: f = 0 } = t;
    return { top: c, right: window.innerWidth - w, bottom: window.innerHeight - f, left: u };
  }
  if (t === "parent")
    return s.parentNode.getBoundingClientRect();
  const i = document.querySelector(t);
  if (i === null)
    throw new Error("The selector provided for bound doesn't exists in the document.");
  return i.getBoundingClientRect();
}
var L = (t, s, i) => t.style.setProperty(s, i), O = (t) => t instanceof HTMLElement, fe = (t, s = {}) => {
  let i, c, { bounds: u, axis: w = "both", gpuAcceleration: f = !0, legacyTranslate: Q = !0, transform: T, applyUserSelectHack: X = !0, disabled: V = !1, ignoreMultitouch: Y = !1, recomputeBounds: x = G, grid: q, position: p, cancel: N, handle: D, defaultClass: M = "neodrag", defaultClassDragging: P = "neodrag-dragging", defaultClassDragged: S = "neodrag-dragged", defaultPosition: ae = { x: 0, y: 0 }, onDragStart: se, onDrag: le, onDragEnd: de } = s, B = !1, y = 0, b = 0, A = 0, C = 0, k = 0, z = 0, { x: $, y: R } = p ? { x: (p == null ? void 0 : p.x) ?? 0, y: (p == null ? void 0 : p.y) ?? 0 } : ae;
  W($, R);
  let g, v, E, I, Z, _ = "", ce = !!p;
  x = { ...G, ...x };
  let H = /* @__PURE__ */ new Set();
  const U = document.body.style, m = t.classList;
  function W(e = y, r = b) {
    if (!T) {
      if (Q) {
        let a = `${+e}px, ${+r}px`;
        return L(t, "transform", f ? `translate3d(${a}, 0)` : `translate(${a})`);
      }
      return L(t, "translate", `${+e}px ${+r}px ${f ? "1px" : ""}`);
    }
    const o = T({ offsetX: e, offsetY: r, rootNode: t });
    J(o) && L(t, "transform", o);
  }
  const j = (e, r) => {
    const o = { offsetX: y, offsetY: b, rootNode: t, currentNode: Z };
    t.dispatchEvent(new CustomEvent(e, { detail: o })), r == null || r(o);
  }, F = addEventListener;
  F("pointerdown", te, !1), F("pointerup", ne, !1), F("pointermove", re, !1), L(t, "touch-action", "none");
  const ee = () => {
    let e = t.offsetWidth / v.width;
    return isNaN(e) && (e = 1), e;
  };
  function te(e) {
    if (V || e.button === 2)
      return;
    if (H.add(e.pointerId), Y && H.size > 1)
      return e.preventDefault();
    if (x.dragStart && (g = K(u, t)), J(D) && J(N) && D === N)
      throw new Error("`handle` selector can't be same as `cancel` selector");
    if (m.add(M), E = function(n, d) {
      if (!n)
        return [d];
      if (O(n))
        return [n];
      if (Array.isArray(n))
        return n;
      const h = d.querySelectorAll(n);
      if (h === null)
        throw new Error("Selector passed for `handle` option should be child of the element on which the action is applied");
      return Array.from(h.values());
    }(D, t), I = function(n, d) {
      if (!n)
        return [];
      if (O(n))
        return [n];
      if (Array.isArray(n))
        return n;
      const h = d.querySelectorAll(n);
      if (h === null)
        throw new Error("Selector passed for `cancel` option should be child of the element on which the action is applied");
      return Array.from(h.values());
    }(N, t), i = /(both|x)/.test(w), c = /(both|y)/.test(w), ie(I, E))
      throw new Error("Element being dragged can't be a child of the element on which `cancel` is applied");
    const r = e.composedPath()[0];
    if (!E.some((n) => {
      var d;
      return n.contains(r) || ((d = n.shadowRoot) == null ? void 0 : d.contains(r));
    }) || ie(I, [r]))
      return;
    Z = E.length === 1 ? t : E.find((n) => n.contains(r)), B = !0, v = t.getBoundingClientRect(), X && (_ = U.userSelect, U.userSelect = "none"), j("neodrag:start", se);
    const { clientX: o, clientY: a } = e, l = ee();
    i && (A = o - $ / l), c && (C = a - R / l), g && (k = o - v.left, z = a - v.top);
  }
  function ne(e) {
    H.delete(e.pointerId), B && (x.dragEnd && (g = K(u, t)), m.remove(P), m.add(S), X && (U.userSelect = _), j("neodrag:end", de), i && (A = y), c && (C = b), B = !1);
  }
  function re(e) {
    if (!B || Y && H.size > 1)
      return;
    x.drag && (g = K(u, t)), m.add(P), e.preventDefault(), v = t.getBoundingClientRect();
    let r = e.clientX, o = e.clientY;
    const a = ee();
    if (g) {
      const l = { left: g.left + k, top: g.top + z, right: g.right + k - v.width, bottom: g.bottom + z - v.height };
      r = oe(r, l.left, l.right), o = oe(o, l.top, l.bottom);
    }
    if (Array.isArray(q)) {
      let [l, n] = q;
      if (isNaN(+l) || l < 0)
        throw new Error("1st argument of `grid` must be a valid positive number");
      if (isNaN(+n) || n < 0)
        throw new Error("2nd argument of `grid` must be a valid positive number");
      let d = r - A, h = o - C;
      [d, h] = ue([l / a, n / a], d, h), r = A + d, o = C + h;
    }
    i && (y = Math.round((r - A) * a)), c && (b = Math.round((o - C) * a)), $ = y, R = b, j("neodrag", le), W();
  }
  return { destroy: () => {
    const e = removeEventListener;
    e("pointerdown", te, !1), e("pointerup", ne, !1), e("pointermove", re, !1);
  }, update: (e) => {
    var o, a;
    w = e.axis || "both", V = e.disabled ?? !1, Y = e.ignoreMultitouch ?? !1, D = e.handle, u = e.bounds, x = e.recomputeBounds ?? G, N = e.cancel, X = e.applyUserSelectHack ?? !0, q = e.grid, f = e.gpuAcceleration ?? !0, Q = e.legacyTranslate ?? !0, T = e.transform;
    const r = m.contains(S);
    m.remove(M, S), M = e.defaultClass ?? "neodrag", P = e.defaultClassDragging ?? "neodrag-dragging", S = e.defaultClassDragged ?? "neodrag-dragged", m.add(M), r && m.add(S), ce && ($ = y = ((o = e.position) == null ? void 0 : o.x) ?? y, R = b = ((a = e.position) == null ? void 0 : a.y) ?? b, W());
  } };
};
export {
  fe as draggable
};
//# sourceMappingURL=annotorious-svelte.es12.js.map
