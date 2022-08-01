/*!
 * FlagWaver - App
 * @author Solomon Shalom Lijo / https://github.com/solomonshalom
 */
(function () {
    'use strict';

    // Loading Polyfills Only When Needed
    // https://philipwalton.com/articles/loading-polyfills-only-when-needed/
    function main(e) {
      if (e) {
        console.error(e.message);
      } // This magic string is replaced at compile time with an IIFE of the app
      // JS. It is necessary to wrap the IIFE in this function to prevent it from
      // attempting to use ES6 features before the polyfill loader performs
      // its checks.


      
(function (Modernizr) {
'use strict';

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Modernizr__default = /*#__PURE__*/_interopDefaultLegacy(Modernizr);

function createMetadataMethodsForProperty(metadataMap, kind, property, decoratorFinishedRef) {
  return {
    getMetadata: function (key) {
      assertNotFinished(decoratorFinishedRef, "getMetadata"), assertMetadataKey(key);
      var metadataForKey = metadataMap[key];
      if (void 0 !== metadataForKey) if (1 === kind) {
        var pub = metadataForKey.public;
        if (void 0 !== pub) return pub[property];
      } else if (2 === kind) {
        var priv = metadataForKey.private;
        if (void 0 !== priv) return priv.get(property);
      } else if (Object.hasOwnProperty.call(metadataForKey, "constructor")) return metadataForKey.constructor;
    },
    setMetadata: function (key, value) {
      assertNotFinished(decoratorFinishedRef, "setMetadata"), assertMetadataKey(key);
      var metadataForKey = metadataMap[key];

      if (void 0 === metadataForKey && (metadataForKey = metadataMap[key] = {}), 1 === kind) {
        var pub = metadataForKey.public;
        void 0 === pub && (pub = metadataForKey.public = {}), pub[property] = value;
      } else if (2 === kind) {
        var priv = metadataForKey.priv;
        void 0 === priv && (priv = metadataForKey.private = new Map()), priv.set(property, value);
      } else metadataForKey.constructor = value;
    }
  };
}

function convertMetadataMapToFinal(obj, metadataMap) {
  var parentMetadataMap = obj[Symbol.metadata || Symbol.for("Symbol.metadata")],
      metadataKeys = Object.getOwnPropertySymbols(metadataMap);

  if (0 !== metadataKeys.length) {
    for (var i = 0; i < metadataKeys.length; i++) {
      var key = metadataKeys[i],
          metaForKey = metadataMap[key],
          parentMetaForKey = parentMetadataMap ? parentMetadataMap[key] : null,
          pub = metaForKey.public,
          parentPub = parentMetaForKey ? parentMetaForKey.public : null;
      pub && parentPub && Object.setPrototypeOf(pub, parentPub);
      var priv = metaForKey.private;

      if (priv) {
        var privArr = Array.from(priv.values()),
            parentPriv = parentMetaForKey ? parentMetaForKey.private : null;
        parentPriv && (privArr = privArr.concat(parentPriv)), metaForKey.private = privArr;
      }

      parentMetaForKey && Object.setPrototypeOf(metaForKey, parentMetaForKey);
    }

    parentMetadataMap && Object.setPrototypeOf(metadataMap, parentMetadataMap), obj[Symbol.metadata || Symbol.for("Symbol.metadata")] = metadataMap;
  }
}

function createAddInitializerMethod(initializers, decoratorFinishedRef) {
  return function (initializer) {
    assertNotFinished(decoratorFinishedRef, "addInitializer"), assertCallable(initializer, "An initializer"), initializers.push(initializer);
  };
}

function memberDec(dec, name, desc, metadataMap, initializers, kind, isStatic, isPrivate, value) {
  var kindStr;

  switch (kind) {
    case 1:
      kindStr = "accessor";
      break;

    case 2:
      kindStr = "method";
      break;

    case 3:
      kindStr = "getter";
      break;

    case 4:
      kindStr = "setter";
      break;

    default:
      kindStr = "field";
  }

  var metadataKind,
      metadataName,
      ctx = {
    kind: kindStr,
    name: isPrivate ? "#" + name : name,
    isStatic: isStatic,
    isPrivate: isPrivate
  },
      decoratorFinishedRef = {
    v: !1
  };

  if (0 !== kind && (ctx.addInitializer = createAddInitializerMethod(initializers, decoratorFinishedRef)), isPrivate) {
    metadataKind = 2, metadataName = Symbol(name);
    var access = {};
    0 === kind ? (access.get = desc.get, access.set = desc.set) : 2 === kind ? access.get = function () {
      return desc.value;
    } : (1 !== kind && 3 !== kind || (access.get = function () {
      return desc.get.call(this);
    }), 1 !== kind && 4 !== kind || (access.set = function (v) {
      desc.set.call(this, v);
    })), ctx.access = access;
  } else metadataKind = 1, metadataName = name;

  try {
    return dec(value, Object.assign(ctx, createMetadataMethodsForProperty(metadataMap, metadataKind, metadataName, decoratorFinishedRef)));
  } finally {
    decoratorFinishedRef.v = !0;
  }
}

function assertNotFinished(decoratorFinishedRef, fnName) {
  if (decoratorFinishedRef.v) throw new Error("attempted to call " + fnName + " after decoration was finished");
}

function assertMetadataKey(key) {
  if ("symbol" != typeof key) throw new TypeError("Metadata keys must be symbols, received: " + key);
}

function assertCallable(fn, hint) {
  if ("function" != typeof fn) throw new TypeError(hint + " must be a function");
}

function assertValidReturnValue(kind, value) {
  var type = typeof value;

  if (1 === kind) {
    if ("object" !== type || null === value) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");
    void 0 !== value.get && assertCallable(value.get, "accessor.get"), void 0 !== value.set && assertCallable(value.set, "accessor.set"), void 0 !== value.init && assertCallable(value.init, "accessor.init"), void 0 !== value.initializer && assertCallable(value.initializer, "accessor.initializer");
  } else if ("function" !== type) {
    var hint;
    throw hint = 0 === kind ? "field" : 10 === kind ? "class" : "method", new TypeError(hint + " decorators must return a function or void 0");
  }
}

function getInit(desc) {
  var initializer;
  return null == (initializer = desc.init) && (initializer = desc.initializer) && "undefined" != typeof console && console.warn(".initializer has been renamed to .init as of March 2022"), initializer;
}

function applyMemberDec(ret, base, decInfo, name, kind, isStatic, isPrivate, metadataMap, initializers) {
  var desc,
      initializer,
      value,
      newValue,
      get,
      set,
      decs = decInfo[0];
  if (isPrivate ? desc = 0 === kind || 1 === kind ? {
    get: decInfo[3],
    set: decInfo[4]
  } : 3 === kind ? {
    get: decInfo[3]
  } : 4 === kind ? {
    set: decInfo[3]
  } : {
    value: decInfo[3]
  } : 0 !== kind && (desc = Object.getOwnPropertyDescriptor(base, name)), 1 === kind ? value = {
    get: desc.get,
    set: desc.set
  } : 2 === kind ? value = desc.value : 3 === kind ? value = desc.get : 4 === kind && (value = desc.set), "function" == typeof decs) void 0 !== (newValue = memberDec(decs, name, desc, metadataMap, initializers, kind, isStatic, isPrivate, value)) && (assertValidReturnValue(kind, newValue), 0 === kind ? initializer = newValue : 1 === kind ? (initializer = getInit(newValue), get = newValue.get || value.get, set = newValue.set || value.set, value = {
    get: get,
    set: set
  }) : value = newValue);else for (var i = decs.length - 1; i >= 0; i--) {
    var newInit;
    if (void 0 !== (newValue = memberDec(decs[i], name, desc, metadataMap, initializers, kind, isStatic, isPrivate, value))) assertValidReturnValue(kind, newValue), 0 === kind ? newInit = newValue : 1 === kind ? (newInit = getInit(newValue), get = newValue.get || value.get, set = newValue.set || value.set, value = {
      get: get,
      set: set
    }) : value = newValue, void 0 !== newInit && (void 0 === initializer ? initializer = newInit : "function" == typeof initializer ? initializer = [initializer, newInit] : initializer.push(newInit));
  }

  if (0 === kind || 1 === kind) {
    if (void 0 === initializer) initializer = function (instance, init) {
      return init;
    };else if ("function" != typeof initializer) {
      var ownInitializers = initializer;

      initializer = function (instance, init) {
        for (var value = init, i = 0; i < ownInitializers.length; i++) value = ownInitializers[i].call(instance, value);

        return value;
      };
    } else {
      var originalInitializer = initializer;

      initializer = function (instance, init) {
        return originalInitializer.call(instance, init);
      };
    }
    ret.push(initializer);
  }

  0 !== kind && (1 === kind ? (desc.get = value.get, desc.set = value.set) : 2 === kind ? desc.value = value : 3 === kind ? desc.get = value : 4 === kind && (desc.set = value), isPrivate ? 1 === kind ? (ret.push(function (instance, args) {
    return value.get.call(instance, args);
  }), ret.push(function (instance, args) {
    return value.set.call(instance, args);
  })) : 2 === kind ? ret.push(value) : ret.push(function (instance, args) {
    return value.call(instance, args);
  }) : Object.defineProperty(base, name, desc));
}

function applyMemberDecs(ret, Class, protoMetadataMap, staticMetadataMap, decInfos) {
  for (var protoInitializers, staticInitializers, existingProtoNonFields = new Map(), existingStaticNonFields = new Map(), i = 0; i < decInfos.length; i++) {
    var decInfo = decInfos[i];

    if (Array.isArray(decInfo)) {
      var base,
          metadataMap,
          initializers,
          kind = decInfo[1],
          name = decInfo[2],
          isPrivate = decInfo.length > 3,
          isStatic = kind >= 5;

      if (isStatic ? (base = Class, metadataMap = staticMetadataMap, 0 !== (kind -= 5) && (initializers = staticInitializers = staticInitializers || [])) : (base = Class.prototype, metadataMap = protoMetadataMap, 0 !== kind && (initializers = protoInitializers = protoInitializers || [])), 0 !== kind && !isPrivate) {
        var existingNonFields = isStatic ? existingStaticNonFields : existingProtoNonFields,
            existingKind = existingNonFields.get(name) || 0;
        if (!0 === existingKind || 3 === existingKind && 4 !== kind || 4 === existingKind && 3 !== kind) throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + name);
        !existingKind && kind > 2 ? existingNonFields.set(name, kind) : existingNonFields.set(name, !0);
      }

      applyMemberDec(ret, base, decInfo, name, kind, isStatic, isPrivate, metadataMap, initializers);
    }
  }

  pushInitializers(ret, protoInitializers), pushInitializers(ret, staticInitializers);
}

function pushInitializers(ret, initializers) {
  initializers && ret.push(function (instance) {
    for (var i = 0; i < initializers.length; i++) initializers[i].call(instance);

    return instance;
  });
}

function applyClassDecs(ret, targetClass, metadataMap, classDecs) {
  if (classDecs.length > 0) {
    for (var initializers = [], newClass = targetClass, name = targetClass.name, i = classDecs.length - 1; i >= 0; i--) {
      var decoratorFinishedRef = {
        v: !1
      };

      try {
        var ctx = Object.assign({
          kind: "class",
          name: name,
          addInitializer: createAddInitializerMethod(initializers, decoratorFinishedRef)
        }, createMetadataMethodsForProperty(metadataMap, 0, name, decoratorFinishedRef)),
            nextNewClass = classDecs[i](newClass, ctx);
      } finally {
        decoratorFinishedRef.v = !0;
      }

      void 0 !== nextNewClass && (assertValidReturnValue(10, nextNewClass), newClass = nextNewClass);
    }

    ret.push(newClass, function () {
      for (var i = 0; i < initializers.length; i++) initializers[i].call(newClass);
    });
  }
}

function _applyDecs(targetClass, memberDecs, classDecs) {
  var ret = [],
      staticMetadataMap = {},
      protoMetadataMap = {};
  return applyMemberDecs(ret, targetClass, protoMetadataMap, staticMetadataMap, memberDecs), convertMetadataMapToFinal(targetClass.prototype, protoMetadataMap), applyClassDecs(ret, targetClass, staticMetadataMap, classDecs), convertMetadataMapToFinal(targetClass, staticMetadataMap), ret;
}

function _asyncIterator(iterable) {
  var method,
      async,
      sync,
      retry = 2;

  for ("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;) {
    if (async && null != (method = iterable[async])) return method.call(iterable);
    if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable));
    async = "@@asyncIterator", sync = "@@iterator";
  }

  throw new TypeError("Object is not async iterable");
}

function AsyncFromSyncIterator(s) {
  function AsyncFromSyncIteratorContinuation(r) {
    if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object."));
    var done = r.done;
    return Promise.resolve(r.value).then(function (value) {
      return {
        value: value,
        done: done
      };
    });
  }

  return AsyncFromSyncIterator = function (s) {
    this.s = s, this.n = s.next;
  }, AsyncFromSyncIterator.prototype = {
    s: null,
    n: null,
    next: function () {
      return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments));
    },
    return: function (value) {
      var ret = this.s.return;
      return void 0 === ret ? Promise.resolve({
        value: value,
        done: !0
      }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments));
    },
    throw: function (value) {
      var thr = this.s.return;
      return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments));
    }
  }, new AsyncFromSyncIterator(s);
}

var REACT_ELEMENT_TYPE;

function _jsx(type, props, key, children) {
  REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);
  var defaultProps = type && type.defaultProps,
      childrenLength = arguments.length - 3;
  if (props || 0 === childrenLength || (props = {
    children: void 0
  }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {
    for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];

    props.children = childArray;
  }
  if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: void 0 === key ? null : "" + key,
    ref: null,
    props: props,
    _owner: null
  };
}

function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) {
      _defineProperty$3(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _regeneratorRuntime() {
  "use strict";
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function _typeof$2(obj) {
  "@babel/helpers - typeof";

  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$2(obj);
}

function _wrapRegExp() {
  _wrapRegExp = function (re, groups) {
    return new BabelRegExp(re, void 0, groups);
  };

  var _super = RegExp.prototype,
      _groups = new WeakMap();

  function BabelRegExp(re, flags, groups) {
    var _this = new RegExp(re, flags);

    return _groups.set(_this, groups || _groups.get(re)), _setPrototypeOf$1(_this, BabelRegExp.prototype);
  }

  function buildGroups(result, re) {
    var g = _groups.get(re);

    return Object.keys(g).reduce(function (groups, name) {
      return groups[name] = result[g[name]], groups;
    }, Object.create(null));
  }

  return _inherits$1(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function (str) {
    var result = _super.exec.call(this, str);

    return result && (result.groups = buildGroups(result, this)), result;
  }, BabelRegExp.prototype[Symbol.replace] = function (str, substitution) {
    if ("string" == typeof substitution) {
      var groups = _groups.get(this);

      return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) {
        return "$" + groups[name];
      }));
    }

    if ("function" == typeof substitution) {
      var _this = this;

      return _super[Symbol.replace].call(this, str, function () {
        var args = arguments;
        return "object" != typeof args[args.length - 1] && (args = [].slice.call(args)).push(buildGroups(args, _this)), substitution.apply(this, args);
      });
    }

    return _super[Symbol.replace].call(this, str, substitution);
  }, _wrapRegExp.apply(this, arguments);
}

function _AwaitValue(value) {
  this.wrapped = value;
}

function _AsyncGenerator(gen) {
  var front, back;

  function send(key, arg) {
    return new Promise(function (resolve, reject) {
      var request = {
        key: key,
        arg: arg,
        resolve: resolve,
        reject: reject,
        next: null
      };

      if (back) {
        back = back.next = request;
      } else {
        front = back = request;
        resume(key, arg);
      }
    });
  }

  function resume(key, arg) {
    try {
      var result = gen[key](arg);
      var value = result.value;
      var wrappedAwait = value instanceof _AwaitValue;
      Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) {
        if (wrappedAwait) {
          resume(key === "return" ? "return" : "next", arg);
          return;
        }

        settle(result.done ? "return" : "normal", arg);
      }, function (err) {
        resume("throw", err);
      });
    } catch (err) {
      settle("throw", err);
    }
  }

  function settle(type, value) {
    switch (type) {
      case "return":
        front.resolve({
          value: value,
          done: true
        });
        break;

      case "throw":
        front.reject(value);
        break;

      default:
        front.resolve({
          value: value,
          done: false
        });
        break;
    }

    front = front.next;

    if (front) {
      resume(front.key, front.arg);
    } else {
      back = null;
    }
  }

  this._invoke = send;

  if (typeof gen.return !== "function") {
    this.return = undefined;
  }
}

_AsyncGenerator.prototype[typeof Symbol === "function" && Symbol.asyncIterator || "@@asyncIterator"] = function () {
  return this;
};

_AsyncGenerator.prototype.next = function (arg) {
  return this._invoke("next", arg);
};

_AsyncGenerator.prototype.throw = function (arg) {
  return this._invoke("throw", arg);
};

_AsyncGenerator.prototype.return = function (arg) {
  return this._invoke("return", arg);
};

function _wrapAsyncGenerator(fn) {
  return function () {
    return new _AsyncGenerator(fn.apply(this, arguments));
  };
}

function _awaitAsyncGenerator(value) {
  return new _AwaitValue(value);
}

function _asyncGeneratorDelegate(inner, awaitWrap) {
  var iter = {},
      waiting = false;

  function pump(key, value) {
    waiting = true;
    value = new Promise(function (resolve) {
      resolve(inner[key](value));
    });
    return {
      done: false,
      value: awaitWrap(value)
    };
  }

  ;

  iter[typeof Symbol !== "undefined" && Symbol.iterator || "@@iterator"] = function () {
    return this;
  };

  iter.next = function (value) {
    if (waiting) {
      waiting = false;
      return value;
    }

    return pump("next", value);
  };

  if (typeof inner.throw === "function") {
    iter.throw = function (value) {
      if (waiting) {
        waiting = false;
        throw value;
      }

      return pump("throw", value);
    };
  }

  if (typeof inner.return === "function") {
    iter.return = function (value) {
      if (waiting) {
        waiting = false;
        return value;
      }

      return pump("return", value);
    };
  }

  return iter;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck$3(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties$2(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$2(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$2(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineEnumerableProperties(obj, descs) {
  for (var key in descs) {
    var desc = descs[key];
    desc.configurable = desc.enumerable = true;
    if ("value" in desc) desc.writable = true;
    Object.defineProperty(obj, key, desc);
  }

  if (Object.getOwnPropertySymbols) {
    var objectSymbols = Object.getOwnPropertySymbols(descs);

    for (var i = 0; i < objectSymbols.length; i++) {
      var sym = objectSymbols[i];
      var desc = descs[sym];
      desc.configurable = desc.enumerable = true;
      if ("value" in desc) desc.writable = true;
      Object.defineProperty(obj, sym, desc);
    }
  }

  return obj;
}

function _defaults(obj, defaults) {
  var keys = Object.getOwnPropertyNames(defaults);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = Object.getOwnPropertyDescriptor(defaults, key);

    if (value && value.configurable && obj[key] === undefined) {
      Object.defineProperty(obj, key, value);
    }
  }

  return obj;
}

function _defineProperty$3(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends$1.apply(this, arguments);
}

function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys.push.apply(ownKeys, Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty$3(target, key, source[key]);
    });
  }

  return target;
}

function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf$1(subClass, superClass);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf$1(subClass, superClass);
}

function _getPrototypeOf$1(o) {
  _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf$1(o);
}

function _setPrototypeOf$1(o, p) {
  _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf$1(o, p);
}

function _isNativeReflectConstruct$2() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct$2()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf$1(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf$1(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf$1(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _instanceof(left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
    return {
      default: obj
    };
  }

  var cache = _getRequireWildcardCache(nodeInterop);

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj.default = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

function _newArrowCheck(innerThis, boundThis) {
  if (innerThis !== boundThis) {
    throw new TypeError("Cannot instantiate an arrow function");
  }
}

function _objectDestructuringEmpty(obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
}

function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose$1(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized$1(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn$1(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized$1(self);
}

function _createSuper$2(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$2();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf$1(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$1(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn$1(this, result);
  };
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf$1(object);
    if (object === null) break;
  }

  return object;
}

function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get.bind();
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }

      return desc.value;
    };
  }

  return _get.apply(this, arguments);
}

function set(target, property, value, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.set) {
    set = Reflect.set;
  } else {
    set = function set(target, property, value, receiver) {
      var base = _superPropBase(target, property);

      var desc;

      if (base) {
        desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.set) {
          desc.set.call(receiver, value);
          return true;
        } else if (!desc.writable) {
          return false;
        }
      }

      desc = Object.getOwnPropertyDescriptor(receiver, property);

      if (desc) {
        if (!desc.writable) {
          return false;
        }

        desc.value = value;
        Object.defineProperty(receiver, property, desc);
      } else {
        _defineProperty$3(receiver, property, value);
      }

      return true;
    };
  }

  return set(target, property, value, receiver);
}

function _set(target, property, value, receiver, isStrict) {
  var s = set(target, property, value, receiver || target);

  if (!s && isStrict) {
    throw new Error('failed to set property');
  }

  return value;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

function _readOnlyError(name) {
  throw new TypeError("\"" + name + "\" is read-only");
}

function _writeOnlyError(name) {
  throw new TypeError("\"" + name + "\" is write-only");
}

function _classNameTDZError(name) {
  throw new Error("Class \"" + name + "\" cannot be referenced in computed property keys.");
}

function _temporalUndefined() {}

function _tdz(name) {
  throw new ReferenceError(name + " is not defined - temporal dead zone");
}

function _temporalRef(val, name) {
  return val === _temporalUndefined ? _tdz(name) : val;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _slicedToArrayLoose(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimitLoose(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _maybeArrayLike(next, arr, i) {
  if (arr && !Array.isArray(arr) && typeof arr.length === "number") {
    var len = arr.length;
    return _arrayLikeToArray(arr, i !== void 0 && i < len ? i : len);
  }

  return next(arr, i);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _iterableToArrayLimitLoose(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];

  for (_i = _i.call(arr), _step; !(_step = _i.next()).done;) {
    _arr.push(_step.value);

    if (i && _arr.length === i) break;
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _skipFirstGeneratorNext(fn) {
  return function () {
    var it = fn.apply(this, arguments);
    it.next();
    return it;
  };
}

function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];

  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }

  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");

  return typeof key === "symbol" ? key : String(key);
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.');
}

function _initializerDefineProperty(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object.keys(descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object.defineProperty(target, property, desc);
    desc = null;
  }

  return desc;
}

var id$1 = 0;

function _classPrivateFieldLooseKey(name) {
  return "__private_" + id$1++ + "_" + name;
}

function _classPrivateFieldLooseBase(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }

  return receiver;
}

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");

  return _classApplyDescriptorGet(receiver, descriptor);
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");

  _classApplyDescriptorSet(receiver, descriptor, value);

  return value;
}

function _classPrivateFieldDestructureSet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");

  return _classApplyDescriptorDestructureSet(receiver, descriptor);
}

function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }

  return privateMap.get(receiver);
}

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
  _classCheckPrivateStaticAccess(receiver, classConstructor);

  _classCheckPrivateStaticFieldDescriptor(descriptor, "get");

  return _classApplyDescriptorGet(receiver, descriptor);
}

function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
  _classCheckPrivateStaticAccess(receiver, classConstructor);

  _classCheckPrivateStaticFieldDescriptor(descriptor, "set");

  _classApplyDescriptorSet(receiver, descriptor, value);

  return value;
}

function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
  _classCheckPrivateStaticAccess(receiver, classConstructor);

  return method;
}

function _classStaticPrivateMethodSet() {
  throw new TypeError("attempted to set read only static private field");
}

function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }
}

function _classApplyDescriptorDestructureSet(receiver, descriptor) {
  if (descriptor.set) {
    if (!("__destrObj" in descriptor)) {
      descriptor.__destrObj = {
        set value(v) {
          descriptor.set.call(receiver, v);
        }

      };
    }

    return descriptor.__destrObj;
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    return descriptor;
  }
}

function _classStaticPrivateFieldDestructureSet(receiver, classConstructor, descriptor) {
  _classCheckPrivateStaticAccess(receiver, classConstructor);

  _classCheckPrivateStaticFieldDescriptor(descriptor, "set");

  return _classApplyDescriptorDestructureSet(receiver, descriptor);
}

function _classCheckPrivateStaticAccess(receiver, classConstructor) {
  if (receiver !== classConstructor) {
    throw new TypeError("Private static access of wrong provenance");
  }
}

function _classCheckPrivateStaticFieldDescriptor(descriptor, action) {
  if (descriptor === undefined) {
    throw new TypeError("attempted to " + action + " private static field before its declaration");
  }
}

function _decorate(decorators, factory, superClass, mixins) {
  var api = _getDecoratorsApi();

  if (mixins) {
    for (var i = 0; i < mixins.length; i++) {
      api = mixins[i](api);
    }
  }

  var r = factory(function initialize(O) {
    api.initializeInstanceElements(O, decorated.elements);
  }, superClass);
  var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators);
  api.initializeClassElements(r.F, decorated.elements);
  return api.runClassFinishers(r.F, decorated.finishers);
}

function _getDecoratorsApi() {
  _getDecoratorsApi = function () {
    return api;
  };

  var api = {
    elementsDefinitionOrder: [["method"], ["field"]],
    initializeInstanceElements: function (O, elements) {
      ["method", "field"].forEach(function (kind) {
        elements.forEach(function (element) {
          if (element.kind === kind && element.placement === "own") {
            this.defineClassElement(O, element);
          }
        }, this);
      }, this);
    },
    initializeClassElements: function (F, elements) {
      var proto = F.prototype;
      ["method", "field"].forEach(function (kind) {
        elements.forEach(function (element) {
          var placement = element.placement;

          if (element.kind === kind && (placement === "static" || placement === "prototype")) {
            var receiver = placement === "static" ? F : proto;
            this.defineClassElement(receiver, element);
          }
        }, this);
      }, this);
    },
    defineClassElement: function (receiver, element) {
      var descriptor = element.descriptor;

      if (element.kind === "field") {
        var initializer = element.initializer;
        descriptor = {
          enumerable: descriptor.enumerable,
          writable: descriptor.writable,
          configurable: descriptor.configurable,
          value: initializer === void 0 ? void 0 : initializer.call(receiver)
        };
      }

      Object.defineProperty(receiver, element.key, descriptor);
    },
    decorateClass: function (elements, decorators) {
      var newElements = [];
      var finishers = [];
      var placements = {
        static: [],
        prototype: [],
        own: []
      };
      elements.forEach(function (element) {
        this.addElementPlacement(element, placements);
      }, this);
      elements.forEach(function (element) {
        if (!_hasDecorators(element)) return newElements.push(element);
        var elementFinishersExtras = this.decorateElement(element, placements);
        newElements.push(elementFinishersExtras.element);
        newElements.push.apply(newElements, elementFinishersExtras.extras);
        finishers.push.apply(finishers, elementFinishersExtras.finishers);
      }, this);

      if (!decorators) {
        return {
          elements: newElements,
          finishers: finishers
        };
      }

      var result = this.decorateConstructor(newElements, decorators);
      finishers.push.apply(finishers, result.finishers);
      result.finishers = finishers;
      return result;
    },
    addElementPlacement: function (element, placements, silent) {
      var keys = placements[element.placement];

      if (!silent && keys.indexOf(element.key) !== -1) {
        throw new TypeError("Duplicated element (" + element.key + ")");
      }

      keys.push(element.key);
    },
    decorateElement: function (element, placements) {
      var extras = [];
      var finishers = [];

      for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) {
        var keys = placements[element.placement];
        keys.splice(keys.indexOf(element.key), 1);
        var elementObject = this.fromElementDescriptor(element);
        var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject);
        element = elementFinisherExtras.element;
        this.addElementPlacement(element, placements);

        if (elementFinisherExtras.finisher) {
          finishers.push(elementFinisherExtras.finisher);
        }

        var newExtras = elementFinisherExtras.extras;

        if (newExtras) {
          for (var j = 0; j < newExtras.length; j++) {
            this.addElementPlacement(newExtras[j], placements);
          }

          extras.push.apply(extras, newExtras);
        }
      }

      return {
        element: element,
        finishers: finishers,
        extras: extras
      };
    },
    decorateConstructor: function (elements, decorators) {
      var finishers = [];

      for (var i = decorators.length - 1; i >= 0; i--) {
        var obj = this.fromClassDescriptor(elements);
        var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj);

        if (elementsAndFinisher.finisher !== undefined) {
          finishers.push(elementsAndFinisher.finisher);
        }

        if (elementsAndFinisher.elements !== undefined) {
          elements = elementsAndFinisher.elements;

          for (var j = 0; j < elements.length - 1; j++) {
            for (var k = j + 1; k < elements.length; k++) {
              if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) {
                throw new TypeError("Duplicated element (" + elements[j].key + ")");
              }
            }
          }
        }
      }

      return {
        elements: elements,
        finishers: finishers
      };
    },
    fromElementDescriptor: function (element) {
      var obj = {
        kind: element.kind,
        key: element.key,
        placement: element.placement,
        descriptor: element.descriptor
      };
      var desc = {
        value: "Descriptor",
        configurable: true
      };
      Object.defineProperty(obj, Symbol.toStringTag, desc);
      if (element.kind === "field") obj.initializer = element.initializer;
      return obj;
    },
    toElementDescriptors: function (elementObjects) {
      if (elementObjects === undefined) return;
      return _toArray(elementObjects).map(function (elementObject) {
        var element = this.toElementDescriptor(elementObject);
        this.disallowProperty(elementObject, "finisher", "An element descriptor");
        this.disallowProperty(elementObject, "extras", "An element descriptor");
        return element;
      }, this);
    },
    toElementDescriptor: function (elementObject) {
      var kind = String(elementObject.kind);

      if (kind !== "method" && kind !== "field") {
        throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"');
      }

      var key = _toPropertyKey(elementObject.key);

      var placement = String(elementObject.placement);

      if (placement !== "static" && placement !== "prototype" && placement !== "own") {
        throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"');
      }

      var descriptor = elementObject.descriptor;
      this.disallowProperty(elementObject, "elements", "An element descriptor");
      var element = {
        kind: kind,
        key: key,
        placement: placement,
        descriptor: Object.assign({}, descriptor)
      };

      if (kind !== "field") {
        this.disallowProperty(elementObject, "initializer", "A method descriptor");
      } else {
        this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor");
        this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor");
        this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor");
        element.initializer = elementObject.initializer;
      }

      return element;
    },
    toElementFinisherExtras: function (elementObject) {
      var element = this.toElementDescriptor(elementObject);

      var finisher = _optionalCallableProperty(elementObject, "finisher");

      var extras = this.toElementDescriptors(elementObject.extras);
      return {
        element: element,
        finisher: finisher,
        extras: extras
      };
    },
    fromClassDescriptor: function (elements) {
      var obj = {
        kind: "class",
        elements: elements.map(this.fromElementDescriptor, this)
      };
      var desc = {
        value: "Descriptor",
        configurable: true
      };
      Object.defineProperty(obj, Symbol.toStringTag, desc);
      return obj;
    },
    toClassDescriptor: function (obj) {
      var kind = String(obj.kind);

      if (kind !== "class") {
        throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"');
      }

      this.disallowProperty(obj, "key", "A class descriptor");
      this.disallowProperty(obj, "placement", "A class descriptor");
      this.disallowProperty(obj, "descriptor", "A class descriptor");
      this.disallowProperty(obj, "initializer", "A class descriptor");
      this.disallowProperty(obj, "extras", "A class descriptor");

      var finisher = _optionalCallableProperty(obj, "finisher");

      var elements = this.toElementDescriptors(obj.elements);
      return {
        elements: elements,
        finisher: finisher
      };
    },
    runClassFinishers: function (constructor, finishers) {
      for (var i = 0; i < finishers.length; i++) {
        var newConstructor = (0, finishers[i])(constructor);

        if (newConstructor !== undefined) {
          if (typeof newConstructor !== "function") {
            throw new TypeError("Finishers must return a constructor.");
          }

          constructor = newConstructor;
        }
      }

      return constructor;
    },
    disallowProperty: function (obj, name, objectType) {
      if (obj[name] !== undefined) {
        throw new TypeError(objectType + " can't have a ." + name + " property.");
      }
    }
  };
  return api;
}

function _createElementDescriptor(def) {
  var key = _toPropertyKey(def.key);

  var descriptor;

  if (def.kind === "method") {
    descriptor = {
      value: def.value,
      writable: true,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "get") {
    descriptor = {
      get: def.value,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "set") {
    descriptor = {
      set: def.value,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "field") {
    descriptor = {
      configurable: true,
      writable: true,
      enumerable: true
    };
  }

  var element = {
    kind: def.kind === "field" ? "field" : "method",
    key: key,
    placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype",
    descriptor: descriptor
  };
  if (def.decorators) element.decorators = def.decorators;
  if (def.kind === "field") element.initializer = def.value;
  return element;
}

function _coalesceGetterSetter(element, other) {
  if (element.descriptor.get !== undefined) {
    other.descriptor.get = element.descriptor.get;
  } else {
    other.descriptor.set = element.descriptor.set;
  }
}

function _coalesceClassElements(elements) {
  var newElements = [];

  var isSameElement = function (other) {
    return other.kind === "method" && other.key === element.key && other.placement === element.placement;
  };

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var other;

    if (element.kind === "method" && (other = newElements.find(isSameElement))) {
      if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) {
        if (_hasDecorators(element) || _hasDecorators(other)) {
          throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated.");
        }

        other.descriptor = element.descriptor;
      } else {
        if (_hasDecorators(element)) {
          if (_hasDecorators(other)) {
            throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ").");
          }

          other.decorators = element.decorators;
        }

        _coalesceGetterSetter(element, other);
      }
    } else {
      newElements.push(element);
    }
  }

  return newElements;
}

function _hasDecorators(element) {
  return element.decorators && element.decorators.length;
}

function _isDataDescriptor(desc) {
  return desc !== undefined && !(desc.value === undefined && desc.writable === undefined);
}

function _optionalCallableProperty(obj, name) {
  var value = obj[name];

  if (value !== undefined && typeof value !== "function") {
    throw new TypeError("Expected '" + name + "' to be a function");
  }

  return value;
}

function _classPrivateMethodGet(receiver, privateSet, fn) {
  if (!privateSet.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return fn;
}

function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}

function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap);

  privateMap.set(obj, value);
}

function _classPrivateMethodInitSpec(obj, privateSet) {
  _checkPrivateRedeclaration(obj, privateSet);

  privateSet.add(obj);
}

function _classPrivateMethodSet() {
  throw new TypeError("attempted to reassign private method");
}

function _identity(x) {
  return x;
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function getDefaultExportFromNamespaceIfPresent (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
}

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

function commonjsRequire (path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var runtime = {exports: {}};

(function (module) {
  var runtime = function (exports) {
    "use strict";

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }

    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function define(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && _typeof$2(value) === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    });
    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    define(Gp, iteratorSymbol, function () {
      return this;
    });
    define(Gp, "toString", function () {
      return "[object Generator]";
    });

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  'object' === "object" ? module.exports : {});

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if ((typeof globalThis === "undefined" ? "undefined" : _typeof$2(globalThis)) === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }
})(runtime);

var runtime_1 = runtime.exports;

var n$3,
    l$4,
    u$2,
    i$3,
    t$3,
    o$2,
    r$4,
    f$4,
    e$6 = {},
    c$4 = [],
    s$1 = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;

function a$1(n, l) {
  for (var u in l) {
    n[u] = l[u];
  }

  return n;
}

function h$4(n) {
  var l = n.parentNode;
  l && l.removeChild(n);
}

function v$4(l, u, i) {
  var t,
      o,
      r,
      f = {};

  for (r in u) {
    "key" == r ? t = u[r] : "ref" == r ? o = u[r] : f[r] = u[r];
  }

  if (arguments.length > 2 && (f.children = arguments.length > 3 ? n$3.call(arguments, 2) : i), "function" == typeof l && null != l.defaultProps) for (r in l.defaultProps) {
    void 0 === f[r] && (f[r] = l.defaultProps[r]);
  }
  return y$4(l, f, t, o, null);
}

