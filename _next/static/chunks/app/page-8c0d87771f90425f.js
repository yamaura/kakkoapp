(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[931],{

/***/ 149:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "static/media/kakkoapp_bg.19f1aa43.wasm";

/***/ }),

/***/ 577:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 8419))

/***/ }),

/***/ 8419:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Home; }
});

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(7437);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/index.js
var react = __webpack_require__(2265);
// EXTERNAL MODULE: ./node_modules/@nextui-org/progress/dist/chunk-U6YKS5KO.mjs + 30 modules
var chunk_U6YKS5KO = __webpack_require__(524);
;// CONCATENATED MODULE: ./src/app/form.tsx

function Form(props) {
    const handleSubmit = (e)=>{
        e.preventDefault();
        const t = e.target;
        props.onSubmit({
            lines: parseInt(t.lines.value),
            text: t.text.value,
            options: {
                do_sample: true,
                num_return_sequences: 1,
                temperature: parseFloat(t.temperature.value)
            }
        });
    };
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("form", {
        onSubmit: handleSubmit,
        className: "w-full max-w-lg",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "flex flex-wrap -mx-3 mb-6",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "w-full px-3",
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("label", {
                            className: "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",
                            children: "Initial Sequence"
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "flex w-full px-3",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("input", {
                                className: "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded mr-3 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
                                type: "text",
                                name: "text",
                                defaultValue: "",
                                placeholder: "(())"
                            }),
                            props.submittable ? /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                                className: "flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-3 px-2 rounded",
                                type: "submit",
                                children: "Run"
                            }) : ""
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: "flex flex-wrap -mx-3 mb-2",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "w-full md:w-1/3 px-3 mb-6 md:mb-0",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("label", {
                                className: "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",
                                children: "Rendering Lines"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("input", {
                                className: "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
                                type: "number",
                                name: "lines",
                                defaultValue: "5"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "w-full md:w-1/3 px-3 mb-6 md:mb-0",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("label", {
                                className: "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2",
                                children: "Temperature"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)("input", {
                                className: "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
                                type: "number",
                                step: "0.01",
                                name: "temperature",
                                defaultValue: "1.0"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                        className: "w-full md:w-1/3 px-3 mb-6 md:mb-0"
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./pkg/kakkoapp.js
let wasm;
const cachedTextDecoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8", {
    ignoreBOM: true,
    fatal: true
}) : {
    decode: ()=>{
        throw Error("TextDecoder not available");
    }
};
if (typeof TextDecoder !== "undefined") {
    cachedTextDecoder.decode();
}
;
let cachedUint8Memory0 = null;
function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}
function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
let WASM_VECTOR_LEN = 0;
const cachedTextEncoder = typeof TextEncoder !== "undefined" ? new TextEncoder("utf-8") : {
    encode: ()=>{
        throw Error("TextEncoder not available");
    }
};
const encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
} : function(arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
};
function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }
    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;
    const mem = getUint8Memory0();
    let offset = 0;
    for(; offset < len; offset++){
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);
        offset += ret.written;
    }
    WASM_VECTOR_LEN = offset;
    return ptr;
}
let cachedInt32Memory0 = null;
function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}
/**
* @param {string} s
* @returns {string}
*/ function draw(s) {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.draw(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        deferred2_0 = r0;
        deferred2_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally{
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}
async function __wbg_load(module, imports) {
    if (typeof Response === "function" && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === "function") {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                if (module.headers.get("Content-Type") != "application/wasm") {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                } else {
                    throw e;
                }
            }
        }
        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);
        if (instance instanceof WebAssembly.Instance) {
            return {
                instance,
                module
            };
        } else {
            return instance;
        }
    }
}
function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    return imports;
}
function __wbg_init_memory(imports, maybe_memory) {}
function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = null;
    cachedUint8Memory0 = null;
    return wasm;
}
function initSync(module) {
    if (wasm !== undefined) return wasm;
    const imports = __wbg_get_imports();
    __wbg_init_memory(imports);
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}
async function __wbg_init(input) {
    if (wasm !== undefined) return wasm;
    if (typeof input === "undefined") {
        input = /* asset import */ new __webpack_require__.U(__webpack_require__(149));
    }
    const imports = __wbg_get_imports();
    if (typeof input === "string" || typeof Request === "function" && input instanceof Request || typeof URL === "function" && input instanceof URL) {
        input = fetch(input);
    }
    __wbg_init_memory(imports);
    const { instance, module } = await __wbg_load(await input, imports);
    return __wbg_finalize_init(instance, module);
}

