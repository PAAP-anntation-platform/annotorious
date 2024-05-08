var j = Object.prototype.hasOwnProperty;
function B(e, n) {
  var t, o;
  if (e === n)
    return !0;
  if (e && n && (t = e.constructor) === n.constructor) {
    if (t === Date)
      return e.getTime() === n.getTime();
    if (t === RegExp)
      return e.toString() === n.toString();
    if (t === Array) {
      if ((o = e.length) === n.length)
        for (; o-- && B(e[o], n[o]); )
          ;
      return o === -1;
    }
    if (!t || typeof e == "object") {
      o = 0;
      for (t in e)
        if (j.call(e, t) && ++o && !j.call(n, t) || !(t in n) || !B(e[t], n[t]))
          return !1;
      return Object.keys(n).length === o;
    }
  }
  return e !== e && n !== n;
}
function z() {
}
function q(e, n) {
  return e != e ? n == n : e !== n || e && typeof e == "object" || typeof e == "function";
}
const k = [];
function Y(e, n = z) {
  let t;
  const o = /* @__PURE__ */ new Set();
  function i(E) {
    if (q(e, E) && (e = E, t)) {
      const y = !k.length;
      for (const u of o)
        u[1](), k.push(u, e);
      if (y) {
        for (let u = 0; u < k.length; u += 2)
          k[u][0](k[u + 1]);
        k.length = 0;
      }
    }
  }
  function p(E) {
    i(E(e));
  }
  function L(E, y = z) {
    const u = [E, y];
    return o.add(u), o.size === 1 && (t = n(i, p) || z), E(e), () => {
      o.delete(u), o.size === 0 && t && (t(), t = null);
    };
  }
  return { set: i, update: p, subscribe: L };
}
const Ce = (e) => {
  const { subscribe: n, set: t } = Y();
  let o;
  return n((i) => o = i), e.observe(({ changes: i }) => {
    if (o) {
      (i.deleted || []).some((E) => E.id === o) && t(void 0);
      const L = (i.updated || []).find(({ oldValue: E }) => E.id === o);
      L && t(L.newValue.id);
    }
  }), {
    get current() {
      return o;
    },
    subscribe: n,
    set: t
  };
};
var G = /* @__PURE__ */ ((e) => (e.EDIT = "EDIT", e.SELECT = "SELECT", e.NONE = "NONE", e))(G || {});
const V = { selected: [] }, we = (e, n = "EDIT") => {
  const { subscribe: t, set: o } = Y(V);
  let i = V;
  t((s) => i = s);
  const p = () => o(V), L = () => {
    var s;
    return ((s = i.selected) == null ? void 0 : s.length) === 0;
  }, E = (s) => {
    if (i.selected.length === 0)
      return !1;
    const h = typeof s == "string" ? s : s.id;
    return i.selected.some((w) => w.id === h);
  }, y = (s, h) => {
    const w = e.getAnnotation(s);
    if (w) {
      const b = H(w, n);
      o(b === "EDIT" ? { selected: [{ id: s, editable: !0 }], pointerEvent: h } : b === "SELECT" ? { selected: [{ id: s }], pointerEvent: h } : { selected: [], pointerEvent: h });
    } else
      console.warn("Invalid selection: " + s);
  }, u = (s, h = !0) => {
    const w = Array.isArray(s) ? s : [s], b = w.map((S) => e.getAnnotation(S)).filter(Boolean);
    o({ selected: b.map(({ id: S }) => ({ id: S, editable: h })) }), b.length !== w.length && console.warn("Invalid selection", s);
  }, U = (s) => {
    if (i.selected.length === 0)
      return !1;
    const { selected: h } = i;
    h.filter(({ id: b }) => s.includes(b)).length > 0 && o({ selected: h.filter(({ id: b }) => !s.includes(b)) });
  };
  return e.observe(({ changes: s }) => U((s.deleted || []).map((h) => h.id))), {
    clear: p,
    clickSelect: y,
    get selected() {
      return i ? [...i.selected] : null;
    },
    get pointerEvent() {
      return i ? i.pointerEvent : null;
    },
    isEmpty: L,
    isSelected: E,
    setSelected: u,
    subscribe: t
  };
}, H = (e, n) => typeof n == "function" ? n(e) || "EDIT" : n || "EDIT";
let $;
const F = new Uint8Array(16);
function J() {
  if (!$ && ($ = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !$))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return $(F);
}
const D = [];
for (let e = 0; e < 256; ++e)
  D.push((e + 256).toString(16).slice(1));