function y$4(n, i, t, o, r) {
  var f = {
    type: n,
    props: i,
    key: t,
    ref: o,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    __h: null,
    constructor: void 0,
    __v: null == r ? ++u$2 : r
  };
  return null == r && null != l$4.vnode && l$4.vnode(f), f;
}

function p$4() {
  return {
    current: null
  };
}

function d$4(n) {
  return n.children;
}

function _$1(n, l) {
  this.props = n, this.context = l;
}

function k$5(n, l) {
  if (null == l) return n.__ ? k$5(n.__, n.__.__k.indexOf(n) + 1) : null;

  for (var u; l < n.__k.length; l++) {
    if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
  }

  return "function" == typeof n.type ? k$5(n) : null;
}

function b$4(n) {
  var l, u;

  if (null != (n = n.__) && null != n.__c) {
    for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) {
      if (null != (u = n.__k[l]) && null != u.__e) {
        n.__e = n.__c.base = u.__e;
        break;
      }
    }

    return b$4(n);
  }
}

function m$5(n) {
  (!n.__d && (n.__d = !0) && t$3.push(n) && !g$5.__r++ || r$4 !== l$4.debounceRendering) && ((r$4 = l$4.debounceRendering) || o$2)(g$5);
}

function g$5() {
  for (var n; g$5.__r = t$3.length;) {
    n = t$3.sort(function (n, l) {
      return n.__v.__b - l.__v.__b;
    }), t$3 = [], n.some(function (n) {
      var l, u, i, t, o, r;
      n.__d && (o = (t = (l = n).__v).__e, (r = l.__P) && (u = [], (i = a$1({}, t)).__v = t.__v + 1, j$2(r, t, i, l.__n, void 0 !== r.ownerSVGElement, null != t.__h ? [o] : null, u, null == o ? k$5(t) : o, t.__h), z$4(u, t), t.__e != o && b$4(t)));
    });
  }
}

function w$5(n, l, u, i, t, o, r, f, s, a) {
  var h,
      v,
      p,
      _,
      b,
      m,
      g,
      w = i && i.__k || c$4,
      A = w.length;

  for (u.__k = [], h = 0; h < l.length; h++) {
    if (null != (_ = u.__k[h] = null == (_ = l[h]) || "boolean" == typeof _ ? null : "string" == typeof _ || "number" == typeof _ || "bigint" == typeof _ ? y$4(null, _, null, null, _) : Array.isArray(_) ? y$4(d$4, {
      children: _
    }, null, null, null) : _.__b > 0 ? y$4(_.type, _.props, _.key, null, _.__v) : _)) {
      if (_.__ = u, _.__b = u.__b + 1, null === (p = w[h]) || p && _.key == p.key && _.type === p.type) w[h] = void 0;else for (v = 0; v < A; v++) {
        if ((p = w[v]) && _.key == p.key && _.type === p.type) {
          w[v] = void 0;
          break;
        }

        p = null;
      }
      j$2(n, _, p = p || e$6, t, o, r, f, s, a), b = _.__e, (v = _.ref) && p.ref != v && (g || (g = []), p.ref && g.push(p.ref, null, _), g.push(v, _.__c || b, _)), null != b ? (null == m && (m = b), "function" == typeof _.type && _.__k === p.__k ? _.__d = s = x$5(_, s, n) : s = P$1(n, _, p, w, b, s), "function" == typeof u.type && (u.__d = s)) : s && p.__e == s && s.parentNode != n && (s = k$5(p));
    }
  }

  for (u.__e = m, h = A; h--;) {
    null != w[h] && ("function" == typeof u.type && null != w[h].__e && w[h].__e == u.__d && (u.__d = k$5(i, h + 1)), N$1(w[h], w[h]));
  }

  if (g) for (h = 0; h < g.length; h++) {
    M$1(g[h], g[++h], g[++h]);
  }
}

function x$5(n, l, u) {
  for (var i, t = n.__k, o = 0; t && o < t.length; o++) {
    (i = t[o]) && (i.__ = n, l = "function" == typeof i.type ? x$5(i, l, u) : P$1(u, i, i, t, i.__e, l));
  }

  return l;
}

function A$5(n, l) {
  return l = l || [], null == n || "boolean" == typeof n || (Array.isArray(n) ? n.some(function (n) {
    A$5(n, l);
  }) : l.push(n)), l;
}

function P$1(n, l, u, i, t, o) {
  var r, f, e;
  if (void 0 !== l.__d) r = l.__d, l.__d = void 0;else if (null == u || t != o || null == t.parentNode) n: if (null == o || o.parentNode !== n) n.appendChild(t), r = null;else {
    for (f = o, e = 0; (f = f.nextSibling) && e < i.length; e += 2) {
      if (f == t) break n;
    }

    n.insertBefore(t, o), r = o;
  }
  return void 0 !== r ? r : t.nextSibling;
}

function C$2(n, l, u, i, t) {
  var o;

  for (o in u) {
    "children" === o || "key" === o || o in l || H$2(n, o, null, u[o], i);
  }

  for (o in l) {
    t && "function" != typeof l[o] || "children" === o || "key" === o || "value" === o || "checked" === o || u[o] === l[o] || H$2(n, o, l[o], u[o], i);
  }
}

function $$1(n, l, u) {
  "-" === l[0] ? n.setProperty(l, u) : n[l] = null == u ? "" : "number" != typeof u || s$1.test(l) ? u : u + "px";
}

function H$2(n, l, u, i, t) {
  var o;

  n: if ("style" === l) {
    if ("string" == typeof u) n.style.cssText = u;else {
      if ("string" == typeof i && (n.style.cssText = i = ""), i) for (l in i) {
        u && l in u || $$1(n.style, l, "");
      }
      if (u) for (l in u) {
        i && u[l] === i[l] || $$1(n.style, l, u[l]);
      }
    }
  } else if ("o" === l[0] && "n" === l[1]) o = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + o] = u, u ? i || n.addEventListener(l, o ? T$2 : I$2, o) : n.removeEventListener(l, o ? T$2 : I$2, o);else if ("dangerouslySetInnerHTML" !== l) {
    if (t) l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");else if ("href" !== l && "list" !== l && "form" !== l && "tabIndex" !== l && "download" !== l && l in n) try {
      n[l] = null == u ? "" : u;
      break n;
    } catch (n) {}
    "function" == typeof u || (null != u && (!1 !== u || "a" === l[0] && "r" === l[1]) ? n.setAttribute(l, u) : n.removeAttribute(l));
  }
}

function I$2(n) {
  this.l[n.type + !1](l$4.event ? l$4.event(n) : n);
}

function T$2(n) {
  this.l[n.type + !0](l$4.event ? l$4.event(n) : n);
}

function j$2(n, u, i, t, o, r, f, e, c) {
  var s,
      h,
      v,
      y,
      p,
      k,
      b,
      m,
      g,
      x,
      A,
      P = u.type;
  if (void 0 !== u.constructor) return null;
  null != i.__h && (c = i.__h, e = u.__e = i.__e, u.__h = null, r = [e]), (s = l$4.__b) && s(u);

  try {
    n: if ("function" == typeof P) {
      if (m = u.props, g = (s = P.contextType) && t[s.__c], x = s ? g ? g.props.value : s.__ : t, i.__c ? b = (h = u.__c = i.__c).__ = h.__E : ("prototype" in P && P.prototype.render ? u.__c = h = new P(m, x) : (u.__c = h = new _$1(m, x), h.constructor = P, h.render = O$1), g && g.sub(h), h.props = m, h.state || (h.state = {}), h.context = x, h.__n = t, v = h.__d = !0, h.__h = []), null == h.__s && (h.__s = h.state), null != P.getDerivedStateFromProps && (h.__s == h.state && (h.__s = a$1({}, h.__s)), a$1(h.__s, P.getDerivedStateFromProps(m, h.__s))), y = h.props, p = h.state, v) null == P.getDerivedStateFromProps && null != h.componentWillMount && h.componentWillMount(), null != h.componentDidMount && h.__h.push(h.componentDidMount);else {
        if (null == P.getDerivedStateFromProps && m !== y && null != h.componentWillReceiveProps && h.componentWillReceiveProps(m, x), !h.__e && null != h.shouldComponentUpdate && !1 === h.shouldComponentUpdate(m, h.__s, x) || u.__v === i.__v) {
          h.props = m, h.state = h.__s, u.__v !== i.__v && (h.__d = !1), h.__v = u, u.__e = i.__e, u.__k = i.__k, u.__k.forEach(function (n) {
            n && (n.__ = u);
          }), h.__h.length && f.push(h);
          break n;
        }

        null != h.componentWillUpdate && h.componentWillUpdate(m, h.__s, x), null != h.componentDidUpdate && h.__h.push(function () {
          h.componentDidUpdate(y, p, k);
        });
      }
      h.context = x, h.props = m, h.state = h.__s, (s = l$4.__r) && s(u), h.__d = !1, h.__v = u, h.__P = n, s = h.render(h.props, h.state, h.context), h.state = h.__s, null != h.getChildContext && (t = a$1(a$1({}, t), h.getChildContext())), v || null == h.getSnapshotBeforeUpdate || (k = h.getSnapshotBeforeUpdate(y, p)), A = null != s && s.type === d$4 && null == s.key ? s.props.children : s, w$5(n, Array.isArray(A) ? A : [A], u, i, t, o, r, f, e, c), h.base = u.__e, u.__h = null, h.__h.length && f.push(h), b && (h.__E = h.__ = null), h.__e = !1;
    } else null == r && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = L$1(i.__e, u, i, t, o, r, f, c);

    (s = l$4.diffed) && s(u);
  } catch (n) {
    u.__v = null, (c || null != r) && (u.__e = e, u.__h = !!c, r[r.indexOf(e)] = null), l$4.__e(n, u, i);
  }
}

function z$4(n, u) {
  l$4.__c && l$4.__c(u, n), n.some(function (u) {
    try {
      n = u.__h, u.__h = [], n.some(function (n) {
        n.call(u);
      });
    } catch (n) {
      l$4.__e(n, u.__v);
    }
  });
}

function L$1(l, u, i, t, o, r, f, c) {
  var s,
      a,
      v,
      y = i.props,
      p = u.props,
      d = u.type,
      _ = 0;
  if ("svg" === d && (o = !0), null != r) for (; _ < r.length; _++) {
    if ((s = r[_]) && "setAttribute" in s == !!d && (d ? s.localName === d : 3 === s.nodeType)) {
      l = s, r[_] = null;
      break;
    }
  }

  if (null == l) {
    if (null === d) return document.createTextNode(p);
    l = o ? document.createElementNS("http://www.w3.org/2000/svg", d) : document.createElement(d, p.is && p), r = null, c = !1;
  }

  if (null === d) y === p || c && l.data === p || (l.data = p);else {
    if (r = r && n$3.call(l.childNodes), a = (y = i.props || e$6).dangerouslySetInnerHTML, v = p.dangerouslySetInnerHTML, !c) {
      if (null != r) for (y = {}, _ = 0; _ < l.attributes.length; _++) {
        y[l.attributes[_].name] = l.attributes[_].value;
      }
      (v || a) && (v && (a && v.__html == a.__html || v.__html === l.innerHTML) || (l.innerHTML = v && v.__html || ""));
    }

    if (C$2(l, p, y, o, c), v) u.__k = [];else if (_ = u.props.children, w$5(l, Array.isArray(_) ? _ : [_], u, i, t, o && "foreignObject" !== d, r, f, r ? r[0] : i.__k && k$5(i, 0), c), null != r) for (_ = r.length; _--;) {
      null != r[_] && h$4(r[_]);
    }
    c || ("value" in p && void 0 !== (_ = p.value) && (_ !== l.value || "progress" === d && !_ || "option" === d && _ !== y.value) && H$2(l, "value", _, y.value, !1), "checked" in p && void 0 !== (_ = p.checked) && _ !== l.checked && H$2(l, "checked", _, y.checked, !1));
  }
  return l;
}

function M$1(n, u, i) {
  try {
    "function" == typeof n ? n(u) : n.current = u;
  } catch (n) {
    l$4.__e(n, i);
  }
}

function N$1(n, u, i) {
  var t, o;

  if (l$4.unmount && l$4.unmount(n), (t = n.ref) && (t.current && t.current !== n.__e || M$1(t, null, u)), null != (t = n.__c)) {
    if (t.componentWillUnmount) try {
      t.componentWillUnmount();
    } catch (n) {
      l$4.__e(n, u);
    }
    t.base = t.__P = null;
  }

  if (t = n.__k) for (o = 0; o < t.length; o++) {
    t[o] && N$1(t[o], u, "function" != typeof n.type);
  }
  i || null == n.__e || h$4(n.__e), n.__e = n.__d = void 0;
}

function O$1(n, l, u) {
  return this.constructor(n, u);
}

function S$1(u, i, t) {
  var o, r, f;
  l$4.__ && l$4.__(u, i), r = (o = "function" == typeof t) ? null : t && t.__k || i.__k, f = [], j$2(i, u = (!o && t || i).__k = v$4(d$4, null, [u]), r || e$6, e$6, void 0 !== i.ownerSVGElement, !o && t ? [t] : r ? null : i.firstChild ? n$3.call(i.childNodes) : null, f, !o && t ? t : r ? r.__e : i.firstChild, o), z$4(f, u);
}

function q$5(n, l) {
  S$1(n, l, q$5);
}

function B$2(l, u, i) {
  var t,
      o,
      r,
      f = a$1({}, l.props);

  for (r in u) {
    "key" == r ? t = u[r] : "ref" == r ? o = u[r] : f[r] = u[r];
  }

  return arguments.length > 2 && (f.children = arguments.length > 3 ? n$3.call(arguments, 2) : i), y$4(l.type, f, t || l.key, o || l.ref, null);
}

function D$2(n, l) {
  var u = {
    __c: l = "__cC" + f$4++,
    __: n,
    Consumer: function Consumer(n, l) {
      return n.children(l);
    },
    Provider: function Provider(n) {
      var u, i;
      return this.getChildContext || (u = [], (i = {})[l] = this, this.getChildContext = function () {
        return i;
      }, this.shouldComponentUpdate = function (n) {
        this.props.value !== n.value && u.some(m$5);
      }, this.sub = function (n) {
        u.push(n);
        var l = n.componentWillUnmount;

        n.componentWillUnmount = function () {
          u.splice(u.indexOf(n), 1), l && l.call(n);
        };
      }), n.children;
    }
  };
  return u.Provider.__ = u.Consumer.contextType = u;
}

n$3 = c$4.slice, l$4 = {
  __e: function __e(n, l, u, i) {
    for (var t, o, r; l = l.__;) {
      if ((t = l.__c) && !t.__) try {
        if ((o = t.constructor) && null != o.getDerivedStateFromError && (t.setState(o.getDerivedStateFromError(n)), r = t.__d), null != t.componentDidCatch && (t.componentDidCatch(n, i || {}), r = t.__d), r) return t.__E = t;
      } catch (l) {
        n = l;
      }
    }

    throw n;
  }
}, u$2 = 0, i$3 = function i(n) {
  return null != n && void 0 === n.constructor;
}, _$1.prototype.setState = function (n, l) {
  var u;
  u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = a$1({}, this.state), "function" == typeof n && (n = n(a$1({}, u), this.props)), n && a$1(u, n), null != n && this.__v && (l && this.__h.push(l), m$5(this));
}, _$1.prototype.forceUpdate = function (n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), m$5(this));
}, _$1.prototype.render = d$4, t$3 = [], o$2 = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, g$5.__r = 0, f$4 = 0;

var t$2,
    u$1,
    r$3,
    o$1 = 0,
    i$2 = [],
    c$3 = l$4.__b,
    f$3 = l$4.__r,
    e$5 = l$4.diffed,
    a = l$4.__c,
    v$3 = l$4.unmount;

function l$3(t, r) {
  l$4.__h && l$4.__h(u$1, t, o$1 || r), o$1 = 0;
  var i = u$1.__H || (u$1.__H = {
    __: [],
    __h: []
  });
  return t >= i.__.length && i.__.push({}), i.__[t];
}

function m$4(n) {
  return o$1 = 1, p$3(w$4, n);
}

function p$3(n, r, o) {
  var i = l$3(t$2++, 2);
  return i.t = n, i.__c || (i.__ = [o ? o(r) : w$4(void 0, r), function (n) {
    var t = i.t(i.__[0], n);
    i.__[0] !== t && (i.__ = [t, i.__[1]], i.__c.setState({}));
  }], i.__c = u$1), i.__;
}

function y$3(r, o) {
  var i = l$3(t$2++, 3);
  !l$4.__s && k$4(i.__H, o) && (i.__ = r, i.__H = o, u$1.__H.__h.push(i));
}

function d$3(r, o) {
  var i = l$3(t$2++, 4);
  !l$4.__s && k$4(i.__H, o) && (i.__ = r, i.__H = o, u$1.__h.push(i));
}

function h$3(n) {
  return o$1 = 5, _(function () {
    return {
      current: n
    };
  }, []);
}

function s(n, t, u) {
  o$1 = 6, d$3(function () {
    return "function" == typeof n ? (n(t()), function () {
      return n(null);
    }) : n ? (n.current = t(), function () {
      return n.current = null;
    }) : void 0;
  }, null == u ? u : u.concat(n));
}

function _(n, u) {
  var r = l$3(t$2++, 7);
  return k$4(r.__H, u) && (r.__ = n(), r.__H = u, r.__h = n), r.__;
}

function A$4(n, t) {
  return o$1 = 8, _(function () {
    return n;
  }, t);
}

function F$2(n) {
  var r = u$1.context[n.__c],
      o = l$3(t$2++, 9);
  return o.c = n, r ? (null == o.__ && (o.__ = !0, r.sub(u$1)), r.props.value) : n.__;
}

function T$1(t, u) {
  l$4.useDebugValue && l$4.useDebugValue(u ? u(t) : t);
}

function q$4(n) {
  var r = l$3(t$2++, 10),
      o = m$4();
  return r.__ = n, u$1.componentDidCatch || (u$1.componentDidCatch = function (n) {
    r.__ && r.__(n), o[1](n);
  }), [o[0], function () {
    o[1](void 0);
  }];
}

function x$4() {
  for (var t; t = i$2.shift();) {
    if (t.__P) try {
      t.__H.__h.forEach(g$4), t.__H.__h.forEach(j$1), t.__H.__h = [];
    } catch (u) {
      t.__H.__h = [], l$4.__e(u, t.__v);
    }
  }
}

l$4.__b = function (n) {
  u$1 = null, c$3 && c$3(n);
}, l$4.__r = function (n) {
  f$3 && f$3(n), t$2 = 0;
  var r = (u$1 = n.__c).__H;
  r && (r.__h.forEach(g$4), r.__h.forEach(j$1), r.__h = []);
}, l$4.diffed = function (t) {
  e$5 && e$5(t);
  var o = t.__c;
  o && o.__H && o.__H.__h.length && (1 !== i$2.push(o) && r$3 === l$4.requestAnimationFrame || ((r$3 = l$4.requestAnimationFrame) || function (n) {
    var t,
        u = function u() {
      clearTimeout(r), b$3 && cancelAnimationFrame(t), setTimeout(n);
    },
        r = setTimeout(u, 100);

    b$3 && (t = requestAnimationFrame(u));
  })(x$4)), u$1 = null;
}, l$4.__c = function (t, u) {
  u.some(function (t) {
    try {
      t.__h.forEach(g$4), t.__h = t.__h.filter(function (n) {
        return !n.__ || j$1(n);
      });
    } catch (r) {
      u.some(function (n) {
        n.__h && (n.__h = []);
      }), u = [], l$4.__e(r, t.__v);
    }
  }), a && a(t, u);
}, l$4.unmount = function (t) {
  v$3 && v$3(t);
  var u,
      r = t.__c;
  r && r.__H && (r.__H.__.forEach(function (n) {
    try {
      g$4(n);
    } catch (n) {
      u = n;
    }
  }), u && l$4.__e(u, r.__v));
};
var b$3 = "function" == typeof requestAnimationFrame;

function g$4(n) {
  var t = u$1,
      r = n.__c;
  "function" == typeof r && (n.__c = void 0, r()), u$1 = t;
}

function j$1(n) {
  var t = u$1;
  n.__c = n.__(), u$1 = t;
}

function k$4(n, t) {
  return !n || n.length !== t.length || t.some(function (t, u) {
    return t !== n[u];
  });
}

function w$4(n, t) {
  return "function" == typeof t ? t(n) : t;
}

function C$1(n, t) {
  for (var e in t) {
    n[e] = t[e];
  }

  return n;
}

function S(n, t) {
  for (var e in n) {
    if ("__source" !== e && !(e in t)) return !0;
  }

  for (var r in t) {
    if ("__source" !== r && n[r] !== t[r]) return !0;
  }

  return !1;
}

function E$1(n) {
  this.props = n;
}

function g$3(n, t) {
  function e(n) {
    var e = this.props.ref,
        r = e == n.ref;
    return !r && e && (e.call ? e(null) : e.current = null), t ? !t(this.props, n) || !r : S(this.props, n);
  }

  function r(t) {
    return this.shouldComponentUpdate = e, v$4(n, t);
  }

  return r.displayName = "Memo(" + (n.displayName || n.name) + ")", r.prototype.isReactComponent = !0, r.__f = !0, r;
}

(E$1.prototype = new _$1()).isPureReactComponent = !0, E$1.prototype.shouldComponentUpdate = function (n, t) {
  return S(this.props, n) || S(this.state, t);
};
var w$3 = l$4.__b;

l$4.__b = function (n) {
  n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), w$3 && w$3(n);
};

var R = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;

function x$3(n) {
  function t(t) {
    var e = C$1({}, t);
    return delete e.ref, n(e, t.ref || null);
  }

  return t.$$typeof = R, t.render = t, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (n.displayName || n.name) + ")", t;
}

var N = function N(n, t) {
  return null == n ? null : A$5(A$5(n).map(t));
},
    k$3 = {
  map: N,
  forEach: N,
  count: function count(n) {
    return n ? A$5(n).length : 0;
  },
  only: function only(n) {
    var t = A$5(n);
    if (1 !== t.length) throw "Children.only";
    return t[0];
  },
  toArray: A$5
},
    A$3 = l$4.__e;

l$4.__e = function (n, t, e, r) {
  if (n.then) for (var u, o = t; o = o.__;) {
    if ((u = o.__c) && u.__c) return null == t.__e && (t.__e = e.__e, t.__k = e.__k), u.__c(n, t);
  }
  A$3(n, t, e, r);
};

var O = l$4.unmount;

function L() {
  this.__u = 0, this.t = null, this.__b = null;
}

function U(n) {
  var t = n.__.__c;
  return t && t.__e && t.__e(n);
}

function F$1(n) {
  var t, e, r;

  function u(u) {
    if (t || (t = n()).then(function (n) {
      e = n.default || n;
    }, function (n) {
      r = n;
    }), r) throw r;
    if (!e) throw t;
    return v$4(e, u);
  }

  return u.displayName = "Lazy", u.__f = !0, u;
}

function M() {
  this.u = null, this.o = null;
}

l$4.unmount = function (n) {
  var t = n.__c;
  t && t.__R && t.__R(), t && !0 === n.__h && (n.type = null), O && O(n);
}, (L.prototype = new _$1()).__c = function (n, t) {
  var e = t.__c,
      r = this;
  null == r.t && (r.t = []), r.t.push(e);

  var u = U(r.__v),
      o = !1,
      i = function i() {
    o || (o = !0, e.__R = null, u ? u(l) : l());
  };

  e.__R = i;

  var l = function l() {
    if (! --r.__u) {
      if (r.state.__e) {
        var n = r.state.__e;

        r.__v.__k[0] = function n(t, e, r) {
          return t && (t.__v = null, t.__k = t.__k && t.__k.map(function (t) {
            return n(t, e, r);
          }), t.__c && t.__c.__P === e && (t.__e && r.insertBefore(t.__e, t.__d), t.__c.__e = !0, t.__c.__P = r)), t;
        }(n, n.__c.__P, n.__c.__O);
      }

      var t;

      for (r.setState({
        __e: r.__b = null
      }); t = r.t.pop();) {
        t.forceUpdate();
      }
    }
  },
      f = !0 === t.__h;

  r.__u++ || f || r.setState({
    __e: r.__b = r.__v.__k[0]
  }), n.then(i, i);
}, L.prototype.componentWillUnmount = function () {
  this.t = [];
}, L.prototype.render = function (n, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var e = document.createElement("div"),
          r = this.__v.__k[0].__c;

      this.__v.__k[0] = function n(t, e, r) {
        return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach(function (n) {
          "function" == typeof n.__c && n.__c();
        }), t.__c.__H = null), null != (t = C$1({}, t)).__c && (t.__c.__P === r && (t.__c.__P = e), t.__c = null), t.__k = t.__k && t.__k.map(function (t) {
          return n(t, e, r);
        })), t;
      }(this.__b, e, r.__O = r.__P);
    }

    this.__b = null;
  }

  var u = t.__e && v$4(d$4, null, n.fallback);
  return u && (u.__h = null), [v$4(d$4, null, t.__e ? null : n.children), u];
};

var T = function T(n, t, e) {
  if (++e[1] === e[0] && n.o.delete(t), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.o.size)) for (e = n.u; e;) {
    for (; e.length > 3;) {
      e.pop()();
    }

    if (e[1] < e[0]) break;
    n.u = e = e[2];
  }
};

function D$1(n) {
  return this.getChildContext = function () {
    return n.context;
  }, n.children;
}

function I$1(n) {
  var t = this,
      e = n.i;
  t.componentWillUnmount = function () {
    S$1(null, t.l), t.l = null, t.i = null;
  }, t.i && t.i !== e && t.componentWillUnmount(), n.__v ? (t.l || (t.i = e, t.l = {
    nodeType: 1,
    parentNode: e,
    childNodes: [],
    appendChild: function appendChild(n) {
      this.childNodes.push(n), t.i.appendChild(n);
    },
    insertBefore: function insertBefore(n, e) {
      this.childNodes.push(n), t.i.appendChild(n);
    },
    removeChild: function removeChild(n) {
      this.childNodes.splice(this.childNodes.indexOf(n) >>> 1, 1), t.i.removeChild(n);
    }
  }), S$1(v$4(D$1, {
    context: t.context
  }, n.__v), t.l)) : t.l && t.componentWillUnmount();
}

function W(n, t) {
  var e = v$4(I$1, {
    __v: n,
    i: t
  });
  return e.containerInfo = t, e;
}

(M.prototype = new _$1()).__e = function (n) {
  var t = this,
      e = U(t.__v),
      r = t.o.get(n);
  return r[0]++, function (u) {
    var o = function o() {
      t.props.revealOrder ? (r.push(u), T(t, n, r)) : u();
    };

    e ? e(o) : o();
  };
}, M.prototype.render = function (n) {
  this.u = null, this.o = new Map();
  var t = A$5(n.children);
  n.revealOrder && "b" === n.revealOrder[0] && t.reverse();

  for (var e = t.length; e--;) {
    this.o.set(t[e], this.u = [1, 0, this.u]);
  }

  return n.children;
}, M.prototype.componentDidUpdate = M.prototype.componentDidMount = function () {
  var n = this;
  this.o.forEach(function (t, e) {
    T(n, e, t);
  });
};

var P = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103,
    V = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,
    j = "undefined" != typeof document,
    z$3 = function z(n) {
  return ("undefined" != typeof Symbol && "symbol" == _typeof$2(Symbol()) ? /fil|che|rad/i : /fil|che|ra/i).test(n);
};

function B$1(n, t, e) {
  return null == t.__k && (t.textContent = ""), S$1(n, t), "function" == typeof e && e(), n ? n.__c : null;
}

function $(n, t, e) {
  return q$5(n, t), "function" == typeof e && e(), n ? n.__c : null;
}

_$1.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function (n) {
  Object.defineProperty(_$1.prototype, n, {
    configurable: !0,
    get: function get() {
      return this["UNSAFE_" + n];
    },
    set: function set(t) {
      Object.defineProperty(this, n, {
        configurable: !0,
        writable: !0,
        value: t
      });
    }
  });
});
var H$1 = l$4.event;

function Z() {}

function Y() {
  return this.cancelBubble;
}

function q$3() {
  return this.defaultPrevented;
}

l$4.event = function (n) {
  return H$1 && (n = H$1(n)), n.persist = Z, n.isPropagationStopped = Y, n.isDefaultPrevented = q$3, n.nativeEvent = n;
};

var G$2,
    J = {
  configurable: !0,
  get: function get() {
    return this.class;
  }
},
    K = l$4.vnode;

l$4.vnode = function (n) {
  var t = n.type,
      e = n.props,
      r = e;

  if ("string" == typeof t) {
    var u = -1 === t.indexOf("-");

    for (var o in r = {}, e) {
      var i = e[o];
      j && "children" === o && "noscript" === t || "value" === o && "defaultValue" in e && null == i || ("defaultValue" === o && "value" in e && null == e.value ? o = "value" : "download" === o && !0 === i ? i = "" : /ondoubleclick/i.test(o) ? o = "ondblclick" : /^onchange(textarea|input)/i.test(o + t) && !z$3(e.type) ? o = "oninput" : /^onfocus$/i.test(o) ? o = "onfocusin" : /^onblur$/i.test(o) ? o = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(o) ? o = o.toLowerCase() : u && V.test(o) ? o = o.replace(/[A-Z0-9]/, "-$&").toLowerCase() : null === i && (i = void 0), r[o] = i);
    }

    "select" == t && r.multiple && Array.isArray(r.value) && (r.value = A$5(e.children).forEach(function (n) {
      n.props.selected = -1 != r.value.indexOf(n.props.value);
    })), "select" == t && null != r.defaultValue && (r.value = A$5(e.children).forEach(function (n) {
      n.props.selected = r.multiple ? -1 != r.defaultValue.indexOf(n.props.value) : r.defaultValue == n.props.value;
    })), n.props = r, e.class != e.className && (J.enumerable = "className" in e, null != e.className && (r.class = e.className), Object.defineProperty(r, "className", J));
  }

  n.$$typeof = P, K && K(n);
};

var Q = l$4.__r;

l$4.__r = function (n) {
  Q && Q(n), G$2 = n.__c;
};

var X = {
  ReactCurrentDispatcher: {
    current: {
      readContext: function readContext(n) {
        return G$2.__n[n.__c].props.value;
      }
    }
  }
},
    nn = "17.0.2";

function tn(n) {
  return v$4.bind(null, n);
}

function en(n) {
  return !!n && n.$$typeof === P;
}

function rn(n) {
  return en(n) ? B$2.apply(null, arguments) : n;
}

function un(n) {
  return !!n.__k && (S$1(null, n), !0);
}

function on(n) {
  return n && (n.base || 1 === n.nodeType && n) || null;
}

var ln = function ln(n, t) {
  return n(t);
},
    fn = function fn(n, t) {
  return n(t);
},
    cn = d$4;

var React = {
  useState: m$4,
  useReducer: p$3,
  useEffect: y$3,
  useLayoutEffect: d$3,
  useRef: h$3,
  useImperativeHandle: s,
  useMemo: _,
  useCallback: A$4,
  useContext: F$2,
  useDebugValue: T$1,
  version: "17.0.2",
  Children: k$3,
  render: B$1,
  hydrate: $,
  unmountComponentAtNode: un,
  createPortal: W,
  createElement: v$4,
  createContext: D$2,
  createFactory: tn,
  cloneElement: rn,
  createRef: p$4,
  Fragment: d$4,
  isValidElement: en,
  findDOMNode: on,
  Component: _$1,
  PureComponent: E$1,
  memo: g$3,
  forwardRef: x$3,
  flushSync: fn,
  unstable_batchedUpdates: ln,
  StrictMode: d$4,
  Suspense: L,
  SuspenseList: M,
  lazy: F$1,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: X
};

var propTypes = {exports: {}};

var reactIs$6 = {exports: {}};

var reactIs_production_min$2 = {};

'use strict';

var b$2 = "function" === typeof Symbol && Symbol.for,
    c$2 = b$2 ? Symbol.for("react.element") : 60103,
    d$2 = b$2 ? Symbol.for("react.portal") : 60106,
    e$4 = b$2 ? Symbol.for("react.fragment") : 60107,
    f$2 = b$2 ? Symbol.for("react.strict_mode") : 60108,
    g$2 = b$2 ? Symbol.for("react.profiler") : 60114,
    h$2 = b$2 ? Symbol.for("react.provider") : 60109,
    k$2 = b$2 ? Symbol.for("react.context") : 60110,
    l$2 = b$2 ? Symbol.for("react.async_mode") : 60111,
    m$3 = b$2 ? Symbol.for("react.concurrent_mode") : 60111,
    n$2 = b$2 ? Symbol.for("react.forward_ref") : 60112,
    p$2 = b$2 ? Symbol.for("react.suspense") : 60113,
    q$2 = b$2 ? Symbol.for("react.suspense_list") : 60120,
    r$2 = b$2 ? Symbol.for("react.memo") : 60115,
    t$1 = b$2 ? Symbol.for("react.lazy") : 60116,
    v$2 = b$2 ? Symbol.for("react.block") : 60121,
    w$2 = b$2 ? Symbol.for("react.fundamental") : 60117,
    x$2 = b$2 ? Symbol.for("react.responder") : 60118,
    y$2 = b$2 ? Symbol.for("react.scope") : 60119;

function z$2(a) {
  if ("object" === _typeof$2(a) && null !== a) {
    var u = a.$$typeof;

    switch (u) {
      case c$2:
        switch (a = a.type, a) {
          case l$2:
          case m$3:
          case e$4:
          case g$2:
          case f$2:
          case p$2:
            return a;

          default:
            switch (a = a && a.$$typeof, a) {
              case k$2:
              case n$2:
              case t$1:
              case r$2:
              case h$2:
                return a;

              default:
                return u;
            }

        }

      case d$2:
        return u;
    }
  }
}

function A$2(a) {
  return z$2(a) === m$3;
}

var AsyncMode$1 = reactIs_production_min$2.AsyncMode = l$2;
var ConcurrentMode$1 = reactIs_production_min$2.ConcurrentMode = m$3;
var ContextConsumer$2 = reactIs_production_min$2.ContextConsumer = k$2;
var ContextProvider$2 = reactIs_production_min$2.ContextProvider = h$2;
var Element$3 = reactIs_production_min$2.Element = c$2;
var ForwardRef$2 = reactIs_production_min$2.ForwardRef = n$2;
var Fragment$2 = reactIs_production_min$2.Fragment = e$4;
var Lazy$2 = reactIs_production_min$2.Lazy = t$1;
var Memo$2 = reactIs_production_min$2.Memo = r$2;
var Portal$2 = reactIs_production_min$2.Portal = d$2;
var Profiler$2 = reactIs_production_min$2.Profiler = g$2;
var StrictMode$2 = reactIs_production_min$2.StrictMode = f$2;
var Suspense$2 = reactIs_production_min$2.Suspense = p$2;

var isAsyncMode$2 = reactIs_production_min$2.isAsyncMode = function (a) {
  return A$2(a) || z$2(a) === l$2;
};

var isConcurrentMode$2 = reactIs_production_min$2.isConcurrentMode = A$2;

var isContextConsumer$2 = reactIs_production_min$2.isContextConsumer = function (a) {
  return z$2(a) === k$2;
};

var isContextProvider$2 = reactIs_production_min$2.isContextProvider = function (a) {
  return z$2(a) === h$2;
};

var isElement$2 = reactIs_production_min$2.isElement = function (a) {
  return "object" === _typeof$2(a) && null !== a && a.$$typeof === c$2;
};

var isForwardRef$2 = reactIs_production_min$2.isForwardRef = function (a) {
  return z$2(a) === n$2;
};

