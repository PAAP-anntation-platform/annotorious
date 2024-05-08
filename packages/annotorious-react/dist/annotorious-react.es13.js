import { useRef as pe, useState as ie, useEffect as se } from "react";
var Q = { dragStart: !0 }, he = (e, t = {}) => {
  let o, l, { bounds: c, axis: m = "both", gpuAcceleration: f = !0, legacyTranslate: R = !0, transform: M, applyUserSelectHack: N = !0, disabled: $ = !1, ignoreMultitouch: B = !1, recomputeBounds: b = Q, grid: H, position: u, cancel: D, handle: S, defaultClass: E = "neodrag", defaultClassDragging: i = "neodrag-dragging", defaultClassDragged: g = "neodrag-dragged", defaultPosition: U = { x: 0, y: 0 }, onDragStart: ce, onDrag: ue, onDragEnd: fe } = t, Y = !1, x = 0, A = 0, L = 0, T = 0, W = 0, j = 0, { x: q, y: P } = u ? { x: (u == null ? void 0 : u.x) ?? 0, y: (u == null ? void 0 : u.y) ?? 0 } : U;
  J(q, P);
  let y, C, X, F, ee, ne = "", ge = !!u;
  b = { ...Q, ...b };
  let k = /* @__PURE__ */ new Set();
  const G = document.body.style, v = e.classList;
  function J(n = x, a = A) {
    if (!M) {
      if (R) {
        let d = `${+n}px, ${+a}px`;
        return z(e, "transform", f ? `translate3d(${d}, 0)` : `translate(${d})`);
      }
      return z(e, "translate", `${+n}px ${+a}px ${f ? "1px" : ""}`);
    }
    const s = M({ offsetX: n, offsetY: a, rootNode: e });
    V(s) && z(e, "transform", s);
  }
  const K = (n, a) => {
    const s = { offsetX: x, offsetY: A, rootNode: e, currentNode: ee };
    e.dispatchEvent(new CustomEvent(n, { detail: s })), a == null || a(s);
  }, O = addEventListener;
  O("pointerdown", te, !1), O("pointerup", oe, !1), O("pointermove", ae, !1), z(e, "touch-action", "none");
  const re = () => {
    let n = e.offsetWidth / C.width;
    return isNaN(n) && (n = 1), n;
  };
  function te(n) {
    if ($ || n.button === 2)
      return;
    if (k.add(n.pointerId), B && k.size > 1)
      return n.preventDefault();
    if (b.dragStart && (y = Z(c, e)), V(S) && V(D) && S === D)
      throw new Error("`handle` selector can't be same as `cancel` selector");
    if (v.add(E), X = function(r, h) {
      if (!r)
        return [h];
      if (_(r))
        return [r];
      if (Array.isArray(r))
        return r;
      const w = h.querySelectorAll(r);
      if (w === null)
        throw new Error("Selector passed for `handle` option should be child of the element on which the action is applied");
      return Array.from(w.values());
    }(S, e), F = function(r, h) {
      if (!r)
        return [];
      if (_(r))
        return [r];
      if (Array.isArray(r))
        return r;
      const w = h.querySelectorAll(r);
      if (w === null)
        throw new Error("Selector passed for `cancel` option should be child of the element on which the action is applied");
      return Array.from(w.values());
    }(D, e), o = /(both|x)/.test(m), l = /(both|y)/.test(m), le(F, X))
      throw new Error("Element being dragged can't be a child of the element on which `cancel` is applied");
    const a = n.composedPath()[0];
    if (!X.some((r) => {
      var h;
      return r.contains(a) || ((h = r.shadowRoot) == null ? void 0 : h.contains(a));
    }) || le(F, [a]))
      return;
    ee = X.length === 1 ? e : X.find((r) => r.contains(a)), Y = !0, C = e.getBoundingClientRect(), N && (ne = G.userSelect, G.userSelect = "none"), K("neodrag:start", ce);
    const { clientX: s, clientY: d } = n, p = re();
    o && (L = s - q / p), l && (T = d - P / p), y && (W = s - C.left, j = d - C.top);
  }
  function oe(n) {
    k.delete(n.pointerId), Y && (b.dragEnd && (y = Z(c, e)), v.remove(i), v.add(g), N && (G.userSelect = ne), K("neodrag:end", fe), o && (L = x), l && (T = A), Y = !1);
  }
  function ae(n) {
    if (!Y || B && k.size > 1)
      return;
    b.drag && (y = Z(c, e)), v.add(i), n.preventDefault(), C = e.getBoundingClientRect();
    let a = n.clientX, s = n.clientY;
    const d = re();
    if (y) {
      const p = { left: y.left + W, top: y.top + j, right: y.right + W - C.width, bottom: y.bottom + j - C.height };
      a = de(a, p.left, p.right), s = de(s, p.top, p.bottom);
    }
    if (Array.isArray(H)) {
      let [p, r] = H;
      if (isNaN(+p) || p < 0)
        throw new Error("1st argument of `grid` must be a valid positive number");
      if (isNaN(+r) || r < 0)
        throw new Error("2nd argument of `grid` must be a valid positive number");
      let h = a - L, w = s - T;
      [h, w] = me([p / d, r / d], h, w), a = L + h, s = T + w;
    }
    o && (x = Math.round((a - L) * d)), l && (A = Math.round((s - T) * d)), q = x, P = A, K("neodrag", ue), J();
  }
  return { destroy: () => {
    const n = removeEventListener;
    n("pointerdown", te, !1), n("pointerup", oe, !1), n("pointermove", ae, !1);
  }, update: (n) => {
    var s, d;
    m = n.axis || "both", $ = n.disabled ?? !1, B = n.ignoreMultitouch ?? !1, S = n.handle, c = n.bounds, b = n.recomputeBounds ?? Q, D = n.cancel, N = n.applyUserSelectHack ?? !0, H = n.grid, f = n.gpuAcceleration ?? !0, R = n.legacyTranslate ?? !0, M = n.transform;
    const a = v.contains(g);
    v.remove(E, g), E = n.defaultClass ?? "neodrag", i = n.defaultClassDragging ?? "neodrag-dragging", g = n.defaultClassDragged ?? "neodrag-dragged", v.add(E), a && v.add(g), ge && (q = x = ((s = n.position) == null ? void 0 : s.x) ?? x, P = A = ((d = n.position) == null ? void 0 : d.y) ?? A, J());
  } };
}, de = (e, t, o) => Math.min(Math.max(e, t), o), V = (e) => typeof e == "string", me = ([e, t], o, l) => {
  const c = (m, f) => f === 0 ? 0 : Math.ceil(m / f) * f;
  return [c(o, e), c(l, t)];
}, le = (e, t) => e.some((o) => t.some((l) => o.contains(l)));
function Z(e, t) {
  if (e === void 0)
    return;
  if (_(e))
    return e.getBoundingClientRect();
  if (typeof e == "object") {
    const { top: l = 0, left: c = 0, right: m = 0, bottom: f = 0 } = e;
    return { top: l, right: window.innerWidth - m, bottom: window.innerHeight - f, left: c };
  }
  if (e === "parent")
    return t.parentNode.getBoundingClientRect();
  const o = document.querySelector(e);
  if (o === null)
    throw new Error("The selector provided for bound doesn't exists in the document.");
  return o.getBoundingClientRect();
}
var z = (e, t, o) => e.style.setProperty(t, o), _ = (e) => e instanceof HTMLElement;
function I(e) {
  return e == null || typeof e == "string" || e instanceof HTMLElement ? e : "current" in e ? e.current : Array.isArray(e) ? e.map((t) => t instanceof HTMLElement ? t : t.current) : void 0;
}
function we(e, t = {}) {
  const o = pe(), [l, c] = ie(!1), [m, f] = ie();
  let { onDragStart: R, onDrag: M, onDragEnd: N, handle: $, cancel: B } = t, b = I($), H = I(B);
  function u(i, g) {
    f(i), g == null || g(i);
  }
  function D(i) {
    c(!0), u(i, R);
  }
  function S(i) {
    u(i, M);
  }
  function E(i) {
    c(!1), u(i, N);
  }
  return se(() => {
    if (typeof window > "u")
      return;
    const i = e.current;
    if (!i)
      return;
    ({ onDragStart: R, onDrag: M, onDragEnd: N } = t);
    const { update: g, destroy: U } = he(i, { ...t, handle: b, cancel: H, onDragStart: D, onDrag: S, onDragEnd: E });
    return o.current = g, U;
  }, []), se(() => {
    var i;
    (i = o.current) == null || i.call(o, { ...t, handle: I($), cancel: I(B), onDragStart: D, onDrag: S, onDragEnd: E });
  }, [t]), { isDragging: l, dragState: m };
}
export {
  we as useDraggable
};
//# sourceMappingURL=annotorious-react.es13.js.map