function Q(e, n = 0) {
  return D[e[n + 0]] + D[e[n + 1]] + D[e[n + 2]] + D[e[n + 3]] + "-" + D[e[n + 4]] + D[e[n + 5]] + "-" + D[e[n + 6]] + D[e[n + 7]] + "-" + D[e[n + 8]] + D[e[n + 9]] + "-" + D[e[n + 10]] + D[e[n + 11]] + D[e[n + 12]] + D[e[n + 13]] + D[e[n + 14]] + D[e[n + 15]];
}
const X = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), M = {
  randomUUID: X
};
function Z(e, n, t) {
  if (M.randomUUID && !n && !e)
    return M.randomUUID();
  e = e || {};
  const o = e.random || (e.rng || J)();
  return o[6] = o[6] & 15 | 64, o[8] = o[8] & 63 | 128, Q(o);
}
const Le = (e) => {
  const { creator: n, updatedBy: t } = e.target, o = e.bodies.reduce((i, p) => [...i, p.creator, p.updatedBy].filter(Boolean), []);
  return [
    n,
    t,
    ...o
  ].filter((i) => i);
}, Ue = (e, n, t, o) => ({
  id: Z(),
  annotation: e.id,
  created: t || /* @__PURE__ */ new Date(),
  creator: o,
  ...n
}), K = (e, n) => {
  const t = new Set(e.bodies.map((o) => o.id));
  return n.bodies.filter((o) => !t.has(o.id));
}, ee = (e, n) => {
  const t = new Set(n.bodies.map((o) => o.id));
  return e.bodies.filter((o) => !t.has(o.id));
}, te = (e, n) => n.bodies.map((t) => {
  const o = e.bodies.find((i) => i.id === t.id);
  return { newBody: t, oldBody: o && !B(o, t) ? o : void 0 };
}).filter(({ oldBody: t }) => t).map(({ oldBody: t, newBody: o }) => ({ oldBody: t, newBody: o })), ne = (e, n) => !B(e.target, n.target), P = (e, n) => {
  const t = K(e, n), o = ee(e, n), i = te(e, n);
  return {
    oldValue: e,
    newValue: n,
    bodiesCreated: t.length > 0 ? t : void 0,
    bodiesDeleted: o.length > 0 ? o : void 0,
    bodiesUpdated: i.length > 0 ? i : void 0,
    targetUpdated: ne(e, n) ? { oldTarget: e.target, newTarget: n.target } : void 0
  };
};
var oe = /* @__PURE__ */ ((e) => (e.BODY_ONLY = "BODY_ONLY", e.TARGET_ONLY = "TARGET_ONLY", e))(oe || {}), O = /* @__PURE__ */ ((e) => (e.LOCAL = "LOCAL", e.REMOTE = "REMOTE", e))(O || {});
const se = (e, n) => {
  var p, L;
  const { changes: t, origin: o } = n;
  if (!(!e.options.origin || e.options.origin === o))
    return !1;
  if (e.options.ignore) {
    const { ignore: E } = e.options, y = (U) => U && U.length > 0;
    if (!(y(t.created) || y(t.deleted))) {
      const U = (p = t.updated) == null ? void 0 : p.some((h) => y(h.bodiesCreated) || y(h.bodiesDeleted) || y(h.bodiesUpdated)), s = (L = t.updated) == null ? void 0 : L.some((h) => h.targetUpdated);
      if (E === "BODY_ONLY" && U && !s || E === "TARGET_ONLY" && s && !U)
        return !1;
    }
  }
  if (e.options.annotations) {
    const E = /* @__PURE__ */ new Set([
      ...(t.created || []).map((u) => u.id),
      ...(t.deleted || []).map((u) => u.id),
      ...(t.updated || []).map(({ oldValue: u }) => u.id)
    ]);
    return !!(Array.isArray(e.options.annotations) ? e.options.annotations : [e.options.annotations]).find((u) => E.has(u));
  } else
    return !0;
}, ie = (e, n) => {
  const t = new Set((e.created || []).map((s) => s.id)), o = new Set((e.updated || []).map(({ newValue: s }) => s.id)), i = new Set((n.created || []).map((s) => s.id)), p = new Set((n.deleted || []).map((s) => s.id)), L = new Set((n.updated || []).map(({ oldValue: s }) => s.id)), E = new Set((n.updated || []).filter(({ oldValue: s }) => t.has(s.id) || o.has(s.id)).map(({ oldValue: s }) => s.id)), y = [
    ...(e.created || []).filter((s) => !p.has(s.id)).map((s) => L.has(s.id) ? n.updated.find(({ oldValue: h }) => h.id === s.id).newValue : s),
    ...n.created || []
  ], u = [
    ...(e.deleted || []).filter((s) => !i.has(s.id)),
    ...(n.deleted || []).filter((s) => !t.has(s.id))
  ], U = [
    ...(e.updated || []).filter(({ newValue: s }) => !p.has(s.id)).map((s) => {
      const { oldValue: h, newValue: w } = s;
      if (L.has(w.id)) {
        const b = n.updated.find((S) => S.oldValue.id === w.id).newValue;
        return P(h, b);
      } else
        return s;
    }),
    ...(n.updated || []).filter(({ oldValue: s }) => !E.has(s.id))
  ];
  return { created: y, deleted: u, updated: U };
}, de = (e) => e.id !== void 0, Se = () => {
  const e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), t = [], o = (d, r = {}) => t.push({ onChange: d, options: r }), i = (d) => {
    const r = t.findIndex((c) => c.onChange == d);
    r > -1 && t.splice(r, 1);
  }, p = (d, r) => {
    const c = {
      origin: d,
      changes: {
        created: r.created || [],
        updated: r.updated || [],
        deleted: r.deleted || []
      },
      state: [...e.values()]
    };
    t.forEach((f) => {
      se(f, c) && f.onChange(c);
    });
  }, L = (d, r = O.LOCAL) => {
    if (e.get(d.id))
      throw Error(`Cannot add annotation ${d.id} - exists already`);
    e.set(d.id, d), d.bodies.forEach((f) => n.set(f.id, d.id)), p(r, { created: [d] });
  }, E = (d, r) => {
    const c = typeof d == "string" ? r : d, f = typeof d == "string" ? d : d.id, C = e.get(f);
    if (C) {
      const T = P(C, c);
      return f === c.id ? e.set(f, c) : (e.delete(f), e.set(c.id, c)), C.bodies.forEach((I) => n.delete(I.id)), c.bodies.forEach((I) => n.set(I.id, c.id)), T;
    } else
      console.warn(`Cannot update annotation ${f} - does not exist`);
  }, y = (d, r = O.LOCAL, c = O.LOCAL) => {
    const f = de(r) ? c : r, C = E(d, r);
    C && p(f, { updated: [C] });
  }, u = (d, r = O.LOCAL) => {
    const c = d.reduce((f, C) => {
      const T = E(C);
      return T ? [...f, T] : f;
    }, []);
    c.length > 0 && p(r, { updated: c });
  }, U = (d, r = O.LOCAL) => {
    const c = e.get(d.annotation);
    if (c) {
      const f = {
        ...c,
        bodies: [...c.bodies, d]
      };
      e.set(c.id, f), n.set(d.id, f.id), p(r, { updated: [{
        oldValue: c,
        newValue: f,
        bodiesCreated: [d]
      }] });
    } else
      console.warn(`Attempt to add body to missing annotation: ${d.annotation}`);
  }, s = () => [...e.values()], h = (d = O.LOCAL) => {
    const r = [...e.values()];
    e.clear(), n.clear(), p(d, { deleted: r });
  }, w = (d, r = !0, c = O.LOCAL) => {
    if (r) {
      const f = [...e.values()];
      e.clear(), n.clear(), d.forEach((C) => {
        e.set(C.id, C), C.bodies.forEach((T) => n.set(T.id, C.id));
      }), p(c, { created: d, deleted: f });
    } else {
      const f = d.reduce((C, T) => {
        const I = e.get(T.id);
        return I ? [...C, I] : C;
      }, []);
      if (f.length > 0)
        throw Error(`Bulk insert would overwrite the following annotations: ${f.map((C) => C.id).join(", ")}`);
      d.forEach((C) => {
        e.set(C.id, C), C.bodies.forEach((T) => n.set(T.id, C.id));
      }), p(c, { created: d });
    }
  }, b = (d) => {
    const r = typeof d == "string" ? d : d.id, c = e.get(r);
    if (c)
      return e.delete(r), c.bodies.forEach((f) => n.delete(f.id)), c;
    console.warn(`Attempt to delete missing annotation: ${r}`);
  }, S = (d, r = O.LOCAL) => {
    const c = b(d);
    c && p(r, { deleted: [c] });
  }, v = (d, r = O.LOCAL) => {
    const c = d.reduce((f, C) => {
      const T = b(C);
      return T ? [...f, T] : f;
    }, []);
    c.length > 0 && p(r, { deleted: c });
  }, l = (d) => {
    const r = e.get(d.annotation);
    if (r) {
      const c = r.bodies.find((f) => f.id === d.id);
      if (c) {
        n.delete(c.id);
        const f = {
          ...r,
          bodies: r.bodies.filter((T) => T.id !== d.id)
        };
        return e.set(r.id, f), {
          oldValue: r,
          newValue: f,
          bodiesDeleted: [c]
        };
      } else
        console.warn(`Attempt to delete missing body ${d.id} from annotation ${d.annotation}`);
    } else
      console.warn(`Attempt to delete body from missing annotation ${d.annotation}`);
  }, g = (d, r = O.LOCAL) => {
    const c = l(d);
    c && p(r, { updated: [c] });
  }, a = (d, r = O.LOCAL) => {
    const c = d.map((f) => l(f)).filter(Boolean);
    c.length > 0 && p(r, { updated: c });
  }, A = (d) => {
    const r = e.get(d);
    return r ? { ...r } : void 0;
  }, m = (d) => {
    const r = n.get(d);
    if (r) {
      const f = A(r).bodies.find((C) => C.id === d);
      if (f)
        return f;
      console.error(`Store integrity error: body ${d} in index, but not in annotation`);
    } else
      console.warn(`Attempt to retrieve missing body: ${d}`);
  }, R = (d, r) => {
    if (d.annotation !== r.annotation)
      throw "Annotation integrity violation: annotation ID must be the same when updating bodies";
    const c = e.get(d.annotation);
    if (c) {
      const f = c.bodies.find((T) => T.id === d.id), C = {
        ...c,
        bodies: c.bodies.map((T) => T.id === f.id ? r : T)
      };
      return e.set(c.id, C), f.id !== r.id && (n.delete(f.id), n.set(r.id, C.id)), {
        oldValue: c,
        newValue: C,
        bodiesUpdated: [{ oldBody: f, newBody: r }]
      };
    } else
      console.warn(`Attempt to add body to missing annotation ${d.annotation}`);
  }, N = (d, r, c = O.LOCAL) => {
    const f = R(d, r);
    f && p(c, { updated: [f] });
  }, x = (d, r = O.LOCAL) => {
    const c = d.map((f) => R({ id: f.id, annotation: f.annotation }, f)).filter(Boolean);
    p(r, { updated: c });
  }, _ = (d) => {
    const r = e.get(d.annotation);
    if (r) {
      const c = {
        ...r,
        target: {
          ...r.target,
          ...d
        }
      };
      return e.set(r.id, c), {
        oldValue: r,
        newValue: c,
        targetUpdated: {
          oldTarget: r.target,
          newTarget: d
        }
      };
    } else
      console.warn(`Attempt to update target on missing annotation: ${d.annotation}`);
  };
  return {
    addAnnotation: L,
    addBody: U,
    all: s,
    bulkAddAnnotation: w,
    bulkDeleteAnnotation: v,
    bulkDeleteBodies: a,
    bulkUpdateAnnotation: u,
    bulkUpdateBodies: x,
    bulkUpdateTargets: (d, r = O.LOCAL) => {
      const c = d.map((f) => _(f)).filter(Boolean);
      c.length > 0 && p(r, { updated: c });
    },
    clear: h,
    deleteAnnotation: S,
    deleteBody: g,
    getAnnotation: A,
    getBody: m,
    observe: o,
    unobserve: i,
    updateAnnotation: y,
    updateBody: N,
    updateTarget: (d, r = O.LOCAL) => {
      const c = _(d);
      c && p(r, { updated: [c] });
    }
  };
}, Oe = (e) => ({
  ...e,
  subscribe: (t) => {
    const o = (i) => t(i.state);
    return e.observe(o), t(e.all()), () => e.unobserve(o);
  }
});
let W = () => ({
  emit(e, ...n) {
    for (let t = 0, o = this.events[e] || [], i = o.length; t < i; t++)
      o[t](...n);
  },
  events: {},
  on(e, n) {
    var t;
    return ((t = this.events)[e] || (t[e] = [])).push(n), () => {
      var o;
      this.events[e] = (o = this.events[e]) == null ? void 0 : o.filter((i) => n !== i);
    };
  }
});
const ae = 250, Te = (e) => {
  const n = W(), t = [];
  let o = -1, i = !1, p = 0;
  const L = (a) => {
    if (!i) {
      const { changes: A } = a, m = performance.now();
      if (m - p > ae)
        t.splice(o + 1), t.push(A), o = t.length - 1;
      else {
        const R = t.length - 1;
        t[R] = ie(t[R], A);
      }
      p = m;
    }
    i = !1;
  };
  e.observe(L, { origin: O.LOCAL });
  const E = (a) => a && a.length > 0 && e.bulkDeleteAnnotation(a), y = (a) => a && a.length > 0 && e.bulkAddAnnotation(a, !1), u = (a) => a && a.length > 0 && e.bulkUpdateAnnotation(a.map(({ oldValue: A }) => A)), U = (a) => a && a.length > 0 && e.bulkUpdateAnnotation(a.map(({ newValue: A }) => A)), s = (a) => a && a.length > 0 && e.bulkAddAnnotation(a, !1), h = (a) => a && a.length > 0 && e.bulkDeleteAnnotation(a);
  return {
    canRedo: () => t.length - 1 > o,
    canUndo: () => o > -1,
    destroy: () => e.unobserve(L),
    on: (a, A) => n.on(a, A),
    redo: () => {
      if (t.length - 1 > o) {
        i = !0;
        const { created: a, updated: A, deleted: m } = t[o + 1];
        y(a), U(A), h(m), n.emit("redo", t[o + 1]), o += 1;
      }
    },
    undo: () => {
      if (o > -1) {
        i = !0;
        const { created: a, updated: A, deleted: m } = t[o];
        E(a), u(A), s(m), n.emit("undo", t[o]), o -= 1;
      }
    }
  };
}, De = () => {
  const { subscribe: e, set: n } = Y([]);
  return {
    subscribe: e,
    set: n
  };
}, Re = (e, n, t, o) => {
  const { store: i, selection: p, hover: L, viewport: E } = e, y = /* @__PURE__ */ new Map();
  let u = [], U, s;
  const h = (l, g) => {
    y.has(l) ? y.get(l).push(g) : y.set(l, [g]);
  }, w = (l, g) => {
    const a = y.get(l);
    a && a.indexOf(g) > 0 && a.splice(a.indexOf(g), 1);
  }, b = (l, g, a) => {
    y.has(l) && setTimeout(() => {
      y.get(l).forEach((A) => {
        if (t) {
          const m = Array.isArray(g) ? g.map((N) => t.serialize(N)) : t.serialize(g), R = a ? a instanceof PointerEvent ? a : t.serialize(a) : void 0;
          A(m, R);
        } else
          A(g, a);
      });
    }, 1);
  }, S = () => {
    const { selected: l } = p, g = (l || []).map(({ id: a }) => i.getAnnotation(a));
    g.forEach((a) => {
      const A = u.find((m) => m.id === a.id);
      (!A || !B(A, a)) && b("updateAnnotation", a, A);
    }), u = u.map((a) => {
      const A = g.find(({ id: m }) => m === a.id);
      return A || a;
    });
  };
  p.subscribe(({ selected: l }) => {
    if (!(u.length === 0 && l.length === 0)) {
      if (u.length === 0 && l.length > 0)
        u = l.map(({ id: g }) => i.getAnnotation(g));
      else if (u.length > 0 && l.length === 0)
        u.forEach((g) => {
          const a = i.getAnnotation(g.id);
          a && !B(a, g) && b("updateAnnotation", a, g);
        }), u = [];
      else {
        const g = new Set(u.map((m) => m.id)), a = new Set(l.map(({ id: m }) => m));
        u.filter((m) => !a.has(m.id)).forEach((m) => {
          const R = i.getAnnotation(m.id);
          R && !B(R, m) && b("updateAnnotation", R, m);
        }), u = [
          // Remove annotations that were deselected
          ...u.filter((m) => a.has(m.id)),
          // Add editable annotations that were selected
          ...l.filter(({ id: m }) => !g.has(m)).map(({ id: m }) => i.getAnnotation(m))
        ];
      }
      b("selectionChanged", u);
    }
  }), L.subscribe((l) => {
    !U && l ? b("mouseEnterAnnotation", i.getAnnotation(l)) : U && !l ? b("mouseLeaveAnnotation", i.getAnnotation(U)) : U && l && (b("mouseLeaveAnnotation", i.getAnnotation(U)), b("mouseEnterAnnotation", i.getAnnotation(l))), U = l;
  }), E == null || E.subscribe((l) => b("viewportIntersect", l.map((g) => i.getAnnotation(g)))), i.observe((l) => {
    o && (s && clearTimeout(s), s = setTimeout(S, 1e3));
    const { created: g, deleted: a } = l.changes;
    (g || []).forEach((m) => b("createAnnotation", m)), (a || []).forEach((m) => b("deleteAnnotation", m)), (l.changes.updated || []).filter((m) => [
      ...m.bodiesCreated || [],
      ...m.bodiesDeleted || [],
      ...m.bodiesUpdated || []
    ].length > 0).forEach(({ oldValue: m, newValue: R }) => {
      const N = u.find((x) => x.id === m.id) || m;
      u = u.map((x) => x.id === m.id ? R : x), b("updateAnnotation", R, N);
    });
  }, { origin: O.LOCAL }), i.observe((l) => {
    if (u) {
      const g = new Set(u.map((A) => A.id)), a = (l.changes.updated || []).filter(({ newValue: A }) => g.has(A.id)).map(({ newValue: A }) => A);
      a.length > 0 && (u = u.map((A) => {
        const m = a.find((R) => R.id === A.id);
        return m || A;
      }));
    }
  }, { origin: O.REMOTE });
  const v = (l) => (g) => {
    const { updated: a } = g;
    l ? (a || []).forEach((A) => b("updateAnnotation", A.oldValue, A.newValue)) : (a || []).forEach((A) => b("updateAnnotation", A.newValue, A.oldValue));
  };
  return n.on("undo", v(!0)), n.on("redo", v(!1)), { on: h, off: w, emit: b };
}, Be = (e) => (n) => n.map((t) => e.serialize(t)), re = (e) => (n) => n.reduce((t, o) => {
  const { parsed: i, error: p } = e.parse(o);
  return p ? {
    parsed: t.parsed,
    failed: [...t.failed, o]
  } : i ? {
    parsed: [...t.parsed, i],
    failed: t.failed
  } : {
    ...t
  };
}, { parsed: [], failed: [] }), xe = (e, n, t) => {
  const { store: o, selection: i } = e, p = (v) => {
    if (t) {
      const { parsed: l, error: g } = t.parse(v);
      l ? o.addAnnotation(l, O.REMOTE) : console.error(g);
    } else
      o.addAnnotation(v, O.REMOTE);
  }, L = () => i.clear(), E = () => o.clear(), y = (v) => {
    const l = o.getAnnotation(v);
    return t && l ? t.serialize(l) : l;
  }, u = () => t ? o.all().map(t.serialize) : o.all(), U = () => {
    var g;
    const l = (((g = i.selected) == null ? void 0 : g.map((a) => a.id)) || []).map((a) => o.getAnnotation(a)).filter(Boolean);
    return t ? l.map(t.serialize) : l;
  }, s = (v, l = !0) => fetch(v).then((g) => g.json()).then((g) => (w(g, l), g)), h = (v) => {
    if (typeof v == "string") {
      const l = o.getAnnotation(v);
      if (o.deleteAnnotation(v), l)
        return t ? t.serialize(l) : l;
    } else {
      const l = t ? t.parse(v).parsed : v;
      if (l)
        return o.deleteAnnotation(l), v;
    }
  }, w = (v, l = !0) => {
    if (t) {
      const { parsed: g, failed: a } = re(t)(v);
      a.length > 0 && console.warn(`Discarded ${a.length} invalid annotations`, a), o.bulkAddAnnotation(g, l, O.REMOTE);
    } else
      o.bulkAddAnnotation(v, l, O.REMOTE);
  }, b = (v) => {
    v ? i.setSelected(v) : i.clear();
  }, S = (v) => {
    if (t) {
      const l = t.parse(v).parsed, g = t.serialize(o.getAnnotation(l.id));
      return o.updateAnnotation(l), g;
    } else {
      const l = o.getAnnotation(v.id);
      return o.updateAnnotation(v), l;
    }
  };
  return {
    addAnnotation: p,
    cancelSelected: L,
    canRedo: n.canRedo,
    canUndo: n.canUndo,
    clearAnnotations: E,
    getAnnotationById: y,
    getAnnotations: u,
    getSelected: U,
    loadAnnotations: s,
    redo: n.redo,
    removeAnnotation: h,
    setAnnotations: w,
    setSelected: b,
    undo: n.undo,
    updateAnnotation: S
  };
}, ce = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let le = (e) => crypto.getRandomValues(new Uint8Array(e)), ue = (e, n, t) => {
  let o = (2 << Math.log(e.length - 1) / Math.LN2) - 1, i = -~(1.6 * o * n / e.length);
  return (p = n) => {
    let L = "";
    for (; ; ) {
      let E = t(i), y = i;
      for (; y--; )
        if (L += e[E[y] & o] || "", L.length === p)
          return L;
    }
  };
}, fe = (e, n = 21) => ue(e, n, le), pe = (e = 21) => {
  let n = "", t = crypto.getRandomValues(new Uint8Array(e));
  for (; e--; )
    n += ce[t[e] & 63];
  return n;
};
const Ie = () => ({ isGuest: !0, id: fe("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_", 20)() }), he = (e) => {
  const n = JSON.stringify(e);
  let t = 0;
  for (let o = 0, i = n.length; o < i; o++) {
    let p = n.charCodeAt(o);
    t = (t << 5) - t + p, t |= 0;
  }
  return `${t}`;
}, ge = (e) => e ? typeof e == "object" ? { ...e } : e : void 0, ke = (e, n) => (Array.isArray(e) ? e : [e]).map((t) => {
  const { id: o, type: i, purpose: p, value: L, created: E, creator: y, ...u } = t;
  return {
    id: o || `temp-${he(t)}`,
    annotation: n,
    type: i,
    purpose: p,
    value: L,
    created: E ? new Date(E) : void 0,
    creator: ge(y),
    ...u
  };
}), Ne = (e) => e.map((n) => {
  var o, i;
  const t = { ...n };
  return delete t.annotation, (o = t.id) != null && o.startsWith("temp-") && delete t.id, { ...t, created: (i = t.created) == null ? void 0 : i.toISOString() };
}), me = [
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
], Ae = () => {
  const e = [...me];
  return { assignRandomColor: () => {
    const o = Math.floor(Math.random() * e.length), i = e[o];
    return e.splice(o, 1), i;
  }, releaseColor: (o) => e.push(o) };
}, be = () => {
  const e = Ae();
  return { addUser: (o, i) => {
    const p = e.assignRandomColor();
    return {
      label: i.name || i.id,
      avatar: i.avatar,
      color: p
    };
  }, removeUser: (o) => e.releaseColor(o.appearance.color) };
}, Ee = (e, n) => e.every((t) => e.includes(t)) && n.every((t) => e.includes(t)), $e = pe(), ze = (e = be()) => {
  const n = W(), t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = (s, h) => {
    if (t.has(s)) {
      console.warn("Attempt to add user that is already present", s, h);
      return;
    }
    const w = e.addUser(s, h);
    t.set(s, {
      ...h,
      presenceKey: s,
      appearance: w
    });
  }, p = (s) => {
    const h = t.get(s);
    if (!h) {
      console.warn("Attempt to remove user that is not present", s);
      return;
    }
    e.removeUser(h), t.delete(s);
  }, L = (s) => {
    const h = new Set(s.map((S) => S.presenceKey)), w = s.filter(({ presenceKey: S }) => !t.has(S)), b = Array.from(t.values()).filter((S) => !h.has(S.presenceKey));
    w.forEach(({ presenceKey: S, user: v }) => i(S, v)), b.forEach((S) => {
      const { presenceKey: v } = S;
      o.has(v) && n.emit("selectionChange", S, null), p(v);
    }), (w.length > 0 || b.length > 0) && n.emit("presence", u());
  }, E = (s, h) => {
    const w = t.get(s);
    if (!w) {
      console.warn("Activity notification from user that is not present");
      return;
    }
    const b = o.get(s);
    (!b || !Ee(b, h)) && (o.set(s, h), n.emit("selectionChange", w, h));
  }, y = (s, h) => {
    const w = t.get(s);
    if (!w) {
      console.warn("Selection change for user that is not present", s);
      return;
    }
    h ? o.set(s, h) : o.delete(s), n.emit("selectionChange", w, h);
  }, u = () => [...Array.from(t.values())];
  return {
    getPresentUsers: u,
    notifyActivity: E,
    on: (s, h) => n.on(s, h),
    syncUsers: L,
    updateSelection: y
  };
};
export {
  oe as Ignore,
  O as Origin,
  $e as PRESENCE_KEY,
  G as PointerSelectAction,
  Ie as createAnonymousGuest,
  xe as createBaseAnnotator,
  Ue as createBody,
  be as createDefaultAppearenceProvider,
  Ce as createHoverState,
  Re as createLifecyleObserver,
  ze as createPresenceState,
  we as createSelectionState,
  Se as createStore,
  Te as createUndoStack,
  De as createViewportState,
  Ae as defaultColorProvider,
  P as diffAnnotations,
  Le as getContributors,
  ie as mergeChanges,
  H as onPointerSelect,
  re as parseAll,
  ke as parseW3CBodies,
  ge as parseW3CUser,
  Be as serializeAll,
  Ne as serializeW3CBodies,
  se as shouldNotify,
  Oe as toSvelteStore
};
//# sourceMappingURL=annotorious-core.es.js.map