var isFragment$2 = reactIs_production_min$2.isFragment = function (a) {
  return z$2(a) === e$4;
};

var isLazy$2 = reactIs_production_min$2.isLazy = function (a) {
  return z$2(a) === t$1;
};

var isMemo$2 = reactIs_production_min$2.isMemo = function (a) {
  return z$2(a) === r$2;
};

var isPortal$2 = reactIs_production_min$2.isPortal = function (a) {
  return z$2(a) === d$2;
};

var isProfiler$2 = reactIs_production_min$2.isProfiler = function (a) {
  return z$2(a) === g$2;
};

var isStrictMode$2 = reactIs_production_min$2.isStrictMode = function (a) {
  return z$2(a) === f$2;
};

var isSuspense$2 = reactIs_production_min$2.isSuspense = function (a) {
  return z$2(a) === p$2;
};

var isValidElementType$2 = reactIs_production_min$2.isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e$4 || a === m$3 || a === g$2 || a === f$2 || a === p$2 || a === q$2 || "object" === _typeof$2(a) && null !== a && (a.$$typeof === t$1 || a.$$typeof === r$2 || a.$$typeof === h$2 || a.$$typeof === k$2 || a.$$typeof === n$2 || a.$$typeof === w$2 || a.$$typeof === x$2 || a.$$typeof === y$2 || a.$$typeof === v$2);
};

var typeOf$2 = reactIs_production_min$2.typeOf = z$2;

var reactIs_development$2 = {};

var typeOf_1$2;
var isValidElementType_1$2;
var isSuspense_1$2;
var isStrictMode_1$2;
var isProfiler_1$2;
var isPortal_1$2;
var isMemo_1$2;
var isLazy_1$2;
var isFragment_1$2;
var isForwardRef_1$2;
var isElement_1$2;
var isContextProvider_1$2;
var isContextConsumer_1$2;
var isConcurrentMode_1$2;
var isAsyncMode_1$2;
var Suspense_1$2;
var StrictMode_1$2;
var Profiler_1$2;
var Portal_1$2;
var Memo_1$2;
var Lazy_1$2;
var Fragment_1$2;
var ForwardRef_1$2;
var Element_1$2;
var ContextProvider_1$2;
var ContextConsumer_1$2;
var ConcurrentMode_1$1;
var AsyncMode_1$1;
'use strict';

if ("development" !== "production") {
  (function () {
    'use strict'; // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.

    var hasSymbol = typeof Symbol === 'function' && Symbol.for;
    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
    // (unstable) APIs that have been removed. Can we remove the symbols?

    var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
    var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
    var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
    var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
    var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
    var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
    var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
    var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
    var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
    var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

    function isValidElementType(type) {
      return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || _typeof$2(type) === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
    }

    function typeOf(object) {
      if (_typeof$2(object) === 'object' && object !== null) {
        var $$typeof = object.$$typeof;

        switch ($$typeof) {
          case REACT_ELEMENT_TYPE:
            var type = object.type;

            switch (type) {
              case REACT_ASYNC_MODE_TYPE:
              case REACT_CONCURRENT_MODE_TYPE:
              case REACT_FRAGMENT_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_SUSPENSE_TYPE:
                return type;

              default:
                var $$typeofType = type && type.$$typeof;

                switch ($$typeofType) {
                  case REACT_CONTEXT_TYPE:
                  case REACT_FORWARD_REF_TYPE:
                  case REACT_LAZY_TYPE:
                  case REACT_MEMO_TYPE:
                  case REACT_PROVIDER_TYPE:
                    return $$typeofType;

                  default:
                    return $$typeof;
                }

            }

          case REACT_PORTAL_TYPE:
            return $$typeof;
        }
      }

      return undefined;
    } // AsyncMode is deprecated along with isAsyncMode


    var AsyncMode = REACT_ASYNC_MODE_TYPE;
    var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
    var ContextConsumer = REACT_CONTEXT_TYPE;
    var ContextProvider = REACT_PROVIDER_TYPE;
    var Element = REACT_ELEMENT_TYPE;
    var ForwardRef = REACT_FORWARD_REF_TYPE;
    var Fragment = REACT_FRAGMENT_TYPE;
    var Lazy = REACT_LAZY_TYPE;
    var Memo = REACT_MEMO_TYPE;
    var Portal = REACT_PORTAL_TYPE;
    var Profiler = REACT_PROFILER_TYPE;
    var StrictMode = REACT_STRICT_MODE_TYPE;
    var Suspense = REACT_SUSPENSE_TYPE;
    var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

    function isAsyncMode(object) {
      {
        if (!hasWarnedAboutDeprecatedIsAsyncMode) {
          hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

          console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
        }
      }
      return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
    }

    function isConcurrentMode(object) {
      return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
    }

    function isContextConsumer(object) {
      return typeOf(object) === REACT_CONTEXT_TYPE;
    }

    function isContextProvider(object) {
      return typeOf(object) === REACT_PROVIDER_TYPE;
    }

    function isElement(object) {
      return _typeof$2(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    function isForwardRef(object) {
      return typeOf(object) === REACT_FORWARD_REF_TYPE;
    }

    function isFragment(object) {
      return typeOf(object) === REACT_FRAGMENT_TYPE;
    }

    function isLazy(object) {
      return typeOf(object) === REACT_LAZY_TYPE;
    }

    function isMemo(object) {
      return typeOf(object) === REACT_MEMO_TYPE;
    }

    function isPortal(object) {
      return typeOf(object) === REACT_PORTAL_TYPE;
    }

    function isProfiler(object) {
      return typeOf(object) === REACT_PROFILER_TYPE;
    }

    function isStrictMode(object) {
      return typeOf(object) === REACT_STRICT_MODE_TYPE;
    }

    function isSuspense(object) {
      return typeOf(object) === REACT_SUSPENSE_TYPE;
    }

    AsyncMode_1$1 = reactIs_development$2.AsyncMode = AsyncMode;
    ConcurrentMode_1$1 = reactIs_development$2.ConcurrentMode = ConcurrentMode;
    ContextConsumer_1$2 = reactIs_development$2.ContextConsumer = ContextConsumer;
    ContextProvider_1$2 = reactIs_development$2.ContextProvider = ContextProvider;
    Element_1$2 = reactIs_development$2.Element = Element;
    ForwardRef_1$2 = reactIs_development$2.ForwardRef = ForwardRef;
    Fragment_1$2 = reactIs_development$2.Fragment = Fragment;
    Lazy_1$2 = reactIs_development$2.Lazy = Lazy;
    Memo_1$2 = reactIs_development$2.Memo = Memo;
    Portal_1$2 = reactIs_development$2.Portal = Portal;
    Profiler_1$2 = reactIs_development$2.Profiler = Profiler;
    StrictMode_1$2 = reactIs_development$2.StrictMode = StrictMode;
    Suspense_1$2 = reactIs_development$2.Suspense = Suspense;
    isAsyncMode_1$2 = reactIs_development$2.isAsyncMode = isAsyncMode;
    isConcurrentMode_1$2 = reactIs_development$2.isConcurrentMode = isConcurrentMode;
    isContextConsumer_1$2 = reactIs_development$2.isContextConsumer = isContextConsumer;
    isContextProvider_1$2 = reactIs_development$2.isContextProvider = isContextProvider;
    isElement_1$2 = reactIs_development$2.isElement = isElement;
    isForwardRef_1$2 = reactIs_development$2.isForwardRef = isForwardRef;
    isFragment_1$2 = reactIs_development$2.isFragment = isFragment;
    isLazy_1$2 = reactIs_development$2.isLazy = isLazy;
    isMemo_1$2 = reactIs_development$2.isMemo = isMemo;
    isPortal_1$2 = reactIs_development$2.isPortal = isPortal;
    isProfiler_1$2 = reactIs_development$2.isProfiler = isProfiler;
    isStrictMode_1$2 = reactIs_development$2.isStrictMode = isStrictMode;
    isSuspense_1$2 = reactIs_development$2.isSuspense = isSuspense;
    isValidElementType_1$2 = reactIs_development$2.isValidElementType = isValidElementType;
    typeOf_1$2 = reactIs_development$2.typeOf = typeOf;
  })();
}

'use strict';

if ("development" === 'production') {
  reactIs$6.exports = reactIs_production_min$2;
} else {
  reactIs$6.exports = reactIs_development$2;
}

var reactIs$5 = reactIs$6.exports;

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
'use strict';
/* eslint-disable no-unused-vars */


var getOwnPropertySymbols$1 = Object.getOwnPropertySymbols;
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty$1.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols$1) {
      symbols = getOwnPropertySymbols$1(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

var ReactPropTypesSecret$3 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
var ReactPropTypesSecret_1 = ReactPropTypesSecret$3;

var has$2 = Function.call.bind(Object.prototype.hasOwnProperty);

'use strict';

var printWarning$1 = function printWarning() {};

if ("development" !== 'production') {
  var ReactPropTypesSecret$2 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has$1 = has$2;

  printWarning$1 = function printWarning(text) {
    var message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {
      /**/
    }
  };
}
/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */


function checkPropTypes$1(typeSpecs, values, location, componentName, getStack) {
  if ("development" !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has$1(typeSpecs, typeSpecName)) {
        var error; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + _typeof$2(typeSpecs[typeSpecName]) + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$2);
        } catch (ex) {
          error = ex;
        }

        if (error && !(error instanceof Error)) {
          printWarning$1((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + _typeof$2(error) + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
        }

        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;
          var stack = getStack ? getStack() : '';
          printWarning$1('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
        }
      }
    }
  }
}
/**
 * Resets warning cache when testing.
 *
 * @private
 */


checkPropTypes$1.resetWarningCache = function () {
  if ("development" !== 'production') {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes$1;

'use strict';

var ReactIs$1 = reactIs$6.exports;
var assign = objectAssign;
var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
var has = has$2;
var checkPropTypes = checkPropTypes_1;

var printWarning = function printWarning() {};

if ("development" !== 'production') {
  printWarning = function printWarning(text) {
    var message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function factoryWithTypeCheckers(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */

  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);

    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }
  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */


  var ANONYMOUS = '<<anonymous>>'; // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.

  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),
    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };
  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */

  /*eslint-disable no-self-compare*/

  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */


  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && _typeof$2(data) === 'object' ? data : {};
    this.stack = '';
  } // Make `instanceof Error` still work for returned errors.


  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if ("development" !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }

    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret$1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
          err.name = 'Invariant Violation';
          throw err;
        } else if ("development" !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;

          if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            printWarning('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }

      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }

          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }

        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'), {
          expectedType: expectedType
        });
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }

      var propValue = props[propName];

      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }

      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret$1);

        if (error instanceof Error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      if (!ReactIs$1.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if ("development" !== 'production') {
        if (arguments.length > 1) {
          printWarning('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }

      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);

        if (type === 'symbol') {
          return String(value);
        }

        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }

    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }

      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }

      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);

          if (error instanceof Error) {
            return error;
          }
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      "development" !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];

      if (typeof checker !== 'function') {
        printWarning('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];

      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret$1);

        if (checkerResult == null) {
          return null;
        }

        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }

      var expectedTypesMessage = expectedTypes.length > 0 ? ', expected one of type [' + expectedTypes.join(', ') + ']' : '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }

    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError((componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + type + '`.');
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }

      for (var key in shapeTypes) {
        var checker = shapeTypes[key];

        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }

        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);

        if (error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      } // We need to check all keys in case some are required but missing from props.


      var allKeys = assign({}, props[propName], shapeTypes);

      for (var key in allKeys) {
        var checker = shapeTypes[key];

        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }

        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }

        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);

        if (error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (_typeof$2(propValue)) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;

      case 'boolean':
        return !propValue;

      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }

        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);

        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;

          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;

              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;

      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    } // falsy value can't be a Symbol


    if (!propValue) {
      return false;
    } // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'


    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    } // Fallback for non-spec compliant Symbols which are polyfilled.


    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  } // Equivalent of `typeof` but with special handling for array and regexp.


  function getPropType(propValue) {
    var propType = _typeof$2(propValue);

    if (Array.isArray(propValue)) {
      return 'array';
    }

    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }

    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }

    return propType;
  } // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.


  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }

    var propType = getPropType(propValue);

    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }

    return propType;
  } // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"


  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);

    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;

      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;

      default:
        return type;
    }
  } // Returns class name of the object, if any.


  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }

    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

var ReactPropTypesSecret = ReactPropTypesSecret_1;

function emptyFunction() {}

function emptyFunctionWithReset() {}

emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function factoryWithThrowingShims() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }

    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  }

  ;
  shim.isRequired = shim;

  function getShim() {
    return shim;
  }

  ; // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.

  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if ("development" !== 'production') {
  var ReactIs = reactIs$6.exports; // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod

  var throwOnDirectAccess = true;
  propTypes.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  propTypes.exports = factoryWithThrowingShims();
}

var PropTypes = propTypes.exports;

var ReactReduxContext = /*#__PURE__*/React.createContext(null);

if ("development" !== 'production') {
  ReactReduxContext.displayName = 'ReactRedux';
}

// Default to a dummy "batch" implementation that just runs the callback
function defaultNoopBatch(callback) {
  callback();
}

var batch = defaultNoopBatch; // Allow injecting another batching function later

var setBatch = function setBatch(newBatch) {
  return batch = newBatch;
}; // Supply a getter just to skip dealing with ESM bindings

var getBatch = function getBatch() {
  return batch;
};

// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

function createListenerCollection() {
  var batch = getBatch();
  var first = null;
  var last = null;
  return {
    clear: function clear() {
      first = null;
      last = null;
    },
    notify: function notify() {
      batch(function () {
        var listener = first;

        while (listener) {
          listener.callback();
          listener = listener.next;
        }
      });
    },
    get: function get() {
      var listeners = [];
      var listener = first;

      while (listener) {
        listeners.push(listener);
        listener = listener.next;
      }

      return listeners;
    },
    subscribe: function subscribe(callback) {
      var isSubscribed = true;
      var listener = last = {
        callback: callback,
        next: null,
        prev: last
      };

      if (listener.prev) {
        listener.prev.next = listener;
      } else {
        first = listener;
      }

      return function unsubscribe() {
        if (!isSubscribed || first === null) return;
        isSubscribed = false;

        if (listener.next) {
          listener.next.prev = listener.prev;
        } else {
          last = listener.prev;
        }

        if (listener.prev) {
          listener.prev.next = listener.next;
        } else {
          first = listener.next;
        }
      };
    }
  };
}

var nullListeners = {
  notify: function notify() {},
  get: function get() {
    return [];
  }
};
function createSubscription(store, parentSub) {
  var unsubscribe;
  var listeners = nullListeners;

  function addNestedSub(listener) {
    trySubscribe();
    return listeners.subscribe(listener);
  }

  function notifyNestedSubs() {
    listeners.notify();
  }

  function handleChangeWrapper() {
    if (subscription.onStateChange) {
      subscription.onStateChange();
    }
  }

  function isSubscribed() {
    return Boolean(unsubscribe);
  }

  function trySubscribe() {
    if (!unsubscribe) {
      unsubscribe = parentSub ? parentSub.addNestedSub(handleChangeWrapper) : store.subscribe(handleChangeWrapper);
      listeners = createListenerCollection();
    }
  }

  function tryUnsubscribe() {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = undefined;
      listeners.clear();
      listeners = nullListeners;
    }
  }

  var subscription = {
    addNestedSub: addNestedSub,
    notifyNestedSubs: notifyNestedSubs,
    handleChangeWrapper: handleChangeWrapper,
    isSubscribed: isSubscribed,
    trySubscribe: trySubscribe,
    tryUnsubscribe: tryUnsubscribe,
    getListeners: function getListeners() {
      return listeners;
    }
  };
  return subscription;
}

// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser. We need useLayoutEffect to ensure the store
// subscription callback always has the selector from the latest render commit
// available, otherwise a store update may happen between render and the effect,
// which may cause missed updates; we also must ensure the store subscription
// is created synchronously, otherwise a store update may occur before the
// subscription is created and an inconsistent state may be observed

var useIsomorphicLayoutEffect = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined' ? d$3 : y$3;

function Provider(_ref) {
  var store = _ref.store,
      context = _ref.context,
      children = _ref.children;
  var contextValue = _(function () {
    var subscription = createSubscription(store);
    return {
      store: store,
      subscription: subscription
    };
  }, [store]);
  var previousState = _(function () {
    return store.getState();
  }, [store]);
  useIsomorphicLayoutEffect(function () {
    var subscription = contextValue.subscription;
    subscription.onStateChange = subscription.notifyNestedSubs;
    subscription.trySubscribe();

    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs();
    }

    return function () {
      subscription.tryUnsubscribe();
      subscription.onStateChange = null;
    };
  }, [contextValue, previousState]);
  var Context = context || ReactReduxContext;
  return /*#__PURE__*/React.createElement(Context.Provider, {
    value: contextValue
  }, children);
}

if ("development" !== 'production') {
  Provider.propTypes = {
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired
    }),
    context: PropTypes.object,
    children: PropTypes.any
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var reactIs$4 = {exports: {}};

var reactIs_production_min$1 = {};

'use strict';

var b$1 = "function" === typeof Symbol && Symbol.for,
    c$1 = b$1 ? Symbol.for("react.element") : 60103,
    d$1 = b$1 ? Symbol.for("react.portal") : 60106,
    e$3 = b$1 ? Symbol.for("react.fragment") : 60107,
    f$1 = b$1 ? Symbol.for("react.strict_mode") : 60108,
    g$1 = b$1 ? Symbol.for("react.profiler") : 60114,
    h$1 = b$1 ? Symbol.for("react.provider") : 60109,
    k$1 = b$1 ? Symbol.for("react.context") : 60110,
    l$1 = b$1 ? Symbol.for("react.async_mode") : 60111,
    m$2 = b$1 ? Symbol.for("react.concurrent_mode") : 60111,
    n$1 = b$1 ? Symbol.for("react.forward_ref") : 60112,
    p$1 = b$1 ? Symbol.for("react.suspense") : 60113,
    q$1 = b$1 ? Symbol.for("react.suspense_list") : 60120,
    r$1 = b$1 ? Symbol.for("react.memo") : 60115,
    t = b$1 ? Symbol.for("react.lazy") : 60116,
    v$1 = b$1 ? Symbol.for("react.block") : 60121,
    w$1 = b$1 ? Symbol.for("react.fundamental") : 60117,
    x$1 = b$1 ? Symbol.for("react.responder") : 60118,
    y$1 = b$1 ? Symbol.for("react.scope") : 60119;

function z$1(a) {
  if ("object" === _typeof$2(a) && null !== a) {
    var u = a.$$typeof;

    switch (u) {
      case c$1:
        switch (a = a.type, a) {
          case l$1:
          case m$2:
          case e$3:
          case g$1:
          case f$1:
          case p$1:
            return a;

          default:
            switch (a = a && a.$$typeof, a) {
              case k$1:
              case n$1:
              case t:
              case r$1:
              case h$1:
                return a;

              default:
                return u;
            }

        }

      case d$1:
        return u;
    }
  }
}

function A$1(a) {
  return z$1(a) === m$2;
}

var AsyncMode = reactIs_production_min$1.AsyncMode = l$1;
var ConcurrentMode = reactIs_production_min$1.ConcurrentMode = m$2;
var ContextConsumer$1 = reactIs_production_min$1.ContextConsumer = k$1;
var ContextProvider$1 = reactIs_production_min$1.ContextProvider = h$1;
var Element$2 = reactIs_production_min$1.Element = c$1;
var ForwardRef$1 = reactIs_production_min$1.ForwardRef = n$1;
var Fragment$1 = reactIs_production_min$1.Fragment = e$3;
var Lazy$1 = reactIs_production_min$1.Lazy = t;
var Memo$1 = reactIs_production_min$1.Memo = r$1;
var Portal$1 = reactIs_production_min$1.Portal = d$1;
var Profiler$1 = reactIs_production_min$1.Profiler = g$1;
var StrictMode$1 = reactIs_production_min$1.StrictMode = f$1;
var Suspense$1 = reactIs_production_min$1.Suspense = p$1;

var isAsyncMode$1 = reactIs_production_min$1.isAsyncMode = function (a) {
  return A$1(a) || z$1(a) === l$1;
};

var isConcurrentMode$1 = reactIs_production_min$1.isConcurrentMode = A$1;

var isContextConsumer$1 = reactIs_production_min$1.isContextConsumer = function (a) {
  return z$1(a) === k$1;
};

var isContextProvider$1 = reactIs_production_min$1.isContextProvider = function (a) {
  return z$1(a) === h$1;
};

var isElement$1 = reactIs_production_min$1.isElement = function (a) {
  return "object" === _typeof$2(a) && null !== a && a.$$typeof === c$1;
};

var isForwardRef$1 = reactIs_production_min$1.isForwardRef = function (a) {
  return z$1(a) === n$1;
};

var isFragment$1 = reactIs_production_min$1.isFragment = function (a) {
  return z$1(a) === e$3;
};

var isLazy$1 = reactIs_production_min$1.isLazy = function (a) {
  return z$1(a) === t;
};

var isMemo$1 = reactIs_production_min$1.isMemo = function (a) {
  return z$1(a) === r$1;
};

var isPortal$1 = reactIs_production_min$1.isPortal = function (a) {
  return z$1(a) === d$1;
};

var isProfiler$1 = reactIs_production_min$1.isProfiler = function (a) {
  return z$1(a) === g$1;
};

var isStrictMode$1 = reactIs_production_min$1.isStrictMode = function (a) {
  return z$1(a) === f$1;
};

var isSuspense$1 = reactIs_production_min$1.isSuspense = function (a) {
  return z$1(a) === p$1;
};

var isValidElementType$1 = reactIs_production_min$1.isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e$3 || a === m$2 || a === g$1 || a === f$1 || a === p$1 || a === q$1 || "object" === _typeof$2(a) && null !== a && (a.$$typeof === t || a.$$typeof === r$1 || a.$$typeof === h$1 || a.$$typeof === k$1 || a.$$typeof === n$1 || a.$$typeof === w$1 || a.$$typeof === x$1 || a.$$typeof === y$1 || a.$$typeof === v$1);
};

var typeOf$1 = reactIs_production_min$1.typeOf = z$1;

var reactIs_development$1 = {};

var typeOf_1$1;
var isValidElementType_1$1;
var isSuspense_1$1;
var isStrictMode_1$1;
var isProfiler_1$1;
var isPortal_1$1;
var isMemo_1$1;
var isLazy_1$1;
var isFragment_1$1;
var isForwardRef_1$1;
var isElement_1$1;
var isContextProvider_1$1;
var isContextConsumer_1$1;
var isConcurrentMode_1$1;
var isAsyncMode_1$1;
var Suspense_1$1;
var StrictMode_1$1;
var Profiler_1$1;
var Portal_1$1;
var Memo_1$1;
var Lazy_1$1;
var Fragment_1$1;
var ForwardRef_1$1;
var Element_1$1;
var ContextProvider_1$1;
var ContextConsumer_1$1;
var ConcurrentMode_1;
var AsyncMode_1;
'use strict';