/* harmony default export */ var kakkoapp = (__wbg_init);

;// CONCATENATED MODULE: ./src/app/image.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 


function Image(props) {
    const [svg, setSvg] = (0,react.useState)("");
    (0,react.useEffect)(()=>{
        async function startup() {
            await kakkoapp();
            setSvg(draw(props.text));
        }
        startup();
    }, [
        props.text
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
            dangerouslySetInnerHTML: {
                __html: svg
            }
        })
    });
}

;// CONCATENATED MODULE: ./src/app/page.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 





const sleep = (ms)=>new Promise((res)=>setTimeout(res, ms));
function trim(text) {
    return [
        ...text
    ].filter((c)=>{
        return c == "(" || c == ")";
    }).join("");
}
function Loading() {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        role: "status",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
                "aria-hidden": "true",
                className: "w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",
                viewBox: "0 0 100 101",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                        d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
                        fill: "currentColor"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("path", {
                        d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
                        fill: "currentFill"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                className: "sr-only",
                children: "Loading..."
            })
        ]
    });
}
function Home() {
    const workerRef = (0,react.useRef)();
    const [ready, setReady] = (0,react.useState)(false);
    const [progress, setProgress] = (0,react.useState)(0);
    const [texts, setTexts] = (0,react.useState)("");
    const [result, setResult] = (0,react.useState)("");
    (0,react.useEffect)(()=>{
        workerRef.current = new Worker(__webpack_require__.tu(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u(156), __webpack_require__.b)));
        let onMessageReceived = (event)=>{
            console.log(event.data);
            switch(event.data.status){
                case "initiate":
                    setReady(false);
                    break;
                case "ready":
                    setReady(true);
                    break;
                case "progress":
                    setProgress(event.data.progress);
                    break;
                case "complete":
                    let output = trim(event.data.output[0].generated_text);
                    setTexts((t)=>t + "\n" + output);
                    setResult(event.data.output[0]);
                    break;
            }
        };
        // Attach the callback function as an event listener.
        workerRef.current.addEventListener("message", onMessageReceived);
        setTexts("Initial");
        return ()=>{
            var _workerRef_current;
            (_workerRef_current = workerRef.current) === null || _workerRef_current === void 0 ? void 0 : _workerRef_current.terminate();
        };
    }, []);
    const onFormSubmit = (e)=>{
        setTexts("");
        console.log(e);
        const t = e;
        for(let i = 0; i < t.lines; ++i){
            var _workerRef_current;
            (_workerRef_current = workerRef.current) === null || _workerRef_current === void 0 ? void 0 : _workerRef_current.postMessage({
                text: t.text,
                options: t.options
            });
            sleep(500);
        }
    };
    console.log(texts);
    //      className={`flex min-h-screen flex-col items-center p-24 className="dark text-foreground bg-background"`}
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("main", {
        className: "p-24 m-1",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(Form, {
                onSubmit: onFormSubmit,
                submittable: texts !== ""
            }),
            progress < 100 && /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_U6YKS5KO/* progress_default */.W, {
                size: "md",
                className: "mt-4 w-full",
                "aria-label": "Loading...",
                value: progress
            }),
             false && /*#__PURE__*/ 0,
            texts == "" ? /*#__PURE__*/ (0,jsx_runtime.jsx)(Loading, {}) : "",
            /*#__PURE__*/ (0,jsx_runtime.jsx)(Image, {
                text: texts
            })
        ]
    });
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [133,524,971,596,744], function() { return __webpack_exec__(577); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ _N_E = __webpack_exports__;
/******/ }
]);