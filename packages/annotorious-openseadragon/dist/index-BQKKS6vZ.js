var qa = Object.defineProperty;
var Za = (e, t, n) => t in e ? qa(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var mt = (e, t, n) => (Za(e, typeof t != "symbol" ? t + "" : t, n), n);
import Cn from "openseadragon";
var Gi = Object.prototype.hasOwnProperty;
function Be(e, t) {
  var n, s;
  if (e === t)
    return !0;
  if (e && t && (n = e.constructor) === t.constructor) {
    if (n === Date)
      return e.getTime() === t.getTime();
    if (n === RegExp)
      return e.toString() === t.toString();
    if (n === Array) {
      if ((s = e.length) === t.length)
        for (; s-- && Be(e[s], t[s]); )
          ;
      return s === -1;
    }
    if (!n || typeof e == "object") {
      s = 0;
      for (n in e)
        if (Gi.call(e, n) && ++s && !Gi.call(t, n) || !(n in t) || !Be(e[n], t[n]))
          return !1;
      return Object.keys(t).length === s;
    }
  }
  return e !== e && t !== t;
}
var yi = /* @__PURE__ */ ((e) => (e.EDIT = "EDIT", e.SELECT = "SELECT", e.NONE = "NONE", e))(yi || {});
let Gn;
const Ka = new Uint8Array(16);
function Qa() {
  if (!Gn && (Gn = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !Gn))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Gn(Ka);
}
const pt = [];
for (let e = 0; e < 256; ++e)
  pt.push((e + 256).toString(16).slice(1));
function Ja(e, t = 0) {
  return pt[e[t + 0]] + pt[e[t + 1]] + pt[e[t + 2]] + pt[e[t + 3]] + "-" + pt[e[t + 4]] + pt[e[t + 5]] + "-" + pt[e[t + 6]] + pt[e[t + 7]] + "-" + pt[e[t + 8]] + pt[e[t + 9]] + "-" + pt[e[t + 10]] + pt[e[t + 11]] + pt[e[t + 12]] + pt[e[t + 13]] + pt[e[t + 14]] + pt[e[t + 15]];
}
const tl = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), $i = {
  randomUUID: tl
};
function el(e, t, n) {
  if ($i.randomUUID && !t && !e)
    return $i.randomUUID();
  e = e || {};
  const s = e.random || (e.rng || Qa)();
  return s[6] = s[6] & 15 | 64, s[8] = s[8] & 63 | 128, Ja(s);
}
const nl = (e, t, n, s) => ({
  id: el(),
  annotation: e.id,
  created: n || /* @__PURE__ */ new Date(),
  creator: s,
  ...t
}), sl = (e, t) => {
  const n = new Set(e.bodies.map((s) => s.id));
  return t.bodies.filter((s) => !n.has(s.id));
}, il = (e, t) => {
  const n = new Set(t.bodies.map((s) => s.id));
  return e.bodies.filter((s) => !n.has(s.id));
}, rl = (e, t) => t.bodies.map((n) => {
  const s = e.bodies.find((i) => i.id === n.id);
  return { newBody: n, oldBody: s && !Be(s, n) ? s : void 0 };
}).filter(({ oldBody: n }) => n).map(({ oldBody: n, newBody: s }) => ({ oldBody: n, newBody: s })), ol = (e, t) => !Be(e.target, t.target), al = (e, t) => {
  const n = sl(e, t), s = il(e, t), i = rl(e, t);
  return {
    oldValue: e,
    newValue: t,
    bodiesCreated: n.length > 0 ? n : void 0,
    bodiesDeleted: s.length > 0 ? s : void 0,
    bodiesUpdated: i.length > 0 ? i : void 0,
    targetUpdated: ol(e, t) ? { oldTarget: e.target, newTarget: t.target } : void 0
  };
};
var ye = /* @__PURE__ */ ((e) => (e.LOCAL = "LOCAL", e.REMOTE = "REMOTE", e))(ye || {});
const ll = (e, t) => {
  const n = new Set((e.created || []).map((u) => u.id)), s = new Set((e.updated || []).map(({ newValue: u }) => u.id)), i = new Set((t.created || []).map((u) => u.id)), r = new Set((t.deleted || []).map((u) => u.id)), o = new Set((t.updated || []).map(({ oldValue: u }) => u.id)), a = new Set((t.updated || []).filter(({ oldValue: u }) => n.has(u.id) || s.has(u.id)).map(({ oldValue: u }) => u.id)), l = [
    ...(e.created || []).filter((u) => !r.has(u.id)).map((u) => o.has(u.id) ? t.updated.find(({ oldValue: d }) => d.id === u.id).newValue : u),
    ...t.created || []
  ], h = [
    ...(e.deleted || []).filter((u) => !i.has(u.id)),
    ...(t.deleted || []).filter((u) => !n.has(u.id))
  ], c = [
    ...(e.updated || []).filter(({ newValue: u }) => !r.has(u.id)).map((u) => {
      const { oldValue: d, newValue: f } = u;
      if (o.has(f.id)) {
        const m = t.updated.find((g) => g.oldValue.id === f.id).newValue;
        return al(d, m);
      } else
        return u;
    }),
    ...(t.updated || []).filter(({ oldValue: u }) => !a.has(u.id))
  ];
  return { created: l, deleted: h, updated: c };
};
let hl = () => ({
  emit(e, ...t) {
    for (let n = 0, s = this.events[e] || [], i = s.length; n < i; n++)
      s[n](...t);
  },
  events: {},
  on(e, t) {
    var n;
    return ((n = this.events)[e] || (n[e] = [])).push(t), () => {
      var s;
      this.events[e] = (s = this.events[e]) == null ? void 0 : s.filter((i) => t !== i);
    };
  }
});
const cl = 250, ul = (e) => {
  const t = hl(), n = [];
  let s = -1, i = !1, r = 0;
  const o = (f) => {
    if (!i) {
      const { changes: m } = f, g = performance.now();
      if (g - r > cl)
        n.splice(s + 1), n.push(m), s = n.length - 1;
      else {
        const p = n.length - 1;
        n[p] = ll(n[p], m);
      }
      r = g;
    }
    i = !1;
  };
  e.observe(o, { origin: ye.LOCAL });
  const a = (f) => f && f.length > 0 && e.bulkDeleteAnnotation(f), l = (f) => f && f.length > 0 && e.bulkAddAnnotation(f, !1), h = (f) => f && f.length > 0 && e.bulkUpdateAnnotation(f.map(({ oldValue: m }) => m)), c = (f) => f && f.length > 0 && e.bulkUpdateAnnotation(f.map(({ newValue: m }) => m)), u = (f) => f && f.length > 0 && e.bulkAddAnnotation(f, !1), d = (f) => f && f.length > 0 && e.bulkDeleteAnnotation(f);
  return {
    canRedo: () => n.length - 1 > s,
    canUndo: () => s > -1,
    destroy: () => e.unobserve(o),
    on: (f, m) => t.on(f, m),
    redo: () => {
      if (n.length - 1 > s) {
        i = !0;
        const { created: f, updated: m, deleted: g } = n[s + 1];
        l(f), c(m), d(g), t.emit("redo", n[s + 1]), s += 1;
      }
    },
    undo: () => {
      if (s > -1) {
        i = !0;
        const { created: f, updated: m, deleted: g } = n[s];
        a(f), h(m), u(g), t.emit("undo", n[s]), s -= 1;
      }
    }
  };
}, dl = (e, t, n, s) => {
  const { store: i, selection: r, hover: o, viewport: a } = e, l = /* @__PURE__ */ new Map();
  let h = [], c, u;
  const d = (y, x) => {
    l.has(y) ? l.get(y).push(x) : l.set(y, [x]);
  }, f = (y, x) => {
    const b = l.get(y);
    b && b.indexOf(x) > 0 && b.splice(b.indexOf(x), 1);
  }, m = (y, x, b) => {
    l.has(y) && setTimeout(() => {
      l.get(y).forEach((_) => {
        if (n) {
          const M = Array.isArray(x) ? x.map((k) => n.serialize(k)) : n.serialize(x), B = b ? b instanceof PointerEvent ? b : n.serialize(b) : void 0;
          _(M, B);
        } else
          _(x, b);
      });
    }, 1);
  }, g = () => {
    const { selected: y } = r, x = (y || []).map(({ id: b }) => i.getAnnotation(b));
    x.forEach((b) => {
      const _ = h.find((M) => M.id === b.id);
      (!_ || !Be(_, b)) && m("updateAnnotation", b, _);
    }), h = h.map((b) => x.find(({ id: M }) => M === b.id) || b);
  };
  r.subscribe(({ selected: y }) => {
    if (!(h.length === 0 && y.length === 0)) {
      if (h.length === 0 && y.length > 0)
        h = y.map(({ id: x }) => i.getAnnotation(x));
      else if (h.length > 0 && y.length === 0)
        h.forEach((x) => {
          const b = i.getAnnotation(x.id);
          b && !Be(b, x) && m("updateAnnotation", b, x);
        }), h = [];
      else {
        const x = new Set(h.map((_) => _.id)), b = new Set(y.map(({ id: _ }) => _));
        h.filter((_) => !b.has(_.id)).forEach((_) => {
          const M = i.getAnnotation(_.id);
          M && !Be(M, _) && m("updateAnnotation", M, _);
        }), h = [
          // Remove annotations that were deselected
          ...h.filter((_) => b.has(_.id)),
          // Add editable annotations that were selected
          ...y.filter(({ id: _ }) => !x.has(_)).map(({ id: _ }) => i.getAnnotation(_))
        ];
      }
      m("selectionChanged", h);
    }
  }), o.subscribe((y) => {
    !c && y ? m("mouseEnterAnnotation", i.getAnnotation(y)) : c && !y ? m("mouseLeaveAnnotation", i.getAnnotation(c)) : c && y && (m("mouseLeaveAnnotation", i.getAnnotation(c)), m("mouseEnterAnnotation", i.getAnnotation(y))), c = y;
  }), a == null || a.subscribe((y) => m("viewportIntersect", y.map((x) => i.getAnnotation(x)))), i.observe((y) => {
    s && (u && clearTimeout(u), u = setTimeout(g, 1e3));
    const { created: x, deleted: b } = y.changes;
    (x || []).forEach((_) => m("createAnnotation", _)), (b || []).forEach((_) => m("deleteAnnotation", _)), (y.changes.updated || []).filter((_) => [
      ..._.bodiesCreated || [],
      ..._.bodiesDeleted || [],
      ..._.bodiesUpdated || []
    ].length > 0).forEach(({ oldValue: _, newValue: M }) => {
      const B = h.find((k) => k.id === _.id) || _;
      h = h.map((k) => k.id === _.id ? M : k), m("updateAnnotation", M, B);
    });
  }, { origin: ye.LOCAL }), i.observe((y) => {
    if (h) {
      const x = new Set(h.map((_) => _.id)), b = (y.changes.updated || []).filter(({ newValue: _ }) => x.has(_.id)).map(({ newValue: _ }) => _);
      b.length > 0 && (h = h.map((_) => b.find((B) => B.id === _.id) || _));
    }
  }, { origin: ye.REMOTE });
  const p = (y) => (x) => {
    const { updated: b } = x;
    y ? (b || []).forEach((_) => m("updateAnnotation", _.oldValue, _.newValue)) : (b || []).forEach((_) => m("updateAnnotation", _.newValue, _.oldValue));
  };
  return t.on("undo", p(!0)), t.on("redo", p(!1)), { on: d, off: f, emit: m };
}, fl = (e) => (t) => t.reduce((n, s) => {
  const { parsed: i, error: r } = e.parse(s);
  return r ? {
    parsed: n.parsed,
    failed: [...n.failed, s]
  } : i ? {
    parsed: [...n.parsed, i],
    failed: n.failed
  } : {
    ...n
  };
}, { parsed: [], failed: [] }), ml = (e, t, n) => {
  const { store: s, selection: i } = e, r = (p) => {
    if (n) {
      const { parsed: y, error: x } = n.parse(p);
      y ? s.addAnnotation(y, ye.REMOTE) : console.error(x);
    } else
      s.addAnnotation(p, ye.REMOTE);
  }, o = () => i.clear(), a = () => s.clear(), l = (p) => {
    const y = s.getAnnotation(p);
    return n && y ? n.serialize(y) : y;
  }, h = () => n ? s.all().map(n.serialize) : s.all(), c = () => {
    var p;
    const y = (((p = i.selected) == null ? void 0 : p.map((x) => x.id)) || []).map((x) => s.getAnnotation(x)).filter(Boolean);
    return n ? y.map(n.serialize) : y;
  }, u = (p, y = !0) => fetch(p).then((x) => x.json()).then((x) => (f(x, y), x)), d = (p) => {
    if (typeof p == "string") {
      const y = s.getAnnotation(p);
      if (s.deleteAnnotation(p), y)
        return n ? n.serialize(y) : y;
    } else {
      const y = n ? n.parse(p).parsed : p;
      if (y)
        return s.deleteAnnotation(y), p;
    }
  }, f = (p, y = !0) => {
    if (n) {
      const { parsed: x, failed: b } = fl(n)(p);
      b.length > 0 && console.warn(`Discarded ${b.length} invalid annotations`, b), s.bulkAddAnnotation(x, y, ye.REMOTE);
    } else
      s.bulkAddAnnotation(p, y, ye.REMOTE);
  }, m = (p) => {
    p ? i.setSelected(p) : i.clear();
  }, g = (p) => {
    if (n) {
      const y = n.parse(p).parsed, x = n.serialize(s.getAnnotation(y.id));
      return s.updateAnnotation(y), x;
    } else {
      const y = s.getAnnotation(p.id);
      return s.updateAnnotation(p), y;
    }
  };
  return {
    addAnnotation: r,
    cancelSelected: o,
    canRedo: t.canRedo,
    canUndo: t.canUndo,
    clearAnnotations: a,
    getAnnotationById: l,
    getAnnotations: h,
    getSelected: c,
    loadAnnotations: u,
    redo: t.redo,
    removeAnnotation: d,
    setAnnotations: f,
    setSelected: m,
    undo: t.undo,
    updateAnnotation: g
  };
}, pl = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let gl = (e) => crypto.getRandomValues(new Uint8Array(e)), yl = (e, t, n) => {
  let s = (2 << Math.log(e.length - 1) / Math.LN2) - 1, i = -~(1.6 * s * t / e.length);
  return (r = t) => {
    let o = "";
    for (; ; ) {
      let a = n(i), l = i;
      for (; l--; )
        if (o += e[a[l] & s] || "", o.length === r)
          return o;
    }
  };
}, _l = (e, t = 21) => yl(e, t, gl), xl = (e = 21) => {
  let t = "", n = crypto.getRandomValues(new Uint8Array(e));
  for (; e--; )
    t += pl[n[e] & 63];
  return t;
};
const bl = () => ({ isGuest: !0, id: _l("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_", 20)() }), wl = [
  "#ff7c00",
  // orange
  "#1ac938",
  // green
  "#e8000b",
  // red
  "#8b2be2",
  // purple
  "#9f4800",
  // brown
  "#f14cc1",
  // pink
  "#ffc400",
  // khaki
  "#00d7ff",
  // cyan
  "#023eff"
  // blue
], vl = () => {
  const e = [...wl];
  return { assignRandomColor: () => {
    const t = Math.floor(Math.random() * e.length), n = e[t];
    return e.splice(t, 1), n;
  }, releaseColor: (t) => e.push(t) };
};
xl();
var Al = Object.defineProperty, Ml = (e, t, n) => t in e ? Al(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Ni = (e, t, n) => (Ml(e, typeof t != "symbol" ? t + "" : t, n), n);
function at() {
}
function js(e, t) {
  for (const n in t)
    e[n] = t[n];
  return (
    /** @type {T & S} */
    e
  );
}
function go(e) {
  return e();
}
function Di() {
  return /* @__PURE__ */ Object.create(null);
}
function ie(e) {
  e.forEach(go);
}
function ut(e) {
  return typeof e == "function";
}
function Et(e, t) {
  return e != e ? t == t : e !== t || e && typeof e == "object" || typeof e == "function";
}
function Sl(e) {
  return Object.keys(e).length === 0;
}
function yo(e, ...t) {
  if (e == null) {
    for (const s of t)
      s(void 0);
    return at;
  }
  const n = e.subscribe(...t);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
function Ui(e, t, n) {
  e.$$.on_destroy.push(yo(t, n));
}
function Tl(e, t, n, s) {
  if (e) {
    const i = _o(e, t, n, s);
    return e[0](i);
  }
}
function _o(e, t, n, s) {
  return e[1] && s ? js(n.ctx.slice(), e[1](s(t))) : n.ctx;
}
function El(e, t, n, s) {
  if (e[2] && s) {
    const i = e[2](s(n));
    if (t.dirty === void 0)
      return i;
    if (typeof i == "object") {
      const r = [], o = Math.max(t.dirty.length, i.length);
      for (let a = 0; a < o; a += 1)
        r[a] = t.dirty[a] | i[a];
      return r;
    }
    return t.dirty | i;
  }
  return t.dirty;
}
function Cl(e, t, n, s, i, r) {
  if (i) {
    const o = _o(t, n, s, r);
    e.p(o, i);
  }
}
function Pl(e) {
  if (e.ctx.length > 32) {
    const t = [], n = e.ctx.length / 32;
    for (let s = 0; s < n; s++)
      t[s] = -1;
    return t;
  }
  return -1;
}
function Hi(e) {
  const t = {};
  for (const n in e)
    n[0] !== "$" && (t[n] = e[n]);
  return t;
}
function rs(e) {
  return e ?? "";
}
const kl = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : (
  // @ts-ignore Node typings have this
  global
);
function te(e, t) {
  e.appendChild(t);
}
function U(e, t, n) {
  e.insertBefore(t, n || null);
}
function N(e) {
  e.parentNode && e.parentNode.removeChild(e);
}
function _i(e, t) {
  for (let n = 0; n < e.length; n += 1)
    e[n] && e[n].d(t);
}
function K(e) {
  return document.createElementNS("http://www.w3.org/2000/svg", e);
}
function xo(e) {
  return document.createTextNode(e);
}
function qt() {
  return xo(" ");
}
function re() {
  return xo("");
}
function ht(e, t, n, s) {
  return e.addEventListener(t, n, s), () => e.removeEventListener(t, n, s);
}
function v(e, t, n) {
  n == null ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n);
}
function Il(e) {
  return Array.from(e.childNodes);
}
function qe(e, t, n) {
  e.classList.toggle(t, !!n);
}
function Bl(e, t, { bubbles: n = !1, cancelable: s = !1 } = {}) {
  return new CustomEvent(e, { detail: t, bubbles: n, cancelable: s });
}
let Pn;
function An(e) {
  Pn = e;
}
function bo() {
  if (!Pn)
    throw new Error("Function called outside component initialization");
  return Pn;
}
function Fn(e) {
  bo().$$.on_mount.push(e);
}
function on() {
  const e = bo();
  return (t, n, { cancelable: s = !1 } = {}) => {
    const i = e.$$.callbacks[t];
    if (i) {
      const r = Bl(
        /** @type {string} */
        t,
        n,
        { cancelable: s }
      );
      return i.slice().forEach((o) => {
        o.call(e, r);
      }), !r.defaultPrevented;
    }
    return !0;
  };
}
function ae(e, t) {
  const n = e.$$.callbacks[t.type];
  n && n.slice().forEach((s) => s.call(this, t));
}
const Ue = [], os = [];
let Ke = [];
const Vi = [], Rl = /* @__PURE__ */ Promise.resolve();
let qs = !1;
function Ol() {
  qs || (qs = !0, Rl.then(wo));
}
function Zs(e) {
  Ke.push(e);
}
const ws = /* @__PURE__ */ new Set();
let Le = 0;
function wo() {
  if (Le !== 0)
    return;
  const e = Pn;
  do {
    try {
      for (; Le < Ue.length; ) {
        const t = Ue[Le];
        Le++, An(t), Yl(t.$$);
      }
    } catch (t) {
      throw Ue.length = 0, Le = 0, t;
    }
    for (An(null), Ue.length = 0, Le = 0; os.length; )
      os.pop()();
    for (let t = 0; t < Ke.length; t += 1) {
      const n = Ke[t];
      ws.has(n) || (ws.add(n), n());
    }
    Ke.length = 0;
  } while (Ue.length);
  for (; Vi.length; )
    Vi.pop()();
  qs = !1, ws.clear(), An(e);
}
function Yl(e) {
  if (e.fragment !== null) {
    e.update(), ie(e.before_update);
    const t = e.dirty;
    e.dirty = [-1], e.fragment && e.fragment.p(e.ctx, t), e.after_update.forEach(Zs);
  }
}
function Ll(e) {
  const t = [], n = [];
  Ke.forEach((s) => e.indexOf(s) === -1 ? t.push(s) : n.push(s)), n.forEach((s) => s()), Ke = t;
}
const ss = /* @__PURE__ */ new Set();
let ke;
function ee() {
  ke = {
    r: 0,
    c: [],
    p: ke
    // parent group
  };
}
function ne() {
  ke.r || ie(ke.c), ke = ke.p;
}
function V(e, t) {
  e && e.i && (ss.delete(e), e.i(t));
}
function Z(e, t, n, s) {
  if (e && e.o) {
    if (ss.has(e))
      return;
    ss.add(e), ke.c.push(() => {
      ss.delete(e), s && (n && e.d(1), s());
    }), e.o(t);
  } else
    s && s();
}
function Je(e) {
  return (e == null ? void 0 : e.length) !== void 0 ? e : Array.from(e);
}
function Ht(e) {
  e && e.c();
}
function Ft(e, t, n) {
  const { fragment: s, after_update: i } = e.$$;
  s && s.m(t, n), Zs(() => {
    const r = e.$$.on_mount.map(go).filter(ut);
    e.$$.on_destroy ? e.$$.on_destroy.push(...r) : ie(r), e.$$.on_mount = [];
  }), i.forEach(Zs);
}
function Gt(e, t) {
  const n = e.$$;
  n.fragment !== null && (Ll(n.after_update), ie(n.on_destroy), n.fragment && n.fragment.d(t), n.on_destroy = n.fragment = null, n.ctx = []);
}
function Xl(e, t) {
  e.$$.dirty[0] === -1 && (Ue.push(e), Ol(), e.$$.dirty.fill(0)), e.$$.dirty[t / 31 | 0] |= 1 << t % 31;
}
function zt(e, t, n, s, i, r, o = null, a = [-1]) {
  const l = Pn;
  An(e);
  const h = e.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: r,
    update: at,
    not_equal: i,
    bound: Di(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(t.context || (l ? l.$$.context : [])),
    // everything else
    callbacks: Di(),
    dirty: a,
    skip_bound: !1,
    root: t.target || l.$$.root
  };
  o && o(h.root);
  let c = !1;
  if (h.ctx = n ? n(e, t.props || {}, (u, d, ...f) => {
    const m = f.length ? f[0] : d;
    return h.ctx && i(h.ctx[u], h.ctx[u] = m) && (!h.skip_bound && h.bound[u] && h.bound[u](m), c && Xl(e, u)), d;
  }) : [], h.update(), c = !0, ie(h.before_update), h.fragment = s ? s(h.ctx) : !1, t.target) {
    if (t.hydrate) {
      const u = Il(t.target);
      h.fragment && h.fragment.l(u), u.forEach(N);
    } else
      h.fragment && h.fragment.c();
    t.intro && V(e.$$.fragment), Ft(e, t.target, t.anchor), wo();
  }
  An(l);
}
class Wt {
  constructor() {
    Ni(this, "$$"), Ni(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    Gt(this, 1), this.$destroy = at;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(t, n) {
    if (!ut(n))
      return at;
    const s = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return s.push(n), () => {
      const i = s.indexOf(n);
      i !== -1 && s.splice(i, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(t) {
    this.$$set && !Sl(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
}
const Fl = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(Fl);
var et = /* @__PURE__ */ ((e) => (e.ELLIPSE = "ELLIPSE", e.POLYGON = "POLYGON", e.RECTANGLE = "RECTANGLE", e))(et || {});
const xi = {}, bi = (e, t) => xi[e] = t, Ks = (e) => xi[e.type].area(e), Gl = (e, t, n) => xi[e.type].intersects(e, t, n), as = (e) => {
  let t = 1 / 0, n = 1 / 0, s = -1 / 0, i = -1 / 0;
  return e.forEach(([r, o]) => {
    t = Math.min(t, r), n = Math.min(n, o), s = Math.max(s, r), i = Math.max(i, o);
  }), { minX: t, minY: n, maxX: s, maxY: i };
}, $l = {
  area: (e) => Math.PI * e.geometry.rx * e.geometry.ry,
  intersects: (e, t, n) => {
    const { cx: s, cy: i, rx: r, ry: o } = e.geometry, a = 0, l = Math.cos(a), h = Math.sin(a), c = t - s, u = n - i, d = l * c + h * u, f = h * c - l * u;
    return d * d / (r * r) + f * f / (o * o) <= 1;
  }
};
bi(et.ELLIPSE, $l);
const Nl = {
  area: (e) => {
    const { points: t } = e.geometry;
    let n = 0, s = t.length - 1;
    for (let i = 0; i < t.length; i++)
      n += (t[s][0] + t[i][0]) * (t[s][1] - t[i][1]), s = i;
    return Math.abs(0.5 * n);
  },
  intersects: (e, t, n) => {
    const { points: s } = e.geometry;
    let i = !1;
    for (let r = 0, o = s.length - 1; r < s.length; o = r++) {
      const a = s[r][0], l = s[r][1], h = s[o][0], c = s[o][1];
      l > n != c > n && t < (h - a) * (n - l) / (c - l) + a && (i = !i);
    }
    return i;
  }
};
bi(et.POLYGON, Nl);
const Dl = {
  area: (e) => e.geometry.w * e.geometry.h,
  intersects: (e, t, n) => t >= e.geometry.x && t <= e.geometry.x + e.geometry.w && n >= e.geometry.y && n <= e.geometry.y + e.geometry.h
};
bi(et.RECTANGLE, Dl);
const Ul = (e, t = !1) => {
  const n = typeof e == "string" ? e : e.value, s = /^(xywh)=(pixel|percent)?:?(.+?),(.+?),(.+?),(.+)*/g, i = [...n.matchAll(s)][0], [r, o, a, l, h, c, u] = i;
  if (o !== "xywh")
    throw new Error("Unsupported MediaFragment: " + n);
  if (a && a !== "pixel")
    throw new Error(`Unsupported MediaFragment unit: ${a}`);
  const [d, f, m, g] = [l, h, c, u].map(parseFloat);
  return {
    type: et.RECTANGLE,
    geometry: {
      x: d,
      y: f,
      w: m,
      h: g,
      bounds: {
        minX: d,
        minY: t ? f - g : f,
        maxX: d + m,
        maxY: t ? f : f + g
      }
    }
  };
}, Hl = (e) => {
  const { x: t, y: n, w: s, h: i } = e;
  return {
    type: "FragmentSelector",
    conformsTo: "http://www.w3.org/TR/media-frags/",
    value: `xywh=pixel:${t},${n},${s},${i}`
  };
}, vo = "http://www.w3.org/2000/svg", zi = (e) => {
  const t = (s) => {
    Array.from(s.attributes).forEach((i) => {
      i.name.startsWith("on") && s.removeAttribute(i.name);
    });
  }, n = e.getElementsByTagName("script");
  return Array.from(n).reverse().forEach((s) => s.parentNode.removeChild(s)), Array.from(e.querySelectorAll("*")).forEach(t), e;
}, Vl = (e) => {
  const t = new XMLSerializer().serializeToString(e.documentElement).replace("<svg>", `<svg xmlns="${vo}">`);
  return new DOMParser().parseFromString(t, "image/svg+xml").documentElement;
}, zl = (e) => {
  const t = new DOMParser().parseFromString(e, "image/svg+xml"), n = t.lookupPrefix(vo), s = t.lookupNamespaceURI(null);
  return n || s ? zi(t).firstChild : zi(Vl(t)).firstChild;
}, Wl = (e) => {
  const [t, n, s] = e.match(/(<polygon points=["|'])([^("|')]*)/) || [], i = s.split(" ").map((r) => r.split(",").map(parseFloat));
  return {
    type: et.POLYGON,
    geometry: {
      points: i,
      bounds: as(i)
    }
  };
}, jl = (e) => {
  const t = zl(e), n = parseFloat(t.getAttribute("cx")), s = parseFloat(t.getAttribute("cy")), i = parseFloat(t.getAttribute("rx")), r = parseFloat(t.getAttribute("ry")), o = {
    minX: n - i,
    minY: s - r,
    maxX: n + i,
    maxY: s + r
  };
  return {
    type: et.ELLIPSE,
    geometry: {
      cx: n,
      cy: s,
      rx: i,
      ry: r,
      bounds: o
    }
  };
}, ql = (e) => {
  const t = typeof e == "string" ? e : e.value;
  if (t.includes("<polygon points="))
    return Wl(t);
  if (t.includes("<ellipse "))
    return jl(t);
  throw "Unsupported SVG shape: " + t;
}, Zl = (e) => {
  let t;
  if (e.type === et.POLYGON) {
    const n = e.geometry, { points: s } = n;
    t = `<svg><polygon points="${s.map((i) => i.join(",")).join(" ")}" /></svg>`;
  } else if (e.type === et.ELLIPSE) {
    const n = e.geometry;
    t = `<svg><ellipse cx="${n.cx}" cy="${n.cy}" rx="${n.rx}" ry="${n.ry}" /></svg>`;
  }
  if (t)
    return { type: "SvgSelector", value: t };
  throw `Unsupported shape type: ${e.type}`;
};
let $n;
const Kl = new Uint8Array(16);
function Ql() {
  if (!$n && ($n = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !$n))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return $n(Kl);
}
const gt = [];
for (let e = 0; e < 256; ++e)
  gt.push((e + 256).toString(16).slice(1));
function Jl(e, t = 0) {
  return gt[e[t + 0]] + gt[e[t + 1]] + gt[e[t + 2]] + gt[e[t + 3]] + "-" + gt[e[t + 4]] + gt[e[t + 5]] + "-" + gt[e[t + 6]] + gt[e[t + 7]] + "-" + gt[e[t + 8]] + gt[e[t + 9]] + "-" + gt[e[t + 10]] + gt[e[t + 11]] + gt[e[t + 12]] + gt[e[t + 13]] + gt[e[t + 14]] + gt[e[t + 15]];
}
const th = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Wi = {
  randomUUID: th
};
function Ao(e, t, n) {
  if (Wi.randomUUID && !t && !e)
    return Wi.randomUUID();
  e = e || {};
  const s = e.random || (e.rng || Ql)();
  return s[6] = s[6] & 15 | 64, s[8] = s[8] & 63 | 128, Jl(s);
}
var ji = Object.prototype.hasOwnProperty;
function Re(e, t) {
  var n, s;
  if (e === t)
    return !0;
  if (e && t && (n = e.constructor) === t.constructor) {
    if (n === Date)
      return e.getTime() === t.getTime();
    if (n === RegExp)
      return e.toString() === t.toString();
    if (n === Array) {
      if ((s = e.length) === t.length)
        for (; s-- && Re(e[s], t[s]); )
          ;
      return s === -1;
    }
    if (!n || typeof e == "object") {
      s = 0;
      for (n in e)
        if (ji.call(e, n) && ++s && !ji.call(t, n) || !(n in t) || !Re(e[n], t[n]))
          return !1;
      return Object.keys(t).length === s;
    }
  }
  return e !== e && t !== t;
}
function vs() {
}
function eh(e, t) {
  return e != e ? t == t : e !== t || e && typeof e == "object" || typeof e == "function";
}
const Xe = [];
function wi(e, t = vs) {
  let n;
  const s = /* @__PURE__ */ new Set();
  function i(a) {
    if (eh(e, a) && (e = a, n)) {
      const l = !Xe.length;
      for (const h of s)
        h[1](), Xe.push(h, e);
      if (l) {
        for (let h = 0; h < Xe.length; h += 2)
          Xe[h][0](Xe[h + 1]);
        Xe.length = 0;
      }
    }
  }
  function r(a) {
    i(a(e));
  }
  function o(a, l = vs) {
    const h = [a, l];
    return s.add(h), s.size === 1 && (n = t(i, r) || vs), a(e), () => {
      s.delete(h), s.size === 0 && n && (n(), n = null);
    };
  }
  return { set: i, update: r, subscribe: o };
}
const nh = (e) => {
  const { subscribe: t, set: n } = wi();
  let s;
  return t((i) => s = i), e.observe(({ changes: i }) => {
    if (s) {
      (i.deleted || []).some((o) => o.id === s) && n(void 0);
      const r = (i.updated || []).find(({ oldValue: o }) => o.id === s);
      r && n(r.newValue.id);
    }
  }), {
    get current() {
      return s;
    },
    subscribe: t,
    set: n
  };
};
var Mo = /* @__PURE__ */ ((e) => (e.EDIT = "EDIT", e.SELECT = "SELECT", e.NONE = "NONE", e))(Mo || {});
const As = { selected: [] }, sh = (e, t = "EDIT") => {
  const { subscribe: n, set: s } = wi(As);
  let i = As;
  n((u) => i = u);
  const r = () => s(As), o = () => {
    var u;
    return ((u = i.selected) == null ? void 0 : u.length) === 0;
  }, a = (u) => {
    if (i.selected.length === 0)
      return !1;
    const d = typeof u == "string" ? u : u.id;
    return i.selected.some((f) => f.id === d);
  }, l = (u, d) => {
    const f = e.getAnnotation(u);
    if (f) {
      const m = ih(f, t);
      s(m === "EDIT" ? { selected: [{ id: u, editable: !0 }], pointerEvent: d } : m === "SELECT" ? { selected: [{ id: u }], pointerEvent: d } : { selected: [], pointerEvent: d });
    } else
      console.warn("Invalid selection: " + u);
  }, h = (u, d = !0) => {
    const f = Array.isArray(u) ? u : [u], m = f.map((g) => e.getAnnotation(g)).filter(Boolean);
    s({ selected: m.map(({ id: g }) => ({ id: g, editable: d })) }), m.length !== f.length && console.warn("Invalid selection", u);
  }, c = (u) => {
    if (i.selected.length === 0)
      return !1;
    const { selected: d } = i;
    d.filter(({ id: f }) => u.includes(f)).length > 0 && s({ selected: d.filter(({ id: f }) => !u.includes(f)) });
  };
  return e.observe(({ changes: u }) => c((u.deleted || []).map((d) => d.id))), {
    clear: r,
    clickSelect: l,
    get selected() {
      return i ? [...i.selected] : null;
    },
    get pointerEvent() {
      return i ? i.pointerEvent : null;
    },
    isEmpty: o,
    isSelected: a,
    setSelected: h,
    subscribe: n
  };
}, ih = (e, t) => typeof t == "function" ? t(e) || "EDIT" : t || "EDIT", rh = [];
for (let e = 0; e < 256; ++e)
  rh.push((e + 256).toString(16).slice(1));
typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const oh = (e, t) => {
  const n = new Set(e.bodies.map((s) => s.id));
  return t.bodies.filter((s) => !n.has(s.id));
}, ah = (e, t) => {
  const n = new Set(t.bodies.map((s) => s.id));
  return e.bodies.filter((s) => !n.has(s.id));
}, lh = (e, t) => t.bodies.map((n) => {
  const s = e.bodies.find((i) => i.id === n.id);
  return { newBody: n, oldBody: s && !Re(s, n) ? s : void 0 };
}).filter(({ oldBody: n }) => n).map(({ oldBody: n, newBody: s }) => ({ oldBody: n, newBody: s })), hh = (e, t) => !Re(e.target, t.target), So = (e, t) => {
  const n = oh(e, t), s = ah(e, t), i = lh(e, t);
  return {
    oldValue: e,
    newValue: t,
    bodiesCreated: n.length > 0 ? n : void 0,
    bodiesDeleted: s.length > 0 ? s : void 0,
    bodiesUpdated: i.length > 0 ? i : void 0,
    targetUpdated: hh(e, t) ? { oldTarget: e.target, newTarget: t.target } : void 0
  };
};
var it = /* @__PURE__ */ ((e) => (e.LOCAL = "LOCAL", e.REMOTE = "REMOTE", e))(it || {});
const ch = (e, t) => {
  var n, s;
  const { changes: i, origin: r } = t;
  if (!(!e.options.origin || e.options.origin === r))
    return !1;
  if (e.options.ignore) {
    const { ignore: o } = e.options, a = (l) => l && l.length > 0;
    if (!(a(i.created) || a(i.deleted))) {
      const l = (n = i.updated) == null ? void 0 : n.some((c) => a(c.bodiesCreated) || a(c.bodiesDeleted) || a(c.bodiesUpdated)), h = (s = i.updated) == null ? void 0 : s.some((c) => c.targetUpdated);
      if (o === "BODY_ONLY" && l && !h || o === "TARGET_ONLY" && h && !l)
        return !1;
    }
  }
  if (e.options.annotations) {
    const o = /* @__PURE__ */ new Set([
      ...(i.created || []).map((a) => a.id),
      ...(i.deleted || []).map((a) => a.id),
      ...(i.updated || []).map(({ oldValue: a }) => a.id)
    ]);
    return !!(Array.isArray(e.options.annotations) ? e.options.annotations : [e.options.annotations]).find((a) => o.has(a));
  } else
    return !0;
}, uh = (e, t) => {
  const n = new Set((e.created || []).map((u) => u.id)), s = new Set((e.updated || []).map(({ newValue: u }) => u.id)), i = new Set((t.created || []).map((u) => u.id)), r = new Set((t.deleted || []).map((u) => u.id)), o = new Set((t.updated || []).map(({ oldValue: u }) => u.id)), a = new Set((t.updated || []).filter(({ oldValue: u }) => n.has(u.id) || s.has(u.id)).map(({ oldValue: u }) => u.id)), l = [
    ...(e.created || []).filter((u) => !r.has(u.id)).map((u) => o.has(u.id) ? t.updated.find(({ oldValue: d }) => d.id === u.id).newValue : u),
    ...t.created || []
  ], h = [
    ...(e.deleted || []).filter((u) => !i.has(u.id)),
    ...(t.deleted || []).filter((u) => !n.has(u.id))
  ], c = [
    ...(e.updated || []).filter(({ newValue: u }) => !r.has(u.id)).map((u) => {
      const { oldValue: d, newValue: f } = u;
      if (o.has(f.id)) {
        const m = t.updated.find((g) => g.oldValue.id === f.id).newValue;
        return So(d, m);
      } else
        return u;
    }),
    ...(t.updated || []).filter(({ oldValue: u }) => !a.has(u.id))
  ];
  return { created: l, deleted: h, updated: c };
}, dh = (e) => e.id !== void 0, fh = () => {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), n = [], s = (w, P = {}) => n.push({ onChange: w, options: P }), i = (w) => {
    const P = n.findIndex((I) => I.onChange == w);
    P > -1 && n.splice(P, 1);
  }, r = (w, P) => {
    const I = {
      origin: w,
      changes: {
        created: P.created || [],
        updated: P.updated || [],
        deleted: P.deleted || []
      },
      state: [...e.values()]
    };
    n.forEach((T) => {
      ch(T, I) && T.onChange(I);
    });
  }, o = (w, P = it.LOCAL) => {
    if (e.get(w.id))
      throw Error(`Cannot add annotation ${w.id} - exists already`);
    e.set(w.id, w), w.bodies.forEach((I) => t.set(I.id, w.id)), r(P, { created: [w] });
  }, a = (w, P) => {
    const I = typeof w == "string" ? P : w, T = typeof w == "string" ? w : w.id, C = e.get(T);
    if (C) {
      const Y = So(C, I);
      return T === I.id ? e.set(T, I) : (e.delete(T), e.set(I.id, I)), C.bodies.forEach((X) => t.delete(X.id)), I.bodies.forEach((X) => t.set(X.id, I.id)), Y;
    } else
      console.warn(`Cannot update annotation ${T} - does not exist`);
  }, l = (w, P = it.LOCAL, I = it.LOCAL) => {
    const T = dh(P) ? I : P, C = a(w, P);
    C && r(T, { updated: [C] });
  }, h = (w, P = it.LOCAL) => {
    const I = w.reduce((T, C) => {
      const Y = a(C);
      return Y ? [...T, Y] : T;
    }, []);
    I.length > 0 && r(P, { updated: I });
  }, c = (w, P = it.LOCAL) => {
    const I = e.get(w.annotation);
    if (I) {
      const T = {
        ...I,
        bodies: [...I.bodies, w]
      };
      e.set(I.id, T), t.set(w.id, T.id), r(P, { updated: [{
        oldValue: I,
        newValue: T,
        bodiesCreated: [w]
      }] });
    } else
      console.warn(`Attempt to add body to missing annotation: ${w.annotation}`);
  }, u = () => [...e.values()], d = (w = it.LOCAL) => {
    const P = [...e.values()];
    e.clear(), t.clear(), r(w, { deleted: P });
  }, f = (w, P = !0, I = it.LOCAL) => {
    if (P) {
      const T = [...e.values()];
      e.clear(), t.clear(), w.forEach((C) => {
        e.set(C.id, C), C.bodies.forEach((Y) => t.set(Y.id, C.id));
      }), r(I, { created: w, deleted: T });
    } else {
      const T = w.reduce((C, Y) => {
        const X = e.get(Y.id);
        return X ? [...C, X] : C;
      }, []);
      if (T.length > 0)
        throw Error(`Bulk insert would overwrite the following annotations: ${T.map((C) => C.id).join(", ")}`);
      w.forEach((C) => {
        e.set(C.id, C), C.bodies.forEach((Y) => t.set(Y.id, C.id));
      }), r(I, { created: w });
    }
  }, m = (w) => {
    const P = typeof w == "string" ? w : w.id, I = e.get(P);
    if (I)
      return e.delete(P), I.bodies.forEach((T) => t.delete(T.id)), I;
    console.warn(`Attempt to delete missing annotation: ${P}`);
  }, g = (w, P = it.LOCAL) => {
    const I = m(w);
    I && r(P, { deleted: [I] });
  }, p = (w, P = it.LOCAL) => {
    const I = w.reduce((T, C) => {
      const Y = m(C);
      return Y ? [...T, Y] : T;
    }, []);
    I.length > 0 && r(P, { deleted: I });
  }, y = (w) => {
    const P = e.get(w.annotation);
    if (P) {
      const I = P.bodies.find((T) => T.id === w.id);
      if (I) {
        t.delete(I.id);
        const T = {
          ...P,
          bodies: P.bodies.filter((C) => C.id !== w.id)
        };
        return e.set(P.id, T), {
          oldValue: P,
          newValue: T,
          bodiesDeleted: [I]
        };
      } else
        console.warn(`Attempt to delete missing body ${w.id} from annotation ${w.annotation}`);
    } else
      console.warn(`Attempt to delete body from missing annotation ${w.annotation}`);
  }, x = (w, P = it.LOCAL) => {
    const I = y(w);
    I && r(P, { updated: [I] });
  }, b = (w, P = it.LOCAL) => {
    const I = w.map((T) => y(T)).filter(Boolean);
    I.length > 0 && r(P, { updated: I });
  }, _ = (w) => {
    const P = e.get(w);
    return P ? { ...P } : void 0;
  }, M = (w) => {
    const P = t.get(w);
    if (P) {
      const I = _(P).bodies.find((T) => T.id === w);
      if (I)
        return I;
      console.error(`Store integrity error: body ${w} in index, but not in annotation`);
    } else
      console.warn(`Attempt to retrieve missing body: ${w}`);
  }, B = (w, P) => {
    if (w.annotation !== P.annotation)
      throw "Annotation integrity violation: annotation ID must be the same when updating bodies";
    const I = e.get(w.annotation);
    if (I) {
      const T = I.bodies.find((Y) => Y.id === w.id), C = {
        ...I,
        bodies: I.bodies.map((Y) => Y.id === T.id ? P : Y)
      };
      return e.set(I.id, C), T.id !== P.id && (t.delete(T.id), t.set(P.id, C.id)), {
        oldValue: I,
        newValue: C,
        bodiesUpdated: [{ oldBody: T, newBody: P }]
      };
    } else
      console.warn(`Attempt to add body to missing annotation ${w.annotation}`);
  }, k = (w, P, I = it.LOCAL) => {
    const T = B(w, P);
    T && r(I, { updated: [T] });
  }, A = (w, P = it.LOCAL) => {
    const I = w.map((T) => B({ id: T.id, annotation: T.annotation }, T)).filter(Boolean);
    r(P, { updated: I });
  }, S = (w) => {
    const P = e.get(w.annotation);
    if (P) {
      const I = {
        ...P,
        target: {
          ...P.target,
          ...w
        }
      };
      return e.set(P.id, I), {
        oldValue: P,
        newValue: I,
        targetUpdated: {
          oldTarget: P.target,
          newTarget: w
        }
      };
    } else
      console.warn(`Attempt to update target on missing annotation: ${w.annotation}`);
  };
  return {
    addAnnotation: o,
    addBody: c,
    all: u,
    bulkAddAnnotation: f,
    bulkDeleteAnnotation: p,
    bulkDeleteBodies: b,
    bulkUpdateAnnotation: h,
    bulkUpdateBodies: A,
    bulkUpdateTargets: (w, P = it.LOCAL) => {
      const I = w.map((T) => S(T)).filter(Boolean);
      I.length > 0 && r(P, { updated: I });
    },
    clear: d,
    deleteAnnotation: g,
    deleteBody: x,
    getAnnotation: _,
    getBody: M,
    observe: s,
    unobserve: i,
    updateAnnotation: l,
    updateBody: k,
    updateTarget: (w, P = it.LOCAL) => {
      const I = S(w);
      I && r(P, { updated: [I] });
    }
  };
}, mh = (e) => ({
  ...e,
  subscribe: (t) => {
    const n = (s) => t(s.state);
    return e.observe(n), t(e.all()), () => e.unobserve(n);
  }
});
let ph = () => ({
  emit(e, ...t) {
    for (let n = 0, s = this.events[e] || [], i = s.length; n < i; n++)
      s[n](...t);
  },
  events: {},
  on(e, t) {
    var n;
    return ((n = this.events)[e] || (n[e] = [])).push(t), () => {
      var s;
      this.events[e] = (s = this.events[e]) == null ? void 0 : s.filter((i) => t !== i);
    };
  }
});
const gh = 250, yh = (e) => {
  const t = ph(), n = [];
  let s = -1, i = !1, r = 0;
  const o = (f) => {
    if (!i) {
      const { changes: m } = f, g = performance.now();
      if (g - r > gh)
        n.splice(s + 1), n.push(m), s = n.length - 1;
      else {
        const p = n.length - 1;
        n[p] = uh(n[p], m);
      }
      r = g;
    }
    i = !1;
  };
  e.observe(o, { origin: it.LOCAL });
  const a = (f) => f && f.length > 0 && e.bulkDeleteAnnotation(f), l = (f) => f && f.length > 0 && e.bulkAddAnnotation(f, !1), h = (f) => f && f.length > 0 && e.bulkUpdateAnnotation(f.map(({ oldValue: m }) => m)), c = (f) => f && f.length > 0 && e.bulkUpdateAnnotation(f.map(({ newValue: m }) => m)), u = (f) => f && f.length > 0 && e.bulkAddAnnotation(f, !1), d = (f) => f && f.length > 0 && e.bulkDeleteAnnotation(f);
  return {
    canRedo: () => n.length - 1 > s,
    canUndo: () => s > -1,
    destroy: () => e.unobserve(o),
    on: (f, m) => t.on(f, m),
    redo: () => {
      if (n.length - 1 > s) {
        i = !0;
        const { created: f, updated: m, deleted: g } = n[s + 1];
        l(f), c(m), d(g), t.emit("redo", n[s + 1]), s += 1;
      }
    },
    undo: () => {
      if (s > -1) {
        i = !0;
        const { created: f, updated: m, deleted: g } = n[s];
        a(f), h(m), u(g), t.emit("undo", n[s]), s -= 1;
      }
    }
  };
}, _h = () => {
  const { subscribe: e, set: t } = wi([]);
  return {
    subscribe: e,
    set: t
  };
}, xh = (e, t, n, s) => {
  const { store: i, selection: r, hover: o, viewport: a } = e, l = /* @__PURE__ */ new Map();
  let h = [], c, u;
  const d = (y, x) => {
    l.has(y) ? l.get(y).push(x) : l.set(y, [x]);
  }, f = (y, x) => {
    const b = l.get(y);
    b && b.indexOf(x) > 0 && b.splice(b.indexOf(x), 1);
  }, m = (y, x, b) => {
    l.has(y) && setTimeout(() => {
      l.get(y).forEach((_) => {
        if (n) {
          const M = Array.isArray(x) ? x.map((k) => n.serialize(k)) : n.serialize(x), B = b ? b instanceof PointerEvent ? b : n.serialize(b) : void 0;
          _(M, B);
        } else
          _(x, b);
      });
    }, 1);
  }, g = () => {
    const { selected: y } = r, x = (y || []).map(({ id: b }) => i.getAnnotation(b));
    x.forEach((b) => {
      const _ = h.find((M) => M.id === b.id);
      (!_ || !Re(_, b)) && m("updateAnnotation", b, _);
    }), h = h.map((b) => x.find(({ id: _ }) => _ === b.id) || b);
  };
  r.subscribe(({ selected: y }) => {
    if (!(h.length === 0 && y.length === 0)) {
      if (h.length === 0 && y.length > 0)
        h = y.map(({ id: x }) => i.getAnnotation(x));
      else if (h.length > 0 && y.length === 0)
        h.forEach((x) => {
          const b = i.getAnnotation(x.id);
          b && !Re(b, x) && m("updateAnnotation", b, x);
        }), h = [];
      else {
        const x = new Set(h.map((_) => _.id)), b = new Set(y.map(({ id: _ }) => _));
        h.filter((_) => !b.has(_.id)).forEach((_) => {
          const M = i.getAnnotation(_.id);
          M && !Re(M, _) && m("updateAnnotation", M, _);
        }), h = [
          // Remove annotations that were deselected
          ...h.filter((_) => b.has(_.id)),
          // Add editable annotations that were selected
          ...y.filter(({ id: _ }) => !x.has(_)).map(({ id: _ }) => i.getAnnotation(_))
        ];
      }
      m("selectionChanged", h);
    }
  }), o.subscribe((y) => {
    !c && y ? m("mouseEnterAnnotation", i.getAnnotation(y)) : c && !y ? m("mouseLeaveAnnotation", i.getAnnotation(c)) : c && y && (m("mouseLeaveAnnotation", i.getAnnotation(c)), m("mouseEnterAnnotation", i.getAnnotation(y))), c = y;
  }), a == null || a.subscribe((y) => m("viewportIntersect", y.map((x) => i.getAnnotation(x)))), i.observe((y) => {
    s && (u && clearTimeout(u), u = setTimeout(g, 1e3));
    const { created: x, deleted: b } = y.changes;
    (x || []).forEach((_) => m("createAnnotation", _)), (b || []).forEach((_) => m("deleteAnnotation", _)), (y.changes.updated || []).filter((_) => [
      ..._.bodiesCreated || [],
      ..._.bodiesDeleted || [],
      ..._.bodiesUpdated || []
    ].length > 0).forEach(({ oldValue: _, newValue: M }) => {
      const B = h.find((k) => k.id === _.id) || _;
      h = h.map((k) => k.id === _.id ? M : k), m("updateAnnotation", M, B);
    });
  }, { origin: it.LOCAL }), i.observe((y) => {
    if (h) {
      const x = new Set(h.map((_) => _.id)), b = (y.changes.updated || []).filter(({ newValue: _ }) => x.has(_.id)).map(({ newValue: _ }) => _);
      b.length > 0 && (h = h.map((_) => b.find((M) => M.id === _.id) || _));
    }
  }, { origin: it.REMOTE });
  const p = (y) => (x) => {
    const { updated: b } = x;
    y ? (b || []).forEach((_) => m("updateAnnotation", _.oldValue, _.newValue)) : (b || []).forEach((_) => m("updateAnnotation", _.newValue, _.oldValue));
  };
  return t.on("undo", p(!0)), t.on("redo", p(!1)), { on: d, off: f, emit: m };
}, bh = (e) => (t) => t.reduce((n, s) => {
  const { parsed: i, error: r } = e.parse(s);
  return r ? {
    parsed: n.parsed,
    failed: [...n.failed, s]
  } : i ? {
    parsed: [...n.parsed, i],
    failed: n.failed
  } : {
    ...n
  };
}, { parsed: [], failed: [] }), wh = (e, t, n) => {
  const { store: s, selection: i } = e, r = (p) => {
    if (n) {
      const { parsed: y, error: x } = n.parse(p);
      y ? s.addAnnotation(y, it.REMOTE) : console.error(x);
    } else
      s.addAnnotation(p, it.REMOTE);
  }, o = () => i.clear(), a = () => s.clear(), l = (p) => {
    const y = s.getAnnotation(p);
    return n && y ? n.serialize(y) : y;
  }, h = () => n ? s.all().map(n.serialize) : s.all(), c = () => {
    var p;
    const y = (((p = i.selected) == null ? void 0 : p.map((x) => x.id)) || []).map((x) => s.getAnnotation(x)).filter(Boolean);
    return n ? y.map(n.serialize) : y;
  }, u = (p, y = !0) => fetch(p).then((x) => x.json()).then((x) => (f(x, y), x)), d = (p) => {
    if (typeof p == "string") {
      const y = s.getAnnotation(p);
      if (s.deleteAnnotation(p), y)
        return n ? n.serialize(y) : y;
    } else {
      const y = n ? n.parse(p).parsed : p;
      if (y)
        return s.deleteAnnotation(y), p;
    }
  }, f = (p, y = !0) => {
    if (n) {
      const { parsed: x, failed: b } = bh(n)(p);
      b.length > 0 && console.warn(`Discarded ${b.length} invalid annotations`, b), s.bulkAddAnnotation(x, y, it.REMOTE);
    } else
      s.bulkAddAnnotation(p, y, it.REMOTE);
  }, m = (p) => {
    p ? i.setSelected(p) : i.clear();
  }, g = (p) => {
    if (n) {
      const y = n.parse(p).parsed, x = n.serialize(s.getAnnotation(y.id));
      return s.updateAnnotation(y), x;
    } else {
      const y = s.getAnnotation(p.id);
      return s.updateAnnotation(p), y;
    }
  };
  return {
    addAnnotation: r,
    cancelSelected: o,
    canRedo: t.canRedo,
    canUndo: t.canUndo,
    clearAnnotations: a,
    getAnnotationById: l,
    getAnnotations: h,
    getSelected: c,
    loadAnnotations: u,
    redo: t.redo,
    removeAnnotation: d,
    setAnnotations: f,
    setSelected: m,
    undo: t.undo,
    updateAnnotation: g
  };
}, vh = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let Ah = (e) => crypto.getRandomValues(new Uint8Array(e)), Mh = (e, t, n) => {
  let s = (2 << Math.log(e.length - 1) / Math.LN2) - 1, i = -~(1.6 * s * t / e.length);
  return (r = t) => {
    let o = "";
    for (; ; ) {
      let a = n(i), l = i;
      for (; l--; )
        if (o += e[a[l] & s] || "", o.length === r)
          return o;
    }
  };
}, Sh = (e, t = 21) => Mh(e, t, Ah), Th = (e = 21) => {
  let t = "", n = crypto.getRandomValues(new Uint8Array(e));
  for (; e--; )
    t += vh[n[e] & 63];
  return t;
};
const Eh = () => ({ isGuest: !0, id: Sh("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_", 20)() }), Ch = (e) => {
  const t = JSON.stringify(e);
  let n = 0;
  for (let s = 0, i = t.length; s < i; s++) {
    let r = t.charCodeAt(s);
    n = (n << 5) - n + r, n |= 0;
  }
  return `${n}`;
}, To = (e) => e ? typeof e == "object" ? { ...e } : e : void 0, Ph = (e, t) => (Array.isArray(e) ? e : [e]).map((n) => {
  const { id: s, type: i, purpose: r, value: o, created: a, creator: l, ...h } = n;
  return {
    id: s || `temp-${Ch(n)}`,
    annotation: t,
    type: i,
    purpose: r,
    value: o,
    created: a ? new Date(a) : void 0,
    creator: To(l),
    ...h
  };
}), kh = (e) => e.map((t) => {
  var n, s;
  const i = { ...t };
  return delete i.annotation, (n = i.id) != null && n.startsWith("temp-") && delete i.id, { ...i, created: (s = i.created) == null ? void 0 : s.toISOString() };
});
Th();
const Ih = (e, t = !1) => ({ parse: (n) => Bh(n, t), serialize: (n) => Rh(n, e) }), Bh = (e, t = !1) => {
  const n = e.id || Ao(), {
    creator: s,
    created: i,
    modified: r,
    body: o,
    ...a
  } = e, l = Ph(o, n), h = Array.isArray(e.target) ? e.target[0] : e.target, c = Array.isArray(h.selector) ? h.selector[0] : h.selector, u = (c == null ? void 0 : c.type) === "FragmentSelector" ? Ul(c, t) : (c == null ? void 0 : c.type) === "SvgSelector" ? ql(c) : void 0;
  return u ? {
    parsed: {
      ...a,
      id: n,
      bodies: l,
      target: {
        created: i ? new Date(i) : void 0,
        creator: To(s),
        updated: r ? new Date(r) : void 0,
        ...Array.isArray(a.target) ? a.target[0] : a.target,
        annotation: n,
        selector: u
      }
    }
  } : {
    error: Error(`Invalid selector: ${JSON.stringify(c)}`)
  };
}, Rh = (e, t) => {
  const {
    selector: n,
    creator: s,
    created: i,
    updated: r,
    updatedBy: o,
    // Excluded from serialization
    ...a
  } = e.target, l = n.type == et.RECTANGLE ? Hl(n.geometry) : Zl(n), h = {
    ...e,
    "@context": "http://www.w3.org/ns/anno.jsonld",
    id: e.id,
    type: "Annotation",
    body: kh(e.bodies),
    created: i == null ? void 0 : i.toISOString(),
    creator: s,
    modified: r == null ? void 0 : r.toISOString(),
    target: {
      ...a,
      source: t,
      selector: l
    }
  };
  return delete h.bodies, "annotation" in h.target && delete h.target.annotation, h;
};
function qi(e, t, n) {
  const s = e.slice();
  return s[10] = t[n], s[12] = n, s;
}
function Zi(e) {
  let t, n;
  return t = new pn({
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
    ut(
      /*grab*/
      e[9](`HANDLE-${/*idx*/
      e[12]}`)
    ) && e[9](`HANDLE-${/*idx*/
    e[12]}`).apply(this, arguments);
  }), {
    c() {
      Ht(t.$$.fragment);
    },
    m(s, i) {
      Ft(t, s, i), n = !0;
    },
    p(s, i) {
      e = s;
      const r = {};
      i & /*geom*/
      16 && (r.x = /*point*/
      e[10][0]), i & /*geom*/
      16 && (r.y = /*point*/
      e[10][1]), i & /*viewportScale*/
      8 && (r.scale = /*viewportScale*/
      e[3]), t.$set(r);
    },
    i(s) {
      n || (V(t.$$.fragment, s), n = !0);
    },
    o(s) {
      Z(t.$$.fragment, s), n = !1;
    },
    d(s) {
      Gt(t, s);
    }
  };
}
function Oh(e) {
  let t, n, s, i, r, o, a, l, h, c, u, d = Je(
    /*geom*/
    e[4].points
  ), f = [];
  for (let g = 0; g < d.length; g += 1)
    f[g] = Zi(qi(e, d, g));
  const m = (g) => Z(f[g], 1, 1, () => {
    f[g] = null;
  });
  return {
    c() {
      t = K("polygon"), i = qt(), r = K("polygon"), a = qt();
      for (let g = 0; g < f.length; g += 1)
        f[g].c();
      l = re(), v(t, "class", "a9s-outer"), v(t, "style", n = /*computedStyle*/
      e[1] ? "display:none;" : void 0), v(t, "points", s = /*geom*/
      e[4].points.map(Ki).join(" ")), v(r, "class", "a9s-inner a9s-shape-handle"), v(
        r,
        "style",
        /*computedStyle*/
        e[1]
      ), v(r, "points", o = /*geom*/
      e[4].points.map(Qi).join(" "));
    },
    m(g, p) {
      U(g, t, p), U(g, i, p), U(g, r, p), U(g, a, p);
      for (let y = 0; y < f.length; y += 1)
        f[y] && f[y].m(g, p);
      U(g, l, p), h = !0, c || (u = [
        ht(t, "pointerdown", function() {
          ut(
            /*grab*/
            e[9]("SHAPE")
          ) && e[9]("SHAPE").apply(this, arguments);
        }),
        ht(r, "pointerdown", function() {
          ut(
            /*grab*/
            e[9]("SHAPE")
          ) && e[9]("SHAPE").apply(this, arguments);
        })
      ], c = !0);
    },
    p(g, p) {
      if (e = g, (!h || p & /*computedStyle*/
      2 && n !== (n = /*computedStyle*/
      e[1] ? "display:none;" : void 0)) && v(t, "style", n), (!h || p & /*geom*/
      16 && s !== (s = /*geom*/
      e[4].points.map(Ki).join(" "))) && v(t, "points", s), (!h || p & /*computedStyle*/
      2) && v(
        r,
        "style",
        /*computedStyle*/
        e[1]
      ), (!h || p & /*geom*/
      16 && o !== (o = /*geom*/
      e[4].points.map(Qi).join(" "))) && v(r, "points", o), p & /*geom, viewportScale, grab*/
      536) {
        d = Je(
          /*geom*/
          e[4].points
        );
        let y;
        for (y = 0; y < d.length; y += 1) {
          const x = qi(e, d, y);
          f[y] ? (f[y].p(x, p), V(f[y], 1)) : (f[y] = Zi(x), f[y].c(), V(f[y], 1), f[y].m(l.parentNode, l));
        }
        for (ee(), y = d.length; y < f.length; y += 1)
          m(y);
        ne();
      }
    },
    i(g) {
      if (!h) {
        for (let p = 0; p < d.length; p += 1)
          V(f[p]);
        h = !0;
      }
    },
    o(g) {
      f = f.filter(Boolean);
      for (let p = 0; p < f.length; p += 1)
        Z(f[p]);
      h = !1;
    },
    d(g) {
      g && (N(t), N(i), N(r), N(a), N(l)), _i(f, g), c = !1, ie(u);
    }
  };
}
function Yh(e) {
  let t, n;
  return t = new Io({
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
          Oh,
          ({ grab: s }) => ({ 9: s }),
          ({ grab: s }) => s ? 512 : 0
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
      Ht(t.$$.fragment);
    },
    m(s, i) {
      Ft(t, s, i), n = !0;
    },
    p(s, [i]) {
      const r = {};
      i & /*shape*/
      1 && (r.shape = /*shape*/
      s[0]), i & /*transform*/
      4 && (r.transform = /*transform*/
      s[2]), i & /*$$scope, geom, viewportScale, grab, computedStyle*/
      8730 && (r.$$scope = { dirty: i, ctx: s }), t.$set(r);
    },
    i(s) {
      n || (V(t.$$.fragment, s), n = !0);
    },
    o(s) {
      Z(t.$$.fragment, s), n = !1;
    },
    d(s) {
      Gt(t, s);
    }
  };
}
const Ki = (e) => e.join(","), Qi = (e) => e.join(",");
function Lh(e, t, n) {
  let s, { shape: i } = t, { computedStyle: r } = t, { transform: o } = t, { viewportScale: a = 1 } = t;
  const l = (d, f, m) => {
    let g;
    const p = d.geometry;
    f === "SHAPE" ? g = p.points.map(([x, b]) => [x + m[0], b + m[1]]) : g = p.points.map(([x, b], _) => f === `HANDLE-${_}` ? [x + m[0], b + m[1]] : [x, b]);
    const y = as(g);
    return { ...d, geometry: { points: g, bounds: y } };
  };
  function h(d) {
    ae.call(this, e, d);
  }
  function c(d) {
    ae.call(this, e, d);
  }
  function u(d) {
    ae.call(this, e, d);
  }
  return e.$$set = (d) => {
    "shape" in d && n(0, i = d.shape), "computedStyle" in d && n(1, r = d.computedStyle), "transform" in d && n(2, o = d.transform), "viewportScale" in d && n(3, a = d.viewportScale);
  }, e.$$.update = () => {
    e.$$.dirty & /*shape*/
    1 && n(4, s = i.geometry);
  }, [
    i,
    r,
    o,
    a,
    s,
    l,
    h,
    c,
    u
  ];
}
class Xh extends Wt {
  constructor(t) {
    super(), zt(this, t, Lh, Yh, Et, {
      shape: 0,
      computedStyle: 1,
      transform: 2,
      viewportScale: 3
    });
  }
}
const Ms = (e, t) => {
  const n = Math.abs(t[0] - e[0]), s = Math.abs(t[1] - e[1]);
  return Math.sqrt(Math.pow(n, 2) + Math.pow(s, 2));
}, Fe = [];
function Fh(e, t = at) {
  let n;
  const s = /* @__PURE__ */ new Set();
  function i(a) {
    if (Et(e, a) && (e = a, n)) {
      const l = !Fe.length;
      for (const h of s)
        h[1](), Fe.push(h, e);
      if (l) {
        for (let h = 0; h < Fe.length; h += 2)
          Fe[h][0](Fe[h + 1]);
        Fe.length = 0;
      }
    }
  }
  function r(a) {
    i(a(e));
  }
  function o(a, l = at) {
    const h = [a, l];
    return s.add(h), s.size === 1 && (n = t(i, r) || at), a(e), () => {
      s.delete(h), s.size === 0 && n && (n(), n = null);
    };
  }
  return { set: i, update: r, subscribe: o };
}
const Gh = (e, t) => {
  const { naturalWidth: n, naturalHeight: s } = e;
  if (!n && !s) {
    const { width: i, height: r } = e;
    t.setAttribute("viewBox", `0 0 ${i} ${r}`), e.addEventListener("load", (o) => {
      const a = o.target;
      t.setAttribute("viewBox", `0 0 ${a.naturalWidth} ${a.naturalHeight}`);
    });
  } else
    t.setAttribute("viewBox", `0 0 ${n} ${s}`);
}, $h = (e, t) => {
  Gh(e, t);
  const { subscribe: n, set: s } = Fh(1);
  let i;
  return window.ResizeObserver && (i = new ResizeObserver(() => {
    const r = t.getBoundingClientRect(), { width: o, height: a } = t.viewBox.baseVal, l = Math.max(
      r.width / o,
      r.height / a
    );
    s(l);
  }), i.observe(t.parentElement)), { destroy: () => {
    i && i.disconnect();
  }, subscribe: n };
}, Eo = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
function Nh(e) {
  let t, n, s, i, r, o;
  return {
    c() {
      t = K("rect"), v(t, "class", n = rs(`a9s-handle ${/*$$props*/
      e[8].class || ""}`.trim()) + " svelte-1sgkh33"), v(t, "x", s = /*x*/
      e[0] - /*handleSize*/
      e[5] / 2), v(t, "y", i = /*y*/
      e[1] - /*handleSize*/
      e[5] / 2), v(
        t,
        "width",
        /*handleSize*/
        e[5]
      ), v(
        t,
        "height",
        /*handleSize*/
        e[5]
      );
    },
    m(a, l) {
      U(a, t, l), r || (o = ht(
        t,
        "pointerdown",
        /*pointerdown_handler_2*/
        e[11]
      ), r = !0);
    },
    p(a, l) {
      l & /*$$props*/
      256 && n !== (n = rs(`a9s-handle ${/*$$props*/
      a[8].class || ""}`.trim()) + " svelte-1sgkh33") && v(t, "class", n), l & /*x, handleSize*/
      33 && s !== (s = /*x*/
      a[0] - /*handleSize*/
      a[5] / 2) && v(t, "x", s), l & /*y, handleSize*/
      34 && i !== (i = /*y*/
      a[1] - /*handleSize*/
      a[5] / 2) && v(t, "y", i), l & /*handleSize*/
      32 && v(
        t,
        "width",
        /*handleSize*/
        a[5]
      ), l & /*handleSize*/
      32 && v(
        t,
        "height",
        /*handleSize*/
        a[5]
      );
    },
    d(a) {
      a && N(t), r = !1, o();
    }
  };
}
function Dh(e) {
  let t, n, s, i, r, o, a, l, h;
  return {
    c() {
      t = K("g"), n = K("circle"), i = K("rect"), v(
        n,
        "cx",
        /*x*/
        e[0]
      ), v(
        n,
        "cy",
        /*y*/
        e[1]
      ), v(n, "r", s = /*radius*/
      e[3] / /*scale*/
      e[2]), v(n, "class", "a9s-touch-halo svelte-1sgkh33"), qe(
        n,
        "touched",
        /*touched*/
        e[4]
      ), v(i, "class", r = rs(`a9s-handle ${/*$$props*/
      e[8].class || ""}`.trim()) + " svelte-1sgkh33"), v(i, "x", o = /*x*/
      e[0] - /*handleSize*/
      e[5] / 2), v(i, "y", a = /*y*/
      e[1] - /*handleSize*/
      e[5] / 2), v(
        i,
        "width",
        /*handleSize*/
        e[5]
      ), v(
        i,
        "height",
        /*handleSize*/
        e[5]
      ), v(t, "class", "a9s-touch-handle");
    },
    m(c, u) {
      U(c, t, u), te(t, n), te(t, i), l || (h = [
        ht(
          n,
          "pointerdown",
          /*pointerdown_handler*/
          e[10]
        ),
        ht(
          n,
          "pointerdown",
          /*onPointerDown*/
          e[6]
        ),
        ht(
          n,
          "pointerup",
          /*onPointerUp*/
          e[7]
        ),
        ht(
          i,
          "pointerdown",
          /*pointerdown_handler_1*/
          e[9]
        ),
        ht(
          i,
          "pointerdown",
          /*onPointerDown*/
          e[6]
        ),
        ht(
          i,
          "pointerup",
          /*onPointerUp*/
          e[7]
        )
      ], l = !0);
    },
    p(c, u) {
      u & /*x*/
      1 && v(
        n,
        "cx",
        /*x*/
        c[0]
      ), u & /*y*/
      2 && v(
        n,
        "cy",
        /*y*/
        c[1]
      ), u & /*radius, scale*/
      12 && s !== (s = /*radius*/
      c[3] / /*scale*/
      c[2]) && v(n, "r", s), u & /*touched*/
      16 && qe(
        n,
        "touched",
        /*touched*/
        c[4]
      ), u & /*$$props*/
      256 && r !== (r = rs(`a9s-handle ${/*$$props*/
      c[8].class || ""}`.trim()) + " svelte-1sgkh33") && v(i, "class", r), u & /*x, handleSize*/
      33 && o !== (o = /*x*/
      c[0] - /*handleSize*/
      c[5] / 2) && v(i, "x", o), u & /*y, handleSize*/
      34 && a !== (a = /*y*/
      c[1] - /*handleSize*/
      c[5] / 2) && v(i, "y", a), u & /*handleSize*/
      32 && v(
        i,
        "width",
        /*handleSize*/
        c[5]
      ), u & /*handleSize*/
      32 && v(
        i,
        "height",
        /*handleSize*/
        c[5]
      );
    },
    d(c) {
      c && N(t), l = !1, ie(h);
    }
  };
}
function Uh(e) {
  let t;
  function n(i, r) {
    return Eo ? Dh : Nh;
  }
  let s = n()(e);
  return {
    c() {
      s.c(), t = re();
    },
    m(i, r) {
      s.m(i, r), U(i, t, r);
    },
    p(i, [r]) {
      s.p(i, r);
    },
    i: at,
    o: at,
    d(i) {
      i && N(t), s.d(i);
    }
  };
}
function Hh(e, t, n) {
  let s, { x: i } = t, { y: r } = t, { scale: o } = t, { radius: a = 30 } = t, l = !1;
  const h = (m) => {
    m.pointerType === "touch" && n(4, l = !0);
  }, c = () => n(4, l = !1);
  function u(m) {
    ae.call(this, e, m);
  }
  function d(m) {
    ae.call(this, e, m);
  }
  function f(m) {
    ae.call(this, e, m);
  }
  return e.$$set = (m) => {
    n(8, t = js(js({}, t), Hi(m))), "x" in m && n(0, i = m.x), "y" in m && n(1, r = m.y), "scale" in m && n(2, o = m.scale), "radius" in m && n(3, a = m.radius);
  }, e.$$.update = () => {
    e.$$.dirty & /*scale*/
    4 && n(5, s = 10 / o);
  }, t = Hi(t), [
    i,
    r,
    o,
    a,
    l,
    s,
    h,
    c,
    t,
    u,
    d,
    f
  ];
}
class pn extends Wt {
  constructor(t) {
    super(), zt(this, t, Hh, Uh, Et, { x: 0, y: 1, scale: 2, radius: 3 });
  }
}
function Vh(e) {
  let t, n, s, i, r, o, a, l, h, c, u, d, f, m, g, p, y, x, b, _, M, B, k, A, S, w, P, I, T, C, Y, X, D, W, G, O, lt, $, tt, J, F, Yt, ge;
  return W = new pn({
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
  }), W.$on("pointerdown", function() {
    ut(
      /*grab*/
      e[9]("TOP_LEFT")
    ) && e[9]("TOP_LEFT").apply(this, arguments);
  }), O = new pn({
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
  }), O.$on("pointerdown", function() {
    ut(
      /*grab*/
      e[9]("TOP_RIGHT")
    ) && e[9]("TOP_RIGHT").apply(this, arguments);
  }), $ = new pn({
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
  }), $.$on("pointerdown", function() {
    ut(
      /*grab*/
      e[9]("BOTTOM_RIGHT")
    ) && e[9]("BOTTOM_RIGHT").apply(this, arguments);
  }), J = new pn({
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
  }), J.$on("pointerdown", function() {
    ut(
      /*grab*/
      e[9]("BOTTOM_LEFT")
    ) && e[9]("BOTTOM_LEFT").apply(this, arguments);
  }), {
    c() {
      t = K("rect"), a = qt(), l = K("rect"), f = qt(), m = K("rect"), x = qt(), b = K("rect"), k = qt(), A = K("rect"), I = qt(), T = K("rect"), D = qt(), Ht(W.$$.fragment), G = qt(), Ht(O.$$.fragment), lt = qt(), Ht($.$$.fragment), tt = qt(), Ht(J.$$.fragment), v(t, "class", "a9s-outer"), v(t, "style", n = /*computedStyle*/
      e[1] ? "display:none;" : void 0), v(t, "x", s = /*geom*/
      e[4].x), v(t, "y", i = /*geom*/
      e[4].y), v(t, "width", r = /*geom*/
      e[4].w), v(t, "height", o = /*geom*/
      e[4].h), v(l, "class", "a9s-inner a9s-shape-handle"), v(
        l,
        "style",
        /*computedStyle*/
        e[1]
      ), v(l, "x", h = /*geom*/
      e[4].x), v(l, "y", c = /*geom*/
      e[4].y), v(l, "width", u = /*geom*/
      e[4].w), v(l, "height", d = /*geom*/
      e[4].h), v(m, "class", "a9s-edge-handle a9s-edge-handle-top"), v(m, "x", g = /*geom*/
      e[4].x), v(m, "y", p = /*geom*/
      e[4].y), v(m, "height", 1), v(m, "width", y = /*geom*/
      e[4].w), v(b, "class", "a9s-edge-handle a9s-edge-handle-right"), v(b, "x", _ = /*geom*/
      e[4].x + /*geom*/
      e[4].w), v(b, "y", M = /*geom*/
      e[4].y), v(b, "height", B = /*geom*/
      e[4].h), v(b, "width", 1), v(A, "class", "a9s-edge-handle a9s-edge-handle-bottom"), v(A, "x", S = /*geom*/
      e[4].x), v(A, "y", w = /*geom*/
      e[4].y + /*geom*/
      e[4].h), v(A, "height", 1), v(A, "width", P = /*geom*/
      e[4].w), v(T, "class", "a9s-edge-handle a9s-edge-handle-left"), v(T, "x", C = /*geom*/
      e[4].x), v(T, "y", Y = /*geom*/
      e[4].y), v(T, "height", X = /*geom*/
      e[4].h), v(T, "width", 1);
    },
    m(L, R) {
      U(L, t, R), U(L, a, R), U(L, l, R), U(L, f, R), U(L, m, R), U(L, x, R), U(L, b, R), U(L, k, R), U(L, A, R), U(L, I, R), U(L, T, R), U(L, D, R), Ft(W, L, R), U(L, G, R), Ft(O, L, R), U(L, lt, R), Ft($, L, R), U(L, tt, R), Ft(J, L, R), F = !0, Yt || (ge = [
        ht(t, "pointerdown", function() {
          ut(
            /*grab*/
            e[9]("SHAPE")
          ) && e[9]("SHAPE").apply(this, arguments);
        }),
        ht(l, "pointerdown", function() {
          ut(
            /*grab*/
            e[9]("SHAPE")
          ) && e[9]("SHAPE").apply(this, arguments);
        }),
        ht(m, "pointerdown", function() {
          ut(
            /*grab*/
            e[9]("TOP")
          ) && e[9]("TOP").apply(this, arguments);
        }),
        ht(b, "pointerdown", function() {
          ut(
            /*grab*/
            e[9]("RIGHT")
          ) && e[9]("RIGHT").apply(this, arguments);
        }),
        ht(A, "pointerdown", function() {
          ut(
            /*grab*/
            e[9]("BOTTOM")
          ) && e[9]("BOTTOM").apply(this, arguments);
        }),
        ht(T, "pointerdown", function() {
          ut(
            /*grab*/
            e[9]("LEFT")
          ) && e[9]("LEFT").apply(this, arguments);
        })
      ], Yt = !0);
    },
    p(L, R) {
      e = L, (!F || R & /*computedStyle*/
      2 && n !== (n = /*computedStyle*/
      e[1] ? "display:none;" : void 0)) && v(t, "style", n), (!F || R & /*geom*/
      16 && s !== (s = /*geom*/
      e[4].x)) && v(t, "x", s), (!F || R & /*geom*/
      16 && i !== (i = /*geom*/
      e[4].y)) && v(t, "y", i), (!F || R & /*geom*/
      16 && r !== (r = /*geom*/
      e[4].w)) && v(t, "width", r), (!F || R & /*geom*/
      16 && o !== (o = /*geom*/
      e[4].h)) && v(t, "height", o), (!F || R & /*computedStyle*/
      2) && v(
        l,
        "style",
        /*computedStyle*/
        e[1]
      ), (!F || R & /*geom*/
      16 && h !== (h = /*geom*/
      e[4].x)) && v(l, "x", h), (!F || R & /*geom*/
      16 && c !== (c = /*geom*/
      e[4].y)) && v(l, "y", c), (!F || R & /*geom*/
      16 && u !== (u = /*geom*/
      e[4].w)) && v(l, "width", u), (!F || R & /*geom*/
      16 && d !== (d = /*geom*/
      e[4].h)) && v(l, "height", d), (!F || R & /*geom*/
      16 && g !== (g = /*geom*/
      e[4].x)) && v(m, "x", g), (!F || R & /*geom*/
      16 && p !== (p = /*geom*/
      e[4].y)) && v(m, "y", p), (!F || R & /*geom*/
      16 && y !== (y = /*geom*/
      e[4].w)) && v(m, "width", y), (!F || R & /*geom*/
      16 && _ !== (_ = /*geom*/
      e[4].x + /*geom*/
      e[4].w)) && v(b, "x", _), (!F || R & /*geom*/
      16 && M !== (M = /*geom*/
      e[4].y)) && v(b, "y", M), (!F || R & /*geom*/
      16 && B !== (B = /*geom*/
      e[4].h)) && v(b, "height", B), (!F || R & /*geom*/
      16 && S !== (S = /*geom*/
      e[4].x)) && v(A, "x", S), (!F || R & /*geom*/
      16 && w !== (w = /*geom*/
      e[4].y + /*geom*/
      e[4].h)) && v(A, "y", w), (!F || R & /*geom*/
      16 && P !== (P = /*geom*/
      e[4].w)) && v(A, "width", P), (!F || R & /*geom*/
      16 && C !== (C = /*geom*/
      e[4].x)) && v(T, "x", C), (!F || R & /*geom*/
      16 && Y !== (Y = /*geom*/
      e[4].y)) && v(T, "y", Y), (!F || R & /*geom*/
      16 && X !== (X = /*geom*/
      e[4].h)) && v(T, "height", X);
      const Dt = {};
      R & /*geom*/
      16 && (Dt.x = /*geom*/
      e[4].x), R & /*geom*/
      16 && (Dt.y = /*geom*/
      e[4].y), R & /*viewportScale*/
      8 && (Dt.scale = /*viewportScale*/
      e[3]), W.$set(Dt);
      const Ut = {};
      R & /*geom*/
      16 && (Ut.x = /*geom*/
      e[4].x + /*geom*/
      e[4].w), R & /*geom*/
      16 && (Ut.y = /*geom*/
      e[4].y), R & /*viewportScale*/
      8 && (Ut.scale = /*viewportScale*/
      e[3]), O.$set(Ut);
      const Bt = {};
      R & /*geom*/
      16 && (Bt.x = /*geom*/
      e[4].x + /*geom*/
      e[4].w), R & /*geom*/
      16 && (Bt.y = /*geom*/
      e[4].y + /*geom*/
      e[4].h), R & /*viewportScale*/
      8 && (Bt.scale = /*viewportScale*/
      e[3]), $.$set(Bt);
      const Rt = {};
      R & /*geom*/
      16 && (Rt.x = /*geom*/
      e[4].x), R & /*geom*/
      16 && (Rt.y = /*geom*/
      e[4].y + /*geom*/
      e[4].h), R & /*viewportScale*/
      8 && (Rt.scale = /*viewportScale*/
      e[3]), J.$set(Rt);
    },
    i(L) {
      F || (V(W.$$.fragment, L), V(O.$$.fragment, L), V($.$$.fragment, L), V(J.$$.fragment, L), F = !0);
    },
    o(L) {
      Z(W.$$.fragment, L), Z(O.$$.fragment, L), Z($.$$.fragment, L), Z(J.$$.fragment, L), F = !1;
    },
    d(L) {
      L && (N(t), N(a), N(l), N(f), N(m), N(x), N(b), N(k), N(A), N(I), N(T), N(D), N(G), N(lt), N(tt)), Gt(W, L), Gt(O, L), Gt($, L), Gt(J, L), Yt = !1, ie(ge);
    }
  };
}
function zh(e) {
  let t, n;
  return t = new Io({
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
          Vh,
          ({ grab: s }) => ({ 9: s }),
          ({ grab: s }) => s ? 512 : 0
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
      Ht(t.$$.fragment);
    },
    m(s, i) {
      Ft(t, s, i), n = !0;
    },
    p(s, [i]) {
      const r = {};
      i & /*shape*/
      1 && (r.shape = /*shape*/
      s[0]), i & /*transform*/
      4 && (r.transform = /*transform*/
      s[2]), i & /*$$scope, geom, viewportScale, grab, computedStyle*/
      1562 && (r.$$scope = { dirty: i, ctx: s }), t.$set(r);
    },
    i(s) {
      n || (V(t.$$.fragment, s), n = !0);
    },
    o(s) {
      Z(t.$$.fragment, s), n = !1;
    },
    d(s) {
      Gt(t, s);
    }
  };
}
function Wh(e, t, n) {
  let s, { shape: i } = t, { computedStyle: r } = t, { transform: o } = t, { viewportScale: a = 1 } = t;
  const l = (d, f, m) => {
    const g = d.geometry.bounds;
    let [p, y] = [g.minX, g.minY], [x, b] = [g.maxX, g.maxY];
    const [_, M] = m;
    if (f === "SHAPE")
      p += _, x += _, y += M, b += M;
    else {
      switch (f) {
        case "TOP":
        case "TOP_LEFT":
        case "TOP_RIGHT": {
          y += M;
          break;
        }
        case "BOTTOM":
        case "BOTTOM_LEFT":
        case "BOTTOM_RIGHT": {
          b += M;
          break;
        }
      }
      switch (f) {
        case "LEFT":
        case "TOP_LEFT":
        case "BOTTOM_LEFT": {
          p += _;
          break;
        }
        case "RIGHT":
        case "TOP_RIGHT":
        case "BOTTOM_RIGHT": {
          x += _;
          break;
        }
      }
    }
    const B = Math.min(p, x), k = Math.min(y, b), A = Math.abs(x - p), S = Math.abs(b - y);
    return {
      ...d,
      geometry: {
        x: B,
        y: k,
        w: A,
        h: S,
        bounds: {
          minX: B,
          minY: k,
          maxX: B + A,
          maxY: k + S
        }
      }
    };
  };
  function h(d) {
    ae.call(this, e, d);
  }
  function c(d) {
    ae.call(this, e, d);
  }
  function u(d) {
    ae.call(this, e, d);
  }
  return e.$$set = (d) => {
    "shape" in d && n(0, i = d.shape), "computedStyle" in d && n(1, r = d.computedStyle), "transform" in d && n(2, o = d.transform), "viewportScale" in d && n(3, a = d.viewportScale);
  }, e.$$.update = () => {
    e.$$.dirty & /*shape*/
    1 && n(4, s = i.geometry);
  }, [
    i,
    r,
    o,
    a,
    s,
    l,
    h,
    c,
    u
  ];
}
class jh extends Wt {
  constructor(t) {
    super(), zt(this, t, Wh, zh, Et, {
      shape: 0,
      computedStyle: 1,
      transform: 2,
      viewportScale: 3
    });
  }
}
const Co = /* @__PURE__ */ new Map([
  [et.RECTANGLE, jh],
  [et.POLYGON, Xh]
]), Po = (e) => Co.get(e.type), ko = (e, t) => Co.set(e, t), qh = (e) => ({}), Ji = (e) => ({ grab: (
  /*onGrab*/
  e[0]
) });
function Zh(e) {
  let t, n, s, i;
  const r = (
    /*#slots*/
    e[7].default
  ), o = Tl(
    r,
    e,
    /*$$scope*/
    e[6],
    Ji
  );
  return {
    c() {
      t = K("g"), o && o.c(), v(t, "class", "a9s-annotation selected");
    },
    m(a, l) {
      U(a, t, l), o && o.m(t, null), n = !0, s || (i = [
        ht(
          t,
          "pointerup",
          /*onRelease*/
          e[2]
        ),
        ht(
          t,
          "pointermove",
          /*onPointerMove*/
          e[1]
        )
      ], s = !0);
    },
    p(a, [l]) {
      o && o.p && (!n || l & /*$$scope*/
      64) && Cl(
        o,
        r,
        a,
        /*$$scope*/
        a[6],
        n ? El(
          r,
          /*$$scope*/
          a[6],
          l,
          qh
        ) : Pl(
          /*$$scope*/
          a[6]
        ),
        Ji
      );
    },
    i(a) {
      n || (V(o, a), n = !0);
    },
    o(a) {
      Z(o, a), n = !1;
    },
    d(a) {
      a && N(t), o && o.d(a), s = !1, ie(i);
    }
  };
}
function Kh(e, t, n) {
  let { $$slots: s = {}, $$scope: i } = t;
  const r = on();
  let { shape: o } = t, { editor: a } = t, { transform: l } = t, h, c, u;
  const d = (g) => (p) => {
    h = g, c = l.elementToImage(p.offsetX, p.offsetY), u = o, p.target.setPointerCapture(p.pointerId), r("grab", p);
  }, f = (g) => {
    if (h) {
      const [p, y] = l.elementToImage(g.offsetX, g.offsetY), x = [p - c[0], y - c[1]];
      n(3, o = a(u, h, x)), r("change", o);
    }
  }, m = (g) => {
    g.target.releasePointerCapture(g.pointerId), h = void 0, u = o, r("release", g);
  };
  return e.$$set = (g) => {
    "shape" in g && n(3, o = g.shape), "editor" in g && n(4, a = g.editor), "transform" in g && n(5, l = g.transform), "$$scope" in g && n(6, i = g.$$scope);
  }, [d, f, m, o, a, l, i, s];
}
class Io extends Wt {
  constructor(t) {
    super(), zt(this, t, Kh, Zh, Et, { shape: 3, editor: 4, transform: 5 });
  }
}
const ds = (e, t) => {
  const n = typeof t == "function" ? t(e) : t;
  if (n) {
    const { fill: s, fillOpacity: i } = n;
    let r = "";
    return s && (r += `fill:${s};stroke:${s};`), r += `fill-opacity:${i || "0.25"};`, r;
  }
};
function Qh(e, t, n) {
  let s;
  const i = on();
  let { annotation: r } = t, { editor: o } = t, { style: a } = t, { target: l } = t, { transform: h } = t, { viewportScale: c } = t, u;
  return Fn(() => (n(6, u = new o({
    target: l,
    props: {
      shape: r.target.selector,
      computedStyle: s,
      transform: h,
      viewportScale: c
    }
  })), u.$on("change", (d) => {
    u.$$set({ shape: d.detail }), i("change", d.detail);
  }), u.$on("grab", (d) => i("grab", d.detail)), u.$on("release", (d) => i("release", d.detail)), () => {
    u.$destroy();
  })), e.$$set = (d) => {
    "annotation" in d && n(0, r = d.annotation), "editor" in d && n(1, o = d.editor), "style" in d && n(2, a = d.style), "target" in d && n(3, l = d.target), "transform" in d && n(4, h = d.transform), "viewportScale" in d && n(5, c = d.viewportScale);
  }, e.$$.update = () => {
    e.$$.dirty & /*annotation, style*/
    5 && (s = ds(r, a)), e.$$.dirty & /*annotation, editorComponent*/
    65 && r && (u == null || u.$set({ shape: r.target.selector })), e.$$.dirty & /*editorComponent, transform*/
    80 && u && u.$set({ transform: h }), e.$$.dirty & /*editorComponent, viewportScale*/
    96 && u && u.$set({ viewportScale: c });
  }, [r, o, a, l, h, c, u];
}
class Jh extends Wt {
  constructor(t) {
    super(), zt(this, t, Qh, null, Et, {
      annotation: 0,
      editor: 1,
      style: 2,
      target: 3,
      transform: 4,
      viewportScale: 5
    });
  }
}
function tc(e, t, n) {
  const s = on();
  let { drawingMode: i } = t, { target: r } = t, { tool: o } = t, { transform: a } = t, { viewportScale: l } = t, h;
  return Fn(() => {
    const c = r.closest("svg"), u = [], d = (f, m, g) => {
      c == null || c.addEventListener(f, m, g), u.push(() => c == null ? void 0 : c.removeEventListener(f, m, g));
    };
    return n(5, h = new o({
      target: r,
      props: {
        addEventListener: d,
        drawingMode: i,
        transform: a,
        viewportScale: l
      }
    })), h.$on("create", (f) => s("create", f.detail)), () => {
      u.forEach((f) => f()), h.$destroy();
    };
  }), e.$$set = (c) => {
    "drawingMode" in c && n(0, i = c.drawingMode), "target" in c && n(1, r = c.target), "tool" in c && n(2, o = c.tool), "transform" in c && n(3, a = c.transform), "viewportScale" in c && n(4, l = c.viewportScale);
  }, e.$$.update = () => {
    e.$$.dirty & /*toolComponent, transform*/
    40 && h && h.$set({ transform: a }), e.$$.dirty & /*toolComponent, viewportScale*/
    48 && h && h.$set({ viewportScale: l });
  }, [i, r, o, a, l, h];
}
class ec extends Wt {
  constructor(t) {
    super(), zt(this, t, tc, null, Et, {
      drawingMode: 0,
      target: 1,
      tool: 2,
      transform: 3,
      viewportScale: 4
    });
  }
}
function tr(e) {
  let t, n;
  return {
    c() {
      t = K("rect"), n = K("rect"), v(t, "class", "a9s-outer"), v(
        t,
        "x",
        /*x*/
        e[1]
      ), v(
        t,
        "y",
        /*y*/
        e[2]
      ), v(
        t,
        "width",
        /*w*/
        e[3]
      ), v(
        t,
        "height",
        /*h*/
        e[4]
      ), v(n, "class", "a9s-inner"), v(
        n,
        "x",
        /*x*/
        e[1]
      ), v(
        n,
        "y",
        /*y*/
        e[2]
      ), v(
        n,
        "width",
        /*w*/
        e[3]
      ), v(
        n,
        "height",
        /*h*/
        e[4]
      );
    },
    m(s, i) {
      U(s, t, i), U(s, n, i);
    },
    p(s, i) {
      i & /*x*/
      2 && v(
        t,
        "x",
        /*x*/
        s[1]
      ), i & /*y*/
      4 && v(
        t,
        "y",
        /*y*/
        s[2]
      ), i & /*w*/
      8 && v(
        t,
        "width",
        /*w*/
        s[3]
      ), i & /*h*/
      16 && v(
        t,
        "height",
        /*h*/
        s[4]
      ), i & /*x*/
      2 && v(
        n,
        "x",
        /*x*/
        s[1]
      ), i & /*y*/
      4 && v(
        n,
        "y",
        /*y*/
        s[2]
      ), i & /*w*/
      8 && v(
        n,
        "width",
        /*w*/
        s[3]
      ), i & /*h*/
      16 && v(
        n,
        "height",
        /*h*/
        s[4]
      );
    },
    d(s) {
      s && (N(t), N(n));
    }
  };
}
function nc(e) {
  let t, n = (
    /*origin*/
    e[0] && tr(e)
  );
  return {
    c() {
      t = K("g"), n && n.c(), v(t, "class", "a9s-annotation a9s-rubberband");
    },
    m(s, i) {
      U(s, t, i), n && n.m(t, null);
    },
    p(s, [i]) {
      s[0] ? n ? n.p(s, i) : (n = tr(s), n.c(), n.m(t, null)) : n && (n.d(1), n = null);
    },
    i: at,
    o: at,
    d(s) {
      s && N(t), n && n.d();
    }
  };
}
function sc(e, t, n) {
  const s = on();
  let { addEventListener: i } = t, { drawingMode: r } = t, { transform: o } = t, a, l, h, c, u, d, f;
  const m = (x) => {
    const b = x;
    a = performance.now(), r === "drag" && (n(0, l = o.elementToImage(b.offsetX, b.offsetY)), h = l, n(1, c = l[0]), n(2, u = l[1]), n(3, d = 1), n(4, f = 1));
  }, g = (x) => {
    const b = x;
    l && (h = o.elementToImage(b.offsetX, b.offsetY), n(1, c = Math.min(h[0], l[0])), n(2, u = Math.min(h[1], l[1])), n(3, d = Math.abs(h[0] - l[0])), n(4, f = Math.abs(h[1] - l[1])));
  }, p = (x) => {
    const b = x, _ = performance.now() - a;
    if (r === "click") {
      if (_ > 300)
        return;
      b.stopPropagation(), l ? y() : (n(0, l = o.elementToImage(b.offsetX, b.offsetY)), h = l, n(1, c = l[0]), n(2, u = l[1]), n(3, d = 1), n(4, f = 1));
    } else
      l && (_ > 300 || d * f > 100 ? (b.stopPropagation(), y()) : (n(0, l = void 0), h = void 0));
  }, y = () => {
    if (d * f > 15) {
      const x = {
        type: et.RECTANGLE,
        geometry: {
          bounds: {
            minX: c,
            minY: u,
            maxX: c + d,
            maxY: u + f
          },
          x: c,
          y: u,
          w: d,
          h: f
        }
      };
      s("create", x);
    }
    n(0, l = void 0), h = void 0;
  };
  return Fn(() => {
    i("pointerdown", m), i("pointermove", g), i("pointerup", p, !0);
  }), e.$$set = (x) => {
    "addEventListener" in x && n(5, i = x.addEventListener), "drawingMode" in x && n(6, r = x.drawingMode), "transform" in x && n(7, o = x.transform);
  }, [l, c, u, d, f, i, r, o];
}
class ic extends Wt {
  constructor(t) {
    super(), zt(this, t, sc, nc, Et, {
      addEventListener: 5,
      drawingMode: 6,
      transform: 7
    });
  }
}
function Ss(e) {
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
    ]).map((s) => s.join(",")).join(" ")
  );
  return t[16] = n, t;
}
function er(e) {
  let t, n, s, i, r, o = (
    /*isClosable*/
    e[2] && nr(e)
  );
  return {
    c() {
      t = K("polygon"), s = K("polygon"), o && o.c(), r = re(), v(t, "class", "a9s-outer"), v(t, "points", n = /*coords*/
      e[16]), v(s, "class", "a9s-inner"), v(s, "points", i = /*coords*/
      e[16]);
    },
    m(a, l) {
      U(a, t, l), U(a, s, l), o && o.m(a, l), U(a, r, l);
    },
    p(a, l) {
      l & /*isClosable, points, cursor*/
      7 && n !== (n = /*coords*/
      a[16]) && v(t, "points", n), l & /*isClosable, points, cursor*/
      7 && i !== (i = /*coords*/
      a[16]) && v(s, "points", i), /*isClosable*/
      a[2] ? o ? o.p(a, l) : (o = nr(a), o.c(), o.m(r.parentNode, r)) : o && (o.d(1), o = null);
    },
    d(a) {
      a && (N(t), N(s), N(r)), o && o.d(a);
    }
  };
}
function nr(e) {
  let t, n, s;
  return {
    c() {
      t = K("rect"), v(t, "class", "a9s-corner-handle"), v(t, "x", n = /*points*/
      e[0][0][0] - /*handleSize*/
      e[3] / 2), v(t, "y", s = /*points*/
      e[0][0][1] - /*handleSize*/
      e[3] / 2), v(
        t,
        "height",
        /*handleSize*/
        e[3]
      ), v(
        t,
        "width",
        /*handleSize*/
        e[3]
      );
    },
    m(i, r) {
      U(i, t, r);
    },
    p(i, r) {
      r & /*points, handleSize*/
      9 && n !== (n = /*points*/
      i[0][0][0] - /*handleSize*/
      i[3] / 2) && v(t, "x", n), r & /*points, handleSize*/
      9 && s !== (s = /*points*/
      i[0][0][1] - /*handleSize*/
      i[3] / 2) && v(t, "y", s), r & /*handleSize*/
      8 && v(
        t,
        "height",
        /*handleSize*/
        i[3]
      ), r & /*handleSize*/
      8 && v(
        t,
        "width",
        /*handleSize*/
        i[3]
      );
    },
    d(i) {
      i && N(t);
    }
  };
}
function rc(e) {
  let t, n = (
    /*cursor*/
    e[1] && er(Ss(e))
  );
  return {
    c() {
      t = K("g"), n && n.c(), v(t, "class", "a9s-annotation a9s-rubberband");
    },
    m(s, i) {
      U(s, t, i), n && n.m(t, null);
    },
    p(s, [i]) {
      s[1] ? n ? n.p(Ss(s), i) : (n = er(Ss(s)), n.c(), n.m(t, null)) : n && (n.d(1), n = null);
    },
    i: at,
    o: at,
    d(s) {
      s && N(t), n && n.d();
    }
  };
}
const oc = 20, ac = 1500;
function lc(e, t, n) {
  let s;
  const i = on();
  let { addEventListener: r } = t, { drawingMode: o } = t, { transform: a } = t, { viewportScale: l = 1 } = t, h, c = [], u, d, f = !1;
  const m = (b) => {
    const _ = b, { timeStamp: M, offsetX: B, offsetY: k } = _;
    if (h = { timeStamp: M, offsetX: B, offsetY: k }, o === "drag" && c.length === 0) {
      const A = a.elementToImage(_.offsetX, _.offsetY);
      c.push(A), n(1, u = A);
    }
  }, g = (b) => {
    const _ = b;
    if (d && clearTimeout(d), c.length > 0) {
      if (n(1, u = a.elementToImage(_.offsetX, _.offsetY)), c.length > 2) {
        const M = Ms(u, c[0]) * l;
        n(2, f = M < oc);
      }
      _.pointerType === "touch" && (d = setTimeout(
        () => {
          y();
        },
        ac
      ));
    }
  }, p = (b) => {
    const _ = b;
    if (d && clearTimeout(d), o === "click") {
      const M = _.timeStamp - h.timeStamp, B = Ms([h.offsetX, h.offsetY], [_.offsetX, _.offsetY]);
      if (M > 300 || B > 15)
        return;
      if (f)
        x();
      else if (c.length === 0) {
        const k = a.elementToImage(_.offsetX, _.offsetY);
        c.push(k), n(1, u = k);
      } else
        c.push(u);
    } else {
      if (c.length === 1 && Ms(c[0], u) <= 4) {
        n(0, c = []), n(1, u = void 0);
        return;
      }
      _.stopImmediatePropagation(), f ? x() : c.push(u);
    }
  }, y = () => {
    if (!u)
      return;
    const b = [...c, u], _ = {
      type: et.POLYGON,
      geometry: { bounds: as(b), points: b }
    };
    Ks(_) > 4 && (n(0, c = []), n(1, u = void 0), i("create", _));
  }, x = () => {
    const b = {
      type: et.POLYGON,
      geometry: {
        bounds: as(c),
        points: [...c]
      }
    };
    n(0, c = []), n(1, u = void 0), i("create", b);
  };
  return Fn(() => {
    r("pointerdown", m, !0), r("pointermove", g), r("pointerup", p, !0), r("dblclick", y, !0);
  }), e.$$set = (b) => {
    "addEventListener" in b && n(4, r = b.addEventListener), "drawingMode" in b && n(5, o = b.drawingMode), "transform" in b && n(6, a = b.transform), "viewportScale" in b && n(7, l = b.viewportScale);
  }, e.$$.update = () => {
    e.$$.dirty & /*viewportScale*/
    128 && n(3, s = 10 / l);
  }, [
    c,
    u,
    f,
    s,
    r,
    o,
    a,
    l
  ];
}
class hc extends Wt {
  constructor(t) {
    super(), zt(this, t, lc, rc, Et, {
      addEventListener: 4,
      drawingMode: 5,
      transform: 6,
      viewportScale: 7
    });
  }
}
const vi = /* @__PURE__ */ new Map([
  ["rectangle", { tool: ic }],
  ["polygon", { tool: hc }]
]), fs = () => [...vi.keys()], ms = (e) => vi.get(e), Bo = (e, t, n) => vi.set(e, { tool: t, opts: n });
function cc(e) {
  let t, n, s, i, r;
  return {
    c() {
      t = K("g"), n = K("ellipse"), i = K("ellipse"), v(n, "class", "a9s-outer"), v(n, "style", s = /*computedStyle*/
      e[1] ? "display:none;" : void 0), v(
        n,
        "cx",
        /*cx*/
        e[2]
      ), v(
        n,
        "cy",
        /*cy*/
        e[3]
      ), v(
        n,
        "rx",
        /*rx*/
        e[4]
      ), v(
        n,
        "ry",
        /*ry*/
        e[5]
      ), v(i, "class", "a9s-inner"), v(
        i,
        "style",
        /*computedStyle*/
        e[1]
      ), v(
        i,
        "cx",
        /*cx*/
        e[2]
      ), v(
        i,
        "cy",
        /*cy*/
        e[3]
      ), v(
        i,
        "rx",
        /*rx*/
        e[4]
      ), v(
        i,
        "ry",
        /*ry*/
        e[5]
      ), v(t, "data-id", r = /*annotation*/
      e[0].id);
    },
    m(o, a) {
      U(o, t, a), te(t, n), te(t, i);
    },
    p(o, [a]) {
      a & /*computedStyle*/
      2 && s !== (s = /*computedStyle*/
      o[1] ? "display:none;" : void 0) && v(n, "style", s), a & /*computedStyle*/
      2 && v(
        i,
        "style",
        /*computedStyle*/
        o[1]
      ), a & /*annotation*/
      1 && r !== (r = /*annotation*/
      o[0].id) && v(t, "data-id", r);
    },
    i: at,
    o: at,
    d(o) {
      o && N(t);
    }
  };
}
function uc(e, t, n) {
  let s, { annotation: i } = t, { geom: r } = t, { style: o } = t;
  const { cx: a, cy: l, rx: h, ry: c } = r;
  return e.$$set = (u) => {
    "annotation" in u && n(0, i = u.annotation), "geom" in u && n(6, r = u.geom), "style" in u && n(7, o = u.style);
  }, e.$$.update = () => {
    e.$$.dirty & /*annotation, style*/
    129 && n(1, s = ds(i, o));
  }, [i, s, a, l, h, c, r, o];
}
class dc extends Wt {
  constructor(t) {
    super(), zt(this, t, uc, cc, Et, { annotation: 0, geom: 6, style: 7 });
  }
}
function fc(e) {
  let t, n, s, i, r;
  return {
    c() {
      t = K("g"), n = K("polygon"), i = K("polygon"), v(n, "class", "a9s-outer"), v(n, "style", s = /*computedStyle*/
      e[1] ? "display:none;" : void 0), v(
        n,
        "points",
        /*points*/
        e[2].map(mc).join(" ")
      ), v(i, "class", "a9s-inner"), v(
        i,
        "style",
        /*computedStyle*/
        e[1]
      ), v(
        i,
        "points",
        /*points*/
        e[2].map(pc).join(" ")
      ), v(t, "data-id", r = /*annotation*/
      e[0].id);
    },
    m(o, a) {
      U(o, t, a), te(t, n), te(t, i);
    },
    p(o, [a]) {
      a & /*computedStyle*/
      2 && s !== (s = /*computedStyle*/
      o[1] ? "display:none;" : void 0) && v(n, "style", s), a & /*computedStyle*/
      2 && v(
        i,
        "style",
        /*computedStyle*/
        o[1]
      ), a & /*annotation*/
      1 && r !== (r = /*annotation*/
      o[0].id) && v(t, "data-id", r);
    },
    i: at,
    o: at,
    d(o) {
      o && N(t);
    }
  };
}
const mc = (e) => e.join(","), pc = (e) => e.join(",");
function gc(e, t, n) {
  let s, { annotation: i } = t, { geom: r } = t, { style: o } = t;
  const { points: a } = r;
  return e.$$set = (l) => {
    "annotation" in l && n(0, i = l.annotation), "geom" in l && n(3, r = l.geom), "style" in l && n(4, o = l.style);
  }, e.$$.update = () => {
    e.$$.dirty & /*annotation, style*/
    17 && n(1, s = ds(i, o));
  }, [i, s, a, r, o];
}
class yc extends Wt {
  constructor(t) {
    super(), zt(this, t, gc, fc, Et, { annotation: 0, geom: 3, style: 4 });
  }
}
function _c(e) {
  let t, n, s, i, r;
  return {
    c() {
      t = K("g"), n = K("rect"), i = K("rect"), v(n, "class", "a9s-outer"), v(n, "style", s = /*computedStyle*/
      e[5] ? "display:none;" : void 0), v(
        n,
        "x",
        /*x*/
        e[4]
      ), v(
        n,
        "y",
        /*y*/
        e[3]
      ), v(
        n,
        "width",
        /*w*/
        e[2]
      ), v(
        n,
        "height",
        /*h*/
        e[1]
      ), v(i, "class", "a9s-inner"), v(
        i,
        "style",
        /*computedStyle*/
        e[5]
      ), v(
        i,
        "x",
        /*x*/
        e[4]
      ), v(
        i,
        "y",
        /*y*/
        e[3]
      ), v(
        i,
        "width",
        /*w*/
        e[2]
      ), v(
        i,
        "height",
        /*h*/
        e[1]
      ), v(t, "data-id", r = /*annotation*/
      e[0].id);
    },
    m(o, a) {
      U(o, t, a), te(t, n), te(t, i);
    },
    p(o, [a]) {
      a & /*computedStyle*/
      32 && s !== (s = /*computedStyle*/
      o[5] ? "display:none;" : void 0) && v(n, "style", s), a & /*x*/
      16 && v(
        n,
        "x",
        /*x*/
        o[4]
      ), a & /*y*/
      8 && v(
        n,
        "y",
        /*y*/
        o[3]
      ), a & /*w*/
      4 && v(
        n,
        "width",
        /*w*/
        o[2]
      ), a & /*h*/
      2 && v(
        n,
        "height",
        /*h*/
        o[1]
      ), a & /*computedStyle*/
      32 && v(
        i,
        "style",
        /*computedStyle*/
        o[5]
      ), a & /*x*/
      16 && v(
        i,
        "x",
        /*x*/
        o[4]
      ), a & /*y*/
      8 && v(
        i,
        "y",
        /*y*/
        o[3]
      ), a & /*w*/
      4 && v(
        i,
        "width",
        /*w*/
        o[2]
      ), a & /*h*/
      2 && v(
        i,
        "height",
        /*h*/
        o[1]
      ), a & /*annotation*/
      1 && r !== (r = /*annotation*/
      o[0].id) && v(t, "data-id", r);
    },
    i: at,
    o: at,
    d(o) {
      o && N(t);
    }
  };
}
function xc(e, t, n) {
  let s, i, r, o, a, { annotation: l } = t, { geom: h } = t, { style: c } = t;
  return e.$$set = (u) => {
    "annotation" in u && n(0, l = u.annotation), "geom" in u && n(6, h = u.geom), "style" in u && n(7, c = u.style);
  }, e.$$.update = () => {
    e.$$.dirty & /*annotation, style*/
    129 && n(5, s = ds(l, c)), e.$$.dirty & /*geom*/
    64 && n(4, { x: i, y: r, w: o, h: a } = h, i, (n(3, r), n(6, h)), (n(2, o), n(6, h)), (n(1, a), n(6, h)));
  }, [l, a, o, r, i, s, h, c];
}
class bc extends Wt {
  constructor(t) {
    super(), zt(this, t, xc, _c, Et, { annotation: 0, geom: 6, style: 7 });
  }
}
const wc = (e) => ({
  elementToImage: (t, n) => {
    const s = e.getBoundingClientRect(), i = e.createSVGPoint();
    i.x = t + s.x, i.y = n + s.y;
    const { x: r, y: o } = i.matrixTransform(e.getScreenCTM().inverse());
    return [r, o];
  }
}), vc = 250, Ac = (e, t) => {
  const n = on();
  let s;
  return { onPointerDown: () => s = performance.now(), onPointerUp: (i) => {
    if (performance.now() - s < vc) {
      const { x: r, y: o } = Mc(i, e), a = t.getAt(r, o);
      a ? n("click", { originalEvent: i, annotation: a }) : n("click", { originalEvent: i });
    }
  } };
}, Mc = (e, t) => {
  const n = t.createSVGPoint(), s = t.getBoundingClientRect(), i = e.clientX - s.x, r = e.clientY - s.y, { left: o, top: a } = t.getBoundingClientRect();
  return n.x = i + o, n.y = r + a, n.matrixTransform(t.getScreenCTM().inverse());
}, { Boolean: Ro } = kl;
function sr(e, t, n) {
  const s = e.slice();
  return s[31] = t[n], s;
}
function ir(e, t, n) {
  const s = e.slice();
  return s[34] = t[n], s;
}
function Ts(e) {
  const t = e.slice(), n = (
    /*annotation*/
    t[34].target.selector
  );
  return t[37] = n, t;
}
function rr(e) {
  let t = (
    /*annotation*/
    e[34].id
  ), n, s, i = or(e);
  return {
    c() {
      i.c(), n = re();
    },
    m(r, o) {
      i.m(r, o), U(r, n, o), s = !0;
    },
    p(r, o) {
      o[0] & /*$store*/
      16384 && Et(t, t = /*annotation*/
      r[34].id) ? (ee(), Z(i, 1, 1, at), ne(), i = or(r), i.c(), V(i, 1), i.m(n.parentNode, n)) : i.p(r, o);
    },
    i(r) {
      s || (V(i), s = !0);
    },
    o(r) {
      Z(i), s = !1;
    },
    d(r) {
      r && N(n), i.d(r);
    }
  };
}
function Sc(e) {
  let t, n;
  return t = new yc({
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
      Ht(t.$$.fragment);
    },
    m(s, i) {
      Ft(t, s, i), n = !0;
    },
    p(s, i) {
      const r = {};
      i[0] & /*$store*/
      16384 && (r.annotation = /*annotation*/
      s[34]), i[0] & /*$store*/
      16384 && (r.geom = /*selector*/
      s[37].geometry), i[0] & /*style*/
      2 && (r.style = /*style*/
      s[1]), t.$set(r);
    },
    i(s) {
      n || (V(t.$$.fragment, s), n = !0);
    },
    o(s) {
      Z(t.$$.fragment, s), n = !1;
    },
    d(s) {
      Gt(t, s);
    }
  };
}
function Tc(e) {
  let t, n;
  return t = new bc({
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
      Ht(t.$$.fragment);
    },
    m(s, i) {
      Ft(t, s, i), n = !0;
    },
    p(s, i) {
      const r = {};
      i[0] & /*$store*/
      16384 && (r.annotation = /*annotation*/
      s[34]), i[0] & /*$store*/
      16384 && (r.geom = /*selector*/
      s[37].geometry), i[0] & /*style*/
      2 && (r.style = /*style*/
      s[1]), t.$set(r);
    },
    i(s) {
      n || (V(t.$$.fragment, s), n = !0);
    },
    o(s) {
      Z(t.$$.fragment, s), n = !1;
    },
    d(s) {
      Gt(t, s);
    }
  };
}
function Ec(e) {
  let t, n;
  return t = new dc({
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
      Ht(t.$$.fragment);
    },
    m(s, i) {
      Ft(t, s, i), n = !0;
    },
    p(s, i) {
      const r = {};
      i[0] & /*$store*/
      16384 && (r.annotation = /*annotation*/
      s[34]), i[0] & /*$store*/
      16384 && (r.geom = /*selector*/
      s[37].geometry), i[0] & /*style*/
      2 && (r.style = /*style*/
      s[1]), t.$set(r);
    },
    i(s) {
      n || (V(t.$$.fragment, s), n = !0);
    },
    o(s) {
      Z(t.$$.fragment, s), n = !1;
    },
    d(s) {
      Gt(t, s);
    }
  };
}
function or(e) {
  let t, n, s, i;
  const r = [Ec, Tc, Sc], o = [];
  function a(l, h) {
    return (
      /*selector*/
      l[37].type === et.ELLIPSE ? 0 : (
        /*selector*/
        l[37].type === et.RECTANGLE ? 1 : (
          /*selector*/
          l[37].type === et.POLYGON ? 2 : -1
        )
      )
    );
  }
  return ~(t = a(e)) && (n = o[t] = r[t](e)), {
    c() {
      n && n.c(), s = re();
    },
    m(l, h) {
      ~t && o[t].m(l, h), U(l, s, h), i = !0;
    },
    p(l, h) {
      let c = t;
      t = a(l), t === c ? ~t && o[t].p(l, h) : (n && (ee(), Z(o[c], 1, 1, () => {
        o[c] = null;
      }), ne()), ~t ? (n = o[t], n ? n.p(l, h) : (n = o[t] = r[t](l), n.c()), V(n, 1), n.m(s.parentNode, s)) : n = null);
    },
    i(l) {
      i || (V(n), i = !0);
    },
    o(l) {
      Z(n), i = !1;
    },
    d(l) {
      l && N(s), ~t && o[t].d(l);
    }
  };
}
function ar(e) {
  let t = !/*isEditable*/
  e[8](
    /*annotation*/
    e[34]
  ), n, s, i = t && rr(Ts(e));
  return {
    c() {
      i && i.c(), n = re();
    },
    m(r, o) {
      i && i.m(r, o), U(r, n, o), s = !0;
    },
    p(r, o) {
      o[0] & /*isEditable, $store*/
      16640 && (t = !/*isEditable*/
      r[8](
        /*annotation*/
        r[34]
      )), t ? i ? (i.p(Ts(r), o), o[0] & /*isEditable, $store*/
      16640 && V(i, 1)) : (i = rr(Ts(r)), i.c(), V(i, 1), i.m(n.parentNode, n)) : i && (ee(), Z(i, 1, 1, () => {
        i = null;
      }), ne());
    },
    i(r) {
      s || (V(i), s = !0);
    },
    o(r) {
      Z(i), s = !1;
    },
    d(r) {
      r && N(n), i && i.d(r);
    }
  };
}
function lr(e) {
  let t, n, s, i;
  const r = [Pc, Cc], o = [];
  function a(l, h) {
    return (
      /*editableAnnotations*/
      l[7] ? 0 : (
        /*tool*/
        l[13] && /*drawingEnabled*/
        l[0] ? 1 : -1
      )
    );
  }
  return ~(t = a(e)) && (n = o[t] = r[t](e)), {
    c() {
      n && n.c(), s = re();
    },
    m(l, h) {
      ~t && o[t].m(l, h), U(l, s, h), i = !0;
    },
    p(l, h) {
      let c = t;
      t = a(l), t === c ? ~t && o[t].p(l, h) : (n && (ee(), Z(o[c], 1, 1, () => {
        o[c] = null;
      }), ne()), ~t ? (n = o[t], n ? n.p(l, h) : (n = o[t] = r[t](l), n.c()), V(n, 1), n.m(s.parentNode, s)) : n = null);
    },
    i(l) {
      i || (V(n), i = !0);
    },
    o(l) {
      Z(n), i = !1;
    },
    d(l) {
      l && N(s), ~t && o[t].d(l);
    }
  };
}
function Cc(e) {
  let t = (
    /*toolName*/
    e[2]
  ), n, s, i = hr(e);
  return {
    c() {
      i.c(), n = re();
    },
    m(r, o) {
      i.m(r, o), U(r, n, o), s = !0;
    },
    p(r, o) {
      o[0] & /*toolName*/
      4 && Et(t, t = /*toolName*/
      r[2]) ? (ee(), Z(i, 1, 1, at), ne(), i = hr(r), i.c(), V(i, 1), i.m(n.parentNode, n)) : i.p(r, o);
    },
    i(r) {
      s || (V(i), s = !0);
    },
    o(r) {
      Z(i), s = !1;
    },
    d(r) {
      r && N(n), i.d(r);
    }
  };
}
function Pc(e) {
  let t, n, s = Je(
    /*editableAnnotations*/
    e[7]
  ), i = [];
  for (let o = 0; o < s.length; o += 1)
    i[o] = ur(sr(e, s, o));
  const r = (o) => Z(i[o], 1, 1, () => {
    i[o] = null;
  });
  return {
    c() {
      for (let o = 0; o < i.length; o += 1)
        i[o].c();
      t = re();
    },
    m(o, a) {
      for (let l = 0; l < i.length; l += 1)
        i[l] && i[l].m(o, a);
      U(o, t, a), n = !0;
    },
    p(o, a) {
      if (a[0] & /*editableAnnotations, drawingEl, getEditor, style, transform, $scale, onChangeSelected*/
      1607842) {
        s = Je(
          /*editableAnnotations*/
          o[7]
        );
        let l;
        for (l = 0; l < s.length; l += 1) {
          const h = sr(o, s, l);
          i[l] ? (i[l].p(h, a), V(i[l], 1)) : (i[l] = ur(h), i[l].c(), V(i[l], 1), i[l].m(t.parentNode, t));
        }
        for (ee(), l = s.length; l < i.length; l += 1)
          r(l);
        ne();
      }
    },
    i(o) {
      if (!n) {
        for (let a = 0; a < s.length; a += 1)
          V(i[a]);
        n = !0;
      }
    },
    o(o) {
      i = i.filter(Ro);
      for (let a = 0; a < i.length; a += 1)
        Z(i[a]);
      n = !1;
    },
    d(o) {
      o && N(t), _i(i, o);
    }
  };
}
function hr(e) {
  let t, n;
  return t = new ec({
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
      Ht(t.$$.fragment);
    },
    m(s, i) {
      Ft(t, s, i), n = !0;
    },
    p(s, i) {
      const r = {};
      i[0] & /*drawingEl*/
      32 && (r.target = /*drawingEl*/
      s[5]), i[0] & /*tool*/
      8192 && (r.tool = /*tool*/
      s[13]), i[0] & /*drawingMode*/
      4096 && (r.drawingMode = /*drawingMode*/
      s[12]), i[0] & /*transform*/
      2048 && (r.transform = /*transform*/
      s[11]), i[0] & /*$scale*/
      32768 && (r.viewportScale = /*$scale*/
      s[15]), t.$set(r);
    },
    i(s) {
      n || (V(t.$$.fragment, s), n = !0);
    },
    o(s) {
      Z(t.$$.fragment, s), n = !1;
    },
    d(s) {
      Gt(t, s);
    }
  };
}
function cr(e) {
  let t, n;
  return t = new Jh({
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
    ut(
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
      Ht(t.$$.fragment);
    },
    m(s, i) {
      Ft(t, s, i), n = !0;
    },
    p(s, i) {
      e = s;
      const r = {};
      i[0] & /*drawingEl*/
      32 && (r.target = /*drawingEl*/
      e[5]), i[0] & /*editableAnnotations*/
      128 && (r.editor = /*getEditor*/
      e[20](
        /*editable*/
        e[31].target.selector
      )), i[0] & /*editableAnnotations*/
      128 && (r.annotation = /*editable*/
      e[31]), i[0] & /*style*/
      2 && (r.style = /*style*/
      e[1]), i[0] & /*transform*/
      2048 && (r.transform = /*transform*/
      e[11]), i[0] & /*$scale*/
      32768 && (r.viewportScale = /*$scale*/
      e[15]), t.$set(r);
    },
    i(s) {
      n || (V(t.$$.fragment, s), n = !0);
    },
    o(s) {
      Z(t.$$.fragment, s), n = !1;
    },
    d(s) {
      Gt(t, s);
    }
  };
}
function ur(e) {
  let t = (
    /*editable*/
    e[31].id
  ), n, s, i = cr(e);
  return {
    c() {
      i.c(), n = re();
    },
    m(r, o) {
      i.m(r, o), U(r, n, o), s = !0;
    },
    p(r, o) {
      o[0] & /*editableAnnotations*/
      128 && Et(t, t = /*editable*/
      r[31].id) ? (ee(), Z(i, 1, 1, at), ne(), i = cr(r), i.c(), V(i, 1), i.m(n.parentNode, n)) : i.p(r, o);
    },
    i(r) {
      s || (V(i), s = !0);
    },
    o(r) {
      Z(i), s = !1;
    },
    d(r) {
      r && N(n), i.d(r);
    }
  };
}
function kc(e) {
  let t, n, s, i, r, o, a = Je(
    /*$store*/
    e[14]
  ), l = [];
  for (let u = 0; u < a.length; u += 1)
    l[u] = ar(ir(e, a, u));
  const h = (u) => Z(l[u], 1, 1, () => {
    l[u] = null;
  });
  let c = (
    /*drawingEl*/
    e[5] && lr(e)
  );
  return {
    c() {
      t = K("svg"), n = K("g");
      for (let u = 0; u < l.length; u += 1)
        l[u].c();
      s = K("g"), c && c.c(), v(s, "class", "drawing"), v(t, "class", "a9s-annotationlayer"), qe(
        t,
        "drawing",
        /*tool*/
        e[13]
      ), qe(t, "hidden", !/*visible*/
      e[3]);
    },
    m(u, d) {
      U(u, t, d), te(t, n);
      for (let f = 0; f < l.length; f += 1)
        l[f] && l[f].m(n, null);
      te(t, s), c && c.m(s, null), e[27](s), e[28](t), i = !0, r || (o = [
        ht(t, "pointerup", function() {
          ut(
            /*onPointerUp*/
            e[9]
          ) && e[9].apply(this, arguments);
        }),
        ht(t, "pointerdown", function() {
          ut(
            /*onPointerDown*/
            e[10]
          ) && e[10].apply(this, arguments);
        })
      ], r = !0);
    },
    p(u, d) {
      if (e = u, d[0] & /*$store, style, isEditable*/
      16642) {
        a = Je(
          /*$store*/
          e[14]
        );
        let f;
        for (f = 0; f < a.length; f += 1) {
          const m = ir(e, a, f);
          l[f] ? (l[f].p(m, d), V(l[f], 1)) : (l[f] = ar(m), l[f].c(), V(l[f], 1), l[f].m(n, null));
        }
        for (ee(), f = a.length; f < l.length; f += 1)
          h(f);
        ne();
      }
      e[5] ? c ? (c.p(e, d), d[0] & /*drawingEl*/
      32 && V(c, 1)) : (c = lr(e), c.c(), V(c, 1), c.m(s, null)) : c && (ee(), Z(c, 1, 1, () => {
        c = null;
      }), ne()), (!i || d[0] & /*tool*/
      8192) && qe(
        t,
        "drawing",
        /*tool*/
        e[13]
      ), (!i || d[0] & /*visible*/
      8) && qe(t, "hidden", !/*visible*/
      e[3]);
    },
    i(u) {
      if (!i) {
        for (let d = 0; d < a.length; d += 1)
          V(l[d]);
        V(c), i = !0;
      }
    },
    o(u) {
      l = l.filter(Ro);
      for (let d = 0; d < l.length; d += 1)
        Z(l[d]);
      Z(c), i = !1;
    },
    d(u) {
      u && N(t), _i(l, u), c && c.d(), e[27](null), e[28](null), r = !1, ie(o);
    }
  };
}
function Ic(e, t, n) {
  let s, i, r, o, a, l, h, c, u, d, f = at, m = () => (f(), f = yo(S, (O) => n(15, d = O)), S);
  e.$$.on_destroy.push(() => f());
  let { drawingEnabled: g } = t, { image: p } = t, { preferredDrawingMode: y } = t, { state: x } = t, { style: b = void 0 } = t, { toolName: _ = fs()[0] } = t, { user: M } = t, { visible: B = !0 } = t, k, A, S;
  Fn(() => m(n(6, S = $h(p, A))));
  const { selection: w, store: P } = x;
  Ui(e, w, (O) => n(26, c = O)), Ui(e, P, (O) => n(14, u = O));
  let I, T;
  const C = (O) => {
    I && P.unobserve(I);
    const lt = O.filter(({ editable: $ }) => $).map(({ id: $ }) => $);
    lt.length > 0 ? (n(7, T = lt.map(($) => P.getAnnotation($)).filter(Boolean)), I = ($) => {
      const { updated: tt } = $.changes;
      n(7, T = tt == null ? void 0 : tt.map((J) => J.newValue));
    }, P.observe(I, { annotations: lt })) : n(7, T = void 0);
  }, Y = (O) => {
    const lt = Ao(), $ = {
      id: lt,
      bodies: [],
      target: {
        annotation: lt,
        selector: O.detail,
        creator: M,
        created: /* @__PURE__ */ new Date()
      }
    };
    P.addAnnotation($), w.setSelected($.id);
  }, X = (O) => (lt) => {
    var $;
    const { target: tt } = O, J = 10 * 60 * 1e3, F = (($ = tt.creator) == null ? void 0 : $.id) !== M.id || !tt.created || (/* @__PURE__ */ new Date()).getTime() - tt.created.getTime() > J;
    P.updateTarget({
      ...tt,
      selector: lt.detail,
      created: F ? tt.created : /* @__PURE__ */ new Date(),
      updated: F ? /* @__PURE__ */ new Date() : void 0,
      updatedBy: F ? M : void 0
    });
  }, D = (O) => Po(O);
  function W(O) {
    os[O ? "unshift" : "push"](() => {
      k = O, n(5, k);
    });
  }
  function G(O) {
    os[O ? "unshift" : "push"](() => {
      A = O, n(4, A);
    });
  }
  return e.$$set = (O) => {
    "drawingEnabled" in O && n(0, g = O.drawingEnabled), "image" in O && n(21, p = O.image), "preferredDrawingMode" in O && n(22, y = O.preferredDrawingMode), "state" in O && n(23, x = O.state), "style" in O && n(1, b = O.style), "toolName" in O && n(2, _ = O.toolName), "user" in O && n(24, M = O.user), "visible" in O && n(3, B = O.visible);
  }, e.$$.update = () => {
    e.$$.dirty[0] & /*toolName*/
    4 && n(13, { tool: s, opts: i } = ms(_) || { tool: void 0, opts: void 0 }, s, (n(25, i), n(2, _))), e.$$.dirty[0] & /*opts, preferredDrawingMode*/
    37748736 && n(12, r = (i == null ? void 0 : i.drawingMode) || y), e.$$.dirty[0] & /*svgEl*/
    16 && n(11, o = wc(A)), e.$$.dirty[0] & /*svgEl*/
    16 && n(10, { onPointerDown: a, onPointerUp: l } = Ac(A, P), a, (n(9, l), n(4, A))), e.$$.dirty[0] & /*$selection*/
    67108864 && n(8, h = (O) => c.selected.find((lt) => lt.id === O.id && lt.editable)), e.$$.dirty[0] & /*$selection*/
    67108864 && C(c.selected);
  }, [
    g,
    b,
    _,
    B,
    A,
    k,
    S,
    T,
    h,
    l,
    a,
    o,
    r,
    s,
    u,
    d,
    w,
    P,
    Y,
    X,
    D,
    p,
    y,
    x,
    M,
    i,
    c,
    W,
    G
  ];
}
class Bc extends Wt {
  constructor(t) {
    super(), zt(
      this,
      t,
      Ic,
      kc,
      Et,
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
function Rc(e, t, n, s, i) {
  Oo(e, t, n || 0, s || e.length - 1, i || Oc);
}
function Oo(e, t, n, s, i) {
  for (; s > n; ) {
    if (s - n > 600) {
      var r = s - n + 1, o = t - n + 1, a = Math.log(r), l = 0.5 * Math.exp(2 * a / 3), h = 0.5 * Math.sqrt(a * l * (r - l) / r) * (o - r / 2 < 0 ? -1 : 1), c = Math.max(n, Math.floor(t - o * l / r + h)), u = Math.min(s, Math.floor(t + (r - o) * l / r + h));
      Oo(e, t, c, u, i);
    }
    var d = e[t], f = n, m = s;
    for (ln(e, n, t), i(e[s], d) > 0 && ln(e, n, s); f < m; ) {
      for (ln(e, f, m), f++, m--; i(e[f], d) < 0; )
        f++;
      for (; i(e[m], d) > 0; )
        m--;
    }
    i(e[n], d) === 0 ? ln(e, n, m) : (m++, ln(e, m, s)), m <= t && (n = m + 1), t <= m && (s = m - 1);
  }
}
function ln(e, t, n) {
  var s = e[t];
  e[t] = e[n], e[n] = s;
}
function Oc(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
class Yc {
  constructor(t = 9) {
    this._maxEntries = Math.max(4, t), this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4)), this.clear();
  }
  all() {
    return this._all(this.data, []);
  }
  search(t) {
    let n = this.data;
    const s = [];
    if (!Dn(t, n))
      return s;
    const i = this.toBBox, r = [];
    for (; n; ) {
      for (let o = 0; o < n.children.length; o++) {
        const a = n.children[o], l = n.leaf ? i(a) : a;
        Dn(t, l) && (n.leaf ? s.push(a) : Cs(t, l) ? this._all(a, s) : r.push(a));
      }
      n = r.pop();
    }
    return s;
  }
  collides(t) {
    let n = this.data;
    if (!Dn(t, n))
      return !1;
    const s = [];
    for (; n; ) {
      for (let i = 0; i < n.children.length; i++) {
        const r = n.children[i], o = n.leaf ? this.toBBox(r) : r;
        if (Dn(t, o)) {
          if (n.leaf || Cs(t, o))
            return !0;
          s.push(r);
        }
      }
      n = s.pop();
    }
    return !1;
  }
  load(t) {
    if (!(t && t.length))
      return this;
    if (t.length < this._minEntries) {
      for (let s = 0; s < t.length; s++)
        this.insert(t[s]);
      return this;
    }
    let n = this._build(t.slice(), 0, t.length - 1, 0);
    if (!this.data.children.length)
      this.data = n;
    else if (this.data.height === n.height)
      this._splitRoot(this.data, n);
    else {
      if (this.data.height < n.height) {
        const s = this.data;
        this.data = n, n = s;
      }
      this._insert(n, this.data.height - n.height - 1, !0);
    }
    return this;
  }
  insert(t) {
    return t && this._insert(t, this.data.height - 1), this;
  }
  clear() {
    return this.data = He([]), this;
  }
  remove(t, n) {
    if (!t)
      return this;
    let s = this.data;
    const i = this.toBBox(t), r = [], o = [];
    let a, l, h;
    for (; s || r.length; ) {
      if (s || (s = r.pop(), l = r[r.length - 1], a = o.pop(), h = !0), s.leaf) {
        const c = Lc(t, s.children, n);
        if (c !== -1)
          return s.children.splice(c, 1), r.push(s), this._condense(r), this;
      }
      !h && !s.leaf && Cs(s, i) ? (r.push(s), o.push(a), a = 0, l = s, s = s.children[0]) : l ? (a++, s = l.children[a], h = !1) : s = null;
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
    const s = [];
    for (; t; )
      t.leaf ? n.push(...t.children) : s.push(...t.children), t = s.pop();
    return n;
  }
  _build(t, n, s, i) {
    const r = s - n + 1;
    let o = this._maxEntries, a;
    if (r <= o)
      return a = He(t.slice(n, s + 1)), Ge(a, this.toBBox), a;
    i || (i = Math.ceil(Math.log(r) / Math.log(o)), o = Math.ceil(r / Math.pow(o, i - 1))), a = He([]), a.leaf = !1, a.height = i;
    const l = Math.ceil(r / o), h = l * Math.ceil(Math.sqrt(o));
    dr(t, n, s, h, this.compareMinX);
    for (let c = n; c <= s; c += h) {
      const u = Math.min(c + h - 1, s);
      dr(t, c, u, l, this.compareMinY);
      for (let d = c; d <= u; d += l) {
        const f = Math.min(d + l - 1, u);
        a.children.push(this._build(t, d, f, i - 1));
      }
    }
    return Ge(a, this.toBBox), a;
  }
  _chooseSubtree(t, n, s, i) {
    for (; i.push(n), !(n.leaf || i.length - 1 === s); ) {
      let r = 1 / 0, o = 1 / 0, a;
      for (let l = 0; l < n.children.length; l++) {
        const h = n.children[l], c = Es(h), u = Gc(t, h) - c;
        u < o ? (o = u, r = c < r ? c : r, a = h) : u === o && c < r && (r = c, a = h);
      }
      n = a || n.children[0];
    }
    return n;
  }
  _insert(t, n, s) {
    const i = s ? t : this.toBBox(t), r = [], o = this._chooseSubtree(i, this.data, n, r);
    for (o.children.push(t), yn(o, i); n >= 0 && r[n].children.length > this._maxEntries; )
      this._split(r, n), n--;
    this._adjustParentBBoxes(i, r, n);
  }
  // split overflowed node into two
  _split(t, n) {
    const s = t[n], i = s.children.length, r = this._minEntries;
    this._chooseSplitAxis(s, r, i);
    const o = this._chooseSplitIndex(s, r, i), a = He(s.children.splice(o, s.children.length - o));
    a.height = s.height, a.leaf = s.leaf, Ge(s, this.toBBox), Ge(a, this.toBBox), n ? t[n - 1].children.push(a) : this._splitRoot(s, a);
  }
  _splitRoot(t, n) {
    this.data = He([t, n]), this.data.height = t.height + 1, this.data.leaf = !1, Ge(this.data, this.toBBox);
  }
  _chooseSplitIndex(t, n, s) {
    let i, r = 1 / 0, o = 1 / 0;
    for (let a = n; a <= s - n; a++) {
      const l = gn(t, 0, a, this.toBBox), h = gn(t, a, s, this.toBBox), c = $c(l, h), u = Es(l) + Es(h);
      c < r ? (r = c, i = a, o = u < o ? u : o) : c === r && u < o && (o = u, i = a);
    }
    return i || s - n;
  }
  // sorts node children by the best axis for split
  _chooseSplitAxis(t, n, s) {
    const i = t.leaf ? this.compareMinX : Xc, r = t.leaf ? this.compareMinY : Fc, o = this._allDistMargin(t, n, s, i), a = this._allDistMargin(t, n, s, r);
    o < a && t.children.sort(i);
  }
  // total margin of all possible split distributions where each node is at least m full
  _allDistMargin(t, n, s, i) {
    t.children.sort(i);
    const r = this.toBBox, o = gn(t, 0, n, r), a = gn(t, s - n, s, r);
    let l = Nn(o) + Nn(a);
    for (let h = n; h < s - n; h++) {
      const c = t.children[h];
      yn(o, t.leaf ? r(c) : c), l += Nn(o);
    }
    for (let h = s - n - 1; h >= n; h--) {
      const c = t.children[h];
      yn(a, t.leaf ? r(c) : c), l += Nn(a);
    }
    return l;
  }
  _adjustParentBBoxes(t, n, s) {
    for (let i = s; i >= 0; i--)
      yn(n[i], t);
  }
  _condense(t) {
    for (let n = t.length - 1, s; n >= 0; n--)
      t[n].children.length === 0 ? n > 0 ? (s = t[n - 1].children, s.splice(s.indexOf(t[n]), 1)) : this.clear() : Ge(t[n], this.toBBox);
  }
}
function Lc(e, t, n) {
  if (!n)
    return t.indexOf(e);
  for (let s = 0; s < t.length; s++)
    if (n(e, t[s]))
      return s;
  return -1;
}
function Ge(e, t) {
  gn(e, 0, e.children.length, t, e);
}
function gn(e, t, n, s, i) {
  i || (i = He(null)), i.minX = 1 / 0, i.minY = 1 / 0, i.maxX = -1 / 0, i.maxY = -1 / 0;
  for (let r = t; r < n; r++) {
    const o = e.children[r];
    yn(i, e.leaf ? s(o) : o);
  }
  return i;
}
function yn(e, t) {
  return e.minX = Math.min(e.minX, t.minX), e.minY = Math.min(e.minY, t.minY), e.maxX = Math.max(e.maxX, t.maxX), e.maxY = Math.max(e.maxY, t.maxY), e;
}
function Xc(e, t) {
  return e.minX - t.minX;
}
function Fc(e, t) {
  return e.minY - t.minY;
}
function Es(e) {
  return (e.maxX - e.minX) * (e.maxY - e.minY);
}
function Nn(e) {
  return e.maxX - e.minX + (e.maxY - e.minY);
}
function Gc(e, t) {
  return (Math.max(t.maxX, e.maxX) - Math.min(t.minX, e.minX)) * (Math.max(t.maxY, e.maxY) - Math.min(t.minY, e.minY));
}
function $c(e, t) {
  const n = Math.max(e.minX, t.minX), s = Math.max(e.minY, t.minY), i = Math.min(e.maxX, t.maxX), r = Math.min(e.maxY, t.maxY);
  return Math.max(0, i - n) * Math.max(0, r - s);
}
function Cs(e, t) {
  return e.minX <= t.minX && e.minY <= t.minY && t.maxX <= e.maxX && t.maxY <= e.maxY;
}
function Dn(e, t) {
  return t.minX <= e.maxX && t.minY <= e.maxY && t.maxX >= e.minX && t.maxY >= e.minY;
}
function He(e) {
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
function dr(e, t, n, s, i) {
  const r = [t, n];
  for (; r.length; ) {
    if (n = r.pop(), t = r.pop(), n - t <= s)
      continue;
    const o = t + Math.ceil((n - t) / s / 2) * s;
    Rc(e, o, t, n, i), r.push(t, o, o, n);
  }
}
const Nc = () => {
  const e = new Yc(), t = /* @__PURE__ */ new Map(), n = () => [...t.values()], s = () => {
    e.clear(), t.clear();
  }, i = (o) => {
    const { minX: a, minY: l, maxX: h, maxY: c } = o.selector.geometry.bounds, u = { minX: a, minY: l, maxX: h, maxY: c, target: o };
    e.insert(u), t.set(o.annotation, u);
  }, r = (o) => {
    const a = t.get(o.annotation);
    a && e.remove(a), t.delete(o.annotation);
  };
  return {
    all: n,
    clear: s,
    getAt: (o, a) => {
      const l = e.search({
        minX: o,
        minY: a,
        maxX: o,
        maxY: a
      }).map((h) => h.target).filter((h) => h.selector.type === et.RECTANGLE || Gl(h.selector, o, a));
      if (l.length > 0)
        return l.sort((h, c) => Ks(h.selector) - Ks(c.selector)), l[0];
    },
    getIntersecting: (o, a, l, h) => e.search({
      minX: o,
      minY: a,
      maxX: o + l,
      maxY: a + h
    }).map((c) => c.target),
    insert: i,
    remove: r,
    set: (o, a = !0) => {
      a && s();
      const l = o.map((h) => {
        const { minX: c, minY: u, maxX: d, maxY: f } = h.selector.geometry.bounds;
        return { minX: c, minY: u, maxX: d, maxY: f, target: h };
      });
      l.forEach((h) => t.set(h.target.annotation, h)), e.load(l);
    },
    size: () => e.all().length,
    update: (o, a) => {
      r(o), i(a);
    }
  };
}, Yo = (e) => {
  const t = fh(), n = Nc(), s = sh(t, e.pointerSelectAction), i = nh(t), r = _h();
  return t.observe(({ changes: o }) => {
    n.set((o.created || []).map((a) => a.target), !1), (o.deleted || []).forEach((a) => n.remove(a.target)), (o.updated || []).forEach(({ oldValue: a, newValue: l }) => n.update(a.target, l.target));
  }), {
    store: {
      ...t,
      getAt: (o, a) => {
        const l = n.getAt(o, a);
        return l ? t.getAnnotation(l.annotation) : void 0;
      },
      getIntersecting: (o, a, l, h) => n.getIntersecting(o, a, l, h).map((c) => t.getAnnotation(c.annotation))
    },
    selection: s,
    hover: i,
    viewport: r
  };
}, Dc = (e) => {
  const t = Yo(e);
  return {
    ...t,
    store: mh(t.store)
  };
}, Uc = (e) => {
  let t, n;
  if (e.nodeName === "CANVAS")
    t = e, n = t.getContext("2d", { willReadFrequently: !0 });
  else {
    const i = e;
    t = document.createElement("canvas"), t.width = i.width, t.height = i.height, n = t.getContext("2d", { willReadFrequently: !0 }), n.drawImage(i, 0, 0, i.width, i.height);
  }
  let s = 0;
  for (let i = 1; i < 10; i++)
    for (let r = 1; r < 10; r++) {
      const o = Math.round(r * t.width / 10), a = Math.round(i * t.height / 10), l = n.getImageData(o, a, 1, 1).data, h = (0.299 * l[0] + 0.587 * l[1] + 0.114 * l[2]) / 255;
      s += h;
    }
  return s / 81;
}, Lo = (e) => {
  const t = Uc(e), n = t > 0.6 ? "dark" : "light";
  return console.log(`[Annotorious] Image brightness: ${t.toFixed(1)}. Setting ${n} theme.`), n;
}, fr = (e, t, n) => t.setAttribute("data-theme", n === "auto" ? Lo(e) : n), Xo = (e, t) => ({
  ...e,
  drawingEnabled: e.drawingEnabled === void 0 ? t.drawingEnabled : e.drawingEnabled,
  drawingMode: e.drawingMode || t.drawingMode,
  pointerSelectAction: e.pointerSelectAction || t.pointerSelectAction,
  theme: e.theme || t.theme
}), mr = navigator.userAgent.indexOf("Mac OS X") !== -1, Fo = (e, t) => {
  const n = t || document, s = (o) => {
    const a = o;
    a.key === "z" && a.ctrlKey ? e.undo() : a.key === "y" && a.ctrlKey && e.redo();
  }, i = (o) => {
    const a = o;
    a.key === "z" && a.metaKey && (a.shiftKey ? e.redo() : e.undo());
  }, r = () => {
    mr ? n.removeEventListener("keydown", i) : n.removeEventListener("keydown", s);
  };
  return mr ? n.addEventListener("keydown", i) : n.addEventListener("keydown", s), {
    destroy: r
  };
}, Hc = (e, t = {}) => {
  if (!e)
    throw "Missing argument: image";
  const n = typeof e == "string" ? document.getElementById(e) : e, s = Xo(t, {
    drawingEnabled: !0,
    drawingMode: "drag",
    pointerSelectAction: Mo.EDIT,
    theme: "light"
  }), i = Dc(s), { selection: r, store: o } = i, a = yh(o), l = xh(
    i,
    a,
    s.adapter,
    s.autoSave
  ), h = document.createElement("DIV");
  h.style.position = "relative", h.style.display = "inline-block", n.style.display = "block", n.parentNode.insertBefore(h, n), h.appendChild(n);
  const c = Fo(a);
  let u = Eh();
  fr(n, h, s.theme);
  const d = new Bc({
    target: h,
    props: {
      drawingEnabled: !!s.drawingEnabled,
      image: n,
      preferredDrawingMode: s.drawingMode,
      state: i,
      style: s.style,
      user: u
    }
  });
  d.$on("click", (S) => {
    const { originalEvent: w, annotation: P } = S.detail;
    P ? r.clickSelect(P.id, w) : r.isEmpty() || r.clear();
  });
  const f = wh(i, a, s.adapter), m = () => {
    d.$destroy(), h.parentNode.insertBefore(n, h), h.parentNode.removeChild(h), c.destroy(), a.destroy();
  }, g = () => u, p = (S, w, P) => Bo(S, w, P), y = (S, w) => ko(S, w), x = (S) => {
    if (!ms(S))
      throw `No drawing tool named ${S}`;
    d.$set({ toolName: S });
  }, b = (S) => d.$set({ drawingEnabled: S }), _ = (S) => {
    console.warn("Filter not implemented yet");
  }, M = (S) => d.$set({ style: S }), B = (S) => fr(n, h, S), k = (S) => {
    u = S, d.$set({ user: S });
  }, A = (S) => (
    // @ts-ignore
    d.$set({ visible: S })
  );
  return {
    ...f,
    destroy: m,
    getUser: g,
    listDrawingTools: fs,
    on: l.on,
    off: l.off,
    registerDrawingTool: p,
    registerShapeEditor: y,
    setDrawingEnabled: b,
    setDrawingTool: x,
    setFilter: _,
    setStyle: M,
    setTheme: B,
    setUser: k,
    setVisible: A,
    state: i
  };
};
function se() {
}
function Qs(e, t) {
  for (const n in t)
    e[n] = t[n];
  return (
    /** @type {T & S} */
    e
  );
}
function Go(e) {
  return e();
}
function pr() {
  return /* @__PURE__ */ Object.create(null);
}
function fe(e) {
  e.forEach(Go);
}
function At(e) {
  return typeof e == "function";
}
function kt(e, t) {
  return e != e ? t == t : e !== t || e && typeof e == "object" || typeof e == "function";
}
function Vc(e) {
  return Object.keys(e).length === 0;
}
function zc(e, ...t) {
  if (e == null) {
    for (const s of t)
      s(void 0);
    return se;
  }
  const n = e.subscribe(...t);
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
function Js(e, t, n) {
  e.$$.on_destroy.push(zc(t, n));
}
function $o(e, t, n, s) {
  if (e) {
    const i = No(e, t, n, s);
    return e[0](i);
  }
}
function No(e, t, n, s) {
  return e[1] && s ? Qs(n.ctx.slice(), e[1](s(t))) : n.ctx;
}
function Do(e, t, n, s) {
  if (e[2] && s) {
    const i = e[2](s(n));
    if (t.dirty === void 0)
      return i;
    if (typeof i == "object") {
      const r = [], o = Math.max(t.dirty.length, i.length);
      for (let a = 0; a < o; a += 1)
        r[a] = t.dirty[a] | i[a];
      return r;
    }
    return t.dirty | i;
  }
  return t.dirty;
}
function Uo(e, t, n, s, i, r) {
  if (i) {
    const o = No(t, n, s, r);
    e.p(o, i);
  }
}
function Ho(e) {
  if (e.ctx.length > 32) {
    const t = [], n = e.ctx.length / 32;
    for (let s = 0; s < n; s++)
      t[s] = -1;
    return t;
  }
  return -1;
}
function gr(e) {
  const t = {};
  for (const n in e)
    n[0] !== "$" && (t[n] = e[n]);
  return t;
}
function ls(e) {
  return e ?? "";
}
const Wc = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : (
  // @ts-ignore Node typings have this
  global
);
function le(e, t) {
  e.appendChild(t);
}
function j(e, t, n) {
  e.insertBefore(t, n || null);
}
function z(e) {
  e.parentNode && e.parentNode.removeChild(e);
}
function Ai(e, t) {
  for (let n = 0; n < e.length; n += 1)
    e[n] && e[n].d(t);
}
function nt(e) {
  return document.createElementNS("http://www.w3.org/2000/svg", e);
}
function Mi(e) {
  return document.createTextNode(e);
}
function Zt() {
  return Mi(" ");
}
function _e() {
  return Mi("");
}
function bt(e, t, n, s) {
  return e.addEventListener(t, n, s), () => e.removeEventListener(t, n, s);
}
function E(e, t, n) {
  n == null ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n);
}
function jc(e) {
  return Array.from(e.childNodes);
}
function qc(e, t) {
  t = "" + t, e.data !== t && (e.data = /** @type {string} */
  t);
}
function hs(e, t, n) {
  e.classList.toggle(t, !!n);
}
function Zc(e, t, { bubbles: n = !1, cancelable: s = !1 } = {}) {
  return new CustomEvent(e, { detail: t, bubbles: n, cancelable: s });
}
let kn;
function Mn(e) {
  kn = e;
}
function Si() {
  if (!kn)
    throw new Error("Function called outside component initialization");
  return kn;
}
function ps(e) {
  Si().$$.on_mount.push(e);
}
function Kc(e) {
  Si().$$.on_destroy.push(e);
}
function gs() {
  const e = Si();
  return (t, n, { cancelable: s = !1 } = {}) => {
    const i = e.$$.callbacks[t];
    if (i) {
      const r = Zc(
        /** @type {string} */
        t,
        n,
        { cancelable: s }
      );
      return i.slice().forEach((o) => {
        o.call(e, r);
      }), !r.defaultPrevented;
    }
    return !0;
  };
}
function he(e, t) {
  const n = e.$$.callbacks[t.type];
  n && n.slice().forEach((s) => s.call(this, t));
}
const Ve = [], cs = [];
let Qe = [];
const yr = [], Qc = /* @__PURE__ */ Promise.resolve();
let ti = !1;
function Jc() {
  ti || (ti = !0, Qc.then(Vo));
}
function ei(e) {
  Qe.push(e);
}
const Ps = /* @__PURE__ */ new Set();
let $e = 0;
function Vo() {
  if ($e !== 0)
    return;
  const e = kn;
  do {
    try {
      for (; $e < Ve.length; ) {
        const t = Ve[$e];
        $e++, Mn(t), tu(t.$$);
      }
    } catch (t) {
      throw Ve.length = 0, $e = 0, t;
    }
    for (Mn(null), Ve.length = 0, $e = 0; cs.length; )
      cs.pop()();
    for (let t = 0; t < Qe.length; t += 1) {
      const n = Qe[t];
      Ps.has(n) || (Ps.add(n), n());
    }
    Qe.length = 0;
  } while (Ve.length);
  for (; yr.length; )
    yr.pop()();
  ti = !1, Ps.clear(), Mn(e);
}
function tu(e) {
  if (e.fragment !== null) {
    e.update(), fe(e.before_update);
    const t = e.dirty;
    e.dirty = [-1], e.fragment && e.fragment.p(e.ctx, t), e.after_update.forEach(ei);
  }
}
function eu(e) {
  const t = [], n = [];
  Qe.forEach((s) => e.indexOf(s) === -1 ? t.push(s) : n.push(s)), n.forEach((s) => s()), Qe = t;
}
const is = /* @__PURE__ */ new Set();
let Ie;
function me() {
  Ie = {
    r: 0,
    c: [],
    p: Ie
    // parent group
  };
}
function pe() {
  Ie.r || fe(Ie.c), Ie = Ie.p;
}
function H(e, t) {
  e && e.i && (is.delete(e), e.i(t));
}
function q(e, t, n, s) {
  if (e && e.o) {
    if (is.has(e))
      return;
    is.add(e), Ie.c.push(() => {
      is.delete(e), s && (n && e.d(1), s());
    }), e.o(t);
  } else
    s && s();
}
function tn(e) {
  return (e == null ? void 0 : e.length) !== void 0 ? e : Array.from(e);
}
function Ct(e) {
  e && e.c();
}
function Mt(e, t, n) {
  const { fragment: s, after_update: i } = e.$$;
  s && s.m(t, n), ei(() => {
    const r = e.$$.on_mount.map(Go).filter(At);
    e.$$.on_destroy ? e.$$.on_destroy.push(...r) : fe(r), e.$$.on_mount = [];
  }), i.forEach(ei);
}
function St(e, t) {
  const n = e.$$;
  n.fragment !== null && (eu(n.after_update), fe(n.on_destroy), n.fragment && n.fragment.d(t), n.on_destroy = n.fragment = null, n.ctx = []);
}
function nu(e, t) {
  e.$$.dirty[0] === -1 && (Ve.push(e), Jc(), e.$$.dirty.fill(0)), e.$$.dirty[t / 31 | 0] |= 1 << t % 31;
}
function $t(e, t, n, s, i, r, o = null, a = [-1]) {
  const l = kn;
  Mn(e);
  const h = e.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: r,
    update: se,
    not_equal: i,
    bound: pr(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(t.context || (l ? l.$$.context : [])),
    // everything else
    callbacks: pr(),
    dirty: a,
    skip_bound: !1,
    root: t.target || l.$$.root
  };
  o && o(h.root);
  let c = !1;
  if (h.ctx = n ? n(e, t.props || {}, (u, d, ...f) => {
    const m = f.length ? f[0] : d;
    return h.ctx && i(h.ctx[u], h.ctx[u] = m) && (!h.skip_bound && h.bound[u] && h.bound[u](m), c && nu(e, u)), d;
  }) : [], h.update(), c = !0, fe(h.before_update), h.fragment = s ? s(h.ctx) : !1, t.target) {
    if (t.hydrate) {
      const u = jc(t.target);
      h.fragment && h.fragment.l(u), u.forEach(z);
    } else
      h.fragment && h.fragment.c();
    t.intro && H(e.$$.fragment), Mt(e, t.target, t.anchor), Vo();
  }
  Mn(l);
}
class Nt {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    mt(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    mt(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    St(this, 1), this.$destroy = se;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(t, n) {
    if (!At(n))
      return se;
    const s = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return s.push(n), () => {
      const i = s.indexOf(n);
      i !== -1 && s.splice(i, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(t) {
    this.$$set && !Vc(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
}
const su = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(su);
var ft = /* @__PURE__ */ ((e) => (e.Application = "application", e.WebGLPipes = "webgl-pipes", e.WebGLPipesAdaptor = "webgl-pipes-adaptor", e.WebGLSystem = "webgl-system", e.WebGPUPipes = "webgpu-pipes", e.WebGPUPipesAdaptor = "webgpu-pipes-adaptor", e.WebGPUSystem = "webgpu-system", e.CanvasSystem = "canvas-system", e.CanvasPipesAdaptor = "canvas-pipes-adaptor", e.CanvasPipes = "canvas-pipes", e.Asset = "asset", e.LoadParser = "load-parser", e.ResolveParser = "resolve-parser", e.CacheParser = "cache-parser", e.DetectionParser = "detection-parser", e.MaskEffect = "mask-effect", e.BlendMode = "blend-mode", e.TextureSource = "texture-source", e.Environment = "environment", e))(ft || {});
const ni = (e) => {
  if (typeof e == "function" || typeof e == "object" && e.extension) {
    if (!e.extension)
      throw new Error("Extension class must have an extension object");
    e = { ...typeof e.extension != "object" ? { type: e.extension } : e.extension, ref: e };
  }
  if (typeof e == "object")
    e = { ...e };
  else
    throw new Error("Invalid extension type");
  return typeof e.type == "string" && (e.type = [e.type]), e;
}, Un = (e, t) => ni(e).priority ?? t, an = {
  /** @ignore */
  _addHandlers: {},
  /** @ignore */
  _removeHandlers: {},
  /** @ignore */
  _queue: {},
  /**
   * Remove extensions from PixiJS.
   * @param extensions - Extensions to be removed.
   * @returns {extensions} For chaining.
   */
  remove(...e) {
    return e.map(ni).forEach((t) => {
      t.type.forEach((n) => {
        var s, i;
        return (i = (s = this._removeHandlers)[n]) == null ? void 0 : i.call(s, t);
      });
    }), this;
  },
  /**
   * Register new extensions with PixiJS.
   * @param extensions - The spread of extensions to add to PixiJS.
   * @returns {extensions} For chaining.
   */
  add(...e) {
    return e.map(ni).forEach((t) => {
      t.type.forEach((n) => {
        var r, o;
        const s = this._addHandlers, i = this._queue;
        s[n] ? (o = s[n]) == null || o.call(s, t) : (i[n] = i[n] || [], (r = i[n]) == null || r.push(t));
      });
    }), this;
  },
  /**
   * Internal method to handle extensions by name.
   * @param type - The extension type.
   * @param onAdd  - Function handler when extensions are added/registered {@link StrictExtensionFormat}.
   * @param onRemove  - Function handler when extensions are removed/unregistered {@link StrictExtensionFormat}.
   * @returns {extensions} For chaining.
   */
  handle(e, t, n) {
    var o;
    const s = this._addHandlers, i = this._removeHandlers;
    if (s[e] || i[e])
      throw new Error(`Extension type ${e} already has a handler`);
    s[e] = t, i[e] = n;
    const r = this._queue;
    return r[e] && ((o = r[e]) == null || o.forEach((a) => t(a)), delete r[e]), this;
  },
  /**
   * Handle a type, but using a map by `name` property.
   * @param type - Type of extension to handle.
   * @param map - The object map of named extensions.
   * @returns {extensions} For chaining.
   */
  handleByMap(e, t) {
    return this.handle(
      e,
      (n) => {
        n.name && (t[n.name] = n.ref);
      },
      (n) => {
        n.name && delete t[n.name];
      }
    );
  },
  /**
   * Handle a type, but using a list of extensions with a `name` property.
   * @param type - Type of extension to handle.
   * @param map - The array of named extensions.
   * @param defaultPriority - Fallback priority if none is defined.
   * @returns {extensions} For chaining.
   */
  handleByNamedList(e, t, n = -1) {
    return this.handle(
      e,
      (s) => {
        t.findIndex((r) => r.name === s.name) >= 0 || (t.push({ name: s.name, value: s.ref }), t.sort((r, o) => Un(o.value, n) - Un(r.value, n)));
      },
      (s) => {
        const i = t.findIndex((r) => r.name === s.name);
        i !== -1 && t.splice(i, 1);
      }
    );
  },
  /**
   * Handle a type, but using a list of extensions.
   * @param type - Type of extension to handle.
   * @param list - The list of extensions.
   * @param defaultPriority - The default priority to use if none is specified.
   * @returns {extensions} For chaining.
   */
  handleByList(e, t, n = -1) {
    return this.handle(
      e,
      (s) => {
        t.includes(s.ref) || (t.push(s.ref), t.sort((i, r) => Un(r, n) - Un(i, n)));
      },
      (s) => {
        const i = t.indexOf(s.ref);
        i !== -1 && t.splice(i, 1);
      }
    );
  }
}, iu = {
  extension: {
    type: ft.Environment,
    name: "browser",
    priority: -1
  },
  test: () => !0,
  load: async () => {
    await import("./browserAll-B3V1i3BP.js");
  }
}, ru = {
  extension: {
    type: ft.Environment,
    name: "webworker",
    priority: 0
  },
  test: () => typeof self < "u" && self.WorkerGlobalScope !== void 0,
  load: async () => {
    await import("./webworkerAll-BZnY1Nsc.js");
  }
};
class Xt {
  /**
   * Creates a new `ObservablePoint`
   * @param observer - Observer to pass to listen for change events.
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=0] - position of the point on the y axis
   */
  constructor(t, n, s) {
    this._x = n || 0, this._y = s || 0, this._observer = t;
  }
  /**
   * Creates a clone of this point.
   * @param observer - Optional observer to pass to the new observable point.
   * @returns a copy of this observable point
   */
  clone(t) {
    return new Xt(t ?? this._observer, this._x, this._y);
  }
  /**
   * Sets the point to a new `x` and `y` position.
   * If `y` is omitted, both `x` and `y` will be set to `x`.
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=x] - position of the point on the y axis
   * @returns The observable point instance itself
   */
  set(t = 0, n = t) {
    return (this._x !== t || this._y !== n) && (this._x = t, this._y = n, this._observer._onUpdate(this)), this;
  }
  /**
   * Copies x and y from the given point (`p`)
   * @param p - The point to copy from. Can be any of type that is or extends `PointData`
   * @returns The observable point instance itself
   */
  copyFrom(t) {
    return (this._x !== t.x || this._y !== t.y) && (this._x = t.x, this._y = t.y, this._observer._onUpdate(this)), this;
  }
  /**
   * Copies this point's x and y into that of the given point (`p`)
   * @param p - The point to copy to. Can be any of type that is or extends `PointData`
   * @returns The point (`p`) with values updated
   */
  copyTo(t) {
    return t.set(this._x, this._y), t;
  }
  /**
   * Accepts another point (`p`) and returns `true` if the given point is equal to this point
   * @param p - The point to check
   * @returns Returns `true` if both `x` and `y` are equal
   */
  equals(t) {
    return t.x === this._x && t.y === this._y;
  }
  toString() {
    return `[pixi.js/math:ObservablePoint x=0 y=0 scope=${this._observer}]`;
  }
  /** Position of the observable point on the x axis. */
  get x() {
    return this._x;
  }
  set x(t) {
    this._x !== t && (this._x = t, this._observer._onUpdate(this));
  }
  /** Position of the observable point on the y axis. */
  get y() {
    return this._y;
  }
  set y(t) {
    this._y !== t && (this._y = t, this._observer._onUpdate(this));
  }
}
function Ti(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var zo = { exports: {} };
(function(e) {
  var t = Object.prototype.hasOwnProperty, n = "~";
  function s() {
  }
  Object.create && (s.prototype = /* @__PURE__ */ Object.create(null), new s().__proto__ || (n = !1));
  function i(l, h, c) {
    this.fn = l, this.context = h, this.once = c || !1;
  }
  function r(l, h, c, u, d) {
    if (typeof c != "function")
      throw new TypeError("The listener must be a function");
    var f = new i(c, u || l, d), m = n ? n + h : h;
    return l._events[m] ? l._events[m].fn ? l._events[m] = [l._events[m], f] : l._events[m].push(f) : (l._events[m] = f, l._eventsCount++), l;
  }
  function o(l, h) {
    --l._eventsCount === 0 ? l._events = new s() : delete l._events[h];
  }
  function a() {
    this._events = new s(), this._eventsCount = 0;
  }
  a.prototype.eventNames = function() {
    var h = [], c, u;
    if (this._eventsCount === 0)
      return h;
    for (u in c = this._events)
      t.call(c, u) && h.push(n ? u.slice(1) : u);
    return Object.getOwnPropertySymbols ? h.concat(Object.getOwnPropertySymbols(c)) : h;
  }, a.prototype.listeners = function(h) {
    var c = n ? n + h : h, u = this._events[c];
    if (!u)
      return [];
    if (u.fn)
      return [u.fn];
    for (var d = 0, f = u.length, m = new Array(f); d < f; d++)
      m[d] = u[d].fn;
    return m;
  }, a.prototype.listenerCount = function(h) {
    var c = n ? n + h : h, u = this._events[c];
    return u ? u.fn ? 1 : u.length : 0;
  }, a.prototype.emit = function(h, c, u, d, f, m) {
    var g = n ? n + h : h;
    if (!this._events[g])
      return !1;
    var p = this._events[g], y = arguments.length, x, b;
    if (p.fn) {
      switch (p.once && this.removeListener(h, p.fn, void 0, !0), y) {
        case 1:
          return p.fn.call(p.context), !0;
        case 2:
          return p.fn.call(p.context, c), !0;
        case 3:
          return p.fn.call(p.context, c, u), !0;
        case 4:
          return p.fn.call(p.context, c, u, d), !0;
        case 5:
          return p.fn.call(p.context, c, u, d, f), !0;
        case 6:
          return p.fn.call(p.context, c, u, d, f, m), !0;
      }
      for (b = 1, x = new Array(y - 1); b < y; b++)
        x[b - 1] = arguments[b];
      p.fn.apply(p.context, x);
    } else {
      var _ = p.length, M;
      for (b = 0; b < _; b++)
        switch (p[b].once && this.removeListener(h, p[b].fn, void 0, !0), y) {
          case 1:
            p[b].fn.call(p[b].context);
            break;
          case 2:
            p[b].fn.call(p[b].context, c);
            break;
          case 3:
            p[b].fn.call(p[b].context, c, u);
            break;
          case 4:
            p[b].fn.call(p[b].context, c, u, d);
            break;
          default:
            if (!x)
              for (M = 1, x = new Array(y - 1); M < y; M++)
                x[M - 1] = arguments[M];
            p[b].fn.apply(p[b].context, x);
        }
    }
    return !0;
  }, a.prototype.on = function(h, c, u) {
    return r(this, h, c, u, !1);
  }, a.prototype.once = function(h, c, u) {
    return r(this, h, c, u, !0);
  }, a.prototype.removeListener = function(h, c, u, d) {
    var f = n ? n + h : h;
    if (!this._events[f])
      return this;
    if (!c)
      return o(this, f), this;
    var m = this._events[f];
    if (m.fn)
      m.fn === c && (!d || m.once) && (!u || m.context === u) && o(this, f);
    else {
      for (var g = 0, p = [], y = m.length; g < y; g++)
        (m[g].fn !== c || d && !m[g].once || u && m[g].context !== u) && p.push(m[g]);
      p.length ? this._events[f] = p.length === 1 ? p[0] : p : o(this, f);
    }
    return this;
  }, a.prototype.removeAllListeners = function(h) {
    var c;
    return h ? (c = n ? n + h : h, this._events[c] && o(this, c)) : (this._events = new s(), this._eventsCount = 0), this;
  }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prefixed = n, a.EventEmitter = a, e.exports = a;
})(zo);
var ou = zo.exports;
const xe = /* @__PURE__ */ Ti(ou), au = Math.PI * 2, lu = 180 / Math.PI, hu = Math.PI / 180;
class Tt {
  /**
   * Creates a new `Point`
   * @param {number} [x=0] - position of the point on the x axis
   * @param {number} [y=0] - position of the point on the y axis
   */
  constructor(t = 0, n = 0) {
    this.x = 0, this.y = 0, this.x = t, this.y = n;
  }
  /**
   * Creates a clone of this point
   * @returns A clone of this point
   */
  clone() {
    return new Tt(this.x, this.y);
  }
  /**
   * Copies `x` and `y` from the given point into this point
   * @param p - The point to copy from
   * @returns The point instance itself
   */
  copyFrom(t) {
    return this.set(t.x, t.y), this;
  }
  /**
   * Copies this point's x and y into the given point (`p`).
   * @param p - The point to copy to. Can be any of type that is or extends `PointData`
   * @returns The point (`p`) with values updated
   */
  copyTo(t) {
    return t.set(this.x, this.y), t;
  }
  /**
   * Accepts another point (`p`) and returns `true` if the given point is equal to this point
   * @param p - The point to check
   * @returns Returns `true` if both `x` and `y` are equal
   */
  equals(t) {
    return t.x === this.x && t.y === this.y;
  }
  /**
   * Sets the point to a new `x` and `y` position.
   * If `y` is omitted, both `x` and `y` will be set to `x`.
   * @param {number} [x=0] - position of the point on the `x` axis
   * @param {number} [y=x] - position of the point on the `y` axis
   * @returns The point instance itself
   */
  set(t = 0, n = t) {
    return this.x = t, this.y = n, this;
  }
  toString() {
    return `[pixi.js/math:Point x=${this.x} y=${this.y}]`;
  }
  /**
   * A static Point object with `x` and `y` values of `0`. Can be used to avoid creating new objects multiple times.
   * @readonly
   */
  static get shared() {
    return ks.x = 0, ks.y = 0, ks;
  }
}
const ks = new Tt();
class Q {
  /**
   * @param a - x scale
   * @param b - y skew
   * @param c - x skew
   * @param d - y scale
   * @param tx - x translation
   * @param ty - y translation
   */
  constructor(t = 1, n = 0, s = 0, i = 1, r = 0, o = 0) {
    this.array = null, this.a = t, this.b = n, this.c = s, this.d = i, this.tx = r, this.ty = o;
  }
  /**
   * Creates a Matrix object based on the given array. The Element to Matrix mapping order is as follows:
   *
   * a = array[0]
   * b = array[1]
   * c = array[3]
   * d = array[4]
   * tx = array[2]
   * ty = array[5]
   * @param array - The array that the matrix will be populated from.
   */
  fromArray(t) {
    this.a = t[0], this.b = t[1], this.c = t[3], this.d = t[4], this.tx = t[2], this.ty = t[5];
  }
  /**
   * Sets the matrix properties.
   * @param a - Matrix component
   * @param b - Matrix component
   * @param c - Matrix component
   * @param d - Matrix component
   * @param tx - Matrix component
   * @param ty - Matrix component
   * @returns This matrix. Good for chaining method calls.
   */
  set(t, n, s, i, r, o) {
    return this.a = t, this.b = n, this.c = s, this.d = i, this.tx = r, this.ty = o, this;
  }
  /**
   * Creates an array from the current Matrix object.
   * @param transpose - Whether we need to transpose the matrix or not
   * @param [out=new Float32Array(9)] - If provided the array will be assigned to out
   * @returns The newly created array which contains the matrix
   */
  toArray(t, n) {
    this.array || (this.array = new Float32Array(9));
    const s = n || this.array;
    return t ? (s[0] = this.a, s[1] = this.b, s[2] = 0, s[3] = this.c, s[4] = this.d, s[5] = 0, s[6] = this.tx, s[7] = this.ty, s[8] = 1) : (s[0] = this.a, s[1] = this.c, s[2] = this.tx, s[3] = this.b, s[4] = this.d, s[5] = this.ty, s[6] = 0, s[7] = 0, s[8] = 1), s;
  }
  /**
   * Get a new position with the current transformation applied.
   * Can be used to go from a child's coordinate space to the world coordinate space. (e.g. rendering)
   * @param pos - The origin
   * @param {Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
   * @returns {Point} The new point, transformed through this matrix
   */
  apply(t, n) {
    n = n || new Tt();
    const s = t.x, i = t.y;
    return n.x = this.a * s + this.c * i + this.tx, n.y = this.b * s + this.d * i + this.ty, n;
  }
  /**
   * Get a new position with the inverse of the current transformation applied.
   * Can be used to go from the world coordinate space to a child's coordinate space. (e.g. input)
   * @param pos - The origin
   * @param {Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
   * @returns {Point} The new point, inverse-transformed through this matrix
   */
  applyInverse(t, n) {
    n = n || new Tt();
    const s = this.a, i = this.b, r = this.c, o = this.d, a = this.tx, l = this.ty, h = 1 / (s * o + r * -i), c = t.x, u = t.y;
    return n.x = o * h * c + -r * h * u + (l * r - a * o) * h, n.y = s * h * u + -i * h * c + (-l * s + a * i) * h, n;
  }
  /**
   * Translates the matrix on the x and y.
   * @param x - How much to translate x by
   * @param y - How much to translate y by
   * @returns This matrix. Good for chaining method calls.
   */
  translate(t, n) {
    return this.tx += t, this.ty += n, this;
  }
  /**
   * Applies a scale transformation to the matrix.
   * @param x - The amount to scale horizontally
   * @param y - The amount to scale vertically
   * @returns This matrix. Good for chaining method calls.
   */
  scale(t, n) {
    return this.a *= t, this.d *= n, this.c *= t, this.b *= n, this.tx *= t, this.ty *= n, this;
  }
  /**
   * Applies a rotation transformation to the matrix.
   * @param angle - The angle in radians.
   * @returns This matrix. Good for chaining method calls.
   */
  rotate(t) {
    const n = Math.cos(t), s = Math.sin(t), i = this.a, r = this.c, o = this.tx;
    return this.a = i * n - this.b * s, this.b = i * s + this.b * n, this.c = r * n - this.d * s, this.d = r * s + this.d * n, this.tx = o * n - this.ty * s, this.ty = o * s + this.ty * n, this;
  }
  /**
   * Appends the given Matrix to this Matrix.
   * @param matrix - The matrix to append.
   * @returns This matrix. Good for chaining method calls.
   */
  append(t) {
    const n = this.a, s = this.b, i = this.c, r = this.d;
    return this.a = t.a * n + t.b * i, this.b = t.a * s + t.b * r, this.c = t.c * n + t.d * i, this.d = t.c * s + t.d * r, this.tx = t.tx * n + t.ty * i + this.tx, this.ty = t.tx * s + t.ty * r + this.ty, this;
  }
  /**
   * Appends two matrix's and sets the result to this matrix. AB = A * B
   * @param a - The matrix to append.
   * @param b - The matrix to append.
   * @returns This matrix. Good for chaining method calls.
   */
  appendFrom(t, n) {
    const s = t.a, i = t.b, r = t.c, o = t.d, a = t.tx, l = t.ty, h = n.a, c = n.b, u = n.c, d = n.d;
    return this.a = s * h + i * u, this.b = s * c + i * d, this.c = r * h + o * u, this.d = r * c + o * d, this.tx = a * h + l * u + n.tx, this.ty = a * c + l * d + n.ty, this;
  }
  /**
   * Sets the matrix based on all the available properties
   * @param x - Position on the x axis
   * @param y - Position on the y axis
   * @param pivotX - Pivot on the x axis
   * @param pivotY - Pivot on the y axis
   * @param scaleX - Scale on the x axis
   * @param scaleY - Scale on the y axis
   * @param rotation - Rotation in radians
   * @param skewX - Skew on the x axis
   * @param skewY - Skew on the y axis
   * @returns This matrix. Good for chaining method calls.
   */
  setTransform(t, n, s, i, r, o, a, l, h) {
    return this.a = Math.cos(a + h) * r, this.b = Math.sin(a + h) * r, this.c = -Math.sin(a - l) * o, this.d = Math.cos(a - l) * o, this.tx = t - (s * this.a + i * this.c), this.ty = n - (s * this.b + i * this.d), this;
  }
  /**
   * Prepends the given Matrix to this Matrix.
   * @param matrix - The matrix to prepend
   * @returns This matrix. Good for chaining method calls.
   */
  prepend(t) {
    const n = this.tx;
    if (t.a !== 1 || t.b !== 0 || t.c !== 0 || t.d !== 1) {
      const s = this.a, i = this.c;
      this.a = s * t.a + this.b * t.c, this.b = s * t.b + this.b * t.d, this.c = i * t.a + this.d * t.c, this.d = i * t.b + this.d * t.d;
    }
    return this.tx = n * t.a + this.ty * t.c + t.tx, this.ty = n * t.b + this.ty * t.d + t.ty, this;
  }
  /**
   * Decomposes the matrix (x, y, scaleX, scaleY, and rotation) and sets the properties on to a transform.
   * @param transform - The transform to apply the properties to.
   * @returns The transform with the newly applied properties
   */
  decompose(t) {
    const n = this.a, s = this.b, i = this.c, r = this.d, o = t.pivot, a = -Math.atan2(-i, r), l = Math.atan2(s, n), h = Math.abs(a + l);
    return h < 1e-5 || Math.abs(au - h) < 1e-5 ? (t.rotation = l, t.skew.x = t.skew.y = 0) : (t.rotation = 0, t.skew.x = a, t.skew.y = l), t.scale.x = Math.sqrt(n * n + s * s), t.scale.y = Math.sqrt(i * i + r * r), t.position.x = this.tx + (o.x * n + o.y * i), t.position.y = this.ty + (o.x * s + o.y * r), t;
  }
  /**
   * Inverts this matrix
   * @returns This matrix. Good for chaining method calls.
   */
  invert() {
    const t = this.a, n = this.b, s = this.c, i = this.d, r = this.tx, o = t * i - n * s;
    return this.a = i / o, this.b = -n / o, this.c = -s / o, this.d = t / o, this.tx = (s * this.ty - i * r) / o, this.ty = -(t * this.ty - n * r) / o, this;
  }
  /** Checks if this matrix is an identity matrix */
  isIdentity() {
    return this.a === 1 && this.b === 0 && this.c === 0 && this.d === 1 && this.tx === 0 && this.ty === 0;
  }
  /**
   * Resets this Matrix to an identity (default) matrix.
   * @returns This matrix. Good for chaining method calls.
   */
  identity() {
    return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this;
  }
  /**
   * Creates a new Matrix object with the same values as this one.
   * @returns A copy of this matrix. Good for chaining method calls.
   */
  clone() {
    const t = new Q();
    return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t;
  }
  /**
   * Changes the values of the given matrix to be the same as the ones in this matrix
   * @param matrix - The matrix to copy to.
   * @returns The matrix given in parameter with its values updated.
   */
  copyTo(t) {
    return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t;
  }
  /**
   * Changes the values of the matrix to be the same as the ones in given matrix
   * @param matrix - The matrix to copy from.
   * @returns this
   */
  copyFrom(t) {
    return this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d, this.tx = t.tx, this.ty = t.ty, this;
  }
  /**
   * check to see if two matrices are the same
   * @param matrix - The matrix to compare to.
   */
  equals(t) {
    return t.a === this.a && t.b === this.b && t.c === this.c && t.d === this.d && t.tx === this.tx && t.ty === this.ty;
  }
  toString() {
    return `[pixi.js:Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`;
  }
  /**
   * A default (identity) matrix.
   *
   * This is a shared object, if you want to modify it consider creating a new `Matrix`
   * @readonly
   */
  static get IDENTITY() {
    return uu.identity();
  }
  /**
   * A static Matrix that can be used to avoid creating new objects.
   * Will always ensure the matrix is reset to identity when requested.
   * Use this object for fast but temporary calculations, as it may be mutated later on.
   * This is a different object to the `IDENTITY` object and so can be modified without changing `IDENTITY`.
   * @readonly
   */
  static get shared() {
    return cu.identity();
  }
}
const cu = new Q(), uu = new Q(), Te = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1], Ee = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1], Ce = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1], Pe = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1], si = [], Wo = [], Hn = Math.sign;
function du() {
  for (let e = 0; e < 16; e++) {
    const t = [];
    si.push(t);
    for (let n = 0; n < 16; n++) {
      const s = Hn(Te[e] * Te[n] + Ce[e] * Ee[n]), i = Hn(Ee[e] * Te[n] + Pe[e] * Ee[n]), r = Hn(Te[e] * Ce[n] + Ce[e] * Pe[n]), o = Hn(Ee[e] * Ce[n] + Pe[e] * Pe[n]);
      for (let a = 0; a < 16; a++)
        if (Te[a] === s && Ee[a] === i && Ce[a] === r && Pe[a] === o) {
          t.push(a);
          break;
        }
    }
  }
  for (let e = 0; e < 16; e++) {
    const t = new Q();
    t.set(Te[e], Ee[e], Ce[e], Pe[e], 0, 0), Wo.push(t);
  }
}
du();
const rt = {
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 0°       | East      |
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  E: 0,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 45°↻     | Southeast |
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  SE: 1,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 90°↻     | South     |
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  S: 2,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 135°↻    | Southwest |
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  SW: 3,
  /**
   * | Rotation | Direction |
   * |----------|-----------|
   * | 180°     | West      |
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  W: 4,
  /**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -135°/225°↻ | Northwest    |
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  NW: 5,
  /**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -90°/270°↻  | North        |
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  N: 6,
  /**
   * | Rotation    | Direction    |
   * |-------------|--------------|
   * | -45°/315°↻  | Northeast    |
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  NE: 7,
  /**
   * Reflection about Y-axis.
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  MIRROR_VERTICAL: 8,
  /**
   * Reflection about the main diagonal.
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  MAIN_DIAGONAL: 10,
  /**
   * Reflection about X-axis.
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  MIRROR_HORIZONTAL: 12,
  /**
   * Reflection about reverse diagonal.
   * @memberof maths.groupD8
   * @constant {GD8Symmetry}
   */
  REVERSE_DIAGONAL: 14,
  /**
   * @memberof maths.groupD8
   * @param {GD8Symmetry} ind - sprite rotation angle.
   * @returns {GD8Symmetry} The X-component of the U-axis
   *    after rotating the axes.
   */
  uX: (e) => Te[e],
  /**
   * @memberof maths.groupD8
   * @param {GD8Symmetry} ind - sprite rotation angle.
   * @returns {GD8Symmetry} The Y-component of the U-axis
   *    after rotating the axes.
   */
  uY: (e) => Ee[e],
  /**
   * @memberof maths.groupD8
   * @param {GD8Symmetry} ind - sprite rotation angle.
   * @returns {GD8Symmetry} The X-component of the V-axis
   *    after rotating the axes.
   */
  vX: (e) => Ce[e],
  /**
   * @memberof maths.groupD8
   * @param {GD8Symmetry} ind - sprite rotation angle.
   * @returns {GD8Symmetry} The Y-component of the V-axis
   *    after rotating the axes.
   */
  vY: (e) => Pe[e],
  /**
   * @memberof maths.groupD8
   * @param {GD8Symmetry} rotation - symmetry whose opposite
   *   is needed. Only rotations have opposite symmetries while
   *   reflections don't.
   * @returns {GD8Symmetry} The opposite symmetry of `rotation`
   */
  inv: (e) => e & 8 ? e & 15 : -e & 7,
  /**
   * Composes the two D8 operations.
   *
   * Taking `^` as reflection:
   *
   * |       | E=0 | S=2 | W=4 | N=6 | E^=8 | S^=10 | W^=12 | N^=14 |
   * |-------|-----|-----|-----|-----|------|-------|-------|-------|
   * | E=0   | E   | S   | W   | N   | E^   | S^    | W^    | N^    |
   * | S=2   | S   | W   | N   | E   | S^   | W^    | N^    | E^    |
   * | W=4   | W   | N   | E   | S   | W^   | N^    | E^    | S^    |
   * | N=6   | N   | E   | S   | W   | N^   | E^    | S^    | W^    |
   * | E^=8  | E^  | N^  | W^  | S^  | E    | N     | W     | S     |
   * | S^=10 | S^  | E^  | N^  | W^  | S    | E     | N     | W     |
   * | W^=12 | W^  | S^  | E^  | N^  | W    | S     | E     | N     |
   * | N^=14 | N^  | W^  | S^  | E^  | N    | W     | S     | E     |
   *
   * [This is a Cayley table]{@link https://en.wikipedia.org/wiki/Cayley_table}
   * @memberof maths.groupD8
   * @param {GD8Symmetry} rotationSecond - Second operation, which
   *   is the row in the above cayley table.
   * @param {GD8Symmetry} rotationFirst - First operation, which
   *   is the column in the above cayley table.
   * @returns {GD8Symmetry} Composed operation
   */
  add: (e, t) => si[e][t],
  /**
   * Reverse of `add`.
   * @memberof maths.groupD8
   * @param {GD8Symmetry} rotationSecond - Second operation
   * @param {GD8Symmetry} rotationFirst - First operation
   * @returns {GD8Symmetry} Result
   */
  sub: (e, t) => si[e][rt.inv(t)],
  /**
   * Adds 180 degrees to rotation, which is a commutative
   * operation.
   * @memberof maths.groupD8
   * @param {number} rotation - The number to rotate.
   * @returns {number} Rotated number
   */
  rotate180: (e) => e ^ 4,
  /**
   * Checks if the rotation angle is vertical, i.e. south
   * or north. It doesn't work for reflections.
   * @memberof maths.groupD8
   * @param {GD8Symmetry} rotation - The number to check.
   * @returns {boolean} Whether or not the direction is vertical
   */
  isVertical: (e) => (e & 3) === 2,
  // rotation % 4 === 2
  /**
   * Approximates the vector `V(dx,dy)` into one of the
   * eight directions provided by `groupD8`.
   * @memberof maths.groupD8
   * @param {number} dx - X-component of the vector
   * @param {number} dy - Y-component of the vector
   * @returns {GD8Symmetry} Approximation of the vector into
   *  one of the eight symmetries.
   */
  byDirection: (e, t) => Math.abs(e) * 2 <= Math.abs(t) ? t >= 0 ? rt.S : rt.N : Math.abs(t) * 2 <= Math.abs(e) ? e > 0 ? rt.E : rt.W : t > 0 ? e > 0 ? rt.SE : rt.SW : e > 0 ? rt.NE : rt.NW,
  /**
   * Helps sprite to compensate texture packer rotation.
   * @memberof maths.groupD8
   * @param {Matrix} matrix - sprite world matrix
   * @param {GD8Symmetry} rotation - The rotation factor to use.
   * @param {number} tx - sprite anchoring
   * @param {number} ty - sprite anchoring
   */
  matrixAppendRotationInv: (e, t, n = 0, s = 0) => {
    const i = Wo[rt.inv(t)];
    i.tx = n, i.ty = s, e.append(i);
  }
}, Vn = [new Tt(), new Tt(), new Tt(), new Tt()];
class wt {
  /**
   * @param x - The X coordinate of the upper-left corner of the rectangle
   * @param y - The Y coordinate of the upper-left corner of the rectangle
   * @param width - The overall width of the rectangle
   * @param height - The overall height of the rectangle
   */
  constructor(t = 0, n = 0, s = 0, i = 0) {
    this.type = "rectangle", this.x = Number(t), this.y = Number(n), this.width = Number(s), this.height = Number(i);
  }
  /** Returns the left edge of the rectangle. */
  get left() {
    return this.x;
  }
  /** Returns the right edge of the rectangle. */
  get right() {
    return this.x + this.width;
  }
  /** Returns the top edge of the rectangle. */
  get top() {
    return this.y;
  }
  /** Returns the bottom edge of the rectangle. */
  get bottom() {
    return this.y + this.height;
  }
  /** Determines whether the Rectangle is empty. */
  isEmpty() {
    return this.left === this.right || this.top === this.bottom;
  }
  /** A constant empty rectangle. This is a new object every time the property is accessed */
  static get EMPTY() {
    return new wt(0, 0, 0, 0);
  }
  /**
   * Creates a clone of this Rectangle
   * @returns a copy of the rectangle
   */
  clone() {
    return new wt(this.x, this.y, this.width, this.height);
  }
  /**
   * Converts a Bounds object to a Rectangle object.
   * @param bounds - The bounds to copy and convert to a rectangle.
   * @returns Returns itself.
   */
  copyFromBounds(t) {
    return this.x = t.minX, this.y = t.minY, this.width = t.maxX - t.minX, this.height = t.maxY - t.minY, this;
  }
  /**
   * Copies another rectangle to this one.
   * @param rectangle - The rectangle to copy from.
   * @returns Returns itself.
   */
  copyFrom(t) {
    return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this;
  }
  /**
   * Copies this rectangle to another one.
   * @param rectangle - The rectangle to copy to.
   * @returns Returns given parameter.
   */
  copyTo(t) {
    return t.copyFrom(this), t;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this Rectangle
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coordinates are within this Rectangle
   */
  contains(t, n) {
    return this.width <= 0 || this.height <= 0 ? !1 : t >= this.x && t < this.x + this.width && n >= this.y && n < this.y + this.height;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this rectangle including the stroke.
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @param strokeWidth - The width of the line to check
   * @returns Whether the x/y coordinates are within this rectangle
   */
  strokeContains(t, n, s) {
    const { width: i, height: r } = this;
    if (i <= 0 || r <= 0)
      return !1;
    const o = this.x, a = this.y, l = o - s / 2, h = o + i + s / 2, c = a - s / 2, u = a + r + s / 2, d = o + s / 2, f = o + i - s / 2, m = a + s / 2, g = a + r - s / 2;
    return t >= l && t <= h && n >= c && n <= u && !(t > d && t < f && n > m && n < g);
  }
  /**
   * Determines whether the `other` Rectangle transformed by `transform` intersects with `this` Rectangle object.
   * Returns true only if the area of the intersection is >0, this means that Rectangles
   * sharing a side are not overlapping. Another side effect is that an arealess rectangle
   * (width or height equal to zero) can't intersect any other rectangle.
   * @param {Rectangle} other - The Rectangle to intersect with `this`.
   * @param {Matrix} transform - The transformation matrix of `other`.
   * @returns {boolean} A value of `true` if the transformed `other` Rectangle intersects with `this`; otherwise `false`.
   */
  intersects(t, n) {
    if (!n) {
      const A = this.x < t.x ? t.x : this.x;
      if ((this.right > t.right ? t.right : this.right) <= A)
        return !1;
      const w = this.y < t.y ? t.y : this.y;
      return (this.bottom > t.bottom ? t.bottom : this.bottom) > w;
    }
    const s = this.left, i = this.right, r = this.top, o = this.bottom;
    if (i <= s || o <= r)
      return !1;
    const a = Vn[0].set(t.left, t.top), l = Vn[1].set(t.left, t.bottom), h = Vn[2].set(t.right, t.top), c = Vn[3].set(t.right, t.bottom);
    if (h.x <= a.x || l.y <= a.y)
      return !1;
    const u = Math.sign(n.a * n.d - n.b * n.c);
    if (u === 0 || (n.apply(a, a), n.apply(l, l), n.apply(h, h), n.apply(c, c), Math.max(a.x, l.x, h.x, c.x) <= s || Math.min(a.x, l.x, h.x, c.x) >= i || Math.max(a.y, l.y, h.y, c.y) <= r || Math.min(a.y, l.y, h.y, c.y) >= o))
      return !1;
    const d = u * (l.y - a.y), f = u * (a.x - l.x), m = d * s + f * r, g = d * i + f * r, p = d * s + f * o, y = d * i + f * o;
    if (Math.max(m, g, p, y) <= d * a.x + f * a.y || Math.min(m, g, p, y) >= d * c.x + f * c.y)
      return !1;
    const x = u * (a.y - h.y), b = u * (h.x - a.x), _ = x * s + b * r, M = x * i + b * r, B = x * s + b * o, k = x * i + b * o;
    return !(Math.max(_, M, B, k) <= x * a.x + b * a.y || Math.min(_, M, B, k) >= x * c.x + b * c.y);
  }
  /**
   * Pads the rectangle making it grow in all directions.
   * If paddingY is omitted, both paddingX and paddingY will be set to paddingX.
   * @param paddingX - The horizontal padding amount.
   * @param paddingY - The vertical padding amount.
   * @returns Returns itself.
   */
  pad(t = 0, n = t) {
    return this.x -= t, this.y -= n, this.width += t * 2, this.height += n * 2, this;
  }
  /**
   * Fits this rectangle around the passed one.
   * @param rectangle - The rectangle to fit.
   * @returns Returns itself.
   */
  fit(t) {
    const n = Math.max(this.x, t.x), s = Math.min(this.x + this.width, t.x + t.width), i = Math.max(this.y, t.y), r = Math.min(this.y + this.height, t.y + t.height);
    return this.x = n, this.width = Math.max(s - n, 0), this.y = i, this.height = Math.max(r - i, 0), this;
  }
  /**
   * Enlarges rectangle that way its corners lie on grid
   * @param resolution - resolution
   * @param eps - precision
   * @returns Returns itself.
   */
  ceil(t = 1, n = 1e-3) {
    const s = Math.ceil((this.x + this.width - n) * t) / t, i = Math.ceil((this.y + this.height - n) * t) / t;
    return this.x = Math.floor((this.x + n) * t) / t, this.y = Math.floor((this.y + n) * t) / t, this.width = s - this.x, this.height = i - this.y, this;
  }
  /**
   * Enlarges this rectangle to include the passed rectangle.
   * @param rectangle - The rectangle to include.
   * @returns Returns itself.
   */
  enlarge(t) {
    const n = Math.min(this.x, t.x), s = Math.max(this.x + this.width, t.x + t.width), i = Math.min(this.y, t.y), r = Math.max(this.y + this.height, t.y + t.height);
    return this.x = n, this.width = s - n, this.y = i, this.height = r - i, this;
  }
  /**
   * Returns the framing rectangle of the rectangle as a Rectangle object
   * @param out - optional rectangle to store the result
   * @returns The framing rectangle
   */
  getBounds(t) {
    return t = t || new wt(), t.copyFrom(this), t;
  }
  toString() {
    return `[pixi.js/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`;
  }
}
const Is = {
  default: -1
};
function vt(e = "default") {
  return Is[e] === void 0 && (Is[e] = -1), ++Is[e];
}
const _r = {}, _t = "8.0.0";
function xt(e, t, n = 3) {
  if (_r[t])
    return;
  let s = new Error().stack;
  typeof s > "u" ? console.warn("PixiJS Deprecation Warning: ", `${t}
Deprecated since v${e}`) : (s = s.split(`
`).splice(n).join(`
`), console.groupCollapsed ? (console.groupCollapsed(
    "%cPixiJS Deprecation Warning: %c%s",
    "color:#614108;background:#fffbe6",
    "font-weight:normal;color:#614108;background:#fffbe6",
    `${t}
Deprecated since v${e}`
  ), console.warn(s), console.groupEnd()) : (console.warn("PixiJS Deprecation Warning: ", `${t}
Deprecated since v${e}`), console.warn(s))), _r[t] = !0;
}
const jo = () => {
};
function Qm(e) {
  return e += e === 0 ? 1 : 0, --e, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e + 1;
}
function xr(e) {
  return !(e & e - 1) && !!e;
}
function fu(e) {
  const t = {};
  for (const n in e)
    e[n] !== void 0 && (t[n] = e[n]);
  return t;
}
const br = /* @__PURE__ */ Object.create(null);
function mu(e) {
  const t = br[e];
  return t === void 0 && (br[e] = vt("resource")), t;
}
const qo = class Zo extends xe {
  /**
   * @param options - options for the style
   */
  constructor(t = {}) {
    super(), this._resourceType = "textureSampler", this._touched = 0, this._maxAnisotropy = 1, this.destroyed = !1, t = { ...Zo.defaultOptions, ...t }, this.addressMode = t.addressMode, this.addressModeU = t.addressModeU ?? this.addressModeU, this.addressModeV = t.addressModeV ?? this.addressModeV, this.addressModeW = t.addressModeW ?? this.addressModeW, this.scaleMode = t.scaleMode, this.magFilter = t.magFilter ?? this.magFilter, this.minFilter = t.minFilter ?? this.minFilter, this.mipmapFilter = t.mipmapFilter ?? this.mipmapFilter, this.lodMinClamp = t.lodMinClamp, this.lodMaxClamp = t.lodMaxClamp, this.compare = t.compare, this.maxAnisotropy = t.maxAnisotropy ?? 1;
  }
  set addressMode(t) {
    this.addressModeU = t, this.addressModeV = t, this.addressModeW = t;
  }
  /** setting this will set wrapModeU,wrapModeV and wrapModeW all at once! */
  get addressMode() {
    return this.addressModeU;
  }
  set wrapMode(t) {
    xt(_t, "TextureStyle.wrapMode is now TextureStyle.addressMode"), this.addressMode = t;
  }
  get wrapMode() {
    return this.addressMode;
  }
  set scaleMode(t) {
    this.magFilter = t, this.minFilter = t, this.mipmapFilter = t;
  }
  /** setting this will set magFilter,minFilter and mipmapFilter all at once!  */
  get scaleMode() {
    return this.magFilter;
  }
  /** Specifies the maximum anisotropy value clamp used by the sampler. */
  set maxAnisotropy(t) {
    this._maxAnisotropy = Math.min(t, 16), this._maxAnisotropy > 1 && (this.scaleMode = "linear");
  }
  get maxAnisotropy() {
    return this._maxAnisotropy;
  }
  // TODO - move this to WebGL?
  get _resourceId() {
    return this._sharedResourceId || this._generateResourceId();
  }
  update() {
    this.emit("change", this), this._sharedResourceId = null;
  }
  _generateResourceId() {
    const t = `${this.addressModeU}-${this.addressModeV}-${this.addressModeW}-${this.magFilter}-${this.minFilter}-${this.mipmapFilter}-${this.lodMinClamp}-${this.lodMaxClamp}-${this.compare}-${this._maxAnisotropy}`;
    return this._sharedResourceId = mu(t), this._resourceId;
  }
  /** Destroys the style */
  destroy() {
    this.destroyed = !0, this.emit("destroy", this), this.emit("change", this), this.removeAllListeners();
  }
};
qo.defaultOptions = {
  addressMode: "clamp-to-edge",
  scaleMode: "linear"
};
let pu = qo;
const Ko = class Qo extends xe {
  /**
   * @param options - options for creating a new TextureSource
   */
  constructor(t = {}) {
    super(), this.options = t, this.uid = vt("textureSource"), this._resourceType = "textureSource", this._resourceId = vt("resource"), this.uploadMethodId = "unknown", this._resolution = 1, this.pixelWidth = 1, this.pixelHeight = 1, this.width = 1, this.height = 1, this.sampleCount = 1, this.mipLevelCount = 1, this.autoGenerateMipmaps = !1, this.format = "rgba8unorm", this.dimension = "2d", this.antialias = !1, this._touched = 0, this._batchTick = -1, this._textureBindLocation = -1, t = { ...Qo.defaultOptions, ...t }, this.label = t.label ?? "", this.resource = t.resource, this.autoGarbageCollect = t.autoGarbageCollect, this._resolution = t.resolution, t.width ? this.pixelWidth = t.width * this._resolution : this.pixelWidth = this.resource ? this.resourceWidth ?? 1 : 1, t.height ? this.pixelHeight = t.height * this._resolution : this.pixelHeight = this.resource ? this.resourceHeight ?? 1 : 1, this.width = this.pixelWidth / this._resolution, this.height = this.pixelHeight / this._resolution, this.format = t.format, this.dimension = t.dimensions, this.mipLevelCount = t.mipLevelCount, this.autoGenerateMipmaps = t.autoGenerateMipmaps, this.sampleCount = t.sampleCount, this.antialias = t.antialias, this.alphaMode = t.alphaMode, this.style = new pu(fu(t)), this.destroyed = !1, this._refreshPOT();
  }
  /** returns itself */
  get source() {
    return this;
  }
  /** the style of the texture */
  get style() {
    return this._style;
  }
  set style(t) {
    var n, s;
    this.style !== t && ((n = this._style) == null || n.off("change", this._onStyleChange, this), this._style = t, (s = this._style) == null || s.on("change", this._onStyleChange, this), this._onStyleChange());
  }
  /** setting this will set wrapModeU,wrapModeV and wrapModeW all at once! */
  get addressMode() {
    return this._style.addressMode;
  }
  set addressMode(t) {
    this._style.addressMode = t;
  }
  /** setting this will set wrapModeU,wrapModeV and wrapModeW all at once! */
  get repeatMode() {
    return this._style.addressMode;
  }
  set repeatMode(t) {
    this._style.addressMode = t;
  }
  /** Specifies the sampling behavior when the sample footprint is smaller than or equal to one texel. */
  get magFilter() {
    return this._style.magFilter;
  }
  set magFilter(t) {
    this._style.magFilter = t;
  }
  /** Specifies the sampling behavior when the sample footprint is larger than one texel. */
  get minFilter() {
    return this._style.minFilter;
  }
  set minFilter(t) {
    this._style.minFilter = t;
  }
  /** Specifies behavior for sampling between mipmap levels. */
  get mipmapFilter() {
    return this._style.mipmapFilter;
  }
  set mipmapFilter(t) {
    this._style.mipmapFilter = t;
  }
  /** Specifies the minimum and maximum levels of detail, respectively, used internally when sampling a texture. */
  get lodMinClamp() {
    return this._style.lodMinClamp;
  }
  set lodMinClamp(t) {
    this._style.lodMinClamp = t;
  }
  /** Specifies the minimum and maximum levels of detail, respectively, used internally when sampling a texture. */
  get lodMaxClamp() {
    return this._style.lodMaxClamp;
  }
  set lodMaxClamp(t) {
    this._style.lodMaxClamp = t;
  }
  _onStyleChange() {
    this.emit("styleChange", this);
  }
  /** call this if you have modified the texture outside of the constructor */
  update() {
    if (this.resource) {
      const t = this._resolution;
      if (this.resize(this.resourceWidth / t, this.resourceHeight / t))
        return;
    }
    this.emit("update", this);
  }
  /** Destroys this texture source */
  destroy() {
    this.destroyed = !0, this.emit("destroy", this), this.emit("change", this), this._style && (this._style.destroy(), this._style = null), this.uploadMethodId = null, this.resource = null, this.removeAllListeners();
  }
  /**
   * This will unload the Texture source from the GPU. This will free up the GPU memory
   * As soon as it is required fore rendering, it will be re-uploaded.
   */
  unload() {
    this._resourceId = vt("resource"), this.emit("change", this), this.emit("unload", this);
  }
  /** the width of the resource. This is the REAL pure number, not accounting resolution   */
  get resourceWidth() {
    const { resource: t } = this;
    return t.naturalWidth || t.videoWidth || t.displayWidth || t.width;
  }
  /** the height of the resource. This is the REAL pure number, not accounting resolution */
  get resourceHeight() {
    const { resource: t } = this;
    return t.naturalHeight || t.videoHeight || t.displayHeight || t.height;
  }
  /**
   * the resolution of the texture. Changing this number, will not change the number of pixels in the actual texture
   * but will the size of the texture when rendered.
   *
   * changing the resolution of this texture to 2 for example will make it appear twice as small when rendered (as pixel
   * density will have increased)
   */
  get resolution() {
    return this._resolution;
  }
  set resolution(t) {
    this._resolution !== t && (this._resolution = t, this.width = this.pixelWidth / t, this.height = this.pixelHeight / t);
  }
  /**
   * Resize the texture, this is handy if you want to use the texture as a render texture
   * @param width - the new width of the texture
   * @param height - the new height of the texture
   * @param resolution - the new resolution of the texture
   * @returns - if the texture was resized
   */
  resize(t, n, s) {
    s = s || this._resolution, t = t || this.width, n = n || this.height;
    const i = Math.round(t * s), r = Math.round(n * s);
    return this.width = i / s, this.height = r / s, this._resolution = s, this.pixelWidth === i && this.pixelHeight === r ? !1 : (this._refreshPOT(), this.pixelWidth = i, this.pixelHeight = r, this.emit("resize", this), this._resourceId = vt("resource"), this.emit("change", this), !0);
  }
  /**
   * Lets the renderer know that this texture has been updated and its mipmaps should be re-generated.
   * This is only important for RenderTexture instances, as standard Texture instances will have their
   * mipmaps generated on upload. You should call this method after you make any change to the texture
   *
   * The reason for this is is can be quite expensive to update mipmaps for a texture. So by default,
   * We want you, the developer to specify when this action should happen.
   *
   * Generally you don't want to have mipmaps generated on Render targets that are changed every frame,
   */
  updateMipmaps() {
    this.autoGenerateMipmaps && this.mipLevelCount > 1 && this.emit("updateMipmaps", this);
  }
  set wrapMode(t) {
    this._style.wrapMode = t;
  }
  get wrapMode() {
    return this._style.wrapMode;
  }
  set scaleMode(t) {
    this._style.scaleMode = t;
  }
  /** setting this will set magFilter,minFilter and mipmapFilter all at once!  */
  get scaleMode() {
    return this._style.scaleMode;
  }
  /**
   * Refresh check for isPowerOfTwo texture based on size
   * @private
   */
  _refreshPOT() {
    this.isPowerOfTwo = xr(this.pixelWidth) && xr(this.pixelHeight);
  }
  static test(t) {
    throw new Error("Unimplemented");
  }
};
Ko.defaultOptions = {
  resolution: 1,
  format: "bgra8unorm",
  alphaMode: "premultiply-alpha-on-upload",
  dimensions: "2d",
  mipLevelCount: 1,
  autoGenerateMipmaps: !1,
  sampleCount: 1,
  antialias: !1,
  autoGarbageCollect: !1
};
let be = Ko;
class Ei extends be {
  constructor(t) {
    const n = t.resource || new Float32Array(t.width * t.height * 4);
    let s = t.format;
    s || (n instanceof Float32Array ? s = "rgba32float" : n instanceof Int32Array || n instanceof Uint32Array ? s = "rgba32uint" : n instanceof Int16Array || n instanceof Uint16Array ? s = "rgba16uint" : (n instanceof Int8Array, s = "bgra8unorm")), super({
      ...t,
      resource: n,
      format: s
    }), this.uploadMethodId = "buffer";
  }
  static test(t) {
    return t instanceof Int8Array || t instanceof Uint8Array || t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array;
  }
}
Ei.extension = ft.TextureSource;
const wr = new Q();
class gu {
  /**
   * @param texture - observed texture
   * @param clampMargin - Changes frame clamping, 0.5 by default. Use -0.5 for extra border.
   */
  constructor(t, n) {
    this.mapCoord = new Q(), this.uClampFrame = new Float32Array(4), this.uClampOffset = new Float32Array(2), this._textureID = -1, this._updateID = 0, this.clampOffset = 0, typeof n > "u" ? this.clampMargin = t.width < 10 ? 0 : 0.5 : this.clampMargin = n, this.isSimple = !1, this.texture = t;
  }
  /** Texture property. */
  get texture() {
    return this._texture;
  }
  set texture(t) {
    var n;
    this.texture !== t && ((n = this._texture) == null || n.removeListener("update", this.update, this), this._texture = t, this._texture.addListener("update", this.update, this), this.update());
  }
  /**
   * Multiplies uvs array to transform
   * @param uvs - mesh uvs
   * @param [out=uvs] - output
   * @returns - output
   */
  multiplyUvs(t, n) {
    n === void 0 && (n = t);
    const s = this.mapCoord;
    for (let i = 0; i < t.length; i += 2) {
      const r = t[i], o = t[i + 1];
      n[i] = r * s.a + o * s.c + s.tx, n[i + 1] = r * s.b + o * s.d + s.ty;
    }
    return n;
  }
  /**
   * Updates matrices if texture was changed
   * @returns - whether or not it was updated
   */
  update() {
    const t = this._texture;
    this._updateID++;
    const n = t.uvs;
    this.mapCoord.set(n.x1 - n.x0, n.y1 - n.y0, n.x3 - n.x0, n.y3 - n.y0, n.x0, n.y0);
    const s = t.orig, i = t.trim;
    i && (wr.set(
      s.width / i.width,
      0,
      0,
      s.height / i.height,
      -i.x / i.width,
      -i.y / i.height
    ), this.mapCoord.append(wr));
    const r = t.source, o = this.uClampFrame, a = this.clampMargin / r._resolution, l = this.clampOffset;
    return o[0] = (t.frame.x + a + l) / r.width, o[1] = (t.frame.y + a + l) / r.height, o[2] = (t.frame.x + t.frame.width - a + l) / r.width, o[3] = (t.frame.y + t.frame.height - a + l) / r.height, this.uClampOffset[0] = l / r.pixelWidth, this.uClampOffset[1] = l / r.pixelHeight, this.isSimple = t.frame.width === r.width && t.frame.height === r.height && t.rotate === 0, !0;
  }
}
class st extends xe {
  /**
   * @param {TextureOptions} param0 - Options for the texture
   */
  constructor({
    source: t,
    label: n,
    frame: s,
    orig: i,
    trim: r,
    defaultAnchor: o,
    defaultBorders: a,
    rotate: l,
    dynamic: h
  } = {}) {
    if (super(), this.uid = vt("texture"), this.uvs = { x0: 0, y0: 0, x1: 0, y1: 0, x2: 0, y2: 0, x3: 0, y3: 0 }, this.frame = new wt(), this.noFrame = !1, this.dynamic = !1, this.isTexture = !0, this.label = n, this.source = (t == null ? void 0 : t.source) ?? new be(), this.noFrame = !s, s)
      this.frame.copyFrom(s);
    else {
      const { width: c, height: u } = this._source;
      this.frame.width = c, this.frame.height = u;
    }
    this.orig = i || this.frame, this.trim = r, this.rotate = l ?? 0, this.defaultAnchor = o, this.defaultBorders = a, this.destroyed = !1, this.dynamic = h || !1, this.updateUvs();
  }
  set source(t) {
    this._source && this._source.off("resize", this.update, this), this._source = t, t.on("resize", this.update, this), this.emit("update", this);
  }
  /** the underlying source of the texture (equivalent of baseTexture in v7) */
  get source() {
    return this._source;
  }
  /** returns a TextureMatrix instance for this texture. By default, that object is not created because its heavy. */
  get textureMatrix() {
    return this._textureMatrix || (this._textureMatrix = new gu(this)), this._textureMatrix;
  }
  /** The width of the Texture in pixels. */
  get width() {
    return this.orig.width;
  }
  /** The height of the Texture in pixels. */
  get height() {
    return this.orig.height;
  }
  /** Call this function when you have modified the frame of this texture. */
  updateUvs() {
    const { uvs: t, frame: n } = this, { width: s, height: i } = this._source, r = n.x / s, o = n.y / i, a = n.width / s, l = n.height / i;
    let h = this.rotate;
    if (h) {
      const c = a / 2, u = l / 2, d = r + c, f = o + u;
      h = rt.add(h, rt.NW), t.x0 = d + c * rt.uX(h), t.y0 = f + u * rt.uY(h), h = rt.add(h, 2), t.x1 = d + c * rt.uX(h), t.y1 = f + u * rt.uY(h), h = rt.add(h, 2), t.x2 = d + c * rt.uX(h), t.y2 = f + u * rt.uY(h), h = rt.add(h, 2), t.x3 = d + c * rt.uX(h), t.y3 = f + u * rt.uY(h);
    } else
      t.x0 = r, t.y0 = o, t.x1 = r + a, t.y1 = o, t.x2 = r + a, t.y2 = o + l, t.x3 = r, t.y3 = o + l;
  }
  /**
   * Destroys this texture
   * @param destroySource - Destroy the source when the texture is destroyed.
   */
  destroy(t = !1) {
    this._source && t && (this._source.destroy(), this._source = null), this._textureMatrix = null, this.destroyed = !0, this.emit("destroy", this), this.removeAllListeners();
  }
  /** call this if you have modified the `texture outside` of the constructor */
  update() {
    this.noFrame && (this.frame.width = this._source.width, this.frame.height = this._source.height), this.updateUvs(), this.emit("update", this);
  }
  /** @deprecated since 8.0.0 */
  get baseTexture() {
    return xt(_t, "Texture.baseTexture is now Texture.source"), this._source;
  }
}
st.EMPTY = new st({
  label: "EMPTY",
  source: new be({
    label: "EMPTY"
  })
});
st.EMPTY.destroy = jo;
st.WHITE = new st({
  source: new Ei({
    resource: new Uint8Array([255, 255, 255, 255]),
    width: 1,
    height: 1,
    alphaMode: "premultiply-alpha-on-upload",
    label: "WHITE"
  }),
  label: "WHITE"
});
st.WHITE.destroy = jo;
function yu(e, t, n, s) {
  const { width: i, height: r } = n.orig, o = n.trim;
  if (o) {
    const a = o.width, l = o.height;
    e.minX = o.x - t._x * i - s, e.maxX = e.minX + a, e.minY = o.y - t._y * r - s, e.maxY = e.minY + l;
  } else
    e.minX = -t._x * i - s, e.maxX = e.minX + i, e.minY = -t._y * r - s, e.maxY = e.minY + r;
}
var _u = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) }, oe = function(e) {
  return typeof e == "string" ? e.length > 0 : typeof e == "number";
}, dt = function(e, t, n) {
  return t === void 0 && (t = 0), n === void 0 && (n = Math.pow(10, t)), Math.round(n * e) / n + 0;
}, Vt = function(e, t, n) {
  return t === void 0 && (t = 0), n === void 0 && (n = 1), e > n ? n : e > t ? e : t;
}, Jo = function(e) {
  return (e = isFinite(e) ? e % 360 : 0) > 0 ? e : e + 360;
}, vr = function(e) {
  return { r: Vt(e.r, 0, 255), g: Vt(e.g, 0, 255), b: Vt(e.b, 0, 255), a: Vt(e.a) };
}, Bs = function(e) {
  return { r: dt(e.r), g: dt(e.g), b: dt(e.b), a: dt(e.a, 3) };
}, xu = /^#([0-9a-f]{3,8})$/i, zn = function(e) {
  var t = e.toString(16);
  return t.length < 2 ? "0" + t : t;
}, ta = function(e) {
  var t = e.r, n = e.g, s = e.b, i = e.a, r = Math.max(t, n, s), o = r - Math.min(t, n, s), a = o ? r === t ? (n - s) / o : r === n ? 2 + (s - t) / o : 4 + (t - n) / o : 0;
  return { h: 60 * (a < 0 ? a + 6 : a), s: r ? o / r * 100 : 0, v: r / 255 * 100, a: i };
}, ea = function(e) {
  var t = e.h, n = e.s, s = e.v, i = e.a;
  t = t / 360 * 6, n /= 100, s /= 100;
  var r = Math.floor(t), o = s * (1 - n), a = s * (1 - (t - r) * n), l = s * (1 - (1 - t + r) * n), h = r % 6;
  return { r: 255 * [s, a, o, o, l, s][h], g: 255 * [l, s, s, a, o, o][h], b: 255 * [o, o, l, s, s, a][h], a: i };
}, Ar = function(e) {
  return { h: Jo(e.h), s: Vt(e.s, 0, 100), l: Vt(e.l, 0, 100), a: Vt(e.a) };
}, Mr = function(e) {
  return { h: dt(e.h), s: dt(e.s), l: dt(e.l), a: dt(e.a, 3) };
}, Sr = function(e) {
  return ea((n = (t = e).s, { h: t.h, s: (n *= ((s = t.l) < 50 ? s : 100 - s) / 100) > 0 ? 2 * n / (s + n) * 100 : 0, v: s + n, a: t.a }));
  var t, n, s;
}, Sn = function(e) {
  return { h: (t = ta(e)).h, s: (i = (200 - (n = t.s)) * (s = t.v) / 100) > 0 && i < 200 ? n * s / 100 / (i <= 100 ? i : 200 - i) * 100 : 0, l: i / 2, a: t.a };
  var t, n, s, i;
}, bu = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, wu = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, vu = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, Au = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i, ii = { string: [[function(e) {
  var t = xu.exec(e);
  return t ? (e = t[1]).length <= 4 ? { r: parseInt(e[0] + e[0], 16), g: parseInt(e[1] + e[1], 16), b: parseInt(e[2] + e[2], 16), a: e.length === 4 ? dt(parseInt(e[3] + e[3], 16) / 255, 2) : 1 } : e.length === 6 || e.length === 8 ? { r: parseInt(e.substr(0, 2), 16), g: parseInt(e.substr(2, 2), 16), b: parseInt(e.substr(4, 2), 16), a: e.length === 8 ? dt(parseInt(e.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
}, "hex"], [function(e) {
  var t = vu.exec(e) || Au.exec(e);
  return t ? t[2] !== t[4] || t[4] !== t[6] ? null : vr({ r: Number(t[1]) / (t[2] ? 100 / 255 : 1), g: Number(t[3]) / (t[4] ? 100 / 255 : 1), b: Number(t[5]) / (t[6] ? 100 / 255 : 1), a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1) }) : null;
}, "rgb"], [function(e) {
  var t = bu.exec(e) || wu.exec(e);
  if (!t)
    return null;
  var n, s, i = Ar({ h: (n = t[1], s = t[2], s === void 0 && (s = "deg"), Number(n) * (_u[s] || 1)), s: Number(t[3]), l: Number(t[4]), a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1) });
  return Sr(i);
}, "hsl"]], object: [[function(e) {
  var t = e.r, n = e.g, s = e.b, i = e.a, r = i === void 0 ? 1 : i;
  return oe(t) && oe(n) && oe(s) ? vr({ r: Number(t), g: Number(n), b: Number(s), a: Number(r) }) : null;
}, "rgb"], [function(e) {
  var t = e.h, n = e.s, s = e.l, i = e.a, r = i === void 0 ? 1 : i;
  if (!oe(t) || !oe(n) || !oe(s))
    return null;
  var o = Ar({ h: Number(t), s: Number(n), l: Number(s), a: Number(r) });
  return Sr(o);
}, "hsl"], [function(e) {
  var t = e.h, n = e.s, s = e.v, i = e.a, r = i === void 0 ? 1 : i;
  if (!oe(t) || !oe(n) || !oe(s))
    return null;
  var o = function(a) {
    return { h: Jo(a.h), s: Vt(a.s, 0, 100), v: Vt(a.v, 0, 100), a: Vt(a.a) };
  }({ h: Number(t), s: Number(n), v: Number(s), a: Number(r) });
  return ea(o);
}, "hsv"]] }, Tr = function(e, t) {
  for (var n = 0; n < t.length; n++) {
    var s = t[n][0](e);
    if (s)
      return [s, t[n][1]];
  }
  return [null, void 0];
}, Mu = function(e) {
  return typeof e == "string" ? Tr(e.trim(), ii.string) : typeof e == "object" && e !== null ? Tr(e, ii.object) : [null, void 0];
}, Rs = function(e, t) {
  var n = Sn(e);
  return { h: n.h, s: Vt(n.s + 100 * t, 0, 100), l: n.l, a: n.a };
}, Os = function(e) {
  return (299 * e.r + 587 * e.g + 114 * e.b) / 1e3 / 255;
}, Er = function(e, t) {
  var n = Sn(e);
  return { h: n.h, s: n.s, l: Vt(n.l + 100 * t, 0, 100), a: n.a };
}, ri = function() {
  function e(t) {
    this.parsed = Mu(t)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
  }
  return e.prototype.isValid = function() {
    return this.parsed !== null;
  }, e.prototype.brightness = function() {
    return dt(Os(this.rgba), 2);
  }, e.prototype.isDark = function() {
    return Os(this.rgba) < 0.5;
  }, e.prototype.isLight = function() {
    return Os(this.rgba) >= 0.5;
  }, e.prototype.toHex = function() {
    return t = Bs(this.rgba), n = t.r, s = t.g, i = t.b, o = (r = t.a) < 1 ? zn(dt(255 * r)) : "", "#" + zn(n) + zn(s) + zn(i) + o;
    var t, n, s, i, r, o;
  }, e.prototype.toRgb = function() {
    return Bs(this.rgba);
  }, e.prototype.toRgbString = function() {
    return t = Bs(this.rgba), n = t.r, s = t.g, i = t.b, (r = t.a) < 1 ? "rgba(" + n + ", " + s + ", " + i + ", " + r + ")" : "rgb(" + n + ", " + s + ", " + i + ")";
    var t, n, s, i, r;
  }, e.prototype.toHsl = function() {
    return Mr(Sn(this.rgba));
  }, e.prototype.toHslString = function() {
    return t = Mr(Sn(this.rgba)), n = t.h, s = t.s, i = t.l, (r = t.a) < 1 ? "hsla(" + n + ", " + s + "%, " + i + "%, " + r + ")" : "hsl(" + n + ", " + s + "%, " + i + "%)";
    var t, n, s, i, r;
  }, e.prototype.toHsv = function() {
    return t = ta(this.rgba), { h: dt(t.h), s: dt(t.s), v: dt(t.v), a: dt(t.a, 3) };
    var t;
  }, e.prototype.invert = function() {
    return Qt({ r: 255 - (t = this.rgba).r, g: 255 - t.g, b: 255 - t.b, a: t.a });
    var t;
  }, e.prototype.saturate = function(t) {
    return t === void 0 && (t = 0.1), Qt(Rs(this.rgba, t));
  }, e.prototype.desaturate = function(t) {
    return t === void 0 && (t = 0.1), Qt(Rs(this.rgba, -t));
  }, e.prototype.grayscale = function() {
    return Qt(Rs(this.rgba, -1));
  }, e.prototype.lighten = function(t) {
    return t === void 0 && (t = 0.1), Qt(Er(this.rgba, t));
  }, e.prototype.darken = function(t) {
    return t === void 0 && (t = 0.1), Qt(Er(this.rgba, -t));
  }, e.prototype.rotate = function(t) {
    return t === void 0 && (t = 15), this.hue(this.hue() + t);
  }, e.prototype.alpha = function(t) {
    return typeof t == "number" ? Qt({ r: (n = this.rgba).r, g: n.g, b: n.b, a: t }) : dt(this.rgba.a, 3);
    var n;
  }, e.prototype.hue = function(t) {
    var n = Sn(this.rgba);
    return typeof t == "number" ? Qt({ h: t, s: n.s, l: n.l, a: n.a }) : dt(n.h);
  }, e.prototype.isEqual = function(t) {
    return this.toHex() === Qt(t).toHex();
  }, e;
}(), Qt = function(e) {
  return e instanceof ri ? e : new ri(e);
}, Cr = [], Su = function(e) {
  e.forEach(function(t) {
    Cr.indexOf(t) < 0 && (t(ri, ii), Cr.push(t));
  });
};
function Tu(e, t) {
  var n = { white: "#ffffff", bisque: "#ffe4c4", blue: "#0000ff", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", antiquewhite: "#faebd7", aqua: "#00ffff", azure: "#f0ffff", whitesmoke: "#f5f5f5", papayawhip: "#ffefd5", plum: "#dda0dd", blanchedalmond: "#ffebcd", black: "#000000", gold: "#ffd700", goldenrod: "#daa520", gainsboro: "#dcdcdc", cornsilk: "#fff8dc", cornflowerblue: "#6495ed", burlywood: "#deb887", aquamarine: "#7fffd4", beige: "#f5f5dc", crimson: "#dc143c", cyan: "#00ffff", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkkhaki: "#bdb76b", darkgray: "#a9a9a9", darkgreen: "#006400", darkgrey: "#a9a9a9", peachpuff: "#ffdab9", darkmagenta: "#8b008b", darkred: "#8b0000", darkorchid: "#9932cc", darkorange: "#ff8c00", darkslateblue: "#483d8b", gray: "#808080", darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f", deeppink: "#ff1493", deepskyblue: "#00bfff", wheat: "#f5deb3", firebrick: "#b22222", floralwhite: "#fffaf0", ghostwhite: "#f8f8ff", darkviolet: "#9400d3", magenta: "#ff00ff", green: "#008000", dodgerblue: "#1e90ff", grey: "#808080", honeydew: "#f0fff0", hotpink: "#ff69b4", blueviolet: "#8a2be2", forestgreen: "#228b22", lawngreen: "#7cfc00", indianred: "#cd5c5c", indigo: "#4b0082", fuchsia: "#ff00ff", brown: "#a52a2a", maroon: "#800000", mediumblue: "#0000cd", lightcoral: "#f08080", darkturquoise: "#00ced1", lightcyan: "#e0ffff", ivory: "#fffff0", lightyellow: "#ffffe0", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", linen: "#faf0e6", mediumaquamarine: "#66cdaa", lemonchiffon: "#fffacd", lime: "#00ff00", khaki: "#f0e68c", mediumseagreen: "#3cb371", limegreen: "#32cd32", mediumspringgreen: "#00fa9a", lightskyblue: "#87cefa", lightblue: "#add8e6", midnightblue: "#191970", lightpink: "#ffb6c1", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", mintcream: "#f5fffa", lightslategray: "#778899", lightslategrey: "#778899", navajowhite: "#ffdead", navy: "#000080", mediumvioletred: "#c71585", powderblue: "#b0e0e6", palegoldenrod: "#eee8aa", oldlace: "#fdf5e6", paleturquoise: "#afeeee", mediumturquoise: "#48d1cc", mediumorchid: "#ba55d3", rebeccapurple: "#663399", lightsteelblue: "#b0c4de", mediumslateblue: "#7b68ee", thistle: "#d8bfd8", tan: "#d2b48c", orchid: "#da70d6", mediumpurple: "#9370db", purple: "#800080", pink: "#ffc0cb", skyblue: "#87ceeb", springgreen: "#00ff7f", palegreen: "#98fb98", red: "#ff0000", yellow: "#ffff00", slateblue: "#6a5acd", lavenderblush: "#fff0f5", peru: "#cd853f", palevioletred: "#db7093", violet: "#ee82ee", teal: "#008080", slategray: "#708090", slategrey: "#708090", aliceblue: "#f0f8ff", darkseagreen: "#8fbc8f", darkolivegreen: "#556b2f", greenyellow: "#adff2f", seagreen: "#2e8b57", seashell: "#fff5ee", tomato: "#ff6347", silver: "#c0c0c0", sienna: "#a0522d", lavender: "#e6e6fa", lightgreen: "#90ee90", orange: "#ffa500", orangered: "#ff4500", steelblue: "#4682b4", royalblue: "#4169e1", turquoise: "#40e0d0", yellowgreen: "#9acd32", salmon: "#fa8072", saddlebrown: "#8b4513", sandybrown: "#f4a460", rosybrown: "#bc8f8f", darksalmon: "#e9967a", lightgoldenrodyellow: "#fafad2", snow: "#fffafa", lightgrey: "#d3d3d3", lightgray: "#d3d3d3", dimgray: "#696969", dimgrey: "#696969", olivedrab: "#6b8e23", olive: "#808000" }, s = {};
  for (var i in n)
    s[n[i]] = i;
  var r = {};
  e.prototype.toName = function(o) {
    if (!(this.rgba.a || this.rgba.r || this.rgba.g || this.rgba.b))
      return "transparent";
    var a, l, h = s[this.toHex()];
    if (h)
      return h;
    if (o != null && o.closest) {
      var c = this.toRgb(), u = 1 / 0, d = "black";
      if (!r.length)
        for (var f in n)
          r[f] = new e(n[f]).toRgb();
      for (var m in n) {
        var g = (a = c, l = r[m], Math.pow(a.r - l.r, 2) + Math.pow(a.g - l.g, 2) + Math.pow(a.b - l.b, 2));
        g < u && (u = g, d = m);
      }
      return d;
    }
  }, t.string.push([function(o) {
    var a = o.toLowerCase(), l = a === "transparent" ? "#0000" : n[a];
    return l ? new e(l).toRgb() : null;
  }, "name"]);
}
Su([Tu]);
const en = class _n {
  /**
   * @param {ColorSource} value - Optional value to use, if not provided, white is used.
   */
  constructor(t = 16777215) {
    this._value = null, this._components = new Float32Array(4), this._components.fill(1), this._int = 16777215, this.value = t;
  }
  /** Get red component (0 - 1) */
  get red() {
    return this._components[0];
  }
  /** Get green component (0 - 1) */
  get green() {
    return this._components[1];
  }
  /** Get blue component (0 - 1) */
  get blue() {
    return this._components[2];
  }
  /** Get alpha component (0 - 1) */
  get alpha() {
    return this._components[3];
  }
  /**
   * Set the value, suitable for chaining
   * @param value
   * @see Color.value
   */
  setValue(t) {
    return this.value = t, this;
  }
  /**
   * The current color source.
   *
   * When setting:
   * - Setting to an instance of `Color` will copy its color source and components.
   * - Otherwise, `Color` will try to normalize the color source and set the components.
   *   If the color source is invalid, an `Error` will be thrown and the `Color` will left unchanged.
   *
   * Note: The `null` in the setter's parameter type is added to match the TypeScript rule: return type of getter
   * must be assignable to its setter's parameter type. Setting `value` to `null` will throw an `Error`.
   *
   * When getting:
   * - A return value of `null` means the previous value was overridden (e.g., {@link Color.multiply multiply},
   *   {@link Color.premultiply premultiply} or {@link Color.round round}).
   * - Otherwise, the color source used when setting is returned.
   */
  set value(t) {
    if (t instanceof _n)
      this._value = this._cloneSource(t._value), this._int = t._int, this._components.set(t._components);
    else {
      if (t === null)
        throw new Error("Cannot set Color#value to null");
      (this._value === null || !this._isSourceEqual(this._value, t)) && (this._normalize(t), this._value = this._cloneSource(t));
    }
  }
  get value() {
    return this._value;
  }
  /**
   * Copy a color source internally.
   * @param value - Color source
   */
  _cloneSource(t) {
    return typeof t == "string" || typeof t == "number" || t instanceof Number || t === null ? t : Array.isArray(t) || ArrayBuffer.isView(t) ? t.slice(0) : typeof t == "object" && t !== null ? { ...t } : t;
  }
  /**
   * Equality check for color sources.
   * @param value1 - First color source
   * @param value2 - Second color source
   * @returns `true` if the color sources are equal, `false` otherwise.
   */
  _isSourceEqual(t, n) {
    const s = typeof t;
    if (s !== typeof n)
      return !1;
    if (s === "number" || s === "string" || t instanceof Number)
      return t === n;
    if (Array.isArray(t) && Array.isArray(n) || ArrayBuffer.isView(t) && ArrayBuffer.isView(n))
      return t.length !== n.length ? !1 : t.every((r, o) => r === n[o]);
    if (t !== null && n !== null) {
      const r = Object.keys(t), o = Object.keys(n);
      return r.length !== o.length ? !1 : r.every((a) => t[a] === n[a]);
    }
    return t === n;
  }
  /**
   * Convert to a RGBA color object.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toRgb(); // returns { r: 1, g: 1, b: 1, a: 1 }
   */
  toRgba() {
    const [t, n, s, i] = this._components;
    return { r: t, g: n, b: s, a: i };
  }
  /**
   * Convert to a RGB color object.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toRgb(); // returns { r: 1, g: 1, b: 1 }
   */
  toRgb() {
    const [t, n, s] = this._components;
    return { r: t, g: n, b: s };
  }
  /** Convert to a CSS-style rgba string: `rgba(255,255,255,1.0)`. */
  toRgbaString() {
    const [t, n, s] = this.toUint8RgbArray();
    return `rgba(${t},${n},${s},${this.alpha})`;
  }
  toUint8RgbArray(t) {
    const [n, s, i] = this._components;
    return this._arrayRgb || (this._arrayRgb = []), t = t || this._arrayRgb, t[0] = Math.round(n * 255), t[1] = Math.round(s * 255), t[2] = Math.round(i * 255), t;
  }
  toArray(t) {
    this._arrayRgba || (this._arrayRgba = []), t = t || this._arrayRgba;
    const [n, s, i, r] = this._components;
    return t[0] = n, t[1] = s, t[2] = i, t[3] = r, t;
  }
  toRgbArray(t) {
    this._arrayRgb || (this._arrayRgb = []), t = t || this._arrayRgb;
    const [n, s, i] = this._components;
    return t[0] = n, t[1] = s, t[2] = i, t;
  }
  /**
   * Convert to a hexadecimal number.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toNumber(); // returns 16777215
   */
  toNumber() {
    return this._int;
  }
  /**
   * Convert to a BGR number
   * @example
   * import { Color } from 'pixi.js';
   * new Color(0xffcc99).toBgrNumber(); // returns 0x99ccff
   */
  toBgrNumber() {
    const [t, n, s] = this.toUint8RgbArray();
    return (s << 16) + (n << 8) + t;
  }
  /**
   * Convert to a hexadecimal number in little endian format (e.g., BBGGRR).
   * @example
   * import { Color } from 'pixi.js';
   * new Color(0xffcc99).toLittleEndianNumber(); // returns 0x99ccff
   * @returns {number} - The color as a number in little endian format.
   */
  toLittleEndianNumber() {
    const t = this._int;
    return (t >> 16) + (t & 65280) + ((t & 255) << 16);
  }
  /**
   * Multiply with another color. This action is destructive, and will
   * override the previous `value` property to be `null`.
   * @param {ColorSource} value - The color to multiply by.
   */
  multiply(t) {
    const [n, s, i, r] = _n._temp.setValue(t)._components;
    return this._components[0] *= n, this._components[1] *= s, this._components[2] *= i, this._components[3] *= r, this._refreshInt(), this._value = null, this;
  }
  /**
   * Converts color to a premultiplied alpha format. This action is destructive, and will
   * override the previous `value` property to be `null`.
   * @param alpha - The alpha to multiply by.
   * @param {boolean} [applyToRGB=true] - Whether to premultiply RGB channels.
   * @returns {Color} - Itself.
   */
  premultiply(t, n = !0) {
    return n && (this._components[0] *= t, this._components[1] *= t, this._components[2] *= t), this._components[3] = t, this._refreshInt(), this._value = null, this;
  }
  /**
   * Premultiplies alpha with current color.
   * @param {number} alpha - The alpha to multiply by.
   * @param {boolean} [applyToRGB=true] - Whether to premultiply RGB channels.
   * @returns {number} tint multiplied by alpha
   */
  toPremultiplied(t, n = !0) {
    if (t === 1)
      return (255 << 24) + this._int;
    if (t === 0)
      return n ? 0 : this._int;
    let s = this._int >> 16 & 255, i = this._int >> 8 & 255, r = this._int & 255;
    return n && (s = s * t + 0.5 | 0, i = i * t + 0.5 | 0, r = r * t + 0.5 | 0), (t * 255 << 24) + (s << 16) + (i << 8) + r;
  }
  /**
   * Convert to a hexidecimal string.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toHex(); // returns "#ffffff"
   */
  toHex() {
    const t = this._int.toString(16);
    return `#${"000000".substring(0, 6 - t.length) + t}`;
  }
  /**
   * Convert to a hexidecimal string with alpha.
   * @example
   * import { Color } from 'pixi.js';
   * new Color('white').toHexa(); // returns "#ffffffff"
   */
  toHexa() {
    const n = Math.round(this._components[3] * 255).toString(16);
    return this.toHex() + "00".substring(0, 2 - n.length) + n;
  }
  /**
   * Set alpha, suitable for chaining.
   * @param alpha
   */
  setAlpha(t) {
    return this._components[3] = this._clamp(t), this;
  }
  /**
   * Normalize the input value into rgba
   * @param value - Input value
   */
  _normalize(t) {
    let n, s, i, r;
    if ((typeof t == "number" || t instanceof Number) && t >= 0 && t <= 16777215) {
      const o = t;
      n = (o >> 16 & 255) / 255, s = (o >> 8 & 255) / 255, i = (o & 255) / 255, r = 1;
    } else if ((Array.isArray(t) || t instanceof Float32Array) && t.length >= 3 && t.length <= 4)
      t = this._clamp(t), [n, s, i, r = 1] = t;
    else if ((t instanceof Uint8Array || t instanceof Uint8ClampedArray) && t.length >= 3 && t.length <= 4)
      t = this._clamp(t, 0, 255), [n, s, i, r = 255] = t, n /= 255, s /= 255, i /= 255, r /= 255;
    else if (typeof t == "string" || typeof t == "object") {
      if (typeof t == "string") {
        const a = _n.HEX_PATTERN.exec(t);
        a && (t = `#${a[2]}`);
      }
      const o = Qt(t);
      o.isValid() && ({ r: n, g: s, b: i, a: r } = o.rgba, n /= 255, s /= 255, i /= 255);
    }
    if (n !== void 0)
      this._components[0] = n, this._components[1] = s, this._components[2] = i, this._components[3] = r, this._refreshInt();
    else
      throw new Error(`Unable to convert color ${t}`);
  }
  /** Refresh the internal color rgb number */
  _refreshInt() {
    this._clamp(this._components);
    const [t, n, s] = this._components;
    this._int = (t * 255 << 16) + (n * 255 << 8) + (s * 255 | 0);
  }
  /**
   * Clamps values to a range. Will override original values
   * @param value - Value(s) to clamp
   * @param min - Minimum value
   * @param max - Maximum value
   */
  _clamp(t, n = 0, s = 1) {
    return typeof t == "number" ? Math.min(Math.max(t, n), s) : (t.forEach((i, r) => {
      t[r] = Math.min(Math.max(i, n), s);
    }), t);
  }
  /**
   * Check if the value is a color-like object
   * @param value - Value to check
   * @returns True if the value is a color-like object
   * @static
   * @example
   * import { Color } from 'pixi.js';
   * Color.isColorLike('white'); // returns true
   * Color.isColorLike(0xffffff); // returns true
   * Color.isColorLike([1, 1, 1]); // returns true
   */
  static isColorLike(t) {
    return typeof t == "number" || typeof t == "string" || t instanceof Number || t instanceof _n || Array.isArray(t) || t instanceof Uint8Array || t instanceof Uint8ClampedArray || t instanceof Float32Array || t.r !== void 0 && t.g !== void 0 && t.b !== void 0 || t.r !== void 0 && t.g !== void 0 && t.b !== void 0 && t.a !== void 0 || t.h !== void 0 && t.s !== void 0 && t.l !== void 0 || t.h !== void 0 && t.s !== void 0 && t.l !== void 0 && t.a !== void 0 || t.h !== void 0 && t.s !== void 0 && t.v !== void 0 || t.h !== void 0 && t.s !== void 0 && t.v !== void 0 && t.a !== void 0;
  }
};
en.shared = new en();
en._temp = new en();
en.HEX_PATTERN = /^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i;
let Pt = en;
const Eu = {
  cullArea: null,
  cullable: !1,
  cullableChildren: !0
};
function Cu(e, t, n) {
  const s = e.length;
  let i;
  if (t >= s || n === 0)
    return;
  n = t + n > s ? s - t : n;
  const r = s - n;
  for (i = t; i < r; ++i)
    e[i] = e[i + n];
  e.length = r;
}
const Pu = {
  allowChildren: !0,
  /**
   * Removes all children from this container that are within the begin and end indexes.
   * @param beginIndex - The beginning position.
   * @param endIndex - The ending position. Default value is size of the container.
   * @returns - List of removed children
   * @memberof scene.Container#
   */
  removeChildren(e = 0, t) {
    const n = t ?? this.children.length, s = n - e, i = [];
    if (s > 0 && s <= n) {
      for (let r = n - 1; r >= e; r--) {
        const o = this.children[r];
        o && (this.renderGroup && this.renderGroup.removeChild(o), i.push(o), o.parent = null);
      }
      Cu(this.children, e, n);
      for (let r = 0; r < i.length; ++r)
        this.emit("childRemoved", i[r], this, r), i[r].emit("removed", this);
      return i;
    } else if (s === 0 && this.children.length === 0)
      return i;
    throw new RangeError("removeChildren: numeric values are outside the acceptable range.");
  },
  /**
   * Removes a child from the specified index position.
   * @param index - The index to get the child from
   * @returns The child that was removed.
   * @memberof scene.Container#
   */
  removeChildAt(e) {
    const t = this.getChildAt(e);
    return this.removeChild(t);
  },
  /**
   * Returns the child at the specified index
   * @param index - The index to get the child at
   * @returns - The child at the given index, if any.
   * @memberof scene.Container#
   */
  getChildAt(e) {
    if (e < 0 || e >= this.children.length)
      throw new Error(`getChildAt: Index (${e}) does not exist.`);
    return this.children[e];
  },
  /**
   * Changes the position of an existing child in the container container
   * @param child - The child Container instance for which you want to change the index number
   * @param index - The resulting index number for the child container
   * @memberof scene.Container#
   */
  setChildIndex(e, t) {
    if (t < 0 || t >= this.children.length)
      throw new Error(`The index ${t} supplied is out of bounds ${this.children.length}`);
    this.getChildIndex(e), this.addChildAt(e, t);
  },
  /**
   * Returns the index position of a child Container instance
   * @param child - The Container instance to identify
   * @returns - The index position of the child container to identify
   * @memberof scene.Container#
   */
  getChildIndex(e) {
    const t = this.children.indexOf(e);
    if (t === -1)
      throw new Error("The supplied Container must be a child of the caller");
    return t;
  },
  /**
   * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown.
   * If the child is already in this container, it will be moved to the specified index.
   * @param {Container} child - The child to add.
   * @param {number} index - The absolute index where the child will be positioned at the end of the operation.
   * @returns {Container} The child that was added.
   * @memberof scene.Container#
   */
  addChildAt(e, t) {
    this.allowChildren || xt(_t, "addChildAt: Only Containers will be allowed to add children in v8.0.0");
    const { children: n } = this;
    if (t < 0 || t > n.length)
      throw new Error(`${e}addChildAt: The index ${t} supplied is out of bounds ${n.length}`);
    if (e.parent) {
      const s = e.parent.children.indexOf(e);
      if (e.parent === this && s === t)
        return e;
      s !== -1 && e.parent.children.splice(s, 1);
    }
    return t === n.length ? n.push(e) : n.splice(t, 0, e), e.parent = this, e.didChange = !0, e.didViewUpdate = !1, e._updateFlags = 15, this.renderGroup && this.renderGroup.addChild(e), this.sortableChildren && (this.sortDirty = !0), this.emit("childAdded", e, this, t), e.emit("added", this), e;
  },
  /**
   * Swaps the position of 2 Containers within this container.
   * @param child - First container to swap
   * @param child2 - Second container to swap
   */
  swapChildren(e, t) {
    if (e === t)
      return;
    const n = this.getChildIndex(e), s = this.getChildIndex(t);
    this.children[n] = t, this.children[s] = e;
  },
  /**
   * Remove the Container from its parent Container. If the Container has no parent, do nothing.
   * @memberof scene.Container#
   */
  removeFromParent() {
    var e;
    (e = this.parent) == null || e.removeChild(this);
  }
};
class ku {
  constructor(t) {
    this.pipe = "filter", this.priority = 1, this.filters = t == null ? void 0 : t.filters, this.filterArea = t == null ? void 0 : t.filterArea;
  }
  destroy() {
    for (let t = 0; t < this.filters.length; t++)
      this.filters[t].destroy();
    this.filters = null, this.filterArea = null;
  }
}
class Ci {
  /**
   * Constructs a new Pool.
   * @param ClassType - The constructor of the items in the pool.
   * @param {number} [initialSize] - The initial size of the pool.
   */
  constructor(t, n) {
    this._pool = [], this._count = 0, this._index = 0, this._classType = t, n && this.prepopulate(n);
  }
  /**
   * Prepopulates the pool with a given number of items.
   * @param total - The number of items to add to the pool.
   */
  prepopulate(t) {
    for (let n = 0; n < t; n++)
      this._pool[this._index++] = new this._classType();
    this._count += t;
  }
  /**
   * Gets an item from the pool. Calls the item's `init` method if it exists.
   * If there are no items left in the pool, a new one will be created.
   * @param {unknown} [data] - Optional data to pass to the item's constructor.
   * @returns {T} The item from the pool.
   */
  get(t) {
    var s;
    let n;
    return this._index > 0 ? n = this._pool[--this._index] : n = new this._classType(), (s = n.init) == null || s.call(n, t), n;
  }
  /**
   * Returns an item to the pool. Calls the item's `reset` method if it exists.
   * @param {T} item - The item to return to the pool.
   */
  return(t) {
    var n;
    (n = t.reset) == null || n.call(t), this._pool[this._index++] = t;
  }
  /**
   * Gets the number of items in the pool.
   * @readonly
   * @member {number}
   */
  get totalSize() {
    return this._count;
  }
  /**
   * Gets the number of items in the pool that are free to use without needing to create more.
   * @readonly
   * @member {number}
   */
  get totalFree() {
    return this._index;
  }
  /**
   * Gets the number of items in the pool that are currently in use.
   * @readonly
   * @member {number}
   */
  get totalUsed() {
    return this._count - this._index;
  }
}
class Iu {
  constructor() {
    this._poolsByClass = /* @__PURE__ */ new Map();
  }
  /**
   * Prepopulates a specific pool with a given number of items.
   * @template T The type of items in the pool. Must extend PoolItem.
   * @param {PoolItemConstructor<T>} Class - The constructor of the items in the pool.
   * @param {number} total - The number of items to add to the pool.
   */
  prepopulate(t, n) {
    this.getPool(t).prepopulate(n);
  }
  /**
   * Gets an item from a specific pool.
   * @template T The type of items in the pool. Must extend PoolItem.
   * @param {PoolItemConstructor<T>} Class - The constructor of the items in the pool.
   * @param {unknown} [data] - Optional data to pass to the item's constructor.
   * @returns {T} The item from the pool.
   */
  get(t, n) {
    return this.getPool(t).get(n);
  }
  /**
   * Returns an item to its respective pool.
   * @param {PoolItem} item - The item to return to the pool.
   */
  return(t) {
    this.getPool(t.constructor).return(t);
  }
  /**
   * Gets a specific pool based on the class type.
   * @template T The type of items in the pool. Must extend PoolItem.
   * @param {PoolItemConstructor<T>} ClassType - The constructor of the items in the pool.
   * @returns {Pool<T>} The pool of the given class type.
   */
  getPool(t) {
    return this._poolsByClass.has(t) || this._poolsByClass.set(t, new Ci(t)), this._poolsByClass.get(t);
  }
  /** gets the usage stats of each pool in the system */
  stats() {
    const t = {};
    return this._poolsByClass.forEach((n) => {
      const s = t[n._classType.name] ? n._classType.name + n._classType.ID : n._classType.name;
      t[s] = {
        free: n.totalFree,
        used: n.totalUsed,
        size: n.totalSize
      };
    }), t;
  }
}
const Kt = new Iu();
class Bu {
  constructor() {
    this._effectClasses = [], this._tests = [], this._initialized = !1;
  }
  init() {
    this._initialized || (this._initialized = !0, this._effectClasses.forEach((t) => {
      this.add({
        test: t.test,
        maskClass: t
      });
    }));
  }
  add(t) {
    this._tests.push(t);
  }
  getMaskEffect(t) {
    this._initialized || this.init();
    for (let n = 0; n < this._tests.length; n++) {
      const s = this._tests[n];
      if (s.test(t))
        return Kt.get(s.maskClass, t);
    }
    return t;
  }
  returnMaskEffect(t) {
    Kt.return(t);
  }
}
const oi = new Bu();
an.handleByList(ft.MaskEffect, oi._effectClasses);
const Ru = {
  _mask: null,
  _filters: null,
  /**
   * @todo Needs docs.
   * @memberof scene.Container#
   * @type {Array<Effect>}
   */
  effects: [],
  /**
   * @todo Needs docs.
   * @param effect - The effect to add.
   * @memberof scene.Container#
   * @ignore
   */
  addEffect(e) {
    this.effects.indexOf(e) === -1 && (this.effects.push(e), this.effects.sort((n, s) => n.priority - s.priority), this.renderGroup && (this.renderGroup.structureDidChange = !0), this._updateIsSimple());
  },
  /**
   * @todo Needs docs.
   * @param effect - The effect to remove.
   * @memberof scene.Container#
   * @ignore
   */
  removeEffect(e) {
    const t = this.effects.indexOf(e);
    t !== -1 && (this.effects.splice(t, 1), !this.isRenderGroupRoot && this.renderGroup && (this.renderGroup.structureDidChange = !0), this._updateIsSimple());
  },
  set mask(e) {
    if (this._mask || (this._mask = { mask: null, effect: null }), this._mask.mask === e || (this._mask.effect && (this.removeEffect(this._mask.effect), oi.returnMaskEffect(this._mask.effect), this._mask.effect = null), this._mask.mask = e, e == null))
      return;
    const t = oi.getMaskEffect(e);
    this._mask.effect = t, this.addEffect(t);
  },
  /**
   * Sets a mask for the displayObject. A mask is an object that limits the visibility of an
   * object to the shape of the mask applied to it. In PixiJS a regular mask must be a
   * {@link Graphics} or a {@link Sprite} object. This allows for much faster masking in canvas as it
   * utilities shape clipping. Furthermore, a mask of an object must be in the subtree of its parent.
   * Otherwise, `getLocalBounds` may calculate incorrect bounds, which makes the container's width and height wrong.
   * To remove a mask, set this property to `null`.
   *
   * For sprite mask both alpha and red channel are used. Black mask is the same as transparent mask.
   * @example
   * import { Graphics, Sprite } from 'pixi.js';
   *
   * const graphics = new Graphics();
   * graphics.beginFill(0xFF3300);
   * graphics.drawRect(50, 250, 100, 100);
   * graphics.endFill();
   *
   * const sprite = new Sprite(texture);
   * sprite.mask = graphics;
   * @memberof scene.Container#
   */
  get mask() {
    var e;
    return (e = this._mask) == null ? void 0 : e.mask;
  },
  set filters(e) {
    !Array.isArray(e) && e && (e = [e]), e = e, this._filters || (this._filters = { filters: null, effect: null, filterArea: null });
    const t = (e == null ? void 0 : e.length) > 0, n = this._filters.effect && !t || !this._filters.effect && t;
    if (e = Array.isArray(e) ? e.slice(0) : e, this._filters.filters = Object.freeze(e), n)
      if (t) {
        const s = Kt.get(ku);
        this._filters.effect = s, this.addEffect(s);
      } else {
        const s = this._filters.effect;
        this.removeEffect(s), s.filterArea = null, s.filters = null, this._filters.effect = null, Kt.return(s);
      }
    t && (this._filters.effect.filters = e, this._filters.effect.filterArea = this.filterArea);
  },
  /**
   * Sets the filters for the displayObject.
   * IMPORTANT: This is a WebGL only feature and will be ignored by the canvas renderer.
   * To remove filters simply set this property to `'null'`.
   * @memberof scene.Container#
   */
  get filters() {
    var e;
    return (e = this._filters) == null ? void 0 : e.filters;
  },
  set filterArea(e) {
    this._filters || (this._filters = { filters: null, effect: null, filterArea: null }), this._filters.filterArea = e;
  },
  /**
   * The area the filter is applied to. This is used as more of an optimization
   * rather than figuring out the dimensions of the displayObject each frame you can set this rectangle.
   *
   * Also works as an interaction mask.
   * @memberof scene.Container#
   */
  get filterArea() {
    var e;
    return (e = this._filters) == null ? void 0 : e.filterArea;
  }
}, Ou = {
  /**
   * The instance label of the object.
   * @memberof scene.Container#
   * @member {string} label
   */
  label: null,
  /**
   * The instance name of the object.
   * @deprecated since 8.0.0
   * @see scene.Container#label
   * @member {string} name
   * @memberof scene.Container#
   */
  get name() {
    return xt(_t, "Container.name property has been removed, use Container.label instead"), this.label;
  },
  set name(e) {
    xt(_t, "Container.name property has been removed, use Container.label instead"), this.label = e;
  },
  /**
   * @method getChildByName
   * @deprecated since 8.0.0
   * @param {string} name - Instance name.
   * @param {boolean}[deep=false] - Whether to search recursively
   * @returns {Container} The child with the specified name.
   * @see scene.Container#getChildByLabel
   * @memberof scene.Container#
   */
  getChildByName(e, t = !1) {
    return this.getChildByLabel(e, t);
  },
  /**
   * Returns the first child in the container with the specified label.
   *
   * Recursive searches are done in a pre-order traversal.
   * @memberof scene.Container#
   * @param {string|RegExp} label - Instance label.
   * @param {boolean}[deep=false] - Whether to search recursively
   * @returns {Container} The child with the specified label.
   */
  getChildByLabel(e, t = !1) {
    const n = this.children;
    for (let s = 0; s < n.length; s++) {
      const i = n[s];
      if (i.label === e || e instanceof RegExp && e.test(i.label))
        return i;
    }
    if (t)
      for (let s = 0; s < n.length; s++) {
        const r = n[s].getChildByLabel(e, !0);
        if (r)
          return r;
      }
    return null;
  },
  /**
   * Returns all children in the container with the specified label.
   * @memberof scene.Container#
   * @param {string|RegExp} label - Instance label.
   * @param {boolean}[deep=false] - Whether to search recursively
   * @param {Container[]} [out=[]] - The array to store matching children in.
   * @returns {Container[]} An array of children with the specified label.
   */
  getChildrenByLabel(e, t = !1, n = []) {
    const s = this.children;
    for (let i = 0; i < s.length; i++) {
      const r = s[i];
      (r.label === e || e instanceof RegExp && e.test(r.label)) && n.push(r);
    }
    if (t)
      for (let i = 0; i < s.length; i++)
        s[i].getChildrenByLabel(e, !0, n);
    return n;
  }
}, Pr = new Q();
class de {
  constructor(t = 1 / 0, n = 1 / 0, s = -1 / 0, i = -1 / 0) {
    this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0, this.matrix = Pr, this.minX = t, this.minY = n, this.maxX = s, this.maxY = i;
  }
  /**
   * Checks if bounds are empty.
   * @returns - True if empty.
   */
  isEmpty() {
    return this.minX > this.maxX || this.minY > this.maxY;
  }
  /** The bounding rectangle of the bounds. */
  get rectangle() {
    this._rectangle || (this._rectangle = new wt());
    const t = this._rectangle;
    return this.minX > this.maxX || this.minY > this.maxY ? (t.x = 0, t.y = 0, t.width = 0, t.height = 0) : t.copyFromBounds(this), t;
  }
  /** Clears the bounds and resets. */
  clear() {
    return this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -1 / 0, this.maxY = -1 / 0, this.matrix = Pr, this;
  }
  /**
   * Sets the bounds.
   * @param x0 - left X of frame
   * @param y0 - top Y of frame
   * @param x1 - right X of frame
   * @param y1 - bottom Y of frame
   */
  set(t, n, s, i) {
    this.minX = t, this.minY = n, this.maxX = s, this.maxY = i;
  }
  /**
   * Adds sprite frame
   * @param x0 - left X of frame
   * @param y0 - top Y of frame
   * @param x1 - right X of frame
   * @param y1 - bottom Y of frame
   * @param matrix
   */
  addFrame(t, n, s, i, r) {
    r || (r = this.matrix);
    const o = r.a, a = r.b, l = r.c, h = r.d, c = r.tx, u = r.ty;
    let d = this.minX, f = this.minY, m = this.maxX, g = this.maxY, p = o * t + l * n + c, y = a * t + h * n + u;
    p < d && (d = p), y < f && (f = y), p > m && (m = p), y > g && (g = y), p = o * s + l * n + c, y = a * s + h * n + u, p < d && (d = p), y < f && (f = y), p > m && (m = p), y > g && (g = y), p = o * t + l * i + c, y = a * t + h * i + u, p < d && (d = p), y < f && (f = y), p > m && (m = p), y > g && (g = y), p = o * s + l * i + c, y = a * s + h * i + u, p < d && (d = p), y < f && (f = y), p > m && (m = p), y > g && (g = y), this.minX = d, this.minY = f, this.maxX = m, this.maxY = g;
  }
  /**
   * Adds a rectangle to the bounds.
   * @param rect - The rectangle to be added.
   * @param matrix - The matrix to apply to the bounds.
   */
  addRect(t, n) {
    this.addFrame(t.x, t.y, t.x + t.width, t.y + t.height, n);
  }
  /**
   * Adds other {@link Bounds}.
   * @param bounds - The Bounds to be added
   * @param matrix
   */
  addBounds(t, n) {
    this.addFrame(t.minX, t.minY, t.maxX, t.maxY, n);
  }
  /**
   * Adds other Bounds, masked with Bounds.
   * @param mask - The Bounds to be added.
   */
  addBoundsMask(t) {
    this.minX = this.minX > t.minX ? this.minX : t.minX, this.minY = this.minY > t.minY ? this.minY : t.minY, this.maxX = this.maxX < t.maxX ? this.maxX : t.maxX, this.maxY = this.maxY < t.maxY ? this.maxY : t.maxY;
  }
  /**
   * Adds other Bounds, multiplied with matrix.
   * @param matrix - The matrix to apply to the bounds.
   */
  applyMatrix(t) {
    const n = this.minX, s = this.minY, i = this.maxX, r = this.maxY, { a: o, b: a, c: l, d: h, tx: c, ty: u } = t;
    let d = o * n + l * s + c, f = a * n + h * s + u;
    this.minX = d, this.minY = f, this.maxX = d, this.maxY = f, d = o * i + l * s + c, f = a * i + h * s + u, this.minX = d < this.minX ? d : this.minX, this.minY = f < this.minY ? f : this.minY, this.maxX = d > this.maxX ? d : this.maxX, this.maxY = f > this.maxY ? f : this.maxY, d = o * n + l * r + c, f = a * n + h * r + u, this.minX = d < this.minX ? d : this.minX, this.minY = f < this.minY ? f : this.minY, this.maxX = d > this.maxX ? d : this.maxX, this.maxY = f > this.maxY ? f : this.maxY, d = o * i + l * r + c, f = a * i + h * r + u, this.minX = d < this.minX ? d : this.minX, this.minY = f < this.minY ? f : this.minY, this.maxX = d > this.maxX ? d : this.maxX, this.maxY = f > this.maxY ? f : this.maxY;
  }
  /**
   * Resizes the bounds object to include the given rectangle.
   * @param rect - The rectangle to be included.
   */
  fit(t) {
    return this.minX < t.left && (this.minX = t.left), this.maxX > t.right && (this.maxX = t.right), this.minY < t.top && (this.minY = t.top), this.maxY > t.bottom && (this.maxY = t.bottom), this;
  }
  /**
   * Resizes the bounds object to include the given bounds.
   * @param left - The left value of the bounds.
   * @param right - The right value of the bounds.
   * @param top - The top value of the bounds.
   * @param bottom - The bottom value of the bounds.
   */
  fitBounds(t, n, s, i) {
    return this.minX < t && (this.minX = t), this.maxX > n && (this.maxX = n), this.minY < s && (this.minY = s), this.maxY > i && (this.maxY = i), this;
  }
  /**
   * Pads bounds object, making it grow in all directions.
   * If paddingY is omitted, both paddingX and paddingY will be set to paddingX.
   * @param paddingX - The horizontal padding amount.
   * @param paddingY - The vertical padding amount.
   */
  pad(t, n = t) {
    return this.minX -= t, this.maxX += t, this.minY -= n, this.maxY += n, this;
  }
  /** Ceils the bounds. */
  ceil() {
    return this.minX = Math.floor(this.minX), this.minY = Math.floor(this.minY), this.maxX = Math.ceil(this.maxX), this.maxY = Math.ceil(this.maxY), this;
  }
  /** Clones the bounds. */
  clone() {
    return new de(this.minX, this.minY, this.maxX, this.maxY);
  }
  /**
   * Scales the bounds by the given values
   * @param x - The X value to scale by.
   * @param y - The Y value to scale by.
   */
  scale(t, n = t) {
    return this.minX *= t, this.minY *= n, this.maxX *= t, this.maxY *= n, this;
  }
  /** the x value of the bounds. */
  get x() {
    return this.minX;
  }
  set x(t) {
    const n = this.maxX - this.minX;
    this.minX = t, this.maxX = t + n;
  }
  /** the y value of the bounds. */
  get y() {
    return this.minY;
  }
  set y(t) {
    const n = this.maxY - this.minY;
    this.minY = t, this.maxY = t + n;
  }
  /** the width value of the bounds. */
  get width() {
    return this.maxX - this.minX;
  }
  set width(t) {
    this.maxX = this.minX + t;
  }
  /** the height value of the bounds. */
  get height() {
    return this.maxY - this.minY;
  }
  set height(t) {
    this.maxY = this.minY + t;
  }
  /** the left value of the bounds. */
  get left() {
    return this.minX;
  }
  /** the right value of the bounds. */
  get right() {
    return this.maxX;
  }
  /** the top value of the bounds. */
  get top() {
    return this.minY;
  }
  /** the bottom value of the bounds. */
  get bottom() {
    return this.maxY;
  }
  /** Is the bounds positive. */
  get isPositive() {
    return this.maxX - this.minX > 0 && this.maxY - this.minY > 0;
  }
  get isValid() {
    return this.minX + this.minY !== 1 / 0;
  }
  /**
   * Adds screen vertices from array
   * @param vertexData - calculated vertices
   * @param beginOffset - begin offset
   * @param endOffset - end offset, excluded
   * @param matrix
   */
  addVertexData(t, n, s, i) {
    let r = this.minX, o = this.minY, a = this.maxX, l = this.maxY;
    i || (i = this.matrix);
    const h = i.a, c = i.b, u = i.c, d = i.d, f = i.tx, m = i.ty;
    for (let g = n; g < s; g += 2) {
      const p = t[g], y = t[g + 1], x = h * p + u * y + f, b = c * p + d * y + m;
      r = x < r ? x : r, o = b < o ? b : o, a = x > a ? x : a, l = b > l ? b : l;
    }
    this.minX = r, this.minY = o, this.maxX = a, this.maxY = l;
  }
  /**
   * Checks if the point is contained within the bounds.
   * @param x - x coordinate
   * @param y - y coordinate
   */
  containsPoint(t, n) {
    return this.minX <= t && this.minY <= n && this.maxX >= t && this.maxY >= n;
  }
  toString() {
    return `[pixi.js:Bounds minX=${this.minX} minY=${this.minY} maxX=${this.maxX} maxY=${this.maxY} width=${this.width} height=${this.height}]`;
  }
}
const ce = new Ci(Q), nn = new Ci(de);
function na(e, t, n) {
  n.clear();
  let s, i;
  return e.parent ? t ? s = e.parent.worldTransform : (i = ce.get().identity(), s = us(e, i)) : s = Q.IDENTITY, sa(e, n, s, t), i && ce.return(i), n.isValid || n.set(0, 0, 0, 0), n;
}
function sa(e, t, n, s) {
  var a, l;
  if (!e.visible || !e.measurable)
    return;
  let i;
  s ? i = e.worldTransform : (e.updateLocalTransform(), i = ce.get(), i.appendFrom(e.localTransform, n));
  const r = t, o = !!e.effects.length;
  if (o && (t = nn.get().clear()), e.boundsArea)
    t.addRect(e.boundsArea, i);
  else {
    e.addBounds && (t.matrix = i, e.addBounds(t));
    for (let h = 0; h < e.children.length; h++)
      sa(e.children[h], t, i, s);
  }
  if (o) {
    for (let h = 0; h < e.effects.length; h++)
      (l = (a = e.effects[h]).addBounds) == null || l.call(a, t);
    r.addBounds(t, Q.IDENTITY), nn.return(t);
  }
  s || ce.return(i);
}
function us(e, t) {
  const n = e.parent;
  return n && (us(n, t), n.updateLocalTransform(), t.append(n.localTransform)), t;
}
let Ys = 0;
const kr = 500;
function ue(...e) {
  Ys !== kr && (Ys++, Ys === kr ? console.warn("PixiJS Warning: too many warnings, no more warnings will be reported to the console by PixiJS.") : console.warn("PixiJS Warning: ", ...e));
}
function ia(e, t, n) {
  return t.clear(), n || (n = Q.IDENTITY), ra(e, t, n, e, !0), t.isValid || t.set(0, 0, 0, 0), t;
}
function ra(e, t, n, s, i) {
  var l, h;
  let r;
  if (i)
    r = ce.get(), r = n.copyTo(r);
  else {
    if (!e.visible || !e.measurable)
      return;
    e.updateLocalTransform();
    const c = e.localTransform;
    r = ce.get(), r.appendFrom(c, n);
  }
  const o = t, a = !!e.effects.length;
  if (a && (t = nn.get().clear()), e.boundsArea)
    t.addRect(e.boundsArea, r);
  else {
    e.renderPipeId && (t.matrix = r, e.addBounds(t));
    const c = e.children;
    for (let u = 0; u < c.length; u++)
      ra(c[u], t, r, s, !1);
  }
  if (a) {
    for (let c = 0; c < e.effects.length; c++)
      (h = (l = e.effects[c]).addLocalBounds) == null || h.call(l, t, s);
    o.addBounds(t, Q.IDENTITY), nn.return(t);
  }
  ce.return(r);
}
function oa(e, t) {
  const n = e.children;
  for (let s = 0; s < n.length; s++) {
    const i = n[s], r = (i.uid & 255) << 24 | i._didChangeId & 16777215;
    t.data[t.index] !== r && (t.data[t.index] = r, t.didChange = !0), t.index++, i.children.length && oa(i, t);
  }
  return t.didChange;
}
const Yu = new Q(), Lu = {
  _localBoundsCacheId: -1,
  _localBoundsCacheData: null,
  _setWidth(e, t) {
    const n = Math.sign(this.scale.x) || 1;
    t !== 0 ? this.scale.x = e / t * n : this.scale.x = n;
  },
  _setHeight(e, t) {
    const n = Math.sign(this.scale.y) || 1;
    t !== 0 ? this.scale.y = e / t * n : this.scale.y = n;
  },
  /**
   * Retrieves the local bounds of the container as a Bounds object.
   * @returns - The bounding area.
   * @memberof scene.Container#
   */
  getLocalBounds() {
    this._localBoundsCacheData || (this._localBoundsCacheData = {
      data: [],
      index: 1,
      didChange: !1,
      localBounds: new de()
    });
    const e = this._localBoundsCacheData;
    return e.index = 1, e.didChange = !1, e.data[0] !== this._didChangeId >> 12 && (e.didChange = !0, e.data[0] = this._didChangeId >> 12), oa(this, e), e.didChange && ia(this, e.localBounds, Yu), e.localBounds;
  },
  /**
   * Calculates and returns the (world) bounds of the display object as a [Rectangle]{@link Rectangle}.
   * @param skipUpdate - Setting to `true` will stop the transforms of the scene graph from
   *  being updated. This means the calculation returned MAY be out of date BUT will give you a
   *  nice performance boost.
   * @param bounds - Optional bounds to store the result of the bounds calculation.
   * @returns - The minimum axis-aligned rectangle in world space that fits around this object.
   * @memberof scene.Container#
   */
  getBounds(e, t) {
    return na(this, e, t || new de());
  }
}, Xu = {
  _onRender: null,
  set onRender(e) {
    const t = this.renderGroup;
    if (!e) {
      this._onRender && (t == null || t.removeOnRender(this)), this._onRender = null;
      return;
    }
    this._onRender || t == null || t.addOnRender(this), this._onRender = e;
  },
  /**
   * This callback is used when the container is rendered. This is where you should add your custom
   * logic that is needed to be run every frame.
   *
   * In v7 many users used `updateTransform` for this, however the way v8 renders objects is different
   * and "updateTransform" is no longer called every frame
   * @example
   * const container = new Container();
   * container.onRender = () => {
   *    container.rotation += 0.01;
   * };
   * @memberof scene.Container#
   */
  get onRender() {
    return this._onRender;
  }
}, Fu = {
  _zIndex: 0,
  /**
   * Should children be sorted by zIndex at the next render call.
   *
   * Will get automatically set to true if a new child is added, or if a child's zIndex changes.
   * @type {boolean}
   * @memberof scene.Container#
   */
  sortDirty: !1,
  /**
   * If set to true, the container will sort its children by `zIndex` value
   * when the next render is called, or manually if `sortChildren()` is called.
   *
   * This actually changes the order of elements in the array, so should be treated
   * as a basic solution that is not performant compared to other solutions,
   * such as {@link https://github.com/pixijs/layers PixiJS Layers}
   *
   * Also be aware of that this may not work nicely with the `addChildAt()` function,
   * as the `zIndex` sorting may cause the child to automatically sorted to another position.
   * @type {boolean}
   * @memberof scene.Container#
   */
  sortableChildren: !1,
  /**
   * The zIndex of the container.
   *
   * Setting this value, will automatically set the parent to be sortable. Children will be automatically
   * sorted by zIndex value; a higher value will mean it will be moved towards the end of the array,
   * and thus rendered on top of other display objects within the same container.
   * @see scene.Container#sortableChildren
   * @memberof scene.Container#
   */
  get zIndex() {
    return this._zIndex;
  },
  set zIndex(e) {
    this._zIndex !== e && (this._zIndex = e, this.depthOfChildModified());
  },
  depthOfChildModified() {
    this.parent && (this.parent.sortableChildren = !0, this.parent.sortDirty = !0), this.renderGroup && !this.isRenderGroupRoot && (this.renderGroup.structureDidChange = !0);
  },
  /**
   * Sorts children by zIndex.
   * @memberof scene.Container#
   */
  sortChildren() {
    this.sortDirty && (this.sortDirty = !1, this.children.sort(Gu));
  }
};
function Gu(e, t) {
  return e._zIndex - t._zIndex;
}
const $u = {
  /**
   * Returns the global position of the container.
   * @param point - The optional point to write the global value to.
   * @param skipUpdate - Should we skip the update transform.
   * @returns - The updated point.
   * @memberof scene.Container#
   */
  getGlobalPosition(e = new Tt(), t = !1) {
    return this.parent ? this.parent.toGlobal(this._position, e, t) : (e.x = this._position.x, e.y = this._position.y), e;
  },
  /**
   * Calculates the global position of the container.
   * @param position - The world origin to calculate from.
   * @param point - A Point object in which to store the value, optional
   *  (otherwise will create a new Point).
   * @param skipUpdate - Should we skip the update transform.
   * @returns - A point object representing the position of this object.
   * @memberof scene.Container#
   */
  toGlobal(e, t, n = !1) {
    if (!n) {
      this.updateLocalTransform();
      const s = us(this, new Q());
      return s.append(this.localTransform), s.apply(e, t);
    }
    return this.worldTransform.apply(e, t);
  },
  /**
   * Calculates the local position of the container relative to another point.
   * @param position - The world origin to calculate from.
   * @param from - The Container to calculate the global position from.
   * @param point - A Point object in which to store the value, optional
   *  (otherwise will create a new Point).
   * @param skipUpdate - Should we skip the update transform
   * @returns - A point object representing the position of this object
   * @memberof scene.Container#
   */
  toLocal(e, t, n, s) {
    if (t && (e = t.toGlobal(e, n, s)), !s) {
      this.updateLocalTransform();
      const i = us(this, new Q());
      return i.append(this.localTransform), i.applyInverse(e, n);
    }
    return this.worldTransform.applyInverse(e, n);
  }
};
class aa {
  constructor() {
    this.uid = vt("instructionSet"), this.instructions = [], this.instructionSize = 0;
  }
  /** reset the instruction set so it can be reused set size back to 0 */
  reset() {
    this.instructionSize = 0;
  }
  /**
   * Add an instruction to the set
   * @param instruction - add an instruction to the set
   */
  add(t) {
    this.instructions[this.instructionSize++] = t;
  }
  /**
   * Log the instructions to the console (for debugging)
   * @internal
   * @ignore
   */
  log() {
    this.instructions.length = this.instructionSize, console.table(this.instructions, ["type", "action"]);
  }
}
class Nu {
  constructor(t) {
    this.renderPipeId = "renderGroup", this.root = null, this.canBundle = !1, this.renderGroupParent = null, this.renderGroupChildren = [], this._children = [], this.worldTransform = new Q(), this.worldColorAlpha = 4294967295, this.worldColor = 16777215, this.worldAlpha = 1, this.childrenToUpdate = /* @__PURE__ */ Object.create(null), this.updateTick = 0, this.childrenRenderablesToUpdate = { list: [], index: 0 }, this.structureDidChange = !0, this.instructionSet = new aa(), this._onRenderContainers = [], this.root = t, this.addChild(t);
  }
  get localTransform() {
    return this.root.localTransform;
  }
  addRenderGroupChild(t) {
    t.renderGroupParent && t.renderGroupParent._removeRenderGroupChild(t), t.renderGroupParent = this, this.onChildUpdate(t.root), this.renderGroupChildren.push(t);
  }
  _removeRenderGroupChild(t) {
    t.root.didChange && this._removeChildFromUpdate(t.root);
    const n = this.renderGroupChildren.indexOf(t);
    n > -1 && this.renderGroupChildren.splice(n, 1), t.renderGroupParent = null;
  }
  addChild(t) {
    if (this.structureDidChange = !0, t !== this.root && (this._children.push(t), t.updateTick = -1, t.parent === this.root ? t.relativeRenderGroupDepth = 1 : t.relativeRenderGroupDepth = t.parent.relativeRenderGroupDepth + 1), t.renderGroup) {
      if (t.renderGroup.root === t) {
        this.addRenderGroupChild(t.renderGroup);
        return;
      }
    } else
      t.renderGroup = this, t.didChange = !0;
    t._onRender && (t.isRenderGroupRoot ? t.renderGroup.root === t && this.addOnRender(t) : this.addOnRender(t));
    const n = t.children;
    t.isRenderGroupRoot || this.onChildUpdate(t);
    for (let s = 0; s < n.length; s++)
      this.addChild(n[s]);
  }
  removeChild(t) {
    if (this.structureDidChange = !0, t._onRender && (t.isRenderGroupRoot ? t.renderGroup.root === t && this.removeOnRender(t) : this.removeOnRender(t)), t.renderGroup.root !== t) {
      const s = t.children;
      for (let i = 0; i < s.length; i++)
        this.removeChild(s[i]);
      t.didChange && t.renderGroup._removeChildFromUpdate(t), t.renderGroup = null;
    } else
      this._removeRenderGroupChild(t.renderGroup);
    const n = this._children.indexOf(t);
    n > -1 && this._children.splice(n, 1);
  }
  onChildUpdate(t) {
    let n = this.childrenToUpdate[t.relativeRenderGroupDepth];
    n || (n = this.childrenToUpdate[t.relativeRenderGroupDepth] = {
      index: 0,
      list: []
    }), n.list[n.index++] = t;
  }
  // SHOULD THIS BE HERE?
  updateRenderable(t) {
    t.globalDisplayStatus < 7 || (t.didViewUpdate = !1, this.instructionSet.renderPipes[t.renderPipeId].updateRenderable(t));
  }
  onChildViewUpdate(t) {
    this.childrenRenderablesToUpdate.list[this.childrenRenderablesToUpdate.index++] = t;
  }
  _removeChildFromUpdate(t) {
    const n = this.childrenToUpdate[t.relativeRenderGroupDepth];
    if (!n)
      return;
    const s = n.list.indexOf(t);
    s > -1 && n.list.splice(s, 1), n.index--;
  }
  get isRenderable() {
    return this.root.localDisplayStatus === 7 && this.worldAlpha > 0;
  }
  /**
   * adding a container to the onRender list will make sure the user function
   * passed in to the user defined 'onRender` callBack
   * @param container - the container to add to the onRender list
   */
  addOnRender(t) {
    this._onRenderContainers.push(t);
  }
  removeOnRender(t) {
    this._onRenderContainers.splice(this._onRenderContainers.indexOf(t), 1);
  }
  runOnRender() {
    for (let t = 0; t < this._onRenderContainers.length; t++)
      this._onRenderContainers[t]._onRender();
  }
}
function Du(e, t, n = {}) {
  for (const s in t)
    !n[s] && t[s] !== void 0 && (e[s] = t[s]);
}
const Ls = new Xt(null), Xs = new Xt(null), Fs = new Xt(null, 1, 1), Ir = 1, Uu = 2, Gs = 4;
class It extends xe {
  constructor(t = {}) {
    var n, s;
    super(), this.uid = vt("renderable"), this._updateFlags = 15, this.isRenderGroupRoot = !1, this.renderGroup = null, this.didChange = !1, this.didViewUpdate = !1, this.relativeRenderGroupDepth = 0, this.children = [], this.parent = null, this.includeInBuild = !0, this.measurable = !0, this.isSimple = !0, this.updateTick = -1, this.localTransform = new Q(), this.relativeGroupTransform = new Q(), this.groupTransform = this.relativeGroupTransform, this.destroyed = !1, this._position = new Xt(this, 0, 0), this._scale = Fs, this._pivot = Xs, this._skew = Ls, this._cx = 1, this._sx = 0, this._cy = 0, this._sy = 1, this._rotation = 0, this.localColor = 16777215, this.localAlpha = 1, this.groupAlpha = 1, this.groupColor = 16777215, this.groupColorAlpha = 4294967295, this.localBlendMode = "inherit", this.groupBlendMode = "normal", this.localDisplayStatus = 7, this.globalDisplayStatus = 7, this._didChangeId = 0, this._didLocalTransformChangeId = -1, Du(this, t, {
      children: !0,
      parent: !0,
      effects: !0
    }), (n = t.children) == null || n.forEach((i) => this.addChild(i)), this.effects = [], (s = t.parent) == null || s.addChild(this);
  }
  /**
   * Mixes all enumerable properties and methods from a source object to Container.
   * @param source - The source of properties and methods to mix in.
   */
  static mixin(t) {
    Object.defineProperties(It.prototype, Object.getOwnPropertyDescriptors(t));
  }
  /**
   * Adds one or more children to the container.
   *
   * Multiple items can be added like so: `myContainer.addChild(thingOne, thingTwo, thingThree)`
   * @param {...Container} children - The Container(s) to add to the container
   * @returns {Container} - The first child that was added.
   */
  addChild(...t) {
    if (this.allowChildren || xt(_t, "addChild: Only Containers will be allowed to add children in v8.0.0"), t.length > 1) {
      for (let s = 0; s < t.length; s++)
        this.addChild(t[s]);
      return t[0];
    }
    const n = t[0];
    return n.parent === this ? (this.children.splice(this.children.indexOf(n), 1), this.children.push(n), this.renderGroup && !this.isRenderGroupRoot && (this.renderGroup.structureDidChange = !0), n) : (n.parent && n.parent.removeChild(n), this.children.push(n), this.sortableChildren && (this.sortDirty = !0), n.parent = this, n.didChange = !0, n.didViewUpdate = !1, n._updateFlags = 15, this.renderGroup && this.renderGroup.addChild(n), this.emit("childAdded", n, this, this.children.length - 1), n.emit("added", this), this._didChangeId += 4096, n._zIndex !== 0 && n.depthOfChildModified(), n);
  }
  /**
   * Removes one or more children from the container.
   * @param {...Container} children - The Container(s) to remove
   * @returns {Container} The first child that was removed.
   */
  removeChild(...t) {
    if (t.length > 1) {
      for (let i = 0; i < t.length; i++)
        this.removeChild(t[i]);
      return t[0];
    }
    const n = t[0], s = this.children.indexOf(n);
    return s > -1 && (this._didChangeId += 4096, this.children.splice(s, 1), this.renderGroup && this.renderGroup.removeChild(n), n.parent = null, this.emit("childRemoved", n, this, s), n.emit("removed", this)), n;
  }
  /** @ignore */
  _onUpdate(t) {
    if (t && t === this._skew && this._updateSkew(), this._didChangeId++, !this.didChange)
      if (this.didChange = !0, this.isRenderGroupRoot) {
        const n = this.renderGroup.renderGroupParent;
        n && n.onChildUpdate(this);
      } else
        this.renderGroup && this.renderGroup.onChildUpdate(this);
  }
  set isRenderGroup(t) {
    if (this.isRenderGroupRoot && t === !1)
      throw new Error("[Pixi] cannot undo a render group just yet");
    t && this.enableRenderGroup();
  }
  /**
   * Returns true if this container is a render group.
   * This means that it will be rendered as a separate pass, with its own set of instructions
   */
  get isRenderGroup() {
    return this.isRenderGroupRoot;
  }
  /** This enables the container to be rendered as a render group. */
  enableRenderGroup() {
    if (this.renderGroup && this.renderGroup.root === this)
      return;
    this.isRenderGroupRoot = !0;
    const t = this.renderGroup;
    if (t && t.removeChild(this), this.renderGroup = new Nu(this), t) {
      for (let n = 0; n < t.renderGroupChildren.length; n++) {
        const s = t.renderGroupChildren[n];
        let i = s.root;
        for (; i; ) {
          if (i === this) {
            this.renderGroup.addRenderGroupChild(s);
            break;
          }
          i = i.parent;
        }
      }
      t.addRenderGroupChild(this.renderGroup);
    }
    this._updateIsSimple(), this.groupTransform = Q.IDENTITY;
  }
  /** @ignore */
  _updateIsSimple() {
    this.isSimple = !this.isRenderGroupRoot && this.effects.length === 0;
  }
  /**
   * Current transform of the object based on world (parent) factors.
   * @readonly
   */
  get worldTransform() {
    return this._worldTransform || (this._worldTransform = new Q()), this.renderGroup && (this.isRenderGroupRoot ? this._worldTransform.copyFrom(this.renderGroup.worldTransform) : this._worldTransform.appendFrom(this.relativeGroupTransform, this.renderGroup.worldTransform)), this._worldTransform;
  }
  // / ////// transform related stuff
  /**
   * The position of the container on the x axis relative to the local coordinates of the parent.
   * An alias to position.x
   */
  get x() {
    return this._position.x;
  }
  set x(t) {
    this._position.x = t;
  }
  /**
   * The position of the container on the y axis relative to the local coordinates of the parent.
   * An alias to position.y
   */
  get y() {
    return this._position.y;
  }
  set y(t) {
    this._position.y = t;
  }
  /**
   * The coordinate of the object relative to the local coordinates of the parent.
   * @since 4.0.0
   */
  get position() {
    return this._position;
  }
  set position(t) {
    this._position.copyFrom(t);
  }
  /**
   * The rotation of the object in radians.
   * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
   */
  get rotation() {
    return this._rotation;
  }
  set rotation(t) {
    this._rotation !== t && (this._rotation = t, this._onUpdate(this._skew));
  }
  /**
   * The angle of the object in degrees.
   * 'rotation' and 'angle' have the same effect on a display object; rotation is in radians, angle is in degrees.
   */
  get angle() {
    return this.rotation * lu;
  }
  set angle(t) {
    this.rotation = t * hu;
  }
  /**
   * The center of rotation, scaling, and skewing for this display object in its local space. The `position`
   * is the projection of `pivot` in the parent's local space.
   *
   * By default, the pivot is the origin (0, 0).
   * @since 4.0.0
   */
  get pivot() {
    return this._pivot === Xs && (this._pivot = new Xt(this, 0, 0)), this._pivot;
  }
  set pivot(t) {
    this._pivot === Xs && (this._pivot = new Xt(this, 0, 0)), typeof t == "number" ? this._pivot.set(t) : this._pivot.copyFrom(t);
  }
  /**
   * The skew factor for the object in radians.
   * @since 4.0.0
   */
  get skew() {
    return this._skew === Ls && (this._skew = new Xt(this, 0, 0)), this._skew;
  }
  set skew(t) {
    this._skew === Ls && (this._skew = new Xt(this, 0, 0)), this._skew.copyFrom(t);
  }
  /**
   * The scale factors of this object along the local coordinate axes.
   *
   * The default scale is (1, 1).
   * @since 4.0.0
   */
  get scale() {
    return this._scale === Fs && (this._scale = new Xt(this, 1, 1)), this._scale;
  }
  set scale(t) {
    this._scale === Fs && (this._scale = new Xt(this, 0, 0)), typeof t == "number" ? this._scale.set(t) : this._scale.copyFrom(t);
  }
  /**
   * The width of the Container, setting this will actually modify the scale to achieve the value set.
   * @memberof scene.Container#
   */
  get width() {
    return Math.abs(this.scale.x * this.getLocalBounds().width);
  }
  set width(t) {
    const n = this.getLocalBounds().width;
    this._setWidth(t, n);
  }
  /**
   * The height of the Container, setting this will actually modify the scale to achieve the value set.
   * @memberof scene.Container#
   */
  get height() {
    return Math.abs(this.scale.y * this.getLocalBounds().height);
  }
  set height(t) {
    const n = this.getLocalBounds().height;
    this._setHeight(t, n);
  }
  /**
   * Retrieves the size of the container as a [Size]{@link Size} object.
   * This is faster than get the width and height separately.
   * @param out - Optional object to store the size in.
   * @returns - The size of the container.
   * @memberof scene.Container#
   */
  getSize(t) {
    t || (t = {});
    const n = this.getLocalBounds();
    return t.width = Math.abs(this.scale.x * n.width), t.height = Math.abs(this.scale.y * n.height), t;
  }
  /**
   * Sets the size of the container to the specified width and height.
   * This is faster than setting the width and height separately.
   * @param value - This can be either a number or a [Size]{@link Size} object.
   * @param height - The height to set. Defaults to the value of `width` if not provided.
   * @memberof scene.Container#
   */
  setSize(t, n) {
    const s = this.getLocalBounds();
    let i, r;
    typeof t != "object" ? (i = t, r = n ?? t) : (i = t.width, r = t.height ?? t.width), i !== void 0 && this._setWidth(i, s.width), r !== void 0 && this._setHeight(r, s.height);
  }
  /** Called when the skew or the rotation changes. */
  _updateSkew() {
    const t = this._rotation, n = this._skew;
    this._cx = Math.cos(t + n._y), this._sx = Math.sin(t + n._y), this._cy = -Math.sin(t - n._x), this._sy = Math.cos(t - n._x);
  }
  /**
   * Updates the transform properties of the container (accepts partial values).
   * @param {object} opts - The options for updating the transform.
   * @param {number} opts.x - The x position of the container.
   * @param {number} opts.y - The y position of the container.
   * @param {number} opts.scaleX - The scale factor on the x-axis.
   * @param {number} opts.scaleY - The scale factor on the y-axis.
   * @param {number} opts.rotation - The rotation of the container, in radians.
   * @param {number} opts.skewX - The skew factor on the x-axis.
   * @param {number} opts.skewY - The skew factor on the y-axis.
   * @param {number} opts.pivotX - The x coordinate of the pivot point.
   * @param {number} opts.pivotY - The y coordinate of the pivot point.
   */
  updateTransform(t) {
    return this.position.set(
      typeof t.x == "number" ? t.x : this.position.x,
      typeof t.y == "number" ? t.y : this.position.y
    ), this.scale.set(
      typeof t.scaleX == "number" ? t.scaleX || 1 : this.scale.x,
      typeof t.scaleY == "number" ? t.scaleY || 1 : this.scale.y
    ), this.rotation = typeof t.rotation == "number" ? t.rotation : this.rotation, this.skew.set(
      typeof t.skewX == "number" ? t.skewX : this.skew.x,
      typeof t.skewY == "number" ? t.skewY : this.skew.y
    ), this.pivot.set(
      typeof t.pivotX == "number" ? t.pivotX : this.pivot.x,
      typeof t.pivotY == "number" ? t.pivotY : this.pivot.y
    ), this;
  }
  /**
   * Updates the local transform using the given matrix.
   * @param matrix - The matrix to use for updating the transform.
   */
  setFromMatrix(t) {
    t.decompose(this);
  }
  /** Updates the local transform. */
  updateLocalTransform() {
    if ((this._didLocalTransformChangeId & 15) === this._didChangeId)
      return;
    this._didLocalTransformChangeId = this._didChangeId;
    const t = this.localTransform, n = this._scale, s = this._pivot, i = this._position, r = n._x, o = n._y, a = s._x, l = s._y;
    t.a = this._cx * r, t.b = this._sx * r, t.c = this._cy * o, t.d = this._sy * o, t.tx = i._x - (a * t.a + l * t.c), t.ty = i._y - (a * t.b + l * t.d);
  }
  // / ///// color related stuff
  set alpha(t) {
    t !== this.localAlpha && (this.localAlpha = t, this._updateFlags |= Ir, this._onUpdate());
  }
  /** The opacity of the object. */
  get alpha() {
    return this.localAlpha;
  }
  set tint(t) {
    const s = Pt.shared.setValue(t ?? 16777215).toBgrNumber();
    s !== this.localColor && (this.localColor = s, this._updateFlags |= Ir, this._onUpdate());
  }
  /**
   * The tint applied to the sprite. This is a hex value.
   *
   * A value of 0xFFFFFF will remove any tint effect.
   * @default 0xFFFFFF
   */
  get tint() {
    const t = this.localColor;
    return ((t & 255) << 16) + (t & 65280) + (t >> 16 & 255);
  }
  // / //////////////// blend related stuff
  set blendMode(t) {
    this.localBlendMode !== t && (this.renderGroup && !this.isRenderGroupRoot && (this.renderGroup.structureDidChange = !0), this._updateFlags |= Uu, this.localBlendMode = t, this._onUpdate());
  }
  /**
   * The blend mode to be applied to the sprite. Apply a value of `'normal'` to reset the blend mode.
   * @default 'normal'
   */
  get blendMode() {
    return this.localBlendMode;
  }
  // / ///////// VISIBILITY / RENDERABLE /////////////////
  /** The visibility of the object. If false the object will not be drawn, and the transform will not be updated. */
  get visible() {
    return !!(this.localDisplayStatus & 2);
  }
  set visible(t) {
    const n = t ? 1 : 0;
    (this.localDisplayStatus & 2) >> 1 !== n && (this.renderGroup && !this.isRenderGroupRoot && (this.renderGroup.structureDidChange = !0), this._updateFlags |= Gs, this.localDisplayStatus ^= 2, this._onUpdate());
  }
  /** @ignore */
  get culled() {
    return !(this.localDisplayStatus & 4);
  }
  /** @ignore */
  set culled(t) {
    const n = t ? 1 : 0;
    (this.localDisplayStatus & 4) >> 2 !== n && (this.renderGroup && !this.isRenderGroupRoot && (this.renderGroup.structureDidChange = !0), this._updateFlags |= Gs, this.localDisplayStatus ^= 4, this._onUpdate());
  }
  /** Can this object be rendered, if false the object will not be drawn but the transform will still be updated. */
  get renderable() {
    return !!(this.localDisplayStatus & 1);
  }
  set renderable(t) {
    const n = t ? 1 : 0;
    (this.localDisplayStatus & 1) !== n && (this._updateFlags |= Gs, this.localDisplayStatus ^= 1, this.renderGroup && !this.isRenderGroupRoot && (this.renderGroup.structureDidChange = !0), this._onUpdate());
  }
  /** Whether or not the object should be rendered. */
  get isRenderable() {
    return this.localDisplayStatus === 7 && this.groupAlpha > 0;
  }
  /**
   * Removes all internal references and listeners as well as removes children from the display list.
   * Do not use a Container after calling `destroy`.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.children=false] - if set to true, all the children will have their destroy
   *  method called as well. 'options' will be passed on to those calls.
   * @param {boolean} [options.texture=false] - Only used for children with textures e.g. Sprites. If options.children
   * is set to true it should destroy the texture of the child sprite
   * @param {boolean} [options.textureSource=false] - Only used for children with textures e.g. Sprites.
   * If options.children is set to true it should destroy the texture source of the child sprite
   * @param {boolean} [options.context=false] - Only used for children with graphicsContexts e.g. Graphics.
   * If options.children is set to true it should destroy the context of the child graphics
   */
  destroy(t = !1) {
    if (this.destroyed)
      return;
    this.destroyed = !0, this.removeFromParent(), this.parent = null, this._mask = null, this._filters = null, this.effects = null, this._position = null, this._scale = null, this._pivot = null, this._skew = null, this.emit("destroyed", this), this.removeAllListeners();
    const n = typeof t == "boolean" ? t : t == null ? void 0 : t.children, s = this.removeChildren(0, this.children.length);
    if (n)
      for (let i = 0; i < s.length; ++i)
        s[i].destroy(t);
  }
}
It.mixin(Pu);
It.mixin($u);
It.mixin(Xu);
It.mixin(Lu);
It.mixin(Ru);
It.mixin(Ou);
It.mixin(Fu);
It.mixin(Eu);
class In extends It {
  /**
   * @param options - The options for creating the sprite.
   */
  constructor(t = st.EMPTY) {
    t instanceof st && (t = { texture: t });
    const { texture: n, anchor: s, roundPixels: i, width: r, height: o, ...a } = t;
    super({
      label: "Sprite",
      ...a
    }), this.renderPipeId = "sprite", this.batched = !0, this._didSpriteUpdate = !1, this._bounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 }, this._sourceBounds = { minX: 0, maxX: 1, minY: 0, maxY: 0 }, this._boundsDirty = !0, this._sourceBoundsDirty = !0, this._roundPixels = 0, this._anchor = new Xt(
      {
        _onUpdate: () => {
          this.onViewUpdate();
        }
      }
    ), s ? this.anchor = s : n.defaultAnchor && (this.anchor = n.defaultAnchor), this.texture = n, this.allowChildren = !1, this.roundPixels = i ?? !1, r && (this.width = r), o && (this.height = o);
  }
  /**
   * Helper function that creates a new sprite based on the source you provide.
   * The source can be - frame id, image, video, canvas element, video element, texture
   * @param source - Source to create texture from
   * @param [skipCache] - Whether to skip the cache or not
   * @returns The newly created sprite
   */
  static from(t, n = !1) {
    return t instanceof st ? new In(t) : new In(st.from(t, n));
  }
  set texture(t) {
    t || (t = st.EMPTY);
    const n = this._texture;
    n !== t && (n && n.dynamic && n.off("update", this.onViewUpdate, this), t.dynamic && t.on("update", this.onViewUpdate, this), this._texture = t, this.onViewUpdate());
  }
  /** The texture that the sprite is using. */
  get texture() {
    return this._texture;
  }
  /**
   * The local bounds of the sprite.
   * @type {rendering.Bounds}
   */
  get bounds() {
    return this._boundsDirty && (this._updateBounds(), this._boundsDirty = !1), this._bounds;
  }
  /**
   * The bounds of the sprite, taking the texture's trim into account.
   * @type {rendering.Bounds}
   */
  get sourceBounds() {
    return this._sourceBoundsDirty && (this._updateSourceBounds(), this._sourceBoundsDirty = !1), this._sourceBounds;
  }
  /**
   * Checks if the object contains the given point.
   * @param point - The point to check
   */
  containsPoint(t) {
    const n = this.sourceBounds;
    return t.x >= n.maxX && t.x <= n.minX && t.y >= n.maxY && t.y <= n.minY;
  }
  /**
   * Adds the bounds of this object to the bounds object.
   * @param bounds - The output bounds object.
   */
  addBounds(t) {
    const n = this._texture.trim ? this.sourceBounds : this.bounds;
    t.addFrame(n.minX, n.minY, n.maxX, n.maxY);
  }
  onViewUpdate() {
    this._didChangeId += 4096, this._didSpriteUpdate = !0, this._sourceBoundsDirty = this._boundsDirty = !0, !this.didViewUpdate && (this.didViewUpdate = !0, this.renderGroup && this.renderGroup.onChildViewUpdate(this));
  }
  _updateBounds() {
    yu(this._bounds, this._anchor, this._texture, 0);
  }
  _updateSourceBounds() {
    const t = this._anchor, n = this._texture, s = this._sourceBounds, { width: i, height: r } = n.orig;
    s.maxX = -t._x * i, s.minX = s.maxX + i, s.maxY = -t._y * r, s.minY = s.maxY + r;
  }
  /**
   * Destroys this sprite renderable and optionally its texture.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.texture=false] - Should it destroy the current texture of the renderable as well
   * @param {boolean} [options.textureSource=false] - Should it destroy the textureSource of the renderable as well
   */
  destroy(t = !1) {
    if (super.destroy(t), typeof t == "boolean" ? t : t == null ? void 0 : t.texture) {
      const s = typeof t == "boolean" ? t : t == null ? void 0 : t.textureSource;
      this._texture.destroy(s);
    }
    this._texture = null, this._bounds = null, this._sourceBounds = null, this._anchor = null;
  }
  /**
   * The anchor sets the origin point of the sprite. The default value is taken from the {@link Texture}
   * and passed to the constructor.
   *
   * The default is `(0,0)`, this means the sprite's origin is the top left.
   *
   * Setting the anchor to `(0.5,0.5)` means the sprite's origin is centered.
   *
   * Setting the anchor to `(1,1)` would mean the sprite's origin point will be the bottom right corner.
   *
   * If you pass only single parameter, it will set both x and y to the same value as shown in the example below.
   * @example
   * import { Sprite } from 'pixi.js';
   *
   * const sprite = new Sprite({texture: Texture.WHITE});
   * sprite.anchor.set(0.5); // This will set the origin to center. (0.5) is same as (0.5, 0.5).
   */
  get anchor() {
    return this._anchor;
  }
  set anchor(t) {
    typeof t == "number" ? this._anchor.set(t) : this._anchor.copyFrom(t);
  }
  /**
   *  Whether or not to round the x/y position of the sprite.
   * @type {boolean}
   */
  get roundPixels() {
    return !!this._roundPixels;
  }
  set roundPixels(t) {
    this._roundPixels = t ? 1 : 0;
  }
  /** The width of the sprite, setting this will actually modify the scale to achieve the value set. */
  get width() {
    return Math.abs(this.scale.x) * this._texture.orig.width;
  }
  set width(t) {
    this._setWidth(t, this._texture.orig.width);
  }
  /** The height of the sprite, setting this will actually modify the scale to achieve the value set. */
  get height() {
    return Math.abs(this.scale.y) * this._texture.orig.height;
  }
  set height(t) {
    this._setHeight(t, this._texture.orig.height);
  }
  /**
   * Retrieves the size of the Sprite as a [Size]{@link Size} object.
   * This is faster than get the width and height separately.
   * @param out - Optional object to store the size in.
   * @returns - The size of the Sprite.
   */
  getSize(t) {
    return t || (t = {}), t.width = Math.abs(this.scale.x) * this._texture.orig.width, t.height = Math.abs(this.scale.y) * this._texture.orig.height, t;
  }
  /**
   * Sets the size of the Sprite to the specified width and height.
   * This is faster than setting the width and height separately.
   * @param value - This can be either a number or a [Size]{@link Size} object.
   * @param height - The height to set. Defaults to the value of `width` if not provided.
   */
  setSize(t, n) {
    let s, i;
    typeof t != "object" ? (s = t, i = n ?? t) : (s = t.width, i = t.height ?? t.width), s !== void 0 && this._setWidth(s, this._texture.orig.width), i !== void 0 && this._setHeight(i, this._texture.orig.height);
  }
}
const Hu = new de();
function la(e, t, n) {
  const s = Hu;
  e.measurable = !0, na(e, n, s), t.addBoundsMask(s), e.measurable = !1;
}
function ha(e, t, n) {
  const s = nn.get();
  e.measurable = !0;
  const i = ce.get().identity(), r = ca(e, n, i);
  ia(e, s, r), e.measurable = !1, t.addBoundsMask(s), ce.return(i), nn.return(s);
}
function ca(e, t, n) {
  return e ? (e !== t && (ca(e.parent, t, n), e.updateLocalTransform(), n.append(e.localTransform)), n) : (ue("Mask bounds, renderable is not inside the root container"), n);
}
class ua {
  constructor(t) {
    this.priority = 0, this.pipe = "alphaMask", t != null && t.mask && this.init(t.mask);
  }
  init(t) {
    this.mask = t, this.renderMaskToTexture = !(t instanceof In), this.mask.renderable = this.renderMaskToTexture, this.mask.includeInBuild = !this.renderMaskToTexture, this.mask.measurable = !1;
  }
  reset() {
    this.mask.measurable = !0, this.mask = null;
  }
  addBounds(t, n) {
    la(this.mask, t, n);
  }
  addLocalBounds(t, n) {
    ha(this.mask, t, n);
  }
  containsPoint(t, n) {
    const s = this.mask;
    return n(s, t);
  }
  destroy() {
    this.reset();
  }
  static test(t) {
    return t instanceof In;
  }
}
ua.extension = ft.MaskEffect;
class da {
  constructor(t) {
    this.priority = 0, this.pipe = "colorMask", t != null && t.mask && this.init(t.mask);
  }
  init(t) {
    this.mask = t;
  }
  destroy() {
  }
  static test(t) {
    return typeof t == "number";
  }
}
da.extension = ft.MaskEffect;
class fa {
  constructor(t) {
    this.priority = 0, this.pipe = "stencilMask", t != null && t.mask && this.init(t.mask);
  }
  init(t) {
    this.mask = t, this.mask.includeInBuild = !1, this.mask.measurable = !1;
  }
  reset() {
    this.mask.measurable = !0, this.mask.includeInBuild = !0, this.mask = null;
  }
  addBounds(t, n) {
    la(this.mask, t, n);
  }
  addLocalBounds(t, n) {
    ha(this.mask, t, n);
  }
  containsPoint(t, n) {
    const s = this.mask;
    return n(s, t);
  }
  destroy() {
    this.reset();
  }
  static test(t) {
    return t instanceof It;
  }
}
fa.extension = ft.MaskEffect;
const Vu = {
  createCanvas: (e, t) => {
    const n = document.createElement("canvas");
    return n.width = e, n.height = t, n;
  },
  getCanvasRenderingContext2D: () => CanvasRenderingContext2D,
  getWebGLRenderingContext: () => WebGLRenderingContext,
  getNavigator: () => navigator,
  getBaseUrl: () => document.baseURI ?? window.location.href,
  getFontFaceSet: () => document.fonts,
  fetch: (e, t) => fetch(e, t),
  parseXML: (e) => new DOMParser().parseFromString(e, "text/xml")
};
let Br = Vu;
const Oe = {
  /**
   * Returns the current adapter.
   * @returns {environment.Adapter} The current adapter.
   */
  get() {
    return Br;
  },
  /**
   * Sets the current adapter.
   * @param adapter - The new adapter.
   */
  set(e) {
    Br = e;
  }
};
class ma extends be {
  constructor(t) {
    t.resource || (t.resource = Oe.get().createCanvas()), t.width || (t.width = t.resource.width, t.autoDensity || (t.width /= t.resolution)), t.height || (t.height = t.resource.height, t.autoDensity || (t.height /= t.resolution)), super(t), this.uploadMethodId = "image", this.autoDensity = t.autoDensity;
    const n = t.resource;
    (this.pixelWidth !== n.width || this.pixelWidth !== n.height) && this.resizeCanvas(), this.transparent = !!t.transparent;
  }
  resizeCanvas() {
    this.autoDensity && (this.resource.style.width = `${this.width}px`, this.resource.style.height = `${this.height}px`), (this.resource.width !== this.pixelWidth || this.resource.height !== this.pixelHeight) && (this.resource.width = this.pixelWidth, this.resource.height = this.pixelHeight);
  }
  resize(t = this.width, n = this.height, s = this._resolution) {
    const i = super.resize(t, n, s);
    return i && this.resizeCanvas(), i;
  }
  static test(t) {
    return globalThis.HTMLCanvasElement && t instanceof HTMLCanvasElement || globalThis.OffscreenCanvas && t instanceof OffscreenCanvas;
  }
}
ma.extension = ft.TextureSource;
class Pi extends be {
  constructor(t) {
    if (t.resource && globalThis.HTMLImageElement && t.resource instanceof HTMLImageElement) {
      const n = Oe.get().createCanvas(t.resource.width, t.resource.height);
      n.getContext("2d").drawImage(t.resource, 0, 0), t.resource = n, ue("ImageSource: Image element passed, converting to canvas. Use CanvasSource instead.");
    }
    super(t), this.uploadMethodId = "image", this.autoGarbageCollect = !0;
  }
  static test(t) {
    return globalThis.HTMLImageElement && t instanceof HTMLImageElement || typeof ImageBitmap < "u" && t instanceof ImageBitmap;
  }
}
Pi.extension = ft.TextureSource;
var ai = /* @__PURE__ */ ((e) => (e[e.INTERACTION = 50] = "INTERACTION", e[e.HIGH = 25] = "HIGH", e[e.NORMAL = 0] = "NORMAL", e[e.LOW = -25] = "LOW", e[e.UTILITY = -50] = "UTILITY", e))(ai || {});
class $s {
  /**
   * Constructor
   * @private
   * @param fn - The listener function to be added for one update
   * @param context - The listener context
   * @param priority - The priority for emitting
   * @param once - If the handler should fire once
   */
  constructor(t, n = null, s = 0, i = !1) {
    this.next = null, this.previous = null, this._destroyed = !1, this._fn = t, this._context = n, this.priority = s, this._once = i;
  }
  /**
   * Simple compare function to figure out if a function and context match.
   * @param fn - The listener function to be added for one update
   * @param context - The listener context
   * @returns `true` if the listener match the arguments
   */
  match(t, n = null) {
    return this._fn === t && this._context === n;
  }
  /**
   * Emit by calling the current function.
   * @param ticker - The ticker emitting.
   * @returns Next ticker
   */
  emit(t) {
    this._fn && (this._context ? this._fn.call(this._context, t) : this._fn(t));
    const n = this.next;
    return this._once && this.destroy(!0), this._destroyed && (this.next = null), n;
  }
  /**
   * Connect to the list.
   * @param previous - Input node, previous listener
   */
  connect(t) {
    this.previous = t, t.next && (t.next.previous = this), this.next = t.next, t.next = this;
  }
  /**
   * Destroy and don't use after this.
   * @param hard - `true` to remove the `next` reference, this
   *        is considered a hard destroy. Soft destroy maintains the next reference.
   * @returns The listener to redirect while emitting or removing.
   */
  destroy(t = !1) {
    this._destroyed = !0, this._fn = null, this._context = null, this.previous && (this.previous.next = this.next), this.next && (this.next.previous = this.previous);
    const n = this.next;
    return this.next = t ? null : n, this.previous = null, n;
  }
}
const pa = class Lt {
  constructor() {
    this.autoStart = !1, this.deltaTime = 1, this.lastTime = -1, this.speed = 1, this.started = !1, this._requestId = null, this._maxElapsedMS = 100, this._minElapsedMS = 0, this._protected = !1, this._lastFrame = -1, this._head = new $s(null, null, 1 / 0), this.deltaMS = 1 / Lt.targetFPMS, this.elapsedMS = 1 / Lt.targetFPMS, this._tick = (t) => {
      this._requestId = null, this.started && (this.update(t), this.started && this._requestId === null && this._head.next && (this._requestId = requestAnimationFrame(this._tick)));
    };
  }
  /**
   * Conditionally requests a new animation frame.
   * If a frame has not already been requested, and if the internal
   * emitter has listeners, a new frame is requested.
   * @private
   */
  _requestIfNeeded() {
    this._requestId === null && this._head.next && (this.lastTime = performance.now(), this._lastFrame = this.lastTime, this._requestId = requestAnimationFrame(this._tick));
  }
  /**
   * Conditionally cancels a pending animation frame.
   * @private
   */
  _cancelIfNeeded() {
    this._requestId !== null && (cancelAnimationFrame(this._requestId), this._requestId = null);
  }
  /**
   * Conditionally requests a new animation frame.
   * If the ticker has been started it checks if a frame has not already
   * been requested, and if the internal emitter has listeners. If these
   * conditions are met, a new frame is requested. If the ticker has not
   * been started, but autoStart is `true`, then the ticker starts now,
   * and continues with the previous conditions to request a new frame.
   * @private
   */
  _startIfPossible() {
    this.started ? this._requestIfNeeded() : this.autoStart && this.start();
  }
  /**
   * Register a handler for tick events. Calls continuously unless
   * it is removed or the ticker is stopped.
   * @param fn - The listener function to be added for updates
   * @param context - The listener context
   * @param {number} [priority=UPDATE_PRIORITY.NORMAL] - The priority for emitting
   * @returns This instance of a ticker
   */
  add(t, n, s = ai.NORMAL) {
    return this._addListener(new $s(t, n, s));
  }
  /**
   * Add a handler for the tick event which is only execute once.
   * @param fn - The listener function to be added for one update
   * @param context - The listener context
   * @param {number} [priority=UPDATE_PRIORITY.NORMAL] - The priority for emitting
   * @returns This instance of a ticker
   */
  addOnce(t, n, s = ai.NORMAL) {
    return this._addListener(new $s(t, n, s, !0));
  }
  /**
   * Internally adds the event handler so that it can be sorted by priority.
   * Priority allows certain handler (user, AnimatedSprite, Interaction) to be run
   * before the rendering.
   * @private
   * @param listener - Current listener being added.
   * @returns This instance of a ticker
   */
  _addListener(t) {
    let n = this._head.next, s = this._head;
    if (!n)
      t.connect(s);
    else {
      for (; n; ) {
        if (t.priority > n.priority) {
          t.connect(s);
          break;
        }
        s = n, n = n.next;
      }
      t.previous || t.connect(s);
    }
    return this._startIfPossible(), this;
  }
  /**
   * Removes any handlers matching the function and context parameters.
   * If no handlers are left after removing, then it cancels the animation frame.
   * @param fn - The listener function to be removed
   * @param context - The listener context to be removed
   * @returns This instance of a ticker
   */
  remove(t, n) {
    let s = this._head.next;
    for (; s; )
      s.match(t, n) ? s = s.destroy() : s = s.next;
    return this._head.next || this._cancelIfNeeded(), this;
  }
  /**
   * The number of listeners on this ticker, calculated by walking through linked list
   * @readonly
   * @member {number}
   */
  get count() {
    if (!this._head)
      return 0;
    let t = 0, n = this._head;
    for (; n = n.next; )
      t++;
    return t;
  }
  /** Starts the ticker. If the ticker has listeners a new animation frame is requested at this point. */
  start() {
    this.started || (this.started = !0, this._requestIfNeeded());
  }
  /** Stops the ticker. If the ticker has requested an animation frame it is canceled at this point. */
  stop() {
    this.started && (this.started = !1, this._cancelIfNeeded());
  }
  /** Destroy the ticker and don't use after this. Calling this method removes all references to internal events. */
  destroy() {
    if (!this._protected) {
      this.stop();
      let t = this._head.next;
      for (; t; )
        t = t.destroy(!0);
      this._head.destroy(), this._head = null;
    }
  }
  /**
   * Triggers an update. An update entails setting the
   * current {@link ticker.Ticker#elapsedMS|elapsedMS},
   * the current {@link ticker.Ticker#deltaTime|deltaTime},
   * invoking all listeners with current deltaTime,
   * and then finally setting {@link ticker.Ticker#lastTime|lastTime}
   * with the value of currentTime that was provided.
   * This method will be called automatically by animation
   * frame callbacks if the ticker instance has been started
   * and listeners are added.
   * @param {number} [currentTime=performance.now()] - the current time of execution
   */
  update(t = performance.now()) {
    let n;
    if (t > this.lastTime) {
      if (n = this.elapsedMS = t - this.lastTime, n > this._maxElapsedMS && (n = this._maxElapsedMS), n *= this.speed, this._minElapsedMS) {
        const r = t - this._lastFrame | 0;
        if (r < this._minElapsedMS)
          return;
        this._lastFrame = t - r % this._minElapsedMS;
      }
      this.deltaMS = n, this.deltaTime = this.deltaMS * Lt.targetFPMS;
      const s = this._head;
      let i = s.next;
      for (; i; )
        i = i.emit(this);
      s.next || this._cancelIfNeeded();
    } else
      this.deltaTime = this.deltaMS = this.elapsedMS = 0;
    this.lastTime = t;
  }
  /**
   * The frames per second at which this ticker is running.
   * The default is approximately 60 in most modern browsers.
   * **Note:** This does not factor in the value of
   * {@link ticker.Ticker#speed|speed}, which is specific
   * to scaling {@link ticker.Ticker#deltaTime|deltaTime}.
   * @member {number}
   * @readonly
   */
  get FPS() {
    return 1e3 / this.elapsedMS;
  }
  /**
   * Manages the maximum amount of milliseconds allowed to
   * elapse between invoking {@link ticker.Ticker#update|update}.
   * This value is used to cap {@link ticker.Ticker#deltaTime|deltaTime},
   * but does not effect the measured value of {@link ticker.Ticker#FPS|FPS}.
   * When setting this property it is clamped to a value between
   * `0` and `Ticker.targetFPMS * 1000`.
   * @member {number}
   * @default 10
   */
  get minFPS() {
    return 1e3 / this._maxElapsedMS;
  }
  set minFPS(t) {
    const n = Math.min(this.maxFPS, t), s = Math.min(Math.max(0, n) / 1e3, Lt.targetFPMS);
    this._maxElapsedMS = 1 / s;
  }
  /**
   * Manages the minimum amount of milliseconds required to
   * elapse between invoking {@link ticker.Ticker#update|update}.
   * This will effect the measured value of {@link ticker.Ticker#FPS|FPS}.
   * If it is set to `0`, then there is no limit; PixiJS will render as many frames as it can.
   * Otherwise it will be at least `minFPS`
   * @member {number}
   * @default 0
   */
  get maxFPS() {
    return this._minElapsedMS ? Math.round(1e3 / this._minElapsedMS) : 0;
  }
  set maxFPS(t) {
    if (t === 0)
      this._minElapsedMS = 0;
    else {
      const n = Math.max(this.minFPS, t);
      this._minElapsedMS = 1 / (n / 1e3);
    }
  }
  /**
   * The shared ticker instance used by {@link AnimatedSprite} and by
   * {@link VideoResource} to update animation frames / video textures.
   *
   * It may also be used by {@link Application} if created with the `sharedTicker` option property set to true.
   *
   * The property {@link ticker.Ticker#autoStart|autoStart} is set to `true` for this instance.
   * Please follow the examples for usage, including how to opt-out of auto-starting the shared ticker.
   * @example
   * import { Ticker } from 'pixi.js';
   *
   * const ticker = Ticker.shared;
   * // Set this to prevent starting this ticker when listeners are added.
   * // By default this is true only for the Ticker.shared instance.
   * ticker.autoStart = false;
   *
   * // FYI, call this to ensure the ticker is stopped. It should be stopped
   * // if you have not attempted to render anything yet.
   * ticker.stop();
   *
   * // Call this when you are ready for a running shared ticker.
   * ticker.start();
   * @example
   * import { autoDetectRenderer, Container } from 'pixi.js';
   *
   * // You may use the shared ticker to render...
   * const renderer = autoDetectRenderer();
   * const stage = new Container();
   * document.body.appendChild(renderer.view);
   * ticker.add((time) => renderer.render(stage));
   *
   * // Or you can just update it manually.
   * ticker.autoStart = false;
   * ticker.stop();
   * const animate = (time) => {
   *     ticker.update(time);
   *     renderer.render(stage);
   *     requestAnimationFrame(animate);
   * };
   * animate(performance.now());
   * @member {ticker.Ticker}
   * @readonly
   * @static
   */
  static get shared() {
    if (!Lt._shared) {
      const t = Lt._shared = new Lt();
      t.autoStart = !0, t._protected = !0;
    }
    return Lt._shared;
  }
  /**
   * The system ticker instance used by {@link BasePrepare} for core timing
   * functionality that shouldn't usually need to be paused, unlike the `shared`
   * ticker which drives visual animations and rendering which may want to be paused.
   *
   * The property {@link ticker.Ticker#autoStart|autoStart} is set to `true` for this instance.
   * @member {ticker.Ticker}
   * @readonly
   * @static
   */
  static get system() {
    if (!Lt._system) {
      const t = Lt._system = new Lt();
      t.autoStart = !0, t._protected = !0;
    }
    return Lt._system;
  }
};
pa.targetFPMS = 0.06;
let Wn = pa, Ns;
async function zu() {
  return Ns ?? (Ns = (async () => {
    var o;
    const t = document.createElement("canvas").getContext("webgl");
    if (!t)
      return "premultiply-alpha-on-upload";
    const n = await new Promise((a) => {
      const l = document.createElement("video");
      l.onloadeddata = () => a(l), l.onerror = () => a(null), l.autoplay = !1, l.crossOrigin = "anonymous", l.preload = "auto", l.src = "data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM=", l.load();
    });
    if (!n)
      return "premultiply-alpha-on-upload";
    const s = t.createTexture();
    t.bindTexture(t.TEXTURE_2D, s);
    const i = t.createFramebuffer();
    t.bindFramebuffer(t.FRAMEBUFFER, i), t.framebufferTexture2D(
      t.FRAMEBUFFER,
      t.COLOR_ATTACHMENT0,
      t.TEXTURE_2D,
      s,
      0
    ), t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL, t.NONE), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, n);
    const r = new Uint8Array(4);
    return t.readPixels(0, 0, 1, 1, t.RGBA, t.UNSIGNED_BYTE, r), t.deleteFramebuffer(i), t.deleteTexture(s), (o = t.getExtension("WEBGL_lose_context")) == null || o.loseContext(), r[0] <= r[3] ? "premultiplied-alpha" : "premultiply-alpha-on-upload";
  })()), Ns;
}
const ys = class ga extends be {
  constructor(t) {
    super(t), this.isReady = !1, this.uploadMethodId = "video", t = {
      ...ga.defaultOptions,
      ...t
    }, this._autoUpdate = !0, this._isConnectedToTicker = !1, this._updateFPS = t.updateFPS || 0, this._msToNextUpdate = 0, this.autoPlay = t.autoPlay !== !1, this.alphaMode = t.alphaMode ?? "premultiply-alpha-on-upload", this._videoFrameRequestCallback = this._videoFrameRequestCallback.bind(this), this._videoFrameRequestCallbackHandle = null, this._load = null, this._resolve = null, this._reject = null, this._onCanPlay = this._onCanPlay.bind(this), this._onCanPlayThrough = this._onCanPlayThrough.bind(this), this._onError = this._onError.bind(this), this._onPlayStart = this._onPlayStart.bind(this), this._onPlayStop = this._onPlayStop.bind(this), this._onSeeked = this._onSeeked.bind(this), t.autoLoad !== !1 && this.load();
  }
  /** Update the video frame if the source is not destroyed and meets certain conditions. */
  updateFrame() {
    if (!this.destroyed) {
      if (this._updateFPS) {
        const t = Wn.shared.elapsedMS * this.resource.playbackRate;
        this._msToNextUpdate = Math.floor(this._msToNextUpdate - t);
      }
      (!this._updateFPS || this._msToNextUpdate <= 0) && (this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0), this.isValid && this.update();
    }
  }
  /** Callback to update the video frame and potentially request the next frame update. */
  _videoFrameRequestCallback() {
    this.updateFrame(), this.destroyed ? this._videoFrameRequestCallbackHandle = null : this._videoFrameRequestCallbackHandle = this.resource.requestVideoFrameCallback(
      this._videoFrameRequestCallback
    );
  }
  /**
   * Checks if the resource has valid dimensions.
   * @returns {boolean} True if width and height are set, otherwise false.
   */
  get isValid() {
    return !!this.resource.videoWidth && !!this.resource.videoHeight;
  }
  /**
   * Start preloading the video resource.
   * @returns {Promise<this>} Handle the validate event
   */
  async load() {
    if (this._load)
      return this._load;
    const t = this.resource, n = this.options;
    return (t.readyState === t.HAVE_ENOUGH_DATA || t.readyState === t.HAVE_FUTURE_DATA) && t.width && t.height && (t.complete = !0), t.addEventListener("play", this._onPlayStart), t.addEventListener("pause", this._onPlayStop), t.addEventListener("seeked", this._onSeeked), this._isSourceReady() ? this._mediaReady() : (n.preload || t.addEventListener("canplay", this._onCanPlay), t.addEventListener("canplaythrough", this._onCanPlayThrough), t.addEventListener("error", this._onError, !0)), this.alphaMode = await zu(), this._load = new Promise((s, i) => {
      this.isValid ? s(this) : (this._resolve = s, this._reject = i, n.preloadTimeoutMs !== void 0 && (this._preloadTimeout = setTimeout(() => {
        this._onError(new ErrorEvent(`Preload exceeded timeout of ${n.preloadTimeoutMs}ms`));
      })), t.load());
    }), this._load;
  }
  /**
   * Handle video error events.
   * @param event - The error event
   */
  _onError(t) {
    this.resource.removeEventListener("error", this._onError, !0), this.emit("error", t), this._reject && (this._reject(t), this._reject = null, this._resolve = null);
  }
  /**
   * Checks if the underlying source is playing.
   * @returns True if playing.
   */
  _isSourcePlaying() {
    const t = this.resource;
    return !t.paused && !t.ended;
  }
  /**
   * Checks if the underlying source is ready for playing.
   * @returns True if ready.
   */
  _isSourceReady() {
    return this.resource.readyState > 2;
  }
  /** Runs the update loop when the video is ready to play. */
  _onPlayStart() {
    this.isValid || this._mediaReady(), this._configureAutoUpdate();
  }
  /** Stops the update loop when a pause event is triggered. */
  _onPlayStop() {
    this._configureAutoUpdate();
  }
  /** Handles behavior when the video completes seeking to the current playback position. */
  _onSeeked() {
    this._autoUpdate && !this._isSourcePlaying() && (this._msToNextUpdate = 0, this.updateFrame(), this._msToNextUpdate = 0);
  }
  _onCanPlay() {
    this.resource.removeEventListener("canplay", this._onCanPlay), this._mediaReady();
  }
  _onCanPlayThrough() {
    this.resource.removeEventListener("canplaythrough", this._onCanPlay), this._preloadTimeout && (clearTimeout(this._preloadTimeout), this._preloadTimeout = void 0), this._mediaReady();
  }
  /** Fired when the video is loaded and ready to play. */
  _mediaReady() {
    const t = this.resource;
    this.isValid && (this.isReady = !0, this.resize(t.videoWidth, t.videoHeight)), this._msToNextUpdate = 0, this.updateFrame(), this._msToNextUpdate = 0, this._resolve && (this._resolve(this), this._resolve = null, this._reject = null), this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && this.resource.play();
  }
  /** Cleans up resources and event listeners associated with this texture. */
  destroy() {
    this._configureAutoUpdate();
    const t = this.resource;
    t && (t.removeEventListener("play", this._onPlayStart), t.removeEventListener("pause", this._onPlayStop), t.removeEventListener("seeked", this._onSeeked), t.removeEventListener("canplay", this._onCanPlay), t.removeEventListener("canplaythrough", this._onCanPlayThrough), t.removeEventListener("error", this._onError, !0), t.pause(), t.src = "", t.load()), super.destroy();
  }
  /** Should the base texture automatically update itself, set to true by default. */
  get autoUpdate() {
    return this._autoUpdate;
  }
  set autoUpdate(t) {
    t !== this._autoUpdate && (this._autoUpdate = t, this._configureAutoUpdate());
  }
  /**
   * How many times a second to update the texture from the video.
   * Leave at 0 to update at every render.
   * A lower fps can help performance, as updating the texture at 60fps on a 30ps video may not be efficient.
   */
  get updateFPS() {
    return this._updateFPS;
  }
  set updateFPS(t) {
    t !== this._updateFPS && (this._updateFPS = t, this._configureAutoUpdate());
  }
  /**
   * Configures the updating mechanism based on the current state and settings.
   *
   * This method decides between using the browser's native video frame callback or a custom ticker
   * for updating the video frame. It ensures optimal performance and responsiveness
   * based on the video's state, playback status, and the desired frames-per-second setting.
   *
   * - If `_autoUpdate` is enabled and the video source is playing:
   *   - It will prefer the native video frame callback if available and no specific FPS is set.
   *   - Otherwise, it will use a custom ticker for manual updates.
   * - If `_autoUpdate` is disabled or the video isn't playing, any active update mechanisms are halted.
   */
  _configureAutoUpdate() {
    this._autoUpdate && this._isSourcePlaying() ? !this._updateFPS && this.resource.requestVideoFrameCallback ? (this._isConnectedToTicker && (Wn.shared.remove(this.updateFrame, this), this._isConnectedToTicker = !1, this._msToNextUpdate = 0), this._videoFrameRequestCallbackHandle === null && (this._videoFrameRequestCallbackHandle = this.resource.requestVideoFrameCallback(
      this._videoFrameRequestCallback
    ))) : (this._videoFrameRequestCallbackHandle !== null && (this.resource.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle), this._videoFrameRequestCallbackHandle = null), this._isConnectedToTicker || (Wn.shared.add(this.updateFrame, this), this._isConnectedToTicker = !0, this._msToNextUpdate = 0)) : (this._videoFrameRequestCallbackHandle !== null && (this.resource.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle), this._videoFrameRequestCallbackHandle = null), this._isConnectedToTicker && (Wn.shared.remove(this.updateFrame, this), this._isConnectedToTicker = !1, this._msToNextUpdate = 0));
  }
  static test(t) {
    return globalThis.HTMLVideoElement && t instanceof HTMLVideoElement || globalThis.VideoFrame && t instanceof VideoFrame;
  }
};
ys.extension = ft.TextureSource;
ys.defaultOptions = {
  ...be.defaultOptions,
  /** If true, the video will start loading immediately. */
  autoLoad: !0,
  /** If true, the video will start playing as soon as it is loaded. */
  autoPlay: !0,
  /** The number of times a second to update the texture from the video. Leave at 0 to update at every render. */
  updateFPS: 0,
  /** If true, the video will be loaded with the `crossorigin` attribute. */
  crossorigin: !0,
  /** If true, the video will loop when it ends. */
  loop: !1,
  /** If true, the video will be muted. */
  muted: !0,
  /** If true, the video will play inline. */
  playsinline: !0,
  /** If true, the video will be preloaded. */
  preload: !1
};
ys.MIME_TYPES = {
  ogv: "video/ogg",
  mov: "video/quicktime",
  m4v: "video/mp4"
};
let Wu = ys;
const ze = (e, t, n = !1) => (Array.isArray(e) || (e = [e]), t ? e.map((s) => typeof s == "string" || n ? t(s) : s) : e);
class ju {
  constructor() {
    this._parsers = [], this._cache = /* @__PURE__ */ new Map(), this._cacheMap = /* @__PURE__ */ new Map();
  }
  /** Clear all entries. */
  reset() {
    this._cacheMap.clear(), this._cache.clear();
  }
  /**
   * Check if the key exists
   * @param key - The key to check
   */
  has(t) {
    return this._cache.has(t);
  }
  /**
   * Fetch entry by key
   * @param key - The key of the entry to get
   */
  get(t) {
    const n = this._cache.get(t);
    return n || ue(`[Assets] Asset id ${t} was not found in the Cache`), n;
  }
  /**
   * Set a value by key or keys name
   * @param key - The key or keys to set
   * @param value - The value to store in the cache or from which cacheable assets will be derived.
   */
  set(t, n) {
    const s = ze(t);
    let i;
    for (let l = 0; l < this.parsers.length; l++) {
      const h = this.parsers[l];
      if (h.test(n)) {
        i = h.getCacheableAssets(s, n);
        break;
      }
    }
    const r = new Map(Object.entries(i || {}));
    i || s.forEach((l) => {
      r.set(l, n);
    });
    const o = [...r.keys()], a = {
      cacheKeys: o,
      keys: s
    };
    s.forEach((l) => {
      this._cacheMap.set(l, a);
    }), o.forEach((l) => {
      const h = i ? i[l] : n;
      this._cache.has(l) && this._cache.get(l) !== h && ue("[Cache] already has key:", l), this._cache.set(l, r.get(l));
    });
  }
  /**
   * Remove entry by key
   *
   * This function will also remove any associated alias from the cache also.
   * @param key - The key of the entry to remove
   */
  remove(t) {
    if (!this._cacheMap.has(t)) {
      ue(`[Assets] Asset id ${t} was not found in the Cache`);
      return;
    }
    const n = this._cacheMap.get(t);
    n.cacheKeys.forEach((i) => {
      this._cache.delete(i);
    }), n.keys.forEach((i) => {
      this._cacheMap.delete(i);
    });
  }
  /** All loader parsers registered */
  get parsers() {
    return this._parsers;
  }
}
const We = new ju(), li = [];
an.handleByList(ft.TextureSource, li);
function qu(e = {}) {
  const t = e && e.resource, n = t ? e.resource : e, s = t ? e : { resource: e };
  for (let i = 0; i < li.length; i++) {
    const r = li[i];
    if (r.test(n))
      return new r(s);
  }
  throw new Error(`Could not find a source type for resource: ${s.resource}`);
}
function Zu(e = {}, t = !1) {
  const n = e && e.resource, s = n ? e.resource : e, i = n ? e : { resource: e };
  if (!t && We.has(s))
    return We.get(s);
  const r = new st({ source: qu(i) });
  return r.on("destroy", () => {
    We.has(s) && We.remove(s);
  }), t || We.set(s, r), r;
}
function Ku(e, t = !1) {
  return typeof e == "string" ? We.get(e) : e instanceof be ? new st({ source: e }) : Zu(e, t);
}
st.from = Ku;
an.add(ua, da, fa, Wu, Pi, ma, Ei);
var ya = /* @__PURE__ */ ((e) => (e[e.Low = 0] = "Low", e[e.Normal = 1] = "Normal", e[e.High = 2] = "High", e))(ya || {});
function jt(e) {
  if (typeof e != "string")
    throw new TypeError(`Path must be a string. Received ${JSON.stringify(e)}`);
}
function hn(e) {
  return e.split("?")[0].split("#")[0];
}
function Qu(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Ju(e, t, n) {
  return e.replace(new RegExp(Qu(t), "g"), n);
}
function td(e, t) {
  let n = "", s = 0, i = -1, r = 0, o = -1;
  for (let a = 0; a <= e.length; ++a) {
    if (a < e.length)
      o = e.charCodeAt(a);
    else {
      if (o === 47)
        break;
      o = 47;
    }
    if (o === 47) {
      if (!(i === a - 1 || r === 1))
        if (i !== a - 1 && r === 2) {
          if (n.length < 2 || s !== 2 || n.charCodeAt(n.length - 1) !== 46 || n.charCodeAt(n.length - 2) !== 46) {
            if (n.length > 2) {
              const l = n.lastIndexOf("/");
              if (l !== n.length - 1) {
                l === -1 ? (n = "", s = 0) : (n = n.slice(0, l), s = n.length - 1 - n.lastIndexOf("/")), i = a, r = 0;
                continue;
              }
            } else if (n.length === 2 || n.length === 1) {
              n = "", s = 0, i = a, r = 0;
              continue;
            }
          }
        } else
          n.length > 0 ? n += `/${e.slice(i + 1, a)}` : n = e.slice(i + 1, a), s = a - i - 1;
      i = a, r = 0;
    } else
      o === 46 && r !== -1 ? ++r : r = -1;
  }
  return n;
}
const Bn = {
  /**
   * Converts a path to posix format.
   * @param path - The path to convert to posix
   */
  toPosix(e) {
    return Ju(e, "\\", "/");
  },
  /**
   * Checks if the path is a URL e.g. http://, https://
   * @param path - The path to check
   */
  isUrl(e) {
    return /^https?:/.test(this.toPosix(e));
  },
  /**
   * Checks if the path is a data URL
   * @param path - The path to check
   */
  isDataUrl(e) {
    return /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(e);
  },
  /**
   * Checks if the path is a blob URL
   * @param path - The path to check
   */
  isBlobUrl(e) {
    return e.startsWith("blob:");
  },
  /**
   * Checks if the path has a protocol e.g. http://, https://, file:///, data:, blob:, C:/
   * This will return true for windows file paths
   * @param path - The path to check
   */
  hasProtocol(e) {
    return /^[^/:]+:/.test(this.toPosix(e));
  },
  /**
   * Returns the protocol of the path e.g. http://, https://, file:///, data:, blob:, C:/
   * @param path - The path to get the protocol from
   */
  getProtocol(e) {
    jt(e), e = this.toPosix(e);
    const t = /^file:\/\/\//.exec(e);
    if (t)
      return t[0];
    const n = /^[^/:]+:\/{0,2}/.exec(e);
    return n ? n[0] : "";
  },
  /**
   * Converts URL to an absolute path.
   * When loading from a Web Worker, we must use absolute paths.
   * If the URL is already absolute we return it as is
   * If it's not, we convert it
   * @param url - The URL to test
   * @param customBaseUrl - The base URL to use
   * @param customRootUrl - The root URL to use
   */
  toAbsolute(e, t, n) {
    if (jt(e), this.isDataUrl(e) || this.isBlobUrl(e))
      return e;
    const s = hn(this.toPosix(t ?? Oe.get().getBaseUrl())), i = hn(this.toPosix(n ?? this.rootname(s)));
    return e = this.toPosix(e), e.startsWith("/") ? Bn.join(i, e.slice(1)) : this.isAbsolute(e) ? e : this.join(s, e);
  },
  /**
   * Normalizes the given path, resolving '..' and '.' segments
   * @param path - The path to normalize
   */
  normalize(e) {
    if (jt(e), e.length === 0)
      return ".";
    if (this.isDataUrl(e) || this.isBlobUrl(e))
      return e;
    e = this.toPosix(e);
    let t = "";
    const n = e.startsWith("/");
    this.hasProtocol(e) && (t = this.rootname(e), e = e.slice(t.length));
    const s = e.endsWith("/");
    return e = td(e), e.length > 0 && s && (e += "/"), n ? `/${e}` : t + e;
  },
  /**
   * Determines if path is an absolute path.
   * Absolute paths can be urls, data urls, or paths on disk
   * @param path - The path to test
   */
  isAbsolute(e) {
    return jt(e), e = this.toPosix(e), this.hasProtocol(e) ? !0 : e.startsWith("/");
  },
  /**
   * Joins all given path segments together using the platform-specific separator as a delimiter,
   * then normalizes the resulting path
   * @param segments - The segments of the path to join
   */
  join(...e) {
    if (e.length === 0)
      return ".";
    let t;
    for (let n = 0; n < e.length; ++n) {
      const s = e[n];
      if (jt(s), s.length > 0)
        if (t === void 0)
          t = s;
        else {
          const i = e[n - 1] ?? "";
          this.joinExtensions.includes(this.extname(i).toLowerCase()) ? t += `/../${s}` : t += `/${s}`;
        }
    }
    return t === void 0 ? "." : this.normalize(t);
  },
  /**
   * Returns the directory name of a path
   * @param path - The path to parse
   */
  dirname(e) {
    if (jt(e), e.length === 0)
      return ".";
    e = this.toPosix(e);
    let t = e.charCodeAt(0);
    const n = t === 47;
    let s = -1, i = !0;
    const r = this.getProtocol(e), o = e;
    e = e.slice(r.length);
    for (let a = e.length - 1; a >= 1; --a)
      if (t = e.charCodeAt(a), t === 47) {
        if (!i) {
          s = a;
          break;
        }
      } else
        i = !1;
    return s === -1 ? n ? "/" : this.isUrl(o) ? r + e : r : n && s === 1 ? "//" : r + e.slice(0, s);
  },
  /**
   * Returns the root of the path e.g. /, C:/, file:///, http://domain.com/
   * @param path - The path to parse
   */
  rootname(e) {
    jt(e), e = this.toPosix(e);
    let t = "";
    if (e.startsWith("/") ? t = "/" : t = this.getProtocol(e), this.isUrl(e)) {
      const n = e.indexOf("/", t.length);
      n !== -1 ? t = e.slice(0, n) : t = e, t.endsWith("/") || (t += "/");
    }
    return t;
  },
  /**
   * Returns the last portion of a path
   * @param path - The path to test
   * @param ext - Optional extension to remove
   */
  basename(e, t) {
    jt(e), t && jt(t), e = hn(this.toPosix(e));
    let n = 0, s = -1, i = !0, r;
    if (t !== void 0 && t.length > 0 && t.length <= e.length) {
      if (t.length === e.length && t === e)
        return "";
      let o = t.length - 1, a = -1;
      for (r = e.length - 1; r >= 0; --r) {
        const l = e.charCodeAt(r);
        if (l === 47) {
          if (!i) {
            n = r + 1;
            break;
          }
        } else
          a === -1 && (i = !1, a = r + 1), o >= 0 && (l === t.charCodeAt(o) ? --o === -1 && (s = r) : (o = -1, s = a));
      }
      return n === s ? s = a : s === -1 && (s = e.length), e.slice(n, s);
    }
    for (r = e.length - 1; r >= 0; --r)
      if (e.charCodeAt(r) === 47) {
        if (!i) {
          n = r + 1;
          break;
        }
      } else
        s === -1 && (i = !1, s = r + 1);
    return s === -1 ? "" : e.slice(n, s);
  },
  /**
   * Returns the extension of the path, from the last occurrence of the . (period) character to end of string in the last
   * portion of the path. If there is no . in the last portion of the path, or if there are no . characters other than
   * the first character of the basename of path, an empty string is returned.
   * @param path - The path to parse
   */
  extname(e) {
    jt(e), e = hn(this.toPosix(e));
    let t = -1, n = 0, s = -1, i = !0, r = 0;
    for (let o = e.length - 1; o >= 0; --o) {
      const a = e.charCodeAt(o);
      if (a === 47) {
        if (!i) {
          n = o + 1;
          break;
        }
        continue;
      }
      s === -1 && (i = !1, s = o + 1), a === 46 ? t === -1 ? t = o : r !== 1 && (r = 1) : t !== -1 && (r = -1);
    }
    return t === -1 || s === -1 || r === 0 || r === 1 && t === s - 1 && t === n + 1 ? "" : e.slice(t, s);
  },
  /**
   * Parses a path into an object containing the 'root', `dir`, `base`, `ext`, and `name` properties.
   * @param path - The path to parse
   */
  parse(e) {
    jt(e);
    const t = { root: "", dir: "", base: "", ext: "", name: "" };
    if (e.length === 0)
      return t;
    e = hn(this.toPosix(e));
    let n = e.charCodeAt(0);
    const s = this.isAbsolute(e);
    let i;
    t.root = this.rootname(e), s || this.hasProtocol(e) ? i = 1 : i = 0;
    let r = -1, o = 0, a = -1, l = !0, h = e.length - 1, c = 0;
    for (; h >= i; --h) {
      if (n = e.charCodeAt(h), n === 47) {
        if (!l) {
          o = h + 1;
          break;
        }
        continue;
      }
      a === -1 && (l = !1, a = h + 1), n === 46 ? r === -1 ? r = h : c !== 1 && (c = 1) : r !== -1 && (c = -1);
    }
    return r === -1 || a === -1 || c === 0 || c === 1 && r === a - 1 && r === o + 1 ? a !== -1 && (o === 0 && s ? t.base = t.name = e.slice(1, a) : t.base = t.name = e.slice(o, a)) : (o === 0 && s ? (t.name = e.slice(1, r), t.base = e.slice(1, a)) : (t.name = e.slice(o, r), t.base = e.slice(o, a)), t.ext = e.slice(r, a)), t.dir = this.dirname(e), t;
  },
  sep: "/",
  delimiter: ":",
  joinExtensions: [".html"]
};
function _a(e, t, n, s, i) {
  const r = t[n];
  for (let o = 0; o < r.length; o++) {
    const a = r[o];
    n < t.length - 1 ? _a(e.replace(s[n], a), t, n + 1, s, i) : i.push(e.replace(s[n], a));
  }
}
function ed(e) {
  const t = /\{(.*?)\}/g, n = e.match(t), s = [];
  if (n) {
    const i = [];
    n.forEach((r) => {
      const o = r.substring(1, r.length - 1).split(",");
      i.push(o);
    }), _a(e, i, 0, n, s);
  } else
    s.push(e);
  return s;
}
const Rr = (e) => !Array.isArray(e);
class xa {
  constructor() {
    this._defaultBundleIdentifierOptions = {
      connector: "-",
      createBundleAssetId: (t, n) => `${t}${this._bundleIdConnector}${n}`,
      extractAssetIdFromBundle: (t, n) => n.replace(`${t}${this._bundleIdConnector}`, "")
    }, this._bundleIdConnector = this._defaultBundleIdentifierOptions.connector, this._createBundleAssetId = this._defaultBundleIdentifierOptions.createBundleAssetId, this._extractAssetIdFromBundle = this._defaultBundleIdentifierOptions.extractAssetIdFromBundle, this._assetMap = {}, this._preferredOrder = [], this._parsers = [], this._resolverHash = {}, this._bundles = {};
  }
  /**
   * Override how the resolver deals with generating bundle ids.
   * must be called before any bundles are added
   * @param bundleIdentifier - the bundle identifier options
   */
  setBundleIdentifier(t) {
    if (this._bundleIdConnector = t.connector ?? this._bundleIdConnector, this._createBundleAssetId = t.createBundleAssetId ?? this._createBundleAssetId, this._extractAssetIdFromBundle = t.extractAssetIdFromBundle ?? this._extractAssetIdFromBundle, this._extractAssetIdFromBundle("foo", this._createBundleAssetId("foo", "bar")) !== "bar")
      throw new Error("[Resolver] GenerateBundleAssetId are not working correctly");
  }
  /**
   * Let the resolver know which assets you prefer to use when resolving assets.
   * Multiple prefer user defined rules can be added.
   * @example
   * resolver.prefer({
   *     // first look for something with the correct format, and then then correct resolution
   *     priority: ['format', 'resolution'],
   *     params:{
   *         format:'webp', // prefer webp images
   *         resolution: 2, // prefer a resolution of 2
   *     }
   * })
   * resolver.add('foo', ['bar@2x.webp', 'bar@2x.png', 'bar.webp', 'bar.png']);
   * resolver.resolveUrl('foo') // => 'bar@2x.webp'
   * @param preferOrders - the prefer options
   */
  prefer(...t) {
    t.forEach((n) => {
      this._preferredOrder.push(n), n.priority || (n.priority = Object.keys(n.params));
    }), this._resolverHash = {};
  }
  /**
   * Set the base path to prepend to all urls when resolving
   * @example
   * resolver.basePath = 'https://home.com/';
   * resolver.add('foo', 'bar.ong');
   * resolver.resolveUrl('foo', 'bar.png'); // => 'https://home.com/bar.png'
   * @param basePath - the base path to use
   */
  set basePath(t) {
    this._basePath = t;
  }
  get basePath() {
    return this._basePath;
  }
  /**
   * Set the root path for root-relative URLs. By default the `basePath`'s root is used. If no `basePath` is set, then the
   * default value for browsers is `window.location.origin`
   * @example
   * // Application hosted on https://home.com/some-path/index.html
   * resolver.basePath = 'https://home.com/some-path/';
   * resolver.rootPath = 'https://home.com/';
   * resolver.add('foo', '/bar.png');
   * resolver.resolveUrl('foo', '/bar.png'); // => 'https://home.com/bar.png'
   * @param rootPath - the root path to use
   */
  set rootPath(t) {
    this._rootPath = t;
  }
  get rootPath() {
    return this._rootPath;
  }
  /**
   * All the active URL parsers that help the parser to extract information and create
   * an asset object-based on parsing the URL itself.
   *
   * Can be added using the extensions API
   * @example
   * resolver.add('foo', [
   *     {
   *         resolution: 2,
   *         format: 'png',
   *         src: 'image@2x.png',
   *     },
   *     {
   *         resolution:1,
   *         format:'png',
   *         src: 'image.png',
   *     },
   * ]);
   *
   * // With a url parser the information such as resolution and file format could extracted from the url itself:
   * extensions.add({
   *     extension: ExtensionType.ResolveParser,
   *     test: loadTextures.test, // test if url ends in an image
   *     parse: (value: string) =>
   *     ({
   *         resolution: parseFloat(Resolver.RETINA_PREFIX.exec(value)?.[1] ?? '1'),
   *         format: value.split('.').pop(),
   *         src: value,
   *     }),
   * });
   *
   * // Now resolution and format can be extracted from the url
   * resolver.add('foo', [
   *     'image@2x.png',
   *     'image.png',
   * ]);
   */
  get parsers() {
    return this._parsers;
  }
  /** Used for testing, this resets the resolver to its initial state */
  reset() {
    this.setBundleIdentifier(this._defaultBundleIdentifierOptions), this._assetMap = {}, this._preferredOrder = [], this._resolverHash = {}, this._rootPath = null, this._basePath = null, this._manifest = null, this._bundles = {}, this._defaultSearchParams = null;
  }
  /**
   * Sets the default URL search parameters for the URL resolver. The urls can be specified as a string or an object.
   * @param searchParams - the default url parameters to append when resolving urls
   */
  setDefaultSearchParams(t) {
    if (typeof t == "string")
      this._defaultSearchParams = t;
    else {
      const n = t;
      this._defaultSearchParams = Object.keys(n).map((s) => `${encodeURIComponent(s)}=${encodeURIComponent(n[s])}`).join("&");
    }
  }
  /**
   * Returns the aliases for a given asset
   * @param asset - the asset to get the aliases for
   */
  getAlias(t) {
    const { alias: n, src: s } = t;
    return ze(
      n || s,
      (r) => typeof r == "string" ? r : Array.isArray(r) ? r.map((o) => (o == null ? void 0 : o.src) ?? o) : r != null && r.src ? r.src : r,
      !0
    );
  }
  /**
   * Add a manifest to the asset resolver. This is a nice way to add all the asset information in one go.
   * generally a manifest would be built using a tool.
   * @param manifest - the manifest to add to the resolver
   */
  addManifest(t) {
    this._manifest && ue("[Resolver] Manifest already exists, this will be overwritten"), this._manifest = t, t.bundles.forEach((n) => {
      this.addBundle(n.name, n.assets);
    });
  }
  /**
   * This adds a bundle of assets in one go so that you can resolve them as a group.
   * For example you could add a bundle for each screen in you pixi app
   * @example
   * resolver.addBundle('animals', [
   *  { alias: 'bunny', src: 'bunny.png' },
   *  { alias: 'chicken', src: 'chicken.png' },
   *  { alias: 'thumper', src: 'thumper.png' },
   * ]);
   * // or
   * resolver.addBundle('animals', {
   *     bunny: 'bunny.png',
   *     chicken: 'chicken.png',
   *     thumper: 'thumper.png',
   * });
   *
   * const resolvedAssets = await resolver.resolveBundle('animals');
   * @param bundleId - The id of the bundle to add
   * @param assets - A record of the asset or assets that will be chosen from when loading via the specified key
   */
  addBundle(t, n) {
    const s = [];
    let i = n;
    Array.isArray(n) || (i = Object.entries(n).map(([r, o]) => typeof o == "string" || Array.isArray(o) ? { alias: r, src: o } : { alias: r, ...o })), i.forEach((r) => {
      const o = r.src, a = r.alias;
      let l;
      if (typeof a == "string") {
        const h = this._createBundleAssetId(t, a);
        s.push(h), l = [a, h];
      } else {
        const h = a.map((c) => this._createBundleAssetId(t, c));
        s.push(...h), l = [...a, ...h];
      }
      this.add({
        ...r,
        alias: l,
        src: o
      });
    }), this._bundles[t] = s;
  }
  /**
   * Tells the resolver what keys are associated with witch asset.
   * The most important thing the resolver does
   * @example
   * // Single key, single asset:
   * resolver.add({alias: 'foo', src: 'bar.png');
   * resolver.resolveUrl('foo') // => 'bar.png'
   *
   * // Multiple keys, single asset:
   * resolver.add({alias: ['foo', 'boo'], src: 'bar.png'});
   * resolver.resolveUrl('foo') // => 'bar.png'
   * resolver.resolveUrl('boo') // => 'bar.png'
   *
   * // Multiple keys, multiple assets:
   * resolver.add({alias: ['foo', 'boo'], src: ['bar.png', 'bar.webp']});
   * resolver.resolveUrl('foo') // => 'bar.png'
   *
   * // Add custom data attached to the resolver
   * Resolver.add({
   *     alias: 'bunnyBooBooSmooth',
   *     src: 'bunny{png,webp}',
   *     data: { scaleMode:SCALE_MODES.NEAREST }, // Base texture options
   * });
   *
   * resolver.resolve('bunnyBooBooSmooth') // => { src: 'bunny.png', data: { scaleMode: SCALE_MODES.NEAREST } }
   * @param aliases - the UnresolvedAsset or array of UnresolvedAssets to add to the resolver
   */
  add(t) {
    const n = [];
    Array.isArray(t) ? n.push(...t) : n.push(t);
    let s;
    s = (r) => {
      this.hasKey(r) && ue(`[Resolver] already has key: ${r} overwriting`);
    }, ze(n).forEach((r) => {
      const { src: o } = r;
      let { data: a, format: l, loadParser: h } = r;
      const c = ze(o).map((f) => typeof f == "string" ? ed(f) : Array.isArray(f) ? f : [f]), u = this.getAlias(r);
      Array.isArray(u) ? u.forEach(s) : s(u);
      const d = [];
      c.forEach((f) => {
        f.forEach((m) => {
          let g = {};
          if (typeof m != "object") {
            g.src = m;
            for (let p = 0; p < this._parsers.length; p++) {
              const y = this._parsers[p];
              if (y.test(m)) {
                g = y.parse(m);
                break;
              }
            }
          } else
            a = m.data ?? a, l = m.format ?? l, h = m.loadParser ?? h, g = {
              ...g,
              ...m
            };
          if (!u)
            throw new Error(`[Resolver] alias is undefined for this asset: ${g.src}`);
          g = this._buildResolvedAsset(g, {
            aliases: u,
            data: a,
            format: l,
            loadParser: h
          }), d.push(g);
        });
      }), u.forEach((f) => {
        this._assetMap[f] = d;
      });
    });
  }
  // TODO: this needs an overload like load did in Assets
  /**
   * If the resolver has had a manifest set via setManifest, this will return the assets urls for
   * a given bundleId or bundleIds.
   * @example
   * // Manifest Example
   * const manifest = {
   *     bundles: [
   *         {
   *             name: 'load-screen',
   *             assets: [
   *                 {
   *                     alias: 'background',
   *                     src: 'sunset.png',
   *                 },
   *                 {
   *                     alias: 'bar',
   *                     src: 'load-bar.{png,webp}',
   *                 },
   *             ],
   *         },
   *         {
   *             name: 'game-screen',
   *             assets: [
   *                 {
   *                     alias: 'character',
   *                     src: 'robot.png',
   *                 },
   *                 {
   *                     alias: 'enemy',
   *                     src: 'bad-guy.png',
   *                 },
   *             ],
   *         },
   *     ]
   * };
   *
   * resolver.setManifest(manifest);
   * const resolved = resolver.resolveBundle('load-screen');
   * @param bundleIds - The bundle ids to resolve
   * @returns All the bundles assets or a hash of assets for each bundle specified
   */
  resolveBundle(t) {
    const n = Rr(t);
    t = ze(t);
    const s = {};
    return t.forEach((i) => {
      const r = this._bundles[i];
      if (r) {
        const o = this.resolve(r), a = {};
        for (const l in o) {
          const h = o[l];
          a[this._extractAssetIdFromBundle(i, l)] = h;
        }
        s[i] = a;
      }
    }), n ? s[t[0]] : s;
  }
  /**
   * Does exactly what resolve does, but returns just the URL rather than the whole asset object
   * @param key - The key or keys to resolve
   * @returns - The URLs associated with the key(s)
   */
  resolveUrl(t) {
    const n = this.resolve(t);
    if (typeof t != "string") {
      const s = {};
      for (const i in n)
        s[i] = n[i].src;
      return s;
    }
    return n.src;
  }
  resolve(t) {
    const n = Rr(t);
    t = ze(t);
    const s = {};
    return t.forEach((i) => {
      if (!this._resolverHash[i])
        if (this._assetMap[i]) {
          let r = this._assetMap[i];
          const o = this._getPreferredOrder(r);
          o == null || o.priority.forEach((a) => {
            o.params[a].forEach((l) => {
              const h = r.filter((c) => c[a] ? c[a] === l : !1);
              h.length && (r = h);
            });
          }), this._resolverHash[i] = r[0];
        } else
          this._resolverHash[i] = this._buildResolvedAsset({
            alias: [i],
            src: i
          }, {});
      s[i] = this._resolverHash[i];
    }), n ? s[t[0]] : s;
  }
  /**
   * Checks if an asset with a given key exists in the resolver
   * @param key - The key of the asset
   */
  hasKey(t) {
    return !!this._assetMap[t];
  }
  /**
   * Checks if a bundle with the given key exists in the resolver
   * @param key - The key of the bundle
   */
  hasBundle(t) {
    return !!this._bundles[t];
  }
  /**
   * Internal function for figuring out what prefer criteria an asset should use.
   * @param assets
   */
  _getPreferredOrder(t) {
    for (let n = 0; n < t.length; n++) {
      const s = t[0], i = this._preferredOrder.find((r) => r.params.format.includes(s.format));
      if (i)
        return i;
    }
    return this._preferredOrder[0];
  }
  /**
   * Appends the default url parameters to the url
   * @param url - The url to append the default parameters to
   * @returns - The url with the default parameters appended
   */
  _appendDefaultSearchParams(t) {
    if (!this._defaultSearchParams)
      return t;
    const n = /\?/.test(t) ? "&" : "?";
    return `${t}${n}${this._defaultSearchParams}`;
  }
  _buildResolvedAsset(t, n) {
    const { aliases: s, data: i, loadParser: r, format: o } = n;
    return (this._basePath || this._rootPath) && (t.src = Bn.toAbsolute(t.src, this._basePath, this._rootPath)), t.alias = s ?? t.alias ?? [t.src], t.src = this._appendDefaultSearchParams(t.src), t.data = { ...i || {}, ...t.data }, t.loadParser = r ?? t.loadParser, t.format = o ?? t.format ?? nd(t.src), t;
  }
}
xa.RETINA_PREFIX = /@([0-9\.]+)x/;
function nd(e) {
  return e.split(".").pop().split("?").shift().split("#").shift();
}
const Or = (e, t) => {
  const n = t.split("?")[1];
  return n && (e += `?${n}`), e;
}, ba = class xn {
  /**
   * @param texture - Reference to the source BaseTexture object.
   * @param {object} data - Spritesheet image data.
   */
  constructor(t, n) {
    this.linkedSheets = [], this._texture = t instanceof st ? t : null, this.textureSource = t.source, this.textures = {}, this.animations = {}, this.data = n;
    const s = parseFloat(n.meta.scale);
    s ? (this.resolution = s, t.source.resolution = this.resolution) : this.resolution = t.source._resolution, this._frames = this.data.frames, this._frameKeys = Object.keys(this._frames), this._batchIndex = 0, this._callback = null;
  }
  /**
   * Parser spritesheet from loaded data. This is done asynchronously
   * to prevent creating too many Texture within a single process.
   */
  parse() {
    return new Promise((t) => {
      this._callback = t, this._batchIndex = 0, this._frameKeys.length <= xn.BATCH_SIZE ? (this._processFrames(0), this._processAnimations(), this._parseComplete()) : this._nextBatch();
    });
  }
  /**
   * Process a batch of frames
   * @param initialFrameIndex - The index of frame to start.
   */
  _processFrames(t) {
    let n = t;
    const s = xn.BATCH_SIZE;
    for (; n - t < s && n < this._frameKeys.length; ) {
      const i = this._frameKeys[n], r = this._frames[i], o = r.frame;
      if (o) {
        let a = null, l = null;
        const h = r.trimmed !== !1 && r.sourceSize ? r.sourceSize : r.frame, c = new wt(
          0,
          0,
          Math.floor(h.w) / this.resolution,
          Math.floor(h.h) / this.resolution
        );
        r.rotated ? a = new wt(
          Math.floor(o.x) / this.resolution,
          Math.floor(o.y) / this.resolution,
          Math.floor(o.h) / this.resolution,
          Math.floor(o.w) / this.resolution
        ) : a = new wt(
          Math.floor(o.x) / this.resolution,
          Math.floor(o.y) / this.resolution,
          Math.floor(o.w) / this.resolution,
          Math.floor(o.h) / this.resolution
        ), r.trimmed !== !1 && r.spriteSourceSize && (l = new wt(
          Math.floor(r.spriteSourceSize.x) / this.resolution,
          Math.floor(r.spriteSourceSize.y) / this.resolution,
          Math.floor(o.w) / this.resolution,
          Math.floor(o.h) / this.resolution
        )), this.textures[i] = new st({
          source: this.textureSource,
          frame: a,
          orig: c,
          trim: l,
          rotate: r.rotated ? 2 : 0,
          defaultAnchor: r.anchor,
          defaultBorders: r.borders,
          label: i.toString()
        });
      }
      n++;
    }
  }
  /** Parse animations config. */
  _processAnimations() {
    const t = this.data.animations || {};
    for (const n in t) {
      this.animations[n] = [];
      for (let s = 0; s < t[n].length; s++) {
        const i = t[n][s];
        this.animations[n].push(this.textures[i]);
      }
    }
  }
  /** The parse has completed. */
  _parseComplete() {
    const t = this._callback;
    this._callback = null, this._batchIndex = 0, t.call(this, this.textures);
  }
  /** Begin the next batch of textures. */
  _nextBatch() {
    this._processFrames(this._batchIndex * xn.BATCH_SIZE), this._batchIndex++, setTimeout(() => {
      this._batchIndex * xn.BATCH_SIZE < this._frameKeys.length ? this._nextBatch() : (this._processAnimations(), this._parseComplete());
    }, 0);
  }
  /**
   * Destroy Spritesheet and don't use after this.
   * @param {boolean} [destroyBase=false] - Whether to destroy the base texture as well
   */
  destroy(t = !1) {
    var n;
    for (const s in this.textures)
      this.textures[s].destroy();
    this._frames = null, this._frameKeys = null, this.data = null, this.textures = null, t && ((n = this._texture) == null || n.destroy(), this.textureSource.destroy()), this._texture = null, this.textureSource = null, this.linkedSheets = [];
  }
};
ba.BATCH_SIZE = 1e3;
let Yr = ba;
const sd = [
  "jpg",
  "png",
  "jpeg",
  "avif",
  "webp",
  "basis",
  "etc2",
  "bc7",
  "bc6h",
  "bc5",
  "bc4",
  "bc3",
  "bc2",
  "bc1",
  "eac",
  "astc"
];
function wa(e, t, n) {
  const s = {};
  if (e.forEach((i) => {
    s[i] = t;
  }), Object.keys(t.textures).forEach((i) => {
    s[i] = t.textures[i];
  }), !n) {
    const i = Bn.dirname(e[0]);
    t.linkedSheets.forEach((r, o) => {
      const a = wa([`${i}/${t.data.meta.related_multi_packs[o]}`], r, !0);
      Object.assign(s, a);
    });
  }
  return s;
}
const id = {
  extension: ft.Asset,
  /** Handle the caching of the related Spritesheet Textures */
  cache: {
    test: (e) => e instanceof Yr,
    getCacheableAssets: (e, t) => wa(e, t, !1)
  },
  /** Resolve the resolution of the asset. */
  resolver: {
    test: (e) => {
      const n = e.split("?")[0].split("."), s = n.pop(), i = n.pop();
      return s === "json" && sd.includes(i);
    },
    parse: (e) => {
      var n;
      const t = e.split(".");
      return {
        resolution: parseFloat(((n = xa.RETINA_PREFIX.exec(e)) == null ? void 0 : n[1]) ?? "1"),
        format: t[t.length - 2],
        src: e
      };
    }
  },
  /**
   * Loader plugin that parses sprite sheets!
   * once the JSON has been loaded this checks to see if the JSON is spritesheet data.
   * If it is, we load the spritesheets image and parse the data into Spritesheet
   * All textures in the sprite sheet are then added to the cache
   */
  loader: {
    name: "spritesheetLoader",
    extension: {
      type: ft.LoadParser,
      priority: ya.Normal
    },
    async testParse(e, t) {
      return Bn.extname(t.src).toLowerCase() === ".json" && !!e.frames;
    },
    async parse(e, t, n) {
      var h, c;
      const {
        texture: s,
        // if user need to use preloaded texture
        imageFilename: i
        // if user need to use custom filename (not from jsonFile.meta.image)
      } = (t == null ? void 0 : t.data) ?? {};
      let r = Bn.dirname(t.src);
      r && r.lastIndexOf("/") !== r.length - 1 && (r += "/");
      let o;
      if (s instanceof st)
        o = s;
      else {
        const u = Or(r + (i ?? e.meta.image), t.src);
        o = (await n.load([u]))[u];
      }
      const a = new Yr(
        o.source,
        e
      );
      await a.parse();
      const l = (h = e == null ? void 0 : e.meta) == null ? void 0 : h.related_multi_packs;
      if (Array.isArray(l)) {
        const u = [];
        for (const f of l) {
          if (typeof f != "string")
            continue;
          let m = r + f;
          (c = t.data) != null && c.ignoreMultiPack || (m = Or(m, t.src), u.push(n.load({
            src: m,
            data: {
              ignoreMultiPack: !0
            }
          })));
        }
        const d = await Promise.all(u);
        a.linkedSheets = d, d.forEach((f) => {
          f.linkedSheets = [a].concat(a.linkedSheets.filter((m) => m !== f));
        });
      }
      return a;
    },
    async unload(e, t, n) {
      await n.unload(e.textureSource._sourceOrigin), e.destroy(!1);
    }
  }
};
an.add(id);
class rd {
  /**
   * Create a new instance eof the Bind Group.
   * @param resources - The resources that are bound together for use by a shader.
   */
  constructor(t) {
    this.resources = /* @__PURE__ */ Object.create(null), this._dirty = !0;
    let n = 0;
    for (const s in t) {
      const i = t[s];
      this.setResource(i, n++);
    }
    this._updateKey();
  }
  /**
   * Updates the key if its flagged as dirty. This is used internally to
   * match this bind group to a WebGPU BindGroup.
   * @internal
   * @ignore
   */
  _updateKey() {
    if (!this._dirty)
      return;
    this._dirty = !1;
    const t = [];
    let n = 0;
    for (const s in this.resources)
      t[n++] = this.resources[s]._resourceId;
    this._key = t.join("|");
  }
  /**
   * Set a resource at a given index. this function will
   * ensure that listeners will be removed from the current resource
   * and added to the new resource.
   * @param resource - The resource to set.
   * @param index - The index to set the resource at.
   */
  setResource(t, n) {
    var i, r;
    const s = this.resources[n];
    t !== s && (s && ((i = t.off) == null || i.call(t, "change", this.onResourceChange, this)), (r = t.on) == null || r.call(t, "change", this.onResourceChange, this), this.resources[n] = t, this._dirty = !0);
  }
  /**
   * Returns the resource at the current specified index.
   * @param index - The index of the resource to get.
   * @returns - The resource at the specified index.
   */
  getResource(t) {
    return this.resources[t];
  }
  /**
   * Used internally to 'touch' each resource, to ensure that the GC
   * knows that all resources in this bind group are still being used.
   * @param tick - The current tick.
   * @internal
   * @ignore
   */
  _touch(t) {
    const n = this.resources;
    for (const s in n)
      n[s]._touched = t;
  }
  /** Destroys this bind group and removes all listeners. */
  destroy() {
    var n;
    const t = this.resources;
    for (const s in t) {
      const i = t[s];
      (n = i.off) == null || n.call(i, "change", this.onResourceChange, this);
    }
    this.resources = null;
  }
  onResourceChange(t) {
    if (this._dirty = !0, t.destroyed) {
      const n = this.resources;
      for (const s in n)
        n[s] === t && (n[s] = null);
    } else
      this._updateKey();
  }
}
const hi = [];
an.handleByNamedList(ft.Environment, hi);
async function od(e) {
  if (e)
    for (let t = 0; t < hi.length; t++) {
      const n = hi[t];
      if (n.value.test()) {
        await n.value.load();
        return;
      }
    }
}
let cn;
function ad() {
  if (typeof cn == "boolean")
    return cn;
  try {
    cn = new Function("param1", "param2", "param3", "return param1[param2] === param3;")({ a: "b" }, "a", "b") === !0;
  } catch {
    cn = !1;
  }
  return cn;
}
var ki = { exports: {} };
ki.exports = _s;
ki.exports.default = _s;
function _s(e, t, n) {
  n = n || 2;
  var s = t && t.length, i = s ? t[0] * n : e.length, r = va(e, 0, i, n, !0), o = [];
  if (!r || r.next === r.prev)
    return o;
  var a, l, h, c, u, d, f;
  if (s && (r = dd(e, t, r, n)), e.length > 80 * n) {
    a = h = e[0], l = c = e[1];
    for (var m = n; m < i; m += n)
      u = e[m], d = e[m + 1], u < a && (a = u), d < l && (l = d), u > h && (h = u), d > c && (c = d);
    f = Math.max(h - a, c - l), f = f !== 0 ? 32767 / f : 0;
  }
  return Rn(r, o, n, a, l, f, 0), o;
}
function va(e, t, n, s, i) {
  var r, o;
  if (i === di(e, t, n, s) > 0)
    for (r = t; r < n; r += s)
      o = Lr(r, e[r], e[r + 1], o);
  else
    for (r = n - s; r >= t; r -= s)
      o = Lr(r, e[r], e[r + 1], o);
  return o && xs(o, o.next) && (Yn(o), o = o.next), o;
}
function Ye(e, t) {
  if (!e)
    return e;
  t || (t = e);
  var n = e, s;
  do
    if (s = !1, !n.steiner && (xs(n, n.next) || ot(n.prev, n, n.next) === 0)) {
      if (Yn(n), n = t = n.prev, n === n.next)
        break;
      s = !0;
    } else
      n = n.next;
  while (s || n !== t);
  return t;
}
function Rn(e, t, n, s, i, r, o) {
  if (e) {
    !o && r && yd(e, s, i, r);
    for (var a = e, l, h; e.prev !== e.next; ) {
      if (l = e.prev, h = e.next, r ? hd(e, s, i, r) : ld(e)) {
        t.push(l.i / n | 0), t.push(e.i / n | 0), t.push(h.i / n | 0), Yn(e), e = h.next, a = h.next;
        continue;
      }
      if (e = h, e === a) {
        o ? o === 1 ? (e = cd(Ye(e), t, n), Rn(e, t, n, s, i, r, 2)) : o === 2 && ud(e, t, n, s, i, r) : Rn(Ye(e), t, n, s, i, r, 1);
        break;
      }
    }
  }
}
function ld(e) {
  var t = e.prev, n = e, s = e.next;
  if (ot(t, n, s) >= 0)
    return !1;
  for (var i = t.x, r = n.x, o = s.x, a = t.y, l = n.y, h = s.y, c = i < r ? i < o ? i : o : r < o ? r : o, u = a < l ? a < h ? a : h : l < h ? l : h, d = i > r ? i > o ? i : o : r > o ? r : o, f = a > l ? a > h ? a : h : l > h ? l : h, m = s.next; m !== t; ) {
    if (m.x >= c && m.x <= d && m.y >= u && m.y <= f && Ze(i, a, r, l, o, h, m.x, m.y) && ot(m.prev, m, m.next) >= 0)
      return !1;
    m = m.next;
  }
  return !0;
}
function hd(e, t, n, s) {
  var i = e.prev, r = e, o = e.next;
  if (ot(i, r, o) >= 0)
    return !1;
  for (var a = i.x, l = r.x, h = o.x, c = i.y, u = r.y, d = o.y, f = a < l ? a < h ? a : h : l < h ? l : h, m = c < u ? c < d ? c : d : u < d ? u : d, g = a > l ? a > h ? a : h : l > h ? l : h, p = c > u ? c > d ? c : d : u > d ? u : d, y = ci(f, m, t, n, s), x = ci(g, p, t, n, s), b = e.prevZ, _ = e.nextZ; b && b.z >= y && _ && _.z <= x; ) {
    if (b.x >= f && b.x <= g && b.y >= m && b.y <= p && b !== i && b !== o && Ze(a, c, l, u, h, d, b.x, b.y) && ot(b.prev, b, b.next) >= 0 || (b = b.prevZ, _.x >= f && _.x <= g && _.y >= m && _.y <= p && _ !== i && _ !== o && Ze(a, c, l, u, h, d, _.x, _.y) && ot(_.prev, _, _.next) >= 0))
      return !1;
    _ = _.nextZ;
  }
  for (; b && b.z >= y; ) {
    if (b.x >= f && b.x <= g && b.y >= m && b.y <= p && b !== i && b !== o && Ze(a, c, l, u, h, d, b.x, b.y) && ot(b.prev, b, b.next) >= 0)
      return !1;
    b = b.prevZ;
  }
  for (; _ && _.z <= x; ) {
    if (_.x >= f && _.x <= g && _.y >= m && _.y <= p && _ !== i && _ !== o && Ze(a, c, l, u, h, d, _.x, _.y) && ot(_.prev, _, _.next) >= 0)
      return !1;
    _ = _.nextZ;
  }
  return !0;
}
function cd(e, t, n) {
  var s = e;
  do {
    var i = s.prev, r = s.next.next;
    !xs(i, r) && Aa(i, s, s.next, r) && On(i, r) && On(r, i) && (t.push(i.i / n | 0), t.push(s.i / n | 0), t.push(r.i / n | 0), Yn(s), Yn(s.next), s = e = r), s = s.next;
  } while (s !== e);
  return Ye(s);
}
function ud(e, t, n, s, i, r) {
  var o = e;
  do {
    for (var a = o.next.next; a !== o.prev; ) {
      if (o.i !== a.i && bd(o, a)) {
        var l = Ma(o, a);
        o = Ye(o, o.next), l = Ye(l, l.next), Rn(o, t, n, s, i, r, 0), Rn(l, t, n, s, i, r, 0);
        return;
      }
      a = a.next;
    }
    o = o.next;
  } while (o !== e);
}
function dd(e, t, n, s) {
  var i = [], r, o, a, l, h;
  for (r = 0, o = t.length; r < o; r++)
    a = t[r] * s, l = r < o - 1 ? t[r + 1] * s : e.length, h = va(e, a, l, s, !1), h === h.next && (h.steiner = !0), i.push(xd(h));
  for (i.sort(fd), r = 0; r < i.length; r++)
    n = md(i[r], n);
  return n;
}
function fd(e, t) {
  return e.x - t.x;
}
function md(e, t) {
  var n = pd(e, t);
  if (!n)
    return t;
  var s = Ma(n, e);
  return Ye(s, s.next), Ye(n, n.next);
}
function pd(e, t) {
  var n = t, s = e.x, i = e.y, r = -1 / 0, o;
  do {
    if (i <= n.y && i >= n.next.y && n.next.y !== n.y) {
      var a = n.x + (i - n.y) * (n.next.x - n.x) / (n.next.y - n.y);
      if (a <= s && a > r && (r = a, o = n.x < n.next.x ? n : n.next, a === s))
        return o;
    }
    n = n.next;
  } while (n !== t);
  if (!o)
    return null;
  var l = o, h = o.x, c = o.y, u = 1 / 0, d;
  n = o;
  do
    s >= n.x && n.x >= h && s !== n.x && Ze(i < c ? s : r, i, h, c, i < c ? r : s, i, n.x, n.y) && (d = Math.abs(i - n.y) / (s - n.x), On(n, e) && (d < u || d === u && (n.x > o.x || n.x === o.x && gd(o, n))) && (o = n, u = d)), n = n.next;
  while (n !== l);
  return o;
}
function gd(e, t) {
  return ot(e.prev, e, t.prev) < 0 && ot(t.next, e, e.next) < 0;
}
function yd(e, t, n, s) {
  var i = e;
  do
    i.z === 0 && (i.z = ci(i.x, i.y, t, n, s)), i.prevZ = i.prev, i.nextZ = i.next, i = i.next;
  while (i !== e);
  i.prevZ.nextZ = null, i.prevZ = null, _d(i);
}
function _d(e) {
  var t, n, s, i, r, o, a, l, h = 1;
  do {
    for (n = e, e = null, r = null, o = 0; n; ) {
      for (o++, s = n, a = 0, t = 0; t < h && (a++, s = s.nextZ, !!s); t++)
        ;
      for (l = h; a > 0 || l > 0 && s; )
        a !== 0 && (l === 0 || !s || n.z <= s.z) ? (i = n, n = n.nextZ, a--) : (i = s, s = s.nextZ, l--), r ? r.nextZ = i : e = i, i.prevZ = r, r = i;
      n = s;
    }
    r.nextZ = null, h *= 2;
  } while (o > 1);
  return e;
}
function ci(e, t, n, s, i) {
  return e = (e - n) * i | 0, t = (t - s) * i | 0, e = (e | e << 8) & 16711935, e = (e | e << 4) & 252645135, e = (e | e << 2) & 858993459, e = (e | e << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, e | t << 1;
}
function xd(e) {
  var t = e, n = e;
  do
    (t.x < n.x || t.x === n.x && t.y < n.y) && (n = t), t = t.next;
  while (t !== e);
  return n;
}
function Ze(e, t, n, s, i, r, o, a) {
  return (i - o) * (t - a) >= (e - o) * (r - a) && (e - o) * (s - a) >= (n - o) * (t - a) && (n - o) * (r - a) >= (i - o) * (s - a);
}
function bd(e, t) {
  return e.next.i !== t.i && e.prev.i !== t.i && !wd(e, t) && // dones't intersect other edges
  (On(e, t) && On(t, e) && vd(e, t) && // locally visible
  (ot(e.prev, e, t.prev) || ot(e, t.prev, t)) || // does not create opposite-facing sectors
  xs(e, t) && ot(e.prev, e, e.next) > 0 && ot(t.prev, t, t.next) > 0);
}
function ot(e, t, n) {
  return (t.y - e.y) * (n.x - t.x) - (t.x - e.x) * (n.y - t.y);
}
function xs(e, t) {
  return e.x === t.x && e.y === t.y;
}
function Aa(e, t, n, s) {
  var i = qn(ot(e, t, n)), r = qn(ot(e, t, s)), o = qn(ot(n, s, e)), a = qn(ot(n, s, t));
  return !!(i !== r && o !== a || i === 0 && jn(e, n, t) || r === 0 && jn(e, s, t) || o === 0 && jn(n, e, s) || a === 0 && jn(n, t, s));
}
function jn(e, t, n) {
  return t.x <= Math.max(e.x, n.x) && t.x >= Math.min(e.x, n.x) && t.y <= Math.max(e.y, n.y) && t.y >= Math.min(e.y, n.y);
}
function qn(e) {
  return e > 0 ? 1 : e < 0 ? -1 : 0;
}
function wd(e, t) {
  var n = e;
  do {
    if (n.i !== e.i && n.next.i !== e.i && n.i !== t.i && n.next.i !== t.i && Aa(n, n.next, e, t))
      return !0;
    n = n.next;
  } while (n !== e);
  return !1;
}
function On(e, t) {
  return ot(e.prev, e, e.next) < 0 ? ot(e, t, e.next) >= 0 && ot(e, e.prev, t) >= 0 : ot(e, t, e.prev) < 0 || ot(e, e.next, t) < 0;
}
function vd(e, t) {
  var n = e, s = !1, i = (e.x + t.x) / 2, r = (e.y + t.y) / 2;
  do
    n.y > r != n.next.y > r && n.next.y !== n.y && i < (n.next.x - n.x) * (r - n.y) / (n.next.y - n.y) + n.x && (s = !s), n = n.next;
  while (n !== e);
  return s;
}
function Ma(e, t) {
  var n = new ui(e.i, e.x, e.y), s = new ui(t.i, t.x, t.y), i = e.next, r = t.prev;
  return e.next = t, t.prev = e, n.next = i, i.prev = n, s.next = n, n.prev = s, r.next = s, s.prev = r, s;
}
function Lr(e, t, n, s) {
  var i = new ui(e, t, n);
  return s ? (i.next = s.next, i.prev = s, s.next.prev = i, s.next = i) : (i.prev = i, i.next = i), i;
}
function Yn(e) {
  e.next.prev = e.prev, e.prev.next = e.next, e.prevZ && (e.prevZ.nextZ = e.nextZ), e.nextZ && (e.nextZ.prevZ = e.prevZ);
}
function ui(e, t, n) {
  this.i = e, this.x = t, this.y = n, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
}
_s.deviation = function(e, t, n, s) {
  var i = t && t.length, r = i ? t[0] * n : e.length, o = Math.abs(di(e, 0, r, n));
  if (i)
    for (var a = 0, l = t.length; a < l; a++) {
      var h = t[a] * n, c = a < l - 1 ? t[a + 1] * n : e.length;
      o -= Math.abs(di(e, h, c, n));
    }
  var u = 0;
  for (a = 0; a < s.length; a += 3) {
    var d = s[a] * n, f = s[a + 1] * n, m = s[a + 2] * n;
    u += Math.abs(
      (e[d] - e[m]) * (e[f + 1] - e[d + 1]) - (e[d] - e[f]) * (e[m + 1] - e[d + 1])
    );
  }
  return o === 0 && u === 0 ? 0 : Math.abs((u - o) / o);
};
function di(e, t, n, s) {
  for (var i = 0, r = t, o = n - s; r < n; r += s)
    i += (e[o] - e[r]) * (e[r + 1] + e[o + 1]), o = r;
  return i;
}
_s.flatten = function(e) {
  for (var t = e[0][0].length, n = { vertices: [], holes: [], dimensions: t }, s = 0, i = 0; i < e.length; i++) {
    for (var r = 0; r < e[i].length; r++)
      for (var o = 0; o < t; o++)
        n.vertices.push(e[i][r][o]);
    i > 0 && (s += e[i - 1].length, n.holes.push(s));
  }
  return n;
};
var Ad = ki.exports;
const Md = /* @__PURE__ */ Ti(Ad);
var Sa = /* @__PURE__ */ ((e) => (e[e.NONE = 0] = "NONE", e[e.COLOR = 16384] = "COLOR", e[e.STENCIL = 1024] = "STENCIL", e[e.DEPTH = 256] = "DEPTH", e[e.COLOR_DEPTH = 16640] = "COLOR_DEPTH", e[e.COLOR_STENCIL = 17408] = "COLOR_STENCIL", e[e.DEPTH_STENCIL = 1280] = "DEPTH_STENCIL", e[e.ALL = 17664] = "ALL", e))(Sa || {});
class Sd {
  /**
   * @param name - The function name that will be executed on the listeners added to this Runner.
   */
  constructor(t) {
    this.items = [], this._name = t;
  }
  /* eslint-disable jsdoc/require-param, jsdoc/check-param-names */
  /**
   * Dispatch/Broadcast Runner to all listeners added to the queue.
   * @param {...any} params - (optional) parameters to pass to each listener
   */
  /*  eslint-enable jsdoc/require-param, jsdoc/check-param-names */
  emit(t, n, s, i, r, o, a, l) {
    const { name: h, items: c } = this;
    for (let u = 0, d = c.length; u < d; u++)
      c[u][h](t, n, s, i, r, o, a, l);
    return this;
  }
  /**
   * Add a listener to the Runner
   *
   * Runners do not need to have scope or functions passed to them.
   * All that is required is to pass the listening object and ensure that it has contains a function that has the same name
   * as the name provided to the Runner when it was created.
   *
   * Eg A listener passed to this Runner will require a 'complete' function.
   *
   * ```
   * import { Runner } from 'pixi.js';
   *
   * const complete = new Runner('complete');
   * ```
   *
   * The scope used will be the object itself.
   * @param {any} item - The object that will be listening.
   */
  add(t) {
    return t[this._name] && (this.remove(t), this.items.push(t)), this;
  }
  /**
   * Remove a single listener from the dispatch queue.
   * @param {any} item - The listener that you would like to remove.
   */
  remove(t) {
    const n = this.items.indexOf(t);
    return n !== -1 && this.items.splice(n, 1), this;
  }
  /**
   * Check to see if the listener is already in the Runner
   * @param {any} item - The listener that you would like to check.
   */
  contains(t) {
    return this.items.indexOf(t) !== -1;
  }
  /** Remove all listeners from the Runner */
  removeAll() {
    return this.items.length = 0, this;
  }
  /** Remove all references, don't use after this. */
  destroy() {
    this.removeAll(), this.items = null, this._name = null;
  }
  /**
   * `true` if there are no this Runner contains no listeners
   * @readonly
   */
  get empty() {
    return this.items.length === 0;
  }
  /**
   * The name of the runner.
   * @readonly
   */
  get name() {
    return this._name;
  }
}
const Td = [
  "init",
  "destroy",
  "contextChange",
  "resolutionChange",
  "reset",
  "renderEnd",
  "renderStart",
  "render",
  "update",
  "postrender",
  "prerender"
], Ta = class Ea extends xe {
  /**
   * Set up a system with a collection of SystemClasses and runners.
   * Systems are attached dynamically to this class when added.
   * @param config - the config for the system manager
   */
  constructor(t) {
    super(), this.runners = /* @__PURE__ */ Object.create(null), this.renderPipes = /* @__PURE__ */ Object.create(null), this._initOptions = {}, this._systemsHash = /* @__PURE__ */ Object.create(null), this.type = t.type, this.name = t.name;
    const n = [...Td, ...t.runners ?? []];
    this._addRunners(...n), this._addSystems(t.systems), this._addPipes(t.renderPipes, t.renderPipeAdaptors), this._unsafeEvalCheck();
  }
  /**
   * Initialize the renderer.
   * @param options - The options to use to create the renderer.
   */
  async init(t = {}) {
    for (const n in this._systemsHash)
      t = { ...this._systemsHash[n].constructor.defaultOptions, ...t };
    t = { ...Ea.defaultOptions, ...t }, this._roundPixels = t.roundPixels ? 1 : 0;
    for (let n = 0; n < this.runners.init.items.length; n++)
      await this.runners.init.items[n].init(t);
    this._initOptions = t;
  }
  render(t, n) {
    let s = t;
    if (s instanceof It && (s = { container: s }, n && (xt(_t, "passing a second argument is deprecated, please use render options instead"), s.target = n.renderTexture)), s.target || (s.target = this.view.renderTarget), s.target === this.view.renderTarget && (this._lastObjectRendered = s.container, s.clearColor = this.background.colorRgba), s.clearColor) {
      const i = Array.isArray(s.clearColor) && s.clearColor.length === 4;
      s.clearColor = i ? s.clearColor : Pt.shared.setValue(s.clearColor).toArray();
    }
    s.transform || (s.container.updateLocalTransform(), s.transform = s.container.localTransform), this.runners.prerender.emit(s), this.runners.renderStart.emit(s), this.runners.render.emit(s), this.runners.renderEnd.emit(s), this.runners.postrender.emit(s);
  }
  /**
   * Resizes the WebGL view to the specified width and height.
   * @param desiredScreenWidth - The desired width of the screen.
   * @param desiredScreenHeight - The desired height of the screen.
   * @param resolution - The resolution / device pixel ratio of the renderer.
   */
  resize(t, n, s) {
    this.view.resize(t, n, s), this.emit("resize", this.view.screen.width, this.view.screen.height);
  }
  clear(t = {}) {
    const n = this;
    t.target || (t.target = n.renderTarget.renderTarget), t.clearColor || (t.clearColor = this.background.colorRgba), t.clear ?? (t.clear = Sa.ALL);
    const { clear: s, clearColor: i, target: r } = t;
    Pt.shared.setValue(i ?? this.background.colorRgba), n.renderTarget.clear(r, s, Pt.shared.toArray());
  }
  /** The resolution / device pixel ratio of the renderer. */
  get resolution() {
    return this.view.resolution;
  }
  set resolution(t) {
    this.view.resolution = t, this.runners.resolutionChange.emit(t);
  }
  /**
   * Same as view.width, actual number of pixels in the canvas by horizontal.
   * @member {number}
   * @readonly
   * @default 800
   */
  get width() {
    return this.view.texture.frame.width;
  }
  /**
   * Same as view.height, actual number of pixels in the canvas by vertical.
   * @default 600
   */
  get height() {
    return this.view.texture.frame.height;
  }
  // NOTE: this was `view` in v7
  /**
   * The canvas element that everything is drawn to.
   * @type {environment.ICanvas}
   */
  get canvas() {
    return this.view.canvas;
  }
  /**
   * the last object rendered by the renderer. Useful for other plugins like interaction managers
   * @readonly
   */
  get lastObjectRendered() {
    return this._lastObjectRendered;
  }
  /**
   * Flag if we are rendering to the screen vs renderTexture
   * @readonly
   * @default true
   */
  get renderingToScreen() {
    return this.renderTarget.renderingToScreen;
  }
  /**
   * Measurements of the screen. (0, 0, screenWidth, screenHeight).
   *
   * Its safe to use as filterArea or hitArea for the whole stage.
   */
  get screen() {
    return this.view.screen;
  }
  /**
   * Create a bunch of runners based of a collection of ids
   * @param runnerIds - the runner ids to add
   */
  _addRunners(...t) {
    t.forEach((n) => {
      this.runners[n] = new Sd(n);
    });
  }
  _addSystems(t) {
    let n;
    for (n in t) {
      const s = t[n];
      this._addSystem(s.value, s.name);
    }
  }
  /**
   * Add a new system to the renderer.
   * @param ClassRef - Class reference
   * @param name - Property name for system, if not specified
   *        will use a static `name` property on the class itself. This
   *        name will be assigned as s property on the Renderer so make
   *        sure it doesn't collide with properties on Renderer.
   * @returns Return instance of renderer
   */
  _addSystem(t, n) {
    const s = new t(this);
    if (this[n])
      throw new Error(`Whoops! The name "${n}" is already in use`);
    this[n] = s, this._systemsHash[n] = s;
    for (const i in this.runners)
      this.runners[i].add(s);
    return this;
  }
  _addPipes(t, n) {
    const s = n.reduce((i, r) => (i[r.name] = r.value, i), {});
    t.forEach((i) => {
      const r = i.value, o = i.name, a = s[o];
      this.renderPipes[o] = new r(
        this,
        a ? new a() : null
      );
    });
  }
  destroy(t = !1) {
    this.runners.destroy.items.reverse(), this.runners.destroy.emit(t), Object.values(this.runners).forEach((n) => {
      n.destroy();
    }), this._systemsHash = null, this.renderPipes = null;
  }
  /**
   * Generate a texture from a container.
   * @param options - options or container target to use when generating the texture
   * @returns a texture
   */
  generateTexture(t) {
    return this.textureGenerator.generateTexture(t);
  }
  /**
   * Whether the renderer will round coordinates to whole pixels when rendering.
   * Can be overridden on a per scene item basis.
   */
  get roundPixels() {
    return !!this._roundPixels;
  }
  /**
   * Overrideable function by `pixi.js/unsafe-eval` to silence
   * throwing an error if platform doesn't support unsafe-evals.
   * @private
   * @ignore
   */
  _unsafeEvalCheck() {
    if (!ad())
      throw new Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.");
  }
};
Ta.defaultOptions = {
  /**
   * Default resolution / device pixel ratio of the renderer.
   * @default 1
   */
  resolution: 1,
  /**
   * Should the `failIfMajorPerformanceCaveat` flag be enabled as a context option used in the `isWebGLSupported`
   * function. If set to true, a WebGL renderer can fail to be created if the browser thinks there could be
   * performance issues when using WebGL.
   *
   * In PixiJS v6 this has changed from true to false by default, to allow WebGL to work in as many
   * scenarios as possible. However, some users may have a poor experience, for example, if a user has a gpu or
   * driver version blacklisted by the
   * browser.
   *
   * If your application requires high performance rendering, you may wish to set this to false.
   * We recommend one of two options if you decide to set this flag to false:
   *
   * 1: Use the Canvas renderer as a fallback in case high performance WebGL is
   *    not supported.
   *
   * 2: Call `isWebGLSupported` (which if found in the utils package) in your code before attempting to create a
   *    PixiJS renderer, and show an error message to the user if the function returns false, explaining that their
   *    device & browser combination does not support high performance WebGL.
   *    This is a much better strategy than trying to create a PixiJS renderer and finding it then fails.
   * @default false
   */
  failIfMajorPerformanceCaveat: !1,
  /**
   * Should round pixels be forced when rendering?
   * @default false
   */
  roundPixels: !1
};
let Ca = Ta, Zn;
function Ed(e) {
  return Zn !== void 0 || (Zn = (() => {
    var n;
    const t = {
      stencil: !0,
      failIfMajorPerformanceCaveat: e ?? Ca.defaultOptions.failIfMajorPerformanceCaveat
    };
    try {
      if (!Oe.get().getWebGLRenderingContext())
        return !1;
      let i = Oe.get().createCanvas().getContext("webgl", t);
      const r = !!((n = i == null ? void 0 : i.getContextAttributes()) != null && n.stencil);
      if (i) {
        const o = i.getExtension("WEBGL_lose_context");
        o && o.loseContext();
      }
      return i = null, r;
    } catch {
      return !1;
    }
  })()), Zn;
}
let Kn;
async function Cd(e = {}) {
  return Kn !== void 0 || (Kn = await (async () => {
    if (!Oe.get().getNavigator().gpu)
      return !1;
    try {
      return await (await navigator.gpu.requestAdapter(e)).requestDevice(), !0;
    } catch {
      return !1;
    }
  })()), Kn;
}
const Xr = ["webgl", "webgpu", "canvas"];
async function Pd(e) {
  let t = [];
  e.preference ? (t.push(e.preference), Xr.forEach((r) => {
    r !== e.preference && t.push(r);
  })) : t = Xr.slice();
  let n;
  await od(
    e.manageImports ?? !0
  );
  let s = {};
  for (let r = 0; r < t.length; r++) {
    const o = t[r];
    if (o === "webgpu" && await Cd()) {
      const { WebGPURenderer: a } = await import("./WebGPURenderer-CAoC5UQN.js");
      n = a, s = { ...e, ...e.webgpu };
      break;
    } else if (o === "webgl" && Ed(
      e.failIfMajorPerformanceCaveat ?? Ca.defaultOptions.failIfMajorPerformanceCaveat
    )) {
      const { WebGLRenderer: a } = await import("./WebGLRenderer-BCcMJwDN.js");
      n = a, s = { ...e, ...e.webgl };
      break;
    } else if (o === "canvas")
      throw s = { ...e }, new Error("CanvasRenderer is not yet implemented");
  }
  if (delete s.webgpu, delete s.webgl, !n)
    throw new Error("No available renderer for the current environment");
  const i = new n();
  return await i.init(s), i;
}
var kd = Bd, Ds = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 }, Id = /([astvzqmhlc])([^astvzqmhlc]*)/ig;
function Bd(e) {
  var t = [];
  return e.replace(Id, function(n, s, i) {
    var r = s.toLowerCase();
    for (i = Od(i), r == "m" && i.length > 2 && (t.push([s].concat(i.splice(0, 2))), r = "l", s = s == "m" ? "l" : "L"); ; ) {
      if (i.length == Ds[r])
        return i.unshift(s), t.push(i);
      if (i.length < Ds[r])
        throw new Error("malformed path data");
      t.push([s].concat(i.splice(0, Ds[r])));
    }
  }), t;
}
var Rd = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig;
function Od(e) {
  var t = e.match(Rd);
  return t ? t.map(Number) : [];
}
const Yd = /* @__PURE__ */ Ti(kd);
function Ld(e, t) {
  const n = Yd(e), s = [];
  let i = null, r = 0, o = 0;
  for (let a = 0; a < n.length; a++) {
    const l = n[a], h = l[0], c = l;
    switch (h) {
      case "M":
        r = c[1], o = c[2], t.moveTo(r, o);
        break;
      case "m":
        r += c[1], o += c[2], t.moveTo(r, o);
        break;
      case "H":
        r = c[1], t.lineTo(r, o);
        break;
      case "h":
        r += c[1], t.lineTo(r, o);
        break;
      case "V":
        o = c[1], t.lineTo(r, o);
        break;
      case "v":
        o += c[1], t.lineTo(r, o);
        break;
      case "L":
        r = c[1], o = c[2], t.lineTo(r, o);
        break;
      case "l":
        r += c[1], o += c[2], t.lineTo(r, o);
        break;
      case "C":
        r = c[5], o = c[6], t.bezierCurveTo(
          c[1],
          c[2],
          c[3],
          c[4],
          r,
          o
        );
        break;
      case "c":
        t.bezierCurveTo(
          r + c[1],
          o + c[2],
          r + c[3],
          o + c[4],
          r + c[5],
          o + c[6]
        ), r += c[5], o += c[6];
        break;
      case "S":
        r = c[3], o = c[4], t.bezierCurveToShort(
          c[1],
          c[2],
          r,
          o
        );
        break;
      case "s":
        t.bezierCurveToShort(
          r + c[1],
          o + c[2],
          r + c[3],
          o + c[4]
        ), r += c[3], o += c[4];
        break;
      case "Q":
        r = c[3], o = c[4], t.quadraticCurveTo(
          c[1],
          c[2],
          r,
          o
        );
        break;
      case "q":
        t.quadraticCurveTo(
          r + c[1],
          o + c[2],
          r + c[3],
          o + c[4]
        ), r += c[3], o += c[4];
        break;
      case "T":
        r = c[1], o = c[2], t.quadraticCurveToShort(
          r,
          o
        );
        break;
      case "t":
        r += c[1], o += c[2], t.quadraticCurveToShort(
          r,
          o
        );
        break;
      case "A":
        r = c[6], o = c[7], t.arcToSvg(
          c[1],
          c[2],
          c[3],
          c[4],
          c[5],
          r,
          o
        );
        break;
      case "a":
        r += c[6], o += c[7], t.arcToSvg(
          c[1],
          c[2],
          c[3],
          c[4],
          c[5],
          r,
          o
        );
        break;
      case "Z":
      case "z":
        t.closePath(), s.length > 0 && (i = s.pop(), i ? (r = i.startX, o = i.startY) : (r = 0, o = 0)), i = null;
        break;
      default:
        ue(`Unknown SVG path command: ${h}`);
    }
    h !== "Z" && h !== "z" && i === null && (i = { startX: r, startY: o }, s.push(i));
  }
  return t;
}
class Ii {
  /**
   * @param x - The X coordinate of the center of this circle
   * @param y - The Y coordinate of the center of this circle
   * @param radius - The radius of the circle
   */
  constructor(t = 0, n = 0, s = 0) {
    this.type = "circle", this.x = t, this.y = n, this.radius = s;
  }
  /**
   * Creates a clone of this Circle instance
   * @returns A copy of the Circle
   */
  clone() {
    return new Ii(this.x, this.y, this.radius);
  }
  /**
   * Checks whether the x and y coordinates given are contained within this circle
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coordinates are within this Circle
   */
  contains(t, n) {
    if (this.radius <= 0)
      return !1;
    const s = this.radius * this.radius;
    let i = this.x - t, r = this.y - n;
    return i *= i, r *= r, i + r <= s;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this circle including the stroke.
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @param width - The width of the line to check
   * @returns Whether the x/y coordinates are within this Circle
   */
  strokeContains(t, n, s) {
    if (this.radius === 0)
      return !1;
    const i = this.x - t, r = this.y - n, o = this.radius, a = s / 2, l = Math.sqrt(i * i + r * r);
    return l < o + a && l > o - a;
  }
  /**
   * Returns the framing rectangle of the circle as a Rectangle object
   * @param out
   * @returns The framing rectangle
   */
  getBounds(t) {
    return t = t || new wt(), t.x = this.x - this.radius, t.y = this.y - this.radius, t.width = this.radius * 2, t.height = this.radius * 2, t;
  }
  /**
   * Copies another circle to this one.
   * @param circle - The circle to copy from.
   * @returns Returns itself.
   */
  copyFrom(t) {
    return this.x = t.x, this.y = t.y, this.radius = t.radius, this;
  }
  /**
   * Copies this circle to another one.
   * @param circle - The circle to copy to.
   * @returns Returns given parameter.
   */
  copyTo(t) {
    return t.copyFrom(this), t;
  }
  toString() {
    return `[pixi.js/math:Circle x=${this.x} y=${this.y} radius=${this.radius}]`;
  }
}
class Bi {
  /**
   * @param x - The X coordinate of the center of this ellipse
   * @param y - The Y coordinate of the center of this ellipse
   * @param halfWidth - The half width of this ellipse
   * @param halfHeight - The half height of this ellipse
   */
  constructor(t = 0, n = 0, s = 0, i = 0) {
    this.type = "ellipse", this.x = t, this.y = n, this.halfWidth = s, this.halfHeight = i;
  }
  /**
   * Creates a clone of this Ellipse instance
   * @returns {Ellipse} A copy of the ellipse
   */
  clone() {
    return new Bi(this.x, this.y, this.halfWidth, this.halfHeight);
  }
  /**
   * Checks whether the x and y coordinates given are contained within this ellipse
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @returns Whether the x/y coords are within this ellipse
   */
  contains(t, n) {
    if (this.halfWidth <= 0 || this.halfHeight <= 0)
      return !1;
    let s = (t - this.x) / this.halfWidth, i = (n - this.y) / this.halfHeight;
    return s *= s, i *= i, s + i <= 1;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this ellipse including stroke
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @param width
   * @returns Whether the x/y coords are within this ellipse
   */
  strokeContains(t, n, s) {
    const { halfWidth: i, halfHeight: r } = this;
    if (i <= 0 || r <= 0)
      return !1;
    const o = s / 2, a = i - o, l = r - o, h = i + o, c = r + o, u = t - this.x, d = n - this.y, f = u * u / (a * a) + d * d / (l * l), m = u * u / (h * h) + d * d / (c * c);
    return f > 1 && m <= 1;
  }
  /**
   * Returns the framing rectangle of the ellipse as a Rectangle object
   * @returns The framing rectangle
   */
  getBounds() {
    return new wt(this.x - this.halfWidth, this.y - this.halfHeight, this.halfWidth * 2, this.halfHeight * 2);
  }
  /**
   * Copies another ellipse to this one.
   * @param ellipse - The ellipse to copy from.
   * @returns Returns itself.
   */
  copyFrom(t) {
    return this.x = t.x, this.y = t.y, this.halfWidth = t.halfWidth, this.halfHeight = t.halfHeight, this;
  }
  /**
   * Copies this ellipse to another one.
   * @param ellipse - The ellipse to copy to.
   * @returns Returns given parameter.
   */
  copyTo(t) {
    return t.copyFrom(this), t;
  }
  toString() {
    return `[pixi.js/math:Ellipse x=${this.x} y=${this.y} halfWidth=${this.halfWidth} halfHeight=${this.halfHeight}]`;
  }
}
function Xd(e, t, n, s, i, r) {
  const o = e - n, a = t - s, l = i - n, h = r - s, c = o * l + a * h, u = l * l + h * h;
  let d = -1;
  u !== 0 && (d = c / u);
  let f, m;
  d < 0 ? (f = n, m = s) : d > 1 ? (f = i, m = r) : (f = n + d * l, m = s + d * h);
  const g = e - f, p = t - m;
  return g * g + p * p;
}
class Tn {
  /**
   * @param points - This can be an array of Points
   *  that form the polygon, a flat array of numbers that will be interpreted as [x,y, x,y, ...], or
   *  the arguments passed can be all the points of the polygon e.g.
   *  `new Polygon(new Point(), new Point(), ...)`, or the arguments passed can be flat
   *  x,y values e.g. `new Polygon(x,y, x,y, x,y, ...)` where `x` and `y` are Numbers.
   */
  constructor(...t) {
    this.type = "polygon";
    let n = Array.isArray(t[0]) ? t[0] : t;
    if (typeof n[0] != "number") {
      const s = [];
      for (let i = 0, r = n.length; i < r; i++)
        s.push(n[i].x, n[i].y);
      n = s;
    }
    this.points = n, this.closePath = !0;
  }
  /**
   * Creates a clone of this polygon.
   * @returns - A copy of the polygon.
   */
  clone() {
    const t = this.points.slice(), n = new Tn(t);
    return n.closePath = this.closePath, n;
  }
  /**
   * Checks whether the x and y coordinates passed to this function are contained within this polygon.
   * @param x - The X coordinate of the point to test.
   * @param y - The Y coordinate of the point to test.
   * @returns - Whether the x/y coordinates are within this polygon.
   */
  contains(t, n) {
    let s = !1;
    const i = this.points.length / 2;
    for (let r = 0, o = i - 1; r < i; o = r++) {
      const a = this.points[r * 2], l = this.points[r * 2 + 1], h = this.points[o * 2], c = this.points[o * 2 + 1];
      l > n != c > n && t < (h - a) * ((n - l) / (c - l)) + a && (s = !s);
    }
    return s;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this polygon including the stroke.
   * @param x - The X coordinate of the point to test
   * @param y - The Y coordinate of the point to test
   * @param strokeWidth - The width of the line to check
   * @returns Whether the x/y coordinates are within this polygon
   */
  strokeContains(t, n, s) {
    const i = s / 2, r = i * i, { points: o } = this, a = o.length - (this.closePath ? 0 : 2);
    for (let l = 0; l < a; l += 2) {
      const h = o[l], c = o[l + 1], u = o[(l + 2) % o.length], d = o[(l + 3) % o.length];
      if (Xd(t, n, h, c, u, d) <= r)
        return !0;
    }
    return !1;
  }
  /**
   * Returns the framing rectangle of the polygon as a Rectangle object
   * @param out - optional rectangle to store the result
   * @returns The framing rectangle
   */
  getBounds(t) {
    t = t || new wt();
    const n = this.points;
    let s = 1 / 0, i = -1 / 0, r = 1 / 0, o = -1 / 0;
    for (let a = 0, l = n.length; a < l; a += 2) {
      const h = n[a], c = n[a + 1];
      s = h < s ? h : s, i = h > i ? h : i, r = c < r ? c : r, o = c > o ? c : o;
    }
    return t.x = s, t.width = i - s, t.y = r, t.height = o - r, t;
  }
  /**
   * Copies another polygon to this one.
   * @param polygon - The polygon to copy from.
   * @returns Returns itself.
   */
  copyFrom(t) {
    return this.points = t.points.slice(), this.closePath = t.closePath, this;
  }
  /**
   * Copies this polygon to another one.
   * @param polygon - The polygon to copy to.
   * @returns Returns given parameter.
   */
  copyTo(t) {
    return t.copyFrom(this), t;
  }
  toString() {
    return `[pixi.js/math:PolygoncloseStroke=${this.closePath}points=${this.points.reduce((t, n) => `${t}, ${n}`, "")}]`;
  }
  /**
   * Get the last X coordinate of the polygon
   * @readonly
   */
  get lastX() {
    return this.points[this.points.length - 2];
  }
  /**
   * Get the last Y coordinate of the polygon
   * @readonly
   */
  get lastY() {
    return this.points[this.points.length - 1];
  }
  /**
   * Get the first X coordinate of the polygon
   * @readonly
   */
  get x() {
    return this.points[this.points.length - 2];
  }
  /**
   * Get the first Y coordinate of the polygon
   * @readonly
   */
  get y() {
    return this.points[this.points.length - 1];
  }
}
const Qn = (e, t, n, s, i, r) => {
  const o = e - n, a = t - s, l = Math.sqrt(o * o + a * a);
  return l >= i - r && l <= i + r;
};
class Ri {
  /**
   * @param x - The X coordinate of the upper-left corner of the rounded rectangle
   * @param y - The Y coordinate of the upper-left corner of the rounded rectangle
   * @param width - The overall width of this rounded rectangle
   * @param height - The overall height of this rounded rectangle
   * @param radius - Controls the radius of the rounded corners
   */
  constructor(t = 0, n = 0, s = 0, i = 0, r = 20) {
    this.type = "roundedRectangle", this.x = t, this.y = n, this.width = s, this.height = i, this.radius = r;
  }
  /**
   * Returns the framing rectangle of the rounded rectangle as a Rectangle object
   * @param out - optional rectangle to store the result
   * @returns The framing rectangle
   */
  getBounds(t) {
    return t = t || new wt(), t.x = this.x, t.y = this.y, t.width = this.width, t.height = this.height, t;
  }
  /**
   * Creates a clone of this Rounded Rectangle.
   * @returns - A copy of the rounded rectangle.
   */
  clone() {
    return new Ri(this.x, this.y, this.width, this.height, this.radius);
  }
  /**
   * Copies another rectangle to this one.
   * @param rectangle - The rectangle to copy from.
   * @returns Returns itself.
   */
  copyFrom(t) {
    return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this;
  }
  /**
   * Copies this rectangle to another one.
   * @param rectangle - The rectangle to copy to.
   * @returns Returns given parameter.
   */
  copyTo(t) {
    return t.copyFrom(this), t;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this Rounded Rectangle
   * @param x - The X coordinate of the point to test.
   * @param y - The Y coordinate of the point to test.
   * @returns - Whether the x/y coordinates are within this Rounded Rectangle.
   */
  contains(t, n) {
    if (this.width <= 0 || this.height <= 0)
      return !1;
    if (t >= this.x && t <= this.x + this.width && n >= this.y && n <= this.y + this.height) {
      const s = Math.max(0, Math.min(this.radius, Math.min(this.width, this.height) / 2));
      if (n >= this.y + s && n <= this.y + this.height - s || t >= this.x + s && t <= this.x + this.width - s)
        return !0;
      let i = t - (this.x + s), r = n - (this.y + s);
      const o = s * s;
      if (i * i + r * r <= o || (i = t - (this.x + this.width - s), i * i + r * r <= o) || (r = n - (this.y + this.height - s), i * i + r * r <= o) || (i = t - (this.x + s), i * i + r * r <= o))
        return !0;
    }
    return !1;
  }
  /**
   * Checks whether the x and y coordinates given are contained within this rectangle including the stroke.
   * @param pX - The X coordinate of the point to test
   * @param pY - The Y coordinate of the point to test
   * @param strokeWidth - The width of the line to check
   * @returns Whether the x/y coordinates are within this rectangle
   */
  strokeContains(t, n, s) {
    const { x: i, y: r, width: o, height: a, radius: l } = this, h = s / 2, c = i + l, u = r + l, d = o - l * 2, f = a - l * 2, m = i + o, g = r + a;
    return (t >= i - h && t <= i + h || t >= m - h && t <= m + h) && n >= u && n <= u + f || (n >= r - h && n <= r + h || n >= g - h && n <= g + h) && t >= c && t <= c + d ? !0 : (
      // Top-left
      t < c && n < u && Qn(t, n, c, u, l, h) || t > m - l && n < u && Qn(t, n, m - l, u, l, h) || t > m - l && n > g - l && Qn(t, n, m - l, g - l, l, h) || t < c && n > g - l && Qn(t, n, c, g - l, l, h)
    );
  }
  toString() {
    return `[pixi.js/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`;
  }
}
var Ot = /* @__PURE__ */ ((e) => (e[e.MAP_READ = 1] = "MAP_READ", e[e.MAP_WRITE = 2] = "MAP_WRITE", e[e.COPY_SRC = 4] = "COPY_SRC", e[e.COPY_DST = 8] = "COPY_DST", e[e.INDEX = 16] = "INDEX", e[e.VERTEX = 32] = "VERTEX", e[e.UNIFORM = 64] = "UNIFORM", e[e.STORAGE = 128] = "STORAGE", e[e.INDIRECT = 256] = "INDIRECT", e[e.QUERY_RESOLVE = 512] = "QUERY_RESOLVE", e[e.STATIC = 1024] = "STATIC", e))(Ot || {});
class Ln extends xe {
  /**
   * Creates a new Buffer with the given options
   * @param options - the options for the buffer
   */
  constructor(t) {
    let { data: n, size: s } = t;
    const { usage: i, label: r, shrinkToFit: o } = t;
    super(), this.uid = vt("buffer"), this._resourceType = "buffer", this._resourceId = vt("resource"), this._touched = 0, this._updateID = 1, this.shrinkToFit = !0, this.destroyed = !1, n instanceof Array && (n = new Float32Array(n)), this._data = n, s = s ?? (n == null ? void 0 : n.byteLength);
    const a = !!n;
    this.descriptor = {
      size: s,
      usage: i,
      mappedAtCreation: a,
      label: r
    }, this.shrinkToFit = o ?? !0;
  }
  /** the data in the buffer */
  get data() {
    return this._data;
  }
  set data(t) {
    this.setDataWithSize(t, t.length, !0);
  }
  /** whether the buffer is static or not */
  get static() {
    return !!(this.descriptor.usage & Ot.STATIC);
  }
  set static(t) {
    t ? this.descriptor.usage |= Ot.STATIC : this.descriptor.usage &= ~Ot.STATIC;
  }
  /**
   * Sets the data in the buffer to the given value. This will immediately update the buffer on the GPU.
   * If you only want to update a subset of the buffer, you can pass in the size of the data.
   * @param value - the data to set
   * @param size - the size of the data in bytes
   * @param syncGPU - should the buffer be updated on the GPU immediately?
   */
  setDataWithSize(t, n, s) {
    if (this._updateID++, this._updateSize = n * t.BYTES_PER_ELEMENT, this._data === t) {
      s && this.emit("update", this);
      return;
    }
    const i = this._data;
    if (this._data = t, i.length !== t.length) {
      !this.shrinkToFit && t.byteLength < i.byteLength ? s && this.emit("update", this) : (this.descriptor.size = t.byteLength, this._resourceId = vt("resource"), this.emit("change", this));
      return;
    }
    s && this.emit("update", this);
  }
  /**
   * updates the buffer on the GPU to reflect the data in the buffer.
   * By default it will update the entire buffer. If you only want to update a subset of the buffer,
   * you can pass in the size of the buffer to update.
   * @param sizeInBytes - the new size of the buffer in bytes
   */
  update(t) {
    this._updateSize = t ?? this._updateSize, this._updateID++, this.emit("update", this);
  }
  /** Destroys the buffer */
  destroy() {
    this.destroyed = !0, this.emit("destroy", this), this.emit("change", this), this._data = null, this.descriptor = null, this.removeAllListeners();
  }
}
function Pa(e, t) {
  if (!(e instanceof Ln)) {
    let n = t ? Ot.INDEX : Ot.VERTEX;
    e instanceof Array && (t ? (e = new Uint32Array(e), n = Ot.INDEX | Ot.COPY_DST) : (e = new Float32Array(e), n = Ot.VERTEX | Ot.COPY_DST)), e = new Ln({
      data: e,
      label: t ? "index-mesh-buffer" : "vertex-mesh-buffer",
      usage: n
    });
  }
  return e;
}
function Fd(e, t, n) {
  const s = e.getAttribute(t);
  if (!s)
    return n.minX = 0, n.minY = 0, n.maxX = 0, n.maxY = 0, n;
  const i = s.buffer.data;
  let r = 1 / 0, o = 1 / 0, a = -1 / 0, l = -1 / 0;
  const h = i.BYTES_PER_ELEMENT, c = (s.offset || 0) / h, u = (s.stride || 2 * 4) / h;
  for (let d = c; d < i.length; d += u) {
    const f = i[d], m = i[d + 1];
    f > a && (a = f), m > l && (l = m), f < r && (r = f), m < o && (o = m);
  }
  return n.minX = r, n.minY = o, n.maxX = a, n.maxY = l, n;
}
function Gd(e) {
  return (e instanceof Ln || Array.isArray(e) || e.BYTES_PER_ELEMENT) && (e = {
    buffer: e
  }), e.buffer = Pa(e.buffer, !1), e;
}
class $d extends xe {
  /**
   * Create a new instance of a geometry
   * @param options - The options for the geometry.
   */
  constructor(t) {
    const { attributes: n, indexBuffer: s, topology: i } = t;
    super(), this.uid = vt("geometry"), this._layoutKey = 0, this.instanceCount = 1, this._bounds = new de(), this._boundsDirty = !0, this.attributes = n, this.buffers = [], this.instanceCount = t.instanceCount || 1;
    for (const r in n) {
      const o = n[r] = Gd(n[r]);
      this.buffers.indexOf(o.buffer) === -1 && (this.buffers.push(o.buffer), o.buffer.on("update", this.onBufferUpdate, this), o.buffer.on("change", this.onBufferUpdate, this));
    }
    s && (this.indexBuffer = Pa(s, !0), this.buffers.push(this.indexBuffer)), this.topology = i || "triangle-list";
  }
  onBufferUpdate() {
    this._boundsDirty = !0, this.emit("update", this);
  }
  /**
   * Returns the requested attribute.
   * @param id - The name of the attribute required
   * @returns - The attribute requested.
   */
  getAttribute(t) {
    return this.attributes[t];
  }
  /**
   * Returns the index buffer
   * @returns - The index buffer.
   */
  getIndex() {
    return this.indexBuffer;
  }
  /**
   * Returns the requested buffer.
   * @param id - The name of the buffer required.
   * @returns - The buffer requested.
   */
  getBuffer(t) {
    return this.getAttribute(t).buffer;
  }
  /**
   * Used to figure out how many vertices there are in this geometry
   * @returns the number of vertices in the geometry
   */
  getSize() {
    for (const t in this.attributes) {
      const n = this.attributes[t];
      return n.buffer.data.length / (n.stride / 4 || n.size);
    }
    return 0;
  }
  /** Returns the bounds of the geometry. */
  get bounds() {
    return this._boundsDirty ? (this._boundsDirty = !1, Fd(this, "aPosition", this._bounds)) : this._bounds;
  }
  /**
   * destroys the geometry.
   * @param destroyBuffers - destroy the buffers associated with this geometry
   */
  destroy(t = !1) {
    this.emit("destroy", this), this.removeAllListeners(), t && this.buffers.forEach((n) => n.destroy()), this.attributes = null, this.buffers = null, this.indexBuffer = null, this._bounds = null;
  }
}
const Nd = new Float32Array(1), Dd = new Uint32Array(1);
class Ud extends $d {
  constructor() {
    const n = new Ln({
      data: Nd,
      label: "attribute-batch-buffer",
      usage: Ot.VERTEX | Ot.COPY_DST,
      shrinkToFit: !1
    }), s = new Ln({
      data: Dd,
      label: "index-batch-buffer",
      usage: Ot.INDEX | Ot.COPY_DST,
      // | BufferUsage.STATIC,
      shrinkToFit: !1
    }), i = 6 * 4;
    super({
      attributes: {
        aPosition: {
          buffer: n,
          format: "float32x2",
          stride: i,
          offset: 0,
          location: 1
        },
        aUV: {
          buffer: n,
          format: "float32x2",
          stride: i,
          offset: 2 * 4,
          location: 3
        },
        aColor: {
          buffer: n,
          format: "unorm8x4",
          stride: i,
          offset: 4 * 4,
          location: 0
        },
        aTextureIdAndRound: {
          buffer: n,
          format: "uint16x2",
          stride: i,
          offset: 5 * 4,
          location: 2
        }
      },
      indexBuffer: s
    });
  }
}
const ka = 16, Ia = {};
function Hd(e, t) {
  let n = 0;
  for (let s = 0; s < t; s++)
    n = n * 31 + e[s].uid >>> 0;
  return Ia[n] || Vd(e, n);
}
function Vd(e, t) {
  const n = {};
  let s = 0;
  for (let r = 0; r < ka; r++) {
    const o = r < e.length ? e[r] : st.EMPTY.source;
    n[s++] = o.source, n[s++] = o.style;
  }
  const i = new rd(n);
  return Ia[t] = i, i;
}
class Fr {
  constructor(t) {
    typeof t == "number" ? this.rawBinaryData = new ArrayBuffer(t) : t instanceof Uint8Array ? this.rawBinaryData = t.buffer : this.rawBinaryData = t, this.uint32View = new Uint32Array(this.rawBinaryData), this.float32View = new Float32Array(this.rawBinaryData), this.size = this.rawBinaryData.byteLength;
  }
  /** View on the raw binary data as a `Int8Array`. */
  get int8View() {
    return this._int8View || (this._int8View = new Int8Array(this.rawBinaryData)), this._int8View;
  }
  /** View on the raw binary data as a `Uint8Array`. */
  get uint8View() {
    return this._uint8View || (this._uint8View = new Uint8Array(this.rawBinaryData)), this._uint8View;
  }
  /**  View on the raw binary data as a `Int16Array`. */
  get int16View() {
    return this._int16View || (this._int16View = new Int16Array(this.rawBinaryData)), this._int16View;
  }
  /** View on the raw binary data as a `Int32Array`. */
  get int32View() {
    return this._int32View || (this._int32View = new Int32Array(this.rawBinaryData)), this._int32View;
  }
  /** View on the raw binary data as a `Float64Array`. */
  get float64View() {
    return this._float64Array || (this._float64Array = new Float64Array(this.rawBinaryData)), this._float64Array;
  }
  /** View on the raw binary data as a `BigUint64Array`. */
  get bigUint64View() {
    return this._bigUint64Array || (this._bigUint64Array = new BigUint64Array(this.rawBinaryData)), this._bigUint64Array;
  }
  /**
   * Returns the view of the given type.
   * @param type - One of `int8`, `uint8`, `int16`,
   *    `uint16`, `int32`, `uint32`, and `float32`.
   * @returns - typed array of given type
   */
  view(t) {
    return this[`${t}View`];
  }
  /** Destroys all buffer references. Do not use after calling this. */
  destroy() {
    this.rawBinaryData = null, this._int8View = null, this._uint8View = null, this._int16View = null, this.uint16View = null, this._int32View = null, this.uint32View = null, this.float32View = null;
  }
  /**
   * Returns the size of the given type in bytes.
   * @param type - One of `int8`, `uint8`, `int16`,
   *   `uint16`, `int32`, `uint32`, and `float32`.
   * @returns - size of the type in bytes
   */
  static sizeOf(t) {
    switch (t) {
      case "int8":
      case "uint8":
        return 1;
      case "int16":
      case "uint16":
        return 2;
      case "int32":
      case "uint32":
      case "float32":
        return 4;
      default:
        throw new Error(`${t} isn't a valid view type`);
    }
  }
}
function Gr(e, t) {
  const n = e.byteLength / 8 | 0, s = new Float64Array(e, 0, n);
  new Float64Array(t, 0, n).set(s);
  const r = e.byteLength - n * 8;
  if (r > 0) {
    const o = new Uint8Array(e, n * 8, r);
    new Uint8Array(t, n * 8, r).set(o);
  }
}
const zd = {
  normal: "normal-npm",
  add: "add-npm",
  screen: "screen-npm"
};
var Wd = /* @__PURE__ */ ((e) => (e[e.DISABLED = 0] = "DISABLED", e[e.RENDERING_MASK_ADD = 1] = "RENDERING_MASK_ADD", e[e.MASK_ACTIVE = 2] = "MASK_ACTIVE", e[e.RENDERING_MASK_REMOVE = 3] = "RENDERING_MASK_REMOVE", e[e.NONE = 4] = "NONE", e))(Wd || {});
function $r(e, t) {
  return t.alphaMode === "no-premultiply-alpha" && zd[e] || e;
}
class Nr {
  constructor() {
    this.ids = /* @__PURE__ */ Object.create(null), this.textures = [], this.count = 0;
  }
  /** Clear the textures and their locations. */
  clear() {
    for (let t = 0; t < this.count; t++) {
      const n = this.textures[t];
      this.textures[t] = null, this.ids[n.uid] = null;
    }
    this.count = 0;
  }
}
class Dr {
  constructor() {
    this.renderPipeId = "batch", this.action = "startBatch", this.start = 0, this.size = 0, this.blendMode = "normal", this.canBundle = !0;
  }
  destroy() {
    this.textures = null, this.gpuBindGroup = null, this.bindGroup = null, this.batcher = null;
  }
}
let un = 0;
const Ba = class Ra {
  constructor(t = {}) {
    this.uid = vt("batcher"), this.dirty = !0, this.batchIndex = 0, this.batches = [], this._vertexSize = 6, this._elements = [], this._batchPool = [], this._batchPoolIndex = 0, this._textureBatchPool = [], this._textureBatchPoolIndex = 0, t = { ...Ra.defaultOptions, ...t };
    const { vertexSize: n, indexSize: s } = t;
    this.attributeBuffer = new Fr(n * this._vertexSize * 4), this.indexBuffer = new Uint16Array(s);
  }
  begin() {
    this.batchIndex = 0, this.elementSize = 0, this.elementStart = 0, this.indexSize = 0, this.attributeSize = 0, this._batchPoolIndex = 0, this._textureBatchPoolIndex = 0, this._batchIndexStart = 0, this._batchIndexSize = 0, this.dirty = !0;
  }
  add(t) {
    this._elements[this.elementSize++] = t, t.indexStart = this.indexSize, t.location = this.attributeSize, t.batcher = this, this.indexSize += t.indexSize, this.attributeSize += t.vertexSize * this._vertexSize;
  }
  checkAndUpdateTexture(t, n) {
    const s = t.batch.textures.ids[n._source.uid];
    return !s && s !== 0 ? !1 : (t.textureId = s, t.texture = n, !0);
  }
  updateElement(t) {
    this.dirty = !0, t.packAttributes(
      this.attributeBuffer.float32View,
      this.attributeBuffer.uint32View,
      t.location,
      t.textureId
    );
  }
  /**
   * breaks the batcher. This happens when a batch gets too big,
   * or we need to switch to a different type of rendering (a filter for example)
   * @param instructionSet
   */
  break(t) {
    const n = this._elements;
    let s = this._textureBatchPool[this._textureBatchPoolIndex++] || new Nr();
    if (s.clear(), !n[this.elementStart])
      return;
    const i = n[this.elementStart];
    let r = $r(i.blendMode, i.texture._source);
    this.attributeSize * 4 > this.attributeBuffer.size && this._resizeAttributeBuffer(this.attributeSize * 4), this.indexSize > this.indexBuffer.length && this._resizeIndexBuffer(this.indexSize);
    const o = this.attributeBuffer.float32View, a = this.attributeBuffer.uint32View, l = this.indexBuffer;
    let h = this._batchIndexSize, c = this._batchIndexStart, u = "startBatch", d = this._batchPool[this._batchPoolIndex++] || new Dr();
    for (let f = this.elementStart; f < this.elementSize; ++f) {
      const m = n[f];
      n[f] = null;
      const p = m.texture._source, y = $r(m.blendMode, p), x = r !== y;
      if (p._batchTick === un && !x) {
        m.textureId = p._textureBindLocation, h += m.indexSize, m.packAttributes(o, a, m.location, m.textureId), m.packIndex(l, m.indexStart, m.location / this._vertexSize), m.batch = d;
        continue;
      }
      p._batchTick = un, (s.count >= ka || x) && (this._finishBatch(
        d,
        c,
        h - c,
        s,
        r,
        t,
        u
      ), u = "renderBatch", c = h, r = y, s = this._textureBatchPool[this._textureBatchPoolIndex++] || new Nr(), s.clear(), d = this._batchPool[this._batchPoolIndex++] || new Dr(), ++un), m.textureId = p._textureBindLocation = s.count, s.ids[p.uid] = s.count, s.textures[s.count++] = p, m.batch = d, h += m.indexSize, m.packAttributes(o, a, m.location, m.textureId), m.packIndex(l, m.indexStart, m.location / this._vertexSize);
    }
    s.count > 0 && (this._finishBatch(
      d,
      c,
      h - c,
      s,
      r,
      t,
      u
    ), c = h, ++un), this.elementStart = this.elementSize, this._batchIndexStart = c, this._batchIndexSize = h;
  }
  _finishBatch(t, n, s, i, r, o, a) {
    t.gpuBindGroup = null, t.action = a, t.batcher = this, t.textures = i, t.blendMode = r, t.start = n, t.size = s, ++un, o.add(t);
  }
  finish(t) {
    this.break(t);
  }
  /**
   * Resizes the attribute buffer to the given size (1 = 1 float32)
   * @param size - the size in vertices to ensure (not bytes!)
   */
  ensureAttributeBuffer(t) {
    t * 4 <= this.attributeBuffer.size || this._resizeAttributeBuffer(t * 4);
  }
  /**
   * Resizes the index buffer to the given size (1 = 1 float32)
   * @param size - the size in vertices to ensure (not bytes!)
   */
  ensureIndexBuffer(t) {
    t <= this.indexBuffer.length || this._resizeIndexBuffer(t);
  }
  _resizeAttributeBuffer(t) {
    const n = Math.max(t, this.attributeBuffer.size * 2), s = new Fr(n);
    Gr(this.attributeBuffer.rawBinaryData, s.rawBinaryData), this.attributeBuffer = s;
  }
  _resizeIndexBuffer(t) {
    const n = this.indexBuffer;
    let s = Math.max(t, n.length * 1.5);
    s += s % 2;
    const i = s > 65535 ? new Uint32Array(s) : new Uint16Array(s);
    if (i.BYTES_PER_ELEMENT !== n.BYTES_PER_ELEMENT)
      for (let r = 0; r < n.length; r++)
        i[r] = n[r];
    else
      Gr(n.buffer, i.buffer);
    this.indexBuffer = i;
  }
  destroy() {
    for (let t = 0; t < this.batches.length; t++)
      this.batches[t].destroy();
    this.batches = null;
    for (let t = 0; t < this._elements.length; t++)
      this._elements[t].batch = null;
    this._elements = null, this.indexBuffer = null, this.attributeBuffer.destroy(), this.attributeBuffer = null;
  }
};
Ba.defaultOptions = {
  vertexSize: 4,
  indexSize: 6
};
let jd = Ba;
function qd(e, t, n, s, i, r, o, a = null) {
  let l = 0;
  n *= t, i *= r;
  const h = a.a, c = a.b, u = a.c, d = a.d, f = a.tx, m = a.ty;
  for (; l < o; ) {
    const g = e[n], p = e[n + 1];
    s[i] = h * g + u * p + f, s[i + 1] = c * g + d * p + m, i += r, n += t, l++;
  }
}
function Zd(e, t, n, s) {
  let i = 0;
  for (t *= n; i < s; )
    e[t] = 0, e[t + 1] = 0, t += n, i++;
}
function Oa(e, t, n, s, i) {
  const r = t.a, o = t.b, a = t.c, l = t.d, h = t.tx, c = t.ty;
  n = n || 0, s = s || 2, i = i || e.length / s - n;
  let u = n * s;
  for (let d = 0; d < i; d++) {
    const f = e[u], m = e[u + 1];
    e[u] = r * f + a * m + h, e[u + 1] = o * f + l * m + c, u += s;
  }
}
function Kd(e, t) {
  if (e === 16777215 || !t)
    return t;
  if (t === 16777215 || !e)
    return e;
  const n = e >> 16 & 255, s = e >> 8 & 255, i = e & 255, r = t >> 16 & 255, o = t >> 8 & 255, a = t & 255, l = n * r / 255, h = s * o / 255, c = i * a / 255;
  return (l << 16) + (h << 8) + c;
}
class Ya {
  constructor() {
    this.batcher = null, this.batch = null, this.applyTransform = !0, this.roundPixels = 0;
  }
  get blendMode() {
    return this.applyTransform ? this.renderable.groupBlendMode : "normal";
  }
  packIndex(t, n, s) {
    const i = this.geometryData.indices;
    for (let r = 0; r < this.indexSize; r++)
      t[n++] = i[r + this.indexOffset] + s - this.vertexOffset;
  }
  packAttributes(t, n, s, i) {
    const r = this.geometryData, o = this.renderable, a = r.vertices, l = r.uvs, h = this.vertexOffset * 2, c = (this.vertexOffset + this.vertexSize) * 2, u = this.color, d = u >> 16 | u & 65280 | (u & 255) << 16;
    if (this.applyTransform) {
      const f = Kd(d, o.groupColor) + (this.alpha * o.groupAlpha * 255 << 24), m = o.groupTransform, g = i << 16 | this.roundPixels & 65535, p = m.a, y = m.b, x = m.c, b = m.d, _ = m.tx, M = m.ty;
      for (let B = h; B < c; B += 2) {
        const k = a[B], A = a[B + 1];
        t[s] = p * k + x * A + _, t[s + 1] = y * k + b * A + M, t[s + 2] = l[B], t[s + 3] = l[B + 1], n[s + 4] = f, n[s + 5] = g, s += 6;
      }
    } else {
      const f = d + (this.alpha * 255 << 24);
      for (let m = h; m < c; m += 2)
        t[s] = a[m], t[s + 1] = a[m + 1], t[s + 2] = l[m], t[s + 3] = l[m + 1], n[s + 4] = f, n[s + 5] = i << 16, s += 6;
    }
  }
  // TODO rename to vertexSize
  get vertSize() {
    return this.vertexSize;
  }
  copyTo(t) {
    t.indexOffset = this.indexOffset, t.indexSize = this.indexSize, t.vertexOffset = this.vertexOffset, t.vertexSize = this.vertexSize, t.color = this.color, t.alpha = this.alpha, t.texture = this.texture, t.geometryData = this.geometryData;
  }
  reset() {
    this.applyTransform = !0;
  }
}
const Us = {
  build(e, t) {
    let n, s, i, r, o, a;
    if (e.type === "circle") {
      const _ = e;
      n = _.x, s = _.y, o = a = _.radius, i = r = 0;
    } else if (e.type === "ellipse") {
      const _ = e;
      n = _.x, s = _.y, o = _.halfWidth, a = _.halfHeight, i = r = 0;
    } else {
      const _ = e, M = _.width / 2, B = _.height / 2;
      n = _.x + M, s = _.y + B, o = a = Math.max(0, Math.min(_.radius, Math.min(M, B))), i = M - o, r = B - a;
    }
    if (!(o >= 0 && a >= 0 && i >= 0 && r >= 0))
      return t;
    const l = Math.ceil(2.3 * Math.sqrt(o + a)), h = l * 8 + (i ? 4 : 0) + (r ? 4 : 0);
    if (h === 0)
      return t;
    if (l === 0)
      return t[0] = t[6] = n + i, t[1] = t[3] = s + r, t[2] = t[4] = n - i, t[5] = t[7] = s - r, t;
    let c = 0, u = l * 4 + (i ? 2 : 0) + 2, d = u, f = h, m = i + o, g = r, p = n + m, y = n - m, x = s + g;
    if (t[c++] = p, t[c++] = x, t[--u] = x, t[--u] = y, r) {
      const _ = s - g;
      t[d++] = y, t[d++] = _, t[--f] = _, t[--f] = p;
    }
    for (let _ = 1; _ < l; _++) {
      const M = Math.PI / 2 * (_ / l), B = i + Math.cos(M) * o, k = r + Math.sin(M) * a, A = n + B, S = n - B, w = s + k, P = s - k;
      t[c++] = A, t[c++] = w, t[--u] = w, t[--u] = S, t[d++] = S, t[d++] = P, t[--f] = P, t[--f] = A;
    }
    m = i, g = r + a, p = n + m, y = n - m, x = s + g;
    const b = s - g;
    return t[c++] = p, t[c++] = x, t[--f] = b, t[--f] = p, i && (t[c++] = y, t[c++] = x, t[--f] = b, t[--f] = y), t;
  },
  triangulate(e, t, n, s, i, r) {
    if (e.length === 0)
      return;
    let o = 0, a = 0;
    for (let c = 0; c < e.length; c += 2)
      o += e[c], a += e[c + 1];
    o /= e.length / 2, a /= e.length / 2;
    let l = s;
    t[l * n] = o, t[l * n + 1] = a;
    const h = l++;
    for (let c = 0; c < e.length; c += 2)
      t[l * n] = e[c], t[l * n + 1] = e[c + 1], c > 0 && (i[r++] = l, i[r++] = h, i[r++] = l - 1), l++;
    i[r++] = h + 1, i[r++] = h, i[r++] = l - 1;
  }
}, Qd = 1e-4, Ur = 1e-4;
function Jd(e) {
  const t = e.length;
  if (t < 6)
    return 1;
  let n = 0;
  for (let s = 0, i = e[t - 2], r = e[t - 1]; s < t; s += 2) {
    const o = e[s], a = e[s + 1];
    n += (o - i) * (a + r), i = o, r = a;
  }
  return n < 0 ? -1 : 1;
}
function Hr(e, t, n, s, i, r, o, a) {
  const l = e - n * i, h = t - s * i, c = e + n * r, u = t + s * r;
  let d, f;
  o ? (d = s, f = -n) : (d = -s, f = n);
  const m = l + d, g = h + f, p = c + d, y = u + f;
  return a.push(m, g), a.push(p, y), 2;
}
function Se(e, t, n, s, i, r, o, a) {
  const l = n - e, h = s - t;
  let c = Math.atan2(l, h), u = Math.atan2(i - e, r - t);
  a && c < u ? c += Math.PI * 2 : !a && c > u && (u += Math.PI * 2);
  let d = c;
  const f = u - c, m = Math.abs(f), g = Math.sqrt(l * l + h * h), p = (15 * m * Math.sqrt(g) / Math.PI >> 0) + 1, y = f / p;
  if (d += y, a) {
    o.push(e, t), o.push(n, s);
    for (let x = 1, b = d; x < p; x++, b += y)
      o.push(e, t), o.push(
        e + Math.sin(b) * g,
        t + Math.cos(b) * g
      );
    o.push(e, t), o.push(i, r);
  } else {
    o.push(n, s), o.push(e, t);
    for (let x = 1, b = d; x < p; x++, b += y)
      o.push(
        e + Math.sin(b) * g,
        t + Math.cos(b) * g
      ), o.push(e, t);
    o.push(i, r), o.push(e, t);
  }
  return p * 2;
}
function tf(e, t, n, s, i, r, o, a, l) {
  const h = Qd;
  if (e.length === 0)
    return;
  const c = t;
  let u = c.alignment;
  if (t.alignment !== 0.5) {
    let $ = Jd(e);
    u = (u - 0.5) * $ + 0.5;
  }
  const d = new Tt(e[0], e[1]), f = new Tt(e[e.length - 2], e[e.length - 1]), m = s, g = Math.abs(d.x - f.x) < h && Math.abs(d.y - f.y) < h;
  if (m) {
    e = e.slice(), g && (e.pop(), e.pop(), f.set(e[e.length - 2], e[e.length - 1]));
    const $ = (d.x + f.x) * 0.5, tt = (f.y + d.y) * 0.5;
    e.unshift($, tt), e.push($, tt);
  }
  const p = i, y = e.length / 2;
  let x = e.length;
  const b = p.length / 2, _ = c.width / 2, M = _ * _, B = c.miterLimit * c.miterLimit;
  let k = e[0], A = e[1], S = e[2], w = e[3], P = 0, I = 0, T = -(A - w), C = k - S, Y = 0, X = 0, D = Math.sqrt(T * T + C * C);
  T /= D, C /= D, T *= _, C *= _;
  const W = u, G = (1 - W) * 2, O = W * 2;
  m || (c.cap === "round" ? x += Se(
    k - T * (G - O) * 0.5,
    A - C * (G - O) * 0.5,
    k - T * G,
    A - C * G,
    k + T * O,
    A + C * O,
    p,
    !0
  ) + 2 : c.cap === "square" && (x += Hr(k, A, T, C, G, O, !0, p))), p.push(
    k - T * G,
    A - C * G
  ), p.push(
    k + T * O,
    A + C * O
  );
  for (let $ = 1; $ < y - 1; ++$) {
    k = e[($ - 1) * 2], A = e[($ - 1) * 2 + 1], S = e[$ * 2], w = e[$ * 2 + 1], P = e[($ + 1) * 2], I = e[($ + 1) * 2 + 1], T = -(A - w), C = k - S, D = Math.sqrt(T * T + C * C), T /= D, C /= D, T *= _, C *= _, Y = -(w - I), X = S - P, D = Math.sqrt(Y * Y + X * X), Y /= D, X /= D, Y *= _, X *= _;
    const tt = S - k, J = A - w, F = S - P, Yt = I - w, ge = tt * F + J * Yt, L = J * F - Yt * tt, R = L < 0;
    if (Math.abs(L) < 1e-3 * Math.abs(ge)) {
      p.push(
        S - T * G,
        w - C * G
      ), p.push(
        S + T * O,
        w + C * O
      ), ge >= 0 && (c.join === "round" ? x += Se(
        S,
        w,
        S - T * G,
        w - C * G,
        S - Y * G,
        w - X * G,
        p,
        !1
      ) + 4 : x += 2, p.push(
        S - Y * O,
        w - X * O
      ), p.push(
        S + Y * G,
        w + X * G
      ));
      continue;
    }
    const Dt = (-T + k) * (-C + w) - (-T + S) * (-C + A), Ut = (-Y + P) * (-X + w) - (-Y + S) * (-X + I), Bt = (tt * Ut - F * Dt) / L, Rt = (Yt * Dt - J * Ut) / L, bs = (Bt - S) * (Bt - S) + (Rt - w) * (Rt - w), we = S + (Bt - S) * G, ve = w + (Rt - w) * G, Ae = S - (Bt - S) * O, Me = w - (Rt - w) * O, Wa = Math.min(tt * tt + J * J, F * F + Yt * Yt), Fi = R ? G : O, ja = Wa + Fi * Fi * M;
    bs <= ja ? c.join === "bevel" || bs / M > B ? (R ? (p.push(we, ve), p.push(S + T * O, w + C * O), p.push(we, ve), p.push(S + Y * O, w + X * O)) : (p.push(S - T * G, w - C * G), p.push(Ae, Me), p.push(S - Y * G, w - X * G), p.push(Ae, Me)), x += 2) : c.join === "round" ? R ? (p.push(we, ve), p.push(S + T * O, w + C * O), x += Se(
      S,
      w,
      S + T * O,
      w + C * O,
      S + Y * O,
      w + X * O,
      p,
      !0
    ) + 4, p.push(we, ve), p.push(S + Y * O, w + X * O)) : (p.push(S - T * G, w - C * G), p.push(Ae, Me), x += Se(
      S,
      w,
      S - T * G,
      w - C * G,
      S - Y * G,
      w - X * G,
      p,
      !1
    ) + 4, p.push(S - Y * G, w - X * G), p.push(Ae, Me)) : (p.push(we, ve), p.push(Ae, Me)) : (p.push(S - T * G, w - C * G), p.push(S + T * O, w + C * O), c.join === "round" ? R ? x += Se(
      S,
      w,
      S + T * O,
      w + C * O,
      S + Y * O,
      w + X * O,
      p,
      !0
    ) + 2 : x += Se(
      S,
      w,
      S - T * G,
      w - C * G,
      S - Y * G,
      w - X * G,
      p,
      !1
    ) + 2 : c.join === "miter" && bs / M <= B && (R ? (p.push(Ae, Me), p.push(Ae, Me)) : (p.push(we, ve), p.push(we, ve)), x += 2), p.push(S - Y * G, w - X * G), p.push(S + Y * O, w + X * O), x += 2);
  }
  k = e[(y - 2) * 2], A = e[(y - 2) * 2 + 1], S = e[(y - 1) * 2], w = e[(y - 1) * 2 + 1], T = -(A - w), C = k - S, D = Math.sqrt(T * T + C * C), T /= D, C /= D, T *= _, C *= _, p.push(S - T * G, w - C * G), p.push(S + T * O, w + C * O), m || (c.cap === "round" ? x += Se(
    S - T * (G - O) * 0.5,
    w - C * (G - O) * 0.5,
    S - T * G,
    w - C * G,
    S + T * O,
    w + C * O,
    p,
    !1
  ) + 2 : c.cap === "square" && (x += Hr(S, w, T, C, G, O, !1, p)));
  const lt = Ur * Ur;
  for (let $ = b; $ < x + b - 2; ++$)
    k = p[$ * 2], A = p[$ * 2 + 1], S = p[($ + 1) * 2], w = p[($ + 1) * 2 + 1], P = p[($ + 2) * 2], I = p[($ + 2) * 2 + 1], !(Math.abs(k * (w - I) + S * (I - A) + P * (A - w)) < lt) && a.push($, $ + 1, $ + 2);
}
function La(e, t, n, s, i, r, o) {
  const a = Md(e, t, 2);
  if (!a)
    return;
  for (let h = 0; h < a.length; h += 3)
    r[o++] = a[h] + i, r[o++] = a[h + 1] + i, r[o++] = a[h + 2] + i;
  let l = i * s;
  for (let h = 0; h < e.length; h += 2)
    n[l] = e[h], n[l + 1] = e[h + 1], l += s;
}
const ef = [], nf = {
  build(e, t) {
    for (let n = 0; n < e.points.length; n++)
      t[n] = e.points[n];
    return t;
  },
  triangulate(e, t, n, s, i, r) {
    La(e, ef, t, n, s, i, r);
  }
}, sf = {
  build(e, t) {
    const n = e, s = n.x, i = n.y, r = n.width, o = n.height;
    return r >= 0 && o >= 0 && (t[0] = s, t[1] = i, t[2] = s + r, t[3] = i, t[4] = s + r, t[5] = i + o, t[6] = s, t[7] = i + o), t;
  },
  triangulate(e, t, n, s, i, r) {
    let o = 0;
    s *= n, t[s + o] = e[0], t[s + o + 1] = e[1], o += n, t[s + o] = e[2], t[s + o + 1] = e[3], o += n, t[s + o] = e[6], t[s + o + 1] = e[7], o += n, t[s + o] = e[4], t[s + o + 1] = e[5], o += n;
    const a = s / n;
    i[r++] = a, i[r++] = a + 1, i[r++] = a + 2, i[r++] = a + 1, i[r++] = a + 3, i[r++] = a + 2;
  }
}, rf = {
  build(e, t) {
    return t[0] = e.x, t[1] = e.y, t[2] = e.x2, t[3] = e.y2, t[4] = e.x3, t[5] = e.y3, t;
  },
  triangulate(e, t, n, s, i, r) {
    let o = 0;
    s *= n, t[s + o] = e[0], t[s + o + 1] = e[1], o += n, t[s + o] = e[2], t[s + o + 1] = e[3], o += n, t[s + o] = e[4], t[s + o + 1] = e[5];
    const a = s / n;
    i[r++] = a, i[r++] = a + 1, i[r++] = a + 2;
  }
}, Oi = {
  rectangle: sf,
  polygon: nf,
  triangle: rf,
  circle: Us,
  ellipse: Us,
  roundedRectangle: Us
}, of = new wt();
function af(e, t) {
  const { geometryData: n, batches: s } = t;
  s.length = 0, n.indices.length = 0, n.vertices.length = 0, n.uvs.length = 0;
  for (let i = 0; i < e.instructions.length; i++) {
    const r = e.instructions[i];
    if (r.action === "texture")
      lf(r.data, s, n);
    else if (r.action === "fill" || r.action === "stroke") {
      const o = r.action === "stroke", a = r.data.path.shapePath, l = r.data.style, h = r.data.hole;
      o && h && Vr(h.shapePath, l, null, !0, s, n), Vr(a, l, h, o, s, n);
    }
  }
}
function lf(e, t, n) {
  const { vertices: s, uvs: i, indices: r } = n, o = r.length, a = s.length / 2, l = [], h = Oi.rectangle, c = of, u = e.image;
  c.x = e.dx, c.y = e.dy, c.width = e.dw, c.height = e.dh;
  const d = e.transform;
  h.build(c, l), d && Oa(l, d), h.triangulate(l, s, 2, a, r, o);
  const f = u.uvs;
  i.push(
    f.x0,
    f.y0,
    f.x1,
    f.y1,
    f.x3,
    f.y3,
    f.x2,
    f.y2
  );
  const m = Kt.get(Ya);
  m.indexOffset = o, m.indexSize = r.length - o, m.vertexOffset = a, m.vertexSize = s.length / 2 - a, m.color = e.style, m.alpha = e.alpha, m.texture = u, m.geometryData = n, t.push(m);
}
function Vr(e, t, n, s, i, r) {
  const { vertices: o, uvs: a, indices: l } = r, h = e.shapePrimitives.length - 1;
  e.shapePrimitives.forEach(({ shape: c, transform: u }, d) => {
    const f = l.length, m = o.length / 2, g = [], p = Oi[c.type];
    if (p.build(c, g), u && Oa(g, u), s) {
      const _ = c.closePath ?? !0;
      tf(g, t, !1, _, o, 2, m, l);
    } else if (n && h === d) {
      h !== 0 && console.warn("[Pixi Graphics] only the last shape have be cut out");
      const _ = [], M = g.slice();
      hf(n.shapePath).forEach((k) => {
        _.push(M.length / 2), M.push(...k);
      }), La(M, _, o, 2, m, l, f);
    } else
      p.triangulate(g, o, 2, m, l, f);
    const y = a.length / 2, x = t.texture;
    if (x !== st.WHITE) {
      const _ = t.matrix;
      u && _.append(u.clone().invert()), qd(o, 2, m, a, y, 2, o.length / 2 - m, _);
    } else
      Zd(a, y, 2, o.length / 2 - m);
    const b = Kt.get(Ya);
    b.indexOffset = f, b.indexSize = l.length - f, b.vertexOffset = m, b.vertexSize = o.length / 2 - m, b.color = t.color, b.alpha = t.alpha, b.texture = x, b.geometryData = r, i.push(b);
  });
}
function hf(e) {
  if (!e)
    return [];
  const t = e.shapePrimitives, n = [];
  for (let s = 0; s < t.length; s++) {
    const i = t[s].shape, r = [];
    Oi[i.type].build(i, r), n.push(r);
  }
  return n;
}
class cf {
  constructor() {
    this.batches = [], this.geometryData = {
      vertices: [],
      uvs: [],
      indices: []
    };
  }
}
class uf {
  constructor() {
    this.geometry = new Ud(), this.instructions = new aa();
  }
  init() {
    this.instructions.reset();
  }
}
const Yi = class fi {
  constructor() {
    this._activeBatchers = [], this._gpuContextHash = {}, this._graphicsDataContextHash = /* @__PURE__ */ Object.create(null), this._needsContextNeedsRebuild = [];
  }
  /**
   * Runner init called, update the default options
   * @ignore
   */
  init(t) {
    fi.defaultOptions.bezierSmoothness = (t == null ? void 0 : t.bezierSmoothness) ?? fi.defaultOptions.bezierSmoothness;
  }
  prerender() {
    this._returnActiveBatchers();
  }
  getContextRenderData(t) {
    return this._graphicsDataContextHash[t.uid] || this._initContextRenderData(t);
  }
  // Context management functions
  updateGpuContext(t) {
    let n = this._gpuContextHash[t.uid] || this._initContext(t);
    if (t.dirty) {
      n ? this._cleanGraphicsContextData(t) : n = this._initContext(t), af(t, n);
      const s = t.batchMode;
      t.customShader || s === "no-batch" ? n.isBatchable = !1 : s === "auto" && (n.isBatchable = n.geometryData.vertices.length < 400), t.dirty = !1;
    }
    return n;
  }
  getGpuContext(t) {
    return this._gpuContextHash[t.uid] || this._initContext(t);
  }
  _returnActiveBatchers() {
    for (let t = 0; t < this._activeBatchers.length; t++)
      Kt.return(this._activeBatchers[t]);
    this._activeBatchers.length = 0;
  }
  _initContextRenderData(t) {
    const n = Kt.get(uf), { batches: s, geometryData: i } = this._gpuContextHash[t.uid], r = i.vertices.length, o = i.indices.length;
    for (let c = 0; c < s.length; c++)
      s[c].applyTransform = !1;
    const a = Kt.get(jd);
    this._activeBatchers.push(a), a.ensureAttributeBuffer(r), a.ensureIndexBuffer(o), a.begin();
    for (let c = 0; c < s.length; c++) {
      const u = s[c];
      a.add(u);
    }
    a.finish(n.instructions);
    const l = n.geometry;
    l.indexBuffer.setDataWithSize(a.indexBuffer, a.indexSize, !0), l.buffers[0].setDataWithSize(a.attributeBuffer.float32View, a.attributeSize, !0);
    const h = a.batches;
    for (let c = 0; c < h.length; c++) {
      const u = h[c];
      u.bindGroup = Hd(u.textures.textures, u.textures.count);
    }
    return this._graphicsDataContextHash[t.uid] = n, n;
  }
  _initContext(t) {
    const n = new cf();
    return this._gpuContextHash[t.uid] = n, t.on("update", this.onGraphicsContextUpdate, this), t.on("destroy", this.onGraphicsContextDestroy, this), this._gpuContextHash[t.uid];
  }
  onGraphicsContextUpdate(t) {
    this._needsContextNeedsRebuild.push(t);
  }
  onGraphicsContextDestroy(t) {
    this._cleanGraphicsContextData(t), t.off("update", this.onGraphicsContextUpdate, this), t.off("destroy", this.onGraphicsContextDestroy, this), this._gpuContextHash[t.uid] = null;
  }
  _cleanGraphicsContextData(t) {
    const n = this._gpuContextHash[t.uid];
    n.isBatchable || this._graphicsDataContextHash[t.uid] && (Kt.return(this.getContextRenderData(t)), this._graphicsDataContextHash[t.uid] = null), n.batches && n.batches.forEach((s) => {
      Kt.return(s);
    });
  }
  destroy() {
    for (const t of this._needsContextNeedsRebuild)
      this._gpuContextHash[t.uid] && this.onGraphicsContextDestroy(t);
    this._needsContextNeedsRebuild.length = 0;
  }
};
Yi.extension = {
  type: [
    ft.WebGLSystem,
    ft.WebGPUSystem,
    ft.CanvasSystem
  ],
  name: "graphicsContext"
};
Yi.defaultOptions = {
  /**
   * A value from 0 to 1 that controls the smoothness of bezier curves (the higher the smoother)
   * @default 0.5
   */
  bezierSmoothness: 0.5
};
let Xa = Yi;
const df = 8, Jn = 11920929e-14, ff = 1;
function Fa(e, t, n, s, i, r, o, a, l, h) {
  const u = Math.min(
    0.99,
    // a value of 1.0 actually inverts smoothing, so we cap it at 0.99
    Math.max(0, h ?? Xa.defaultOptions.bezierSmoothness)
  );
  let d = (ff - u) / 1;
  return d *= d, mf(t, n, s, i, r, o, a, l, e, d), e;
}
function mf(e, t, n, s, i, r, o, a, l, h) {
  mi(e, t, n, s, i, r, o, a, l, h, 0), l.push(o, a);
}
function mi(e, t, n, s, i, r, o, a, l, h, c) {
  if (c > df)
    return;
  const u = (e + n) / 2, d = (t + s) / 2, f = (n + i) / 2, m = (s + r) / 2, g = (i + o) / 2, p = (r + a) / 2, y = (u + f) / 2, x = (d + m) / 2, b = (f + g) / 2, _ = (m + p) / 2, M = (y + b) / 2, B = (x + _) / 2;
  if (c > 0) {
    let k = o - e, A = a - t;
    const S = Math.abs((n - o) * A - (s - a) * k), w = Math.abs((i - o) * A - (r - a) * k);
    if (S > Jn && w > Jn) {
      if ((S + w) * (S + w) <= h * (k * k + A * A)) {
        l.push(M, B);
        return;
      }
    } else if (S > Jn) {
      if (S * S <= h * (k * k + A * A)) {
        l.push(M, B);
        return;
      }
    } else if (w > Jn) {
      if (w * w <= h * (k * k + A * A)) {
        l.push(M, B);
        return;
      }
    } else if (k = M - (e + o) / 2, A = B - (t + a) / 2, k * k + A * A <= h) {
      l.push(M, B);
      return;
    }
  }
  mi(e, t, u, d, y, x, M, B, l, h, c + 1), mi(M, B, b, _, g, p, o, a, l, h, c + 1);
}
const pf = 8, gf = 11920929e-14, yf = 1;
function _f(e, t, n, s, i, r, o, a) {
  const h = Math.min(
    0.99,
    // a value of 1.0 actually inverts smoothing, so we cap it at 0.99
    Math.max(0, a ?? Xa.defaultOptions.bezierSmoothness)
  );
  let c = (yf - h) / 1;
  return c *= c, xf(t, n, s, i, r, o, e, c), e;
}
function xf(e, t, n, s, i, r, o, a) {
  pi(o, e, t, n, s, i, r, a, 0), o.push(i, r);
}
function pi(e, t, n, s, i, r, o, a, l) {
  if (l > pf)
    return;
  const h = (t + s) / 2, c = (n + i) / 2, u = (s + r) / 2, d = (i + o) / 2, f = (h + u) / 2, m = (c + d) / 2;
  let g = r - t, p = o - n;
  const y = Math.abs((s - r) * p - (i - o) * g);
  if (y > gf) {
    if (y * y <= a * (g * g + p * p)) {
      e.push(f, m);
      return;
    }
  } else if (g = f - (t + r) / 2, p = m - (n + o) / 2, g * g + p * p <= a) {
    e.push(f, m);
    return;
  }
  pi(e, t, n, h, c, f, m, a, l + 1), pi(e, f, m, u, d, r, o, a, l + 1);
}
function Ga(e, t, n, s, i, r, o, a) {
  let l = Math.abs(i - r);
  (!o && i > r || o && r > i) && (l = 2 * Math.PI - l), a = a || Math.max(6, Math.floor(6 * Math.pow(s, 1 / 3) * (l / Math.PI))), a = Math.max(a, 3);
  let h = l / a, c = i;
  h *= o ? -1 : 1;
  for (let u = 0; u < a + 1; u++) {
    const d = Math.cos(c), f = Math.sin(c), m = t + d * s, g = n + f * s;
    e.push(m, g), c += h;
  }
}
function bf(e, t, n, s, i, r) {
  const o = e[e.length - 2], l = e[e.length - 1] - n, h = o - t, c = i - n, u = s - t, d = Math.abs(l * u - h * c);
  if (d < 1e-8 || r === 0) {
    (e[e.length - 2] !== t || e[e.length - 1] !== n) && e.push(t, n);
    return;
  }
  const f = l * l + h * h, m = c * c + u * u, g = l * c + h * u, p = r * Math.sqrt(f) / d, y = r * Math.sqrt(m) / d, x = p * g / f, b = y * g / m, _ = p * u + y * h, M = p * c + y * l, B = h * (y + x), k = l * (y + x), A = u * (p + b), S = c * (p + b), w = Math.atan2(k - M, B - _), P = Math.atan2(S - M, A - _);
  Ga(
    e,
    _ + t,
    M + n,
    r,
    w,
    P,
    h * c > u * l
  );
}
const En = Math.PI * 2, Hs = {
  centerX: 0,
  centerY: 0,
  ang1: 0,
  ang2: 0
}, Vs = ({ x: e, y: t }, n, s, i, r, o, a, l) => {
  e *= n, t *= s;
  const h = i * e - r * t, c = r * e + i * t;
  return l.x = h + o, l.y = c + a, l;
};
function wf(e, t) {
  const n = t === -1.5707963267948966 ? -0.551915024494 : 1.3333333333333333 * Math.tan(t / 4), s = t === 1.5707963267948966 ? 0.551915024494 : n, i = Math.cos(e), r = Math.sin(e), o = Math.cos(e + t), a = Math.sin(e + t);
  return [
    {
      x: i - r * s,
      y: r + i * s
    },
    {
      x: o + a * s,
      y: a - o * s
    },
    {
      x: o,
      y: a
    }
  ];
}
const zr = (e, t, n, s) => {
  const i = e * s - t * n < 0 ? -1 : 1;
  let r = e * n + t * s;
  return r > 1 && (r = 1), r < -1 && (r = -1), i * Math.acos(r);
}, vf = (e, t, n, s, i, r, o, a, l, h, c, u, d) => {
  const f = Math.pow(i, 2), m = Math.pow(r, 2), g = Math.pow(c, 2), p = Math.pow(u, 2);
  let y = f * m - f * p - m * g;
  y < 0 && (y = 0), y /= f * p + m * g, y = Math.sqrt(y) * (o === a ? -1 : 1);
  const x = y * i / r * u, b = y * -r / i * c, _ = h * x - l * b + (e + n) / 2, M = l * x + h * b + (t + s) / 2, B = (c - x) / i, k = (u - b) / r, A = (-c - x) / i, S = (-u - b) / r, w = zr(1, 0, B, k);
  let P = zr(B, k, A, S);
  a === 0 && P > 0 && (P -= En), a === 1 && P < 0 && (P += En), d.centerX = _, d.centerY = M, d.ang1 = w, d.ang2 = P;
};
function Af(e, t, n, s, i, r, o, a = 0, l = 0, h = 0) {
  if (r === 0 || o === 0)
    return;
  const c = Math.sin(a * En / 360), u = Math.cos(a * En / 360), d = u * (t - s) / 2 + c * (n - i) / 2, f = -c * (t - s) / 2 + u * (n - i) / 2;
  if (d === 0 && f === 0)
    return;
  r = Math.abs(r), o = Math.abs(o);
  const m = Math.pow(d, 2) / Math.pow(r, 2) + Math.pow(f, 2) / Math.pow(o, 2);
  m > 1 && (r *= Math.sqrt(m), o *= Math.sqrt(m)), vf(
    t,
    n,
    s,
    i,
    r,
    o,
    l,
    h,
    c,
    u,
    d,
    f,
    Hs
  );
  let { ang1: g, ang2: p } = Hs;
  const { centerX: y, centerY: x } = Hs;
  let b = Math.abs(p) / (En / 4);
  Math.abs(1 - b) < 1e-7 && (b = 1);
  const _ = Math.max(Math.ceil(b), 1);
  p /= _;
  let M = e[e.length - 2], B = e[e.length - 1];
  const k = { x: 0, y: 0 };
  for (let A = 0; A < _; A++) {
    const S = wf(g, p), { x: w, y: P } = Vs(S[0], r, o, u, c, y, x, k), { x: I, y: T } = Vs(S[1], r, o, u, c, y, x, k), { x: C, y: Y } = Vs(S[2], r, o, u, c, y, x, k);
    Fa(
      e,
      M,
      B,
      w,
      P,
      I,
      T,
      C,
      Y
    ), M = C, B = Y, g += p;
  }
}
function Mf(e, t, n) {
  const s = (o, a) => {
    const l = a.x - o.x, h = a.y - o.y, c = Math.sqrt(l * l + h * h), u = l / c, d = h / c;
    return { len: c, nx: u, ny: d };
  }, i = (o, a) => {
    o === 0 ? e.moveTo(a.x, a.y) : e.lineTo(a.x, a.y);
  };
  let r = t[t.length - 1];
  for (let o = 0; o < t.length; o++) {
    const a = t[o % t.length], l = a.radius ?? n;
    if (l <= 0) {
      i(o, a), r = a;
      continue;
    }
    const h = t[(o + 1) % t.length], c = s(a, r), u = s(a, h);
    if (c.len < 1e-4 || u.len < 1e-4) {
      i(o, a), r = a;
      continue;
    }
    let d = Math.asin(c.nx * u.ny - c.ny * u.nx), f = 1, m = !1;
    c.nx * u.nx - c.ny * -u.ny < 0 ? d < 0 ? d = Math.PI + d : (d = Math.PI - d, f = -1, m = !0) : d > 0 && (f = -1, m = !0);
    const g = d / 2;
    let p, y = Math.abs(
      Math.cos(g) * l / Math.sin(g)
    );
    y > Math.min(c.len / 2, u.len / 2) ? (y = Math.min(c.len / 2, u.len / 2), p = Math.abs(y * Math.sin(g) / Math.cos(g))) : p = l;
    const x = a.x + u.nx * y + -u.ny * p * f, b = a.y + u.ny * y + u.nx * p * f, _ = Math.atan2(c.ny, c.nx) + Math.PI / 2 * f, M = Math.atan2(u.ny, u.nx) - Math.PI / 2 * f;
    o === 0 && e.moveTo(
      x + Math.cos(_) * p,
      b + Math.sin(_) * p
    ), e.arc(x, b, p, _, M, m), r = a;
  }
}
function Sf(e, t, n, s) {
  const i = (a, l) => Math.sqrt((a.x - l.x) ** 2 + (a.y - l.y) ** 2), r = (a, l, h) => ({
    x: a.x + (l.x - a.x) * h,
    y: a.y + (l.y - a.y) * h
  }), o = t.length;
  for (let a = 0; a < o; a++) {
    const l = t[(a + 1) % o], h = l.radius ?? n;
    if (h <= 0) {
      a === 0 ? e.moveTo(l.x, l.y) : e.lineTo(l.x, l.y);
      continue;
    }
    const c = t[a], u = t[(a + 2) % o], d = i(c, l);
    let f;
    if (d < 1e-4)
      f = l;
    else {
      const p = Math.min(d / 2, h);
      f = r(
        l,
        c,
        p / d
      );
    }
    const m = i(u, l);
    let g;
    if (m < 1e-4)
      g = l;
    else {
      const p = Math.min(m / 2, h);
      g = r(
        l,
        u,
        p / m
      );
    }
    a === 0 ? e.moveTo(f.x, f.y) : e.lineTo(f.x, f.y), e.quadraticCurveTo(l.x, l.y, g.x, g.y, s);
  }
}
const Tf = new wt();
class Ef {
  constructor(t) {
    this.shapePrimitives = [], this._currentPoly = null, this._bounds = new de(), this._graphicsPath2D = t;
  }
  /**
   * Sets the starting point for a new sub-path. Any subsequent drawing commands are considered part of this path.
   * @param x - The x-coordinate for the starting point.
   * @param y - The y-coordinate for the starting point.
   * @returns The instance of the current object for chaining.
   */
  moveTo(t, n) {
    return this.startPoly(t, n), this;
  }
  /**
   * Connects the current point to a new point with a straight line. This method updates the current path.
   * @param x - The x-coordinate of the new point to connect to.
   * @param y - The y-coordinate of the new point to connect to.
   * @returns The instance of the current object for chaining.
   */
  lineTo(t, n) {
    this._ensurePoly();
    const s = this._currentPoly.points, i = s[s.length - 2], r = s[s.length - 1];
    return (i !== t || r !== n) && s.push(t, n), this;
  }
  /**
   * Adds an arc to the path. The arc is centered at (x, y)
   *  position with radius `radius` starting at `startAngle` and ending at `endAngle`.
   * @param x - The x-coordinate of the arc's center.
   * @param y - The y-coordinate of the arc's center.
   * @param radius - The radius of the arc.
   * @param startAngle - The starting angle of the arc, in radians.
   * @param endAngle - The ending angle of the arc, in radians.
   * @param counterclockwise - Specifies whether the arc should be drawn in the anticlockwise direction. False by default.
   * @returns The instance of the current object for chaining.
   */
  arc(t, n, s, i, r, o) {
    this._ensurePoly(!1);
    const a = this._currentPoly.points;
    return Ga(a, t, n, s, i, r, o), this;
  }
  /**
   * Adds an arc to the path with the arc tangent to the line joining two specified points.
   * The arc radius is specified by `radius`.
   * @param x1 - The x-coordinate of the first point.
   * @param y1 - The y-coordinate of the first point.
   * @param x2 - The x-coordinate of the second point.
   * @param y2 - The y-coordinate of the second point.
   * @param radius - The radius of the arc.
   * @returns The instance of the current object for chaining.
   */
  arcTo(t, n, s, i, r) {
    this._ensurePoly();
    const o = this._currentPoly.points;
    return bf(o, t, n, s, i, r), this;
  }
  /**
   * Adds an SVG-style arc to the path, allowing for elliptical arcs based on the SVG spec.
   * @param rx - The x-radius of the ellipse.
   * @param ry - The y-radius of the ellipse.
   * @param xAxisRotation - The rotation of the ellipse's x-axis relative
   * to the x-axis of the coordinate system, in degrees.
   * @param largeArcFlag - Determines if the arc should be greater than or less than 180 degrees.
   * @param sweepFlag - Determines if the arc should be swept in a positive angle direction.
   * @param x - The x-coordinate of the arc's end point.
   * @param y - The y-coordinate of the arc's end point.
   * @returns The instance of the current object for chaining.
   */
  arcToSvg(t, n, s, i, r, o, a) {
    const l = this._currentPoly.points;
    return Af(
      l,
      this._currentPoly.lastX,
      this._currentPoly.lastY,
      o,
      a,
      t,
      n,
      s,
      i,
      r
    ), this;
  }
  /**
   * Adds a cubic Bezier curve to the path.
   * It requires three points: the first two are control points and the third one is the end point.
   * The starting point is the last point in the current path.
   * @param cp1x - The x-coordinate of the first control point.
   * @param cp1y - The y-coordinate of the first control point.
   * @param cp2x - The x-coordinate of the second control point.
   * @param cp2y - The y-coordinate of the second control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  bezierCurveTo(t, n, s, i, r, o, a) {
    this._ensurePoly();
    const l = this._currentPoly;
    return Fa(
      this._currentPoly.points,
      l.lastX,
      l.lastY,
      t,
      n,
      s,
      i,
      r,
      o,
      a
    ), this;
  }
  /**
   * Adds a quadratic curve to the path. It requires two points: the control point and the end point.
   * The starting point is the last point in the current path.
   * @param cp1x - The x-coordinate of the control point.
   * @param cp1y - The y-coordinate of the control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothing - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  quadraticCurveTo(t, n, s, i, r) {
    this._ensurePoly();
    const o = this._currentPoly;
    return _f(
      this._currentPoly.points,
      o.lastX,
      o.lastY,
      t,
      n,
      s,
      i,
      r
    ), this;
  }
  /**
   * Closes the current path by drawing a straight line back to the start.
   * If the shape is already closed or there are no points in the path, this method does nothing.
   * @returns The instance of the current object for chaining.
   */
  closePath() {
    return this.endPoly(!0), this;
  }
  /**
   * Adds another path to the current path. This method allows for the combination of multiple paths into one.
   * @param path - The `GraphicsPath` object representing the path to add.
   * @param transform - An optional `Matrix` object to apply a transformation to the path before adding it.
   * @returns The instance of the current object for chaining.
   */
  addPath(t, n) {
    this.endPoly(), n && !n.isIdentity() && (t = t.clone(!0), t.transform(n));
    for (let s = 0; s < t.instructions.length; s++) {
      const i = t.instructions[s];
      this[i.action](...i.data);
    }
    return this;
  }
  /**
   * Finalizes the drawing of the current path. Optionally, it can close the path.
   * @param closePath - A boolean indicating whether to close the path after finishing. False by default.
   */
  finish(t = !1) {
    this.endPoly(t);
  }
  /**
   * Draws a rectangle shape. This method adds a new rectangle path to the current drawing.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param w - The width of the rectangle.
   * @param h - The height of the rectangle.
   * @param transform - An optional `Matrix` object to apply a transformation to the rectangle.
   * @returns The instance of the current object for chaining.
   */
  rect(t, n, s, i, r) {
    return this.drawShape(new wt(t, n, s, i), r), this;
  }
  /**
   * Draws a circle shape. This method adds a new circle path to the current drawing.
   * @param x - The x-coordinate of the center of the circle.
   * @param y - The y-coordinate of the center of the circle.
   * @param radius - The radius of the circle.
   * @param transform - An optional `Matrix` object to apply a transformation to the circle.
   * @returns The instance of the current object for chaining.
   */
  circle(t, n, s, i) {
    return this.drawShape(new Ii(t, n, s), i), this;
  }
  /**
   * Draws a polygon shape. This method allows for the creation of complex polygons by specifying a sequence of points.
   * @param points - An array of numbers, or or an array of PointData objects eg [{x,y}, {x,y}, {x,y}]
   * representing the x and y coordinates of the polygon's vertices, in sequence.
   * @param close - A boolean indicating whether to close the polygon path. True by default.
   * @param transform - An optional `Matrix` object to apply a transformation to the polygon.
   * @returns The instance of the current object for chaining.
   */
  poly(t, n, s) {
    const i = new Tn(t);
    return i.closePath = n, this.drawShape(i, s), this;
  }
  /**
   * Draws a regular polygon with a specified number of sides. All sides and angles are equal.
   * @param x - The x-coordinate of the center of the polygon.
   * @param y - The y-coordinate of the center of the polygon.
   * @param radius - The radius of the circumscribed circle of the polygon.
   * @param sides - The number of sides of the polygon. Must be 3 or more.
   * @param rotation - The rotation angle of the polygon, in radians. Zero by default.
   * @param transform - An optional `Matrix` object to apply a transformation to the polygon.
   * @returns The instance of the current object for chaining.
   */
  regularPoly(t, n, s, i, r = 0, o) {
    i = Math.max(i | 0, 3);
    const a = -1 * Math.PI / 2 + r, l = Math.PI * 2 / i, h = [];
    for (let c = 0; c < i; c++) {
      const u = c * l + a;
      h.push(
        t + s * Math.cos(u),
        n + s * Math.sin(u)
      );
    }
    return this.poly(h, !0, o), this;
  }
  /**
   * Draws a polygon with rounded corners.
   * Similar to `regularPoly` but with the ability to round the corners of the polygon.
   * @param x - The x-coordinate of the center of the polygon.
   * @param y - The y-coordinate of the center of the polygon.
   * @param radius - The radius of the circumscribed circle of the polygon.
   * @param sides - The number of sides of the polygon. Must be 3 or more.
   * @param corner - The radius of the rounding of the corners.
   * @param rotation - The rotation angle of the polygon, in radians. Zero by default.
   * @param smoothness - Optional parameter to adjust the smoothness of the rounding.
   * @returns The instance of the current object for chaining.
   */
  roundPoly(t, n, s, i, r, o = 0, a) {
    if (i = Math.max(i | 0, 3), r <= 0)
      return this.regularPoly(t, n, s, i, o);
    const l = s * Math.sin(Math.PI / i) - 1e-3;
    r = Math.min(r, l);
    const h = -1 * Math.PI / 2 + o, c = Math.PI * 2 / i, u = (i - 2) * Math.PI / i / 2;
    for (let d = 0; d < i; d++) {
      const f = d * c + h, m = t + s * Math.cos(f), g = n + s * Math.sin(f), p = f + Math.PI + u, y = f - Math.PI - u, x = m + r * Math.cos(p), b = g + r * Math.sin(p), _ = m + r * Math.cos(y), M = g + r * Math.sin(y);
      d === 0 ? this.moveTo(x, b) : this.lineTo(x, b), this.quadraticCurveTo(m, g, _, M, a);
    }
    return this.closePath();
  }
  /**
   * Draws a shape with rounded corners. This function supports custom radius for each corner of the shape.
   * Optionally, corners can be rounded using a quadratic curve instead of an arc, providing a different aesthetic.
   * @param points - An array of `RoundedPoint` representing the corners of the shape to draw.
   * A minimum of 3 points is required.
   * @param radius - The default radius for the corners.
   * This radius is applied to all corners unless overridden in `points`.
   * @param useQuadratic - If set to true, rounded corners are drawn using a quadraticCurve
   *  method instead of an arc method. Defaults to false.
   * @param smoothness - Specifies the smoothness of the curve when `useQuadratic` is true.
   * Higher values make the curve smoother.
   * @returns The instance of the current object for chaining.
   */
  roundShape(t, n, s = !1, i) {
    return t.length < 3 ? this : (s ? Sf(this, t, n, i) : Mf(this, t, n), this.closePath());
  }
  /**
   * Draw Rectangle with fillet corners. This is much like rounded rectangle
   * however it support negative numbers as well for the corner radius.
   * @param x - Upper left corner of rect
   * @param y - Upper right corner of rect
   * @param width - Width of rect
   * @param height - Height of rect
   * @param fillet - accept negative or positive values
   */
  filletRect(t, n, s, i, r) {
    if (r === 0)
      return this.rect(t, n, s, i);
    const o = Math.min(s, i) / 2, a = Math.min(o, Math.max(-o, r)), l = t + s, h = n + i, c = a < 0 ? -a : 0, u = Math.abs(a);
    return this.moveTo(t, n + u).arcTo(t + c, n + c, t + u, n, u).lineTo(l - u, n).arcTo(l - c, n + c, l, n + u, u).lineTo(l, h - u).arcTo(l - c, h - c, t + s - u, h, u).lineTo(t + u, h).arcTo(t + c, h - c, t, h - u, u).closePath();
  }
  /**
   * Draw Rectangle with chamfer corners. These are angled corners.
   * @param x - Upper left corner of rect
   * @param y - Upper right corner of rect
   * @param width - Width of rect
   * @param height - Height of rect
   * @param chamfer - non-zero real number, size of corner cutout
   * @param transform
   */
  chamferRect(t, n, s, i, r, o) {
    if (r <= 0)
      return this.rect(t, n, s, i);
    const a = Math.min(r, Math.min(s, i) / 2), l = t + s, h = n + i, c = [
      t + a,
      n,
      l - a,
      n,
      l,
      n + a,
      l,
      h - a,
      l - a,
      h,
      t + a,
      h,
      t,
      h - a,
      t,
      n + a
    ];
    for (let u = c.length - 1; u >= 2; u -= 2)
      c[u] === c[u - 2] && c[u - 1] === c[u - 3] && c.splice(u - 1, 2);
    return this.poly(c, !0, o);
  }
  /**
   * Draws an ellipse at the specified location and with the given x and y radii.
   * An optional transformation can be applied, allowing for rotation, scaling, and translation.
   * @param x - The x-coordinate of the center of the ellipse.
   * @param y - The y-coordinate of the center of the ellipse.
   * @param radiusX - The horizontal radius of the ellipse.
   * @param radiusY - The vertical radius of the ellipse.
   * @param transform - An optional `Matrix` object to apply a transformation to the ellipse. This can include rotations.
   * @returns The instance of the current object for chaining.
   */
  ellipse(t, n, s, i, r) {
    return this.drawShape(new Bi(t, n, s, i), r), this;
  }
  /**
   * Draws a rectangle with rounded corners.
   * The corner radius can be specified to determine how rounded the corners should be.
   * An optional transformation can be applied, which allows for rotation, scaling, and translation of the rectangle.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param w - The width of the rectangle.
   * @param h - The height of the rectangle.
   * @param radius - The radius of the rectangle's corners. If not specified, corners will be sharp.
   * @param transform - An optional `Matrix` object to apply a transformation to the rectangle.
   * @returns The instance of the current object for chaining.
   */
  roundRect(t, n, s, i, r, o) {
    return this.drawShape(new Ri(t, n, s, i, r), o), this;
  }
  /**
   * Draws a given shape on the canvas.
   * This is a generic method that can draw any type of shape specified by the `ShapePrimitive` parameter.
   * An optional transformation matrix can be applied to the shape, allowing for complex transformations.
   * @param shape - The shape to draw, defined as a `ShapePrimitive` object.
   * @param matrix - An optional `Matrix` for transforming the shape. This can include rotations,
   * scaling, and translations.
   * @returns The instance of the current object for chaining.
   */
  drawShape(t, n) {
    return this.endPoly(), this.shapePrimitives.push({ shape: t, transform: n }), this;
  }
  /**
   * Starts a new polygon path from the specified starting point.
   * This method initializes a new polygon or ends the current one if it exists.
   * @param x - The x-coordinate of the starting point of the new polygon.
   * @param y - The y-coordinate of the starting point of the new polygon.
   * @returns The instance of the current object for chaining.
   */
  startPoly(t, n) {
    let s = this._currentPoly;
    return s && this.endPoly(), s = new Tn(), s.points.push(t, n), this._currentPoly = s, this;
  }
  /**
   * Ends the current polygon path. If `closePath` is set to true,
   * the path is closed by connecting the last point to the first one.
   * This method finalizes the current polygon and prepares it for drawing or adding to the shape primitives.
   * @param closePath - A boolean indicating whether to close the polygon by connecting the last point
   *  back to the starting point. False by default.
   * @returns The instance of the current object for chaining.
   */
  endPoly(t = !1) {
    const n = this._currentPoly;
    return n && n.points.length > 2 && (n.closePath = t, this.shapePrimitives.push({ shape: n })), this._currentPoly = null, this;
  }
  _ensurePoly(t = !0) {
    if (!this._currentPoly && (this._currentPoly = new Tn(), t)) {
      const n = this.shapePrimitives[this.shapePrimitives.length - 1];
      if (n) {
        let s = n.shape.x, i = n.shape.y;
        if (!n.transform.isIdentity()) {
          const r = n.transform, o = s;
          s = r.a * s + r.c * i + r.tx, i = r.b * o + r.d * i + r.ty;
        }
        this._currentPoly.points.push(s, i);
      } else
        this._currentPoly.points.push(0, 0);
    }
  }
  /** Builds the path. */
  buildPath() {
    const t = this._graphicsPath2D;
    this.shapePrimitives.length = 0, this._currentPoly = null;
    for (let n = 0; n < t.instructions.length; n++) {
      const s = t.instructions[n];
      this[s.action](...s.data);
    }
    this.finish();
  }
  /** Gets the bounds of the path. */
  get bounds() {
    const t = this._bounds;
    t.clear();
    const n = this.shapePrimitives;
    for (let s = 0; s < n.length; s++) {
      const i = n[s], r = i.shape.getBounds(Tf);
      i.transform ? t.addRect(r, i.transform) : t.addRect(r);
    }
    return t;
  }
}
class sn {
  /**
   * Creates a `GraphicsPath` instance optionally from an SVG path string or an array of `PathInstruction`.
   * @param instructions - An SVG path string or an array of `PathInstruction` objects.
   */
  constructor(t) {
    this.instructions = [], this.uid = vt("graphicsPath"), this._dirty = !0, typeof t == "string" ? Ld(t, this) : this.instructions = (t == null ? void 0 : t.slice()) ?? [];
  }
  /**
   * Provides access to the internal shape path, ensuring it is up-to-date with the current instructions.
   * @returns The `ShapePath` instance associated with this `GraphicsPath`.
   */
  get shapePath() {
    return this._shapePath || (this._shapePath = new Ef(this)), this._dirty && (this._dirty = !1, this._shapePath.buildPath()), this._shapePath;
  }
  /**
   * Adds another `GraphicsPath` to this path, optionally applying a transformation.
   * @param path - The `GraphicsPath` to add.
   * @param transform - An optional transformation to apply to the added path.
   * @returns The instance of the current object for chaining.
   */
  addPath(t, n) {
    return t = t.clone(), this.instructions.push({ action: "addPath", data: [t, n] }), this._dirty = !0, this;
  }
  arc(...t) {
    return this.instructions.push({ action: "arc", data: t }), this._dirty = !0, this;
  }
  arcTo(...t) {
    return this.instructions.push({ action: "arcTo", data: t }), this._dirty = !0, this;
  }
  arcToSvg(...t) {
    return this.instructions.push({ action: "arcToSvg", data: t }), this._dirty = !0, this;
  }
  bezierCurveTo(...t) {
    return this.instructions.push({ action: "bezierCurveTo", data: t }), this._dirty = !0, this;
  }
  /**
   * Adds a cubic Bezier curve to the path.
   * It requires two points: the second control point and the end point. The first control point is assumed to be
   * The starting point is the last point in the current path.
   * @param cp2x - The x-coordinate of the second control point.
   * @param cp2y - The y-coordinate of the second control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  bezierCurveToShort(t, n, s, i, r) {
    const o = this.instructions[this.instructions.length - 1], a = this.getLastPoint(Tt.shared);
    let l = 0, h = 0;
    if (!o || o.action !== "bezierCurveTo")
      l = a.x, h = a.y;
    else {
      l = o.data[2], h = o.data[3];
      const c = a.x, u = a.y;
      l = c + (c - l), h = u + (u - h);
    }
    return this.instructions.push({ action: "bezierCurveTo", data: [l, h, t, n, s, i, r] }), this._dirty = !0, this;
  }
  /**
   * Closes the current path by drawing a straight line back to the start.
   * If the shape is already closed or there are no points in the path, this method does nothing.
   * @returns The instance of the current object for chaining.
   */
  closePath() {
    return this.instructions.push({ action: "closePath", data: [] }), this._dirty = !0, this;
  }
  ellipse(...t) {
    return this.instructions.push({ action: "ellipse", data: t }), this._dirty = !0, this;
  }
  lineTo(...t) {
    return this.instructions.push({ action: "lineTo", data: t }), this._dirty = !0, this;
  }
  moveTo(...t) {
    return this.instructions.push({ action: "moveTo", data: t }), this;
  }
  quadraticCurveTo(...t) {
    return this.instructions.push({ action: "quadraticCurveTo", data: t }), this._dirty = !0, this;
  }
  /**
   * Adds a quadratic curve to the path. It uses the previous point as the control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  quadraticCurveToShort(t, n, s) {
    const i = this.instructions[this.instructions.length - 1], r = this.getLastPoint(Tt.shared);
    let o = 0, a = 0;
    if (!i || i.action !== "quadraticCurveTo")
      o = r.x, a = r.y;
    else {
      o = i.data[0], a = i.data[1];
      const l = r.x, h = r.y;
      o = l + (l - o), a = h + (h - a);
    }
    return this.instructions.push({ action: "quadraticCurveTo", data: [o, a, t, n, s] }), this._dirty = !0, this;
  }
  /**
   * Draws a rectangle shape. This method adds a new rectangle path to the current drawing.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param w - The width of the rectangle.
   * @param h - The height of the rectangle.
   * @param transform - An optional `Matrix` object to apply a transformation to the rectangle.
   * @returns The instance of the current object for chaining.
   */
  rect(t, n, s, i, r) {
    return this.instructions.push({ action: "rect", data: [t, n, s, i, r] }), this._dirty = !0, this;
  }
  /**
   * Draws a circle shape. This method adds a new circle path to the current drawing.
   * @param x - The x-coordinate of the center of the circle.
   * @param y - The y-coordinate of the center of the circle.
   * @param radius - The radius of the circle.
   * @param transform - An optional `Matrix` object to apply a transformation to the circle.
   * @returns The instance of the current object for chaining.
   */
  circle(t, n, s, i) {
    return this.instructions.push({ action: "circle", data: [t, n, s, i] }), this._dirty = !0, this;
  }
  roundRect(...t) {
    return this.instructions.push({ action: "roundRect", data: t }), this._dirty = !0, this;
  }
  poly(...t) {
    return this.instructions.push({ action: "poly", data: t }), this._dirty = !0, this;
  }
  regularPoly(...t) {
    return this.instructions.push({ action: "regularPoly", data: t }), this._dirty = !0, this;
  }
  roundPoly(...t) {
    return this.instructions.push({ action: "roundPoly", data: t }), this._dirty = !0, this;
  }
  roundShape(...t) {
    return this.instructions.push({ action: "roundShape", data: t }), this._dirty = !0, this;
  }
  filletRect(...t) {
    return this.instructions.push({ action: "filletRect", data: t }), this._dirty = !0, this;
  }
  chamferRect(...t) {
    return this.instructions.push({ action: "chamferRect", data: t }), this._dirty = !0, this;
  }
  /**
   * Draws a star shape centered at a specified location. This method allows for the creation
   *  of stars with a variable number of points, outer radius, optional inner radius, and rotation.
   * The star is drawn as a closed polygon with alternating outer and inner vertices to create the star's points.
   * An optional transformation can be applied to scale, rotate, or translate the star as needed.
   * @param x - The x-coordinate of the center of the star.
   * @param y - The y-coordinate of the center of the star.
   * @param points - The number of points of the star.
   * @param radius - The outer radius of the star (distance from the center to the outer points).
   * @param innerRadius - Optional. The inner radius of the star
   * (distance from the center to the inner points between the outer points).
   * If not provided, defaults to half of the `radius`.
   * @param rotation - Optional. The rotation of the star in radians, where 0 is aligned with the y-axis.
   * Defaults to 0, meaning one point is directly upward.
   * @param transform - An optional `Matrix` object to apply a transformation to the star.
   * This can include rotations, scaling, and translations.
   * @returns The instance of the current object for chaining further drawing commands.
   */
  // eslint-disable-next-line max-len
  star(t, n, s, i, r, o, a) {
    r = r || i / 2;
    const l = -1 * Math.PI / 2 + o, h = s * 2, c = Math.PI * 2 / h, u = [];
    for (let d = 0; d < h; d++) {
      const f = d % 2 ? r : i, m = d * c + l;
      u.push(
        t + f * Math.cos(m),
        n + f * Math.sin(m)
      );
    }
    return this.poly(u, !0, a), this;
  }
  /**
   * Creates a copy of the current `GraphicsPath` instance. This method supports both shallow and deep cloning.
   * A shallow clone copies the reference of the instructions array, while a deep clone creates a new array and
   * copies each instruction individually, ensuring that modifications to the instructions of the cloned `GraphicsPath`
   * do not affect the original `GraphicsPath` and vice versa.
   * @param deep - A boolean flag indicating whether the clone should be deep.
   * @returns A new `GraphicsPath` instance that is a clone of the current instance.
   */
  clone(t = !1) {
    const n = new sn();
    if (!t)
      n.instructions = this.instructions.slice();
    else
      for (let s = 0; s < this.instructions.length; s++) {
        const i = this.instructions[s];
        n.instructions.push({ action: i.action, data: i.data.slice() });
      }
    return n;
  }
  clear() {
    return this.instructions.length = 0, this._dirty = !0, this;
  }
  /**
   * Applies a transformation matrix to all drawing instructions within the `GraphicsPath`.
   * This method enables the modification of the path's geometry according to the provided
   * transformation matrix, which can include translations, rotations, scaling, and skewing.
   *
   * Each drawing instruction in the path is updated to reflect the transformation,
   * ensuring the visual representation of the path is consistent with the applied matrix.
   *
   * Note: The transformation is applied directly to the coordinates and control points of the drawing instructions,
   * not to the path as a whole. This means the transformation's effects are baked into the individual instructions,
   * allowing for fine-grained control over the path's appearance.
   * @param matrix - A `Matrix` object representing the transformation to apply.
   * @returns The instance of the current object for chaining further operations.
   */
  transform(t) {
    if (t.isIdentity())
      return this;
    const n = t.a, s = t.b, i = t.c, r = t.d, o = t.tx, a = t.ty;
    let l = 0, h = 0, c = 0, u = 0, d = 0, f = 0, m = 0, g = 0;
    for (let p = 0; p < this.instructions.length; p++) {
      const y = this.instructions[p], x = y.data;
      switch (y.action) {
        case "moveTo":
        case "lineTo":
          l = x[0], h = x[1], x[0] = n * l + i * h + o, x[1] = s * l + r * h + a;
          break;
        case "bezierCurveTo":
          c = x[0], u = x[1], d = x[2], f = x[3], l = x[4], h = x[5], x[0] = n * c + i * u + o, x[1] = s * c + r * u + a, x[2] = n * d + i * f + o, x[3] = s * d + r * f + a, x[4] = n * l + i * h + o, x[5] = s * l + r * h + a;
          break;
        case "quadraticCurveTo":
          c = x[0], u = x[1], l = x[2], h = x[3], x[0] = n * c + i * u + o, x[1] = s * c + r * u + a, x[2] = n * l + i * h + o, x[3] = s * l + r * h + a;
          break;
        case "arcToSvg":
          l = x[5], h = x[6], m = x[0], g = x[1], x[0] = n * m + i * g, x[1] = s * m + r * g, x[5] = n * l + i * h + o, x[6] = s * l + r * h + a;
          break;
        case "circle":
          x[4] = dn(x[3], t);
          break;
        case "rect":
          x[4] = dn(x[4], t);
          break;
        case "ellipse":
          x[8] = dn(x[8], t);
          break;
        case "roundRect":
          x[5] = dn(x[5], t);
          break;
        case "addPath":
          x[0].transform(t);
          break;
        case "poly":
          x[2] = dn(x[2], t);
          break;
        default:
          ue("unknown transform action", y.action);
          break;
      }
    }
    return this._dirty = !0, this;
  }
  get bounds() {
    return this.shapePath.bounds;
  }
  /**
   * Retrieves the last point from the current drawing instructions in the `GraphicsPath`.
   * This method is useful for operations that depend on the path's current endpoint,
   * such as connecting subsequent shapes or paths. It supports various drawing instructions,
   * ensuring the last point's position is accurately determined regardless of the path's complexity.
   *
   * If the last instruction is a `closePath`, the method iterates backward through the instructions
   *  until it finds an actionable instruction that defines a point (e.g., `moveTo`, `lineTo`,
   * `quadraticCurveTo`, etc.). For compound paths added via `addPath`, it recursively retrieves
   * the last point from the nested path.
   * @param out - A `Point` object where the last point's coordinates will be stored.
   * This object is modified directly to contain the result.
   * @returns The `Point` object containing the last point's coordinates.
   */
  getLastPoint(t) {
    let n = this.instructions.length - 1, s = this.instructions[n];
    if (!s)
      return t.x = 0, t.y = 0, t;
    for (; s.action === "closePath"; ) {
      if (n--, n < 0)
        return t.x = 0, t.y = 0, t;
      s = this.instructions[n];
    }
    switch (s.action) {
      case "moveTo":
      case "lineTo":
        t.x = s.data[0], t.y = s.data[1];
        break;
      case "quadraticCurveTo":
        t.x = s.data[2], t.y = s.data[3];
        break;
      case "bezierCurveTo":
        t.x = s.data[4], t.y = s.data[5];
        break;
      case "arc":
      case "arcToSvg":
        t.x = s.data[5], t.y = s.data[6];
        break;
      case "addPath":
        s.data[0].getLastPoint(t);
        break;
    }
    return t;
  }
}
function dn(e, t) {
  return e ? e.prepend(t) : t.clone();
}
function Cf(e, t) {
  if (typeof e == "string") {
    const s = document.createElement("div");
    s.innerHTML = e.trim(), e = s.querySelector("svg");
  }
  const n = {
    context: t,
    path: new sn()
  };
  return $a(e, n, null, null), t;
}
function $a(e, t, n, s) {
  const i = e.children, { fillStyle: r, strokeStyle: o } = Pf(e);
  r && n ? n = { ...n, ...r } : r && (n = r), o && s ? s = { ...s, ...o } : o && (s = o), t.context.fillStyle = n, t.context.strokeStyle = s;
  let a, l, h, c, u, d, f, m, g, p, y, x, b, _, M, B, k;
  switch (e.nodeName.toLowerCase()) {
    case "path":
      _ = e.getAttribute("d"), M = new sn(_), t.context.path(M), n && t.context.fill(), s && t.context.stroke();
      break;
    case "circle":
      f = ct(e, "cx", 0), m = ct(e, "cy", 0), g = ct(e, "r", 0), t.context.ellipse(f, m, g, g), n && t.context.fill(), s && t.context.stroke();
      break;
    case "rect":
      a = ct(e, "x", 0), l = ct(e, "y", 0), B = ct(e, "width", 0), k = ct(e, "height", 0), p = ct(e, "rx", 0), y = ct(e, "ry", 0), p || y ? t.context.roundRect(a, l, B, k, p || y) : t.context.rect(a, l, B, k), n && t.context.fill(), s && t.context.stroke();
      break;
    case "ellipse":
      f = ct(e, "cx", 0), m = ct(e, "cy", 0), p = ct(e, "rx", 0), y = ct(e, "ry", 0), t.context.beginPath(), t.context.ellipse(f, m, p, y), n && t.context.fill(), s && t.context.stroke();
      break;
    case "line":
      h = ct(e, "x1", 0), c = ct(e, "y1", 0), u = ct(e, "x2", 0), d = ct(e, "y2", 0), t.context.beginPath(), t.context.moveTo(h, c), t.context.lineTo(u, d), s && t.context.stroke();
      break;
    case "polygon":
      b = e.getAttribute("points"), x = b.match(/\d+/g).map((A) => parseInt(A, 10)), t.context.poly(x, !0), n && t.context.fill(), s && t.context.stroke();
      break;
    case "polyline":
      b = e.getAttribute("points"), x = b.match(/\d+/g).map((A) => parseInt(A, 10)), t.context.poly(x, !1), s && t.context.stroke();
      break;
    case "g":
    case "svg":
      break;
    default: {
      console.info(`[SVG parser] <${e.nodeName}> elements unsupported`);
      break;
    }
  }
  for (let A = 0; A < i.length; A++)
    $a(i[A], t, n, s);
}
function ct(e, t, n) {
  const s = e.getAttribute(t);
  return s ? Number(s) : n;
}
function Pf(e) {
  const t = e.getAttribute("style"), n = {}, s = {};
  let i = !1, r = !1;
  if (t) {
    const o = t.split(";");
    for (let a = 0; a < o.length; a++) {
      const l = o[a], [h, c] = l.split(":");
      switch (h) {
        case "stroke":
          c !== "none" && (n.color = Pt.shared.setValue(c).toNumber(), r = !0);
          break;
        case "stroke-width":
          n.width = Number(c);
          break;
        case "fill":
          c !== "none" && (i = !0, s.color = Pt.shared.setValue(c).toNumber());
          break;
        case "fill-opacity":
          s.alpha = Number(c);
          break;
        case "stroke-opacity":
          n.alpha = Number(c);
          break;
        case "opacity":
          s.alpha = Number(c), n.alpha = Number(c);
          break;
      }
    }
  } else {
    const o = e.getAttribute("stroke");
    o && o !== "none" && (r = !0, n.color = Pt.shared.setValue(o).toNumber(), n.width = ct(e, "stroke-width", 1));
    const a = e.getAttribute("fill");
    a && a !== "none" && (i = !0, s.color = Pt.shared.setValue(a).toNumber());
  }
  return {
    strokeStyle: r ? n : null,
    fillStyle: i ? s : null
  };
}
const Na = class gi {
  constructor(t, n, s, i) {
    this.uid = vt("fillGradient"), this.type = "linear", this.gradientStops = [], this.x0 = t, this.y0 = n, this.x1 = s, this.y1 = i;
  }
  addColorStop(t, n) {
    return this.gradientStops.push({ offset: t, color: Pt.shared.setValue(n).toHex() }), this;
  }
  // TODO move to the system!
  buildLinearGradient() {
    const t = gi.defaultTextureSize, { gradientStops: n } = this, s = Oe.get().createCanvas();
    s.width = t, s.height = t;
    const i = s.getContext("2d"), r = i.createLinearGradient(0, 0, gi.defaultTextureSize, 1);
    for (let g = 0; g < n.length; g++) {
      const p = n[g];
      r.addColorStop(p.offset, p.color);
    }
    i.fillStyle = r, i.fillRect(0, 0, t, t), this.texture = new st({
      source: new Pi({
        resource: s,
        addressModeU: "clamp-to-edge",
        addressModeV: "repeat"
      })
    });
    const { x0: o, y0: a, x1: l, y1: h } = this, c = new Q(), u = l - o, d = h - a, f = Math.sqrt(u * u + d * d), m = Math.atan2(d, u);
    c.translate(-o, -a), c.scale(1 / t, 1 / t), c.rotate(-m), c.scale(256 / f, 1), this.transform = c;
  }
};
Na.defaultTextureSize = 256;
let kf = Na;
const Wr = {
  repeat: {
    addressModeU: "repeat",
    addressModeV: "repeat"
  },
  "repeat-x": {
    addressModeU: "repeat",
    addressModeV: "clamp-to-edge"
  },
  "repeat-y": {
    addressModeU: "clamp-to-edge",
    addressModeV: "repeat"
  },
  "no-repeat": {
    addressModeU: "clamp-to-edge",
    addressModeV: "clamp-to-edge"
  }
};
class If {
  constructor(t, n) {
    this.uid = vt("fillPattern"), this.transform = new Q(), this.texture = t, this.transform.scale(
      1 / t.frame.width,
      1 / t.frame.height
    ), n && (t.source.style.addressModeU = Wr[n].addressModeU, t.source.style.addressModeV = Wr[n].addressModeV);
  }
  setTransform(t) {
    const n = this.texture;
    this.transform.copyFrom(t), this.transform.invert(), this.transform.scale(
      1 / n.frame.width,
      1 / n.frame.height
    );
  }
}
function Ne(e, t) {
  var o;
  if (e == null)
    return null;
  let n, s;
  if (e != null && e.fill ? (s = e.fill, n = { ...t, ...e }) : (s = e, n = t), Pt.isColorLike(s)) {
    const a = Pt.shared.setValue(s ?? 0);
    return {
      ...n,
      color: a.toNumber(),
      alpha: a.alpha === 1 ? n.alpha : a.alpha,
      texture: st.WHITE
    };
  } else if (s instanceof If) {
    const a = s;
    return {
      ...n,
      color: 16777215,
      texture: a.texture,
      matrix: a.transform,
      fill: n.fill ?? null
    };
  } else if (s instanceof kf) {
    const a = s;
    return a.buildLinearGradient(), {
      ...n,
      color: 16777215,
      texture: a.texture,
      matrix: a.transform
    };
  }
  const i = { ...t, ...e };
  if (i.texture) {
    if (i.texture !== st.WHITE) {
      const l = ((o = i.matrix) == null ? void 0 : o.invert()) || new Q();
      l.scale(
        1 / i.texture.frame.width,
        1 / i.texture.frame.height
      ), i.matrix = l;
    }
    const a = i.texture.source.style;
    a.addressMode === "clamp-to-edge" && (a.addressMode = "repeat");
  }
  const r = Pt.shared.setValue(i.color);
  return i.alpha *= r.alpha, i.color = r.toNumber(), i.matrix = i.matrix ? i.matrix.clone() : null, i;
}
const Bf = new Tt(), jr = new Q(), Li = class Jt extends xe {
  constructor() {
    super(...arguments), this.uid = vt("graphicsContext"), this.dirty = !0, this.batchMode = "auto", this.instructions = [], this._activePath = new sn(), this._transform = new Q(), this._fillStyle = { ...Jt.defaultFillStyle }, this._strokeStyle = { ...Jt.defaultStrokeStyle }, this._stateStack = [], this._tick = 0, this._bounds = new de(), this._boundsDirty = !0;
  }
  /**
   * Creates a new GraphicsContext object that is a clone of this instance, copying all properties,
   * including the current drawing state, transformations, styles, and instructions.
   * @returns A new GraphicsContext instance with the same properties and state as this one.
   */
  clone() {
    const t = new Jt();
    return t.batchMode = this.batchMode, t.instructions = this.instructions.slice(), t._activePath = this._activePath.clone(), t._transform = this._transform.clone(), t._fillStyle = { ...this._fillStyle }, t._strokeStyle = { ...this._strokeStyle }, t._stateStack = this._stateStack.slice(), t._bounds = this._bounds.clone(), t._boundsDirty = !0, t;
  }
  /**
   * The current fill style of the graphics context. This can be a color, gradient, pattern, or a more complex style defined by a FillStyle object.
   */
  get fillStyle() {
    return this._fillStyle;
  }
  set fillStyle(t) {
    this._fillStyle = Ne(t, Jt.defaultFillStyle);
  }
  /**
   * The current stroke style of the graphics context. Similar to fill styles, stroke styles can encompass colors, gradients, patterns, or more detailed configurations via a StrokeStyle object.
   */
  get strokeStyle() {
    return this._strokeStyle;
  }
  set strokeStyle(t) {
    this._strokeStyle = Ne(t, Jt.defaultStrokeStyle);
  }
  /**
   * Sets the current fill style of the graphics context. The fill style can be a color, gradient,
   * pattern, or a more complex style defined by a FillStyle object.
   * @param style - The fill style to apply. This can be a simple color, a gradient or pattern object,
   *                or a FillStyle or ConvertedFillStyle object.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  setFillStyle(t) {
    return this._fillStyle = Ne(t, Jt.defaultFillStyle), this;
  }
  /**
   * Sets the current stroke style of the graphics context. Similar to fill styles, stroke styles can
   * encompass colors, gradients, patterns, or more detailed configurations via a StrokeStyle object.
   * @param style - The stroke style to apply. Can be defined as a color, a gradient or pattern,
   *                or a StrokeStyle or ConvertedStrokeStyle object.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  setStrokeStyle(t) {
    return this._strokeStyle = Ne(t, Jt.defaultStrokeStyle), this;
  }
  texture(t, n, s, i, r, o) {
    return this.instructions.push({
      action: "texture",
      data: {
        image: t,
        dx: s || 0,
        dy: i || 0,
        dw: r || t.frame.width,
        dh: o || t.frame.height,
        transform: this._transform.clone(),
        alpha: this._fillStyle.alpha,
        style: n ? Pt.shared.setValue(n).toNumber() : 16777215
      }
    }), this.onUpdate(), this;
  }
  /**
   * Resets the current path. Any previous path and its commands are discarded and a new path is
   * started. This is typically called before beginning a new shape or series of drawing commands.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  beginPath() {
    return this._activePath = new sn(), this;
  }
  fill(t, n) {
    let s;
    const i = this.instructions[this.instructions.length - 1];
    return this._tick === 0 && i && i.action === "stroke" ? s = i.data.path : s = this._activePath.clone(), s ? (t != null && (n !== void 0 && typeof t == "number" && (xt(_t, "GraphicsContext.fill(color, alpha) is deprecated, use GraphicsContext.fill({ color, alpha }) instead"), t = { color: t, alpha: n }), this._fillStyle = Ne(t, Jt.defaultFillStyle)), this.instructions.push({
      action: "fill",
      // TODO copy fill style!
      data: { style: this.fillStyle, path: s }
    }), this.onUpdate(), this._initNextPathLocation(), this._tick = 0, this) : this;
  }
  _initNextPathLocation() {
    const { x: t, y: n } = this._activePath.getLastPoint(Tt.shared);
    this._activePath.clear(), this._activePath.moveTo(t, n);
  }
  /**
   * Strokes the current path with the current stroke style. This method can take an optional
   * FillStyleInputs parameter to define the stroke's appearance, including its color, width, and other properties.
   * @param style - (Optional) The stroke style to apply. Can be defined as a simple color or a more complex style object. If omitted, uses the current stroke style.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  stroke(t) {
    let n;
    const s = this.instructions[this.instructions.length - 1];
    return this._tick === 0 && s && s.action === "fill" ? n = s.data.path : n = this._activePath.clone(), n ? (t != null && (this._strokeStyle = Ne(t, Jt.defaultStrokeStyle)), this.instructions.push({
      action: "stroke",
      // TODO copy fill style!
      data: { style: this.strokeStyle, path: n }
    }), this.onUpdate(), this._initNextPathLocation(), this._tick = 0, this) : this;
  }
  /**
   * Applies a cutout to the last drawn shape. This is used to create holes or complex shapes by
   * subtracting a path from the previously drawn path. If a hole is not completely in a shape, it will
   * fail to cut correctly!
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  cut() {
    for (let t = 0; t < 2; t++) {
      const n = this.instructions[this.instructions.length - 1 - t], s = this._activePath.clone();
      if (n && (n.action === "stroke" || n.action === "fill"))
        if (n.data.hole)
          n.data.hole.addPath(s);
        else {
          n.data.hole = s;
          break;
        }
    }
    return this._initNextPathLocation(), this;
  }
  /**
   * Adds an arc to the current path, which is centered at (x, y) with the specified radius,
   * starting and ending angles, and direction.
   * @param x - The x-coordinate of the arc's center.
   * @param y - The y-coordinate of the arc's center.
   * @param radius - The arc's radius.
   * @param startAngle - The starting angle, in radians.
   * @param endAngle - The ending angle, in radians.
   * @param counterclockwise - (Optional) Specifies whether the arc is drawn counterclockwise (true) or clockwise (false). Defaults to false.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  arc(t, n, s, i, r, o) {
    this._tick++;
    const a = this._transform;
    return this._activePath.arc(
      a.a * t + a.c * n + a.tx,
      a.b * t + a.d * n + a.ty,
      s,
      i,
      r,
      o
    ), this;
  }
  /**
   * Adds an arc to the current path with the given control points and radius, connected to the previous point
   * by a straight line if necessary.
   * @param x1 - The x-coordinate of the first control point.
   * @param y1 - The y-coordinate of the first control point.
   * @param x2 - The x-coordinate of the second control point.
   * @param y2 - The y-coordinate of the second control point.
   * @param radius - The arc's radius.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  arcTo(t, n, s, i, r) {
    this._tick++;
    const o = this._transform;
    return this._activePath.arcTo(
      o.a * t + o.c * n + o.tx,
      o.b * t + o.d * n + o.ty,
      o.a * s + o.c * i + o.tx,
      o.b * s + o.d * i + o.ty,
      r
    ), this;
  }
  /**
   * Adds an SVG-style arc to the path, allowing for elliptical arcs based on the SVG spec.
   * @param rx - The x-radius of the ellipse.
   * @param ry - The y-radius of the ellipse.
   * @param xAxisRotation - The rotation of the ellipse's x-axis relative
   * to the x-axis of the coordinate system, in degrees.
   * @param largeArcFlag - Determines if the arc should be greater than or less than 180 degrees.
   * @param sweepFlag - Determines if the arc should be swept in a positive angle direction.
   * @param x - The x-coordinate of the arc's end point.
   * @param y - The y-coordinate of the arc's end point.
   * @returns The instance of the current object for chaining.
   */
  arcToSvg(t, n, s, i, r, o, a) {
    this._tick++;
    const l = this._transform;
    return this._activePath.arcToSvg(
      t,
      n,
      s,
      // should we rotate this with transform??
      i,
      r,
      l.a * o + l.c * a + l.tx,
      l.b * o + l.d * a + l.ty
    ), this;
  }
  /**
   * Adds a cubic Bezier curve to the path.
   * It requires three points: the first two are control points and the third one is the end point.
   * The starting point is the last point in the current path.
   * @param cp1x - The x-coordinate of the first control point.
   * @param cp1y - The y-coordinate of the first control point.
   * @param cp2x - The x-coordinate of the second control point.
   * @param cp2y - The y-coordinate of the second control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  bezierCurveTo(t, n, s, i, r, o, a) {
    this._tick++;
    const l = this._transform;
    return this._activePath.bezierCurveTo(
      l.a * t + l.c * n + l.tx,
      l.b * t + l.d * n + l.ty,
      l.a * s + l.c * i + l.tx,
      l.b * s + l.d * i + l.ty,
      l.a * r + l.c * o + l.tx,
      l.b * r + l.d * o + l.ty,
      a
    ), this;
  }
  /**
   * Closes the current path by drawing a straight line back to the start.
   * If the shape is already closed or there are no points in the path, this method does nothing.
   * @returns The instance of the current object for chaining.
   */
  closePath() {
    var t;
    return this._tick++, (t = this._activePath) == null || t.closePath(), this;
  }
  /**
   * Draws an ellipse at the specified location and with the given x and y radii.
   * An optional transformation can be applied, allowing for rotation, scaling, and translation.
   * @param x - The x-coordinate of the center of the ellipse.
   * @param y - The y-coordinate of the center of the ellipse.
   * @param radiusX - The horizontal radius of the ellipse.
   * @param radiusY - The vertical radius of the ellipse.
   * @returns The instance of the current object for chaining.
   */
  ellipse(t, n, s, i) {
    return this._tick++, this._activePath.ellipse(t, n, s, i, this._transform.clone()), this;
  }
  /**
   * Draws a circle shape. This method adds a new circle path to the current drawing.
   * @param x - The x-coordinate of the center of the circle.
   * @param y - The y-coordinate of the center of the circle.
   * @param radius - The radius of the circle.
   * @returns The instance of the current object for chaining.
   */
  circle(t, n, s) {
    return this._tick++, this._activePath.circle(t, n, s, this._transform.clone()), this;
  }
  /**
   * Adds another `GraphicsPath` to this path, optionally applying a transformation.
   * @param path - The `GraphicsPath` to add.
   * @returns The instance of the current object for chaining.
   */
  path(t) {
    return this._tick++, this._activePath.addPath(t, this._transform.clone()), this;
  }
  /**
   * Connects the current point to a new point with a straight line. This method updates the current path.
   * @param x - The x-coordinate of the new point to connect to.
   * @param y - The y-coordinate of the new point to connect to.
   * @returns The instance of the current object for chaining.
   */
  lineTo(t, n) {
    this._tick++;
    const s = this._transform;
    return this._activePath.lineTo(
      s.a * t + s.c * n + s.tx,
      s.b * t + s.d * n + s.ty
    ), this;
  }
  /**
   * Sets the starting point for a new sub-path. Any subsequent drawing commands are considered part of this path.
   * @param x - The x-coordinate for the starting point.
   * @param y - The y-coordinate for the starting point.
   * @returns The instance of the current object for chaining.
   */
  moveTo(t, n) {
    this._tick++;
    const s = this._transform, i = this._activePath.instructions, r = s.a * t + s.c * n + s.tx, o = s.b * t + s.d * n + s.ty;
    return i.length === 1 && i[0].action === "moveTo" ? (i[0].data[0] = r, i[0].data[1] = o, this) : (this._activePath.moveTo(
      r,
      o
    ), this);
  }
  /**
   * Adds a quadratic curve to the path. It requires two points: the control point and the end point.
   * The starting point is the last point in the current path.
   * @param cpx - The x-coordinate of the control point.
   * @param cpy - The y-coordinate of the control point.
   * @param x - The x-coordinate of the end point.
   * @param y - The y-coordinate of the end point.
   * @param smoothness - Optional parameter to adjust the smoothness of the curve.
   * @returns The instance of the current object for chaining.
   */
  quadraticCurveTo(t, n, s, i, r) {
    this._tick++;
    const o = this._transform;
    return this._activePath.quadraticCurveTo(
      o.a * t + o.c * n + o.tx,
      o.b * t + o.d * n + o.ty,
      o.a * s + o.c * i + o.tx,
      o.b * s + o.d * i + o.ty,
      r
    ), this;
  }
  /**
   * Draws a rectangle shape. This method adds a new rectangle path to the current drawing.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param w - The width of the rectangle.
   * @param h - The height of the rectangle.
   * @returns The instance of the current object for chaining.
   */
  rect(t, n, s, i) {
    return this._tick++, this._activePath.rect(t, n, s, i, this._transform.clone()), this;
  }
  /**
   * Draws a rectangle with rounded corners.
   * The corner radius can be specified to determine how rounded the corners should be.
   * An optional transformation can be applied, which allows for rotation, scaling, and translation of the rectangle.
   * @param x - The x-coordinate of the top-left corner of the rectangle.
   * @param y - The y-coordinate of the top-left corner of the rectangle.
   * @param w - The width of the rectangle.
   * @param h - The height of the rectangle.
   * @param radius - The radius of the rectangle's corners. If not specified, corners will be sharp.
   * @returns The instance of the current object for chaining.
   */
  roundRect(t, n, s, i, r) {
    return this._tick++, this._activePath.roundRect(t, n, s, i, r, this._transform.clone()), this;
  }
  /**
   * Draws a polygon shape by specifying a sequence of points. This method allows for the creation of complex polygons,
   * which can be both open and closed. An optional transformation can be applied, enabling the polygon to be scaled,
   * rotated, or translated as needed.
   * @param points - An array of numbers, or an array of PointData objects eg [{x,y}, {x,y}, {x,y}]
   * representing the x and y coordinates, of the polygon's vertices, in sequence.
   * @param close - A boolean indicating whether to close the polygon path. True by default.
   */
  poly(t, n) {
    return this._tick++, this._activePath.poly(t, n, this._transform.clone()), this;
  }
  /**
   * Draws a regular polygon with a specified number of sides. All sides and angles are equal.
   * @param x - The x-coordinate of the center of the polygon.
   * @param y - The y-coordinate of the center of the polygon.
   * @param radius - The radius of the circumscribed circle of the polygon.
   * @param sides - The number of sides of the polygon. Must be 3 or more.
   * @param rotation - The rotation angle of the polygon, in radians. Zero by default.
   * @param transform - An optional `Matrix` object to apply a transformation to the polygon.
   * @returns The instance of the current object for chaining.
   */
  regularPoly(t, n, s, i, r = 0, o) {
    return this._tick++, this._activePath.regularPoly(t, n, s, i, r, o), this;
  }
  /**
   * Draws a polygon with rounded corners.
   * Similar to `regularPoly` but with the ability to round the corners of the polygon.
   * @param x - The x-coordinate of the center of the polygon.
   * @param y - The y-coordinate of the center of the polygon.
   * @param radius - The radius of the circumscribed circle of the polygon.
   * @param sides - The number of sides of the polygon. Must be 3 or more.
   * @param corner - The radius of the rounding of the corners.
   * @param rotation - The rotation angle of the polygon, in radians. Zero by default.
   * @returns The instance of the current object for chaining.
   */
  roundPoly(t, n, s, i, r, o) {
    return this._tick++, this._activePath.roundPoly(t, n, s, i, r, o), this;
  }
  /**
   * Draws a shape with rounded corners. This function supports custom radius for each corner of the shape.
   * Optionally, corners can be rounded using a quadratic curve instead of an arc, providing a different aesthetic.
   * @param points - An array of `RoundedPoint` representing the corners of the shape to draw.
   * A minimum of 3 points is required.
   * @param radius - The default radius for the corners.
   * This radius is applied to all corners unless overridden in `points`.
   * @param useQuadratic - If set to true, rounded corners are drawn using a quadraticCurve
   *  method instead of an arc method. Defaults to false.
   * @param smoothness - Specifies the smoothness of the curve when `useQuadratic` is true.
   * Higher values make the curve smoother.
   * @returns The instance of the current object for chaining.
   */
  roundShape(t, n, s, i) {
    return this._tick++, this._activePath.roundShape(t, n, s, i), this;
  }
  /**
   * Draw Rectangle with fillet corners. This is much like rounded rectangle
   * however it support negative numbers as well for the corner radius.
   * @param x - Upper left corner of rect
   * @param y - Upper right corner of rect
   * @param width - Width of rect
   * @param height - Height of rect
   * @param fillet - accept negative or positive values
   */
  filletRect(t, n, s, i, r) {
    return this._tick++, this._activePath.filletRect(t, n, s, i, r), this;
  }
  /**
   * Draw Rectangle with chamfer corners. These are angled corners.
   * @param x - Upper left corner of rect
   * @param y - Upper right corner of rect
   * @param width - Width of rect
   * @param height - Height of rect
   * @param chamfer - non-zero real number, size of corner cutout
   * @param transform
   */
  chamferRect(t, n, s, i, r, o) {
    return this._tick++, this._activePath.chamferRect(t, n, s, i, r, o), this;
  }
  /**
   * Draws a star shape centered at a specified location. This method allows for the creation
   *  of stars with a variable number of points, outer radius, optional inner radius, and rotation.
   * The star is drawn as a closed polygon with alternating outer and inner vertices to create the star's points.
   * An optional transformation can be applied to scale, rotate, or translate the star as needed.
   * @param x - The x-coordinate of the center of the star.
   * @param y - The y-coordinate of the center of the star.
   * @param points - The number of points of the star.
   * @param radius - The outer radius of the star (distance from the center to the outer points).
   * @param innerRadius - Optional. The inner radius of the star
   * (distance from the center to the inner points between the outer points).
   * If not provided, defaults to half of the `radius`.
   * @param rotation - Optional. The rotation of the star in radians, where 0 is aligned with the y-axis.
   * Defaults to 0, meaning one point is directly upward.
   * @returns The instance of the current object for chaining further drawing commands.
   */
  star(t, n, s, i, r = 0, o = 0) {
    return this._tick++, this._activePath.star(t, n, s, i, r, o, this._transform.clone()), this;
  }
  /**
   * Parses and renders an SVG string into the graphics context. This allows for complex shapes and paths
   * defined in SVG format to be drawn within the graphics context.
   * @param svg - The SVG string to be parsed and rendered.
   */
  svg(t) {
    return this._tick++, Cf(t, this), this;
  }
  /**
   * Restores the most recently saved graphics state by popping the top of the graphics state stack.
   * This includes transformations, fill styles, and stroke styles.
   */
  restore() {
    const t = this._stateStack.pop();
    return t && (this._transform = t.transform, this._fillStyle = t.fillStyle, this._strokeStyle = t.strokeStyle), this;
  }
  /** Saves the current graphics state, including transformations, fill styles, and stroke styles, onto a stack. */
  save() {
    return this._stateStack.push({
      transform: this._transform.clone(),
      fillStyle: { ...this._fillStyle },
      strokeStyle: { ...this._strokeStyle }
    }), this;
  }
  /**
   * Returns the current transformation matrix of the graphics context.
   * @returns The current transformation matrix.
   */
  getTransform() {
    return this._transform;
  }
  /**
   * Resets the current transformation matrix to the identity matrix, effectively removing any transformations (rotation, scaling, translation) previously applied.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  resetTransform() {
    return this._transform.identity(), this;
  }
  /**
   * Applies a rotation transformation to the graphics context around the current origin.
   * @param angle - The angle of rotation in radians.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  rotate(t) {
    return this._transform.rotate(t), this;
  }
  /**
   * Applies a scaling transformation to the graphics context, scaling drawings by x horizontally and by y vertically.
   * @param x - The scale factor in the horizontal direction.
   * @param y - (Optional) The scale factor in the vertical direction. If not specified, the x value is used for both directions.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  scale(t, n = t) {
    return this._transform.scale(t, n), this;
  }
  setTransform(t, n, s, i, r, o) {
    return t instanceof Q ? (this._transform.set(t.a, t.b, t.c, t.d, t.tx, t.ty), this) : (this._transform.set(t, n, s, i, r, o), this);
  }
  transform(t, n, s, i, r, o) {
    return t instanceof Q ? (this._transform.append(t), this) : (jr.set(t, n, s, i, r, o), this._transform.append(jr), this);
  }
  /**
   * Applies a translation transformation to the graphics context, moving the origin by the specified amounts.
   * @param x - The amount to translate in the horizontal direction.
   * @param y - (Optional) The amount to translate in the vertical direction. If not specified, the x value is used for both directions.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  translate(t, n = t) {
    return this._transform.translate(t, n), this;
  }
  /**
   * Clears all drawing commands from the graphics context, effectively resetting it. This includes clearing the path,
   * and optionally resetting transformations to the identity matrix.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  clear() {
    return this.instructions.length = 0, this.resetTransform(), this.onUpdate(), this;
  }
  onUpdate() {
    this.dirty || (this.emit("update", this, 16), this.dirty = !0, this._boundsDirty = !0);
  }
  /** The bounds of the graphic shape. */
  get bounds() {
    if (!this._boundsDirty)
      return this._bounds;
    const t = this._bounds;
    t.clear();
    for (let n = 0; n < this.instructions.length; n++) {
      const s = this.instructions[n], i = s.action;
      if (i === "fill") {
        const r = s.data;
        t.addBounds(r.path.bounds);
      } else if (i === "texture") {
        const r = s.data;
        t.addFrame(r.dx, r.dy, r.dx + r.dw, r.dy + r.dh, r.transform);
      }
      if (i === "stroke") {
        const r = s.data, o = r.style.width / 2, a = r.path.bounds;
        t.addFrame(
          a.minX - o,
          a.minY - o,
          a.maxX + o,
          a.maxY + o
        );
      }
    }
    return t;
  }
  /**
   * Check to see if a point is contained within this geometry.
   * @param point - Point to check if it's contained.
   * @returns {boolean} `true` if the point is contained within geometry.
   */
  containsPoint(t) {
    var i;
    if (!this.bounds.containsPoint(t.x, t.y))
      return !1;
    const n = this.instructions;
    let s = !1;
    for (let r = 0; r < n.length; r++) {
      const o = n[r], a = o.data, l = a.path;
      if (!o.action || !l)
        continue;
      const h = a.style, c = l.shapePath.shapePrimitives;
      for (let u = 0; u < c.length; u++) {
        const d = c[u].shape;
        if (!h || !d)
          continue;
        const f = c[u].transform, m = f ? f.applyInverse(t, Bf) : t;
        o.action === "fill" ? s = d.contains(m.x, m.y) : s = d.strokeContains(m.x, m.y, h.width);
        const g = a.hole;
        if (g) {
          const p = (i = g.shapePath) == null ? void 0 : i.shapePrimitives;
          if (p)
            for (let y = 0; y < p.length; y++)
              p[y].shape.contains(m.x, m.y) && (s = !1);
        }
        if (s)
          return !0;
      }
    }
    return s;
  }
  /**
   * Destroys the GraphicsData object.
   * @param options - Options parameter. A boolean will act as if all options
   *  have been set to that value
   * @param {boolean} [options.texture=false] - Should it destroy the current texture of the fill/stroke style?
   * @param {boolean} [options.textureSource=false] - Should it destroy the texture source of the fill/stroke style?
   */
  destroy(t = !1) {
    if (this._stateStack.length = 0, this._transform = null, this.emit("destroy", this), this.removeAllListeners(), typeof t == "boolean" ? t : t == null ? void 0 : t.texture) {
      const s = typeof t == "boolean" ? t : t == null ? void 0 : t.textureSource;
      this._fillStyle.texture && this._fillStyle.texture.destroy(s), this._strokeStyle.texture && this._strokeStyle.texture.destroy(s);
    }
    this._fillStyle = null, this._strokeStyle = null, this.instructions = null, this._activePath = null, this._bounds = null, this._stateStack = null, this.customShader = null, this._transform = null;
  }
};
Li.defaultFillStyle = {
  /** The color to use for the fill. */
  color: 16777215,
  /** The alpha value to use for the fill. */
  alpha: 1,
  /** The texture to use for the fill. */
  texture: st.WHITE,
  /** The matrix to apply. */
  matrix: null,
  /** The fill pattern to use. */
  fill: null
};
Li.defaultStrokeStyle = {
  /** The width of the stroke. */
  width: 1,
  /** The color to use for the stroke. */
  color: 16777215,
  /** The alpha value to use for the stroke. */
  alpha: 1,
  /** The alignment of the stroke. */
  alignment: 0.5,
  /** The miter limit to use. */
  miterLimit: 10,
  /** The line cap style to use. */
  cap: "butt",
  /** The line join style to use. */
  join: "miter",
  /** The texture to use for the fill. */
  texture: st.WHITE,
  /** The matrix to apply. */
  matrix: null,
  /** The fill pattern to use. */
  fill: null
};
let fn = Li;
class Xn extends It {
  /**
   * @param options - Options for the Graphics.
   */
  constructor(t) {
    t instanceof fn && (t = { context: t });
    const { context: n, roundPixels: s, ...i } = t || {};
    super({
      label: "Graphics",
      ...i
    }), this.canBundle = !0, this.renderPipeId = "graphics", this._roundPixels = 0, n ? this._context = n : this._context = this._ownedContext = new fn(), this._context.on("update", this.onViewUpdate, this), this.allowChildren = !1, this.roundPixels = s ?? !1;
  }
  set context(t) {
    t !== this._context && (this._context.off("update", this.onViewUpdate, this), this._context = t, this._context.on("update", this.onViewUpdate, this), this.onViewUpdate());
  }
  get context() {
    return this._context;
  }
  /**
   * The local bounds of the graphic.
   * @type {rendering.Bounds}
   */
  get bounds() {
    return this._context.bounds;
  }
  /**
   * Adds the bounds of this object to the bounds object.
   * @param bounds - The output bounds object.
   */
  addBounds(t) {
    t.addBounds(this._context.bounds);
  }
  /**
   * Checks if the object contains the given point.
   * @param point - The point to check
   */
  containsPoint(t) {
    return this._context.containsPoint(t);
  }
  /**
   *  Whether or not to round the x/y position of the graphic.
   * @type {boolean}
   */
  get roundPixels() {
    return !!this._roundPixels;
  }
  set roundPixels(t) {
    this._roundPixels = t ? 1 : 0;
  }
  onViewUpdate() {
    this._didChangeId += 4096, this._didGraphicsUpdate = !0, !this.didViewUpdate && (this.didViewUpdate = !0, this.renderGroup && this.renderGroup.onChildViewUpdate(this));
  }
  /**
   * Destroys this graphics renderable and optionally its context.
   * @param options - Options parameter. A boolean will act as if all options
   *
   * If the context was created by this graphics and `destroy(false)` or `destroy()` is called
   * then the context will still be destroyed.
   *
   * If you want to explicitly not destroy this context that this graphics created,
   * then you should pass destroy({ context: false })
   *
   * If the context was passed in as an argument to the constructor then it will not be destroyed
   * @param {boolean} [options.texture=false] - Should destroy the texture of the graphics context
   * @param {boolean} [options.textureSource=false] - Should destroy the texture source of the graphics context
   * @param {boolean} [options.context=false] - Should destroy the context
   */
  destroy(t) {
    this._ownedContext && !t ? this._ownedContext.destroy(t) : (t === !0 || (t == null ? void 0 : t.context) === !0) && this._context.destroy(t), this._ownedContext = null, this._context = null, super.destroy(t);
  }
  _callContextMethod(t, n) {
    return this.context[t](...n), this;
  }
  // --------------------------------------- GraphicsContext methods ---------------------------------------
  /**
   * Sets the current fill style of the graphics context. The fill style can be a color, gradient,
   * pattern, or a more complex style defined by a FillStyle object.
   * @param {FillStyleInputs} args - The fill style to apply. This can be a simple color, a gradient or
   * pattern object, or a FillStyle or ConvertedFillStyle object.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  setFillStyle(...t) {
    return this._callContextMethod("setFillStyle", t);
  }
  /**
   * Sets the current stroke style of the graphics context. Similar to fill styles, stroke styles can
   * encompass colors, gradients, patterns, or more detailed configurations via a StrokeStyle object.
   * @param {FillStyleInputs} args - The stroke style to apply. Can be defined as a color, a gradient or pattern,
   * or a StrokeStyle or ConvertedStrokeStyle object.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  setStrokeStyle(...t) {
    return this._callContextMethod("setStrokeStyle", t);
  }
  fill(...t) {
    return this._callContextMethod("fill", t);
  }
  /**
   * Strokes the current path with the current stroke style. This method can take an optional
   * FillStyleInputs parameter to define the stroke's appearance, including its color, width, and other properties.
   * @param {FillStyleInputs} args - (Optional) The stroke style to apply. Can be defined as a simple color or a more
   * complex style object. If omitted, uses the current stroke style.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  stroke(...t) {
    return this._callContextMethod("stroke", t);
  }
  texture(...t) {
    return this._callContextMethod("texture", t);
  }
  /**
   * Resets the current path. Any previous path and its commands are discarded and a new path is
   * started. This is typically called before beginning a new shape or series of drawing commands.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  beginPath() {
    return this._callContextMethod("beginPath", []);
  }
  /**
   * Applies a cutout to the last drawn shape. This is used to create holes or complex shapes by
   * subtracting a path from the previously drawn path. If a hole is not completely in a shape, it will
   * fail to cut correctly!
   */
  cut() {
    return this._callContextMethod("cut", []);
  }
  arc(...t) {
    return this._callContextMethod("arc", t);
  }
  arcTo(...t) {
    return this._callContextMethod("arcTo", t);
  }
  arcToSvg(...t) {
    return this._callContextMethod("arcToSvg", t);
  }
  bezierCurveTo(...t) {
    return this._callContextMethod("bezierCurveTo", t);
  }
  /**
   * Closes the current path by drawing a straight line back to the start.
   * If the shape is already closed or there are no points in the path, this method does nothing.
   * @returns The instance of the current object for chaining.
   */
  closePath() {
    return this._callContextMethod("closePath", []);
  }
  ellipse(...t) {
    return this._callContextMethod("ellipse", t);
  }
  circle(...t) {
    return this._callContextMethod("circle", t);
  }
  path(...t) {
    return this._callContextMethod("path", t);
  }
  lineTo(...t) {
    return this._callContextMethod("lineTo", t);
  }
  moveTo(...t) {
    return this._callContextMethod("moveTo", t);
  }
  quadraticCurveTo(...t) {
    return this._callContextMethod("quadraticCurveTo", t);
  }
  rect(...t) {
    return this._callContextMethod("rect", t);
  }
  roundRect(...t) {
    return this._callContextMethod("roundRect", t);
  }
  poly(...t) {
    return this._callContextMethod("poly", t);
  }
  regularPoly(...t) {
    return this._callContextMethod("regularPoly", t);
  }
  roundPoly(...t) {
    return this._callContextMethod("roundPoly", t);
  }
  roundShape(...t) {
    return this._callContextMethod("roundShape", t);
  }
  filletRect(...t) {
    return this._callContextMethod("filletRect", t);
  }
  chamferRect(...t) {
    return this._callContextMethod("chamferRect", t);
  }
  star(...t) {
    return this._callContextMethod("star", t);
  }
  svg(...t) {
    return this._callContextMethod("svg", t);
  }
  restore(...t) {
    return this._callContextMethod("restore", t);
  }
  /** Saves the current graphics state, including transformations, fill styles, and stroke styles, onto a stack. */
  save() {
    return this._callContextMethod("save", []);
  }
  /**
   * Returns the current transformation matrix of the graphics context.
   * @returns The current transformation matrix.
   */
  getTransform() {
    return this.context.getTransform();
  }
  /**
   * Resets the current transformation matrix to the identity matrix, effectively removing
   * any transformations (rotation, scaling, translation) previously applied.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  resetTransform() {
    return this._callContextMethod("resetTransform", []);
  }
  rotateTransform(...t) {
    return this._callContextMethod("rotate", t);
  }
  scaleTransform(...t) {
    return this._callContextMethod("scale", t);
  }
  setTransform(...t) {
    return this._callContextMethod("setTransform", t);
  }
  transform(...t) {
    return this._callContextMethod("transform", t);
  }
  translateTransform(...t) {
    return this._callContextMethod("translate", t);
  }
  /**
   * Clears all drawing commands from the graphics context, effectively resetting it. This includes clearing the path,
   * and optionally resetting transformations to the identity matrix.
   * @returns The instance of the current GraphicsContext for method chaining.
   */
  clear() {
    return this._callContextMethod("clear", []);
  }
  /**
   * The fill style to use.
   * @type {ConvertedFillStyle}
   */
  get fillStyle() {
    return this._context.fillStyle;
  }
  set fillStyle(t) {
    this._context.fillStyle = t;
  }
  /**
   * The stroke style to use.
   * @type {ConvertedStrokeStyle}
   */
  get strokeStyle() {
    return this._context.strokeStyle;
  }
  set strokeStyle(t) {
    this._context.strokeStyle = t;
  }
  /**
   * Creates a new Graphics object.
   * Note that only the context of the object is cloned, not its transform (position,scale,etc)
   * @param deep - Whether to create a deep clone of the graphics object. If false, the context
   * will be shared between the two objects (default false). If true, the context will be
   * cloned (recommended if you need to modify the context in any way).
   * @returns - A clone of the graphics object
   */
  clone(t = !1) {
    return t ? new Xn(this._context.clone()) : (this._ownedContext = null, new Xn(this._context));
  }
  // -------- v7 deprecations ---------
  /**
   * @param width
   * @param color
   * @param alpha
   * @deprecated since 8.0.0 Use {@link Graphics#setStrokeStyle} instead
   */
  lineStyle(t, n, s) {
    xt(_t, "Graphics#lineStyle is no longer needed. Use Graphics#setStrokeStyle to set the stroke style.");
    const i = {};
    return t && (i.width = t), n && (i.color = n), s && (i.alpha = s), this.context.strokeStyle = i, this;
  }
  /**
   * @param color
   * @param alpha
   * @deprecated since 8.0.0 Use {@link Graphics#fill} instead
   */
  beginFill(t, n) {
    xt(_t, "Graphics#beginFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.");
    const s = {};
    return t && (s.color = t), n && (s.alpha = n), this.context.fillStyle = s, this;
  }
  /**
   * @deprecated since 8.0.0 Use {@link Graphics#fill} instead
   */
  endFill() {
    xt(_t, "Graphics#endFill is no longer needed. Use Graphics#fill to fill the shape with the desired style."), this.context.fill();
    const t = this.context.strokeStyle;
    return (t.width !== fn.defaultStrokeStyle.width || t.color !== fn.defaultStrokeStyle.color || t.alpha !== fn.defaultStrokeStyle.alpha) && this.context.stroke(), this;
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#circle} instead
   */
  drawCircle(...t) {
    return xt(_t, "Graphics#drawCircle has been renamed to Graphics#circle"), this._callContextMethod("circle", t);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#ellipse} instead
   */
  drawEllipse(...t) {
    return xt(_t, "Graphics#drawEllipse has been renamed to Graphics#ellipse"), this._callContextMethod("ellipse", t);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#poly} instead
   */
  drawPolygon(...t) {
    return xt(_t, "Graphics#drawPolygon has been renamed to Graphics#poly"), this._callContextMethod("poly", t);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#rect} instead
   */
  drawRect(...t) {
    return xt(_t, "Graphics#drawRect has been renamed to Graphics#rect"), this._callContextMethod("rect", t);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#roundRect} instead
   */
  drawRoundedRect(...t) {
    return xt(_t, "Graphics#drawRoundedRect has been renamed to Graphics#roundRect"), this._callContextMethod("roundRect", t);
  }
  /**
   * @param {...any} args
   * @deprecated since 8.0.0 Use {@link Graphics#star} instead
   */
  drawStar(...t) {
    return xt(_t, "Graphics#drawStar has been renamed to Graphics#star"), this._callContextMethod("star", t);
  }
}
an.add(iu, ru);
function Rf(e, t, n, s, i) {
  Da(e, t, n || 0, s || e.length - 1, i || Of);
}
function Da(e, t, n, s, i) {
  for (; s > n; ) {
    if (s - n > 600) {
      var r = s - n + 1, o = t - n + 1, a = Math.log(r), l = 0.5 * Math.exp(2 * a / 3), h = 0.5 * Math.sqrt(a * l * (r - l) / r) * (o - r / 2 < 0 ? -1 : 1), c = Math.max(n, Math.floor(t - o * l / r + h)), u = Math.min(s, Math.floor(t + (r - o) * l / r + h));
      Da(e, t, c, u, i);
    }
    var d = e[t], f = n, m = s;
    for (mn(e, n, t), i(e[s], d) > 0 && mn(e, n, s); f < m; ) {
      for (mn(e, f, m), f++, m--; i(e[f], d) < 0; )
        f++;
      for (; i(e[m], d) > 0; )
        m--;
    }
    i(e[n], d) === 0 ? mn(e, n, m) : (m++, mn(e, m, s)), m <= t && (n = m + 1), t <= m && (s = m - 1);
  }
}
function mn(e, t, n) {
  var s = e[t];
  e[t] = e[n], e[n] = s;
}
function Of(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
class Yf {
  constructor(t = 9) {
    this._maxEntries = Math.max(4, t), this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4)), this.clear();
  }
  all() {
    return this._all(this.data, []);
  }
  search(t) {
    let n = this.data;
    const s = [];
    if (!es(t, n))
      return s;
    const i = this.toBBox, r = [];
    for (; n; ) {
      for (let o = 0; o < n.children.length; o++) {
        const a = n.children[o], l = n.leaf ? i(a) : a;
        es(t, l) && (n.leaf ? s.push(a) : Ws(t, l) ? this._all(a, s) : r.push(a));
      }
      n = r.pop();
    }
    return s;
  }
  collides(t) {
    let n = this.data;
    if (!es(t, n))
      return !1;
    const s = [];
    for (; n; ) {
      for (let i = 0; i < n.children.length; i++) {
        const r = n.children[i], o = n.leaf ? this.toBBox(r) : r;
        if (es(t, o)) {
          if (n.leaf || Ws(t, o))
            return !0;
          s.push(r);
        }
      }
      n = s.pop();
    }
    return !1;
  }
  load(t) {
    if (!(t && t.length))
      return this;
    if (t.length < this._minEntries) {
      for (let s = 0; s < t.length; s++)
        this.insert(t[s]);
      return this;
    }
    let n = this._build(t.slice(), 0, t.length - 1, 0);
    if (!this.data.children.length)
      this.data = n;
    else if (this.data.height === n.height)
      this._splitRoot(this.data, n);
    else {
      if (this.data.height < n.height) {
        const s = this.data;
        this.data = n, n = s;
      }
      this._insert(n, this.data.height - n.height - 1, !0);
    }
    return this;
  }
  insert(t) {
    return t && this._insert(t, this.data.height - 1), this;
  }
  clear() {
    return this.data = je([]), this;
  }
  remove(t, n) {
    if (!t)
      return this;
    let s = this.data;
    const i = this.toBBox(t), r = [], o = [];
    let a, l, h;
    for (; s || r.length; ) {
      if (s || (s = r.pop(), l = r[r.length - 1], a = o.pop(), h = !0), s.leaf) {
        const c = Lf(t, s.children, n);
        if (c !== -1)
          return s.children.splice(c, 1), r.push(s), this._condense(r), this;
      }
      !h && !s.leaf && Ws(s, i) ? (r.push(s), o.push(a), a = 0, l = s, s = s.children[0]) : l ? (a++, s = l.children[a], h = !1) : s = null;
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
    const s = [];
    for (; t; )
      t.leaf ? n.push(...t.children) : s.push(...t.children), t = s.pop();
    return n;
  }
  _build(t, n, s, i) {
    const r = s - n + 1;
    let o = this._maxEntries, a;
    if (r <= o)
      return a = je(t.slice(n, s + 1)), De(a, this.toBBox), a;
    i || (i = Math.ceil(Math.log(r) / Math.log(o)), o = Math.ceil(r / Math.pow(o, i - 1))), a = je([]), a.leaf = !1, a.height = i;
    const l = Math.ceil(r / o), h = l * Math.ceil(Math.sqrt(o));
    qr(t, n, s, h, this.compareMinX);
    for (let c = n; c <= s; c += h) {
      const u = Math.min(c + h - 1, s);
      qr(t, c, u, l, this.compareMinY);
      for (let d = c; d <= u; d += l) {
        const f = Math.min(d + l - 1, u);
        a.children.push(this._build(t, d, f, i - 1));
      }
    }
    return De(a, this.toBBox), a;
  }
  _chooseSubtree(t, n, s, i) {
    for (; i.push(n), !(n.leaf || i.length - 1 === s); ) {
      let r = 1 / 0, o = 1 / 0, a;
      for (let l = 0; l < n.children.length; l++) {
        const h = n.children[l], c = zs(h), u = Gf(t, h) - c;
        u < o ? (o = u, r = c < r ? c : r, a = h) : u === o && c < r && (r = c, a = h);
      }
      n = a || n.children[0];
    }
    return n;
  }
  _insert(t, n, s) {
    const i = s ? t : this.toBBox(t), r = [], o = this._chooseSubtree(i, this.data, n, r);
    for (o.children.push(t), wn(o, i); n >= 0 && r[n].children.length > this._maxEntries; )
      this._split(r, n), n--;
    this._adjustParentBBoxes(i, r, n);
  }
  // split overflowed node into two
  _split(t, n) {
    const s = t[n], i = s.children.length, r = this._minEntries;
    this._chooseSplitAxis(s, r, i);
    const o = this._chooseSplitIndex(s, r, i), a = je(s.children.splice(o, s.children.length - o));
    a.height = s.height, a.leaf = s.leaf, De(s, this.toBBox), De(a, this.toBBox), n ? t[n - 1].children.push(a) : this._splitRoot(s, a);
  }
  _splitRoot(t, n) {
    this.data = je([t, n]), this.data.height = t.height + 1, this.data.leaf = !1, De(this.data, this.toBBox);
  }
  _chooseSplitIndex(t, n, s) {
    let i, r = 1 / 0, o = 1 / 0;
    for (let a = n; a <= s - n; a++) {
      const l = bn(t, 0, a, this.toBBox), h = bn(t, a, s, this.toBBox), c = $f(l, h), u = zs(l) + zs(h);
      c < r ? (r = c, i = a, o = u < o ? u : o) : c === r && u < o && (o = u, i = a);
    }
    return i || s - n;
  }
  // sorts node children by the best axis for split
  _chooseSplitAxis(t, n, s) {
    const i = t.leaf ? this.compareMinX : Xf, r = t.leaf ? this.compareMinY : Ff, o = this._allDistMargin(t, n, s, i), a = this._allDistMargin(t, n, s, r);
    o < a && t.children.sort(i);
  }
  // total margin of all possible split distributions where each node is at least m full
  _allDistMargin(t, n, s, i) {
    t.children.sort(i);
    const r = this.toBBox, o = bn(t, 0, n, r), a = bn(t, s - n, s, r);
    let l = ts(o) + ts(a);
    for (let h = n; h < s - n; h++) {
      const c = t.children[h];
      wn(o, t.leaf ? r(c) : c), l += ts(o);
    }
    for (let h = s - n - 1; h >= n; h--) {
      const c = t.children[h];
      wn(a, t.leaf ? r(c) : c), l += ts(a);
    }
    return l;
  }
  _adjustParentBBoxes(t, n, s) {
    for (let i = s; i >= 0; i--)
      wn(n[i], t);
  }
  _condense(t) {
    for (let n = t.length - 1, s; n >= 0; n--)
      t[n].children.length === 0 ? n > 0 ? (s = t[n - 1].children, s.splice(s.indexOf(t[n]), 1)) : this.clear() : De(t[n], this.toBBox);
  }
}
function Lf(e, t, n) {
  if (!n)
    return t.indexOf(e);
  for (let s = 0; s < t.length; s++)
    if (n(e, t[s]))
      return s;
  return -1;
}
function De(e, t) {
  bn(e, 0, e.children.length, t, e);
}
function bn(e, t, n, s, i) {
  i || (i = je(null)), i.minX = 1 / 0, i.minY = 1 / 0, i.maxX = -1 / 0, i.maxY = -1 / 0;
  for (let r = t; r < n; r++) {
    const o = e.children[r];
    wn(i, e.leaf ? s(o) : o);
  }
  return i;
}
function wn(e, t) {
  return e.minX = Math.min(e.minX, t.minX), e.minY = Math.min(e.minY, t.minY), e.maxX = Math.max(e.maxX, t.maxX), e.maxY = Math.max(e.maxY, t.maxY), e;
}
function Xf(e, t) {
  return e.minX - t.minX;
}
function Ff(e, t) {
  return e.minY - t.minY;
}
function zs(e) {
  return (e.maxX - e.minX) * (e.maxY - e.minY);
}
function ts(e) {
  return e.maxX - e.minX + (e.maxY - e.minY);
}
function Gf(e, t) {
  return (Math.max(t.maxX, e.maxX) - Math.min(t.minX, e.minX)) * (Math.max(t.maxY, e.maxY) - Math.min(t.minY, e.minY));
}
function $f(e, t) {
  const n = Math.max(e.minX, t.minX), s = Math.max(e.minY, t.minY), i = Math.min(e.maxX, t.maxX), r = Math.min(e.maxY, t.maxY);
  return Math.max(0, i - n) * Math.max(0, r - s);
}
function Ws(e, t) {
  return e.minX <= t.minX && e.minY <= t.minY && t.maxX <= e.maxX && t.maxY <= e.maxY;
}
function es(e, t) {
  return t.minX <= e.maxX && t.minY <= e.maxY && t.maxX >= e.minX && t.maxY >= e.minY;
}
function je(e) {
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
function qr(e, t, n, s, i) {
  const r = [t, n];
  for (; r.length; ) {
    if (n = r.pop(), t = r.pop(), n - t <= s)
      continue;
    const o = t + Math.ceil((n - t) / s / 2) * s;
    Rf(e, o, t, n, i), r.push(t, o, o, n);
  }
}
const Nf = 1733608, Df = 0.25, Uf = 0.2, Zr = 0.25, Kr = 0.3;
class Hf {
  constructor() {
    // Likewise, if scale has not changed, counter-scaling is also skipped
    mt(this, "lastScale", 0);
    // Likewise, if center has not changed, counter-translation is also skipped
    mt(this, "lastCenter", new Cn.Point(void 0, void 0));
    // RBush tree for fast annotation lookup (spatial search)
    mt(this, "annotationTree", new Yf(16));
    // Keep track of which annotations have been updated
    mt(this, "isAnnotationUpdated", /* @__PURE__ */ new Map());
    // Update annotations in view
    mt(this, "updateAnnotationShape", (t, n, s) => {
      if (n.size === 0)
        return;
      const i = t.width * Kr, r = t.height * Kr;
      this.annotationTree.search({
        minX: t.x - i,
        minY: t.y - r,
        maxX: t.x + t.width + i,
        maxY: t.y + t.height + r
      }).forEach(({ annotationId: a }) => {
        const l = n.get(a);
        l && !this.isAnnotationUpdated.get(a) && (s(l), this.isAnnotationUpdated.set(a, !0));
      });
    });
    // Remove annotation from RBush tree
    mt(this, "removeAnnotationFromTree", (t) => {
      this.annotationTree.remove({
        minX: t.target.selector.geometry.bounds.minX,
        minY: t.target.selector.geometry.bounds.minY,
        maxX: t.target.selector.geometry.bounds.maxX,
        maxY: t.target.selector.geometry.bounds.maxY,
        annotationId: t.id
      }, (n, s) => n.annotationId === s.annotationId);
    });
    mt(this, "getGraphicsStyle", (t) => {
      const n = {
        tint: t != null && t.fill ? new Pt(t.fill).toNumber() : Nf,
        alpha: (t == null ? void 0 : t.fillOpacity) === void 0 ? Df : Math.min(t.fillOpacity, 1)
      }, s = {
        tint: (t == null ? void 0 : t.stroke) && new Pt(t.stroke).toNumber(),
        alpha: (t == null ? void 0 : t.strokeOpacity) === void 0 ? t != null && t.stroke ? 1 : 0 : Math.min(t.strokeOpacity, 1),
        lineWidth: t != null && t.stroke ? (t == null ? void 0 : t.strokeWidth) || 1 : 0
      };
      return { fillStyle: n, strokeStyle: s };
    });
    mt(this, "drawShape", (t) => (n, s, i) => {
      const { fillStyle: r, strokeStyle: o } = this.getGraphicsStyle(i), a = new Xn();
      t(s, a), a.fill(16777215), a.tint = r.tint, a.alpha = r.alpha, n.addChild(a);
      const l = o.lineWidth / this.lastScale, h = new Xn();
      return t(s, h), h.stroke({
        color: 16777215,
        width: l,
        alpha: 1,
        alignment: 0.5
      }), h.tint = o.tint || 16777215, h.alpha = o.alpha, n.addChild(h), { fill: a, stroke: h, strokeWidth: o.lineWidth, drawFn: (c) => t(s, c) };
    });
    mt(this, "drawEllipse", this.drawShape((t, n) => {
      const { cx: s, cy: i, rx: r, ry: o } = t.geometry;
      n.ellipse(s, i, r, o);
    }));
    mt(this, "drawPolygon", this.drawShape((t, n) => {
      const s = t.geometry.points.reduce((i, r) => [...i, ...r], []);
      n.poly(s);
    }));
    mt(this, "drawRectangle", this.drawShape((t, n) => {
      const { x: s, y: i, w: r, h: o } = t.geometry;
      n.rect(s, i, r, o);
    }));
    mt(this, "getCurrentScale", (t) => {
      const n = t.viewport.getContainerSize().x;
      return t.viewport.getZoom(!0) * n / t.world.getContentFactor();
    });
    mt(this, "redrawStage", (t, n, s, i) => () => {
      const r = t.viewport.viewportToImageRectangle(t.viewport.getBounds(!0)), o = this.getCurrentScale(t), a = r.getCenter();
      if (o !== this.lastScale && Math.abs(Math.log(o / this.lastScale)) > Uf && (this.isAnnotationUpdated.clear(), this.updateAnnotationShape(r, s, ({ stroke: f, strokeWidth: m, drawFn: g }) => {
        f.clear(), g(f), f.stroke({
          color: 16777215,
          width: m / o,
          alpha: 1,
          alignment: 0.5
        });
      }), this.lastScale = o), !a.equals(this.lastCenter)) {
        const f = r.width * Zr, m = r.height * Zr;
        (Math.abs(a.x - this.lastCenter.x) > f || Math.abs(a.y - this.lastCenter.y) > m) && (this.updateAnnotationShape(r, s, ({ stroke: g, strokeWidth: p, drawFn: y }) => {
          g.clear(), y(g), g.stroke({
            color: 16777215,
            width: p / o,
            alpha: 1,
            alignment: 0.5
          });
        }), this.lastCenter = a);
      }
      const l = Math.PI * t.viewport.getRotation() / 180, h = -r.x * o, c = -r.y * o;
      let u, d;
      l > 0 && l <= Math.PI / 2 ? (u = r.height * o, d = 0) : l > Math.PI / 2 && l <= Math.PI ? (u = r.width * o, d = r.height * o) : l > Math.PI && l <= Math.PI * 1.5 ? (u = 0, d = r.width * o) : (u = 0, d = 0), n.position.x = u + h * Math.cos(l) - c * Math.sin(l), n.position.y = d + h * Math.sin(l) + c * Math.cos(l), n.scale.set(o, o), n.rotation = l, i.render(n);
    });
    mt(this, "createStage", async (t, n) => {
      const s = new It(), i = await Pd({
        width: n.width,
        height: n.height,
        backgroundAlpha: 0,
        canvas: n,
        antialias: !0,
        resolution: 2
      }), r = /* @__PURE__ */ new Map();
      let o = /* @__PURE__ */ new Set(), a, l;
      this.lastScale = this.getCurrentScale(t);
      const h = (_, M) => {
        const { selector: B } = _.target, k = typeof l == "function" ? l(_, M) : l;
        let A;
        B.type === et.RECTANGLE ? A = this.drawRectangle(s, B, k) : B.type === et.POLYGON ? A = this.drawPolygon(s, B, k) : B.type === et.ELLIPSE ? A = this.drawEllipse(s, B, k) : console.warn(`Unsupported shape type: ${B.type}`), A && (this.annotationTree.insert({
          minX: B.geometry.bounds.minX,
          minY: B.geometry.bounds.minY,
          maxX: B.geometry.bounds.maxX,
          maxY: B.geometry.bounds.maxY,
          annotationId: _.id
        }), r.set(_.id, { annotation: _, ...A }));
      }, c = (_) => {
        const M = r.get(_.id);
        M && (this.removeAnnotationFromTree(_), r.delete(_.id), M.fill.destroy(), M.stroke.destroy());
      }, u = (_, M, B) => {
        const k = r.get(_.id);
        k && (this.removeAnnotationFromTree(_), r.delete(_.id), k.fill.destroy(), k.stroke.destroy(), h(M, B));
      }, d = (_, M) => {
        const B = r.get(_);
        B && (this.removeAnnotationFromTree(B.annotation), r.delete(_), B.fill.destroy(), B.stroke.destroy(), h(B.annotation, M));
      }, f = (_, M) => {
        i.resize(_, M), i.render(s);
      }, m = (_) => {
        const { children: M } = s;
        r.forEach(({ fill: B, stroke: k, annotation: A }) => {
          const S = _ ? o.has(A.id) || _(A) : !0;
          S && !M.includes(B) ? (s.addChild(B), s.addChild(k)) : !S && M.includes(B) && (s.removeChild(B), s.removeChild(k));
        }), i.render(s);
      }, g = (_) => {
        a !== _ && (a && d(a, { selected: o.has(a) }), _ && d(_, { selected: o.has(_), hovered: !0 }), a = _, i.render(s));
      }, p = (_) => {
        const M = _.selected.map((A) => A.id), B = M.filter((A) => !o.has(A)), k = [...o].filter((A) => !M.includes(A));
        [...B, ...k].forEach((A) => d(A, { selected: M.includes(A), hovered: A === a })), o = new Set(M), i.render(s);
      }, y = (_) => {
        if (typeof _ == "function")
          r.forEach(({ annotation: M, fill: B, stroke: k, strokeWidth: A, drawFn: S }, w) => {
            const { fillStyle: P, strokeStyle: I } = this.getGraphicsStyle(_(M));
            B.tint = P.tint, B.alpha = P.alpha, k.tint = I.tint || 16777215, k.alpha = I.alpha, r.set(M.id, { annotation: M, fill: B, stroke: k, strokeWidth: A, drawFn: S });
          });
        else {
          const { fillStyle: M, strokeStyle: B } = this.getGraphicsStyle(_);
          r.forEach(({ annotation: k, fill: A, stroke: S, strokeWidth: w, drawFn: P }, I) => {
            A.tint = M.tint, A.alpha = M.alpha, S.tint = B.tint || 16777215, S.alpha = B.alpha, r.set(k.id, { annotation: k, fill: A, stroke: S, strokeWidth: w, drawFn: P });
          });
        }
        l = _, i.render(s);
      }, x = (_) => {
        _ ? n.classList.remove("hidden") : n.classList.add("hidden");
      };
      return {
        addAnnotation: h,
        destroy: () => {
          this.annotationTree.clear(), i.destroy();
        },
        redraw: this.redrawStage(t, s, r, i),
        removeAnnotation: c,
        resize: f,
        setFilter: m,
        setHovered: g,
        setSelected: p,
        setStyle: y,
        setVisible: x,
        updateAnnotation: u
      };
    });
  }
}
function Vf(e, t, n) {
  let s, i, { filter: r } = t, { state: o } = t, { style: a } = t, { viewer: l } = t, { visible: h = !0 } = t;
  const { store: c, hover: u, selection: d, viewport: f } = o;
  Js(e, u, (A) => n(12, s = A)), Js(e, d, (A) => n(8, i = A));
  const m = gs();
  let g, p, y = new Promise((A) => {
    p = A;
  }), x;
  const b = (A) => {
    const S = new Cn.Point(A.x, A.y), { x: w, y: P } = l.viewport.pointFromPixel(S);
    return l.viewport.viewportToImageCoordinates(w, P);
  }, _ = (A) => {
    const { x: S, y: w } = A.position;
    x = { x: S, y: w };
  }, M = (A) => (S) => {
    const { x: w, y: P } = b(new Cn.Point(S.offsetX, S.offsetY)), I = c.getAt(w, P);
    I && (!r || r(I)) ? (A.classList.add("hover"), s !== I.id && (u.set(I.id), g.setHovered(I.id))) : (A.classList.remove("hover"), s && (u.set(void 0), g.setHovered(void 0)));
  }, B = (A) => {
    const S = A.originalEvent, { x: w, y: P } = A.position, I = w - x.x, T = P - x.y;
    if (Math.sqrt(I * I + T * T) < 5) {
      const { x: Y, y: X } = b(A.position), D = c.getAt(Y, X);
      D ? m("click", { originalEvent: S, annotation: D }) : m("click", { originalEvent: S });
    }
    x = void 0;
  };
  let k;
  return ps(() => {
    var T;
    const { offsetWidth: A, offsetHeight: S } = l.canvas, w = document.createElement("canvas");
    w.width = A, w.height = S, w.className = "a9s-gl-canvas", (T = l.element.querySelector(".openseadragon-canvas")) == null || T.appendChild(w);
    const P = M(w), I = () => {
      const C = l.viewport.getBounds();
      k = l.viewport.viewportToImageRectangle(C);
      const { x: Y, y: X, width: D, height: W } = k, G = c.getIntersecting(Y, X, D, W);
      f.set(G.map((O) => O.id));
    };
    return new Hf().createStage(l, w).then((C) => {
      n(7, g = C), w.addEventListener("pointermove", P), new ResizeObserver((X) => {
        try {
          const { width: D, height: W } = X[0].contentRect;
          g.resize(D, W);
        } catch {
          console.warn("WebGL canvas already disposed");
        }
      }).observe(w), l.addHandler("canvas-press", _), l.addHandler("canvas-release", B), l.addHandler("update-viewport", g.redraw), l.addHandler("animation-finish", I), p();
    }), () => {
      var C;
      w.removeEventListener("pointermove", P), l.removeHandler("canvas-press", _), l.removeHandler("canvas-release", B), l.removeHandler("update-viewport", g.redraw), l.removeHandler("animation-finish", I), g.destroy(), (C = w.parentNode) == null || C.removeChild(w);
    };
  }), c.observe(async (A) => {
    await y;
    const { created: S, updated: w, deleted: P } = A.changes;
    if ((S || []).forEach((I) => g.addAnnotation(I)), (w || []).forEach(({ oldValue: I, newValue: T }) => g.updateAnnotation(I, T)), (P || []).forEach((I) => g.removeAnnotation(I)), k) {
      const { x: I, y: T, width: C, height: Y } = k, X = c.getIntersecting(I, T, C, Y);
      f.set(X.map((D) => D.id));
    } else
      f.set(c.all().map((I) => I.id));
    g.redraw();
  }), e.$$set = (A) => {
    "filter" in A && n(2, r = A.filter), "state" in A && n(3, o = A.state), "style" in A && n(4, a = A.style), "viewer" in A && n(5, l = A.viewer), "visible" in A && n(6, h = A.visible);
  }, e.$$.update = () => {
    e.$$.dirty & /*stage, filter*/
    132 && (g == null || g.setFilter(r)), e.$$.dirty & /*stage, $selection*/
    384 && (g == null || g.setSelected(i)), e.$$.dirty & /*stage, style*/
    144 && (g == null || g.setStyle(a)), e.$$.dirty & /*stage, visible*/
    192 && (g == null || g.setVisible(h));
  }, [u, d, r, o, a, l, h, g, i];
}
class zf extends Nt {
  constructor(t) {
    super(), $t(this, t, Vf, null, kt, {
      filter: 2,
      state: 3,
      style: 4,
      viewer: 5,
      visible: 6
    });
  }
}
let ns;
const Wf = new Uint8Array(16);
function jf() {
  if (!ns && (ns = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !ns))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return ns(Wf);
}
const yt = [];
for (let e = 0; e < 256; ++e)
  yt.push((e + 256).toString(16).slice(1));
function qf(e, t = 0) {
  return yt[e[t + 0]] + yt[e[t + 1]] + yt[e[t + 2]] + yt[e[t + 3]] + "-" + yt[e[t + 4]] + yt[e[t + 5]] + "-" + yt[e[t + 6]] + yt[e[t + 7]] + "-" + yt[e[t + 8]] + yt[e[t + 9]] + "-" + yt[e[t + 10]] + yt[e[t + 11]] + yt[e[t + 12]] + yt[e[t + 13]] + yt[e[t + 14]] + yt[e[t + 15]];
}
const Zf = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Qr = {
  randomUUID: Zf
};
function Kf(e, t, n) {
  if (Qr.randomUUID && !t && !e)
    return Qr.randomUUID();
  e = e || {};
  const s = e.random || (e.rng || jf)();
  return s[6] = s[6] & 15 | 64, s[8] = s[8] & 63 | 128, qf(s);
}
var rn = /* @__PURE__ */ ((e) => (e.ELLIPSE = "ELLIPSE", e.POLYGON = "POLYGON", e.RECTANGLE = "RECTANGLE", e))(rn || {});
const Xi = (e, t) => t, Qf = (e) => {
  let t = 1 / 0, n = 1 / 0, s = -1 / 0, i = -1 / 0;
  return e.forEach(([r, o]) => {
    t = Math.min(t, r), n = Math.min(n, o), s = Math.max(s, r), i = Math.max(i, o);
  }), { minX: t, minY: n, maxX: s, maxY: i };
}, Jf = {
  area: (e) => Math.PI * e.geometry.rx * e.geometry.ry,
  intersects: (e, t, n) => {
    const { cx: s, cy: i, rx: r, ry: o } = e.geometry, a = 0, l = Math.cos(a), h = Math.sin(a), c = t - s, u = n - i, d = l * c + h * u, f = h * c - l * u;
    return d * d / (r * r) + f * f / (o * o) <= 1;
  }
};
Xi(rn.ELLIPSE, Jf);
const tm = {
  area: (e) => {
    const { points: t } = e.geometry;
    let n = 0, s = t.length - 1;
    for (let i = 0; i < t.length; i++)
      n += (t[s][0] + t[i][0]) * (t[s][1] - t[i][1]), s = i;
    return Math.abs(0.5 * n);
  },
  intersects: (e, t, n) => {
    const { points: s } = e.geometry;
    let i = !1;
    for (let r = 0, o = s.length - 1; r < s.length; o = r++) {
      const a = s[r][0], l = s[r][1], h = s[o][0], c = s[o][1];
      l > n != c > n && t < (h - a) * (n - l) / (c - l) + a && (i = !i);
    }
    return i;
  }
};
Xi(rn.POLYGON, tm);
const em = {
  area: (e) => e.geometry.w * e.geometry.h,
  intersects: (e, t, n) => t >= e.geometry.x && t <= e.geometry.x + e.geometry.w && n >= e.geometry.y && n <= e.geometry.y + e.geometry.h
};
Xi(rn.RECTANGLE, em);
function Jr(e, t, n) {
  const s = e.slice();
  return s[10] = t[n], s[12] = n, s;
}
function to(e) {
  let t, n;
  return t = new vn({
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
    At(
      /*grab*/
      e[9](`HANDLE-${/*idx*/
      e[12]}`)
    ) && e[9](`HANDLE-${/*idx*/
    e[12]}`).apply(this, arguments);
  }), {
    c() {
      Ct(t.$$.fragment);
    },
    m(s, i) {
      Mt(t, s, i), n = !0;
    },
    p(s, i) {
      e = s;
      const r = {};
      i & /*geom*/
      16 && (r.x = /*point*/
      e[10][0]), i & /*geom*/
      16 && (r.y = /*point*/
      e[10][1]), i & /*viewportScale*/
      8 && (r.scale = /*viewportScale*/
      e[3]), t.$set(r);
    },
    i(s) {
      n || (H(t.$$.fragment, s), n = !0);
    },
    o(s) {
      q(t.$$.fragment, s), n = !1;
    },
    d(s) {
      St(t, s);
    }
  };
}
function nm(e) {
  let t, n, s, i, r, o, a, l, h, c, u, d = tn(
    /*geom*/
    e[4].points
  ), f = [];
  for (let g = 0; g < d.length; g += 1)
    f[g] = to(Jr(e, d, g));
  const m = (g) => q(f[g], 1, 1, () => {
    f[g] = null;
  });
  return {
    c() {
      t = nt("polygon"), i = Zt(), r = nt("polygon"), a = Zt();
      for (let g = 0; g < f.length; g += 1)
        f[g].c();
      l = _e(), E(t, "class", "a9s-outer"), E(t, "style", n = /*computedStyle*/
      e[1] ? "display:none;" : void 0), E(t, "points", s = /*geom*/
      e[4].points.map(eo).join(" ")), E(r, "class", "a9s-inner a9s-shape-handle"), E(
        r,
        "style",
        /*computedStyle*/
        e[1]
      ), E(r, "points", o = /*geom*/
      e[4].points.map(no).join(" "));
    },
    m(g, p) {
      j(g, t, p), j(g, i, p), j(g, r, p), j(g, a, p);
      for (let y = 0; y < f.length; y += 1)
        f[y] && f[y].m(g, p);
      j(g, l, p), h = !0, c || (u = [
        bt(t, "pointerdown", function() {
          At(
            /*grab*/
            e[9]("SHAPE")
          ) && e[9]("SHAPE").apply(this, arguments);
        }),
        bt(r, "pointerdown", function() {
          At(
            /*grab*/
            e[9]("SHAPE")
          ) && e[9]("SHAPE").apply(this, arguments);
        })
      ], c = !0);
    },
    p(g, p) {
      if (e = g, (!h || p & /*computedStyle*/
      2 && n !== (n = /*computedStyle*/
      e[1] ? "display:none;" : void 0)) && E(t, "style", n), (!h || p & /*geom*/
      16 && s !== (s = /*geom*/
      e[4].points.map(eo).join(" "))) && E(t, "points", s), (!h || p & /*computedStyle*/
      2) && E(
        r,
        "style",
        /*computedStyle*/
        e[1]
      ), (!h || p & /*geom*/
      16 && o !== (o = /*geom*/
      e[4].points.map(no).join(" "))) && E(r, "points", o), p & /*geom, viewportScale, grab*/
      536) {
        d = tn(
          /*geom*/
          e[4].points
        );
        let y;
        for (y = 0; y < d.length; y += 1) {
          const x = Jr(e, d, y);
          f[y] ? (f[y].p(x, p), H(f[y], 1)) : (f[y] = to(x), f[y].c(), H(f[y], 1), f[y].m(l.parentNode, l));
        }
        for (me(), y = d.length; y < f.length; y += 1)
          m(y);
        pe();
      }
    },
    i(g) {
      if (!h) {
        for (let p = 0; p < d.length; p += 1)
          H(f[p]);
        h = !0;
      }
    },
    o(g) {
      f = f.filter(Boolean);
      for (let p = 0; p < f.length; p += 1)
        q(f[p]);
      h = !1;
    },
    d(g) {
      g && (z(t), z(i), z(r), z(a), z(l)), Ai(f, g), c = !1, fe(u);
    }
  };
}
function sm(e) {
  let t, n;
  return t = new Ua({
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
          nm,
          ({ grab: s }) => ({ 9: s }),
          ({ grab: s }) => s ? 512 : 0
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
      Ct(t.$$.fragment);
    },
    m(s, i) {
      Mt(t, s, i), n = !0;
    },
    p(s, [i]) {
      const r = {};
      i & /*shape*/
      1 && (r.shape = /*shape*/
      s[0]), i & /*transform*/
      4 && (r.transform = /*transform*/
      s[2]), i & /*$$scope, geom, viewportScale, grab, computedStyle*/
      8730 && (r.$$scope = { dirty: i, ctx: s }), t.$set(r);
    },
    i(s) {
      n || (H(t.$$.fragment, s), n = !0);
    },
    o(s) {
      q(t.$$.fragment, s), n = !1;
    },
    d(s) {
      St(t, s);
    }
  };
}
const eo = (e) => e.join(","), no = (e) => e.join(",");
function im(e, t, n) {
  let s, { shape: i } = t, { computedStyle: r } = t, { transform: o } = t, { viewportScale: a = 1 } = t;
  const l = (d, f, m) => {
    let g;
    const p = d.geometry;
    f === "SHAPE" ? g = p.points.map(([x, b]) => [x + m[0], b + m[1]]) : g = p.points.map(([x, b], _) => f === `HANDLE-${_}` ? [x + m[0], b + m[1]] : [x, b]);
    const y = Qf(g);
    return { ...d, geometry: { points: g, bounds: y } };
  };
  function h(d) {
    he.call(this, e, d);
  }
  function c(d) {
    he.call(this, e, d);
  }
  function u(d) {
    he.call(this, e, d);
  }
  return e.$$set = (d) => {
    "shape" in d && n(0, i = d.shape), "computedStyle" in d && n(1, r = d.computedStyle), "transform" in d && n(2, o = d.transform), "viewportScale" in d && n(3, a = d.viewportScale);
  }, e.$$.update = () => {
    e.$$.dirty & /*shape*/
    1 && n(4, s = i.geometry);
  }, [
    i,
    r,
    o,
    a,
    s,
    l,
    h,
    c,
    u
  ];
}
class rm extends Nt {
  constructor(t) {
    super(), $t(this, t, im, sm, kt, {
      shape: 0,
      computedStyle: 1,
      transform: 2,
      viewportScale: 3
    });
  }
}
const om = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
function am(e) {
  let t, n, s, i, r, o;
  return {
    c() {
      t = nt("rect"), E(t, "class", n = ls(`a9s-handle ${/*$$props*/
      e[8].class || ""}`.trim()) + " svelte-1sgkh33"), E(t, "x", s = /*x*/
      e[0] - /*handleSize*/
      e[5] / 2), E(t, "y", i = /*y*/
      e[1] - /*handleSize*/
      e[5] / 2), E(
        t,
        "width",
        /*handleSize*/
        e[5]
      ), E(
        t,
        "height",
        /*handleSize*/
        e[5]
      );
    },
    m(a, l) {
      j(a, t, l), r || (o = bt(
        t,
        "pointerdown",
        /*pointerdown_handler_2*/
        e[11]
      ), r = !0);
    },
    p(a, l) {
      l & /*$$props*/
      256 && n !== (n = ls(`a9s-handle ${/*$$props*/
      a[8].class || ""}`.trim()) + " svelte-1sgkh33") && E(t, "class", n), l & /*x, handleSize*/
      33 && s !== (s = /*x*/
      a[0] - /*handleSize*/
      a[5] / 2) && E(t, "x", s), l & /*y, handleSize*/
      34 && i !== (i = /*y*/
      a[1] - /*handleSize*/
      a[5] / 2) && E(t, "y", i), l & /*handleSize*/
      32 && E(
        t,
        "width",
        /*handleSize*/
        a[5]
      ), l & /*handleSize*/
      32 && E(
        t,
        "height",
        /*handleSize*/
        a[5]
      );
    },
    d(a) {
      a && z(t), r = !1, o();
    }
  };
}
function lm(e) {
  let t, n, s, i, r, o, a, l, h;
  return {
    c() {
      t = nt("g"), n = nt("circle"), i = nt("rect"), E(
        n,
        "cx",
        /*x*/
        e[0]
      ), E(
        n,
        "cy",
        /*y*/
        e[1]
      ), E(n, "r", s = /*radius*/
      e[3] / /*scale*/
      e[2]), E(n, "class", "a9s-touch-halo svelte-1sgkh33"), hs(
        n,
        "touched",
        /*touched*/
        e[4]
      ), E(i, "class", r = ls(`a9s-handle ${/*$$props*/
      e[8].class || ""}`.trim()) + " svelte-1sgkh33"), E(i, "x", o = /*x*/
      e[0] - /*handleSize*/
      e[5] / 2), E(i, "y", a = /*y*/
      e[1] - /*handleSize*/
      e[5] / 2), E(
        i,
        "width",
        /*handleSize*/
        e[5]
      ), E(
        i,
        "height",
        /*handleSize*/
        e[5]
      ), E(t, "class", "a9s-touch-handle");
    },
    m(c, u) {
      j(c, t, u), le(t, n), le(t, i), l || (h = [
        bt(
          n,
          "pointerdown",
          /*pointerdown_handler*/
          e[10]
        ),
        bt(
          n,
          "pointerdown",
          /*onPointerDown*/
          e[6]
        ),
        bt(
          n,
          "pointerup",
          /*onPointerUp*/
          e[7]
        ),
        bt(
          i,
          "pointerdown",
          /*pointerdown_handler_1*/
          e[9]
        ),
        bt(
          i,
          "pointerdown",
          /*onPointerDown*/
          e[6]
        ),
        bt(
          i,
          "pointerup",
          /*onPointerUp*/
          e[7]
        )
      ], l = !0);
    },
    p(c, u) {
      u & /*x*/
      1 && E(
        n,
        "cx",
        /*x*/
        c[0]
      ), u & /*y*/
      2 && E(
        n,
        "cy",
        /*y*/
        c[1]
      ), u & /*radius, scale*/
      12 && s !== (s = /*radius*/
      c[3] / /*scale*/
      c[2]) && E(n, "r", s), u & /*touched*/
      16 && hs(
        n,
        "touched",
        /*touched*/
        c[4]
      ), u & /*$$props*/
      256 && r !== (r = ls(`a9s-handle ${/*$$props*/
      c[8].class || ""}`.trim()) + " svelte-1sgkh33") && E(i, "class", r), u & /*x, handleSize*/
      33 && o !== (o = /*x*/
      c[0] - /*handleSize*/
      c[5] / 2) && E(i, "x", o), u & /*y, handleSize*/
      34 && a !== (a = /*y*/
      c[1] - /*handleSize*/
      c[5] / 2) && E(i, "y", a), u & /*handleSize*/
      32 && E(
        i,
        "width",
        /*handleSize*/
        c[5]
      ), u & /*handleSize*/
      32 && E(
        i,
        "height",
        /*handleSize*/
        c[5]
      );
    },
    d(c) {
      c && z(t), l = !1, fe(h);
    }
  };
}
function hm(e) {
  let t;
  function n(r, o) {
    return om ? lm : am;
  }
  let i = n()(e);
  return {
    c() {
      i.c(), t = _e();
    },
    m(r, o) {
      i.m(r, o), j(r, t, o);
    },
    p(r, [o]) {
      i.p(r, o);
    },
    i: se,
    o: se,
    d(r) {
      r && z(t), i.d(r);
    }
  };
}
function cm(e, t, n) {
  let s, { x: i } = t, { y: r } = t, { scale: o } = t, { radius: a = 30 } = t, l = !1;
  const h = (m) => {
    m.pointerType === "touch" && n(4, l = !0);
  }, c = () => n(4, l = !1);
  function u(m) {
    he.call(this, e, m);
  }
  function d(m) {
    he.call(this, e, m);
  }
  function f(m) {
    he.call(this, e, m);
  }
  return e.$$set = (m) => {
    n(8, t = Qs(Qs({}, t), gr(m))), "x" in m && n(0, i = m.x), "y" in m && n(1, r = m.y), "scale" in m && n(2, o = m.scale), "radius" in m && n(3, a = m.radius);
  }, e.$$.update = () => {
    e.$$.dirty & /*scale*/
    4 && n(5, s = 10 / o);
  }, t = gr(t), [
    i,
    r,
    o,
    a,
    l,
    s,
    h,
    c,
    t,
    u,
    d,
    f
  ];
}
class vn extends Nt {
  constructor(t) {
    super(), $t(this, t, cm, hm, kt, { x: 0, y: 1, scale: 2, radius: 3 });
  }
}
function um(e) {
  let t, n, s, i, r, o, a, l, h, c, u, d, f, m, g, p, y, x, b, _, M, B, k, A, S, w, P, I, T, C, Y, X, D, W, G, O, lt, $, tt, J, F, Yt, ge;
  return W = new vn({
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
  }), W.$on("pointerdown", function() {
    At(
      /*grab*/
      e[9]("TOP_LEFT")
    ) && e[9]("TOP_LEFT").apply(this, arguments);
  }), O = new vn({
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
  }), O.$on("pointerdown", function() {
    At(
      /*grab*/
      e[9]("TOP_RIGHT")
    ) && e[9]("TOP_RIGHT").apply(this, arguments);
  }), $ = new vn({
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
  }), $.$on("pointerdown", function() {
    At(
      /*grab*/
      e[9]("BOTTOM_RIGHT")
    ) && e[9]("BOTTOM_RIGHT").apply(this, arguments);
  }), J = new vn({
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
  }), J.$on("pointerdown", function() {
    At(
      /*grab*/
      e[9]("BOTTOM_LEFT")
    ) && e[9]("BOTTOM_LEFT").apply(this, arguments);
  }), {
    c() {
      t = nt("rect"), a = Zt(), l = nt("rect"), f = Zt(), m = nt("rect"), x = Zt(), b = nt("rect"), k = Zt(), A = nt("rect"), I = Zt(), T = nt("rect"), D = Zt(), Ct(W.$$.fragment), G = Zt(), Ct(O.$$.fragment), lt = Zt(), Ct($.$$.fragment), tt = Zt(), Ct(J.$$.fragment), E(t, "class", "a9s-outer"), E(t, "style", n = /*computedStyle*/
      e[1] ? "display:none;" : void 0), E(t, "x", s = /*geom*/
      e[4].x), E(t, "y", i = /*geom*/
      e[4].y), E(t, "width", r = /*geom*/
      e[4].w), E(t, "height", o = /*geom*/
      e[4].h), E(l, "class", "a9s-inner a9s-shape-handle"), E(
        l,
        "style",
        /*computedStyle*/
        e[1]
      ), E(l, "x", h = /*geom*/
      e[4].x), E(l, "y", c = /*geom*/
      e[4].y), E(l, "width", u = /*geom*/
      e[4].w), E(l, "height", d = /*geom*/
      e[4].h), E(m, "class", "a9s-edge-handle a9s-edge-handle-top"), E(m, "x", g = /*geom*/
      e[4].x), E(m, "y", p = /*geom*/
      e[4].y), E(m, "height", 1), E(m, "width", y = /*geom*/
      e[4].w), E(b, "class", "a9s-edge-handle a9s-edge-handle-right"), E(b, "x", _ = /*geom*/
      e[4].x + /*geom*/
      e[4].w), E(b, "y", M = /*geom*/
      e[4].y), E(b, "height", B = /*geom*/
      e[4].h), E(b, "width", 1), E(A, "class", "a9s-edge-handle a9s-edge-handle-bottom"), E(A, "x", S = /*geom*/
      e[4].x), E(A, "y", w = /*geom*/
      e[4].y + /*geom*/
      e[4].h), E(A, "height", 1), E(A, "width", P = /*geom*/
      e[4].w), E(T, "class", "a9s-edge-handle a9s-edge-handle-left"), E(T, "x", C = /*geom*/
      e[4].x), E(T, "y", Y = /*geom*/
      e[4].y), E(T, "height", X = /*geom*/
      e[4].h), E(T, "width", 1);
    },
    m(L, R) {
      j(L, t, R), j(L, a, R), j(L, l, R), j(L, f, R), j(L, m, R), j(L, x, R), j(L, b, R), j(L, k, R), j(L, A, R), j(L, I, R), j(L, T, R), j(L, D, R), Mt(W, L, R), j(L, G, R), Mt(O, L, R), j(L, lt, R), Mt($, L, R), j(L, tt, R), Mt(J, L, R), F = !0, Yt || (ge = [
        bt(t, "pointerdown", function() {
          At(
            /*grab*/
            e[9]("SHAPE")
          ) && e[9]("SHAPE").apply(this, arguments);
        }),
        bt(l, "pointerdown", function() {
          At(
            /*grab*/
            e[9]("SHAPE")
          ) && e[9]("SHAPE").apply(this, arguments);
        }),
        bt(m, "pointerdown", function() {
          At(
            /*grab*/
            e[9]("TOP")
          ) && e[9]("TOP").apply(this, arguments);
        }),
        bt(b, "pointerdown", function() {
          At(
            /*grab*/
            e[9]("RIGHT")
          ) && e[9]("RIGHT").apply(this, arguments);
        }),
        bt(A, "pointerdown", function() {
          At(
            /*grab*/
            e[9]("BOTTOM")
          ) && e[9]("BOTTOM").apply(this, arguments);
        }),
        bt(T, "pointerdown", function() {
          At(
            /*grab*/
            e[9]("LEFT")
          ) && e[9]("LEFT").apply(this, arguments);
        })
      ], Yt = !0);
    },
    p(L, R) {
      e = L, (!F || R & /*computedStyle*/
      2 && n !== (n = /*computedStyle*/
      e[1] ? "display:none;" : void 0)) && E(t, "style", n), (!F || R & /*geom*/
      16 && s !== (s = /*geom*/
      e[4].x)) && E(t, "x", s), (!F || R & /*geom*/
      16 && i !== (i = /*geom*/
      e[4].y)) && E(t, "y", i), (!F || R & /*geom*/
      16 && r !== (r = /*geom*/
      e[4].w)) && E(t, "width", r), (!F || R & /*geom*/
      16 && o !== (o = /*geom*/
      e[4].h)) && E(t, "height", o), (!F || R & /*computedStyle*/
      2) && E(
        l,
        "style",
        /*computedStyle*/
        e[1]
      ), (!F || R & /*geom*/
      16 && h !== (h = /*geom*/
      e[4].x)) && E(l, "x", h), (!F || R & /*geom*/
      16 && c !== (c = /*geom*/
      e[4].y)) && E(l, "y", c), (!F || R & /*geom*/
      16 && u !== (u = /*geom*/
      e[4].w)) && E(l, "width", u), (!F || R & /*geom*/
      16 && d !== (d = /*geom*/
      e[4].h)) && E(l, "height", d), (!F || R & /*geom*/
      16 && g !== (g = /*geom*/
      e[4].x)) && E(m, "x", g), (!F || R & /*geom*/
      16 && p !== (p = /*geom*/
      e[4].y)) && E(m, "y", p), (!F || R & /*geom*/
      16 && y !== (y = /*geom*/
      e[4].w)) && E(m, "width", y), (!F || R & /*geom*/
      16 && _ !== (_ = /*geom*/
      e[4].x + /*geom*/
      e[4].w)) && E(b, "x", _), (!F || R & /*geom*/
      16 && M !== (M = /*geom*/
      e[4].y)) && E(b, "y", M), (!F || R & /*geom*/
      16 && B !== (B = /*geom*/
      e[4].h)) && E(b, "height", B), (!F || R & /*geom*/
      16 && S !== (S = /*geom*/
      e[4].x)) && E(A, "x", S), (!F || R & /*geom*/
      16 && w !== (w = /*geom*/
      e[4].y + /*geom*/
      e[4].h)) && E(A, "y", w), (!F || R & /*geom*/
      16 && P !== (P = /*geom*/
      e[4].w)) && E(A, "width", P), (!F || R & /*geom*/
      16 && C !== (C = /*geom*/
      e[4].x)) && E(T, "x", C), (!F || R & /*geom*/
      16 && Y !== (Y = /*geom*/
      e[4].y)) && E(T, "y", Y), (!F || R & /*geom*/
      16 && X !== (X = /*geom*/
      e[4].h)) && E(T, "height", X);
      const Dt = {};
      R & /*geom*/
      16 && (Dt.x = /*geom*/
      e[4].x), R & /*geom*/
      16 && (Dt.y = /*geom*/
      e[4].y), R & /*viewportScale*/
      8 && (Dt.scale = /*viewportScale*/
      e[3]), W.$set(Dt);
      const Ut = {};
      R & /*geom*/
      16 && (Ut.x = /*geom*/
      e[4].x + /*geom*/
      e[4].w), R & /*geom*/
      16 && (Ut.y = /*geom*/
      e[4].y), R & /*viewportScale*/
      8 && (Ut.scale = /*viewportScale*/
      e[3]), O.$set(Ut);
      const Bt = {};
      R & /*geom*/
      16 && (Bt.x = /*geom*/
      e[4].x + /*geom*/
      e[4].w), R & /*geom*/
      16 && (Bt.y = /*geom*/
      e[4].y + /*geom*/
      e[4].h), R & /*viewportScale*/
      8 && (Bt.scale = /*viewportScale*/
      e[3]), $.$set(Bt);
      const Rt = {};
      R & /*geom*/
      16 && (Rt.x = /*geom*/
      e[4].x), R & /*geom*/
      16 && (Rt.y = /*geom*/
      e[4].y + /*geom*/
      e[4].h), R & /*viewportScale*/
      8 && (Rt.scale = /*viewportScale*/
      e[3]), J.$set(Rt);
    },
    i(L) {
      F || (H(W.$$.fragment, L), H(O.$$.fragment, L), H($.$$.fragment, L), H(J.$$.fragment, L), F = !0);
    },
    o(L) {
      q(W.$$.fragment, L), q(O.$$.fragment, L), q($.$$.fragment, L), q(J.$$.fragment, L), F = !1;
    },
    d(L) {
      L && (z(t), z(a), z(l), z(f), z(m), z(x), z(b), z(k), z(A), z(I), z(T), z(D), z(G), z(lt), z(tt)), St(W, L), St(O, L), St($, L), St(J, L), Yt = !1, fe(ge);
    }
  };
}
function dm(e) {
  let t, n;
  return t = new Ua({
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
          um,
          ({ grab: s }) => ({ 9: s }),
          ({ grab: s }) => s ? 512 : 0
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
      Ct(t.$$.fragment);
    },
    m(s, i) {
      Mt(t, s, i), n = !0;
    },
    p(s, [i]) {
      const r = {};
      i & /*shape*/
      1 && (r.shape = /*shape*/
      s[0]), i & /*transform*/
      4 && (r.transform = /*transform*/
      s[2]), i & /*$$scope, geom, viewportScale, grab, computedStyle*/
      1562 && (r.$$scope = { dirty: i, ctx: s }), t.$set(r);
    },
    i(s) {
      n || (H(t.$$.fragment, s), n = !0);
    },
    o(s) {
      q(t.$$.fragment, s), n = !1;
    },
    d(s) {
      St(t, s);
    }
  };
}
function fm(e, t, n) {
  let s, { shape: i } = t, { computedStyle: r } = t, { transform: o } = t, { viewportScale: a = 1 } = t;
  const l = (d, f, m) => {
    const g = d.geometry.bounds;
    let [p, y] = [g.minX, g.minY], [x, b] = [g.maxX, g.maxY];
    const [_, M] = m;
    if (f === "SHAPE")
      p += _, x += _, y += M, b += M;
    else {
      switch (f) {
        case "TOP":
        case "TOP_LEFT":
        case "TOP_RIGHT": {
          y += M;
          break;
        }
        case "BOTTOM":
        case "BOTTOM_LEFT":
        case "BOTTOM_RIGHT": {
          b += M;
          break;
        }
      }
      switch (f) {
        case "LEFT":
        case "TOP_LEFT":
        case "BOTTOM_LEFT": {
          p += _;
          break;
        }
        case "RIGHT":
        case "TOP_RIGHT":
        case "BOTTOM_RIGHT": {
          x += _;
          break;
        }
      }
    }
    const B = Math.min(p, x), k = Math.min(y, b), A = Math.abs(x - p), S = Math.abs(b - y);
    return {
      ...d,
      geometry: {
        x: B,
        y: k,
        w: A,
        h: S,
        bounds: {
          minX: B,
          minY: k,
          maxX: B + A,
          maxY: k + S
        }
      }
    };
  };
  function h(d) {
    he.call(this, e, d);
  }
  function c(d) {
    he.call(this, e, d);
  }
  function u(d) {
    he.call(this, e, d);
  }
  return e.$$set = (d) => {
    "shape" in d && n(0, i = d.shape), "computedStyle" in d && n(1, r = d.computedStyle), "transform" in d && n(2, o = d.transform), "viewportScale" in d && n(3, a = d.viewportScale);
  }, e.$$.update = () => {
    e.$$.dirty & /*shape*/
    1 && n(4, s = i.geometry);
  }, [
    i,
    r,
    o,
    a,
    s,
    l,
    h,
    c,
    u
  ];
}
class mm extends Nt {
  constructor(t) {
    super(), $t(this, t, fm, dm, kt, {
      shape: 0,
      computedStyle: 1,
      transform: 2,
      viewportScale: 3
    });
  }
}
rn.RECTANGLE, rn.POLYGON;
const pm = (e) => ({}), so = (e) => ({ grab: (
  /*onGrab*/
  e[0]
) });
function gm(e) {
  let t, n, s, i;
  const r = (
    /*#slots*/
    e[7].default
  ), o = $o(
    r,
    e,
    /*$$scope*/
    e[6],
    so
  );
  return {
    c() {
      t = nt("g"), o && o.c(), E(t, "class", "a9s-annotation selected");
    },
    m(a, l) {
      j(a, t, l), o && o.m(t, null), n = !0, s || (i = [
        bt(
          t,
          "pointerup",
          /*onRelease*/
          e[2]
        ),
        bt(
          t,
          "pointermove",
          /*onPointerMove*/
          e[1]
        )
      ], s = !0);
    },
    p(a, [l]) {
      o && o.p && (!n || l & /*$$scope*/
      64) && Uo(
        o,
        r,
        a,
        /*$$scope*/
        a[6],
        n ? Do(
          r,
          /*$$scope*/
          a[6],
          l,
          pm
        ) : Ho(
          /*$$scope*/
          a[6]
        ),
        so
      );
    },
    i(a) {
      n || (H(o, a), n = !0);
    },
    o(a) {
      q(o, a), n = !1;
    },
    d(a) {
      a && z(t), o && o.d(a), s = !1, fe(i);
    }
  };
}
function ym(e, t, n) {
  let { $$slots: s = {}, $$scope: i } = t;
  const r = gs();
  let { shape: o } = t, { editor: a } = t, { transform: l } = t, h, c, u;
  const d = (g) => (p) => {
    h = g, c = l.elementToImage(p.offsetX, p.offsetY), u = o, p.target.setPointerCapture(p.pointerId), r("grab", p);
  }, f = (g) => {
    if (h) {
      const [p, y] = l.elementToImage(g.offsetX, g.offsetY), x = [p - c[0], y - c[1]];
      n(3, o = a(u, h, x)), r("change", o);
    }
  }, m = (g) => {
    g.target.releasePointerCapture(g.pointerId), h = void 0, u = o, r("release", g);
  };
  return e.$$set = (g) => {
    "shape" in g && n(3, o = g.shape), "editor" in g && n(4, a = g.editor), "transform" in g && n(5, l = g.transform), "$$scope" in g && n(6, i = g.$$scope);
  }, [d, f, m, o, a, l, i, s];
}
class Ua extends Nt {
  constructor(t) {
    super(), $t(this, t, ym, gm, kt, { shape: 3, editor: 4, transform: 5 });
  }
}
const _m = (e, t) => {
  const n = typeof t == "function" ? t(e) : t;
  if (n) {
    const { fill: s, fillOpacity: i } = n;
    let r = "";
    return s && (r += `fill:${s};stroke:${s};`), r += `fill-opacity:${i || "0.25"};`, r;
  }
};
function xm(e, t, n) {
  let s;
  const i = gs();
  let { annotation: r } = t, { editor: o } = t, { style: a } = t, { target: l } = t, { transform: h } = t, { viewportScale: c } = t, u;
  return ps(() => (n(6, u = new o({
    target: l,
    props: {
      shape: r.target.selector,
      computedStyle: s,
      transform: h,
      viewportScale: c
    }
  })), u.$on("change", (d) => {
    u.$$set({ shape: d.detail }), i("change", d.detail);
  }), u.$on("grab", (d) => i("grab", d.detail)), u.$on("release", (d) => i("release", d.detail)), () => {
    u.$destroy();
  })), e.$$set = (d) => {
    "annotation" in d && n(0, r = d.annotation), "editor" in d && n(1, o = d.editor), "style" in d && n(2, a = d.style), "target" in d && n(3, l = d.target), "transform" in d && n(4, h = d.transform), "viewportScale" in d && n(5, c = d.viewportScale);
  }, e.$$.update = () => {
    e.$$.dirty & /*annotation, style*/
    5 && (s = _m(r, a)), e.$$.dirty & /*annotation, editorComponent*/
    65 && r && (u == null || u.$set({ shape: r.target.selector })), e.$$.dirty & /*editorComponent, transform*/
    80 && u && u.$set({ transform: h }), e.$$.dirty & /*editorComponent, viewportScale*/
    96 && u && u.$set({ viewportScale: c });
  }, [r, o, a, l, h, c, u];
}
class bm extends Nt {
  constructor(t) {
    super(), $t(this, t, xm, null, kt, {
      annotation: 0,
      editor: 1,
      style: 2,
      target: 3,
      transform: 4,
      viewportScale: 5
    });
  }
}
navigator.userAgent.indexOf("Mac OS X");
const wm = (e) => ({
  transform: e & /*layerTransform*/
  2,
  scale: e & /*scale*/
  1
}), io = (e) => ({
  transform: (
    /*layerTransform*/
    e[1]
  ),
  scale: (
    /*scale*/
    e[0]
  )
});
function vm(e) {
  let t;
  const n = (
    /*#slots*/
    e[4].default
  ), s = $o(
    n,
    e,
    /*$$scope*/
    e[3],
    io
  );
  return {
    c() {
      s && s.c();
    },
    m(i, r) {
      s && s.m(i, r), t = !0;
    },
    p(i, [r]) {
      s && s.p && (!t || r & /*$$scope, layerTransform, scale*/
      11) && Uo(
        s,
        n,
        i,
        /*$$scope*/
        i[3],
        t ? Do(
          n,
          /*$$scope*/
          i[3],
          r,
          wm
        ) : Ho(
          /*$$scope*/
          i[3]
        ),
        io
      );
    },
    i(i) {
      t || (H(s, i), t = !0);
    },
    o(i) {
      q(s, i), t = !1;
    },
    d(i) {
      s && s.d(i);
    }
  };
}
function Am(e, t, n) {
  let { $$slots: s = {}, $$scope: i } = t, { viewer: r } = t, o = 1, a;
  const l = () => {
    const h = r.viewport.getContainerSize().x, c = r.viewport.getZoom(!0), u = r.viewport.getFlip(), d = r.viewport.pixelFromPoint(new Cn.Point(0, 0), !0);
    u && (d.x = h - d.x);
    const f = c * h / r.world.getContentFactor(), m = u ? -f : f, g = r.viewport.getRotation();
    n(1, a = `translate(${d.x}, ${d.y}) scale(${m}, ${f}) rotate(${g})`), n(0, o = c * h / r.world.getContentFactor());
  };
  return ps(() => (r.addHandler("update-viewport", l), () => {
    r.removeHandler("update-viewport", l);
  })), e.$$set = (h) => {
    "viewer" in h && n(2, r = h.viewer), "$$scope" in h && n(3, i = h.$$scope);
  }, [o, a, r, i, s];
}
class Ha extends Nt {
  constructor(t) {
    super(), $t(this, t, Am, vm, kt, { viewer: 2 });
  }
}
function Mm(e, t, n) {
  const s = gs();
  let { drawingMode: i } = t, { target: r } = t, { tool: o } = t, { transform: a } = t, { viewer: l } = t, { viewportScale: h } = t, c;
  return ps(() => {
    const u = r.closest("svg"), d = [], f = (m, g, p) => {
      if (u == null || u.addEventListener(m, g, p), d.push(() => u == null ? void 0 : u.removeEventListener(m, g, p)), m === "pointerup" || m === "dblclick") {
        const y = (b) => {
          const { originalEvent: _ } = b;
          g(_);
        }, x = m === "pointerup" ? "canvas-click" : "canvas-double-click";
        l.addHandler(x, y), d.push(() => l.removeHandler(x, y));
      } else if (m === "pointermove") {
        const y = (x) => {
          const { originalEvent: b } = x;
          g(b);
        };
        l.addHandler("canvas-drag", y), d.push(() => l.removeHandler("canvas-drag", y));
      }
    };
    return n(6, c = new o({
      target: r,
      props: {
        addEventListener: f,
        drawingMode: i,
        transform: a,
        viewportScale: h
      }
    })), c.$on("create", (m) => s("create", m.detail)), () => {
      d.forEach((m) => m()), c.$destroy();
    };
  }), e.$$set = (u) => {
    "drawingMode" in u && n(0, i = u.drawingMode), "target" in u && n(1, r = u.target), "tool" in u && n(2, o = u.tool), "transform" in u && n(3, a = u.transform), "viewer" in u && n(4, l = u.viewer), "viewportScale" in u && n(5, h = u.viewportScale);
  }, e.$$.update = () => {
    e.$$.dirty & /*toolComponent, transform*/
    72 && c && c.$set({ transform: a }), e.$$.dirty & /*toolComponent, viewportScale*/
    96 && c && c.$set({ viewportScale: h });
  }, [i, r, o, a, l, h, c];
}
class Sm extends Nt {
  constructor(t) {
    super(), $t(this, t, Mm, null, kt, {
      drawingMode: 0,
      target: 1,
      tool: 2,
      transform: 3,
      viewer: 4,
      viewportScale: 5
    });
  }
}
function ro(e, t, n) {
  const s = e.slice();
  return s[29] = t[n], s;
}
function Tm(e) {
  let t = (
    /*toolName*/
    e[2]
  ), n, s, i = oo(e);
  return {
    c() {
      i.c(), n = _e();
    },
    m(r, o) {
      i.m(r, o), j(r, n, o), s = !0;
    },
    p(r, o) {
      o[0] & /*toolName*/
      4 && kt(t, t = /*toolName*/
      r[2]) ? (me(), q(i, 1, 1, se), pe(), i = oo(r), i.c(), H(i, 1), i.m(n.parentNode, n)) : i.p(r, o);
    },
    i(r) {
      s || (H(i), s = !0);
    },
    o(r) {
      q(i), s = !1;
    },
    d(r) {
      r && z(n), i.d(r);
    }
  };
}
function Em(e) {
  let t, n, s = tn(
    /*editableAnnotations*/
    e[6]
  ), i = [];
  for (let o = 0; o < s.length; o += 1)
    i[o] = lo(ro(e, s, o));
  const r = (o) => q(i[o], 1, 1, () => {
    i[o] = null;
  });
  return {
    c() {
      for (let o = 0; o < i.length; o += 1)
        i[o].c();
      t = _e();
    },
    m(o, a) {
      for (let l = 0; l < i.length; l += 1)
        i[l] && i[l].m(o, a);
      j(o, t, a), n = !0;
    },
    p(o, a) {
      if (a[0] & /*editableAnnotations, drawingEl, getEditor, style, toolTransform, scale, onGrab, onChangeSelected, onRelease*/
      268459618) {
        s = tn(
          /*editableAnnotations*/
          o[6]
        );
        let l;
        for (l = 0; l < s.length; l += 1) {
          const h = ro(o, s, l);
          i[l] ? (i[l].p(h, a), H(i[l], 1)) : (i[l] = lo(h), i[l].c(), H(i[l], 1), i[l].m(t.parentNode, t));
        }
        for (me(), l = s.length; l < i.length; l += 1)
          r(l);
        pe();
      }
    },
    i(o) {
      if (!n) {
        for (let a = 0; a < s.length; a += 1)
          H(i[a]);
        n = !0;
      }
    },
    o(o) {
      i = i.filter(Boolean);
      for (let a = 0; a < i.length; a += 1)
        q(i[a]);
      n = !1;
    },
    d(o) {
      o && z(t), Ai(i, o);
    }
  };
}
function oo(e) {
  let t, n;
  return t = new Sm({
    props: {
      target: (
        /*drawingEl*/
        e[5]
      ),
      tool: (
        /*tool*/
        e[7]
      ),
      drawingMode: (
        /*drawingMode*/
        e[4]
      ),
      transform: { elementToImage: (
        /*toolTransform*/
        e[9]
      ) },
      viewer: (
        /*viewer*/
        e[3]
      ),
      viewportScale: (
        /*scale*/
        e[28]
      )
    }
  }), t.$on(
    "create",
    /*onSelectionCreated*/
    e[13]
  ), {
    c() {
      Ct(t.$$.fragment);
    },
    m(s, i) {
      Mt(t, s, i), n = !0;
    },
    p(s, i) {
      const r = {};
      i[0] & /*drawingEl*/
      32 && (r.target = /*drawingEl*/
      s[5]), i[0] & /*tool*/
      128 && (r.tool = /*tool*/
      s[7]), i[0] & /*drawingMode*/
      16 && (r.drawingMode = /*drawingMode*/
      s[4]), i[0] & /*viewer*/
      8 && (r.viewer = /*viewer*/
      s[3]), i[0] & /*scale*/
      268435456 && (r.viewportScale = /*scale*/
      s[28]), t.$set(r);
    },
    i(s) {
      n || (H(t.$$.fragment, s), n = !0);
    },
    o(s) {
      q(t.$$.fragment, s), n = !1;
    },
    d(s) {
      St(t, s);
    }
  };
}
function ao(e) {
  let t, n;
  return t = new bm({
    props: {
      target: (
        /*drawingEl*/
        e[5]
      ),
      editor: (
        /*getEditor*/
        e[14](
          /*editable*/
          e[29].target.selector
        )
      ),
      annotation: (
        /*editable*/
        e[29]
      ),
      style: (
        /*style*/
        e[1]
      ),
      transform: { elementToImage: (
        /*toolTransform*/
        e[9]
      ) },
      viewportScale: (
        /*scale*/
        e[28]
      )
    }
  }), t.$on(
    "grab",
    /*onGrab*/
    e[10]
  ), t.$on("change", function() {
    At(
      /*onChangeSelected*/
      e[12](
        /*editable*/
        e[29]
      )
    ) && e[12](
      /*editable*/
      e[29]
    ).apply(this, arguments);
  }), t.$on(
    "release",
    /*onRelease*/
    e[11]
  ), {
    c() {
      Ct(t.$$.fragment);
    },
    m(s, i) {
      Mt(t, s, i), n = !0;
    },
    p(s, i) {
      e = s;
      const r = {};
      i[0] & /*drawingEl*/
      32 && (r.target = /*drawingEl*/
      e[5]), i[0] & /*editableAnnotations*/
      64 && (r.editor = /*getEditor*/
      e[14](
        /*editable*/
        e[29].target.selector
      )), i[0] & /*editableAnnotations*/
      64 && (r.annotation = /*editable*/
      e[29]), i[0] & /*style*/
      2 && (r.style = /*style*/
      e[1]), i[0] & /*scale*/
      268435456 && (r.viewportScale = /*scale*/
      e[28]), t.$set(r);
    },
    i(s) {
      n || (H(t.$$.fragment, s), n = !0);
    },
    o(s) {
      q(t.$$.fragment, s), n = !1;
    },
    d(s) {
      St(t, s);
    }
  };
}
function lo(e) {
  let t = (
    /*editable*/
    e[29].id
  ), n, s, i = ao(e);
  return {
    c() {
      i.c(), n = _e();
    },
    m(r, o) {
      i.m(r, o), j(r, n, o), s = !0;
    },
    p(r, o) {
      o[0] & /*editableAnnotations*/
      64 && kt(t, t = /*editable*/
      r[29].id) ? (me(), q(i, 1, 1, se), pe(), i = ao(r), i.c(), H(i, 1), i.m(n.parentNode, n)) : i.p(r, o);
    },
    i(r) {
      s || (H(i), s = !0);
    },
    o(r) {
      q(i), s = !1;
    },
    d(r) {
      r && z(n), i.d(r);
    }
  };
}
function Cm(e) {
  let t, n, s, i, r, o;
  const a = [Em, Tm], l = [];
  function h(c, u) {
    return (
      /*drawingEl*/
      c[5] && /*editableAnnotations*/
      c[6] ? 0 : (
        /*drawingEl*/
        c[5] && /*tool*/
        c[7] && /*drawingEnabled*/
        c[0] ? 1 : -1
      )
    );
  }
  return ~(s = h(e)) && (i = l[s] = a[s](e)), {
    c() {
      t = nt("svg"), n = nt("g"), i && i.c(), E(n, "transform", r = /*transform*/
      e[27]), E(n, "class", "svelte-190cqdf"), E(t, "class", "a9s-annotationlayer a9s-osd-drawinglayer svelte-190cqdf"), hs(
        t,
        "drawing",
        /*drawingEnabled*/
        e[0]
      );
    },
    m(c, u) {
      j(c, t, u), le(t, n), ~s && l[s].m(n, null), e[21](n), o = !0;
    },
    p(c, u) {
      let d = s;
      s = h(c), s === d ? ~s && l[s].p(c, u) : (i && (me(), q(l[d], 1, 1, () => {
        l[d] = null;
      }), pe()), ~s ? (i = l[s], i ? i.p(c, u) : (i = l[s] = a[s](c), i.c()), H(i, 1), i.m(n, null)) : i = null), (!o || u[0] & /*transform*/
      134217728 && r !== (r = /*transform*/
      c[27])) && E(n, "transform", r), (!o || u[0] & /*drawingEnabled*/
      1) && hs(
        t,
        "drawing",
        /*drawingEnabled*/
        c[0]
      );
    },
    i(c) {
      o || (H(i), o = !0);
    },
    o(c) {
      q(i), o = !1;
    },
    d(c) {
      c && z(t), ~s && l[s].d(), e[21](null);
    }
  };
}
function Pm(e) {
  let t, n;
  return t = new Ha({
    props: {
      viewer: (
        /*viewer*/
        e[3]
      ),
      $$slots: {
        default: [
          Cm,
          ({ transform: s, scale: i }) => ({ 27: s, 28: i }),
          ({ transform: s, scale: i }) => [(s ? 134217728 : 0) | (i ? 268435456 : 0)]
        ]
      },
      $$scope: { ctx: e }
    }
  }), {
    c() {
      Ct(t.$$.fragment);
    },
    m(s, i) {
      Mt(t, s, i), n = !0;
    },
    p(s, i) {
      const r = {};
      i[0] & /*viewer*/
      8 && (r.viewer = /*viewer*/
      s[3]), i[0] & /*drawingEnabled, transform, drawingEl, editableAnnotations, style, scale, toolName, tool, drawingMode, viewer*/
      402653439 | i[1] & /*$$scope*/
      2 && (r.$$scope = { dirty: i, ctx: s }), t.$set(r);
    },
    i(s) {
      n || (H(t.$$.fragment, s), n = !0);
    },
    o(s) {
      q(t.$$.fragment, s), n = !1;
    },
    d(s) {
      St(t, s);
    }
  };
}
function km(e, t, n) {
  let s, i, r, o, { drawingEnabled: a } = t, { filter: l } = t, { preferredDrawingMode: h } = t, { state: c } = t, { style: u = void 0 } = t, { toolName: d = fs()[0] } = t, { user: f } = t, { viewer: m } = t, g;
  const { store: p, selection: y, hover: x } = c;
  Js(e, y, (C) => n(20, o = C));
  let b, _, M;
  const B = (C) => {
    p.unobserve(b);
    const Y = C.filter(({ editable: X }) => X).map(({ id: X }) => X);
    Y.length > 0 ? (n(6, _ = Y.map((X) => p.getAnnotation(X))), b = (X) => {
      const { updated: D } = X.changes;
      n(6, _ = (D || []).map((W) => W.newValue));
    }, p.observe(b, { annotations: Y })) : n(6, _ = void 0);
  }, k = (C, Y) => {
    const { x: X, y: D } = m.viewport.viewerElementToImageCoordinates(new Cn.Point(C, Y));
    return [X, D];
  }, A = (C) => {
    m.setMouseNavEnabled(!1), M = C.timeStamp;
  }, S = (C) => {
    if (m.setMouseNavEnabled(!0), performance.now() - (M || 0) < 300) {
      const { offsetX: X, offsetY: D } = C.detail, [W, G] = k(X, D), O = p.getAt(W, G);
      O && (!l || l(O)) && !_.find(($) => $.id === O.id) && (x.set(O.id), y.setSelected(O.id));
    }
  }, w = (C) => (Y) => {
    var G;
    const { target: X } = C, D = 10 * 60 * 1e3, W = ((G = X.creator) == null ? void 0 : G.id) !== f.id || !X.created || (/* @__PURE__ */ new Date()).getTime() - X.created.getTime() > D;
    p.updateTarget({
      ...X,
      selector: Y.detail,
      created: W ? X.created : /* @__PURE__ */ new Date(),
      updated: W ? /* @__PURE__ */ new Date() : void 0,
      updatedBy: W ? f : void 0
    });
  }, P = (C) => {
    const Y = Kf(), X = {
      id: Y,
      bodies: [],
      target: {
        annotation: Y,
        selector: C.detail,
        creator: f,
        created: /* @__PURE__ */ new Date()
      }
    };
    p.addAnnotation(X), y.setSelected(X.id), m.setMouseNavEnabled(!0);
  }, I = (C) => Po(C);
  function T(C) {
    cs[C ? "unshift" : "push"](() => {
      g = C, n(5, g);
    });
  }
  return e.$$set = (C) => {
    "drawingEnabled" in C && n(0, a = C.drawingEnabled), "filter" in C && n(15, l = C.filter), "preferredDrawingMode" in C && n(16, h = C.preferredDrawingMode), "state" in C && n(17, c = C.state), "style" in C && n(1, u = C.style), "toolName" in C && n(2, d = C.toolName), "user" in C && n(18, f = C.user), "viewer" in C && n(3, m = C.viewer);
  }, e.$$.update = () => {
    e.$$.dirty[0] & /*toolName*/
    4 && n(7, { tool: s, opts: i } = ms(d) || { tool: void 0, opts: void 0 }, s, (n(19, i), n(2, d))), e.$$.dirty[0] & /*opts, preferredDrawingMode*/
    589824 && n(4, r = (i == null ? void 0 : i.drawingMode) || h), e.$$.dirty[0] & /*drawingEnabled, drawingMode, viewer*/
    25 && (a && r === "drag" ? m.setMouseNavEnabled(!1) : m.setMouseNavEnabled(!0)), e.$$.dirty[0] & /*drawingEnabled*/
    1 && a && y.clear(), e.$$.dirty[0] & /*$selection, drawingMode, drawingEnabled, viewer*/
    1048601 && o.selected.length === 0 && r === "drag" && a && m.setMouseNavEnabled(!1), e.$$.dirty[0] & /*$selection*/
    1048576 && B(o.selected);
  }, [
    a,
    u,
    d,
    m,
    r,
    g,
    _,
    s,
    y,
    k,
    A,
    S,
    w,
    P,
    I,
    l,
    h,
    c,
    f,
    i,
    o,
    T
  ];
}
class Im extends Nt {
  constructor(t) {
    super(), $t(
      this,
      t,
      km,
      Pm,
      kt,
      {
        drawingEnabled: 0,
        filter: 15,
        preferredDrawingMode: 16,
        state: 17,
        style: 1,
        toolName: 2,
        user: 18,
        viewer: 3
      },
      null,
      [-1, -1]
    );
  }
}
function Bm(e) {
  let t, n, s, i, r, o, a, l = (
    /*user*/
    e[2].appearance.label + ""
  ), h, c, u, d;
  return {
    c() {
      t = nt("g"), n = nt("rect"), a = nt("text"), h = Mi(l), E(n, "class", "a9s-presence-label-bg svelte-1rehw2p"), E(
        n,
        "x",
        /*x*/
        e[0]
      ), E(n, "y", s = /*y*/
      e[1] - 18 / /*scale*/
      e[3]), E(n, "height", i = 18 / /*scale*/
      e[3]), E(n, "fill", r = /*user*/
      e[2].appearance.color), E(n, "stroke", o = /*user*/
      e[2].appearance.color), E(a, "font-size", c = 12 / /*scale*/
      e[3]), E(a, "x", u = /*x*/
      e[0] + Math.round(5 / /*scale*/
      e[3])), E(a, "y", d = /*y*/
      e[1] - 5 / /*scale*/
      e[3]), E(a, "class", "svelte-1rehw2p"), E(t, "class", "a9s-presence-label");
    },
    m(f, m) {
      j(f, t, m), le(t, n), le(t, a), le(a, h), e[6](t);
    },
    p(f, [m]) {
      m & /*x*/
      1 && E(
        n,
        "x",
        /*x*/
        f[0]
      ), m & /*y, scale*/
      10 && s !== (s = /*y*/
      f[1] - 18 / /*scale*/
      f[3]) && E(n, "y", s), m & /*scale*/
      8 && i !== (i = 18 / /*scale*/
      f[3]) && E(n, "height", i), m & /*user*/
      4 && r !== (r = /*user*/
      f[2].appearance.color) && E(n, "fill", r), m & /*user*/
      4 && o !== (o = /*user*/
      f[2].appearance.color) && E(n, "stroke", o), m & /*user*/
      4 && l !== (l = /*user*/
      f[2].appearance.label + "") && qc(h, l), m & /*scale*/
      8 && c !== (c = 12 / /*scale*/
      f[3]) && E(a, "font-size", c), m & /*x, scale*/
      9 && u !== (u = /*x*/
      f[0] + Math.round(5 / /*scale*/
      f[3])) && E(a, "x", u), m & /*y, scale*/
      10 && d !== (d = /*y*/
      f[1] - 5 / /*scale*/
      f[3]) && E(a, "y", d);
    },
    i: se,
    o: se,
    d(f) {
      f && z(t), e[6](null);
    }
  };
}
function Rm(e, t, n) {
  let { x: s } = t, { y: i } = t, { user: r } = t, { scale: o } = t, { hAlign: a = null } = t, l;
  const h = (u) => {
    const d = l.querySelector("text"), f = l.querySelector("rect"), m = d.getBBox().width + 10 / u;
    a === "CENTER" && l.setAttribute("style", `transform: translateX(-${m / 2}px)`), f.setAttribute("width", `${m}`);
  };
  function c(u) {
    cs[u ? "unshift" : "push"](() => {
      l = u, n(4, l);
    });
  }
  return e.$$set = (u) => {
    "x" in u && n(0, s = u.x), "y" in u && n(1, i = u.y), "user" in u && n(2, r = u.user), "scale" in u && n(3, o = u.scale), "hAlign" in u && n(5, a = u.hAlign);
  }, e.$$.update = () => {
    e.$$.dirty & /*g, scale*/
    24 && l && h(o);
  }, [s, i, r, o, l, a, c];
}
class Va extends Nt {
  constructor(t) {
    super(), $t(this, t, Rm, Bm, kt, { x: 0, y: 1, user: 2, scale: 3, hAlign: 5 });
  }
}
function Om(e) {
  let t, n, s, i, r, o;
  return n = new Va({
    props: {
      scale: (
        /*scale*/
        e[1]
      ),
      user: (
        /*user*/
        e[0]
      ),
      x: (
        /*origin*/
        e[3][0]
      ),
      y: (
        /*origin*/
        e[3][1]
      ),
      hAlign: "CENTER"
    }
  }), {
    c() {
      t = nt("g"), Ct(n.$$.fragment), s = nt("polygon"), E(s, "class", "a9s-presence-shape a9s-presence-polygon svelte-fgq4n0"), E(s, "stroke", i = /*user*/
      e[0].appearance.color), E(s, "fill", "transparent"), E(s, "points", r = /*geom*/
      e[2].points.map(ho).join(" ")), E(t, "class", "a9s-presence-overlay");
    },
    m(a, l) {
      j(a, t, l), Mt(n, t, null), le(t, s), o = !0;
    },
    p(a, [l]) {
      const h = {};
      l & /*scale*/
      2 && (h.scale = /*scale*/
      a[1]), l & /*user*/
      1 && (h.user = /*user*/
      a[0]), l & /*origin*/
      8 && (h.x = /*origin*/
      a[3][0]), l & /*origin*/
      8 && (h.y = /*origin*/
      a[3][1]), n.$set(h), (!o || l & /*user*/
      1 && i !== (i = /*user*/
      a[0].appearance.color)) && E(s, "stroke", i), (!o || l & /*geom*/
      4 && r !== (r = /*geom*/
      a[2].points.map(ho).join(" "))) && E(s, "points", r);
    },
    i(a) {
      o || (H(n.$$.fragment, a), o = !0);
    },
    o(a) {
      q(n.$$.fragment, a), o = !1;
    },
    d(a) {
      a && z(t), St(n);
    }
  };
}
const ho = (e) => e.join(",");
function Ym(e, t, n) {
  let s, i, { annotation: r } = t, { user: o } = t, { scale: a } = t;
  const l = (h) => {
    let [c, ...u] = h.points;
    return u.forEach(([d, f]) => {
      f < c[1] && (c = [d, f]);
    }), c;
  };
  return e.$$set = (h) => {
    "annotation" in h && n(4, r = h.annotation), "user" in h && n(0, o = h.user), "scale" in h && n(1, a = h.scale);
  }, e.$$.update = () => {
    e.$$.dirty & /*annotation*/
    16 && n(2, s = r.target.selector.geometry), e.$$.dirty & /*geom*/
    4 && n(3, i = l(s));
  }, [o, a, s, i, r];
}
class Lm extends Nt {
  constructor(t) {
    super(), $t(this, t, Ym, Om, kt, { annotation: 4, user: 0, scale: 1 });
  }
}
function Xm(e) {
  let t, n, s, i, r, o, a, l, h;
  return n = new Va({
    props: {
      scale: (
        /*scale*/
        e[1]
      ),
      user: (
        /*user*/
        e[0]
      ),
      x: (
        /*geom*/
        e[2].x
      ),
      y: (
        /*geom*/
        e[2].y
      )
    }
  }), {
    c() {
      t = nt("g"), Ct(n.$$.fragment), s = nt("rect"), E(s, "class", "a9s-presence-shape a9s-presence-rectangle svelte-gze948"), E(s, "stroke", i = /*user*/
      e[0].appearance.color), E(s, "fill", "transparent"), E(s, "x", r = /*geom*/
      e[2].x), E(s, "y", o = /*geom*/
      e[2].y), E(s, "width", a = /*geom*/
      e[2].w), E(s, "height", l = /*geom*/
      e[2].h), E(t, "class", "a9s-presence-overlay");
    },
    m(c, u) {
      j(c, t, u), Mt(n, t, null), le(t, s), h = !0;
    },
    p(c, [u]) {
      const d = {};
      u & /*scale*/
      2 && (d.scale = /*scale*/
      c[1]), u & /*user*/
      1 && (d.user = /*user*/
      c[0]), u & /*geom*/
      4 && (d.x = /*geom*/
      c[2].x), u & /*geom*/
      4 && (d.y = /*geom*/
      c[2].y), n.$set(d), (!h || u & /*user*/
      1 && i !== (i = /*user*/
      c[0].appearance.color)) && E(s, "stroke", i), (!h || u & /*geom*/
      4 && r !== (r = /*geom*/
      c[2].x)) && E(s, "x", r), (!h || u & /*geom*/
      4 && o !== (o = /*geom*/
      c[2].y)) && E(s, "y", o), (!h || u & /*geom*/
      4 && a !== (a = /*geom*/
      c[2].w)) && E(s, "width", a), (!h || u & /*geom*/
      4 && l !== (l = /*geom*/
      c[2].h)) && E(s, "height", l);
    },
    i(c) {
      h || (H(n.$$.fragment, c), h = !0);
    },
    o(c) {
      q(n.$$.fragment, c), h = !1;
    },
    d(c) {
      c && z(t), St(n);
    }
  };
}
function Fm(e, t, n) {
  let s, { annotation: i } = t, { user: r } = t, { scale: o } = t;
  return e.$$set = (a) => {
    "annotation" in a && n(3, i = a.annotation), "user" in a && n(0, r = a.user), "scale" in a && n(1, o = a.scale);
  }, e.$$.update = () => {
    e.$$.dirty & /*annotation*/
    8 && n(2, s = i.target.selector.geometry);
  }, [r, o, s, i];
}
class Gm extends Nt {
  constructor(t) {
    super(), $t(this, t, Fm, Xm, kt, { annotation: 3, user: 0, scale: 1 });
  }
}
const { Boolean: $m } = Wc;
function co(e, t, n) {
  const s = e.slice();
  return s[8] = t[n], s;
}
function uo(e) {
  let t, n;
  return t = new Ha({
    props: {
      viewer: (
        /*viewer*/
        e[0]
      ),
      $$slots: {
        default: [
          Um,
          ({ transform: s, scale: i }) => ({ 6: s, 7: i }),
          ({ transform: s, scale: i }) => (s ? 64 : 0) | (i ? 128 : 0)
        ]
      },
      $$scope: { ctx: e }
    }
  }), {
    c() {
      Ct(t.$$.fragment);
    },
    m(s, i) {
      Mt(t, s, i), n = !0;
    },
    p(s, i) {
      const r = {};
      i & /*viewer*/
      1 && (r.viewer = /*viewer*/
      s[0]), i & /*$$scope, transform, trackedAnnotations, scale*/
      2244 && (r.$$scope = { dirty: i, ctx: s }), t.$set(r);
    },
    i(s) {
      n || (H(t.$$.fragment, s), n = !0);
    },
    o(s) {
      q(t.$$.fragment, s), n = !1;
    },
    d(s) {
      St(t, s);
    }
  };
}
function fo(e) {
  let t, n, s = tn(
    /*trackedAnnotations*/
    e[2]
  ), i = [];
  for (let o = 0; o < s.length; o += 1)
    i[o] = mo(co(e, s, o));
  const r = (o) => q(i[o], 1, 1, () => {
    i[o] = null;
  });
  return {
    c() {
      for (let o = 0; o < i.length; o += 1)
        i[o].c();
      t = _e();
    },
    m(o, a) {
      for (let l = 0; l < i.length; l += 1)
        i[l] && i[l].m(o, a);
      j(o, t, a), n = !0;
    },
    p(o, a) {
      if (a & /*trackedAnnotations, scale*/
      132) {
        s = tn(
          /*trackedAnnotations*/
          o[2]
        );
        let l;
        for (l = 0; l < s.length; l += 1) {
          const h = co(o, s, l);
          i[l] ? (i[l].p(h, a), H(i[l], 1)) : (i[l] = mo(h), i[l].c(), H(i[l], 1), i[l].m(t.parentNode, t));
        }
        for (me(), l = s.length; l < i.length; l += 1)
          r(l);
        pe();
      }
    },
    i(o) {
      if (!n) {
        for (let a = 0; a < s.length; a += 1)
          H(i[a]);
        n = !0;
      }
    },
    o(o) {
      i = i.filter($m);
      for (let a = 0; a < i.length; a += 1)
        q(i[a]);
      n = !1;
    },
    d(o) {
      o && z(t), Ai(i, o);
    }
  };
}
function Nm(e) {
  let t, n;
  return t = new Lm({
    props: {
      annotation: (
        /*tracked*/
        e[8].annotation
      ),
      user: (
        /*tracked*/
        e[8].selectedBy
      ),
      scale: (
        /*scale*/
        e[7]
      )
    }
  }), {
    c() {
      Ct(t.$$.fragment);
    },
    m(s, i) {
      Mt(t, s, i), n = !0;
    },
    p(s, i) {
      const r = {};
      i & /*trackedAnnotations*/
      4 && (r.annotation = /*tracked*/
      s[8].annotation), i & /*trackedAnnotations*/
      4 && (r.user = /*tracked*/
      s[8].selectedBy), i & /*scale*/
      128 && (r.scale = /*scale*/
      s[7]), t.$set(r);
    },
    i(s) {
      n || (H(t.$$.fragment, s), n = !0);
    },
    o(s) {
      q(t.$$.fragment, s), n = !1;
    },
    d(s) {
      St(t, s);
    }
  };
}
function Dm(e) {
  let t, n;
  return t = new Gm({
    props: {
      annotation: (
        /*tracked*/
        e[8].annotation
      ),
      user: (
        /*tracked*/
        e[8].selectedBy
      ),
      scale: (
        /*scale*/
        e[7]
      )
    }
  }), {
    c() {
      Ct(t.$$.fragment);
    },
    m(s, i) {
      Mt(t, s, i), n = !0;
    },
    p(s, i) {
      const r = {};
      i & /*trackedAnnotations*/
      4 && (r.annotation = /*tracked*/
      s[8].annotation), i & /*trackedAnnotations*/
      4 && (r.user = /*tracked*/
      s[8].selectedBy), i & /*scale*/
      128 && (r.scale = /*scale*/
      s[7]), t.$set(r);
    },
    i(s) {
      n || (H(t.$$.fragment, s), n = !0);
    },
    o(s) {
      q(t.$$.fragment, s), n = !1;
    },
    d(s) {
      St(t, s);
    }
  };
}
function mo(e) {
  let t, n, s, i;
  const r = [Dm, Nm], o = [];
  function a(l, h) {
    return (
      /*tracked*/
      l[8].annotation.target.selector.type === et.RECTANGLE ? 0 : (
        /*tracked*/
        l[8].annotation.target.selector.type === et.POLYGON ? 1 : -1
      )
    );
  }
  return ~(t = a(e)) && (n = o[t] = r[t](e)), {
    c() {
      n && n.c(), s = _e();
    },
    m(l, h) {
      ~t && o[t].m(l, h), j(l, s, h), i = !0;
    },
    p(l, h) {
      let c = t;
      t = a(l), t === c ? ~t && o[t].p(l, h) : (n && (me(), q(o[c], 1, 1, () => {
        o[c] = null;
      }), pe()), ~t ? (n = o[t], n ? n.p(l, h) : (n = o[t] = r[t](l), n.c()), H(n, 1), n.m(s.parentNode, s)) : n = null);
    },
    i(l) {
      i || (H(n), i = !0);
    },
    o(l) {
      q(n), i = !1;
    },
    d(l) {
      l && z(s), ~t && o[t].d(l);
    }
  };
}
function Um(e) {
  let t, n, s, i, r = (
    /*trackedAnnotations*/
    e[2].length > 0 && fo(e)
  );
  return {
    c() {
      t = nt("svg"), n = nt("g"), r && r.c(), E(n, "transform", s = /*transform*/
      e[6]), E(t, "class", "a9s-osd-presencelayer svelte-1krwc4m");
    },
    m(o, a) {
      j(o, t, a), le(t, n), r && r.m(n, null), i = !0;
    },
    p(o, a) {
      /*trackedAnnotations*/
      o[2].length > 0 ? r ? (r.p(o, a), a & /*trackedAnnotations*/
      4 && H(r, 1)) : (r = fo(o), r.c(), H(r, 1), r.m(n, null)) : r && (me(), q(r, 1, 1, () => {
        r = null;
      }), pe()), (!i || a & /*transform*/
      64 && s !== (s = /*transform*/
      o[6])) && E(n, "transform", s);
    },
    i(o) {
      i || (H(r), i = !0);
    },
    o(o) {
      q(r), i = !1;
    },
    d(o) {
      o && z(t), r && r.d();
    }
  };
}
function Hm(e) {
  let t = !!/*provider*/
  e[1], n, s, i = t && uo(e);
  return {
    c() {
      i && i.c(), n = _e();
    },
    m(r, o) {
      i && i.m(r, o), j(r, n, o), s = !0;
    },
    p(r, [o]) {
      o & /*provider*/
      2 && (t = !!/*provider*/
      r[1]), t ? i ? (i.p(r, o), o & /*provider*/
      2 && H(i, 1)) : (i = uo(r), i.c(), H(i, 1), i.m(n.parentNode, n)) : i && (me(), q(i, 1, 1, () => {
        i = null;
      }), pe());
    },
    i(r) {
      s || (H(i), s = !0);
    },
    o(r) {
      q(i), s = !1;
    },
    d(r) {
      r && z(n), i && i.d(r);
    }
  };
}
function Vm(e, t, n) {
  let { store: s } = t, { viewer: i } = t, { provider: r } = t, o = [], a;
  const l = (h, c) => {
    n(2, o = [
      ...o.filter(({ selectedBy: u }) => u.presenceKey !== h.presenceKey),
      ...(c || []).map((u) => ({
        // Warning - could be undefined!
        annotation: s.getAnnotation(u),
        selectedBy: h
      }))
    ].filter(({ annotation: u }) => (u || console.warn("Selection event on unknown annotation"), !!u))), a && s.unobserve(a), a = (u) => {
      const { deleted: d, updated: f } = u.changes, m = new Set((d || []).map((p) => p.id)), g = o.filter(({ annotation: p }) => !m.has(p.id)).map((p) => {
        const y = (f || []).find((x) => x.oldValue.id === p.annotation.id);
        return y ? {
          selectedBy: p.selectedBy,
          annotation: y.newValue
        } : p;
      });
      n(2, o = g);
    }, s.observe(a, {
      annotations: o.map((u) => u.annotation.id)
    });
  };
  return Kc(() => {
    a && s.unobserve(a);
  }), e.$$set = (h) => {
    "store" in h && n(3, s = h.store), "viewer" in h && n(0, i = h.viewer), "provider" in h && n(1, r = h.provider);
  }, e.$$.update = () => {
    e.$$.dirty & /*provider*/
    2 && r && r.on("selectionChange", l);
  }, [i, r, o, s];
}
class zm extends Nt {
  constructor(t) {
    super(), $t(this, t, Vm, Hm, kt, { store: 3, viewer: 0, provider: 1 });
  }
}
const po = (e, t) => {
  t === "auto" ? e.addHandler("open", (n) => {
    const s = e.world.getItemCount();
    e.world.getItemAt(s - 1).addOnceHandler("fully-loaded-change", (r) => {
      const { fullyLoaded: o } = r;
      if (o) {
        const a = e.canvas.querySelector("canvas"), l = Lo(a);
        e.element.setAttribute("data-theme", l);
      }
    });
  }) : e.element.setAttribute("data-theme", t);
}, za = (e, t, n) => (s, i = {}) => {
  const r = typeof s == "string" ? s : s.id, o = t.getAnnotation(r);
  if (!o)
    return;
  const a = e.container.getBoundingClientRect(), { padding: l } = i;
  let [h, c, u, d] = l ? Array.isArray(l) ? l : [l, l, l, l] : [0, 0, 0, 0];
  h = h / a.height, c = c / a.width, u = u / a.height, d = d / a.width;
  const { minX: f, minY: m, maxX: g, maxY: p } = o.target.selector.geometry.bounds, y = g - f, x = p - m, b = f - d * y, _ = m - h * x, M = y + (c + d) * y, B = x + (h + u) * x, k = e.viewport.imageToViewportRectangle(b, _, M, B);
  e.viewport[n](k, i.immediately);
}, Wm = (e, t) => za(e, t, "fitBounds"), jm = (e, t) => za(e, t, "fitBoundsWithConstraints"), Jm = (e, t = {}) => {
  const n = Xo(t, {
    drawingEnabled: !1,
    drawingMode: Eo ? "drag" : "click",
    pointerSelectAction: yi.EDIT,
    theme: "light"
  }), s = Yo(n), { hover: i, selection: r, store: o } = s, a = ul(o), l = dl(
    s,
    a,
    n.adapter,
    n.autoSave
  );
  let h = bl(), c = n.drawingEnabled, u = n.drawingMode;
  const d = Fo(a, e.element), f = new zf({
    target: e.element,
    props: {
      state: s,
      viewer: e,
      style: n.style,
      filter: void 0
    }
  }), m = new zm({
    target: e.element.querySelector(".openseadragon-canvas"),
    props: {
      provider: void 0,
      store: o,
      viewer: e
    }
  }), g = new Im({
    target: e.element.querySelector(".openseadragon-canvas"),
    props: {
      drawingEnabled: !!c,
      filter: void 0,
      preferredDrawingMode: u,
      state: s,
      style: n.style,
      user: h,
      viewer: e
    }
  });
  f.$on("click", (Y) => {
    const { originalEvent: X, annotation: D } = Y.detail;
    D && !(u === "click" && c) ? r.clickSelect(D.id, X) : r.isEmpty() || r.clear();
  }), e.element.addEventListener("pointerdown", (Y) => {
    if (i.current) {
      const X = o.getAnnotation(i.current);
      l.emit("clickAnnotation", X, Y);
    }
  }), po(e, n.theme);
  const p = ml(s, a, n.adapter), y = () => {
    f.$destroy(), m.$destroy(), g.$destroy(), d.destroy(), a.destroy();
  }, x = Wm(e, o), b = jm(e, o), _ = () => h, M = (Y, X, D) => Bo(Y, X, D), B = (Y, X) => ko(Y, X), k = (Y) => {
    if (!ms(Y))
      throw `No drawing tool named ${Y}`;
    g.$set({ toolName: Y });
  }, A = (Y) => {
    c = Y, g.$set({ drawingEnabled: c });
  }, S = (Y) => {
    f.$set({ filter: Y }), g.$set({ filter: Y });
  }, w = (Y) => {
    f.$set({ style: Y }), g.$set({ style: Y });
  }, P = (Y) => (
    // @ts-ignore
    m.$set({ provider: Y })
  ), I = (Y) => po(e, Y), T = (Y) => {
    h = Y, g.$set({ user: Y });
  }, C = (Y) => (
    // @ts-ignore
    f.$set({ visible: Y })
  );
  return {
    ...p,
    destroy: y,
    fitBounds: x,
    fitBoundsWithConstraints: b,
    getUser: _,
    listDrawingTools: fs,
    on: l.on,
    off: l.off,
    registerDrawingTool: M,
    registerShapeEditor: B,
    setDrawingEnabled: A,
    setDrawingTool: k,
    setFilter: S,
    setPresenceProvider: P,
    setStyle: w,
    setTheme: I,
    setUser: T,
    setVisible: C,
    state: s,
    viewer: e
  };
}, tp = vl, ep = yi, np = nl, sp = Hc, ip = et, rp = Ih;
export {
  Bn as $,
  Ca as A,
  Ot as B,
  It as C,
  Oe as D,
  ft as E,
  ku as F,
  Gs as G,
  Pt as H,
  ia as I,
  xt as J,
  _t as K,
  $d as L,
  ka as M,
  nn as N,
  Ne as O,
  Tt as P,
  fn as Q,
  wt as R,
  Wd as S,
  Wn as T,
  ai as U,
  kf as V,
  If as W,
  Pi as X,
  We as Y,
  Ya as Z,
  ya as _,
  xe as a,
  Or as a0,
  Xn as a1,
  yu as a2,
  Xa as a3,
  tp as a4,
  ep as a5,
  np as a6,
  sp as a7,
  ip as a8,
  rp as a9,
  Jm as aa,
  Ln as b,
  rd as c,
  Sa as d,
  an as e,
  Gr as f,
  Hd as g,
  ma as h,
  be as i,
  Q as j,
  st as k,
  gu as l,
  jd as m,
  Qm as n,
  Ud as o,
  Kt as p,
  na as q,
  Cu as r,
  de as s,
  In as t,
  vt as u,
  ad as v,
  ue as w,
  Sd as x,
  Ir as y,
  Uu as z
};
//# sourceMappingURL=index-BQKKS6vZ.js.map