if ("development" !== "production") {
  (function () {
    'use strict'; // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.

    var hasSymbol = typeof Symbol === 'function' && Symbol.for;
    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
    // (unstable) APIs that have been removed. Can we remove the symbols?

    var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
    var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
    var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
    var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
    var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
    var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
    var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
    var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
    var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
    var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

    function isValidElementType(type) {
      return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || _typeof$2(type) === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
    }

    function typeOf(object) {
      if (_typeof$2(object) === 'object' && object !== null) {
        var $$typeof = object.$$typeof;

        switch ($$typeof) {
          case REACT_ELEMENT_TYPE:
            var type = object.type;

            switch (type) {
              case REACT_ASYNC_MODE_TYPE:
              case REACT_CONCURRENT_MODE_TYPE:
              case REACT_FRAGMENT_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_SUSPENSE_TYPE:
                return type;

              default:
                var $$typeofType = type && type.$$typeof;

                switch ($$typeofType) {
                  case REACT_CONTEXT_TYPE:
                  case REACT_FORWARD_REF_TYPE:
                  case REACT_LAZY_TYPE:
                  case REACT_MEMO_TYPE:
                  case REACT_PROVIDER_TYPE:
                    return $$typeofType;

                  default:
                    return $$typeof;
                }

            }

          case REACT_PORTAL_TYPE:
            return $$typeof;
        }
      }

      return undefined;
    } // AsyncMode is deprecated along with isAsyncMode


    var AsyncMode = REACT_ASYNC_MODE_TYPE;
    var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
    var ContextConsumer = REACT_CONTEXT_TYPE;
    var ContextProvider = REACT_PROVIDER_TYPE;
    var Element = REACT_ELEMENT_TYPE;
    var ForwardRef = REACT_FORWARD_REF_TYPE;
    var Fragment = REACT_FRAGMENT_TYPE;
    var Lazy = REACT_LAZY_TYPE;
    var Memo = REACT_MEMO_TYPE;
    var Portal = REACT_PORTAL_TYPE;
    var Profiler = REACT_PROFILER_TYPE;
    var StrictMode = REACT_STRICT_MODE_TYPE;
    var Suspense = REACT_SUSPENSE_TYPE;
    var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

    function isAsyncMode(object) {
      {
        if (!hasWarnedAboutDeprecatedIsAsyncMode) {
          hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

          console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
        }
      }
      return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
    }

    function isConcurrentMode(object) {
      return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
    }

    function isContextConsumer(object) {
      return typeOf(object) === REACT_CONTEXT_TYPE;
    }

    function isContextProvider(object) {
      return typeOf(object) === REACT_PROVIDER_TYPE;
    }

    function isElement(object) {
      return _typeof$2(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    function isForwardRef(object) {
      return typeOf(object) === REACT_FORWARD_REF_TYPE;
    }

    function isFragment(object) {
      return typeOf(object) === REACT_FRAGMENT_TYPE;
    }

    function isLazy(object) {
      return typeOf(object) === REACT_LAZY_TYPE;
    }

    function isMemo(object) {
      return typeOf(object) === REACT_MEMO_TYPE;
    }

    function isPortal(object) {
      return typeOf(object) === REACT_PORTAL_TYPE;
    }

    function isProfiler(object) {
      return typeOf(object) === REACT_PROFILER_TYPE;
    }

    function isStrictMode(object) {
      return typeOf(object) === REACT_STRICT_MODE_TYPE;
    }

    function isSuspense(object) {
      return typeOf(object) === REACT_SUSPENSE_TYPE;
    }

    AsyncMode_1 = reactIs_development$1.AsyncMode = AsyncMode;
    ConcurrentMode_1 = reactIs_development$1.ConcurrentMode = ConcurrentMode;
    ContextConsumer_1$1 = reactIs_development$1.ContextConsumer = ContextConsumer;
    ContextProvider_1$1 = reactIs_development$1.ContextProvider = ContextProvider;
    Element_1$1 = reactIs_development$1.Element = Element;
    ForwardRef_1$1 = reactIs_development$1.ForwardRef = ForwardRef;
    Fragment_1$1 = reactIs_development$1.Fragment = Fragment;
    Lazy_1$1 = reactIs_development$1.Lazy = Lazy;
    Memo_1$1 = reactIs_development$1.Memo = Memo;
    Portal_1$1 = reactIs_development$1.Portal = Portal;
    Profiler_1$1 = reactIs_development$1.Profiler = Profiler;
    StrictMode_1$1 = reactIs_development$1.StrictMode = StrictMode;
    Suspense_1$1 = reactIs_development$1.Suspense = Suspense;
    isAsyncMode_1$1 = reactIs_development$1.isAsyncMode = isAsyncMode;
    isConcurrentMode_1$1 = reactIs_development$1.isConcurrentMode = isConcurrentMode;
    isContextConsumer_1$1 = reactIs_development$1.isContextConsumer = isContextConsumer;
    isContextProvider_1$1 = reactIs_development$1.isContextProvider = isContextProvider;
    isElement_1$1 = reactIs_development$1.isElement = isElement;
    isForwardRef_1$1 = reactIs_development$1.isForwardRef = isForwardRef;
    isFragment_1$1 = reactIs_development$1.isFragment = isFragment;
    isLazy_1$1 = reactIs_development$1.isLazy = isLazy;
    isMemo_1$1 = reactIs_development$1.isMemo = isMemo;
    isPortal_1$1 = reactIs_development$1.isPortal = isPortal;
    isProfiler_1$1 = reactIs_development$1.isProfiler = isProfiler;
    isStrictMode_1$1 = reactIs_development$1.isStrictMode = isStrictMode;
    isSuspense_1$1 = reactIs_development$1.isSuspense = isSuspense;
    isValidElementType_1$1 = reactIs_development$1.isValidElementType = isValidElementType;
    typeOf_1$1 = reactIs_development$1.typeOf = typeOf;
  })();
}

'use strict';

if ("development" === 'production') {
  reactIs$4.exports = reactIs_production_min$1;
} else {
  reactIs$4.exports = reactIs_development$1;
}

var reactIs$3 = reactIs$4.exports;

'use strict';

var reactIs$2 = reactIs$4.exports;
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs$2.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs$2.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs$2.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

var hoistNonReactStatics_cjs = hoistNonReactStatics;

var reactIs$1 = {exports: {}};

var reactIs_production_min = {};

'use strict';

var b = 60103,
    c = 60106,
    d = 60107,
    e$2 = 60108,
    f = 60114,
    g = 60109,
    h = 60110,
    k = 60112,
    l = 60113,
    m$1 = 60120,
    n = 60115,
    p = 60116,
    q = 60121,
    r = 60122,
    u = 60117,
    v = 60129,
    w = 60131;

if ("function" === typeof Symbol && Symbol.for) {
  var x = Symbol.for;
  b = x("react.element");
  c = x("react.portal");
  d = x("react.fragment");
  e$2 = x("react.strict_mode");
  f = x("react.profiler");
  g = x("react.provider");
  h = x("react.context");
  k = x("react.forward_ref");
  l = x("react.suspense");
  m$1 = x("react.suspense_list");
  n = x("react.memo");
  p = x("react.lazy");
  q = x("react.block");
  r = x("react.server.block");
  u = x("react.fundamental");
  v = x("react.debug_trace_mode");
  w = x("react.legacy_hidden");
}

function y(a) {
  if ("object" === _typeof$2(a) && null !== a) {
    var t = a.$$typeof;

    switch (t) {
      case b:
        switch (a = a.type, a) {
          case d:
          case f:
          case e$2:
          case l:
          case m$1:
            return a;

          default:
            switch (a = a && a.$$typeof, a) {
              case h:
              case k:
              case p:
              case n:
              case g:
                return a;

              default:
                return t;
            }

        }

      case c:
        return t;
    }
  }
}

var z = g,
    A = b,
    B = k,
    C = d,
    D = p,
    E = n,
    F = c,
    G$1 = f,
    H = e$2,
    I = l;
var ContextConsumer = reactIs_production_min.ContextConsumer = h;
var ContextProvider = reactIs_production_min.ContextProvider = z;
var Element$1 = reactIs_production_min.Element = A;
var ForwardRef = reactIs_production_min.ForwardRef = B;
var Fragment = reactIs_production_min.Fragment = C;
var Lazy = reactIs_production_min.Lazy = D;
var Memo = reactIs_production_min.Memo = E;
var Portal = reactIs_production_min.Portal = F;
var Profiler = reactIs_production_min.Profiler = G$1;
var StrictMode = reactIs_production_min.StrictMode = H;
var Suspense = reactIs_production_min.Suspense = I;

var isAsyncMode = reactIs_production_min.isAsyncMode = function () {
  return !1;
};

var isConcurrentMode = reactIs_production_min.isConcurrentMode = function () {
  return !1;
};

var isContextConsumer = reactIs_production_min.isContextConsumer = function (a) {
  return y(a) === h;
};

var isContextProvider = reactIs_production_min.isContextProvider = function (a) {
  return y(a) === g;
};

var isElement = reactIs_production_min.isElement = function (a) {
  return "object" === _typeof$2(a) && null !== a && a.$$typeof === b;
};

var isForwardRef = reactIs_production_min.isForwardRef = function (a) {
  return y(a) === k;
};

var isFragment = reactIs_production_min.isFragment = function (a) {
  return y(a) === d;
};

var isLazy = reactIs_production_min.isLazy = function (a) {
  return y(a) === p;
};

var isMemo = reactIs_production_min.isMemo = function (a) {
  return y(a) === n;
};

var isPortal = reactIs_production_min.isPortal = function (a) {
  return y(a) === c;
};

var isProfiler = reactIs_production_min.isProfiler = function (a) {
  return y(a) === f;
};

var isStrictMode = reactIs_production_min.isStrictMode = function (a) {
  return y(a) === e$2;
};

var isSuspense = reactIs_production_min.isSuspense = function (a) {
  return y(a) === l;
};

var isValidElementType = reactIs_production_min.isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === d || a === f || a === v || a === e$2 || a === l || a === m$1 || a === w || "object" === _typeof$2(a) && null !== a && (a.$$typeof === p || a.$$typeof === n || a.$$typeof === g || a.$$typeof === h || a.$$typeof === k || a.$$typeof === u || a.$$typeof === q || a[0] === r) ? !0 : !1;
};

var typeOf = reactIs_production_min.typeOf = y;

var reactIs_development = {};

var typeOf_1;
var isValidElementType_1;
var isSuspense_1;
var isStrictMode_1;
var isProfiler_1;
var isPortal_1;
var isMemo_1;
var isLazy_1;
var isFragment_1;
var isForwardRef_1;
var isElement_1;
var isContextProvider_1;
var isContextConsumer_1;
var isConcurrentMode_1;
var isAsyncMode_1;
var Suspense_1;
var StrictMode_1;
var Profiler_1;
var Portal_1;
var Memo_1;
var Lazy_1;
var Fragment_1;
var ForwardRef_1;
var Element_1;
var ContextProvider_1;
var ContextConsumer_1;
'use strict';

if ("development" !== "production") {
  (function () {
    'use strict'; // ATTENTION
    // When adding new symbols to this file,
    // Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
    // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.

    var REACT_ELEMENT_TYPE = 0xeac7;
    var REACT_PORTAL_TYPE = 0xeaca;
    var REACT_FRAGMENT_TYPE = 0xeacb;
    var REACT_STRICT_MODE_TYPE = 0xeacc;
    var REACT_PROFILER_TYPE = 0xead2;
    var REACT_PROVIDER_TYPE = 0xeacd;
    var REACT_CONTEXT_TYPE = 0xeace;
    var REACT_FORWARD_REF_TYPE = 0xead0;
    var REACT_SUSPENSE_TYPE = 0xead1;
    var REACT_SUSPENSE_LIST_TYPE = 0xead8;
    var REACT_MEMO_TYPE = 0xead3;
    var REACT_LAZY_TYPE = 0xead4;
    var REACT_BLOCK_TYPE = 0xead9;
    var REACT_SERVER_BLOCK_TYPE = 0xeada;
    var REACT_FUNDAMENTAL_TYPE = 0xead5;
    var REACT_SCOPE_TYPE = 0xead7;
    var REACT_OPAQUE_ID_TYPE = 0xeae0;
    var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
    var REACT_OFFSCREEN_TYPE = 0xeae2;
    var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

    if (typeof Symbol === 'function' && Symbol.for) {
      var symbolFor = Symbol.for;
      REACT_ELEMENT_TYPE = symbolFor('react.element');
      REACT_PORTAL_TYPE = symbolFor('react.portal');
      REACT_FRAGMENT_TYPE = symbolFor('react.fragment');
      REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
      REACT_PROFILER_TYPE = symbolFor('react.profiler');
      REACT_PROVIDER_TYPE = symbolFor('react.provider');
      REACT_CONTEXT_TYPE = symbolFor('react.context');
      REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
      REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
      REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
      REACT_MEMO_TYPE = symbolFor('react.memo');
      REACT_LAZY_TYPE = symbolFor('react.lazy');
      REACT_BLOCK_TYPE = symbolFor('react.block');
      REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
      REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
      REACT_SCOPE_TYPE = symbolFor('react.scope');
      REACT_OPAQUE_ID_TYPE = symbolFor('react.opaque.id');
      REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
      REACT_OFFSCREEN_TYPE = symbolFor('react.offscreen');
      REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
    } // Filter certain DOM attributes (e.g. src, href) if their values are empty strings.


    var enableScopeAPI = false; // Experimental Create Event Handle API.

    function isValidElementType(type) {
      if (typeof type === 'string' || typeof type === 'function') {
        return true;
      } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


      if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
        return true;
      }

      if (_typeof$2(type) === 'object' && type !== null) {
        if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
          return true;
        }
      }

      return false;
    }

    function typeOf(object) {
      if (_typeof$2(object) === 'object' && object !== null) {
        var $$typeof = object.$$typeof;

        switch ($$typeof) {
          case REACT_ELEMENT_TYPE:
            var type = object.type;

            switch (type) {
              case REACT_FRAGMENT_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_SUSPENSE_TYPE:
              case REACT_SUSPENSE_LIST_TYPE:
                return type;

              default:
                var $$typeofType = type && type.$$typeof;

                switch ($$typeofType) {
                  case REACT_CONTEXT_TYPE:
                  case REACT_FORWARD_REF_TYPE:
                  case REACT_LAZY_TYPE:
                  case REACT_MEMO_TYPE:
                  case REACT_PROVIDER_TYPE:
                    return $$typeofType;

                  default:
                    return $$typeof;
                }

            }

          case REACT_PORTAL_TYPE:
            return $$typeof;
        }
      }

      return undefined;
    }

    var ContextConsumer = REACT_CONTEXT_TYPE;
    var ContextProvider = REACT_PROVIDER_TYPE;
    var Element = REACT_ELEMENT_TYPE;
    var ForwardRef = REACT_FORWARD_REF_TYPE;
    var Fragment = REACT_FRAGMENT_TYPE;
    var Lazy = REACT_LAZY_TYPE;
    var Memo = REACT_MEMO_TYPE;
    var Portal = REACT_PORTAL_TYPE;
    var Profiler = REACT_PROFILER_TYPE;
    var StrictMode = REACT_STRICT_MODE_TYPE;
    var Suspense = REACT_SUSPENSE_TYPE;
    var hasWarnedAboutDeprecatedIsAsyncMode = false;
    var hasWarnedAboutDeprecatedIsConcurrentMode = false; // AsyncMode should be deprecated

    function isAsyncMode(object) {
      {
        if (!hasWarnedAboutDeprecatedIsAsyncMode) {
          hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

          console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
        }
      }
      return false;
    }

    function isConcurrentMode(object) {
      {
        if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
          hasWarnedAboutDeprecatedIsConcurrentMode = true; // Using console['warn'] to evade Babel and ESLint

          console['warn']('The ReactIs.isConcurrentMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
        }
      }
      return false;
    }

    function isContextConsumer(object) {
      return typeOf(object) === REACT_CONTEXT_TYPE;
    }

    function isContextProvider(object) {
      return typeOf(object) === REACT_PROVIDER_TYPE;
    }

    function isElement(object) {
      return _typeof$2(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    function isForwardRef(object) {
      return typeOf(object) === REACT_FORWARD_REF_TYPE;
    }

    function isFragment(object) {
      return typeOf(object) === REACT_FRAGMENT_TYPE;
    }

    function isLazy(object) {
      return typeOf(object) === REACT_LAZY_TYPE;
    }

    function isMemo(object) {
      return typeOf(object) === REACT_MEMO_TYPE;
    }

    function isPortal(object) {
      return typeOf(object) === REACT_PORTAL_TYPE;
    }

    function isProfiler(object) {
      return typeOf(object) === REACT_PROFILER_TYPE;
    }

    function isStrictMode(object) {
      return typeOf(object) === REACT_STRICT_MODE_TYPE;
    }

    function isSuspense(object) {
      return typeOf(object) === REACT_SUSPENSE_TYPE;
    }

    ContextConsumer_1 = reactIs_development.ContextConsumer = ContextConsumer;
    ContextProvider_1 = reactIs_development.ContextProvider = ContextProvider;
    Element_1 = reactIs_development.Element = Element;
    ForwardRef_1 = reactIs_development.ForwardRef = ForwardRef;
    Fragment_1 = reactIs_development.Fragment = Fragment;
    Lazy_1 = reactIs_development.Lazy = Lazy;
    Memo_1 = reactIs_development.Memo = Memo;
    Portal_1 = reactIs_development.Portal = Portal;
    Profiler_1 = reactIs_development.Profiler = Profiler;
    StrictMode_1 = reactIs_development.StrictMode = StrictMode;
    Suspense_1 = reactIs_development.Suspense = Suspense;
    isAsyncMode_1 = reactIs_development.isAsyncMode = isAsyncMode;
    isConcurrentMode_1 = reactIs_development.isConcurrentMode = isConcurrentMode;
    isContextConsumer_1 = reactIs_development.isContextConsumer = isContextConsumer;
    isContextProvider_1 = reactIs_development.isContextProvider = isContextProvider;
    isElement_1 = reactIs_development.isElement = isElement;
    isForwardRef_1 = reactIs_development.isForwardRef = isForwardRef;
    isFragment_1 = reactIs_development.isFragment = isFragment;
    isLazy_1 = reactIs_development.isLazy = isLazy;
    isMemo_1 = reactIs_development.isMemo = isMemo;
    isPortal_1 = reactIs_development.isPortal = isPortal;
    isProfiler_1 = reactIs_development.isProfiler = isProfiler;
    isStrictMode_1 = reactIs_development.isStrictMode = isStrictMode;
    isSuspense_1 = reactIs_development.isSuspense = isSuspense;
    isValidElementType_1 = reactIs_development.isValidElementType = isValidElementType;
    typeOf_1 = reactIs_development.typeOf = typeOf;
  })();
}

'use strict';

if ("development" === 'production') {
  reactIs$1.exports = reactIs_production_min;
} else {
  reactIs$1.exports = reactIs_development;
}

var reactIs = reactIs$1.exports;

var _excluded$4 = ["getDisplayName", "methodName", "renderCountProp", "shouldHandleStateChanges", "storeKey", "withRef", "forwardRef", "context"],
    _excluded2 = ["reactReduxForwardedRef"];

var EMPTY_ARRAY = [];
var NO_SUBSCRIPTION_ARRAY = [null, null];

var stringifyComponent = function stringifyComponent(Comp) {
  try {
    return JSON.stringify(Comp);
  } catch (err) {
    return String(Comp);
  }
};

function storeStateUpdatesReducer(state, action) {
  var updateCount = state[1];
  return [action.payload, updateCount + 1];
}

function useIsomorphicLayoutEffectWithArgs(effectFunc, effectArgs, dependencies) {
  useIsomorphicLayoutEffect(function () {
    return effectFunc.apply(void 0, effectArgs);
  }, dependencies);
}

function captureWrapperProps(lastWrapperProps, lastChildProps, renderIsScheduled, wrapperProps, actualChildProps, childPropsFromStoreUpdate, notifyNestedSubs) {
  // We want to capture the wrapper props and child props we used for later comparisons
  lastWrapperProps.current = wrapperProps;
  lastChildProps.current = actualChildProps;
  renderIsScheduled.current = false; // If the render was from a store update, clear out that reference and cascade the subscriber update

  if (childPropsFromStoreUpdate.current) {
    childPropsFromStoreUpdate.current = null;
    notifyNestedSubs();
  }
}

function subscribeUpdates(shouldHandleStateChanges, store, subscription, childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, childPropsFromStoreUpdate, notifyNestedSubs, forceComponentUpdateDispatch) {
  // If we're not subscribed to the store, nothing to do here
  if (!shouldHandleStateChanges) return; // Capture values for checking if and when this component unmounts

  var didUnsubscribe = false;
  var lastThrownError = null; // We'll run this callback every time a store subscription update propagates to this component

  var checkForUpdates = function checkForUpdates() {
    if (didUnsubscribe) {
      // Don't run stale listeners.
      // Redux doesn't guarantee unsubscriptions happen until next dispatch.
      return;
    }

    var latestStoreState = store.getState();
    var newChildProps, error;

    try {
      // Actually run the selector with the most recent store state and wrapper props
      // to determine what the child props should be
      newChildProps = childPropsSelector(latestStoreState, lastWrapperProps.current);
    } catch (e) {
      error = e;
      lastThrownError = e;
    }

    if (!error) {
      lastThrownError = null;
    } // If the child props haven't changed, nothing to do here - cascade the subscription update


    if (newChildProps === lastChildProps.current) {
      if (!renderIsScheduled.current) {
        notifyNestedSubs();
      }
    } else {
      // Save references to the new child props.  Note that we track the "child props from store update"
      // as a ref instead of a useState/useReducer because we need a way to determine if that value has
      // been processed.  If this went into useState/useReducer, we couldn't clear out the value without
      // forcing another re-render, which we don't want.
      lastChildProps.current = newChildProps;
      childPropsFromStoreUpdate.current = newChildProps;
      renderIsScheduled.current = true; // If the child props _did_ change (or we caught an error), this wrapper component needs to re-render

      forceComponentUpdateDispatch({
        type: 'STORE_UPDATED',
        payload: {
          error: error
        }
      });
    }
  }; // Actually subscribe to the nearest connected ancestor (or store)


  subscription.onStateChange = checkForUpdates;
  subscription.trySubscribe(); // Pull data from the store after first render in case the store has
  // changed since we began.

  checkForUpdates();

  var unsubscribeWrapper = function unsubscribeWrapper() {
    didUnsubscribe = true;
    subscription.tryUnsubscribe();
    subscription.onStateChange = null;

    if (lastThrownError) {
      // It's possible that we caught an error due to a bad mapState function, but the
      // parent re-rendered without this component and we're about to unmount.
      // This shouldn't happen as long as we do top-down subscriptions correctly, but
      // if we ever do those wrong, this throw will surface the error in our tests.
      // In that case, throw the error from here so it doesn't get lost.
      throw lastThrownError;
    }
  };

  return unsubscribeWrapper;
}

var initStateUpdates = function initStateUpdates() {
  return [null, 0];
};

function connectAdvanced(
/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
      export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
    Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
    Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory, // options object:
_ref) {
  if (_ref === void 0) {
    _ref = {};
  }

  var _ref2 = _ref,
      _ref2$getDisplayName = _ref2.getDisplayName,
      getDisplayName = _ref2$getDisplayName === void 0 ? function (name) {
    return "ConnectAdvanced(" + name + ")";
  } : _ref2$getDisplayName,
      _ref2$methodName = _ref2.methodName,
      methodName = _ref2$methodName === void 0 ? 'connectAdvanced' : _ref2$methodName,
      _ref2$renderCountProp = _ref2.renderCountProp,
      renderCountProp = _ref2$renderCountProp === void 0 ? undefined : _ref2$renderCountProp,
      _ref2$shouldHandleSta = _ref2.shouldHandleStateChanges,
      shouldHandleStateChanges = _ref2$shouldHandleSta === void 0 ? true : _ref2$shouldHandleSta,
      _ref2$storeKey = _ref2.storeKey,
      storeKey = _ref2$storeKey === void 0 ? 'store' : _ref2$storeKey,
      _ref2$withRef = _ref2.withRef,
      withRef = _ref2$withRef === void 0 ? false : _ref2$withRef,
      _ref2$forwardRef = _ref2.forwardRef,
      forwardRef = _ref2$forwardRef === void 0 ? false : _ref2$forwardRef,
      _ref2$context = _ref2.context,
      context = _ref2$context === void 0 ? ReactReduxContext : _ref2$context,
      connectOptions = _objectWithoutPropertiesLoose(_ref2, _excluded$4);

  if ("development" !== 'production') {
    if (renderCountProp !== undefined) {
      throw new Error("renderCountProp is removed. render counting is built into the latest React Dev Tools profiling extension");
    }

    if (withRef) {
      throw new Error('withRef is removed. To access the wrapped instance, use a ref on the connected component');
    }

    var customStoreWarningMessage = 'To use a custom Redux store for specific components, create a custom React context with ' + "React.createContext(), and pass the context object to React Redux's Provider and specific components" + ' like: <Provider context={MyContext}><ConnectedComponent context={MyContext} /></Provider>. ' + 'You may also pass a {context : MyContext} option to connect';

    if (storeKey !== 'store') {
      throw new Error('storeKey has been removed and does not do anything. ' + customStoreWarningMessage);
    }
  }

  var Context = context;
  return function wrapWithConnect(WrappedComponent) {
    if ("development" !== 'production' && !reactIs$1.exports.isValidElementType(WrappedComponent)) {
      throw new Error("You must pass a component to the function returned by " + (methodName + ". Instead received " + stringifyComponent(WrappedComponent)));
    }

    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    var displayName = getDisplayName(wrappedComponentName);

    var selectorFactoryOptions = _extends({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent
    });

    var pure = connectOptions.pure;

    function createChildSelector(store) {
      return selectorFactory(store.dispatch, selectorFactoryOptions);
    } // If we aren't running in "pure" mode, we don't want to memoize values.
    // To avoid conditionally calling hooks, we fall back to a tiny wrapper
    // that just executes the given callback immediately.


    var usePureOnlyMemo = pure ? _ : function (callback) {
      return callback();
    };

    function ConnectFunction(props) {
      var _useMemo = _(function () {
        // Distinguish between actual "data" props that were passed to the wrapper component,
        // and values needed to control behavior (forwarded refs, alternate context instances).
        // To maintain the wrapperProps object reference, memoize this destructuring.
        var reactReduxForwardedRef = props.reactReduxForwardedRef,
            wrapperProps = _objectWithoutPropertiesLoose(props, _excluded2);

        return [props.context, reactReduxForwardedRef, wrapperProps];
      }, [props]),
          propsContext = _useMemo[0],
          reactReduxForwardedRef = _useMemo[1],
          wrapperProps = _useMemo[2];

      var ContextToUse = _(function () {
        // Users may optionally pass in a custom context instance to use instead of our ReactReduxContext.
        // Memoize the check that determines which context instance we should use.
        return propsContext && propsContext.Consumer && reactIs$1.exports.isContextConsumer( /*#__PURE__*/React.createElement(propsContext.Consumer, null)) ? propsContext : Context;
      }, [propsContext, Context]); // Retrieve the store and ancestor subscription via context, if available

      var contextValue = F$2(ContextToUse); // The store _must_ exist as either a prop or in context.
      // We'll check to see if it _looks_ like a Redux store first.
      // This allows us to pass through a `store` prop that is just a plain value.

      var didStoreComeFromProps = Boolean(props.store) && Boolean(props.store.getState) && Boolean(props.store.dispatch);
      var didStoreComeFromContext = Boolean(contextValue) && Boolean(contextValue.store);

      if ("development" !== 'production' && !didStoreComeFromProps && !didStoreComeFromContext) {
        throw new Error("Could not find \"store\" in the context of " + ("\"" + displayName + "\". Either wrap the root component in a <Provider>, ") + "or pass a custom React context provider to <Provider> and the corresponding " + ("React context consumer to " + displayName + " in connect options."));
      } // Based on the previous check, one of these must be true


      var store = didStoreComeFromProps ? props.store : contextValue.store;
      var childPropsSelector = _(function () {
        // The child props selector needs the store reference as an input.
        // Re-create this selector whenever the store changes.
        return createChildSelector(store);
      }, [store]);

      var _useMemo2 = _(function () {
        if (!shouldHandleStateChanges) return NO_SUBSCRIPTION_ARRAY; // This Subscription's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.
        // This Subscription's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.

        var subscription = createSubscription(store, didStoreComeFromProps ? null : contextValue.subscription); // `notifyNestedSubs` is duplicated to handle the case where the component is unmounted in
        // the middle of the notification loop, where `subscription` will then be null. This can
        // probably be avoided if Subscription's listeners logic is changed to not call listeners
        // that have been unsubscribed in the  middle of the notification loop.
        // `notifyNestedSubs` is duplicated to handle the case where the component is unmounted in
        // the middle of the notification loop, where `subscription` will then be null. This can
        // probably be avoided if Subscription's listeners logic is changed to not call listeners
        // that have been unsubscribed in the  middle of the notification loop.

        var notifyNestedSubs = subscription.notifyNestedSubs.bind(subscription);
        return [subscription, notifyNestedSubs];
      }, [store, didStoreComeFromProps, contextValue]),
          subscription = _useMemo2[0],
          notifyNestedSubs = _useMemo2[1]; // Determine what {store, subscription} value should be put into nested context, if necessary,
      // and memoize that value to avoid unnecessary context updates.


      var overriddenContextValue = _(function () {
        if (didStoreComeFromProps) {
          // This component is directly subscribed to a store from props.
          // We don't want descendants reading from this store - pass down whatever
          // the existing context value is from the nearest connected ancestor.
          return contextValue;
        } // Otherwise, put this component's subscription instance into context, so that
        // connected descendants won't update until after this component is done


        return _extends({}, contextValue, {
          subscription: subscription
        });
      }, [didStoreComeFromProps, contextValue, subscription]); // We need to force this wrapper component to re-render whenever a Redux store update
      // causes a change to the calculated child component props (or we caught an error in mapState)

      var _useReducer = p$3(storeStateUpdatesReducer, EMPTY_ARRAY, initStateUpdates),
          _useReducer$ = _useReducer[0],
          previousStateUpdateResult = _useReducer$[0],
          forceComponentUpdateDispatch = _useReducer[1]; // Propagate any mapState/mapDispatch errors upwards


      if (previousStateUpdateResult && previousStateUpdateResult.error) {
        throw previousStateUpdateResult.error;
      } // Set up refs to coordinate values between the subscription effect and the render logic


      var lastChildProps = h$3();
      var lastWrapperProps = h$3(wrapperProps);
      var childPropsFromStoreUpdate = h$3();
      var renderIsScheduled = h$3(false);
      var actualChildProps = usePureOnlyMemo(function () {
        // Tricky logic here:
        // - This render may have been triggered by a Redux store update that produced new child props
        // - However, we may have gotten new wrapper props after that
        // If we have new child props, and the same wrapper props, we know we should use the new child props as-is.
        // But, if we have new wrapper props, those might change the child props, so we have to recalculate things.
        // So, we'll use the child props from store update only if the wrapper props are the same as last time.
        if (childPropsFromStoreUpdate.current && wrapperProps === lastWrapperProps.current) {
          return childPropsFromStoreUpdate.current;
        } // TODO We're reading the store directly in render() here. Bad idea?
        // This will likely cause Bad Things (TM) to happen in Concurrent Mode.
        // Note that we do this because on renders _not_ caused by store updates, we need the latest store state
        // to determine what the child props should be.


        return childPropsSelector(store.getState(), wrapperProps);
      }, [store, previousStateUpdateResult, wrapperProps]); // We need this to execute synchronously every time we re-render. However, React warns
      // about useLayoutEffect in SSR, so we try to detect environment and fall back to
      // just useEffect instead to avoid the warning, since neither will run anyway.

      useIsomorphicLayoutEffectWithArgs(captureWrapperProps, [lastWrapperProps, lastChildProps, renderIsScheduled, wrapperProps, actualChildProps, childPropsFromStoreUpdate, notifyNestedSubs]); // Our re-subscribe logic only runs when the store/subscription setup changes

      useIsomorphicLayoutEffectWithArgs(subscribeUpdates, [shouldHandleStateChanges, store, subscription, childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, childPropsFromStoreUpdate, notifyNestedSubs, forceComponentUpdateDispatch], [store, subscription, childPropsSelector]); // Now that all that's done, we can finally try to actually render the child component.
      // We memoize the elements for the rendered child component as an optimization.

      var renderedWrappedComponent = _(function () {
        return /*#__PURE__*/React.createElement(WrappedComponent, _extends({}, actualChildProps, {
          ref: reactReduxForwardedRef
        }));
      }, [reactReduxForwardedRef, WrappedComponent, actualChildProps]); // If React sees the exact same element reference as last time, it bails out of re-rendering
      // that child, same as if it was wrapped in React.memo() or returned false from shouldComponentUpdate.

      var renderedChild = _(function () {
        if (shouldHandleStateChanges) {
          // If this component is subscribed to store updates, we need to pass its own
          // subscription instance down to our descendants. That means rendering the same
          // Context instance, and putting a different value into the context.
          return /*#__PURE__*/React.createElement(ContextToUse.Provider, {
            value: overriddenContextValue
          }, renderedWrappedComponent);
        }

        return renderedWrappedComponent;
      }, [ContextToUse, renderedWrappedComponent, overriddenContextValue]);
      return renderedChild;
    } // If we're in "pure" mode, ensure our wrapper component only re-renders when incoming props have changed.


    var Connect = pure ? /*#__PURE__*/React.memo(ConnectFunction) : ConnectFunction;
    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = ConnectFunction.displayName = displayName;

    if (forwardRef) {
      var forwarded = /*#__PURE__*/React.forwardRef(function forwardConnectRef(props, ref) {
        return /*#__PURE__*/React.createElement(Connect, _extends({}, props, {
          reactReduxForwardedRef: ref
        }));
      });
      forwarded.displayName = displayName;
      forwarded.WrappedComponent = WrappedComponent;
      return hoistNonReactStatics_cjs(forwarded, WrappedComponent);
    }

    return hoistNonReactStatics_cjs(Connect, WrappedComponent);
  };
}

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (_typeof$2(objA) !== 'object' || objA === null || _typeof$2(objB) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

function bindActionCreators$1(actionCreators, dispatch) {
  var boundActionCreators = {};

  var _loop = function _loop(key) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = function () {
        return dispatch(actionCreator.apply(void 0, arguments));
      };
    }
  };

  for (var key in actionCreators) {
    _loop(key);
  }

  return boundActionCreators;
}

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject$1(obj) {
  if (_typeof$2(obj) !== 'object' || obj === null) return false;
  var proto = Object.getPrototypeOf(obj);
  if (proto === null) return true;
  var baseProto = proto;

  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }

  return proto === baseProto;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning$1(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */

}

function verifyPlainObject(value, displayName, methodName) {
  if (!isPlainObject$1(value)) {
    warning$1(methodName + "() in " + displayName + " must return a plain object. Instead received " + value + ".");
  }
}

function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);

    function constantSelector() {
      return constant;
    }

    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
} // dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
//
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..

function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
} // Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
//
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//

function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;

    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    }; // allow detectFactoryAndVerify to get ownProps


    proxy.dependsOnOwnProps = true;

    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);

      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }

      if ("development" !== 'production') verifyPlainObject(props, displayName, methodName);
      return props;
    };

    return proxy;
  };
}

function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}
function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? wrapMapToPropsConstant(function (dispatch) {
    return {
      dispatch: dispatch
    };
  }) : undefined;
}
function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && _typeof$2(mapDispatchToProps) === 'object' ? wrapMapToPropsConstant(function (dispatch) {
    return bindActionCreators$1(mapDispatchToProps, dispatch);
  }) : undefined;
}
var defaultMapDispatchToPropsFactories = [whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject];

function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps') : undefined;
}
function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? wrapMapToPropsConstant(function () {
    return {};
  }) : undefined;
}
var defaultMapStateToPropsFactories = [whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing];

function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return _extends({}, ownProps, stateProps, dispatchProps);
}
function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
        pure = _ref.pure,
        areMergedPropsEqual = _ref.areMergedPropsEqual;
    var hasRunOnce = false;
    var mergedProps;
    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;
        if ("development" !== 'production') verifyPlainObject(mergedProps, displayName, 'mergeProps');
      }

      return mergedProps;
    };
  };
}
function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}
function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}
var defaultMergePropsFactories = [whenMergePropsIsFunction, whenMergePropsIsOmitted];

function verify(selector, methodName, displayName) {
  if (!selector) {
    throw new Error("Unexpected value for " + methodName + " in " + displayName + ".");
  } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
    if (!Object.prototype.hasOwnProperty.call(selector, 'dependsOnOwnProps')) {
      warning$1("The selector for " + methodName + " of " + displayName + " did not specify a value for dependsOnOwnProps.");
    }
  }
}

function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
  verify(mapStateToProps, 'mapStateToProps', displayName);
  verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
  verify(mergeProps, 'mergeProps', displayName);
}

var _excluded$3 = ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"];
function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}
function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
  var areStatesEqual = _ref.areStatesEqual,
      areOwnPropsEqual = _ref.areOwnPropsEqual,
      areStatePropsEqual = _ref.areStatePropsEqual;
  var hasRunAtLeastOnce = false;
  var state;
  var ownProps;
  var stateProps;
  var dispatchProps;
  var mergedProps;

  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }

  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);
    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);
    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewState() {
    var nextStateProps = mapStateToProps(state, ownProps);
    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;
    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleSubsequentCalls(nextState, nextOwnProps) {
    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    var stateChanged = !areStatesEqual(nextState, state);
    state = nextState;
    ownProps = nextOwnProps;
    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }

  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
} // TODO: Add more comments
// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.

function finalPropsSelectorFactory(dispatch, _ref2) {
  var initMapStateToProps = _ref2.initMapStateToProps,
      initMapDispatchToProps = _ref2.initMapDispatchToProps,
      initMergeProps = _ref2.initMergeProps,
      options = _objectWithoutPropertiesLoose(_ref2, _excluded$3);

  var mapStateToProps = initMapStateToProps(dispatch, options);
  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  var mergeProps = initMergeProps(dispatch, options);

  if ("development" !== 'production') {
    verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
  }

  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;
  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}

var _excluded$2 = ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"];
/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }

  return function (dispatch, options) {
    throw new Error("Invalid value of type " + _typeof$2(arg) + " for " + name + " argument when connecting component " + options.wrappedComponentName + ".");
  };
}

function strictEqual(a, b) {
  return a === b;
} // createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios


function createConnect(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$connectHOC = _ref.connectHOC,
      connectHOC = _ref$connectHOC === void 0 ? connectAdvanced : _ref$connectHOC,
      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
      mapStateToPropsFactories = _ref$mapStateToPropsF === void 0 ? defaultMapStateToPropsFactories : _ref$mapStateToPropsF,
      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
      mapDispatchToPropsFactories = _ref$mapDispatchToPro === void 0 ? defaultMapDispatchToPropsFactories : _ref$mapDispatchToPro,
      _ref$mergePropsFactor = _ref.mergePropsFactories,
      mergePropsFactories = _ref$mergePropsFactor === void 0 ? defaultMergePropsFactories : _ref$mergePropsFactor,
      _ref$selectorFactory = _ref.selectorFactory,
      selectorFactory = _ref$selectorFactory === void 0 ? finalPropsSelectorFactory : _ref$selectorFactory;

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps, _ref2) {
    if (_ref2 === void 0) {
      _ref2 = {};
    }

    var _ref3 = _ref2,
        _ref3$pure = _ref3.pure,
        pure = _ref3$pure === void 0 ? true : _ref3$pure,
        _ref3$areStatesEqual = _ref3.areStatesEqual,
        areStatesEqual = _ref3$areStatesEqual === void 0 ? strictEqual : _ref3$areStatesEqual,
        _ref3$areOwnPropsEqua = _ref3.areOwnPropsEqual,
        areOwnPropsEqual = _ref3$areOwnPropsEqua === void 0 ? shallowEqual : _ref3$areOwnPropsEqua,
        _ref3$areStatePropsEq = _ref3.areStatePropsEqual,
        areStatePropsEqual = _ref3$areStatePropsEq === void 0 ? shallowEqual : _ref3$areStatePropsEq,
        _ref3$areMergedPropsE = _ref3.areMergedPropsEqual,
        areMergedPropsEqual = _ref3$areMergedPropsE === void 0 ? shallowEqual : _ref3$areMergedPropsE,
        extraOptions = _objectWithoutPropertiesLoose(_ref3, _excluded$2);

    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');
    return connectHOC(selectorFactory, _extends({
      // used in error messages
      methodName: 'connect',
      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return "Connect(" + name + ")";
      },
      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),
      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual
    }, extraOptions));
  };
}
var connect = /*#__PURE__*/createConnect();

/**
 * A hook to access the value of the `ReactReduxContext`. This is a low-level
 * hook that you should usually not need to call directly.
 *
 * @returns {any} the value of the `ReactReduxContext`
 *
 * @example
 *
 * import React from 'react'
 * import { useReduxContext } from 'react-redux'
 *
 * export const CounterComponent = ({ value }) => {
 *   const { store } = useReduxContext()
 *   return <div>{store.getState()}</div>
 * }
 */

function useReduxContext() {
  var contextValue = F$2(ReactReduxContext);

  if ("development" !== 'production' && !contextValue) {
    throw new Error('could not find react-redux context value; please ensure the component is wrapped in a <Provider>');
  }

  return contextValue;
}

/**
 * Hook factory, which creates a `useStore` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useStore` hook bound to the specified context.
 */

function createStoreHook(context) {
  if (context === void 0) {
    context = ReactReduxContext;
  }

  var useReduxContext$1 = context === ReactReduxContext ? useReduxContext : function () {
    return F$2(context);
  };
  return function useStore() {
    var _useReduxContext = useReduxContext$1(),
        store = _useReduxContext.store;

    return store;
  };
}
/**
 * A hook to access the redux store.
 *
 * @returns {any} the redux store
 *
 * @example
 *
 * import React from 'react'
 * import { useStore } from 'react-redux'
 *
 * export const ExampleComponent = () => {
 *   const store = useStore()
 *   return <div>{store.getState()}</div>
 * }
 */

var useStore = /*#__PURE__*/createStoreHook();

/**
 * Hook factory, which creates a `useDispatch` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useDispatch` hook bound to the specified context.
 */

function createDispatchHook(context) {
  if (context === void 0) {
    context = ReactReduxContext;
  }

  var useStore$1 = context === ReactReduxContext ? useStore : createStoreHook(context);
  return function useDispatch() {
    var store = useStore$1();
    return store.dispatch;
  };
}
/**
 * A hook to access the redux `dispatch` function.
 *
 * @returns {any|function} redux store's `dispatch` function
 *
 * @example
 *
 * import React, { useCallback } from 'react'
 * import { useDispatch } from 'react-redux'
 *
 * export const CounterComponent = ({ value }) => {
 *   const dispatch = useDispatch()
 *   const increaseCounter = useCallback(() => dispatch({ type: 'increase-counter' }), [])
 *   return (
 *     <div>
 *       <span>{value}</span>
 *       <button onClick={increaseCounter}>Increase counter</button>
 *     </div>
 *   )
 * }
 */

var useDispatch = /*#__PURE__*/createDispatchHook();

var refEquality = function refEquality(a, b) {
  return a === b;
};

function useSelectorWithStoreAndSubscription(selector, equalityFn, store, contextSub) {
  var _useReducer = p$3(function (s) {
    return s + 1;
  }, 0),
      forceRender = _useReducer[1];

  var subscription = _(function () {
    return createSubscription(store, contextSub);
  }, [store, contextSub]);
  var latestSubscriptionCallbackError = h$3();
  var latestSelector = h$3();
  var latestStoreState = h$3();
  var latestSelectedState = h$3();
  var storeState = store.getState();
  var selectedState;

  try {
    if (selector !== latestSelector.current || storeState !== latestStoreState.current || latestSubscriptionCallbackError.current) {
      var newSelectedState = selector(storeState); // ensure latest selected state is reused so that a custom equality function can result in identical references

      if (latestSelectedState.current === undefined || !equalityFn(newSelectedState, latestSelectedState.current)) {
        selectedState = newSelectedState;
      } else {
        selectedState = latestSelectedState.current;
      }
    } else {
      selectedState = latestSelectedState.current;
    }
  } catch (err) {
    if (latestSubscriptionCallbackError.current) {
      err.message += "\nThe error may be correlated with this previous error:\n" + latestSubscriptionCallbackError.current.stack + "\n\n";
    }

    throw err;
  }

  useIsomorphicLayoutEffect(function () {
    latestSelector.current = selector;
    latestStoreState.current = storeState;
    latestSelectedState.current = selectedState;
    latestSubscriptionCallbackError.current = undefined;
  });
  useIsomorphicLayoutEffect(function () {
    function checkForUpdates() {
      try {
        var newStoreState = store.getState(); // Avoid calling selector multiple times if the store's state has not changed

        if (newStoreState === latestStoreState.current) {
          return;
        }

        var _newSelectedState = latestSelector.current(newStoreState);

        if (equalityFn(_newSelectedState, latestSelectedState.current)) {
          return;
        }

        latestSelectedState.current = _newSelectedState;
        latestStoreState.current = newStoreState;
      } catch (err) {
        // we ignore all errors here, since when the component
        // is re-rendered, the selectors are called again, and
        // will throw again, if neither props nor store state
        // changed
        latestSubscriptionCallbackError.current = err;
      }

      forceRender();
    }

    subscription.onStateChange = checkForUpdates;
    subscription.trySubscribe();
    checkForUpdates();
    return function () {
      return subscription.tryUnsubscribe();
    };
  }, [store, subscription]);
  return selectedState;
}
/**
 * Hook factory, which creates a `useSelector` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useSelector` hook bound to the specified context.
 */


function createSelectorHook(context) {
  if (context === void 0) {
    context = ReactReduxContext;
  }

  var useReduxContext$1 = context === ReactReduxContext ? useReduxContext : function () {
    return F$2(context);
  };
  return function useSelector(selector, equalityFn) {
    if (equalityFn === void 0) {
      equalityFn = refEquality;
    }

    if ("development" !== 'production') {
      if (!selector) {
        throw new Error("You must pass a selector to useSelector");
      }

      if (typeof selector !== 'function') {
        throw new Error("You must pass a function as a selector to useSelector");
      }

      if (typeof equalityFn !== 'function') {
        throw new Error("You must pass a function as an equality function to useSelector");
      }
    }

    var _useReduxContext = useReduxContext$1(),
        store = _useReduxContext.store,
        contextSub = _useReduxContext.subscription;

    var selectedState = useSelectorWithStoreAndSubscription(selector, equalityFn, store, contextSub);
    T$1(selectedState);
    return selectedState;
  };
}
/**
 * A hook to access the redux store's state. This hook takes a selector function
 * as an argument. The selector is called with the store state.
 *
 * This hook takes an optional equality comparison function as the second parameter
 * that allows you to customize the way the selected state is compared to determine
 * whether the component needs to be re-rendered.
 *
 * @param {Function} selector the selector function
 * @param {Function=} equalityFn the function that will be used to determine equality
 *
 * @returns {any} the selected state
 *
 * @example
 *
 * import React from 'react'
 * import { useSelector } from 'react-redux'
 *
 * export const CounterComponent = () => {
 *   const counter = useSelector(state => state.counter)
 *   return <div>{counter}</div>
 * }
 */

var useSelector = /*#__PURE__*/createSelectorHook();

/* eslint-disable import/no-unresolved */

// with standard React renderers (ReactDOM, React Native)

setBatch(ln);

