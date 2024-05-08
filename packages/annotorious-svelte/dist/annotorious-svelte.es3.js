import { safe_not_equal as g, create_slot as b, update_slot_base as h, get_all_dirty_from_scope as k, get_slot_changes as w } from "./annotorious-svelte.es5.js";
import { empty as A, insert as O, detach as v } from "./annotorious-svelte.es6.js";
import { transition_in as s, transition_out as c, check_outros as C, group_outros as q } from "./annotorious-svelte.es7.js";
import { setContext as _ } from "./annotorious-svelte.es8.js";
import { SvelteComponent as y, init as D } from "./annotorious-svelte.es9.js";
import "./annotorious-svelte.es10.js";
import { toSvelteStore as N } from "@annotorious/core";
import { createOSDAnnotator as j } from "@annotorious/openseadragon";
function d(f) {
  let o;
  const n = (
    /*#slots*/
    f[4].default
  ), t = b(
    n,
    f,
    /*$$scope*/
    f[3],
    null
  );
  return {
    c() {
      t && t.c();
    },
    m(e, r) {
      t && t.m(e, r), o = !0;
    },
    p(e, r) {
      t && t.p && (!o || r & /*$$scope*/
      8) && h(
        t,
        n,
        e,
        /*$$scope*/
        e[3],
        o ? w(
          n,
          /*$$scope*/
          e[3],
          r,
          null
        ) : k(
          /*$$scope*/
          e[3]
        ),
        null
      );
    },
    i(e) {
      o || (s(t, e), o = !0);
    },
    o(e) {
      c(t, e), o = !1;
    },
    d(e) {
      t && t.d(e);
    }
  };
}
function z(f) {
  let o, n, t = (
    /*viewer*/
    f[0] && d(f)
  );
  return {
    c() {
      t && t.c(), o = A();
    },
    m(e, r) {
      t && t.m(e, r), O(e, o, r), n = !0;
    },
    p(e, [r]) {
      /*viewer*/
      e[0] ? t ? (t.p(e, r), r & /*viewer*/
      1 && s(t, 1)) : (t = d(e), t.c(), s(t, 1), t.m(o.parentNode, o)) : t && (q(), c(t, 1, 1, () => {
        t = null;
      }), C());
    },
    i(e) {
      n || (s(t), n = !0);
    },
    o(e) {
      c(t), n = !1;
    },
    d(e) {
      e && v(o), t && t.d(e);
    }
  };
}
function B(f, o, n) {
  let { $$slots: t = {}, $$scope: e } = o, { viewer: r } = o, { opts: l = {} } = o, { anno: a = void 0 } = o;
  const p = (i) => {
    if (i) {
      const u = j(i, l), S = N(u.state.store), m = {
        ...u,
        state: { ...u.state, store: S }
      };
      _("anno", m), _("viewer", i), n(1, a = m);
    }
  };
  return f.$$set = (i) => {
    "viewer" in i && n(0, r = i.viewer), "opts" in i && n(2, l = i.opts), "anno" in i && n(1, a = i.anno), "$$scope" in i && n(3, e = i.$$scope);
  }, f.$$.update = () => {
    f.$$.dirty & /*viewer*/
    1 && p(r);
  }, [r, a, l, e, t];
}
class E extends y {
  constructor(o) {
    super(), D(this, o, B, z, g, { viewer: 0, opts: 2, anno: 1 });
  }
}
const P = E;
export {
  P as default
};
//# sourceMappingURL=annotorious-svelte.es3.js.map
