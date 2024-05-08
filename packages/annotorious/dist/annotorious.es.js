var nn = Object.defineProperty;
var on = (e, t, n) => t in e ? nn(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Ke = (e, t, n) => (on(e, typeof t != "symbol" ? t + "" : t, n), n);
function F() {
}
function nt(e, t) {
  for (const n in t)
    e[n] = t[n];
  return (
    /** @type {T & S} */
    e
  );
}
function Ut(e) {
  return e();
}
function dt() {
  return /* @__PURE__ */ Object.create(null);
}
function ce(e) {
  e.forEach(Ut);
}
function K(e) {
  return typeof e == "function";
}
function J(e, t) {
  return e != e ? t == t : e !== t || e && typeof e == "object" || typeof e == "function";
}
function sn(e) {
  return Object.keys(e).length === 0;
}
function Vt(e, ...t) {
  if (e == null) {
    for (const o of t)
      o(void 0);
    return F;
  }
  const n = e.subscribe(...t);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
function ht(e, t, n) {
  e.$$.on_destroy.push(Vt(t, n));
}
function rn(e, t, n, o) {
  if (e) {
    const i = Gt(e, t, n, o);
    return e[0](i);
  }
}
function Gt(e, t, n, o) {
  return e[1] && o ? nt(n.ctx.slice(), e[1](o(t))) : n.ctx;
}
function ln(e, t, n, o) {
  if (e[2] && o) {
    const i = e[2](o(n));
    if (t.dirty === void 0)
      return i;
    if (typeof i == "object") {
      const s = [], r = Math.max(t.dirty.length, i.length);
      for (let l = 0; l < r; l += 1)
        s[l] = t.dirty[l] | i[l];
      return s;
    }
    return t.dirty | i;
  }
  return t.dirty;
}
function an(e, t, n, o, i, s) {
  if (i) {
    const r = Gt(t, n, o, s);
    e.p(r, i);
  }
}
function cn(e) {
  if (e.ctx.length > 32) {
    const t = [], n = e.ctx.length / 32;
    for (let o = 0; o < n; o++)
      t[o] = -1;
    return t;
  }
  return -1;
}
function gt(e) {
  const t = {};
  for (const n in e)
    n[0] !== "$" && (t[n] = e[n]);
  return t;
}
function ze(e) {
  return e ?? "";
}
const fn = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : (
  // @ts-ignore Node typings have this
  global
);
function re(e, t) {
  e.appendChild(t);
}
function O(e, t, n) {
  e.insertBefore(t, n || null);
}
function k(e) {
  e.parentNode && e.parentNode.removeChild(e);
}
function rt(e, t) {
  for (let n = 0; n < e.length; n += 1)
    e[n] && e[n].d(t);
}
function C(e) {
  return document.createElementNS("http://www.w3.org/2000/svg", e);
}
function zt(e) {
  return document.createTextNode(e);
}
function ie() {
  return zt(" ");
}
function fe() {
  return zt("");
}
function j(e, t, n, o) {
  return e.addEventListener(t, n, o), () => e.removeEventListener(t, n, o);
}
function h(e, t, n) {
  n == null ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n);
}
function un(e) {
  return Array.from(e.childNodes);
}
function Ee(e, t, n) {
  e.classList.toggle(t, !!n);
}
function dn(e, t, { bubbles: n = !1, cancelable: o = !1 } = {}) {
  return new CustomEvent(e, { detail: t, bubbles: n, cancelable: o });
}
let Pe;
function Ie(e) {
  Pe = e;
}
function Ht() {
  if (!Pe)
    throw new Error("Function called outside component initialization");
  return Pe;
}
function Ye(e) {
  Ht().$$.on_mount.push(e);
}
function Te() {
  const e = Ht();
  return (t, n, { cancelable: o = !1 } = {}) => {
    const i = e.$$.callbacks[t];
    if (i) {
      const s = dn(
        /** @type {string} */
        t,
        n,
        { cancelable: o }
      );
      return i.slice().forEach((r) => {
        r.call(e, s);
      }), !s.defaultPrevented;
    }
    return !0;
  };
}
function de(e, t) {
  const n = e.$$.callbacks[t.type];
  n && n.slice().forEach((o) => o.call(this, t));
}
const we = [], He = [];
let Ae = [];
const mt = [], hn = /* @__PURE__ */ Promise.resolve();
let ot = !1;
function gn() {
  ot || (ot = !0, hn.then(Ft));
}
function it(e) {
  Ae.push(e);
}
const We = /* @__PURE__ */ new Set();
let me = 0;
function Ft() {
  if (me !== 0)
    return;
  const e = Pe;
  do {
    try {
      for (; me < we.length; ) {
        const t = we[me];
        me++, Ie(t), mn(t.$$);
      }
    } catch (t) {
      throw we.length = 0, me = 0, t;
    }
    for (Ie(null), we.length = 0, me = 0; He.length; )
      He.pop()();
    for (let t = 0; t < Ae.length; t += 1) {
      const n = Ae[t];
      We.has(n) || (We.add(n), n());
    }
    Ae.length = 0;
  } while (we.length);
  for (; mt.length; )
    mt.pop()();
  ot = !1, We.clear(), Ie(e);
}
function mn(e) {
  if (e.fragment !== null) {
    e.update(), ce(e.before_update);
    const t = e.dirty;
    e.dirty = [-1], e.fragment && e.fragment.p(e.ctx, t), e.after_update.forEach(it);
  }
}
function pn(e) {
  const t = [], n = [];
  Ae.forEach((o) => e.indexOf(o) === -1 ? t.push(o) : n.push(o)), n.forEach((o) => o()), Ae = t;
}
const Ge = /* @__PURE__ */ new Set();
let he;
function le() {
  he = {
    r: 0,
    c: [],
    p: he
    // parent group
  };
}
function ae() {
  he.r || ce(he.c), he = he.p;
}
function I(e, t) {
  e && e.i && (Ge.delete(e), e.i(t));
}
function X(e, t, n, o) {
  if (e && e.o) {
    if (Ge.has(e))
      return;
    Ge.add(e), he.c.push(() => {
      Ge.delete(e), o && (n && e.d(1), o());
    }), e.o(t);
  } else
    o && o();
}
function Se(e) {
  return (e == null ? void 0 : e.length) !== void 0 ? e : Array.from(e);
}
function te(e) {
  e && e.c();
}
function $(e, t, n) {
  const { fragment: o, after_update: i } = e.$$;
  o && o.m(t, n), it(() => {
    const s = e.$$.on_mount.map(Ut).filter(K);
    e.$$.on_destroy ? e.$$.on_destroy.push(...s) : ce(s), e.$$.on_mount = [];
  }), i.forEach(it);
}
function ee(e, t) {
  const n = e.$$;
  n.fragment !== null && (pn(n.after_update), ce(n.on_destroy), n.fragment && n.fragment.d(t), n.on_destroy = n.fragment = null, n.ctx = []);
}
function yn(e, t) {
  e.$$.dirty[0] === -1 && (we.push(e), gn(), e.$$.dirty.fill(0)), e.$$.dirty[t / 31 | 0] |= 1 << t % 31;
}
function ne(e, t, n, o, i, s, r = null, l = [-1]) {
  const a = Pe;
  Ie(e);
  const c = e.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: s,
    update: F,
    not_equal: i,
    bound: dt(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(t.context || (a ? a.$$.context : [])),
    // everything else
    callbacks: dt(),
    dirty: l,
    skip_bound: !1,
    root: t.target || a.$$.root
  };
  r && r(c.root);
  let u = !1;
  if (c.ctx = n ? n(e, t.props || {}, (f, d, ...g) => {
    const m = g.length ? g[0] : d;
    return c.ctx && i(c.ctx[f], c.ctx[f] = m) && (!c.skip_bound && c.bound[f] && c.bound[f](m), u && yn(e, f)), d;
  }) : [], c.update(), u = !0, ce(c.before_update), c.fragment = o ? o(c.ctx) : !1, t.target) {
    if (t.hydrate) {
      const f = un(t.target);
      c.fragment && c.fragment.l(f), f.forEach(k);
    } else
      c.fragment && c.fragment.c();
    t.intro && I(e.$$.fragment), $(e, t.target, t.anchor), Ft();
  }
  Ie(a);
}
class oe {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    Ke(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    Ke(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    ee(this, 1), this.$destroy = F;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(t, n) {
    if (!K(n))
      return F;
    const o = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return o.push(n), () => {
      const i = o.indexOf(n);
      i !== -1 && o.splice(i, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(t) {
    this.$$set && !sn(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
}
const _n = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(_n);
var q = /* @__PURE__ */ ((e) => (e.ELLIPSE = "ELLIPSE", e.POLYGON = "POLYGON", e.RECTANGLE = "RECTANGLE", e))(q || {});
const lt = {}, at = (e, t) => lt[e] = t, st = (e) => lt[e.type].area(e), wn = (e, t, n) => lt[e.type].intersects(e, t, n), Fe = (e) => {
  let t = 1 / 0, n = 1 / 0, o = -1 / 0, i = -1 / 0;
  return e.forEach(([s, r]) => {
    t = Math.min(t, s), n = Math.min(n, r), o = Math.max(o, s), i = Math.max(i, r);
  }), { minX: t, minY: n, maxX: o, maxY: i };
}, bn = {
  area: (e) => Math.PI * e.geometry.rx * e.geometry.ry,
  intersects: (e, t, n) => {
    const { cx: o, cy: i, rx: s, ry: r } = e.geometry, l = 0, a = Math.cos(l), c = Math.sin(l), u = t - o, f = n - i, d = a * u + c * f, g = c * u - a * f;
    return d * d / (s * s) + g * g / (r * r) <= 1;
  }
};
at(q.ELLIPSE, bn);
const En = {
  area: (e) => {
    const { points: t } = e.geometry;
    let n = 0, o = t.length - 1;
    for (let i = 0; i < t.length; i++)
      n += (t[o][0] + t[i][0]) * (t[o][1] - t[i][1]), o = i;
    return Math.abs(0.5 * n);
  },
  intersects: (e, t, n) => {
    const { points: o } = e.geometry;
    let i = !1;
    for (let s = 0, r = o.length - 1; s < o.length; r = s++) {
      const l = o[s][0], a = o[s][1], c = o[r][0], u = o[r][1];
      a > n != u > n && t < (c - l) * (n - a) / (u - a) + l && (i = !i);
    }
    return i;
  }
};
at(q.POLYGON, En);
const An = {
  area: (e) => e.geometry.w * e.geometry.h,
  intersects: (e, t, n) => t >= e.geometry.x && t <= e.geometry.x + e.geometry.w && n >= e.geometry.y && n <= e.geometry.y + e.geometry.h
};
at(q.RECTANGLE, An);
const Sn = (e, t = !1) => {
  const n = typeof e == "string" ? e : e.value, o = /^(xywh)=(pixel|percent)?:?(.+?),(.+?),(.+?),(.+)*/g, i = [...n.matchAll(o)][0], [s, r, l, a, c, u, f] = i;
  if (r !== "xywh")
    throw new Error("Unsupported MediaFragment: " + n);
  if (l && l !== "pixel")
    throw new Error(`Unsupported MediaFragment unit: ${l}`);
  const [d, g, m, y] = [a, c, u, f].map(parseFloat);
  return {
    type: q.RECTANGLE,
    geometry: {
      x: d,
      y: g,
      w: m,
      h: y,
      bounds: {
        minX: d,
        minY: t ? g - y : g,
        maxX: d + m,
        maxY: t ? g : g + y
      }
    }
  };
}, Tn = (e) => {
  const { x: t, y: n, w: o, h: i } = e;
  return {
    type: "FragmentSelector",
    conformsTo: "http://www.w3.org/TR/media-frags/",
    value: `xywh=pixel:${t},${n},${o},${i}`
  };
}, jt = "http://www.w3.org/2000/svg", pt = (e) => {
  const t = (o) => {
    Array.from(o.attributes).forEach((i) => {
      i.name.startsWith("on") && o.removeAttribute(i.name);
    });
  }, n = e.getElementsByTagName("script");
  return Array.from(n).reverse().forEach((o) => o.parentNode.removeChild(o)), Array.from(e.querySelectorAll("*")).forEach(t), e;
}, Mn = (e) => {
  const o = new XMLSerializer().serializeToString(e.documentElement).replace("<svg>", `<svg xmlns="${jt}">`);
  return new DOMParser().parseFromString(o, "image/svg+xml").documentElement;
}, Ln = (e) => {
  const n = new DOMParser().parseFromString(e, "image/svg+xml"), o = n.lookupPrefix(jt), i = n.lookupNamespaceURI(null);
  return o || i ? pt(n).firstChild : pt(Mn(n)).firstChild;
}, vn = (e) => {
  const [t, n, o] = e.match(/(<polygon points=["|'])([^("|')]*)/) || [], i = o.split(" ").map((s) => s.split(",").map(parseFloat));
  return {
    type: q.POLYGON,
    geometry: {
      points: i,
      bounds: Fe(i)
    }
  };
}, kn = (e) => {
  const t = Ln(e), n = parseFloat(t.getAttribute("cx")), o = parseFloat(t.getAttribute("cy")), i = parseFloat(t.getAttribute("rx")), s = parseFloat(t.getAttribute("ry")), r = {
    minX: n - i,
    minY: o - s,
    maxX: n + i,
    maxY: o + s
  };
  return {
    type: q.ELLIPSE,
    geometry: {
      cx: n,
      cy: o,
      rx: i,
      ry: s,
      bounds: r
    }
  };
}, On = (e) => {
  const t = typeof e == "string" ? e : e.value;
  if (t.includes("<polygon points="))
    return vn(t);
  if (t.includes("<ellipse "))
    return kn(t);
  throw "Unsupported SVG shape: " + t;
}, Bn = (e) => {
  let t;
  if (e.type === q.POLYGON) {
    const n = e.geometry, { points: o } = n;
    t = `<svg><polygon points="${o.map((i) => i.join(",")).join(" ")}" /></svg>`;
  } else if (e.type === q.ELLIPSE) {
    const n = e.geometry;
    t = `<svg><ellipse cx="${n.cx}" cy="${n.cy}" rx="${n.rx}" ry="${n.ry}" /></svg>`;
  }
  if (t)
    return { type: "SvgSelector", value: t };
  throw `Unsupported shape type: ${e.type}`;
};
let Ne;
const In = new Uint8Array(16);
function Pn() {
  if (!Ne && (Ne = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Ne))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Ne(In);
}
const W = [];
for (let e = 0; e < 256; ++e)
  W.push((e + 256).toString(16).slice(1));
function Yn(e, t = 0) {
  return W[e[t + 0]] + W[e[t + 1]] + W[e[t + 2]] + W[e[t + 3]] + "-" + W[e[t + 4]] + W[e[t + 5]] + "-" + W[e[t + 6]] + W[e[t + 7]] + "-" + W[e[t + 8]] + W[e[t + 9]] + "-" + W[e[t + 10]] + W[e[t + 11]] + W[e[t + 12]] + W[e[t + 13]] + W[e[t + 14]] + W[e[t + 15]];
}
const Dn = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), yt = {
  randomUUID: Dn
};
function qt(e, t, n) {
  if (yt.randomUUID && !t && !e)
    return yt.randomUUID();
  e = e || {};
  const o = e.random || (e.rng || Pn)();
  return o[6] = o[6] & 15 | 64, o[8] = o[8] & 63 | 128, Yn(o);
}
var _t = Object.prototype.hasOwnProperty;
function ge(e, t) {
  var n, o;
  if (e === t)
    return !0;
  if (e && t && (n = e.constructor) === t.constructor) {
    if (n === Date)
      return e.getTime() === t.getTime();
    if (n === RegExp)
      return e.toString() === t.toString();
    if (n === Array) {
      if ((o = e.length) === t.length)
        for (; o-- && ge(e[o], t[o]); )
          ;
      return o === -1;
    }
    if (!n || typeof e == "object") {
      o = 0;
      for (n in e)
        if (_t.call(e, n) && ++o && !_t.call(t, n) || !(n in t) || !ge(e[n], t[n]))
          return !1;
      return Object.keys(t).length === o;
    }
  }
  return e !== e && t !== t;
}
function Je() {
}
function Xn(e, t) {
  return e != e ? t == t : e !== t || e && typeof e == "object" || typeof e == "function";
}
const pe = [];
function ct(e, t = Je) {
  let n;
  const o = /* @__PURE__ */ new Set();
  function i(l) {
    if (Xn(e, l) && (e = l, n)) {
      const a = !pe.length;
      for (const c of o)
        c[1](), pe.push(c, e);
      if (a) {
        for (let c = 0; c < pe.length; c += 2)
          pe[c][0](pe[c + 1]);
        pe.length = 0;
      }
    }
  }
  function s(l) {
    i(l(e));
  }
  function r(l, a = Je) {
    const c = [l, a];
    return o.add(c), o.size === 1 && (n = t(i, s) || Je), l(e), () => {
      o.delete(c), o.size === 0 && n && (n(), n = null);
    };
  }
  return { set: i, update: s, subscribe: r };
}
const Cn = (e) => {
  const { subscribe: t, set: n } = ct();
  let o;
  return t((i) => o = i), e.observe(({ changes: i }) => {
    if (o) {
      (i.deleted || []).some((r) => r.id === o) && n(void 0);
      const s = (i.updated || []).find(({ oldValue: r }) => r.id === o);
      s && n(s.newValue.id);
    }
  }), {
    get current() {
      return o;
    },
    subscribe: t,
    set: n
  };
};
var Kt = /* @__PURE__ */ ((e) => (e.EDIT = "EDIT", e.SELECT = "SELECT", e.NONE = "NONE", e))(Kt || {});
const Qe = { selected: [] }, Rn = (e, t = "EDIT") => {
  const { subscribe: n, set: o } = ct(Qe);
  let i = Qe;
  n((f) => i = f);
  const s = () => o(Qe), r = () => {
    var f;
    return ((f = i.selected) == null ? void 0 : f.length) === 0;
  }, l = (f) => {
    if (i.selected.length === 0)
      return !1;
    const d = typeof f == "string" ? f : f.id;
    return i.selected.some((g) => g.id === d);
  }, a = (f, d) => {
    const g = e.getAnnotation(f);
    if (g) {
      const m = Nn(g, t);
      o(m === "EDIT" ? { selected: [{ id: f, editable: !0 }], pointerEvent: d } : m === "SELECT" ? { selected: [{ id: f }], pointerEvent: d } : { selected: [], pointerEvent: d });
    } else
      console.warn("Invalid selection: " + f);
  }, c = (f, d = !0) => {
    const g = Array.isArray(f) ? f : [f], m = g.map((y) => e.getAnnotation(y)).filter(Boolean);
    o({ selected: m.map(({ id: y }) => ({ id: y, editable: d })) }), m.length !== g.length && console.warn("Invalid selection", f);
  }, u = (f) => {
    if (i.selected.length === 0)
      return !1;
    const { selected: d } = i;
    d.filter(({ id: g }) => f.includes(g)).length > 0 && o({ selected: d.filter(({ id: g }) => !f.includes(g)) });
  };
  return e.observe(({ changes: f }) => u((f.deleted || []).map((d) => d.id))), {
    clear: s,
    clickSelect: a,
    get selected() {
      return i ? [...i.selected] : null;
    },
    get pointerEvent() {
      return i ? i.pointerEvent : null;
    },
    isEmpty: r,
    isSelected: l,
    setSelected: c,
    subscribe: n
  };
}, Nn = (e, t) => typeof t == "function" ? t(e) || "EDIT" : t || "EDIT", Un = [];
for (let e = 0; e < 256; ++e)
  Un.push((e + 256).toString(16).slice(1));
typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const Vn = (e, t) => {
  const n = new Set(e.bodies.map((o) => o.id));
  return t.bodies.filter((o) => !n.has(o.id));
}, Gn = (e, t) => {
  const n = new Set(t.bodies.map((o) => o.id));
  return e.bodies.filter((o) => !n.has(o.id));
}, zn = (e, t) => t.bodies.map((n) => {
  const o = e.bodies.find((i) => i.id === n.id);
  return { newBody: n, oldBody: o && !ge(o, n) ? o : void 0 };
}).filter(({ oldBody: n }) => n).map(({ oldBody: n, newBody: o }) => ({ oldBody: n, newBody: o })), Hn = (e, t) => !ge(e.target, t.target), Wt = (e, t) => {
  const n = Vn(e, t), o = Gn(e, t), i = zn(e, t);
  return {
    oldValue: e,
    newValue: t,
    bodiesCreated: n.length > 0 ? n : void 0,
    bodiesDeleted: o.length > 0 ? o : void 0,
    bodiesUpdated: i.length > 0 ? i : void 0,
    targetUpdated: Hn(e, t) ? { oldTarget: e.target, newTarget: t.target } : void 0
  };
};
var H = /* @__PURE__ */ ((e) => (e.LOCAL = "LOCAL", e.REMOTE = "REMOTE", e))(H || {});
const Fn = (e, t) => {
  var n, o;
  const { changes: i, origin: s } = t;
  if (!(!e.options.origin || e.options.origin === s))
    return !1;
  if (e.options.ignore) {
    const { ignore: r } = e.options, l = (a) => a && a.length > 0;
    if (!(l(i.created) || l(i.deleted))) {
      const a = (n = i.updated) == null ? void 0 : n.some((u) => l(u.bodiesCreated) || l(u.bodiesDeleted) || l(u.bodiesUpdated)), c = (o = i.updated) == null ? void 0 : o.some((u) => u.targetUpdated);
      if (r === "BODY_ONLY" && a && !c || r === "TARGET_ONLY" && c && !a)
        return !1;
    }
  }
  if (e.options.annotations) {
    const r = /* @__PURE__ */ new Set([
      ...(i.created || []).map((l) => l.id),
      ...(i.deleted || []).map((l) => l.id),
      ...(i.updated || []).map(({ oldValue: l }) => l.id)
    ]);
    return !!(Array.isArray(e.options.annotations) ? e.options.annotations : [e.options.annotations]).find((l) => r.has(l));
  } else
    return !0;
}, jn = (e, t) => {
  const n = new Set((e.created || []).map((f) => f.id)), o = new Set((e.updated || []).map(({ newValue: f }) => f.id)), i = new Set((t.created || []).map((f) => f.id)), s = new Set((t.deleted || []).map((f) => f.id)), r = new Set((t.updated || []).map(({ oldValue: f }) => f.id)), l = new Set((t.updated || []).filter(({ oldValue: f }) => n.has(f.id) || o.has(f.id)).map(({ oldValue: f }) => f.id)), a = [
    ...(e.created || []).filter((f) => !s.has(f.id)).map((f) => r.has(f.id) ? t.updated.find(({ oldValue: d }) => d.id === f.id).newValue : f),
    ...t.created || []
  ], c = [
    ...(e.deleted || []).filter((f) => !i.has(f.id)),
    ...(t.deleted || []).filter((f) => !n.has(f.id))
  ], u = [
    ...(e.updated || []).filter(({ newValue: f }) => !s.has(f.id)).map((f) => {
      const { oldValue: d, newValue: g } = f;
      if (r.has(g.id)) {
        const m = t.updated.find((y) => y.oldValue.id === g.id).newValue;
        return Wt(d, m);
      } else
        return f;
    }),
    ...(t.updated || []).filter(({ oldValue: f }) => !l.has(f.id))
  ];
  return { created: a, deleted: c, updated: u };
}, qn = (e) => e.id !== void 0, Kn = () => {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), n = [], o = (w, S = {}) => n.push({ onChange: w, options: S }), i = (w) => {
    const S = n.findIndex((T) => T.onChange == w);
    S > -1 && n.splice(S, 1);
  }, s = (w, S) => {
    const T = {
      origin: w,
      changes: {
        created: S.created || [],
        updated: S.updated || [],
        deleted: S.deleted || []
      },
      state: [...e.values()]
    };
    n.forEach((M) => {
      Fn(M, T) && M.onChange(T);
    });
  }, r = (w, S = H.LOCAL) => {
    if (e.get(w.id))
      throw Error(`Cannot add annotation ${w.id} - exists already`);
    e.set(w.id, w), w.bodies.forEach((T) => t.set(T.id, w.id)), s(S, { created: [w] });
  }, l = (w, S) => {
    const T = typeof w == "string" ? S : w, M = typeof w == "string" ? w : w.id, P = e.get(M);
    if (P) {
      const G = Wt(P, T);
      return M === T.id ? e.set(M, T) : (e.delete(M), e.set(T.id, T)), P.bodies.forEach((x) => t.delete(x.id)), T.bodies.forEach((x) => t.set(x.id, T.id)), G;
    } else
      console.warn(`Cannot update annotation ${M} - does not exist`);
  }, a = (w, S = H.LOCAL, T = H.LOCAL) => {
    const M = qn(S) ? T : S, P = l(w, S);
    P && s(M, { updated: [P] });
  }, c = (w, S = H.LOCAL) => {
    const T = w.reduce((M, P) => {
      const G = l(P);
      return G ? [...M, G] : M;
    }, []);
    T.length > 0 && s(S, { updated: T });
  }, u = (w, S = H.LOCAL) => {
    const T = e.get(w.annotation);
    if (T) {
      const M = {
        ...T,
        bodies: [...T.bodies, w]
      };
      e.set(T.id, M), t.set(w.id, M.id), s(S, { updated: [{
        oldValue: T,
        newValue: M,
        bodiesCreated: [w]
      }] });
    } else
      console.warn(`Attempt to add body to missing annotation: ${w.annotation}`);
  }, f = () => [...e.values()], d = (w = H.LOCAL) => {
    const S = [...e.values()];
    e.clear(), t.clear(), s(w, { deleted: S });
  }, g = (w, S = !0, T = H.LOCAL) => {
    if (S) {
      const M = [...e.values()];
      e.clear(), t.clear(), w.forEach((P) => {
        e.set(P.id, P), P.bodies.forEach((G) => t.set(G.id, P.id));
      }), s(T, { created: w, deleted: M });
    } else {
      const M = w.reduce((P, G) => {
        const x = e.get(G.id);
        return x ? [...P, x] : P;
      }, []);
      if (M.length > 0)
        throw Error(`Bulk insert would overwrite the following annotations: ${M.map((P) => P.id).join(", ")}`);
      w.forEach((P) => {
        e.set(P.id, P), P.bodies.forEach((G) => t.set(G.id, P.id));
      }), s(T, { created: w });
    }
  }, m = (w) => {
    const S = typeof w == "string" ? w : w.id, T = e.get(S);
    if (T)
      return e.delete(S), T.bodies.forEach((M) => t.delete(M.id)), T;
    console.warn(`Attempt to delete missing annotation: ${S}`);
  }, y = (w, S = H.LOCAL) => {
    const T = m(w);
    T && s(S, { deleted: [T] });
  }, b = (w, S = H.LOCAL) => {
    const T = w.reduce((M, P) => {
      const G = m(P);
      return G ? [...M, G] : M;
    }, []);
    T.length > 0 && s(S, { deleted: T });
  }, p = (w) => {
    const S = e.get(w.annotation);
    if (S) {
      const T = S.bodies.find((M) => M.id === w.id);
      if (T) {
        t.delete(T.id);
        const M = {
          ...S,
          bodies: S.bodies.filter((P) => P.id !== w.id)
        };
        return e.set(S.id, M), {
          oldValue: S,
          newValue: M,
          bodiesDeleted: [T]
        };
      } else
        console.warn(`Attempt to delete missing body ${w.id} from annotation ${w.annotation}`);
    } else
      console.warn(`Attempt to delete body from missing annotation ${w.annotation}`);
  }, A = (w, S = H.LOCAL) => {
    const T = p(w);
    T && s(S, { updated: [T] });
  }, _ = (w, S = H.LOCAL) => {
    const T = w.map((M) => p(M)).filter(Boolean);
    T.length > 0 && s(S, { updated: T });
  }, E = (w) => {
    const S = e.get(w);
    return S ? { ...S } : void 0;
  }, B = (w) => {
    const S = t.get(w);
    if (S) {
      const T = E(S).bodies.find((M) => M.id === w);
      if (T)
        return T;
      console.error(`Store integrity error: body ${w} in index, but not in annotation`);
    } else
      console.warn(`Attempt to retrieve missing body: ${w}`);
  }, V = (w, S) => {
    if (w.annotation !== S.annotation)
      throw "Annotation integrity violation: annotation ID must be the same when updating bodies";
    const T = e.get(w.annotation);
    if (T) {
      const M = T.bodies.find((G) => G.id === w.id), P = {
        ...T,
        bodies: T.bodies.map((G) => G.id === M.id ? S : G)
      };
      return e.set(T.id, P), M.id !== S.id && (t.delete(M.id), t.set(S.id, P.id)), {
        oldValue: T,
        newValue: P,
        bodiesUpdated: [{ oldBody: M, newBody: S }]
      };
    } else
      console.warn(`Attempt to add body to missing annotation ${w.annotation}`);
  }, U = (w, S, T = H.LOCAL) => {
    const M = V(w, S);
    M && s(T, { updated: [M] });
  }, R = (w, S = H.LOCAL) => {
    const T = w.map((M) => V({ id: M.id, annotation: M.annotation }, M)).filter(Boolean);
    s(S, { updated: T });
  }, Y = (w) => {
    const S = e.get(w.annotation);
    if (S) {
      const T = {
        ...S,
        target: {
          ...S.target,
          ...w
        }
      };
      return e.set(S.id, T), {
        oldValue: S,
        newValue: T,
        targetUpdated: {
          oldTarget: S.target,
          newTarget: w
        }
      };
    } else
      console.warn(`Attempt to update target on missing annotation: ${w.annotation}`);
  };
  return {
    addAnnotation: r,
    addBody: u,
    all: f,
    bulkAddAnnotation: g,
    bulkDeleteAnnotation: b,
    bulkDeleteBodies: _,
    bulkUpdateAnnotation: c,
    bulkUpdateBodies: R,
    bulkUpdateTargets: (w, S = H.LOCAL) => {
      const T = w.map((M) => Y(M)).filter(Boolean);
      T.length > 0 && s(S, { updated: T });
    },
    clear: d,
    deleteAnnotation: y,
    deleteBody: A,
    getAnnotation: E,
    getBody: B,
    observe: o,
    unobserve: i,
    updateAnnotation: a,
    updateBody: U,
    updateTarget: (w, S = H.LOCAL) => {
      const T = Y(w);
      T && s(S, { updated: [T] });
    }
  };
}, Wn = (e) => ({
  ...e,
  subscribe: (t) => {
    const n = (o) => t(o.state);
    return e.observe(n), t(e.all()), () => e.unobserve(n);
  }
});
let Jn = () => ({
  emit(e, ...t) {
    for (let n = 0, o = this.events[e] || [], i = o.length; n < i; n++)
      o[n](...t);
  },
  events: {},
  on(e, t) {
    var n;
    return ((n = this.events)[e] || (n[e] = [])).push(t), () => {
      var o;
      this.events[e] = (o = this.events[e]) == null ? void 0 : o.filter((i) => t !== i);
    };
  }
});
const Qn = 250, Zn = (e) => {
  const t = Jn(), n = [];
  let o = -1, i = !1, s = 0;
  const r = (g) => {
    if (!i) {
      const { changes: m } = g, y = performance.now();
      if (y - s > Qn)
        n.splice(o + 1), n.push(m), o = n.length - 1;
      else {
        const b = n.length - 1;
        n[b] = jn(n[b], m);
      }
      s = y;
    }
    i = !1;
  };
  e.observe(r, { origin: H.LOCAL });
  const l = (g) => g && g.length > 0 && e.bulkDeleteAnnotation(g), a = (g) => g && g.length > 0 && e.bulkAddAnnotation(g, !1), c = (g) => g && g.length > 0 && e.bulkUpdateAnnotation(g.map(({ oldValue: m }) => m)), u = (g) => g && g.length > 0 && e.bulkUpdateAnnotation(g.map(({ newValue: m }) => m)), f = (g) => g && g.length > 0 && e.bulkAddAnnotation(g, !1), d = (g) => g && g.length > 0 && e.bulkDeleteAnnotation(g);
  return {
    canRedo: () => n.length - 1 > o,
    canUndo: () => o > -1,
    destroy: () => e.unobserve(r),
    on: (g, m) => t.on(g, m),
    redo: () => {
      if (n.length - 1 > o) {
        i = !0;
        const { created: g, updated: m, deleted: y } = n[o + 1];
        a(g), u(m), d(y), t.emit("redo", n[o + 1]), o += 1;
      }
    },
    undo: () => {
      if (o > -1) {
        i = !0;
        const { created: g, updated: m, deleted: y } = n[o];
        l(g), c(m), f(y), t.emit("undo", n[o]), o -= 1;
      }
    }
  };
}, xn = () => {
  const { subscribe: e, set: t } = ct([]);
  return {
    subscribe: e,
    set: t
  };
}, $n = (e, t, n, o) => {
  const { store: i, selection: s, hover: r, viewport: l } = e, a = /* @__PURE__ */ new Map();
  let c = [], u, f;
  const d = (p, A) => {
    a.has(p) ? a.get(p).push(A) : a.set(p, [A]);
  }, g = (p, A) => {
    const _ = a.get(p);
    _ && _.indexOf(A) > 0 && _.splice(_.indexOf(A), 1);
  }, m = (p, A, _) => {
    a.has(p) && setTimeout(() => {
      a.get(p).forEach((E) => {
        if (n) {
          const B = Array.isArray(A) ? A.map((U) => n.serialize(U)) : n.serialize(A), V = _ ? _ instanceof PointerEvent ? _ : n.serialize(_) : void 0;
          E(B, V);
        } else
          E(A, _);
      });
    }, 1);
  }, y = () => {
    const { selected: p } = s, A = (p || []).map(({ id: _ }) => i.getAnnotation(_));
    A.forEach((_) => {
      const E = c.find((B) => B.id === _.id);
      (!E || !ge(E, _)) && m("updateAnnotation", _, E);
    }), c = c.map((_) => A.find(({ id: B }) => B === _.id) || _);
  };
  s.subscribe(({ selected: p }) => {
    if (!(c.length === 0 && p.length === 0)) {
      if (c.length === 0 && p.length > 0)
        c = p.map(({ id: A }) => i.getAnnotation(A));
      else if (c.length > 0 && p.length === 0)
        c.forEach((A) => {
          const _ = i.getAnnotation(A.id);
          _ && !ge(_, A) && m("updateAnnotation", _, A);
        }), c = [];
      else {
        const A = new Set(c.map((E) => E.id)), _ = new Set(p.map(({ id: E }) => E));
        c.filter((E) => !_.has(E.id)).forEach((E) => {
          const B = i.getAnnotation(E.id);
          B && !ge(B, E) && m("updateAnnotation", B, E);
        }), c = [
          // Remove annotations that were deselected
          ...c.filter((E) => _.has(E.id)),
          // Add editable annotations that were selected
          ...p.filter(({ id: E }) => !A.has(E)).map(({ id: E }) => i.getAnnotation(E))
        ];
      }
      m("selectionChanged", c);
    }
  }), r.subscribe((p) => {
    !u && p ? m("mouseEnterAnnotation", i.getAnnotation(p)) : u && !p ? m("mouseLeaveAnnotation", i.getAnnotation(u)) : u && p && (m("mouseLeaveAnnotation", i.getAnnotation(u)), m("mouseEnterAnnotation", i.getAnnotation(p))), u = p;
  }), l == null || l.subscribe((p) => m("viewportIntersect", p.map((A) => i.getAnnotation(A)))), i.observe((p) => {
    o && (f && clearTimeout(f), f = setTimeout(y, 1e3));
    const { created: A, deleted: _ } = p.changes;
    (A || []).forEach((E) => m("createAnnotation", E)), (_ || []).forEach((E) => m("deleteAnnotation", E)), (p.changes.updated || []).filter((E) => [
      ...E.bodiesCreated || [],
      ...E.bodiesDeleted || [],
      ...E.bodiesUpdated || []
    ].length > 0).forEach(({ oldValue: E, newValue: B }) => {
      const V = c.find((U) => U.id === E.id) || E;
      c = c.map((U) => U.id === E.id ? B : U), m("updateAnnotation", B, V);
    });
  }, { origin: H.LOCAL }), i.observe((p) => {
    if (c) {
      const A = new Set(c.map((E) => E.id)), _ = (p.changes.updated || []).filter(({ newValue: E }) => A.has(E.id)).map(({ newValue: E }) => E);
      _.length > 0 && (c = c.map((E) => _.find((V) => V.id === E.id) || E));
    }
  }, { origin: H.REMOTE });
  const b = (p) => (A) => {
    const { updated: _ } = A;
    p ? (_ || []).forEach((E) => m("updateAnnotation", E.oldValue, E.newValue)) : (_ || []).forEach((E) => m("updateAnnotation", E.newValue, E.oldValue));
  };
  return t.on("undo", b(!0)), t.on("redo", b(!1)), { on: d, off: g, emit: m };
}, eo = (e) => (t) => t.reduce((n, o) => {
  const { parsed: i, error: s } = e.parse(o);
  return s ? {
    parsed: n.parsed,
    failed: [...n.failed, o]
  } : i ? {
    parsed: [...n.parsed, i],
    failed: n.failed
  } : {
    ...n
  };
}, { parsed: [], failed: [] }), to = (e, t, n) => {
  const { store: o, selection: i } = e, s = (b) => {
    if (n) {
      const { parsed: p, error: A } = n.parse(b);
      p ? o.addAnnotation(p, H.REMOTE) : console.error(A);
    } else
      o.addAnnotation(b, H.REMOTE);
  }, r = () => i.clear(), l = () => o.clear(), a = (b) => {
    const p = o.getAnnotation(b);
    return n && p ? n.serialize(p) : p;
  }, c = () => n ? o.all().map(n.serialize) : o.all(), u = () => {
    var b;
    const p = (((b = i.selected) == null ? void 0 : b.map((A) => A.id)) || []).map((A) => o.getAnnotation(A)).filter(Boolean);
    return n ? p.map(n.serialize) : p;
  }, f = (b, p = !0) => fetch(b).then((A) => A.json()).then((A) => (g(A, p), A)), d = (b) => {
    if (typeof b == "string") {
      const p = o.getAnnotation(b);
      if (o.deleteAnnotation(b), p)
        return n ? n.serialize(p) : p;
    } else {
      const p = n ? n.parse(b).parsed : b;
      if (p)
        return o.deleteAnnotation(p), b;
    }
  }, g = (b, p = !0) => {
    if (n) {
      const { parsed: A, failed: _ } = eo(n)(b);
      _.length > 0 && console.warn(`Discarded ${_.length} invalid annotations`, _), o.bulkAddAnnotation(A, p, H.REMOTE);
    } else
      o.bulkAddAnnotation(b, p, H.REMOTE);
  }, m = (b) => {
    b ? i.setSelected(b) : i.clear();
  }, y = (b) => {
    if (n) {
      const p = n.parse(b).parsed, A = n.serialize(o.getAnnotation(p.id));
      return o.updateAnnotation(p), A;
    } else {
      const p = o.getAnnotation(b.id);
      return o.updateAnnotation(b), p;
    }
  };
  return {
    addAnnotation: s,
    cancelSelected: r,
    canRedo: t.canRedo,
    canUndo: t.canUndo,
    clearAnnotations: l,
    getAnnotationById: a,
    getAnnotations: c,
    getSelected: u,
    loadAnnotations: f,
    redo: t.redo,
    removeAnnotation: d,
    setAnnotations: g,
    setSelected: m,
    undo: t.undo,
    updateAnnotation: y
  };
}, no = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let oo = (e) => crypto.getRandomValues(new Uint8Array(e)), io = (e, t, n) => {
  let o = (2 << Math.log(e.length - 1) / Math.LN2) - 1, i = -~(1.6 * o * t / e.length);
  return (s = t) => {
    let r = "";
    for (; ; ) {
      let l = n(i), a = i;
      for (; a--; )
        if (r += e[l[a] & o] || "", r.length === s)
          return r;
    }
  };
}, so = (e, t = 21) => io(e, t, oo), ro = (e = 21) => {
  let t = "", n = crypto.getRandomValues(new Uint8Array(e));
  for (; e--; )
    t += no[n[e] & 63];
  return t;
};
const lo = () => ({ isGuest: !0, id: so("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_", 20)() }), ao = (e) => {
  const t = JSON.stringify(e);
  let n = 0;
  for (let o = 0, i = t.length; o < i; o++) {
    let s = t.charCodeAt(o);
    n = (n << 5) - n + s, n |= 0;
  }
  return `${n}`;
}, Jt = (e) => e ? typeof e == "object" ? { ...e } : e : void 0, co = (e, t) => (Array.isArray(e) ? e : [e]).map((n) => {
  const { id: o, type: i, purpose: s, value: r, created: l, creator: a, ...c } = n;
  return {
    id: o || `temp-${ao(n)}`,
    annotation: t,
    type: i,
    purpose: s,
    value: r,
    created: l ? new Date(l) : void 0,
    creator: Jt(a),
    ...c
  };
}), fo = (e) => e.map((t) => {
  var n, o;
  const i = { ...t };
  return delete i.annotation, (n = i.id) != null && n.startsWith("temp-") && delete i.id, { ...i, created: (o = i.created) == null ? void 0 : o.toISOString() };
});
ro();
const Yi = (e, t = !1) => ({ parse: (i) => uo(i, t), serialize: (i) => ho(i, e) }), uo = (e, t = !1) => {
  const n = e.id || qt(), {
    creator: o,
    created: i,
    modified: s,
    body: r,
    ...l
  } = e, a = co(r, n), c = Array.isArray(e.target) ? e.target[0] : e.target, u = Array.isArray(c.selector) ? c.selector[0] : c.selector, f = (u == null ? void 0 : u.type) === "FragmentSelector" ? Sn(u, t) : (u == null ? void 0 : u.type) === "SvgSelector" ? On(u) : void 0;
  return f ? {
    parsed: {
      ...l,
      id: n,
      bodies: a,
      target: {
        created: i ? new Date(i) : void 0,
        creator: Jt(o),
        updated: s ? new Date(s) : void 0,
        ...Array.isArray(l.target) ? l.target[0] : l.target,
        annotation: n,
        selector: f
      }
    }
  } : {
    error: Error(`Invalid selector: ${JSON.stringify(u)}`)
  };
}, ho = (e, t) => {
  const {
    selector: n,
    creator: o,
    created: i,
    updated: s,
    updatedBy: r,
    // Excluded from serialization
    ...l
  } = e.target, a = n.type == q.RECTANGLE ? Tn(n.geometry) : Bn(n), c = {
    ...e,
    "@context": "http://www.w3.org/ns/anno.jsonld",
    id: e.id,
    type: "Annotation",
    body: fo(e.bodies),
    created: i == null ? void 0 : i.toISOString(),
    creator: o,
    modified: s == null ? void 0 : s.toISOString(),
    target: {
      ...l,
      source: t,
      selector: a
    }
  };
  return delete c.bodies, "annotation" in c.target && delete c.target.annotation, c;
};
function wt(e, t, n) {
  const o = e.slice();
  return o[10] = t[n], o[12] = n, o;
}
function bt(e) {
  let t, n;
  return t = new ke({
    props: {
      x: (
        /*point*/
        e[10][0]
      ),
      y: (
        /*point*/
        e[10][1]
      ),
      scale: (
        /*viewportScale*/
        e[3]
      )
    }
  }), t.$on("pointerdown", function() {
    K(
      /*grab*/
      e[9](`HANDLE-${/*idx*/
      e[12]}`)
    ) && e[9](`HANDLE-${/*idx*/
    e[12]}`).apply(this, arguments);
  }), {
    c() {
      te(t.$$.fragment);
    },
    m(o, i) {
      $(t, o, i), n = !0;
    },
    p(o, i) {
      e = o;
      const s = {};
      i & /*geom*/
      16 && (s.x = /*point*/
      e[10][0]), i & /*geom*/
      16 && (s.y = /*point*/
      e[10][1]), i & /*viewportScale*/
      8 && (s.scale = /*viewportScale*/
      e[3]), t.$set(s);
    },
    i(o) {
      n || (I(t.$$.fragment, o), n = !0);
    },
    o(o) {
      X(t.$$.fragment, o), n = !1;
    },
    d(o) {
      ee(t, o);
    }
  };
}
function go(e) {
  let t, n, o, i, s, r, l, a, c, u, f, d = Se(
    /*geom*/
    e[4].points
  ), g = [];
  for (let y = 0; y < d.length; y += 1)
    g[y] = bt(wt(e, d, y));
  const m = (y) => X(g[y], 1, 1, () => {
    g[y] = null;
  });
  return {
    c() {
      t = C("polygon"), i = ie(), s = C("polygon"), l = ie();
      for (let y = 0; y < g.length; y += 1)
        g[y].c();
      a = fe(), h(t, "class", "a9s-outer"), h(t, "style", n = /*computedStyle*/
      e[1] ? "display:none;" : void 0), h(t, "points", o = /*geom*/
      e[4].points.map(Et).join(" ")), h(s, "class", "a9s-inner a9s-shape-handle"), h(
        s,
        "style",
        /*computedStyle*/
        e[1]
      ), h(s, "points", r = /*geom*/
      e[4].points.map(At).join(" "));
    },
    m(y, b) {
      O(y, t, b), O(y, i, b), O(y, s, b), O(y, l, b);
      for (let p = 0; p < g.length; p += 1)
        g[p] && g[p].m(y, b);
      O(y, a, b), c = !0, u || (f = [
        j(t, "pointerdown", function() {
          K(
            /*grab*/
            e[9]("SHAPE")
          ) && e[9]("SHAPE").apply(this, arguments);
        }),
        j(s, "pointerdown", function() {
          K(
            /*grab*/
            e[9]("SHAPE")
          ) && e[9]("SHAPE").apply(this, arguments);
        })
      ], u = !0);
    },
    p(y, b) {
      if (e = y, (!c || b & /*computedStyle*/
      2 && n !== (n = /*computedStyle*/
      e[1] ? "display:none;" : void 0)) && h(t, "style", n), (!c || b & /*geom*/
      16 && o !== (o = /*geom*/
      e[4].points.map(Et).join(" "))) && h(t, "points", o), (!c || b & /*computedStyle*/
      2) && h(
        s,
        "style",
        /*computedStyle*/
        e[1]
      ), (!c || b & /*geom*/
      16 && r !== (r = /*geom*/
      e[4].points.map(At).join(" "))) && h(s, "points", r), b & /*geom, viewportScale, grab*/
      536) {
        d = Se(
          /*geom*/
          e[4].points
        );
        let p;
        for (p = 0; p < d.length; p += 1) {
          const A = wt(e, d, p);
          g[p] ? (g[p].p(A, b), I(g[p], 1)) : (g[p] = bt(A), g[p].c(), I(g[p], 1), g[p].m(a.parentNode, a));
        }
        for (le(), p = d.length; p < g.length; p += 1)
          m(p);
        ae();
      }
    },
    i(y) {
      if (!c) {
        for (let b = 0; b < d.length; b += 1)
          I(g[b]);
        c = !0;
      }
    },
    o(y) {
      g = g.filter(Boolean);
      for (let b = 0; b < g.length; b += 1)
        X(g[b]);
      c = !1;
    },
    d(y) {
      y && (k(t), k(i), k(s), k(l), k(a)), rt(g, y), u = !1, ce(f);
    }
  };
}
function mo(e) {
  let t, n;
  return t = new Zt({
    props: {
      shape: (
        /*shape*/
        e[0]
      ),
      transform: (
        /*transform*/
        e[2]
      ),
      editor: (
        /*editor*/
        e[5]
      ),
      $$slots: {
        default: [
          go,
          ({ grab: o }) => ({ 9: o }),
          ({ grab: o }) => o ? 512 : 0
        ]
      },
      $$scope: { ctx: e }
    }
  }), t.$on(
    "change",
    /*change_handler*/
    e[6]
  ), t.$on(
    "grab",
    /*grab_handler*/
    e[7]
  ), t.$on(
    "release",
    /*release_handler*/
    e[8]
  ), {
    c() {
      te(t.$$.fragment);
    },
    m(o, i) {
      $(t, o, i), n = !0;
    },
    p(o, [i]) {
      const s = {};
      i & /*shape*/
      1 && (s.shape = /*shape*/
      o[0]), i & /*transform*/
      4 && (s.transform = /*transform*/
      o[2]), i & /*$$scope, geom, viewportScale, grab, computedStyle*/
      8730 && (s.$$scope = { dirty: i, ctx: o }), t.$set(s);
    },
    i(o) {
      n || (I(t.$$.fragment, o), n = !0);
    },
    o(o) {
      X(t.$$.fragment, o), n = !1;
    },
    d(o) {
      ee(t, o);
    }
  };
}
const Et = (e) => e.join(","), At = (e) => e.join(",");
function po(e, t, n) {
  let o, { shape: i } = t, { computedStyle: s } = t, { transform: r } = t, { viewportScale: l = 1 } = t;
  const a = (d, g, m) => {
    let y;
    const b = d.geometry;
    g === "SHAPE" ? y = b.points.map(([A, _]) => [A + m[0], _ + m[1]]) : y = b.points.map(([A, _], E) => g === `HANDLE-${E}` ? [A + m[0], _ + m[1]] : [A, _]);
    const p = Fe(y);
    return { ...d, geometry: { points: y, bounds: p } };
  };
  function c(d) {
    de.call(this, e, d);
  }
  function u(d) {
    de.call(this, e, d);
  }
  function f(d) {
    de.call(this, e, d);
  }
  return e.$$set = (d) => {
    "shape" in d && n(0, i = d.shape), "computedStyle" in d && n(1, s = d.computedStyle), "transform" in d && n(2, r = d.transform), "viewportScale" in d && n(3, l = d.viewportScale);
  }, e.$$.update = () => {
    e.$$.dirty & /*shape*/
    1 && n(4, o = i.geometry);
  }, [
    i,
    s,
    r,
    l,
    o,
    a,
    c,
    u,
    f
  ];
}
class yo extends oe {
  constructor(t) {
    super(), ne(this, t, po, mo, J, {
      shape: 0,
      computedStyle: 1,
      transform: 2,
      viewportScale: 3
    });
  }
}
const Ze = (e, t) => {
  const n = Math.abs(t[0] - e[0]), o = Math.abs(t[1] - e[1]);
  return Math.sqrt(Math.pow(n, 2) + Math.pow(o, 2));
}, ye = [];
function _o(e, t = F) {
  let n;
  const o = /* @__PURE__ */ new Set();
  function i(l) {
    if (J(e, l) && (e = l, n)) {
      const a = !ye.length;
      for (const c of o)
        c[1](), ye.push(c, e);
      if (a) {
        for (let c = 0; c < ye.length; c += 2)
          ye[c][0](ye[c + 1]);
        ye.length = 0;
      }
    }
  }
  function s(l) {
    i(l(e));
  }
  function r(l, a = F) {
    const c = [l, a];
    return o.add(c), o.size === 1 && (n = t(i, s) || F), l(e), () => {
      o.delete(c), o.size === 0 && n && (n(), n = null);
    };
  }
  return { set: i, update: s, subscribe: r };
}
const wo = (e, t) => {
  const { naturalWidth: n, naturalHeight: o } = e;
  if (!n && !o) {
    const { width: i, height: s } = e;
    t.setAttribute("viewBox", `0 0 ${i} ${s}`), e.addEventListener("load", (r) => {
      const l = r.target;
      t.setAttribute("viewBox", `0 0 ${l.naturalWidth} ${l.naturalHeight}`);
    });
  } else
    t.setAttribute("viewBox", `0 0 ${n} ${o}`);
}, bo = (e, t) => {
  wo(e, t);
  const { subscribe: n, set: o } = _o(1);
  let i;
  return window.ResizeObserver && (i = new ResizeObserver(() => {
    const r = t.getBoundingClientRect(), { width: l, height: a } = t.viewBox.baseVal, c = Math.max(
      r.width / l,
      r.height / a
    );
    o(c);
  }), i.observe(t.parentElement)), { destroy: () => {
    i && i.disconnect();
  }, subscribe: n };
}, Eo = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
function Ao(e) {
  let t, n, o, i, s, r;
  return {
    c() {
      t = C("rect"), h(t, "class", n = ze(`a9s-handle ${/*$$props*/
      e[8].class || ""}`.trim()) + " svelte-1sgkh33"), h(t, "x", o = /*x*/
      e[0] - /*handleSize*/
      e[5] / 2), h(t, "y", i = /*y*/
      e[1] - /*handleSize*/
      e[5] / 2), h(
        t,
        "width",
        /*handleSize*/
        e[5]
      ), h(
        t,
        "height",
        /*handleSize*/
        e[5]
      );
    },
    m(l, a) {
      O(l, t, a), s || (r = j(
        t,
        "pointerdown",
        /*pointerdown_handler_2*/
        e[11]
      ), s = !0);
    },
    p(l, a) {
      a & /*$$props*/
      256 && n !== (n = ze(`a9s-handle ${/*$$props*/
      l[8].class || ""}`.trim()) + " svelte-1sgkh33") && h(t, "class", n), a & /*x, handleSize*/
      33 && o !== (o = /*x*/
      l[0] - /*handleSize*/
      l[5] / 2) && h(t, "x", o), a & /*y, handleSize*/
      34 && i !== (i = /*y*/
      l[1] - /*handleSize*/
      l[5] / 2) && h(t, "y", i), a & /*handleSize*/
      32 && h(
        t,
        "width",
        /*handleSize*/
        l[5]
      ), a & /*handleSize*/
      32 && h(
        t,
        "height",
        /*handleSize*/
        l[5]
      );
    },
    d(l) {
      l && k(t), s = !1, r();
    }
  };
}
function So(e) {
  let t, n, o, i, s, r, l, a, c;
  return {
    c() {
      t = C("g"), n = C("circle"), i = C("rect"), h(
        n,
        "cx",
        /*x*/
        e[0]
      ), h(
        n,
        "cy",
        /*y*/
        e[1]
      ), h(n, "r", o = /*radius*/
      e[3] / /*scale*/
      e[2]), h(n, "class", "a9s-touch-halo svelte-1sgkh33"), Ee(
        n,
        "touched",
        /*touched*/
        e[4]
      ), h(i, "class", s = ze(`a9s-handle ${/*$$props*/
      e[8].class || ""}`.trim()) + " svelte-1sgkh33"), h(i, "x", r = /*x*/
      e[0] - /*handleSize*/
      e[5] / 2), h(i, "y", l = /*y*/
      e[1] - /*handleSize*/
      e[5] / 2), h(
        i,
        "width",
        /*handleSize*/
        e[5]
      ), h(
        i,
        "height",
        /*handleSize*/
        e[5]
      ), h(t, "class", "a9s-touch-handle");
    },
    m(u, f) {
      O(u, t, f), re(t, n), re(t, i), a || (c = [
        j(
          n,
          "pointerdown",
          /*pointerdown_handler*/
          e[10]
        ),
        j(
          n,
          "pointerdown",
          /*onPointerDown*/
          e[6]
        ),
        j(
          n,
          "pointerup",
          /*onPointerUp*/
          e[7]
        ),
        j(
          i,
          "pointerdown",
          /*pointerdown_handler_1*/
          e[9]
        ),
        j(
          i,
          "pointerdown",
          /*onPointerDown*/
          e[6]
        ),
        j(
          i,
          "pointerup",
          /*onPointerUp*/
          e[7]
        )
      ], a = !0);
    },
    p(u, f) {
      f & /*x*/
      1 && h(
        n,
        "cx",
        /*x*/
        u[0]
      ), f & /*y*/
      2 && h(
        n,
        "cy",
        /*y*/
        u[1]
      ), f & /*radius, scale*/
      12 && o !== (o = /*radius*/
      u[3] / /*scale*/
      u[2]) && h(n, "r", o), f & /*touched*/
      16 && Ee(
        n,
        "touched",
        /*touched*/
        u[4]
      ), f & /*$$props*/
      256 && s !== (s = ze(`a9s-handle ${/*$$props*/
      u[8].class || ""}`.trim()) + " svelte-1sgkh33") && h(i, "class", s), f & /*x, handleSize*/
      33 && r !== (r = /*x*/
      u[0] - /*handleSize*/
      u[5] / 2) && h(i, "x", r), f & /*y, handleSize*/
      34 && l !== (l = /*y*/
      u[1] - /*handleSize*/
      u[5] / 2) && h(i, "y", l), f & /*handleSize*/
      32 && h(
        i,
        "width",
        /*handleSize*/
        u[5]
      ), f & /*handleSize*/
      32 && h(
        i,
        "height",
        /*handleSize*/
        u[5]
      );
    },
    d(u) {
      u && k(t), a = !1, ce(c);
    }
  };
}
function To(e) {
  let t;
  function n(s, r) {
    return Eo ? So : Ao;
  }
  let i = n()(e);
  return {
    c() {
      i.c(), t = fe();
    },
    m(s, r) {
      i.m(s, r), O(s, t, r);
    },
    p(s, [r]) {
      i.p(s, r);
    },
    i: F,
    o: F,
    d(s) {
      s && k(t), i.d(s);
    }
  };
}
function Mo(e, t, n) {
  let o, { x: i } = t, { y: s } = t, { scale: r } = t, { radius: l = 30 } = t, a = !1;
  const c = (m) => {
    m.pointerType === "touch" && n(4, a = !0);
  }, u = () => n(4, a = !1);
  function f(m) {
    de.call(this, e, m);
  }
  function d(m) {
    de.call(this, e, m);
  }
  function g(m) {
    de.call(this, e, m);
  }
  return e.$$set = (m) => {
    n(8, t = nt(nt({}, t), gt(m))), "x" in m && n(0, i = m.x), "y" in m && n(1, s = m.y), "scale" in m && n(2, r = m.scale), "radius" in m && n(3, l = m.radius);
  }, e.$$.update = () => {
    e.$$.dirty & /*scale*/
    4 && n(5, o = 10 / r);
  }, t = gt(t), [
    i,
    s,
    r,
    l,
    a,
    o,
    c,
    u,
    t,
    f,
    d,
    g
  ];
}
class ke extends oe {
  constructor(t) {
    super(), ne(this, t, Mo, To, J, { x: 0, y: 1, scale: 2, radius: 3 });
  }
}
function Lo(e) {
  let t, n, o, i, s, r, l, a, c, u, f, d, g, m, y, b, p, A, _, E, B, V, U, R, Y, w, S, T, M, P, G, x, Me, se, Le, v, Q, z, ue, Z, N, qe, ut;
  return se = new ke({
    props: {
      class: "a9s-corner-handle-topleft",
      x: (
        /*geom*/
        e[4].x
      ),
      y: (
        /*geom*/
        e[4].y
      ),
      scale: (
        /*viewportScale*/
        e[3]
      )
    }
  }), se.$on("pointerdown", function() {
    K(
      /*grab*/
      e[9]("TOP_LEFT")
    ) && e[9]("TOP_LEFT").apply(this, arguments);
  }), v = new ke({
    props: {
      class: "a9s-corner-handle-topright",
      x: (
        /*geom*/
        e[4].x + /*geom*/
        e[4].w
      ),
      y: (
        /*geom*/
        e[4].y
      ),
      scale: (
        /*viewportScale*/
        e[3]
      )
    }
  }), v.$on("pointerdown", function() {
    K(
      /*grab*/
      e[9]("TOP_RIGHT")
    ) && e[9]("TOP_RIGHT").apply(this, arguments);
  }), z = new ke({
    props: {
      class: "a9s-corner-handle-bottomright",
      x: (
        /*geom*/
        e[4].x + /*geom*/
        e[4].w
      ),
      y: (
        /*geom*/
        e[4].y + /*geom*/
        e[4].h
      ),
      scale: (
        /*viewportScale*/
        e[3]
      )
    }
  }), z.$on("pointerdown", function() {
    K(
      /*grab*/
      e[9]("BOTTOM_RIGHT")
    ) && e[9]("BOTTOM_RIGHT").apply(this, arguments);
  }), Z = new ke({
    props: {
      class: "a9s-corner-handle-bottomleft",
      x: (
        /*geom*/
        e[4].x
      ),
      y: (
        /*geom*/
        e[4].y + /*geom*/
        e[4].h
      ),
      scale: (
        /*viewportScale*/
        e[3]
      )
    }
  }), Z.$on("pointerdown", function() {
    K(
      /*grab*/
      e[9]("BOTTOM_LEFT")
    ) && e[9]("BOTTOM_LEFT").apply(this, arguments);
  }), {
    c() {
      t = C("rect"), l = ie(), a = C("rect"), g = ie(), m = C("rect"), A = ie(), _ = C("rect"), U = ie(), R = C("rect"), T = ie(), M = C("rect"), Me = ie(), te(se.$$.fragment), Le = ie(), te(v.$$.fragment), Q = ie(), te(z.$$.fragment), ue = ie(), te(Z.$$.fragment), h(t, "class", "a9s-outer"), h(t, "style", n = /*computedStyle*/
      e[1] ? "display:none;" : void 0), h(t, "x", o = /*geom*/
      e[4].x), h(t, "y", i = /*geom*/
      e[4].y), h(t, "width", s = /*geom*/
      e[4].w), h(t, "height", r = /*geom*/
      e[4].h), h(a, "class", "a9s-inner a9s-shape-handle"), h(
        a,
        "style",
        /*computedStyle*/
        e[1]
      ), h(a, "x", c = /*geom*/
      e[4].x), h(a, "y", u = /*geom*/
      e[4].y), h(a, "width", f = /*geom*/
      e[4].w), h(a, "height", d = /*geom*/
      e[4].h), h(m, "class", "a9s-edge-handle a9s-edge-handle-top"), h(m, "x", y = /*geom*/
      e[4].x), h(m, "y", b = /*geom*/
      e[4].y), h(m, "height", 1), h(m, "width", p = /*geom*/
      e[4].w), h(_, "class", "a9s-edge-handle a9s-edge-handle-right"), h(_, "x", E = /*geom*/
      e[4].x + /*geom*/
      e[4].w), h(_, "y", B = /*geom*/
      e[4].y), h(_, "height", V = /*geom*/
      e[4].h), h(_, "width", 1), h(R, "class", "a9s-edge-handle a9s-edge-handle-bottom"), h(R, "x", Y = /*geom*/
      e[4].x), h(R, "y", w = /*geom*/
      e[4].y + /*geom*/
      e[4].h), h(R, "height", 1), h(R, "width", S = /*geom*/
      e[4].w), h(M, "class", "a9s-edge-handle a9s-edge-handle-left"), h(M, "x", P = /*geom*/
      e[4].x), h(M, "y", G = /*geom*/
      e[4].y), h(M, "height", x = /*geom*/
      e[4].h), h(M, "width", 1);
    },
    m(D, L) {
      O(D, t, L), O(D, l, L), O(D, a, L), O(D, g, L), O(D, m, L), O(D, A, L), O(D, _, L), O(D, U, L), O(D, R, L), O(D, T, L), O(D, M, L), O(D, Me, L), $(se, D, L), O(D, Le, L), $(v, D, L), O(D, Q, L), $(z, D, L), O(D, ue, L), $(Z, D, L), N = !0, qe || (ut = [
        j(t, "pointerdown", function() {
          K(
            /*grab*/
            e[9]("SHAPE")
          ) && e[9]("SHAPE").apply(this, arguments);
        }),
        j(a, "pointerdown", function() {
          K(
            /*grab*/
            e[9]("SHAPE")
          ) && e[9]("SHAPE").apply(this, arguments);
        }),
        j(m, "pointerdown", function() {
          K(
            /*grab*/
            e[9]("TOP")
          ) && e[9]("TOP").apply(this, arguments);
        }),
        j(_, "pointerdown", function() {
          K(
            /*grab*/
            e[9]("RIGHT")
          ) && e[9]("RIGHT").apply(this, arguments);
        }),
        j(R, "pointerdown", function() {
          K(
            /*grab*/
            e[9]("BOTTOM")
          ) && e[9]("BOTTOM").apply(this, arguments);
        }),
        j(M, "pointerdown", function() {
          K(
            /*grab*/
            e[9]("LEFT")
          ) && e[9]("LEFT").apply(this, arguments);
        })
      ], qe = !0);
    },
    p(D, L) {
      e = D, (!N || L & /*computedStyle*/
      2 && n !== (n = /*computedStyle*/
      e[1] ? "display:none;" : void 0)) && h(t, "style", n), (!N || L & /*geom*/
      16 && o !== (o = /*geom*/
      e[4].x)) && h(t, "x", o), (!N || L & /*geom*/
      16 && i !== (i = /*geom*/
      e[4].y)) && h(t, "y", i), (!N || L & /*geom*/
      16 && s !== (s = /*geom*/
      e[4].w)) && h(t, "width", s), (!N || L & /*geom*/
      16 && r !== (r = /*geom*/
      e[4].h)) && h(t, "height", r), (!N || L & /*computedStyle*/
      2) && h(
        a,
        "style",
        /*computedStyle*/
        e[1]
      ), (!N || L & /*geom*/
      16 && c !== (c = /*geom*/
      e[4].x)) && h(a, "x", c), (!N || L & /*geom*/
      16 && u !== (u = /*geom*/
      e[4].y)) && h(a, "y", u), (!N || L & /*geom*/
      16 && f !== (f = /*geom*/
      e[4].w)) && h(a, "width", f), (!N || L & /*geom*/
      16 && d !== (d = /*geom*/
      e[4].h)) && h(a, "height", d), (!N || L & /*geom*/
      16 && y !== (y = /*geom*/
      e[4].x)) && h(m, "x", y), (!N || L & /*geom*/
      16 && b !== (b = /*geom*/
      e[4].y)) && h(m, "y", b), (!N || L & /*geom*/
      16 && p !== (p = /*geom*/
      e[4].w)) && h(m, "width", p), (!N || L & /*geom*/
      16 && E !== (E = /*geom*/
      e[4].x + /*geom*/
      e[4].w)) && h(_, "x", E), (!N || L & /*geom*/
      16 && B !== (B = /*geom*/
      e[4].y)) && h(_, "y", B), (!N || L & /*geom*/
      16 && V !== (V = /*geom*/
      e[4].h)) && h(_, "height", V), (!N || L & /*geom*/
      16 && Y !== (Y = /*geom*/
      e[4].x)) && h(R, "x", Y), (!N || L & /*geom*/
      16 && w !== (w = /*geom*/
      e[4].y + /*geom*/
      e[4].h)) && h(R, "y", w), (!N || L & /*geom*/
      16 && S !== (S = /*geom*/
      e[4].w)) && h(R, "width", S), (!N || L & /*geom*/
      16 && P !== (P = /*geom*/
      e[4].x)) && h(M, "x", P), (!N || L & /*geom*/
      16 && G !== (G = /*geom*/
      e[4].y)) && h(M, "y", G), (!N || L & /*geom*/
      16 && x !== (x = /*geom*/
      e[4].h)) && h(M, "height", x);
      const De = {};
      L & /*geom*/
      16 && (De.x = /*geom*/
      e[4].x), L & /*geom*/
      16 && (De.y = /*geom*/
      e[4].y), L & /*viewportScale*/
      8 && (De.scale = /*viewportScale*/
      e[3]), se.$set(De);
      const Xe = {};
      L & /*geom*/
      16 && (Xe.x = /*geom*/
      e[4].x + /*geom*/
      e[4].w), L & /*geom*/
      16 && (Xe.y = /*geom*/
      e[4].y), L & /*viewportScale*/
      8 && (Xe.scale = /*viewportScale*/
      e[3]), v.$set(Xe);
      const Ce = {};
      L & /*geom*/
      16 && (Ce.x = /*geom*/
      e[4].x + /*geom*/
      e[4].w), L & /*geom*/
      16 && (Ce.y = /*geom*/
      e[4].y + /*geom*/
      e[4].h), L & /*viewportScale*/
      8 && (Ce.scale = /*viewportScale*/
      e[3]), z.$set(Ce);
      const Re = {};
      L & /*geom*/
      16 && (Re.x = /*geom*/
      e[4].x), L & /*geom*/
      16 && (Re.y = /*geom*/
      e[4].y + /*geom*/
      e[4].h), L & /*viewportScale*/
      8 && (Re.scale = /*viewportScale*/
      e[3]), Z.$set(Re);
    },
    i(D) {
      N || (I(se.$$.fragment, D), I(v.$$.fragment, D), I(z.$$.fragment, D), I(Z.$$.fragment, D), N = !0);
    },
    o(D) {
      X(se.$$.fragment, D), X(v.$$.fragment, D), X(z.$$.fragment, D), X(Z.$$.fragment, D), N = !1;
    },
    d(D) {
      D && (k(t), k(l), k(a), k(g), k(m), k(A), k(_), k(U), k(R), k(T), k(M), k(Me), k(Le), k(Q), k(ue)), ee(se, D), ee(v, D), ee(z, D), ee(Z, D), qe = !1, ce(ut);
    }
  };
}
function vo(e) {
  let t, n;
  return t = new Zt({
    props: {
      shape: (
        /*shape*/
        e[0]
      ),
      transform: (
        /*transform*/
        e[2]
      ),
      editor: (
        /*editor*/
        e[5]
      ),
      $$slots: {
        default: [
          Lo,
          ({ grab: o }) => ({ 9: o }),
          ({ grab: o }) => o ? 512 : 0
        ]
      },
      $$scope: { ctx: e }
    }
  }), t.$on(
    "grab",
    /*grab_handler*/
    e[6]
  ), t.$on(
    "change",
    /*change_handler*/
    e[7]
  ), t.$on(
    "release",
    /*release_handler*/
    e[8]
  ), {
    c() {
      te(t.$$.fragment);
    },
    m(o, i) {
      $(t, o, i), n = !0;
    },
    p(o, [i]) {
      const s = {};
      i & /*shape*/
      1 && (s.shape = /*shape*/
      o[0]), i & /*transform*/
      4 && (s.transform = /*transform*/
      o[2]), i & /*$$scope, geom, viewportScale, grab, computedStyle*/
      1562 && (s.$$scope = { dirty: i, ctx: o }), t.$set(s);
    },
    i(o) {
      n || (I(t.$$.fragment, o), n = !0);
    },
    o(o) {
      X(t.$$.fragment, o), n = !1;
    },
    d(o) {
      ee(t, o);
    }
  };
}
function ko(e, t, n) {
  let o, { shape: i } = t, { computedStyle: s } = t, { transform: r } = t, { viewportScale: l = 1 } = t;
  const a = (d, g, m) => {
    const y = d.geometry.bounds;
    let [b, p] = [y.minX, y.minY], [A, _] = [y.maxX, y.maxY];
    const [E, B] = m;
    if (g === "SHAPE")
      b += E, A += E, p += B, _ += B;
    else {
      switch (g) {
        case "TOP":
        case "TOP_LEFT":
        case "TOP_RIGHT": {
          p += B;
          break;
        }
        case "BOTTOM":
        case "BOTTOM_LEFT":
        case "BOTTOM_RIGHT": {
          _ += B;
          break;
        }
      }
      switch (g) {
        case "LEFT":
        case "TOP_LEFT":
        case "BOTTOM_LEFT": {
          b += E;
          break;
        }
        case "RIGHT":
        case "TOP_RIGHT":
        case "BOTTOM_RIGHT": {
          A += E;
          break;
        }
      }
    }
    const V = Math.min(b, A), U = Math.min(p, _), R = Math.abs(A - b), Y = Math.abs(_ - p);
    return {
      ...d,
      geometry: {
        x: V,
        y: U,
        w: R,
        h: Y,
        bounds: {
          minX: V,
          minY: U,
          maxX: V + R,
          maxY: U + Y
        }
      }
    };
  };
  function c(d) {
    de.call(this, e, d);
  }
  function u(d) {
    de.call(this, e, d);
  }
  function f(d) {
    de.call(this, e, d);
  }
  return e.$$set = (d) => {
    "shape" in d && n(0, i = d.shape), "computedStyle" in d && n(1, s = d.computedStyle), "transform" in d && n(2, r = d.transform), "viewportScale" in d && n(3, l = d.viewportScale);
  }, e.$$.update = () => {
    e.$$.dirty & /*shape*/
    1 && n(4, o = i.geometry);
  }, [
    i,
    s,
    r,
    l,
    o,
    a,
    c,
    u,
    f
  ];
}
class Oo extends oe {
  constructor(t) {
    super(), ne(this, t, ko, vo, J, {
      shape: 0,
      computedStyle: 1,
      transform: 2,
      viewportScale: 3
    });
  }
}
const Qt = /* @__PURE__ */ new Map([
  [q.RECTANGLE, Oo],
  [q.POLYGON, yo]
]), Bo = (e) => Qt.get(e.type), Io = (e, t) => Qt.set(e, t), Po = (e) => ({}), St = (e) => ({ grab: (
  /*onGrab*/
  e[0]
) });
function Yo(e) {
  let t, n, o, i;
  const s = (
    /*#slots*/
    e[7].default
  ), r = rn(
    s,
    e,
    /*$$scope*/
    e[6],
    St
  );
  return {
    c() {
      t = C("g"), r && r.c(), h(t, "class", "a9s-annotation selected");
    },
    m(l, a) {
      O(l, t, a), r && r.m(t, null), n = !0, o || (i = [
        j(
          t,
          "pointerup",
          /*onRelease*/
          e[2]
        ),
        j(
          t,
          "pointermove",
          /*onPointerMove*/
          e[1]
        )
      ], o = !0);
    },
    p(l, [a]) {
      r && r.p && (!n || a & /*$$scope*/
      64) && an(
        r,
        s,
        l,
        /*$$scope*/
        l[6],
        n ? ln(
          s,
          /*$$scope*/
          l[6],
          a,
          Po
        ) : cn(
          /*$$scope*/
          l[6]
        ),
        St
      );
    },
    i(l) {
      n || (I(r, l), n = !0);
    },
    o(l) {
      X(r, l), n = !1;
    },
    d(l) {
      l && k(t), r && r.d(l), o = !1, ce(i);
    }
  };
}
function Do(e, t, n) {
  let { $$slots: o = {}, $$scope: i } = t;
  const s = Te();
  let { shape: r } = t, { editor: l } = t, { transform: a } = t, c, u, f;
  const d = (y) => (b) => {
    c = y, u = a.elementToImage(b.offsetX, b.offsetY), f = r, b.target.setPointerCapture(b.pointerId), s("grab", b);
  }, g = (y) => {
    if (c) {
      const [b, p] = a.elementToImage(y.offsetX, y.offsetY), A = [b - u[0], p - u[1]];
      n(3, r = l(f, c, A)), s("change", r);
    }
  }, m = (y) => {
    y.target.releasePointerCapture(y.pointerId), c = void 0, f = r, s("release", y);
  };
  return e.$$set = (y) => {
    "shape" in y && n(3, r = y.shape), "editor" in y && n(4, l = y.editor), "transform" in y && n(5, a = y.transform), "$$scope" in y && n(6, i = y.$$scope);
  }, [d, g, m, r, l, a, i, o];
}
class Zt extends oe {
  constructor(t) {
    super(), ne(this, t, Do, Yo, J, { shape: 3, editor: 4, transform: 5 });
  }
}
const je = (e, t) => {
  const n = typeof t == "function" ? t(e) : t;
  if (n) {
    const { fill: o, fillOpacity: i } = n;
    let s = "";
    return o && (s += `fill:${o};stroke:${o};`), s += `fill-opacity:${i || "0.25"};`, s;
  }
};
function Xo(e, t, n) {
  let o;
  const i = Te();
  let { annotation: s } = t, { editor: r } = t, { style: l } = t, { target: a } = t, { transform: c } = t, { viewportScale: u } = t, f;
  return Ye(() => (n(6, f = new r({
    target: a,
    props: {
      shape: s.target.selector,
      computedStyle: o,
      transform: c,
      viewportScale: u
    }
  })), f.$on("change", (d) => {
    f.$$set({ shape: d.detail }), i("change", d.detail);
  }), f.$on("grab", (d) => i("grab", d.detail)), f.$on("release", (d) => i("release", d.detail)), () => {
    f.$destroy();
  })), e.$$set = (d) => {
    "annotation" in d && n(0, s = d.annotation), "editor" in d && n(1, r = d.editor), "style" in d && n(2, l = d.style), "target" in d && n(3, a = d.target), "transform" in d && n(4, c = d.transform), "viewportScale" in d && n(5, u = d.viewportScale);
  }, e.$$.update = () => {
    e.$$.dirty & /*annotation, style*/
    5 && (o = je(s, l)), e.$$.dirty & /*annotation, editorComponent*/
    65 && s && (f == null || f.$set({ shape: s.target.selector })), e.$$.dirty & /*editorComponent, transform*/
    80 && f && f.$set({ transform: c }), e.$$.dirty & /*editorComponent, viewportScale*/
    96 && f && f.$set({ viewportScale: u });
  }, [s, r, l, a, c, u, f];
}
class Co extends oe {
  constructor(t) {
    super(), ne(this, t, Xo, null, J, {
      annotation: 0,
      editor: 1,
      style: 2,
      target: 3,
      transform: 4,
      viewportScale: 5
    });
  }
}
function Ro(e, t, n) {
  const o = Te();
  let { drawingMode: i } = t, { target: s } = t, { tool: r } = t, { transform: l } = t, { viewportScale: a } = t, c;
  return Ye(() => {
    const u = s.closest("svg"), f = [], d = (g, m, y) => {
      u == null || u.addEventListener(g, m, y), f.push(() => u == null ? void 0 : u.removeEventListener(g, m, y));
    };
    return n(5, c = new r({
      target: s,
      props: {
        addEventListener: d,
        drawingMode: i,
        transform: l,
        viewportScale: a
      }
    })), c.$on("create", (g) => o("create", g.detail)), () => {
      f.forEach((g) => g()), c.$destroy();
    };
  }), e.$$set = (u) => {
    "drawingMode" in u && n(0, i = u.drawingMode), "target" in u && n(1, s = u.target), "tool" in u && n(2, r = u.tool), "transform" in u && n(3, l = u.transform), "viewportScale" in u && n(4, a = u.viewportScale);
  }, e.$$.update = () => {
    e.$$.dirty & /*toolComponent, transform*/
    40 && c && c.$set({ transform: l }), e.$$.dirty & /*toolComponent, viewportScale*/
    48 && c && c.$set({ viewportScale: a });
  }, [i, s, r, l, a, c];
}
class No extends oe {
  constructor(t) {
    super(), ne(this, t, Ro, null, J, {
      drawingMode: 0,
      target: 1,
      tool: 2,
      transform: 3,
      viewportScale: 4
    });
  }
}
function Tt(e) {
  let t, n;
  return {
    c() {
      t = C("rect"), n = C("rect"), h(t, "class", "a9s-outer"), h(
        t,
        "x",
        /*x*/
        e[1]
      ), h(
        t,
        "y",
        /*y*/
        e[2]
      ), h(
        t,
        "width",
        /*w*/
        e[3]
      ), h(
        t,
        "height",
        /*h*/
        e[4]
      ), h(n, "class", "a9s-inner"), h(
        n,
        "x",
        /*x*/
        e[1]
      ), h(
        n,
        "y",
        /*y*/
        e[2]
      ), h(
        n,
        "width",
        /*w*/
        e[3]
      ), h(
        n,
        "height",
        /*h*/
        e[4]
      );
    },
    m(o, i) {
      O(o, t, i), O(o, n, i);
    },
    p(o, i) {
      i & /*x*/
      2 && h(
        t,
        "x",
        /*x*/
        o[1]
      ), i & /*y*/
      4 && h(
        t,
        "y",
        /*y*/
        o[2]
      ), i & /*w*/
      8 && h(
        t,
        "width",
        /*w*/
        o[3]
      ), i & /*h*/
      16 && h(
        t,
        "height",
        /*h*/
        o[4]
      ), i & /*x*/
      2 && h(
        n,
        "x",
        /*x*/
        o[1]
      ), i & /*y*/
      4 && h(
        n,
        "y",
        /*y*/
        o[2]
      ), i & /*w*/
      8 && h(
        n,
        "width",
        /*w*/
        o[3]
      ), i & /*h*/
      16 && h(
        n,
        "height",
        /*h*/
        o[4]
      );
    },
    d(o) {
      o && (k(t), k(n));
    }
  };
}
function Uo(e) {
  let t, n = (
    /*origin*/
    e[0] && Tt(e)
  );
  return {
    c() {
      t = C("g"), n && n.c(), h(t, "class", "a9s-annotation a9s-rubberband");
    },
    m(o, i) {
      O(o, t, i), n && n.m(t, null);
    },
    p(o, [i]) {
      /*origin*/
      o[0] ? n ? n.p(o, i) : (n = Tt(o), n.c(), n.m(t, null)) : n && (n.d(1), n = null);
    },
    i: F,
    o: F,
    d(o) {
      o && k(t), n && n.d();
    }
  };
}
function Vo(e, t, n) {
  const o = Te();
  let { addEventListener: i } = t, { drawingMode: s } = t, { transform: r } = t, l, a, c, u, f, d, g;
  const m = (A) => {
    const _ = A;
    l = performance.now(), s === "drag" && (n(0, a = r.elementToImage(_.offsetX, _.offsetY)), c = a, n(1, u = a[0]), n(2, f = a[1]), n(3, d = 1), n(4, g = 1));
  }, y = (A) => {
    const _ = A;
    a && (c = r.elementToImage(_.offsetX, _.offsetY), n(1, u = Math.min(c[0], a[0])), n(2, f = Math.min(c[1], a[1])), n(3, d = Math.abs(c[0] - a[0])), n(4, g = Math.abs(c[1] - a[1])));
  }, b = (A) => {
    const _ = A, E = performance.now() - l;
    if (s === "click") {
      if (E > 300)
        return;
      _.stopPropagation(), a ? p() : (n(0, a = r.elementToImage(_.offsetX, _.offsetY)), c = a, n(1, u = a[0]), n(2, f = a[1]), n(3, d = 1), n(4, g = 1));
    } else
      a && (E > 300 || d * g > 100 ? (_.stopPropagation(), p()) : (n(0, a = void 0), c = void 0));
  }, p = () => {
    if (d * g > 15) {
      const A = {
        type: q.RECTANGLE,
        geometry: {
          bounds: {
            minX: u,
            minY: f,
            maxX: u + d,
            maxY: f + g
          },
          x: u,
          y: f,
          w: d,
          h: g
        }
      };
      o("create", A);
    }
    n(0, a = void 0), c = void 0;
  };
  return Ye(() => {
    i("pointerdown", m), i("pointermove", y), i("pointerup", b, !0);
  }), e.$$set = (A) => {
    "addEventListener" in A && n(5, i = A.addEventListener), "drawingMode" in A && n(6, s = A.drawingMode), "transform" in A && n(7, r = A.transform);
  }, [a, u, f, d, g, i, s, r];
}
class Go extends oe {
  constructor(t) {
    super(), ne(this, t, Vo, Uo, J, {
      addEventListener: 5,
      drawingMode: 6,
      transform: 7
    });
  }
}
function xe(e) {
  const t = e.slice(), n = (
    /*isClosable*/
    (t[2] ? (
      /*points*/
      t[0]
    ) : [
      .../*points*/
      t[0],
      /*cursor*/
      t[1]
    ]).map((o) => o.join(",")).join(" ")
  );
  return t[16] = n, t;
}
function Mt(e) {
  let t, n, o, i, s, r = (
    /*isClosable*/
    e[2] && Lt(e)
  );
  return {
    c() {
      t = C("polygon"), o = C("polygon"), r && r.c(), s = fe(), h(t, "class", "a9s-outer"), h(t, "points", n = /*coords*/
      e[16]), h(o, "class", "a9s-inner"), h(o, "points", i = /*coords*/
      e[16]);
    },
    m(l, a) {
      O(l, t, a), O(l, o, a), r && r.m(l, a), O(l, s, a);
    },
    p(l, a) {
      a & /*isClosable, points, cursor*/
      7 && n !== (n = /*coords*/
      l[16]) && h(t, "points", n), a & /*isClosable, points, cursor*/
      7 && i !== (i = /*coords*/
      l[16]) && h(o, "points", i), /*isClosable*/
      l[2] ? r ? r.p(l, a) : (r = Lt(l), r.c(), r.m(s.parentNode, s)) : r && (r.d(1), r = null);
    },
    d(l) {
      l && (k(t), k(o), k(s)), r && r.d(l);
    }
  };
}
function Lt(e) {
  let t, n, o;
  return {
    c() {
      t = C("rect"), h(t, "class", "a9s-corner-handle"), h(t, "x", n = /*points*/
      e[0][0][0] - /*handleSize*/
      e[3] / 2), h(t, "y", o = /*points*/
      e[0][0][1] - /*handleSize*/
      e[3] / 2), h(
        t,
        "height",
        /*handleSize*/
        e[3]
      ), h(
        t,
        "width",
        /*handleSize*/
        e[3]
      );
    },
    m(i, s) {
      O(i, t, s);
    },
    p(i, s) {
      s & /*points, handleSize*/
      9 && n !== (n = /*points*/
      i[0][0][0] - /*handleSize*/
      i[3] / 2) && h(t, "x", n), s & /*points, handleSize*/
      9 && o !== (o = /*points*/
      i[0][0][1] - /*handleSize*/
      i[3] / 2) && h(t, "y", o), s & /*handleSize*/
      8 && h(
        t,
        "height",
        /*handleSize*/
        i[3]
      ), s & /*handleSize*/
      8 && h(
        t,
        "width",
        /*handleSize*/
        i[3]
      );
    },
    d(i) {
      i && k(t);
    }
  };
}
function zo(e) {
  let t, n = (
    /*cursor*/
    e[1] && Mt(xe(e))
  );
  return {
    c() {
      t = C("g"), n && n.c(), h(t, "class", "a9s-annotation a9s-rubberband");
    },
    m(o, i) {
      O(o, t, i), n && n.m(t, null);
    },
    p(o, [i]) {
      /*cursor*/
      o[1] ? n ? n.p(xe(o), i) : (n = Mt(xe(o)), n.c(), n.m(t, null)) : n && (n.d(1), n = null);
    },
    i: F,
    o: F,
    d(o) {
      o && k(t), n && n.d();
    }
  };
}
const Ho = 20, Fo = 1500;
function jo(e, t, n) {
  let o;
  const i = Te();
  let { addEventListener: s } = t, { drawingMode: r } = t, { transform: l } = t, { viewportScale: a = 1 } = t, c, u = [], f, d, g = !1;
  const m = (_) => {
    const E = _, { timeStamp: B, offsetX: V, offsetY: U } = E;
    if (c = { timeStamp: B, offsetX: V, offsetY: U }, r === "drag" && u.length === 0) {
      const R = l.elementToImage(E.offsetX, E.offsetY);
      u.push(R), n(1, f = R);
    }
  }, y = (_) => {
    const E = _;
    if (d && clearTimeout(d), u.length > 0) {
      if (n(1, f = l.elementToImage(E.offsetX, E.offsetY)), u.length > 2) {
        const B = Ze(f, u[0]) * a;
        n(2, g = B < Ho);
      }
      E.pointerType === "touch" && (d = setTimeout(
        () => {
          p();
        },
        Fo
      ));
    }
  }, b = (_) => {
    const E = _;
    if (d && clearTimeout(d), r === "click") {
      const B = E.timeStamp - c.timeStamp, V = Ze([c.offsetX, c.offsetY], [E.offsetX, E.offsetY]);
      if (B > 300 || V > 15)
        return;
      if (g)
        A();
      else if (u.length === 0) {
        const U = l.elementToImage(E.offsetX, E.offsetY);
        u.push(U), n(1, f = U);
      } else
        u.push(f);
    } else {
      if (u.length === 1 && Ze(u[0], f) <= 4) {
        n(0, u = []), n(1, f = void 0);
        return;
      }
      E.stopImmediatePropagation(), g ? A() : u.push(f);
    }
  }, p = () => {
    if (!f)
      return;
    const _ = [...u, f], E = {
      type: q.POLYGON,
      geometry: { bounds: Fe(_), points: _ }
    };
    st(E) > 4 && (n(0, u = []), n(1, f = void 0), i("create", E));
  }, A = () => {
    const _ = {
      type: q.POLYGON,
      geometry: {
        bounds: Fe(u),
        points: [...u]
      }
    };
    n(0, u = []), n(1, f = void 0), i("create", _);
  };
  return Ye(() => {
    s("pointerdown", m, !0), s("pointermove", y), s("pointerup", b, !0), s("dblclick", p, !0);
  }), e.$$set = (_) => {
    "addEventListener" in _ && n(4, s = _.addEventListener), "drawingMode" in _ && n(5, r = _.drawingMode), "transform" in _ && n(6, l = _.transform), "viewportScale" in _ && n(7, a = _.viewportScale);
  }, e.$$.update = () => {
    e.$$.dirty & /*viewportScale*/
    128 && n(3, o = 10 / a);
  }, [
    u,
    f,
    g,
    o,
    s,
    r,
    l,
    a
  ];
}
class qo extends oe {
  constructor(t) {
    super(), ne(this, t, jo, zo, J, {
      addEventListener: 4,
      drawingMode: 5,
      transform: 6,
      viewportScale: 7
    });
  }
}
const ft = /* @__PURE__ */ new Map([
  ["rectangle", { tool: Go }],
  ["polygon", { tool: qo }]
]), xt = () => [...ft.keys()], $t = (e) => ft.get(e), Ko = (e, t, n) => ft.set(e, { tool: t, opts: n });
function Wo(e) {
  let t, n, o, i, s;
  return {
    c() {
      t = C("g"), n = C("ellipse"), i = C("ellipse"), h(n, "class", "a9s-outer"), h(n, "style", o = /*computedStyle*/
      e[1] ? "display:none;" : void 0), h(
        n,
        "cx",
        /*cx*/
        e[2]
      ), h(
        n,
        "cy",
        /*cy*/
        e[3]
      ), h(
        n,
        "rx",
        /*rx*/
        e[4]
      ), h(
        n,
        "ry",
        /*ry*/
        e[5]
      ), h(i, "class", "a9s-inner"), h(
        i,
        "style",
        /*computedStyle*/
        e[1]
      ), h(
        i,
        "cx",
        /*cx*/
        e[2]
      ), h(
        i,
        "cy",
        /*cy*/
        e[3]
      ), h(
        i,
        "rx",
        /*rx*/
        e[4]
      ), h(
        i,
        "ry",
        /*ry*/
        e[5]
      ), h(t, "data-id", s = /*annotation*/
      e[0].id);
    },
    m(r, l) {
      O(r, t, l), re(t, n), re(t, i);
    },
    p(r, [l]) {
      l & /*computedStyle*/
      2 && o !== (o = /*computedStyle*/
      r[1] ? "display:none;" : void 0) && h(n, "style", o), l & /*computedStyle*/
      2 && h(
        i,
        "style",
        /*computedStyle*/
        r[1]
      ), l & /*annotation*/
      1 && s !== (s = /*annotation*/
      r[0].id) && h(t, "data-id", s);
    },
    i: F,
    o: F,
    d(r) {
      r && k(t);
    }
  };
}
function Jo(e, t, n) {
  let o, { annotation: i } = t, { geom: s } = t, { style: r } = t;
  const { cx: l, cy: a, rx: c, ry: u } = s;
  return e.$$set = (f) => {
    "annotation" in f && n(0, i = f.annotation), "geom" in f && n(6, s = f.geom), "style" in f && n(7, r = f.style);
  }, e.$$.update = () => {
    e.$$.dirty & /*annotation, style*/
    129 && n(1, o = je(i, r));
  }, [i, o, l, a, c, u, s, r];
}
class Qo extends oe {
  constructor(t) {
    super(), ne(this, t, Jo, Wo, J, { annotation: 0, geom: 6, style: 7 });
  }
}
function Zo(e) {
  let t, n, o, i, s;
  return {
    c() {
      t = C("g"), n = C("polygon"), i = C("polygon"), h(n, "class", "a9s-outer"), h(n, "style", o = /*computedStyle*/
      e[1] ? "display:none;" : void 0), h(
        n,
        "points",
        /*points*/
        e[2].map(xo).join(" ")
      ), h(i, "class", "a9s-inner"), h(
        i,
        "style",
        /*computedStyle*/
        e[1]
      ), h(
        i,
        "points",
        /*points*/
        e[2].map($o).join(" ")
      ), h(t, "data-id", s = /*annotation*/
      e[0].id);
    },
    m(r, l) {
      O(r, t, l), re(t, n), re(t, i);
    },
    p(r, [l]) {
      l & /*computedStyle*/
      2 && o !== (o = /*computedStyle*/
      r[1] ? "display:none;" : void 0) && h(n, "style", o), l & /*computedStyle*/
      2 && h(
        i,
        "style",
        /*computedStyle*/
        r[1]
      ), l & /*annotation*/
      1 && s !== (s = /*annotation*/
      r[0].id) && h(t, "data-id", s);
    },
    i: F,
    o: F,
    d(r) {
      r && k(t);
    }
  };
}
const xo = (e) => e.join(","), $o = (e) => e.join(",");
function ei(e, t, n) {
  let o, { annotation: i } = t, { geom: s } = t, { style: r } = t;
  const { points: l } = s;
  return e.$$set = (a) => {
    "annotation" in a && n(0, i = a.annotation), "geom" in a && n(3, s = a.geom), "style" in a && n(4, r = a.style);
  }, e.$$.update = () => {
    e.$$.dirty & /*annotation, style*/
    17 && n(1, o = je(i, r));
  }, [i, o, l, s, r];
}
class ti extends oe {
  constructor(t) {
    super(), ne(this, t, ei, Zo, J, { annotation: 0, geom: 3, style: 4 });
  }
}
function ni(e) {
  let t, n, o, i, s;
  return {
    c() {
      t = C("g"), n = C("rect"), i = C("rect"), h(n, "class", "a9s-outer"), h(n, "style", o = /*computedStyle*/
      e[5] ? "display:none;" : void 0), h(
        n,
        "x",
        /*x*/
        e[4]
      ), h(
        n,
        "y",
        /*y*/
        e[3]
      ), h(
        n,
        "width",
        /*w*/
        e[2]
      ), h(
        n,
        "height",
        /*h*/
        e[1]
      ), h(i, "class", "a9s-inner"), h(
        i,
        "style",
        /*computedStyle*/
        e[5]
      ), h(
        i,
        "x",
        /*x*/
        e[4]
      ), h(
        i,
        "y",
        /*y*/
        e[3]
      ), h(
        i,
        "width",
        /*w*/
        e[2]
      ), h(
        i,
        "height",
        /*h*/
        e[1]
      ), h(t, "data-id", s = /*annotation*/
      e[0].id);
    },
    m(r, l) {
      O(r, t, l), re(t, n), re(t, i);
    },
    p(r, [l]) {
      l & /*computedStyle*/
      32 && o !== (o = /*computedStyle*/
      r[5] ? "display:none;" : void 0) && h(n, "style", o), l & /*x*/
      16 && h(
        n,
        "x",
        /*x*/
        r[4]
      ), l & /*y*/
      8 && h(
        n,
        "y",
        /*y*/
        r[3]
      ), l & /*w*/
      4 && h(
        n,
        "width",
        /*w*/
        r[2]
      ), l & /*h*/
      2 && h(
        n,
        "height",
        /*h*/
        r[1]
      ), l & /*computedStyle*/
      32 && h(
        i,
        "style",
        /*computedStyle*/
        r[5]
      ), l & /*x*/
      16 && h(
        i,
        "x",
        /*x*/
        r[4]
      ), l & /*y*/
      8 && h(
        i,
        "y",
        /*y*/
        r[3]
      ), l & /*w*/
      4 && h(
        i,
        "width",
        /*w*/
        r[2]
      ), l & /*h*/
      2 && h(
        i,
        "height",
        /*h*/
        r[1]
      ), l & /*annotation*/
      1 && s !== (s = /*annotation*/
      r[0].id) && h(t, "data-id", s);
    },
    i: F,
    o: F,
    d(r) {
      r && k(t);
    }
  };
}
function oi(e, t, n) {
  let o, i, s, r, l, { annotation: a } = t, { geom: c } = t, { style: u } = t;
  return e.$$set = (f) => {
    "annotation" in f && n(0, a = f.annotation), "geom" in f && n(6, c = f.geom), "style" in f && n(7, u = f.style);
  }, e.$$.update = () => {
    e.$$.dirty & /*annotation, style*/
    129 && n(5, o = je(a, u)), e.$$.dirty & /*geom*/
    64 && n(4, { x: i, y: s, w: r, h: l } = c, i, (n(3, s), n(6, c)), (n(2, r), n(6, c)), (n(1, l), n(6, c)));
  }, [a, l, r, s, i, o, c, u];
}
class ii extends oe {
  constructor(t) {
    super(), ne(this, t, oi, ni, J, { annotation: 0, geom: 6, style: 7 });
  }
}
const Di = {
  elementToImage: (e, t) => [e, t]
}, si = (e) => ({
  elementToImage: (t, n) => {
    const o = e.getBoundingClientRect(), i = e.createSVGPoint();
    i.x = t + o.x, i.y = n + o.y;
    const { x: s, y: r } = i.matrixTransform(e.getScreenCTM().inverse());
    return [s, r];
  }
}), ri = 250, li = (e, t) => {
  const n = Te();
  let o;
  return { onPointerDown: () => o = performance.now(), onPointerUp: (r) => {
    if (performance.now() - o < ri) {
      const { x: a, y: c } = ai(r, e), u = t.getAt(a, c);
      u ? n("click", { originalEvent: r, annotation: u }) : n("click", { originalEvent: r });
    }
  } };
}, ai = (e, t) => {
  const n = t.createSVGPoint(), o = t.getBoundingClientRect(), i = e.clientX - o.x, s = e.clientY - o.y, { left: r, top: l } = t.getBoundingClientRect();
  return n.x = i + r, n.y = s + l, n.matrixTransform(t.getScreenCTM().inverse());
}, { Boolean: en } = fn;
function vt(e, t, n) {
  const o = e.slice();
  return o[31] = t[n], o;
}
function kt(e, t, n) {
  const o = e.slice();
  return o[34] = t[n], o;
}
function $e(e) {
  const t = e.slice(), n = (
    /*annotation*/
    t[34].target.selector
  );
  return t[37] = n, t;
}
function Ot(e) {
  let t = (
    /*annotation*/
    e[34].id
  ), n, o, i = Bt(e);
  return {
    c() {
      i.c(), n = fe();
    },
    m(s, r) {
      i.m(s, r), O(s, n, r), o = !0;
    },
    p(s, r) {
      r[0] & /*$store*/
      16384 && J(t, t = /*annotation*/
      s[34].id) ? (le(), X(i, 1, 1, F), ae(), i = Bt(s), i.c(), I(i, 1), i.m(n.parentNode, n)) : i.p(s, r);
    },
    i(s) {
      o || (I(i), o = !0);
    },
    o(s) {
      X(i), o = !1;
    },
    d(s) {
      s && k(n), i.d(s);
    }
  };
}
function ci(e) {
  let t, n;
  return t = new ti({
    props: {
      annotation: (
        /*annotation*/
        e[34]
      ),
      geom: (
        /*selector*/
        e[37].geometry
      ),
      style: (
        /*style*/
        e[1]
      )
    }
  }), {
    c() {
      te(t.$$.fragment);
    },
    m(o, i) {
      $(t, o, i), n = !0;
    },
    p(o, i) {
      const s = {};
      i[0] & /*$store*/
      16384 && (s.annotation = /*annotation*/
      o[34]), i[0] & /*$store*/
      16384 && (s.geom = /*selector*/
      o[37].geometry), i[0] & /*style*/
      2 && (s.style = /*style*/
      o[1]), t.$set(s);
    },
    i(o) {
      n || (I(t.$$.fragment, o), n = !0);
    },
    o(o) {
      X(t.$$.fragment, o), n = !1;
    },
    d(o) {
      ee(t, o);
    }
  };
}
function fi(e) {
  let t, n;
  return t = new ii({
    props: {
      annotation: (
        /*annotation*/
        e[34]
      ),
      geom: (
        /*selector*/
        e[37].geometry
      ),
      style: (
        /*style*/
        e[1]
      )
    }
  }), {
    c() {
      te(t.$$.fragment);
    },
    m(o, i) {
      $(t, o, i), n = !0;
    },
    p(o, i) {
      const s = {};
      i[0] & /*$store*/
      16384 && (s.annotation = /*annotation*/
      o[34]), i[0] & /*$store*/
      16384 && (s.geom = /*selector*/
      o[37].geometry), i[0] & /*style*/
      2 && (s.style = /*style*/
      o[1]), t.$set(s);
    },
    i(o) {
      n || (I(t.$$.fragment, o), n = !0);
    },
    o(o) {
      X(t.$$.fragment, o), n = !1;
    },
    d(o) {
      ee(t, o);
    }
  };
}
function ui(e) {
  let t, n;
  return t = new Qo({
    props: {
      annotation: (
        /*annotation*/
        e[34]
      ),
      geom: (
        /*selector*/
        e[37].geometry
      ),
      style: (
        /*style*/
        e[1]
      )
    }
  }), {
    c() {
      te(t.$$.fragment);
    },
    m(o, i) {
      $(t, o, i), n = !0;
    },
    p(o, i) {
      const s = {};
      i[0] & /*$store*/
      16384 && (s.annotation = /*annotation*/
      o[34]), i[0] & /*$store*/
      16384 && (s.geom = /*selector*/
      o[37].geometry), i[0] & /*style*/
      2 && (s.style = /*style*/
      o[1]), t.$set(s);
    },
    i(o) {
      n || (I(t.$$.fragment, o), n = !0);
    },
    o(o) {
      X(t.$$.fragment, o), n = !1;
    },
    d(o) {
      ee(t, o);
    }
  };
}
function Bt(e) {
  let t, n, o, i;
  const s = [ui, fi, ci], r = [];
  function l(a, c) {
    return (
      /*selector*/
      a[37].type === q.ELLIPSE ? 0 : (
        /*selector*/
        a[37].type === q.RECTANGLE ? 1 : (
          /*selector*/
          a[37].type === q.POLYGON ? 2 : -1
        )
      )
    );
  }
  return ~(t = l(e)) && (n = r[t] = s[t](e)), {
    c() {
      n && n.c(), o = fe();
    },
    m(a, c) {
      ~t && r[t].m(a, c), O(a, o, c), i = !0;
    },
    p(a, c) {
      let u = t;
      t = l(a), t === u ? ~t && r[t].p(a, c) : (n && (le(), X(r[u], 1, 1, () => {
        r[u] = null;
      }), ae()), ~t ? (n = r[t], n ? n.p(a, c) : (n = r[t] = s[t](a), n.c()), I(n, 1), n.m(o.parentNode, o)) : n = null);
    },
    i(a) {
      i || (I(n), i = !0);
    },
    o(a) {
      X(n), i = !1;
    },
    d(a) {
      a && k(o), ~t && r[t].d(a);
    }
  };
}
function It(e) {
  let t = !/*isEditable*/
  e[8](
    /*annotation*/
    e[34]
  ), n, o, i = t && Ot($e(e));
  return {
    c() {
      i && i.c(), n = fe();
    },
    m(s, r) {
      i && i.m(s, r), O(s, n, r), o = !0;
    },
    p(s, r) {
      r[0] & /*isEditable, $store*/
      16640 && (t = !/*isEditable*/
      s[8](
        /*annotation*/
        s[34]
      )), t ? i ? (i.p($e(s), r), r[0] & /*isEditable, $store*/
      16640 && I(i, 1)) : (i = Ot($e(s)), i.c(), I(i, 1), i.m(n.parentNode, n)) : i && (le(), X(i, 1, 1, () => {
        i = null;
      }), ae());
    },
    i(s) {
      o || (I(i), o = !0);
    },
    o(s) {
      X(i), o = !1;
    },
    d(s) {
      s && k(n), i && i.d(s);
    }
  };
}
function Pt(e) {
  let t, n, o, i;
  const s = [hi, di], r = [];
  function l(a, c) {
    return (
      /*editableAnnotations*/
      a[7] ? 0 : (
        /*tool*/
        a[13] && /*drawingEnabled*/
        a[0] ? 1 : -1
      )
    );
  }
  return ~(t = l(e)) && (n = r[t] = s[t](e)), {
    c() {
      n && n.c(), o = fe();
    },
    m(a, c) {
      ~t && r[t].m(a, c), O(a, o, c), i = !0;
    },
    p(a, c) {
      let u = t;
      t = l(a), t === u ? ~t && r[t].p(a, c) : (n && (le(), X(r[u], 1, 1, () => {
        r[u] = null;
      }), ae()), ~t ? (n = r[t], n ? n.p(a, c) : (n = r[t] = s[t](a), n.c()), I(n, 1), n.m(o.parentNode, o)) : n = null);
    },
    i(a) {
      i || (I(n), i = !0);
    },
    o(a) {
      X(n), i = !1;
    },
    d(a) {
      a && k(o), ~t && r[t].d(a);
    }
  };
}
function di(e) {
  let t = (
    /*toolName*/
    e[2]
  ), n, o, i = Yt(e);
  return {
    c() {
      i.c(), n = fe();
    },
    m(s, r) {
      i.m(s, r), O(s, n, r), o = !0;
    },
    p(s, r) {
      r[0] & /*toolName*/
      4 && J(t, t = /*toolName*/
      s[2]) ? (le(), X(i, 1, 1, F), ae(), i = Yt(s), i.c(), I(i, 1), i.m(n.parentNode, n)) : i.p(s, r);
    },
    i(s) {
      o || (I(i), o = !0);
    },
    o(s) {
      X(i), o = !1;
    },
    d(s) {
      s && k(n), i.d(s);
    }
  };
}
function hi(e) {
  let t, n, o = Se(
    /*editableAnnotations*/
    e[7]
  ), i = [];
  for (let r = 0; r < o.length; r += 1)
    i[r] = Xt(vt(e, o, r));
  const s = (r) => X(i[r], 1, 1, () => {
    i[r] = null;
  });
  return {
    c() {
      for (let r = 0; r < i.length; r += 1)
        i[r].c();
      t = fe();
    },
    m(r, l) {
      for (let a = 0; a < i.length; a += 1)
        i[a] && i[a].m(r, l);
      O(r, t, l), n = !0;
    },
    p(r, l) {
      if (l[0] & /*editableAnnotations, drawingEl, getEditor, style, transform, $scale, onChangeSelected*/
      1607842) {
        o = Se(
          /*editableAnnotations*/
          r[7]
        );
        let a;
        for (a = 0; a < o.length; a += 1) {
          const c = vt(r, o, a);
          i[a] ? (i[a].p(c, l), I(i[a], 1)) : (i[a] = Xt(c), i[a].c(), I(i[a], 1), i[a].m(t.parentNode, t));
        }
        for (le(), a = o.length; a < i.length; a += 1)
          s(a);
        ae();
      }
    },
    i(r) {
      if (!n) {
        for (let l = 0; l < o.length; l += 1)
          I(i[l]);
        n = !0;
      }
    },
    o(r) {
      i = i.filter(en);
      for (let l = 0; l < i.length; l += 1)
        X(i[l]);
      n = !1;
    },
    d(r) {
      r && k(t), rt(i, r);
    }
  };
}
function Yt(e) {
  let t, n;
  return t = new No({
    props: {
      target: (
        /*drawingEl*/
        e[5]
      ),
      tool: (
        /*tool*/
        e[13]
      ),
      drawingMode: (
        /*drawingMode*/
        e[12]
      ),
      transform: (
        /*transform*/
        e[11]
      ),
      viewportScale: (
        /*$scale*/
        e[15]
      )
    }
  }), t.$on(
    "create",
    /*onSelectionCreated*/
    e[18]
  ), {
    c() {
      te(t.$$.fragment);
    },
    m(o, i) {
      $(t, o, i), n = !0;
    },
    p(o, i) {
      const s = {};
      i[0] & /*drawingEl*/
      32 && (s.target = /*drawingEl*/
      o[5]), i[0] & /*tool*/
      8192 && (s.tool = /*tool*/
      o[13]), i[0] & /*drawingMode*/
      4096 && (s.drawingMode = /*drawingMode*/
      o[12]), i[0] & /*transform*/
      2048 && (s.transform = /*transform*/
      o[11]), i[0] & /*$scale*/
      32768 && (s.viewportScale = /*$scale*/
      o[15]), t.$set(s);
    },
    i(o) {
      n || (I(t.$$.fragment, o), n = !0);
    },
    o(o) {
      X(t.$$.fragment, o), n = !1;
    },
    d(o) {
      ee(t, o);
    }
  };
}
function Dt(e) {
  let t, n;
  return t = new Co({
    props: {
      target: (
        /*drawingEl*/
        e[5]
      ),
      editor: (
        /*getEditor*/
        e[20](
          /*editable*/
          e[31].target.selector
        )
      ),
      annotation: (
        /*editable*/
        e[31]
      ),
      style: (
        /*style*/
        e[1]
      ),
      transform: (
        /*transform*/
        e[11]
      ),
      viewportScale: (
        /*$scale*/
        e[15]
      )
    }
  }), t.$on("change", function() {
    K(
      /*onChangeSelected*/
      e[19](
        /*editable*/
        e[31]
      )
    ) && e[19](
      /*editable*/
      e[31]
    ).apply(this, arguments);
  }), {
    c() {
      te(t.$$.fragment);
    },
    m(o, i) {
      $(t, o, i), n = !0;
    },
    p(o, i) {
      e = o;
      const s = {};
      i[0] & /*drawingEl*/
      32 && (s.target = /*drawingEl*/
      e[5]), i[0] & /*editableAnnotations*/
      128 && (s.editor = /*getEditor*/
      e[20](
        /*editable*/
        e[31].target.selector
      )), i[0] & /*editableAnnotations*/
      128 && (s.annotation = /*editable*/
      e[31]), i[0] & /*style*/
      2 && (s.style = /*style*/
      e[1]), i[0] & /*transform*/
      2048 && (s.transform = /*transform*/
      e[11]), i[0] & /*$scale*/
      32768 && (s.viewportScale = /*$scale*/
      e[15]), t.$set(s);
    },
    i(o) {
      n || (I(t.$$.fragment, o), n = !0);
    },
    o(o) {
      X(t.$$.fragment, o), n = !1;
    },
    d(o) {
      ee(t, o);
    }
  };
}
function Xt(e) {
  let t = (
    /*editable*/
    e[31].id
  ), n, o, i = Dt(e);
  return {
    c() {
      i.c(), n = fe();
    },
    m(s, r) {
      i.m(s, r), O(s, n, r), o = !0;
    },
    p(s, r) {
      r[0] & /*editableAnnotations*/
      128 && J(t, t = /*editable*/
      s[31].id) ? (le(), X(i, 1, 1, F), ae(), i = Dt(s), i.c(), I(i, 1), i.m(n.parentNode, n)) : i.p(s, r);
    },
    i(s) {
      o || (I(i), o = !0);
    },
    o(s) {
      X(i), o = !1;
    },
    d(s) {
      s && k(n), i.d(s);
    }
  };
}
function gi(e) {
  let t, n, o, i, s, r, l = Se(
    /*$store*/
    e[14]
  ), a = [];
  for (let f = 0; f < l.length; f += 1)
    a[f] = It(kt(e, l, f));
  const c = (f) => X(a[f], 1, 1, () => {
    a[f] = null;
  });
  let u = (
    /*drawingEl*/
    e[5] && Pt(e)
  );
  return {
    c() {
      t = C("svg"), n = C("g");
      for (let f = 0; f < a.length; f += 1)
        a[f].c();
      o = C("g"), u && u.c(), h(o, "class", "drawing"), h(t, "class", "a9s-annotationlayer"), Ee(
        t,
        "drawing",
        /*tool*/
        e[13]
      ), Ee(t, "hidden", !/*visible*/
      e[3]);
    },
    m(f, d) {
      O(f, t, d), re(t, n);
      for (let g = 0; g < a.length; g += 1)
        a[g] && a[g].m(n, null);
      re(t, o), u && u.m(o, null), e[27](o), e[28](t), i = !0, s || (r = [
        j(t, "pointerup", function() {
          K(
            /*onPointerUp*/
            e[9]
          ) && e[9].apply(this, arguments);
        }),
        j(t, "pointerdown", function() {
          K(
            /*onPointerDown*/
            e[10]
          ) && e[10].apply(this, arguments);
        })
      ], s = !0);
    },
    p(f, d) {
      if (e = f, d[0] & /*$store, style, isEditable*/
      16642) {
        l = Se(
          /*$store*/
          e[14]
        );
        let g;
        for (g = 0; g < l.length; g += 1) {
          const m = kt(e, l, g);
          a[g] ? (a[g].p(m, d), I(a[g], 1)) : (a[g] = It(m), a[g].c(), I(a[g], 1), a[g].m(n, null));
        }
        for (le(), g = l.length; g < a.length; g += 1)
          c(g);
        ae();
      }
      /*drawingEl*/
      e[5] ? u ? (u.p(e, d), d[0] & /*drawingEl*/
      32 && I(u, 1)) : (u = Pt(e), u.c(), I(u, 1), u.m(o, null)) : u && (le(), X(u, 1, 1, () => {
        u = null;
      }), ae()), (!i || d[0] & /*tool*/
      8192) && Ee(
        t,
        "drawing",
        /*tool*/
        e[13]
      ), (!i || d[0] & /*visible*/
      8) && Ee(t, "hidden", !/*visible*/
      e[3]);
    },
    i(f) {
      if (!i) {
        for (let d = 0; d < l.length; d += 1)
          I(a[d]);
        I(u), i = !0;
      }
    },
    o(f) {
      a = a.filter(en);
      for (let d = 0; d < a.length; d += 1)
        X(a[d]);
      X(u), i = !1;
    },
    d(f) {
      f && k(t), rt(a, f), u && u.d(), e[27](null), e[28](null), s = !1, ce(r);
    }
  };
}
function mi(e, t, n) {
  let o, i, s, r, l, a, c, u, f, d, g = F, m = () => (g(), g = Vt(Y, (v) => n(15, d = v)), Y);
  e.$$.on_destroy.push(() => g());
  let { drawingEnabled: y } = t, { image: b } = t, { preferredDrawingMode: p } = t, { state: A } = t, { style: _ = void 0 } = t, { toolName: E = xt()[0] } = t, { user: B } = t, { visible: V = !0 } = t, U, R, Y;
  Ye(() => m(n(6, Y = bo(b, R))));
  const { selection: w, store: S } = A;
  ht(e, w, (v) => n(26, u = v)), ht(e, S, (v) => n(14, f = v));
  let T, M;
  const P = (v) => {
    T && S.unobserve(T);
    const Q = v.filter(({ editable: z }) => z).map(({ id: z }) => z);
    Q.length > 0 ? (n(7, M = Q.map((z) => S.getAnnotation(z)).filter(Boolean)), T = (z) => {
      const { updated: ue } = z.changes;
      n(7, M = ue == null ? void 0 : ue.map((Z) => Z.newValue));
    }, S.observe(T, { annotations: Q })) : n(7, M = void 0);
  }, G = (v) => {
    const Q = qt(), z = {
      id: Q,
      bodies: [],
      target: {
        annotation: Q,
        selector: v.detail,
        creator: B,
        created: /* @__PURE__ */ new Date()
      }
    };
    S.addAnnotation(z), w.setSelected(z.id);
  }, x = (v) => (Q) => {
    var N;
    const { target: z } = v, ue = 10 * 60 * 1e3, Z = ((N = z.creator) == null ? void 0 : N.id) !== B.id || !z.created || (/* @__PURE__ */ new Date()).getTime() - z.created.getTime() > ue;
    S.updateTarget({
      ...z,
      selector: Q.detail,
      created: Z ? z.created : /* @__PURE__ */ new Date(),
      updated: Z ? /* @__PURE__ */ new Date() : void 0,
      updatedBy: Z ? B : void 0
    });
  }, Me = (v) => Bo(v);
  function se(v) {
    He[v ? "unshift" : "push"](() => {
      U = v, n(5, U);
    });
  }
  function Le(v) {
    He[v ? "unshift" : "push"](() => {
      R = v, n(4, R);
    });
  }
  return e.$$set = (v) => {
    "drawingEnabled" in v && n(0, y = v.drawingEnabled), "image" in v && n(21, b = v.image), "preferredDrawingMode" in v && n(22, p = v.preferredDrawingMode), "state" in v && n(23, A = v.state), "style" in v && n(1, _ = v.style), "toolName" in v && n(2, E = v.toolName), "user" in v && n(24, B = v.user), "visible" in v && n(3, V = v.visible);
  }, e.$$.update = () => {
    e.$$.dirty[0] & /*toolName*/
    4 && n(13, { tool: o, opts: i } = $t(E) || { tool: void 0, opts: void 0 }, o, (n(25, i), n(2, E))), e.$$.dirty[0] & /*opts, preferredDrawingMode*/
    37748736 && n(12, s = (i == null ? void 0 : i.drawingMode) || p), e.$$.dirty[0] & /*svgEl*/
    16 && n(11, r = si(R)), e.$$.dirty[0] & /*svgEl*/
    16 && n(10, { onPointerDown: l, onPointerUp: a } = li(R, S), l, (n(9, a), n(4, R))), e.$$.dirty[0] & /*$selection*/
    67108864 && n(8, c = (v) => u.selected.find((Q) => Q.id === v.id && Q.editable)), e.$$.dirty[0] & /*$selection*/
    67108864 && P(u.selected);
  }, [
    y,
    _,
    E,
    V,
    R,
    U,
    Y,
    M,
    c,
    a,
    l,
    r,
    s,
    o,
    f,
    d,
    w,
    S,
    G,
    x,
    Me,
    b,
    p,
    A,
    B,
    i,
    u,
    se,
    Le
  ];
}
class pi extends oe {
  constructor(t) {
    super(), ne(
      this,
      t,
      mi,
      gi,
      J,
      {
        drawingEnabled: 0,
        image: 21,
        preferredDrawingMode: 22,
        state: 23,
        style: 1,
        toolName: 2,
        user: 24,
        visible: 3
      },
      null,
      [-1, -1]
    );
  }
}
function yi(e, t, n, o, i) {
  tn(e, t, n || 0, o || e.length - 1, i || _i);
}
function tn(e, t, n, o, i) {
  for (; o > n; ) {
    if (o - n > 600) {
      var s = o - n + 1, r = t - n + 1, l = Math.log(s), a = 0.5 * Math.exp(2 * l / 3), c = 0.5 * Math.sqrt(l * a * (s - a) / s) * (r - s / 2 < 0 ? -1 : 1), u = Math.max(n, Math.floor(t - r * a / s + c)), f = Math.min(o, Math.floor(t + (s - r) * a / s + c));
      tn(e, t, u, f, i);
    }
    var d = e[t], g = n, m = o;
    for (ve(e, n, t), i(e[o], d) > 0 && ve(e, n, o); g < m; ) {
      for (ve(e, g, m), g++, m--; i(e[g], d) < 0; )
        g++;
      for (; i(e[m], d) > 0; )
        m--;
    }
    i(e[n], d) === 0 ? ve(e, n, m) : (m++, ve(e, m, o)), m <= t && (n = m + 1), t <= m && (o = m - 1);
  }
}
function ve(e, t, n) {
  var o = e[t];
  e[t] = e[n], e[n] = o;
}
function _i(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
class wi {
  constructor(t = 9) {
    this._maxEntries = Math.max(4, t), this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4)), this.clear();
  }
  all() {
    return this._all(this.data, []);
  }
  search(t) {
    let n = this.data;
    const o = [];
    if (!Ve(t, n))
      return o;
    const i = this.toBBox, s = [];
    for (; n; ) {
      for (let r = 0; r < n.children.length; r++) {
        const l = n.children[r], a = n.leaf ? i(l) : l;
        Ve(t, a) && (n.leaf ? o.push(l) : tt(t, a) ? this._all(l, o) : s.push(l));
      }
      n = s.pop();
    }
    return o;
  }
  collides(t) {
    let n = this.data;
    if (!Ve(t, n))
      return !1;
    const o = [];
    for (; n; ) {
      for (let i = 0; i < n.children.length; i++) {
        const s = n.children[i], r = n.leaf ? this.toBBox(s) : s;
        if (Ve(t, r)) {
          if (n.leaf || tt(t, r))
            return !0;
          o.push(s);
        }
      }
      n = o.pop();
    }
    return !1;
  }
  load(t) {
    if (!(t && t.length))
      return this;
    if (t.length < this._minEntries) {
      for (let o = 0; o < t.length; o++)
        this.insert(t[o]);
      return this;
    }
    let n = this._build(t.slice(), 0, t.length - 1, 0);
    if (!this.data.children.length)
      this.data = n;
    else if (this.data.height === n.height)
      this._splitRoot(this.data, n);
    else {
      if (this.data.height < n.height) {
        const o = this.data;
        this.data = n, n = o;
      }
      this._insert(n, this.data.height - n.height - 1, !0);
    }
    return this;
  }
  insert(t) {
    return t && this._insert(t, this.data.height - 1), this;
  }
  clear() {
    return this.data = be([]), this;
  }
  remove(t, n) {
    if (!t)
      return this;
    let o = this.data;
    const i = this.toBBox(t), s = [], r = [];
    let l, a, c;
    for (; o || s.length; ) {
      if (o || (o = s.pop(), a = s[s.length - 1], l = r.pop(), c = !0), o.leaf) {
        const u = bi(t, o.children, n);
        if (u !== -1)
          return o.children.splice(u, 1), s.push(o), this._condense(s), this;
      }
      !c && !o.leaf && tt(o, i) ? (s.push(o), r.push(l), l = 0, a = o, o = o.children[0]) : a ? (l++, o = a.children[l], c = !1) : o = null;
    }
    return this;
  }
  toBBox(t) {
    return t;
  }
  compareMinX(t, n) {
    return t.minX - n.minX;
  }
  compareMinY(t, n) {
    return t.minY - n.minY;
  }
  toJSON() {
    return this.data;
  }
  fromJSON(t) {
    return this.data = t, this;
  }
  _all(t, n) {
    const o = [];
    for (; t; )
      t.leaf ? n.push(...t.children) : o.push(...t.children), t = o.pop();
    return n;
  }
  _build(t, n, o, i) {
    const s = o - n + 1;
    let r = this._maxEntries, l;
    if (s <= r)
      return l = be(t.slice(n, o + 1)), _e(l, this.toBBox), l;
    i || (i = Math.ceil(Math.log(s) / Math.log(r)), r = Math.ceil(s / Math.pow(r, i - 1))), l = be([]), l.leaf = !1, l.height = i;
    const a = Math.ceil(s / r), c = a * Math.ceil(Math.sqrt(r));
    Ct(t, n, o, c, this.compareMinX);
    for (let u = n; u <= o; u += c) {
      const f = Math.min(u + c - 1, o);
      Ct(t, u, f, a, this.compareMinY);
      for (let d = u; d <= f; d += a) {
        const g = Math.min(d + a - 1, f);
        l.children.push(this._build(t, d, g, i - 1));
      }
    }
    return _e(l, this.toBBox), l;
  }
  _chooseSubtree(t, n, o, i) {
    for (; i.push(n), !(n.leaf || i.length - 1 === o); ) {
      let s = 1 / 0, r = 1 / 0, l;
      for (let a = 0; a < n.children.length; a++) {
        const c = n.children[a], u = et(c), f = Si(t, c) - u;
        f < r ? (r = f, s = u < s ? u : s, l = c) : f === r && u < s && (s = u, l = c);
      }
      n = l || n.children[0];
    }
    return n;
  }
  _insert(t, n, o) {
    const i = o ? t : this.toBBox(t), s = [], r = this._chooseSubtree(i, this.data, n, s);
    for (r.children.push(t), Be(r, i); n >= 0 && s[n].children.length > this._maxEntries; )
      this._split(s, n), n--;
    this._adjustParentBBoxes(i, s, n);
  }
  // split overflowed node into two
  _split(t, n) {
    const o = t[n], i = o.children.length, s = this._minEntries;
    this._chooseSplitAxis(o, s, i);
    const r = this._chooseSplitIndex(o, s, i), l = be(o.children.splice(r, o.children.length - r));
    l.height = o.height, l.leaf = o.leaf, _e(o, this.toBBox), _e(l, this.toBBox), n ? t[n - 1].children.push(l) : this._splitRoot(o, l);
  }
  _splitRoot(t, n) {
    this.data = be([t, n]), this.data.height = t.height + 1, this.data.leaf = !1, _e(this.data, this.toBBox);
  }
  _chooseSplitIndex(t, n, o) {
    let i, s = 1 / 0, r = 1 / 0;
    for (let l = n; l <= o - n; l++) {
      const a = Oe(t, 0, l, this.toBBox), c = Oe(t, l, o, this.toBBox), u = Ti(a, c), f = et(a) + et(c);
      u < s ? (s = u, i = l, r = f < r ? f : r) : u === s && f < r && (r = f, i = l);
    }
    return i || o - n;
  }
  // sorts node children by the best axis for split
  _chooseSplitAxis(t, n, o) {
    const i = t.leaf ? this.compareMinX : Ei, s = t.leaf ? this.compareMinY : Ai, r = this._allDistMargin(t, n, o, i), l = this._allDistMargin(t, n, o, s);
    r < l && t.children.sort(i);
  }
  // total margin of all possible split distributions where each node is at least m full
  _allDistMargin(t, n, o, i) {
    t.children.sort(i);
    const s = this.toBBox, r = Oe(t, 0, n, s), l = Oe(t, o - n, o, s);
    let a = Ue(r) + Ue(l);
    for (let c = n; c < o - n; c++) {
      const u = t.children[c];
      Be(r, t.leaf ? s(u) : u), a += Ue(r);
    }
    for (let c = o - n - 1; c >= n; c--) {
      const u = t.children[c];
      Be(l, t.leaf ? s(u) : u), a += Ue(l);
    }
    return a;
  }
  _adjustParentBBoxes(t, n, o) {
    for (let i = o; i >= 0; i--)
      Be(n[i], t);
  }
  _condense(t) {
    for (let n = t.length - 1, o; n >= 0; n--)
      t[n].children.length === 0 ? n > 0 ? (o = t[n - 1].children, o.splice(o.indexOf(t[n]), 1)) : this.clear() : _e(t[n], this.toBBox);
  }
}
function bi(e, t, n) {
  if (!n)
    return t.indexOf(e);
  for (let o = 0; o < t.length; o++)
    if (n(e, t[o]))
      return o;
  return -1;
}
function _e(e, t) {
  Oe(e, 0, e.children.length, t, e);
}
function Oe(e, t, n, o, i) {
  i || (i = be(null)), i.minX = 1 / 0, i.minY = 1 / 0, i.maxX = -1 / 0, i.maxY = -1 / 0;
  for (let s = t; s < n; s++) {
    const r = e.children[s];
    Be(i, e.leaf ? o(r) : r);
  }
  return i;
}
function Be(e, t) {
  return e.minX = Math.min(e.minX, t.minX), e.minY = Math.min(e.minY, t.minY), e.maxX = Math.max(e.maxX, t.maxX), e.maxY = Math.max(e.maxY, t.maxY), e;
}
function Ei(e, t) {
  return e.minX - t.minX;
}
function Ai(e, t) {
  return e.minY - t.minY;
}
function et(e) {
  return (e.maxX - e.minX) * (e.maxY - e.minY);
}
function Ue(e) {
  return e.maxX - e.minX + (e.maxY - e.minY);
}
function Si(e, t) {
  return (Math.max(t.maxX, e.maxX) - Math.min(t.minX, e.minX)) * (Math.max(t.maxY, e.maxY) - Math.min(t.minY, e.minY));
}
function Ti(e, t) {
  const n = Math.max(e.minX, t.minX), o = Math.max(e.minY, t.minY), i = Math.min(e.maxX, t.maxX), s = Math.min(e.maxY, t.maxY);
  return Math.max(0, i - n) * Math.max(0, s - o);
}
function tt(e, t) {
  return e.minX <= t.minX && e.minY <= t.minY && t.maxX <= e.maxX && t.maxY <= e.maxY;
}
function Ve(e, t) {
  return t.minX <= e.maxX && t.minY <= e.maxY && t.maxX >= e.minX && t.maxY >= e.minY;
}
function be(e) {
  return {
    children: e,
    height: 1,
    leaf: !0,
    minX: 1 / 0,
    minY: 1 / 0,
    maxX: -1 / 0,
    maxY: -1 / 0
  };
}
function Ct(e, t, n, o, i) {
  const s = [t, n];
  for (; s.length; ) {
    if (n = s.pop(), t = s.pop(), n - t <= o)
      continue;
    const r = t + Math.ceil((n - t) / o / 2) * o;
    yi(e, r, t, n, i), s.push(t, r, r, n);
  }
}
const Mi = () => {
  const e = new wi(), t = /* @__PURE__ */ new Map(), n = () => [...t.values()], o = () => {
    e.clear(), t.clear();
  }, i = (f) => {
    const { minX: d, minY: g, maxX: m, maxY: y } = f.selector.geometry.bounds, b = { minX: d, minY: g, maxX: m, maxY: y, target: f };
    e.insert(b), t.set(f.annotation, b);
  }, s = (f) => {
    const d = t.get(f.annotation);
    d && e.remove(d), t.delete(f.annotation);
  };
  return {
    all: n,
    clear: o,
    getAt: (f, d) => {
      const m = e.search({
        minX: f,
        minY: d,
        maxX: f,
        maxY: d
      }).map((y) => y.target).filter((y) => y.selector.type === q.RECTANGLE || wn(y.selector, f, d));
      if (m.length > 0)
        return m.sort((y, b) => st(y.selector) - st(b.selector)), m[0];
    },
    getIntersecting: (f, d, g, m) => e.search({
      minX: f,
      minY: d,
      maxX: f + g,
      maxY: d + m
    }).map((y) => y.target),
    insert: i,
    remove: s,
    set: (f, d = !0) => {
      d && o();
      const g = f.map((m) => {
        const { minX: y, minY: b, maxX: p, maxY: A } = m.selector.geometry.bounds;
        return { minX: y, minY: b, maxX: p, maxY: A, target: m };
      });
      g.forEach((m) => t.set(m.target.annotation, m)), e.load(g);
    },
    size: () => e.all().length,
    update: (f, d) => {
      s(f), i(d);
    }
  };
}, Li = (e) => {
  const t = Kn(), n = Mi(), o = Rn(t, e.pointerSelectAction), i = Cn(t), s = xn();
  return t.observe(({ changes: a }) => {
    n.set((a.created || []).map((c) => c.target), !1), (a.deleted || []).forEach((c) => n.remove(c.target)), (a.updated || []).forEach(({ oldValue: c, newValue: u }) => n.update(c.target, u.target));
  }), {
    store: {
      ...t,
      getAt: (a, c) => {
        const u = n.getAt(a, c);
        return u ? t.getAnnotation(u.annotation) : void 0;
      },
      getIntersecting: (a, c, u, f) => n.getIntersecting(a, c, u, f).map((d) => t.getAnnotation(d.annotation))
    },
    selection: o,
    hover: i,
    viewport: s
  };
}, vi = (e) => {
  const t = Li(e);
  return {
    ...t,
    store: Wn(t.store)
  };
}, ki = (e) => {
  let t, n;
  if (e.nodeName === "CANVAS")
    t = e, n = t.getContext("2d", { willReadFrequently: !0 });
  else {
    const i = e;
    t = document.createElement("canvas"), t.width = i.width, t.height = i.height, n = t.getContext("2d", { willReadFrequently: !0 }), n.drawImage(i, 0, 0, i.width, i.height);
  }
  let o = 0;
  for (let i = 1; i < 10; i++)
    for (let s = 1; s < 10; s++) {
      const r = Math.round(s * t.width / 10), l = Math.round(i * t.height / 10), a = n.getImageData(r, l, 1, 1).data, c = (0.299 * a[0] + 0.587 * a[1] + 0.114 * a[2]) / 255;
      o += c;
    }
  return o / 81;
}, Oi = (e) => {
  const t = ki(e), n = t > 0.6 ? "dark" : "light";
  return console.log(`[Annotorious] Image brightness: ${t.toFixed(1)}. Setting ${n} theme.`), n;
}, Rt = (e, t, n) => t.setAttribute("data-theme", n === "auto" ? Oi(e) : n), Bi = (e, t) => ({
  ...e,
  drawingEnabled: e.drawingEnabled === void 0 ? t.drawingEnabled : e.drawingEnabled,
  drawingMode: e.drawingMode || t.drawingMode,
  pointerSelectAction: e.pointerSelectAction || t.pointerSelectAction,
  theme: e.theme || t.theme
}), Nt = navigator.userAgent.indexOf("Mac OS X") !== -1, Ii = (e, t) => {
  const n = t || document, o = (r) => {
    const l = r;
    l.key === "z" && l.ctrlKey ? e.undo() : l.key === "y" && l.ctrlKey && e.redo();
  }, i = (r) => {
    const l = r;
    l.key === "z" && l.metaKey && (l.shiftKey ? e.redo() : e.undo());
  }, s = () => {
    Nt ? n.removeEventListener("keydown", i) : n.removeEventListener("keydown", o);
  };
  return Nt ? n.addEventListener("keydown", i) : n.addEventListener("keydown", o), {
    destroy: s
  };
}, Xi = (e, t = {}) => {
  if (!e)
    throw "Missing argument: image";
  const n = typeof e == "string" ? document.getElementById(e) : e, o = Bi(t, {
    drawingEnabled: !0,
    drawingMode: "drag",
    pointerSelectAction: Kt.EDIT,
    theme: "light"
  }), i = vi(o), { selection: s, store: r } = i, l = Zn(r), a = $n(
    i,
    l,
    o.adapter,
    o.autoSave
  ), c = document.createElement("DIV");
  c.style.position = "relative", c.style.display = "inline-block", n.style.display = "block", n.parentNode.insertBefore(c, n), c.appendChild(n);
  const u = Ii(l);
  let f = lo();
  Rt(n, c, o.theme);
  const d = new pi({
    target: c,
    props: {
      drawingEnabled: !!o.drawingEnabled,
      image: n,
      preferredDrawingMode: o.drawingMode,
      state: i,
      style: o.style,
      user: f
    }
  });
  d.$on("click", (Y) => {
    const { originalEvent: w, annotation: S } = Y.detail;
    S ? s.clickSelect(S.id, w) : s.isEmpty() || s.clear();
  });
  const g = to(i, l, o.adapter), m = () => {
    d.$destroy(), c.parentNode.insertBefore(n, c), c.parentNode.removeChild(c), u.destroy(), l.destroy();
  }, y = () => f, b = (Y, w, S) => Ko(Y, w, S), p = (Y, w) => Io(Y, w), A = (Y) => {
    if (!$t(Y))
      throw `No drawing tool named ${Y}`;
    d.$set({ toolName: Y });
  }, _ = (Y) => d.$set({ drawingEnabled: Y }), E = (Y) => {
    console.warn("Filter not implemented yet");
  }, B = (Y) => d.$set({ style: Y }), V = (Y) => Rt(n, c, Y), U = (Y) => {
    f = Y, d.$set({ user: Y });
  }, R = (Y) => (
    // @ts-ignore
    d.$set({ visible: Y })
  );
  return {
    ...g,
    destroy: m,
    getUser: y,
    listDrawingTools: xt,
    on: a.on,
    off: a.off,
    registerDrawingTool: b,
    registerShapeEditor: p,
    setDrawingEnabled: _,
    setDrawingTool: A,
    setFilter: E,
    setStyle: B,
    setTheme: V,
    setUser: U,
    setVisible: R,
    state: i
  };
};
export {
  Zt as Editor,
  Co as EditorMount,
  ke as Handle,
  Di as IdentityTransform,
  yo as PolygonEditor,
  Oo as RectangleEditor,
  An as RectangleUtil,
  Go as RubberbandRectangle,
  pi as SVGAnnotationLayer,
  q as ShapeType,
  No as ToolMount,
  Yi as W3CImageFormat,
  li as addEventListeners,
  Fe as boundsFromPoints,
  st as computeArea,
  Xi as createImageAnnotator,
  Li as createImageAnnotatorState,
  si as createSVGTransform,
  vi as createSvelteImageAnnotatorState,
  Oi as detectTheme,
  Ze as distance,
  bo as enableResponsive,
  Bi as fillDefaults,
  Bo as getEditor,
  $t as getTool,
  Ii as initKeyboardCommands,
  wn as intersects,
  Eo as isTouch,
  xt as listDrawingTools,
  Sn as parseFragmentSelector,
  On as parseSVGSelector,
  uo as parseW3CImageAnnotation,
  Io as registerEditor,
  at as registerShapeUtil,
  Ko as registerTool,
  ki as sampleBrightness,
  Tn as serializeFragmentSelector,
  Bn as serializeSVGSelector,
  ho as serializeW3CImageAnnotation,
  Rt as setTheme
};
//# sourceMappingURL=annotorious.es.js.map