var IconsManifest = [{
  "id": "fa",
  "name": "Font Awesome",
  "projectUrl": "https://fontawesome.com/",
  "license": "CC BY 4.0 License",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
}, {
  "id": "io",
  "name": "Ionicons 4",
  "projectUrl": "https://ionicons.com/",
  "license": "MIT",
  "licenseUrl": "https://github.com/ionic-team/ionicons/blob/master/LICENSE"
}, {
  "id": "io5",
  "name": "Ionicons 5",
  "projectUrl": "https://ionicons.com/",
  "license": "MIT",
  "licenseUrl": "https://github.com/ionic-team/ionicons/blob/master/LICENSE"
}, {
  "id": "md",
  "name": "Material Design icons",
  "projectUrl": "http://google.github.io/material-design-icons/",
  "license": "Apache License Version 2.0",
  "licenseUrl": "https://github.com/google/material-design-icons/blob/master/LICENSE"
}, {
  "id": "ti",
  "name": "Typicons",
  "projectUrl": "http://s-ings.com/typicons/",
  "license": "CC BY-SA 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
}, {
  "id": "go",
  "name": "Github Octicons icons",
  "projectUrl": "https://octicons.github.com/",
  "license": "MIT",
  "licenseUrl": "https://github.com/primer/octicons/blob/master/LICENSE"
}, {
  "id": "fi",
  "name": "Feather",
  "projectUrl": "https://feathericons.com/",
  "license": "MIT",
  "licenseUrl": "https://github.com/feathericons/feather/blob/master/LICENSE"
}, {
  "id": "gi",
  "name": "Game Icons",
  "projectUrl": "https://game-icons.net/",
  "license": "CC BY 3.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/3.0/"
}, {
  "id": "wi",
  "name": "Weather Icons",
  "projectUrl": "https://erikflowers.github.io/weather-icons/",
  "license": "SIL OFL 1.1",
  "licenseUrl": "http://scripts.sil.org/OFL"
}, {
  "id": "di",
  "name": "Devicons",
  "projectUrl": "https://vorillaz.github.io/devicons/",
  "license": "MIT",
  "licenseUrl": "https://opensource.org/licenses/MIT"
}, {
  "id": "ai",
  "name": "Ant Design Icons",
  "projectUrl": "https://github.com/ant-design/ant-design-icons",
  "license": "MIT",
  "licenseUrl": "https://opensource.org/licenses/MIT"
}, {
  "id": "bs",
  "name": "Bootstrap Icons",
  "projectUrl": "https://github.com/twbs/icons",
  "license": "MIT",
  "licenseUrl": "https://opensource.org/licenses/MIT"
}, {
  "id": "ri",
  "name": "Remix Icon",
  "projectUrl": "https://github.com/Remix-Design/RemixIcon",
  "license": "Apache License Version 2.0",
  "licenseUrl": "http://www.apache.org/licenses/"
}, {
  "id": "fc",
  "name": "Flat Color Icons",
  "projectUrl": "https://github.com/icons8/flat-color-icons",
  "license": "MIT",
  "licenseUrl": "https://opensource.org/licenses/MIT"
}, {
  "id": "gr",
  "name": "Grommet-Icons",
  "projectUrl": "https://github.com/grommet/grommet-icons",
  "license": "Apache License Version 2.0",
  "licenseUrl": "http://www.apache.org/licenses/"
}, {
  "id": "hi",
  "name": "Heroicons",
  "projectUrl": "https://github.com/tailwindlabs/heroicons",
  "license": "MIT",
  "licenseUrl": "https://opensource.org/licenses/MIT"
}, {
  "id": "si",
  "name": "Simple Icons",
  "projectUrl": "https://simpleicons.org/",
  "license": "CC0 1.0 Universal",
  "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/"
}, {
  "id": "im",
  "name": "IcoMoon Free",
  "projectUrl": "https://github.com/Keyamoon/IcoMoon-Free",
  "license": "CC BY 4.0 License"
}, {
  "id": "bi",
  "name": "BoxIcons",
  "projectUrl": "https://github.com/atisawd/boxicons",
  "license": "CC BY 4.0 License"
}, {
  "id": "cg",
  "name": "css.gg",
  "projectUrl": "https://github.com/astrit/css.gg",
  "license": "MIT",
  "licenseUrl": "https://opensource.org/licenses/MIT"
}, {
  "id": "vsc",
  "name": "VS Code Icons",
  "projectUrl": "https://github.com/microsoft/vscode-codicons",
  "license": "CC BY 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
}, {
  "id": "tb",
  "name": "Tabler Icons",
  "projectUrl": "https://github.com/tabler/tabler-icons",
  "license": "MIT",
  "licenseUrl": "https://opensource.org/licenses/MIT"
}];

var DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined
};
var IconContext = React.createContext && /*#__PURE__*/React.createContext(DefaultContext);

var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

function Tree2Element(tree) {
  return tree && tree.map(function (node, i) {
    return /*#__PURE__*/React.createElement(node.tag, __assign({
      key: i
    }, node.attr), Tree2Element(node.child));
  });
}

function GenIcon(data) {
  return function (props) {
    return /*#__PURE__*/React.createElement(IconBase, __assign({
      attr: __assign({}, data.attr)
    }, props), Tree2Element(data.child));
  };
}
function IconBase(props) {
  var elem = function elem(conf) {
    var attr = props.attr,
        size = props.size,
        title = props.title,
        svgProps = __rest(props, ["attr", "size", "title"]);

    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + ' ' : '') + props.className;
    return /*#__PURE__*/React.createElement("svg", __assign({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className: className,
      style: __assign(__assign({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /*#__PURE__*/React.createElement("title", null, title), props.children);
  };

  return IconContext !== undefined ? /*#__PURE__*/React.createElement(IconContext.Consumer, null, function (conf) {
    return elem(conf);
  }) : elem(DefaultContext);
}

// THIS FILE IS AUTO GENERATED

//
// Static constants
//
// Physics constants
var TIME_STEP = 1 / 60;
var DAMPING = 0.03;
var DRAG = 1 - DAMPING;
var DRAG_COEFFICIENT = 0.12;
var AIR_DENSITY = 1.225; // kg/m^3

var G = 9.80665; // m/s^2

/**
 * Enum for flag hoisting side.
 *
 * @readonly
 * @enum {string}
 * @typedef {string} Hoisting
 */

var Hoisting = {
  DEXTER: 'dexter',
  SINISTER: 'sinister'
};
/**
 * Enum for cardinal directions.
 *
 * @readonly
 * @enum {string}
 * @typedef {string} Side
 */

var Side = {
  TOP: 'top',
  LEFT: 'left',
  BOTTOM: 'bottom',
  RIGHT: 'right'
};
/**
 * Enum for front and back sides.
 *
 * @readonly
 * @enum {string}
 * @typedef {string} Face
 */

var Face = {
  OBVERSE: 'obverse',
  REVERSE: 'reverse'
};
/**
 * Enum for flagpole types.
 *
 * @readonly
 * @enum {string}
 * @typedef {string} FlagpoleType
 */

var FlagpoleType = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
  OUTRIGGER: 'outrigger',
  CROSSBAR: 'crossbar',
  GALLERY: 'gallery',
  AUSTRALIAN: 'australian'
};
/**
 * Enum for vertical flag hanging protocols.
 *
 * @readonly
 * @enum {string}
 * @typedef {string} VerticalHoisting
 */

var VerticalHoisting = {
  /** Flag orientation does not change. */
  NONE: 'none',

  /** Flag is rotated 90 degrees clockwise. */
  TOP_RIGHT: 'topright',

  /** Flag is rotated 90 degrees clockwise and flipped horizontally. */
  TOP_LEFT: 'topleft'
};

var REVISION = '141';
var MOUSE = {
  LEFT: 0,
  MIDDLE: 1,
  RIGHT: 2,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2
};
var TOUCH = {
  ROTATE: 0,
  PAN: 1,
  DOLLY_PAN: 2,
  DOLLY_ROTATE: 3
};
var CullFaceNone = 0;
var CullFaceBack = 1;
var CullFaceFront = 2;
var CullFaceFrontBack = 3;
var BasicShadowMap = 0;
var PCFShadowMap = 1;
var PCFSoftShadowMap = 2;
var VSMShadowMap = 3;
var FrontSide = 0;
var BackSide = 1;
var DoubleSide = 2;
var FlatShading = 1;
var SmoothShading = 2;
var NoBlending = 0;
var NormalBlending = 1;
var AdditiveBlending = 2;
var SubtractiveBlending = 3;
var MultiplyBlending = 4;
var CustomBlending = 5;
var AddEquation = 100;
var SubtractEquation = 101;
var ReverseSubtractEquation = 102;
var MinEquation = 103;
var MaxEquation = 104;
var ZeroFactor = 200;
var OneFactor = 201;
var SrcColorFactor = 202;
var OneMinusSrcColorFactor = 203;
var SrcAlphaFactor = 204;
var OneMinusSrcAlphaFactor = 205;
var DstAlphaFactor = 206;
var OneMinusDstAlphaFactor = 207;
var DstColorFactor = 208;
var OneMinusDstColorFactor = 209;
var SrcAlphaSaturateFactor = 210;
var NeverDepth = 0;
var AlwaysDepth = 1;
var LessDepth = 2;
var LessEqualDepth = 3;
var EqualDepth = 4;
var GreaterEqualDepth = 5;
var GreaterDepth = 6;
var NotEqualDepth = 7;
var MultiplyOperation = 0;
var MixOperation = 1;
var AddOperation = 2;
var NoToneMapping = 0;
var LinearToneMapping = 1;
var ReinhardToneMapping = 2;
var CineonToneMapping = 3;
var ACESFilmicToneMapping = 4;
var CustomToneMapping = 5;
var UVMapping = 300;
var CubeReflectionMapping = 301;
var CubeRefractionMapping = 302;
var EquirectangularReflectionMapping = 303;
var EquirectangularRefractionMapping = 304;
var CubeUVReflectionMapping = 306;
var RepeatWrapping = 1000;
var ClampToEdgeWrapping = 1001;
var MirroredRepeatWrapping = 1002;
var NearestFilter = 1003;
var NearestMipmapNearestFilter = 1004;
var NearestMipMapNearestFilter = 1004;
var NearestMipmapLinearFilter = 1005;
var NearestMipMapLinearFilter = 1005;
var LinearFilter = 1006;
var LinearMipmapNearestFilter = 1007;
var LinearMipMapNearestFilter = 1007;
var LinearMipmapLinearFilter = 1008;
var LinearMipMapLinearFilter = 1008;
var UnsignedByteType = 1009;
var ByteType = 1010;
var ShortType = 1011;
var UnsignedShortType = 1012;
var IntType = 1013;
var UnsignedIntType = 1014;
var FloatType = 1015;
var HalfFloatType = 1016;
var UnsignedShort4444Type = 1017;
var UnsignedShort5551Type = 1018;
var UnsignedInt248Type = 1020;
var AlphaFormat = 1021;
var RGBFormat = 1022;
var RGBAFormat = 1023;
var LuminanceFormat = 1024;
var LuminanceAlphaFormat = 1025;
var DepthFormat = 1026;
var DepthStencilFormat = 1027;
var RedFormat = 1028;
var RedIntegerFormat = 1029;
var RGFormat = 1030;
var RGIntegerFormat = 1031;
var RGBAIntegerFormat = 1033;
var RGB_S3TC_DXT1_Format = 33776;
var RGBA_S3TC_DXT1_Format = 33777;
var RGBA_S3TC_DXT3_Format = 33778;
var RGBA_S3TC_DXT5_Format = 33779;
var RGB_PVRTC_4BPPV1_Format = 35840;
var RGB_PVRTC_2BPPV1_Format = 35841;
var RGBA_PVRTC_4BPPV1_Format = 35842;
var RGBA_PVRTC_2BPPV1_Format = 35843;
var RGB_ETC1_Format = 36196;
var RGB_ETC2_Format = 37492;
var RGBA_ETC2_EAC_Format = 37496;
var RGBA_ASTC_4x4_Format = 37808;
var RGBA_ASTC_5x4_Format = 37809;
var RGBA_ASTC_5x5_Format = 37810;
var RGBA_ASTC_6x5_Format = 37811;
var RGBA_ASTC_6x6_Format = 37812;
var RGBA_ASTC_8x5_Format = 37813;
var RGBA_ASTC_8x6_Format = 37814;
var RGBA_ASTC_8x8_Format = 37815;
var RGBA_ASTC_10x5_Format = 37816;
var RGBA_ASTC_10x6_Format = 37817;
var RGBA_ASTC_10x8_Format = 37818;
var RGBA_ASTC_10x10_Format = 37819;
var RGBA_ASTC_12x10_Format = 37820;
var RGBA_ASTC_12x12_Format = 37821;
var RGBA_BPTC_Format = 36492;
var LoopOnce = 2200;
var LoopRepeat = 2201;
var LoopPingPong = 2202;
var InterpolateDiscrete = 2300;
var InterpolateLinear = 2301;
var InterpolateSmooth = 2302;
var ZeroCurvatureEnding = 2400;
var ZeroSlopeEnding = 2401;
var WrapAroundEnding = 2402;
var NormalAnimationBlendMode = 2500;
var AdditiveAnimationBlendMode = 2501;
var TrianglesDrawMode = 0;
var TriangleStripDrawMode = 1;
var TriangleFanDrawMode = 2;
var LinearEncoding = 3000;
var sRGBEncoding = 3001;
var BasicDepthPacking = 3200;
var RGBADepthPacking = 3201;
var TangentSpaceNormalMap = 0;
var ObjectSpaceNormalMap = 1; // Color space string identifiers, matching CSS Color Module Level 4 and WebGPU names where available.

var NoColorSpace = '';
var SRGBColorSpace = 'srgb';
var LinearSRGBColorSpace = 'srgb-linear';
var ZeroStencilOp = 0;
var KeepStencilOp = 7680;
var ReplaceStencilOp = 7681;
var IncrementStencilOp = 7682;
var DecrementStencilOp = 7683;
var IncrementWrapStencilOp = 34055;
var DecrementWrapStencilOp = 34056;
var InvertStencilOp = 5386;
var NeverStencilFunc = 512;
var LessStencilFunc = 513;
var EqualStencilFunc = 514;
var LessEqualStencilFunc = 515;
var GreaterStencilFunc = 516;
var NotEqualStencilFunc = 517;
var GreaterEqualStencilFunc = 518;
var AlwaysStencilFunc = 519;
var StaticDrawUsage = 35044;
var DynamicDrawUsage = 35048;
var StreamDrawUsage = 35040;
var StaticReadUsage = 35045;
var DynamicReadUsage = 35049;
var StreamReadUsage = 35041;
var StaticCopyUsage = 35046;
var DynamicCopyUsage = 35050;
var StreamCopyUsage = 35042;
var GLSL1 = '100';
var GLSL3 = '300 es';
var _SRGBAFormat = 1035; // fallback for WebGL 1

/**
 * https://github.com/mrdoob/eventdispatcher.js/
 */
var EventDispatcher = /*#__PURE__*/function () {
  function EventDispatcher() {
    _classCallCheck$3(this, EventDispatcher);
  }

  _createClass$2(EventDispatcher, [{
    key: "addEventListener",
    value: function addEventListener(type, listener) {
      if (this._listeners === undefined) this._listeners = {};
      var listeners = this._listeners;

      if (listeners[type] === undefined) {
        listeners[type] = [];
      }

      if (listeners[type].indexOf(listener) === -1) {
        listeners[type].push(listener);
      }
    }
  }, {
    key: "hasEventListener",
    value: function hasEventListener(type, listener) {
      if (this._listeners === undefined) return false;
      var listeners = this._listeners;
      return listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1;
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(type, listener) {
      if (this._listeners === undefined) return;
      var listeners = this._listeners;
      var listenerArray = listeners[type];

      if (listenerArray !== undefined) {
        var index = listenerArray.indexOf(listener);

        if (index !== -1) {
          listenerArray.splice(index, 1);
        }
      }
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(event) {
      if (this._listeners === undefined) return;
      var listeners = this._listeners;
      var listenerArray = listeners[event.type];

      if (listenerArray !== undefined) {
        event.target = this; // Make a copy, in case listeners are removed while iterating.

        var array = listenerArray.slice(0);

        for (var i = 0, l = array.length; i < l; i++) {
          array[i].call(this, event);
        }

        event.target = null;
      }
    }
  }]);

  return EventDispatcher;
}();

var _lut = [];

for (var i$1 = 0; i$1 < 256; i$1++) {
  _lut[i$1] = (i$1 < 16 ? '0' : '') + i$1.toString(16);
}

var _seed = 1234567;
var DEG2RAD = Math.PI / 180;
var RAD2DEG = 180 / Math.PI; // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136

function generateUUID() {
  var d0 = Math.random() * 0xffffffff | 0;
  var d1 = Math.random() * 0xffffffff | 0;
  var d2 = Math.random() * 0xffffffff | 0;
  var d3 = Math.random() * 0xffffffff | 0;
  var uuid = _lut[d0 & 0xff] + _lut[d0 >> 8 & 0xff] + _lut[d0 >> 16 & 0xff] + _lut[d0 >> 24 & 0xff] + '-' + _lut[d1 & 0xff] + _lut[d1 >> 8 & 0xff] + '-' + _lut[d1 >> 16 & 0x0f | 0x40] + _lut[d1 >> 24 & 0xff] + '-' + _lut[d2 & 0x3f | 0x80] + _lut[d2 >> 8 & 0xff] + '-' + _lut[d2 >> 16 & 0xff] + _lut[d2 >> 24 & 0xff] + _lut[d3 & 0xff] + _lut[d3 >> 8 & 0xff] + _lut[d3 >> 16 & 0xff] + _lut[d3 >> 24 & 0xff]; // .toLowerCase() here flattens concatenated strings to save heap memory space.

  return uuid.toLowerCase();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
} // compute euclidean modulo of m % n
// https://en.wikipedia.org/wiki/Modulo_operation


function euclideanModulo(n, m) {
  return (n % m + m) % m;
} // Linear mapping from range <a1, a2> to range <b1, b2>


function mapLinear(x, a1, a2, b1, b2) {
  return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
} // https://www.gamedev.net/tutorials/programming/general-and-gameplay-programming/inverse-lerp-a-super-useful-yet-often-overlooked-function-r5230/


function inverseLerp(x, y, value) {
  if (x !== y) {
    return (value - x) / (y - x);
  } else {
    return 0;
  }
} // https://en.wikipedia.org/wiki/Linear_interpolation


function lerp(x, y, t) {
  return (1 - t) * x + t * y;
} // http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/


function damp(x, y, lambda, dt) {
  return lerp(x, y, 1 - Math.exp(-lambda * dt));
} // https://www.desmos.com/calculator/vcsjnyz7x4


function pingpong(x) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return length - Math.abs(euclideanModulo(x, length * 2) - length);
} // http://en.wikipedia.org/wiki/Smoothstep


function smoothstep(x, min, max) {
  if (x <= min) return 0;
  if (x >= max) return 1;
  x = (x - min) / (max - min);
  return x * x * (3 - 2 * x);
}

function smootherstep(x, min, max) {
  if (x <= min) return 0;
  if (x >= max) return 1;
  x = (x - min) / (max - min);
  return x * x * x * (x * (x * 6 - 15) + 10);
} // Random integer from <low, high> interval


function randInt(low, high) {
  return low + Math.floor(Math.random() * (high - low + 1));
} // Random float from <low, high> interval


function randFloat(low, high) {
  return low + Math.random() * (high - low);
} // Random float from <-range/2, range/2> interval


function randFloatSpread(range) {
  return range * (0.5 - Math.random());
} // Deterministic pseudo-random float in the interval [ 0, 1 ]


function seededRandom(s) {
  if (s !== undefined) _seed = s; // Mulberry32 generator

  var t = _seed += 0x6D2B79F5;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

function degToRad(degrees) {
  return degrees * DEG2RAD;
}

function radToDeg(radians) {
  return radians * RAD2DEG;
}

function isPowerOfTwo(value) {
  return (value & value - 1) === 0 && value !== 0;
}

function ceilPowerOfTwo(value) {
  return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
}

function floorPowerOfTwo(value) {
  return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
}

function setQuaternionFromProperEuler(q, a, b, c, order) {
  // Intrinsic Proper Euler Angles - see https://en.wikipedia.org/wiki/Euler_angles
  // rotations are applied to the axes in the order specified by 'order'
  // rotation by angle 'a' is applied first, then by angle 'b', then by angle 'c'
  // angles are in radians
  var cos = Math.cos;
  var sin = Math.sin;
  var c2 = cos(b / 2);
  var s2 = sin(b / 2);
  var c13 = cos((a + c) / 2);
  var s13 = sin((a + c) / 2);
  var c1_3 = cos((a - c) / 2);
  var s1_3 = sin((a - c) / 2);
  var c3_1 = cos((c - a) / 2);
  var s3_1 = sin((c - a) / 2);

  switch (order) {
    case 'XYX':
      q.set(c2 * s13, s2 * c1_3, s2 * s1_3, c2 * c13);
      break;

    case 'YZY':
      q.set(s2 * s1_3, c2 * s13, s2 * c1_3, c2 * c13);
      break;

    case 'ZXZ':
      q.set(s2 * c1_3, s2 * s1_3, c2 * s13, c2 * c13);
      break;

    case 'XZX':
      q.set(c2 * s13, s2 * s3_1, s2 * c3_1, c2 * c13);
      break;

    case 'YXY':
      q.set(s2 * c3_1, c2 * s13, s2 * s3_1, c2 * c13);
      break;

    case 'ZYZ':
      q.set(s2 * s3_1, s2 * c3_1, c2 * s13, c2 * c13);
      break;

    default:
      console.warn('THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: ' + order);
  }
}

function denormalize$1(value, array) {
  switch (array.constructor) {
    case Float32Array:
      return value;

    case Uint16Array:
      return value / 65535.0;

    case Uint8Array:
      return value / 255.0;

    case Int16Array:
      return Math.max(value / 32767.0, -1.0);

    case Int8Array:
      return Math.max(value / 127.0, -1.0);

    default:
      throw new Error('Invalid component type.');
  }
}

function normalize(value, array) {
  switch (array.constructor) {
    case Float32Array:
      return value;

    case Uint16Array:
      return Math.round(value * 65535.0);

    case Uint8Array:
      return Math.round(value * 255.0);

    case Int16Array:
      return Math.round(value * 32767.0);

    case Int8Array:
      return Math.round(value * 127.0);

    default:
      throw new Error('Invalid component type.');
  }
}

var MathUtils = /*#__PURE__*/Object.freeze({
__proto__: null,
DEG2RAD: DEG2RAD,
RAD2DEG: RAD2DEG,
generateUUID: generateUUID,
clamp: clamp,
euclideanModulo: euclideanModulo,
mapLinear: mapLinear,
inverseLerp: inverseLerp,
lerp: lerp,
damp: damp,
pingpong: pingpong,
smoothstep: smoothstep,
smootherstep: smootherstep,
randInt: randInt,
randFloat: randFloat,
randFloatSpread: randFloatSpread,
seededRandom: seededRandom,
degToRad: degToRad,
radToDeg: radToDeg,
isPowerOfTwo: isPowerOfTwo,
ceilPowerOfTwo: ceilPowerOfTwo,
floorPowerOfTwo: floorPowerOfTwo,
setQuaternionFromProperEuler: setQuaternionFromProperEuler,
normalize: normalize,
denormalize: denormalize$1
});

var Vector2 = /*#__PURE__*/function (_Symbol$iterator) {
  function Vector2() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck$3(this, Vector2);

    this.isVector2 = true;
    this.x = x;
    this.y = y;
  }

  _createClass$2(Vector2, [{
    key: "width",
    get: function get() {
      return this.x;
    },
    set: function set(value) {
      this.x = value;
    }
  }, {
    key: "height",
    get: function get() {
      return this.y;
    },
    set: function set(value) {
      this.y = value;
    }
  }, {
    key: "set",
    value: function set(x, y) {
      this.x = x;
      this.y = y;
      return this;
    }
  }, {
    key: "setScalar",
    value: function setScalar(scalar) {
      this.x = scalar;
      this.y = scalar;
      return this;
    }
  }, {
    key: "setX",
    value: function setX(x) {
      this.x = x;
      return this;
    }
  }, {
    key: "setY",
    value: function setY(y) {
      this.y = y;
      return this;
    }
  }, {
    key: "setComponent",
    value: function setComponent(index, value) {
      switch (index) {
        case 0:
          this.x = value;
          break;

        case 1:
          this.y = value;
          break;

        default:
          throw new Error('index is out of range: ' + index);
      }

      return this;
    }
  }, {
    key: "getComponent",
    value: function getComponent(index) {
      switch (index) {
        case 0:
          return this.x;

        case 1:
          return this.y;

        default:
          throw new Error('index is out of range: ' + index);
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor(this.x, this.y);
    }
  }, {
    key: "copy",
    value: function copy(v) {
      this.x = v.x;
      this.y = v.y;
      return this;
    }
  }, {
    key: "add",
    value: function add(v, w) {
      if (w !== undefined) {
        console.warn('THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
        return this.addVectors(v, w);
      }

      this.x += v.x;
      this.y += v.y;
      return this;
    }
  }, {
    key: "addScalar",
    value: function addScalar(s) {
      this.x += s;
      this.y += s;
      return this;
    }
  }, {
    key: "addVectors",
    value: function addVectors(a, b) {
      this.x = a.x + b.x;
      this.y = a.y + b.y;
      return this;
    }
  }, {
    key: "addScaledVector",
    value: function addScaledVector(v, s) {
      this.x += v.x * s;
      this.y += v.y * s;
      return this;
    }
  }, {
    key: "sub",
    value: function sub(v, w) {
      if (w !== undefined) {
        console.warn('THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
        return this.subVectors(v, w);
      }

      this.x -= v.x;
      this.y -= v.y;
      return this;
    }
  }, {
    key: "subScalar",
    value: function subScalar(s) {
      this.x -= s;
      this.y -= s;
      return this;
    }
  }, {
    key: "subVectors",
    value: function subVectors(a, b) {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(v) {
      this.x *= v.x;
      this.y *= v.y;
      return this;
    }
  }, {
    key: "multiplyScalar",
    value: function multiplyScalar(scalar) {
      this.x *= scalar;
      this.y *= scalar;
      return this;
    }
  }, {
    key: "divide",
    value: function divide(v) {
      this.x /= v.x;
      this.y /= v.y;
      return this;
    }
  }, {
    key: "divideScalar",
    value: function divideScalar(scalar) {
      return this.multiplyScalar(1 / scalar);
    }
  }, {
    key: "applyMatrix3",
    value: function applyMatrix3(m) {
      var x = this.x,
          y = this.y;
      var e = m.elements;
      this.x = e[0] * x + e[3] * y + e[6];
      this.y = e[1] * x + e[4] * y + e[7];
      return this;
    }
  }, {
    key: "min",
    value: function min(v) {
      this.x = Math.min(this.x, v.x);
      this.y = Math.min(this.y, v.y);
      return this;
    }
  }, {
    key: "max",
    value: function max(v) {
      this.x = Math.max(this.x, v.x);
      this.y = Math.max(this.y, v.y);
      return this;
    }
  }, {
    key: "clamp",
    value: function clamp(min, max) {
      // assumes min < max, componentwise
      this.x = Math.max(min.x, Math.min(max.x, this.x));
      this.y = Math.max(min.y, Math.min(max.y, this.y));
      return this;
    }
  }, {
    key: "clampScalar",
    value: function clampScalar(minVal, maxVal) {
      this.x = Math.max(minVal, Math.min(maxVal, this.x));
      this.y = Math.max(minVal, Math.min(maxVal, this.y));
      return this;
    }
  }, {
    key: "clampLength",
    value: function clampLength(min, max) {
      var length = this.length();
      return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
    }
  }, {
    key: "floor",
    value: function floor() {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      return this;
    }
  }, {
    key: "ceil",
    value: function ceil() {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      return this;
    }
  }, {
    key: "round",
    value: function round() {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      return this;
    }
  }, {
    key: "roundToZero",
    value: function roundToZero() {
      this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
      this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
      return this;
    }
  }, {
    key: "negate",
    value: function negate() {
      this.x = -this.x;
      this.y = -this.y;
      return this;
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return this.x * v.x + this.y * v.y;
    }
  }, {
    key: "cross",
    value: function cross(v) {
      return this.x * v.y - this.y * v.x;
    }
  }, {
    key: "lengthSq",
    value: function lengthSq() {
      return this.x * this.x + this.y * this.y;
    }
  }, {
    key: "length",
    value: function length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }, {
    key: "manhattanLength",
    value: function manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y);
    }
  }, {
    key: "normalize",
    value: function normalize() {
      return this.divideScalar(this.length() || 1);
    }
  }, {
    key: "angle",
    value: function angle() {
      // computes the angle in radians with respect to the positive x-axis
      var angle = Math.atan2(-this.y, -this.x) + Math.PI;
      return angle;
    }
  }, {
    key: "distanceTo",
    value: function distanceTo(v) {
      return Math.sqrt(this.distanceToSquared(v));
    }
  }, {
    key: "distanceToSquared",
    value: function distanceToSquared(v) {
      var dx = this.x - v.x,
          dy = this.y - v.y;
      return dx * dx + dy * dy;
    }
  }, {
    key: "manhattanDistanceTo",
    value: function manhattanDistanceTo(v) {
      return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
    }
  }, {
    key: "setLength",
    value: function setLength(length) {
      return this.normalize().multiplyScalar(length);
    }
  }, {
    key: "lerp",
    value: function lerp(v, alpha) {
      this.x += (v.x - this.x) * alpha;
      this.y += (v.y - this.y) * alpha;
      return this;
    }
  }, {
    key: "lerpVectors",
    value: function lerpVectors(v1, v2, alpha) {
      this.x = v1.x + (v2.x - v1.x) * alpha;
      this.y = v1.y + (v2.y - v1.y) * alpha;
      return this;
    }
  }, {
    key: "equals",
    value: function equals(v) {
      return v.x === this.x && v.y === this.y;
    }
  }, {
    key: "fromArray",
    value: function fromArray(array) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.x = array[offset];
      this.y = array[offset + 1];
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      array[offset] = this.x;
      array[offset + 1] = this.y;
      return array;
    }
  }, {
    key: "fromBufferAttribute",
    value: function fromBufferAttribute(attribute, index, offset) {
      if (offset !== undefined) {
        console.warn('THREE.Vector2: offset has been removed from .fromBufferAttribute().');
      }

      this.x = attribute.getX(index);
      this.y = attribute.getY(index);
      return this;
    }
  }, {
    key: "rotateAround",
    value: function rotateAround(center, angle) {
      var c = Math.cos(angle),
          s = Math.sin(angle);
      var x = this.x - center.x;
      var y = this.y - center.y;
      this.x = x * c - y * s + center.x;
      this.y = x * s + y * c + center.y;
      return this;
    }
  }, {
    key: "random",
    value: function random() {
      this.x = Math.random();
      this.y = Math.random();
      return this;
    }
  }, {
    key: _Symbol$iterator,
    value: /*#__PURE__*/_regeneratorRuntime().mark(function value() {
      return _regeneratorRuntime().wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.x;

            case 2:
              _context.next = 4;
              return this.y;

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, value, this);
    })
  }]);

  return Vector2;
}(Symbol.iterator);

var Matrix3 = /*#__PURE__*/function () {
  function Matrix3() {
    _classCallCheck$3(this, Matrix3);

    this.isMatrix3 = true;
    this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1];

    if (arguments.length > 0) {
      console.error('THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.');
    }
  }

  _createClass$2(Matrix3, [{
    key: "set",
    value: function set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
      var te = this.elements;
      te[0] = n11;
      te[1] = n21;
      te[2] = n31;
      te[3] = n12;
      te[4] = n22;
      te[5] = n32;
      te[6] = n13;
      te[7] = n23;
      te[8] = n33;
      return this;
    }
  }, {
    key: "identity",
    value: function identity() {
      this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
      return this;
    }
  }, {
    key: "copy",
    value: function copy(m) {
      var te = this.elements;
      var me = m.elements;
      te[0] = me[0];
      te[1] = me[1];
      te[2] = me[2];
      te[3] = me[3];
      te[4] = me[4];
      te[5] = me[5];
      te[6] = me[6];
      te[7] = me[7];
      te[8] = me[8];
      return this;
    }
  }, {
    key: "extractBasis",
    value: function extractBasis(xAxis, yAxis, zAxis) {
      xAxis.setFromMatrix3Column(this, 0);
      yAxis.setFromMatrix3Column(this, 1);
      zAxis.setFromMatrix3Column(this, 2);
      return this;
    }
  }, {
    key: "setFromMatrix4",
    value: function setFromMatrix4(m) {
      var me = m.elements;
      this.set(me[0], me[4], me[8], me[1], me[5], me[9], me[2], me[6], me[10]);
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(m) {
      return this.multiplyMatrices(this, m);
    }
  }, {
    key: "premultiply",
    value: function premultiply(m) {
      return this.multiplyMatrices(m, this);
    }
  }, {
    key: "multiplyMatrices",
    value: function multiplyMatrices(a, b) {
      var ae = a.elements;
      var be = b.elements;
      var te = this.elements;
      var a11 = ae[0],
          a12 = ae[3],
          a13 = ae[6];
      var a21 = ae[1],
          a22 = ae[4],
          a23 = ae[7];
      var a31 = ae[2],
          a32 = ae[5],
          a33 = ae[8];
      var b11 = be[0],
          b12 = be[3],
          b13 = be[6];
      var b21 = be[1],
          b22 = be[4],
          b23 = be[7];
      var b31 = be[2],
          b32 = be[5],
          b33 = be[8];
      te[0] = a11 * b11 + a12 * b21 + a13 * b31;
      te[3] = a11 * b12 + a12 * b22 + a13 * b32;
      te[6] = a11 * b13 + a12 * b23 + a13 * b33;
      te[1] = a21 * b11 + a22 * b21 + a23 * b31;
      te[4] = a21 * b12 + a22 * b22 + a23 * b32;
      te[7] = a21 * b13 + a22 * b23 + a23 * b33;
      te[2] = a31 * b11 + a32 * b21 + a33 * b31;
      te[5] = a31 * b12 + a32 * b22 + a33 * b32;
      te[8] = a31 * b13 + a32 * b23 + a33 * b33;
      return this;
    }
  }, {
    key: "multiplyScalar",
    value: function multiplyScalar(s) {
      var te = this.elements;
      te[0] *= s;
      te[3] *= s;
      te[6] *= s;
      te[1] *= s;
      te[4] *= s;
      te[7] *= s;
      te[2] *= s;
      te[5] *= s;
      te[8] *= s;
      return this;
    }
  }, {
    key: "determinant",
    value: function determinant() {
      var te = this.elements;
      var a = te[0],
          b = te[1],
          c = te[2],
          d = te[3],
          e = te[4],
          f = te[5],
          g = te[6],
          h = te[7],
          i = te[8];
      return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
    }
  }, {
    key: "invert",
    value: function invert() {
      var te = this.elements,
          n11 = te[0],
          n21 = te[1],
          n31 = te[2],
          n12 = te[3],
          n22 = te[4],
          n32 = te[5],
          n13 = te[6],
          n23 = te[7],
          n33 = te[8],
          t11 = n33 * n22 - n32 * n23,
          t12 = n32 * n13 - n33 * n12,
          t13 = n23 * n12 - n22 * n13,
          det = n11 * t11 + n21 * t12 + n31 * t13;
      if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
      var detInv = 1 / det;
      te[0] = t11 * detInv;
      te[1] = (n31 * n23 - n33 * n21) * detInv;
      te[2] = (n32 * n21 - n31 * n22) * detInv;
      te[3] = t12 * detInv;
      te[4] = (n33 * n11 - n31 * n13) * detInv;
      te[5] = (n31 * n12 - n32 * n11) * detInv;
      te[6] = t13 * detInv;
      te[7] = (n21 * n13 - n23 * n11) * detInv;
      te[8] = (n22 * n11 - n21 * n12) * detInv;
      return this;
    }
  }, {
    key: "transpose",
    value: function transpose() {
      var tmp;
      var m = this.elements;
      tmp = m[1];
      m[1] = m[3];
      m[3] = tmp;
      tmp = m[2];
      m[2] = m[6];
      m[6] = tmp;
      tmp = m[5];
      m[5] = m[7];
      m[7] = tmp;
      return this;
    }
  }, {
    key: "getNormalMatrix",
    value: function getNormalMatrix(matrix4) {
      return this.setFromMatrix4(matrix4).invert().transpose();
    }
  }, {
    key: "transposeIntoArray",
    value: function transposeIntoArray(r) {
      var m = this.elements;
      r[0] = m[0];
      r[1] = m[3];
      r[2] = m[6];
      r[3] = m[1];
      r[4] = m[4];
      r[5] = m[7];
      r[6] = m[2];
      r[7] = m[5];
      r[8] = m[8];
      return this;
    }
  }, {
    key: "setUvTransform",
    value: function setUvTransform(tx, ty, sx, sy, rotation, cx, cy) {
      var c = Math.cos(rotation);
      var s = Math.sin(rotation);
      this.set(sx * c, sx * s, -sx * (c * cx + s * cy) + cx + tx, -sy * s, sy * c, -sy * (-s * cx + c * cy) + cy + ty, 0, 0, 1);
      return this;
    }
  }, {
    key: "scale",
    value: function scale(sx, sy) {
      var te = this.elements;
      te[0] *= sx;
      te[3] *= sx;
      te[6] *= sx;
      te[1] *= sy;
      te[4] *= sy;
      te[7] *= sy;
      return this;
    }
  }, {
    key: "rotate",
    value: function rotate(theta) {
      var c = Math.cos(theta);
      var s = Math.sin(theta);
      var te = this.elements;
      var a11 = te[0],
          a12 = te[3],
          a13 = te[6];
      var a21 = te[1],
          a22 = te[4],
          a23 = te[7];
      te[0] = c * a11 + s * a21;
      te[3] = c * a12 + s * a22;
      te[6] = c * a13 + s * a23;
      te[1] = -s * a11 + c * a21;
      te[4] = -s * a12 + c * a22;
      te[7] = -s * a13 + c * a23;
      return this;
    }
  }, {
    key: "translate",
    value: function translate(tx, ty) {
      var te = this.elements;
      te[0] += tx * te[2];
      te[3] += tx * te[5];
      te[6] += tx * te[8];
      te[1] += ty * te[2];
      te[4] += ty * te[5];
      te[7] += ty * te[8];
      return this;
    }
  }, {
    key: "equals",
    value: function equals(matrix) {
      var te = this.elements;
      var me = matrix.elements;

      for (var i = 0; i < 9; i++) {
        if (te[i] !== me[i]) return false;
      }

      return true;
    }
  }, {
    key: "fromArray",
    value: function fromArray(array) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      for (var i = 0; i < 9; i++) {
        this.elements[i] = array[i + offset];
      }

      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var te = this.elements;
      array[offset] = te[0];
      array[offset + 1] = te[1];
      array[offset + 2] = te[2];
      array[offset + 3] = te[3];
      array[offset + 4] = te[4];
      array[offset + 5] = te[5];
      array[offset + 6] = te[6];
      array[offset + 7] = te[7];
      array[offset + 8] = te[8];
      return array;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor().fromArray(this.elements);
    }
  }]);

  return Matrix3;
}();

function arrayMin(array) {
  if (array.length === 0) return Infinity;
  var min = array[0];

  for (var i = 1, l = array.length; i < l; ++i) {
    if (array[i] < min) min = array[i];
  }

  return min;
}

function arrayMax(array) {
  if (array.length === 0) return -Infinity;
  var max = array[0];

  for (var i = 1, l = array.length; i < l; ++i) {
    if (array[i] > max) max = array[i];
  }

  return max;
}

function arrayNeedsUint32(array) {
  // assumes larger values usually on last
  for (var i = array.length - 1; i >= 0; --i) {
    if (array[i] > 65535) return true;
  }

  return false;
}

var TYPED_ARRAYS = {
  Int8Array: Int8Array,
  Uint8Array: Uint8Array,
  Uint8ClampedArray: Uint8ClampedArray,
  Int16Array: Int16Array,
  Uint16Array: Uint16Array,
  Int32Array: Int32Array,
  Uint32Array: Uint32Array,
  Float32Array: Float32Array,
  Float64Array: Float64Array
};

function getTypedArray(type, buffer) {
  return new TYPED_ARRAYS[type](buffer);
}

function createElementNS(name) {
  return document.createElementNS('http://www.w3.org/1999/xhtml', name);
}

var _FN;
function SRGBToLinear(c) {
  return c < 0.04045 ? c * 0.0773993808 : Math.pow(c * 0.9478672986 + 0.0521327014, 2.4);
}
function LinearToSRGB(c) {
  return c < 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 0.41666) - 0.055;
} // JavaScript RGB-to-RGB transforms, defined as
// FN[InputColorSpace][OutputColorSpace] callback functions.

var FN = (_FN = {}, _defineProperty$3(_FN, SRGBColorSpace, _defineProperty$3({}, LinearSRGBColorSpace, SRGBToLinear)), _defineProperty$3(_FN, LinearSRGBColorSpace, _defineProperty$3({}, SRGBColorSpace, LinearToSRGB)), _FN);
var ColorManagement = {
  legacyMode: true,

  get workingColorSpace() {
    return LinearSRGBColorSpace;
  },

  set workingColorSpace(colorSpace) {
    console.warn('THREE.ColorManagement: .workingColorSpace is readonly.');
  },

  convert: function convert(color, sourceColorSpace, targetColorSpace) {
    if (this.legacyMode || sourceColorSpace === targetColorSpace || !sourceColorSpace || !targetColorSpace) {
      return color;
    }

    if (FN[sourceColorSpace] && FN[sourceColorSpace][targetColorSpace] !== undefined) {
      var fn = FN[sourceColorSpace][targetColorSpace];
      color.r = fn(color.r);
      color.g = fn(color.g);
      color.b = fn(color.b);
      return color;
    }

    throw new Error('Unsupported color space conversion.');
  },
  fromWorkingColorSpace: function fromWorkingColorSpace(color, targetColorSpace) {
    return this.convert(color, this.workingColorSpace, targetColorSpace);
  },
  toWorkingColorSpace: function toWorkingColorSpace(color, sourceColorSpace) {
    return this.convert(color, sourceColorSpace, this.workingColorSpace);
  }
};

var _colorKeywords = {
  'aliceblue': 0xF0F8FF,
  'antiquewhite': 0xFAEBD7,
  'aqua': 0x00FFFF,
  'aquamarine': 0x7FFFD4,
  'azure': 0xF0FFFF,
  'beige': 0xF5F5DC,
  'bisque': 0xFFE4C4,
  'black': 0x000000,
  'blanchedalmond': 0xFFEBCD,
  'blue': 0x0000FF,
  'blueviolet': 0x8A2BE2,
  'brown': 0xA52A2A,
  'burlywood': 0xDEB887,
  'cadetblue': 0x5F9EA0,
  'chartreuse': 0x7FFF00,
  'chocolate': 0xD2691E,
  'coral': 0xFF7F50,
  'cornflowerblue': 0x6495ED,
  'cornsilk': 0xFFF8DC,
  'crimson': 0xDC143C,
  'cyan': 0x00FFFF,
  'darkblue': 0x00008B,
  'darkcyan': 0x008B8B,
  'darkgoldenrod': 0xB8860B,
  'darkgray': 0xA9A9A9,
  'darkgreen': 0x006400,
  'darkgrey': 0xA9A9A9,
  'darkkhaki': 0xBDB76B,
  'darkmagenta': 0x8B008B,
  'darkolivegreen': 0x556B2F,
  'darkorange': 0xFF8C00,
  'darkorchid': 0x9932CC,
  'darkred': 0x8B0000,
  'darksalmon': 0xE9967A,
  'darkseagreen': 0x8FBC8F,
  'darkslateblue': 0x483D8B,
  'darkslategray': 0x2F4F4F,
  'darkslategrey': 0x2F4F4F,
  'darkturquoise': 0x00CED1,
  'darkviolet': 0x9400D3,
  'deeppink': 0xFF1493,
  'deepskyblue': 0x00BFFF,
  'dimgray': 0x696969,
  'dimgrey': 0x696969,
  'dodgerblue': 0x1E90FF,
  'firebrick': 0xB22222,
  'floralwhite': 0xFFFAF0,
  'forestgreen': 0x228B22,
  'fuchsia': 0xFF00FF,
  'gainsboro': 0xDCDCDC,
  'ghostwhite': 0xF8F8FF,
  'gold': 0xFFD700,
  'goldenrod': 0xDAA520,
  'gray': 0x808080,
  'green': 0x008000,
  'greenyellow': 0xADFF2F,
  'grey': 0x808080,
  'honeydew': 0xF0FFF0,
  'hotpink': 0xFF69B4,
  'indianred': 0xCD5C5C,
  'indigo': 0x4B0082,
  'ivory': 0xFFFFF0,
  'khaki': 0xF0E68C,
  'lavender': 0xE6E6FA,
  'lavenderblush': 0xFFF0F5,
  'lawngreen': 0x7CFC00,
  'lemonchiffon': 0xFFFACD,
  'lightblue': 0xADD8E6,
  'lightcoral': 0xF08080,
  'lightcyan': 0xE0FFFF,
  'lightgoldenrodyellow': 0xFAFAD2,
  'lightgray': 0xD3D3D3,
  'lightgreen': 0x90EE90,
  'lightgrey': 0xD3D3D3,
  'lightpink': 0xFFB6C1,
  'lightsalmon': 0xFFA07A,
  'lightseagreen': 0x20B2AA,
  'lightskyblue': 0x87CEFA,
  'lightslategray': 0x778899,
  'lightslategrey': 0x778899,
  'lightsteelblue': 0xB0C4DE,
  'lightyellow': 0xFFFFE0,
  'lime': 0x00FF00,
  'limegreen': 0x32CD32,
  'linen': 0xFAF0E6,
  'magenta': 0xFF00FF,
  'maroon': 0x800000,
  'mediumaquamarine': 0x66CDAA,
  'mediumblue': 0x0000CD,
  'mediumorchid': 0xBA55D3,
  'mediumpurple': 0x9370DB,
  'mediumseagreen': 0x3CB371,
  'mediumslateblue': 0x7B68EE,
  'mediumspringgreen': 0x00FA9A,
  'mediumturquoise': 0x48D1CC,
  'mediumvioletred': 0xC71585,
  'midnightblue': 0x191970,
  'mintcream': 0xF5FFFA,
  'mistyrose': 0xFFE4E1,
  'moccasin': 0xFFE4B5,
  'navajowhite': 0xFFDEAD,
  'navy': 0x000080,
  'oldlace': 0xFDF5E6,
  'olive': 0x808000,
  'olivedrab': 0x6B8E23,
  'orange': 0xFFA500,
  'orangered': 0xFF4500,
  'orchid': 0xDA70D6,
  'palegoldenrod': 0xEEE8AA,
  'palegreen': 0x98FB98,
  'paleturquoise': 0xAFEEEE,
  'palevioletred': 0xDB7093,
  'papayawhip': 0xFFEFD5,
  'peachpuff': 0xFFDAB9,
  'peru': 0xCD853F,
  'pink': 0xFFC0CB,
  'plum': 0xDDA0DD,
  'powderblue': 0xB0E0E6,
  'purple': 0x800080,
  'rebeccapurple': 0x663399,
  'red': 0xFF0000,
  'rosybrown': 0xBC8F8F,
  'royalblue': 0x4169E1,
  'saddlebrown': 0x8B4513,
  'salmon': 0xFA8072,
  'sandybrown': 0xF4A460,
  'seagreen': 0x2E8B57,
  'seashell': 0xFFF5EE,
  'sienna': 0xA0522D,
  'silver': 0xC0C0C0,
  'skyblue': 0x87CEEB,
  'slateblue': 0x6A5ACD,
  'slategray': 0x708090,
  'slategrey': 0x708090,
  'snow': 0xFFFAFA,
  'springgreen': 0x00FF7F,
  'steelblue': 0x4682B4,
  'tan': 0xD2B48C,
  'teal': 0x008080,
  'thistle': 0xD8BFD8,
  'tomato': 0xFF6347,
  'turquoise': 0x40E0D0,
  'violet': 0xEE82EE,
  'wheat': 0xF5DEB3,
  'white': 0xFFFFFF,
  'whitesmoke': 0xF5F5F5,
  'yellow': 0xFFFF00,
  'yellowgreen': 0x9ACD32
};
var _rgb = {
  r: 0,
  g: 0,
  b: 0
};
var _hslA = {
  h: 0,
  s: 0,
  l: 0
};
var _hslB = {
  h: 0,
  s: 0,
  l: 0
};

function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
  return p;
}

