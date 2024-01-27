import { defineComponent as q, ref as $, onMounted as D, openBlock as l, createElementBlock as i, normalizeStyle as c, normalizeClass as k, createElementVNode as d, renderSlot as E, computed as J, Fragment as z, renderList as B, toDisplayString as v, createCommentVNode as w, withModifiers as H, watch as L, reactive as I, createVNode as M, Transition as Z, withCtx as G, unref as R } from "vue";
const K = { class: "tw_button_slot" }, Q = /* @__PURE__ */ q({
  __name: "tw-button",
  props: {
    width: {},
    height: {},
    success: { type: Boolean },
    warning: { type: Boolean },
    error: { type: Boolean },
    outline: { type: Boolean },
    rounded: { type: Boolean },
    round: { type: Boolean },
    disabled: { type: Boolean },
    border: {},
    bgc: {},
    text_color: {},
    hover: {}
  },
  emits: ["push"],
  setup(s) {
    const p = s, r = $();
    return D(() => {
      let e = p.bgc ?? document.body.style.getPropertyValue("--tw_button_default_background_color");
      p.success && (e = document.body.style.getPropertyValue("--tw_button_success_background_color")), p.warning && (e = document.body.style.getPropertyValue("--tw_button_warning_background_color")), p.error && (e = document.body.style.getPropertyValue("--tw_button_error_background_color")), p.outline && (e = document.body.style.getPropertyValue("--tw_button_outline_background_color")), p.hover && (r.value.addEventListener("mouseover", () => {
        r.value.style.backgroundColor = p.hover;
      }), r.value.addEventListener("mouseout", () => {
        r.value.style.backgroundColor = e;
      }));
    }), (e, _) => (l(), i("button", {
      ref_key: "tw_lib_Button",
      ref: r,
      onClick: _[0] || (_[0] = (t) => e.$emit("push")),
      style: c({
        width: e.width,
        height: e.height,
        border: e.border,
        backgroundColor: e.bgc,
        color: e.text_color
      }),
      class: k(["tw_button", {
        success: e.success,
        warning: e.warning,
        error: e.error,
        disabled: e.disabled,
        outline: e.outline,
        rounded: e.rounded,
        round: e.round
      }])
    }, [
      d("span", K, [
        E(e.$slots, "default")
      ])
    ], 6));
  }
}), U = {
  key: 0,
  style: { color: "rgb(212, 190, 50)" },
  class: "table_no_data"
}, X = ["colspan"], Y = ["onClick", "onDblclick", "onContextmenu"], x = ["colspan"], ee = { style: { display: "inline-flex" } }, te = { key: 0 }, oe = { key: 0 }, re = /* @__PURE__ */ q({
  __name: "tw-table-base",
  props: {
    header: {
      type: Array,
      required: !1
    },
    body: {
      type: Array,
      required: !0
    },
    td_align_left: {
      type: Boolean,
      required: !1
    },
    td_align_right: {
      type: Boolean,
      required: !1
    },
    elements_with_tabulation: {
      type: Array,
      required: !1
    },
    cell_padding: {
      type: String,
      required: !1
    },
    red_when_sub_zero: {
      type: Boolean,
      required: !1
    },
    table_with_select: {
      type: Boolean,
      required: !1
    },
    with_fixed: {
      type: Number,
      required: !1
    },
    width: {
      type: String,
      required: !1
    },
    height: {
      type: String,
      required: !1
    },
    header_bgc: {
      type: String,
      required: !1
    },
    header_font_color: {
      type: String,
      required: !1
    },
    header_font_size: {
      type: String,
      required: !1
    },
    cell_font_size: {
      type: String,
      required: !1
    },
    cell_font_color: {
      type: String,
      required: !1
    },
    table_bgc: {
      type: String,
      required: !1
    },
    cell_min_width: {
      type: String,
      required: !1
    },
    multicolor: {
      type: Boolean,
      required: !1
    },
    row_custom_settings: {
      type: Array,
      required: !1
    },
    header_padding: {
      type: String,
      required: !1
    },
    table_border: {
      type: String,
      required: !1
    },
    header_font_family: {
      type: String,
      required: !1
    },
    header_border_bottom: {
      type: String,
      required: !1
    }
  },
  emits: ["push", "dabClick", "rightClick"],
  setup(s, { emit: p }) {
    const r = p, e = s, _ = $("");
    function t(a, u) {
      _.value = JSON.stringify(a), r("push", { bodyElement: a, $event: u });
    }
    function y(a, u) {
      _.value = JSON.stringify(a), r("dabClick", { bodyElement: a, $event: u });
    }
    function o(a, u) {
      _.value = JSON.stringify(a), r("rightClick", { bodyElement: a, $event: u });
    }
    function h(a) {
      if (e.table_with_select)
        return _.value === JSON.stringify(a);
    }
    const C = J(() => e.red_when_sub_zero);
    function A(a) {
      return a === " " || a === "" || isNaN(a) ? a : e.with_fixed ? Number(a).toFixed(e.with_fixed) : Number(a);
    }
    function j(a) {
      if (e.row_custom_settings) {
        const u = e.row_custom_settings.find((m) => m.idx === a);
        return u && u.bgc ? u.bgc : e.table_bgc;
      } else
        return e.table_bgc;
    }
    function n(a) {
      if (e.row_custom_settings) {
        const u = e.row_custom_settings.find((m) => m.idx === a);
        return u && u.textColor ? u.textColor : e.cell_font_color ?? "black";
      } else
        return e.cell_font_color ?? "black";
    }
    function F(a) {
      if (e.row_custom_settings) {
        const u = e.row_custom_settings.find((m) => m.idx === a);
        return u ? u.fontSize : "14px";
      } else
        return "14px";
    }
    function g(a) {
      if (e.row_custom_settings) {
        const u = e.row_custom_settings.find((m) => m.idx === a);
        if (u)
          return u.fontFamily;
      }
    }
    function O(a) {
      if (e.row_custom_settings) {
        const u = e.row_custom_settings.find((m) => m.idx === a);
        if (u && u.isSubTitle)
          return u.isSubTitle;
      }
    }
    function f(a) {
      if (e.row_custom_settings) {
        const u = e.row_custom_settings.find((m) => m.idx === a);
        return u && u.textAlign ? u.textAlign : !1;
      }
      return !1;
    }
    return (a, u) => {
      var m;
      return l(), i("table", {
        style: c({
          width: e.width ?? "200px",
          height: e.height ?? "auto",
          // backgroundColor: props.table_bgc,
          border: s.table_border ?? "1px solid black"
        }),
        class: k(["global-table", { td_align_left: s.td_align_left, td_align_right: s.td_align_right }])
      }, [
        d("thead", null, [
          d("tr", null, [
            (l(!0), i(z, null, B(s.header, (V, b) => (l(), i("th", {
              style: c({
                backgroundColor: e.header_bgc ?? "rgb(220, 220, 220)",
                color: e.header_font_color ?? "black",
                fontSize: s.header_font_size ?? "18px",
                fontFamily: e.header_font_family ?? "",
                padding: e.header_padding ?? "5px 10px",
                border: s.table_border ?? "1px solid black",
                borderBottom: s.header_border_bottom ?? s.table_border ?? "2px solid black"
              }),
              key: b
            }, v(V), 5))), 128))
          ])
        ]),
        d("tbody", null, [
          s.body.length ? w("", !0) : (l(), i("tr", U, [
            d("td", {
              colspan: ((m = s.header) == null ? void 0 : m.length) || 1
            }, " Данные отсутствуют ", 8, X)
          ])),
          (l(!0), i(z, null, B(s.body, (V, b) => (l(), i("tr", {
            key: b,
            style: c({
              backgroundColor: j(b),
              color: n(b),
              fontSize: F(b),
              fontFamily: g(b)
            }),
            class: k({ odd: b % 2 === 0 && e.multicolor, selected: h(V) }),
            onClick: (S) => t(V, S),
            onDblclick: (S) => y(V, S),
            onContextmenu: H((S) => o(V, S), ["prevent"])
          }, [
            (l(!0), i(z, null, B(Object.values(V), (S, P) => {
              var N;
              return l(), i("td", {
                colspan: O(b) ? (N = s.header) == null ? void 0 : N.length : 1,
                style: c({
                  padding: e.cell_padding ?? "5px 10px",
                  fontSize: e.cell_font_size ?? F(b),
                  color: n(b),
                  minWidth: s.cell_min_width ?? "50px",
                  border: s.table_border ?? "1px solid black",
                  fontFamily: g(b),
                  textAlign: O(b) ? f(b) ?? s.td_align_left ? "left" : s.td_align_right ? "right" : "center" : s.td_align_left ? "left" : s.td_align_right ? "right" : "center"
                }),
                key: P
              }, [
                d("div", ee, [
                  e.elements_with_tabulation ? (l(), i("div", te, [
                    (l(!0), i(z, null, B(s.elements_with_tabulation, (T, W) => (l(), i("div", { key: W }, [
                      T[0] === b && T[1] === P ? (l(), i("pre", oe, "   ")) : w("", !0)
                    ]))), 128))
                  ])) : w("", !0),
                  d("span", {
                    class: k({ red_when_sub_zero: C.value && S < 0 })
                  }, v(A(S)), 3)
                ])
              ], 12, x);
            }), 128))
          ], 46, Y))), 128))
        ])
      ], 6);
    };
  }
}), ne = { class: "tw_input_wrapper" }, le = ["value", "type", "min", "max", "step", "maxlength", "placeholder", "disabled", "readonly"], ie = /* @__PURE__ */ q({
  __name: "tw-input",
  props: {
    modelValue: {},
    width: {},
    height: {},
    input_width: {},
    input_font_size: {},
    input_font_family: {},
    type: {},
    min: {},
    max: {},
    step: {},
    max_length: {},
    border: {},
    bgc: {},
    caret_color: {},
    input_text_color: {},
    border_bottom: {},
    padding: {},
    placeholder: {},
    text_center: { type: Boolean },
    border_radius: {},
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    vertical: { type: Boolean },
    prefix: {},
    postfix: {},
    prefix_color: {},
    postfix_color: {},
    prefix_font_size: {},
    prefix_font_family: {},
    postfix_font_size: {},
    postfix_font_family: {}
  },
  emits: ["update:modelValue"],
  setup(s, { emit: p }) {
    const r = s, e = p;
    function _(t) {
      r.type === "number" ? e("update:modelValue", +t.target.value) : e("update:modelValue", t.target.value);
    }
    return (t, y) => (l(), i("div", {
      style: c({
        height: t.height,
        width: t.width
      }),
      class: "tw_input_component"
    }, [
      d("div", {
        class: k(["tw_input_wrap", { tw_input_vertical: t.vertical }]),
        style: c({
          height: t.height
        })
      }, [
        t.prefix ? (l(), i("span", {
          key: 0,
          style: c({
            color: t.prefix_color,
            fontSize: t.prefix_font_size,
            fontFamily: t.prefix_font_family
          })
        }, v(t.prefix), 5)) : w("", !0),
        d("div", ne, [
          d("input", {
            value: t.modelValue,
            onInput: _,
            class: k(["tw_input", { tw_input_disabled: t.disabled, tw_input_readonly: r.readonly }]),
            style: c({
              width: t.input_width,
              fontSize: t.input_font_size,
              fontFamily: t.input_font_family,
              border: t.border,
              borderBottom: t.border_bottom ?? t.border ?? "1px solid rgb(240, 240, 240)",
              borderRadius: t.border_radius,
              backgroundColor: t.bgc,
              caretColor: t.caret_color,
              color: t.input_text_color,
              padding: t.padding,
              textAlign: t.text_center ? "center" : "start"
            }),
            type: t.type ?? "text",
            min: t.min,
            max: t.max,
            step: t.step,
            maxlength: t.max_length,
            placeholder: t.placeholder,
            disabled: t.disabled,
            readonly: r.readonly
          }, null, 46, le),
          t.postfix ? (l(), i("span", {
            key: 0,
            style: c({
              color: t.postfix_color,
              fontSize: t.postfix_font_size,
              fontFamily: t.postfix_font_family
            })
          }, v(t.postfix), 5)) : w("", !0)
        ])
      ], 6),
      d("span", null, [
        E(t.$slots, "validator")
      ])
    ], 4));
  }
}), se = ["value"], ae = { class: "tw_icon" }, de = ["onClick"], ue = /* @__PURE__ */ q({
  __name: "tw-dropdown",
  props: {
    modelValue: {},
    variants: {},
    width: {},
    items_height: {},
    padding: {},
    color: {},
    border: {},
    text_center: { type: Boolean },
    bgc: {},
    hover_color: {},
    font_size: {},
    font_family: {},
    font_weight: {}
  },
  emits: ["update:modelValue"],
  setup(s, { emit: p }) {
    const r = $(), e = s, _ = p, t = $(!1);
    function y(o) {
      _("update:modelValue", o), t.value = !1;
    }
    return L(r, () => {
      e.hover_color && r.value && (r.value.forEach((o) => o.addEventListener("mouseover", () => {
        o.style.backgroundColor = e.hover_color;
      })), r.value.forEach((o) => o.addEventListener("mouseout", () => {
        o.style.backgroundColor = e.bgc ?? "";
      })));
    }), L(t, (o) => {
      o || (r.value.forEach((h) => h.removeEventListener("mouseover", () => {
        h.style.backgroundColor = e.hover_color;
      })), r.value.forEach((h) => h.removeEventListener("mouseout", () => {
        h.style.backgroundColor = e.bgc ?? "";
      })), r.value = null);
    }), (o, h) => (l(), i("div", {
      class: "tw_dropdown",
      style: c({ width: o.width })
    }, [
      d("div", {
        class: k(["tw_dropdown__title", { bb_transparent: t.value }]),
        onClick: h[0] || (h[0] = (C) => t.value = !t.value),
        style: c({
          height: o.items_height,
          paddingTop: o.padding,
          paddingBottom: o.padding,
          paddingLeft: o.padding,
          border: o.border,
          backgroundColor: o.bgc
        })
      }, [
        d("input", {
          style: c({
            color: o.color,
            textAlign: o.text_center ? "center" : "start",
            backgroundColor: o.bgc,
            fontSize: o.font_size,
            fontFamily: o.font_family,
            fontWeight: o.font_weight
          }),
          class: "tw_dropdown__value",
          value: o.modelValue,
          readonly: "",
          type: "text"
        }, null, 12, se),
        d("div", ae, [
          d("div", {
            class: "tw_icon__left",
            style: c({ transform: t.value ? "rotate(60deg)" : "rotate(-60deg)" })
          }, null, 4),
          d("div", {
            class: "tw_icon__right",
            style: c({ transform: t.value ? "rotate(-60deg)" : "rotate(60deg)" })
          }, null, 4)
        ])
      ], 6),
      t.value ? (l(), i("div", {
        key: 0,
        class: "tw_dropdown__variants",
        style: c({
          borderLeft: o.border,
          borderRight: o.border,
          borderBottom: o.border
        })
      }, [
        (l(!0), i(z, null, B(o.variants, (C) => (l(), i("ul", {
          class: "tw_dropdown__list",
          key: C,
          style: c({
            backgroundColor: o.bgc
          })
        }, [
          d("li", {
            onClick: (A) => y(C),
            ref_for: !0,
            ref_key: "dropdownItem",
            ref: r,
            style: c({
              height: o.items_height,
              padding: o.padding,
              color: o.color,
              justifyContent: o.text_center ? "center" : "start",
              fontSize: o.font_size,
              fontFamily: o.font_family,
              fontWeight: o.font_weight
            })
          }, [
            d("span", null, v(C), 1)
          ], 12, de)
        ], 4))), 128))
      ], 4)) : w("", !0)
    ], 4));
  }
}), ce = { class: "tw_dropdown_multi-icon" }, _e = ["value"], pe = { class: "tw_dropdown-variants" }, fe = ["onClick"], be = {
  key: 0,
  class: "variant_span"
}, ge = {
  key: 1,
  class: "variant_span"
}, me = {
  key: 2,
  class: "tw_multi_dropdown-icon"
}, ye = /* @__PURE__ */ d("span", { class: "tw_multi_dropdown-icon-left" }, null, -1), he = /* @__PURE__ */ d("span", { class: "tw_multi_dropdown-icon-right" }, null, -1), we = [
  ye,
  he
], ve = {
  key: 3,
  class: "sub_variants"
}, ke = ["onClick"], Ce = {
  key: 0,
  class: "variant_span"
}, Se = {
  key: 1,
  class: "variant_span"
}, ze = {
  key: 2,
  class: "tw_multi_dropdown-icon"
}, Be = /* @__PURE__ */ d("span", { class: "tw_multi_dropdown-icon-left" }, null, -1), Ve = /* @__PURE__ */ d("span", { class: "tw_multi_dropdown-icon-right" }, null, -1), $e = [
  Be,
  Ve
], qe = {
  key: 0,
  class: "sub_variants"
}, Ae = ["onClick"], Oe = { class: "variant_span" }, je = /* @__PURE__ */ q({
  __name: "tw-multi-dropdown",
  props: {
    modelValue: {},
    variants: {},
    bgc: {},
    border: {},
    itemHeight: {},
    fontSize: {},
    fontColor: {},
    textCenter: { type: Boolean },
    hoverColor: {},
    width: {},
    largeArrow: { type: Boolean },
    arrowColor: {}
  },
  emits: ["update:modelValue"],
  setup(s, { emit: p }) {
    const r = s, e = p, _ = $(!1), t = $(), y = $();
    let o = I([]);
    function h(n) {
      t.value = n, o = [], !(Object.values(n)[1] instanceof Array) && (typeof n == "string" || typeof n == "number") && (e("update:modelValue", n), _.value = !1, t.value = {}, y.value = {});
    }
    function C(n) {
      y.value = n, o = Object.values(y.value)[1], (typeof n == "string" || typeof n == "number") && (e("update:modelValue", n), _.value = !1, t.value = {}, y.value = {}, o = []);
    }
    function A(n) {
      _.value = !1, t.value = {}, e("update:modelValue", n), t.value = {}, y.value = {}, o = [];
    }
    function j() {
      _.value = !_.value, t.value = {}, y.value = {}, o = [];
    }
    return D(() => {
      r.hoverColor && document.body.style.setProperty("--tw_dropdown_multi_hoverColor", r.hoverColor), r.bgc && document.body.style.setProperty("--tw_dropdown_multi_bgc", r.bgc), r.textCenter && document.body.style.setProperty("--tw_dropdown_multi_text_align", "center"), r.fontColor && document.body.style.setProperty("--tw_dropdown_multi_font_color", r.fontColor), r.fontSize && document.body.style.setProperty("--tw_dropdown_multi_font_size", r.fontSize), r.itemHeight && document.body.style.setProperty("--tw_dropdown_multi_item_height", r.itemHeight), r.border && document.body.style.setProperty("--tw_dropdown_multi_border", r.border), r.arrowColor && document.body.style.setProperty("--tw_dropdown_multi_arrow_color", r.arrowColor), r.largeArrow && document.body.style.setProperty("--tw_dropdown_multi_arrow_width", "2px");
    }), (n, F) => (l(), i("div", {
      class: "tw_multi_dropdown",
      style: c({
        width: n.width ?? "170px"
      })
    }, [
      d("div", {
        style: c({
          borderBottom: _.value ? "" : n.border ? n.border : "1px solid black",
          borderTop: n.border ? n.border : "1px solid black",
          borderLeft: n.border ? n.border : "1px solid black",
          borderRight: n.border ? n.border : "1px solid black"
        }),
        class: "tw_multi_dropdown-base",
        onClick: j
      }, [
        d("div", ce, [
          d("div", {
            class: "tw_dropdown_multi-icon-left",
            style: c({
              transform: _.value ? "rotate(-35deg)" : "rotate(35deg)",
              borderWidth: n.largeArrow ? "2px" : "1px",
              borderColor: n.arrowColor ?? "rgba(0,0,0,.2)",
              backgroundColor: n.arrowColor ?? "rgba(0,0,0,.2)"
            })
          }, null, 4),
          d("div", {
            class: "tw_dropdown_multi-icon-right",
            style: c({
              transform: _.value ? "rotate(35deg)" : "rotate(-35deg)",
              borderWidth: n.largeArrow ? "2px" : "1px",
              borderColor: n.arrowColor ?? "rgba(0,0,0,.2)",
              backgroundColor: n.arrowColor ?? "rgba(0,0,0,.2)"
            })
          }, null, 4)
        ]),
        d("input", {
          class: "tw_multi_dropdown_input",
          readonly: "",
          type: "text",
          value: r.modelValue
        }, null, 8, _e)
      ], 4),
      d("div", pe, [
        M(Z, { name: "tr_multi_dropdown" }, {
          default: G(() => [
            _.value ? (l(), i("div", {
              key: 0,
              class: "tw_multi_dropdown-variants-item",
              style: c({
                borderLeft: n.border ? n.border : "1px solid black",
                borderRight: n.border ? n.border : "1px solid black",
                borderBottom: n.border ? n.border : "1px solid black"
              })
            }, [
              (l(!0), i(z, null, B(r.variants, (g, O) => (l(), i("div", { key: O }, [
                d("div", {
                  class: k(["tw_multi_variant", { tw_multi_dropdown_selected: t.value === g }]),
                  onClick: (f) => h(g)
                }, [
                  typeof g == "string" || typeof g == "number" ? (l(), i("span", be, v(g), 1)) : (l(), i("span", ge, v(Object.values(g)[0]), 1)),
                  typeof g != "string" && typeof g != "number" ? (l(), i("span", me, we)) : w("", !0),
                  t.value && Object.values(t.value)[0] === Object.values(g)[0] && Object.values(g)[1] instanceof Array ? (l(), i("div", ve, [
                    (l(!0), i(z, null, B(Object.values(g)[1], (f) => (l(), i("div", {
                      class: k(["tw_multi_variant", { tw_multi_dropdown_selected: y.value === f }]),
                      onClick: (a) => C(f)
                    }, [
                      typeof f == "string" || typeof f == "number" ? (l(), i("span", Ce, v(f), 1)) : (l(), i("span", Se, v(Object.values(f)[0]), 1)),
                      typeof f != "string" && typeof f != "number" ? (l(), i("span", ze, $e)) : w("", !0)
                    ], 10, ke))), 256)),
                    R(o).length ? (l(), i("div", qe, [
                      (l(!0), i(z, null, B(R(o), (f) => (l(), i("div", {
                        class: "tw_multi_variant",
                        key: f,
                        onClick: (a) => A(f)
                      }, [
                        d("span", Oe, v(f), 1)
                      ], 8, Ae))), 128))
                    ])) : w("", !0)
                  ])) : w("", !0)
                ], 10, fe)
              ]))), 128))
            ], 4)) : w("", !0)
          ]),
          _: 1
        })
      ])
    ], 4));
  }
}), Pe = {
  install: (s) => {
    s.component("tw-button", Q), s.component("tw-table-base", re), s.component("tw-input", ie), s.component("tw-dropdown", ue), s.component("tw-multi-dropdown", je);
  }
};
export {
  Q as TwButton,
  ue as TwDropdown,
  ie as TwInput,
  re as TwTableBase,
  Pe as default
};
