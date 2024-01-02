import { defineComponent as S, ref as z, onMounted as $, onUnmounted as D, openBlock as n, createElementBlock as i, normalizeStyle as p, normalizeClass as v, createElementVNode as d, renderSlot as N, computed as J, Fragment as C, renderList as x, toDisplayString as h, createCommentVNode as m, withModifiers as W, createVNode as F, Transition as H, withCtx as T, reactive as M, unref as j } from "vue";
const I = { class: "tw_button_slot" }, U = /* @__PURE__ */ S({
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
  setup(a) {
    const c = a, t = z();
    return $(() => {
      let e = c.bgc ?? document.body.style.getPropertyValue("--tw_button_default_background_color");
      c.success && (e = document.body.style.getPropertyValue("--tw_button_success_background_color")), c.warning && (e = document.body.style.getPropertyValue("--tw_button_warning_background_color")), c.error && (e = document.body.style.getPropertyValue("--tw_button_error_background_color")), c.outline && (e = document.body.style.getPropertyValue("--tw_button_outline_background_color")), c.hover && (t.value.addEventListener("mouseover", () => {
        t.value.style.backgroundColor = c.hover;
      }), t.value.addEventListener("mouseout", () => {
        t.value.style.backgroundColor = e;
      }));
    }), D(() => {
      c.hover && t.value.replaceWith(t.value.cloneNode(!0));
    }), (e, u) => (n(), i("button", {
      ref_key: "tw_lib_Button",
      ref: t,
      onClick: u[0] || (u[0] = (o) => e.$emit("push")),
      style: p({
        width: e.width,
        height: e.height,
        border: e.border,
        backgroundColor: e.bgc,
        color: e.text_color
      }),
      class: v(["tw_button", {
        success: e.success,
        warning: e.warning,
        error: e.error,
        disabled: e.disabled,
        outline: e.outline,
        rounded: e.rounded,
        round: e.round
      }])
    }, [
      d("span", I, [
        N(e.$slots, "default")
      ])
    ], 6));
  }
}), Z = {
  key: 0,
  style: { color: "rgb(212, 190, 50)" },
  class: "table_no_data"
}, G = ["colspan"], K = ["onClick", "onDblclick", "onContextmenu"], Q = { style: { display: "inline-flex" } }, X = { key: 0 }, Y = { key: 0 }, E = /* @__PURE__ */ S({
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
    cell_padding: {
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
    }
  },
  emits: ["push", "dabClick", "rightClick"],
  setup(a, { emit: c }) {
    const t = c, e = a, u = z("");
    function o(s, l) {
      u.value = JSON.stringify(s), t("push", { bodyElement: s, $event: l });
    }
    function y(s, l) {
      u.value = JSON.stringify(s), t("dabClick", { bodyElement: s, $event: l });
    }
    function _(s, l) {
      u.value = JSON.stringify(s), t("rightClick", { bodyElement: s, $event: l });
    }
    function V(s) {
      if (e.table_with_select)
        return u.value === JSON.stringify(s);
    }
    const g = J(() => e.red_when_sub_zero);
    function B(s) {
      return s === " " || s === "" || isNaN(s) ? s : e.with_fixed ? Number(s).toFixed(e.with_fixed) : Number(s);
    }
    function q(s) {
      if (e.row_custom_settings) {
        const l = e.row_custom_settings.find((b) => b.idx === s);
        if (l)
          return l.bgc;
      } else
        return "white";
    }
    function r(s) {
      if (console.log(e.row_custom_settings), e.row_custom_settings) {
        const l = e.row_custom_settings.find((b) => b.idx === s);
        if (console.log(l), l)
          return console.log(l.textColor), l.textColor;
      } else
        return e.cell_font_color ?? "black";
    }
    function R(s) {
      if (e.row_custom_settings) {
        const l = e.row_custom_settings.find((b) => b.idx === s);
        return l ? l.fontSize : "14px";
      } else
        return "14px";
    }
    function f(s) {
      if (e.row_custom_settings) {
        const l = e.row_custom_settings.find((b) => b.idx === s);
        if (l)
          return l.fontFamily;
      }
    }
    return (s, l) => {
      var b;
      return n(), i("table", {
        style: p({
          width: e.width ?? "200px",
          height: e.height ?? "auto",
          backgroundColor: e.table_bgc ?? "white",
          border: a.table_border ?? "1px solid black"
        }),
        class: v(["global-table", { td_align_left: a.td_align_left, td_align_right: a.td_align_right }])
      }, [
        d("thead", null, [
          d("tr", null, [
            (n(!0), i(C, null, x(a.header, (P, w) => (n(), i("th", {
              style: p({
                backgroundColor: e.header_bgc ?? "#ecffe8",
                color: e.header_font_color ?? "#66cc03",
                fontSize: a.header_font_size ?? "18px",
                fontFamily: e.header_font_family ?? "",
                padding: e.header_padding ?? "5px 10px",
                border: a.table_border ?? "1px solid black",
                borderBottom: a.table_border ?? "2px solid black"
              }),
              key: w
            }, h(P), 5))), 128))
          ])
        ]),
        d("tbody", null, [
          a.body.length ? m("", !0) : (n(), i("tr", Z, [
            d("td", {
              colspan: ((b = a.header) == null ? void 0 : b.length) || 1
            }, " Данные отсутствуют ", 8, G)
          ])),
          (n(!0), i(C, null, x(a.body, (P, w) => (n(), i("tr", {
            key: w,
            style: p({
              backgroundColor: q(w),
              color: r(w),
              fontSize: R(w),
              fontFamily: f(w)
            }),
            class: v({ odd: w % 2 === 0 && e.multicolor, selected: V(P) }),
            onClick: (k) => o(P, k),
            onDblclick: (k) => y(P, k),
            onContextmenu: W((k) => _(P, k), ["prevent"])
          }, [
            (n(!0), i(C, null, x(Object.values(P), (k, O) => (n(), i("td", {
              style: p({
                padding: e.cell_padding ?? "5px 10px",
                fontSize: e.cell_font_size ?? R(w),
                color: r(w),
                minWidth: a.cell_min_width ?? "50px",
                border: a.table_border ?? "1px solid black",
                fontFamily: f(w)
              }),
              key: O
            }, [
              d("div", Q, [
                e.elements_with_tabulation ? (n(), i("div", X, [
                  (n(!0), i(C, null, x(a.elements_with_tabulation, (A, L) => (n(), i("div", { key: L }, [
                    A[0] === w && A[1] === O ? (n(), i("pre", Y, "   ")) : m("", !0)
                  ]))), 128))
                ])) : m("", !0),
                d("span", {
                  class: v({ red_when_sub_zero: g.value && k < 0 })
                }, h(B(k)), 3)
              ])
            ], 4))), 128))
          ], 46, K))), 128))
        ])
      ], 6);
    };
  }
}), ee = { class: "tw_input_component" }, te = {
  key: 0,
  class: "tw_input_prefix"
}, oe = ["value", "type", "min", "max", "step", "maxlength", "placeholder", "disabled"], re = {
  key: 0,
  class: "tw_input_postfix"
}, ne = /* @__PURE__ */ S({
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
    vertical: { type: Boolean },
    text_align: {},
    border_radius: {},
    padding: {},
    placeholder: {},
    disabled: { type: Boolean },
    prefix: {},
    postfix: {},
    bgc: {},
    border: {},
    border_bottom_color: {},
    caret_color: {},
    input_color: {},
    prefix_color: {},
    postfix_color: {},
    prefix_fz: {},
    postfix_fz: {},
    prefix_ff: {},
    postfix_ff: {}
  },
  emits: ["update:modelValue"],
  setup(a, { emit: c }) {
    const t = a, e = c;
    function u(o) {
      t.type === "number" ? e("update:modelValue", +o.target.value) : e("update:modelValue", o.target.value);
    }
    return $(() => {
      t.input_width && document.body.style.setProperty("--tw_input_width", t.input_width), t.input_font_family && document.body.style.setProperty("--tw_input_font_family", t.input_font_family), t.input_font_size && document.body.style.setProperty("--tw_input_font_size", t.input_font_size), t.prefix_color && document.body.style.setProperty("--tw_input_prefix_color", t.prefix_color), t.prefix_fz && document.body.style.setProperty("--tw_input_prefix_font_size", t.prefix_fz), t.prefix_ff && document.body.style.setProperty("--tw_input_prefix_font_family", t.prefix_ff), t.postfix_color && document.body.style.setProperty("--tw_input_postfix_color", t.postfix_color), t.postfix_fz && document.body.style.setProperty("--tw_input_postfix_font_size", t.postfix_fz), t.postfix_ff && document.body.style.setProperty("--tw_input_postfix_font_family", t.postfix_ff), t.height && document.body.style.setProperty("--tw_input_height", t.height), t.border && document.body.style.setProperty("--tw_input_border", t.border), t.border_radius && document.body.style.setProperty("--tw_input_border_radius", t.border_radius), t.padding && document.body.style.setProperty("--tw_input_padding", t.padding), t.text_align && document.body.style.setProperty("--tw_input_text_align", t.text_align), t.bgc && document.body.style.setProperty("--tw_input_bgc", t.bgc), t.border_bottom_color && document.body.style.setProperty("--tw_border_bottom_color", t.border_bottom_color), t.caret_color && document.body.style.setProperty("--tw_input_caret_color", t.caret_color), t.input_color && document.body.style.setProperty("--tw_input_color", t.input_color), t.width && document.body.style.setProperty("--tw_input_component_width", t.width), t.height && document.body.style.setProperty("--tw_input_component_height", t.height);
    }), (o, y) => (n(), i("div", ee, [
      d("div", {
        class: v(["tw_input_wrap", { tw_input_vertical: o.vertical }])
      }, [
        o.prefix ? (n(), i("span", te, h(o.prefix), 1)) : m("", !0),
        d("div", {
          class: v(["tw_input_wrapper", { tw_input_w100: !o.prefix }])
        }, [
          d("input", {
            value: o.modelValue,
            onInput: u,
            class: v(["tw_input", { tw_input_disabled: o.disabled }]),
            type: o.type ?? "text",
            min: o.min,
            max: o.max,
            step: o.step,
            maxlength: o.max_length,
            placeholder: o.placeholder,
            disabled: o.disabled
          }, null, 42, oe),
          o.postfix ? (n(), i("span", re, h(o.postfix), 1)) : m("", !0)
        ], 2)
      ], 2),
      d("span", null, [
        N(o.$slots, "validator")
      ])
    ]));
  }
}), ie = { class: "tw_dropdown-icon" }, le = ["value"], se = { class: "tw_dropdown-variants-item" }, de = ["onClick"], ae = /* @__PURE__ */ S({
  __name: "tw-dropdown",
  props: {
    modelValue: {},
    variants: {},
    width: {},
    itemHeight: {},
    variantsHeight: {},
    border: {},
    largeArrow: { type: Boolean },
    arrowColor: {},
    hoverColor: {},
    bgc: {},
    fontSize: {},
    fontColor: {},
    textCenter: { type: Boolean },
    borderRadius: {}
  },
  emits: ["update:modelValue"],
  setup(a, { emit: c }) {
    const t = z(), e = a, u = c, o = z(!1);
    function y(_) {
      u("update:modelValue", _), o.value = !1;
    }
    return $(() => {
      e.itemHeight && document.body.style.setProperty("--tw_dropdown_item_height", e.itemHeight), e.variantsHeight && document.body.style.setProperty("--tw_dropdown_variants_height", e.variantsHeight), e.largeArrow && document.body.style.setProperty("--tw_dropdown_arrow_width", "2px"), e.arrowColor && document.body.style.setProperty("--tw_dropdown_arrow_color", e.arrowColor), e.hoverColor && document.body.style.setProperty("--tw_dropdown_hoverColor", e.hoverColor), e.bgc && document.body.style.setProperty("--tw_dropdown_bgc", e.bgc), e.fontSize && document.body.style.setProperty("--tw_dropdown_font_size", e.fontSize), e.fontColor && document.body.style.setProperty("--tw_dropdown_font_color", e.fontColor), e.textCenter && document.body.style.setProperty("--tw_dropdown_text_align", "center"), e.borderRadius && document.body.style.setProperty("--tw_dropdown_border_radius", e.borderRadius), e.border && document.body.style.setProperty("--tw_dropdown_border", e.border);
    }), (_, V) => (n(), i("div", {
      class: "tw_dropdown",
      style: p({
        width: _.width ?? "170px",
        borderBottomRightRadius: o.value ? "0px" : _.borderRadius ?? "0px",
        borderBottomLeftRadius: o.value ? "0px" : _.borderRadius ?? "0px"
      })
    }, [
      d("div", {
        style: p({
          borderBottomRightRadius: o.value ? "0px" : _.borderRadius ?? "0px",
          borderBottomLeftRadius: o.value ? "0px" : _.borderRadius ?? "0px",
          borderBottom: o.value ? "0px solid black" : _.border ? _.border : "1px solid black"
        }),
        class: "tw_dropdown-base",
        onClick: V[0] || (V[0] = (g) => o.value = !o.value)
      }, [
        d("div", ie, [
          d("div", {
            class: "tw_dropdown-icon-left",
            style: p({
              transform: o.value ? "rotate(-35deg)" : "rotate(35deg)"
            })
          }, null, 4),
          d("div", {
            class: "tw_dropdown-icon-right",
            style: p({
              transform: o.value ? "rotate(35deg)" : "rotate(-35deg)"
            })
          }, null, 4)
        ]),
        d("input", {
          class: "tw_dropdown_input",
          readonly: "",
          type: "text",
          value: e.modelValue
        }, null, 8, le)
      ], 4),
      o.value ? (n(), i("div", {
        key: 0,
        ref_key: "twVariants",
        ref: t,
        class: "tw_dropdown-variants",
        style: p({ width: _.width ?? "170px" })
      }, [
        F(H, { name: "tr_dropdown" }, {
          default: T(() => [
            d("div", se, [
              (n(!0), i(C, null, x(e.variants, (g) => (n(), i("span", { key: g }, [
                g !== _.modelValue ? (n(), i("span", {
                  key: 0,
                  class: "tw_variant",
                  onClick: (B) => y(g)
                }, h(g), 9, de)) : m("", !0)
              ]))), 128))
            ])
          ]),
          _: 1
        })
      ], 4)) : m("", !0)
    ], 4));
  }
}), ue = { class: "tw_dropdown_multi-icon" }, _e = ["value"], ce = { class: "tw_dropdown-variants" }, pe = ["onClick"], fe = {
  key: 0,
  class: "variant_span"
}, ye = {
  key: 1,
  class: "variant_span"
}, be = {
  key: 2,
  class: "tw_multi_dropdown-icon"
}, we = /* @__PURE__ */ d("span", { class: "tw_multi_dropdown-icon-left" }, null, -1), me = /* @__PURE__ */ d("span", { class: "tw_multi_dropdown-icon-right" }, null, -1), he = [
  we,
  me
], ge = {
  key: 3,
  class: "sub_variants"
}, ve = ["onClick"], ke = {
  key: 0,
  class: "variant_span"
}, Ce = {
  key: 1,
  class: "variant_span"
}, xe = {
  key: 2,
  class: "tw_multi_dropdown-icon"
}, Pe = /* @__PURE__ */ d("span", { class: "tw_multi_dropdown-icon-left" }, null, -1), ze = /* @__PURE__ */ d("span", { class: "tw_multi_dropdown-icon-right" }, null, -1), Ve = [
  Pe,
  ze
], Se = {
  key: 0,
  class: "sub_variants"
}, Be = ["onClick"], $e = { class: "variant_span" }, qe = /* @__PURE__ */ S({
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
  setup(a, { emit: c }) {
    const t = a, e = c, u = z(!1), o = z(), y = z();
    let _ = M([]);
    function V(r) {
      o.value = r, _ = [], !(Object.values(r)[1] instanceof Array) && (typeof r == "string" || typeof r == "number") && (e("update:modelValue", r), u.value = !1, o.value = {}, y.value = {});
    }
    function g(r) {
      y.value = r, _ = Object.values(y.value)[1], (typeof r == "string" || typeof r == "number") && (e("update:modelValue", r), u.value = !1, o.value = {}, y.value = {}, _ = []);
    }
    function B(r) {
      u.value = !1, o.value = {}, e("update:modelValue", r), o.value = {}, y.value = {}, _ = [];
    }
    function q() {
      u.value = !u.value, o.value = {}, y.value = {}, _ = [];
    }
    return $(() => {
      t.hoverColor && document.body.style.setProperty("--tw_dropdown_multi_hoverColor", t.hoverColor), t.bgc && document.body.style.setProperty("--tw_dropdown_multi_bgc", t.bgc), t.textCenter && document.body.style.setProperty("--tw_dropdown_multi_text_align", "center"), t.fontColor && document.body.style.setProperty("--tw_dropdown_multi_font_color", t.fontColor), t.fontSize && document.body.style.setProperty("--tw_dropdown_multi_font_size", t.fontSize), t.itemHeight && document.body.style.setProperty("--tw_dropdown_multi_item_height", t.itemHeight), t.border && document.body.style.setProperty("--tw_dropdown_multi_border", t.border), t.arrowColor && document.body.style.setProperty("--tw_dropdown_multi_arrow_color", t.arrowColor), t.largeArrow && document.body.style.setProperty("--tw_dropdown_multi_arrow_width", "2px");
    }), (r, R) => (n(), i("div", {
      class: "tw_multi_dropdown",
      style: p({
        width: r.width ?? "170px"
      })
    }, [
      d("div", {
        style: p({
          borderBottom: u.value ? "" : r.border ? r.border : "1px solid black",
          borderTop: r.border ? r.border : "1px solid black",
          borderLeft: r.border ? r.border : "1px solid black",
          borderRight: r.border ? r.border : "1px solid black"
        }),
        class: "tw_multi_dropdown-base",
        onClick: q
      }, [
        d("div", ue, [
          d("div", {
            class: "tw_dropdown_multi-icon-left",
            style: p({
              transform: u.value ? "rotate(-35deg)" : "rotate(35deg)",
              borderWidth: r.largeArrow ? "2px" : "1px",
              borderColor: r.arrowColor ?? "rgba(0,0,0,.2)",
              backgroundColor: r.arrowColor ?? "rgba(0,0,0,.2)"
            })
          }, null, 4),
          d("div", {
            class: "tw_dropdown_multi-icon-right",
            style: p({
              transform: u.value ? "rotate(35deg)" : "rotate(-35deg)",
              borderWidth: r.largeArrow ? "2px" : "1px",
              borderColor: r.arrowColor ?? "rgba(0,0,0,.2)",
              backgroundColor: r.arrowColor ?? "rgba(0,0,0,.2)"
            })
          }, null, 4)
        ]),
        d("input", {
          class: "tw_multi_dropdown_input",
          readonly: "",
          type: "text",
          value: t.modelValue
        }, null, 8, _e)
      ], 4),
      d("div", ce, [
        F(H, { name: "tr_multi_dropdown" }, {
          default: T(() => [
            u.value ? (n(), i("div", {
              key: 0,
              class: "tw_multi_dropdown-variants-item",
              style: p({
                borderLeft: r.border ? r.border : "1px solid black",
                borderRight: r.border ? r.border : "1px solid black",
                borderBottom: r.border ? r.border : "1px solid black"
              })
            }, [
              (n(!0), i(C, null, x(t.variants, (f, s) => (n(), i("div", { key: s }, [
                d("div", {
                  class: v(["tw_multi_variant", { tw_multi_dropdown_selected: o.value === f }]),
                  onClick: (l) => V(f)
                }, [
                  typeof f == "string" || typeof f == "number" ? (n(), i("span", fe, h(f), 1)) : (n(), i("span", ye, h(Object.values(f)[0]), 1)),
                  typeof f != "string" && typeof f != "number" ? (n(), i("span", be, he)) : m("", !0),
                  o.value && Object.values(o.value)[0] === Object.values(f)[0] && Object.values(f)[1] instanceof Array ? (n(), i("div", ge, [
                    (n(!0), i(C, null, x(Object.values(f)[1], (l) => (n(), i("div", {
                      class: v(["tw_multi_variant", { tw_multi_dropdown_selected: y.value === l }]),
                      onClick: (b) => g(l)
                    }, [
                      typeof l == "string" || typeof l == "number" ? (n(), i("span", ke, h(l), 1)) : (n(), i("span", Ce, h(Object.values(l)[0]), 1)),
                      typeof l != "string" && typeof l != "number" ? (n(), i("span", xe, Ve)) : m("", !0)
                    ], 10, ve))), 256)),
                    j(_).length ? (n(), i("div", Se, [
                      (n(!0), i(C, null, x(j(_), (l) => (n(), i("div", {
                        class: "tw_multi_variant",
                        key: l,
                        onClick: (b) => B(l)
                      }, [
                        d("span", $e, h(l), 1)
                      ], 8, Be))), 128))
                    ])) : m("", !0)
                  ])) : m("", !0)
                ], 10, pe)
              ]))), 128))
            ], 4)) : m("", !0)
          ]),
          _: 1
        })
      ])
    ], 4));
  }
}), Oe = {
  install: (a) => {
    a.component("tw-button", U), a.component("tw-table-base", E), a.component("tw-input", ne), a.component("tw-dropdown", ae), a.component("tw-multi-dropdown", qe);
  }
};
export {
  U as TwButton,
  ae as TwDropdown,
  ne as TwInput,
  E as TwTableBase,
  Oe as default
};