function toComponents(source, target) {
  target.r = source.r;
  target.g = source.g;
  target.b = source.b;
  return target;
}

var Color = /*#__PURE__*/function (_Symbol$iterator) {
  function Color(r, g, b) {
    _classCallCheck$3(this, Color);

    this.isColor = true;
    this.r = 1;
    this.g = 1;
    this.b = 1;

    if (g === undefined && b === undefined) {
      // r is THREE.Color, hex or string
      return this.set(r);
    }

    return this.setRGB(r, g, b);
  }

  _createClass$2(Color, [{
    key: "set",
    value: function set(value) {
      if (value && value.isColor) {
        this.copy(value);
      } else if (typeof value === 'number') {
        this.setHex(value);
      } else if (typeof value === 'string') {
        this.setStyle(value);
      }

      return this;
    }
  }, {
    key: "setScalar",
    value: function setScalar(scalar) {
      this.r = scalar;
      this.g = scalar;
      this.b = scalar;
      return this;
    }
  }, {
    key: "setHex",
    value: function setHex(hex) {
      var colorSpace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SRGBColorSpace;
      hex = Math.floor(hex);
      this.r = (hex >> 16 & 255) / 255;
      this.g = (hex >> 8 & 255) / 255;
      this.b = (hex & 255) / 255;
      ColorManagement.toWorkingColorSpace(this, colorSpace);
      return this;
    }
  }, {
    key: "setRGB",
    value: function setRGB(r, g, b) {
      var colorSpace = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : LinearSRGBColorSpace;
      this.r = r;
      this.g = g;
      this.b = b;
      ColorManagement.toWorkingColorSpace(this, colorSpace);
      return this;
    }
  }, {
    key: "setHSL",
    value: function setHSL(h, s, l) {
      var colorSpace = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : LinearSRGBColorSpace;
      // h,s,l ranges are in 0.0 - 1.0
      h = euclideanModulo(h, 1);
      s = clamp(s, 0, 1);
      l = clamp(l, 0, 1);

      if (s === 0) {
        this.r = this.g = this.b = l;
      } else {
        var p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
        var q = 2 * l - p;
        this.r = hue2rgb(q, p, h + 1 / 3);
        this.g = hue2rgb(q, p, h);
        this.b = hue2rgb(q, p, h - 1 / 3);
      }

      ColorManagement.toWorkingColorSpace(this, colorSpace);
      return this;
    }
  }, {
    key: "setStyle",
    value: function setStyle(style) {
      var colorSpace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SRGBColorSpace;

      function handleAlpha(string) {
        if (string === undefined) return;

        if (parseFloat(string) < 1) {
          console.warn('THREE.Color: Alpha component of ' + style + ' will be ignored.');
        }
      }

      var m;

      if (m = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(style)) {
        // rgb / hsl
        var color;
        var name = m[1];
        var components = m[2];

        switch (name) {
          case 'rgb':
          case 'rgba':
            if (color = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
              // rgb(255,0,0) rgba(255,0,0,0.5)
              this.r = Math.min(255, parseInt(color[1], 10)) / 255;
              this.g = Math.min(255, parseInt(color[2], 10)) / 255;
              this.b = Math.min(255, parseInt(color[3], 10)) / 255;
              ColorManagement.toWorkingColorSpace(this, colorSpace);
              handleAlpha(color[4]);
              return this;
            }

            if (color = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
              // rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
              this.r = Math.min(100, parseInt(color[1], 10)) / 100;
              this.g = Math.min(100, parseInt(color[2], 10)) / 100;
              this.b = Math.min(100, parseInt(color[3], 10)) / 100;
              ColorManagement.toWorkingColorSpace(this, colorSpace);
              handleAlpha(color[4]);
              return this;
            }

            break;

          case 'hsl':
          case 'hsla':
            if (color = /^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
              // hsl(120,50%,50%) hsla(120,50%,50%,0.5)
              var h = parseFloat(color[1]) / 360;
              var s = parseInt(color[2], 10) / 100;
              var l = parseInt(color[3], 10) / 100;
              handleAlpha(color[4]);
              return this.setHSL(h, s, l, colorSpace);
            }

            break;
        }
      } else if (m = /^\#([A-Fa-f\d]+)$/.exec(style)) {
        // hex color
        var hex = m[1];
        var size = hex.length;

        if (size === 3) {
          // #ff0
          this.r = parseInt(hex.charAt(0) + hex.charAt(0), 16) / 255;
          this.g = parseInt(hex.charAt(1) + hex.charAt(1), 16) / 255;
          this.b = parseInt(hex.charAt(2) + hex.charAt(2), 16) / 255;
          ColorManagement.toWorkingColorSpace(this, colorSpace);
          return this;
        } else if (size === 6) {
          // #ff0000
          this.r = parseInt(hex.charAt(0) + hex.charAt(1), 16) / 255;
          this.g = parseInt(hex.charAt(2) + hex.charAt(3), 16) / 255;
          this.b = parseInt(hex.charAt(4) + hex.charAt(5), 16) / 255;
          ColorManagement.toWorkingColorSpace(this, colorSpace);
          return this;
        }
      }

      if (style && style.length > 0) {
        return this.setColorName(style, colorSpace);
      }

      return this;
    }
  }, {
    key: "setColorName",
    value: function setColorName(style) {
      var colorSpace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SRGBColorSpace;

      // color keywords
      var hex = _colorKeywords[style.toLowerCase()];

      if (hex !== undefined) {
        // red
        this.setHex(hex, colorSpace);
      } else {
        // unknown color
        console.warn('THREE.Color: Unknown color ' + style);
      }

      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor(this.r, this.g, this.b);
    }
  }, {
    key: "copy",
    value: function copy(color) {
      this.r = color.r;
      this.g = color.g;
      this.b = color.b;
      return this;
    }
  }, {
    key: "copySRGBToLinear",
    value: function copySRGBToLinear(color) {
      this.r = SRGBToLinear(color.r);
      this.g = SRGBToLinear(color.g);
      this.b = SRGBToLinear(color.b);
      return this;
    }
  }, {
    key: "copyLinearToSRGB",
    value: function copyLinearToSRGB(color) {
      this.r = LinearToSRGB(color.r);
      this.g = LinearToSRGB(color.g);
      this.b = LinearToSRGB(color.b);
      return this;
    }
  }, {
    key: "convertSRGBToLinear",
    value: function convertSRGBToLinear() {
      this.copySRGBToLinear(this);
      return this;
    }
  }, {
    key: "convertLinearToSRGB",
    value: function convertLinearToSRGB() {
      this.copyLinearToSRGB(this);
      return this;
    }
  }, {
    key: "getHex",
    value: function getHex() {
      var colorSpace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SRGBColorSpace;
      ColorManagement.fromWorkingColorSpace(toComponents(this, _rgb), colorSpace);
      return clamp(_rgb.r * 255, 0, 255) << 16 ^ clamp(_rgb.g * 255, 0, 255) << 8 ^ clamp(_rgb.b * 255, 0, 255) << 0;
    }
  }, {
    key: "getHexString",
    value: function getHexString() {
      var colorSpace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SRGBColorSpace;
      return ('000000' + this.getHex(colorSpace).toString(16)).slice(-6);
    }
  }, {
    key: "getHSL",
    value: function getHSL(target) {
      var colorSpace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LinearSRGBColorSpace;
      // h,s,l ranges are in 0.0 - 1.0
      ColorManagement.fromWorkingColorSpace(toComponents(this, _rgb), colorSpace);
      var r = _rgb.r,
          g = _rgb.g,
          b = _rgb.b;
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var hue, saturation;
      var lightness = (min + max) / 2.0;

      if (min === max) {
        hue = 0;
        saturation = 0;
      } else {
        var delta = max - min;
        saturation = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);

        switch (max) {
          case r:
            hue = (g - b) / delta + (g < b ? 6 : 0);
            break;

          case g:
            hue = (b - r) / delta + 2;
            break;

          case b:
            hue = (r - g) / delta + 4;
            break;
        }

        hue /= 6;
      }

      target.h = hue;
      target.s = saturation;
      target.l = lightness;
      return target;
    }
  }, {
    key: "getRGB",
    value: function getRGB(target) {
      var colorSpace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LinearSRGBColorSpace;
      ColorManagement.fromWorkingColorSpace(toComponents(this, _rgb), colorSpace);
      target.r = _rgb.r;
      target.g = _rgb.g;
      target.b = _rgb.b;
      return target;
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var colorSpace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : SRGBColorSpace;
      ColorManagement.fromWorkingColorSpace(toComponents(this, _rgb), colorSpace);

      if (colorSpace !== SRGBColorSpace) {
        // Requires CSS Color Module Level 4 (https://www.w3.org/TR/css-color-4/).
        return "color(".concat(colorSpace, " ").concat(_rgb.r, " ").concat(_rgb.g, " ").concat(_rgb.b, ")");
      }

      return "rgb(".concat(_rgb.r * 255 | 0, ",").concat(_rgb.g * 255 | 0, ",").concat(_rgb.b * 255 | 0, ")");
    }
  }, {
    key: "offsetHSL",
    value: function offsetHSL(h, s, l) {
      this.getHSL(_hslA);
      _hslA.h += h;
      _hslA.s += s;
      _hslA.l += l;
      this.setHSL(_hslA.h, _hslA.s, _hslA.l);
      return this;
    }
  }, {
    key: "add",
    value: function add(color) {
      this.r += color.r;
      this.g += color.g;
      this.b += color.b;
      return this;
    }
  }, {
    key: "addColors",
    value: function addColors(color1, color2) {
      this.r = color1.r + color2.r;
      this.g = color1.g + color2.g;
      this.b = color1.b + color2.b;
      return this;
    }
  }, {
    key: "addScalar",
    value: function addScalar(s) {
      this.r += s;
      this.g += s;
      this.b += s;
      return this;
    }
  }, {
    key: "sub",
    value: function sub(color) {
      this.r = Math.max(0, this.r - color.r);
      this.g = Math.max(0, this.g - color.g);
      this.b = Math.max(0, this.b - color.b);
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(color) {
      this.r *= color.r;
      this.g *= color.g;
      this.b *= color.b;
      return this;
    }
  }, {
    key: "multiplyScalar",
    value: function multiplyScalar(s) {
      this.r *= s;
      this.g *= s;
      this.b *= s;
      return this;
    }
  }, {
    key: "lerp",
    value: function lerp(color, alpha) {
      this.r += (color.r - this.r) * alpha;
      this.g += (color.g - this.g) * alpha;
      this.b += (color.b - this.b) * alpha;
      return this;
    }
  }, {
    key: "lerpColors",
    value: function lerpColors(color1, color2, alpha) {
      this.r = color1.r + (color2.r - color1.r) * alpha;
      this.g = color1.g + (color2.g - color1.g) * alpha;
      this.b = color1.b + (color2.b - color1.b) * alpha;
      return this;
    }
  }, {
    key: "lerpHSL",
    value: function lerpHSL(color, alpha) {
      this.getHSL(_hslA);
      color.getHSL(_hslB);
      var h = lerp(_hslA.h, _hslB.h, alpha);
      var s = lerp(_hslA.s, _hslB.s, alpha);
      var l = lerp(_hslA.l, _hslB.l, alpha);
      this.setHSL(h, s, l);
      return this;
    }
  }, {
    key: "equals",
    value: function equals(c) {
      return c.r === this.r && c.g === this.g && c.b === this.b;
    }
  }, {
    key: "fromArray",
    value: function fromArray(array) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.r = array[offset];
      this.g = array[offset + 1];
      this.b = array[offset + 2];
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      array[offset] = this.r;
      array[offset + 1] = this.g;
      array[offset + 2] = this.b;
      return array;
    }
  }, {
    key: "fromBufferAttribute",
    value: function fromBufferAttribute(attribute, index) {
      this.r = attribute.getX(index);
      this.g = attribute.getY(index);
      this.b = attribute.getZ(index);

      if (attribute.normalized === true) {
        // assuming Uint8Array
        this.r /= 255;
        this.g /= 255;
        this.b /= 255;
      }

      return this;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.getHex();
    }
  }, {
    key: _Symbol$iterator,
    value: /*#__PURE__*/_regeneratorRuntime().mark(function value() {
      return _regeneratorRuntime().wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.r;

            case 2:
              _context.next = 4;
              return this.g;

            case 4:
              _context.next = 6;
              return this.b;

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, value, this);
    })
  }]);

  return Color;
}(Symbol.iterator);

Color.NAMES = _colorKeywords;

var _canvas;

var ImageUtils = /*#__PURE__*/function () {
  function ImageUtils() {
    _classCallCheck$3(this, ImageUtils);
  }

  _createClass$2(ImageUtils, null, [{
    key: "getDataURL",
    value: function getDataURL(image) {
      if (/^data:/i.test(image.src)) {
        return image.src;
      }

      if (typeof HTMLCanvasElement == 'undefined') {
        return image.src;
      }

      var canvas;

      if (image instanceof HTMLCanvasElement) {
        canvas = image;
      } else {
        if (_canvas === undefined) _canvas = createElementNS('canvas');
        _canvas.width = image.width;
        _canvas.height = image.height;

        var context = _canvas.getContext('2d');

        if (image instanceof ImageData) {
          context.putImageData(image, 0, 0);
        } else {
          context.drawImage(image, 0, 0, image.width, image.height);
        }

        canvas = _canvas;
      }

      if (canvas.width > 2048 || canvas.height > 2048) {
        console.warn('THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons', image);
        return canvas.toDataURL('image/jpeg', 0.6);
      } else {
        return canvas.toDataURL('image/png');
      }
    }
  }, {
    key: "sRGBToLinear",
    value: function sRGBToLinear(image) {
      if (typeof HTMLImageElement !== 'undefined' && image instanceof HTMLImageElement || typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLCanvasElement || typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) {
        var canvas = createElementNS('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, image.width, image.height);
        var imageData = context.getImageData(0, 0, image.width, image.height);
        var data = imageData.data;

        for (var i = 0; i < data.length; i++) {
          data[i] = SRGBToLinear(data[i] / 255) * 255;
        }

        context.putImageData(imageData, 0, 0);
        return canvas;
      } else if (image.data) {
        var _data = image.data.slice(0);

        for (var _i = 0; _i < _data.length; _i++) {
          if (_data instanceof Uint8Array || _data instanceof Uint8ClampedArray) {
            _data[_i] = Math.floor(SRGBToLinear(_data[_i] / 255) * 255);
          } else {
            // assuming float
            _data[_i] = SRGBToLinear(_data[_i]);
          }
        }

        return {
          data: _data,
          width: image.width,
          height: image.height
        };
      } else {
        console.warn('THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.');
        return image;
      }
    }
  }]);

  return ImageUtils;
}();

var Source = /*#__PURE__*/function () {
  function Source() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck$3(this, Source);

    this.isSource = true;
    this.uuid = generateUUID();
    this.data = data;
    this.version = 0;
  }

  _createClass$2(Source, [{
    key: "needsUpdate",
    set: function set(value) {
      if (value === true) this.version++;
    }
  }, {
    key: "toJSON",
    value: function toJSON(meta) {
      var isRootObject = meta === undefined || typeof meta === 'string';

      if (!isRootObject && meta.images[this.uuid] !== undefined) {
        return meta.images[this.uuid];
      }

      var output = {
        uuid: this.uuid,
        url: ''
      };
      var data = this.data;

      if (data !== null) {
        var url;

        if (Array.isArray(data)) {
          // cube texture
          url = [];

          for (var i = 0, l = data.length; i < l; i++) {
            if (data[i].isDataTexture) {
              url.push(serializeImage(data[i].image));
            } else {
              url.push(serializeImage(data[i]));
            }
          }
        } else {
          // texture
          url = serializeImage(data);
        }

        output.url = url;
      }

      if (!isRootObject) {
        meta.images[this.uuid] = output;
      }

      return output;
    }
  }]);

  return Source;
}();

function serializeImage(image) {
  if (typeof HTMLImageElement !== 'undefined' && image instanceof HTMLImageElement || typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLCanvasElement || typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) {
    // default images
    return ImageUtils.getDataURL(image);
  } else {
    if (image.data) {
      // images of DataTexture
      return {
        data: Array.prototype.slice.call(image.data),
        width: image.width,
        height: image.height,
        type: image.data.constructor.name
      };
    } else {
      console.warn('THREE.Texture: Unable to serialize Texture.');
      return {};
    }
  }
}

var textureId = 0;

var Texture = /*#__PURE__*/function (_EventDispatcher) {
  _inherits$1(Texture, _EventDispatcher);

  var _super = _createSuper$2(Texture);

  function Texture() {
    var _this;

    var image = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Texture.DEFAULT_IMAGE;
    var mapping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Texture.DEFAULT_MAPPING;
    var wrapS = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ClampToEdgeWrapping;
    var wrapT = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ClampToEdgeWrapping;
    var magFilter = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : LinearFilter;
    var minFilter = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : LinearMipmapLinearFilter;
    var format = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : RGBAFormat;
    var type = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : UnsignedByteType;
    var anisotropy = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 1;
    var encoding = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : LinearEncoding;

    _classCallCheck$3(this, Texture);

    _this = _super.call(this);
    _this.isTexture = true;
    Object.defineProperty(_assertThisInitialized$1(_this), 'id', {
      value: textureId++
    });
    _this.uuid = generateUUID();
    _this.name = '';
    _this.source = new Source(image);
    _this.mipmaps = [];
    _this.mapping = mapping;
    _this.wrapS = wrapS;
    _this.wrapT = wrapT;
    _this.magFilter = magFilter;
    _this.minFilter = minFilter;
    _this.anisotropy = anisotropy;
    _this.format = format;
    _this.internalFormat = null;
    _this.type = type;
    _this.offset = new Vector2(0, 0);
    _this.repeat = new Vector2(1, 1);
    _this.center = new Vector2(0, 0);
    _this.rotation = 0;
    _this.matrixAutoUpdate = true;
    _this.matrix = new Matrix3();
    _this.generateMipmaps = true;
    _this.premultiplyAlpha = false;
    _this.flipY = true;
    _this.unpackAlignment = 4; // valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)
    // Values of encoding !== THREE.LinearEncoding only supported on map, envMap and emissiveMap.
    //
    // Also changing the encoding after already used by a Material will not automatically make the Material
    // update. You need to explicitly call Material.needsUpdate to trigger it to recompile.

    _this.encoding = encoding;
    _this.userData = {};
    _this.version = 0;
    _this.onUpdate = null;
    _this.isRenderTargetTexture = false; // indicates whether a texture belongs to a render target or not

    _this.needsPMREMUpdate = false; // indicates whether this texture should be processed by PMREMGenerator or not (only relevant for render target textures)

    return _this;
  }

  _createClass$2(Texture, [{
    key: "image",
    get: function get() {
      return this.source.data;
    },
    set: function set(value) {
      this.source.data = value;
    }
  }, {
    key: "updateMatrix",
    value: function updateMatrix() {
      this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor().copy(this);
    }
  }, {
    key: "copy",
    value: function copy(source) {
      this.name = source.name;
      this.source = source.source;
      this.mipmaps = source.mipmaps.slice(0);
      this.mapping = source.mapping;
      this.wrapS = source.wrapS;
      this.wrapT = source.wrapT;
      this.magFilter = source.magFilter;
      this.minFilter = source.minFilter;
      this.anisotropy = source.anisotropy;
      this.format = source.format;
      this.internalFormat = source.internalFormat;
      this.type = source.type;
      this.offset.copy(source.offset);
      this.repeat.copy(source.repeat);
      this.center.copy(source.center);
      this.rotation = source.rotation;
      this.matrixAutoUpdate = source.matrixAutoUpdate;
      this.matrix.copy(source.matrix);
      this.generateMipmaps = source.generateMipmaps;
      this.premultiplyAlpha = source.premultiplyAlpha;
      this.flipY = source.flipY;
      this.unpackAlignment = source.unpackAlignment;
      this.encoding = source.encoding;
      this.userData = JSON.parse(JSON.stringify(source.userData));
      this.needsUpdate = true;
      return this;
    }
  }, {
    key: "toJSON",
    value: function toJSON(meta) {
      var isRootObject = meta === undefined || typeof meta === 'string';

      if (!isRootObject && meta.textures[this.uuid] !== undefined) {
        return meta.textures[this.uuid];
      }

      var output = {
        metadata: {
          version: 4.5,
          type: 'Texture',
          generator: 'Texture.toJSON'
        },
        uuid: this.uuid,
        name: this.name,
        image: this.source.toJSON(meta).uuid,
        mapping: this.mapping,
        repeat: [this.repeat.x, this.repeat.y],
        offset: [this.offset.x, this.offset.y],
        center: [this.center.x, this.center.y],
        rotation: this.rotation,
        wrap: [this.wrapS, this.wrapT],
        format: this.format,
        type: this.type,
        encoding: this.encoding,
        minFilter: this.minFilter,
        magFilter: this.magFilter,
        anisotropy: this.anisotropy,
        flipY: this.flipY,
        premultiplyAlpha: this.premultiplyAlpha,
        unpackAlignment: this.unpackAlignment
      };
      if (JSON.stringify(this.userData) !== '{}') output.userData = this.userData;

      if (!isRootObject) {
        meta.textures[this.uuid] = output;
      }

      return output;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.dispatchEvent({
        type: 'dispose'
      });
    }
  }, {
    key: "transformUv",
    value: function transformUv(uv) {
      if (this.mapping !== UVMapping) return uv;
      uv.applyMatrix3(this.matrix);

      if (uv.x < 0 || uv.x > 1) {
        switch (this.wrapS) {
          case RepeatWrapping:
            uv.x = uv.x - Math.floor(uv.x);
            break;

          case ClampToEdgeWrapping:
            uv.x = uv.x < 0 ? 0 : 1;
            break;

          case MirroredRepeatWrapping:
            if (Math.abs(Math.floor(uv.x) % 2) === 1) {
              uv.x = Math.ceil(uv.x) - uv.x;
            } else {
              uv.x = uv.x - Math.floor(uv.x);
            }

            break;
        }
      }

      if (uv.y < 0 || uv.y > 1) {
        switch (this.wrapT) {
          case RepeatWrapping:
            uv.y = uv.y - Math.floor(uv.y);
            break;

          case ClampToEdgeWrapping:
            uv.y = uv.y < 0 ? 0 : 1;
            break;

          case MirroredRepeatWrapping:
            if (Math.abs(Math.floor(uv.y) % 2) === 1) {
              uv.y = Math.ceil(uv.y) - uv.y;
            } else {
              uv.y = uv.y - Math.floor(uv.y);
            }

            break;
        }
      }

      if (this.flipY) {
        uv.y = 1 - uv.y;
      }

      return uv;
    }
  }, {
    key: "needsUpdate",
    set: function set(value) {
      if (value === true) {
        this.version++;
        this.source.needsUpdate = true;
      }
    }
  }]);

  return Texture;
}(EventDispatcher);

Texture.DEFAULT_IMAGE = null;
Texture.DEFAULT_MAPPING = UVMapping;

