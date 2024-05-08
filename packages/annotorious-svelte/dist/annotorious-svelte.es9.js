var k = Object.defineProperty;
var v = (e, t, r) => t in e ? k(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var d = (e, t, r) => (v(e, typeof t != "symbol" ? t + "" : t, r), r);
import { flush as w, add_render_callback as g, flush_render_callbacks as E, dirty_components as j, schedule_update as C } from "./annotorious-svelte.es14.js";
import { current_component as M, set_current_component as b } from "./annotorious-svelte.es8.js";
import { noop as u, blank_object as y, run_all as i, is_function as x, is_empty as O, run as S } from "./annotorious-svelte.es5.js";
import { children as z, detach as A } from "./annotorious-svelte.es6.js";
import { transition_in as B } from "./annotorious-svelte.es7.js";
function D(e, t, r) {
  const { fragment: f, after_update: o } = e.$$;
  f && f.m(t, r), g(() => {
    const $ = e.$$.on_mount.map(S).filter(x);
    e.$$.on_destroy ? e.$$.on_destroy.push(...$) : i($), e.$$.on_mount = [];
  }), o.forEach(g);
}
function F(e, t) {
  const r = e.$$;
  r.fragment !== null && (E(r.after_update), i(r.on_destroy), r.fragment && r.fragment.d(t), r.on_destroy = r.fragment = null, r.ctx = []);
}
function G(e, t) {
  e.$$.dirty[0] === -1 && (j.push(e), C(), e.$$.dirty.fill(0)), e.$$.dirty[t / 31 | 0] |= 1 << t % 31;
}
function P(e, t, r, f, o, $, c = null, p = [-1]) {
  const s = M;
  b(e);
  const n = e.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: $,
    update: u,
    not_equal: o,
    bound: y(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(t.context || (s ? s.$$.context : [])),
    // everything else
    callbacks: y(),
    dirty: p,
    skip_bound: !1,
    root: t.target || s.$$.root
  };
  c && c(n.root);
  let l = !1;
  if (n.ctx = r ? r(e, t.props || {}, (a, _, ...m) => {
    const h = m.length ? m[0] : _;
    return n.ctx && o(n.ctx[a], n.ctx[a] = h) && (!n.skip_bound && n.bound[a] && n.bound[a](h), l && G(e, a)), _;
  }) : [], n.update(), l = !0, i(n.before_update), n.fragment = f ? f(n.ctx) : !1, t.target) {
    if (t.hydrate) {
      const a = z(t.target);
      n.fragment && n.fragment.l(a), a.forEach(A);
    } else
      n.fragment && n.fragment.c();
    t.intro && B(e.$$.fragment), D(e, t.target, t.anchor), w();
  }
  b(s);
}
class Q {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    d(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    d(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    F(this, 1), this.$destroy = u;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(t, r) {
    if (!x(r))
      return u;
    const f = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return f.push(r), () => {
      const o = f.indexOf(r);
      o !== -1 && f.splice(o, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(t) {
    this.$$set && !O(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
}
export {
  Q as SvelteComponent,
  F as destroy_component,
  P as init,
  D as mount_component
};
//# sourceMappingURL=annotorious-svelte.es9.js.map
