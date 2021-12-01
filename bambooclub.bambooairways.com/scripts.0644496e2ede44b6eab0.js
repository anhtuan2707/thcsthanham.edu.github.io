! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e((t = t || self).bootstrap = {}, t.jQuery, t.Popper)
}(this, (function(t, e, n) {
    "use strict";

    function i(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    function o(t, e, n) {
        return e && i(t.prototype, e), n && i(t, n), t
    }

    function r(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(t);
            e && (i = i.filter((function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }))), n.push.apply(n, i)
        }
        return n
    }

    function s(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2 ? r(Object(n), !0).forEach((function(e) {
                var i, o, r;
                r = n[o = e], o in (i = t) ? Object.defineProperty(i, o, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : i[o] = r
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : r(Object(n)).forEach((function(e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e))
            }))
        }
        return t
    }
    e = e && e.hasOwnProperty("default") ? e.default : e, n = n && n.hasOwnProperty("default") ? n.default : n;
    var a = "transitionend",
        l = {
            TRANSITION_END: "bsTransitionEnd",
            getUID: function(t) {
                for (; t += ~~(1e6 * Math.random()), document.getElementById(t););
                return t
            },
            getSelectorFromElement: function(t) {
                var e = t.getAttribute("data-target");
                if (!e || "#" === e) {
                    var n = t.getAttribute("href");
                    e = n && "#" !== n ? n.trim() : ""
                }
                try {
                    return document.querySelector(e) ? e : null
                } catch (t) {
                    return null
                }
            },
            getTransitionDurationFromElement: function(t) {
                if (!t) return 0;
                var n = e(t).css("transition-duration"),
                    i = e(t).css("transition-delay"),
                    o = parseFloat(n),
                    r = parseFloat(i);
                return o || r ? (n = n.split(",")[0], i = i.split(",")[0], 1e3 * (parseFloat(n) + parseFloat(i))) : 0
            },
            reflow: function(t) {
                return t.offsetHeight
            },
            triggerTransitionEnd: function(t) {
                e(t).trigger(a)
            },
            supportsTransitionEnd: function() {
                return Boolean(a)
            },
            isElement: function(t) {
                return (t[0] || t).nodeType
            },
            typeCheckConfig: function(t, e, n) {
                for (var i in n)
                    if (Object.prototype.hasOwnProperty.call(n, i)) {
                        var o = n[i],
                            r = e[i],
                            s = r && l.isElement(r) ? "element" : {}.toString.call(r).match(/\s([a-z]+)/i)[1].toLowerCase();
                        if (!new RegExp(o).test(s)) throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + s + '" but expected type "' + o + '".')
                    }
            },
            findShadowRoot: function(t) {
                if (!document.documentElement.attachShadow) return null;
                if ("function" != typeof t.getRootNode) return t instanceof ShadowRoot ? t : t.parentNode ? l.findShadowRoot(t.parentNode) : null;
                var e = t.getRootNode();
                return e instanceof ShadowRoot ? e : null
            },
            jQueryDetection: function() {
                if (void 0 === e) throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
                var t = e.fn.jquery.split(" ")[0].split(".");
                if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || 4 <= t[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
            }
        };
    l.jQueryDetection(), e.fn.emulateTransitionEnd = function(t) {
        var n = this,
            i = !1;
        return e(this).one(l.TRANSITION_END, (function() {
            i = !0
        })), setTimeout((function() {
            i || l.triggerTransitionEnd(n)
        }), t), this
    }, e.event.special[l.TRANSITION_END] = {
        bindType: a,
        delegateType: a,
        handle: function(t) {
            if (e(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
        }
    };
    var c = "alert",
        h = "bs.alert",
        u = "." + h,
        f = e.fn[c],
        d = {
            CLOSE: "close" + u,
            CLOSED: "closed" + u,
            CLICK_DATA_API: "click" + u + ".data-api"
        },
        g = function() {
            function t(t) {
                this._element = t
            }
            var n = t.prototype;
            return n.close = function(t) {
                var e = this._element;
                t && (e = this._getRootElement(t)), this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
            }, n.dispose = function() {
                e.removeData(this._element, h), this._element = null
            }, n._getRootElement = function(t) {
                var n = l.getSelectorFromElement(t),
                    i = !1;
                return n && (i = document.querySelector(n)), i || e(t).closest(".alert")[0]
            }, n._triggerCloseEvent = function(t) {
                var n = e.Event(d.CLOSE);
                return e(t).trigger(n), n
            }, n._removeElement = function(t) {
                var n = this;
                if (e(t).removeClass("show"), e(t).hasClass("fade")) {
                    var i = l.getTransitionDurationFromElement(t);
                    e(t).one(l.TRANSITION_END, (function(e) {
                        return n._destroyElement(t, e)
                    })).emulateTransitionEnd(i)
                } else this._destroyElement(t)
            }, n._destroyElement = function(t) {
                e(t).detach().trigger(d.CLOSED).remove()
            }, t._jQueryInterface = function(n) {
                return this.each((function() {
                    var i = e(this),
                        o = i.data(h);
                    o || (o = new t(this), i.data(h, o)), "close" === n && o[n](this)
                }))
            }, t._handleDismiss = function(t) {
                return function(e) {
                    e && e.preventDefault(), t.close(this)
                }
            }, o(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.4.1"
                }
            }]), t
        }();
    e(document).on(d.CLICK_DATA_API, '[data-dismiss="alert"]', g._handleDismiss(new g)), e.fn[c] = g._jQueryInterface, e.fn[c].Constructor = g, e.fn[c].noConflict = function() {
        return e.fn[c] = f, g._jQueryInterface
    };
    var _ = "button",
        m = "bs.button",
        p = "." + m,
        v = ".data-api",
        E = e.fn[_],
        y = "active",
        C = '[data-toggle^="button"]',
        T = 'input:not([type="hidden"])',
        b = ".btn",
        S = {
            CLICK_DATA_API: "click" + p + v,
            FOCUS_BLUR_DATA_API: "focus" + p + v + " blur" + p + v,
            LOAD_DATA_API: "load" + p + v
        },
        D = function() {
            function t(t) {
                this._element = t
            }
            var n = t.prototype;
            return n.toggle = function() {
                var t = !0,
                    n = !0,
                    i = e(this._element).closest('[data-toggle="buttons"]')[0];
                if (i) {
                    var o = this._element.querySelector(T);
                    if (o) {
                        if ("radio" === o.type)
                            if (o.checked && this._element.classList.contains(y)) t = !1;
                            else {
                                var r = i.querySelector(".active");
                                r && e(r).removeClass(y)
                            }
                        else "checkbox" === o.type ? "LABEL" === this._element.tagName && o.checked === this._element.classList.contains(y) && (t = !1) : t = !1;
                        t && (o.checked = !this._element.classList.contains(y), e(o).trigger("change")), o.focus(), n = !1
                    }
                }
                this._element.hasAttribute("disabled") || this._element.classList.contains("disabled") || (n && this._element.setAttribute("aria-pressed", !this._element.classList.contains(y)), t && e(this._element).toggleClass(y))
            }, n.dispose = function() {
                e.removeData(this._element, m), this._element = null
            }, t._jQueryInterface = function(n) {
                return this.each((function() {
                    var i = e(this).data(m);
                    i || (i = new t(this), e(this).data(m, i)), "toggle" === n && i[n]()
                }))
            }, o(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.4.1"
                }
            }]), t
        }();
    e(document).on(S.CLICK_DATA_API, C, (function(t) {
        var n = t.target;
        if (e(n).hasClass("btn") || (n = e(n).closest(b)[0]), !n || n.hasAttribute("disabled") || n.classList.contains("disabled")) t.preventDefault();
        else {
            var i = n.querySelector(T);
            if (i && (i.hasAttribute("disabled") || i.classList.contains("disabled"))) return void t.preventDefault();
            D._jQueryInterface.call(e(n), "toggle")
        }
    })).on(S.FOCUS_BLUR_DATA_API, C, (function(t) {
        var n = e(t.target).closest(b)[0];
        e(n).toggleClass("focus", /^focus(in)?$/.test(t.type))
    })), e(window).on(S.LOAD_DATA_API, (function() {
        for (var t = [].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')), e = 0, n = t.length; e < n; e++) {
            var i = t[e],
                o = i.querySelector(T);
            o.checked || o.hasAttribute("checked") ? i.classList.add(y) : i.classList.remove(y)
        }
        for (var r = 0, s = (t = [].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length; r < s; r++) {
            var a = t[r];
            "true" === a.getAttribute("aria-pressed") ? a.classList.add(y) : a.classList.remove(y)
        }
    })), e.fn[_] = D._jQueryInterface, e.fn[_].Constructor = D, e.fn[_].noConflict = function() {
        return e.fn[_] = E, D._jQueryInterface
    };
    var I = "carousel",
        w = "bs.carousel",
        A = "." + w,
        N = ".data-api",
        O = e.fn[I],
        k = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0
        },
        P = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        },
        L = "next",
        j = "prev",
        H = {
            SLIDE: "slide" + A,
            SLID: "slid" + A,
            KEYDOWN: "keydown" + A,
            MOUSEENTER: "mouseenter" + A,
            MOUSELEAVE: "mouseleave" + A,
            TOUCHSTART: "touchstart" + A,
            TOUCHMOVE: "touchmove" + A,
            TOUCHEND: "touchend" + A,
            POINTERDOWN: "pointerdown" + A,
            POINTERUP: "pointerup" + A,
            DRAG_START: "dragstart" + A,
            LOAD_DATA_API: "load" + A + N,
            CLICK_DATA_API: "click" + A + N
        },
        R = "active",
        x = ".active.carousel-item",
        F = ".carousel-indicators",
        U = {
            TOUCH: "touch",
            PEN: "pen"
        },
        W = function() {
            function t(t, e) {
                this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this.touchStartX = 0, this.touchDeltaX = 0, this._config = this._getConfig(e), this._element = t, this._indicatorsElement = this._element.querySelector(F), this._touchSupported = "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints, this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent), this._addEventListeners()
            }
            var n = t.prototype;
            return n.next = function() {
                this._isSliding || this._slide(L)
            }, n.nextWhenVisible = function() {
                !document.hidden && e(this._element).is(":visible") && "hidden" !== e(this._element).css("visibility") && this.next()
            }, n.prev = function() {
                this._isSliding || this._slide(j)
            }, n.pause = function(t) {
                t || (this._isPaused = !0), this._element.querySelector(".carousel-item-next, .carousel-item-prev") && (l.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
            }, n.cycle = function(t) {
                t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
            }, n.to = function(t) {
                var n = this;
                this._activeElement = this._element.querySelector(x);
                var i = this._getItemIndex(this._activeElement);
                if (!(t > this._items.length - 1 || t < 0))
                    if (this._isSliding) e(this._element).one(H.SLID, (function() {
                        return n.to(t)
                    }));
                    else {
                        if (i === t) return this.pause(), void this.cycle();
                        this._slide(i < t ? L : j, this._items[t])
                    }
            }, n.dispose = function() {
                e(this._element).off(A), e.removeData(this._element, w), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
            }, n._getConfig = function(t) {
                return t = s({}, k, {}, t), l.typeCheckConfig(I, t, P), t
            }, n._handleSwipe = function() {
                var t = Math.abs(this.touchDeltaX);
                if (!(t <= 40)) {
                    var e = t / this.touchDeltaX;
                    (this.touchDeltaX = 0) < e && this.prev(), e < 0 && this.next()
                }
            }, n._addEventListeners = function() {
                var t = this;
                this._config.keyboard && e(this._element).on(H.KEYDOWN, (function(e) {
                    return t._keydown(e)
                })), "hover" === this._config.pause && e(this._element).on(H.MOUSEENTER, (function(e) {
                    return t.pause(e)
                })).on(H.MOUSELEAVE, (function(e) {
                    return t.cycle(e)
                })), this._config.touch && this._addTouchEventListeners()
            }, n._addTouchEventListeners = function() {
                var t = this;
                if (this._touchSupported) {
                    var n = function(e) {
                            t._pointerEvent && U[e.originalEvent.pointerType.toUpperCase()] ? t.touchStartX = e.originalEvent.clientX : t._pointerEvent || (t.touchStartX = e.originalEvent.touches[0].clientX)
                        },
                        i = function(e) {
                            t._pointerEvent && U[e.originalEvent.pointerType.toUpperCase()] && (t.touchDeltaX = e.originalEvent.clientX - t.touchStartX), t._handleSwipe(), "hover" === t._config.pause && (t.pause(), t.touchTimeout && clearTimeout(t.touchTimeout), t.touchTimeout = setTimeout((function(e) {
                                return t.cycle(e)
                            }), 500 + t._config.interval))
                        };
                    e(this._element.querySelectorAll(".carousel-item img")).on(H.DRAG_START, (function(t) {
                        return t.preventDefault()
                    })), this._pointerEvent ? (e(this._element).on(H.POINTERDOWN, (function(t) {
                        return n(t)
                    })), e(this._element).on(H.POINTERUP, (function(t) {
                        return i(t)
                    })), this._element.classList.add("pointer-event")) : (e(this._element).on(H.TOUCHSTART, (function(t) {
                        return n(t)
                    })), e(this._element).on(H.TOUCHMOVE, (function(e) {
                        return function(e) {
                            t.touchDeltaX = e.originalEvent.touches && 1 < e.originalEvent.touches.length ? 0 : e.originalEvent.touches[0].clientX - t.touchStartX
                        }(e)
                    })), e(this._element).on(H.TOUCHEND, (function(t) {
                        return i(t)
                    })))
                }
            }, n._keydown = function(t) {
                if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {
                    case 37:
                        t.preventDefault(), this.prev();
                        break;
                    case 39:
                        t.preventDefault(), this.next()
                }
            }, n._getItemIndex = function(t) {
                return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(".carousel-item")) : [], this._items.indexOf(t)
            }, n._getItemByDirection = function(t, e) {
                var n = t === L,
                    i = t === j,
                    o = this._getItemIndex(e);
                if ((i && 0 === o || n && o === this._items.length - 1) && !this._config.wrap) return e;
                var r = (o + (t === j ? -1 : 1)) % this._items.length;
                return -1 == r ? this._items[this._items.length - 1] : this._items[r]
            }, n._triggerSlideEvent = function(t, n) {
                var i = this._getItemIndex(t),
                    o = this._getItemIndex(this._element.querySelector(x)),
                    r = e.Event(H.SLIDE, {
                        relatedTarget: t,
                        direction: n,
                        from: o,
                        to: i
                    });
                return e(this._element).trigger(r), r
            }, n._setActiveIndicatorElement = function(t) {
                if (this._indicatorsElement) {
                    var n = [].slice.call(this._indicatorsElement.querySelectorAll(".active"));
                    e(n).removeClass(R);
                    var i = this._indicatorsElement.children[this._getItemIndex(t)];
                    i && e(i).addClass(R)
                }
            }, n._slide = function(t, n) {
                var i, o, r, s = this,
                    a = this._element.querySelector(x),
                    c = this._getItemIndex(a),
                    h = n || a && this._getItemByDirection(t, a),
                    u = this._getItemIndex(h),
                    f = Boolean(this._interval);
                if (r = t === L ? (i = "carousel-item-left", o = "carousel-item-next", "left") : (i = "carousel-item-right", o = "carousel-item-prev", "right"), h && e(h).hasClass(R)) this._isSliding = !1;
                else if (!this._triggerSlideEvent(h, r).isDefaultPrevented() && a && h) {
                    this._isSliding = !0, f && this.pause(), this._setActiveIndicatorElement(h);
                    var d = e.Event(H.SLID, {
                        relatedTarget: h,
                        direction: r,
                        from: c,
                        to: u
                    });
                    if (e(this._element).hasClass("slide")) {
                        e(h).addClass(o), l.reflow(h), e(a).addClass(i), e(h).addClass(i);
                        var g = parseInt(h.getAttribute("data-interval"), 10);
                        g ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval, this._config.interval = g) : this._config.interval = this._config.defaultInterval || this._config.interval;
                        var _ = l.getTransitionDurationFromElement(a);
                        e(a).one(l.TRANSITION_END, (function() {
                            e(h).removeClass(i + " " + o).addClass(R), e(a).removeClass(R + " " + o + " " + i), s._isSliding = !1, setTimeout((function() {
                                return e(s._element).trigger(d)
                            }), 0)
                        })).emulateTransitionEnd(_)
                    } else e(a).removeClass(R), e(h).addClass(R), this._isSliding = !1, e(this._element).trigger(d);
                    f && this.cycle()
                }
            }, t._jQueryInterface = function(n) {
                return this.each((function() {
                    var i = e(this).data(w),
                        o = s({}, k, {}, e(this).data());
                    "object" == typeof n && (o = s({}, o, {}, n));
                    var r = "string" == typeof n ? n : o.slide;
                    if (i || (i = new t(this, o), e(this).data(w, i)), "number" == typeof n) i.to(n);
                    else if ("string" == typeof r) {
                        if (void 0 === i[r]) throw new TypeError('No method named "' + r + '"');
                        i[r]()
                    } else o.interval && o.ride && (i.pause(), i.cycle())
                }))
            }, t._dataApiClickHandler = function(n) {
                var i = l.getSelectorFromElement(this);
                if (i) {
                    var o = e(i)[0];
                    if (o && e(o).hasClass("carousel")) {
                        var r = s({}, e(o).data(), {}, e(this).data()),
                            a = this.getAttribute("data-slide-to");
                        a && (r.interval = !1), t._jQueryInterface.call(e(o), r), a && e(o).data(w).to(a), n.preventDefault()
                    }
                }
            }, o(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.4.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return k
                }
            }]), t
        }();
    e(document).on(H.CLICK_DATA_API, "[data-slide], [data-slide-to]", W._dataApiClickHandler), e(window).on(H.LOAD_DATA_API, (function() {
        for (var t = [].slice.call(document.querySelectorAll('[data-ride="carousel"]')), n = 0, i = t.length; n < i; n++) {
            var o = e(t[n]);
            W._jQueryInterface.call(o, o.data())
        }
    })), e.fn[I] = W._jQueryInterface, e.fn[I].Constructor = W, e.fn[I].noConflict = function() {
        return e.fn[I] = O, W._jQueryInterface
    };
    var q = "collapse",
        M = "bs.collapse",
        K = "." + M,
        Q = e.fn[q],
        B = {
            toggle: !0,
            parent: ""
        },
        V = {
            toggle: "boolean",
            parent: "(string|element)"
        },
        Y = {
            SHOW: "show" + K,
            SHOWN: "shown" + K,
            HIDE: "hide" + K,
            HIDDEN: "hidden" + K,
            CLICK_DATA_API: "click" + K + ".data-api"
        },
        z = "show",
        X = "collapse",
        $ = "collapsing",
        G = "collapsed",
        J = '[data-toggle="collapse"]',
        Z = function() {
            function t(t, e) {
                this._isTransitioning = !1, this._element = t, this._config = this._getConfig(e), this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));
                for (var n = [].slice.call(document.querySelectorAll(J)), i = 0, o = n.length; i < o; i++) {
                    var r = n[i],
                        s = l.getSelectorFromElement(r),
                        a = [].slice.call(document.querySelectorAll(s)).filter((function(e) {
                            return e === t
                        }));
                    null !== s && 0 < a.length && (this._selector = s, this._triggerArray.push(r))
                }
                this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
            }
            var n = t.prototype;
            return n.toggle = function() {
                e(this._element).hasClass(z) ? this.hide() : this.show()
            }, n.show = function() {
                var n, i, o = this;
                if (!(this._isTransitioning || e(this._element).hasClass(z) || (this._parent && 0 === (n = [].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter((function(t) {
                        return "string" == typeof o._config.parent ? t.getAttribute("data-parent") === o._config.parent : t.classList.contains(X)
                    }))).length && (n = null), n && (i = e(n).not(this._selector).data(M)) && i._isTransitioning))) {
                    var r = e.Event(Y.SHOW);
                    if (e(this._element).trigger(r), !r.isDefaultPrevented()) {
                        n && (t._jQueryInterface.call(e(n).not(this._selector), "hide"), i || e(n).data(M, null));
                        var s = this._getDimension();
                        e(this._element).removeClass(X).addClass($), this._element.style[s] = 0, this._triggerArray.length && e(this._triggerArray).removeClass(G).attr("aria-expanded", !0), this.setTransitioning(!0);
                        var a = "scroll" + (s[0].toUpperCase() + s.slice(1)),
                            c = l.getTransitionDurationFromElement(this._element);
                        e(this._element).one(l.TRANSITION_END, (function() {
                            e(o._element).removeClass($).addClass(X).addClass(z), o._element.style[s] = "", o.setTransitioning(!1), e(o._element).trigger(Y.SHOWN)
                        })).emulateTransitionEnd(c), this._element.style[s] = this._element[a] + "px"
                    }
                }
            }, n.hide = function() {
                var t = this;
                if (!this._isTransitioning && e(this._element).hasClass(z)) {
                    var n = e.Event(Y.HIDE);
                    if (e(this._element).trigger(n), !n.isDefaultPrevented()) {
                        var i = this._getDimension();
                        this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", l.reflow(this._element), e(this._element).addClass($).removeClass(X).removeClass(z);
                        var o = this._triggerArray.length;
                        if (0 < o)
                            for (var r = 0; r < o; r++) {
                                var s = this._triggerArray[r],
                                    a = l.getSelectorFromElement(s);
                                null !== a && (e([].slice.call(document.querySelectorAll(a))).hasClass(z) || e(s).addClass(G).attr("aria-expanded", !1))
                            }
                        this.setTransitioning(!0), this._element.style[i] = "";
                        var c = l.getTransitionDurationFromElement(this._element);
                        e(this._element).one(l.TRANSITION_END, (function() {
                            t.setTransitioning(!1), e(t._element).removeClass($).addClass(X).trigger(Y.HIDDEN)
                        })).emulateTransitionEnd(c)
                    }
                }
            }, n.setTransitioning = function(t) {
                this._isTransitioning = t
            }, n.dispose = function() {
                e.removeData(this._element, M), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
            }, n._getConfig = function(t) {
                return (t = s({}, B, {}, t)).toggle = Boolean(t.toggle), l.typeCheckConfig(q, t, V), t
            }, n._getDimension = function() {
                return e(this._element).hasClass("width") ? "width" : "height"
            }, n._getParent = function() {
                var n, i = this;
                l.isElement(this._config.parent) ? (n = this._config.parent, void 0 !== this._config.parent.jquery && (n = this._config.parent[0])) : n = document.querySelector(this._config.parent);
                var o = [].slice.call(n.querySelectorAll('[data-toggle="collapse"][data-parent="' + this._config.parent + '"]'));
                return e(o).each((function(e, n) {
                    i._addAriaAndCollapsedClass(t._getTargetFromElement(n), [n])
                })), n
            }, n._addAriaAndCollapsedClass = function(t, n) {
                var i = e(t).hasClass(z);
                n.length && e(n).toggleClass(G, !i).attr("aria-expanded", i)
            }, t._getTargetFromElement = function(t) {
                var e = l.getSelectorFromElement(t);
                return e ? document.querySelector(e) : null
            }, t._jQueryInterface = function(n) {
                return this.each((function() {
                    var i = e(this),
                        o = i.data(M),
                        r = s({}, B, {}, i.data(), {}, "object" == typeof n && n ? n : {});
                    if (!o && r.toggle && /show|hide/.test(n) && (r.toggle = !1), o || (o = new t(this, r), i.data(M, o)), "string" == typeof n) {
                        if (void 0 === o[n]) throw new TypeError('No method named "' + n + '"');
                        o[n]()
                    }
                }))
            }, o(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.4.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return B
                }
            }]), t
        }();
    e(document).on(Y.CLICK_DATA_API, J, (function(t) {
        "A" === t.currentTarget.tagName && t.preventDefault();
        var n = e(this),
            i = l.getSelectorFromElement(this),
            o = [].slice.call(document.querySelectorAll(i));
        e(o).each((function() {
            var t = e(this),
                i = t.data(M) ? "toggle" : n.data();
            Z._jQueryInterface.call(t, i)
        }))
    })), e.fn[q] = Z._jQueryInterface, e.fn[q].Constructor = Z, e.fn[q].noConflict = function() {
        return e.fn[q] = Q, Z._jQueryInterface
    };
    var tt = "dropdown",
        et = "bs.dropdown",
        nt = "." + et,
        it = ".data-api",
        ot = e.fn[tt],
        rt = new RegExp("38|40|27"),
        st = {
            HIDE: "hide" + nt,
            HIDDEN: "hidden" + nt,
            SHOW: "show" + nt,
            SHOWN: "shown" + nt,
            CLICK: "click" + nt,
            CLICK_DATA_API: "click" + nt + it,
            KEYDOWN_DATA_API: "keydown" + nt + it,
            KEYUP_DATA_API: "keyup" + nt + it
        },
        at = "disabled",
        lt = "show",
        ct = "dropdown-menu-right",
        ht = '[data-toggle="dropdown"]',
        ut = ".dropdown-menu",
        ft = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic",
            popperConfig: null
        },
        dt = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string",
            popperConfig: "(null|object)"
        },
        gt = function() {
            function t(t, e) {
                this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners()
            }
            var i = t.prototype;
            return i.toggle = function() {
                if (!this._element.disabled && !e(this._element).hasClass(at)) {
                    var n = e(this._menu).hasClass(lt);
                    t._clearMenus(), n || this.show(!0)
                }
            }, i.show = function(i) {
                if (void 0 === i && (i = !1), !(this._element.disabled || e(this._element).hasClass(at) || e(this._menu).hasClass(lt))) {
                    var o = {
                            relatedTarget: this._element
                        },
                        r = e.Event(st.SHOW, o),
                        s = t._getParentFromElement(this._element);
                    if (e(s).trigger(r), !r.isDefaultPrevented()) {
                        if (!this._inNavbar && i) {
                            if (void 0 === n) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                            var a = this._element;
                            "parent" === this._config.reference ? a = s : l.isElement(this._config.reference) && (a = this._config.reference, void 0 !== this._config.reference.jquery && (a = this._config.reference[0])), "scrollParent" !== this._config.boundary && e(s).addClass("position-static"), this._popper = new n(a, this._menu, this._getPopperConfig())
                        }
                        "ontouchstart" in document.documentElement && 0 === e(s).closest(".navbar-nav").length && e(document.body).children().on("mouseover", null, e.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), e(this._menu).toggleClass(lt), e(s).toggleClass(lt).trigger(e.Event(st.SHOWN, o))
                    }
                }
            }, i.hide = function() {
                if (!this._element.disabled && !e(this._element).hasClass(at) && e(this._menu).hasClass(lt)) {
                    var n = {
                            relatedTarget: this._element
                        },
                        i = e.Event(st.HIDE, n),
                        o = t._getParentFromElement(this._element);
                    e(o).trigger(i), i.isDefaultPrevented() || (this._popper && this._popper.destroy(), e(this._menu).toggleClass(lt), e(o).toggleClass(lt).trigger(e.Event(st.HIDDEN, n)))
                }
            }, i.dispose = function() {
                e.removeData(this._element, et), e(this._element).off(nt), this._element = null, (this._menu = null) !== this._popper && (this._popper.destroy(), this._popper = null)
            }, i.update = function() {
                this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate()
            }, i._addEventListeners = function() {
                var t = this;
                e(this._element).on(st.CLICK, (function(e) {
                    e.preventDefault(), e.stopPropagation(), t.toggle()
                }))
            }, i._getConfig = function(t) {
                return t = s({}, this.constructor.Default, {}, e(this._element).data(), {}, t), l.typeCheckConfig(tt, t, this.constructor.DefaultType), t
            }, i._getMenuElement = function() {
                if (!this._menu) {
                    var e = t._getParentFromElement(this._element);
                    e && (this._menu = e.querySelector(ut))
                }
                return this._menu
            }, i._getPlacement = function() {
                var t = e(this._element.parentNode),
                    n = "bottom-start";
                return t.hasClass("dropup") ? (n = "top-start", e(this._menu).hasClass(ct) && (n = "top-end")) : t.hasClass("dropright") ? n = "right-start" : t.hasClass("dropleft") ? n = "left-start" : e(this._menu).hasClass(ct) && (n = "bottom-end"), n
            }, i._detectNavbar = function() {
                return 0 < e(this._element).closest(".navbar").length
            }, i._getOffset = function() {
                var t = this,
                    e = {};
                return "function" == typeof this._config.offset ? e.fn = function(e) {
                    return e.offsets = s({}, e.offsets, {}, t._config.offset(e.offsets, t._element) || {}), e
                } : e.offset = this._config.offset, e
            }, i._getPopperConfig = function() {
                var t = {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            enabled: this._config.flip
                        },
                        preventOverflow: {
                            boundariesElement: this._config.boundary
                        }
                    }
                };
                return "static" === this._config.display && (t.modifiers.applyStyle = {
                    enabled: !1
                }), s({}, t, {}, this._config.popperConfig)
            }, t._jQueryInterface = function(n) {
                return this.each((function() {
                    var i = e(this).data(et);
                    if (i || (i = new t(this, "object" == typeof n ? n : null), e(this).data(et, i)), "string" == typeof n) {
                        if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
                        i[n]()
                    }
                }))
            }, t._clearMenus = function(n) {
                if (!n || 3 !== n.which && ("keyup" !== n.type || 9 === n.which))
                    for (var i = [].slice.call(document.querySelectorAll(ht)), o = 0, r = i.length; o < r; o++) {
                        var s = t._getParentFromElement(i[o]),
                            a = e(i[o]).data(et),
                            l = {
                                relatedTarget: i[o]
                            };
                        if (n && "click" === n.type && (l.clickEvent = n), a) {
                            var c = a._menu;
                            if (e(s).hasClass(lt) && !(n && ("click" === n.type && /input|textarea/i.test(n.target.tagName) || "keyup" === n.type && 9 === n.which) && e.contains(s, n.target))) {
                                var h = e.Event(st.HIDE, l);
                                e(s).trigger(h), h.isDefaultPrevented() || ("ontouchstart" in document.documentElement && e(document.body).children().off("mouseover", null, e.noop), i[o].setAttribute("aria-expanded", "false"), a._popper && a._popper.destroy(), e(c).removeClass(lt), e(s).removeClass(lt).trigger(e.Event(st.HIDDEN, l)))
                            }
                        }
                    }
            }, t._getParentFromElement = function(t) {
                var e, n = l.getSelectorFromElement(t);
                return n && (e = document.querySelector(n)), e || t.parentNode
            }, t._dataApiKeydownHandler = function(n) {
                if ((/input|textarea/i.test(n.target.tagName) ? !(32 === n.which || 27 !== n.which && (40 !== n.which && 38 !== n.which || e(n.target).closest(ut).length)) : rt.test(n.which)) && (n.preventDefault(), n.stopPropagation(), !this.disabled && !e(this).hasClass(at))) {
                    var i = t._getParentFromElement(this),
                        o = e(i).hasClass(lt);
                    if (o || 27 !== n.which)
                        if (o && (!o || 27 !== n.which && 32 !== n.which)) {
                            var r = [].slice.call(i.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter((function(t) {
                                return e(t).is(":visible")
                            }));
                            if (0 !== r.length) {
                                var s = r.indexOf(n.target);
                                38 === n.which && 0 < s && s--, 40 === n.which && s < r.length - 1 && s++, s < 0 && (s = 0), r[s].focus()
                            }
                        } else {
                            if (27 === n.which) {
                                var a = i.querySelector(ht);
                                e(a).trigger("focus")
                            }
                            e(this).trigger("click")
                        }
                }
            }, o(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.4.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return ft
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return dt
                }
            }]), t
        }();
    e(document).on(st.KEYDOWN_DATA_API, ht, gt._dataApiKeydownHandler).on(st.KEYDOWN_DATA_API, ut, gt._dataApiKeydownHandler).on(st.CLICK_DATA_API + " " + st.KEYUP_DATA_API, gt._clearMenus).on(st.CLICK_DATA_API, ht, (function(t) {
        t.preventDefault(), t.stopPropagation(), gt._jQueryInterface.call(e(this), "toggle")
    })).on(st.CLICK_DATA_API, ".dropdown form", (function(t) {
        t.stopPropagation()
    })), e.fn[tt] = gt._jQueryInterface, e.fn[tt].Constructor = gt, e.fn[tt].noConflict = function() {
        return e.fn[tt] = ot, gt._jQueryInterface
    };
    var _t = "modal",
        mt = "bs.modal",
        pt = "." + mt,
        vt = e.fn[_t],
        Et = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        },
        yt = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        },
        Ct = {
            HIDE: "hide" + pt,
            HIDE_PREVENTED: "hidePrevented" + pt,
            HIDDEN: "hidden" + pt,
            SHOW: "show" + pt,
            SHOWN: "shown" + pt,
            FOCUSIN: "focusin" + pt,
            RESIZE: "resize" + pt,
            CLICK_DISMISS: "click.dismiss" + pt,
            KEYDOWN_DISMISS: "keydown.dismiss" + pt,
            MOUSEUP_DISMISS: "mouseup.dismiss" + pt,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + pt,
            CLICK_DATA_API: "click" + pt + ".data-api"
        },
        Tt = "modal-open",
        bt = "fade",
        St = "show",
        Dt = "modal-static",
        It = ".modal-dialog",
        wt = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        At = ".sticky-top",
        Nt = function() {
            function t(t, e) {
                this._config = this._getConfig(e), this._element = t, this._dialog = t.querySelector(It), this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._isTransitioning = !1, this._scrollbarWidth = 0
            }
            var n = t.prototype;
            return n.toggle = function(t) {
                return this._isShown ? this.hide() : this.show(t)
            }, n.show = function(t) {
                var n = this;
                if (!this._isShown && !this._isTransitioning) {
                    e(this._element).hasClass(bt) && (this._isTransitioning = !0);
                    var i = e.Event(Ct.SHOW, {
                        relatedTarget: t
                    });
                    e(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), this._adjustDialog(), this._setEscapeEvent(), this._setResizeEvent(), e(this._element).on(Ct.CLICK_DISMISS, '[data-dismiss="modal"]', (function(t) {
                        return n.hide(t)
                    })), e(this._dialog).on(Ct.MOUSEDOWN_DISMISS, (function() {
                        e(n._element).one(Ct.MOUSEUP_DISMISS, (function(t) {
                            e(t.target).is(n._element) && (n._ignoreBackdropClick = !0)
                        }))
                    })), this._showBackdrop((function() {
                        return n._showElement(t)
                    })))
                }
            }, n.hide = function(t) {
                var n = this;
                if (t && t.preventDefault(), this._isShown && !this._isTransitioning) {
                    var i = e.Event(Ct.HIDE);
                    if (e(this._element).trigger(i), this._isShown && !i.isDefaultPrevented()) {
                        this._isShown = !1;
                        var o = e(this._element).hasClass(bt);
                        if (o && (this._isTransitioning = !0), this._setEscapeEvent(), this._setResizeEvent(), e(document).off(Ct.FOCUSIN), e(this._element).removeClass(St), e(this._element).off(Ct.CLICK_DISMISS), e(this._dialog).off(Ct.MOUSEDOWN_DISMISS), o) {
                            var r = l.getTransitionDurationFromElement(this._element);
                            e(this._element).one(l.TRANSITION_END, (function(t) {
                                return n._hideModal(t)
                            })).emulateTransitionEnd(r)
                        } else this._hideModal()
                    }
                }
            }, n.dispose = function() {
                [window, this._element, this._dialog].forEach((function(t) {
                    return e(t).off(pt)
                })), e(document).off(Ct.FOCUSIN), e.removeData(this._element, mt), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._isTransitioning = null, this._scrollbarWidth = null
            }, n.handleUpdate = function() {
                this._adjustDialog()
            }, n._getConfig = function(t) {
                return t = s({}, Et, {}, t), l.typeCheckConfig(_t, t, yt), t
            }, n._triggerBackdropTransition = function() {
                var t = this;
                if ("static" === this._config.backdrop) {
                    var n = e.Event(Ct.HIDE_PREVENTED);
                    if (e(this._element).trigger(n), n.defaultPrevented) return;
                    this._element.classList.add(Dt);
                    var i = l.getTransitionDurationFromElement(this._element);
                    e(this._element).one(l.TRANSITION_END, (function() {
                        t._element.classList.remove(Dt)
                    })).emulateTransitionEnd(i), this._element.focus()
                } else this.hide()
            }, n._showElement = function(t) {
                var n = this,
                    i = e(this._element).hasClass(bt),
                    o = this._dialog ? this._dialog.querySelector(".modal-body") : null;

                function r() {
                    n._config.focus && n._element.focus(), n._isTransitioning = !1, e(n._element).trigger(s)
                }
                this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), e(this._dialog).hasClass("modal-dialog-scrollable") && o ? o.scrollTop = 0 : this._element.scrollTop = 0, i && l.reflow(this._element), e(this._element).addClass(St), this._config.focus && this._enforceFocus();
                var s = e.Event(Ct.SHOWN, {
                    relatedTarget: t
                });
                if (i) {
                    var a = l.getTransitionDurationFromElement(this._dialog);
                    e(this._dialog).one(l.TRANSITION_END, r).emulateTransitionEnd(a)
                } else r()
            }, n._enforceFocus = function() {
                var t = this;
                e(document).off(Ct.FOCUSIN).on(Ct.FOCUSIN, (function(n) {
                    document !== n.target && t._element !== n.target && 0 === e(t._element).has(n.target).length && t._element.focus()
                }))
            }, n._setEscapeEvent = function() {
                var t = this;
                this._isShown && this._config.keyboard ? e(this._element).on(Ct.KEYDOWN_DISMISS, (function(e) {
                    27 === e.which && t._triggerBackdropTransition()
                })) : this._isShown || e(this._element).off(Ct.KEYDOWN_DISMISS)
            }, n._setResizeEvent = function() {
                var t = this;
                this._isShown ? e(window).on(Ct.RESIZE, (function(e) {
                    return t.handleUpdate(e)
                })) : e(window).off(Ct.RESIZE)
            }, n._hideModal = function() {
                var t = this;
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._element.removeAttribute("aria-modal"), this._isTransitioning = !1, this._showBackdrop((function() {
                    e(document.body).removeClass(Tt), t._resetAdjustments(), t._resetScrollbar(), e(t._element).trigger(Ct.HIDDEN)
                }))
            }, n._removeBackdrop = function() {
                this._backdrop && (e(this._backdrop).remove(), this._backdrop = null)
            }, n._showBackdrop = function(t) {
                var n = this,
                    i = e(this._element).hasClass(bt) ? bt : "";
                if (this._isShown && this._config.backdrop) {
                    if (this._backdrop = document.createElement("div"), this._backdrop.className = "modal-backdrop", i && this._backdrop.classList.add(i), e(this._backdrop).appendTo(document.body), e(this._element).on(Ct.CLICK_DISMISS, (function(t) {
                            n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : t.target === t.currentTarget && n._triggerBackdropTransition()
                        })), i && l.reflow(this._backdrop), e(this._backdrop).addClass(St), !t) return;
                    if (!i) return void t();
                    var o = l.getTransitionDurationFromElement(this._backdrop);
                    e(this._backdrop).one(l.TRANSITION_END, t).emulateTransitionEnd(o)
                } else if (!this._isShown && this._backdrop) {
                    e(this._backdrop).removeClass(St);
                    var r = function() {
                        n._removeBackdrop(), t && t()
                    };
                    if (e(this._element).hasClass(bt)) {
                        var s = l.getTransitionDurationFromElement(this._backdrop);
                        e(this._backdrop).one(l.TRANSITION_END, r).emulateTransitionEnd(s)
                    } else r()
                } else t && t()
            }, n._adjustDialog = function() {
                var t = this._element.scrollHeight > document.documentElement.clientHeight;
                !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
            }, n._resetAdjustments = function() {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
            }, n._checkScrollbar = function() {
                var t = document.body.getBoundingClientRect();
                this._isBodyOverflowing = t.left + t.right < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
            }, n._setScrollbar = function() {
                var t = this;
                if (this._isBodyOverflowing) {
                    var n = [].slice.call(document.querySelectorAll(wt)),
                        i = [].slice.call(document.querySelectorAll(At));
                    e(n).each((function(n, i) {
                        var o = i.style.paddingRight,
                            r = e(i).css("padding-right");
                        e(i).data("padding-right", o).css("padding-right", parseFloat(r) + t._scrollbarWidth + "px")
                    })), e(i).each((function(n, i) {
                        var o = i.style.marginRight,
                            r = e(i).css("margin-right");
                        e(i).data("margin-right", o).css("margin-right", parseFloat(r) - t._scrollbarWidth + "px")
                    }));
                    var o = document.body.style.paddingRight,
                        r = e(document.body).css("padding-right");
                    e(document.body).data("padding-right", o).css("padding-right", parseFloat(r) + this._scrollbarWidth + "px")
                }
                e(document.body).addClass(Tt)
            }, n._resetScrollbar = function() {
                var t = [].slice.call(document.querySelectorAll(wt));
                e(t).each((function(t, n) {
                    var i = e(n).data("padding-right");
                    e(n).removeData("padding-right"), n.style.paddingRight = i || ""
                }));
                var n = [].slice.call(document.querySelectorAll("" + At));
                e(n).each((function(t, n) {
                    var i = e(n).data("margin-right");
                    void 0 !== i && e(n).css("margin-right", i).removeData("margin-right")
                }));
                var i = e(document.body).data("padding-right");
                e(document.body).removeData("padding-right"), document.body.style.paddingRight = i || ""
            }, n._getScrollbarWidth = function() {
                var t = document.createElement("div");
                t.className = "modal-scrollbar-measure", document.body.appendChild(t);
                var e = t.getBoundingClientRect().width - t.clientWidth;
                return document.body.removeChild(t), e
            }, t._jQueryInterface = function(n, i) {
                return this.each((function() {
                    var o = e(this).data(mt),
                        r = s({}, Et, {}, e(this).data(), {}, "object" == typeof n && n ? n : {});
                    if (o || (o = new t(this, r), e(this).data(mt, o)), "string" == typeof n) {
                        if (void 0 === o[n]) throw new TypeError('No method named "' + n + '"');
                        o[n](i)
                    } else r.show && o.show(i)
                }))
            }, o(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.4.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return Et
                }
            }]), t
        }();
    e(document).on(Ct.CLICK_DATA_API, '[data-toggle="modal"]', (function(t) {
        var n, i = this,
            o = l.getSelectorFromElement(this);
        o && (n = document.querySelector(o));
        var r = e(n).data(mt) ? "toggle" : s({}, e(n).data(), {}, e(this).data());
        "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
        var a = e(n).one(Ct.SHOW, (function(t) {
            t.isDefaultPrevented() || a.one(Ct.HIDDEN, (function() {
                e(i).is(":visible") && i.focus()
            }))
        }));
        Nt._jQueryInterface.call(e(n), r, this)
    })), e.fn[_t] = Nt._jQueryInterface, e.fn[_t].Constructor = Nt, e.fn[_t].noConflict = function() {
        return e.fn[_t] = vt, Nt._jQueryInterface
    };
    var Ot = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
        kt = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
        Pt = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

    function Lt(t, e, n) {
        if (0 === t.length) return t;
        if (n && "function" == typeof n) return n(t);
        for (var i = (new window.DOMParser).parseFromString(t, "text/html"), o = Object.keys(e), r = [].slice.call(i.body.querySelectorAll("*")), s = function(t) {
                var n = r[t],
                    i = n.nodeName.toLowerCase();
                if (-1 === o.indexOf(n.nodeName.toLowerCase())) return n.parentNode.removeChild(n), "continue";
                var s = [].slice.call(n.attributes),
                    a = [].concat(e["*"] || [], e[i] || []);
                s.forEach((function(t) {
                    ! function(t, e) {
                        var n = t.nodeName.toLowerCase();
                        if (-1 !== e.indexOf(n)) return -1 === Ot.indexOf(n) || Boolean(t.nodeValue.match(kt) || t.nodeValue.match(Pt));
                        for (var i = e.filter((function(t) {
                                return t instanceof RegExp
                            })), o = 0, r = i.length; o < r; o++)
                            if (n.match(i[o])) return !0;
                        return !1
                    }(t, a) && n.removeAttribute(t.nodeName)
                }))
            }, a = 0, l = r.length; a < l; a++) s(a);
        return i.body.innerHTML
    }
    var jt = "tooltip",
        Ht = "bs.tooltip",
        Rt = "." + Ht,
        xt = e.fn[jt],
        Ft = "bs-tooltip",
        Ut = new RegExp("(^|\\s)" + Ft + "\\S+", "g"),
        Wt = ["sanitize", "whiteList", "sanitizeFn"],
        qt = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object",
            popperConfig: "(null|object)"
        },
        Mt = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: "right",
            BOTTOM: "bottom",
            LEFT: "left"
        },
        Kt = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            sanitize: !0,
            sanitizeFn: null,
            whiteList: {
                "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
                a: ["target", "href", "title", "rel"],
                area: [],
                b: [],
                br: [],
                col: [],
                code: [],
                div: [],
                em: [],
                hr: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                i: [],
                img: ["src", "alt", "title", "width", "height"],
                li: [],
                ol: [],
                p: [],
                pre: [],
                s: [],
                small: [],
                span: [],
                sub: [],
                sup: [],
                strong: [],
                u: [],
                ul: []
            },
            popperConfig: null
        },
        Qt = "show",
        Bt = {
            HIDE: "hide" + Rt,
            HIDDEN: "hidden" + Rt,
            SHOW: "show" + Rt,
            SHOWN: "shown" + Rt,
            INSERTED: "inserted" + Rt,
            CLICK: "click" + Rt,
            FOCUSIN: "focusin" + Rt,
            FOCUSOUT: "focusout" + Rt,
            MOUSEENTER: "mouseenter" + Rt,
            MOUSELEAVE: "mouseleave" + Rt
        },
        Vt = "fade",
        Yt = "show",
        zt = "hover",
        Xt = "focus",
        $t = function() {
            function t(t, e) {
                if (void 0 === n) throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
                this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners()
            }
            var i = t.prototype;
            return i.enable = function() {
                this._isEnabled = !0
            }, i.disable = function() {
                this._isEnabled = !1
            }, i.toggleEnabled = function() {
                this._isEnabled = !this._isEnabled
            }, i.toggle = function(t) {
                if (this._isEnabled)
                    if (t) {
                        var n = this.constructor.DATA_KEY,
                            i = e(t.currentTarget).data(n);
                        i || (i = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i)
                    } else {
                        if (e(this.getTipElement()).hasClass(Yt)) return void this._leave(null, this);
                        this._enter(null, this)
                    }
            }, i.dispose = function() {
                clearTimeout(this._timeout), e.removeData(this.element, this.constructor.DATA_KEY), e(this.element).off(this.constructor.EVENT_KEY), e(this.element).closest(".modal").off("hide.bs.modal", this._hideModalHandler), this.tip && e(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null
            }, i.show = function() {
                var t = this;
                if ("none" === e(this.element).css("display")) throw new Error("Please use show on visible elements");
                var i = e.Event(this.constructor.Event.SHOW);
                if (this.isWithContent() && this._isEnabled) {
                    e(this.element).trigger(i);
                    var o = l.findShadowRoot(this.element),
                        r = e.contains(null !== o ? o : this.element.ownerDocument.documentElement, this.element);
                    if (i.isDefaultPrevented() || !r) return;
                    var s = this.getTipElement(),
                        a = l.getUID(this.constructor.NAME);
                    s.setAttribute("id", a), this.element.setAttribute("aria-describedby", a), this.setContent(), this.config.animation && e(s).addClass(Vt);
                    var c = "function" == typeof this.config.placement ? this.config.placement.call(this, s, this.element) : this.config.placement,
                        h = this._getAttachment(c);
                    this.addAttachmentClass(h);
                    var u = this._getContainer();
                    e(s).data(this.constructor.DATA_KEY, this), e.contains(this.element.ownerDocument.documentElement, this.tip) || e(s).appendTo(u), e(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new n(this.element, s, this._getPopperConfig(h)), e(s).addClass(Yt), "ontouchstart" in document.documentElement && e(document.body).children().on("mouseover", null, e.noop);
                    var f = function() {
                        t.config.animation && t._fixTransition();
                        var n = t._hoverState;
                        t._hoverState = null, e(t.element).trigger(t.constructor.Event.SHOWN), "out" === n && t._leave(null, t)
                    };
                    if (e(this.tip).hasClass(Vt)) {
                        var d = l.getTransitionDurationFromElement(this.tip);
                        e(this.tip).one(l.TRANSITION_END, f).emulateTransitionEnd(d)
                    } else f()
                }
            }, i.hide = function(t) {
                function n() {
                    i._hoverState !== Qt && o.parentNode && o.parentNode.removeChild(o), i._cleanTipClass(), i.element.removeAttribute("aria-describedby"), e(i.element).trigger(i.constructor.Event.HIDDEN), null !== i._popper && i._popper.destroy(), t && t()
                }
                var i = this,
                    o = this.getTipElement(),
                    r = e.Event(this.constructor.Event.HIDE);
                if (e(this.element).trigger(r), !r.isDefaultPrevented()) {
                    if (e(o).removeClass(Yt), "ontouchstart" in document.documentElement && e(document.body).children().off("mouseover", null, e.noop), this._activeTrigger.click = !1, this._activeTrigger[Xt] = !1, this._activeTrigger[zt] = !1, e(this.tip).hasClass(Vt)) {
                        var s = l.getTransitionDurationFromElement(o);
                        e(o).one(l.TRANSITION_END, n).emulateTransitionEnd(s)
                    } else n();
                    this._hoverState = ""
                }
            }, i.update = function() {
                null !== this._popper && this._popper.scheduleUpdate()
            }, i.isWithContent = function() {
                return Boolean(this.getTitle())
            }, i.addAttachmentClass = function(t) {
                e(this.getTipElement()).addClass(Ft + "-" + t)
            }, i.getTipElement = function() {
                return this.tip = this.tip || e(this.config.template)[0], this.tip
            }, i.setContent = function() {
                var t = this.getTipElement();
                this.setElementContent(e(t.querySelectorAll(".tooltip-inner")), this.getTitle()), e(t).removeClass(Vt + " " + Yt)
            }, i.setElementContent = function(t, n) {
                "object" != typeof n || !n.nodeType && !n.jquery ? this.config.html ? (this.config.sanitize && (n = Lt(n, this.config.whiteList, this.config.sanitizeFn)), t.html(n)) : t.text(n) : this.config.html ? e(n).parent().is(t) || t.empty().append(n) : t.text(e(n).text())
            }, i.getTitle = function() {
                return this.element.getAttribute("data-original-title") || ("function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title)
            }, i._getPopperConfig = function(t) {
                var e = this;
                return s({}, {
                    placement: t,
                    modifiers: {
                        offset: this._getOffset(),
                        flip: {
                            behavior: this.config.fallbackPlacement
                        },
                        arrow: {
                            element: ".arrow"
                        },
                        preventOverflow: {
                            boundariesElement: this.config.boundary
                        }
                    },
                    onCreate: function(t) {
                        t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                    },
                    onUpdate: function(t) {
                        return e._handlePopperPlacementChange(t)
                    }
                }, {}, this.config.popperConfig)
            }, i._getOffset = function() {
                var t = this,
                    e = {};
                return "function" == typeof this.config.offset ? e.fn = function(e) {
                    return e.offsets = s({}, e.offsets, {}, t.config.offset(e.offsets, t.element) || {}), e
                } : e.offset = this.config.offset, e
            }, i._getContainer = function() {
                return !1 === this.config.container ? document.body : l.isElement(this.config.container) ? e(this.config.container) : e(document).find(this.config.container)
            }, i._getAttachment = function(t) {
                return Mt[t.toUpperCase()]
            }, i._setListeners = function() {
                var t = this;
                this.config.trigger.split(" ").forEach((function(n) {
                    if ("click" === n) e(t.element).on(t.constructor.Event.CLICK, t.config.selector, (function(e) {
                        return t.toggle(e)
                    }));
                    else if ("manual" !== n) {
                        var i = n === zt ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN,
                            o = n === zt ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
                        e(t.element).on(i, t.config.selector, (function(e) {
                            return t._enter(e)
                        })).on(o, t.config.selector, (function(e) {
                            return t._leave(e)
                        }))
                    }
                })), this._hideModalHandler = function() {
                    t.element && t.hide()
                }, e(this.element).closest(".modal").on("hide.bs.modal", this._hideModalHandler), this.config.selector ? this.config = s({}, this.config, {
                    trigger: "manual",
                    selector: ""
                }) : this._fixTitle()
            }, i._fixTitle = function() {
                var t = typeof this.element.getAttribute("data-original-title");
                !this.element.getAttribute("title") && "string" == t || (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
            }, i._enter = function(t, n) {
                var i = this.constructor.DATA_KEY;
                (n = n || e(t.currentTarget).data(i)) || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusin" === t.type ? Xt : zt] = !0), e(n.getTipElement()).hasClass(Yt) || n._hoverState === Qt ? n._hoverState = Qt : (clearTimeout(n._timeout), n._hoverState = Qt, n.config.delay && n.config.delay.show ? n._timeout = setTimeout((function() {
                    n._hoverState === Qt && n.show()
                }), n.config.delay.show) : n.show())
            }, i._leave = function(t, n) {
                var i = this.constructor.DATA_KEY;
                (n = n || e(t.currentTarget).data(i)) || (n = new this.constructor(t.currentTarget, this._getDelegateConfig()), e(t.currentTarget).data(i, n)), t && (n._activeTrigger["focusout" === t.type ? Xt : zt] = !1), n._isWithActiveTrigger() || (clearTimeout(n._timeout), n._hoverState = "out", n.config.delay && n.config.delay.hide ? n._timeout = setTimeout((function() {
                    "out" === n._hoverState && n.hide()
                }), n.config.delay.hide) : n.hide())
            }, i._isWithActiveTrigger = function() {
                for (var t in this._activeTrigger)
                    if (this._activeTrigger[t]) return !0;
                return !1
            }, i._getConfig = function(t) {
                var n = e(this.element).data();
                return Object.keys(n).forEach((function(t) {
                    -1 !== Wt.indexOf(t) && delete n[t]
                })), "number" == typeof(t = s({}, this.constructor.Default, {}, n, {}, "object" == typeof t && t ? t : {})).delay && (t.delay = {
                    show: t.delay,
                    hide: t.delay
                }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), l.typeCheckConfig(jt, t, this.constructor.DefaultType), t.sanitize && (t.template = Lt(t.template, t.whiteList, t.sanitizeFn)), t
            }, i._getDelegateConfig = function() {
                var t = {};
                if (this.config)
                    for (var e in this.config) this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                return t
            }, i._cleanTipClass = function() {
                var t = e(this.getTipElement()),
                    n = t.attr("class").match(Ut);
                null !== n && n.length && t.removeClass(n.join(""))
            }, i._handlePopperPlacementChange = function(t) {
                this.tip = t.instance.popper, this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement))
            }, i._fixTransition = function() {
                var t = this.getTipElement(),
                    n = this.config.animation;
                null === t.getAttribute("x-placement") && (e(t).removeClass(Vt), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n)
            }, t._jQueryInterface = function(n) {
                return this.each((function() {
                    var i = e(this).data(Ht),
                        o = "object" == typeof n && n;
                    if ((i || !/dispose|hide/.test(n)) && (i || (i = new t(this, o), e(this).data(Ht, i)), "string" == typeof n)) {
                        if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
                        i[n]()
                    }
                }))
            }, o(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.4.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return Kt
                }
            }, {
                key: "NAME",
                get: function() {
                    return jt
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return Ht
                }
            }, {
                key: "Event",
                get: function() {
                    return Bt
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return Rt
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return qt
                }
            }]), t
        }();
    e.fn[jt] = $t._jQueryInterface, e.fn[jt].Constructor = $t, e.fn[jt].noConflict = function() {
        return e.fn[jt] = xt, $t._jQueryInterface
    };
    var Gt = "popover",
        Jt = "bs.popover",
        Zt = "." + Jt,
        te = e.fn[Gt],
        ee = "bs-popover",
        ne = new RegExp("(^|\\s)" + ee + "\\S+", "g"),
        ie = s({}, $t.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        }),
        oe = s({}, $t.DefaultType, {
            content: "(string|element|function)"
        }),
        re = {
            HIDE: "hide" + Zt,
            HIDDEN: "hidden" + Zt,
            SHOW: "show" + Zt,
            SHOWN: "shown" + Zt,
            INSERTED: "inserted" + Zt,
            CLICK: "click" + Zt,
            FOCUSIN: "focusin" + Zt,
            FOCUSOUT: "focusout" + Zt,
            MOUSEENTER: "mouseenter" + Zt,
            MOUSELEAVE: "mouseleave" + Zt
        },
        se = function(t) {
            function n() {
                return t.apply(this, arguments) || this
            }! function(t, e) {
                t.prototype = Object.create(e.prototype), (t.prototype.constructor = t).__proto__ = e
            }(n, t);
            var i = n.prototype;
            return i.isWithContent = function() {
                return this.getTitle() || this._getContent()
            }, i.addAttachmentClass = function(t) {
                e(this.getTipElement()).addClass(ee + "-" + t)
            }, i.getTipElement = function() {
                return this.tip = this.tip || e(this.config.template)[0], this.tip
            }, i.setContent = function() {
                var t = e(this.getTipElement());
                this.setElementContent(t.find(".popover-header"), this.getTitle());
                var n = this._getContent();
                "function" == typeof n && (n = n.call(this.element)), this.setElementContent(t.find(".popover-body"), n), t.removeClass("fade show")
            }, i._getContent = function() {
                return this.element.getAttribute("data-content") || this.config.content
            }, i._cleanTipClass = function() {
                var t = e(this.getTipElement()),
                    n = t.attr("class").match(ne);
                null !== n && 0 < n.length && t.removeClass(n.join(""))
            }, n._jQueryInterface = function(t) {
                return this.each((function() {
                    var i = e(this).data(Jt),
                        o = "object" == typeof t ? t : null;
                    if ((i || !/dispose|hide/.test(t)) && (i || (i = new n(this, o), e(this).data(Jt, i)), "string" == typeof t)) {
                        if (void 0 === i[t]) throw new TypeError('No method named "' + t + '"');
                        i[t]()
                    }
                }))
            }, o(n, null, [{
                key: "VERSION",
                get: function() {
                    return "4.4.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return ie
                }
            }, {
                key: "NAME",
                get: function() {
                    return Gt
                }
            }, {
                key: "DATA_KEY",
                get: function() {
                    return Jt
                }
            }, {
                key: "Event",
                get: function() {
                    return re
                }
            }, {
                key: "EVENT_KEY",
                get: function() {
                    return Zt
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return oe
                }
            }]), n
        }($t);
    e.fn[Gt] = se._jQueryInterface, e.fn[Gt].Constructor = se, e.fn[Gt].noConflict = function() {
        return e.fn[Gt] = te, se._jQueryInterface
    };
    var ae = "scrollspy",
        le = "bs.scrollspy",
        ce = "." + le,
        he = e.fn[ae],
        ue = {
            offset: 10,
            method: "auto",
            target: ""
        },
        fe = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        },
        de = {
            ACTIVATE: "activate" + ce,
            SCROLL: "scroll" + ce,
            LOAD_DATA_API: "load" + ce + ".data-api"
        },
        ge = "active",
        _e = ".nav, .list-group",
        me = ".nav-link",
        pe = ".list-group-item",
        ve = ".dropdown-item",
        Ee = "position",
        ye = function() {
            function t(t, n) {
                var i = this;
                this._element = t, this._scrollElement = "BODY" === t.tagName ? window : t, this._config = this._getConfig(n), this._selector = this._config.target + " " + me + "," + this._config.target + " " + pe + "," + this._config.target + " " + ve, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, e(this._scrollElement).on(de.SCROLL, (function(t) {
                    return i._process(t)
                })), this.refresh(), this._process()
            }
            var n = t.prototype;
            return n.refresh = function() {
                var t = this,
                    n = "auto" === this._config.method ? this._scrollElement === this._scrollElement.window ? "offset" : Ee : this._config.method,
                    i = n === Ee ? this._getScrollTop() : 0;
                this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), [].slice.call(document.querySelectorAll(this._selector)).map((function(t) {
                    var o, r = l.getSelectorFromElement(t);
                    if (r && (o = document.querySelector(r)), o) {
                        var s = o.getBoundingClientRect();
                        if (s.width || s.height) return [e(o)[n]().top + i, r]
                    }
                    return null
                })).filter((function(t) {
                    return t
                })).sort((function(t, e) {
                    return t[0] - e[0]
                })).forEach((function(e) {
                    t._offsets.push(e[0]), t._targets.push(e[1])
                }))
            }, n.dispose = function() {
                e.removeData(this._element, le), e(this._scrollElement).off(ce), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
            }, n._getConfig = function(t) {
                if ("string" != typeof(t = s({}, ue, {}, "object" == typeof t && t ? t : {})).target) {
                    var n = e(t.target).attr("id");
                    n || (n = l.getUID(ae), e(t.target).attr("id", n)), t.target = "#" + n
                }
                return l.typeCheckConfig(ae, t, fe), t
            }, n._getScrollTop = function() {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
            }, n._getScrollHeight = function() {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }, n._getOffsetHeight = function() {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
            }, n._process = function() {
                var t = this._getScrollTop() + this._config.offset,
                    e = this._getScrollHeight(),
                    n = this._config.offset + e - this._getOffsetHeight();
                if (this._scrollHeight !== e && this.refresh(), n <= t) {
                    var i = this._targets[this._targets.length - 1];
                    this._activeTarget !== i && this._activate(i)
                } else {
                    if (this._activeTarget && t < this._offsets[0] && 0 < this._offsets[0]) return this._activeTarget = null, void this._clear();
                    for (var o = this._offsets.length; o--;) this._activeTarget !== this._targets[o] && t >= this._offsets[o] && (void 0 === this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o])
                }
            }, n._activate = function(t) {
                this._activeTarget = t, this._clear();
                var n = this._selector.split(",").map((function(e) {
                        return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
                    })),
                    i = e([].slice.call(document.querySelectorAll(n.join(","))));
                i.hasClass("dropdown-item") ? (i.closest(".dropdown").find(".dropdown-toggle").addClass(ge), i.addClass(ge)) : (i.addClass(ge), i.parents(_e).prev(me + ", " + pe).addClass(ge), i.parents(_e).prev(".nav-item").children(me).addClass(ge)), e(this._scrollElement).trigger(de.ACTIVATE, {
                    relatedTarget: t
                })
            }, n._clear = function() {
                [].slice.call(document.querySelectorAll(this._selector)).filter((function(t) {
                    return t.classList.contains(ge)
                })).forEach((function(t) {
                    return t.classList.remove(ge)
                }))
            }, t._jQueryInterface = function(n) {
                return this.each((function() {
                    var i = e(this).data(le);
                    if (i || (i = new t(this, "object" == typeof n && n), e(this).data(le, i)), "string" == typeof n) {
                        if (void 0 === i[n]) throw new TypeError('No method named "' + n + '"');
                        i[n]()
                    }
                }))
            }, o(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.4.1"
                }
            }, {
                key: "Default",
                get: function() {
                    return ue
                }
            }]), t
        }();
    e(window).on(de.LOAD_DATA_API, (function() {
        for (var t = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')), n = t.length; n--;) {
            var i = e(t[n]);
            ye._jQueryInterface.call(i, i.data())
        }
    })), e.fn[ae] = ye._jQueryInterface, e.fn[ae].Constructor = ye, e.fn[ae].noConflict = function() {
        return e.fn[ae] = he, ye._jQueryInterface
    };
    var Ce = "bs.tab",
        Te = "." + Ce,
        be = e.fn.tab,
        Se = {
            HIDE: "hide" + Te,
            HIDDEN: "hidden" + Te,
            SHOW: "show" + Te,
            SHOWN: "shown" + Te,
            CLICK_DATA_API: "click" + Te + ".data-api"
        },
        De = "active",
        Ie = ".active",
        we = "> li > .active",
        Ae = function() {
            function t(t) {
                this._element = t
            }
            var n = t.prototype;
            return n.show = function() {
                var t = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && e(this._element).hasClass(De) || e(this._element).hasClass("disabled"))) {
                    var n, i, o = e(this._element).closest(".nav, .list-group")[0],
                        r = l.getSelectorFromElement(this._element);
                    if (o) {
                        var s = "UL" === o.nodeName || "OL" === o.nodeName ? we : Ie;
                        i = (i = e.makeArray(e(o).find(s)))[i.length - 1]
                    }
                    var a = e.Event(Se.HIDE, {
                            relatedTarget: this._element
                        }),
                        c = e.Event(Se.SHOW, {
                            relatedTarget: i
                        });
                    if (i && e(i).trigger(a), e(this._element).trigger(c), !c.isDefaultPrevented() && !a.isDefaultPrevented()) {
                        r && (n = document.querySelector(r)), this._activate(this._element, o);
                        var h = function() {
                            var n = e.Event(Se.HIDDEN, {
                                    relatedTarget: t._element
                                }),
                                o = e.Event(Se.SHOWN, {
                                    relatedTarget: i
                                });
                            e(i).trigger(n), e(t._element).trigger(o)
                        };
                        n ? this._activate(n, n.parentNode, h) : h()
                    }
                }
            }, n.dispose = function() {
                e.removeData(this._element, Ce), this._element = null
            }, n._activate = function(t, n, i) {
                function o() {
                    return r._transitionComplete(t, s, i)
                }
                var r = this,
                    s = (!n || "UL" !== n.nodeName && "OL" !== n.nodeName ? e(n).children(Ie) : e(n).find(we))[0],
                    a = i && s && e(s).hasClass("fade");
                if (s && a) {
                    var c = l.getTransitionDurationFromElement(s);
                    e(s).removeClass("show").one(l.TRANSITION_END, o).emulateTransitionEnd(c)
                } else o()
            }, n._transitionComplete = function(t, n, i) {
                if (n) {
                    e(n).removeClass(De);
                    var o = e(n.parentNode).find("> .dropdown-menu .active")[0];
                    o && e(o).removeClass(De), "tab" === n.getAttribute("role") && n.setAttribute("aria-selected", !1)
                }
                if (e(t).addClass(De), "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0), l.reflow(t), t.classList.contains("fade") && t.classList.add("show"), t.parentNode && e(t.parentNode).hasClass("dropdown-menu")) {
                    var r = e(t).closest(".dropdown")[0];
                    if (r) {
                        var s = [].slice.call(r.querySelectorAll(".dropdown-toggle"));
                        e(s).addClass(De)
                    }
                    t.setAttribute("aria-expanded", !0)
                }
                i && i()
            }, t._jQueryInterface = function(n) {
                return this.each((function() {
                    var i = e(this),
                        o = i.data(Ce);
                    if (o || (o = new t(this), i.data(Ce, o)), "string" == typeof n) {
                        if (void 0 === o[n]) throw new TypeError('No method named "' + n + '"');
                        o[n]()
                    }
                }))
            }, o(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.4.1"
                }
            }]), t
        }();
    e(document).on(Se.CLICK_DATA_API, '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', (function(t) {
        t.preventDefault(), Ae._jQueryInterface.call(e(this), "show")
    })), e.fn.tab = Ae._jQueryInterface, e.fn.tab.Constructor = Ae, e.fn.tab.noConflict = function() {
        return e.fn.tab = be, Ae._jQueryInterface
    };
    var Ne = "toast",
        Oe = "bs.toast",
        ke = "." + Oe,
        Pe = e.fn[Ne],
        Le = {
            CLICK_DISMISS: "click.dismiss" + ke,
            HIDE: "hide" + ke,
            HIDDEN: "hidden" + ke,
            SHOW: "show" + ke,
            SHOWN: "shown" + ke
        },
        je = "hide",
        He = "show",
        Re = "showing",
        xe = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        },
        Fe = {
            animation: !0,
            autohide: !0,
            delay: 500
        },
        Ue = function() {
            function t(t, e) {
                this._element = t, this._config = this._getConfig(e), this._timeout = null, this._setListeners()
            }
            var n = t.prototype;
            return n.show = function() {
                var t = this,
                    n = e.Event(Le.SHOW);
                if (e(this._element).trigger(n), !n.isDefaultPrevented()) {
                    this._config.animation && this._element.classList.add("fade");
                    var i = function() {
                        t._element.classList.remove(Re), t._element.classList.add(He), e(t._element).trigger(Le.SHOWN), t._config.autohide && (t._timeout = setTimeout((function() {
                            t.hide()
                        }), t._config.delay))
                    };
                    if (this._element.classList.remove(je), l.reflow(this._element), this._element.classList.add(Re), this._config.animation) {
                        var o = l.getTransitionDurationFromElement(this._element);
                        e(this._element).one(l.TRANSITION_END, i).emulateTransitionEnd(o)
                    } else i()
                }
            }, n.hide = function() {
                if (this._element.classList.contains(He)) {
                    var t = e.Event(Le.HIDE);
                    e(this._element).trigger(t), t.isDefaultPrevented() || this._close()
                }
            }, n.dispose = function() {
                clearTimeout(this._timeout), this._timeout = null, this._element.classList.contains(He) && this._element.classList.remove(He), e(this._element).off(Le.CLICK_DISMISS), e.removeData(this._element, Oe), this._element = null, this._config = null
            }, n._getConfig = function(t) {
                return t = s({}, Fe, {}, e(this._element).data(), {}, "object" == typeof t && t ? t : {}), l.typeCheckConfig(Ne, t, this.constructor.DefaultType), t
            }, n._setListeners = function() {
                var t = this;
                e(this._element).on(Le.CLICK_DISMISS, '[data-dismiss="toast"]', (function() {
                    return t.hide()
                }))
            }, n._close = function() {
                function t() {
                    n._element.classList.add(je), e(n._element).trigger(Le.HIDDEN)
                }
                var n = this;
                if (this._element.classList.remove(He), this._config.animation) {
                    var i = l.getTransitionDurationFromElement(this._element);
                    e(this._element).one(l.TRANSITION_END, t).emulateTransitionEnd(i)
                } else t()
            }, t._jQueryInterface = function(n) {
                return this.each((function() {
                    var i = e(this),
                        o = i.data(Oe);
                    if (o || (o = new t(this, "object" == typeof n && n), i.data(Oe, o)), "string" == typeof n) {
                        if (void 0 === o[n]) throw new TypeError('No method named "' + n + '"');
                        o[n](this)
                    }
                }))
            }, o(t, null, [{
                key: "VERSION",
                get: function() {
                    return "4.4.1"
                }
            }, {
                key: "DefaultType",
                get: function() {
                    return xe
                }
            }, {
                key: "Default",
                get: function() {
                    return Fe
                }
            }]), t
        }();
    e.fn[Ne] = Ue._jQueryInterface, e.fn[Ne].Constructor = Ue, e.fn[Ne].noConflict = function() {
        return e.fn[Ne] = Pe, Ue._jQueryInterface
    }, t.Alert = g, t.Button = D, t.Carousel = W, t.Collapse = Z, t.Dropdown = gt, t.Modal = Nt, t.Popover = se, t.Scrollspy = ye, t.Tab = Ae, t.Toast = Ue, t.Tooltip = $t, t.Util = l, Object.defineProperty(t, "__esModule", {
        value: !0
    })
}));