var Vector4 = /*#__PURE__*/function (_Symbol$iterator) {
  function Vector4() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var w = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    _classCallCheck$3(this, Vector4);

    this.isVector4 = true;
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  _createClass$2(Vector4, [{
    key: "width",
    get: function get() {
      return this.z;
    },
    set: function set(value) {
      this.z = value;
    }
  }, {
    key: "height",
    get: function get() {
      return this.w;
    },
    set: function set(value) {
      this.w = value;
    }
  }, {
    key: "set",
    value: function set(x, y, z, w) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
      return this;
    }
  }, {
    key: "setScalar",
    value: function setScalar(scalar) {
      this.x = scalar;
      this.y = scalar;
      this.z = scalar;
      this.w = scalar;
      return this;
    }
  }, {
    key: "setX",
    value: function setX(x) {
      this.x = x;
      return this;
    }
  }, {
    key: "setY",
    value: function setY(y) {
      this.y = y;
      return this;
    }
  }, {
    key: "setZ",
    value: function setZ(z) {
      this.z = z;
      return this;
    }
  }, {
    key: "setW",
    value: function setW(w) {
      this.w = w;
      return this;
    }
  }, {
    key: "setComponent",
    value: function setComponent(index, value) {
      switch (index) {
        case 0:
          this.x = value;
          break;

        case 1:
          this.y = value;
          break;

        case 2:
          this.z = value;
          break;

        case 3:
          this.w = value;
          break;

        default:
          throw new Error('index is out of range: ' + index);
      }

      return this;
    }
  }, {
    key: "getComponent",
    value: function getComponent(index) {
      switch (index) {
        case 0:
          return this.x;

        case 1:
          return this.y;

        case 2:
          return this.z;

        case 3:
          return this.w;

        default:
          throw new Error('index is out of range: ' + index);
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor(this.x, this.y, this.z, this.w);
    }
  }, {
    key: "copy",
    value: function copy(v) {
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
      this.w = v.w !== undefined ? v.w : 1;
      return this;
    }
  }, {
    key: "add",
    value: function add(v, w) {
      if (w !== undefined) {
        console.warn('THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
        return this.addVectors(v, w);
      }

      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
      this.w += v.w;
      return this;
    }
  }, {
    key: "addScalar",
    value: function addScalar(s) {
      this.x += s;
      this.y += s;
      this.z += s;
      this.w += s;
      return this;
    }
  }, {
    key: "addVectors",
    value: function addVectors(a, b) {
      this.x = a.x + b.x;
      this.y = a.y + b.y;
      this.z = a.z + b.z;
      this.w = a.w + b.w;
      return this;
    }
  }, {
    key: "addScaledVector",
    value: function addScaledVector(v, s) {
      this.x += v.x * s;
      this.y += v.y * s;
      this.z += v.z * s;
      this.w += v.w * s;
      return this;
    }
  }, {
    key: "sub",
    value: function sub(v, w) {
      if (w !== undefined) {
        console.warn('THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
        return this.subVectors(v, w);
      }

      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
      this.w -= v.w;
      return this;
    }
  }, {
    key: "subScalar",
    value: function subScalar(s) {
      this.x -= s;
      this.y -= s;
      this.z -= s;
      this.w -= s;
      return this;
    }
  }, {
    key: "subVectors",
    value: function subVectors(a, b) {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      this.z = a.z - b.z;
      this.w = a.w - b.w;
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(v) {
      this.x *= v.x;
      this.y *= v.y;
      this.z *= v.z;
      this.w *= v.w;
      return this;
    }
  }, {
    key: "multiplyScalar",
    value: function multiplyScalar(scalar) {
      this.x *= scalar;
      this.y *= scalar;
      this.z *= scalar;
      this.w *= scalar;
      return this;
    }
  }, {
    key: "applyMatrix4",
    value: function applyMatrix4(m) {
      var x = this.x,
          y = this.y,
          z = this.z,
          w = this.w;
      var e = m.elements;
      this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
      this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
      this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
      this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;
      return this;
    }
  }, {
    key: "divideScalar",
    value: function divideScalar(scalar) {
      return this.multiplyScalar(1 / scalar);
    }
  }, {
    key: "setAxisAngleFromQuaternion",
    value: function setAxisAngleFromQuaternion(q) {
      // http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm
      // q is assumed to be normalized
      this.w = 2 * Math.acos(q.w);
      var s = Math.sqrt(1 - q.w * q.w);

      if (s < 0.0001) {
        this.x = 1;
        this.y = 0;
        this.z = 0;
      } else {
        this.x = q.x / s;
        this.y = q.y / s;
        this.z = q.z / s;
      }

      return this;
    }
  }, {
    key: "setAxisAngleFromRotationMatrix",
    value: function setAxisAngleFromRotationMatrix(m) {
      // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm
      // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
      var angle, x, y, z; // variables for result

      var epsilon = 0.01,
          // margin to allow for rounding errors
      epsilon2 = 0.1,
          // margin to distinguish between 0 and 180 degrees
      te = m.elements,
          m11 = te[0],
          m12 = te[4],
          m13 = te[8],
          m21 = te[1],
          m22 = te[5],
          m23 = te[9],
          m31 = te[2],
          m32 = te[6],
          m33 = te[10];

      if (Math.abs(m12 - m21) < epsilon && Math.abs(m13 - m31) < epsilon && Math.abs(m23 - m32) < epsilon) {
        // singularity found
        // first check for identity matrix which must have +1 for all terms
        // in leading diagonal and zero in other terms
        if (Math.abs(m12 + m21) < epsilon2 && Math.abs(m13 + m31) < epsilon2 && Math.abs(m23 + m32) < epsilon2 && Math.abs(m11 + m22 + m33 - 3) < epsilon2) {
          // this singularity is identity matrix so angle = 0
          this.set(1, 0, 0, 0);
          return this; // zero angle, arbitrary axis
        } // otherwise this singularity is angle = 180


        angle = Math.PI;
        var xx = (m11 + 1) / 2;
        var yy = (m22 + 1) / 2;
        var zz = (m33 + 1) / 2;
        var xy = (m12 + m21) / 4;
        var xz = (m13 + m31) / 4;
        var yz = (m23 + m32) / 4;

        if (xx > yy && xx > zz) {
          // m11 is the largest diagonal term
          if (xx < epsilon) {
            x = 0;
            y = 0.707106781;
            z = 0.707106781;
          } else {
            x = Math.sqrt(xx);
            y = xy / x;
            z = xz / x;
          }
        } else if (yy > zz) {
          // m22 is the largest diagonal term
          if (yy < epsilon) {
            x = 0.707106781;
            y = 0;
            z = 0.707106781;
          } else {
            y = Math.sqrt(yy);
            x = xy / y;
            z = yz / y;
          }
        } else {
          // m33 is the largest diagonal term so base result on this
          if (zz < epsilon) {
            x = 0.707106781;
            y = 0.707106781;
            z = 0;
          } else {
            z = Math.sqrt(zz);
            x = xz / z;
            y = yz / z;
          }
        }

        this.set(x, y, z, angle);
        return this; // return 180 deg rotation
      } // as we have reached here there are no singularities so we can handle normally


      var s = Math.sqrt((m32 - m23) * (m32 - m23) + (m13 - m31) * (m13 - m31) + (m21 - m12) * (m21 - m12)); // used to normalize

      if (Math.abs(s) < 0.001) s = 1; // prevent divide by zero, should not happen if matrix is orthogonal and should be
      // caught by singularity test above, but I've left it in just in case

      this.x = (m32 - m23) / s;
      this.y = (m13 - m31) / s;
      this.z = (m21 - m12) / s;
      this.w = Math.acos((m11 + m22 + m33 - 1) / 2);
      return this;
    }
  }, {
    key: "min",
    value: function min(v) {
      this.x = Math.min(this.x, v.x);
      this.y = Math.min(this.y, v.y);
      this.z = Math.min(this.z, v.z);
      this.w = Math.min(this.w, v.w);
      return this;
    }
  }, {
    key: "max",
    value: function max(v) {
      this.x = Math.max(this.x, v.x);
      this.y = Math.max(this.y, v.y);
      this.z = Math.max(this.z, v.z);
      this.w = Math.max(this.w, v.w);
      return this;
    }
  }, {
    key: "clamp",
    value: function clamp(min, max) {
      // assumes min < max, componentwise
      this.x = Math.max(min.x, Math.min(max.x, this.x));
      this.y = Math.max(min.y, Math.min(max.y, this.y));
      this.z = Math.max(min.z, Math.min(max.z, this.z));
      this.w = Math.max(min.w, Math.min(max.w, this.w));
      return this;
    }
  }, {
    key: "clampScalar",
    value: function clampScalar(minVal, maxVal) {
      this.x = Math.max(minVal, Math.min(maxVal, this.x));
      this.y = Math.max(minVal, Math.min(maxVal, this.y));
      this.z = Math.max(minVal, Math.min(maxVal, this.z));
      this.w = Math.max(minVal, Math.min(maxVal, this.w));
      return this;
    }
  }, {
    key: "clampLength",
    value: function clampLength(min, max) {
      var length = this.length();
      return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
    }
  }, {
    key: "floor",
    value: function floor() {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      this.z = Math.floor(this.z);
      this.w = Math.floor(this.w);
      return this;
    }
  }, {
    key: "ceil",
    value: function ceil() {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      this.z = Math.ceil(this.z);
      this.w = Math.ceil(this.w);
      return this;
    }
  }, {
    key: "round",
    value: function round() {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      this.z = Math.round(this.z);
      this.w = Math.round(this.w);
      return this;
    }
  }, {
    key: "roundToZero",
    value: function roundToZero() {
      this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
      this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
      this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);
      this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w);
      return this;
    }
  }, {
    key: "negate",
    value: function negate() {
      this.x = -this.x;
      this.y = -this.y;
      this.z = -this.z;
      this.w = -this.w;
      return this;
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    }
  }, {
    key: "lengthSq",
    value: function lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
  }, {
    key: "length",
    value: function length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
  }, {
    key: "manhattanLength",
    value: function manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
    }
  }, {
    key: "normalize",
    value: function normalize() {
      return this.divideScalar(this.length() || 1);
    }
  }, {
    key: "setLength",
    value: function setLength(length) {
      return this.normalize().multiplyScalar(length);
    }
  }, {
    key: "lerp",
    value: function lerp(v, alpha) {
      this.x += (v.x - this.x) * alpha;
      this.y += (v.y - this.y) * alpha;
      this.z += (v.z - this.z) * alpha;
      this.w += (v.w - this.w) * alpha;
      return this;
    }
  }, {
    key: "lerpVectors",
    value: function lerpVectors(v1, v2, alpha) {
      this.x = v1.x + (v2.x - v1.x) * alpha;
      this.y = v1.y + (v2.y - v1.y) * alpha;
      this.z = v1.z + (v2.z - v1.z) * alpha;
      this.w = v1.w + (v2.w - v1.w) * alpha;
      return this;
    }
  }, {
    key: "equals",
    value: function equals(v) {
      return v.x === this.x && v.y === this.y && v.z === this.z && v.w === this.w;
    }
  }, {
    key: "fromArray",
    value: function fromArray(array) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.x = array[offset];
      this.y = array[offset + 1];
      this.z = array[offset + 2];
      this.w = array[offset + 3];
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      array[offset] = this.x;
      array[offset + 1] = this.y;
      array[offset + 2] = this.z;
      array[offset + 3] = this.w;
      return array;
    }
  }, {
    key: "fromBufferAttribute",
    value: function fromBufferAttribute(attribute, index, offset) {
      if (offset !== undefined) {
        console.warn('THREE.Vector4: offset has been removed from .fromBufferAttribute().');
      }

      this.x = attribute.getX(index);
      this.y = attribute.getY(index);
      this.z = attribute.getZ(index);
      this.w = attribute.getW(index);
      return this;
    }
  }, {
    key: "random",
    value: function random() {
      this.x = Math.random();
      this.y = Math.random();
      this.z = Math.random();
      this.w = Math.random();
      return this;
    }
  }, {
    key: _Symbol$iterator,
    value: /*#__PURE__*/_regeneratorRuntime().mark(function value() {
      return _regeneratorRuntime().wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.x;

            case 2:
              _context.next = 4;
              return this.y;

            case 4:
              _context.next = 6;
              return this.z;

            case 6:
              _context.next = 8;
              return this.w;

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, value, this);
    })
  }]);

  return Vector4;
}(Symbol.iterator);

/*
 In options, we can specify:
 * Texture parameters for an auto-generated target texture
 * depthBuffer/stencilBuffer: Booleans to indicate if we should generate these buffers
*/

var WebGLRenderTarget = /*#__PURE__*/function (_EventDispatcher) {
  _inherits$1(WebGLRenderTarget, _EventDispatcher);

  var _super = _createSuper$2(WebGLRenderTarget);

  function WebGLRenderTarget(width, height) {
    var _this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck$3(this, WebGLRenderTarget);

    _this = _super.call(this);
    _this.isWebGLRenderTarget = true;
    _this.width = width;
    _this.height = height;
    _this.depth = 1;
    _this.scissor = new Vector4(0, 0, width, height);
    _this.scissorTest = false;
    _this.viewport = new Vector4(0, 0, width, height);
    var image = {
      width: width,
      height: height,
      depth: 1
    };
    _this.texture = new Texture(image, options.mapping, options.wrapS, options.wrapT, options.magFilter, options.minFilter, options.format, options.type, options.anisotropy, options.encoding);
    _this.texture.isRenderTargetTexture = true;
    _this.texture.flipY = false;
    _this.texture.generateMipmaps = options.generateMipmaps !== undefined ? options.generateMipmaps : false;
    _this.texture.internalFormat = options.internalFormat !== undefined ? options.internalFormat : null;
    _this.texture.minFilter = options.minFilter !== undefined ? options.minFilter : LinearFilter;
    _this.depthBuffer = options.depthBuffer !== undefined ? options.depthBuffer : true;
    _this.stencilBuffer = options.stencilBuffer !== undefined ? options.stencilBuffer : false;
    _this.depthTexture = options.depthTexture !== undefined ? options.depthTexture : null;
    _this.samples = options.samples !== undefined ? options.samples : 0;
    return _this;
  }

  _createClass$2(WebGLRenderTarget, [{
    key: "setSize",
    value: function setSize(width, height) {
      var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      if (this.width !== width || this.height !== height || this.depth !== depth) {
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.texture.image.width = width;
        this.texture.image.height = height;
        this.texture.image.depth = depth;
        this.dispose();
      }

      this.viewport.set(0, 0, width, height);
      this.scissor.set(0, 0, width, height);
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor().copy(this);
    }
  }, {
    key: "copy",
    value: function copy(source) {
      this.width = source.width;
      this.height = source.height;
      this.depth = source.depth;
      this.viewport.copy(source.viewport);
      this.texture = source.texture.clone();
      this.texture.isRenderTargetTexture = true; // ensure image object is not shared, see #20328

      var image = Object.assign({}, source.texture.image);
      this.texture.source = new Source(image);
      this.depthBuffer = source.depthBuffer;
      this.stencilBuffer = source.stencilBuffer;
      if (source.depthTexture !== null) this.depthTexture = source.depthTexture.clone();
      this.samples = source.samples;
      return this;
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this.dispatchEvent({
        type: 'dispose'
      });
    }
  }]);

  return WebGLRenderTarget;
}(EventDispatcher);

var DataArrayTexture = /*#__PURE__*/function (_Texture) {
  _inherits$1(DataArrayTexture, _Texture);

  var _super = _createSuper$2(DataArrayTexture);

  function DataArrayTexture() {
    var _this;

    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var depth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    _classCallCheck$3(this, DataArrayTexture);

    _this = _super.call(this, null);
    _this.isDataArrayTexture = true;
    _this.image = {
      data: data,
      width: width,
      height: height,
      depth: depth
    };
    _this.magFilter = NearestFilter;
    _this.minFilter = NearestFilter;
    _this.wrapR = ClampToEdgeWrapping;
    _this.generateMipmaps = false;
    _this.flipY = false;
    _this.unpackAlignment = 1;
    return _this;
  }

  return _createClass$2(DataArrayTexture);
}(Texture);

var WebGLArrayRenderTarget = /*#__PURE__*/function (_WebGLRenderTarget) {
  _inherits$1(WebGLArrayRenderTarget, _WebGLRenderTarget);

  var _super = _createSuper$2(WebGLArrayRenderTarget);

  function WebGLArrayRenderTarget(width, height, depth) {
    var _this;

    _classCallCheck$3(this, WebGLArrayRenderTarget);

    _this = _super.call(this, width, height);
    _this.isWebGLArrayRenderTarget = true;
    _this.depth = depth;
    _this.texture = new DataArrayTexture(null, width, height, depth);
    _this.texture.isRenderTargetTexture = true;
    return _this;
  }

  return _createClass$2(WebGLArrayRenderTarget);
}(WebGLRenderTarget);

var Data3DTexture = /*#__PURE__*/function (_Texture) {
  _inherits$1(Data3DTexture, _Texture);

  var _super = _createSuper$2(Data3DTexture);

  function Data3DTexture() {
    var _this;

    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var depth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    _classCallCheck$3(this, Data3DTexture);

    // We're going to add .setXXX() methods for setting properties later.
    // Users can still set in DataTexture3D directly.
    //
    //	const texture = new THREE.DataTexture3D( data, width, height, depth );
    // 	texture.anisotropy = 16;
    //
    // See #14839
    _this = _super.call(this, null);
    _this.isData3DTexture = true;
    _this.image = {
      data: data,
      width: width,
      height: height,
      depth: depth
    };
    _this.magFilter = NearestFilter;
    _this.minFilter = NearestFilter;
    _this.wrapR = ClampToEdgeWrapping;
    _this.generateMipmaps = false;
    _this.flipY = false;
    _this.unpackAlignment = 1;
    return _this;
  }

  return _createClass$2(Data3DTexture);
}(Texture);

var WebGL3DRenderTarget = /*#__PURE__*/function (_WebGLRenderTarget) {
  _inherits$1(WebGL3DRenderTarget, _WebGLRenderTarget);

  var _super = _createSuper$2(WebGL3DRenderTarget);

  function WebGL3DRenderTarget(width, height, depth) {
    var _this;

    _classCallCheck$3(this, WebGL3DRenderTarget);

    _this = _super.call(this, width, height);
    _this.isWebGL3DRenderTarget = true;
    _this.depth = depth;
    _this.texture = new Data3DTexture(null, width, height, depth);
    _this.texture.isRenderTargetTexture = true;
    return _this;
  }

  return _createClass$2(WebGL3DRenderTarget);
}(WebGLRenderTarget);

var WebGLMultipleRenderTargets = /*#__PURE__*/function (_WebGLRenderTarget) {
  _inherits$1(WebGLMultipleRenderTargets, _WebGLRenderTarget);

  var _super = _createSuper$2(WebGLMultipleRenderTargets);

  function WebGLMultipleRenderTargets(width, height, count) {
    var _this;

    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck$3(this, WebGLMultipleRenderTargets);

    _this = _super.call(this, width, height, options);
    _this.isWebGLMultipleRenderTargets = true;
    var texture = _this.texture;
    _this.texture = [];

    for (var i = 0; i < count; i++) {
      _this.texture[i] = texture.clone();
      _this.texture[i].isRenderTargetTexture = true;
    }

    return _this;
  }

  _createClass$2(WebGLMultipleRenderTargets, [{
    key: "setSize",
    value: function setSize(width, height) {
      var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      if (this.width !== width || this.height !== height || this.depth !== depth) {
        this.width = width;
        this.height = height;
        this.depth = depth;

        for (var i = 0, il = this.texture.length; i < il; i++) {
          this.texture[i].image.width = width;
          this.texture[i].image.height = height;
          this.texture[i].image.depth = depth;
        }

        this.dispose();
      }

      this.viewport.set(0, 0, width, height);
      this.scissor.set(0, 0, width, height);
      return this;
    }
  }, {
    key: "copy",
    value: function copy(source) {
      this.dispose();
      this.width = source.width;
      this.height = source.height;
      this.depth = source.depth;
      this.viewport.set(0, 0, this.width, this.height);
      this.scissor.set(0, 0, this.width, this.height);
      this.depthBuffer = source.depthBuffer;
      this.stencilBuffer = source.stencilBuffer;
      if (source.depthTexture !== null) this.depthTexture = source.depthTexture.clone();
      this.texture.length = 0;

      for (var i = 0, il = source.texture.length; i < il; i++) {
        this.texture[i] = source.texture[i].clone();
        this.texture[i].isRenderTargetTexture = true;
      }

      return this;
    }
  }]);

  return WebGLMultipleRenderTargets;
}(WebGLRenderTarget);

var Quaternion = /*#__PURE__*/function (_Symbol$iterator) {
  function Quaternion() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var w = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

    _classCallCheck$3(this, Quaternion);

    this.isQuaternion = true;
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
  }

  _createClass$2(Quaternion, [{
    key: "x",
    get: function get() {
      return this._x;
    },
    set: function set(value) {
      this._x = value;

      this._onChangeCallback();
    }
  }, {
    key: "y",
    get: function get() {
      return this._y;
    },
    set: function set(value) {
      this._y = value;

      this._onChangeCallback();
    }
  }, {
    key: "z",
    get: function get() {
      return this._z;
    },
    set: function set(value) {
      this._z = value;

      this._onChangeCallback();
    }
  }, {
    key: "w",
    get: function get() {
      return this._w;
    },
    set: function set(value) {
      this._w = value;

      this._onChangeCallback();
    }
  }, {
    key: "set",
    value: function set(x, y, z, w) {
      this._x = x;
      this._y = y;
      this._z = z;
      this._w = w;

      this._onChangeCallback();

      return this;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor(this._x, this._y, this._z, this._w);
    }
  }, {
    key: "copy",
    value: function copy(quaternion) {
      this._x = quaternion.x;
      this._y = quaternion.y;
      this._z = quaternion.z;
      this._w = quaternion.w;

      this._onChangeCallback();

      return this;
    }
  }, {
    key: "setFromEuler",
    value: function setFromEuler(euler, update) {
      if (!(euler && euler.isEuler)) {
        throw new Error('THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.');
      }

      var x = euler._x,
          y = euler._y,
          z = euler._z,
          order = euler._order; // http://www.mathworks.com/matlabcentral/fileexchange/
      // 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
      //	content/SpinCalc.m

      var cos = Math.cos;
      var sin = Math.sin;
      var c1 = cos(x / 2);
      var c2 = cos(y / 2);
      var c3 = cos(z / 2);
      var s1 = sin(x / 2);
      var s2 = sin(y / 2);
      var s3 = sin(z / 2);

      switch (order) {
        case 'XYZ':
          this._x = s1 * c2 * c3 + c1 * s2 * s3;
          this._y = c1 * s2 * c3 - s1 * c2 * s3;
          this._z = c1 * c2 * s3 + s1 * s2 * c3;
          this._w = c1 * c2 * c3 - s1 * s2 * s3;
          break;

        case 'YXZ':
          this._x = s1 * c2 * c3 + c1 * s2 * s3;
          this._y = c1 * s2 * c3 - s1 * c2 * s3;
          this._z = c1 * c2 * s3 - s1 * s2 * c3;
          this._w = c1 * c2 * c3 + s1 * s2 * s3;
          break;

        case 'ZXY':
          this._x = s1 * c2 * c3 - c1 * s2 * s3;
          this._y = c1 * s2 * c3 + s1 * c2 * s3;
          this._z = c1 * c2 * s3 + s1 * s2 * c3;
          this._w = c1 * c2 * c3 - s1 * s2 * s3;
          break;

        case 'ZYX':
          this._x = s1 * c2 * c3 - c1 * s2 * s3;
          this._y = c1 * s2 * c3 + s1 * c2 * s3;
          this._z = c1 * c2 * s3 - s1 * s2 * c3;
          this._w = c1 * c2 * c3 + s1 * s2 * s3;
          break;

        case 'YZX':
          this._x = s1 * c2 * c3 + c1 * s2 * s3;
          this._y = c1 * s2 * c3 + s1 * c2 * s3;
          this._z = c1 * c2 * s3 - s1 * s2 * c3;
          this._w = c1 * c2 * c3 - s1 * s2 * s3;
          break;

        case 'XZY':
          this._x = s1 * c2 * c3 - c1 * s2 * s3;
          this._y = c1 * s2 * c3 - s1 * c2 * s3;
          this._z = c1 * c2 * s3 + s1 * s2 * c3;
          this._w = c1 * c2 * c3 + s1 * s2 * s3;
          break;

        default:
          console.warn('THREE.Quaternion: .setFromEuler() encountered an unknown order: ' + order);
      }

      if (update !== false) this._onChangeCallback();
      return this;
    }
  }, {
    key: "setFromAxisAngle",
    value: function setFromAxisAngle(axis, angle) {
      // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
      // assumes axis is normalized
      var halfAngle = angle / 2,
          s = Math.sin(halfAngle);
      this._x = axis.x * s;
      this._y = axis.y * s;
      this._z = axis.z * s;
      this._w = Math.cos(halfAngle);

      this._onChangeCallback();

      return this;
    }
  }, {
    key: "setFromRotationMatrix",
    value: function setFromRotationMatrix(m) {
      // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
      // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
      var te = m.elements,
          m11 = te[0],
          m12 = te[4],
          m13 = te[8],
          m21 = te[1],
          m22 = te[5],
          m23 = te[9],
          m31 = te[2],
          m32 = te[6],
          m33 = te[10],
          trace = m11 + m22 + m33;

      if (trace > 0) {
        var s = 0.5 / Math.sqrt(trace + 1.0);
        this._w = 0.25 / s;
        this._x = (m32 - m23) * s;
        this._y = (m13 - m31) * s;
        this._z = (m21 - m12) * s;
      } else if (m11 > m22 && m11 > m33) {
        var _s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);

        this._w = (m32 - m23) / _s;
        this._x = 0.25 * _s;
        this._y = (m12 + m21) / _s;
        this._z = (m13 + m31) / _s;
      } else if (m22 > m33) {
        var _s2 = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);

        this._w = (m13 - m31) / _s2;
        this._x = (m12 + m21) / _s2;
        this._y = 0.25 * _s2;
        this._z = (m23 + m32) / _s2;
      } else {
        var _s3 = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);

        this._w = (m21 - m12) / _s3;
        this._x = (m13 + m31) / _s3;
        this._y = (m23 + m32) / _s3;
        this._z = 0.25 * _s3;
      }

      this._onChangeCallback();

      return this;
    }
  }, {
    key: "setFromUnitVectors",
    value: function setFromUnitVectors(vFrom, vTo) {
      // assumes direction vectors vFrom and vTo are normalized
      var r = vFrom.dot(vTo) + 1;

      if (r < Number.EPSILON) {
        // vFrom and vTo point in opposite directions
        r = 0;

        if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
          this._x = -vFrom.y;
          this._y = vFrom.x;
          this._z = 0;
          this._w = r;
        } else {
          this._x = 0;
          this._y = -vFrom.z;
          this._z = vFrom.y;
          this._w = r;
        }
      } else {
        // crossVectors( vFrom, vTo ); // inlined to avoid cyclic dependency on Vector3
        this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
        this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
        this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
        this._w = r;
      }

      return this.normalize();
    }
  }, {
    key: "angleTo",
    value: function angleTo(q) {
      return 2 * Math.acos(Math.abs(clamp(this.dot(q), -1, 1)));
    }
  }, {
    key: "rotateTowards",
    value: function rotateTowards(q, step) {
      var angle = this.angleTo(q);
      if (angle === 0) return this;
      var t = Math.min(1, step / angle);
      this.slerp(q, t);
      return this;
    }
  }, {
    key: "identity",
    value: function identity() {
      return this.set(0, 0, 0, 1);
    }
  }, {
    key: "invert",
    value: function invert() {
      // quaternion is assumed to have unit length
      return this.conjugate();
    }
  }, {
    key: "conjugate",
    value: function conjugate() {
      this._x *= -1;
      this._y *= -1;
      this._z *= -1;

      this._onChangeCallback();

      return this;
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
    }
  }, {
    key: "lengthSq",
    value: function lengthSq() {
      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }
  }, {
    key: "length",
    value: function length() {
      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var l = this.length();

      if (l === 0) {
        this._x = 0;
        this._y = 0;
        this._z = 0;
        this._w = 1;
      } else {
        l = 1 / l;
        this._x = this._x * l;
        this._y = this._y * l;
        this._z = this._z * l;
        this._w = this._w * l;
      }

      this._onChangeCallback();

      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(q, p) {
      if (p !== undefined) {
        console.warn('THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.');
        return this.multiplyQuaternions(q, p);
      }

      return this.multiplyQuaternions(this, q);
    }
  }, {
    key: "premultiply",
    value: function premultiply(q) {
      return this.multiplyQuaternions(q, this);
    }
  }, {
    key: "multiplyQuaternions",
    value: function multiplyQuaternions(a, b) {
      // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
      var qax = a._x,
          qay = a._y,
          qaz = a._z,
          qaw = a._w;
      var qbx = b._x,
          qby = b._y,
          qbz = b._z,
          qbw = b._w;
      this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
      this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
      this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
      this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

      this._onChangeCallback();

      return this;
    }
  }, {
    key: "slerp",
    value: function slerp(qb, t) {
      if (t === 0) return this;
      if (t === 1) return this.copy(qb);
      var x = this._x,
          y = this._y,
          z = this._z,
          w = this._w; // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

      var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

      if (cosHalfTheta < 0) {
        this._w = -qb._w;
        this._x = -qb._x;
        this._y = -qb._y;
        this._z = -qb._z;
        cosHalfTheta = -cosHalfTheta;
      } else {
        this.copy(qb);
      }

      if (cosHalfTheta >= 1.0) {
        this._w = w;
        this._x = x;
        this._y = y;
        this._z = z;
        return this;
      }

      var sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

      if (sqrSinHalfTheta <= Number.EPSILON) {
        var s = 1 - t;
        this._w = s * w + t * this._w;
        this._x = s * x + t * this._x;
        this._y = s * y + t * this._y;
        this._z = s * z + t * this._z;
        this.normalize();

        this._onChangeCallback();

        return this;
      }

      var sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
      var halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
      var ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
          ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
      this._w = w * ratioA + this._w * ratioB;
      this._x = x * ratioA + this._x * ratioB;
      this._y = y * ratioA + this._y * ratioB;
      this._z = z * ratioA + this._z * ratioB;

      this._onChangeCallback();

      return this;
    }
  }, {
    key: "slerpQuaternions",
    value: function slerpQuaternions(qa, qb, t) {
      return this.copy(qa).slerp(qb, t);
    }
  }, {
    key: "random",
    value: function random() {
      // Derived from http://planning.cs.uiuc.edu/node198.html
      // Note, this source uses w, x, y, z ordering,
      // so we swap the order below.
      var u1 = Math.random();
      var sqrt1u1 = Math.sqrt(1 - u1);
      var sqrtu1 = Math.sqrt(u1);
      var u2 = 2 * Math.PI * Math.random();
      var u3 = 2 * Math.PI * Math.random();
      return this.set(sqrt1u1 * Math.cos(u2), sqrtu1 * Math.sin(u3), sqrtu1 * Math.cos(u3), sqrt1u1 * Math.sin(u2));
    }
  }, {
    key: "equals",
    value: function equals(quaternion) {
      return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w;
    }
  }, {
    key: "fromArray",
    value: function fromArray(array) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this._x = array[offset];
      this._y = array[offset + 1];
      this._z = array[offset + 2];
      this._w = array[offset + 3];

      this._onChangeCallback();

      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      array[offset] = this._x;
      array[offset + 1] = this._y;
      array[offset + 2] = this._z;
      array[offset + 3] = this._w;
      return array;
    }
  }, {
    key: "fromBufferAttribute",
    value: function fromBufferAttribute(attribute, index) {
      this._x = attribute.getX(index);
      this._y = attribute.getY(index);
      this._z = attribute.getZ(index);
      this._w = attribute.getW(index);
      return this;
    }
  }, {
    key: "_onChange",
    value: function _onChange(callback) {
      this._onChangeCallback = callback;
      return this;
    }
  }, {
    key: "_onChangeCallback",
    value: function _onChangeCallback() {}
  }, {
    key: _Symbol$iterator,
    value: /*#__PURE__*/_regeneratorRuntime().mark(function value() {
      return _regeneratorRuntime().wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this._x;

            case 2:
              _context.next = 4;
              return this._y;

            case 4:
              _context.next = 6;
              return this._z;

            case 6:
              _context.next = 8;
              return this._w;

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, value, this);
    })
  }], [{
    key: "slerp",
    value: function slerp(qa, qb, qm, t) {
      console.warn('THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead.');
      return qm.slerpQuaternions(qa, qb, t);
    }
  }, {
    key: "slerpFlat",
    value: function slerpFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {
      // fuzz-free, array-based Quaternion SLERP operation
      var x0 = src0[srcOffset0 + 0],
          y0 = src0[srcOffset0 + 1],
          z0 = src0[srcOffset0 + 2],
          w0 = src0[srcOffset0 + 3];
      var x1 = src1[srcOffset1 + 0],
          y1 = src1[srcOffset1 + 1],
          z1 = src1[srcOffset1 + 2],
          w1 = src1[srcOffset1 + 3];

      if (t === 0) {
        dst[dstOffset + 0] = x0;
        dst[dstOffset + 1] = y0;
        dst[dstOffset + 2] = z0;
        dst[dstOffset + 3] = w0;
        return;
      }

      if (t === 1) {
        dst[dstOffset + 0] = x1;
        dst[dstOffset + 1] = y1;
        dst[dstOffset + 2] = z1;
        dst[dstOffset + 3] = w1;
        return;
      }

      if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {
        var s = 1 - t;
        var cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,
            dir = cos >= 0 ? 1 : -1,
            sqrSin = 1 - cos * cos; // Skip the Slerp for tiny steps to avoid numeric problems:

        if (sqrSin > Number.EPSILON) {
          var sin = Math.sqrt(sqrSin),
              len = Math.atan2(sin, cos * dir);
          s = Math.sin(s * len) / sin;
          t = Math.sin(t * len) / sin;
        }

        var tDir = t * dir;
        x0 = x0 * s + x1 * tDir;
        y0 = y0 * s + y1 * tDir;
        z0 = z0 * s + z1 * tDir;
        w0 = w0 * s + w1 * tDir; // Normalize in case we just did a lerp:

        if (s === 1 - t) {
          var f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);
          x0 *= f;
          y0 *= f;
          z0 *= f;
          w0 *= f;
        }
      }

      dst[dstOffset] = x0;
      dst[dstOffset + 1] = y0;
      dst[dstOffset + 2] = z0;
      dst[dstOffset + 3] = w0;
    }
  }, {
    key: "multiplyQuaternionsFlat",
    value: function multiplyQuaternionsFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1) {
      var x0 = src0[srcOffset0];
      var y0 = src0[srcOffset0 + 1];
      var z0 = src0[srcOffset0 + 2];
      var w0 = src0[srcOffset0 + 3];
      var x1 = src1[srcOffset1];
      var y1 = src1[srcOffset1 + 1];
      var z1 = src1[srcOffset1 + 2];
      var w1 = src1[srcOffset1 + 3];
      dst[dstOffset] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
      dst[dstOffset + 1] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
      dst[dstOffset + 2] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
      dst[dstOffset + 3] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;
      return dst;
    }
  }]);

  return Quaternion;
}(Symbol.iterator);

var Vector3 = /*#__PURE__*/function (_Symbol$iterator) {
  function Vector3() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck$3(this, Vector3);

    this.isVector3 = true;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  _createClass$2(Vector3, [{
    key: "set",
    value: function set(x, y, z) {
      if (z === undefined) z = this.z; // sprite.scale.set(x,y)

      this.x = x;
      this.y = y;
      this.z = z;
      return this;
    }
  }, {
    key: "setScalar",
    value: function setScalar(scalar) {
      this.x = scalar;
      this.y = scalar;
      this.z = scalar;
      return this;
    }
  }, {
    key: "setX",
    value: function setX(x) {
      this.x = x;
      return this;
    }
  }, {
    key: "setY",
    value: function setY(y) {
      this.y = y;
      return this;
    }
  }, {
    key: "setZ",
    value: function setZ(z) {
      this.z = z;
      return this;
    }
  }, {
    key: "setComponent",
    value: function setComponent(index, value) {
      switch (index) {
        case 0:
          this.x = value;
          break;

        case 1:
          this.y = value;
          break;

        case 2:
          this.z = value;
          break;

        default:
          throw new Error('index is out of range: ' + index);
      }

      return this;
    }
  }, {
    key: "getComponent",
    value: function getComponent(index) {
      switch (index) {
        case 0:
          return this.x;

        case 1:
          return this.y;

        case 2:
          return this.z;

        default:
          throw new Error('index is out of range: ' + index);
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor(this.x, this.y, this.z);
    }
  }, {
    key: "copy",
    value: function copy(v) {
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
      return this;
    }
  }, {
    key: "add",
    value: function add(v, w) {
      if (w !== undefined) {
        console.warn('THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
        return this.addVectors(v, w);
      }

      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
      return this;
    }
  }, {
    key: "addScalar",
    value: function addScalar(s) {
      this.x += s;
      this.y += s;
      this.z += s;
      return this;
    }
  }, {
    key: "addVectors",
    value: function addVectors(a, b) {
      this.x = a.x + b.x;
      this.y = a.y + b.y;
      this.z = a.z + b.z;
      return this;
    }
  }, {
    key: "addScaledVector",
    value: function addScaledVector(v, s) {
      this.x += v.x * s;
      this.y += v.y * s;
      this.z += v.z * s;
      return this;
    }
  }, {
    key: "sub",
    value: function sub(v, w) {
      if (w !== undefined) {
        console.warn('THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
        return this.subVectors(v, w);
      }

      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
      return this;
    }
  }, {
    key: "subScalar",
    value: function subScalar(s) {
      this.x -= s;
      this.y -= s;
      this.z -= s;
      return this;
    }
  }, {
    key: "subVectors",
    value: function subVectors(a, b) {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      this.z = a.z - b.z;
      return this;
    }
  }, {
    key: "multiply",
    value: function multiply(v, w) {
      if (w !== undefined) {
        console.warn('THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.');
        return this.multiplyVectors(v, w);
      }

      this.x *= v.x;
      this.y *= v.y;
      this.z *= v.z;
      return this;
    }
  }, {
    key: "multiplyScalar",
    value: function multiplyScalar(scalar) {
      this.x *= scalar;
      this.y *= scalar;
      this.z *= scalar;
      return this;
    }
  }, {
    key: "multiplyVectors",
    value: function multiplyVectors(a, b) {
      this.x = a.x * b.x;
      this.y = a.y * b.y;
      this.z = a.z * b.z;
      return this;
    }
  }, {
    key: "applyEuler",
    value: function applyEuler(euler) {
      if (!(euler && euler.isEuler)) {
        console.error('THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.');
      }

      return this.applyQuaternion(_quaternion$4.setFromEuler(euler));
    }
  }, {
    key: "applyAxisAngle",
    value: function applyAxisAngle(axis, angle) {
      return this.applyQuaternion(_quaternion$4.setFromAxisAngle(axis, angle));
    }
  }, {
    key: "applyMatrix3",
    value: function applyMatrix3(m) {
      var x = this.x,
          y = this.y,
          z = this.z;
      var e = m.elements;
      this.x = e[0] * x + e[3] * y + e[6] * z;
      this.y = e[1] * x + e[4] * y + e[7] * z;
      this.z = e[2] * x + e[5] * y + e[8] * z;
      return this;
    }
  }, {
    key: "applyNormalMatrix",
    value: function applyNormalMatrix(m) {
      return this.applyMatrix3(m).normalize();
    }
  }, {
    key: "applyMatrix4",
    value: function applyMatrix4(m) {
      var x = this.x,
          y = this.y,
          z = this.z;
      var e = m.elements;
      var w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
      this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
      this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
      this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
      return this;
    }
  }, {
    key: "applyQuaternion",
    value: function applyQuaternion(q) {
      var x = this.x,
          y = this.y,
          z = this.z;
      var qx = q.x,
          qy = q.y,
          qz = q.z,
          qw = q.w; // calculate quat * vector

      var ix = qw * x + qy * z - qz * y;
      var iy = qw * y + qz * x - qx * z;
      var iz = qw * z + qx * y - qy * x;
      var iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat

      this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
      this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
      this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
      return this;
    }
  }, {
    key: "project",
    value: function project(camera) {
      return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);
    }
  }, {
    key: "unproject",
    value: function unproject(camera) {
      return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld);
    }
  }, {
    key: "transformDirection",
    value: function transformDirection(m) {
      // input: THREE.Matrix4 affine matrix
      // vector interpreted as a direction
      var x = this.x,
          y = this.y,
          z = this.z;
      var e = m.elements;
      this.x = e[0] * x + e[4] * y + e[8] * z;
      this.y = e[1] * x + e[5] * y + e[9] * z;
      this.z = e[2] * x + e[6] * y + e[10] * z;
      return this.normalize();
    }
  }, {
    key: "divide",
    value: function divide(v) {
      this.x /= v.x;
      this.y /= v.y;
      this.z /= v.z;
      return this;
    }
  }, {
    key: "divideScalar",
    value: function divideScalar(scalar) {
      return this.multiplyScalar(1 / scalar);
    }
  }, {
    key: "min",
    value: function min(v) {
      this.x = Math.min(this.x, v.x);
      this.y = Math.min(this.y, v.y);
      this.z = Math.min(this.z, v.z);
      return this;
    }
  }, {
    key: "max",
    value: function max(v) {
      this.x = Math.max(this.x, v.x);
      this.y = Math.max(this.y, v.y);
      this.z = Math.max(this.z, v.z);
      return this;
    }
  }, {
    key: "clamp",
    value: function clamp(min, max) {
      // assumes min < max, componentwise
      this.x = Math.max(min.x, Math.min(max.x, this.x));
      this.y = Math.max(min.y, Math.min(max.y, this.y));
      this.z = Math.max(min.z, Math.min(max.z, this.z));
      return this;
    }
  }, {
    key: "clampScalar",
    value: function clampScalar(minVal, maxVal) {
      this.x = Math.max(minVal, Math.min(maxVal, this.x));
      this.y = Math.max(minVal, Math.min(maxVal, this.y));
      this.z = Math.max(minVal, Math.min(maxVal, this.z));
      return this;
    }
  }, {
    key: "clampLength",
    value: function clampLength(min, max) {
      var length = this.length();
      return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
    }
  }, {
    key: "floor",
    value: function floor() {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      this.z = Math.floor(this.z);
      return this;
    }
  }, {
    key: "ceil",
    value: function ceil() {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      this.z = Math.ceil(this.z);
      return this;
    }
  }, {
    key: "round",
    value: function round() {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      this.z = Math.round(this.z);
      return this;
    }
  }, {
    key: "roundToZero",
    value: function roundToZero() {
      this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
      this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
      this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);
      return this;
    }
  }, {
    key: "negate",
    value: function negate() {
      this.x = -this.x;
      this.y = -this.y;
      this.z = -this.z;
      return this;
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    } // TODO lengthSquared?

  }, {
    key: "lengthSq",
    value: function lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }
  }, {
    key: "length",
    value: function length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
  }, {
    key: "manhattanLength",
    value: function manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }
  }, {
    key: "normalize",
    value: function normalize() {
      return this.divideScalar(this.length() || 1);
    }
  }, {
    key: "setLength",
    value: function setLength(length) {
      return this.normalize().multiplyScalar(length);
    }
  }, {
    key: "lerp",
    value: function lerp(v, alpha) {
      this.x += (v.x - this.x) * alpha;
      this.y += (v.y - this.y) * alpha;
      this.z += (v.z - this.z) * alpha;
      return this;
    }
  }, {
    key: "lerpVectors",
    value: function lerpVectors(v1, v2, alpha) {
      this.x = v1.x + (v2.x - v1.x) * alpha;
      this.y = v1.y + (v2.y - v1.y) * alpha;
      this.z = v1.z + (v2.z - v1.z) * alpha;
      return this;
    }
  }, {
    key: "cross",
    value: function cross(v, w) {
      if (w !== undefined) {
        console.warn('THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.');
        return this.crossVectors(v, w);
      }

      return this.crossVectors(this, v);
    }
  }, {
    key: "crossVectors",
    value: function crossVectors(a, b) {
      var ax = a.x,
          ay = a.y,
          az = a.z;
      var bx = b.x,
          by = b.y,
          bz = b.z;
      this.x = ay * bz - az * by;
      this.y = az * bx - ax * bz;
      this.z = ax * by - ay * bx;
      return this;
    }
  }, {
    key: "projectOnVector",
    value: function projectOnVector(v) {
      var denominator = v.lengthSq();
      if (denominator === 0) return this.set(0, 0, 0);
      var scalar = v.dot(this) / denominator;
      return this.copy(v).multiplyScalar(scalar);
    }
  }, {
    key: "projectOnPlane",
    value: function projectOnPlane(planeNormal) {
      _vector$c.copy(this).projectOnVector(planeNormal);

      return this.sub(_vector$c);
    }
  }, {
    key: "reflect",
    value: function reflect(normal) {
      // reflect incident vector off plane orthogonal to normal
      // normal is assumed to have unit length
      return this.sub(_vector$c.copy(normal).multiplyScalar(2 * this.dot(normal)));
    }
  }, {
    key: "angleTo",
    value: function angleTo(v) {
      var denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
      if (denominator === 0) return Math.PI / 2;
      var theta = this.dot(v) / denominator; // clamp, to handle numerical problems

      return Math.acos(clamp(theta, -1, 1));
    }
  }, {
    key: "distanceTo",
    value: function distanceTo(v) {
      return Math.sqrt(this.distanceToSquared(v));
    }
  }, {
    key: "distanceToSquared",
    value: function distanceToSquared(v) {
      var dx = this.x - v.x,
          dy = this.y - v.y,
          dz = this.z - v.z;
      return dx * dx + dy * dy + dz * dz;
    }
  }, {
    key: "manhattanDistanceTo",
    value: function manhattanDistanceTo(v) {
      return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
    }
  }, {
    key: "setFromSpherical",
    value: function setFromSpherical(s) {
      return this.setFromSphericalCoords(s.radius, s.phi, s.theta);
    }
  }, {
    key: "setFromSphericalCoords",
    value: function setFromSphericalCoords(radius, phi, theta) {
      var sinPhiRadius = Math.sin(phi) * radius;
      this.x = sinPhiRadius * Math.sin(theta);
      this.y = Math.cos(phi) * radius;
      this.z = sinPhiRadius * Math.cos(theta);
      return this;
    }
  }, {
    key: "setFromCylindrical",
    value: function setFromCylindrical(c) {
      return this.setFromCylindricalCoords(c.radius, c.theta, c.y);
    }
  }, {
    key: "setFromCylindricalCoords",
    value: function setFromCylindricalCoords(radius, theta, y) {
      this.x = radius * Math.sin(theta);
      this.y = y;
      this.z = radius * Math.cos(theta);
      return this;
    }
  }, {
    key: "setFromMatrixPosition",
    value: function setFromMatrixPosition(m) {
      var e = m.elements;
      this.x = e[12];
      this.y = e[13];
      this.z = e[14];
      return this;
    }
  }, {
    key: "setFromMatrixScale",
    value: function setFromMatrixScale(m) {
      var sx = this.setFromMatrixColumn(m, 0).length();
      var sy = this.setFromMatrixColumn(m, 1).length();
      var sz = this.setFromMatrixColumn(m, 2).length();
      this.x = sx;
      this.y = sy;
      this.z = sz;
      return this;
    }
  }, {
    key: "setFromMatrixColumn",
    value: function setFromMatrixColumn(m, index) {
      return this.fromArray(m.elements, index * 4);
    }
  }, {
    key: "setFromMatrix3Column",
    value: function setFromMatrix3Column(m, index) {
      return this.fromArray(m.elements, index * 3);
    }
  }, {
    key: "setFromEuler",
    value: function setFromEuler(e) {
      this.x = e._x;
      this.y = e._y;
      this.z = e._z;
      return this;
    }
  }, {
    key: "equals",
    value: function equals(v) {
      return v.x === this.x && v.y === this.y && v.z === this.z;
    }
  }, {
    key: "fromArray",
    value: function fromArray(array) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.x = array[offset];
      this.y = array[offset + 1];
      this.z = array[offset + 2];
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      array[offset] = this.x;
      array[offset + 1] = this.y;
      array[offset + 2] = this.z;
      return array;
    }
  }, {
    key: "fromBufferAttribute",
    value: function fromBufferAttribute(attribute, index, offset) {
      if (offset !== undefined) {
        console.warn('THREE.Vector3: offset has been removed from .fromBufferAttribute().');
      }

      this.x = attribute.getX(index);
      this.y = attribute.getY(index);
      this.z = attribute.getZ(index);
      return this;
    }
  }, {
    key: "random",
    value: function random() {
      this.x = Math.random();
      this.y = Math.random();
      this.z = Math.random();
      return this;
    }
  }, {
    key: "randomDirection",
    value: function randomDirection() {
      // Derived from https://mathworld.wolfram.com/SpherePointPicking.html
      var u = (Math.random() - 0.5) * 2;
      var t = Math.random() * Math.PI * 2;
      var f = Math.sqrt(1 - Math.pow(u, 2));
      this.x = f * Math.cos(t);
      this.y = f * Math.sin(t);
      this.z = u;
      return this;
    }
  }, {
    key: _Symbol$iterator,
    value: /*#__PURE__*/_regeneratorRuntime().mark(function value() {
      return _regeneratorRuntime().wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.x;

            case 2:
              _context.next = 4;
              return this.y;

            case 4:
              _context.next = 6;
              return this.z;

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, value, this);
    })
  }]);

  return Vector3;
}(Symbol.iterator);

var _vector$c = /*@__PURE__*/new Vector3();

var _quaternion$4 = /*@__PURE__*/new Quaternion();

var Box3 = /*#__PURE__*/function () {
  function Box3() {
    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Vector3(+Infinity, +Infinity, +Infinity);
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Vector3(-Infinity, -Infinity, -Infinity);

    _classCallCheck$3(this, Box3);

    this.isBox3 = true;
    this.min = min;
    this.max = max;
  }

  _createClass$2(Box3, [{
    key: "set",
    value: function set(min, max) {
      this.min.copy(min);
      this.max.copy(max);
      return this;
    }
  }, {
    key: "setFromArray",
    value: function setFromArray(array) {
      var minX = +Infinity;
      var minY = +Infinity;
      var minZ = +Infinity;
      var maxX = -Infinity;
      var maxY = -Infinity;
      var maxZ = -Infinity;

      for (var i = 0, l = array.length; i < l; i += 3) {
        var x = array[i];
        var y = array[i + 1];
        var z = array[i + 2];
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (z < minZ) minZ = z;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
        if (z > maxZ) maxZ = z;
      }

      this.min.set(minX, minY, minZ);
      this.max.set(maxX, maxY, maxZ);
      return this;
    }
  }, {
    key: "setFromBufferAttribute",
    value: function setFromBufferAttribute(attribute) {
      var minX = +Infinity;
      var minY = +Infinity;
      var minZ = +Infinity;
      var maxX = -Infinity;
      var maxY = -Infinity;
      var maxZ = -Infinity;

      for (var i = 0, l = attribute.count; i < l; i++) {
        var x = attribute.getX(i);
        var y = attribute.getY(i);
        var z = attribute.getZ(i);
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (z < minZ) minZ = z;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
        if (z > maxZ) maxZ = z;
      }

      this.min.set(minX, minY, minZ);
      this.max.set(maxX, maxY, maxZ);
      return this;
    }
  }, {
    key: "setFromPoints",
    value: function setFromPoints(points) {
      this.makeEmpty();

      for (var i = 0, il = points.length; i < il; i++) {
        this.expandByPoint(points[i]);
      }

      return this;
    }
  }, {
    key: "setFromCenterAndSize",
    value: function setFromCenterAndSize(center, size) {
      var halfSize = _vector$b.copy(size).multiplyScalar(0.5);

      this.min.copy(center).sub(halfSize);
      this.max.copy(center).add(halfSize);
      return this;
    }
  }, {
    key: "setFromObject",
    value: function setFromObject(object) {
      var precise = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.makeEmpty();
      return this.expandByObject(object, precise);
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor().copy(this);
    }
  }, {
    key: "copy",
    value: function copy(box) {
      this.min.copy(box.min);
      this.max.copy(box.max);
      return this;
    }
  }, {
    key: "makeEmpty",
    value: function makeEmpty() {
      this.min.x = this.min.y = this.min.z = +Infinity;
      this.max.x = this.max.y = this.max.z = -Infinity;
      return this;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      // this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes
      return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
    }
  }, {
    key: "getCenter",
    value: function getCenter(target) {
      return this.isEmpty() ? target.set(0, 0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);
    }
  }, {
    key: "getSize",
    value: function getSize(target) {
      return this.isEmpty() ? target.set(0, 0, 0) : target.subVectors(this.max, this.min);
    }
  }, {
    key: "expandByPoint",
    value: function expandByPoint(point) {
      this.min.min(point);
      this.max.max(point);
      return this;
    }
  }, {
    key: "expandByVector",
    value: function expandByVector(vector) {
      this.min.sub(vector);
      this.max.add(vector);
      return this;
    }
  }, {
    key: "expandByScalar",
    value: function expandByScalar(scalar) {
      this.min.addScalar(-scalar);
      this.max.addScalar(scalar);
      return this;
    }
  }, {
    key: "expandByObject",
    value: function expandByObject(object) {
      var precise = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      // Computes the world-axis-aligned bounding box of an object (including its children),
      // accounting for both the object's, and children's, world transforms
      object.updateWorldMatrix(false, false);
      var geometry = object.geometry;

      if (geometry !== undefined) {
        if (precise && geometry.attributes != undefined && geometry.attributes.position !== undefined) {
          var position = geometry.attributes.position;

          for (var i = 0, l = position.count; i < l; i++) {
            _vector$b.fromBufferAttribute(position, i).applyMatrix4(object.matrixWorld);

            this.expandByPoint(_vector$b);
          }
        } else {
          if (geometry.boundingBox === null) {
            geometry.computeBoundingBox();
          }

          _box$3.copy(geometry.boundingBox);

          _box$3.applyMatrix4(object.matrixWorld);

          this.union(_box$3);
        }
      }

      var children = object.children;

      for (var _i = 0, _l = children.length; _i < _l; _i++) {
        this.expandByObject(children[_i], precise);
      }

      return this;
    }
  }, {
    key: "containsPoint",
    value: function containsPoint(point) {
      return point.x < this.min.x || point.x > this.max.x || point.y < this.min.y || point.y > this.max.y || point.z < this.min.z || point.z > this.max.z ? false : true;
    }
  }, {
    key: "containsBox",
    value: function containsBox(box) {
      return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y && this.min.z <= box.min.z && box.max.z <= this.max.z;
    }
  }, {
    key: "getParameter",
    value: function getParameter(point, target) {
      // This can potentially have a divide by zero if the box
      // has a size dimension of 0.
      return target.set((point.x - this.min.x) / (this.max.x - this.min.x), (point.y - this.min.y) / (this.max.y - this.min.y), (point.z - this.min.z) / (this.max.z - this.min.z));
    }
  }, {
    key: "intersectsBox",
    value: function intersectsBox(box) {
      // using 6 splitting planes to rule out intersections.
      return box.max.x < this.min.x || box.min.x > this.max.x || box.max.y < this.min.y || box.min.y > this.max.y || box.max.z < this.min.z || box.min.z > this.max.z ? false : true;
    }
  }, {
    key: "intersectsSphere",
    value: function intersectsSphere(sphere) {
      // Find the point on the AABB closest to the sphere center.
      this.clampPoint(sphere.center, _vector$b); // If that point is inside the sphere, the AABB and sphere intersect.

      return _vector$b.distanceToSquared(sphere.center) <= sphere.radius * sphere.radius;
    }
  }, {
    key: "intersectsPlane",
    value: function intersectsPlane(plane) {
      // We compute the minimum and maximum dot product values. If those values
      // are on the same side (back or front) of the plane, then there is no intersection.
      var min, max;

      if (plane.normal.x > 0) {
        min = plane.normal.x * this.min.x;
        max = plane.normal.x * this.max.x;
      } else {
        min = plane.normal.x * this.max.x;
        max = plane.normal.x * this.min.x;
      }

      if (plane.normal.y > 0) {
        min += plane.normal.y * this.min.y;
        max += plane.normal.y * this.max.y;
      } else {
        min += plane.normal.y * this.max.y;
        max += plane.normal.y * this.min.y;
      }

      if (plane.normal.z > 0) {
        min += plane.normal.z * this.min.z;
        max += plane.normal.z * this.max.z;
      } else {
        min += plane.normal.z * this.max.z;
        max += plane.normal.z * this.min.z;
      }

      return min <= -plane.constant && max >= -plane.constant;
    }
  }, {
    key: "intersectsTriangle",
    value: function intersectsTriangle(triangle) {
      if (this.isEmpty()) {
        return false;
      } // compute box center and extents


      this.getCenter(_center);

      _extents.subVectors(this.max, _center); // translate triangle to aabb origin


      _v0$2.subVectors(triangle.a, _center);

      _v1$7.subVectors(triangle.b, _center);

      _v2$3.subVectors(triangle.c, _center); // compute edge vectors for triangle


      _f0.subVectors(_v1$7, _v0$2);

      _f1.subVectors(_v2$3, _v1$7);

      _f2.subVectors(_v0$2, _v2$3); // test against axes that are given by cross product combinations of the edges of the triangle and the edges of the aabb
      // make an axis testing of each of the 3 sides of the aabb against each of the 3 sides of the triangle = 9 axis of separation
      // axis_ij = u_i x f_j (u0, u1, u2 = face normals of aabb = x,y,z axes vectors since aabb is axis aligned)


      var axes = [0, -_f0.z, _f0.y, 0, -_f1.z, _f1.y, 0, -_f2.z, _f2.y, _f0.z, 0, -_f0.x, _f1.z, 0, -_f1.x, _f2.z, 0, -_f2.x, -_f0.y, _f0.x, 0, -_f1.y, _f1.x, 0, -_f2.y, _f2.x, 0];

      if (!satForAxes(axes, _v0$2, _v1$7, _v2$3, _extents)) {
        return false;
      } // test 3 face normals from the aabb


      axes = [1, 0, 0, 0, 1, 0, 0, 0, 1];

      if (!satForAxes(axes, _v0$2, _v1$7, _v2$3, _extents)) {
        return false;
      } // finally testing the face normal of the triangle
      // use already existing triangle edge vectors here


      _triangleNormal.crossVectors(_f0, _f1);

      axes = [_triangleNormal.x, _triangleNormal.y, _triangleNormal.z];
      return satForAxes(axes, _v0$2, _v1$7, _v2$3, _extents);
    }
  }, {
    key: "clampPoint",
    value: function clampPoint(point, target) {
      return target.copy(point).clamp(this.min, this.max);
    }
  }, {
    key: "distanceToPoint",
    value: function distanceToPoint(point) {
      var clampedPoint = _vector$b.copy(point).clamp(this.min, this.max);

      return clampedPoint.sub(point).length();
    }
  }, {
    key: "getBoundingSphere",
    value: function getBoundingSphere(target) {
      this.getCenter(target.center);
      target.radius = this.getSize(_vector$b).length() * 0.5;
      return target;
    }
  }, {
    key: "intersect",
    value: function intersect(box) {
      this.min.max(box.min);
      this.max.min(box.max); // ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.

      if (this.isEmpty()) this.makeEmpty();
      return this;
    }
  }, {
    key: "union",
    value: function union(box) {
      this.min.min(box.min);
      this.max.max(box.max);
      return this;
    }
  }, {
    key: "applyMatrix4",
    value: function applyMatrix4(matrix) {
      // transform of empty box is an empty box.
      if (this.isEmpty()) return this; // NOTE: I am using a binary pattern to specify all 2^3 combinations below

      _points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix); // 000


      _points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix); // 001


      _points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix); // 010


      _points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix); // 011


      _points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix); // 100


      _points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix); // 101


      _points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix); // 110


      _points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix); // 111


      this.setFromPoints(_points);
      return this;
    }
  }, {
    key: "translate",
    value: function translate(offset) {
      this.min.add(offset);
      this.max.add(offset);
      return this;
    }
  }, {
    key: "equals",
    value: function equals(box) {
      return box.min.equals(this.min) && box.max.equals(this.max);
    }
  }]);

  return Box3;
}();

var _points = [/*@__PURE__*/new Vector3(), /*@__PURE__*/new Vector3(), /*@__PURE__*/new Vector3(), /*@__PURE__*/new Vector3(), /*@__PURE__*/new Vector3(), /*@__PURE__*/new Vector3(), /*@__PURE__*/new Vector3(), /*@__PURE__*/new Vector3()];

var _vector$b = /*@__PURE__*/new Vector3();

var _box$3 = /*@__PURE__*/new Box3(); // triangle centered vertices


var _v0$2 = /*@__PURE__*/new Vector3();

var _v1$7 = /*@__PURE__*/new Vector3();

var _v2$3 = /*@__PURE__*/new Vector3(); // triangle edge vectors


var _f0 = /*@__PURE__*/new Vector3();

var _f1 = /*@__PURE__*/new Vector3();

var _f2 = /*@__PURE__*/new Vector3();

var _center = /*@__PURE__*/new Vector3();

var _extents = /*@__PURE__*/new Vector3();

var _triangleNormal = /*@__PURE__*/new Vector3();

var _testAxis = /*@__PURE__*/new Vector3();

function satForAxes(axes, v0, v1, v2, extents) {
  for (var i = 0, j = axes.length - 3; i <= j; i += 3) {
    _testAxis.fromArray(axes, i); // project the aabb onto the separating axis


    var r = extents.x * Math.abs(_testAxis.x) + extents.y * Math.abs(_testAxis.y) + extents.z * Math.abs(_testAxis.z); // project all 3 vertices of the triangle onto the separating axis

    var p0 = v0.dot(_testAxis);
    var p1 = v1.dot(_testAxis);
    var p2 = v2.dot(_testAxis); // actual test, basically see if either of the most extreme of the triangle points intersects r

    if (Math.max(-Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r) {
      // points of the projected triangle are outside the projected half-length of the aabb
      // the axis is separating and we can exit
      return false;
    }
  }

  return true;
}

var _box$2 = /*@__PURE__*/new Box3();

var _v1$6 = /*@__PURE__*/new Vector3();

var _toFarthestPoint = /*@__PURE__*/new Vector3();

var _toPoint = /*@__PURE__*/new Vector3();

var Sphere = /*#__PURE__*/function () {
  function Sphere() {
    var center = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Vector3();
    var radius = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

    _classCallCheck$3(this, Sphere);

    this.center = center;
    this.radius = radius;
  }

  _createClass$2(Sphere, [{
    key: "set",
    value: function set(center, radius) {
      this.center.copy(center);
      this.radius = radius;
      return this;
    }
  }, {
    key: "setFromPoints",
    value: function setFromPoints(points, optionalCenter) {
      var center = this.center;

      if (optionalCenter !== undefined) {
        center.copy(optionalCenter);
      } else {
        _box$2.setFromPoints(points).getCenter(center);
      }

      var maxRadiusSq = 0;

      for (var i = 0, il = points.length; i < il; i++) {
        maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));
      }

      this.radius = Math.sqrt(maxRadiusSq);
      return this;
    }
  }, {
    key: "copy",
    value: function copy(sphere) {
      this.center.copy(sphere.center);
      this.radius = sphere.radius;
      return this;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.radius < 0;
    }
  }, {
    key: "makeEmpty",
    value: function makeEmpty() {
      this.center.set(0, 0, 0);
      this.radius = -1;
      return this;
    }
  }, {
    key: "containsPoint",
    value: function containsPoint(point) {
      return point.distanceToSquared(this.center) <= this.radius * this.radius;
    }
  }, {
    key: "distanceToPoint",
    value: function distanceToPoint(point) {
      return point.distanceTo(this.center) - this.radius;
    }
  }, {
    key: "intersectsSphere",
    value: function intersectsSphere(sphere) {
      var radiusSum = this.radius + sphere.radius;
      return sphere.center.distanceToSquared(this.center) <= radiusSum * radiusSum;
    }
  }, {
    key: "intersectsBox",
    value: function intersectsBox(box) {
      return box.intersectsSphere(this);
    }
  }, {
    key: "intersectsPlane",
    value: function intersectsPlane(plane) {
      return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
    }
  }, {
    key: "clampPoint",
    value: function clampPoint(point, target) {
      var deltaLengthSq = this.center.distanceToSquared(point);
      target.copy(point);

      if (deltaLengthSq > this.radius * this.radius) {
        target.sub(this.center).normalize();
        target.multiplyScalar(this.radius).add(this.center);
      }

      return target;
    }
  }, {
    key: "getBoundingBox",
    value: function getBoundingBox(target) {
      if (this.isEmpty()) {
        // Empty sphere produces empty bounding box
        target.makeEmpty();
        return target;
      }

      target.set(this.center, this.center);
      target.expandByScalar(this.radius);
      return target;
    }
  }, {
    key: "applyMatrix4",
    value: function applyMatrix4(matrix) {
      this.center.applyMatrix4(matrix);
      this.radius = this.radius * matrix.getMaxScaleOnAxis();
      return this;
    }
  }, {
    key: "translate",
    value: function translate(offset) {
      this.center.add(offset);
      return this;
    }
  }, {
    key: "expandByPoint",
    value: function expandByPoint(point) {
      // from https://github.com/juj/MathGeoLib/blob/2940b99b99cfe575dd45103ef20f4019dee15b54/src/Geometry/Sphere.cpp#L649-L671
      _toPoint.subVectors(point, this.center);

      var lengthSq = _toPoint.lengthSq();

      if (lengthSq > this.radius * this.radius) {
        var length = Math.sqrt(lengthSq);
        var missingRadiusHalf = (length - this.radius) * 0.5; // Nudge this sphere towards the target point. Add half the missing distance to radius,
        // and the other half to position. This gives a tighter enclosure, instead of if
        // the whole missing distance were just added to radius.

        this.center.add(_toPoint.multiplyScalar(missingRadiusHalf / length));
        this.radius += missingRadiusHalf;
      }

      return this;
    }
  }, {
    key: "union",
    value: function union(sphere) {
      // from https://github.com/juj/MathGeoLib/blob/2940b99b99cfe575dd45103ef20f4019dee15b54/src/Geometry/Sphere.cpp#L759-L769
      // To enclose another sphere into this sphere, we only need to enclose two points:
      // 1) Enclose the farthest point on the other sphere into this sphere.
      // 2) Enclose the opposite point of the farthest point into this sphere.
      if (this.center.equals(sphere.center) === true) {
        _toFarthestPoint.set(0, 0, 1).multiplyScalar(sphere.radius);
      } else {
        _toFarthestPoint.subVectors(sphere.center, this.center).normalize().multiplyScalar(sphere.radius);
      }

      this.expandByPoint(_v1$6.copy(sphere.center).add(_toFarthestPoint));
      this.expandByPoint(_v1$6.copy(sphere.center).sub(_toFarthestPoint));
      return this;
    }
  }, {
    key: "equals",
    value: function equals(sphere) {
      return sphere.center.equals(this.center) && sphere.radius === this.radius;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new this.constructor().copy(this);
    }
  }]);

  return Sphere;
}();

var _vector$a = /*@__PURE__*/new Vector3();

var _segCenter = /*@__PURE__*/new Vector3();

var _segDir = /*@__PURE__*/new Vector3();

var _diff = /*@__PURE__*/new Vector3();

var _edge1 = /*@__PURE__*/new Vector3();

var _edge2 = /*@__PURE__*/new Vector3();

var _normal$1 = /*@__PURE__*/new Vector3();

var Ray = /*#__PURE__*/function () {
  function Ray() {
    var origin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Vector3();
    var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Vector3(0, 0, -1);

    _classCallCheck$3(this, Ray);

    this.origin = origin;
    this.direction = direction;
  }

  _createClass$2(Ray, [{
    key: "set",
    value: function set(origin, direction) {
      this.origin.copy(origin);
      this.direction.copy(direction);
      return this;
    }
  }, {
    key: "copy",
    value: function copy(ray) {
      this.origin.copy(ray.origin);
      this.direction.copy(ray.direction);
      return this;
    }
  }, {
    key: "at",
    value: function at(t, target) {
      return target.copy(this.direction).multiplyScalar(t).add(this.origin);
    }
  }, {
    key: "lookAt",
    value: function lookAt(v) {
      this.direction.copy(v).sub(this.origin).normalize();
      return this;
    }
  }, {
    key: "recast",
    value: function recast(t) {
      this.origin.copy(this.at(t, _vector$a));
      return this;
    }
  }, {
    key: "closestPointToPoint",
    value: function closestPointToPoint(point, target) {
      target.subVectors(point, this.origin);
      var directionDistance = target.dot(this.direction);

      if (directionDistance < 0) {
        return target.copy(this.origin);
      }

      return target.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);
    }
  }, {
    key: "distanceToPoint",
    value: function distanceToPoint(point) {
      return Math.sqrt(this.distanceSqToPoint(point));
    }
  }, {
    key: "distanceSqToPoint",
    value: function distanceSqToPoint(point) {
      var directionDistance = _vector$a.subVectors(point, this.origin).dot(this.direction); // point behind the ray


      if (directionDistance < 0) {
        return this.origin.distanceToSquared(point);
      }

      _vector$a.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);

      return _vector$a.distanceToSquared(point);
    }
  }, {
    key: "distanceSqToSegment",
    value: function distanceSqToSegment(v0, v1, optionalPointOnRay, optionalPointOnSegment) {
      // from https://github.com/pmjoniak/GeometricTools/blob/master/GTEngine/Include/Mathematics/GteDistRaySegment.h
      // It returns the min distance between the ray and the segment
      // defined by v0 and v1
      // It can also set two optional targets :
      // - The closest point on the ray
      // - The closest point on the segment
      _segCenter.copy(v0).add(v1).multiplyScalar(0.5);

      _segDir.copy(v1).sub(v0).normalize();

      _diff.copy(this.origin).sub(_segCenter);

      var segExtent = v0.distanceTo(v1) * 0.5;
      var a01 = -this.direction.dot(_segDir);

      var b0 = _diff.dot(this.direction);

      var b1 = -_diff.dot(_segDir);

      var c = _diff.lengthSq();

      var det = Math.abs(1 - a01 * a01);
      var s0, s1, sqrDist, extDet;

      if (det > 0) {
        // The ray and segment are not parallel.
        s0 = a01 * b1 - b0;
        s1 = a01 * b0 - b1;
        extDet = segExtent * det;

        if (s0 >= 0) {
          if (s1 >= -extDet) {
            if (s1 <= extDet) {
              // region 0
              // Minimum at interior points of ray and segment.
              var invDet = 1 / det;
              s0 *= invDet;
              s1 *= invDet;
              sqrDist = s0 * (s0 + a01 * s1 + 2 * b0) + s1 * (a01 * s0 + s1 + 2 * b1) + c;
            } else {
              // region 1
              s1 = segExtent;
              s0 = Math.max(0, -(a01 * s1 + b0));
              sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
            }
          } else {
            // region 5
            s1 = -segExtent;
            s0 = Math.max(0, -(a01 * s1 + b0));
            sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
          }
        } else {
          if (s1 <= -extDet) {
            // region 4
            s0 = Math.max(0, -(-a01 * segExtent + b0));
            s1 = s0 > 0 ? -segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
            sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
          } else if (s1 <= extDet) {
            // region 3
            s0 = 0;
            s1 = Math.min(Math.max(-segExtent, -b1), segExtent);
            sqrDist = s1 * (s1 + 2 * b1) + c;
          } else {
            // region 2
            s0 = Math.max(0, -(a01 * segExtent + b0));
            s1 = s0 > 0 ? segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
            sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
          }
        }
      } else {
        // Ray and segment are parallel.
        s1 = a01 > 0 ? -segExtent : segExtent;
        s0 = Math.max(0, -(a01 * s1 + b0));
        sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
      }

      if (optionalPointOnRay) {
        optionalPointOnRay.copy(this.direction).multiplyScalar(s0).add(this.origin);
      }

      if (optionalPointOnSegment) {
        optionalPointOnSegment.copy(_segDir).multiplyScalar(s1).add(_segCenter);
      }

      return sqrDist;
    }
  }, {
    key: "intersectSphere",
    value: function intersectSphere(sphere, target) {
      _vector$a.subVectors(sphere.center, this.origin);

      var tca = _vector$a.dot(this.direction);

      var d2 = _vector$a.dot(_vector$a) - tca * tca;
      var radius2 = sphere.radius * sphere.radius;
      if (d2 > radius2) return null;
      var thc = Math.sqrt(radius2 - d2); // t0 = first intersect point - entrance on front of sphere

      var t0 = tca - thc; // t1 = second intersect point - exit point on back of sphere




      return this.at(t0, target);
    }
  }, {
    }
  }, {



