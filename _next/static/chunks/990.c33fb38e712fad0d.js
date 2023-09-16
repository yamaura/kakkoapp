(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[990],{

/***/ 4699:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ 7133:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(4699)
var ieee754 = __webpack_require__(9087)
var customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.lW = Buffer
__webpack_unused_export__ = SlowBuffer
exports.h2 = 50

var K_MAX_LENGTH = 0x7fffffff
__webpack_unused_export__ = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    var proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    var copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        Buffer.from(buf).copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.h2
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (var i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
var hexSliceLookupTable = (function () {
  var alphabet = '0123456789abcdef'
  var table = new Array(256)
  for (var i = 0; i < 16; ++i) {
    var i16 = i * 16
    for (var j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()


/***/ }),

/***/ 9087:
/***/ (function(__unused_webpack_module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ 2601:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var _global_process, _global_process1;
module.exports = ((_global_process = __webpack_require__.g.process) == null ? void 0 : _global_process.env) && typeof ((_global_process1 = __webpack_require__.g.process) == null ? void 0 : _global_process1.env) === "object" ? __webpack_require__.g.process : __webpack_require__(8960);

//# sourceMappingURL=process.js.map

/***/ }),

/***/ 692:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var __dirname = "/";
(function(){var e={452:function(e){"use strict";e.exports=__webpack_require__(9875)}};var t={};function __nccwpck_require__(o){var a=t[o];if(a!==undefined){return a.exports}var s=t[o]={exports:{}};var n=true;try{e[o](s,s.exports,__nccwpck_require__);n=false}finally{if(n)delete t[o]}return s.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var o={};!function(){var e=o;var t,a=(t=__nccwpck_require__(452))&&"object"==typeof t&&"default"in t?t.default:t,s=/https?|ftp|gopher|file/;function r(e){"string"==typeof e&&(e=d(e));var t=function(e,t,o){var a=e.auth,s=e.hostname,n=e.protocol||"",p=e.pathname||"",c=e.hash||"",i=e.query||"",u=!1;a=a?encodeURIComponent(a).replace(/%3A/i,":")+"@":"",e.host?u=a+e.host:s&&(u=a+(~s.indexOf(":")?"["+s+"]":s),e.port&&(u+=":"+e.port)),i&&"object"==typeof i&&(i=t.encode(i));var f=e.search||i&&"?"+i||"";return n&&":"!==n.substr(-1)&&(n+=":"),e.slashes||(!n||o.test(n))&&!1!==u?(u="//"+(u||""),p&&"/"!==p[0]&&(p="/"+p)):u||(u=""),c&&"#"!==c[0]&&(c="#"+c),f&&"?"!==f[0]&&(f="?"+f),{protocol:n,host:u,pathname:p=p.replace(/[?#]/g,encodeURIComponent),search:f=f.replace("#","%23"),hash:c}}(e,a,s);return""+t.protocol+t.host+t.pathname+t.search+t.hash}var n="http://",p="w.w",c=n+p,i=/^([a-z0-9.+-]*:\/\/\/)([a-z0-9.+-]:\/*)?/i,u=/https?|ftp|gopher|file/;function h(e,t){var o="string"==typeof e?d(e):e;e="object"==typeof e?r(e):e;var a=d(t),s="";o.protocol&&!o.slashes&&(s=o.protocol,e=e.replace(o.protocol,""),s+="/"===t[0]||"/"===e[0]?"/":""),s&&a.protocol&&(s="",a.slashes||(s=a.protocol,t=t.replace(a.protocol,"")));var p=e.match(i);p&&!a.protocol&&(e=e.substr((s=p[1]+(p[2]||"")).length),/^\/\/[^/]/.test(t)&&(s=s.slice(0,-1)));var f=new URL(e,c+"/"),m=new URL(t,f).toString().replace(c,""),v=a.protocol||o.protocol;return v+=o.slashes||a.slashes?"//":"",!s&&v?m=m.replace(n,v):s&&(m=m.replace(n,"")),u.test(m)||~t.indexOf(".")||"/"===e.slice(-1)||"/"===t.slice(-1)||"/"!==m.slice(-1)||(m=m.slice(0,-1)),s&&(m=s+("/"===m[0]?m.substr(1):m)),m}function l(){}l.prototype.parse=d,l.prototype.format=r,l.prototype.resolve=h,l.prototype.resolveObject=h;var f=/^https?|ftp|gopher|file/,m=/^(.*?)([#?].*)/,v=/^([a-z0-9.+-]*:)(\/{0,3})(.*)/i,_=/^([a-z0-9.+-]*:)?\/\/\/*/i,b=/^([a-z0-9.+-]*:)(\/{0,2})\[(.*)\]$/i;function d(e,t,o){if(void 0===t&&(t=!1),void 0===o&&(o=!1),e&&"object"==typeof e&&e instanceof l)return e;var s=(e=e.trim()).match(m);e=s?s[1].replace(/\\/g,"/")+s[2]:e.replace(/\\/g,"/"),b.test(e)&&"/"!==e.slice(-1)&&(e+="/");var n=!/(^javascript)/.test(e)&&e.match(v),i=_.test(e),u="";n&&(f.test(n[1])||(u=n[1].toLowerCase(),e=""+n[2]+n[3]),n[2]||(i=!1,f.test(n[1])?(u=n[1],e=""+n[3]):e="//"+n[3]),3!==n[2].length&&1!==n[2].length||(u=n[1],e="/"+n[3]));var g,y=(s?s[1]:e).match(/^https?:\/\/[^/]+(:[0-9]+)(?=\/|$)/),w=y&&y[1],x=new l,C="",U="";try{g=new URL(e)}catch(t){C=t,u||o||!/^\/\//.test(e)||/^\/\/.+[@.]/.test(e)||(U="/",e=e.substr(1));try{g=new URL(e,c)}catch(e){return x.protocol=u,x.href=u,x}}x.slashes=i&&!U,x.host=g.host===p?"":g.host,x.hostname=g.hostname===p?"":g.hostname.replace(/(\[|\])/g,""),x.protocol=C?u||null:g.protocol,x.search=g.search.replace(/\\/g,"%5C"),x.hash=g.hash.replace(/\\/g,"%5C");var j=e.split("#");!x.search&&~j[0].indexOf("?")&&(x.search="?"),x.hash||""!==j[1]||(x.hash="#"),x.query=t?a.decode(g.search.substr(1)):x.search.substr(1),x.pathname=U+(n?function(e){return e.replace(/['^|`]/g,(function(e){return"%"+e.charCodeAt().toString(16).toUpperCase()})).replace(/((?:%[0-9A-F]{2})+)/g,(function(e,t){try{return decodeURIComponent(t).split("").map((function(e){var t=e.charCodeAt();return t>256||/^[a-z0-9]$/i.test(e)?e:"%"+t.toString(16).toUpperCase()})).join("")}catch(e){return t}}))}(g.pathname):g.pathname),"about:"===x.protocol&&"blank"===x.pathname&&(x.protocol="",x.pathname=""),C&&"/"!==e[0]&&(x.pathname=x.pathname.substr(1)),u&&!f.test(u)&&"/"!==e.slice(-1)&&"/"===x.pathname&&(x.pathname=""),x.path=x.pathname+x.search,x.auth=[g.username,g.password].map(decodeURIComponent).filter(Boolean).join(":"),x.port=g.port,w&&!x.host.endsWith(w)&&(x.host+=w,x.port=w.slice(1)),x.href=U?""+x.pathname+x.search+x.hash:r(x);var q=/^(file)/.test(x.href)?["host","hostname"]:[];return Object.keys(x).forEach((function(e){~q.indexOf(e)||(x[e]=x[e]||null)})),x}e.parse=d,e.format=r,e.resolve=h,e.resolveObject=function(e,t){return d(h(e,t))},e.Url=l}();module.exports=o})();

/***/ }),

/***/ 8960:
/***/ (function(module) {

var __dirname = "/";
(function(){var e={229:function(e){var t=e.exports={};var r;var n;function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}(function(){try{if(typeof setTimeout==="function"){r=setTimeout}else{r=defaultSetTimout}}catch(e){r=defaultSetTimout}try{if(typeof clearTimeout==="function"){n=clearTimeout}else{n=defaultClearTimeout}}catch(e){n=defaultClearTimeout}})();function runTimeout(e){if(r===setTimeout){return setTimeout(e,0)}if((r===defaultSetTimout||!r)&&setTimeout){r=setTimeout;return setTimeout(e,0)}try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}function runClearTimeout(e){if(n===clearTimeout){return clearTimeout(e)}if((n===defaultClearTimeout||!n)&&clearTimeout){n=clearTimeout;return clearTimeout(e)}try{return n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}var i=[];var o=false;var u;var a=-1;function cleanUpNextTick(){if(!o||!u){return}o=false;if(u.length){i=u.concat(i)}else{a=-1}if(i.length){drainQueue()}}function drainQueue(){if(o){return}var e=runTimeout(cleanUpNextTick);o=true;var t=i.length;while(t){u=i;i=[];while(++a<t){if(u){u[a].run()}}a=-1;t=i.length}u=null;o=false;runClearTimeout(e)}t.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1){for(var r=1;r<arguments.length;r++){t[r-1]=arguments[r]}}i.push(new Item(e,t));if(i.length===1&&!o){runTimeout(drainQueue)}};function Item(e,t){this.fun=e;this.array=t}Item.prototype.run=function(){this.fun.apply(null,this.array)};t.title="browser";t.browser=true;t.env={};t.argv=[];t.version="";t.versions={};function noop(){}t.on=noop;t.addListener=noop;t.once=noop;t.off=noop;t.removeListener=noop;t.removeAllListeners=noop;t.emit=noop;t.prependListener=noop;t.prependOnceListener=noop;t.listeners=function(e){return[]};t.binding=function(e){throw new Error("process.binding is not supported")};t.cwd=function(){return"/"};t.chdir=function(e){throw new Error("process.chdir is not supported")};t.umask=function(){return 0}}};var t={};function __nccwpck_require__(r){var n=t[r];if(n!==undefined){return n.exports}var i=t[r]={exports:{}};var o=true;try{e[r](i,i.exports,__nccwpck_require__);o=false}finally{if(o)delete t[r]}return i.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var r=__nccwpck_require__(229);module.exports=r})();

/***/ }),

/***/ 9875:
/***/ (function(module) {

var __dirname = "/";
(function(){"use strict";var e={815:function(e){function hasOwnProperty(e,r){return Object.prototype.hasOwnProperty.call(e,r)}e.exports=function(e,n,t,o){n=n||"&";t=t||"=";var a={};if(typeof e!=="string"||e.length===0){return a}var i=/\+/g;e=e.split(n);var u=1e3;if(o&&typeof o.maxKeys==="number"){u=o.maxKeys}var c=e.length;if(u>0&&c>u){c=u}for(var p=0;p<c;++p){var f=e[p].replace(i,"%20"),s=f.indexOf(t),_,l,y,d;if(s>=0){_=f.substr(0,s);l=f.substr(s+1)}else{_=f;l=""}y=decodeURIComponent(_);d=decodeURIComponent(l);if(!hasOwnProperty(a,y)){a[y]=d}else if(r(a[y])){a[y].push(d)}else{a[y]=[a[y],d]}}return a};var r=Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"}},577:function(e){var stringifyPrimitive=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};e.exports=function(e,t,o,a){t=t||"&";o=o||"=";if(e===null){e=undefined}if(typeof e==="object"){return map(n(e),(function(n){var a=encodeURIComponent(stringifyPrimitive(n))+o;if(r(e[n])){return map(e[n],(function(e){return a+encodeURIComponent(stringifyPrimitive(e))})).join(t)}else{return a+encodeURIComponent(stringifyPrimitive(e[n]))}})).join(t)}if(!a)return"";return encodeURIComponent(stringifyPrimitive(a))+o+encodeURIComponent(stringifyPrimitive(e))};var r=Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"};function map(e,r){if(e.map)return e.map(r);var n=[];for(var t=0;t<e.length;t++){n.push(r(e[t],t))}return n}var n=Object.keys||function(e){var r=[];for(var n in e){if(Object.prototype.hasOwnProperty.call(e,n))r.push(n)}return r}}};var r={};function __nccwpck_require__(n){var t=r[n];if(t!==undefined){return t.exports}var o=r[n]={exports:{}};var a=true;try{e[n](o,o.exports,__nccwpck_require__);a=false}finally{if(a)delete r[n]}return o.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var n={};!function(){var e=n;e.decode=e.parse=__nccwpck_require__(815);e.encode=e.stringify=__nccwpck_require__(577)}();module.exports=n})();

/***/ }),

/***/ 7731:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  InferenceSession: function() { return /* reexport */ inference_session_InferenceSession; },
  Tensor: function() { return /* reexport */ tensor_Tensor; },
  env: function() { return /* reexport */ env; },
  registerBackend: function() { return /* reexport */ registerBackend; }
});

;// CONCATENATED MODULE: ./node_modules/onnxruntime-common/dist/lib/backend-impl.js
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
const backends = {};
const backendsSortedByPriority = [];
/**
 * Register a backend.
 *
 * @param name - the name as a key to lookup as an execution provider.
 * @param backend - the backend object.
 * @param priority - an integer indicating the priority of the backend. Higher number means higher priority. if priority
 * < 0, it will be considered as a 'beta' version and will not be used as a fallback backend by default.
 *
 * @internal
 */
const registerBackend = (name, backend, priority) => {
    if (backend && typeof backend.init === 'function' && typeof backend.createSessionHandler === 'function') {
        const currentBackend = backends[name];
        if (currentBackend === undefined) {
            backends[name] = { backend, priority };
        }
        else if (currentBackend.priority > priority) {
            // same name is already registered with a higher priority. skip registeration.
            return;
        }
        else if (currentBackend.priority === priority) {
            if (currentBackend.backend !== backend) {
                throw new Error(`cannot register backend "${name}" using priority ${priority}`);
            }
        }
        if (priority >= 0) {
            const i = backendsSortedByPriority.indexOf(name);
            if (i !== -1) {
                backendsSortedByPriority.splice(i, 1);
            }
            for (let i = 0; i < backendsSortedByPriority.length; i++) {
                if (backends[backendsSortedByPriority[i]].priority <= priority) {
                    backendsSortedByPriority.splice(i, 0, name);
                    return;
                }
            }
            backendsSortedByPriority.push(name);
        }
        return;
    }
    throw new TypeError('not a valid backend');
};
/**
 * Resolve backend by specified hints.
 *
 * @param backendHints - a list of execution provider names to lookup. If omitted use registered backends as list.
 * @returns a promise that resolves to the backend.
 *
 * @internal
 */
const resolveBackend = async (backendHints) => {
    const backendNames = backendHints.length === 0 ? backendsSortedByPriority : backendHints;
    const errors = [];
    for (const backendName of backendNames) {
        const backendInfo = backends[backendName];
        if (backendInfo) {
            if (backendInfo.initialized) {
                return backendInfo.backend;
            }
            else if (backendInfo.aborted) {
                continue; // current backend is unavailable; try next
            }
            const isInitializing = !!backendInfo.initPromise;
            try {
                if (!isInitializing) {
                    backendInfo.initPromise = backendInfo.backend.init();
                }
                await backendInfo.initPromise;
                backendInfo.initialized = true;
                return backendInfo.backend;
            }
            catch (e) {
                if (!isInitializing) {
                    errors.push({ name: backendName, err: e });
                }
                backendInfo.aborted = true;
            }
            finally {
                delete backendInfo.initPromise;
            }
        }
    }
    throw new Error(`no available backend found. ERR: ${errors.map(e => `[${e.name}] ${e.err}`).join(', ')}`);
};
//# sourceMappingURL=backend-impl.js.map
;// CONCATENATED MODULE: ./node_modules/onnxruntime-common/dist/lib/backend.js
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

//# sourceMappingURL=backend.js.map
;// CONCATENATED MODULE: ./node_modules/onnxruntime-common/dist/lib/env-impl.js
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
class EnvImpl {
    constructor() {
        this.wasm = {};
        this.webgl = {};
        this.logLevelInternal = 'warning';
    }
    // TODO standadize the getter and setter convention in env for other fields.
    set logLevel(value) {
        if (value === undefined) {
            return;
        }
        if (typeof value !== 'string' || ['verbose', 'info', 'warning', 'error', 'fatal'].indexOf(value) === -1) {
            throw new Error(`Unsupported logging level: ${value}`);
        }
        this.logLevelInternal = value;
    }
    get logLevel() {
        return this.logLevelInternal;
    }
}
//# sourceMappingURL=env-impl.js.map
;// CONCATENATED MODULE: ./node_modules/onnxruntime-common/dist/lib/env.js
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * Represent a set of flags as a global singleton.
 */
const env = new EnvImpl();
//# sourceMappingURL=env.js.map
;// CONCATENATED MODULE: ./node_modules/onnxruntime-common/dist/lib/tensor-impl.js
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
const isBigInt64ArrayAvailable = typeof BigInt64Array !== 'undefined' && typeof BigInt64Array.from === 'function';
const isBigUint64ArrayAvailable = typeof BigUint64Array !== 'undefined' && typeof BigUint64Array.from === 'function';
// a runtime map that maps type string to TypedArray constructor. Should match Tensor.DataTypeMap.
const NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP = new Map([
    ['float32', Float32Array],
    ['uint8', Uint8Array],
    ['int8', Int8Array],
    ['uint16', Uint16Array],
    ['int16', Int16Array],
    ['int32', Int32Array],
    ['bool', Uint8Array],
    ['float64', Float64Array],
    ['uint32', Uint32Array],
]);
// a runtime map that maps type string to TypedArray constructor. Should match Tensor.DataTypeMap.
const NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP = new Map([
    [Float32Array, 'float32'],
    [Uint8Array, 'uint8'],
    [Int8Array, 'int8'],
    [Uint16Array, 'uint16'],
    [Int16Array, 'int16'],
    [Int32Array, 'int32'],
    [Float64Array, 'float64'],
    [Uint32Array, 'uint32'],
]);
if (isBigInt64ArrayAvailable) {
    NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set('int64', BigInt64Array);
    NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigInt64Array, 'int64');
}
if (isBigUint64ArrayAvailable) {
    NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.set('uint64', BigUint64Array);
    NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.set(BigUint64Array, 'uint64');
}
/**
 * calculate size from dims.
 *
 * @param dims the dims array. May be an illegal input.
 */
const calculateSize = (dims) => {
    let size = 1;
    for (let i = 0; i < dims.length; i++) {
        const dim = dims[i];
        if (typeof dim !== 'number' || !Number.isSafeInteger(dim)) {
            throw new TypeError(`dims[${i}] must be an integer, got: ${dim}`);
        }
        if (dim < 0) {
            throw new RangeError(`dims[${i}] must be a non-negative integer, got: ${dim}`);
        }
        size *= dim;
    }
    return size;
};
class Tensor {
    constructor(arg0, arg1, arg2) {
        let type;
        let data;
        let dims;
        // check whether arg0 is type or data
        if (typeof arg0 === 'string') {
            //
            // Override: constructor(type, data, ...)
            //
            type = arg0;
            dims = arg2;
            if (arg0 === 'string') {
                // string tensor
                if (!Array.isArray(arg1)) {
                    throw new TypeError('A string tensor\'s data must be a string array.');
                }
                // we don't check whether every element in the array is string; this is too slow. we assume it's correct and
                // error will be populated at inference
                data = arg1;
            }
            else {
                // numeric tensor
                const typedArrayConstructor = NUMERIC_TENSOR_TYPE_TO_TYPEDARRAY_MAP.get(arg0);
                if (typedArrayConstructor === undefined) {
                    throw new TypeError(`Unsupported tensor type: ${arg0}.`);
                }
                if (Array.isArray(arg1)) {
                    // use 'as any' here because TypeScript's check on type of 'SupportedTypedArrayConstructors.from()' produces
                    // incorrect results.
                    // 'typedArrayConstructor' should be one of the typed array prototype objects.
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    data = typedArrayConstructor.from(arg1);
                }
                else if (arg1 instanceof typedArrayConstructor) {
                    data = arg1;
                }
                else {
                    throw new TypeError(`A ${type} tensor's data must be type of ${typedArrayConstructor}`);
                }
            }
        }
        else {
            //
            // Override: constructor(data, ...)
            //
            dims = arg1;
            if (Array.isArray(arg0)) {
                // only boolean[] and string[] is supported
                if (arg0.length === 0) {
                    throw new TypeError('Tensor type cannot be inferred from an empty array.');
                }
                const firstElementType = typeof arg0[0];
                if (firstElementType === 'string') {
                    type = 'string';
                    data = arg0;
                }
                else if (firstElementType === 'boolean') {
                    type = 'bool';
                    // 'arg0' is of type 'boolean[]'. Uint8Array.from(boolean[]) actually works, but typescript thinks this is
                    // wrong type. We use 'as any' to make it happy.
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    data = Uint8Array.from(arg0);
                }
                else {
                    throw new TypeError(`Invalid element type of data array: ${firstElementType}.`);
                }
            }
            else {
                // get tensor type from TypedArray
                const mappedType = NUMERIC_TENSOR_TYPEDARRAY_TO_TYPE_MAP.get(arg0.constructor);
                if (mappedType === undefined) {
                    throw new TypeError(`Unsupported type for tensor data: ${arg0.constructor}.`);
                }
                type = mappedType;
                data = arg0;
            }
        }
        // type and data is processed, now processing dims
        if (dims === undefined) {
            // assume 1-D tensor if dims omitted
            dims = [data.length];
        }
        else if (!Array.isArray(dims)) {
            throw new TypeError('A tensor\'s dims must be a number array');
        }
        // perform check
        const size = calculateSize(dims);
        if (size !== data.length) {
            throw new Error(`Tensor's size(${size}) does not match data length(${data.length}).`);
        }
        this.dims = dims;
        this.type = type;
        this.data = data;
        this.size = size;
    }
    // #endregion
    /**
     * Create a new tensor object from image object
     *
     * @param buffer - Extracted image buffer data - assuming RGBA format
     * @param imageFormat - input image configuration - required configurations height, width, format
     * @param tensorFormat - output tensor configuration - Default is RGB format
     */
    static bufferToTensor(buffer, options) {
        if (buffer === undefined) {
            throw new Error('Image buffer must be defined');
        }
        if (options.height === undefined || options.width === undefined) {
            throw new Error('Image height and width must be defined');
        }
        const { height, width } = options;
        const norm = options.norm;
        let normMean;
        let normBias;
        if (norm === undefined || norm.mean === undefined) {
            normMean = 255;
        }
        else {
            normMean = norm.mean;
        }
        if (norm === undefined || norm.bias === undefined) {
            normBias = 0;
        }
        else {
            normBias = norm.bias;
        }
        const inputformat = options.bitmapFormat !== undefined ? options.bitmapFormat : 'RGBA';
        // default value is RGBA since imagedata and HTMLImageElement uses it
        const outputformat = options.tensorFormat !== undefined ?
            (options.tensorFormat !== undefined ? options.tensorFormat : 'RGB') :
            'RGB';
        const offset = height * width;
        const float32Data = outputformat === 'RGBA' ? new Float32Array(offset * 4) : new Float32Array(offset * 3);
        // Default pointer assignments
        let step = 4, rImagePointer = 0, gImagePointer = 1, bImagePointer = 2, aImagePointer = 3;
        let rTensorPointer = 0, gTensorPointer = offset, bTensorPointer = offset * 2, aTensorPointer = -1;
        // Updating the pointer assignments based on the input image format
        if (inputformat === 'RGB') {
            step = 3;
            rImagePointer = 0;
            gImagePointer = 1;
            bImagePointer = 2;
            aImagePointer = -1;
        }
        // Updating the pointer assignments based on the output tensor format
        if (outputformat === 'RGBA') {
            aTensorPointer = offset * 3;
        }
        else if (outputformat === 'RBG') {
            rTensorPointer = 0;
            bTensorPointer = offset;
            gTensorPointer = offset * 2;
        }
        else if (outputformat === 'BGR') {
            bTensorPointer = 0;
            gTensorPointer = offset;
            rTensorPointer = offset * 2;
        }
        for (let i = 0; i < offset; i++, rImagePointer += step, bImagePointer += step, gImagePointer += step, aImagePointer += step) {
            float32Data[rTensorPointer++] = (buffer[rImagePointer] + normBias) / normMean;
            float32Data[gTensorPointer++] = (buffer[gImagePointer] + normBias) / normMean;
            float32Data[bTensorPointer++] = (buffer[bImagePointer] + normBias) / normMean;
            if (aTensorPointer !== -1 && aImagePointer !== -1) {
                float32Data[aTensorPointer++] = (buffer[aImagePointer] + normBias) / normMean;
            }
        }
        // Float32Array -> ort.Tensor
        const outputTensor = outputformat === 'RGBA' ? new Tensor('float32', float32Data, [1, 4, height, width]) :
            new Tensor('float32', float32Data, [1, 3, height, width]);
        return outputTensor;
    }
    static async fromImage(image, options) {
        // checking the type of image object
        const isHTMLImageEle = typeof (HTMLImageElement) !== 'undefined' && image instanceof HTMLImageElement;
        const isImageDataEle = typeof (ImageData) !== 'undefined' && image instanceof ImageData;
        const isImageBitmap = typeof (ImageBitmap) !== 'undefined' && image instanceof ImageBitmap;
        const isURL = typeof (String) !== 'undefined' && (image instanceof String || typeof image === 'string');
        let data;
        let tensorConfig = {};
        // filling and checking image configuration options
        if (isHTMLImageEle) {
            // HTMLImageElement - image object - format is RGBA by default
            const canvas = document.createElement('canvas');
            const pixels2DContext = canvas.getContext('2d');
            if (pixels2DContext != null) {
                let height = image.naturalHeight;
                let width = image.naturalWidth;
                if (options !== undefined && options.resizedHeight !== undefined && options.resizedWidth !== undefined) {
                    height = options.resizedHeight;
                    width = options.resizedWidth;
                }
                if (options !== undefined) {
                    tensorConfig = options;
                    if (options.tensorFormat !== undefined) {
                        throw new Error('Image input config format must be RGBA for HTMLImageElement');
                    }
                    else {
                        tensorConfig.tensorFormat = 'RGBA';
                    }
                    if (options.height !== undefined && options.height !== height) {
                        throw new Error('Image input config height doesn\'t match HTMLImageElement height');
                    }
                    else {
                        tensorConfig.height = height;
                    }
                    if (options.width !== undefined && options.width !== width) {
                        throw new Error('Image input config width doesn\'t match HTMLImageElement width');
                    }
                    else {
                        tensorConfig.width = width;
                    }
                }
                else {
                    tensorConfig.tensorFormat = 'RGBA';
                    tensorConfig.height = height;
                    tensorConfig.width = width;
                }
                canvas.width = width;
                canvas.height = height;
                pixels2DContext.drawImage(image, 0, 0, width, height);
                data = pixels2DContext.getImageData(0, 0, width, height).data;
            }
            else {
                throw new Error('Can not access image data');
            }
        }
        else if (isImageDataEle) {
            // ImageData - image object - format is RGBA by default
            const format = 'RGBA';
            let height;
            let width;
            if (options !== undefined && options.resizedWidth !== undefined && options.resizedHeight !== undefined) {
                height = options.resizedHeight;
                width = options.resizedWidth;
            }
            else {
                height = image.height;
                width = image.width;
            }
            if (options !== undefined) {
                tensorConfig = options;
                if (options.bitmapFormat !== undefined && options.bitmapFormat !== format) {
                    throw new Error('Image input config format must be RGBA for ImageData');
                }
                else {
                    tensorConfig.bitmapFormat = 'RGBA';
                }
            }
            else {
                tensorConfig.bitmapFormat = 'RGBA';
            }
            tensorConfig.height = height;
            tensorConfig.width = width;
            if (options !== undefined) {
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = width;
                tempCanvas.height = height;
                const pixels2DContext = tempCanvas.getContext('2d');
                if (pixels2DContext != null) {
                    pixels2DContext.putImageData(image, 0, 0);
                    data = pixels2DContext.getImageData(0, 0, width, height).data;
                }
                else {
                    throw new Error('Can not access image data');
                }
            }
            else {
                data = image.data;
            }
        }
        else if (isImageBitmap) {
            // ImageBitmap - image object - format must be provided by user
            if (options === undefined) {
                throw new Error('Please provide image config with format for Imagebitmap');
            }
            if (options.bitmapFormat !== undefined) {
                throw new Error('Image input config format must be defined for ImageBitmap');
            }
            const pixels2DContext = document.createElement('canvas').getContext('2d');
            if (pixels2DContext != null) {
                const height = image.height;
                const width = image.width;
                pixels2DContext.drawImage(image, 0, 0, width, height);
                data = pixels2DContext.getImageData(0, 0, width, height).data;
                if (options !== undefined) {
                    // using square brackets to avoid TS error - type 'never'
                    if (options.height !== undefined && options.height !== height) {
                        throw new Error('Image input config height doesn\'t match ImageBitmap height');
                    }
                    else {
                        tensorConfig.height = height;
                    }
                    // using square brackets to avoid TS error - type 'never'
                    if (options.width !== undefined && options.width !== width) {
                        throw new Error('Image input config width doesn\'t match ImageBitmap width');
                    }
                    else {
                        tensorConfig.width = width;
                    }
                }
                else {
                    tensorConfig.height = height;
                    tensorConfig.width = width;
                }
                return Tensor.bufferToTensor(data, tensorConfig);
            }
            else {
                throw new Error('Can not access image data');
            }
        }
        else if (isURL) {
            return new Promise((resolve, reject) => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                if (!image || !context) {
                    return reject();
                }
                const newImage = new Image();
                newImage.crossOrigin = 'Anonymous';
                newImage.src = image;
                newImage.onload = () => {
                    canvas.width = newImage.width;
                    canvas.height = newImage.height;
                    context.drawImage(newImage, 0, 0, canvas.width, canvas.height);
                    const img = context.getImageData(0, 0, canvas.width, canvas.height);
                    if (options !== undefined) {
                        // using square brackets to avoid TS error - type 'never'
                        if (options.height !== undefined && options.height !== canvas.height) {
                            throw new Error('Image input config height doesn\'t match ImageBitmap height');
                        }
                        else {
                            tensorConfig.height = canvas.height;
                        }
                        // using square brackets to avoid TS error - type 'never'
                        if (options.width !== undefined && options.width !== canvas.width) {
                            throw new Error('Image input config width doesn\'t match ImageBitmap width');
                        }
                        else {
                            tensorConfig.width = canvas.width;
                        }
                    }
                    else {
                        tensorConfig.height = canvas.height;
                        tensorConfig.width = canvas.width;
                    }
                    resolve(Tensor.bufferToTensor(img.data, tensorConfig));
                };
            });
        }
        else {
            throw new Error('Input data provided is not supported - aborted tensor creation');
        }
        if (data !== undefined) {
            return Tensor.bufferToTensor(data, tensorConfig);
        }
        else {
            throw new Error('Input data provided is not supported - aborted tensor creation');
        }
    }
    toImageData(options) {
        var _a, _b;
        const pixels2DContext = document.createElement('canvas').getContext('2d');
        let image;
        if (pixels2DContext != null) {
            // Default values for height and width & format
            const width = this.dims[3];
            const height = this.dims[2];
            const channels = this.dims[1];
            const inputformat = options !== undefined ? (options.format !== undefined ? options.format : 'RGB') : 'RGB';
            const normMean = options !== undefined ? (((_a = options.norm) === null || _a === void 0 ? void 0 : _a.mean) !== undefined ? options.norm.mean : 255) : 255;
            const normBias = options !== undefined ? (((_b = options.norm) === null || _b === void 0 ? void 0 : _b.bias) !== undefined ? options.norm.bias : 0) : 0;
            const offset = height * width;
            if (options !== undefined) {
                if (options.height !== undefined && options.height !== height) {
                    throw new Error('Image output config height doesn\'t match tensor height');
                }
                if (options.width !== undefined && options.width !== width) {
                    throw new Error('Image output config width doesn\'t match tensor width');
                }
                if (options.format !== undefined && (channels === 4 && options.format !== 'RGBA') ||
                    (channels === 3 && (options.format !== 'RGB' && options.format !== 'BGR'))) {
                    throw new Error('Tensor format doesn\'t match input tensor dims');
                }
            }
            // Default pointer assignments
            const step = 4;
            let rImagePointer = 0, gImagePointer = 1, bImagePointer = 2, aImagePointer = 3;
            let rTensorPointer = 0, gTensorPointer = offset, bTensorPointer = offset * 2, aTensorPointer = -1;
            // Updating the pointer assignments based on the input image format
            if (inputformat === 'RGBA') {
                rTensorPointer = 0;
                gTensorPointer = offset;
                bTensorPointer = offset * 2;
                aTensorPointer = offset * 3;
            }
            else if (inputformat === 'RGB') {
                rTensorPointer = 0;
                gTensorPointer = offset;
                bTensorPointer = offset * 2;
            }
            else if (inputformat === 'RBG') {
                rTensorPointer = 0;
                bTensorPointer = offset;
                gTensorPointer = offset * 2;
            }
            image = pixels2DContext.createImageData(width, height);
            for (let i = 0; i < height * width; rImagePointer += step, gImagePointer += step, bImagePointer += step, aImagePointer += step, i++) {
                image.data[rImagePointer] = (this.data[rTensorPointer++] - normBias) * normMean; // R value
                image.data[gImagePointer] = (this.data[gTensorPointer++] - normBias) * normMean; // G value
                image.data[bImagePointer] = (this.data[bTensorPointer++] - normBias) * normMean; // B value
                image.data[aImagePointer] =
                    aTensorPointer === -1 ? 255 : (this.data[aTensorPointer++] - normBias) * normMean; // A value
            }
        }
        else {
            throw new Error('Can not access image data');
        }
        return image;
    }
    // #endregion
    // #region tensor utilities
    reshape(dims) {
        return new Tensor(this.type, this.data, dims);
    }
}
//# sourceMappingURL=tensor-impl.js.map
;// CONCATENATED MODULE: ./node_modules/onnxruntime-common/dist/lib/tensor.js
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// eslint-disable-next-line @typescript-eslint/naming-convention
const tensor_Tensor = Tensor;
//# sourceMappingURL=tensor.js.map
;// CONCATENATED MODULE: ./node_modules/onnxruntime-common/dist/lib/inference-session-impl.js
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.


class InferenceSession {
    constructor(handler) {
        this.handler = handler;
    }
    async run(feeds, arg1, arg2) {
        const fetches = {};
        let options = {};
        // check inputs
        if (typeof feeds !== 'object' || feeds === null || feeds instanceof tensor_Tensor || Array.isArray(feeds)) {
            throw new TypeError('\'feeds\' must be an object that use input names as keys and OnnxValue as corresponding values.');
        }
        let isFetchesEmpty = true;
        // determine which override is being used
        if (typeof arg1 === 'object') {
            if (arg1 === null) {
                throw new TypeError('Unexpected argument[1]: cannot be null.');
            }
            if (arg1 instanceof tensor_Tensor) {
                throw new TypeError('\'fetches\' cannot be a Tensor');
            }
            if (Array.isArray(arg1)) {
                if (arg1.length === 0) {
                    throw new TypeError('\'fetches\' cannot be an empty array.');
                }
                isFetchesEmpty = false;
                // output names
                for (const name of arg1) {
                    if (typeof name !== 'string') {
                        throw new TypeError('\'fetches\' must be a string array or an object.');
                    }
                    if (this.outputNames.indexOf(name) === -1) {
                        throw new RangeError(`'fetches' contains invalid output name: ${name}.`);
                    }
                    fetches[name] = null;
                }
                if (typeof arg2 === 'object' && arg2 !== null) {
                    options = arg2;
                }
                else if (typeof arg2 !== 'undefined') {
                    throw new TypeError('\'options\' must be an object.');
                }
            }
            else {
                // decide whether arg1 is fetches or options
                // if any output name is present and its value is valid OnnxValue, we consider it fetches
                let isFetches = false;
                const arg1Keys = Object.getOwnPropertyNames(arg1);
                for (const name of this.outputNames) {
                    if (arg1Keys.indexOf(name) !== -1) {
                        const v = arg1[name];
                        if (v === null || v instanceof tensor_Tensor) {
                            isFetches = true;
                            isFetchesEmpty = false;
                            fetches[name] = v;
                        }
                    }
                }
                if (isFetches) {
                    if (typeof arg2 === 'object' && arg2 !== null) {
                        options = arg2;
                    }
                    else if (typeof arg2 !== 'undefined') {
                        throw new TypeError('\'options\' must be an object.');
                    }
                }
                else {
                    options = arg1;
                }
            }
        }
        else if (typeof arg1 !== 'undefined') {
            throw new TypeError('Unexpected argument[1]: must be \'fetches\' or \'options\'.');
        }
        // check if all inputs are in feed
        for (const name of this.inputNames) {
            if (typeof feeds[name] === 'undefined') {
                throw new Error(`input '${name}' is missing in 'feeds'.`);
            }
        }
        // if no fetches is specified, we use the full output names list
        if (isFetchesEmpty) {
            for (const name of this.outputNames) {
                fetches[name] = null;
            }
        }
        // feeds, fetches and options are prepared
        const results = await this.handler.run(feeds, fetches, options);
        const returnValue = {};
        for (const key in results) {
            if (Object.hasOwnProperty.call(results, key)) {
                returnValue[key] = new tensor_Tensor(results[key].type, results[key].data, results[key].dims);
            }
        }
        return returnValue;
    }
    static async create(arg0, arg1, arg2, arg3) {
        // either load from a file or buffer
        let filePathOrUint8Array;
        let options = {};
        if (typeof arg0 === 'string') {
            filePathOrUint8Array = arg0;
            if (typeof arg1 === 'object' && arg1 !== null) {
                options = arg1;
            }
            else if (typeof arg1 !== 'undefined') {
                throw new TypeError('\'options\' must be an object.');
            }
        }
        else if (arg0 instanceof Uint8Array) {
            filePathOrUint8Array = arg0;
            if (typeof arg1 === 'object' && arg1 !== null) {
                options = arg1;
            }
            else if (typeof arg1 !== 'undefined') {
                throw new TypeError('\'options\' must be an object.');
            }
        }
        else if (arg0 instanceof ArrayBuffer ||
            (typeof SharedArrayBuffer !== 'undefined' && arg0 instanceof SharedArrayBuffer)) {
            const buffer = arg0;
            let byteOffset = 0;
            let byteLength = arg0.byteLength;
            if (typeof arg1 === 'object' && arg1 !== null) {
                options = arg1;
            }
            else if (typeof arg1 === 'number') {
                byteOffset = arg1;
                if (!Number.isSafeInteger(byteOffset)) {
                    throw new RangeError('\'byteOffset\' must be an integer.');
                }
                if (byteOffset < 0 || byteOffset >= buffer.byteLength) {
                    throw new RangeError(`'byteOffset' is out of range [0, ${buffer.byteLength}).`);
                }
                byteLength = arg0.byteLength - byteOffset;
                if (typeof arg2 === 'number') {
                    byteLength = arg2;
                    if (!Number.isSafeInteger(byteLength)) {
                        throw new RangeError('\'byteLength\' must be an integer.');
                    }
                    if (byteLength <= 0 || byteOffset + byteLength > buffer.byteLength) {
                        throw new RangeError(`'byteLength' is out of range (0, ${buffer.byteLength - byteOffset}].`);
                    }
                    if (typeof arg3 === 'object' && arg3 !== null) {
                        options = arg3;
                    }
                    else if (typeof arg3 !== 'undefined') {
                        throw new TypeError('\'options\' must be an object.');
                    }
                }
                else if (typeof arg2 !== 'undefined') {
                    throw new TypeError('\'byteLength\' must be a number.');
                }
            }
            else if (typeof arg1 !== 'undefined') {
                throw new TypeError('\'options\' must be an object.');
            }
            filePathOrUint8Array = new Uint8Array(buffer, byteOffset, byteLength);
        }
        else {
            throw new TypeError('Unexpected argument[0]: must be \'path\' or \'buffer\'.');
        }
        // get backend hints
        const eps = options.executionProviders || [];
        const backendHints = eps.map(i => typeof i === 'string' ? i : i.name);
        const backend = await resolveBackend(backendHints);
        const handler = await backend.createSessionHandler(filePathOrUint8Array, options);
        return new InferenceSession(handler);
    }
    startProfiling() {
        this.handler.startProfiling();
    }
    endProfiling() {
        this.handler.endProfiling();
    }
    get inputNames() {
        return this.handler.inputNames;
    }
    get outputNames() {
        return this.handler.outputNames;
    }
}
//# sourceMappingURL=inference-session-impl.js.map
;// CONCATENATED MODULE: ./node_modules/onnxruntime-common/dist/lib/inference-session.js
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// eslint-disable-next-line @typescript-eslint/naming-convention
const inference_session_InferenceSession = InferenceSession;
//# sourceMappingURL=inference-session.js.map
;// CONCATENATED MODULE: ./node_modules/onnxruntime-common/dist/lib/index.js
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
/**
 * # ONNX Runtime JavaScript API
 *
 * ONNX Runtime JavaScript API is a unified API for all JavaScript usages, including the following NPM packages:
 *
 * - [onnxruntime-node](https://www.npmjs.com/package/onnxruntime-node)
 * - [onnxruntime-web](https://www.npmjs.com/package/onnxruntime-web)
 * - [onnxruntime-react-native](https://www.npmjs.com/package/onnxruntime-react-native)
 *
 * See also:
 * - [Get Started](https://onnxruntime.ai/docs/get-started/with-javascript.html)
 * - [Inference examples](https://github.com/microsoft/onnxruntime-inference-examples/tree/main/js)
 *
 * @packageDocumentation
 */





//# sourceMappingURL=index.js.map

/***/ }),

/***/ 552:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  OBj: function() { return /* reexport */ env; },
  qCb: function() { return /* reexport */ medianFilter; },
  EUT: function() { return /* reexport */ pipeline; }
});

// UNUSED EXPORTS: AlbertForMaskedLM, AlbertForQuestionAnswering, AlbertForSequenceClassification, AlbertModel, AlbertPreTrainedModel, AlbertTokenizer, AudioClassificationPipeline, AutoConfig, AutoModel, AutoModelForAudioClassification, AutoModelForCTC, AutoModelForCausalLM, AutoModelForImageClassification, AutoModelForImageSegmentation, AutoModelForMaskGeneration, AutoModelForMaskedLM, AutoModelForObjectDetection, AutoModelForQuestionAnswering, AutoModelForSeq2SeqLM, AutoModelForSequenceClassification, AutoModelForTokenClassification, AutoModelForVision2Seq, AutoProcessor, AutoTokenizer, AutomaticSpeechRecognitionPipeline, BartForConditionalGeneration, BartForSequenceClassification, BartModel, BartPretrainedModel, BartTokenizer, BaseModelOutput, BeitFeatureExtractor, BeitForImageClassification, BeitModel, BeitPreTrainedModel, BertForMaskedLM, BertForQuestionAnswering, BertForSequenceClassification, BertForTokenClassification, BertModel, BertPreTrainedModel, BertTokenizer, BloomForCausalLM, BloomModel, BloomPreTrainedModel, BloomTokenizer, CLIPModel, CLIPPreTrainedModel, CLIPTextModelWithProjection, CLIPTokenizer, CLIPVisionModelWithProjection, CamembertForMaskedLM, CamembertForQuestionAnswering, CamembertForSequenceClassification, CamembertForTokenClassification, CamembertModel, CamembertPreTrainedModel, CamembertTokenizer, CausalLMOutput, CausalLMOutputWithPast, CodeGenForCausalLM, CodeGenModel, CodeGenPreTrainedModel, CodeGenTokenizer, CodeLlamaTokenizer, ConvNextFeatureExtractor, DebertaForMaskedLM, DebertaForQuestionAnswering, DebertaForSequenceClassification, DebertaForTokenClassification, DebertaModel, DebertaPreTrainedModel, DebertaTokenizer, DebertaV2ForMaskedLM, DebertaV2ForQuestionAnswering, DebertaV2ForSequenceClassification, DebertaV2ForTokenClassification, DebertaV2Model, DebertaV2PreTrainedModel, DebertaV2Tokenizer, DeiTFeatureExtractor, DeiTForImageClassification, DeiTModel, DeiTPreTrainedModel, DetrFeatureExtractor, DetrForObjectDetection, DetrForSegmentation, DetrModel, DetrObjectDetectionOutput, DetrPreTrainedModel, DetrSegmentationOutput, DistilBertForMaskedLM, DistilBertForQuestionAnswering, DistilBertForSequenceClassification, DistilBertForTokenClassification, DistilBertModel, DistilBertPreTrainedModel, DistilBertTokenizer, FFT, FalconTokenizer, FeatureExtractionPipeline, FeatureExtractor, FillMaskPipeline, GPT2LMHeadModel, GPT2Model, GPT2PreTrainedModel, GPT2Tokenizer, GPTBigCodeForCausalLM, GPTBigCodeModel, GPTBigCodePreTrainedModel, GPTJForCausalLM, GPTJModel, GPTJPreTrainedModel, GPTNeoForCausalLM, GPTNeoModel, GPTNeoPreTrainedModel, GPTNeoXForCausalLM, GPTNeoXModel, GPTNeoXPreTrainedModel, GPTNeoXTokenizer, HerbertTokenizer, ImageClassificationPipeline, ImageFeatureExtractor, ImageSegmentationPipeline, ImageToTextPipeline, LlamaForCausalLM, LlamaModel, LlamaPreTrainedModel, LlamaTokenizer, M2M100ForConditionalGeneration, M2M100Model, M2M100PreTrainedModel, M2M100Tokenizer, MBart50Tokenizer, MBartForConditionalGeneration, MBartForSequenceClassification, MBartModel, MBartPreTrainedModel, MBartTokenizer, MPNetForMaskedLM, MPNetForQuestionAnswering, MPNetForSequenceClassification, MPNetForTokenClassification, MPNetModel, MPNetPreTrainedModel, MPNetTokenizer, MT5ForConditionalGeneration, MT5Model, MT5PreTrainedModel, MarianMTModel, MarianModel, MarianPreTrainedModel, MarianTokenizer, MaskedLMOutput, MobileBertForMaskedLM, MobileBertForQuestionAnswering, MobileBertForSequenceClassification, MobileBertModel, MobileBertPreTrainedModel, MobileBertTokenizer, MobileViTFeatureExtractor, MobileViTForImageClassification, MobileViTModel, MobileViTPreTrainedModel, ModelOutput, MptForCausalLM, MptModel, MptPreTrainedModel, NllbTokenizer, OPTForCausalLM, OPTModel, OPTPreTrainedModel, ObjectDetectionPipeline, Pipeline, PreTrainedModel, PreTrainedTokenizer, PretrainedConfig, PretrainedMixin, Processor, QuestionAnsweringModelOutput, QuestionAnsweringPipeline, RawImage, ResNetForImageClassification, ResNetModel, ResNetPreTrainedModel, RobertaForMaskedLM, RobertaForQuestionAnswering, RobertaForSequenceClassification, RobertaForTokenClassification, RobertaModel, RobertaPreTrainedModel, RobertaTokenizer, SamImageProcessor, SamImageSegmentationOutput, SamModel, SamPreTrainedModel, SamProcessor, Seq2SeqLMOutput, SequenceClassifierOutput, SqueezeBertForMaskedLM, SqueezeBertForQuestionAnswering, SqueezeBertForSequenceClassification, SqueezeBertModel, SqueezeBertPreTrainedModel, SqueezeBertTokenizer, SummarizationPipeline, SwinForImageClassification, SwinModel, SwinPreTrainedModel, T5ForConditionalGeneration, T5Model, T5PreTrainedModel, T5Tokenizer, Tensor, Text2TextGenerationPipeline, TextClassificationPipeline, TextGenerationPipeline, TokenClassificationPipeline, TokenClassifierOutput, TokenizerModel, TranslationPipeline, ViTFeatureExtractor, ViTForImageClassification, ViTModel, ViTPreTrainedModel, VisionEncoderDecoderModel, Wav2Vec2CTCTokenizer, Wav2Vec2FeatureExtractor, Wav2Vec2ForCTC, Wav2Vec2ForSequenceClassification, Wav2Vec2Model, Wav2Vec2PreTrainedModel, Wav2Vec2ProcessorWithLM, WavLMForCTC, WavLMForSequenceClassification, WavLMModel, WavLMPreTrainedModel, WhisperFeatureExtractor, WhisperForConditionalGeneration, WhisperModel, WhisperPreTrainedModel, WhisperProcessor, WhisperTokenizer, XLMForQuestionAnswering, XLMForSequenceClassification, XLMForTokenClassification, XLMModel, XLMPreTrainedModel, XLMRobertaForMaskedLM, XLMRobertaForQuestionAnswering, XLMRobertaForSequenceClassification, XLMRobertaForTokenClassification, XLMRobertaModel, XLMRobertaPreTrainedModel, XLMRobertaTokenizer, XLMTokenizer, XLMWithLMHeadModel, YolosFeatureExtractor, YolosForObjectDetection, YolosModel, YolosObjectDetectionOutput, YolosPreTrainedModel, ZeroShotClassificationPipeline, ZeroShotImageClassificationPipeline, cat, cos_sim, dot, dynamicTimeWarping, getMelFilters, getTopItems, interpolate, interpolate_data, log_softmax, magnitude, max, mean, mean_pooling, min, read_audio, rfftfreq, round, softmax, stack, std_mean, transpose, transpose_data

;// CONCATENATED MODULE: ./node_modules/@xenova/transformers/src/utils/core.js

/**
 * @file Core utility functions/classes for Transformers.js.
 * 
 * These are only used internally, meaning an end-user shouldn't
 * need to access anything here.
 * 
 * @module utils/core
 */

/**
 * Helper function to dispatch progress callbacks.
 *
 * @param {function} progress_callback The progress callback function to dispatch.
 * @param {any} data The data to pass to the progress callback function.
 * @returns {void}
 * @private
 */
function dispatchCallback(progress_callback, data) {
    if (progress_callback !== null) progress_callback(data);
}

/**
 * Reverses the keys and values of an object.
 *
 * @param {Object} data The object to reverse.
 * @returns {Object} The reversed object.
 * @see https://ultimatecourses.com/blog/reverse-object-keys-and-values-in-javascript
 */
function reverseDictionary(data) {
    // https://ultimatecourses.com/blog/reverse-object-keys-and-values-in-javascript
    return Object.fromEntries(Object.entries(data).map(([key, value]) => [value, key]));
}

/**
 * Escapes regular expression special characters from a string by replacing them with their escaped counterparts.
 *
 * @param {string} string The string to escape.
 * @returns {string} The escaped string.
 */
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

/**
 * A base class for creating callable objects.
 * 
 * @type {new () => {(...args: any[]): any, _call(...args: any[]): any}}
 */
const Callable = /** @type {any} */ (class {
    /**
    * Creates a new instance of the Callable class.
    */
    constructor() {
        /**
         * Creates a closure that delegates to a private method '_call' with the given arguments.
         * @type {any}
         * @param {...any} args Zero or more arguments to pass to the '_call' method.
         * @returns {*} The result of calling the '_call' method.
         */
        let closure = function (...args) {
            return closure._call(...args)
        }
        return Object.setPrototypeOf(closure, new.target.prototype)
    }

    /**
     * This method should be implemented in subclasses to provide the
     * functionality of the callable object.
     *
     * @param {any[]} args
     * @throws {Error} If the subclass does not implement the `_call` method.
     */
    _call(...args) {
        throw Error('Must implement _call method in subclass')
    }
});


/**
 * Check if a value is a string.
 * @param {*} text The value to check.
 * @returns {boolean} True if the value is a string, false otherwise.
 */
function isString(text) {
    return typeof text === 'string' || text instanceof String
}


/**
 * Check if a value is a typed array.
 * @param {*} val The value to check.
 * @returns {boolean} True if the value is a `TypedArray`, false otherwise.
 * 
 * Adapted from https://stackoverflow.com/a/71091338/13989043
 */
function isTypedArray(val) {
    return val?.prototype?.__proto__?.constructor?.name === 'TypedArray';
}


/**
 * Check if a value is an integer.
 * @param {*} x The value to check.
 * @returns {boolean} True if the value is a string, false otherwise.
 */
function isIntegralNumber(x) {
    return Number.isInteger(x) || typeof x === 'bigint'
}

/**
 * Check if a value is exists.
 * @param {*} x The value to check.
 * @returns {boolean} True if the value exists, false otherwise.
 */
function exists(x) {
    return x !== undefined && x !== null;
}

/**
 * Calculates the dimensions of a nested array.
 *
 * @param {Array} arr The nested array to calculate dimensions for.
 * @returns {Array} An array containing the dimensions of the input array.
 */
function calculateDimensions(arr) {
    const dimensions = [];
    let current = arr;
    while (Array.isArray(current)) {
        dimensions.push(current.length);
        current = current[0];
    }
    return dimensions;
}

/**
 * Replicate python's .pop() method for objects.
 * @param {Object} obj The object to pop from.
 * @param {string} key The key to pop.
 * @param {*} defaultValue The default value to return if the key does not exist.
 * @returns {*} The value of the popped key.
 * @throws {Error} If the key does not exist and no default value is provided.
 */
function pop(obj, key, defaultValue = undefined) {
    const value = obj[key];
    if (value !== undefined) {
        delete obj[key];
        return value;
    }
    if (defaultValue === undefined) {
        throw Error(`Key ${key} does not exist in object.`)
    }
    return defaultValue;
}

/**
 * Efficiently merge arrays, creating a new copy.
 * Adapted from https://stackoverflow.com/a/6768642/13989043
 * @param  {Array[]} arrs Arrays to merge.
 * @returns {Array} The merged array.
 */
function mergeArrays(...arrs) {
    return Array.prototype.concat.apply([], arrs);
}

/**
 * Compute the Cartesian product of given arrays
 * @param {...Array} a Arrays to compute the product
 * @returns {Array} Returns the computed Cartesian product as an array
 * @private
 */
function product(...a) {
    // Cartesian product of items
    // Adapted from https://stackoverflow.com/a/43053803
    return a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e])));
}

// EXTERNAL MODULE: fs (ignored)
var fs_ignored_ = __webpack_require__(7147);
// EXTERNAL MODULE: path (ignored)
var path_ignored_ = __webpack_require__(1418);
// EXTERNAL MODULE: stream/web (ignored)
var web_ignored_ = __webpack_require__(319);
// EXTERNAL MODULE: fs (ignored)
var fs_ignored_0 = __webpack_require__(8386);
// EXTERNAL MODULE: path (ignored)
var path_ignored_0 = __webpack_require__(3342);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/native-url/index.js
var native_url = __webpack_require__(692);
// EXTERNAL MODULE: onnxruntime-node (ignored)
var onnxruntime_node_ignored_ = __webpack_require__(495);
var onnxruntime_node_ignored_namespaceObject = /*#__PURE__*/__webpack_require__.t(onnxruntime_node_ignored_, 2);
// EXTERNAL MODULE: ./node_modules/onnxruntime-web/dist/ort-web.min.js
var ort_web_min = __webpack_require__(2018);
var ort_web_min_namespaceObject = /*#__PURE__*/__webpack_require__.t(ort_web_min, 2);
;// CONCATENATED MODULE: ./node_modules/@xenova/transformers/src/backends/onnx.js
/* provided dependency */ var process = __webpack_require__(2601);
/**
 * @file Handler file for choosing the correct version of ONNX Runtime, based on the environment.
 * Ideally, we could import the `onnxruntime-web` and `onnxruntime-node` packages only when needed,
 * but dynamic imports don't seem to work with the current webpack version and/or configuration.
 * This is possibly due to the experimental nature of top-level await statements.
 * So, we just import both packages, and use the appropriate one based on the environment:
 *   - When running in node, we use `onnxruntime-node`.
 *   - When running in the browser, we use `onnxruntime-web` (`onnxruntime-node` is not bundled).
 * 
 * This module is not directly exported, but can be accessed through the environment variables:
 * ```javascript
 * import { env } from '@xenova/transformers';
 * console.log(env.backends.onnx);
 * ```
 * 
 * @module backends/onnx
 */

// NOTE: Import order matters here. We need to import `onnxruntime-node` before `onnxruntime-web`.
// In either case, we select the default export if it exists, otherwise we use the named export.



/** @type {module} The ONNX runtime module. */
let ONNX;

const executionProviders = [
    // 'webgpu',
    'wasm'
];

if (typeof process !== 'undefined' && process?.release?.name === 'node') {
    // Running in a node-like environment.
    ONNX = onnxruntime_node_ignored_ ?? onnxruntime_node_ignored_namespaceObject;

    // Add `cpu` execution provider, with higher precedence that `wasm`.
    executionProviders.unshift('cpu');

} else {
    // Running in a browser-environment
    ONNX = ort_web_min ?? ort_web_min_namespaceObject;

    // SIMD for WebAssembly does not operate correctly in some recent versions of iOS (16.4.x).
    // As a temporary fix, we disable it for now.
    // For more information, see: https://github.com/microsoft/onnxruntime/issues/15644
    const isIOS = typeof navigator !== 'undefined' && /iP(hone|od|ad).+16_4.+AppleWebKit/.test(navigator.userAgent);
    if (isIOS) {
        ONNX.env.wasm.simd = false;
    }
}

;// CONCATENATED MODULE: ./node_modules/@xenova/transformers/src/env.js
/**
 * @file Module used to configure Transformers.js.
 * 
 * **Example:** Disable remote models.
 * ```javascript
 * import { env } from '@xenova/transformers';
 * env.allowRemoteModels = false;
 * ```
 * 
 * **Example:** Set local model path.
 * ```javascript
 * import { env } from '@xenova/transformers';
 * env.localModelPath = '/path/to/local/models/';
 * ```
 * 
 * **Example:** Set cache directory.
 * ```javascript
 * import { env } from '@xenova/transformers';
 * env.cacheDir = '/path/to/cache/directory/';
 * ```
 * 
 * @module env
 */






const { env: onnx_env } = ONNX;

const VERSION = '2.6.0';

// Check if various APIs are available (depends on environment)
const WEB_CACHE_AVAILABLE = typeof self !== 'undefined' && 'caches' in self;
const FS_AVAILABLE = !isEmpty(fs_ignored_0); // check if file system is available
const PATH_AVAILABLE = !isEmpty(path_ignored_0); // check if path is available

const RUNNING_LOCALLY = FS_AVAILABLE && PATH_AVAILABLE;

const env_dirname = RUNNING_LOCALLY
    ? path_ignored_0.dirname(path_ignored_0.dirname(native_url.fileURLToPath("file:///home/runner/work/kakkoapp/kakkoapp/node_modules/@xenova/transformers/src/env.js")))
    : './';

// Only used for environments with access to file system
const DEFAULT_CACHE_DIR = RUNNING_LOCALLY
    ? path_ignored_0.join(env_dirname, '/.cache/')
    : null;

// Set local model path, based on available APIs
const DEFAULT_LOCAL_MODEL_PATH = '/models/';
const localModelPath = RUNNING_LOCALLY
    ? path_ignored_0.join(env_dirname, DEFAULT_LOCAL_MODEL_PATH)
    : DEFAULT_LOCAL_MODEL_PATH;

// Set path to wasm files. This is needed when running in a web worker.
// https://onnxruntime.ai/docs/api/js/interfaces/Env.WebAssemblyFlags.html#wasmPaths
// We use remote wasm files by default to make it easier for newer users.
// In practice, users should probably self-host the necessary .wasm files.
onnx_env.wasm.wasmPaths = RUNNING_LOCALLY
    ? path_ignored_0.join(env_dirname, '/dist/')
    : `https://cdn.jsdelivr.net/npm/@xenova/transformers@${VERSION}/dist/`;


/**
 * Global variable used to control execution. This provides users a simple way to configure Transformers.js.
 * @property {Object} backends Expose environment variables of different backends,
 * allowing users to set these variables if they want to.
 * @property {string} __dirname Directory name of module. Useful for resolving local paths.
 * @property {string} version This version of Transformers.js.
 * @property {boolean} allowRemoteModels Whether to allow loading of remote files, defaults to `true`.
 * If set to `false`, it will have the same effect as setting `local_files_only=true` when loading pipelines, models, tokenizers, processors, etc.
 * @property {string} remoteHost Host URL to load models from. Defaults to the Hugging Face Hub.
 * @property {string} remotePathTemplate Path template to fill in and append to `remoteHost` when loading models.
 * @property {boolean} allowLocalModels Whether to allow loading of local files, defaults to `true`.
 * If set to `false`, it will skip the local file check and try to load the model from the remote host.
 * @property {string} localModelPath Path to load local models from. Defaults to `/models/`.
 * @property {boolean} useFS Whether to use the file system to load files. By default, it is `true` if available.
 * @property {boolean} useBrowserCache Whether to use Cache API to cache models. By default, it is `true` if available.
 * @property {boolean} useFSCache Whether to use the file system to cache files. By default, it is `true` if available.
 * @property {string} cacheDir The directory to use for caching files with the file system. By default, it is `./.cache`.
 * @property {boolean} useCustomCache Whether to use a custom cache system (defined by `customCache`), defaults to `false`.
 * @property {Object} customCache The custom cache to use. Defaults to `null`. Note: this must be an object which
 * implements the `match` and `put` functions of the Web Cache API. For more information, see https://developer.mozilla.org/en-US/docs/Web/API/Cache
 */
const env = {
    /////////////////// Backends settings ///////////////////
    backends: {
        // onnxruntime-web/onnxruntime-node
        onnx: onnx_env,

        // TensorFlow.js
        tfjs: {},
    },

    __dirname: env_dirname,
    version: VERSION,

    /////////////////// Model settings ///////////////////
    allowRemoteModels: true,
    remoteHost: 'https://huggingface.co/',
    remotePathTemplate: '{model}/resolve/{revision}/',

    allowLocalModels: true,
    localModelPath: localModelPath,
    useFS: FS_AVAILABLE,

    /////////////////// Cache settings ///////////////////
    useBrowserCache: WEB_CACHE_AVAILABLE,

    useFSCache: FS_AVAILABLE,
    cacheDir: DEFAULT_CACHE_DIR,

    useCustomCache: false,
    customCache: null,
    //////////////////////////////////////////////////////
}


/**
 * @param {Object} obj
 * @private
 */
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}


;// CONCATENATED MODULE: ./node_modules/@xenova/transformers/src/utils/hub.js
/* provided dependency */ var hub_process = __webpack_require__(2601);
/* provided dependency */ var Buffer = __webpack_require__(7133)["lW"];

/**
 * @file Utility functions to interact with the Hugging Face Hub (https://huggingface.co/models)
 * 
 * @module utils/hub
 */








if (!globalThis.ReadableStream) {
    // @ts-ignore
    globalThis.ReadableStream = web_ignored_.ReadableStream; // ReadableStream is not a global with Node 16
}

/**
 * @typedef {Object} PretrainedOptions Options for loading a pretrained model.     
 * @property {boolean?} [options.quantized=true] Whether to load the 8-bit quantized version of the model (only applicable when loading model files).
 * @property {function} [options.progress_callback=null] If specified, this function will be called during model construction, to provide the user with progress updates.
 * @property {Object} [options.config=null] Configuration for the model to use instead of an automatically loaded configuration. Configuration can be automatically loaded when:
 * - The model is a model provided by the library (loaded with the *model id* string of a pretrained model).
 * - The model is loaded by supplying a local directory as `pretrained_model_name_or_path` and a configuration JSON file named *config.json* is found in the directory.
 * @property {string} [options.cache_dir=null] Path to a directory in which a downloaded pretrained model configuration should be cached if the standard cache should not be used.
 * @property {boolean} [options.local_files_only=false] Whether or not to only look at local files (e.g., not try downloading the model).
 * @property {string} [options.revision='main'] The specific model version to use. It can be a branch name, a tag name, or a commit id,
 * since we use a git-based system for storing models and other artifacts on huggingface.co, so `revision` can be any identifier allowed by git.
 * NOTE: This setting is ignored for local requests.
 * @property {string} [options.model_file_name=null] If specified, load the model with this name (excluding the .onnx suffix). Currently only valid for encoder- or decoder-only models.
 */

class FileResponse {
    /**
     * Mapping from file extensions to MIME types.
     */
    _CONTENT_TYPE_MAP = {
        'txt': 'text/plain',
        'html': 'text/html',
        'css': 'text/css',
        'js': 'text/javascript',
        'json': 'application/json',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
    }
    /**
     * Creates a new `FileResponse` object.
     * @param {string|URL} filePath
     */
    constructor(filePath) {
        this.filePath = filePath;
        this.headers = new Headers();

        this.exists = fs_ignored_.existsSync(filePath);
        if (this.exists) {
            this.status = 200;
            this.statusText = 'OK';

            let stats = fs_ignored_.statSync(filePath);
            this.headers.set('content-length', stats.size.toString());

            this.updateContentType();

            let self = this;
            this.body = new ReadableStream({
                start(controller) {
                    self.arrayBuffer().then(buffer => {
                        controller.enqueue(new Uint8Array(buffer));
                        controller.close();
                    })
                }
            });
        } else {
            this.status = 404;
            this.statusText = 'Not Found';
            this.body = null;
        }
    }

    /**
     * Updates the 'content-type' header property of the response based on the extension of
     * the file specified by the filePath property of the current object.
     * @returns {void}
     */
    updateContentType() {
        // Set content-type header based on file extension
        const extension = this.filePath.toString().split('.').pop().toLowerCase();
        this.headers.set('content-type', this._CONTENT_TYPE_MAP[extension] ?? 'application/octet-stream');
    }

    /**
     * Clone the current FileResponse object.
     * @returns {FileResponse} A new FileResponse object with the same properties as the current object.
     */
    clone() {
        let response = new FileResponse(this.filePath);
        response.exists = this.exists;
        response.status = this.status;
        response.statusText = this.statusText;
        response.headers = new Headers(this.headers);
        return response;
    }

    /**
     * Reads the contents of the file specified by the filePath property and returns a Promise that
     * resolves with an ArrayBuffer containing the file's contents.
     * @returns {Promise<ArrayBuffer>} A Promise that resolves with an ArrayBuffer containing the file's contents.
     * @throws {Error} If the file cannot be read.
     */
    async arrayBuffer() {
        const data = await fs_ignored_.promises.readFile(this.filePath);
        return data.buffer;
    }

    /**
     * Reads the contents of the file specified by the filePath property and returns a Promise that
     * resolves with a Blob containing the file's contents.
     * @returns {Promise<Blob>} A Promise that resolves with a Blob containing the file's contents.
     * @throws {Error} If the file cannot be read.
     */
    async blob() {
        const data = await fs_ignored_.promises.readFile(this.filePath);
        return new Blob([data], { type: this.headers.get('content-type') });
    }

    /**
     * Reads the contents of the file specified by the filePath property and returns a Promise that
     * resolves with a string containing the file's contents.
     * @returns {Promise<string>} A Promise that resolves with a string containing the file's contents.
     * @throws {Error} If the file cannot be read.
     */
    async text() {
        const data = await fs_ignored_.promises.readFile(this.filePath, 'utf8');
        return data;
    }

    /**
     * Reads the contents of the file specified by the filePath property and returns a Promise that
     * resolves with a parsed JavaScript object containing the file's contents.
     * 
     * @returns {Promise<Object>} A Promise that resolves with a parsed JavaScript object containing the file's contents.
     * @throws {Error} If the file cannot be read.
     */
    async json() {
        return JSON.parse(await this.text());
    }
}

/**
 * Determines whether the given string is a valid HTTP or HTTPS URL.
 * @param {string|URL} string The string to test for validity as an HTTP or HTTPS URL.
 * @param {string[]} [validHosts=null] A list of valid hostnames. If specified, the URL's hostname must be in this list.
 * @returns {boolean} True if the string is a valid HTTP or HTTPS URL, false otherwise.
 */
function isValidHttpUrl(string, validHosts = null) {
    // https://stackoverflow.com/a/43467144
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }
    if (validHosts && !validHosts.includes(url.hostname)) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

/**
 * Helper function to get a file, using either the Fetch API or FileSystem API.
 *
 * @param {URL|string} urlOrPath The URL/path of the file to get.
 * @returns {Promise<FileResponse|Response>} A promise that resolves to a FileResponse object (if the file is retrieved using the FileSystem API), or a Response object (if the file is retrieved using the Fetch API).
 */
async function getFile(urlOrPath) {

    if (env.useFS && !isValidHttpUrl(urlOrPath)) {
        return new FileResponse(urlOrPath);

    } else if (typeof hub_process !== 'undefined' && hub_process?.release?.name === 'node') {
        const IS_CI = !!hub_process.env?.TESTING_REMOTELY;
        const version = env.version;

        const headers = new Headers();
        headers.set('User-Agent', `transformers.js/${version}; is_ci/${IS_CI};`);

        // Check whether we are making a request to the Hugging Face Hub.
        const isHFURL = isValidHttpUrl(urlOrPath, ['huggingface.co', 'hf.co']);
        if (isHFURL) {
            // If an access token is present in the environment variables,
            // we add it to the request headers.
            const token = hub_process.env?.HF_ACCESS_TOKEN;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
        }
        return fetch(urlOrPath, { headers });
    } else {
        // Running in a browser-environment, so we use default headers
        // NOTE: We do not allow passing authorization headers in the browser,
        // since this would require exposing the token to the client.
        return fetch(urlOrPath);
    }
}

const ERROR_MAPPING = {
    // 4xx errors (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses)
    400: 'Bad request error occurred while trying to load file',
    401: 'Unauthorized access to file',
    403: 'Forbidden access to file',
    404: 'Could not locate file',
    408: 'Request timeout error occurred while trying to load file',

    // 5xx errors (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses)
    500: 'Internal server error error occurred while trying to load file',
    502: 'Bad gateway error occurred while trying to load file',
    503: 'Service unavailable error occurred while trying to load file',
    504: 'Gateway timeout error occurred while trying to load file',
}
/**
 * Helper method to handle fatal errors that occur while trying to load a file from the Hugging Face Hub.
 * @param {number} status The HTTP status code of the error.
 * @param {string} remoteURL The URL of the file that could not be loaded.
 * @param {boolean} fatal Whether to raise an error if the file could not be loaded.
 * @returns {null} Returns `null` if `fatal = true`.
 * @throws {Error} If `fatal = false`.
 */
function handleError(status, remoteURL, fatal) {
    if (!fatal) {
        // File was not loaded correctly, but it is optional.
        // TODO in future, cache the response?
        return null;
    }

    const message = ERROR_MAPPING[status] ?? `Error (${status}) occurred while trying to load file`;
    throw Error(`${message}: "${remoteURL}".`);
}

class FileCache {
    /**
     * Instantiate a `FileCache` object.
     * @param {string} path 
     */
    constructor(path) {
        this.path = path;
    }

    /**
     * Checks whether the given request is in the cache.
     * @param {string} request 
     * @returns {Promise<FileResponse | undefined>}
     */
    async match(request) {

        let filePath = path_ignored_.join(this.path, request);
        let file = new FileResponse(filePath);

        if (file.exists) {
            return file;
        } else {
            return undefined;
        }
    }

    /**
     * Adds the given response to the cache.
     * @param {string} request 
     * @param {Response|FileResponse} response 
     * @returns {Promise<void>}
     */
    async put(request, response) {
        const buffer = Buffer.from(await response.arrayBuffer());

        let outputPath = path_ignored_.join(this.path, request);

        try {
            await fs_ignored_.promises.mkdir(path_ignored_.dirname(outputPath), { recursive: true });
            await fs_ignored_.promises.writeFile(outputPath, buffer);

        } catch (err) {
            console.warn('An error occurred while writing the file to cache:', err)
        }
    }

    // TODO add the rest?
    // addAll(requests: RequestInfo[]): Promise<void>;
    // delete(request: RequestInfo | URL, options?: CacheQueryOptions): Promise<boolean>;
    // keys(request?: RequestInfo | URL, options?: CacheQueryOptions): Promise<ReadonlyArray<Request>>;
    // match(request: RequestInfo | URL, options?: CacheQueryOptions): Promise<Response | undefined>;
    // matchAll(request?: RequestInfo | URL, options?: CacheQueryOptions): Promise<ReadonlyArray<Response>>;
}

/**
 * 
 * @param {FileCache|Cache} cache The cache to search
 * @param {string[]} names The names of the item to search for
 * @returns {Promise<FileResponse|Response|undefined>} The item from the cache, or undefined if not found.
 */
async function tryCache(cache, ...names) {
    for (let name of names) {
        try {
            let result = await cache.match(name);
            if (result) return result;
        } catch (e) {
            continue;
        }
    }
    return undefined;
}

/**
 * 
 * Retrieves a file from either a remote URL using the Fetch API or from the local file system using the FileSystem API.
 * If the filesystem is available and `env.useCache = true`, the file will be downloaded and cached.
 * 
 * @param {string} path_or_repo_id This can be either:
 * - a string, the *model id* of a model repo on huggingface.co.
 * - a path to a *directory* potentially containing the file.
 * @param {string} filename The name of the file to locate in `path_or_repo`.
 * @param {boolean} [fatal=true] Whether to throw an error if the file is not found.
 * @param {PretrainedOptions} [options] An object containing optional parameters.
 * 
 * @throws Will throw an error if the file is not found and `fatal` is true.
 * @returns {Promise} A Promise that resolves with the file content as a buffer.
 */
async function getModelFile(path_or_repo_id, filename, fatal = true, options = {}) {

    if (!env.allowLocalModels) {
        // User has disabled local models, so we just make sure other settings are correct.

        if (options.local_files_only) {
            throw Error("Invalid configuration detected: local models are disabled (`env.allowLocalModels=false`) but you have requested to only use local models (`local_files_only=true`).")
        } else if (!env.allowRemoteModels) {
            throw Error("Invalid configuration detected: both local and remote models are disabled. Fix by setting `env.allowLocalModels` or `env.allowRemoteModels` to `true`.")
        }
    }

    // Initiate file retrieval
    dispatchCallback(options.progress_callback, {
        status: 'initiate',
        name: path_or_repo_id,
        file: filename
    })

    // First, check if the a caching backend is available
    // If no caching mechanism available, will download the file every time
    let cache;
    if (!cache && env.useBrowserCache) {
        if (typeof caches === 'undefined') {
            throw Error('Browser cache is not available in this environment.')
        }
        try {
            // In some cases, the browser cache may be visible, but not accessible due to security restrictions.
            // For example, when running an application in an iframe, if a user attempts to load the page in
            // incognito mode, the following error is thrown: `DOMException: Failed to execute 'open' on 'CacheStorage':
            // An attempt was made to break through the security policy of the user agent.`
            // So, instead of crashing, we just ignore the error and continue without using the cache.
            cache = await caches.open('transformers-cache');
        } catch (e) {
            console.warn('An error occurred while opening the browser cache:', e);
        }
    }

    if (!cache && env.useFSCache) {
        // TODO throw error if not available

        // If `cache_dir` is not specified, use the default cache directory
        cache = new FileCache(options.cache_dir ?? env.cacheDir);
    }

    if (!cache && env.useCustomCache) {
        // Allow the user to specify a custom cache system.
        if (!env.customCache) {
            throw Error('`env.useCustomCache=true`, but `env.customCache` is not defined.')
        }

        // Check that the required methods are defined:
        if (!env.customCache.match || !env.customCache.put) {
            throw new Error(
                "`env.customCache` must be an object which implements the `match` and `put` functions of the Web Cache API. " +
                "For more information, see https://developer.mozilla.org/en-US/docs/Web/API/Cache"
            )
        }
        cache = env.customCache;
    }

    const revision = options.revision ?? 'main';

    let requestURL = pathJoin(path_or_repo_id, filename);
    let localPath = pathJoin(env.localModelPath, requestURL);

    let remoteURL = pathJoin(
        env.remoteHost,
        env.remotePathTemplate
            .replaceAll('{model}', path_or_repo_id)
            .replaceAll('{revision}', revision),
        filename
    );

    // Choose cache key for filesystem cache
    // When using the main revision (default), we use the request URL as the cache key.
    // If a specific revision is requested, we account for this in the cache key.
    let fsCacheKey = revision === 'main' ? requestURL : pathJoin(path_or_repo_id, revision, filename);

    /** @type {string} */
    let cacheKey;
    let proposedCacheKey = cache instanceof FileCache ? fsCacheKey : remoteURL;

    // Whether to cache the final response in the end.
    let toCacheResponse = false;

    /** @type {Response|FileResponse|undefined} */
    let response;

    if (cache) {
        // A caching system is available, so we try to get the file from it.
        //  1. We first try to get from cache using the local path. In some environments (like deno),
        //     non-URL cache keys are not allowed. In these cases, `response` will be undefined.
        //  2. If no response is found, we try to get from cache using the remote URL or file system cache.
        response = await tryCache(cache, localPath, proposedCacheKey);
    }

    if (response === undefined) {
        // Caching not available, or file is not cached, so we perform the request

        if (env.allowLocalModels) {
            // Accessing local models is enabled, so we try to get the file locally.
            // If request is a valid HTTP URL, we skip the local file check. Otherwise, we try to get the file locally.
            const isURL = isValidHttpUrl(requestURL);
            if (!isURL) {
                try {
                    response = await getFile(localPath);
                    cacheKey = localPath; // Update the cache key to be the local path
                } catch (e) {
                    // Something went wrong while trying to get the file locally.
                    // NOTE: error handling is done in the next step (since `response` will be undefined)
                    console.warn(`Unable to load from local path "${localPath}": "${e}"`);
                }
            } else if (options.local_files_only) {
                throw new Error(`\`local_files_only=true\`, but attempted to load a remote file from: ${requestURL}.`);
            } else if (!env.allowRemoteModels) {
                throw new Error(`\`env.allowRemoteModels=false\`, but attempted to load a remote file from: ${requestURL}.`);
            }
        }

        if (response === undefined || response.status === 404) {
            // File not found locally. This means either:
            // - The user has disabled local file access (`env.allowLocalModels=false`)
            // - the path is a valid HTTP url (`response === undefined`)
            // - the path is not a valid HTTP url and the file is not present on the file system or local server (`response.status === 404`)

            if (options.local_files_only || !env.allowRemoteModels) {
                // User requested local files only, but the file is not found locally.
                if (fatal) {
                    throw Error(`\`local_files_only=true\` or \`env.allowRemoteModels=false\` and file was not found locally at "${localPath}".`);
                } else {
                    // File not found, but this file is optional.
                    // TODO in future, cache the response?
                    return null;
                }
            }

            // File not found locally, so we try to download it from the remote server
            response = await getFile(remoteURL);

            if (response.status !== 200) {
                return handleError(response.status, remoteURL, fatal);
            }

            // Success! We use the proposed cache key from earlier
            cacheKey = proposedCacheKey;
        }

        // Only cache the response if:
        toCacheResponse =
            cache                              // 1. A caching system is available
            && typeof Response !== 'undefined' // 2. `Response` is defined (i.e., we are in a browser-like environment)
            && response instanceof Response    // 3. result is a `Response` object (i.e., not a `FileResponse`)
            && response.status === 200         // 4. request was successful (status code 200)
    }

    // Start downloading
    dispatchCallback(options.progress_callback, {
        status: 'download',
        name: path_or_repo_id,
        file: filename
    })

    const buffer = await readResponse(response, data => {
        dispatchCallback(options.progress_callback, {
            status: 'progress',
            ...data,
            name: path_or_repo_id,
            file: filename
        })
    })

    if (
        // Only cache web responses
        // i.e., do not cache FileResponses (prevents duplication)
        toCacheResponse && cacheKey
        &&
        // Check again whether request is in cache. If not, we add the response to the cache
        (await cache.match(cacheKey) === undefined)
    ) {
        // NOTE: We use `new Response(buffer, ...)` instead of `response.clone()` to handle LFS files
        await cache.put(cacheKey, new Response(buffer, {
            headers: response.headers
        }))
            .catch(err => {
                // Do not crash if unable to add to cache (e.g., QuotaExceededError).
                // Rather, log a warning and proceed with execution.
                console.warn(`Unable to add response to browser cache: ${err}.`);
            });

    }

    dispatchCallback(options.progress_callback, {
        status: 'done',
        name: path_or_repo_id,
        file: filename
    });

    return buffer;
}

/**
 * Fetches a JSON file from a given path and file name.
 *
 * @param {string} modelPath The path to the directory containing the file.
 * @param {string} fileName The name of the file to fetch.
 * @param {boolean} [fatal=true] Whether to throw an error if the file is not found.
 * @param {PretrainedOptions} [options] An object containing optional parameters.
 * @returns {Promise<Object>} The JSON data parsed into a JavaScript object.
 * @throws Will throw an error if the file is not found and `fatal` is true.
 */
async function getModelJSON(modelPath, fileName, fatal = true, options = {}) {
    let buffer = await getModelFile(modelPath, fileName, fatal, options);
    if (buffer === null) {
        // Return empty object
        return {}
    }

    let decoder = new TextDecoder('utf-8');
    let jsonData = decoder.decode(buffer);

    return JSON.parse(jsonData);
}

/**
 * Read and track progress when reading a Response object
 *
 * @param {any} response The Response object to read
 * @param {function} progress_callback The function to call with progress updates
 * @returns {Promise<Uint8Array>} A Promise that resolves with the Uint8Array buffer
 */
async function readResponse(response, progress_callback) {
    // Read and track progress when reading a Response object

    const contentLength = response.headers.get('Content-Length');
    if (contentLength === null) {
        console.warn('Unable to determine content-length from response headers. Will expand buffer when needed.')
    }
    let total = parseInt(contentLength ?? '0');
    let buffer = new Uint8Array(total);
    let loaded = 0;

    const reader = response.body.getReader();
    async function read() {
        const { done, value } = await reader.read();
        if (done) return;

        let newLoaded = loaded + value.length;
        if (newLoaded > total) {
            total = newLoaded;

            // Adding the new data will overflow buffer.
            // In this case, we extend the buffer
            let newBuffer = new Uint8Array(total);

            // copy contents
            newBuffer.set(buffer);

            buffer = newBuffer;
        }
        buffer.set(value, loaded)
        loaded = newLoaded;

        const progress = (loaded / total) * 100;

        // Call your function here
        progress_callback({
            progress: progress,
            loaded: loaded,
            total: total,
        })

        return read();
    }

    // Actually read
    await read();

    return buffer;
}

/**
 * Joins multiple parts of a path into a single path, while handling leading and trailing slashes.
 *
 * @param {...string} parts Multiple parts of a path.
 * @returns {string} A string representing the joined path.
 */
function pathJoin(...parts) {
    // https://stackoverflow.com/a/55142565
    parts = parts.map((part, index) => {
        if (index) {
            part = part.replace(new RegExp('^/'), '');
        }
        if (index !== parts.length - 1) {
            part = part.replace(new RegExp('/$'), '');
        }
        return part;
    })
    return parts.join('/');
}

;// CONCATENATED MODULE: ./node_modules/@xenova/transformers/src/utils/maths.js

/**
 * @file Helper module for mathematical processing. 
 * 
 * These functions and classes are only used internally, 
 * meaning an end-user shouldn't need to access anything here.
 * 
 * @module utils/maths
 */

/**
 * @typedef {Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array} TypedArray
 * @typedef {BigInt64Array | BigUint64Array} BigTypedArray
 * @typedef {TypedArray | BigTypedArray} AnyTypedArray
 */

/**
 * @param {TypedArray} input
 */
function interpolate_data(input, [in_channels, in_height, in_width], [out_height, out_width], mode = 'bilinear', align_corners = false) {
    // TODO use mode and align_corners

    // Output image dimensions
    const x_scale = out_width / in_width;
    const y_scale = out_height / in_height;

    // Output image
    // @ts-ignore
    const out_img = new input.constructor(out_height * out_width * in_channels);

    // Pre-calculate strides
    const inStride = in_height * in_width;
    const outStride = out_height * out_width;

    for (let i = 0; i < out_height; ++i) {
        for (let j = 0; j < out_width; ++j) {
            // Calculate output offset
            const outOffset = i * out_width + j;

            // Calculate input pixel coordinates
            const x = (j + 0.5) / x_scale - 0.5;
            const y = (i + 0.5) / y_scale - 0.5;

            // Calculate the four nearest input pixels
            // We also check if the input pixel coordinates are within the image bounds
            let x1 = Math.floor(x);
            let y1 = Math.floor(y);
            const x2 = Math.min(x1 + 1, in_width - 1);
            const y2 = Math.min(y1 + 1, in_height - 1);

            x1 = Math.max(x1, 0);
            y1 = Math.max(y1, 0);


            // Calculate the fractional distances between the input pixel and the four nearest pixels
            const s = x - x1;
            const t = y - y1;

            // Perform bilinear interpolation
            const w1 = (1 - s) * (1 - t);
            const w2 = s * (1 - t);
            const w3 = (1 - s) * t;
            const w4 = s * t;

            // Calculate the four nearest input pixel indices
            const yStride = y1 * in_width;
            const xStride = y2 * in_width;
            const idx1 = yStride + x1;
            const idx2 = yStride + x2;
            const idx3 = xStride + x1;
            const idx4 = xStride + x2;

            for (let k = 0; k < in_channels; ++k) {
                // Calculate channel offset
                const cOffset = k * inStride;

                out_img[k * outStride + outOffset] =
                    w1 * input[cOffset + idx1] +
                    w2 * input[cOffset + idx2] +
                    w3 * input[cOffset + idx3] +
                    w4 * input[cOffset + idx4];
            }
        }
    }

    return out_img;
}


/**
 * Helper method to transpose a `AnyTypedArray` directly
 * @param {T} array 
 * @template {AnyTypedArray} T 
 * @param {number[]} dims 
 * @param {number[]} axes 
 * @returns {[T, number[]]} The transposed array and the new shape.
 */
function transpose_data(array, dims, axes) {
    // Calculate the new shape of the transposed array
    // and the stride of the original array
    const shape = new Array(axes.length);
    const stride = new Array(axes.length);

    for (let i = axes.length - 1, s = 1; i >= 0; --i) {
        stride[i] = s;
        shape[i] = dims[axes[i]];
        s *= shape[i];
    }

    // Precompute inverse mapping of stride
    const invStride = axes.map((_, i) => stride[axes.indexOf(i)]);

    // Create the transposed array with the new shape
    // @ts-ignore
    const transposedData = new array.constructor(array.length);

    // Transpose the original array to the new array
    for (let i = 0; i < array.length; ++i) {
        let newIndex = 0;
        for (let j = dims.length - 1, k = i; j >= 0; --j) {
            newIndex += (k % dims[j]) * invStride[j];
            k = Math.floor(k / dims[j]);
        }
        transposedData[newIndex] = array[i];
    }

    return [transposedData, shape];
}


/**
 * Compute the softmax of an array of numbers.
 *
 * @param {number[]} arr The array of numbers to compute the softmax of.
 * @returns {number[]} The softmax array.
 */
function softmax(arr) {
    // Compute the maximum value in the array
    const maxVal = max(arr)[0];

    // Compute the exponentials of the array values
    const exps = arr.map(x => Math.exp(x - maxVal));

    // Compute the sum of the exponentials
    const sumExps = exps.reduce((acc, val) => acc + val, 0);

    // Compute the softmax values
    const softmaxArr = exps.map(x => x / sumExps);

    return softmaxArr;
}

/**
 * Calculates the logarithm of the softmax function for the input array.
 * @param {number[]} arr The input array to calculate the log_softmax function for.
 * @returns {any} The resulting log_softmax array.
 */
function log_softmax(arr) {
    // Compute the softmax values
    const softmaxArr = softmax(arr);

    // Apply log formula to each element
    const logSoftmaxArr = softmaxArr.map(x => Math.log(x));

    return logSoftmaxArr;
}

/**
 * Calculates the dot product of two arrays.
 * @param {number[]} arr1 The first array.
 * @param {number[]} arr2 The second array.
 * @returns {number} The dot product of arr1 and arr2.
 */
function dot(arr1, arr2) {
    return arr1.reduce((acc, val, i) => acc + val * arr2[i], 0);
}


/**
 * Get the top k items from an iterable, sorted by descending order
 *
 * @param {Array} items The items to be sorted
 * @param {number} [top_k=0] The number of top items to return (default: 0 = return all)
 * @returns {Array} The top k items, sorted by descending order
 */
function getTopItems(items, top_k = 0) {
    // if top == 0, return all

    items = Array.from(items)
        .map((x, i) => [i, x])            // Get indices ([index, score])
        .sort((a, b) => b[1] - a[1])      // Sort by log probabilities

    if (top_k > 0) {
        items = items.slice(0, top_k);    // Get top k items
    }

    return items
}

/**
 * Computes the cosine similarity between two arrays.
 *
 * @param {number[]} arr1 The first array.
 * @param {number[]} arr2 The second array.
 * @returns {number} The cosine similarity between the two arrays.
 */
function cos_sim(arr1, arr2) {
    // Calculate dot product of the two arrays
    const dotProduct = dot(arr1, arr2);

    // Calculate the magnitude of the first array
    const magnitudeA = magnitude(arr1);

    // Calculate the magnitude of the second array
    const magnitudeB = magnitude(arr2);

    // Calculate the cosine similarity
    const cosineSimilarity = dotProduct / (magnitudeA * magnitudeB);

    return cosineSimilarity;
}

/**
 * Calculates the magnitude of a given array.
 * @param {number[]} arr The array to calculate the magnitude of.
 * @returns {number} The magnitude of the array.
 */
function magnitude(arr) {
    return Math.sqrt(arr.reduce((acc, val) => acc + val * val, 0));
}


/**
 * Returns the value and index of the minimum element in an array.
 * @param {number[]} arr array of numbers.
 * @returns {number[]} the value and index of the minimum element, of the form: [valueOfMin, indexOfMin]
 * @throws {Error} If array is empty.
 */
function min(arr) {
    if (arr.length === 0) throw Error('Array must not be empty');
    let min = arr[0];
    let indexOfMin = 0;
    for (let i = 1; i < arr.length; ++i) {
        if (arr[i] < min) {
            min = arr[i];
            indexOfMin = i;
        }
    }
    return [min, indexOfMin];
}


/**
 * Returns the value and index of the maximum element in an array.
 * @param {number[]} arr array of numbers.
 * @returns {number[]} the value and index of the maximum element, of the form: [valueOfMax, indexOfMax]
 * @throws {Error} If array is empty.
 */
function max(arr) {
    if (arr.length === 0) throw Error('Array must not be empty');
    let max = arr[0];
    let indexOfMax = 0;
    for (let i = 1; i < arr.length; ++i) {
        if (arr[i] > max) {
            max = arr[i];
            indexOfMax = i;
        }
    }
    return [max, indexOfMax];
}

/**
 * Return the Discrete Fourier Transform sample frequencies.
 * 
 * Code adapted from https://github.com/numpy/numpy/blob/25908cacd19915bf3ddd659c28be28a41bd97a54/numpy/fft/helper.py#L173-L221
 * Original Python doc: https://numpy.org/doc/stable/reference/generated/numpy.fft.rfftfreq.html
 * @example
 * rfftfreq(400, 1 / 16000) // (201) [0, 40, 80, 120, 160, 200, ..., 8000]
 * @param {number} n Window length
 * @param {number} [d = 1.0] Sample spacing (inverse of the sampling rate). Defaults to 1.
 * @throws {TypeError} If n is not an integer.
 * @returns {number[]} Array of length `Math.floor(n / 2) + 1;` containing the sample frequencies.
 */
function rfftfreq(n, d = 1.0) {
    if (!Number.isInteger(n)) {
        throw new TypeError(`n should be an integer, but ${n} given.`);
    }
    const val = 1.0 / (n * d);
    const len = Math.floor(n / 2) + 1;
    const results = new Array(len);
    for (let i = 0; i < len; ++i) {
        results[i] = i * val;
    }
    return results;
}

/**
 * FFT class provides functionality for performing Fast Fourier Transform on arrays
 * Code adapted from https://www.npmjs.com/package/fft.js
 */
class FFT {
    /**
     * @param {number} size The size of the input array. Must be a power of two and bigger than 1.
     * @throws {Error} FFT size must be a power of two and bigger than 1.
     */
    constructor(size) {
        this.size = size | 0; // convert to a 32-bit signed integer
        if (this.size <= 1 || (this.size & (this.size - 1)) !== 0)
            throw new Error('FFT size must be a power of two and bigger than 1');

        this._csize = size << 1;

        this.table = new Float32Array(this.size * 2);
        for (let i = 0; i < this.table.length; i += 2) {
            const angle = Math.PI * i / this.size;
            this.table[i] = Math.cos(angle);
            this.table[i + 1] = -Math.sin(angle);
        }

        // Find size's power of two
        let power = 0;
        for (let t = 1; this.size > t; t <<= 1)
            ++power;

        // Calculate initial step's width:
        //   * If we are full radix-4, it is 2x smaller to give inital len=8
        //   * Otherwise it is the same as `power` to give len=4
        this._width = power % 2 === 0 ? power - 1 : power;

        // Pre-compute bit-reversal patterns
        this._bitrev = new Int32Array(1 << this._width);
        for (let j = 0; j < this._bitrev.length; ++j) {
            this._bitrev[j] = 0;
            for (let shift = 0; shift < this._width; shift += 2) {
                const revShift = this._width - shift - 2;
                this._bitrev[j] |= ((j >>> shift) & 3) << revShift;
            }
        }
    }

    /**
     * Create a complex number array with size `2 * size`
     *
     * @returns {Float32Array} A complex number array with size `2 * size`
     */
    createComplexArray() {
        return new Float32Array(this._csize);
    }

    /**
     * Converts a complex number representation stored in a Float32Array to an array of real numbers.
     * 
     * @param {Float32Array} complex The complex number representation to be converted.
     * @param {number[]} [storage] An optional array to store the result in.
     * @returns {number[]} An array of real numbers representing the input complex number representation.
     */
    fromComplexArray(complex, storage) {
        const res = storage || new Array(complex.length >>> 1);
        for (let i = 0; i < complex.length; i += 2)
            res[i >>> 1] = complex[i];
        return res;
    }

    /**
     * Convert a real-valued input array to a complex-valued output array.
     * @param {Float32Array} input The real-valued input array.
     * @param {Float32Array} [storage] Optional buffer to store the output array.
     * @returns {Float32Array} The complex-valued output array.
     */
    toComplexArray(input, storage) {
        const res = storage || this.createComplexArray();
        for (let i = 0; i < res.length; i += 2) {
            res[i] = input[i >>> 1];
            res[i + 1] = 0;
        }
        return res;
    }

    /**
     * Completes the spectrum by adding its mirrored negative frequency components.
     * @param {Float32Array} spectrum The input spectrum.
     * @returns {void}
     */
    completeSpectrum(spectrum) {
        const size = this._csize;
        const half = size >>> 1;
        for (let i = 2; i < half; i += 2) {
            spectrum[size - i] = spectrum[i];
            spectrum[size - i + 1] = -spectrum[i + 1];
        }
    }

    /**
     * Performs a Fast Fourier Transform (FFT) on the given input data and stores the result in the output buffer.
     * 
     * @param {Float32Array} out The output buffer to store the result.
     * @param {Float32Array} data The input data to transform.
     * 
     * @throws {Error} Input and output buffers must be different.
     * 
     * @returns {void}
     */
    transform(out, data) {
        if (out === data)
            throw new Error('Input and output buffers must be different');

        this._transform4(out, data, 1 /* DONE */);
    }

    /**
     * Performs a real-valued forward FFT on the given input buffer and stores the result in the given output buffer.
     * The input buffer must contain real values only, while the output buffer will contain complex values. The input and
     * output buffers must be different.
     *
     * @param {Float32Array} out The output buffer.
     * @param {Float32Array} data The input buffer containing real values.
     *
     * @throws {Error} If the input and output buffers are the same.
     */
    realTransform(out, data) {
        if (out === data)
            throw new Error('Input and output buffers must be different');

        this._realTransform4(out, data, 1 /* DONE */);
    }

    /**
     * Performs an inverse FFT transformation on the given `data` array, and stores the result in `out`.
     * The `out` array must be a different buffer than the `data` array. The `out` array will contain the
     * result of the transformation. The `data` array will not be modified.
     * 
     * @param {Float32Array} out The output buffer for the transformed data.
     * @param {Float32Array} data The input data to transform.
     * @throws {Error} If `out` and `data` refer to the same buffer.
     * @returns {void}
     */
    inverseTransform(out, data) {
        if (out === data)
            throw new Error('Input and output buffers must be different');

        this._transform4(out, data, -1 /* DONE */);
        for (let i = 0; i < out.length; ++i)
            out[i] /= this.size;
    }

    /**
     * Performs a radix-4 implementation of a discrete Fourier transform on a given set of data.
     *
     * @param {Float32Array} out The output buffer for the transformed data.
     * @param {Float32Array} data The input buffer of data to be transformed.
     * @param {number} inv A scaling factor to apply to the transform.
     * @returns {void}
     */
    _transform4(out, data, inv) {
        // radix-4 implementation

        const size = this._csize;

        // Initial step (permute and transform)
        const width = this._width;
        let step = 1 << width;
        let len = (size / step) << 1;

        let outOff;
        let t;
        let bitrev = this._bitrev;
        if (len === 4) {
            for (outOff = 0, t = 0; outOff < size; outOff += len, ++t) {
                const off = bitrev[t];
                this._singleTransform2(data, out, outOff, off, step);
            }
        } else {
            // len === 8
            for (outOff = 0, t = 0; outOff < size; outOff += len, ++t) {
                const off = bitrev[t];
                this._singleTransform4(data, out, outOff, off, step, inv);
            }
        }

        // Loop through steps in decreasing order
        for (step >>= 2; step >= 2; step >>= 2) {
            len = (size / step) << 1;
            let quarterLen = len >>> 2;

            // Loop through offsets in the data
            for (outOff = 0; outOff < size; outOff += len) {
                // Full case
                let limit = outOff + quarterLen;
                for (let i = outOff, k = 0; i < limit; i += 2, k += step) {
                    const A = i;
                    const B = A + quarterLen;
                    const C = B + quarterLen;
                    const D = C + quarterLen;

                    // Original values
                    const Ar = out[A];
                    const Ai = out[A + 1];
                    const Br = out[B];
                    const Bi = out[B + 1];
                    const Cr = out[C];
                    const Ci = out[C + 1];
                    const Dr = out[D];
                    const Di = out[D + 1];

                    const tableBr = this.table[k];
                    const tableBi = inv * this.table[k + 1];
                    const MBr = Br * tableBr - Bi * tableBi;
                    const MBi = Br * tableBi + Bi * tableBr;

                    const tableCr = this.table[2 * k];
                    const tableCi = inv * this.table[2 * k + 1];
                    const MCr = Cr * tableCr - Ci * tableCi;
                    const MCi = Cr * tableCi + Ci * tableCr;

                    const tableDr = this.table[3 * k];
                    const tableDi = inv * this.table[3 * k + 1];
                    const MDr = Dr * tableDr - Di * tableDi;
                    const MDi = Dr * tableDi + Di * tableDr;

                    // Pre-Final values
                    const T0r = Ar + MCr;
                    const T0i = Ai + MCi;
                    const T1r = Ar - MCr;
                    const T1i = Ai - MCi;
                    const T2r = MBr + MDr;
                    const T2i = MBi + MDi;
                    const T3r = inv * (MBr - MDr);
                    const T3i = inv * (MBi - MDi);

                    // Final values
                    out[A] = T0r + T2r;
                    out[A + 1] = T0i + T2i;
                    out[B] = T1r + T3i;
                    out[B + 1] = T1i - T3r;
                    out[C] = T0r - T2r;
                    out[C + 1] = T0i - T2i;
                    out[D] = T1r - T3i;
                    out[D + 1] = T1i + T3r;
                }
            }
        }
    }

    /**
     * Performs a radix-2 implementation of a discrete Fourier transform on a given set of data.
     *
     * @param {Float32Array} data The input buffer of data to be transformed.
     * @param {Float32Array} out The output buffer for the transformed data.
     * @param {number} outOff The offset at which to write the output data.
     * @param {number} off The offset at which to begin reading the input data.
     * @param {number} step The step size for indexing the input data.
     * @returns {void}
     */
    _singleTransform2(data, out, outOff, off, step) {
        // radix-2 implementation
        // NOTE: Only called for len=4

        const evenR = data[off];
        const evenI = data[off + 1];
        const oddR = data[off + step];
        const oddI = data[off + step + 1];

        out[outOff] = evenR + oddR;
        out[outOff + 1] = evenI + oddI;
        out[outOff + 2] = evenR - oddR;
        out[outOff + 3] = evenI - oddI;
    }

    /**
     * Performs radix-4 transformation on input data of length 8
     *
     * @param {Float32Array} data Input data array of length 8
     * @param {Float32Array} out Output data array of length 8
     * @param {number} outOff Index of output array to start writing from
     * @param {number} off Index of input array to start reading from
     * @param {number} step Step size between elements in input array
     * @param {number} inv Scaling factor for inverse transform
     * 
     * @returns {void}
     */
    _singleTransform4(data, out, outOff, off, step, inv) {
        // radix-4
        // NOTE: Only called for len=8
        const step2 = step * 2;
        const step3 = step * 3;

        // Original values
        const Ar = data[off];
        const Ai = data[off + 1];
        const Br = data[off + step];
        const Bi = data[off + step + 1];
        const Cr = data[off + step2];
        const Ci = data[off + step2 + 1];
        const Dr = data[off + step3];
        const Di = data[off + step3 + 1];

        // Pre-Final values
        const T0r = Ar + Cr;
        const T0i = Ai + Ci;
        const T1r = Ar - Cr;
        const T1i = Ai - Ci;
        const T2r = Br + Dr;
        const T2i = Bi + Di;
        const T3r = inv * (Br - Dr);
        const T3i = inv * (Bi - Di);

        // Final values
        out[outOff] = T0r + T2r;
        out[outOff + 1] = T0i + T2i;
        out[outOff + 2] = T1r + T3i;
        out[outOff + 3] = T1i - T3r;
        out[outOff + 4] = T0r - T2r;
        out[outOff + 5] = T0i - T2i;
        out[outOff + 6] = T1r - T3i;
        out[outOff + 7] = T1i + T3r;
    }

    /**
     * Real input radix-4 implementation
     * @param {Float32Array} out Output array for the transformed data
     * @param {Float32Array} data Input array of real data to be transformed
     * @param {number} inv The scale factor used to normalize the inverse transform
     */
    _realTransform4(out, data, inv) {
        // Real input radix-4 implementation
        const size = this._csize;

        // Initial step (permute and transform)
        const width = this._width;
        let step = 1 << width;
        let len = (size / step) << 1;

        var outOff;
        var t;
        var bitrev = this._bitrev;
        if (len === 4) {
            for (outOff = 0, t = 0; outOff < size; outOff += len, ++t) {
                const off = bitrev[t];
                this._singleRealTransform2(data, out, outOff, off >>> 1, step >>> 1);
            }
        } else {
            // len === 8
            for (outOff = 0, t = 0; outOff < size; outOff += len, ++t) {
                const off = bitrev[t];
                this._singleRealTransform4(data, out, outOff, off >>> 1, step >>> 1, inv);
            }
        }

        // Loop through steps in decreasing order
        for (step >>= 2; step >= 2; step >>= 2) {
            len = (size / step) << 1;
            const halfLen = len >>> 1;
            const quarterLen = halfLen >>> 1;
            const hquarterLen = quarterLen >>> 1;

            // Loop through offsets in the data
            for (outOff = 0; outOff < size; outOff += len) {
                for (let i = 0, k = 0; i <= hquarterLen; i += 2, k += step) {
                    const A = outOff + i;
                    const B = A + quarterLen;
                    const C = B + quarterLen;
                    const D = C + quarterLen;

                    // Original values
                    const Ar = out[A];
                    const Ai = out[A + 1];
                    const Br = out[B];
                    const Bi = out[B + 1];
                    const Cr = out[C];
                    const Ci = out[C + 1];
                    const Dr = out[D];
                    const Di = out[D + 1];

                    const tableBr = this.table[k];
                    const tableBi = inv * this.table[k + 1];
                    const MBr = Br * tableBr - Bi * tableBi;
                    const MBi = Br * tableBi + Bi * tableBr;

                    const tableCr = this.table[2 * k];
                    const tableCi = inv * this.table[2 * k + 1];
                    const MCr = Cr * tableCr - Ci * tableCi;
                    const MCi = Cr * tableCi + Ci * tableCr;

                    const tableDr = this.table[3 * k];
                    const tableDi = inv * this.table[3 * k + 1];
                    const MDr = Dr * tableDr - Di * tableDi;
                    const MDi = Dr * tableDi + Di * tableDr;

                    // Pre-Final values
                    const T0r = Ar + MCr;
                    const T0i = Ai + MCi;
                    const T1r = Ar - MCr;
                    const T1i = Ai - MCi;
                    const T2r = MBr + MDr;
                    const T2i = MBi + MDi;
                    const T3r = inv * (MBr - MDr);
                    const T3i = inv * (MBi - MDi);

                    // Final values
                    out[A] = T0r + T2r;
                    out[A + 1] = T0i + T2i;
                    out[B] = T1r + T3i;
                    out[B + 1] = T1i - T3r;

                    // Output final middle point
                    if (i === 0) {
                        out[C] = T0r - T2r;
                        out[C + 1] = T0i - T2i;
                        continue;
                    }

                    // Do not overwrite ourselves
                    if (i === hquarterLen)
                        continue;

                    const SA = outOff + quarterLen - i;
                    const SB = outOff + halfLen - i;

                    out[SA] = T1r + -inv * T3i;
                    out[SA + 1] = -T1i - inv * T3r;
                    out[SB] = T0r + -inv * T2r;
                    out[SB + 1] = -T0i + inv * T2i;
                }
            }
        }
    }

    /**
     * Performs a single real input radix-2 transformation on the provided data
     * 
     * @param {Float32Array} data The input data array
     * @param {Float32Array} out The output data array
     * @param {number} outOff The output offset
     * @param {number} off The input offset
     * @param {number} step The step
     * 
     * @returns {void}
     */
    _singleRealTransform2(data, out, outOff, off, step) {
        // radix-2 implementation
        // NOTE: Only called for len=4

        const evenR = data[off];
        const oddR = data[off + step];

        out[outOff] = evenR + oddR;
        out[outOff + 1] = 0;
        out[outOff + 2] = evenR - oddR;
        out[outOff + 3] = 0;
    }

    /**
     * Computes a single real-valued transform using radix-4 algorithm.
     * This method is only called for len=8.
     *
     * @param {Float32Array} data The input data array.
     * @param {Float32Array} out The output data array.
     * @param {number} outOff The offset into the output array.
     * @param {number} off The offset into the input array.
     * @param {number} step The step size for the input array.
     * @param {number} inv The value of inverse.
     */
    _singleRealTransform4(data, out, outOff, off, step, inv) {
        // radix-4
        // NOTE: Only called for len=8
        const step2 = step * 2;
        const step3 = step * 3;

        // Original values
        const Ar = data[off];
        const Br = data[off + step];
        const Cr = data[off + step2];
        const Dr = data[off + step3];

        // Pre-Final values
        const T0r = Ar + Cr;
        const T1r = Ar - Cr;
        const T2r = Br + Dr;
        const T3r = inv * (Br - Dr);

        // Final values
        out[outOff] = T0r + T2r;
        out[outOff + 1] = 0;
        out[outOff + 2] = T1r;
        out[outOff + 3] = -T3r;
        out[outOff + 4] = T0r - T2r;
        out[outOff + 5] = 0;
        out[outOff + 6] = T1r;
        out[outOff + 7] = T3r;
    }
}

/**
 * Performs median filter on the provided data. Padding is done by mirroring the data.
 * @param {AnyTypedArray} data The input array
 * @param {number} windowSize The window size
 */
function medianFilter(data, windowSize) {

    if (windowSize % 2 === 0 || windowSize <= 0) {
        throw new Error('Window size must be a positive odd number');
    }

    // @ts-ignore
    const outputArray = new data.constructor(data.length);

    // @ts-ignore
    const buffer = new data.constructor(windowSize); // Reusable array for storing values

    const halfWindowSize = Math.floor(windowSize / 2);

    for (let i = 0; i < data.length; ++i) {
        let valuesIndex = 0;

        for (let j = -halfWindowSize; j <= halfWindowSize; ++j) {
            let index = i + j;
            if (index < 0) {
                index = Math.abs(index);
            } else if (index >= data.length) {
                index = 2 * (data.length - 1) - index;
            }

            buffer[valuesIndex++] = data[index];
        }

        buffer.sort();
        outputArray[i] = buffer[halfWindowSize];
    }

    return outputArray;
}

/**
 * Helper function to round a number to a given number of decimals
 * @param {number} num The number to round
 * @param {number} decimals The number of decimals
 * @returns {number} The rounded number
 */
function round(num, decimals) {
    const pow = Math.pow(10, decimals);
    return Math.round(num * pow) / pow;
}

;// CONCATENATED MODULE: ./node_modules/@xenova/transformers/src/utils/tensor.js
/**
 * @file Helper module for `Tensor` processing.
 * 
 * These functions and classes are only used internally, 
 * meaning an end-user shouldn't need to access anything here.
 * 
 * @module utils/tensor
 */






/**
 * @typedef {import('./maths.js').AnyTypedArray} AnyTypedArray
 */

/** @type {Object} */
const ONNXTensor = ONNX.Tensor;

class Tensor extends ONNXTensor {
    /**
     * Create a new Tensor or copy an existing Tensor.
     * @param {[string, Array|AnyTypedArray, number[]]|[ONNXTensor]} args
     */
    constructor(...args) {
        if (args[0] instanceof ONNX.Tensor) {
            // Create shallow copy
            super(args[0].type, args[0].data, args[0].dims);

        } else {
            // Create new
            super(...args);
        }

        return new Proxy(this, {
            get: (obj, key) => {
                if (typeof key === 'string') {
                    let index = Number(key);
                    if (Number.isInteger(index)) {
                        // key is an integer (i.e., index)
                        return obj._getitem(index);
                    }
                }
                // @ts-ignore
                return obj[key];
            },
            set: (obj, key, value) => {
                // TODO allow setting of data

                // @ts-ignore
                return obj[key] = value;
            }
        });
    }

    /**
     * Returns an iterator object for iterating over the tensor data in row-major order.
     * If the tensor has more than one dimension, the iterator will yield subarrays.
     * @returns {Iterator} An iterator object for iterating over the tensor data in row-major order.
     */
    *[Symbol.iterator]() {
        const [iterLength, ...iterDims] = this.dims;

        if (iterDims.length > 0) {
            const iterSize = iterDims.reduce((a, b) => a * b);
            for (let i = 0; i < iterLength; ++i) {
                yield this._subarray(i, iterSize, iterDims);
            }
        } else {
            yield* this.data
        }

    }

    /**
     * Index into a Tensor object.
     * @param {number} index The index to access.
     * @returns {Tensor} The data at the specified index.
     */
    _getitem(index) {
        const [iterLength, ...iterDims] = this.dims;

        index = safeIndex(index, iterLength);

        if (iterDims.length > 0) {
            const iterSize = iterDims.reduce((a, b) => a * b);
            return this._subarray(index, iterSize, iterDims);
        } else {
            return new Tensor(this.type, [this.data[index]], iterDims);
        }
    }

    /**
     * @param {number|bigint} item The item to search for in the tensor
     * @returns {number} The index of the first occurrence of item in the tensor data.
     */
    indexOf(item) {
        for (let index = 0; index < this.data.length; ++index) {
            // Note: == instead of === so we can match Ints with BigInts
            if (this.data[index] == item) {
                return index;
            }
        }
        return -1;
    }

    /**
     * @param {number} index 
     * @param {number} iterSize 
     * @param {any} iterDims 
     * @returns {Tensor}
     */
    _subarray(index, iterSize, iterDims) {
        let data = this.data.subarray(index * iterSize, (index + 1) * iterSize);
        return new Tensor(this.type, data, iterDims);
    }

    /**
     * Returns the value of this tensor as a standard JavaScript Number. This only works
     * for tensors with one element. For other cases, see `Tensor.tolist()`.
     * @returns {number} The value of this tensor as a standard JavaScript Number.
     * @throws {Error} If the tensor has more than one element.
     */
    item() {
        if (this.data.length !== 1) {
            throw new Error(`a Tensor with ${this.data.length} elements cannot be converted to Scalar`);
        }
        return this.data[0];
    }

    /**
     * Convert tensor data to a n-dimensional JS list
     * @returns {Array}
     */
    tolist() {
        return reshape(this.data, this.dims)
    }

    /**
     * Return a new Tensor with the sigmoid function applied to each element.
     * @returns {Tensor} The tensor with the sigmoid function applied.
     */
    sigmoid() {
        return this.clone().sigmoid_();
    }

    /**
     * Applies the sigmoid function to the tensor in place.
     * @returns {Tensor} Returns `this`.
     */
    sigmoid_() {
        for (let i = 0; i < this.data.length; ++i) {
            this.data[i] = 1 / (1 + Math.exp(-this.data[i]));
        }
        return this;
    }

    clone() {
        return new Tensor(this.type, this.data.slice(), this.dims.slice());
    }

    slice(...slices) {
        // This allows for slicing with ranges and numbers
        let newTensorDims = [];
        let newOffsets = [];

        // slices is an array of numbers or arrays of numbers
        // e.g., slices = [0, [1, 3], null, [0, 3]]
        for (let sliceIndex = 0; sliceIndex < this.dims.length; ++sliceIndex) {
            let slice = slices[sliceIndex];

            if (slice === null || slice === undefined) {
                // null or undefined means take the whole dimension
                newOffsets.push([0, this.dims[sliceIndex]]);
                newTensorDims.push(this.dims[sliceIndex]);

            } else if (typeof slice === 'number') {
                slice = safeIndex(slice, this.dims[sliceIndex], sliceIndex);

                // A number means take a single element
                newOffsets.push([slice, slice + 1]);

            } else if (Array.isArray(slice) && slice.length === 2) {
                // An array of length 2 means take a range of elements

                if (slice[0] > slice[1]) {
                    throw new Error(`Invalid slice: ${slice}`);
                }

                let offsets = [
                    Math.max(slice[0], 0),
                    Math.min(slice[1], this.dims[sliceIndex])
                ];

                newOffsets.push(offsets);
                newTensorDims.push(offsets[1] - offsets[0]);

            } else {
                throw new Error(`Invalid slice: ${slice}`);
            }
        }

        let newDims = newOffsets.map(([start, end]) => end - start);
        let newBufferSize = newDims.reduce((a, b) => a * b);

        // Allocate memory
        let data = new this.data.constructor(newBufferSize);

        // Precompute strides
        const stride = this.stride();

        for (let i = 0; i < newBufferSize; ++i) {
            let originalIndex = 0;
            for (let j = newDims.length - 1, num = i; j >= 0; --j) {
                const size = newDims[j];
                originalIndex += ((num % size) + newOffsets[j][0]) * stride[j];
                num = Math.floor(num / size);
            }
            data[i] = this.data[originalIndex];
        }
        return new Tensor(this.type, data, newTensorDims);

    }

    /**
     * Return a transposed version of this Tensor, according to the provided dimensions.
     * @param  {...number} dims Dimensions to transpose.
     * @returns {Tensor} The transposed tensor.
     */
    transpose(...dims) {
        return transpose(this, dims);
    }

    // TODO: rename transpose to permute
    // TODO: implement transpose

    // TODO add .max() and .min() methods

    /**
     * Returns the sum of each row of the input tensor in the given dimension dim.
     * 
     * @param {number} [dim=null] The dimension or dimensions to reduce. If `null`, all dimensions are reduced.
     * @param {boolean} keepdim Whether the output tensor has `dim` retained or not.
     * @returns The summed tensor
     */
    sum(dim = null, keepdim = false) {
        return this.norm(1, dim, keepdim);
    }

    /**
     * Returns the matrix norm or vector norm of a given tensor.
     * @param {number|string} [p='fro'] The order of norm
     * @param {number} [dim=null] Specifies which dimension of the tensor to calculate the norm across.
     * If dim is None, the norm will be calculated across all dimensions of input.
     * @param {boolean} [keepdim=false] Whether the output tensors have dim retained or not.
     * @returns {Tensor} The norm of the tensor.
     */
    norm(p = 'fro', dim = null, keepdim = false) {
        if (p === 'fro') {
            // NOTE: Since we only support integer dims, Frobenius norm produces the same result as p=2.
            p = 2;
        } else if (typeof p === 'string') {
            throw Error(`Unsupported norm: ${p}`);
        }

        if (dim === null) {
            // @ts-ignore
            let val = this.data.reduce((a, b) => a + (b ** p), 0) ** (1 / p);
            return new Tensor(this.type, [val], []);
        }

        // Negative indexing
        dim = safeIndex(dim, this.dims.length);

        // Calculate the shape of the resulting array after summation
        const resultDims = this.dims.slice(); // Copy the original dimensions
        resultDims[dim] = 1; // Remove the specified axis

        // Create a new array to store the accumulated values
        const result = new this.data.constructor(this.data.length / this.dims[dim]);

        // Iterate over the data array
        for (let i = 0; i < this.data.length; ++i) {

            // Calculate the index in the resulting array
            let resultIndex = 0;

            for (let j = this.dims.length - 1, num = i, resultMultiplier = 1; j >= 0; --j) {
                const size = this.dims[j];
                if (j !== dim) {
                    const index = num % size;
                    resultIndex += index * resultMultiplier;
                    resultMultiplier *= resultDims[j];
                }
                num = Math.floor(num / size);
            }

            // Accumulate the value at the current index
            result[resultIndex] += (this.data[i]) ** p;
        }

        if (p !== 1) {
            for (let i = 0; i < result.length; ++i) {
                result[i] = result[i] ** (1 / p);
            }
        }

        if (!keepdim) {
            resultDims.splice(dim, 1);
        }

        return new Tensor(this.type, result, resultDims);
    }

    /**
     * Performs `L_p` normalization of inputs over specified dimension. Operates in place.
     * @param {number} [p=2] The exponent value in the norm formulation
     * @param {number} [dim=1] The dimension to reduce
     * @returns {Tensor} `this` for operation chaining.
     */
    normalize_(p = 2.0, dim = 1) {
        dim = safeIndex(dim, this.dims.length);

        const norm = this.norm(p, dim, true);

        for (let i = 0; i < this.data.length; ++i) {

            // Calculate the index in the resulting array
            let resultIndex = 0;

            for (let j = this.dims.length - 1, num = i, resultMultiplier = 1; j >= 0; --j) {
                const size = this.dims[j];
                if (j !== dim) {
                    const index = num % size;
                    resultIndex += index * resultMultiplier;
                    resultMultiplier *= this.dims[j];
                }
                num = Math.floor(num / size);
            }

            // Divide by normalized value
            this.data[i] /= norm.data[resultIndex];
        }

        return this;
    }

    /**
     * Performs `L_p` normalization of inputs over specified dimension.
     * @param {number} [p=2] The exponent value in the norm formulation
     * @param {number} [dim=1] The dimension to reduce
     * @returns {Tensor} The normalized tensor.
     */
    normalize(p = 2.0, dim = 1) {
        return this.clone().normalize_(p, dim);
    }

    /**
     * Compute and return the stride of this tensor.
     * Stride is the jump necessary to go from one element to the next one in the specified dimension dim.
     * @returns {number[]} The stride of this tensor.
     */
    stride() {
        return dimsToStride(this.dims);
    }

    /**
     * Returns a tensor with all specified dimensions of input of size 1 removed.
     * 
     * NOTE: The returned tensor shares the storage with the input tensor, so changing the contents of one will change the contents of the other.
     * If you would like a copy, use `tensor.clone()` before squeezing.
     * 
     * @param {number} [dim=null] If given, the input will be squeezed only in the specified dimensions.
     * @returns The squeezed tensor
     */
    squeeze(dim = null) {
        return new Tensor(
            this.type,
            this.data,
            calc_squeeze_dims(this.dims, dim)
        )
    }

    /**
     * In-place version of @see {@link Tensor.squeeze}
     */
    squeeze_(dim = null) {
        this.dims = calc_squeeze_dims(this.dims, dim);
        return this;
    }

    /**
     * Returns a new tensor with a dimension of size one inserted at the specified position.
     * 
     * NOTE: The returned tensor shares the same underlying data with this tensor.
     * 
     * @param {number} dim The index at which to insert the singleton dimension
     * @returns The unsqueezed tensor
     */
    unsqueeze(dim = null) {
        return new Tensor(
            this.type,
            this.data,
            calc_unsqueeze_dims(this.dims, dim)
        );
    }

    /**
     * In-place version of @see {@link Tensor.unsqueeze}
     */
    unsqueeze_(dim = null) {
        this.dims = calc_unsqueeze_dims(this.dims, dim);
        return this;
    }

    /**
     * In-place version of @see {@link Tensor.flatten}
     */
    flatten_(start_dim = 0, end_dim = -1) {
        // TODO validate inputs
        end_dim = (end_dim + this.dims.length) % this.dims.length;

        let dimsToKeepBefore = this.dims.slice(0, start_dim);
        let dimsToFlatten = this.dims.slice(start_dim, end_dim + 1);
        let dimsToKeepAfter = this.dims.slice(end_dim + 1);

        this.dims = [...dimsToKeepBefore, dimsToFlatten.reduce((a, b) => a * b, 1), ...dimsToKeepAfter]
        return this;
    }

    /**
     * Flattens input by reshaping it into a one-dimensional tensor.
     * If `start_dim` or `end_dim` are passed, only dimensions starting with `start_dim`
     * and ending with `end_dim` are flattened. The order of elements in input is unchanged.
     * @param {number} start_dim the first dim to flatten
     * @param {number} end_dim the last dim to flatten
     * @returns The flattened tensor.
     */
    flatten(start_dim = 0, end_dim = -1) {
        return this.clone().flatten_(start_dim, end_dim);
    }

    /**
     * Returns a new tensor with the same data as the `self` tensor but of a different `shape`.
     * @param  {...number} dims the desired size
     * @returns {Tensor} The tensor with the same data but different shape
     */
    view(...dims) {
        // TODO: validate dims
        let inferredIndex = -1;
        for (let i = 0; i < dims.length; ++i) {
            if (dims[i] === -1) {
                if (inferredIndex !== -1) {
                    throw new Error("Only one dimension can be inferred");
                }
                inferredIndex = i;
            }
        }

        if (inferredIndex !== -1) {
            // Some dimension must be inferred
            const productOther = dims.reduce((product, curr, index) => {
                return index !== inferredIndex ? product * curr : product
            }, 1);

            dims[inferredIndex] = this.data.length / productOther;
        }
        return new Tensor(this.type, this.data, dims); // NOTE: uses same underlying storage
    }

    neg_() {
        for (let i = 0; i < this.data.length; ++i) {
            this.data[i] = -this.data[i];
        }
        return this;
    }
    neg() {
        return this.clone().neg_();
    }
}

/**
 * This creates a nested array of a given type and depth (see examples).
 * 
 * @example
 *   NestArray<string, 1>; // string[]
 * @example
 *   NestArray<number, 2>; // number[][]
 * @example
 *   NestArray<string, 3>; // string[][][] etc.
 * @template T
 * @template {number} Depth
 * @template {never[]} [Acc=[]]
 * @typedef {Acc['length'] extends Depth ? T : NestArray<T[], Depth, [...Acc, never]>} NestArray
 */

/**
 * Reshapes a 1-dimensional array into an n-dimensional array, according to the provided dimensions.
 *
 * @example
 *   reshape([10                    ], [1      ]); // Type: number[]      Value: [10]
 *   reshape([1, 2, 3, 4            ], [2, 2   ]); // Type: number[][]    Value: [[1, 2], [3, 4]]
 *   reshape([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2]); // Type: number[][][]  Value: [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
 *   reshape([1, 2, 3, 4, 5, 6, 7, 8], [4, 2   ]); // Type: number[][]    Value: [[1, 2], [3, 4], [5, 6], [7, 8]]
 * @param {T[]} data The input array to reshape.
 * @param {DIM} dimensions The target shape/dimensions.
 * @template T
 * @template {[number]|[number, number]|[number, number, number]|[number, number, number, number]} DIM
 * @returns {NestArray<T, DIM["length"]>} The reshaped array.
 */
function reshape(data, dimensions) {

    const totalElements = data.length;
    const dimensionSize = dimensions.reduce((a, b) => a * b);

    if (totalElements !== dimensionSize) {
        throw Error(`cannot reshape array of size ${totalElements} into shape (${dimensions})`);
    }

    /** @type {any} */
    let reshapedArray = data;

    for (let i = dimensions.length - 1; i >= 0; i--) {
        reshapedArray = reshapedArray.reduce((acc, val) => {
            let lastArray = acc[acc.length - 1];

            if (lastArray.length < dimensions[i]) {
                lastArray.push(val);
            } else {
                acc.push([val]);
            }

            return acc;
        }, [[]]);
    }

    return reshapedArray[0];
}

/**
 * Transposes a tensor according to the provided axes.
 * @param {any} tensor The input tensor to transpose.
 * @param {Array} axes The axes to transpose the tensor along.
 * @returns {Tensor} The transposed tensor.
 */
function transpose(tensor, axes) {
    const [transposedData, shape] = transpose_data(tensor.data, tensor.dims, axes);
    return new Tensor(tensor.type, transposedData, shape);
}


/**
 * Interpolates an Tensor to the given size.
 * @param {Tensor} input The input tensor to interpolate. Data must be channel-first (i.e., [c, h, w])
 * @param {number[]} size The output size of the image
 * @param {string} mode The interpolation mode
 * @param {boolean} align_corners Whether to align corners.
 * @returns {Tensor} The interpolated tensor.
 */
function interpolate(input, [out_height, out_width], mode = 'bilinear', align_corners = false) {

    // Input image dimensions
    const in_channels = input.dims.at(-3) ?? 1;
    const in_height = input.dims.at(-2);
    const in_width = input.dims.at(-1);

    let output = interpolate_data(
        input.data,
        [in_channels, in_height, in_width],
        [out_height, out_width],
        mode,
        align_corners
    );
    return new Tensor(input.type, output, [in_channels, out_height, out_width]);
}

/**
 * Perform mean pooling of the last hidden state followed by a normalization step.
 * @param {Tensor} last_hidden_state Tensor of shape [batchSize, seqLength, embedDim]
 * @param {Tensor} attention_mask Tensor of shape [batchSize, seqLength]
 * @returns {Tensor} Returns a new Tensor of shape [batchSize, embedDim].
 */
function mean_pooling(last_hidden_state, attention_mask) {
    // last_hidden_state: [batchSize, seqLength, embedDim]
    // attention_mask:    [batchSize, seqLength]

    let shape = [last_hidden_state.dims[0], last_hidden_state.dims[2]];
    let returnedData = new last_hidden_state.data.constructor(shape[0] * shape[1]);
    let [batchSize, seqLength, embedDim] = last_hidden_state.dims;

    let outIndex = 0;
    for (let i = 0; i < batchSize; ++i) {
        let offset = i * embedDim * seqLength;

        for (let k = 0; k < embedDim; ++k) {
            let sum = 0;
            let count = 0;

            let attnMaskOffset = i * seqLength;
            let offset2 = offset + k;
            // Pool over all words in sequence
            for (let j = 0; j < seqLength; ++j) {
                // index into attention mask
                let attn = Number(attention_mask.data[attnMaskOffset + j]);

                count += attn;
                sum += last_hidden_state.data[offset2 + j * embedDim] * attn;
            }

            let avg = sum / count;
            returnedData[outIndex++] = avg;
        }
    }

    return new Tensor(
        last_hidden_state.type,
        returnedData,
        shape
    )
}

/**
 * Helper function to calculate new dimensions when performing a squeeze operation.
 * @param {number[]} dims The dimensions of the tensor.
 * @param {number|number[]|null} dim The dimension(s) to squeeze.
 * @returns The new dimensions.
 * @private
 */
function calc_squeeze_dims(dims, dim) {
    dims = dims.slice();
    if (dim === null) {
        dims = dims.filter((d) => d !== 1);
    } else if (typeof dim === 'number') {
        if (dims[dim] === 1) {
            dims.splice(dim, 1);
        }
    } else if (Array.isArray(dim)) {
        dims = dims.filter((x, i) => {
            return x !== 1 || !dim.includes(i);
        });
    }
    return dims;
}

/**
 * Helper function to calculate new dimensions when performing an unsqueeze operation.
 * @param {number[]} dims The dimensions of the tensor.
 * @param {number} dim The dimension to unsqueeze.
 * @returns The new dimensions.
 * @private
 */
function calc_unsqueeze_dims(dims, dim) {
    // Dimension out of range (e.g., "expected to be in range of [-4, 3], but got 4")
    // + 1 since we allow inserting at the end (i.e. dim = -1)
    dim = safeIndex(dim, dims.length + 1);
    dims = dims.slice();
    // Insert 1 into specified dimension
    dims.splice(dim, 0, 1);
    return dims;
}

/**
 * Safely calculate the index for an array of a given size, allowing negative indexing.
 * @param {number} index The index that will be used.
 * @param {number} size The size of the array.
 * @param {number} [dimension=null] The dimension that the index is for (optional).
 * @returns {number} The index, guaranteed to be non-negative and less than `arrayLength`.
 * 
 * @throws {Error} If the index is out of range.
 * @private
 */
function safeIndex(index, size, dimension = null) {
    if (index < -size || index >= size) {
        throw new Error(`IndexError: index ${index} is out of bounds for dimension${dimension === null ? '' : ' ' + dimension} with size ${size}`);
    }

    if (index < 0) {
        // Negative indexing, ensuring positive index
        index = ((index % size) + size) % size;
    }
    return index;
}

/**
 * Concatenates an array of tensors along a specified dimension.
 * @param {Tensor[]} tensors The array of tensors to concatenate.
 * @param {number} dim The dimension to concatenate along.
 * @returns {Tensor} The concatenated tensor.
 */
function cat(tensors, dim = 0) {
    dim = safeIndex(dim, tensors[0].dims.length);

    // TODO do validation of shapes

    const resultDims = tensors[0].dims.slice();
    resultDims[dim] = tensors.reduce((a, b) => a + b.dims[dim], 0);

    // Create a new array to store the accumulated values
    const resultSize = resultDims.reduce((a, b) => a * b, 1);
    const result = new tensors[0].data.constructor(resultSize);

    // Create output tensor of same type as first
    const resultType = tensors[0].type;

    if (dim === 0) {
        // Handle special case for performance reasons

        let offset = 0;
        for (let t of tensors) {
            result.set(t.data, offset);
            offset += t.data.length;
        }

    } else {

        let currentDim = 0;

        for (let t = 0; t < tensors.length; ++t) {
            let tensor = tensors[t];

            // Iterate over the data array
            for (let i = 0; i < tensor.data.length; ++i) {
                // Calculate the index in the resulting array
                let resultIndex = 0;

                for (let j = tensor.dims.length - 1, num = i, resultMultiplier = 1; j >= 0; --j) {
                    const size = tensor.dims[j];
                    let index = num % size;
                    if (j === dim) {
                        index += currentDim;
                    }
                    resultIndex += index * resultMultiplier;
                    resultMultiplier *= resultDims[j];
                    num = Math.floor(num / size);
                }
                // Accumulate the value at the current index
                result[resultIndex] = tensor.data[i];
            }

            currentDim += tensor.dims[dim];
        }
    }
    return new Tensor(resultType, result, resultDims);
}

/**
 * Stack an array of tensors along a specified dimension.
 * @param {Tensor[]} tensors The array of tensors to stack.
 * @param {number} dim The dimension to stack along.
 * @returns {Tensor} The stacked tensor.
 */
function stack(tensors, dim = 0) {
    // TODO do validation of shapes
    // NOTE: stack expects each tensor to be equal size
    return cat(tensors.map(t => t.unsqueeze(dim)), dim);
}


/**
 * Calculates the standard deviation and mean over the dimensions specified by dim. dim can be a single dimension or `null` to reduce over all dimensions.
 * @param {Tensor} input the input tenso
 * @param {number|null} dim the dimension to reduce. If None, all dimensions are reduced.
 * @param {number} correction difference between the sample size and sample degrees of freedom. Defaults to Bessel's correction, correction=1.
 * @param {boolean} keepdim whether the output tensor has dim retained or not.
 * @returns {Tensor[]} A tuple of (std, mean) tensors.
 */
function std_mean(input, dim = null, correction = 1, keepdim = false) {

    if (dim === null) {
        // None to reduce over all dimensions.
        const sum = input.data.reduce((a, b) => a + b, 0);
        const mean = sum / input.data.length;
        const std = Math.sqrt(input.data.reduce((a, b) => a + (b - mean) ** 2, 0) / (input.data.length - correction));

        const meanTensor = new Tensor(input.type, [mean], [/* scalar */]);
        const stdTensor = new Tensor(input.type, [std], [/* scalar */]);

        return [stdTensor, meanTensor];
    }

    // Negative indexing
    dim = safeIndex(dim, input.dims.length);

    const meanTensor = mean(input, dim, keepdim);

    // Calculate the shape of the resulting array after summation
    const resultDims = input.dims.slice(); // Copy the original dimensions
    resultDims[dim] = 1; // Remove the specified axis

    // Create a new array to store the accumulated values
    const result = new input.data.constructor(input.data.length / input.dims[dim]);

    // Iterate over the data array
    for (let i = 0; i < input.data.length; ++i) {

        // Calculate the index in the resulting array
        let resultIndex = 0;

        for (let j = input.dims.length - 1, num = i, resultMultiplier = 1; j >= 0; --j) {
            const size = input.dims[j];
            if (j !== dim) {
                const index = num % size;
                resultIndex += index * resultMultiplier;
                resultMultiplier *= resultDims[j];
            }
            num = Math.floor(num / size);
        }

        // Accumulate the value at the current index
        result[resultIndex] += (input.data[i] - meanTensor.data[resultIndex]) ** 2;
    }

    for (let i = 0; i < result.length; ++i) {
        result[i] = Math.sqrt(result[i] / (input.dims[dim] - correction));
    }

    if (!keepdim) {
        resultDims.splice(dim, 1);
    }

    const stdTensor = new Tensor(input.type, result, resultDims);

    return [stdTensor, meanTensor];
}


/**
 * Returns the mean value of each row of the input tensor in the given dimension dim.
 * @param {Tensor} input the input tensor.
 * @param {number|null} dim the dimension to reduce.
 * @param {boolean} keepdim whether the output tensor has dim retained or not.
 * @returns A new tensor with means taken along the specified dimension.
 */
function mean(input, dim = null, keepdim = false) {

    if (dim === null) {
        // None to reduce over all dimensions.
        let val = input.data.reduce((a, b) => a + b, 0);
        return new Tensor(input.type, [val / input.data.length], [/* scalar */]);
    }

    // Negative indexing
    dim = safeIndex(dim, input.dims.length);

    // Calculate the shape of the resulting array after summation
    const resultDims = input.dims.slice(); // Copy the original dimensions
    resultDims[dim] = 1; // Remove the specified axis

    // Create a new array to store the accumulated values
    const result = new input.data.constructor(input.data.length / input.dims[dim]);

    // Iterate over the data array
    for (let i = 0; i < input.data.length; ++i) {

        // Calculate the index in the resulting array
        let resultIndex = 0;

        for (let j = input.dims.length - 1, num = i, resultMultiplier = 1; j >= 0; --j) {
            const size = input.dims[j];
            if (j !== dim) {
                const index = num % size;
                resultIndex += index * resultMultiplier;
                resultMultiplier *= resultDims[j];
            }
            num = Math.floor(num / size);
        }

        // Accumulate the value at the current index
        result[resultIndex] += input.data[i];
    }

    if (input.dims[dim] !== 1) {
        for (let i = 0; i < result.length; ++i) {
            result[i] = result[i] / input.dims[dim];
        }
    }

    if (!keepdim) {
        resultDims.splice(dim, 1);
    }

    return new Tensor(input.type, result, resultDims);
}


/**
 *
 * Measures similarity between two temporal sequences (e.g., input audio and output tokens
 * to generate token-level timestamps).
 * @param {Tensor} matrix 
 * @returns {number[][]}
 */
function dynamicTimeWarping(matrix) {
    const [output_length, input_length] = matrix.dims;

    const outputShape = [output_length + 1, input_length + 1];

    const cost = new Tensor(
        'float32',
        new Float32Array(outputShape[0] * outputShape[1]).fill(Infinity),
        outputShape
    );

    const trace = new Tensor(
        'float32',
        new Float32Array(outputShape[0] * outputShape[1]).fill(-1),
        outputShape
    )

    // same as `cost[0][0] = 0`;
    cost[0].data[0] = 0;

    for (let j = 1; j < input_length + 1; ++j) {
        for (let i = 1; i < output_length + 1; ++i) {

            const c0 = cost[i - 1][j - 1].item();
            const c1 = cost[i - 1][j].item();
            const c2 = cost[i][j - 1].item();

            let c, t;
            if (c0 < c1 && c0 < c2) {
                c = c0;
                t = 0;
            } else if (c1 < c0 && c1 < c2) {
                c = c1;
                t = 1;
            } else {
                c = c2;
                t = 2;
            }

            cost[i].data[j] = matrix[i - 1][j - 1].item() + c;
            trace[i].data[j] = t;
        }
    }

    // backtrace
    let i = output_length;
    let j = input_length;

    trace.data.fill(2, 0, outputShape[1]) // trace[0, :] = 2
    for (let i = 0; i < outputShape[0]; ++i) { // trace[:, 0] = 1
        trace[i].data[0] = 1;
    }

    let text_indices = [];
    let time_indices = [];

    while (i > 0 || j > 0) {
        text_indices.push(i - 1);
        time_indices.push(j - 1);

        const t = trace[i][j].item();
        switch (t) {
            case 0:
                --i; --j;
                break;
            case 1:
                --i;
                break;
            case 2:
                --j;
                break;
            default:
                throw new Error(
                    `Internal error in dynamic time warping. Unexpected trace[${i}, ${j}]. Please file a bug report.`
                )
        }
    }

    text_indices.reverse();
    time_indices.reverse();

    return [text_indices, time_indices];

}

function dimsToStride(dims) {
    const stride = new Array(dims.length);
    for (let i = dims.length - 1, s2 = 1; i >= 0; --i) {
        stride[i] = s2;
        s2 *= dims[i];
    }
    return stride;
}

;// CONCATENATED MODULE: ./node_modules/@xenova/transformers/src/utils/data-structures.js

/**
 * @file Custom data structures.
 * 
 * These are only used internally, meaning an end-user shouldn't
 * need to access anything here.
 * 
 * @module utils/data-structures
 */


/**
 * Efficient Heap-based Implementation of a Priority Queue.
 * It uses an array-based binary heap, where the root is at index `0`, and the
 * children of node `i` are located at indices `2i + 1` and `2i + 2`, respectively.
 * 
 * Adapted from the following sources:
 * - https://stackoverflow.com/a/42919752/13989043 (original)
 * - https://github.com/belladoreai/llama-tokenizer-js (minor improvements)
 */
class PriorityQueue {

    /**
     * Create a new PriorityQueue.
     * @param {Function} comparator Comparator function to determine priority. Defaults to a MaxHeap.
     */
    constructor(comparator = (a, b) => a > b) {
        this._heap = [];
        this._comparator = comparator;
    }

    /**
     * The size of the queue
     */
    get size() {
        return this._heap.length;
    }

    /**
     * Check if the queue is empty.
     * @returns {boolean} `true` if the queue is empty, `false` otherwise.
     */
    isEmpty() {
        return this.size === 0;
    }

    /**
     * Return the element with the highest priority in the queue.
     * @returns {any} The highest priority element in the queue.
     */
    peek() {
        return this._heap[0];
    }

    /**
     * Add one or more elements to the queue.
     * @param  {...any} values The values to push into the queue.
     * @returns {number} The new size of the queue.
     */
    push(...values) {
        return this.extend(values);
    }

    /**
     * Add multiple elements to the queue.
     * @param {any[]} values The values to push into the queue.
     * @returns {number} The new size of the queue.
     */
    extend(values) {
        for (const value of values) {
            this._heap.push(value);
            this._siftUp();
        }
        return this.size;
    }

    /**
     * Remove and return the element with the highest priority in the queue.
     * @returns {any} The element with the highest priority in the queue.
     */
    pop() {
        const poppedValue = this.peek();
        const bottom = this.size - 1;
        if (bottom > 0) {
            this._swap(0, bottom);
        }
        this._heap.pop();
        this._siftDown();
        return poppedValue;
    }

    /**
     * Replace the element with the highest priority in the queue with a new value.
     * @param {*} value The new value.
     * @returns {*} The replaced value.
     */
    replace(value) {
        const replacedValue = this.peek();
        this._heap[0] = value;
        this._siftDown();
        return replacedValue;
    }

    /**
     * Compute the index for the parent of the node at index `i`.
     * @param {number} i The index of the node to get the parent of.
     * @returns {number} The index of the parent node.
     * @private
     */
    _parent(i) {
        return ((i + 1) >>> 1) - 1;
    }

    /**
     * Compute the index for the left child of the node at index `i`.
     * @param {number} i The index of the node to get the left child of.
     * @returns {number} The index of the left child.
     * @private
     */
    _left(i) {
        return (i << 1) + 1;
    }

    /**
     * Compute the index for the right child of the node at index `i`.
     * @param {number} i The index of the node to get the right child of.
     * @returns {number} The index of the right child.
     * @private
     */
    _right(i) {
        return (i + 1) << 1;
    }

    /**
     * Check if the element at index `i` is greater than the element at index `j`.
     * @param {number} i The index of the first element to compare.
     * @param {number} j The index of the second element to compare.
     * @returns {boolean} `true` if the element at index `i` is greater than the element at index `j`, `false` otherwise.
     * @private
     */
    _greater(i, j) {
        return this._comparator(this._heap[i], this._heap[j]);
    }

    /**
     * Swap the elements at indices `i` and `j`.
     * @param {number} i The index of the first element to swap.
     * @param {number} j The index of the second element to swap.
     * @private
     */
    _swap(i, j) {
        const temp = this._heap[i];
        this._heap[i] = this._heap[j];
        this._heap[j] = temp;
    }

    /**
     * Maintain the heap property by updating positions in the heap,
     * starting at the last element and moving up the heap.
     * @private
     */
    _siftUp() {
        let node = this.size - 1;
        while (node > 0 && this._greater(node, this._parent(node))) {
            this._swap(node, this._parent(node));
            node = this._parent(node);
        }
    }
    /**
     * Maintain the heap property by updating positions in the heap,
     * starting at the first element and moving down the heap.
     * @private
     */
    _siftDown() {
        let node = 0;
        while (
            (this._left(node) < this.size && this._greater(this._left(node), node)) ||
            (this._right(node) < this.size && this._greater(this._right(node), node))
        ) {
            const maxChild = (this._right(node) < this.size && this._greater(this._right(node), this._left(node)))
                ? this._right(node)
                : this._left(node);
            this._swap(node, maxChild);
            node = maxChild;
        }
    }
}

/**
 * A trie structure to efficiently store and search for strings.
 */
class CharTrie {
    constructor() {
        this.root = CharTrieNode.default();
    }

    /**
     * Adds one or more `texts` to the trie.
     * @param {string[]} texts The strings to add to the trie.
     */
    extend(texts) {
        for (let text of texts) {
            this.push(text);
        }
    }

    /**
     * Adds text to the trie.
     * @param {string} text The string to add to the trie.
     */
    push(text) {
        let node = this.root;
        for (let ch of text) {
            let child = node.children.get(ch);
            if (child === undefined) {
                child = CharTrieNode.default();
                node.children.set(ch, child);
            }
            node = child;
        }
        node.isLeaf = true;
    }

    /**
     * Searches the trie for all strings with a common prefix of `text`.
     * @param {string} text The common prefix to search for.
     * @yields {string} Each string in the trie that has `text` as a prefix.
     */
    *commonPrefixSearch(text) {
        let node = this.root;
        let prefix = "";
        for (let i = 0; i < text.length && node !== undefined; ++i) {
            const ch = text[i];
            prefix += ch;
            node = node.children.get(ch);
            if (node !== undefined && node.isLeaf) {
                yield prefix;
            }
        }
    }
}

/**
 * Represents a node in a character trie.
 */
class CharTrieNode {
    /**
     * Create a new CharTrieNode.
     * @param {boolean} isLeaf Whether the node is a leaf node or not.
     * @param {Map<string, CharTrieNode>} children A map containing the node's children, where the key is a character and the value is a `CharTrieNode`.
     */
    constructor(isLeaf, children) {
        this.isLeaf = isLeaf;
        this.children = children;
    }

    /**
     * Returns a new `CharTrieNode` instance with default values.
     * @returns {CharTrieNode} A new `CharTrieNode` instance with `isLeaf` set to `false` and an empty `children` map.
     */
    static default() {
        return new CharTrieNode(false, new Map());
    }
}

/**
 * A lattice data structure to be used for tokenization.
 */
class TokenLattice {
    /**
     * Creates a new TokenLattice instance.
     *
     * @param {string} sentence The input sentence to be tokenized.
     * @param {number} bosTokenId The beginning-of-sequence token ID.
     * @param {number} eosTokenId The end-of-sequence token ID.
     */
    constructor(sentence, bosTokenId, eosTokenId) {
        this.sentence = sentence;
        this.len = sentence.length;
        this.bosTokenId = bosTokenId;
        this.eosTokenId = eosTokenId;
        this.nodes = [];
        this.beginNodes = Array.from({ length: this.len + 1 }, () => []);
        this.endNodes = Array.from({ length: this.len + 1 }, () => []);

        const bos = new TokenLatticeNode(this.bosTokenId, 0, 0, 0, 0.0);
        const eos = new TokenLatticeNode(this.eosTokenId, 1, this.len, 0, 0.0);
        this.nodes.push(bos.clone());
        this.nodes.push(eos.clone());
        this.beginNodes[this.len].push(eos);
        this.endNodes[0].push(bos);
    }

    /**
     * Inserts a new token node into the token lattice.
     *
     * @param {number} pos The starting position of the token.
     * @param {number} length The length of the token.
     * @param {number} score The score of the token.
     * @param {number} tokenId The token ID of the token.
     */
    insert(pos, length, score, tokenId) {
        const nodeId = this.nodes.length;
        const node = new TokenLatticeNode(tokenId, nodeId, pos, length, score);
        this.beginNodes[pos].push(node);
        this.endNodes[pos + length].push(node);
        this.nodes.push(node);
    }

    /**
     * Implements the Viterbi algorithm to compute the most likely sequence of tokens.
     *
     * @returns {TokenLatticeNode[]} The array of nodes representing the most likely sequence of tokens.
     */
    viterbi() {
        const len = this.len;
        let pos = 0;
        while (pos <= len) {
            if (this.beginNodes[pos].length == 0) {
                return [];
            }
            for (let rnode of this.beginNodes[pos]) {
                rnode.prev = null;
                let bestScore = 0.0;
                let bestNode = null;
                for (let lnode of this.endNodes[pos]) {
                    const score = lnode.backtraceScore + rnode.score;
                    if (bestNode === null || score > bestScore) {
                        bestNode = lnode.clone();
                        bestScore = score;
                    }
                }

                if (bestNode !== null) {
                    rnode.prev = bestNode;
                    rnode.backtraceScore = bestScore;
                } else {
                    return [];
                }
            }
            ++pos;
        }

        const results = [];
        const root = this.beginNodes[len][0];
        const prev = root.prev;
        if (prev === null) {
            return [];
        }

        let node = prev.clone();
        while (node.prev !== null) {
            results.push(node.clone());
            const n = node.clone();
            node = n.prev.clone();
        }

        results.reverse();
        return results;
    }

    /**
     * @param {TokenLatticeNode} node
     * @returns {string} The array of nodes representing the most likely sequence of tokens.
     */
    piece(node) {
        return this.sentence.slice(node.pos, node.pos + node.length);
    }

    /**
     * @returns {Array} The array of nodes representing the most likely sequence of tokens.
     */
    tokens() {
        const nodes = this.viterbi();
        return nodes.map(x => this.piece(x));
    }

    /**
     * @returns {Array} The array of nodes representing the most likely sequence of tokens.
     */
    tokenIds() {
        const nodes = this.viterbi();
        return nodes.map(x => x.tokenId);
    }
}
class TokenLatticeNode {
    /**
     * Represents a node in a token lattice for a given sentence.
     * @param {number} tokenId The ID of the token associated with this node.
     * @param {number} nodeId The ID of this node.
     * @param {number} pos The starting position of the token in the sentence.
     * @param {number} length The length of the token.
     * @param {number} score The score associated with the token.
     */
    constructor(tokenId, nodeId, pos, length, score) {
        this.tokenId = tokenId;
        this.nodeId = nodeId;
        this.pos = pos;
        this.length = length;
        this.score = score;
        this.prev = null;
        this.backtraceScore = 0.0;
    }

    /**
     * Returns a clone of this node.
     * @returns {TokenLatticeNode} A clone of this node.
     */
    clone() {
        const n = new TokenLatticeNode(this.tokenId, this.nodeId, this.pos, this.length, this.score);
        n.prev = this.prev;
        n.backtraceScore = this.backtraceScore;
        return n;
    }
}

;// CONCATENATED MODULE: ./node_modules/@xenova/transformers/src/tokenizers.js

/**
 * @file Tokenizers are used to prepare textual inputs for a model.
 * 
 * **Example:** Create an `AutoTokenizer` and use it to tokenize a sentence.
 * This will automatically detect the tokenizer type based on the tokenizer class defined in `tokenizer.json`.
 * ```javascript
 * import { AutoTokenizer } from '@xenova/transformers';
 * 
 * let tokenizer = await AutoTokenizer.from_pretrained('Xenova/bert-base-uncased');
 * let { input_ids } = await tokenizer('I love transformers!');
 * // Tensor {
 * //   data: BigInt64Array(6) [101n, 1045n, 2293n, 19081n, 999n, 102n],
 * //   dims: [1, 6],
 * //   type: 'int64',
 * //   size: 6,
 * // }
 * ```
 * 
 * @module tokenizers
 */










/**
 * @typedef {import('./utils/hub.js').PretrainedOptions} PretrainedOptions
 */

/**
 * Loads a tokenizer from the specified path.
 * @param {string} pretrained_model_name_or_path The path to the tokenizer directory.
 * @param {PretrainedOptions} options Additional options for loading the tokenizer.
 * @returns {Promise<Array>} A promise that resolves with information about the loaded tokenizer.
 */
async function loadTokenizer(pretrained_model_name_or_path, options) {

    let info = await Promise.all([
        getModelJSON(pretrained_model_name_or_path, 'tokenizer.json', true, options),
        getModelJSON(pretrained_model_name_or_path, 'tokenizer_config.json', true, options),
    ])
    return info;
}

/**
 * Helper method to construct a pattern from a config object.
 * @param {Object} pattern The pattern object.
 * @param {boolean} invert Whether to invert the pattern (only applicable for Regex patterns).
 * @returns {RegExp|string|null} The compiled pattern.
 */
function createPattern(pattern, invert = true) {

    if (pattern.Regex !== undefined) {
        // NOTE: if invert is true, we wrap the pattern in a group so that it is kept when performing .split()
        return new RegExp(invert ? pattern.Regex : `(${pattern.Regex})`, 'gu');

    } else if (pattern.String !== undefined) {
        return pattern.String;

    } else {
        console.warn('Unknown pattern type:', pattern)
        return null;
    }
}

/**
 * Helper function to convert an Object to a Map
 * @param {Object} obj The object to convert.
 * @returns {Map<string, any>} The map.
 */
function objectToMap(obj) {
    return new Map(Object.entries(obj));
}

/**
 * Clean up a list of simple English tokenization artifacts like spaces before punctuations and abbreviated forms
 * @param {string} text The text to clean up.
 * @returns {string} The cleaned up text.
 */
function clean_up_tokenization(text) {
    // Clean up a list of simple English tokenization artifacts
    // like spaces before punctuations and abbreviated forms
    return text.replace(/ \./g, '.')
        .replace(/ \?/g, '?')
        .replace(/ \!/g, '!')
        .replace(/ ,/g, ',')
        .replace(/ \' /g, "'")
        .replace(/ n\'t/g, "n't")
        .replace(/ \'m/g, "'m")
        .replace(/ \'s/g, "'s")
        .replace(/ \'ve/g, "'ve")
        .replace(/ \'re/g, "'re");
}

/**
 * Helper function to remove accents from a string.
 * @param {string} text The text to remove accents from.
 * @returns {string} The text with accents removed.
 */
function remove_accents(text) {
    return text.replace(/[\u0300-\u036f]/g, '');
}

/**
 * Helper function to lowercase a string and remove accents.
 * @param {string} text The text to lowercase and remove accents from.
 * @returns {string} The lowercased text with accents removed.
 */
function lowercase_and_remove_accent(text) {
    return remove_accents(text.toLowerCase());
}

/**
 * Helper function to fuse consecutive values in an array equal to the specified value.
 * @param {Array} arr The input array
 * @param {any} value The value to fuse on.
 */
function fuse(arr, value) {
    let fused = [];
    let i = 0;
    while (i < arr.length) {
        fused.push(arr[i])
        if (arr[i] !== value) {
            ++i;
            continue;
        }

        while (i < arr.length && arr[i] === value) {
            ++i;
        }
    }

    return fused;
}

/**
 * Split a string on whitespace.
 * @param {string} text The text to split.
 * @returns {string[]} The split string.
 */
function whitespace_split(text) {
    return text.match(/\S+/g) || [];
}

const PUNCTUATION_REGEX = '\\p{P}\\u0021-\\u002F\\u003A-\\u0040\\u005B-\\u0060\\u007B-\\u007E';

/**
 * Abstract base class for tokenizer models.
 *
 * @extends Callable
 */
class TokenizerModel extends Callable {
    /**
     * Creates a new instance of TokenizerModel.
     * @param {Object} config The configuration object for the TokenizerModel.
     */
    constructor(config) {
        super();
        this.config = config;

        /** @type {string[]} */
        this.vocab = [];

        /**
         * A mapping of tokens to ids.
         * @type {Map<string, number>}
         */
        this.tokens_to_ids = new Map();

        this.unk_token_id = undefined;
        this.unk_token = undefined;
        this.end_of_word_suffix = undefined;

        /** @type {boolean} Whether to fuse unknown tokens when encoding. Defaults to false. */
        this.fuse_unk = this.config.fuse_unk ?? false;
    }

    /**
     * Instantiates a new TokenizerModel instance based on the configuration object provided.
     * @param {Object} config The configuration object for the TokenizerModel.
     * @param {...*} args Optional arguments to pass to the specific TokenizerModel constructor.
     * @returns {TokenizerModel} A new instance of a TokenizerModel.
     * @throws Will throw an error if the TokenizerModel type in the config is not recognized.
     */
    static fromConfig(config, ...args) {
        switch (config.type) {
            case 'WordPiece':
                return new WordPieceTokenizer(config);
            case 'Unigram':
                // @ts-ignore
                return new Unigram(config, ...args);

            case 'BPE':
                return new BPE(config);

            default:
                if (config.vocab) {
                    // @ts-ignore
                    return new LegacyTokenizerModel(config, ...args);
                }
                throw new Error(`Unknown TokenizerModel type: ${config.type}`);
        }
    }

    /**
     * Internal function to call the TokenizerModel instance.
     * @param {string[]} tokens The tokens to encode.
     * @returns {string[]} The encoded token IDs.
     */
    _call(tokens) {
        return this.encode(tokens);
    }

    /**
     * Encodes a list of tokens into a list of token IDs.
     * @param {string[]} tokens The tokens to encode.
     * @returns {string[]} The encoded tokens.
     * @throws Will throw an error if not implemented in a subclass.
     */
    encode(tokens) {
        throw Error("encode should be implemented in subclass.")
    }

    /**
     * Converts a list of tokens into a list of token IDs.
     * @param {string[]} tokens The tokens to convert.
     * @returns {number[]} The converted token IDs.
     */
    convert_tokens_to_ids(tokens) {
        let ids = tokens.map(t => this.tokens_to_ids.get(t) ?? this.unk_token_id);

        if (this.fuse_unk) {
            // Fuse unknown tokens
            ids = fuse(ids, this.unk_token_id);
        }
        return ids;
    }

    /**
     * Converts a list of token IDs into a list of tokens.
     * @param {number[]} ids The token IDs to convert.
     * @returns {string[]} The converted tokens.
     */
    convert_ids_to_tokens(ids) {
        return ids.map(i => this.vocab[i] ?? this.unk_token);
    }
}

/**
 * A subclass of TokenizerModel that uses WordPiece encoding to encode tokens.
 * @extends TokenizerModel
 */
class WordPieceTokenizer extends TokenizerModel {
    /**
     * @param {Object} config The configuration object.
     * @param {Object} config.vocab A mapping of tokens to ids.
     * @param {string} config.unk_token The unknown token string.
     * @param {string} config.continuing_subword_prefix The prefix to use for continuing subwords.
     */
    constructor(config) {
        super(config);
        /**
         * A mapping of tokens to ids.
         * @type {Map<string, number>}
         */
        this.tokens_to_ids = objectToMap(config.vocab);

        /**
         * The id of the unknown token.
         * @type {number}
         */
        this.unk_token_id = this.tokens_to_ids.get(config.unk_token);

        /**
         * The unknown token string.
         * @type {string}
         */
        this.unk_token = config.unk_token;

        /**
         * An array of tokens.
         * @type {string[]}
         */
        this.vocab = new Array(this.tokens_to_ids.size);
        for (const [key, value] of this.tokens_to_ids) {
            this.vocab[value] = key;
        }
    }

    /**
     * Encodes an array of tokens using WordPiece encoding.
     * @param {string[]} tokens The tokens to encode.
     * @returns {string[]} An array of encoded tokens.
     */
    encode(tokens) {
        let outputTokens = [];
        for (let token of tokens) {
            let chars = [...token];
            // TODO add
            // if len(chars) > self.max_input_chars_per_word:
            //     output_tokens.append(self.unk_token)
            //     continue

            let isUnknown = false;
            let start = 0;
            let subTokens = [];

            while (start < chars.length) {
                let end = chars.length;
                let currentSubstring = null;
                while (start < end) {
                    let substr = chars.slice(start, end).join('');

                    if (start > 0) {
                        substr = this.config.continuing_subword_prefix + substr;
                    }
                    if (this.tokens_to_ids.has(substr)) {
                        currentSubstring = substr;
                        break;
                    }

                    --end;
                }
                if (currentSubstring === null) {
                    isUnknown = true;
                    break;
                }
                subTokens.push(currentSubstring);
                start = end;
            }
            if (isUnknown) {
                outputTokens.push(this.unk_token);
            } else {
                outputTokens.push(...subTokens);
            }
        }

        return outputTokens;
    }

}

/**
 * Class representing a Unigram tokenizer model.
 * @extends TokenizerModel
 */
class Unigram extends TokenizerModel {
    /**
     * Create a new Unigram tokenizer model.
     * @param {Object} config The configuration object for the Unigram model.
     * @param {number} config.unk_id The ID of the unknown token
     * @param {any[][]} config.vocab A 2D array representing a mapping of tokens to scores.
     * @param {Object} moreConfig Additional configuration object for the Unigram model.
     */
    constructor(config, moreConfig) {
        super(config);

        const vocabSize = config.vocab.length;
        this.vocab = new Array(vocabSize);
        this.scores = new Array(vocabSize);
        for (let i = 0; i < vocabSize; ++i) {
            const piece = config.vocab[i];
            this.vocab[i] = piece[0];
            this.scores[i] = piece[1];
        }

        this.unk_token_id = config.unk_id;
        this.unk_token = this.vocab[config.unk_id];

        this.tokens_to_ids = new Map(this.vocab.map((x, i) => [x, i]));
        this.bosToken = ' '; // beginning of a sentence token

        this.bosTokenId = this.tokens_to_ids.get(this.bosToken); // NOTE: may be undefined
        this.eosToken = moreConfig.eos_token;

        this.eosTokenId = this.tokens_to_ids.get(this.eosToken);
        this.unkToken = this.vocab[this.unk_token_id];

        this.minScore = min(this.scores)[0];

        this.unkScore = this.minScore - 10.0;
        this.scores[this.unk_token_id] = this.unkScore;

        this.trie = new CharTrie();
        this.trie.extend(this.vocab);

        // NOTE: `fuse_unk` is hardcoded to true for Unigram models
        // See: https://github.com/huggingface/tokenizers/blob/b58227c7f1ccf8b73ee2268354336da56d91e492/tokenizers/src/models/unigram/model.rs#L119
        this.fuse_unk = true;
    }

    /**
     * Populates lattice nodes.
     * @param {TokenLattice} lattice The token lattice to populate with nodes.
     */
    populateNodes(lattice) {
        const sentence = lattice.sentence;
        const len = sentence.length;
        let beginPos = 0;
        while (beginPos < len) {
            const mblen = 1;
            let hasSingleNode = false;
            const tokens = [];

            for (let token of this.trie.commonPrefixSearch(sentence.slice(beginPos))) {
                tokens.push(token);
                const tokenId = this.tokens_to_ids.get(token);
                const tokenScore = this.scores[tokenId];
                const n = token.length;
                lattice.insert(beginPos, n, tokenScore, tokenId);
                if (!hasSingleNode && n === mblen) {
                    hasSingleNode = true;
                }
            }
            if (!hasSingleNode) {
                lattice.insert(beginPos, mblen, this.unkScore, this.unk_token_id);
            }
            beginPos += mblen;
        }
    }

    /**
     * Encodes an array of tokens into an array of subtokens using the unigram model.
     *
     * @param {string} normalized The normalized string.
     * @returns {string[]} An array of subtokens obtained by encoding the input tokens using the unigram model.
     */
    tokenize(normalized) {
        const lattice = new TokenLattice(normalized, this.bosTokenId, this.eosTokenId);
        this.populateNodes(lattice);
        return lattice.tokens();
    }

    /**
     * Encodes an array of tokens using Unigram encoding.
     * @param {Array} tokens The tokens to encode.
     * @returns {Array} An array of encoded tokens.
     */
    encode(tokens) {
        let toReturn = [];
        for (let token of tokens) {
            const tokenized = this.tokenize(token);
            toReturn.push(...tokenized);
        }
        return toReturn;
    }

}

/**
 * Returns list of utf-8 byte and a mapping to unicode strings.
 * Specifically avoids mapping to whitespace/control characters the BPE code barfs on.
 * @returns {Object} Object with utf-8 byte keys and unicode string values.
 */
const BYTES_TO_UNICODE = (() => {
    // Returns list of utf-8 byte and a mapping to unicode strings.
    // We specifically avoids mapping to whitespace/control characters
    // the bpe code barfs on.

    const bs = [
        ...Array.from({ length: "~".charCodeAt(0) - "!".charCodeAt(0) + 1 }, (_, i) => i + "!".charCodeAt(0)),
        ...Array.from({ length: "¬".charCodeAt(0) - "¡".charCodeAt(0) + 1 }, (_, i) => i + "¡".charCodeAt(0)),
        ...Array.from({ length: "ÿ".charCodeAt(0) - "®".charCodeAt(0) + 1 }, (_, i) => i + "®".charCodeAt(0)),
    ];
    let cs = bs.slice();
    let n = 0;
    for (let b = 0; b < 256; ++b) {
        if (!bs.includes(b)) {
            bs.push(b);
            cs.push(256 + n);
            n += 1;
        }
    }
    let ccs = cs.map(n => String.fromCharCode(n));
    return Object.fromEntries(bs.map((b, i) => [b, ccs[i]]));
})();

const UNICODE_TO_BYTES = reverseDictionary(BYTES_TO_UNICODE);


/**
 * @typedef {Object} BPENode
 * @property {string} token The token associated with the node
 * @property {number} bias A positional bias for the node.
 * @property {number} [score] The score of the node.
 * @property {BPENode} [prev] The previous node in the linked list.
 * @property {BPENode} [next] The next node in the linked list.
 */

/**
 * BPE class for encoding text into Byte-Pair-Encoding (BPE) tokens.
 * @extends TokenizerModel
 */
class BPE extends TokenizerModel {
    /**
     * Create a BPE instance.
     * @param {Object} config The configuration object for BPE.
     * @param {Object} config.vocab A mapping of tokens to ids.
     * @param {string} config.unk_token The unknown token used for out of vocabulary words.
     * @param {string} config.end_of_word_suffix The suffix to place at the end of each word.
     * @param {Array} config.merges An array of BPE merges as strings.
     */
    constructor(config) {
        super(config);

        this.BPE_SPLIT_TOKEN = ' ';

        /** @type {Map<string, number>} */
        this.tokens_to_ids = objectToMap(config.vocab);

        this.unk_token_id = this.tokens_to_ids.get(config.unk_token);
        this.unk_token = config.unk_token;

        this.vocab = new Array(this.tokens_to_ids.size);
        for (const [key, value] of this.tokens_to_ids) {
            this.vocab[value] = key;
        }

        this.bpe_ranks = new Map(config.merges.map((x, i) => [x, i]));
        this.merges = config.merges.map(x => x.split(this.BPE_SPLIT_TOKEN));

        this.end_of_word_suffix = config.end_of_word_suffix;

        this.byte_fallback = this.config.byte_fallback ?? false;

        if (this.byte_fallback) {
            this.text_encoder = new TextEncoder();
        }

        /** @type {Map<string, string[]>} */
        this.cache = new Map();
    }

    /**
     * Apply Byte-Pair-Encoding (BPE) to a given token. Efficient heap-based priority
     * queue implementation adapted from https://github.com/belladoreai/llama-tokenizer-js.
     * @param {string} token The token to encode.
     * @returns {string[]} The BPE encoded tokens.
     */
    bpe(token) {
        if (token.length === 0) {
            return [];
        }

        const cached = this.cache.get(token);
        if (cached !== undefined) {
            return cached;
        }

        const word = Array.from(token);
        if (this.end_of_word_suffix) {
            word[word.length - 1] += this.end_of_word_suffix;
        }

        let result = [];
        if (word.length > 1) {
            // Create a priority queue to store the nodes that will be merged.
            // The comparator function compares the scores of the nodes.
            const queue = new PriorityQueue((a, b) => a.score < b.score);

            // Construct a doubly-linked list of nodes that will be inserted into the priority queue,
            // starting with the individual characters. We also populate each node with a positional
            // bias to break ties in the priority queue.
            let startingNode = {
                token: word[0],
                bias: 0,
                prev: null,
                next: null,
            }

            let previousNode = startingNode
            for (let i = 1; i < word.length; ++i) {
                const currentNode = {
                    bias: i / word.length, // Add fractional component to break ties
                    token: word[i],
                    prev: previousNode,
                    next: null,
                }
                previousNode.next = currentNode
                this._add_node(queue, previousNode)
                previousNode = currentNode
            }

            while (!queue.isEmpty()) {
                // Get the next node with the highest priority
                const node = queue.pop();

                // Check that this merge is still possible
                if (node.deleted || !node.next || node.next.deleted) continue;

                // Here, we mark the current node (left side of the merge) and the next node (right side of the merge) as deleted.
                // This is because they will both be replaced by a new node representing the merge result.
                node.deleted = true;
                node.next.deleted = true;

                // Next, we fix the node that comes before the current node (i.e., left side of the merge).
                if (node.prev) {

                    // Make a shallow copy of the previous node
                    const newPreviousNode = { ...node.prev };

                    // Mark the old previous node as deleted. This avoids erroneous merges later,
                    // because there may still be references to this node in the priority queue.
                    node.prev.deleted = true;
                    node.prev = newPreviousNode;

                    // Update the reference of the previous node, by pointing its previous node to this new previous node.
                    if (newPreviousNode.prev) {
                        newPreviousNode.prev.next = newPreviousNode;
                    } else {
                        // If the previous of the previous node does not exist, it means that
                        // `newPreviousNode` must be the new `startingNode`.
                        startingNode = newPreviousNode;
                    }
                }

                // Create a new node which represents the result of the merge.
                const merged = {
                    token: node.token + node.next.token,
                    bias: node.bias,
                    prev: node.prev,
                    next: node.next.next,
                }

                // We now consider where we can add the new merged node to the priority queue:
                // 1. prev <-> merged
                if (merged.prev) {
                    merged.prev.next = merged;
                    this._add_node(queue, merged.prev);
                } else {
                    // If `merged.prev` does not exist, then `merged` must be the new `startingNode`.
                    startingNode = merged;
                }

                // 2. merged <-> next
                if (merged.next) {
                    merged.next.prev = merged;
                    this._add_node(queue, merged);
                }
            }

            // Traverse the linked list, starting from the `startingNode`, and collect the tokens.
            for (let currentNode = startingNode; currentNode !== null; currentNode = currentNode.next) {
                result.push(currentNode.token);
            }
        } else {
            result = word;
        }

        // Save the result to the cache
        this.cache.set(token, result);

        return result;
    }


    /**
     * Helper function to add a node to the priority queue.
     * @param {PriorityQueue} queue 
     * @param {BPENode} node
     * @private
     */
    _add_node(queue, node) {
        // `score` is a measure of the merge priority: lower means higher priority
        // We use the BPE rank as a measure of priority (i.e., the local of the merge in the merges list)
        // We also add a fractional component to the score to break ties (with the earlier character having higher priority)
        const rank = this.bpe_ranks.get(node.token + this.BPE_SPLIT_TOKEN + node.next.token);
        if (rank !== undefined) {
            node.score = rank + node.bias;
            queue.push(node);
        }
    }

    /**
     * Encodes the input sequence of tokens using the BPE algorithm and returns the resulting subword tokens.
     * @param {string[]} tokens The input sequence of tokens to encode.
     * @returns {string[]} The resulting subword tokens after applying the BPE algorithm to the input sequence of tokens.
     */
    encode(tokens) {
        let outputTokens = [];

        for (let token of tokens) {
            let bpe_token_list = this.bpe(token);

            for (let t of bpe_token_list) {
                if (this.tokens_to_ids.has(t)) {
                    outputTokens.push(t);
                } else {
                    if (this.byte_fallback) {
                        outputTokens.push(
                            ...Array.from(this.text_encoder.encode(t))
                                .map(x => `<0x${x.toString(16).toUpperCase().padStart(2, '0')}>`)
                        );
                    } else {
                        outputTokens.push(this.unk_token);
                    }
                }
            }
        }

        return outputTokens;
    }

}

/**
 * Legacy tokenizer class for tokenizers with only a vocabulary.
 */
class LegacyTokenizerModel extends TokenizerModel {
    /**
     * Create a LegacyTokenizerModel instance.
     * @param {Object} config The configuration object for LegacyTokenizerModel.
     * @param {Object} config.vocab A (possibly nested) mapping of tokens to ids.
     * @param {Object} moreConfig Additional configuration object for the LegacyTokenizerModel model.
     */
    constructor(config, moreConfig) {
        super(config);

        /**@type {Map<string, number>} */
        this.tokens_to_ids = objectToMap(
            moreConfig.target_lang
                ? config.vocab[moreConfig.target_lang]
                : config.vocab
        );

        this.bos_token = moreConfig.bos_token;
        this.bos_token_id = this.tokens_to_ids.get(this.bos_token);

        this.eos_token = moreConfig.eos_token;
        this.eos_token_id = this.tokens_to_ids.get(this.eos_token);

        this.pad_token = moreConfig.pad_token;
        this.pad_token_id = this.tokens_to_ids.get(this.pad_token);

        this.unk_token = moreConfig.unk_token;
        this.unk_token_id = this.tokens_to_ids.get(this.unk_token);

        this.vocab = new Array(this.tokens_to_ids.size);
        for (const [key, value] of this.tokens_to_ids) {
            this.vocab[value] = key;
        }
    }

    encode(tokens) {
        return tokens;
    }
}


/**
 * A base class for text normalization.
 * @abstract
 */
class Normalizer extends Callable {
    /**
     * @param {Object} config The configuration object for the normalizer.
     */
    constructor(config) {
        super();
        this.config = config;
    }

    /**
     * Factory method for creating normalizers from config objects.
     * @static
     * @param {Object} config The configuration object for the normalizer.
     * @returns {Normalizer} A Normalizer object.
     * @throws {Error} If an unknown Normalizer type is specified in the config.
     */
    static fromConfig(config) {
        if (config === null) return null;
        switch (config.type) {
            case 'BertNormalizer':
                return new BertNormalizer(config);
            case 'Precompiled':
                return new Precompiled(config);
            case 'Sequence':
                return new NormalizerSequence(config);
            case 'Replace':
                return new Replace(config);
            case 'NFC':
                return new NFC(config);
            case 'NFKD':
                return new NFKD(config);
            case 'Strip':
                return new StripNormalizer(config);
            case 'StripAccents':
                return new StripAccents(config);
            case 'Lowercase':
                return new Lowercase(config);
            case 'Prepend':
                return new Prepend(config);
            default:
                throw new Error(`Unknown Normalizer type: ${config.type}`);
        }
    }

    /**
     * Normalize the input text.
     * @abstract
     * @param {string} text The text to normalize.
     * @returns {string} The normalized text.
     * @throws {Error} If this method is not implemented in a subclass.
     */
    normalize(text) {
        throw Error("normalize should be implemented in subclass.")
    }

    /**
     * Alias for {@link Normalizer#normalize}.
     * @param {string} text The text to normalize.
     * @returns {string} The normalized text.
     */
    _call(text) {
        return this.normalize(text);
    }

}

/**
 * Replace normalizer that replaces occurrences of a pattern with a given string or regular expression.
 * @extends Normalizer
 */
class Replace extends Normalizer {
    /**
     * Normalize the input text by replacing the pattern with the content.
     * @param {string} text The input text to be normalized.
     * @returns {string} The normalized text after replacing the pattern with the content.
     */
    normalize(text) {
        let pattern = createPattern(this.config.pattern);
        if (pattern === null) {
            return text;
        }

        text = text.replaceAll(pattern, this.config.content)

        return text;
    }
}

/**
 * A normalizer that applies Unicode normalization form C (NFC) to the input text.
 * @extends Normalizer
 */
class NFC extends Normalizer {
    /**
     * Normalize the input text by applying Unicode normalization form C (NFC).
     * @param {string} text The input text to be normalized.
     * @returns {string} The normalized text.
     */
    normalize(text) {
        text = text.normalize('NFC')
        return text;
    }
}

/**
 * NFKD Normalizer.
 * @extends Normalizer
 */
class NFKD extends Normalizer {
    /**
     * Normalize text using NFKD normalization.
     * @param {string} text The text to be normalized.
     * @returns {string} The normalized text.
     */
    normalize(text) {
        text = text.normalize('NFKD')
        return text;
    }
}

/**
 * A normalizer that strips leading and/or trailing whitespace from the input text.
 */
class StripNormalizer extends Normalizer {
    /**
     * Strip leading and/or trailing whitespace from the input text.
     * @param {string} text The input text.
     * @returns {string} The normalized text.
     */
    normalize(text) {
        if (this.config.strip_left && this.config.strip_right) {
            // Fast path to avoid an extra trim call
            text = text.trim();
        } else {
            if (this.config.strip_left) {
                text = text.trimStart();
            }
            if (this.config.strip_right) {
                text = text.trimEnd();
            }
        }
        return text;
    }
}

/**
 * StripAccents normalizer removes all accents from the text.
 * @extends Normalizer
 */
class StripAccents extends Normalizer {
    /**
     * Remove all accents from the text.
     * @param {string} text The input text.
     * @returns {string} The normalized text without accents.
     */
    normalize(text) {
        text = remove_accents(text);
        return text;
    }
}

/**
 * A Normalizer that lowercases the input string.
 * @extends Normalizer
 */
class Lowercase extends Normalizer {
    /**
     * Lowercases the input string.
     * @param {string} text The text to normalize.
     * @returns {string} The normalized text.
     */
    normalize(text) {
        text = text.toLowerCase();
        return text;
    }
}

/**
 * A Normalizer that prepends a string to the input string.
 * @extends Normalizer
 */
class Prepend extends Normalizer {
    /**
     * Prepends the input string.
     * @param {string} text The text to normalize.
     * @returns {string} The normalized text.
     */
    normalize(text) {
        text = this.config.prepend + text;
        return text;
    }
}

/**
 * A Normalizer that applies a sequence of Normalizers.
 * @extends Normalizer
 */
class NormalizerSequence extends Normalizer {
    /**
   * Create a new instance of NormalizerSequence.
   * @param {Object} config The configuration object.
   * @param {Object[]} config.normalizers An array of Normalizer configuration objects.
   */
    constructor(config) {
        super(config);
        this.normalizers = config.normalizers.map(x => Normalizer.fromConfig(x));
    }
    /**
    * Apply a sequence of Normalizers to the input text.
    * @param {string} text The text to normalize.
    * @returns {string} The normalized text.
    */
    normalize(text) {
        return this.normalizers.reduce((t, normalizer) => {
            return normalizer.normalize(t);
        }, text);
    }
}

/**
 * A class representing a normalizer used in BERT tokenization.
 * @extends Normalizer
 */
class BertNormalizer extends Normalizer {
    /**
     * Adds whitespace around any CJK (Chinese, Japanese, or Korean) character in the input text.
     *
     * @param {string} text The input text to tokenize.
     * @returns {string} The tokenized text with whitespace added around CJK characters.
     */
    _tokenize_chinese_chars(text) {
        /* Adds whitespace around any CJK character. */
        let output = [];
        for (let i = 0; i < text.length; ++i) {
            let char = text[i];
            let cp = char.charCodeAt(0);
            if (this._is_chinese_char(cp)) {
                output.push(" ");
                output.push(char);
                output.push(" ");
            } else {
                output.push(char);
            }
        }
        return output.join("");
    }

    /**
     * Checks whether the given Unicode codepoint represents a CJK (Chinese, Japanese, or Korean) character.
     *
     * A "chinese character" is defined as anything in the CJK Unicode block:
     * https://en.wikipedia.org/wiki/CJK_Unified_Ideographs_(Unicode_block)
     *
     * Note that the CJK Unicode block is NOT all Japanese and Korean characters, despite its name.
     * The modern Korean Hangul alphabet is a different block, as is Japanese Hiragana and Katakana.
     * Those alphabets are used to write space-separated words, so they are not treated specially
     * and are handled like all other languages.
     *
     * @param {number} cp The Unicode codepoint to check.
     * @returns {boolean} True if the codepoint represents a CJK character, false otherwise.
     */
    _is_chinese_char(cp) {
        return (
            (cp >= 0x4E00 && cp <= 0x9FFF)
            || (cp >= 0x3400 && cp <= 0x4DBF)
            || (cp >= 0x20000 && cp <= 0x2A6DF)
            || (cp >= 0x2A700 && cp <= 0x2B73F)
            || (cp >= 0x2B740 && cp <= 0x2B81F)
            || (cp >= 0x2B820 && cp <= 0x2CEAF)
            || (cp >= 0xF900 && cp <= 0xFAFF)
            || (cp >= 0x2F800 && cp <= 0x2FA1F)
        )
    }
    /**
     * Strips accents from the given text.
     * @param {string} text The text to strip accents from.
     * @returns {string} The text with accents removed.
     */
    stripAccents(text) {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    /**
     * Normalizes the given text based on the configuration.
     * @param {string} text The text to normalize.
     * @returns {string} The normalized text.
     */
    normalize(text) {
        // TODO use rest of config
        // config.clean_text,
        // config.handle_chinese_chars,
        // config.strip_accents,
        // config.lowercase,

        if (this.config.handle_chinese_chars) {
            text = this._tokenize_chinese_chars(text);
        }

        if (this.config.lowercase) {
            text = text.toLowerCase();

            if (this.config.strip_accents !== false) {
                text = this.stripAccents(text);
            }
        } else if (this.config.strip_accents) {
            text = this.stripAccents(text);
        }

        return text;
    }
}

/**
 * A callable class representing a pre-tokenizer used in tokenization. Subclasses
 * should implement the `pre_tokenize_text` method to define the specific pre-tokenization logic.
 * @extends Callable
 */
class PreTokenizer extends Callable {
    /**
   * Factory method that returns an instance of a subclass of `PreTokenizer` based on the provided configuration.
   *
   * @static
   * @param {Object} config A configuration object for the pre-tokenizer.
   * @returns {PreTokenizer} An instance of a subclass of `PreTokenizer`.
   * @throws {Error} If the provided configuration object does not correspond to any known pre-tokenizer.
   */
    static fromConfig(config) {
        if (config === null) return null;

        switch (config.type) {
            case 'BertPreTokenizer':
                return new BertPreTokenizer(config);
            case 'Sequence':
                return new PreTokenizerSequence(config);
            case 'WhitespaceSplit':
                return new WhitespaceSplit(config);
            case 'Metaspace':
                return new MetaspacePreTokenizer(config);

            case 'ByteLevel':
                return new ByteLevelPreTokenizer(config);
            case 'Split':
                return new SplitPreTokenizer(config);
            case 'Punctuation':
                return new PunctuationPreTokenizer(config);
            case 'Digits':
                return new DigitsPreTokenizer(config);
            default:
                throw new Error(`Unknown PreTokenizer type: ${config.type}`);
        }
    }

    /**
   * Method that should be implemented by subclasses to define the specific pre-tokenization logic.
   *
   * @abstract
   * @param {string} text The text to pre-tokenize.
   * @returns {string[]} The pre-tokenized text.
   * @throws {Error} If the method is not implemented in the subclass.
   */
    pre_tokenize_text(text) {
        throw Error("pre_tokenize_text should be implemented in subclass.")
    }

    /**
     * Tokenizes the given text into pre-tokens.
     * @param {string|string[]} text The text or array of texts to pre-tokenize.
     * @returns {string[]} An array of pre-tokens.
     */
    pre_tokenize(text) {
        let result = [];
        if (Array.isArray(text)) {
            result = text.map(x => this.pre_tokenize_text(x))
        } else {
            result = this.pre_tokenize_text(text);
        }
        return result.flat();
    }

    /**
     * Alias for {@link PreTokenizer#pre_tokenize}.
     * @param {string|string[]} text The text or array of texts to pre-tokenize.
     * @returns {string[]} An array of pre-tokens.
     */
    _call(text) {
        return this.pre_tokenize(text);
    }
}

/**
 * @extends PreTokenizer
 */
class BertPreTokenizer extends PreTokenizer {
    /**
     * A PreTokenizer that splits text into wordpieces using a basic tokenization scheme
     * similar to that used in the original implementation of BERT.
     * 
     * @param {Object} config The configuration object.
     */
    constructor(config) {
        super();
        // Construct a pattern which matches the rust implementation:
        // https://github.com/huggingface/tokenizers/blob/b4fcc9ce6e4ad5806e82826f816acfdfdc4fcc67/tokenizers/src/pre_tokenizers/bert.rs#L11
        // Equivalent to removing whitespace and splitting on punctuation (both \p{P} and other ascii characters)
        this.pattern = new RegExp(`[^\\s${PUNCTUATION_REGEX}]+|[${PUNCTUATION_REGEX}]`, 'gu');
    }
    /**
     * Tokenizes a single text using the BERT pre-tokenization scheme.
     * 
     * @param {string} text The text to tokenize.
     * @returns {string[]} An array of tokens.
     */
    pre_tokenize_text(text) {
        return text.trim().match(this.pattern) || [];
    }
}

/**
 * A pre-tokenizer that splits text into Byte-Pair-Encoding (BPE) subwords.
 * @extends PreTokenizer
 */
class ByteLevelPreTokenizer extends PreTokenizer {
    /**
     * Creates a new instance of the `ByteLevelPreTokenizer` class.
     * @param {Object} config The configuration object.
     */
    constructor(config) {
        super();
        this.config = config;

        /**
         * @type {boolean} Whether to add a leading space to the first word.
         * This allows to treat the leading word just as any other word.
         */
        this.add_prefix_space = this.config.add_prefix_space;

        /**
         * @type {boolean} Whether the post processing step should trim offsets
         * to avoid including whitespaces.
         * @todo Use this in the pretokenization step.
         */
        this.trim_offsets = this.config.trim_offsets;

        /**
         * @type {boolean} Whether to use the standard GPT2 regex for whitespace splitting.
         * Set it to False if you want to use your own splitting. Defaults to true.
         */
        this.use_regex = this.config.use_regex ?? true;
        this.pattern = /'s|'t|'re|'ve|'m|'ll|'d| ?\p{L}+| ?\p{N}+| ?[^\s\p{L}\p{N}]+|\s+(?!\S)|\s+/gu;

        this.byte_encoder = BYTES_TO_UNICODE;
        this.text_encoder = new TextEncoder();
    }

    /**
     * Tokenizes a single piece of text using byte-level tokenization.
     * @param {string} text The text to tokenize.
     * @returns {string[]} An array of tokens.
     */
    pre_tokenize_text(text) {
        // Split on whitespace and punctuation
        let tokens = this.use_regex ? (text.match(this.pattern) || []) : [text];

        return tokens.map(token => {
            if (this.add_prefix_space && !token.startsWith(' ')) {
                token = ' ' + token;
            }

            // Maps all our bytes to unicode strings, avoiding control tokens of the BPE (spaces in our case)
            token = Array.from(this.text_encoder.encode(token), byte => this.byte_encoder[byte]).join('');

            return token;
        });
    }
}

/**
 * @typedef {'removed'|'isolated'|'mergedWithPrevious'|'mergedWithNext'|'contiguous'} SplitDelimiterBehavior
 */

/**
 * Splits text using a given pattern.
 * @extends PreTokenizer
 */
class SplitPreTokenizer extends PreTokenizer {
    /**
     * @param {Object} config The configuration options for the pre-tokenizer.
     * @param {Object} config.pattern The pattern used to split the text. Can be a string or a regex object.
     * @param {string|undefined} config.pattern.String The string to use for splitting. Only defined if the pattern is a string.
     * @param {string|undefined} config.pattern.Regex The regex to use for splitting. Only defined if the pattern is a regex.
     * @param {SplitDelimiterBehavior} config.behavior The behavior to use when splitting.
     * @param {boolean} config.invert Whether to split (invert=false) or match (invert=true) the pattern.
     */
    constructor(config) {
        super();
        this.config = config;
        // TODO support all behaviours (config.behavior)

        this.pattern = createPattern(this.config.pattern, this.config.invert);
    }

    /**
     * Tokenizes text by splitting it using the given pattern.
     * @param {string} text The text to tokenize.
     * @returns {string[]} An array of tokens.
     */
    pre_tokenize_text(text) {
        if (this.pattern === null) {
            return [];
        }

        if (this.config.invert) {
            return text.match(this.pattern) || [];
        } else {
            return text.split(this.pattern).filter(x => x);
        }
    }
}

/**
 * Splits text based on punctuation.
 * @extends PreTokenizer
 */
class PunctuationPreTokenizer extends PreTokenizer {
    /**
     * @param {Object} config The configuration options for the pre-tokenizer.
     * @param {SplitDelimiterBehavior} config.behavior The behavior to use when splitting.
     */
    constructor(config) {
        super();
        this.config = config;
        this.pattern = new RegExp(`[^${PUNCTUATION_REGEX}]+|[${PUNCTUATION_REGEX}]+`, 'gu');
    }

    /**
     * Tokenizes text by splitting it using the given pattern.
     * @param {string} text The text to tokenize.
     * @returns {string[]} An array of tokens.
     */
    pre_tokenize_text(text) {
        return text.match(this.pattern) || [];
    }
}


/**
 * Splits text based on digits.
 * @extends PreTokenizer
 */
class DigitsPreTokenizer extends PreTokenizer {
    /**
     * @param {Object} config The configuration options for the pre-tokenizer.
     * @param {boolean} config.individual_digits Whether to split on individual digits.
     */
    constructor(config) {
        super();
        this.config = config;

        // Construct a pattern which matches the rust implementation:
        const digit_pattern = `[^\\d]+|\\d${this.config.individual_digits ? '' : '+'}`;
        this.pattern = new RegExp(digit_pattern, 'gu');
    }

    /**
     * Tokenizes text by splitting it using the given pattern.
     * @param {string} text The text to tokenize.
     * @returns {string[]} An array of tokens.
     */
    pre_tokenize_text(text) {
        return text.match(this.pattern) || [];
    }
}

/**
 * @extends Callable
 */
class PostProcessor extends Callable {

    /**
     * @param {Object} config The configuration for the post-processor.
     */
    constructor(config) {
        super();
        this.config = config;
    }

    /**
     * Factory method to create a PostProcessor object from a configuration object.
     *
     * @param {Object} config Configuration object representing a PostProcessor.
     * @returns {PostProcessor} A PostProcessor object created from the given configuration.
     * @throws {Error} If an unknown PostProcessor type is encountered.
     */
    static fromConfig(config) {
        if (config === null) return null;
        switch (config.type) {
            case 'TemplateProcessing':
                return new TemplateProcessing(config);

            case 'ByteLevel':
                return new ByteLevelPostProcessor(config);

            case 'RobertaProcessing':
                return new RobertaProcessing(config);
            case 'BertProcessing':
                return new BertProcessing(config);

            default:
                throw new Error(`Unknown PostProcessor type: ${config.type}`);
        }
    }

    /**
     * Method to be implemented in subclass to apply post-processing on the given tokens.
     *
     * @param {Array} tokens The input tokens to be post-processed.
     * @param {...*} args Additional arguments required by the post-processing logic.
     * @returns {Array} The post-processed tokens.
     * @throws {Error} If the method is not implemented in subclass.
     */
    post_process(tokens, ...args) {
        throw Error("post_process should be implemented in subclass.")
    }

    /**
     * Alias for {@link PostProcessor#post_process}.
     * @param {Array} tokens The text or array of texts to post-process.
     * @param {...*} args Additional arguments required by the post-processing logic.
     * @returns {Array} An array of post-processed tokens.
     */
    _call(tokens, ...args) {
        return this.post_process(tokens, ...args);
    }
}

/**
 * A post-processor that adds special tokens to the beginning and end of the input.
 */
class BertProcessing extends PostProcessor {
    /**
     * @param {Object} config The configuration for the post-processor.
     * @param {string[]} config.cls The special tokens to add to the beginning of the input.
     * @param {string[]} config.sep The special tokens to add to the end of the input.
     */
    constructor(config) {
        super(config);
        // TODO use all of config: add_prefix_space, trim_offsets

        this.cls = config.cls[0];
        this.sep = config.sep[0];
    }

    /**
     * Adds the special tokens to the beginning and end of the input.
     * @param {string[]} tokens The input tokens.
     * @param {string[]|null} tokens_pair An optional second set of input tokens.
     * @returns {string[]} The input tokens with the special tokens added to the beginning and end.
     */
    post_process(tokens, tokens_pair = null) {
        tokens = mergeArrays([this.cls], tokens, [this.sep]);

        // NOTE: It is intended to add 2 EOS tokens after the first set of tokens
        // https://github.com/huggingface/tokenizers/issues/983
        if (tokens_pair !== null) {
            tokens = mergeArrays(tokens, [this.sep], tokens_pair, [this.sep]);
        }
        return tokens;
    }
}
class RobertaProcessing extends BertProcessing { } // NOTE: extends BertProcessing

/**
 * Post processor that replaces special tokens in a template with actual tokens.
 * @extends PostProcessor
 */
class TemplateProcessing extends PostProcessor {
    /**
     * Creates a new instance of `TemplateProcessing`.
     * @param {Object} config The configuration options for the post processor.
     * @param {Array} config.single The template for a single sequence of tokens.
     * @param {Array} config.pair The template for a pair of sequences of tokens.
     */
    constructor(config) {
        super(config);

        this.single = config.single;
        this.pair = config.pair;
    }

    /**
     * Replaces special tokens in the template with actual tokens.
     * @param {Array} tokens The list of tokens for the first sequence.
     * @param {Array} [tokens_pair=null] The list of tokens for the second sequence (optional).
     * @returns {Array} The list of tokens with the special tokens replaced with actual tokens.
     */
    post_process(tokens, tokens_pair = null) {
        let type = tokens_pair === null ? this.single : this.pair

        let toReturn = [];
        for (let item of type) {
            if ('SpecialToken' in item) {
                toReturn.push(item.SpecialToken.id);

            } else if ('Sequence' in item) {
                if (item.Sequence.id === 'A') {
                    toReturn = mergeArrays(toReturn, tokens);

                } else if (item.Sequence.id === 'B') {
                    toReturn = mergeArrays(toReturn, tokens_pair);
                }
            }
        }
        return toReturn;
    }
}

/**
 * A PostProcessor that returns the given tokens as is.
 * @extends PostProcessor
 */
class ByteLevelPostProcessor extends PostProcessor {
    /**
     * Post process the given tokens.
     * @param {string[]} tokens The tokens to be post processed.
     * @returns {string[]} The post processed tokens.
     */
    post_process(tokens) {
        return tokens;
    }
}

/**
 * The base class for token decoders.
 * @extends Callable
 */
class Decoder extends Callable {

    /**
    * Creates an instance of `Decoder`.
    *
    * @param {Object} config The configuration object.
    */
    constructor(config) {
        super();
        this.config = config;

        this.added_tokens = [];
        this.end_of_word_suffix = null;
        this.trim_offsets = config.trim_offsets;
    }

    /**
   * Creates a decoder instance based on the provided configuration.
   *
   * @param {Object} config The configuration object.
   * @returns {Decoder} A decoder instance.
   * @throws {Error} If an unknown decoder type is provided.
   */
    static fromConfig(config) {
        switch (config.type) {
            case 'WordPiece':
                return new WordPieceDecoder(config);
            case 'Metaspace':
                return new MetaspaceDecoder(config);
            case 'ByteLevel':
                return new ByteLevelDecoder(config);

            case 'Replace':
                return new ReplaceDecoder(config);
            case 'ByteFallback':
                return new ByteFallback(config);
            case 'Fuse':
                return new FuseDecoder(config);
            case 'Strip':
                return new StripDecoder(config);

            case 'Sequence':
                return new DecoderSequence(config);

            case 'CTC':
                return new CTCDecoder(config);
            case 'BPEDecoder':
                return new BPEDecoder(config);
            default:
                throw new Error(`Unknown Decoder type: ${config.type}`);
        }
    }

    /**
    * Calls the `decode` method.
    *
    * @param {string[]} tokens The list of tokens.
    * @returns {string} The decoded string.
    */
    _call(tokens) {
        return this.decode(tokens);
    }

    /**
    * Decodes a list of tokens.
    * @param {string[]} tokens The list of tokens.
    * @returns {string} The decoded string.
    */
    decode(tokens) {
        return this.decode_chain(tokens).join('');
    }

    /**
     * Apply the decoder to a list of tokens.
     * 
     * @param {string[]} tokens The list of tokens.
     * @returns {string[]} The decoded list of tokens.
     * @throws {Error} If the `decode_chain` method is not implemented in the subclass.
     */
    decode_chain(tokens) {
        throw Error("`decode_chain` should be implemented in subclass.")
    }

}

class ReplaceDecoder extends Decoder {

    /** @type {Decoder['decode_chain']} */
    decode_chain(tokens) {
        let pattern = createPattern(this.config.pattern);
        if (pattern === null) {
            return tokens;
        }

        return tokens.map(token => token.replaceAll(pattern, this.config.content))
    }
}


class ByteFallback extends Decoder {
    constructor(config) {
        super(config);

        this.text_decoder = new TextDecoder();
    }

    /** @type {Decoder['decode_chain']} */
    decode_chain(tokens) {

        let new_tokens = [];
        let previous_byte_tokens = [];

        for (let token of tokens) {
            let bytes = null;
            if (token.length === 6 && token.startsWith('<0x') && token.endsWith('>')) {
                let byte = parseInt(token.slice(3, 5), 16);
                if (!isNaN(byte)) {
                    bytes = byte;
                }
            }
            if (bytes !== null) {
                previous_byte_tokens.push(bytes);
            } else {
                if (previous_byte_tokens.length > 0) {
                    let string = this.text_decoder.decode(Uint8Array.from(previous_byte_tokens));
                    new_tokens.push(string);
                    previous_byte_tokens = [];
                }
                new_tokens.push(token);
            }
        }
        if (previous_byte_tokens.length > 0) {
            let string = this.text_decoder.decode(Uint8Array.from(previous_byte_tokens));
            new_tokens.push(string);
            previous_byte_tokens = [];
        }

        return new_tokens;
    }
}

/**
 * Fuse simply fuses all tokens into one big string.
 * It's usually the last decoding step anyway, but this decoder
 * exists incase some decoders need to happen after that step
 */
class FuseDecoder extends Decoder {

    /** @type {Decoder['decode_chain']} */
    decode_chain(tokens) {
        return [tokens.join('')];
    }
}


class StripDecoder extends Decoder {
    constructor(config) {
        super(config);

        this.content = this.config.content;
        this.start = this.config.start;
        this.stop = this.config.stop;
    }

    /** @type {Decoder['decode_chain']} */
    decode_chain(tokens) {
        return tokens.map(token => {
            let start_cut = 0;
            for (let i = 0; i < this.start; ++i) {
                if (token[i] === this.content) {
                    start_cut = i + 1;
                    continue;
                } else {
                    break;
                }
            }

            let stop_cut = token.length;
            for (let i = 0; i < this.stop; ++i) {
                const index = token.length - i - 1;
                if (token[index] === this.content) {
                    stop_cut = index;
                    continue;
                } else {
                    break;
                }
            }

            return token.slice(start_cut, stop_cut)
        });
    }
}

/**
 * A decoder that decodes a list of WordPiece tokens into a single string.
 * @extends Decoder
 */
class WordPieceDecoder extends Decoder {

    /**
     * Creates a new instance of WordPieceDecoder.
     * @param {Object} config The configuration object.
     * @param {string} config.prefix The prefix used for WordPiece encoding.
     * @param {boolean} config.cleanup Whether to cleanup the decoded string.
     */
    constructor(config) {
        super(config);
        this.cleanup = config.cleanup;
    }

    /** @type {Decoder['decode_chain']} */
    decode_chain(tokens) {
        return tokens.map((token, i) => {
            if (i !== 0) {
                if (token.startsWith(this.config.prefix)) {
                    // NOTE: .replace() is intended; only replace first occurrence
                    token = token.replace(this.config.prefix, '');
                } else {
                    token = ' ' + token;
                }
            }
            if (this.cleanup) {
                token = clean_up_tokenization(token)
            }

            return token;
        });
    }
}

/**
 * Byte-level decoder for tokenization output. Inherits from the `Decoder` class.
 * @extends Decoder
 */
class ByteLevelDecoder extends Decoder {

    /**
     * Create a `ByteLevelDecoder` object.
     * @param {Object} config Configuration object.
     */
    constructor(config) {
        super(config);

        this.byte_decoder = UNICODE_TO_BYTES;
        this.text_decoder = new TextDecoder("utf-8", {
            fatal: false,
            ignoreBOM: true,
        });

        this.end_of_word_suffix = null;
    }

    /**
     * Convert an array of tokens to string by decoding each byte.
     * @param {string[]} tokens Array of tokens to be decoded.
     * @returns {string} The decoded string.
     */
    convert_tokens_to_string(tokens) {
        let text = tokens.join('');

        let byteArray = new Uint8Array([...text].map(c => this.byte_decoder[c]));
        let decoded_text = this.text_decoder.decode(byteArray);
        return decoded_text;
    }

    /** @type {Decoder['decode_chain']} */
    decode_chain(tokens) {
        // TODO move to base class (like HF)
        // tokens === filtered_tokens

        // To avoid mixing byte-level and unicode for byte-level BPT
        // we need to build string separately for added tokens and byte-level tokens
        // cf. https://github.com/huggingface/transformers/issues/1133
        let sub_texts = [];
        let current_sub_text = [];
        for (let token of tokens) {
            // tokens sent here are already filtered, so we don't need to do this
            // if (skip_special_tokens && this.all_special_ids.includes(token)) {
            //     continue;
            // }

            if (this.added_tokens.includes(token)) {
                if (current_sub_text.length > 0) {
                    sub_texts.push(this.convert_tokens_to_string(current_sub_text));
                    current_sub_text = [];
                }
                sub_texts.push(token);
            } else {
                current_sub_text.push(token);
            }
        }
        if (current_sub_text.length > 0) {
            sub_texts.push(this.convert_tokens_to_string(current_sub_text));
        }

        // TODO add spaces_between_special_tokens and clean_up_tokenization_spaces options

        return sub_texts;
    }
}

/**
 * The CTC (Connectionist Temporal Classification) decoder.
 * See https://github.com/huggingface/tokenizers/blob/bb38f390a61883fc2f29d659af696f428d1cda6b/tokenizers/src/decoders/ctc.rs
 */
class CTCDecoder extends Decoder {

    constructor(config) {
        super(config);

        this.pad_token = this.config.pad_token;
        this.word_delimiter_token = this.config.word_delimiter_token;
        this.cleanup = this.config.cleanup;
    }
    /**
     * Converts a connectionist-temporal-classification (CTC) output tokens into a single string.
     * @param {string[]} tokens Array of tokens to be decoded.
     * @returns {string} The decoded string.
     */
    convert_tokens_to_string(tokens) {
        if (tokens.length === 0) return '';

        // group same tokens into non-repeating tokens in CTC style decoding
        let grouped_tokens = [tokens[0]];
        for (let i = 1; i < tokens.length; ++i) {
            if (tokens[i] !== grouped_tokens.at(-1)) {
                grouped_tokens.push(tokens[i]);
            }
        }

        // filter self.pad_token which is used as CTC-blank token
        let filtered_tokens = grouped_tokens.filter(token => token !== this.pad_token);

        let text = filtered_tokens.join('');
        if (this.cleanup) {
            // cleanup and replace delimiter token
            text = clean_up_tokenization(text)
                .replaceAll(this.word_delimiter_token, ' ')
                .trim();
        }
        return text;
    }


    /** @type {Decoder['decode_chain']} */
    decode_chain(tokens) {
        return [this.convert_tokens_to_string(tokens)];
    }
}

/**
 * Apply a sequence of decoders.
 * @extends Decoder
 */
class DecoderSequence extends Decoder {

    /**
     * Creates a new instance of DecoderSequence.
     * @param {Object} config The configuration object.
     * @param {Decoder[]} config.decoders The list of decoders to apply.
     */
    constructor(config) {
        super(config);
        this.decoders = config.decoders.map(x => Decoder.fromConfig(x));
    }

    /** @type {Decoder['decode_chain']} */
    decode_chain(tokens) {
        // Use reduce to apply each decoder to the tokens
        return this.decoders.reduce((toks, decoder) => {
            return decoder.decode_chain(toks);
        }, tokens);
    }

}

class BPEDecoder extends Decoder {
    constructor(config) {
        super(config);

        this.suffix = this.config.suffix;
    }
    /** @type {Decoder['decode_chain']} */
    decode_chain(tokens) {
        return tokens.map((token, i) => {
            return token.replaceAll(this.suffix, (i === tokens.length - 1) ? '' : ' ')
        });
    }
}


/**
 * This PreTokenizer replaces spaces with the given replacement character, adds a prefix space if requested,
 * and returns a list of tokens.
 * @extends PreTokenizer
 */
class MetaspacePreTokenizer extends PreTokenizer {
    /**
     * @param {Object} config The configuration object for the MetaspacePreTokenizer.
     * @param {boolean} config.add_prefix_space Whether to add a prefix space to the first token.
     * @param {string} config.replacement The character to replace spaces with.
     * @param {string} [config.str_rep=config.replacement] An optional string representation of the replacement character.
     */
    constructor(config) {
        super();

        this.addPrefixSpace = config.add_prefix_space;
        this.replacement = config.replacement;
        this.strRep = config.str_rep || this.replacement;
    }

    /**
     * This method takes a list of normalized tokens, replaces spaces with the replacement character,
     * adds a prefix space if requested, and returns a new list of tokens.
     * @param {string[]|string} normalizedTokens The list of normalized tokens to pre-tokenize.
     * @returns {string[]} A new list of pre-tokenized tokens.
     */
    pre_tokenize(normalizedTokens) {
        if (typeof normalizedTokens === 'string') {
            // Metaspace acts on a list of tokens. If passing in a string, first split on whitespace
            // NOTE: For some reason, metaspace includes trailing whitespace, so we only trim leading whitespace.
            // See: https://github.com/huggingface/tokenizers/issues/1250
            normalizedTokens = normalizedTokens.trimStart().split(/\s+/);
        }

        const result = [];
        for (let token of normalizedTokens) {
            let normalized = token.replaceAll(' ', this.strRep);
            if (this.addPrefixSpace && !normalized.startsWith(this.replacement)) {
                normalized = this.strRep + normalized;
            }
            result.push(normalized);
        }
        return result;
    }
}

/**
 * MetaspaceDecoder class extends the Decoder class and decodes Metaspace tokenization.
 * @extends Decoder
 */
class MetaspaceDecoder extends Decoder {
    /**
     * Constructs a new MetaspaceDecoder object.
     * @param {Object} config The configuration object for the MetaspaceDecoder.
     * @param {boolean} config.add_prefix_space Whether to add a prefix space to the decoded string.
     * @param {string} config.replacement The string to replace spaces with.
     */
    constructor(config) {
        super(config);

        this.addPrefixSpace = config.add_prefix_space;
        this.replacement = config.replacement;
    }

    /** @type {Decoder['decode_chain']} */
    decode_chain(tokens) {
        let result = [];
        for (let i = 0; i < tokens.length; ++i) {
            let normalized = tokens[i].replaceAll(this.replacement, ' ');
            if (this.addPrefixSpace && i == 0 && normalized.startsWith(' ')) {
                normalized = normalized.substring(1);
            }
            result.push(normalized);
        }
        return result;
    }
}

/**
 * A normalizer that applies a precompiled charsmap.
 * This is useful for applying complex normalizations in C++ and exposing them to JavaScript.
 * @extends Normalizer
 * @param {Object} config The configuration object for the Precompiled normalizer.
 * @param {Object} config.precompiled_charsmap The precompiled charsmap object.
 */
class Precompiled extends Normalizer {
    /**
     * Create a new instance of Precompiled normalizer.
     * @param {Object} config The configuration object.
     * @param {any} config.precompiled_charsmap Precompiled chars mapping.
     */
    constructor(config) {
        super(config);
        this.charsmap = config.precompiled_charsmap;
    }

    /**
     * Normalizes the given text by applying the precompiled charsmap.
     * @param {string} text The text to normalize.
     * @returns {string} The normalized text.
     */
    normalize(text) {
        // As stated in the sentencepiece normalization docs (https://github.com/google/sentencepiece/blob/master/doc/normalization.md#use-pre-defined-normalization-rule),
        // there are 5 pre-defined normalization rules:
        //  1. nmt_nfkc: NFKC normalization with some additional normalization around spaces. (default)
        //  2. nfkc: original NFKC normalization.
        //  3. nmt_nfkc_cf: nmt_nfkc + Unicode case folding (mostly lower casing)
        //  4. nfkc_cf: nfkc + Unicode case folding.
        //  5. identity: no normalization
        // 
        // For now, we only implement the default (nmt_nfkc).
        // See https://raw.githubusercontent.com/google/sentencepiece/master/data/nmt_nfkc.tsv for the full list of rules.
        // TODO: detect when a different `this.charsmap` is used.

        text = text.replace(/[\u0001-\u0008\u000B\u000E-\u001F\u007F\u008F\u009F]/gm, ''); // Remove control characters
        text = text.replace(/[\u0009\u000A\u000C\u000D\u1680\u200B\u200C\u200E\u200F\u2028\u2029\u2581\uFEFF\uFFFD]/gm, '\u0020'); // Replace certain characters with a space

        if (text.includes('\uFF5E')) {
            // To match the sentencepiece implementation 100%, we must handle a very strange edge-case.
            // For some reason, the "Fullwidth Tilde" character (\uFF5E) should not be converted to the standard Tilde character (\u007E).
            // However, NFKC normalization does do this conversion. As a result, we split the string on the Fullwidth Tilde character,
            // perform NFKC normalization on each substring, and then join them back together with the Fullwidth Tilde character.
            const parts = text.split('\uFF5E');
            text = parts.map(part => part.normalize('NFKC')).join('\uFF5E');
        } else {
            text = text.normalize('NFKC');
        }

        return text;
    }
}

/**
 * A pre-tokenizer that applies a sequence of pre-tokenizers to the input text.
 * @extends PreTokenizer
 */
class PreTokenizerSequence extends PreTokenizer {
    /**
     * Creates an instance of PreTokenizerSequence.
     * @param {Object} config The configuration object for the pre-tokenizer sequence.
     * @param {Object[]} config.pretokenizers An array of pre-tokenizer configurations.
     */
    constructor(config) {
        super();
        this.tokenizers = config.pretokenizers.map(x => PreTokenizer.fromConfig(x));
    }

    /**
     * Applies each pre-tokenizer in the sequence to the input text in turn.
     * @param {string|string[]} text The text(s) to pre-tokenize.
     * @returns {string[]} The pre-tokenized text.
     */
    pre_tokenize_text(text) {
        if (typeof text === 'string') {
            text = [text];
        }
        // Use reduce to apply each tokenizer to the text
        return this.tokenizers.reduce((preTokenizedText, tokenizer) => {
            return tokenizer.pre_tokenize(preTokenizedText);
        }, text);
    }
}

/**
 * Splits a string of text by whitespace characters into individual tokens.
 * @extends PreTokenizer
 */
class WhitespaceSplit extends PreTokenizer {
    /**
     * Creates an instance of WhitespaceSplit.
     * @param {Object} config The configuration object for the pre-tokenizer sequence.
     */
    constructor(config) {
        super();
    }
    /**
     * Pre-tokenizes the input text by splitting it on whitespace characters.
     * @param {string} text The text to be pre-tokenized.
     * @returns {string[]} An array of tokens produced by splitting the input text on whitespace.
     */
    pre_tokenize_text(text) {
        return whitespace_split(text);
    }
}

class PreTrainedTokenizer extends Callable {
    /**
     * Create a new PreTrainedTokenizer instance.
     * @param {Object} tokenizerJSON The JSON of the tokenizer.
     * @param {Object} tokenizerConfig The config of the tokenizer.
     */
    constructor(tokenizerJSON, tokenizerConfig) {
        super();

        // Construct parts of the tokenizer from the JSON
        this.normalizer = Normalizer.fromConfig(tokenizerJSON.normalizer);
        this.pre_tokenizer = PreTokenizer.fromConfig(tokenizerJSON.pre_tokenizer);

        this.model = TokenizerModel.fromConfig(tokenizerJSON.model, tokenizerConfig);
        this.post_processor = PostProcessor.fromConfig(tokenizerJSON.post_processor);

        // TODO: maybe, allow this to be null; in which case, we use model as decoder too?
        this.decoder = Decoder.fromConfig(tokenizerJSON.decoder);


        // Another slight hack to add `end_of_word_suffix` (if present) to the decoder
        // This is needed for cases where BPE model and ByteLevel decoder are used
        // For more information, see https://github.com/xenova/transformers.js/issues/74
        // TODO: save this to the decoder when exporting?
        this.decoder.end_of_word_suffix = this.model.end_of_word_suffix;

        // Add added_tokens to model
        this.special_tokens = [];
        this.all_special_ids = [];
        this.added_tokens = [];
        for (let addedToken of tokenizerJSON.added_tokens) {
            let id = addedToken.id;
            let content = addedToken.content;

            this.added_tokens.push(content);

            this.model.tokens_to_ids.set(content, id);
            this.model.vocab[id] = content;

            if (addedToken.special) {
                this.special_tokens.push(content);
                this.all_special_ids.push(id);
            }
        }

        // Update additional_special_tokens
        this.special_tokens.push(...(tokenizerConfig.additional_special_tokens ?? []));
        this.special_tokens = [...new Set(this.special_tokens)]; // Remove duplicates

        // Slight hack, but it prevents code duplication:
        this.decoder.added_tokens = this.added_tokens;

        this.added_tokens_regex = this.added_tokens.length > 0 ? new RegExp(
            '(' + this.added_tokens.map(escapeRegExp).join('|') + ')'
        ) : null;

        // Set mask token if present (otherwise will be undefined, which is fine)
        this.mask_token = this.getToken(tokenizerConfig, 'mask_token');
        this.mask_token_id = this.model.tokens_to_ids.get(this.mask_token);

        this.pad_token = this.getToken(tokenizerConfig, 'pad_token', 'eos_token');
        this.pad_token_id = this.model.tokens_to_ids.get(this.pad_token);

        this.sep_token = this.getToken(tokenizerConfig, 'sep_token');
        this.sep_token_id = this.model.tokens_to_ids.get(this.sep_token);

        this.model_max_length = tokenizerConfig.model_max_length;

        /** @type {boolean} Whether or not to strip the text when tokenizing (removing excess spaces before and after the string). */
        this.remove_space = tokenizerConfig.remove_space;

        this.clean_up_tokenization_spaces = tokenizerConfig.clean_up_tokenization_spaces ?? true;
        this.do_lowercase_and_remove_accent = tokenizerConfig.do_lowercase_and_remove_accent ?? false;

        // TODO allow user to change this
        this.padding_side = 'right';
    }

    /**
     * Returns the value of the first matching key in the tokenizer config object.
     * @param {...string} keys One or more keys to search for in the tokenizer config object.
     * @returns {string|null} The value associated with the first matching key, or null if no match is found.
     * @throws {Error} If an object is found for a matching key and its __type property is not "AddedToken".
     */
    getToken(tokenizerConfig, ...keys) {
        for (let key of keys) {
            let item = tokenizerConfig[key];

            if (!item) continue;

            if (typeof item === 'object') {
                if (item.__type === 'AddedToken') {
                    return item.content;
                } else {
                    throw Error(`Unknown token: ${item}`);
                }
            } else {
                return item;
            }
        }
        return null;
    }

    /**
     * Loads a pre-trained tokenizer from the given `pretrained_model_name_or_path`. 
     * 
     * @param {string} pretrained_model_name_or_path The path to the pre-trained tokenizer.
     * @param {PretrainedOptions} options Additional options for loading the tokenizer.
     * 
     * @throws {Error} Throws an error if the tokenizer.json or tokenizer_config.json files are not found in the `pretrained_model_name_or_path`.
     * @returns {Promise<PreTrainedTokenizer>} A new instance of the `PreTrainedTokenizer` class.
     */
    static async from_pretrained(pretrained_model_name_or_path, {
        progress_callback = null,
        config = null,
        cache_dir = null,
        local_files_only = false,
        revision = 'main',
    } = {}) {

        let info = await loadTokenizer(pretrained_model_name_or_path, {
            progress_callback,
            config,
            cache_dir,
            local_files_only,
            revision,
        })

        // @ts-ignore
        return new this(...info);
    }

    /**
     * This function can be overridden by a subclass to apply additional preprocessing
     * to a model's input data.
     * @param {Object} inputs An object containing input data as properties.
     * @returns {Object} The modified inputs object.
     */
    prepare_model_inputs(inputs) {
        return inputs;
    }

    /**
     * Encode/tokenize the given text(s).
     * @param {string|string[]} text The text to tokenize.
     * @param {Object} options An optional object containing the following properties:
     * @param {string|string[]} [options.text_pair=null] Optional second sequence to be encoded. If set, must be the same type as text.
     * @param {boolean} [options.padding=false] Whether to pad the input sequences.
     * @param {boolean} [options.truncation=null] Whether to truncate the input sequences.
     * @param {number} [options.max_length=null] Maximum length of the returned list and optionally padding length.
     * @param {boolean} [options.return_tensor=true] Whether to return the results as Tensors or arrays.
     * @returns {{ input_ids: number[]|number[][]|Tensor, attention_mask: any[]|Tensor }} Object to be passed to the model.
     */
    _call(
        // Required positional arguments
        text,

        // Optional keyword arguments
        {
            text_pair = null,
            // add_special_tokens = true, // TODO
            padding = false,
            truncation = null,
            max_length = null,
            return_tensor = true, // Different to HF
        } = {},
    ) {

        /** @type {number[]|number[][]|Tensor} */
        let tokens;

        if (Array.isArray(text)) {
            if (text.length === 0) {
                throw Error('text array must be non-empty')
            }

            if (text_pair !== null) {
                if (!Array.isArray(text_pair)) {
                    throw Error('text_pair must also be an array')

                } else if (text.length !== text_pair.length) {
                    throw Error('text and text_pair must have the same length')
                }

                tokens = text.map(
                    (t, i) => this.encode(t, text_pair[i])
                )

            } else {
                tokens = text.map(x => this.encode(x));
            }

        } else {
            if (text === null) {
                throw Error('text may not be null')
            }

            if (Array.isArray(text_pair)) {
                throw Error('When specifying `text_pair`, since `text` is a string, `text_pair` must also be a string (i.e., not an array).')
            }

            // For single input, we just wrap in an array, and then unwrap later.
            tokens = [this.encode(text, text_pair)];
        }
        // At this point, tokens is batched: [batch_size, tokens]
        // However, array may be jagged. So, we pad to max_length

        let maxLengthOfBatch = max(tokens.map(x => x.length))[0];

        // If null, we calculate max length from sequences
        if (max_length === null) {
            max_length = maxLengthOfBatch;
        }

        // Ensure it is less than model max length
        max_length = Math.min(max_length, this.model_max_length)

        /** @type {any[]|Tensor} */
        let attention_mask = [];
        if (padding || truncation) {
            // Perform padding and/or truncation
            for (let i = 0; i < tokens.length; ++i) {
                if (tokens[i].length === max_length) {
                    attention_mask.push(new Array(tokens[i].length).fill(1))
                    continue;

                } else if (tokens[i].length > max_length) {
                    // possibly truncate
                    if (truncation) {
                        tokens[i] = tokens[i].slice(0, max_length);
                    }
                    attention_mask.push(new Array(tokens[i].length).fill(1))

                } else { // t.length < max_length
                    if (padding) {
                        let diff = max_length - tokens[i].length;

                        if (this.padding_side === 'right') {
                            attention_mask.push(
                                (new Array(tokens[i].length).fill(1)).concat(new Array(diff).fill(0))
                            )
                            tokens[i].push(...new Array(diff).fill(this.pad_token_id))
                        } else { // left
                            attention_mask.push(
                                (new Array(diff).fill(0)).concat(new Array(tokens[i].length).fill(1))
                            )
                            tokens[i].unshift(...new Array(diff).fill(this.pad_token_id))
                        }

                    } else {
                        attention_mask.push(new Array(tokens[i].length).fill(1))
                    }
                }
            }
        } else {
            attention_mask = tokens.map(x => new Array(x.length).fill(1))
        }

        if (return_tensor) {
            if (!(padding && truncation)) {
                // Not, guaranteed that all items have same length, so
                // we perform additional check

                if (tokens.some(x => x.length !== tokens[0].length)) {
                    throw Error(
                        "Unable to create tensor, you should probably activate truncation and/or padding " +
                        "with 'padding=true' and 'truncation=true' to have batched tensors with the same length."
                    )
                }
            }

            // Now we actually convert to tensor
            // NOTE: In the same way as the python library, we return a batched tensor, regardless of
            // whether we have a single input or multiple inputs.
            let dims = [tokens.length, tokens[0].length];

            tokens = new Tensor('int64',
                BigInt64Array.from(tokens.flat().map(BigInt)),
                dims
            );

            attention_mask = new Tensor(
                'int64',
                BigInt64Array.from(attention_mask.flat().map(BigInt)),
                dims
            )
        } else {
            // If not returning a tensor, we match the input type
            if (!Array.isArray(text)) {
                // Input was not batched, so we unwrap
                tokens = tokens[0];
                attention_mask = attention_mask[0];
            }
        }


        // Finally, add attention mask, and possibly model-specific parameters
        let modelInputs = {
            input_ids: tokens,
            attention_mask: attention_mask
        }

        // Optional post-processing
        modelInputs = this.prepare_model_inputs(modelInputs);

        return modelInputs
    }

    /**
     * Encodes a single text using the preprocessor pipeline of the tokenizer.
     *
     * @param {string|null} text The text to encode.
     * @returns {string[]|null} The encoded tokens.
     */
    _encode_text(text) {
        if (text === null) return null;

        // Actual function which does encoding, for a single text
        // First, we take care of special tokens. Needed to avoid issues arising from
        // normalization and/or pretokenization (which may not preserve special tokens)
        const sections = this.added_tokens_regex ? text.split(this.added_tokens_regex).filter(x => x) : [text];
        let tokens = sections.map(x => {
            if (this.added_tokens.includes(x)) {
                // Ignore added tokens
                return x
            } else {
                if (this.remove_space === true) {
                    x = x.trim().split(/\s+/).join(' ');
                }
                if (this.do_lowercase_and_remove_accent) {
                    x = lowercase_and_remove_accent(x);
                }

                if (this.normalizer !== null) {
                    x = this.normalizer(x);
                }

                let sectionTokens = (this.pre_tokenizer !== null) ? this.pre_tokenizer(x) : [x];

                let tokens = this.model(sectionTokens);

                return tokens;
            }
        }).flat();

        return tokens;
    }

    /**
     * Encodes a single text or a pair of texts using the model's tokenizer.
     *
     * @param {string} text The text to encode.
     * @param {string|null} text_pair The optional second text to encode.
     * @returns {number[]} An array of token IDs representing the encoded text(s).
     */
    encode(text, text_pair = null) {
        // Function called by users to encode possibly multiple texts
        let tokens = this._encode_text(text);
        let tokens2 = this._encode_text(text_pair);

        let combinedTokens = (this.post_processor !== null)
            ? this.post_processor(tokens, tokens2)
            : mergeArrays(tokens ?? [], tokens2 ?? []);

        let ids = this.model.convert_tokens_to_ids(combinedTokens);
        return ids;
    }

    /**
     * Decode a batch of tokenized sequences.
     * @param {number[][]} batch List of tokenized input sequences.
     * @param {Object} decode_args (Optional) Object with decoding arguments.
     * @returns {string[]} List of decoded sequences.
     */
    batch_decode(batch, decode_args = {}) {
        return batch.map(x => this.decode(x, decode_args));
    }

    /**
     * Decodes a sequence of token IDs back to a string.
     *
     * @param {number[]} token_ids List of token IDs to decode.
     * @param {Object} [decode_args={}]
     * @param {boolean} [decode_args.skip_special_tokens=false] If true, special tokens are removed from the output string.
     * @param {boolean} [decode_args.clean_up_tokenization_spaces=true] If true, spaces before punctuations and abbreviated forms are removed.
     *
     * @returns {string} The decoded string.
     * @throws {Error} If `token_ids` is not a non-empty array of integers.
     */
    decode(
        token_ids,
        decode_args = {},
    ) {
        if (!Array.isArray(token_ids) || token_ids.length === 0 || !isIntegralNumber(token_ids[0])) {
            throw Error("token_ids must be a non-empty array of integers.");
        }

        return this.decode_single(token_ids, decode_args)
    }

    /**
     * Decode a single list of token ids to a string.
     * @param {number[]} token_ids List of token ids to decode
     * @param {Object} decode_args Optional arguments for decoding
     * @param {boolean} [decode_args.skip_special_tokens=false] Whether to skip special tokens during decoding
     * @param {boolean} [decode_args.clean_up_tokenization_spaces=null] Whether to clean up tokenization spaces during decoding.
     * If null, the value is set to `this.decoder.cleanup` if it exists, falling back to `this.clean_up_tokenization_spaces` if it exists, falling back to `true`.
     * @returns {string} The decoded string
     */
    decode_single(
        token_ids,
        {
            skip_special_tokens = false,
            clean_up_tokenization_spaces = null,
        }
    ) {
        let tokens = this.model.convert_ids_to_tokens(token_ids);
        if (skip_special_tokens) {
            tokens = tokens.filter(x => !this.special_tokens.includes(x));
        }

        /** @type {string} */
        let decoded = this.decoder(tokens);


        // Slight hack, but prevents having to pass `skip_special_tokens` to
        // each call to `decode`, which would lead to code duplication.
        if (this.decoder.end_of_word_suffix) {
            decoded = decoded.replaceAll(this.decoder.end_of_word_suffix, ' ');
            if (skip_special_tokens) {
                decoded = decoded.trim();
            }
        }

        if (clean_up_tokenization_spaces ?? this.clean_up_tokenization_spaces) {
            decoded = clean_up_tokenization(decoded);
        }

        return decoded;
    }

}

/**
* Helper method for adding `token_type_ids` to model inputs
* @param {Object} inputs An object containing the input ids and attention mask.
* @returns {Object} The prepared inputs object.
*/
function add_token_types(inputs) {
    // TODO ensure correctness when token pair is present
    if (inputs.input_ids instanceof Tensor) {
        inputs.token_type_ids = new Tensor(
            'int64',
            new BigInt64Array(inputs.input_ids.data.length),
            inputs.input_ids.dims
        )
    } else if (Array.isArray(inputs.input_ids)) {

        if (Array.isArray(inputs.input_ids[0])) {
            // This means input is batched, so we need to batch the token_type_ids as well
            inputs.token_type_ids = inputs.input_ids.map(
                x => new Array(x.length).fill(0)
            )
        } else {
            inputs.token_type_ids = new Array(inputs.input_ids.length).fill(0);
        }
    } else {
        throw new Error('Input ids must be a Tensor or an Array')
    }

    return inputs;
}

/**
 * BertTokenizer is a class used to tokenize text for BERT models.
 * @extends PreTrainedTokenizer
 */
class BertTokenizer extends PreTrainedTokenizer {
    /** @type {add_token_types} */
    prepare_model_inputs(inputs) {
        return add_token_types(inputs);
    }
}
/**
 * Albert tokenizer
 * @extends PreTrainedTokenizer
 */
class AlbertTokenizer extends PreTrainedTokenizer {
    /** @type {add_token_types} */
    prepare_model_inputs(inputs) {
        return add_token_types(inputs);
    }
}
class MobileBertTokenizer extends PreTrainedTokenizer {
    /** @type {add_token_types} */
    prepare_model_inputs(inputs) {
        return add_token_types(inputs);
    }
}
class SqueezeBertTokenizer extends PreTrainedTokenizer {
    /** @type {add_token_types} */
    prepare_model_inputs(inputs) {
        return add_token_types(inputs);
    }
}
class DebertaTokenizer extends PreTrainedTokenizer {
    /** @type {add_token_types} */
    prepare_model_inputs(inputs) {
        return add_token_types(inputs);
    }
}
class DebertaV2Tokenizer extends PreTrainedTokenizer {
    /** @type {add_token_types} */
    prepare_model_inputs(inputs) {
        return add_token_types(inputs);
    }
}
class HerbertTokenizer extends PreTrainedTokenizer {
    /** @type {add_token_types} */
    prepare_model_inputs(inputs) {
        return add_token_types(inputs);
    }
}
class DistilBertTokenizer extends PreTrainedTokenizer { }
class CamembertTokenizer extends PreTrainedTokenizer { }
class XLMTokenizer extends PreTrainedTokenizer {
    constructor(tokenizerJSON, tokenizerConfig) {
        super(tokenizerJSON, tokenizerConfig);
        console.warn('WARNING: `XLMTokenizer` is not yet supported by Hugging Face\'s "fast" tokenizers library. Therefore, you may experience slightly inaccurate results.')
    }

    /** @type {add_token_types} */
    prepare_model_inputs(inputs) {
        return add_token_types(inputs);
    }
}

class T5Tokenizer extends PreTrainedTokenizer { }
class GPT2Tokenizer extends PreTrainedTokenizer { }
class BartTokenizer extends PreTrainedTokenizer { }
class MBartTokenizer extends PreTrainedTokenizer {
    constructor(tokenizerJSON, tokenizerConfig) {
        super(tokenizerJSON, tokenizerConfig);

        this.languageRegex = /^[a-z]{2}_[A-Z]{2}$/;
        this.language_codes = this.special_tokens.filter(x => this.languageRegex.test(x));
        this.lang_to_token = x => x; // Identity function
    }

    /**
     * Helper function to build translation inputs for an `MBartTokenizer`.
     * @param {string|string[]} raw_inputs The text to tokenize.
     * @param {Object} tokenizer_options Options to be sent to the tokenizer
     * @param {Object} generate_kwargs Generation options.
     * @returns {Object} Object to be passed to the model.
     */
    _build_translation_inputs(raw_inputs, tokenizer_options, generate_kwargs) {
        return _build_translation_inputs(this, raw_inputs, tokenizer_options, generate_kwargs);
    }
}
class MBart50Tokenizer extends MBartTokenizer { } // NOTE: extends MBartTokenizer

class RobertaTokenizer extends PreTrainedTokenizer { }

class BloomTokenizer extends PreTrainedTokenizer {
    constructor(tokenizerJSON, tokenizerConfig) {
        // Override the default (invalid) regex of the pretokenizer.
        // For more information, see https://github.com/xenova/transformers.js/issues/94
        const splitChars = '.,!?\u2026\u3002\uff0c\u3001\u0964\u06d4\u060c';
        const patternObject = tokenizerJSON.pre_tokenizer?.pretokenizers[0]?.pattern;
        if (patternObject && patternObject.Regex === ` ?[^(\\s|[${splitChars}])]+`) {
            patternObject.Regex = ` ?[^\\s${splitChars}]+`;
        }
        super(tokenizerJSON, tokenizerConfig);
    }
}
class LlamaTokenizer extends PreTrainedTokenizer { }
class CodeLlamaTokenizer extends PreTrainedTokenizer { }

class XLMRobertaTokenizer extends PreTrainedTokenizer { }
class MPNetTokenizer extends PreTrainedTokenizer { }

class FalconTokenizer extends PreTrainedTokenizer {
    /** @type {add_token_types} */
    prepare_model_inputs(inputs) {
        return add_token_types(inputs);
    }
}

class GPTNeoXTokenizer extends PreTrainedTokenizer { }


/**
 * Helper function to build translation inputs for an `NllbTokenizer` or `M2M100Tokenizer`.
 * @param {PreTrainedTokenizer} self The tokenizer instance.
 * @param {string|string[]} raw_inputs The text to tokenize.
 * @param {Object} tokenizer_options Options to be sent to the tokenizer
 * @param {Object} generate_kwargs Generation options.
 * @returns {Object} Object to be passed to the model.
 * @private
 */
function _build_translation_inputs(self, raw_inputs, tokenizer_options, generate_kwargs) {
    if (!('language_codes' in self) || !Array.isArray(self.language_codes)) {
        throw new Error('Tokenizer must have `language_codes` attribute set and it should be an array of language ids.')
    }
    if (!('languageRegex' in self) || !(self.languageRegex instanceof RegExp)) {
        throw new Error('Tokenizer must have `languageRegex` attribute set and it should be a regular expression.')
    }
    if (!('lang_to_token' in self) || typeof self.lang_to_token !== 'function') {
        throw new Error('Tokenizer must have `lang_to_token` attribute set and it should be a function.')
    }
    const src_lang_token = generate_kwargs.src_lang;
    const tgt_lang_token = generate_kwargs.tgt_lang;

    // Check that the target language is valid:
    if (!self.language_codes.includes(tgt_lang_token)) {
        throw new Error(`Target language code "${tgt_lang_token}" is not valid. Must be one of: {${self.language_codes.join(', ')}}`);
    }

    // Allow `src_lang` to be optional. If not set, we'll use the tokenizer's default.
    if (src_lang_token !== undefined) {
        // Check that the source language is valid:
        if (!self.language_codes.includes(src_lang_token)) {
            throw new Error(`Source language code "${src_lang_token}" is not valid. Must be one of: {${self.language_codes.join(', ')}}`);
        }

        // In the same way as the Python library, we override the post-processor
        // to force the source language to be first:
        for (let item of self.post_processor.config.single) {
            if ('SpecialToken' in item && self.languageRegex.test(item.SpecialToken.id)) {
                item.SpecialToken.id = self.lang_to_token(src_lang_token);
                break;
            }
        }
        // TODO: Do the same for pair?
    }

    // Override the `forced_bos_token_id` to force the correct language
    generate_kwargs.forced_bos_token_id = self.model.convert_tokens_to_ids([self.lang_to_token(tgt_lang_token)])[0];

    return self._call(raw_inputs, tokenizer_options);
}

/**
 * The NllbTokenizer class is used to tokenize text for NLLB ("No Language Left Behind") models.
 * 
 * No Language Left Behind (NLLB) is a first-of-its-kind, AI breakthrough project
 * that open-sources models capable of delivering high-quality translations directly
 * between any pair of 200+ languages — including low-resource languages like Asturian,
 * Luganda, Urdu and more. It aims to help people communicate with anyone, anywhere,
 * regardless of their language preferences. For more information, check out their
 * [paper](https://arxiv.org/abs/2207.04672).
 * 
 * For a list of supported languages (along with their language codes),
 * @see {@link https://github.com/facebookresearch/flores/blob/main/flores200/README.md#languages-in-flores-200}
 */
class NllbTokenizer extends PreTrainedTokenizer {

    constructor(tokenizerJSON, tokenizerConfig) {
        super(tokenizerJSON, tokenizerConfig);

        this.languageRegex = /^[a-z]{3}_[A-Z][a-z]{3}$/;
        this.language_codes = this.special_tokens.filter(x => this.languageRegex.test(x));
        this.lang_to_token = x => x; // Identity function
    }

    /**
     * Helper function to build translation inputs for an `NllbTokenizer`.
     * @param {string|string[]} raw_inputs The text to tokenize.
     * @param {Object} tokenizer_options Options to be sent to the tokenizer
     * @param {Object} generate_kwargs Generation options.
     * @returns {Object} Object to be passed to the model.
     */
    _build_translation_inputs(raw_inputs, tokenizer_options, generate_kwargs) {
        return _build_translation_inputs(this, raw_inputs, tokenizer_options, generate_kwargs);
    }
}

/**
 * The M2M100Tokenizer class is used to tokenize text for M2M100 ("Many-to-Many") models.
 * 
 * M2M100 is a multilingual encoder-decoder (seq-to-seq) model trained for Many-to-Many
 * multilingual translation. It was introduced in this [paper](https://arxiv.org/abs/2010.11125)
 * and first released in [this](https://github.com/pytorch/fairseq/tree/master/examples/m2m_100) repository.
 * 
 * For a list of supported languages (along with their language codes),
 * @see {@link https://huggingface.co/facebook/m2m100_418M#languages-covered}
 */
class M2M100Tokenizer extends PreTrainedTokenizer {
    constructor(tokenizerJSON, tokenizerConfig) {
        super(tokenizerJSON, tokenizerConfig);

        this.languageRegex = /^__[a-z]{2,3}__$/;
        this.language_codes = this.special_tokens
            .filter(x => this.languageRegex.test(x))
            .map(x => x.slice(2, -2));
        this.lang_to_token = x => `__${x}__`;
    }

    /**
     * Helper function to build translation inputs for an `M2M100Tokenizer`.
     * @param {string|string[]} raw_inputs The text to tokenize.
     * @param {Object} tokenizer_options Options to be sent to the tokenizer
     * @param {Object} generate_kwargs Generation options.
     * @returns {Object} Object to be passed to the model.
     */
    _build_translation_inputs(raw_inputs, tokenizer_options, generate_kwargs) {
        return _build_translation_inputs(this, raw_inputs, tokenizer_options, generate_kwargs);
    }
}


const WHISPER_LANGUAGES = [
    ["en", "english"],
    ["zh", "chinese"],
    ["de", "german"],
    ["es", "spanish"],
    ["ru", "russian"],
    ["ko", "korean"],
    ["fr", "french"],
    ["ja", "japanese"],
    ["pt", "portuguese"],
    ["tr", "turkish"],
    ["pl", "polish"],
    ["ca", "catalan"],
    ["nl", "dutch"],
    ["ar", "arabic"],
    ["sv", "swedish"],
    ["it", "italian"],
    ["id", "indonesian"],
    ["hi", "hindi"],
    ["fi", "finnish"],
    ["vi", "vietnamese"],
    ["he", "hebrew"],
    ["uk", "ukrainian"],
    ["el", "greek"],
    ["ms", "malay"],
    ["cs", "czech"],
    ["ro", "romanian"],
    ["da", "danish"],
    ["hu", "hungarian"],
    ["ta", "tamil"],
    ["no", "norwegian"],
    ["th", "thai"],
    ["ur", "urdu"],
    ["hr", "croatian"],
    ["bg", "bulgarian"],
    ["lt", "lithuanian"],
    ["la", "latin"],
    ["mi", "maori"],
    ["ml", "malayalam"],
    ["cy", "welsh"],
    ["sk", "slovak"],
    ["te", "telugu"],
    ["fa", "persian"],
    ["lv", "latvian"],
    ["bn", "bengali"],
    ["sr", "serbian"],
    ["az", "azerbaijani"],
    ["sl", "slovenian"],
    ["kn", "kannada"],
    ["et", "estonian"],
    ["mk", "macedonian"],
    ["br", "breton"],
    ["eu", "basque"],
    ["is", "icelandic"],
    ["hy", "armenian"],
    ["ne", "nepali"],
    ["mn", "mongolian"],
    ["bs", "bosnian"],
    ["kk", "kazakh"],
    ["sq", "albanian"],
    ["sw", "swahili"],
    ["gl", "galician"],
    ["mr", "marathi"],
    ["pa", "punjabi"],
    ["si", "sinhala"],
    ["km", "khmer"],
    ["sn", "shona"],
    ["yo", "yoruba"],
    ["so", "somali"],
    ["af", "afrikaans"],
    ["oc", "occitan"],
    ["ka", "georgian"],
    ["be", "belarusian"],
    ["tg", "tajik"],
    ["sd", "sindhi"],
    ["gu", "gujarati"],
    ["am", "amharic"],
    ["yi", "yiddish"],
    ["lo", "lao"],
    ["uz", "uzbek"],
    ["fo", "faroese"],
    ["ht", "haitian creole"],
    ["ps", "pashto"],
    ["tk", "turkmen"],
    ["nn", "nynorsk"],
    ["mt", "maltese"],
    ["sa", "sanskrit"],
    ["lb", "luxembourgish"],
    ["my", "myanmar"],
    ["bo", "tibetan"],
    ["tl", "tagalog"],
    ["mg", "malagasy"],
    ["as", "assamese"],
    ["tt", "tatar"],
    ["haw", "hawaiian"],
    ["ln", "lingala"],
    ["ha", "hausa"],
    ["ba", "bashkir"],
    ["jw", "javanese"],
    ["su", "sundanese"],
]

// @ts-ignore
const WHISPER_LANGUAGE_MAPPING = new Map(WHISPER_LANGUAGES);
// @ts-ignore
const WHISPER_TO_LANGUAGE_CODE_MAPPING = new Map([
    ...WHISPER_LANGUAGES.map(([k, v]) => [v, k]),
    ...[
        ["burmese", "my"],
        ["valencian", "ca"],
        ["flemish", "nl"],
        ["haitian", "ht"],
        ["letzeburgesch", "lb"],
        ["pushto", "ps"],
        ["panjabi", "pa"],
        ["moldavian", "ro"],
        ["moldovan", "ro"],
        ["sinhalese", "si"],
        ["castilian", "es"],
    ]
]);

/**
 * WhisperTokenizer tokenizer
 * @extends PreTrainedTokenizer
 */
class WhisperTokenizer extends PreTrainedTokenizer {

    /**
     * Decodes automatic speech recognition (ASR) sequences.
     * @param {Array<{tokens: number[], token_timestamps?: number[], stride: number[]}>} sequences The sequences to decode.
     * @param {Object} options The options to use for decoding.
     * @returns {Array<string|{chunks?: undefined|Array<{language: string|null, timestamp: Array<number|null>, text: string}>}>} The decoded sequences.
     */
    _decode_asr(sequences, {
        return_timestamps = false,
        return_language = false,
        time_precision = null,
        force_full_sequences = true
    } = {}) {
        // Set force_full_sequences=false if you want streaming
        // TODO add support for `return_language`

        // Internal method meant to only be used by asr pipeline.
        // Handles all the little quirks specific to whisper to handle
        // the various options not allowed in other seq2seq models

        // =========== Overview ============
        // - iterate over all outputs
        // - all tokens within output
        // - Each token can be
        //   - language token
        //   - special token
        //   - timestamp token
        //   - text token
        // - We accumulate the text tokens.
        // - We split on end timestamps
        // - Lots of complexity comes from stride and timestamps

        if (time_precision === null) {
            throw Error("Must specify time_precision")
        }
        let last_language = null;

        const returnWordTimestamps = return_timestamps === "word";

        function new_chunk() {
            return { "language": last_language, "timestamp": [null, null], "text": "" };
        }

        // Welcome to the state machine!
        const chunks = [];
        let chunk = new_chunk();
        let time_offset = 0.0;
        const timestamp_begin = this.model.convert_tokens_to_ids(["<|notimestamps|>"])[0] + 1;

        let previous_tokens = [];
        let previous_token_timestamps = [];

        let skip = false;
        let right_stride_start = null;


        const all_special_ids = new Set(this.all_special_ids);

        for (let output of sequences) {
            // NOTE: python version has batches, so it uses [0]
            const token_ids = output.tokens;
            const token_timestamps = returnWordTimestamps ? output.token_timestamps : null;

            // These keep track of timestamps within strides, which need
            // to be skipped and resolve all tokens in a single chunk.
            let last_timestamp = null;
            let first_timestamp = timestamp_begin;

            if ("stride" in output) {
                const [chunk_len, stride_left, stride_right] = output.stride;

                // Offset the timings to account for the other `model_outputs`.
                time_offset -= stride_left;
                right_stride_start = chunk_len - stride_right;

                // Keeping track of timestamps within strides
                // We're going to NOT split on those, and delay until we're
                // out of BOTH stride. Otherwise lots of issues occur and
                // corner cases
                if (stride_left) {
                    first_timestamp = stride_left / time_precision + timestamp_begin;
                }

                if (stride_right) {
                    for (let i = token_ids.length - 1; i >= 0; --i) {
                        const token = token_ids[i];
                        if (token >= timestamp_begin) {
                            // There can be several token in the right stride
                            // But the last one is ALWAYS going to be skipped
                            if (last_timestamp !== null && (token - timestamp_begin) * time_precision < right_stride_start) {
                                break;
                            }
                            last_timestamp = token;
                        }
                    }
                }
            }

            let current_tokens = [];
            let current_token_timestamps = [];

            // - all tokens within output
            for (let i = 0; i < token_ids.length; ++i) {
                const token = token_ids[i];
                // 4 possible states for each token
                // - 1/ Language code
                // - 2/ all other special tokens (which we ignore)
                // - 3/ Timestamp
                // - 4/ Regular text

                if (all_special_ids.has(token)) {
                    const text = this.decode([token]);
                    const language = WHISPER_LANGUAGE_MAPPING.get(text.slice(2, -2));

                    if (language !== undefined) {
                        // 1/ Indeed some language
                        // TODO Handle when language is different from the previous
                        // one, and we cannot use timestamped tokens to create chunks
                        if (last_language !== null && language !== last_language && !return_timestamps) {
                            previous_tokens.push(current_tokens);
                            const resolved_tokens = this.findLongestCommonSequence(previous_tokens)[0];
                            const resolved_text = this.decode(resolved_tokens);
                            chunk.text = resolved_text;
                            chunks.push(chunk);

                            // Flush all our temporary context
                            previous_tokens = [];
                            current_tokens = [];
                            chunk = new_chunk();
                        }

                        last_language = chunk.language = language;
                    } else {
                        // 2/ This is a regular special token, ignoring it
                    }
                } else if (token >= timestamp_begin) {
                    // 3/ Timestamp token
                    const time = (token - timestamp_begin) * time_precision + time_offset;
                    const rounded_time = round(time, 2);

                    if (last_timestamp !== null && token >= last_timestamp) {
                        // Whisper outputted a timestamp token, but it falls within
                        // our stride, so we're going to skip it for the time being
                        // and resolve this later
                        // Skip is necessary because timestamp tokens always come
                        // by pair, so we need to skip the next one too (which would mark the start of another chunk).
                        skip = true;
                    } else if (skip || (previous_tokens.length > 0 && token < first_timestamp)) {
                        skip = false;
                    } else if (chunk.timestamp[0] === null) {
                        chunk.timestamp[0] = rounded_time;
                    } else {
                        // This is the end of the timestamp chunk
                        if (rounded_time === chunk.timestamp[0]) {
                            // This is a bug in timestamp token output
                            // where we're taking the duplicate token
                            // as a stop where it should be a start.
                            // This is an issue in the underlying model output
                            // Let's just skip it so it becomes de-factor a start agin
                        } else {
                            chunk.timestamp[1] = rounded_time;

                            // Handling merges
                            previous_tokens.push(current_tokens)

                            if (returnWordTimestamps) {
                                previous_token_timestamps.push(current_token_timestamps);
                            }
                            const [resolved_tokens, resolved_token_timestamps] = this.findLongestCommonSequence(
                                previous_tokens, previous_token_timestamps
                            )

                            const resolved_text = this.decode(resolved_tokens)
                            chunk.text = resolved_text

                            if (returnWordTimestamps) {
                                chunk.words = this.collateWordTimestamps(
                                    resolved_tokens, resolved_token_timestamps, last_language,
                                )
                            }

                            chunks.push(chunk)

                            // Flush all our temporary context
                            previous_tokens = []
                            current_tokens = []
                            previous_token_timestamps = []
                            current_token_timestamps = []
                            chunk = new_chunk()
                        }
                    }

                } else {
                    // 4/ Regular token
                    // We just append to the list of all tokens so we can handle
                    // merges later and decode into text.
                    current_tokens.push(token)

                    if (returnWordTimestamps) {
                        let start_time = round(token_timestamps[i] + time_offset, 2);

                        let end_time;
                        if (i + 1 < token_timestamps.length) {
                            end_time = round(token_timestamps[i + 1] + time_offset, 2);
                        } else {
                            // should never happen
                            end_time = null;
                        }
                        current_token_timestamps.push([start_time, end_time]);
                    }

                }
            }

            if ('stride' in output) {
                const [chunk_len, stride_left, stride_right] = output.stride;
                time_offset += chunk_len - stride_right
            }

            // Leftover tokens
            if (current_tokens.length > 0) {
                previous_tokens.push(current_tokens)
                if (returnWordTimestamps) {
                    previous_token_timestamps.push(current_token_timestamps);
                }
            } else if (previous_tokens.every(p => p.length === 0)) {
                // Flushing previous tokens (END)"
                chunk = new_chunk()
                previous_tokens = []
                current_tokens = []
                previous_token_timestamps = [];
                current_token_timestamps = [];
            }

        }

        if (previous_tokens.length > 0) {
            if (force_full_sequences && return_timestamps) {
                // Last token should always be timestamps, so there shouldn't be
                // leftover
                throw new Error(
                    "Whisper did not predict an ending timestamp, which can happen if audio is cut off in the middle of a word. " +
                    "Also make sure WhisperTimeStampLogitsProcessor was used during generation."
                );
            }

            // Happens when we don't use timestamps
            const [resolved_tokens, resolved_token_timestamps] = this.findLongestCommonSequence(previous_tokens, previous_token_timestamps);

            // Flushing previous tokens (FINAL)
            const resolved_text = this.decode(resolved_tokens);
            chunk.text = resolved_text;
            if (returnWordTimestamps) {
                chunk.words = this.collateWordTimestamps(
                    resolved_tokens, resolved_token_timestamps, last_language,
                )
            }
            chunks.push(chunk);
        }

        let optional = Object.create(null);

        // Preparing and cleaning up the pipeline output
        const full_text = chunks.map(chunk => chunk.text).join('');
        if (return_timestamps || return_language) {
            for (let i = 0; i < chunks.length; ++i) {
                const chunk = chunks[i];
                if (!return_timestamps) {
                    delete chunk["timestamp"];
                }

                if (!return_language) {
                    delete chunk["language"];
                }
            }
            if (returnWordTimestamps) {
                let new_chunks = [];
                for (let chunk of chunks) {
                    for (let word of chunk.words) {
                        new_chunks.push(word);
                    }
                }
                optional = { "chunks": new_chunks };
            } else {
                optional = { "chunks": chunks };
            }
        }
        return [full_text, optional];

    }

    /**
     * Finds the longest common sequence among the provided sequences.
     * @param {number[][]} sequences An array of sequences of token ids to compare.
     * @returns {number[][]} The longest common sequence found.
     * @throws {Error} If there is a bug within the function.
     * @private
     */
    findLongestCommonSequence(sequences, token_timestamp_sequences = null) {
        // It would be much harder to do O(n) because of fault tolerance.
        // We actually have a really good property which is that the total sequence
        // MUST be those subsequences in order.
        // If token_timestamp_sequences is provided, will split those sequences in
        // exactly the same way.
        let leftSequence = sequences[0];
        let leftLength = leftSequence.length;
        let totalSequence = [];

        const use_token_timestamp_sequences = Array.isArray(token_timestamp_sequences) && token_timestamp_sequences.length > 0;
        let total_token_timestamp_sequence = use_token_timestamp_sequences ? [] : null;
        let left_token_timestamp_sequence = use_token_timestamp_sequences ? token_timestamp_sequences[0] : null;
        for (let i = 1; i < sequences.length; ++i) {
            const rightSequence = sequences[i];
            let max = 0.0;
            let maxIndices = [leftLength, leftLength, 0, 0];
            // Here we're sliding matches
            // [a, b, c, d]
            //          [c, d, f]
            // =        [c] == [d]

            // [a, b, c, d]
            //       [c, d, f]
            // =     [c, d] == [c, d]


            // [a, b, c, d]
            //    [c, d, f]

            // =  [b, c, d] == [c, d, f]

            // [a, b, c, d]
            // [c, d, f]

            // [a, b, c] == [c, d, f]

            // [a, b, c, d]
            // [d, f]

            // [a, b] == [d, f]

            // [a, b, c, d]
            // [f]

            // [a] == [f]

            const rightLength = rightSequence.length;
            for (let j = 1; j < leftLength + rightLength; ++j) {
                const eps = j / 10000.0;
                const leftStart = Math.max(0, leftLength - j);
                const leftStop = Math.min(leftLength, leftLength + rightLength - j);
                const left = leftSequence.slice(leftStart, leftStop);
                const rightStart = Math.max(0, j - leftLength);
                const rightStop = Math.min(rightLength, j);
                const right = rightSequence.slice(rightStart, rightStop);
                if (left.length !== right.length) {
                    throw new Error("There is a bug within whisper `decode_asr` function, please report it. Dropping to prevent bad inference.");
                }
                const matches = left.filter((elem, idx) => elem === right[idx]).length;
                const matching = matches / j + eps;
                if (matches > 1 && matching > max) {
                    max = matching;
                    maxIndices = [leftStart, leftStop, rightStart, rightStop];
                }
            }
            const [leftStart, leftStop, rightStart, rightStop] = maxIndices;
            const leftMid = Math.floor((leftStop + leftStart) / 2);
            const rightMid = Math.floor((rightStop + rightStart) / 2);
            totalSequence.push(...leftSequence.slice(0, leftMid));
            leftSequence = rightSequence.slice(rightMid);
            leftLength = leftSequence.length;

            if (use_token_timestamp_sequences) {
                total_token_timestamp_sequence.push(...left_token_timestamp_sequence.slice(0, leftMid));
                left_token_timestamp_sequence = token_timestamp_sequences[i].slice(rightMid);
            }
        }
        totalSequence.push(...leftSequence);

        if (use_token_timestamp_sequences) {
            total_token_timestamp_sequence.push(...left_token_timestamp_sequence);
            return [totalSequence, total_token_timestamp_sequence];
        } else {
            return [totalSequence, []];
        }
    }

    /** @private */
    collateWordTimestamps(tokens, token_timestamps, language) {

        let [words, _, token_indices] = this.combineTokensIntoWords(tokens, language);

        let timings = [];
        for (let i = 0; i < words.length; ++i) {
            const indices = token_indices[i];
            timings.push({
                text: words[i],
                timestamp: [
                    token_timestamps[indices.at(0)][0],
                    token_timestamps[indices.at(-1)][1],
                ],
            });
        }
        return timings;
    }

    /**
     * Groups tokens by word. Returns a tuple containing a list of strings with the words,
     * and a list of `token_id` sequences with the tokens making up each word.
     * @param {number[]} tokens 
     * @param {string} [language] 
     * @param {string} prepend_punctionations 
     * @param {string} append_punctuations 
     * 
     * @private
     */
    combineTokensIntoWords(tokens, language, prepend_punctionations = "\"'“¡¿([{-", append_punctuations = "\"'.。,，!！?？:：”)]}、") {
        language = language ?? 'english';

        let words, word_tokens, token_indices;

        if (["chinese", "japanese", "thai", "lao", "myanmar"].includes(language)) {
            // These languages don't typically use spaces.
            [words, word_tokens, token_indices] = this.splitTokensOnUnicode(tokens)
        } else {
            [words, word_tokens, token_indices] = this.splitTokensOnSpaces(tokens)
        }

        return this.mergePunctuations(words, word_tokens, token_indices, prepend_punctionations, append_punctuations);
    }

    /** @type {PreTrainedTokenizer['decode']} */
    decode(
        token_ids,
        decode_args,
    ) {
        let text;
        // @ts-ignore
        if (decode_args && decode_args.decode_with_timestamps) {
            text = this.decodeWithTimestamps(token_ids, decode_args);
        } else {
            text = super.decode(token_ids, decode_args);
        }
        // TODO: implement offsets
        // if (decode_args.output_offsets) {
        //     let offsets = this.computeOffsets
        // }
        return text;
    }

    /**
     * @param {number[]} token_ids List of token IDs to decode.
     * @param {Object} decode_args Optional arguments for decoding
     * @private
     */
    decodeWithTimestamps(token_ids, decode_args) {
        const time_precision = decode_args?.time_precision ?? 0.02;

        const timestamp_begin = Array.from(this.all_special_ids).at(-1) + 1;
        /**@type {Array} */
        let outputs = [[]];
        for (let token of token_ids) {
            if (token >= timestamp_begin) {
                let timestamp = (token - timestamp_begin) * time_precision;
                timestamp = round(timestamp, 2);
                outputs.push(`<|${timestamp}|>`);
                outputs.push([]);
            } else {
                outputs[outputs.length - 1].push(token);
            }
        }
        outputs = outputs.map(
            s => {
                if (typeof s === 'string') {
                    return s;
                } else {
                    return super.decode(s, decode_args);
                }
            }
        )

        return outputs.join('');
    }

    /**
     * Combine tokens into words by splitting at any position where the tokens are decoded as valid unicode points.
     * @param {number[]} tokens 
     * @returns {*}
     * @private
     */
    splitTokensOnUnicode(tokens) {
        const decoded_full = this.decode(tokens, {
            // @ts-ignore
            decode_with_timestamps: true,
        });
        const replacement_char = '\uFFFD';

        let words = []
        let word_tokens = []
        let token_indices = []
        let current_tokens = []
        let current_indices = []
        let unicode_offset = 0

        for (let token_idx = 0; token_idx < tokens.length; ++token_idx) {
            const token = tokens[token_idx];

            current_tokens.push(token);
            current_indices.push(token_idx);

            const decoded = this.decode(current_tokens, {
                // @ts-ignore
                decode_with_timestamps: true,
            });

            if (!decoded.includes(replacement_char) || decoded_full[unicode_offset + decoded.indexOf(replacement_char)] === replacement_char) {
                words.push(decoded)
                word_tokens.push(current_tokens)
                token_indices.push(current_indices)
                current_tokens = []
                current_indices = []
                unicode_offset += decoded.length;
            }

        }

        return [words, word_tokens, token_indices]
    }

    /**
     * Combine tokens into words by splitting at whitespace and punctuation tokens.
     * @param {number[]} tokens 
     * @private
     */
    splitTokensOnSpaces(tokens) {

        let [subwords, subword_tokens_list, subword_indices_list] = this.splitTokensOnUnicode(tokens);

        let words = []
        let word_tokens = []
        let token_indices = []

        const punctuationRegex = new RegExp(`^[${PUNCTUATION_REGEX}]$`, 'gu');

        for (let i = 0; i < subwords.length; ++i) {

            const subword = subwords[i];
            const subword_tokens = subword_tokens_list[i];
            const subword_indices = subword_indices_list[i];

            // @ts-ignore
            const special = subword_tokens[0] >= this.model.tokens_to_ids.get('<|endoftext|>');
            const with_space = subword.startsWith(' ');
            const trimmed = subword.trim();
            const punctuation = punctuationRegex.test(trimmed);

            if (special || with_space || punctuation || words.length === 0) {
                words.push(subword);
                word_tokens.push(subword_tokens);
                token_indices.push(subword_indices);
            } else {
                const ix = words.length - 1;
                words[ix] += subword;
                word_tokens[ix].push(...subword_tokens);
                token_indices[ix].push(...subword_indices);
            }
        }

        return [words, word_tokens, token_indices];

    }

    /**
     * Merges punctuation tokens with neighboring words.
     * @param {string[]} words 
     * @param {number[][]} tokens 
     * @param {number[][]} indices 
     * @param {string} prepended 
     * @param {string} appended 
     * @private
     */
    mergePunctuations(words, tokens, indices, prepended, appended) {

        let newWords = structuredClone(words);
        let newTokens = structuredClone(tokens);
        let newIndices = structuredClone(indices);


        // prepend punctuations
        let i = newWords.length - 2;
        let j = newWords.length - 1;

        while (i >= 0) {
            if (newWords[i].startsWith(' ') && prepended.includes(newWords[i].trim())) {
                newWords[j] = newWords[i] + newWords[j];
                newTokens[j] = mergeArrays(newTokens[i], newTokens[j]);
                newIndices[j] = mergeArrays(newIndices[i], newIndices[j]);
                newWords[i] = '';
                newTokens[i] = [];
                newIndices[i] = [];
            } else {
                j = i;
            }
            --i;
        }

        // append punctuations
        i = 0;
        j = 1;
        while (j < newWords.length) {
            if (!newWords[i].endsWith(' ') && appended.includes(newWords[j])) {
                newWords[i] += newWords[j];
                newTokens[i] = mergeArrays(newTokens[i], newTokens[j]);
                newIndices[i] = mergeArrays(newIndices[i], newIndices[j]);
                newWords[j] = '';
                newTokens[j] = [];
                newIndices[j] = [];
            } else {
                i = j;
            }
            ++j;
        }

        return [
            newWords.filter(x => x),
            newTokens.filter(x => x.length > 0),
            newIndices.filter(x => x.length > 0),
        ]
    }

    /**
     * Helper function to build translation inputs for a `WhisperTokenizer`,
     * depending on the language, task, and whether to predict timestamp tokens.
     * 
     * Used to override the prefix tokens appended to the start of the label sequence.
     * 
     * **Example: Get ids for a language**
     * ```javascript
     * // instantiate the tokenizer and set the prefix token to Spanish
     * let tokenizer = await WhisperTokenizer.from_pretrained('Xenova/whisper-tiny');
     * let forced_decoder_ids = tokenizer.get_decoder_prompt_ids({ language: 'spanish' });
     * // [(1, 50262), (2, 50363)]
     * ```
     * 
     * @param {Object} options Options to generate the decoder prompt.
     * @param {string} [options.language] The language of the transcription text.
     * The corresponding language id token is appended to the start of the sequence for multilingual
     * speech recognition and speech translation tasks, e.g. for "Spanish" the token "<|es|>" is appended
     * to the start of sequence.
     * @param {string} [options.task] Task identifier to append at the start of sequence (if any).
     * This should be used for mulitlingual fine-tuning, with "transcribe" for speech recognition and
     * "translate" for speech translation.
     * @param {boolean} [options.no_timestamps] Whether to add the <|notimestamps|> token at the start of the sequence.
     * @returns {number[][]} The decoder prompt ids.
     */
    get_decoder_prompt_ids({
        language = null,
        task = null,
        no_timestamps = true,
    } = {}) {

        // <|lang_id|> <|task|> <|notimestamps|>

        let forced_decoder_ids = [];

        if (language) {
            // User wishes to specify the language
            language = language.toLowerCase();

            // Map to code from user-friendly name (e.g., "english" -> "en")
            let language_code = WHISPER_TO_LANGUAGE_CODE_MAPPING.get(language);

            if (language_code === undefined) {
                // User provided something that is not a language name

                if (WHISPER_LANGUAGE_MAPPING.has(language)) {
                    // User provided the language code directly (e.g., "en")
                    language_code = language;

                } else {
                    // User provided something that is not a language code or name
                    const is_language_code = language.length === 2;
                    const langs = is_language_code ? WHISPER_LANGUAGE_MAPPING.keys() : WHISPER_LANGUAGE_MAPPING.values();

                    throw new Error(`Language "${language}" is not supported. Must be one of: ${JSON.stringify(langs)}`);
                }
            }

            let language_token_id = this.model.tokens_to_ids.get(`<|${language_code}|>`);
            if (language_token_id === undefined) {
                throw new Error(`Unable to find language "${language_code}" in model vocabulary. Please report this issue at https://github.com/xenova/transformers.js/issues/new/choose.`)
            }

            forced_decoder_ids.push(language_token_id);
        } else {
            // No token will be forced, which leaves the model to predict the language
            forced_decoder_ids.push(null);
        }

        if (task) {
            task = task.toLowerCase();
            if (task !== 'transcribe' && task !== 'translate') {
                throw new Error(`Task "${task}" is not supported. Must be one of: ["transcribe", "translate"]`);
            }

            let task_token_id = this.model.tokens_to_ids.get(`<|${task}|>`);
            if (task_token_id === undefined) {
                throw new Error(`Unable to find task "${task}" in model vocabulary. Please report this issue at https://github.com/xenova/transformers.js/issues/new/choose.`)
            }

            forced_decoder_ids.push(task_token_id);
        } else {
            // No token will be forced, which leaves the model to predict the task
            forced_decoder_ids.push(null);
        }

        if (no_timestamps) {
            let no_timestamps_id = this.model.tokens_to_ids.get(`<|notimestamps|>`);
            if (no_timestamps_id === undefined) {
                throw new Error('Unable to find "<|notimestamps|>" in model vocabulary. Please report this issue at https://github.com/xenova/transformers.js/issues/new/choose.')
            }

            forced_decoder_ids.push(no_timestamps_id);
        }

        return forced_decoder_ids.map((x, i) => [i + 1, x]).filter(x => x[1] !== null);

    }
}
class CodeGenTokenizer extends PreTrainedTokenizer { }
class CLIPTokenizer extends PreTrainedTokenizer { }


/**
 * @todo This model is not yet supported by Hugging Face's "fast" tokenizers library (https://github.com/huggingface/tokenizers).
 * Therefore, this implementation (which is based on fast tokenizers) may produce slightly inaccurate results.
 */
class MarianTokenizer extends PreTrainedTokenizer {
    /**
     * Create a new MarianTokenizer instance.
     * @param {Object} tokenizerJSON The JSON of the tokenizer.
     * @param {Object} tokenizerConfig The config of the tokenizer.
     */
    constructor(tokenizerJSON, tokenizerConfig) {
        super(tokenizerJSON, tokenizerConfig);

        this.languageRegex = /^(>>\w+<<)\s*/g;

        this.supported_language_codes = this.model.vocab.filter(
            x => this.languageRegex.test(x)
        );

        console.warn('WARNING: `MarianTokenizer` is not yet supported by Hugging Face\'s "fast" tokenizers library. Therefore, you may experience slightly inaccurate results.')
    }

    /**
     * Encodes a single text. Overriding this method is necessary since the language codes
     * must be removed before encoding with sentencepiece model.
     * @see https://github.com/huggingface/transformers/blob/12d51db243a00726a548a43cc333390ebae731e3/src/transformers/models/marian/tokenization_marian.py#L204-L213
     *
     * @param {string|null} text The text to encode.
     * @returns {Array} The encoded tokens.
     */
    _encode_text(text) {
        if (text === null) return null;

        // Check if text starts with language code:
        let [matchInfo, ...remainder] = text.trim().split(this.languageRegex);

        if (remainder.length === 0) {
            // No language code, encode normally
            return super._encode_text(matchInfo);

        } else if (remainder.length === 2) {
            // Text starts with language code, so we do not encode it with sentencepiece.
            let [language, text] = remainder;

            if (!this.supported_language_codes.includes(language)) {
                console.warn(`Unsupported language code "${language}" detected, which may lead to unexpected behavior. Should be one of: ${JSON.stringify(this.supported_language_codes)}`)
            }
            return mergeArrays([language], super._encode_text(text));
        }
    }

}

class Wav2Vec2CTCTokenizer extends PreTrainedTokenizer { }

/**
 * Helper class which is used to instantiate pretrained tokenizers with the `from_pretrained` function.
 * The chosen tokenizer class is determined by the type specified in the tokenizer config.
 * 
 * @example
 * let tokenizer = await AutoTokenizer.from_pretrained('Xenova/bert-base-uncased');
 */
class AutoTokenizer {
    static TOKENIZER_CLASS_MAPPING = {
        T5Tokenizer,
        DistilBertTokenizer,
        CamembertTokenizer,
        DebertaTokenizer,
        DebertaV2Tokenizer,
        BertTokenizer,
        HerbertTokenizer,
        XLMTokenizer,
        MobileBertTokenizer,
        SqueezeBertTokenizer,
        AlbertTokenizer,
        GPT2Tokenizer,
        BartTokenizer,
        MBartTokenizer,
        MBart50Tokenizer,
        RobertaTokenizer,
        WhisperTokenizer,
        CodeGenTokenizer,
        CLIPTokenizer,
        MarianTokenizer,
        BloomTokenizer,
        NllbTokenizer,
        M2M100Tokenizer,
        LlamaTokenizer,
        CodeLlamaTokenizer,
        XLMRobertaTokenizer,
        MPNetTokenizer,
        FalconTokenizer,
        GPTNeoXTokenizer,
        Wav2Vec2CTCTokenizer,

        // Base case:
        PreTrainedTokenizer,
    }


    /**
     * Instantiate one of the tokenizer classes of the library from a pretrained model.
     * 
     * The tokenizer class to instantiate is selected based on the `tokenizer_class` property of the config object
     * (either passed as an argument or loaded from `pretrained_model_name_or_path` if possible)
     * 
     * @param {string} pretrained_model_name_or_path The name or path of the pretrained model. Can be either:
     * - A string, the *model id* of a pretrained tokenizer hosted inside a model repo on huggingface.co.
     *   Valid model ids can be located at the root-level, like `bert-base-uncased`, or namespaced under a
     *   user or organization name, like `dbmdz/bert-base-german-cased`.
     * - A path to a *directory* containing tokenizer files, e.g., `./my_model_directory/`.
     * @param {PretrainedOptions} options Additional options for loading the tokenizer.
     * 
     * @returns {Promise<PreTrainedTokenizer>} A new instance of the PreTrainedTokenizer class.
     */
    static async from_pretrained(pretrained_model_name_or_path, {
        quantized = true,
        progress_callback = null,
        config = null,
        cache_dir = null,
        local_files_only = false,
        revision = 'main',
    } = {}) {

        let [tokenizerJSON, tokenizerConfig] = await loadTokenizer(pretrained_model_name_or_path, {
            quantized,
            progress_callback,
            config,
            cache_dir,
            local_files_only,
            revision,
        })

        // Some tokenizers are saved with the "Fast" suffix, so we remove that if present.
        let tokenizerName = tokenizerConfig.tokenizer_class.replace(/Fast$/, '');

        let cls = this.TOKENIZER_CLASS_MAPPING[tokenizerName];
        if (!cls) {
            console.warn(`Unknown tokenizer class "${tokenizerName}", attempting to construct from base class.`);
            cls = PreTrainedTokenizer;
        }
        return new cls(tokenizerJSON, tokenizerConfig);
    }
}

;// CONCATENATED MODULE: ./node_modules/@xenova/transformers/src/configs.js

/**
 * @file Helper module for using model configs. For more information, see the corresponding
 * [Python documentation](https://huggingface.co/docs/transformers/main/en/model_doc/auto#transformers.AutoConfig).
 * 
 * **Example:** Load an `AutoConfig`.
 * 
 * ```javascript
 * import { AutoConfig } from '@xenova/transformers';
 * let config = await AutoConfig.from_pretrained('bert-base-uncased');
 * console.log(config);
 * // PretrainedConfig {
 * //   "model_type": "bert",
 * //   "is_encoder_decoder": false,
 * //   "architectures": [
 * //       "BertForMaskedLM"
 * //   ],
 * //   "vocab_size": 30522
 * //   "num_attention_heads": 12,
 * //   "num_hidden_layers": 12,
 * //   "hidden_size": 768,
 * //   "max_position_embeddings": 512,
 * //   ...
 * // }
 * ```
 * 
 * @module configs
 */



/**
 * @typedef {import('./utils/hub.js').PretrainedOptions} PretrainedOptions
 */


/**
 * Loads a config from the specified path.
 * @param {string} pretrained_model_name_or_path The path to the config directory.
 * @param {PretrainedOptions} options Additional options for loading the config.
 * @returns {Promise<Array>} A promise that resolves with information about the loaded config.
 */
async function loadConfig(pretrained_model_name_or_path, options) {
    let info = await getModelJSON(pretrained_model_name_or_path, 'config.json', true, options);
    return info;
}

/**
 * Base class for all configuration classes. For more information, see the corresponding
 * [Python documentation](https://huggingface.co/docs/transformers/main/en/main_classes/configuration#transformers.PretrainedConfig).
 */
class PretrainedConfig {
    // NOTE: Typo in original

    /**
     * Create a new PreTrainedTokenizer instance.
     * @param {Object} configJSON The JSON of the config.
     */
    constructor(configJSON) {
        this.model_type = null;
        this.is_encoder_decoder = false;

        Object.assign(this, configJSON);
    }

    /**
     * Loads a pre-trained config from the given `pretrained_model_name_or_path`. 
     * 
     * @param {string} pretrained_model_name_or_path The path to the pre-trained config.
     * @param {PretrainedOptions} options Additional options for loading the config.
     * @throws {Error} Throws an error if the config.json is not found in the `pretrained_model_name_or_path`.
     * 
     * @returns {Promise<PretrainedConfig>} A new instance of the `PretrainedConfig` class.
     */
    static async from_pretrained(pretrained_model_name_or_path, {
        progress_callback = null,
        config = null,
        cache_dir = null,
        local_files_only = false,
        revision = 'main',
    } = {}) {

        let data = config ?? await loadConfig(pretrained_model_name_or_path, {
            progress_callback,
            config,
            cache_dir,
            local_files_only,
            revision,
        })
        return new this(data);
    }
}

/**
 * Helper class which is used to instantiate pretrained configs with the `from_pretrained` function.
 * 
 * @example
 * let config = await AutoConfig.from_pretrained('bert-base-uncased'); 
 */
class AutoConfig {
    /** @type {PretrainedConfig.from_pretrained} */
    static async from_pretrained(...args) {
        return PretrainedConfig.from_pretrained(...args);
    }
}

;// CONCATENATED MODULE: ./node_modules/@xenova/transformers/src/utils/generation.js

/**
 * @file Classes, functions, and utilities for generation.
 * 
 * @todo Describe how to create a custom `GenerationConfig`.
 * 
 * @module utils/generation
 */




/**
 * A class representing a list of logits processors. A logits processor is a function that modifies the logits
 * output of a language model. This class provides methods for adding new processors and applying all processors to a
 * batch of logits.
 *
 * @extends Callable
 */
class LogitsProcessorList extends Callable {
    /**
     * Constructs a new instance of `LogitsProcessorList`.
     */
    constructor() {
        super();
        this.processors = [];
    }

    /**
     * Adds a new logits processor to the list.
     *
     * @param {LogitsProcessor} item The logits processor function to add.
     */
    push(item) {
        this.processors.push(item);
    }

    /**
     * Adds multiple logits processors to the list.
     *
     * @param {LogitsProcessor[]} items The logits processor functions to add.
     */
    extend(items) {
        this.processors.push(...items);
    }

    /**
     * Applies all logits processors in the list to a batch of logits, modifying them in-place.
     *
     * @param {number[]} input_ids The input IDs for the language model.
     * @param {number[][]} batchedLogits A 2D array of logits, where each row corresponds to a single
     *                                                input sequence in the batch.
     */
    _call(input_ids, batchedLogits) {
        // NOTE: This is different from the Python code, since vanilla JS does not support vectorized operations. 
        // As a result, we apply each processor to each item in the batch.
        for (let logits of batchedLogits) {
            // Modifies logits inplace
            this.processors.forEach(
                func => func(input_ids, logits)
            )
        }
    }

    [Symbol.iterator]() {
        return this.processors.values();
    }
}

/**
 * Base class for processing logits.
 * @extends Callable
 */
class LogitsProcessor extends Callable {
    /**
     * Apply the processor to the input logits.
     *
     * @abstract
     * @param {Array} input_ids The input ids.
     * @param {Tensor} logits The logits to process.
     * @throws {Error} Throws an error if `_call` is not implemented in the subclass.
     */
    _call(input_ids, logits) {
        throw Error("`_call` should be implemented in a subclass")
    }
}

/**
 * A logits processor that forces a specific token to be generated by the decoder.
 * 
 * @extends LogitsProcessor
 */
class ForceTokensLogitsProcessor extends LogitsProcessor {
    /**
     * Constructs a new instance of `ForceTokensLogitsProcessor`.
     * 
     * @param {Array} forced_decoder_ids The ids of tokens that should be forced.
     */
    constructor(forced_decoder_ids) {
        super();
        this.force_token_map = Object.fromEntries(forced_decoder_ids ?? []);
    }

    /**
     * Apply the processor to the input logits.
     *
     * @param {Array} input_ids The input ids.
     * @param {Tensor} logits The logits to process.
     * @returns {Tensor} The processed logits.
     */
    _call(input_ids, logits) {
        let map = this.force_token_map[input_ids.length];
        if (exists(map)) { // There exists a mapping
            logits.data.fill(-Infinity)
            logits.data[map] = 0;
        }
        return logits;
    }
}

/**
 * A LogitsProcessor that forces a BOS token at the beginning of the generated sequence.
 * @extends LogitsProcessor
 */
class ForcedBOSTokenLogitsProcessor extends LogitsProcessor {
    /**
     * Create a ForcedBOSTokenLogitsProcessor.
     * @param {number} bos_token_id The ID of the beginning-of-sequence token to be forced.
     */
    constructor(bos_token_id) {
        super();
        this.bos_token_id = bos_token_id;
    }

    /**
     * Apply the BOS token forcing to the logits.
     * @param {Array} input_ids The input IDs.
     * @param {Object} logits The logits.
     * @returns {Object} The logits with BOS token forcing.
     */
    _call(input_ids, logits) {
        if (input_ids.length === 1) {
            logits.data.fill(-Infinity)
            logits.data[this.bos_token_id] = 0;
        }
        return logits;
    }
}

/**
 * A logits processor that forces end-of-sequence token probability to 1.
 * 
 * @extends LogitsProcessor
 */
class ForcedEOSTokenLogitsProcessor extends LogitsProcessor {
    /**
     * Create a ForcedEOSTokenLogitsProcessor.
     * @param {number} max_length Max length of the sequence.
     * @param {number|number[]} forced_eos_token_id The ID of the end-of-sequence token to be forced.
     */
    constructor(max_length, forced_eos_token_id) {
        super();
        this.max_length = max_length;
        this.forced_eos_token_id = forced_eos_token_id;
    }

    /**
     * Apply the processor to input_ids and logits.
     * 
     * @param {number[]} input_ids The input ids.
     * @param {Tensor} logits The logits tensor.
     */
    _call(input_ids, logits) {
        // console.log('call ForcedEOSTokenLogitsProcessor')
        // TODO
    }
}

/**
 * A LogitsProcessor that suppresses a list of tokens as soon as the `generate` function starts
 * generating using `begin_index` tokens. This should ensure that the tokens defined by
 * `begin_suppress_tokens` at not sampled at the begining of the generation.
 * @extends LogitsProcessor
 */
class SuppressTokensAtBeginLogitsProcessor extends LogitsProcessor {
    /**
     * Create a SuppressTokensAtBeginLogitsProcessor.
     * @param {number[]} begin_suppress_tokens The IDs of the tokens to suppress.
     * @param {number} begin_index The number of tokens to generate before suppressing tokens.
     */
    constructor(begin_suppress_tokens, begin_index) {
        super();
        this.begin_suppress_tokens = begin_suppress_tokens;
        this.begin_index = begin_index;
    }

    /**
     * Apply the BOS token forcing to the logits.
     * @param {Array} input_ids The input IDs.
     * @param {Object} logits The logits.
     * @returns {Object} The logits with BOS token forcing.
     */
    _call(input_ids, logits) {
        if (input_ids.length === this.begin_index) {
            for (let token_id of this.begin_suppress_tokens) {
                logits.data[token_id] = -Infinity;
            }
        }
        return logits;
    }
}

/**
 * A LogitsProcessor that handles adding timestamps to generated text.
 * @extends LogitsProcessor
 */
class WhisperTimeStampLogitsProcessor extends LogitsProcessor {
    /**
     * Constructs a new WhisperTimeStampLogitsProcessor.
     * @param {Object} generate_config The config object passed to the `generate()` method of a transformer model.
     * @param {number} generate_config.eos_token_id The ID of the end-of-sequence token.
     * @param {number} generate_config.no_timestamps_token_id The ID of the token used to indicate that a token should not have a timestamp.
     * @param {number[][]} [generate_config.forced_decoder_ids] An array of two-element arrays representing decoder IDs that are forced to appear in the output. The second element of each array indicates whether the token is a timestamp.
     * @param {number} [generate_config.max_initial_timestamp_index] The maximum index at which an initial timestamp can appear.
     */
    constructor(generate_config) {
        super();
        this.eos_token_id = generate_config.eos_token_id;
        this.no_timestamps_token_id = generate_config.no_timestamps_token_id;
        this.timestamp_begin = this.no_timestamps_token_id + 1;

        this.begin_index = (generate_config.forced_decoder_ids || []).length + 2;
        if (generate_config.forced_decoder_ids.slice(-1)[0][1] === this.no_timestamps_token_id) {
            this.begin_index -= 1;
        }
        this.max_initial_timestamp_index = generate_config.max_initial_timestamp_index;

    }

    /**
     * Modify the logits to handle timestamp tokens.
     * @param {Array} input_ids The input sequence of tokens.
     * @param {Tensor} logits The logits output by the model.
     * @returns {Tensor} The modified logits.
     */
    _call(input_ids, logits) {
        // suppress <|notimestamps|> which is handled by without_timestamps
        logits.data[this.no_timestamps_token_id] = -Infinity;

        if (input_ids.length === this.begin_index - 1) {
            logits.data.fill(-Infinity);
            logits.data[this.timestamp_begin] = 0;
            return logits;
        }

        // timestamps have to appear in pairs, except directly before eos_token; mask logits accordingly
        const seq = input_ids.slice(this.begin_index);
        const last_was_timestamp = seq.length >= 1 && seq[seq.length - 1] >= this.timestamp_begin;
        const penultimate_was_timestamp = seq.length < 2 || seq[seq.length - 2] >= this.timestamp_begin;

        if (last_was_timestamp) {
            if (penultimate_was_timestamp) { // has to be non-timestamp
                logits.data.subarray(this.timestamp_begin).fill(-Infinity);
            } else { // cannot be normal text tokens
                logits.data.subarray(0, this.eos_token_id).fill(-Infinity);
            }
        }

        // apply the `max_initial_timestamp` option
        if (input_ids.length === this.begin_index && this.max_initial_timestamp_index !== null) {
            const last_allowed = this.timestamp_begin + this.max_initial_timestamp_index;
            logits.data.subarray(last_allowed + 1).fill(-Infinity);
        }

        // if sum of probability over timestamps is above any other token, sample timestamp
        const logprobs = log_softmax(logits.data);
        const timestamp_logprob = Math.log(logprobs.subarray(this.timestamp_begin).map(Math.exp).reduce((a, b) => a + b));
        const max_text_token_logprob = max(logprobs.subarray(0, this.timestamp_begin))[0];

        if (timestamp_logprob > max_text_token_logprob) {
            logits.data.subarray(0, this.timestamp_begin).fill(-Infinity);
        }

        return logits;
    }
}

/**
 * A logits processor that disallows ngrams of a certain size to be repeated.
 * 
 * @extends LogitsProcessor
 */
class NoRepeatNGramLogitsProcessor extends LogitsProcessor {
    /**
     * Create a NoRepeatNGramLogitsProcessor.
     * @param {number} no_repeat_ngram_size The no-repeat-ngram size. All ngrams of this size can only occur once.
     */
    constructor(no_repeat_ngram_size) {
        super();
        this.no_repeat_ngram_size = no_repeat_ngram_size;
    }

    /**
     * Generate n-grams from a sequence of token ids.
     * @param {number[]} prevInputIds List of previous input ids
     * @returns {Map<string, number[]>} Map of generated n-grams
     */
    getNgrams(prevInputIds) {
        const curLen = prevInputIds.length;

        /**@type {number[][]} */
        const ngrams = [];
        for (let j = 0; j < curLen + 1 - this.no_repeat_ngram_size; ++j) {
            const ngram = [];
            for (let k = 0; k < this.no_repeat_ngram_size; ++k) {
                ngram.push(prevInputIds[j + k]);
            }
            ngrams.push(ngram);
        }

        /** @type {Map<string, number[]>} */
        const generatedNgram = new Map();
        for (const ngram of ngrams) {
            const prevNgram = ngram.slice(0, ngram.length - 1);
            const prevNgramKey = JSON.stringify(prevNgram);
            const prevNgramValue = generatedNgram.get(prevNgramKey) ?? [];
            prevNgramValue.push(ngram[ngram.length - 1]);
            generatedNgram.set(prevNgramKey, prevNgramValue);
        }
        return generatedNgram;
    }

    /**
     * Generate n-grams from a sequence of token ids.
     * @param {Map<string, number[]>} bannedNgrams Map of banned n-grams
     * @param {number[]} prevInputIds List of previous input ids
     * @returns {number[]} Map of generated n-grams
     */
    getGeneratedNgrams(bannedNgrams, prevInputIds) {
        const ngramIdx = prevInputIds.slice(prevInputIds.length + 1 - this.no_repeat_ngram_size, prevInputIds.length);
        const banned = bannedNgrams.get(JSON.stringify(ngramIdx)) ?? [];
        return banned;
    }

    /**
     * Calculate banned n-gram tokens
     * @param {number[]} prevInputIds List of previous input ids
     * @returns {number[]} Map of generated n-grams
     */
    calcBannedNgramTokens(prevInputIds) {
        const bannedTokens = [];
        if (prevInputIds.length + 1 < this.no_repeat_ngram_size) {
            // return no banned tokens if we haven't generated no_repeat_ngram_size tokens yet
            return bannedTokens;

        } else {
            const generatedNgrams = this.getNgrams(prevInputIds);
            const bannedTokens = this.getGeneratedNgrams(generatedNgrams, prevInputIds);
            return bannedTokens;
        }
    }

    /**
     * Apply the no-repeat-ngram processor to the logits.
     * @param {Array} input_ids The input IDs.
     * @param {Object} logits The logits.
     * @returns {Object} The logits with no-repeat-ngram processing.
     */
    _call(input_ids, logits) {
        const bannedTokens = this.calcBannedNgramTokens(input_ids);

        for (const token of bannedTokens) {
            logits.data[token] = -Infinity;
        }
        return logits;
    }
}

/**
 * A logits processor that penalises repeated output tokens.
 * 
 * @extends LogitsProcessor
 */
class RepetitionPenaltyLogitsProcessor extends LogitsProcessor {
    /**
     * Create a RepetitionPenaltyLogitsProcessor.
     * @param {number} penalty The penalty to apply for repeated tokens.
     */
    constructor(penalty) {
        super();
        this.penalty = penalty;
    }

    /**
     * Apply the repetition penalty to the logits.
     * @param {Array} input_ids The input IDs.
     * @param {Object} logits The logits.
     * @returns {Object} The logits with repetition penalty processing.
     */
    _call(input_ids, logits) {
        // Modify the logits corresponding to each element in `input_ids`.
        // As a consequence, the logits corresponding to tokens that appear
        // many times in the output will be penalised more.
        for (const input_id of input_ids) {
            if (logits.data[input_id] < 0) {
                logits.data[input_id] *= this.penalty;
            } else {
                logits.data[input_id] /= this.penalty;
            }
        }
        return logits
    }
}

/**
 * Class that holds a configuration for a generation task.
 */
class GenerationConfig {
    /**
     * Create a GenerationConfig object
     * @param {Object} [kwargs={}] The configuration parameters. If not set, the default values are used.
     * @param {number} [kwargs.max_length=20] The maximum length the generated tokens can have. Corresponds to the length of the input prompt + `max_new_tokens`. Its effect is overridden by `max_new_tokens`, if also set.
     * @param {number} [kwargs.max_new_tokens=null] The maximum numbers of tokens to generate, ignoring the number of tokens in the prompt.
     * @param {number} [kwargs.min_length=0] The minimum length of the sequence to be generated. Corresponds to the length of the input prompt + `min_new_tokens`. Its effect is overridden by `min_new_tokens`, if also set.
     * @param {number} [kwargs.min_new_tokens=null] The minimum numbers of tokens to generate, ignoring the number of tokens in the prompt.
     * @param {boolean|"never"} [kwargs.early_stopping=false] Controls the stopping condition for beam-based methods, like beam-search. It accepts the following values:
     * - `true`, where the generation stops as soon as there are `num_beams` complete candidates;
     * - `false`, where an heuristic is applied and the generation stops when is it very unlikely to find better candidates;
     * - `"never"`, where the beam search procedure only stops when there cannot be better candidates (canonical beam search algorithm).
     * @param {number} [kwargs.max_time=null] The maximum amount of time you allow the computation to run for in seconds. Generation will still finish the current pass after allocated time has been passed.
     *
     * @param {boolean} [kwargs.do_sample=false] Whether or not to use sampling; use greedy decoding otherwise.
     * @param {number} [kwargs.num_beams=1] Number of beams for beam search. 1 means no beam search.
     * @param {number} [kwargs.num_beam_groups=1] Number of groups to divide `num_beams` into in order to ensure diversity among different groups of beams. See [this paper](https://arxiv.org/pdf/1610.02424.pdf) for more details.
     * @param {number} [kwargs.penalty_alpha=null] The values balance the model confidence and the degeneration penalty in contrastive search decoding.
     * @param {boolean} [kwargs.use_cache=true] Whether or not the model should use the past last key/values attentions (if applicable to the model) to speed up decoding.
     *
     * @param {number} [kwargs.temperature=1.0] The value used to modulate the next token probabilities.
     * @param {number} [kwargs.top_k=50] The number of highest probability vocabulary tokens to keep for top-k-filtering.
     * @param {number} [kwargs.top_p=1.0] If set to float < 1, only the smallest set of most probable tokens with probabilities that add up to `top_p` or higher are kept for generation.
     * @param {number} [kwargs.typical_p=1.0] Local typicality measures how similar the conditional probability of predicting a target token next is to the expected conditional probability of predicting a random token next, given the partial text already generated. If set to float < 1, the smallest set of the most locally typical tokens with probabilities that add up to `typical_p` or higher are kept for generation. See [this paper](https://arxiv.org/pdf/2202.00666.pdf) for more details.
     * @param {number} [kwargs.epsilon_cutoff=0.0] If set to float strictly between 0 and 1, only tokens with a conditional probability greater than `epsilon_cutoff` will be sampled. In the paper, suggested values range from 3e-4 to 9e-4, depending on the size of the model. See [Truncation Sampling as Language Model Desmoothing](https://arxiv.org/abs/2210.15191) for more details.
     * @param {number} [kwargs.eta_cutoff=0.0] Eta sampling is a hybrid of locally typical sampling and epsilon sampling. If set to float strictly between 0 and 1, a token is only considered if it is greater than either `eta_cutoff` or `sqrt(eta_cutoff) * exp(-entropy(softmax(next_token_logits)))`. The latter term is intuitively the expected next token probability, scaled by `sqrt(eta_cutoff)`. In the paper, suggested values range from 3e-4 to 2e-3, depending on the size of the model. See [Truncation Sampling as Language Model Desmoothing](https://arxiv.org/abs/2210.15191) for more details.
     * @param {number} [kwargs.diversity_penalty=0.0] This value is subtracted from a beam's score if it generates a token same as any beam from other group at a particular time. Note that `diversity_penalty` is only effective if `group beam search` is enabled.
     * @param {number} [kwargs.repetition_penalty=1.0] The parameter for repetition penalty. 1.0 means no penalty. See [this paper](https://arxiv.org/pdf/1909.05858.pdf) for more details.
     * @param {number} [kwargs.encoder_repetition_penalty=1.0] The paramater for encoder_repetition_penalty. An exponential penalty on sequences that are not in the original input. 1.0 means no penalty.
     * @param {number} [kwargs.length_penalty=1.0] Exponential penalty to the length that is used with beam-based generation. It is applied as an exponent to the sequence length, which in turn is used to divide the score of the sequence. Since the score is the log likelihood of the sequence (i.e. negative), `length_penalty` > 0.0 promotes longer sequences, while `length_penalty` < 0.0 encourages shorter sequences.
     * @param {number} [kwargs.no_repeat_ngram_size=0] If set to int > 0, all ngrams of that size can only occur once.
     * @param {number[][]} [kwargs.bad_words_ids=null] List of token ids that are not allowed to be generated. In order to get the token ids of the words that should not appear in the generated text, use `(await tokenizer(bad_words, {add_prefix_space: true, add_special_tokens: false})).input_ids`.
     * @param {number[][]|number[][][]} [kwargs.force_words_ids=null] List of token ids that must be generated. If given a `number[][]`, this is treated as a simple list of words that must be included, the opposite to `bad_words_ids`. If given `number[][][]`, this triggers a [disjunctive constraint](https://github.com/huggingface/transformers/issues/14081), where one can allow different forms of each word.
     * @param {boolean} [kwargs.renormalize_logits=false] Whether to renormalize the logits after applying all the logits processors or warpers (including the custom ones). It's highly recommended to set this flag to `true` as the search algorithms suppose the score logits are normalized but some logit processors or warpers break the normalization.
     * @param {Object[]} [kwargs.constraints=null] Custom constraints that can be added to the generation to ensure that the output will contain the use of certain tokens as defined by `Constraint` objects, in the most sensible way possible.
     * 
     * @param {number} [kwargs.forced_bos_token_id=null] The id of the token to force as the first generated token after the `decoder_start_token_id`. Useful for multilingual models like mBART where the first generated token needs to be the target language token.
     * @param {number|number[]} [kwargs.forced_eos_token_id=null] The id of the token to force as the last generated token when `max_length` is reached. Optionally, use a list to set multiple *end-of-sequence* tokens.
     * @param {boolean} [kwargs.remove_invalid_values=false] Whether to remove possible *nan* and *inf* outputs of the model to prevent the generation method to crash. Note that using `remove_invalid_values` can slow down generation.
     * @param {number[]} [kwargs.exponential_decay_length_penalty=null] This Tuple adds an exponentially increasing length penalty, after a certain amount of tokens have been generated. The tuple shall consist of: `(start_index, decay_factor)` where `start_index` indicates where penalty starts and `decay_factor` represents the factor of exponential decay.
     * @param {number[]} [kwargs.suppress_tokens=null] A list of tokens that will be suppressed at generation. The `SupressTokens` logit processor will set their log probs to `-inf` so that they are not sampled.
     * @param {number[]} [kwargs.begin_suppress_tokens=null] A list of tokens that will be suppressed at the beginning of the generation. The `SupressBeginTokens` logit processor will set their log probs to `-inf` so that they are not sampled.
     * @param {number[][]} [kwargs.forced_decoder_ids=null] A list of pairs of integers which indicates a mapping from generation indices to token indices that will be forced before sampling. For example, `[[1, 123]]` means the second generated token will always be a token of index 123.
     * 
     * @param {number} [kwargs.num_return_sequences=1] The number of independently computed returned sequences for each element in the batch.
     * @param {boolean} [kwargs.output_attentions=false] Whether or not to return the attentions tensors of all attention layers. See `attentions` under returned tensors for more details.
     * @param {boolean} [kwargs.output_hidden_states=false] Whether or not to return the hidden states of all layers. See `hidden_states` under returned tensors for more details.
     * @param {boolean} [kwargs.output_scores=false] Whether or not to return the prediction scores. See `scores` under returned tensors for more details.
     * @param {boolean} [kwargs.return_dict_in_generate=false] Whether or not to return a `ModelOutput` instead of a plain tuple.
     * 
     * @param {number} [kwargs.pad_token_id=null] The id of the *padding* token.
     * @param {number} [kwargs.bos_token_id=null] The id of the *beginning-of-sequence* token.
     * @param {number|number[]} [kwargs.eos_token_id=null] The id of the *end-of-sequence* token. Optionally, use a list to set multiple *end-of-sequence* tokens.
     * 
     * @param {number} [kwargs.encoder_no_repeat_ngram_size=0] If set to int > 0, all ngrams of that size that occur in the `encoder_input_ids` cannot occur in the `decoder_input_ids`.
     * @param {number} [kwargs.decoder_start_token_id=null] If an encoder-decoder model starts decoding with a different token than *bos*, the id of that token.
     * 
     * @param {Object} [kwargs.generation_kwargs={}] Additional generation kwargs will be forwarded to the `generate` function of the model. Kwargs that are not present in `generate`'s signature will be used in the model forward pass.
     */
    constructor(kwargs = {}) {
        // Parameters that control the length of the output
        this.max_length = kwargs.max_length ?? 20;
        this.max_new_tokens = kwargs.max_new_tokens ?? null;
        this.min_length = kwargs.min_length ?? 0;
        this.min_new_tokens = kwargs.min_new_tokens ?? null;
        this.early_stopping = kwargs.early_stopping ?? false;
        this.max_time = kwargs.max_time ?? null;

        // Parameters that control the generation strategy used
        this.do_sample = kwargs.do_sample ?? false;
        this.num_beams = kwargs.num_beams ?? 1;
        this.num_beam_groups = kwargs.num_beam_groups ?? 1;
        this.penalty_alpha = kwargs.penalty_alpha ?? null;
        this.use_cache = kwargs.use_cache ?? true;

        // Parameters for manipulation of the model output logits
        this.temperature = kwargs.temperature ?? 1.0;
        this.top_k = kwargs.top_k ?? 50;
        this.top_p = kwargs.top_p ?? 1.0;
        this.typical_p = kwargs.typical_p ?? 1.0;
        this.epsilon_cutoff = kwargs.epsilon_cutoff ?? 0.0;
        this.eta_cutoff = kwargs.eta_cutoff ?? 0.0;
        this.diversity_penalty = kwargs.diversity_penalty ?? 0.0;
        this.repetition_penalty = kwargs.repetition_penalty ?? 1.0;
        this.encoder_repetition_penalty = kwargs.encoder_repetition_penalty ?? 1.0;
        this.length_penalty = kwargs.length_penalty ?? 1.0;
        this.no_repeat_ngram_size = kwargs.no_repeat_ngram_size ?? 0;
        this.bad_words_ids = kwargs.bad_words_ids ?? null;
        this.force_words_ids = kwargs.force_words_ids ?? null;
        this.renormalize_logits = kwargs.renormalize_logits ?? false;
        this.constraints = kwargs.constraints ?? null;
        this.forced_bos_token_id = kwargs.forced_bos_token_id ?? null;
        this.forced_eos_token_id = kwargs.forced_eos_token_id ?? null;
        this.remove_invalid_values = kwargs.remove_invalid_values ?? false;
        this.exponential_decay_length_penalty = kwargs.exponential_decay_length_penalty ?? null;
        this.suppress_tokens = kwargs.suppress_tokens ?? null;
        this.begin_suppress_tokens = kwargs.begin_suppress_tokens ?? null;
        this.forced_decoder_ids = kwargs.forced_decoder_ids ?? null;

        // Parameters that define the output variables of `generate`
        this.num_return_sequences = kwargs.num_return_sequences ?? 1;
        this.output_attentions = kwargs.output_attentions ?? false;
        this.output_hidden_states = kwargs.output_hidden_states ?? false;
        this.output_scores = kwargs.output_scores ?? false;
        this.return_dict_in_generate = kwargs.return_dict_in_generate ?? false;

        // Special tokens that can be used at generation time
        this.pad_token_id = kwargs.pad_token_id ?? null;
        this.bos_token_id = kwargs.bos_token_id ?? null;
        this.eos_token_id = kwargs.eos_token_id ?? null;

        // Generation parameters exclusive to encoder-decoder models
        this.encoder_no_repeat_ngram_size = kwargs.encoder_no_repeat_ngram_size ?? 0;
        this.decoder_start_token_id = kwargs.decoder_start_token_id ?? null;

        // Wild card
        this.generation_kwargs = kwargs.generation_kwargs ?? {};
    }
}


/**
 * Sampler is a base class for all sampling methods used for text generation.
 */
class Sampler extends Callable {
    /**
     * Creates a new Sampler object with the specified generation config.
     * @param {GenerationConfig} generation_config The generation config.
     */
    constructor(generation_config) {
        super();
        this.generation_config = generation_config;
    }

    /**
     * Executes the sampler, using the specified logits.
     * @param {Tensor} logits
     * @param {number} index
     * @returns {void}
     */
    _call(logits, index = -1) {
        // Sample from logits, of dims [batch, sequence_length, vocab_size].
        // If index is specified, sample from [batch, index, vocab_size].
        return this.sample(logits, index);
    }

    /**
     * Abstract method for sampling the logits.
     * @param {Tensor} logits
     * @param {number} index
     * @throws {Error}
     */
    sample(logits, index) {
        throw Error("sample should be implemented in subclasses.")
    }

    /**
     * Returns the specified logits as an array, with temperature applied.
     * @param {Tensor} logits
     * @param {number} index
     * @returns {Array}
     */
    getLogits(logits, index) {
        let vocabSize = logits.dims.at(-1);

        let logs = logits.data;

        if (index === -1) {
            logs = logs.slice(-vocabSize);
        } else {
            let startIndex = index * vocabSize;
            logs = logs.slice(startIndex, startIndex + vocabSize);
        }

        // add temperature
        if (this.generation_config.temperature > 0) {
            logs = logs.map(x => x / this.generation_config.temperature)
        }
        return logs;
    }

    /**
     * Selects an item randomly based on the specified probabilities.
     * @param {Array} probabilities An array of probabilities to use for selection.
     * @returns {number} The index of the selected item.
     */
    randomSelect(probabilities) {
        // Return index of chosen item
        let sumProbabilities = probabilities.reduce((acc, curr) => acc + curr, 0);

        let r = Math.random() * sumProbabilities;
        for (let i = 0; i < probabilities.length; ++i) {
            r -= probabilities[i];
            if (r <= 0) {
                return i;
            }
        }
        return 0; // return first (most probable) as a fallback
    }

    /**
     * Returns a Sampler object based on the specified options.
     * @param {GenerationConfig} generation_config An object containing options for the sampler.
     * @returns {Sampler} A Sampler object.
     */
    static getSampler(generation_config) {
        // - *greedy decoding*: `num_beams=1` and `do_sample=False`
        // - *contrastive search*: `penalty_alpha>0` and `top_k>1`
        // - *multinomial sampling*: `num_beams=1` and `do_sample=True`
        // - *beam-search decoding*: `num_beams>1` and `do_sample=False`
        // - *beam-search multinomial sampling*: `num_beams>1` and `do_sample=True`
        // - *diverse beam-search decoding*: `num_beams>1` and `num_beam_groups>1`
        // - *constrained beam-search decoding*: `constraints!=None` or `force_words_ids!=None`

        // NOTE: beam search is implemented directly into the generation function
        if (generation_config.do_sample) {
            return new MultinomialSampler(generation_config);

        } else if (generation_config.num_beams > 1) {
            return new BeamSearchSampler(generation_config);

        } else {
            if (generation_config.num_return_sequences > 1) {
                throw Error(`num_return_sequences has to be 1 when doing greedy search, but is ${generation_config.num_return_sequences}.`)
            }
            return new GreedySampler(generation_config);
        }
    }
}

/**
 * Class representing a Greedy Sampler.
 * @extends Sampler
 */
class GreedySampler extends Sampler {
    /**
     * Sample the maximum probability of a given logits tensor.
     * @param {Tensor} logits
     * @param {number} [index=-1]
     * @returns {Array} An array with a single tuple, containing the index of the maximum value and a meaningless score (since this is a greedy search).
     */
    sample(logits, index = -1) {
        // NOTE: no need to do log_softmax here since we only take the maximum
        let logs = this.getLogits(logits, index);
        let argmax = max(logs)[1];

        // Note: score is meaningless in this context, since we are performing
        // greedy search (p = 1 => log(p) = 0)
        return [
            [argmax, 0]
        ];
    }
}

/**
 * Class representing a MultinomialSampler.
 * @extends Sampler
 */
class MultinomialSampler extends Sampler {

    /**
     * Sample from the logits.
     * @param {Tensor} logits
     * @param {number} index
     * @returns {Array}
     */
    sample(logits, index = -1) {
        let k = logits.dims.at(-1); // defaults to vocab size
        if (this.generation_config.top_k > 0) {
            k = Math.min(this.generation_config.top_k, k);
        }

        // Get logits of nth token
        const logs = this.getLogits(logits, index);

        // Get top k tokens
        const topLogits = getTopItems(logs, k);

        // Compute softmax over logits
        const probabilities = softmax(topLogits.map(x => x[1]));

        return Array.from({ length: this.generation_config.num_beams }, () => {
            const sampledIndex = this.randomSelect(probabilities);
            return [
                topLogits[sampledIndex][0], // token id
                Math.log(probabilities[sampledIndex]), // score
            ];
        });
    }
}


/**
 * Class representing a BeamSearchSampler.
 * @extends Sampler
 */
class BeamSearchSampler extends Sampler {

    /**
     * Sample from the logits.
     * @param {Tensor} logits
     * @param {number} index
     * @returns {Array}
     */
    sample(logits, index = -1) {
        let k = logits.dims.at(-1); // defaults to vocab size
        if (this.generation_config.top_k > 0) {
            k = Math.min(this.generation_config.top_k, k);
        }

        // Get logits of nth token
        const logs = this.getLogits(logits, index);

        // Get top k tokens
        const topLogits = getTopItems(logs, k);

        // Compute softmax over logits
        const probabilities = softmax(topLogits.map(x => x[1]));

        return Array.from({ length: this.generation_config.num_beams }, (_, i) => {
            return [
                topLogits[i][0], // token id
                Math.log(probabilities[i]), // score
            ];
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/@xenova/transformers/src/models.js

/**
 * @file Definitions of all models available in Transformers.js.
 * 
 * **Example:** Load and run an `AutoModel`.
 * 
 * ```javascript
 * import { AutoModel, AutoTokenizer } from '@xenova/transformers';
 *
 * let tokenizer = await AutoTokenizer.from_pretrained('Xenova/bert-base-uncased');
 * let model = await AutoModel.from_pretrained('Xenova/bert-base-uncased');
 *
 * let inputs = await tokenizer('I love transformers!');
 * let { logits } = await model(inputs);
 * // Tensor {
 * //     data: Float32Array(183132) [-7.117443084716797, -7.107812881469727, -7.092104911804199, ...]
 * //     dims: (3) [1, 6, 30522],
 * //     type: "float32",
 * //     size: 183132,
 * // }
 * ```
 * 
 * We also provide other `AutoModel`s (listed below), which you can use in the same way as the Python library. For example:
 * 
 * **Example:** Load and run a `AutoModelForSeq2SeqLM`.
 * ```javascript
 * import { AutoModelForSeq2SeqLM, AutoTokenizer } from '@xenova/transformers';
 * 
 * let tokenizer = await AutoTokenizer.from_pretrained('Xenova/t5-small');
 * let model = await AutoModelForSeq2SeqLM.from_pretrained('Xenova/t5-small');
 *
 * let { input_ids } = await tokenizer('translate English to German: I love transformers!');
 * let outputs = await model.generate(input_ids);
 * let decoded = tokenizer.decode(outputs[0], { skip_special_tokens: true });
 * // 'Ich liebe Transformatoren!'
 * ```
 * 
 * @module models
 */













const { InferenceSession, Tensor: models_ONNXTensor } = ONNX;

/**
 * @typedef {import('./utils/hub.js').PretrainedOptions} PretrainedOptions
 */


//////////////////////////////////////////////////
// Model types: used internally
const MODEL_TYPES = {
    EncoderOnly: 0,
    EncoderDecoder: 1,
    Seq2Seq: 2,
    Vision2Seq: 3,
    DecoderOnly: 4,
}
//////////////////////////////////////////////////


//////////////////////////////////////////////////
// Helper functions

// Will be populated fully later
const MODEL_TYPE_MAPPING = new Map([
    ['CLIPTextModelWithProjection', MODEL_TYPES.EncoderOnly],
    ['CLIPVisionModelWithProjection', MODEL_TYPES.EncoderOnly],
]);

/**
 * Constructs an InferenceSession using a model file located at the specified path.
 * @param {string} pretrained_model_name_or_path The path to the directory containing the model file.
 * @param {string} fileName The name of the model file.
 * @param {PretrainedOptions} options Additional options for loading the model.
 * @returns {Promise<InferenceSession>} A Promise that resolves to an InferenceSession object.
 * @private
 */
async function constructSession(pretrained_model_name_or_path, fileName, options) {
    // TODO add option for user to force specify their desired execution provider
    let modelFileName = `onnx/${fileName}${options.quantized ? '_quantized' : ''}.onnx`;
    let buffer = await getModelFile(pretrained_model_name_or_path, modelFileName, true, options);

    try {
        return await InferenceSession.create(buffer, {
            executionProviders: executionProviders,
        });
    } catch (err) {
        // If the execution provided was only wasm, throw the error
        if (executionProviders.length === 1 && executionProviders[0] === 'wasm') {
            throw err;
        }

        console.warn(err);
        console.warn(
            'Something went wrong during model construction (most likely a missing operation). ' +
            'Using `wasm` as a fallback. '
        )
        return await InferenceSession.create(buffer, {
            executionProviders: ['wasm']
        });
    }
}

/**
 * Validate model inputs
 * @param {InferenceSession} session The InferenceSession object that will be run.
 * @param {Object} inputs The inputs to check.
 * @returns {Promise<Object>} A Promise that resolves to the checked inputs.
 * @throws {Error} If any inputs are missing.
 * @private
 */
async function validateInputs(session, inputs) {
    // NOTE: Only create a shallow copy
    const checkedInputs = {};
    const missingInputs = [];
    for (let inputName of session.inputNames) {
        if (inputs[inputName] === undefined) {
            missingInputs.push(inputName);
        } else {
            checkedInputs[inputName] = inputs[inputName];
        }
    }
    if (missingInputs.length > 0) {
        throw new Error(
            `An error occurred during model execution: "Missing the following inputs: ${missingInputs.join(', ')}.`);
    }

    const numInputsProvided = Object.keys(inputs).length;
    const numInputsNeeded = session.inputNames.length;
    if (numInputsProvided > numInputsNeeded) {
        // No missing inputs, but too many inputs were provided.
        // Warn the user and ignore the extra inputs.
        let ignored = Object.keys(inputs).filter(inputName => !session.inputNames.includes(inputName));
        console.warn(`WARNING: Too many inputs were provided (${numInputsProvided} > ${numInputsNeeded}). The following inputs will be ignored: "${ignored.join(', ')}".`);
    }

    return checkedInputs;
}

/**
 * Executes an InferenceSession using the specified inputs.
 * NOTE: `inputs` must contain at least the input names of the model.
 *  - If additional inputs are passed, they will be ignored.
 *  - If inputs are missing, an error will be thrown.
 * 
 * @param {InferenceSession} session The InferenceSession object to run.
 * @param {Object} inputs An object that maps input names to input tensors.
 * @returns {Promise<Object>} A Promise that resolves to an object that maps output names to output tensors.
 * @private
 */
async function sessionRun(session, inputs) {
    const checkedInputs = await validateInputs(session, inputs);
    try {
        let output = await session.run(checkedInputs);
        output = replaceTensors(output);
        return output;
    } catch (e) {
        // This usually occurs when the inputs are of the wrong type.
        console.error(`An error occurred during model execution: "${e}".`);
        console.error('Inputs given to model:', checkedInputs);
        throw e;
    }
}

/**
 * Replaces ONNX Tensor objects with custom Tensor objects to support additional functions.
 * @param {Object} obj The object to replace tensor objects in.
 * @returns {Object} The object with tensor objects replaced by custom Tensor objects.
 * @private
 */
function replaceTensors(obj) {
    for (let prop in obj) {
        if (obj[prop] instanceof models_ONNXTensor) {
            obj[prop] = new Tensor(obj[prop]);
        } else if (typeof obj[prop] === 'object') {
            replaceTensors(obj[prop]);
        }
    }
    return obj;
}


/**
 * Converts an array or Tensor of integers to an int64 Tensor.
 * @param {Array|Tensor} items The input integers to be converted.
 * @returns {Tensor} The int64 Tensor with the converted values.
 * @throws {Error} If the input array is empty or the input is a batched Tensor and not all sequences have the same length.
 * @private
 */
function toI64Tensor(items) {
    if (items instanceof Tensor) {
        return items;
    }
    // items is an array
    if (items.length === 0) {
        throw Error("items must be non-empty");
    }

    if (Array.isArray(items[0])) {
        // batched
        if (items.some(x => x.length !== items[0].length)) {
            throw Error("Unable to create tensor, you should probably activate truncation and/or padding with 'padding=True' and/or 'truncation=True' to have batched tensors with the same length.")
        }

        return new Tensor('int64',
            BigInt64Array.from(items.flat().map(x => BigInt(x))),
            [items.length, items[0].length]
        );
    } else {
        //flat
        return new Tensor('int64',
            BigInt64Array.from(items.map(x => BigInt(x))),
            [1, items.length]
        );
    }
}

/**
 * Prepares an attention mask for a sequence of tokens based on configuration options.
 * @param {Object} self The calling object instance.
 * @param {Tensor} tokens The input tokens.
 * @returns {Tensor} The attention mask tensor.
 * @private
 */
function prepareAttentionMask(self, tokens) {

    // Prepare attention mask
    let pad_token_id = self.config.pad_token_id ?? null;
    let eos_token_id = self.config.eos_token_id ?? null;
    if (isIntegralNumber(eos_token_id)) {
        eos_token_id = [eos_token_id];
    }

    let is_pad_token_in_inputs = tokens.indexOf(pad_token_id) !== -1;
    let is_pad_token_not_equal_to_eos_token_id = (eos_token_id === null) || !eos_token_id.includes(pad_token_id)

    if (is_pad_token_in_inputs && is_pad_token_not_equal_to_eos_token_id) {
        let data = BigInt64Array.from(
            // Note: != so that int matches bigint
            tokens.data.map(x => x != pad_token_id)
        )
        return new Tensor('int64', data, tokens.dims)
    } else {
        return new Tensor(
            'int64',
            new BigInt64Array(tokens.data.length).fill(1n),
            tokens.dims
        )
    }
}

/**
 * Creates a boolean tensor with a single value.
 * @param {boolean} value The value of the tensor.
 * @returns {Tensor} The boolean tensor.
 * @private
 */
function boolTensor(value) {
    return new Tensor('bool', [value], [1]);
}

// JS doesn't support mixins, so we define some reused functions here, and allow "this" to be passed in
/**
 * Perform forward pass on the seq2seq model (both encoder and decoder).
 * @param {Object} self The seq2seq model object.
 * @param {Object} model_inputs The input object for the model containing encoder and decoder inputs.
 * @returns {Promise<Seq2SeqLMOutput>} Promise that resolves with the output of the seq2seq model.
 * @private
 */
async function seq2seqForward(self, model_inputs) {
    const add_decoder_pkv = self.add_decoder_pkv ?? true;

    let { encoder_outputs, past_key_values } = model_inputs;

    if (!encoder_outputs) {
        // Encoder outputs are not given, so we must compute them.
        encoder_outputs = (await encoderForward(self, model_inputs)).last_hidden_state;
    }
    let decoderFeeds = {
        input_ids: model_inputs.decoder_input_ids,
        encoder_hidden_states: encoder_outputs,
        use_cache_branch: boolTensor(!!past_key_values)
    };

    if (self.decoder_merged_session.inputNames.includes('encoder_attention_mask')) {
        decoderFeeds.encoder_attention_mask = model_inputs.attention_mask
    }
    self.addPastKeyValues(decoderFeeds, past_key_values, add_decoder_pkv);

    const decoderResults = await sessionRun(self.decoder_merged_session, decoderFeeds);
    let logits = decoderResults.logits;
    past_key_values = self.getPastKeyValues(decoderResults, past_key_values);

    // Get cross attention and/or decoder attentions if they are present
    const attns = self.getAttentions(decoderResults);

    return new Seq2SeqLMOutput({ logits, past_key_values, encoder_outputs, ...attns });
}

/**
 * Start the beam search process for the seq2seq model.
 * @param {PreTrainedModel} self The seq2seq model object.
 * @param {Object[]} inputTokenIds Array of input token ids for each input sequence.
 * @param {number} numOutputTokens The maximum number of output tokens for the model.
 * @returns {Object[]} Array of beam search objects.
 * @private
 */
function seq2seqStartBeams(self, inputTokenIds, numOutputTokens) {
    let beams = [];
    let beamId = 0;

    // @ts-ignore
    const requires_attention_mask = self.requires_attention_mask ?? true;

    // decoder_input_ids == output_token_ids
    let decoder_input_ids = self.config.decoder_start_token_id;
    if (!Array.isArray(decoder_input_ids)) {
        decoder_input_ids = [decoder_input_ids];
    }

    for (let tokens of inputTokenIds) {
        // TODO: Improve
        // Currently, just add back batch dimension.
        // In future, allow for true parallel execution
        tokens.dims = [1, ...tokens.dims]

        // Create beam
        let start = {
            inputs: tokens,
            encoder_outputs: null,
            prev_model_outputs: null,

            output_token_ids: decoder_input_ids,
            done: false,
            score: 0,
            id: beamId++ // assign unique id to beams
        }

        if (requires_attention_mask) {
            start.attention_mask = prepareAttentionMask(self, tokens);
        }

        beams.push(start);
    }

    return beams;
}

/**
 * Run beam search on the seq2seq model for a single beam.
 * @param {PreTrainedModel} self The seq2seq model object.
 * @param {Object} beam The beam search object for which to run the model.
 * @param {Object} options options
 * @param {string} [options.input_name='input_ids'] The name of the input tensor for the encoder.
 * @returns {Promise<Object>} Promise that resolves with the output of the seq2seq model for the given beam.
 * @private
 */
async function seq2seqRunBeam(self, beam) {
    const input_name = self.main_input_name;

    // 1. Prepare
    let model_inputs = {
        [input_name]: beam.inputs,
        decoder_input_ids: toI64Tensor(beam.output_token_ids.slice(-1)),
        encoder_outputs: beam.encoder_outputs,
        past_key_values: beam.prev_model_outputs?.past_key_values,
    }
    if (beam.attention_mask) {
        model_inputs.attention_mask = beam.attention_mask
    }

    // 2. Run
    let output = await self.forward(model_inputs);

    // 3. Update
    beam.prev_model_outputs = output;
    beam.encoder_outputs = output.encoder_outputs;

    return output;
}

/**
 * Update a beam with a new token ID.
 * @param {Object} beam The beam to update.
 * @param {number} newTokenId The new token ID to add to the beam's output.
 * @private
 */
function seq2seqUpdatebeam(beam, newTokenId) {
    beam.output_token_ids = [...beam.output_token_ids, newTokenId];
}

/**
 * Forward pass of an encoder model.
 * @param {Object} self The encoder model.
 * @param {Object} model_inputs The input data to be used for the forward pass.
 * @returns {Promise<Object>} Promise that resolves with an object containing the model's outputs.
 * @private
 */
async function encoderForward(self, model_inputs) {
    let encoderFeeds = {};
    for (let key of self.session.inputNames) {
        encoderFeeds[key] = model_inputs[key];
    }
    return await sessionRun(self.session, encoderFeeds);
}


/**
 * Forward pass of a decoder model.
 * @param {Object} self The decoder model.
 * @param {Object} model_inputs The input data to be used for the forward pass.
 * @returns {Promise<Object>} Promise that resolves with an object containing the logits and past key values.
 * @private
 */
async function decoderForward(self, model_inputs) {
    let { input_ids, past_key_values, attention_mask } = model_inputs;
    let decoderFeeds = {
        input_ids: input_ids,
        attention_mask: attention_mask ?? prepareAttentionMask(self, input_ids),
        use_cache_branch: boolTensor(!!past_key_values)
    }

    self.addPastKeyValues(decoderFeeds, past_key_values);

    let decoderResults = await sessionRun(self.session, decoderFeeds);

    let logits = decoderResults.logits;

    past_key_values = self.getPastKeyValues(decoderResults, past_key_values);
    return { logits, past_key_values };
}

/**
 * Starts the generation of text by initializing the beams for the given input token IDs.
 * @param {Object} self The text generation model object.
 * @param {any} inputTokenIds An array of input token IDs to generate text from.
 * @param {number} numOutputTokens The maximum number of tokens to generate for each beam.
 * @param {Tensor} [inputs_attention_mask] The attention mask tensor for the input token IDs.
 * @returns {Object[]} An array of beams initialized with the given inputs and parameters.
 * @private
 */
function decoderStartBeams(self, inputTokenIds, numOutputTokens, inputs_attention_mask) {
    let beams = [];

    let beamId = 0;
    for (let tokens of inputTokenIds) {
        let output_token_ids = tokens.tolist().map(Number);

        // TODO: Improve
        // Currently, just add back batch dimension.
        // In future, allow for true parallel execution
        tokens.dims = [1, ...tokens.dims]

        let attn_mask;
        if (inputs_attention_mask) {
            attn_mask = inputs_attention_mask[beamId];
            attn_mask.dims = [1, ...attn_mask.dims]

        } else {
            attn_mask = prepareAttentionMask(self, tokens)
        }

        let start = {
            input: tokens,
            model_input_ids: tokens,
            attention_mask: attn_mask,
            prev_model_outputs: null,

            output_token_ids: output_token_ids,
            num_output_tokens: numOutputTokens,

            done: false,
            score: 0,
            id: beamId++ // assign unique id to beams
        }

        beams.push(start);
    }
    return beams;
}

/**
 * Runs a single step of the text generation process for a given beam.
 *
 * @param {Object} self The decoder object.
 * @param {Object} beam The beam to run.
 * @param {Tensor} beam.input The input tensor.
 * @param {Tensor} beam.model_input_ids The input ids to the model.
 * @param {Tensor} beam.attention_mask The attention mask.
 * @param {Object} beam.prev_model_outputs The past key values.
 * @param {number[]} beam.output_token_ids The output token ids.
 * @returns {Promise<Object>} The output of the generation step.
 * @private
 */
async function decoderRunBeam(self, beam) {
    let attnMaskData = new BigInt64Array(beam.output_token_ids.length).fill(1n)

    // 1. Prepare
    let model_inputs = {
        input_ids: beam.model_input_ids,
        attention_mask: new Tensor(
            'int64',
            attnMaskData,
            [1, attnMaskData.length]
        ),
        past_key_values: beam.prev_model_outputs?.past_key_values,
    }

    // 2. Run
    let output = await self.forward(model_inputs);

    // 3. Update
    beam.prev_model_outputs = output;

    return output;
}

/**
 * Update a beam with a new token ID.
 * @param {Object} beam The beam to update.
 * @param {number} newTokenId The new token ID to add to the beam's output.
 * @private
 */
function decoderUpdatebeam(beam, newTokenId) {
    beam.output_token_ids = [...beam.output_token_ids, newTokenId];
    beam.model_input_ids = new Tensor('int64', [BigInt(newTokenId)], [1, 1]);
}

//////////////////////////////////////////////////

//////////////////////////////////////////////////
/**
 * A base class for pre-trained models that provides the model configuration and an ONNX session.
 * @extends Callable
 */
class PreTrainedModel extends Callable {
    main_input_name = 'input_ids';

    /**
     * Creates a new instance of the `PreTrainedModel` class.
     * @param {Object} config The model configuration.
     * @param {any} session session for the model.
     */
    constructor(config, session) {
        super();

        this.config = config;
        this.session = session;

        // Set `runBeam` function:
        const className = this.constructor.name;
        const modelType = MODEL_TYPE_MAPPING.get(className);

        this.can_generate = false;
        this._runBeam = null;
        this._getStartBeams = null;
        this._updateBeam = null;
        this._forward = null;
        if (modelType === MODEL_TYPES.DecoderOnly) {
            this.can_generate = true;

            this._runBeam = decoderRunBeam;
            this._getStartBeams = decoderStartBeams;
            this._updateBeam = decoderUpdatebeam;
            this._forward = decoderForward;

        } else if (modelType === MODEL_TYPES.Seq2Seq || modelType === MODEL_TYPES.Vision2Seq) {
            this.can_generate = true;

            this._runBeam = seq2seqRunBeam;
            this._getStartBeams = seq2seqStartBeams;
            this._updateBeam = seq2seqUpdatebeam;
            this._forward = seq2seqForward;

        } else if (modelType === MODEL_TYPES.EncoderDecoder) {
            this._forward = encoderForward;

        } else { // should be MODEL_TYPES.EncoderOnly
            this._forward = encoderForward;
        }
    }

    /**
    * Disposes of all the ONNX sessions that were created during inference.
    * @returns {Promise<unknown[]>} An array of promises, one for each ONNX session that is being disposed.
    * @todo Use https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry
    */
    async dispose() {
        let promises = [];
        for (let key of Object.keys(this)) {
            let item = this[key];
            if (item instanceof InferenceSession) {
                promises.push(item.handler.dispose())
            }
        }
        return await Promise.all(promises);
    }

    /**
     * Instantiate one of the model classes of the library from a pretrained model.
     * 
     * The model class to instantiate is selected based on the `model_type` property of the config object
     * (either passed as an argument or loaded from `pretrained_model_name_or_path` if possible)
     * 
     * @param {string} pretrained_model_name_or_path The name or path of the pretrained model. Can be either:
     * - A string, the *model id* of a pretrained model hosted inside a model repo on huggingface.co.
     *   Valid model ids can be located at the root-level, like `bert-base-uncased`, or namespaced under a
     *   user or organization name, like `dbmdz/bert-base-german-cased`.
     * - A path to a *directory* containing model weights, e.g., `./my_model_directory/`.
     * @param {PretrainedOptions} options Additional options for loading the model.
     * 
     * @returns {Promise<PreTrainedModel>} A new instance of the `PreTrainedModel` class.
     */
    static async from_pretrained(pretrained_model_name_or_path, {
        quantized = true,
        progress_callback = null,
        config = null,
        cache_dir = null,
        local_files_only = false,
        revision = 'main',
        model_file_name = null,
    } = {}) {

        let options = {
            quantized,
            progress_callback,
            config,
            cache_dir,
            local_files_only,
            revision,
            model_file_name,
        }

        let modelType = MODEL_TYPE_MAPPING.get(this.name);

        let info;
        if (modelType === MODEL_TYPES.DecoderOnly) {
            info = await Promise.all([
                AutoConfig.from_pretrained(pretrained_model_name_or_path, options),
                constructSession(pretrained_model_name_or_path, options.model_file_name ?? 'decoder_model_merged', options),
            ]);

        } else if (modelType === MODEL_TYPES.Seq2Seq || modelType === MODEL_TYPES.Vision2Seq) {
            info = await Promise.all([
                AutoConfig.from_pretrained(pretrained_model_name_or_path, options),
                constructSession(pretrained_model_name_or_path, 'encoder_model', options),
                constructSession(pretrained_model_name_or_path, 'decoder_model_merged', options),
                getModelJSON(pretrained_model_name_or_path, 'generation_config.json', false, options),
            ]);

        } else if (modelType === MODEL_TYPES.EncoderDecoder) {
            info = await Promise.all([
                AutoConfig.from_pretrained(pretrained_model_name_or_path, options),
                constructSession(pretrained_model_name_or_path, 'encoder_model', options),
                constructSession(pretrained_model_name_or_path, 'decoder_model_merged', options),
            ]);

        } else { // should be MODEL_TYPES.EncoderOnly
            if (modelType !== MODEL_TYPES.EncoderOnly) {
                console.warn(`Model type for ${this.name} not found, assuming encoder-only architecture. Please report this at https://github.com/xenova/transformers.js/issues/new/choose.`)
            }
            info = await Promise.all([
                AutoConfig.from_pretrained(pretrained_model_name_or_path, options),
                constructSession(pretrained_model_name_or_path, options.model_file_name ?? 'model', options)
            ]);
        }

        // @ts-ignore
        return new this(...info);
    }

    /**
     * Runs the model with the provided inputs
     * @param {Object} model_inputs Object containing input tensors
     * @returns {Promise<Object>} Object containing output tensors
     */
    async _call(model_inputs) {
        return await this.forward(model_inputs);
    }

    /**
     * Forward method for a pretrained model. If not overridden by a subclass, the correct forward method
     * will be chosen based on the model type.
     * @param {Object} model_inputs The input data to the model in the format specified in the ONNX model.
     * @returns {Promise<Object>} The output data from the model in the format specified in the ONNX model.
     * @throws {Error} This method must be implemented in subclasses.
     */
    async forward(model_inputs) {
        return await this._forward(this, model_inputs);
    }

    /**
     * @param {GenerationConfig} generation_config 
     * @param {number} input_ids_seq_length The starting sequence length for the input ids.
     * @returns {LogitsProcessorList}
     * @private
     */
    _get_logits_processor(
        generation_config,
        input_ids_seq_length,
        // encoder_input_ids, TODO
        // prefix_allowed_tokens_fn, TODO
        logits_processor = null
    ) {
        const processors = new LogitsProcessorList();

        // if (generation_config.diversity_penalty !== null && generation_config.diversity_penalty > 0.0) {
        //     processors.push(new HammingDiversityLogitsProcessor(
        //         generation_config.diversity_penalty,
        //         generation_config.num_beams,
        //         generation_config.num_beam_groups
        //     ));
        // }

        // if (generation_config.encoder_repetition_penalty !== null && generation_config.encoder_repetition_penalty !== 1.0) {
        //     processors.push(new EncoderRepetitionPenaltyLogitsProcessor(
        //         generation_config.encoder_repetition_penalty,
        //         encoder_input_ids
        //     ));
        // }

        if (generation_config.repetition_penalty !== null && generation_config.repetition_penalty !== 1.0) {
            processors.push(new RepetitionPenaltyLogitsProcessor(generation_config.repetition_penalty));
        }

        if (generation_config.no_repeat_ngram_size !== null && generation_config.no_repeat_ngram_size > 0) {
            processors.push(new NoRepeatNGramLogitsProcessor(generation_config.no_repeat_ngram_size));
        }

        // if (generation_config.encoder_no_repeat_ngram_size !== null && generation_config.encoder_no_repeat_ngram_size > 0) {
        //     if (this.config.is_encoder_decoder) {
        //         processors.push(new EncoderNoRepeatNGramLogitsProcessor(
        //             generation_config.encoder_no_repeat_ngram_size,
        //             encoder_input_ids
        //         ));
        //     } else {
        //         throw new Error("It's impossible to use `encoder_no_repeat_ngram_size` with decoder-only architecture");
        //     }
        // }

        // if (generation_config.bad_words_ids !== null) {
        //     processors.push(new NoBadWordsLogitsProcessor(generation_config.bad_words_ids, generation_config.eos_token_id));
        // }

        // if (generation_config.min_length !== null && generation_config.eos_token_id !== null && generation_config.min_length > 0) {
        //     processors.push(new MinLengthLogitsProcessor(generation_config.min_length, generation_config.eos_token_id));
        // }

        // if (generation_config.min_new_tokens !== null && generation_config.eos_token_id !== null && generation_config.min_new_tokens > 0) {
        //     processors.push(new MinNewTokensLengthLogitsProcessor(
        //         input_ids_seq_length,
        //         generation_config.min_new_tokens,
        //         generation_config.eos_token_id
        //     ));
        // }

        // if (prefix_allowed_tokens_fn !== null) {
        //     processors.push(new PrefixConstrainedLogitsProcessor(
        //         prefix_allowed_tokens_fn,
        //         generation_config.num_beams / generation_config.num_beam_groups
        //     ));
        // }


        if (generation_config.forced_bos_token_id !== null) {
            processors.push(new ForcedBOSTokenLogitsProcessor(generation_config.forced_bos_token_id));
        }

        if (generation_config.forced_eos_token_id !== null) {
            processors.push(new ForcedEOSTokenLogitsProcessor(
                generation_config.max_length,
                generation_config.forced_eos_token_id
            ));
        }

        // if (generation_config.remove_invalid_values === true) {
        //     processors.push(new InfNanRemoveLogitsProcessor());
        // }

        // if (generation_config.exponential_decay_length_penalty !== null) {
        //     processors.push(new ExponentialDecayLengthPenalty(
        //         generation_config.exponential_decay_length_penalty,
        //         generation_config.eos_token_id,
        //         input_ids_seq_length
        //     ));
        // }

        // if (generation_config.suppress_tokens !== null) {
        //     processors.push(new SuppressTokensLogitsProcessor(generation_config.suppress_tokens));
        // }

        if (generation_config.begin_suppress_tokens !== null) {
            let begin_index = (input_ids_seq_length > 1 || generation_config.forced_bos_token_id === null)
                ? input_ids_seq_length
                : input_ids_seq_length + 1;

            if (generation_config.forced_decoder_ids !== null) {
                // generation starts after the last token that is forced
                begin_index += generation_config.forced_decoder_ids[generation_config.forced_decoder_ids.length - 1][0];
            }
            processors.push(new SuppressTokensAtBeginLogitsProcessor(generation_config.begin_suppress_tokens, begin_index));
        }

        if (generation_config.forced_decoder_ids !== null) {
            processors.push(new ForceTokensLogitsProcessor(generation_config.forced_decoder_ids));
        }

        if (logits_processor !== null) {
            processors.extend(logits_processor)
        }

        // `LogitNormalization` should always be the last logit processor, when present
        // if (generation_config.renormalize_logits === true) {
        //     processors.push(new LogitNormalization());
        // }

        return processors;
    }

    /**
     * This function merges multiple generation configs together to form a final generation config to be used by the model for text generation.
     * It first creates an empty `GenerationConfig` object, then it applies the model's own `generation_config` property to it. Finally, if a `generation_config` object was passed in the arguments, it overwrites the corresponding properties in the final config with those of the passed config object.
     *
     * @param {GenerationConfig} generation_config A `GenerationConfig` object containing generation parameters.
     * @returns {GenerationConfig} The final generation config object to be used by the model for text generation.
     */
    _get_generation_config(generation_config) {
        // Create empty generation config (contains defaults)
        let gen_config = new GenerationConfig();

        // Apply model's generation config, if it exists
        if ('generation_config' in this) {
            Object.assign(gen_config, this.generation_config);
        }

        // Finally, use any generation config specified by the user
        // when calling `generate`
        if (generation_config !== null) {
            Object.assign(gen_config, generation_config);
        }
        return gen_config;
    }

    /**
     * @typedef {import('./utils/maths.js').TypedArray} TypedArray
     */

    /**
     * @typedef {{ sequences: Tensor, decoder_attentions: Tensor, cross_attentions: Tensor }} EncoderDecoderOutput
     * @typedef {Object} DecoderOutput
     * 
     * Generates text based on the given inputs and generation configuration using the model.
     * @param {Tensor|Array|TypedArray} inputs An array of input token IDs.
     * @param {Object|GenerationConfig|null} generation_config The generation configuration to use. If null, default configuration will be used.
     * @param {Object|null} logits_processor An optional logits processor to use. If null, a new LogitsProcessorList instance will be created.
     * @param {Object} options options
     * @param {Object} [options.inputs_attention_mask=null] An optional attention mask for the inputs.
     * @returns {Promise<number[][]|EncoderDecoderOutput|DecoderOutput>} An array of generated output sequences, where each sequence is an array of token IDs.
     * @throws {Error} Throws an error if the inputs array is empty.
     */
    async generate(
        inputs,
        generation_config = null,
        logits_processor = null,
        {
            inputs_attention_mask = null
        } = {},
    ) {
        if (!this.can_generate) {
            const possibleTypes = MODEL_WITH_LM_HEAD_MAPPING_NAMES.get(this.config.model_type);
            let errorMessage = `The current model class (${this.constructor.name}) is not compatible with \`.generate()\`, as it doesn't have a language model head.`
            if (possibleTypes) {
                errorMessage += ` Please use one of the following classes instead: {'${possibleTypes.constructor.name}'}`;
            }
            throw Error(errorMessage);
        }

        if (!(inputs instanceof Tensor) && !isTypedArray(inputs) && !Array.isArray(inputs)) {
            throw Error(`\`inputs\` must be a Tensor, TypedArray, or Array, but is "${inputs.constructor.name}".`);
        }

        let input_ids_seq_length;

        // Prepare `input_ids` which will be used for auto-regressive generation
        // TODO: Update to align with HF transformers' implementation
        if (this.config.is_encoder_decoder) {
            // Generating from the encoder outputs
            input_ids_seq_length = 0;

        } else {
            input_ids_seq_length = inputs instanceof Tensor ? inputs.dims[0] : inputs.length;

            // decoder-only
            if (input_ids_seq_length === 0) {
                throw Error("Must supply a non-empty array of input token ids.")
            }
        }

        // Update generation config with defaults
        generation_config = this._get_generation_config(generation_config);

        logits_processor = logits_processor ?? new LogitsProcessorList()

        // Update logits processor
        logits_processor = this._get_logits_processor(
            generation_config,
            input_ids_seq_length,
            logits_processor
        )

        // TODO implement early_stopping
        // https://huggingface.co/blog/how-to-generate

        let numOutputTokens = 1;
        const maxOutputTokens = numOutputTokens + (generation_config.max_new_tokens ?? Infinity);

        // Only use max length if max_new_tokens is not provided
        const useMaxLength = Number.isInteger(generation_config.max_length) && (generation_config.max_new_tokens ?? null) === null;
        let sampler = Sampler.getSampler(generation_config);

        // @ts-ignore
        let beams = this.getStartBeams(inputs, numOutputTokens, inputs_attention_mask);

        while (beams.some(x => !x.done) && numOutputTokens < maxOutputTokens) {
            let newest_beams = [];
            for (let beam of beams) {
                if (beam.done) {
                    // Add this beam back into the pool
                    newest_beams.push(beam);
                    continue
                }
                if (useMaxLength && beam.output_token_ids.length >= generation_config.max_length) {
                    // Set this beam to done and add it back into the pool
                    beam.done = true;
                    newest_beams.push(beam);
                    continue
                }

                // @ts-ignore
                let output = await this.runBeam(beam);

                // add attentions/scores to beam only if user requested
                if (generation_config.output_attentions) {
                    this.addAttentionsToBeam(beam, output);
                }
                if (generation_config.output_scores) {
                    // TODO add
                }

                // Logits are of the form [batch_size, out_seq_length, vocab_size]
                // In most cases, this will be [batch_size, 1, vocab_size]
                // So, we select the last token's logits:
                // (equivalent to `logits = outputs.logits[:, -1, :]`)
                let logits = output.logits.slice(null, -1, null);

                // Apply logits processor
                logits_processor(beam.output_token_ids, logits);

                let sampledTokens = sampler(logits);
                for (let [newTokenId, logProb] of sampledTokens) {
                    // use previous beam as a starting point
                    let newBeam = { ...beam };

                    // update new beam
                    // @ts-ignore
                    this.updateBeam(newBeam, newTokenId);

                    newBeam.score += logProb;

                    if (newTokenId === this.config.eos_token_id) {
                        newBeam.done = true;
                    }

                    newest_beams.push(newBeam);
                }
            }
            ++numOutputTokens;

            // Next, we get the best beams, per ID
            newest_beams = this.groupBeams(newest_beams).map(
                group => group
                    .sort((a, b) => b.score - a.score)      // sort by score
                    .slice(0, generation_config.num_beams)  // remove outside beam width
            );

            // Flatten beams
            beams = newest_beams.flat();

            // Run callback
            if (generation_config.callback_function) {
                generation_config.callback_function(beams);
            }
        }

        // TODO: Ensure that we can return non-batched outputs

        const groupedBeams = this.groupBeams(beams);

        const getFlattened = (key) => groupedBeams.map(
            batch => {
                if (generation_config.num_return_sequences > 1) {
                    return batch.slice(0, generation_config.num_return_sequences).map(x => x[key]);
                } else {
                    return [batch[0][key]];
                }
            }
        ).flat(); // Flatten across batches (depth=1)

        const sequences = getFlattened('output_token_ids'); // [1, seqLength]

        if (generation_config.return_dict_in_generate) {
            // NOTE: `decoder_attentions` and `cross_attentions` should be:
            //    list (one element for each generated token)
            //    of list (one element for each layer of the decoder)
            //    of torch.FloatTensor of shape (batch_size, num_heads, generated_length, sequence_length)
            // However, since we are only generating one batch at a time, they are of the form:
            //   list (batches)
            //   of list (one element for each generated token)
            //   of list (one element for each layer of the decoder)
            //   of torch.FloatTensor of shape (1, num_heads, generated_length, sequence_length)
            // 
            // TODO: In future (when true parallelism, we should be able to return the correct shape)

            const decoder_attentions = getFlattened('decoder_attentions');
            const cross_attentions = getFlattened('cross_attentions');

            return {
                sequences,

                decoder_attentions,
                cross_attentions,
            }
        } else {
            return sequences;
        }
    }

    /**
     * Helper function to add attentions to beam
     * @param {Object} beam 
     * @param {Object} output
     * @private 
     */
    addAttentionsToBeam(beam, output) {
        if (this.config.is_encoder_decoder) {
            if (!output.cross_attentions || output.cross_attentions.length === 0) {
                throw Error(
                    "`output_attentions` is true, but the model did not produce cross-attentions. " +
                    "This is most likely because the model was not exported with `output_attentions=True`."
                )
            }
            if (!beam.cross_attentions) {
                beam.cross_attentions = [];
            }
            beam.cross_attentions.push(output.cross_attentions);
        }

        if (!output.decoder_attentions || output.decoder_attentions.length === 0) {
            throw Error(
                "`output_attentions` is true, but the model did not produce decoder-attentions. " +
                "This is most likely because the model was not exported with `output_attentions=True`."
            )
        }
        if (!beam.decoder_attentions) {
            beam.decoder_attentions = [];
        }
        beam.decoder_attentions.push(output.decoder_attentions);
    }

    /**
     * Groups an array of beam objects by their ids.
     *
     * @param {Array} beams The array of beam objects to group.
     * @returns {Array} An array of arrays, where each inner array contains beam objects with the same id.
     */
    groupBeams(beams) {
        // Group beams by their ids
        const groups = Object.create(null);
        for (const obj of beams) {
            if (groups[obj.id] === undefined) {
                groups[obj.id] = [obj];
            } else {
                groups[obj.id].push(obj);
            }
        }

        return Object.values(groups);
    }

    /**
     * Returns an object containing past key values from the given decoder results object.
     *
     * @param {Object} decoderResults The decoder results object.
     * @param {Object} pastKeyValues The previous past key values.
     * @returns {Object} An object containing past key values.
     */
    getPastKeyValues(decoderResults, pastKeyValues) {

        const pkvs = Object.create(null);

        for (const name in decoderResults) {
            if (name.startsWith('present')) {
                let newName = name.replace('present', 'past_key_values');

                if (pastKeyValues && name.includes('encoder')) {
                    // Optimization introduced by optimum to reuse past key values. So, we just replace the constant
                    // outputs with the previous past key values.
                    // https://github.com/huggingface/optimum/blob/0bf2c05fb7e1182b52d21b703cfc95fd9e4ea3dc/optimum/onnxruntime/base.py#L677-L704
                    pkvs[newName] = pastKeyValues[newName];
                } else {
                    pkvs[newName] = decoderResults[name];
                }
            }
        }
        return pkvs;
    }

    /**
     * Returns an object containing attentions from the given decoder results object.
     *
     * @param {Object} decoderResults The decoder results object.
     * @returns {Object} An object containing attentions.
     */
    getAttentions(decoderResults) {
        const attns = Object.create(null);

        for (const attnName of ['cross_attentions', 'decoder_attentions']) {
            const result = [];
            for (const name in decoderResults) {
                if (name.startsWith(attnName)) {
                    const index = name.split('.').pop()
                    result[index] = decoderResults[name];
                }
            }
            attns[attnName] = result;
        }
        return attns;
    }

    /**
     * Adds past key values to the decoder feeds object. If pastKeyValues is null, creates new tensors for past key values.
     *
     * @param {Object} decoderFeeds The decoder feeds object to add past key values to.
     * @param {Object} pastKeyValues An object containing past key values.
     * @param {boolean} [hasDecoder=false] Whether the model has a decoder.
     */
    addPastKeyValues(decoderFeeds, pastKeyValues, hasDecoder = false) {
        if (pastKeyValues) {
            Object.assign(decoderFeeds, pastKeyValues)
        } else {
            // TODO support batches (i.e., batch_size > 1)
            if (hasDecoder) {
                // @ts-ignore
                let encoder_dims = [1, this.num_encoder_heads, 0, this.encoder_dim_kv];
                // @ts-ignore
                for (let i = 0; i < this.num_encoder_layers; ++i) {
                    decoderFeeds[`past_key_values.${i}.encoder.key`] = new Tensor('float32', [], encoder_dims)
                    decoderFeeds[`past_key_values.${i}.encoder.value`] = new Tensor('float32', [], encoder_dims)
                }

                // @ts-ignore
                let decoder_dims = [1, this.num_decoder_heads, 0, this.decoder_dim_kv];
                // @ts-ignore
                for (let i = 0; i < this.num_decoder_layers; ++i) {
                    decoderFeeds[`past_key_values.${i}.decoder.key`] = new Tensor('float32', [], decoder_dims)
                    decoderFeeds[`past_key_values.${i}.decoder.value`] = new Tensor('float32', [], decoder_dims)
                }

            } else {
                if (this.config.multi_query) {
                    // @ts-ignore
                    let dims = [1, 0, 2 * this.dim_kv]
                    // @ts-ignore
                    for (let i = 0; i < this.num_layers; ++i) {
                        decoderFeeds[`past_key_values.${i}.key_value`] = new Tensor('float32', [], dims)
                    }
                } else if (this.config.model_type === 'bloom') {
                    // Custom implementation for Bloom
                    // @ts-ignore
                    let keyDims = [1 * this.num_heads, this.dim_kv, 0] // [batch_size x num_heads,64,past_sequence_length]
                    // @ts-ignore
                    let valueDims = [1 * this.num_heads, 0, this.dim_kv] // [batch_size x num_heads,past_sequence_length,64]
                    // @ts-ignore
                    for (let i = 0; i < this.num_layers; ++i) {
                        decoderFeeds[`past_key_values.${i}.key`] = new Tensor('float32', [], keyDims)
                        decoderFeeds[`past_key_values.${i}.value`] = new Tensor('float32', [], valueDims)
                    }
                } else {
                    // @ts-ignore
                    let dims = [1, this.num_heads, 0, this.dim_kv]
                    // @ts-ignore
                    for (let i = 0; i < this.num_layers; ++i) {
                        decoderFeeds[`past_key_values.${i}.key`] = new Tensor('float32', [], dims)
                        decoderFeeds[`past_key_values.${i}.value`] = new Tensor('float32', [], dims)
                    }
                }
            }
        }
    }

    /**
     * Initializes and returns the beam for text generation task
     * @param {Tensor} inputTokenIds The input token ids.
     * @param {number} numOutputTokens The number of tokens to be generated.
     * @param {Tensor} inputs_attention_mask Optional input attention mask.
     * @returns {any} A Beam object representing the initialized beam.
     * @private
     */
    getStartBeams(inputTokenIds, numOutputTokens, inputs_attention_mask) {
        return this._getStartBeams(this, inputTokenIds, numOutputTokens, inputs_attention_mask)
    }

    /**
     * Runs a single step of the beam search generation algorithm.
     * @param {any} beam The current beam being generated.
     * @returns {Promise<any>} The updated beam after a single generation step.
     * @private
     */
    async runBeam(beam) {
        return await this._runBeam(this, beam);
    }

    /**
     * Update a beam with a new token ID.
     * @param {Object} beam The beam to update.
     * @param {number} newTokenId The new token ID to add to the beam's output.
     * @private
     */
    updateBeam(beam, newTokenId) {
        return this._updateBeam(beam, newTokenId);
    }
}

//////////////////////////////////////////////////
// Base model output class
class ModelOutput { }

/**
 * Base class for model's outputs, with potential hidden states and attentions.
 */
class BaseModelOutput extends (/* unused pure expression or super */ null && (ModelOutput)) {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.last_hidden_state Sequence of hidden-states at the output of the last layer of the model.
     * @param {Tensor} [output.hidden_states] Hidden-states of the model at the output of each layer plus the optional initial embedding outputs.
     * @param {Tensor} [output.attentions] Attentions weights after the attention softmax, used to compute the weighted average in the self-attention heads.
     */
    constructor({ last_hidden_state, hidden_states = null, attentions = null }) {
        super();
        this.last_hidden_state = last_hidden_state;
        this.hidden_states = hidden_states;
        this.attentions = attentions;
    }
}
//////////////////////////////////////////////////
// Bert models
class BertPreTrainedModel extends PreTrainedModel { }
class BertModel extends BertPreTrainedModel { }

/**
 * BertForMaskedLM is a class representing a BERT model for masked language modeling.
 * @extends BertPreTrainedModel
 */
class BertForMaskedLM extends BertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} An object containing the model's output logits for masked language modeling.
     */
    async _call(model_inputs) {
        return new MaskedLMOutput(await super._call(model_inputs));
    }
}

/**
 * BertForSequenceClassification is a class representing a BERT model for sequence classification.
 * @extends BertPreTrainedModel
 */
class BertForSequenceClassification extends BertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
     */
    async _call(model_inputs) {
        return new SequenceClassifierOutput(await super._call(model_inputs));
    }
}

/**
 * BertForTokenClassification is a class representing a BERT model for token classification.
 * @extends BertPreTrainedModel
 */
class BertForTokenClassification extends BertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<TokenClassifierOutput>} An object containing the model's output logits for token classification.
     */
    async _call(model_inputs) {
        return new TokenClassifierOutput(await super._call(model_inputs));
    }
}

/**
 * BertForQuestionAnswering is a class representing a BERT model for question answering.
 * @extends BertPreTrainedModel
 */
class BertForQuestionAnswering extends BertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} An object containing the model's output logits for question answering.
     */
    async _call(model_inputs) {
        return new QuestionAnsweringModelOutput(await super._call(model_inputs));
    }
}
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// CamemBERT models
class CamembertPreTrainedModel extends PreTrainedModel { }

/**
 * The bare CamemBERT Model transformer outputting raw hidden-states without any specific head on top.
 */
class CamembertModel extends CamembertPreTrainedModel { }

/**
 * CamemBERT Model with a `language modeling` head on top.
 */
class CamembertForMaskedLM extends CamembertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} An object containing the model's output logits for masked language modeling.
     */
    async _call(model_inputs) {
        return new MaskedLMOutput(await super._call(model_inputs));
    }
}

/**
 * CamemBERT Model transformer with a sequence classification/regression head on top (a linear layer on top of the pooled output) e.g. for GLUE tasks.
 */
class CamembertForSequenceClassification extends CamembertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
     */
    async _call(model_inputs) {
        return new SequenceClassifierOutput(await super._call(model_inputs));
    }
}

/**
 * CamemBERT Model with a token classification head on top (a linear layer on top of the hidden-states output) e.g. for Named-Entity-Recognition (NER) tasks.
 */
class CamembertForTokenClassification extends CamembertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<TokenClassifierOutput>} An object containing the model's output logits for token classification.
     */
    async _call(model_inputs) {
        return new TokenClassifierOutput(await super._call(model_inputs));
    }
}

/**
 * CamemBERT Model with a span classification head on top for extractive question-answering tasks
 */
class CamembertForQuestionAnswering extends CamembertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} An object containing the model's output logits for question answering.
     */
    async _call(model_inputs) {
        return new QuestionAnsweringModelOutput(await super._call(model_inputs));
    }
}
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// DeBERTa models
class DebertaPreTrainedModel extends PreTrainedModel { }

/**
 * The bare DeBERTa Model transformer outputting raw hidden-states without any specific head on top.
 */
class DebertaModel extends DebertaPreTrainedModel { }

/**
 * DeBERTa Model with a `language modeling` head on top.
 */
class DebertaForMaskedLM extends DebertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} An object containing the model's output logits for masked language modeling.
     */
    async _call(model_inputs) {
        return new MaskedLMOutput(await super._call(model_inputs));
    }
}

/**
 * DeBERTa Model transformer with a sequence classification/regression head on top (a linear layer on top of the pooled output)
 */
class DebertaForSequenceClassification extends DebertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
     */
    async _call(model_inputs) {
        return new SequenceClassifierOutput(await super._call(model_inputs));
    }
}

/**
 * DeBERTa Model with a token classification head on top (a linear layer on top of the hidden-states output) e.g. for Named-Entity-Recognition (NER) tasks.
 */
class DebertaForTokenClassification extends DebertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<TokenClassifierOutput>} An object containing the model's output logits for token classification.
     */
    async _call(model_inputs) {
        return new TokenClassifierOutput(await super._call(model_inputs));
    }
}

/**
 * DeBERTa Model with a span classification head on top for extractive question-answering tasks like SQuAD (a linear
 * layers on top of the hidden-states output to compute `span start logits` and `span end logits`).
 */
class DebertaForQuestionAnswering extends DebertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} An object containing the model's output logits for question answering.
     */
    async _call(model_inputs) {
        return new QuestionAnsweringModelOutput(await super._call(model_inputs));
    }
}
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// DeBERTa-v2 models
class DebertaV2PreTrainedModel extends PreTrainedModel { }

/**
 * The bare DeBERTa-V2 Model transformer outputting raw hidden-states without any specific head on top.
 */
class DebertaV2Model extends DebertaV2PreTrainedModel { }

/**
 * DeBERTa-V2 Model with a `language modeling` head on top.
 */
class DebertaV2ForMaskedLM extends DebertaV2PreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} An object containing the model's output logits for masked language modeling.
     */
    async _call(model_inputs) {
        return new MaskedLMOutput(await super._call(model_inputs));
    }
}

/**
 * DeBERTa-V2 Model transformer with a sequence classification/regression head on top (a linear layer on top of the pooled output)
 */
class DebertaV2ForSequenceClassification extends DebertaV2PreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
     */
    async _call(model_inputs) {
        return new SequenceClassifierOutput(await super._call(model_inputs));
    }
}

/**
 * DeBERTa-V2 Model with a token classification head on top (a linear layer on top of the hidden-states output) e.g. for Named-Entity-Recognition (NER) tasks.
 */
class DebertaV2ForTokenClassification extends DebertaV2PreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<TokenClassifierOutput>} An object containing the model's output logits for token classification.
     */
    async _call(model_inputs) {
        return new TokenClassifierOutput(await super._call(model_inputs));
    }
}

/**
 * DeBERTa-V2 Model with a span classification head on top for extractive question-answering tasks like SQuAD (a linear
 * layers on top of the hidden-states output to compute `span start logits` and `span end logits`).
 */
class DebertaV2ForQuestionAnswering extends DebertaV2PreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} An object containing the model's output logits for question answering.
     */
    async _call(model_inputs) {
        return new QuestionAnsweringModelOutput(await super._call(model_inputs));
    }
}
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// DistilBert models
class DistilBertPreTrainedModel extends PreTrainedModel { }
class DistilBertModel extends DistilBertPreTrainedModel { }

/**
 * DistilBertForSequenceClassification is a class representing a DistilBERT model for sequence classification.
 * @extends DistilBertPreTrainedModel
 */
class DistilBertForSequenceClassification extends DistilBertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
     */
    async _call(model_inputs) {
        return new SequenceClassifierOutput(await super._call(model_inputs));
    }
}

/**
 * DistilBertForTokenClassification is a class representing a DistilBERT model for token classification.
 * @extends DistilBertPreTrainedModel
 */
class DistilBertForTokenClassification extends DistilBertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<TokenClassifierOutput>} An object containing the model's output logits for token classification.
     */
    async _call(model_inputs) {
        return new TokenClassifierOutput(await super._call(model_inputs));
    }
}


/**
 * DistilBertForQuestionAnswering is a class representing a DistilBERT model for question answering.
 * @extends DistilBertPreTrainedModel
 */
class DistilBertForQuestionAnswering extends DistilBertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} An object containing the model's output logits for question answering.
     */
    async _call(model_inputs) {
        return new QuestionAnsweringModelOutput(await super._call(model_inputs));
    }
}

/**
 * DistilBertForMaskedLM is a class representing a DistilBERT model for masking task.
 * @extends DistilBertPreTrainedModel
 */
class DistilBertForMaskedLM extends DistilBertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} returned object
     */
    async _call(model_inputs) {
        return new MaskedLMOutput(await super._call(model_inputs));
    }
}
//////////////////////////////////////////////////


//////////////////////////////////////////////////
// MobileBert models
class MobileBertPreTrainedModel extends PreTrainedModel { }
class MobileBertModel extends MobileBertPreTrainedModel { }

/**
 * MobileBertForMaskedLM is a class representing a MobileBERT model for masking task.
 * @extends MobileBertPreTrainedModel
 */
class MobileBertForMaskedLM extends MobileBertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} returned object
     */
    async _call(model_inputs) {
        return new MaskedLMOutput(await super._call(model_inputs));
    }
}

/**
 * @extends MobileBertPreTrainedModel
 */
class MobileBertForSequenceClassification extends MobileBertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} returned object
     */
    async _call(model_inputs) {
        return new SequenceClassifierOutput(await super._call(model_inputs));
    }
}

/**
 * @extends MobileBertPreTrainedModel
 */
class MobileBertForQuestionAnswering extends MobileBertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} returned object
     */
    async _call(model_inputs) {
        return new QuestionAnsweringModelOutput(await super._call(model_inputs));
    }
}
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// MPNet models
class MPNetPreTrainedModel extends PreTrainedModel { }

/**
 * The bare MPNet Model transformer outputting raw hidden-states without any specific head on top.
 * @extends MPNetPreTrainedModel
 */
class MPNetModel extends MPNetPreTrainedModel { }

/**
 * MPNetForMaskedLM is a class representing a MPNet model for masked language modeling.
 * @extends MPNetPreTrainedModel
 */
class MPNetForMaskedLM extends MPNetPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} An object containing the model's output logits for masked language modeling.
     */
    async _call(model_inputs) {
        return new MaskedLMOutput(await super._call(model_inputs));
    }
}

/**
 * MPNetForSequenceClassification is a class representing a MPNet model for sequence classification.
 * @extends MPNetPreTrainedModel
 */
class MPNetForSequenceClassification extends MPNetPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
     */
    async _call(model_inputs) {
        return new SequenceClassifierOutput(await super._call(model_inputs));
    }
}

/**
 * MPNetForTokenClassification is a class representing a MPNet model for token classification.
 * @extends MPNetPreTrainedModel
 */
class MPNetForTokenClassification extends MPNetPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<TokenClassifierOutput>} An object containing the model's output logits for token classification.
     */
    async _call(model_inputs) {
        return new TokenClassifierOutput(await super._call(model_inputs));
    }
}

/**
 * MPNetForQuestionAnswering is a class representing a MPNet model for question answering.
 * @extends MPNetPreTrainedModel
 */
class MPNetForQuestionAnswering extends MPNetPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} An object containing the model's output logits for question answering.
     */
    async _call(model_inputs) {
        return new QuestionAnsweringModelOutput(await super._call(model_inputs));
    }
}
//////////////////////////////////////////////////


//////////////////////////////////////////////////
// SqueezeBert models
class SqueezeBertPreTrainedModel extends PreTrainedModel { }
class SqueezeBertModel extends SqueezeBertPreTrainedModel { }
class SqueezeBertForMaskedLM extends SqueezeBertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} returned object
     */
    async _call(model_inputs) {
        return new MaskedLMOutput(await super._call(model_inputs));
    }
}
class SqueezeBertForSequenceClassification extends SqueezeBertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} returned object
     */
    async _call(model_inputs) {
        return new SequenceClassifierOutput(await super._call(model_inputs));
    }
}
class SqueezeBertForQuestionAnswering extends SqueezeBertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} returned object
     */
    async _call(model_inputs) {
        return new QuestionAnsweringModelOutput(await super._call(model_inputs));
    }
}
//////////////////////////////////////////////////


//////////////////////////////////////////////////
// Albert models
class AlbertPreTrainedModel extends PreTrainedModel { }
class AlbertModel extends AlbertPreTrainedModel { }
class AlbertForSequenceClassification extends AlbertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} returned object
     */
    async _call(model_inputs) {
        return new SequenceClassifierOutput(await super._call(model_inputs));
    }
}
class AlbertForQuestionAnswering extends AlbertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} returned object
     */
    async _call(model_inputs) {
        return new QuestionAnsweringModelOutput(await super._call(model_inputs));
    }
}
class AlbertForMaskedLM extends AlbertPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} returned object
     */
    async _call(model_inputs) {
        return new MaskedLMOutput(await super._call(model_inputs));
    }
}
//////////////////////////////////////////////////


//////////////////////////////////////////////////
// T5 models
class T5PreTrainedModel extends PreTrainedModel { };

class T5Model extends T5PreTrainedModel { }

/**
 * T5Model is a class representing a T5 model for conditional generation.
 * @extends T5PreTrainedModel
 */
class T5ForConditionalGeneration extends T5PreTrainedModel {

    /**
     * Creates a new instance of the `T5ForConditionalGeneration` class.
     * @param {Object} config The model configuration.
     * @param {any} session session for the model.
     * @param {any} decoder_merged_session session for the decoder.
     * @param {GenerationConfig} generation_config The generation configuration.
     */
    constructor(config, session, decoder_merged_session, generation_config) {
        super(config, session);
        this.decoder_merged_session = decoder_merged_session;
        this.generation_config = generation_config;

        this.num_decoder_layers = this.config.num_decoder_layers;
        this.num_decoder_heads = this.config.num_heads;
        this.decoder_dim_kv = this.config.d_kv;

        this.num_encoder_layers = this.config.num_layers;
        this.num_encoder_heads = this.config.num_heads;
        this.encoder_dim_kv = this.config.d_kv;
    }
}
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// MT5 models
class MT5PreTrainedModel extends PreTrainedModel { };

class MT5Model extends MT5PreTrainedModel { }

/**
 * A class representing a conditional sequence-to-sequence model based on the MT5 architecture.
 *
 * @extends MT5PreTrainedModel
 */
class MT5ForConditionalGeneration extends MT5PreTrainedModel {

    /**
     * Creates a new instance of the `MT5ForConditionalGeneration` class.
     * @param {any} config The model configuration.
     * @param {any} session The ONNX session containing the encoder weights.
     * @param {any} decoder_merged_session The ONNX session containing the merged decoder weights.
     * @param {GenerationConfig} generation_config The generation configuration.
     */
    constructor(config, session, decoder_merged_session, generation_config) {
        super(config, session);
        this.decoder_merged_session = decoder_merged_session;
        this.generation_config = generation_config;

        this.num_decoder_layers = this.config.num_decoder_layers;
        this.num_decoder_heads = this.config.num_heads;
        this.decoder_dim_kv = this.config.d_kv;

        this.num_encoder_layers = this.config.num_layers;
        this.num_encoder_heads = this.config.num_heads;
        this.encoder_dim_kv = this.config.d_kv;
    }
}
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Bart models
class BartPretrainedModel extends PreTrainedModel { };

/**
 * BART encoder and decoder model.
 * 
 * @extends BartPretrainedModel
 */
class BartModel extends BartPretrainedModel { }

/**
 * BART model with a language model head for conditional generation.
 * @extends BartPretrainedModel
 */
class BartForConditionalGeneration extends BartPretrainedModel {

    /**
     * Creates a new instance of the `BartForConditionalGeneration` class.
     * @param {Object} config The configuration object for the Bart model.
     * @param {Object} session The ONNX session used to execute the model.
     * @param {Object} decoder_merged_session The ONNX session used to execute the decoder.
     * @param {Object} generation_config The generation configuration object.
     */
    constructor(config, session, decoder_merged_session, generation_config) {
        super(config, session);
        this.decoder_merged_session = decoder_merged_session;
        this.generation_config = generation_config;

        this.num_decoder_layers = this.config.decoder_layers;
        this.num_decoder_heads = this.config.decoder_attention_heads;
        this.decoder_dim_kv = this.config.d_model / this.num_decoder_heads;

        this.num_encoder_layers = this.config.encoder_layers;
        this.num_encoder_heads = this.config.encoder_attention_heads;
        this.encoder_dim_kv = this.config.d_model / this.num_encoder_heads;
    }

}

class BartForSequenceClassification extends BartPretrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
     */
    async _call(model_inputs) {
        return new SequenceClassifierOutput(await super._call(model_inputs));
    }
}

//////////////////////////////////////////////////

//////////////////////////////////////////////////
// MBart models
class MBartPreTrainedModel extends PreTrainedModel { };

/**
 * The bare MBART Model outputting raw hidden-states without any specific head on top.
 */
class MBartModel extends MBartPreTrainedModel { }

/**
 * The MBART Model with a language modeling head. Can be used for summarization, after fine-tuning the pretrained models.
 */
class MBartForConditionalGeneration extends MBartPreTrainedModel {

    /**
     * Creates a new instance of the `MBartForConditionalGeneration` class.
     * @param {Object} config The configuration object for the Bart model.
     * @param {Object} session The ONNX session used to execute the model.
     * @param {Object} decoder_merged_session The ONNX session used to execute the decoder.
     * @param {Object} generation_config The generation configuration object.
     */
    constructor(config, session, decoder_merged_session, generation_config) {
        super(config, session);
        this.decoder_merged_session = decoder_merged_session;
        this.generation_config = generation_config;

        this.num_decoder_layers = this.config.decoder_layers;
        this.num_decoder_heads = this.config.decoder_attention_heads;
        this.decoder_dim_kv = this.config.d_model / this.num_decoder_heads;

        this.num_encoder_layers = this.config.encoder_layers;
        this.num_encoder_heads = this.config.encoder_attention_heads;
        this.encoder_dim_kv = this.config.d_model / this.num_encoder_heads;
    }

}

/**
 * MBart model with a sequence classification/head on top (a linear layer on top of the pooled output).
 */
class MBartForSequenceClassification extends MBartPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
     */
    async _call(model_inputs) {
        return new SequenceClassifierOutput(await super._call(model_inputs));
    }
}

//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Roberta models
class RobertaPreTrainedModel extends PreTrainedModel { }
class RobertaModel extends RobertaPreTrainedModel { }

/**
 * RobertaForMaskedLM class for performing masked language modeling on Roberta models.
 * @extends RobertaPreTrainedModel
 */
class RobertaForMaskedLM extends RobertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} returned object
     */
    async _call(model_inputs) {
        return new MaskedLMOutput(await super._call(model_inputs));
    }
}

/**
 * RobertaForSequenceClassification class for performing sequence classification on Roberta models.
 * @extends RobertaPreTrainedModel
 */
class RobertaForSequenceClassification extends RobertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} returned object
     */
    async _call(model_inputs) {
        return new SequenceClassifierOutput(await super._call(model_inputs));
    }
}

/**
 * RobertaForTokenClassification class for performing token classification on Roberta models.
 * @extends RobertaPreTrainedModel
 */
class RobertaForTokenClassification extends RobertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<TokenClassifierOutput>} An object containing the model's output logits for token classification.
     */
    async _call(model_inputs) {
        return new TokenClassifierOutput(await super._call(model_inputs));
    }
}

/**
 * RobertaForQuestionAnswering class for performing question answering on Roberta models.
 * @extends RobertaPreTrainedModel
 */
class RobertaForQuestionAnswering extends RobertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} returned object
     */
    async _call(model_inputs) {
        return new QuestionAnsweringModelOutput(await super._call(model_inputs));
    }
}
//////////////////////////////////////////////////


//////////////////////////////////////////////////
// XLM models
/**
 * An abstract class to handle weights initialization and a simple interface for downloading and loading pretrained models.
 */
class XLMPreTrainedModel extends PreTrainedModel { }

/**
 * The bare XLM Model transformer outputting raw hidden-states without any specific head on top.
 */
class XLMModel extends XLMPreTrainedModel { }

/**
 * The XLM Model transformer with a language modeling head on top (linear layer with weights tied to the input embeddings).
 */
class XLMWithLMHeadModel extends XLMPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} returned object
     */
    async _call(model_inputs) {
        return new MaskedLMOutput(await super._call(model_inputs));
    }
}

/**
 * XLM Model with a sequence classification/regression head on top (a linear layer on top of the pooled output)
 */
class XLMForSequenceClassification extends XLMPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} returned object
     */
    async _call(model_inputs) {
        return new SequenceClassifierOutput(await super._call(model_inputs));
    }
}

/**
 * XLM Model with a token classification head on top (a linear layer on top of the hidden-states output)
 */
class XLMForTokenClassification extends XLMPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<TokenClassifierOutput>} An object containing the model's output logits for token classification.
     */
    async _call(model_inputs) {
        return new TokenClassifierOutput(await super._call(model_inputs));
    }
}

/**
 * XLM Model with a span classification head on top for extractive question-answering tasks
 */
class XLMForQuestionAnswering extends XLMPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} returned object
     */
    async _call(model_inputs) {
        return new QuestionAnsweringModelOutput(await super._call(model_inputs));
    }
}
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// XLMRoberta models
class XLMRobertaPreTrainedModel extends PreTrainedModel { }
class XLMRobertaModel extends XLMRobertaPreTrainedModel { }

/**
 * XLMRobertaForMaskedLM class for performing masked language modeling on XLMRoberta models.
 * @extends XLMRobertaPreTrainedModel
 */
class XLMRobertaForMaskedLM extends XLMRobertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<MaskedLMOutput>} returned object
     */
    async _call(model_inputs) {
        return new MaskedLMOutput(await super._call(model_inputs));
    }
}

/**
 * XLMRobertaForSequenceClassification class for performing sequence classification on XLMRoberta models.
 * @extends XLMRobertaPreTrainedModel
 */
class XLMRobertaForSequenceClassification extends XLMRobertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} returned object
     */
    async _call(model_inputs) {
        return new SequenceClassifierOutput(await super._call(model_inputs));
    }
}

/**
 * XLMRobertaForTokenClassification class for performing token classification on XLMRoberta models.
 * @extends XLMRobertaPreTrainedModel
 */
class XLMRobertaForTokenClassification extends XLMRobertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<TokenClassifierOutput>} An object containing the model's output logits for token classification.
     */
    async _call(model_inputs) {
        return new TokenClassifierOutput(await super._call(model_inputs));
    }
}

/**
 * XLMRobertaForQuestionAnswering class for performing question answering on XLMRoberta models.
 * @extends XLMRobertaPreTrainedModel
 */
class XLMRobertaForQuestionAnswering extends XLMRobertaPreTrainedModel {
    /**
     * Calls the model on new inputs.
     *
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<QuestionAnsweringModelOutput>} returned object
     */
    async _call(model_inputs) {
        return new QuestionAnsweringModelOutput(await super._call(model_inputs));
    }
}
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// T5 models
class WhisperPreTrainedModel extends PreTrainedModel { };

/**
 * WhisperModel class for training Whisper models without a language model head.
 * @extends WhisperPreTrainedModel
 */
class WhisperModel extends WhisperPreTrainedModel { }

/**
 * WhisperForConditionalGeneration class for generating conditional outputs from Whisper models.
 * @extends WhisperPreTrainedModel
 */
class WhisperForConditionalGeneration extends WhisperPreTrainedModel {

    requires_attention_mask = false;
    main_input_name = 'input_features';

    /**
     * Creates a new instance of the `WhisperForConditionalGeneration` class.
     * @param {Object} config Configuration object for the model.
     * @param {Object} session ONNX Session object for the model.
     * @param {Object} decoder_merged_session ONNX Session object for the decoder.
     * @param {Object} generation_config Configuration object for the generation process.
     */
    constructor(config, session, decoder_merged_session, generation_config) {
        super(config, session);
        this.decoder_merged_session = decoder_merged_session;
        this.generation_config = generation_config;

        this.num_decoder_layers = this.config.decoder_layers;
        this.num_decoder_heads = this.config.decoder_attention_heads;
        this.decoder_dim_kv = this.config.d_model / this.num_decoder_heads;

        this.num_encoder_layers = this.config.encoder_layers;
        this.num_encoder_heads = this.config.encoder_attention_heads;
        this.encoder_dim_kv = this.config.d_model / this.num_encoder_heads;
    }

    /**
     * @typedef {Object} WhisperGenerationConfig
     * @extends GenerationConfig
     * @property {boolean} [return_timestamps=null] Whether to return the timestamps with the text. This enables the `WhisperTimestampsLogitsProcessor`.
     * @property {boolean} [return_token_timestamps=null] Whether to return token-level timestamps
     * with the text. This can be used with or without the `return_timestamps` option. To get word-level
     * timestamps, use the tokenizer to group the tokens into words.
     * @property {number} [num_frames=null]  The number of audio frames available in this chunk. This is only used generating word-level timestamps.
     */

    /**
     * Generates outputs based on input and generation configuration.
     * @param {Object} inputs Input data for the model.
     * @param {WhisperGenerationConfig} generation_config Configuration object for the generation process.
     * @param {Object} logits_processor Optional logits processor object.
     * @returns {Promise<Object>} Promise object represents the generated outputs.
     */
    async generate(
        inputs,
        generation_config = null,
        logits_processor = null,
        // {
        //     return_timestamps = null,
        //     return_token_timestamps = null,
        //     language = null,
        //     task = null,
        // } = {},
    ) {
        // Create generation config object
        generation_config = this._get_generation_config(generation_config);


        // Whisper has additional options for returning timestamps
        generation_config.return_timestamps ??= false;

        // TODO add language and task

        if (generation_config.return_timestamps) {
            logits_processor = [new WhisperTimeStampLogitsProcessor(generation_config)]
        }

        if (generation_config.return_token_timestamps) {
            generation_config.output_attentions = true;
            generation_config.return_dict_in_generate = true;

            if (generation_config.task === 'translate') {
                console.warn("Token-level timestamps may not be reliable for task 'translate'.")
            }

            if (!generation_config.alignment_heads) {
                throw new Error(
                    "Model generation config has no `alignment_heads`, token-level timestamps not available. " +
                    "See https://gist.github.com/hollance/42e32852f24243b748ae6bc1f985b13a on how to add this property to the generation config."
                )
            }
        }

        const outputs = await super.generate(inputs, generation_config, logits_processor);

        if (generation_config.return_token_timestamps && generation_config.alignment_heads) {
            outputs["token_timestamps"] = this._extract_token_timestamps(
                outputs,
                generation_config.alignment_heads,
                generation_config.num_frames,
            )
        }

        return outputs
    }

    /**
     * Calculates token-level timestamps using the encoder-decoder cross-attentions and
     * dynamic time-warping (DTW) to map each output token to a position in the input audio.
     * @param {Object} generate_outputs Outputs generated by the model
     * @param {Tensor[][][]} generate_outputs.cross_attentions The cross attentions output by the model
     * @param {Tensor[][][]} generate_outputs.decoder_attentions The decoder attentions output by the model
     * @param {number[][]} generate_outputs.sequences The sequences output by the model
     * @param {number[][]} alignment_heads Alignment heads of the model
     * @param {number} [num_frames=null] Number of frames in the input audio.
     * @param {number} [time_precision=0.02] Precision of the timestamps in seconds
     * @returns {Tensor} tensor containing the timestamps in seconds for each predicted token
     */
    _extract_token_timestamps(generate_outputs, alignment_heads, num_frames = null, time_precision = 0.02) {
        if (!generate_outputs.cross_attentions) {
            throw new Error(
                "Model outputs must contain cross attentions to extract timestamps. " +
                "This is most likely because the model was not exported with `output_attentions=True`."
            )
        }

        let median_filter_width = this.config.median_filter_width;
        if (median_filter_width === undefined) {
            console.warn("Model config has no `median_filter_width`, using default value of 7.")
            median_filter_width = 7;
        }

        const batchedMatrices = generate_outputs.cross_attentions.map(batch => {
            // Create a list with `decoder_layers` elements, each a tensor of shape
            // (batch size, attention_heads, output length, input length).
            let cross_attentions = Array.from({ length: this.config.decoder_layers },
                (_, i) => cat(batch.map(x => x[i]), 2)
            );

            let weights = stack(alignment_heads.map(([l, h]) => {
                return num_frames
                    ? cross_attentions[l].slice(null, h, null, [0, num_frames])
                    : cross_attentions[l].slice(null, h);
            }));
            weights = weights.transpose(1, 0, 2, 3)

            let [std, calculatedMean] = std_mean(weights, -2, 0, true);

            // Normalize and smoothen the weights.
            let smoothedWeights = weights.clone(); // [1, 8, seqLength, 1500]

            for (let a = 0; a < smoothedWeights.dims[0]; ++a) {
                let aTensor = smoothedWeights[a]; // [8, seqLength, 1500]

                for (let b = 0; b < aTensor.dims[0]; ++b) {
                    let bTensor = aTensor[b]; // [seqLength, 1500]

                    const stdTensor = std[a][b][0]; // [1500]
                    const meanTensor = calculatedMean[a][b][0]; // [1500]

                    for (let c = 0; c < bTensor.dims[0]; ++c) {

                        let cTensor = bTensor[c]; // [1500]
                        for (let d = 0; d < cTensor.data.length; ++d) {
                            cTensor.data[d] = (cTensor.data[d] - meanTensor.data[d]) / stdTensor.data[d]
                        }

                        // Apply median filter.
                        cTensor.data.set(medianFilter(cTensor.data, median_filter_width))
                    }
                }
            }

            // Average the different cross-attention heads.
            const matrix = mean(smoothedWeights, 1);
            return matrix;
        });

        const timestampsShape = [generate_outputs.sequences.length, generate_outputs.sequences[0].length];

        const timestamps = new Tensor(
            'float32',
            new Float32Array(timestampsShape[0] * timestampsShape[1]),
            timestampsShape
        );

        // Perform dynamic time warping on each element of the batch.
        for (let batch_idx = 0; batch_idx < timestampsShape[0]; ++batch_idx) {
            // NOTE: Since we run only one batch at a time, we can squeeze to get the same dimensions
            // as the python implementation
            const matrix = batchedMatrices[batch_idx].neg().squeeze_(0);
            let [text_indices, time_indices] = dynamicTimeWarping(matrix);

            let diffs = Array.from({ length: text_indices.length - 1 }, (v, i) => text_indices[i + 1] - text_indices[i]);
            let jumps = mergeArrays([1], diffs).map(x => !!x); // convert to boolean

            let jump_times = [];
            for (let i = 0; i < jumps.length; ++i) {
                if (jumps[i]) {
                    jump_times.push(time_indices[i] * time_precision);
                    // NOTE: No point in rounding here, since we set to Float32Array later
                }
            }
            timestamps[batch_idx].data.set(jump_times, 1)
        }

        return timestamps;
    }
}
//////////////////////////////////////////////////

//////////////////////////////////////////////////
/**
 * Vision Encoder-Decoder model based on OpenAI's GPT architecture for image captioning and other vision tasks
 * @extends PreTrainedModel
 */
class VisionEncoderDecoderModel extends PreTrainedModel {
    main_input_name = 'pixel_values';
    add_decoder_pkv = false;

    /**
     * Creates a new instance of the `VisionEncoderDecoderModel` class.
     * @param {Object} config The configuration object specifying the hyperparameters and other model settings.
     * @param {Object} session The ONNX session containing the encoder model.
     * @param {any} decoder_merged_session The ONNX session containing the merged decoder model.
     */
    constructor(config, session, decoder_merged_session) {
        super(config, session);
        this.decoder_merged_session = decoder_merged_session;

        this.num_layers = this.config.decoder.n_layer;
        this.num_heads = this.config.decoder.n_head;
        this.dim_kv = this.config.decoder.n_embd / this.num_heads;
    }
}
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// CLIP models
class CLIPPreTrainedModel extends PreTrainedModel { }

/**
 * CLIP Text and Vision Model with a projection layers on top
 * 
 * **Example:** Perform zero-shot image classification with a `CLIPModel`.
 * 
 * ```javascript
 * import { AutoTokenizer, AutoProcessor, CLIPModel, RawImage } from '@xenova/transformers';
 * 
 * // Load tokenizer, processor, and model
 * let tokenizer = await AutoTokenizer.from_pretrained('Xenova/clip-vit-base-patch16');
 * let processor = await AutoProcessor.from_pretrained('Xenova/clip-vit-base-patch16');
 * let model = await CLIPModel.from_pretrained('Xenova/clip-vit-base-patch16');
 * 
 * // Run tokenization
 * let texts = ['a photo of a car', 'a photo of a football match']
 * let text_inputs = tokenizer(texts, { padding: true, truncation: true });
 * 
 * // Read image and run processor
 * let image = await RawImage.read('https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/football-match.jpg');
 * let image_inputs = await processor(image);
 * 
 * // Run model with both text and pixel inputs
 * let output = await model({ ...text_inputs, ...image_inputs });
 * // {
 * //   logits_per_image: Tensor {
 * //     dims: [ 1, 2 ],
 * //     data: Float32Array(2) [ 18.579734802246094, 24.31830596923828 ],
 * //   },
 * //   logits_per_text: Tensor {
 * //     dims: [ 2, 1 ],
 * //     data: Float32Array(2) [ 18.579734802246094, 24.31830596923828 ],
 * //   },
 * //   text_embeds: Tensor {
 * //     dims: [ 2, 512 ],
 * //     data: Float32Array(1024) [ ... ],
 * //   },
 * //   image_embeds: Tensor {
 * //     dims: [ 1, 512 ],
 * //     data: Float32Array(512) [ ... ],
 * //   }
 * // }
 * ```
 */
class CLIPModel extends CLIPPreTrainedModel { }

/**
 * CLIP Text Model with a projection layer on top (a linear layer on top of the pooled output)
 * 
 * **Example:** Compute text embeddings with `CLIPTextModelWithProjection`.
 * 
 * ```javascript
 * import { AutoTokenizer, CLIPTextModelWithProjection } from '@xenova/transformers';
 * 
 * // Load tokenizer and text model
 * const tokenizer = await AutoTokenizer.from_pretrained('Xenova/clip-vit-base-patch16');
 * const text_model = await CLIPTextModelWithProjection.from_pretrained('Xenova/clip-vit-base-patch16');
 * 
 * // Run tokenization
 * let texts = ['a photo of a car', 'a photo of a football match'];
 * let text_inputs = tokenizer(texts, { padding: true, truncation: true });
 * 
 * // Compute embeddings
 * const { text_embeds } = await text_model(text_inputs);
 * // Tensor {
 * //   dims: [ 2, 512 ],
 * //   type: 'float32',
 * //   data: Float32Array(1024) [ ... ],
 * //   size: 1024
 * // }
 * ```
 */
class CLIPTextModelWithProjection extends (/* unused pure expression or super */ null && (CLIPPreTrainedModel)) {

    /** @type {PreTrainedModel.from_pretrained} */
    static async from_pretrained(pretrained_model_name_or_path, options = {}) {
        // Update default model file name if not provided
        options.model_file_name ??= 'text_model';
        return super.from_pretrained(pretrained_model_name_or_path, options);
    }
}

/**
 * CLIP Vision Model with a projection layer on top (a linear layer on top of the pooled output)
 * 
 * **Example:** Compute vision embeddings with `CLIPVisionModelWithProjection`.
 * 
 * ```javascript
 * import { AutoProcessor, CLIPVisionModelWithProjection, RawImage} from '@xenova/transformers';
 * 
 * // Load processor and vision model
 * const processor = await AutoProcessor.from_pretrained('Xenova/clip-vit-base-patch16');
 * const vision_model = await CLIPVisionModelWithProjection.from_pretrained('Xenova/clip-vit-base-patch16');
 * 
 * // Read image and run processor
 * let image = await RawImage.read('https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/football-match.jpg');
 * let image_inputs = await processor(image);
 * 
 * // Compute embeddings
 * const { image_embeds } = await vision_model(image_inputs);
 * // Tensor {
 * //   dims: [ 1, 512 ],
 * //   type: 'float32',
 * //   data: Float32Array(512) [ ... ],
 * //   size: 512
 * // }
 * ```
 */
class CLIPVisionModelWithProjection extends (/* unused pure expression or super */ null && (CLIPPreTrainedModel)) {
    /** @type {PreTrainedModel.from_pretrained} */
    static async from_pretrained(pretrained_model_name_or_path, options = {}) {
        // Update default model file name if not provided
        options.model_file_name ??= 'vision_model';
        return super.from_pretrained(pretrained_model_name_or_path, options);
    }
}

//////////////////////////////////////////////////

//////////////////////////////////////////////////
// GPT2 models
class GPT2PreTrainedModel extends PreTrainedModel {
    /**
     * Creates a new instance of the `GPT2PreTrainedModel` class.
     * @param {Object} config The configuration of the model.
     * @param {any} session The ONNX session containing the model weights.
     */
    constructor(config, session) {
        super(config, session);

        // config doesn't contain pad_token_id, so we assume it is the eos_token_id
        this.config.pad_token_id = this.config.eos_token_id

        this.num_heads = this.config.n_head
        this.num_layers = this.config.n_layer
        this.dim_kv = this.config.n_embd / this.num_heads;
    }
}

class GPT2Model extends GPT2PreTrainedModel { }

/**
 * GPT-2 language model head on top of the GPT-2 base model. This model is suitable for text generation tasks.
 * @extends GPT2PreTrainedModel
 */
class GPT2LMHeadModel extends GPT2PreTrainedModel { }
// export class GPT2ForSequenceClassification extends GPT2PreTrainedModel {
// TODO
// }
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// GPTNeo models
class GPTNeoPreTrainedModel extends PreTrainedModel {
    /**
     * Creates a new instance of the `GPTNeoPreTrainedModel` class.
     * @param {Object} config The configuration of the model.
     * @param {any} session The ONNX session containing the model weights.
     */
    constructor(config, session) {
        super(config, session);

        // config doesn't contain pad_token_id, so we assume it is the eos_token_id
        this.config.pad_token_id = this.config.eos_token_id

        this.num_heads = this.config.num_heads;
        this.num_layers = this.config.num_layers;
        this.dim_kv = this.config.hidden_size / this.num_heads;
    }
}
class GPTNeoModel extends GPTNeoPreTrainedModel { }

class GPTNeoForCausalLM extends GPTNeoPreTrainedModel { }
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// GPTNeoX models
class GPTNeoXPreTrainedModel extends PreTrainedModel {
    /**
     * Creates a new instance of the `GPTNeoXPreTrainedModel` class.
     * @param {Object} config The configuration of the model.
     * @param {any} session The ONNX session containing the model weights.
     */
    constructor(config, session) {
        super(config, session);

        // config doesn't contain pad_token_id, so we assume it is the eos_token_id
        this.config.pad_token_id = this.config.eos_token_id

        this.num_heads = this.config.num_attention_heads;
        this.num_layers = this.config.num_hidden_layers;
        this.dim_kv = this.config.hidden_size / this.num_heads;
    }
}
class GPTNeoXModel extends GPTNeoXPreTrainedModel { }

class GPTNeoXForCausalLM extends GPTNeoXPreTrainedModel { }
//////////////////////////////////////////////////


//////////////////////////////////////////////////
// GPT-J models
class GPTJPreTrainedModel extends PreTrainedModel {
    /**
     * Creates a new instance of the `GPTJPreTrainedModel` class.
     * @param {Object} config The configuration of the model.
     * @param {any} session The ONNX session containing the model weights.
     */
    constructor(config, session) {
        super(config, session);

        // config doesn't contain pad_token_id, so we assume it is the eos_token_id
        this.config.pad_token_id = this.config.eos_token_id

        this.num_heads = this.config.n_head
        this.num_layers = this.config.n_layer
        this.dim_kv = this.config.n_embd / this.num_heads;
    }
}

class GPTJModel extends GPTJPreTrainedModel { }

class GPTJForCausalLM extends GPTJPreTrainedModel { }
//////////////////////////////////////////////////


//////////////////////////////////////////////////
// GPTBigCode models
class GPTBigCodePreTrainedModel extends PreTrainedModel {
    /**
     * Creates a new instance of the `GPTBigCodePreTrainedModel` class.
     * @param {Object} config The configuration of the model.
     * @param {any} session The ONNX session containing the model weights.
     */
    constructor(config, session) {
        super(config, session);

        // config doesn't contain pad_token_id, so we assume it is the eos_token_id
        this.config.pad_token_id = this.config.eos_token_id

        this.num_heads = this.config.n_head
        this.num_layers = this.config.n_layer
        this.dim_kv = this.config.n_embd / this.num_heads;
    }
}

class GPTBigCodeModel extends GPTBigCodePreTrainedModel { }

class GPTBigCodeForCausalLM extends GPTBigCodePreTrainedModel { }
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// CodeGen models
class CodeGenPreTrainedModel extends PreTrainedModel {
    /**
     * Creates a new instance of the `CodeGenPreTrainedModel` class.
    * @param {Object} config The model configuration object.
    * @param {Object} session The ONNX session object.
    */
    constructor(config, session) {
        super(config, session);

        // config doesn't contain pad_token_id, so we assume it is the eos_token_id
        this.config.pad_token_id = this.config.eos_token_id

        this.num_heads = this.config.n_head
        this.num_layers = this.config.n_layer
        this.dim_kv = this.config.n_embd / this.num_heads;
    }
}
/**
 * CodeGenModel is a class representing a code generation model without a language model head.
 * 
 * @extends CodeGenPreTrainedModel
 */
class CodeGenModel extends CodeGenPreTrainedModel { }

/**
 * CodeGenForCausalLM is a class that represents a code generation model based on the GPT-2 architecture. It extends the `CodeGenPreTrainedModel` class.
 * @extends CodeGenPreTrainedModel
 */
class CodeGenForCausalLM extends CodeGenPreTrainedModel { }
//////////////////////////////////////////////////


//////////////////////////////////////////////////
// LLama models

/**
 * The bare LLama Model outputting raw hidden-states without any specific head on top.
 */
class LlamaPreTrainedModel extends PreTrainedModel {
    /**
     * Creates a new instance of the `LlamaPreTrainedModel` class.
    * @param {Object} config The model configuration object.
    * @param {Object} session The ONNX session object.
    */
    constructor(config, session) {
        super(config, session);

        // config doesn't contain pad_token_id, so we assume it is the eos_token_id
        this.config.pad_token_id = this.config.eos_token_id

        this.num_heads = this.config.num_attention_heads
        this.num_layers = this.config.num_hidden_layers
        this.dim_kv = this.config.hidden_size / this.num_heads;
    }
}
/**
 * The bare LLaMA Model outputting raw hidden-states without any specific head on top.
 */
class LlamaModel extends LlamaPreTrainedModel { }

class LlamaForCausalLM extends LlamaPreTrainedModel { }
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Bloom models
/**
 * The Bloom Model transformer with a language modeling head on top (linear layer with weights tied to the input embeddings).
 */
class BloomPreTrainedModel extends PreTrainedModel {
    /**
     * Creates a new instance of the `BloomPreTrainedModel` class.
     * @param {Object} config The configuration of the model.
     * @param {any} session The ONNX session containing the model weights.
     */
    constructor(config, session) {
        super(config, session);

        // config doesn't contain pad_token_id, so we assume it is the eos_token_id
        this.config.pad_token_id = this.config.eos_token_id

        this.num_heads = this.config.n_head
        this.num_layers = this.config.n_layer
        this.dim_kv = this.config.hidden_size / this.num_heads;
    }
}

/**
 * The bare Bloom Model transformer outputting raw hidden-states without any specific head on top.
 */
class BloomModel extends BloomPreTrainedModel { }

/**
 * The Bloom Model transformer with a language modeling head on top (linear layer with weights tied to the input embeddings).
 */
class BloomForCausalLM extends BloomPreTrainedModel { }
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// MPT models
class MptPreTrainedModel extends PreTrainedModel {
    /**
     * Creates a new instance of the `MptPreTrainedModel` class.
     * @param {Object} config The model configuration object.
     * @param {Object} session The ONNX session object.
     */
    constructor(config, session) {
        super(config, session);

        // config doesn't contain pad_token_id, so we assume it is the eos_token_id
        this.config.pad_token_id = this.config.eos_token_id

        this.num_heads = this.config.n_heads
        this.num_layers = this.config.n_layers
        this.dim_kv = this.config.d_model / this.num_heads;
    }
}

/**
 * The bare Mpt Model transformer outputting raw hidden-states without any specific head on top.
 */
class MptModel extends MptPreTrainedModel { }

/**
 * The MPT Model transformer with a language modeling head on top (linear layer with weights tied to the input embeddings).
 */
class MptForCausalLM extends MptPreTrainedModel { }
//////////////////////////////////////////////////


//////////////////////////////////////////////////
// OPT models
class OPTPreTrainedModel extends PreTrainedModel {
    /**
     * Creates a new instance of the `OPTPreTrainedModel` class.
     * @param {Object} config The model configuration object.
     * @param {Object} session The ONNX session object.
     */
    constructor(config, session) {
        super(config, session);

        // config doesn't contain pad_token_id, so we assume it is the eos_token_id
        this.config.pad_token_id = this.config.eos_token_id

        this.num_heads = this.config.num_attention_heads;
        this.num_layers = this.config.num_hidden_layers;
        this.dim_kv = this.config.hidden_size / this.num_heads;
    }
}

/**
 * The bare OPT Model outputting raw hidden-states without any specific head on top.
 */
class OPTModel extends OPTPreTrainedModel { }

/**
 * The OPT Model transformer with a language modeling head on top (linear layer with weights tied to the input embeddings).
 */
class OPTForCausalLM extends OPTPreTrainedModel { }
//////////////////////////////////////////////////

//////////////////////////////////////////////////
class ViTPreTrainedModel extends PreTrainedModel { }
class ViTModel extends ViTPreTrainedModel { }
class ViTForImageClassification extends ViTPreTrainedModel {
    /**
     * @param {any} model_inputs
     */
    async _call(model_inputs) {
        return new SequenceClassifierOutput(await super._call(model_inputs));
    }
}
//////////////////////////////////////////////////

//////////////////////////////////////////////////
class MobileViTPreTrainedModel extends PreTrainedModel { }
class MobileViTModel extends MobileViTPreTrainedModel { }
class MobileViTForImageClassification extends MobileViTPreTrainedModel {
    /**
     * @param {any} model_inputs
     */
    async _call(model_inputs) {
        return new SequenceClassifierOutput(await super._call(model_inputs));
    }
}
// TODO: MobileViTForSemanticSegmentation

//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Beit Models
class BeitPreTrainedModel extends PreTrainedModel { }
class BeitModel extends BeitPreTrainedModel { }
class BeitForImageClassification extends BeitPreTrainedModel {
    /**
     * @param {any} model_inputs
     */
    async _call(model_inputs) {
        return new SequenceClassifierOutput(await super._call(model_inputs));
    }
}
//////////////////////////////////////////////////


//////////////////////////////////////////////////
class DetrPreTrainedModel extends PreTrainedModel { }
class DetrModel extends DetrPreTrainedModel { }
class DetrForObjectDetection extends DetrPreTrainedModel {
    /**
     * @param {any} model_inputs
     */
    async _call(model_inputs) {
        return new DetrObjectDetectionOutput(await super._call(model_inputs));
    }
}

class DetrForSegmentation extends DetrPreTrainedModel {
    /**
     * Runs the model with the provided inputs
     * @param {Object} model_inputs Model inputs
     * @returns {Promise<DetrSegmentationOutput>} Object containing segmentation outputs
     */
    async _call(model_inputs) {
        return new DetrSegmentationOutput(await super._call(model_inputs));
    }
}

class DetrObjectDetectionOutput extends ModelOutput {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.logits Classification logits (including no-object) for all queries.
     * @param {Tensor} output.pred_boxes Normalized boxes coordinates for all queries, represented as (center_x, center_y, width, height).
     * These values are normalized in [0, 1], relative to the size of each individual image in the batch (disregarding possible padding).
     */
    constructor({ logits, pred_boxes }) {
        super();
        this.logits = logits;
        this.pred_boxes = pred_boxes;
    }
}

class DetrSegmentationOutput extends ModelOutput {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.logits The output logits of the model.
     * @param {Tensor} output.pred_boxes Predicted boxes.
     * @param {Tensor} output.pred_masks Predicted masks.
     */
    constructor({ logits, pred_boxes, pred_masks }) {
        super();
        this.logits = logits;
        this.pred_boxes = pred_boxes;
        this.pred_masks = pred_masks;
    }
}
//////////////////////////////////////////////////


//////////////////////////////////////////////////
class DeiTPreTrainedModel extends PreTrainedModel { }
class DeiTModel extends DeiTPreTrainedModel { }
class DeiTForImageClassification extends DeiTPreTrainedModel {
    /**
     * @param {any} model_inputs
     */
    async _call(model_inputs) {
        return new SequenceClassifierOutput(await super._call(model_inputs));
    }
}
//////////////////////////////////////////////////


//////////////////////////////////////////////////
/**
 * An abstract class to handle weights initialization and a simple interface for downloading and loading pretrained models.
 */
class ResNetPreTrainedModel extends PreTrainedModel { }

/**
 * The bare ResNet model outputting raw features without any specific head on top.
 */
class ResNetModel extends ResNetPreTrainedModel { }

/**
 * ResNet Model with an image classification head on top (a linear layer on top of the pooled features), e.g. for ImageNet.
 */
class ResNetForImageClassification extends ResNetPreTrainedModel {
    /**
     * @param {any} model_inputs
     */
    async _call(model_inputs) {
        return new SequenceClassifierOutput(await super._call(model_inputs));
    }
}
//////////////////////////////////////////////////


//////////////////////////////////////////////////
class SwinPreTrainedModel extends PreTrainedModel { }
class SwinModel extends SwinPreTrainedModel { }
class SwinForImageClassification extends SwinPreTrainedModel {
    /**
     * @param {any} model_inputs
     */
    async _call(model_inputs) {
        return new SequenceClassifierOutput(await super._call(model_inputs));
    }
}
//////////////////////////////////////////////////

//////////////////////////////////////////////////
class YolosPreTrainedModel extends PreTrainedModel { }
class YolosModel extends YolosPreTrainedModel { }
class YolosForObjectDetection extends YolosPreTrainedModel {
    /**
     * @param {any} model_inputs
     */
    async _call(model_inputs) {
        return new YolosObjectDetectionOutput(await super._call(model_inputs));
    }
}

class YolosObjectDetectionOutput extends ModelOutput {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.logits Classification logits (including no-object) for all queries.
     * @param {Tensor} output.pred_boxes Normalized boxes coordinates for all queries, represented as (center_x, center_y, width, height).
     * These values are normalized in [0, 1], relative to the size of each individual image in the batch (disregarding possible padding).
     */
    constructor({ logits, pred_boxes }) {
        super();
        this.logits = logits;
        this.pred_boxes = pred_boxes;
    }
}
//////////////////////////////////////////////////


//////////////////////////////////////////////////
class SamPreTrainedModel extends PreTrainedModel { }
class SamModel extends SamPreTrainedModel {
    /**
     * @param {Object} model_inputs
     * @param {Tensor} model_inputs.pixel_values Pixel values as a Tensor with shape `(batch_size, num_channels, height, width)`.
     * @param {Tensor} model_inputs.input_points Input 2D spatial points with shape `(batch_size, num_points, 2)`. This is used by the prompt encoder to encode the prompt.
     * @todo Add support for `input_labels`, `input_boxes`, `input_masks`, and `image_embeddings`.
     */
    async _call(model_inputs) {
        return new SamImageSegmentationOutput(await super._call(model_inputs));
    }
}


/**
 * Base class for Segment-Anything model's output.
 */
class SamImageSegmentationOutput extends ModelOutput {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.iou_scores The output logits of the model.
     * @param {Tensor} output.pred_masks Predicted boxes.
     */
    constructor({ iou_scores, pred_masks }) {
        super();
        this.iou_scores = iou_scores;
        this.pred_masks = pred_masks;
    }
}
//////////////////////////////////////////////////


//////////////////////////////////////////////////
// MarianMT models
class MarianPreTrainedModel extends PreTrainedModel { };

class MarianModel extends MarianPreTrainedModel { }

class MarianMTModel extends MarianPreTrainedModel {

    /**
     * Creates a new instance of the `MarianMTModel` class.
    * @param {Object} config The model configuration object.
    * @param {Object} session The ONNX session object.
    * @param {any} decoder_merged_session 
    * @param {any} generation_config 
    */
    constructor(config, session, decoder_merged_session, generation_config) {
        super(config, session);
        this.decoder_merged_session = decoder_merged_session;
        this.generation_config = generation_config;

        this.num_decoder_layers = this.config.decoder_layers;
        this.num_decoder_heads = this.config.decoder_attention_heads;
        this.decoder_dim_kv = this.config.d_model / this.num_decoder_heads;

        this.num_encoder_layers = this.config.encoder_layers;
        this.num_encoder_heads = this.config.encoder_attention_heads;
        this.encoder_dim_kv = this.config.d_model / this.num_encoder_heads;
    }


    /**
     * @param {any} model_inputs
     * @returns {Promise<Seq2SeqLMOutput>}
     */
    async forward(model_inputs) {
        return await seq2seqForward(this, model_inputs);
    }
}
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// M2M100 models
class M2M100PreTrainedModel extends PreTrainedModel { };

class M2M100Model extends M2M100PreTrainedModel { }

class M2M100ForConditionalGeneration extends M2M100PreTrainedModel {

    /**
     * Creates a new instance of the `M2M100ForConditionalGeneration` class.
    * @param {Object} config The model configuration object.
    * @param {Object} session The ONNX session object.
    * @param {any} decoder_merged_session 
    * @param {any} generation_config 
    */
    constructor(config, session, decoder_merged_session, generation_config) {
        super(config, session);
        this.decoder_merged_session = decoder_merged_session;
        this.generation_config = generation_config;

        this.num_decoder_layers = this.config.decoder_layers;
        this.num_decoder_heads = this.config.decoder_attention_heads;
        this.decoder_dim_kv = this.config.d_model / this.num_decoder_heads;

        this.num_encoder_layers = this.config.encoder_layers;
        this.num_encoder_heads = this.config.encoder_attention_heads;
        this.encoder_dim_kv = this.config.d_model / this.num_encoder_heads;
    }

    /**
     * @param {any} model_inputs
     * @returns {Promise<Seq2SeqLMOutput>}
     */
    async forward(model_inputs) {
        return await seq2seqForward(this, model_inputs);
    }
}
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// Wav2Vec2 models
class Wav2Vec2PreTrainedModel extends PreTrainedModel { };

/**
 * The bare Wav2Vec2 Model transformer outputting raw hidden-states without any specific head on top.
 * 
 * **Example:** Load and run an `Wav2Vec2Model` for feature extraction.
 * 
 * ```javascript
 * import { AutoProcessor, AutoModel, read_audio } from '@xenova/transformers';
 * 
 * // Read and preprocess audio
 * const processor = await AutoProcessor.from_pretrained('Xenova/mms-300m');
 * const audio = await read_audio('https://huggingface.co/datasets/Narsil/asr_dummy/resolve/main/mlk.flac', 16000);
 * const inputs = await processor(audio);
 * 
 * // Run model with inputs
 * const model = await AutoModel.from_pretrained('Xenova/mms-300m');
 * const output = await model(inputs);
 * // {
 * //   last_hidden_state: Tensor {
 * //     dims: [ 1, 1144, 1024 ],
 * //     type: 'float32',
 * //     data: Float32Array(1171456) [ ... ],
 * //     size: 1171456
 * //   }
 * // }
 * ```
 */
class Wav2Vec2Model extends Wav2Vec2PreTrainedModel { }

class Wav2Vec2ForCTC extends Wav2Vec2PreTrainedModel {
    /**
     * @param {Object} model_inputs
     * @param {Tensor} model_inputs.input_values Float values of input raw speech waveform.
     * @param {Tensor} model_inputs.attention_mask Mask to avoid performing convolution and attention on padding token indices. Mask values selected in [0, 1]
     */
    async _call(model_inputs) {
        return new CausalLMOutput(await super._call(model_inputs));
    }
}

class Wav2Vec2ForSequenceClassification extends Wav2Vec2PreTrainedModel {
    /**
     * Calls the model on new inputs.
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
     */
    async _call(model_inputs) {
        return new SequenceClassifierOutput(await super._call(model_inputs));
    }
}
//////////////////////////////////////////////////
// WavLM models
/**
 * An abstract class to handle weights initialization and a simple interface for downloading and loading pretrained models.
 */
class WavLMPreTrainedModel extends PreTrainedModel { };

/**
 * The bare WavLM Model transformer outputting raw hidden-states without any specific head on top.
 * 
 * **Example:** Load and run an `WavLMModel` for feature extraction.
 * 
 * ```javascript
 * import { AutoProcessor, AutoModel, read_audio } from '@xenova/transformers';
 * 
 * // Read and preprocess audio
 * const processor = await AutoProcessor.from_pretrained('Xenova/wavlm-base');
 * const audio = await read_audio('https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav', 16000);
 * const inputs = await processor(audio);
 * 
 * // Run model with inputs
 * const model = await AutoModel.from_pretrained('Xenova/wavlm-base');
 * const output = await model(inputs);
 * // {
 * //   last_hidden_state: Tensor {
 * //     dims: [ 1, 549, 768 ],
 * //     type: 'float32',
 * //     data: Float32Array(421632) [-0.349443256855011, -0.39341306686401367,  0.022836603224277496, ...],
 * //     size: 421632
 * //   }
 * // }
 * ```
 */
class WavLMModel extends WavLMPreTrainedModel { }

/**
 * WavLM Model with a `language modeling` head on top for Connectionist Temporal Classification (CTC).
 */
class WavLMForCTC extends WavLMPreTrainedModel {
    /**
     * @param {Object} model_inputs
     * @param {Tensor} model_inputs.input_values Float values of input raw speech waveform.
     * @param {Tensor} model_inputs.attention_mask Mask to avoid performing convolution and attention on padding token indices. Mask values selected in [0, 1]
     */
    async _call(model_inputs) {
        return new CausalLMOutput(await super._call(model_inputs));
    }
}

/**
 * WavLM Model with a sequence classification head on top (a linear layer over the pooled output).
 */
class WavLMForSequenceClassification extends WavLMPreTrainedModel {
    /**
     * Calls the model on new inputs.
     * @param {Object} model_inputs The inputs to the model.
     * @returns {Promise<SequenceClassifierOutput>} An object containing the model's output logits for sequence classification.
     */
    async _call(model_inputs) {
        return new SequenceClassifierOutput(await super._call(model_inputs));
    }
}

//////////////////////////////////////////////////
// AutoModels, used to simplify construction of PreTrainedModels
// (uses config to instantiate correct class)

/**
 * Base class of all AutoModels. Contains the `from_pretrained` function
 * which is used to instantiate pretrained models.
 */
class PretrainedMixin {
    /**
     * Mapping from model type to model class.
     * @type {Map<string, Object>[]}
     */
    static MODEL_CLASS_MAPPINGS = null;

    /**
     * Whether to attempt to instantiate the base class (`PretrainedModel`) if 
     * the model type is not found in the mapping.
     */
    static BASE_IF_FAIL = false;


    /** @type {PreTrainedModel.from_pretrained} */
    static async from_pretrained(pretrained_model_name_or_path, {
        quantized = true,
        progress_callback = null,
        config = null,
        cache_dir = null,
        local_files_only = false,
        revision = 'main',
        model_file_name = null,
    } = {}) {

        let options = {
            quantized,
            progress_callback,
            config,
            cache_dir,
            local_files_only,
            revision,
            model_file_name,
        }
        config = await AutoConfig.from_pretrained(pretrained_model_name_or_path, options);
        if (!options.config) {
            // If no config was passed, reuse this config for future processing
            options.config = config;
        }

        if (!this.MODEL_CLASS_MAPPINGS) {
            throw new Error("`MODEL_CLASS_MAPPINGS` not implemented for this type of `AutoClass`: " + this.name);
        }

        let modelClass;
        for (let MODEL_CLASS_MAPPING of this.MODEL_CLASS_MAPPINGS) {
            modelClass = MODEL_CLASS_MAPPING.get(config.model_type);
            if (!modelClass) {
                continue; // Item not found in this mapping
            }

            return await modelClass.from_pretrained(pretrained_model_name_or_path, options);
        }

        if (this.BASE_IF_FAIL) {
            console.warn(`Unknown model class "${config.model_type}", attempting to construct from base class.`);
            return await PreTrainedModel.from_pretrained(pretrained_model_name_or_path, options);
        } else {
            throw Error(`Unsupported model type: ${config.model_type}`)
        }
    }
}

const MODEL_MAPPING_NAMES_ENCODER_ONLY = new Map([
    ['bert', BertModel],
    ['camembert', CamembertModel],
    ['deberta', DebertaModel],
    ['deberta-v2', DebertaV2Model],
    ['mpnet', MPNetModel],
    ['albert', AlbertModel],
    ['distilbert', DistilBertModel],
    ['roberta', RobertaModel],
    ['xlm', XLMModel],
    ['xlm-roberta', XLMRobertaModel],
    ['clip', CLIPModel],
    ['mobilebert', MobileBertModel],
    ['squeezebert', SqueezeBertModel],
    ['wav2vec2', Wav2Vec2Model],
    ['wavlm', WavLMModel],

    ['detr', DetrModel],
    ['vit', ViTModel],
    ['mobilevit', MobileViTModel],
    ['beit', BeitModel],
    ['deit', DeiTModel],
    ['resnet', ResNetModel],
    ['swin', SwinModel],
    ['yolos', YolosModel],

    ['sam', SamModel], // TODO change to encoder-decoder when model is split correctly
]);

const MODEL_MAPPING_NAMES_ENCODER_DECODER = new Map([
    ['t5', T5Model],
    ['mt5', MT5Model],
    ['bart', BartModel],
    ['mbart', MBartModel],
    ['marian', MarianModel],
    ['whisper', WhisperModel],
    ['m2m_100', M2M100Model],
]);


const MODEL_MAPPING_NAMES_DECODER_ONLY = new Map([
    ['bloom', BloomModel],
    ['gpt2', GPT2Model],
    ['gptj', GPTJModel],
    ['gpt_bigcode', GPTBigCodeModel],
    ['gpt_neo', GPTNeoModel],
    ['gpt_neox', GPTNeoXModel],
    ['codegen', CodeGenModel],
    ['llama', LlamaModel],
    ['mpt', MptModel],
    ['opt', OPTModel],
]);

const MODEL_FOR_SEQUENCE_CLASSIFICATION_MAPPING_NAMES = new Map([
    ['bert', BertForSequenceClassification],
    ['camembert', CamembertForSequenceClassification],
    ['deberta', DebertaForSequenceClassification],
    ['deberta-v2', DebertaV2ForSequenceClassification],
    ['mpnet', MPNetForSequenceClassification],
    ['albert', AlbertForSequenceClassification],
    ['distilbert', DistilBertForSequenceClassification],
    ['roberta', RobertaForSequenceClassification],
    ['xlm', XLMForSequenceClassification],
    ['xlm-roberta', XLMRobertaForSequenceClassification],
    ['bart', BartForSequenceClassification],
    ['mbart', MBartForSequenceClassification],
    ['mobilebert', MobileBertForSequenceClassification],
    ['squeezebert', SqueezeBertForSequenceClassification],
]);

const MODEL_FOR_TOKEN_CLASSIFICATION_MAPPING_NAMES = new Map([
    ['bert', BertForTokenClassification],
    ['camembert', CamembertForTokenClassification],
    ['deberta', DebertaForTokenClassification],
    ['deberta-v2', DebertaV2ForTokenClassification],
    ['mpnet', MPNetForTokenClassification],
    ['distilbert', DistilBertForTokenClassification],
    ['roberta', RobertaForTokenClassification],
    ['xlm', XLMForTokenClassification],
    ['xlm-roberta', XLMRobertaForTokenClassification],
]);

const MODEL_FOR_SEQ_2_SEQ_MAPPING_NAMES = new Map([
    ['t5', T5ForConditionalGeneration],
    ['mt5', MT5ForConditionalGeneration],
    ['bart', BartForConditionalGeneration],
    ['mbart', MBartForConditionalGeneration],
    ['whisper', WhisperForConditionalGeneration],
    ['marian', MarianMTModel],
    ['m2m_100', M2M100ForConditionalGeneration],
]);

const MODEL_WITH_LM_HEAD_MAPPING_NAMES = new Map([
    ['bloom', BloomForCausalLM],
    ['gpt2', GPT2LMHeadModel],
    ['gptj', GPTJForCausalLM],
    ['gpt_bigcode', GPTBigCodeForCausalLM],
    ['gpt_neo', GPTNeoForCausalLM],
    ['gpt_neox', GPTNeoXForCausalLM],
    ['codegen', CodeGenForCausalLM],
    ['llama', LlamaForCausalLM],
    ['mpt', MptForCausalLM],
    ['opt', OPTForCausalLM],
]);

const MODEL_FOR_MASKED_LM_MAPPING_NAMES = new Map([
    ['bert', BertForMaskedLM],
    ['camembert', CamembertForMaskedLM],
    ['deberta', DebertaForMaskedLM],
    ['deberta-v2', DebertaV2ForMaskedLM],
    ['mpnet', MPNetForMaskedLM],
    ['albert', AlbertForMaskedLM],
    ['distilbert', DistilBertForMaskedLM],
    ['roberta', RobertaForMaskedLM],
    ['xlm', XLMWithLMHeadModel],
    ['xlm-roberta', XLMRobertaForMaskedLM],
    ['mobilebert', MobileBertForMaskedLM],
    ['squeezebert', SqueezeBertForMaskedLM],
]);

const MODEL_FOR_QUESTION_ANSWERING_MAPPING_NAMES = new Map([
    ['bert', BertForQuestionAnswering],
    ['camembert', CamembertForQuestionAnswering],
    ['deberta', DebertaForQuestionAnswering],
    ['deberta-v2', DebertaV2ForQuestionAnswering],
    ['mpnet', MPNetForQuestionAnswering],
    ['albert', AlbertForQuestionAnswering],
    ['distilbert', DistilBertForQuestionAnswering],
    ['roberta', RobertaForQuestionAnswering],
    ['xlm', XLMForQuestionAnswering],
    ['xlm-roberta', XLMRobertaForQuestionAnswering],
    ['mobilebert', MobileBertForQuestionAnswering],
    ['squeezebert', SqueezeBertForQuestionAnswering],
]);

const MODEL_FOR_VISION_2_SEQ_MAPPING_NAMES = new Map([
    ['vision-encoder-decoder', VisionEncoderDecoderModel],
]);

const MODEL_FOR_IMAGE_CLASSIFICATION_MAPPING_NAMES = new Map([
    ['vit', ViTForImageClassification],
    ['mobilevit', MobileViTForImageClassification],
    ['beit', BeitForImageClassification],
    ['deit', DeiTForImageClassification],
    ['resnet', ResNetForImageClassification],
    ['swin', SwinForImageClassification],
]);

const MODEL_FOR_OBJECT_DETECTION_MAPPING_NAMES = new Map([
    ['detr', DetrForObjectDetection],
    ['yolos', YolosForObjectDetection],
]);

const MODEL_FOR_IMAGE_SEGMENTATION_MAPPING_NAMES = new Map([
    ['detr', DetrForSegmentation],
]);

const MODEL_FOR_MASK_GENERATION_MAPPING_NAMES = new Map([
    ['sam', SamModel],
]);

const MODEL_FOR_CTC_MAPPING_NAMES = new Map([
    ['wav2vec2', Wav2Vec2ForCTC],
    ['wavlm', WavLMForCTC],
]);

const MODEL_FOR_AUDIO_CLASSIFICATION_MAPPING_NAMES = new Map([
    ['wav2vec2', Wav2Vec2ForSequenceClassification],
    ['wavlm', WavLMForSequenceClassification],
]);


const MODEL_CLASS_TYPE_MAPPING = [
    [MODEL_MAPPING_NAMES_ENCODER_ONLY, MODEL_TYPES.EncoderOnly],
    [MODEL_MAPPING_NAMES_ENCODER_DECODER, MODEL_TYPES.EncoderDecoder],
    [MODEL_MAPPING_NAMES_DECODER_ONLY, MODEL_TYPES.DecoderOnly],
    [MODEL_FOR_SEQUENCE_CLASSIFICATION_MAPPING_NAMES, MODEL_TYPES.EncoderOnly],
    [MODEL_FOR_TOKEN_CLASSIFICATION_MAPPING_NAMES, MODEL_TYPES.EncoderOnly],
    [MODEL_FOR_SEQ_2_SEQ_MAPPING_NAMES, MODEL_TYPES.Seq2Seq],
    [MODEL_WITH_LM_HEAD_MAPPING_NAMES, MODEL_TYPES.DecoderOnly],
    [MODEL_FOR_MASKED_LM_MAPPING_NAMES, MODEL_TYPES.EncoderOnly],
    [MODEL_FOR_QUESTION_ANSWERING_MAPPING_NAMES, MODEL_TYPES.EncoderOnly],
    [MODEL_FOR_VISION_2_SEQ_MAPPING_NAMES, MODEL_TYPES.Vision2Seq],
    [MODEL_FOR_IMAGE_CLASSIFICATION_MAPPING_NAMES, MODEL_TYPES.EncoderOnly],
    [MODEL_FOR_IMAGE_SEGMENTATION_MAPPING_NAMES, MODEL_TYPES.EncoderOnly],
    [MODEL_FOR_OBJECT_DETECTION_MAPPING_NAMES, MODEL_TYPES.EncoderOnly],
    [MODEL_FOR_MASK_GENERATION_MAPPING_NAMES, MODEL_TYPES.EncoderOnly],
    [MODEL_FOR_CTC_MAPPING_NAMES, MODEL_TYPES.EncoderOnly],
    [MODEL_FOR_AUDIO_CLASSIFICATION_MAPPING_NAMES, MODEL_TYPES.EncoderOnly],
];

for (const [mappings, type] of MODEL_CLASS_TYPE_MAPPING) {
    // @ts-ignore
    for (const model of mappings.values()) {
        // @ts-ignore
        MODEL_TYPE_MAPPING.set(model.name, type);
    }
}


/**
 * Helper class which is used to instantiate pretrained models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 * 
 * @example
 * let model = await AutoModel.from_pretrained('bert-base-uncased');
 */
class AutoModel extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS = [MODEL_MAPPING_NAMES_ENCODER_ONLY, MODEL_MAPPING_NAMES_ENCODER_DECODER, MODEL_MAPPING_NAMES_DECODER_ONLY];
    static BASE_IF_FAIL = true;
}

/**
 * Helper class which is used to instantiate pretrained sequence classification models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 * 
 * @example
 * let model = await AutoModelForSequenceClassification.from_pretrained('distilbert-base-uncased-finetuned-sst-2-english');
 */
class AutoModelForSequenceClassification extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS = [MODEL_FOR_SEQUENCE_CLASSIFICATION_MAPPING_NAMES];
}

/**
 * Helper class which is used to instantiate pretrained token classification models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 * 
 * @example
 * let model = await AutoModelForTokenClassification.from_pretrained('Davlan/distilbert-base-multilingual-cased-ner-hrl');
 */
class AutoModelForTokenClassification extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS = [MODEL_FOR_TOKEN_CLASSIFICATION_MAPPING_NAMES];
}

/**
 * Helper class which is used to instantiate pretrained sequence-to-sequence models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 * 
 * @example
 * let model = await AutoModelForSeq2SeqLM.from_pretrained('t5-small');
 */
class AutoModelForSeq2SeqLM extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS = [MODEL_FOR_SEQ_2_SEQ_MAPPING_NAMES];
}

/**
 * Helper class which is used to instantiate pretrained causal language models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 * 
 * @example
 * let model = await AutoModelForCausalLM.from_pretrained('gpt2');
 */
class AutoModelForCausalLM extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS = [MODEL_WITH_LM_HEAD_MAPPING_NAMES];
}

/**
 * Helper class which is used to instantiate pretrained masked language models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 * 
 * @example
 * let model = await AutoModelForMaskedLM.from_pretrained('bert-base-uncased');
 */
class AutoModelForMaskedLM extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS = [MODEL_FOR_MASKED_LM_MAPPING_NAMES];
}

/**
 * Helper class which is used to instantiate pretrained question answering models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 * 
 * @example
 * let model = await AutoModelForQuestionAnswering.from_pretrained('distilbert-base-cased-distilled-squad');
 */
class AutoModelForQuestionAnswering extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS = [MODEL_FOR_QUESTION_ANSWERING_MAPPING_NAMES];
}

/**
 * Helper class which is used to instantiate pretrained vision-to-sequence models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 * 
 * @example
 * let model = await AutoModelForVision2Seq.from_pretrained('nlpconnect/vit-gpt2-image-captioning');
 */
class AutoModelForVision2Seq extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS = [MODEL_FOR_VISION_2_SEQ_MAPPING_NAMES];
}

/**
 * Helper class which is used to instantiate pretrained image classification models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 * 
 * @example
 * let model = await AutoModelForImageClassification.from_pretrained('google/vit-base-patch16-224');
 */
class AutoModelForImageClassification extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS = [MODEL_FOR_IMAGE_CLASSIFICATION_MAPPING_NAMES];
}

/**
 * Helper class which is used to instantiate pretrained image segmentation models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 * 
 * @example
 * let model = await AutoModelForImageSegmentation.from_pretrained('facebook/detr-resnet-50-panoptic');
 */
class AutoModelForImageSegmentation extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS = [MODEL_FOR_IMAGE_SEGMENTATION_MAPPING_NAMES];
}

/**
 * Helper class which is used to instantiate pretrained object detection models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 * 
 * @example
 * let model = await AutoModelForObjectDetection.from_pretrained('facebook/detr-resnet-50');
 */
class AutoModelForObjectDetection extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS = [MODEL_FOR_OBJECT_DETECTION_MAPPING_NAMES];
}

/**
 * Helper class which is used to instantiate pretrained object detection models with the `from_pretrained` function.
 * The chosen model class is determined by the type specified in the model config.
 * 
 * @example
 * let model = await AutoModelForMaskGeneration.from_pretrained('Xenova/sam-vit-base');
 */
class AutoModelForMaskGeneration extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS = [MODEL_FOR_MASK_GENERATION_MAPPING_NAMES];
}

class AutoModelForCTC extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS = [MODEL_FOR_CTC_MAPPING_NAMES];
}

class AutoModelForAudioClassification extends PretrainedMixin {
    static MODEL_CLASS_MAPPINGS = [MODEL_FOR_AUDIO_CLASSIFICATION_MAPPING_NAMES];
}


//////////////////////////////////////////////////

//////////////////////////////////////////////////
class Seq2SeqLMOutput extends ModelOutput {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.logits The output logits of the model.
     * @param {Tensor} output.past_key_values An tensor of key/value pairs that represent the previous state of the model.
     * @param {Tensor} output.encoder_outputs The output of the encoder in a sequence-to-sequence model.
     * @param {Tensor} [output.decoder_attentions] Attentions weights of the decoder, after the attention softmax, used to compute the weighted average in the self-attention heads.
     * @param {Tensor} [output.cross_attentions] Attentions weights of the decoder's cross-attention layer, after the attention softmax, used to compute the weighted average in the cross-attention heads.
     */
    constructor({ logits, past_key_values, encoder_outputs, decoder_attentions = null, cross_attentions = null }) {
        super();
        this.logits = logits;
        this.past_key_values = past_key_values;
        this.encoder_outputs = encoder_outputs;
        this.decoder_attentions = decoder_attentions;
        this.cross_attentions = cross_attentions;
    }
}

/**
 * Base class for outputs of sentence classification models.
 */
class SequenceClassifierOutput extends ModelOutput {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.logits classification (or regression if config.num_labels==1) scores (before SoftMax).
     */
    constructor({ logits }) {
        super();
        this.logits = logits;
    }
}

/**
 * Base class for outputs of token classification models.
 */
class TokenClassifierOutput extends ModelOutput {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.logits Classification scores (before SoftMax).
     */
    constructor({ logits }) {
        super();
        this.logits = logits;
    }
}

/**
 * Base class for masked language models outputs.
 */
class MaskedLMOutput extends ModelOutput {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.logits Prediction scores of the language modeling head (scores for each vocabulary token before SoftMax).
     */
    constructor({ logits }) {
        super();
        this.logits = logits;
    }
}

/**
 * Base class for outputs of question answering models.
 */
class QuestionAnsweringModelOutput extends ModelOutput {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.start_logits Span-start scores (before SoftMax).
     * @param {Tensor} output.end_logits Span-end scores (before SoftMax).
     */
    constructor({ start_logits, end_logits }) {
        super();
        this.start_logits = start_logits;
        this.end_logits = end_logits;
    }
}


/**
 * Base class for causal language model (or autoregressive) outputs.
 */
class CausalLMOutput extends ModelOutput {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.logits Prediction scores of the language modeling head (scores for each vocabulary token before softmax).
     */
    constructor({ logits }) {
        super();
        this.logits = logits;
    }
}

/**
 * Base class for causal language model (or autoregressive) outputs.
 */
class CausalLMOutputWithPast extends (/* unused pure expression or super */ null && (ModelOutput)) {
    /**
     * @param {Object} output The output of the model.
     * @param {Tensor} output.logits Prediction scores of the language modeling head (scores for each vocabulary token before softmax).
     * @param {Tensor} output.past_key_values Contains pre-computed hidden-states (key and values in the self-attention blocks)
     * that can be used (see `past_key_values` input) to speed up sequential decoding.
     */
    constructor({ logits, past_key_values }) {
        super();
        this.logits = logits;
        this.past_key_values = past_key_values;
    }
}

// EXTERNAL MODULE: sharp (ignored)
var sharp_ignored_ = __webpack_require__(3380);
;// CONCATENATED MODULE: ./node_modules/@xenova/transformers/src/utils/image.js

/**
 * @file Helper module for image processing. 
 * 
 * These functions and classes are only used internally, 
 * meaning an end-user shouldn't need to access anything here.
 * 
 * @module utils/image
 */





// Will be empty (or not used) if running in browser or web-worker


const BROWSER_ENV = typeof self !== 'undefined';

let createCanvasFunction;
let ImageDataClass;
let loadImageFunction;
if (BROWSER_ENV) {
    // Running in browser or web-worker
    createCanvasFunction = (/** @type {number} */ width, /** @type {number} */ height) => {
        if (!self.OffscreenCanvas) {
            throw new Error('OffscreenCanvas not supported by this browser.');
        }
        return new self.OffscreenCanvas(width, height)
    };
    loadImageFunction = self.createImageBitmap;
    ImageDataClass = self.ImageData;

} else if (sharp_ignored_) {
    // Running in Node.js, electron, or other non-browser environment

    loadImageFunction = async (/**@type {sharp.Sharp}*/img) => {
        const metadata = await img.metadata();
        const rawChannels = metadata.channels;

        let { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

        const newImage = new RawImage(new Uint8ClampedArray(data), info.width, info.height, info.channels);
        if (rawChannels !== undefined && rawChannels !== info.channels) {
            // Make sure the new image has the same number of channels as the input image.
            // This is necessary for grayscale images.
            newImage.convert(rawChannels);
        }
        return newImage;
    }

} else {
    throw new Error('Unable to load image processing library.');
}


// Defined here: https://github.com/python-pillow/Pillow/blob/a405e8406b83f8bfb8916e93971edc7407b8b1ff/src/libImaging/Imaging.h#L262-L268
const RESAMPLING_MAPPING = {
    0: 'nearest',
    1: 'lanczos',
    2: 'bilinear',
    3: 'bicubic',
    4: 'box',
    5: 'hamming',
}

class RawImage {

    /**
     * Mapping from file extensions to MIME types.
     */
    _CONTENT_TYPE_MAP = {
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
    }

    /**
     * Create a new `RawImage` object.
     * @param {Uint8ClampedArray} data The pixel data.
     * @param {number} width The width of the image.
     * @param {number} height The height of the image.
     * @param {1|2|3|4} channels The number of channels.
     */
    constructor(data, width, height, channels) {
        this._update(data, width, height, channels);
    }

    /**
     * Helper method for reading an image from a variety of input types.
     * @param {RawImage|string|URL} input 
     * @returns The image object.
     * 
     * **Example:** Read image from a URL.
     * ```javascript
     * let image = await RawImage.read('https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/football-match.jpg');
     * // test {
     * //   "data": Uint8ClampedArray [ 25, 25, 25, 19, 19, 19, ... ],
     * //   "width": 800,
     * //   "height": 533,
     * //   "channels": 3
     * // }
     * ```
     */
    static async read(input) {
        if (input instanceof RawImage) {
            return input;
        } else if (isString(input) || input instanceof URL) {
            return await this.fromURL(input);
        } else {
            throw new Error(`Unsupported input type: ${typeof input}`);
        }
    }


    /**
     * Read an image from a URL or file path.
     * @param {string|URL} url The URL or file path to read the image from.
     * @returns {Promise<RawImage>} The image object.
     */
    static async fromURL(url) {
        let response = await getFile(url);
        if (response.status !== 200) {
            throw new Error(`Unable to read image from "${url}" (${response.status} ${response.statusText})`);
        }
        let blob = await response.blob();
        return this.fromBlob(blob);
    }

    /**
     * Helper method to create a new Image from a blob.
     * @param {Blob} blob The blob to read the image from.
     * @returns {Promise<RawImage>} The image object.
     */
    static async fromBlob(blob) {
        if (BROWSER_ENV) {
            // Running in environment with canvas
            let img = await loadImageFunction(blob);

            const ctx = createCanvasFunction(img.width, img.height).getContext('2d');

            // Draw image to context
            ctx.drawImage(img, 0, 0);

            return new this(ctx.getImageData(0, 0, img.width, img.height).data, img.width, img.height, 4);

        } else {
            // Use sharp.js to read (and possible resize) the image.
            let img = sharp_ignored_(await blob.arrayBuffer());

            return await loadImageFunction(img);
        }
    }

    /**
     * Convert the image to grayscale format.
     * @returns {RawImage} `this` to support chaining.
     */
    grayscale() {
        if (this.channels === 1) {
            return this;
        }

        let newData = new Uint8ClampedArray(this.width * this.height * 1);
        switch (this.channels) {
            case 3: // rgb to grayscale
            case 4: // rgba to grayscale
                for (let i = 0, offset = 0; i < this.data.length; i += this.channels) {
                    const red = this.data[i];
                    const green = this.data[i + 1];
                    const blue = this.data[i + 2];

                    newData[offset++] = Math.round(0.2989 * red + 0.5870 * green + 0.1140 * blue);
                }
                break;
            default:
                throw new Error(`Conversion failed due to unsupported number of channels: ${this.channels}`);
        }
        return this._update(newData, this.width, this.height, 1);
    }

    /**
     * Convert the image to RGB format.
     * @returns {RawImage} `this` to support chaining.
     */
    rgb() {
        if (this.channels === 3) {
            return this;
        }

        let newData = new Uint8ClampedArray(this.width * this.height * 3);

        switch (this.channels) {
            case 1: // grayscale to rgb
                for (let i = 0, offset = 0; i < this.data.length; ++i) {
                    newData[offset++] = this.data[i];
                    newData[offset++] = this.data[i];
                    newData[offset++] = this.data[i];
                }
                break;
            case 4: // rgba to rgb
                for (let i = 0, offset = 0; i < this.data.length; i += 4) {
                    newData[offset++] = this.data[i];
                    newData[offset++] = this.data[i + 1];
                    newData[offset++] = this.data[i + 2];
                }
                break;
            default:
                throw new Error(`Conversion failed due to unsupported number of channels: ${this.channels}`);
        }
        return this._update(newData, this.width, this.height, 3);

    }

    /**
     * Convert the image to RGBA format.
     * @returns {RawImage} `this` to support chaining.
     */
    rgba() {
        if (this.channels === 4) {
            return this;
        }

        let newData = new Uint8ClampedArray(this.width * this.height * 4);

        switch (this.channels) {
            case 1: // grayscale to rgba
                for (let i = 0, offset = 0; i < this.data.length; ++i) {
                    newData[offset++] = this.data[i];
                    newData[offset++] = this.data[i];
                    newData[offset++] = this.data[i];
                    newData[offset++] = 255;
                }
                break;
            case 3: // rgb to rgba
                for (let i = 0, offset = 0; i < this.data.length; i += 3) {
                    newData[offset++] = this.data[i];
                    newData[offset++] = this.data[i + 1];
                    newData[offset++] = this.data[i + 2];
                    newData[offset++] = 255;
                }
                break;
            default:
                throw new Error(`Conversion failed due to unsupported number of channels: ${this.channels}`);
        }

        return this._update(newData, this.width, this.height, 4);
    }

    /**
     * Resize the image to the given dimensions. This method uses the canvas API to perform the resizing.
     * @param {number} width The width of the new image.
     * @param {number} height The height of the new image.
     * @param {Object} options Additional options for resizing.
     * @param {0|1|2|3|4|5|string} [options.resample] The resampling method to use.
     * @returns {Promise<RawImage>} `this` to support chaining.
     */
    async resize(width, height, {
        resample = 2,
    } = {}) {

        // Ensure resample method is a string
        let resampleMethod = RESAMPLING_MAPPING[resample] ?? resample;

        if (BROWSER_ENV) {
            // TODO use `resample` in browser environment

            // Store number of channels before resizing
            let numChannels = this.channels;

            // Create canvas object for this image
            let canvas = this.toCanvas();

            // Actually perform resizing using the canvas API
            const ctx = createCanvasFunction(width, height).getContext('2d');

            // Draw image to context, resizing in the process
            ctx.drawImage(canvas, 0, 0, width, height);

            // Create image from the resized data
            let resizedImage = new RawImage(ctx.getImageData(0, 0, width, height).data, width, height, 4);

            // Convert back so that image has the same number of channels as before
            return resizedImage.convert(numChannels);

        } else {
            // Create sharp image from raw data, and resize
            let img = this.toSharp();

            switch (resampleMethod) {
                case 'box':
                case 'hamming':
                    if (resampleMethod === 'box' || resampleMethod === 'hamming') {
                        console.warn(`Resampling method ${resampleMethod} is not yet supported. Using bilinear instead.`);
                        resampleMethod = 'bilinear';
                    }

                case 'nearest':
                case 'bilinear':
                case 'bicubic':
                    // Perform resizing using affine transform. 
                    // This matches how the python Pillow library does it.
                    img = img.affine([width / this.width, 0, 0, height / this.height], {
                        interpolator: resampleMethod
                    });
                    break;

                case 'lanczos':
                    // https://github.com/python-pillow/Pillow/discussions/5519
                    // https://github.com/lovell/sharp/blob/main/docs/api-resize.md
                    img = img.resize({
                        width, height,
                        fit: 'fill',
                        kernel: 'lanczos3', // PIL Lanczos uses a kernel size of 3 
                    });
                    break;

                default:
                    throw new Error(`Resampling method ${resampleMethod} is not supported.`);
            }

            return await loadImageFunction(img);
        }

    }

    async pad([left, right, top, bottom]) {
        left = Math.max(left, 0);
        right = Math.max(right, 0);
        top = Math.max(top, 0);
        bottom = Math.max(bottom, 0);

        if (left === 0 && right === 0 && top === 0 && bottom === 0) {
            // No padding needed
            return this;
        }

        if (BROWSER_ENV) {
            // Store number of channels before padding
            let numChannels = this.channels;

            // Create canvas object for this image
            let canvas = this.toCanvas();

            let newWidth = this.width + left + right;
            let newHeight = this.height + top + bottom;

            // Create a new canvas of the desired size.
            const ctx = createCanvasFunction(newWidth, newHeight).getContext('2d');

            // Draw image to context, padding in the process
            ctx.drawImage(canvas,
                0, 0, this.width, this.height,
                left, top, newWidth, newHeight
            );

            // Create image from the padded data
            let paddedImage = new RawImage(
                ctx.getImageData(0, 0, newWidth, newHeight).data,
                newWidth, newHeight, 4);

            // Convert back so that image has the same number of channels as before
            return paddedImage.convert(numChannels);

        } else {
            let img = this.toSharp().extend({ left, right, top, bottom });
            return await loadImageFunction(img);
        }
    }

    async center_crop(crop_width, crop_height) {
        // If the image is already the desired size, return it
        if (this.width === crop_width && this.height === crop_height) {
            return this;
        }

        // Determine bounds of the image in the new canvas
        let width_offset = (this.width - crop_width) / 2;
        let height_offset = (this.height - crop_height) / 2;


        if (BROWSER_ENV) {
            // Store number of channels before resizing
            let numChannels = this.channels;

            // Create canvas object for this image
            let canvas = this.toCanvas();

            // Create a new canvas of the desired size. This is needed since if the 
            // image is too small, we need to pad it with black pixels.
            const ctx = createCanvasFunction(crop_width, crop_height).getContext('2d');

            let sourceX = 0;
            let sourceY = 0;
            let destX = 0;
            let destY = 0;

            if (width_offset >= 0) {
                sourceX = width_offset;
            } else {
                destX = -width_offset;
            }

            if (height_offset >= 0) {
                sourceY = height_offset;
            } else {
                destY = -height_offset;
            }

            // Draw image to context, cropping in the process
            ctx.drawImage(canvas,
                sourceX, sourceY, crop_width, crop_height,
                destX, destY, crop_width, crop_height
            );

            // Create image from the resized data
            let resizedImage = new RawImage(ctx.getImageData(0, 0, crop_width, crop_height).data, crop_width, crop_height, 4);

            // Convert back so that image has the same number of channels as before
            return resizedImage.convert(numChannels);

        } else {
            // Create sharp image from raw data
            let img = this.toSharp();

            if (width_offset >= 0 && height_offset >= 0) {
                // Cropped image lies entirely within the original image
                img = img.extract({
                    left: Math.floor(width_offset),
                    top: Math.floor(height_offset),
                    width: crop_width,
                    height: crop_height,
                })
            } else if (width_offset <= 0 && height_offset <= 0) {
                // Cropped image lies entirely outside the original image,
                // so we add padding
                let top = Math.floor(-height_offset);
                let left = Math.floor(-width_offset);
                img = img.extend({
                    top: top,
                    left: left,

                    // Ensures the resulting image has the desired dimensions
                    right: crop_width - this.width - left,
                    bottom: crop_height - this.height - top,
                });
            } else {
                // Cropped image lies partially outside the original image.
                // We first pad, then crop.

                let y_padding = [0, 0];
                let y_extract = 0;
                if (height_offset < 0) {
                    y_padding[0] = Math.floor(-height_offset);
                    y_padding[1] = crop_height - this.height - y_padding[0];
                } else {
                    y_extract = Math.floor(height_offset);
                }

                let x_padding = [0, 0];
                let x_extract = 0;
                if (width_offset < 0) {
                    x_padding[0] = Math.floor(-width_offset);
                    x_padding[1] = crop_width - this.width - x_padding[0];
                } else {
                    x_extract = Math.floor(width_offset);
                }

                img = img.extend({
                    top: y_padding[0],
                    bottom: y_padding[1],
                    left: x_padding[0],
                    right: x_padding[1],
                }).extract({
                    left: x_extract,
                    top: y_extract,
                    width: crop_width,
                    height: crop_height,
                })
            }

            return await loadImageFunction(img);
        }
    }

    toCanvas() {
        if (!BROWSER_ENV) {
            throw new Error('toCanvas() is only supported in browser environments.')
        }

        // Clone, and convert data to RGBA before drawing to canvas.
        // This is because the canvas API only supports RGBA
        let cloned = this.clone().rgba();

        // Create canvas object for the cloned image
        let clonedCanvas = createCanvasFunction(cloned.width, cloned.height);

        // Draw image to context
        let data = new ImageDataClass(cloned.data, cloned.width, cloned.height);
        clonedCanvas.getContext('2d').putImageData(data, 0, 0);

        return clonedCanvas;
    }

    /**
     * Helper method to update the image data.
     * @param {Uint8ClampedArray} data The new image data.
     * @param {number} width The new width of the image.
     * @param {number} height The new height of the image.
     * @param {1|2|3|4} channels The new number of channels of the image.
     */
    _update(data, width, height, channels = null) {
        this.data = data;
        this.width = width;
        this.height = height;
        if (channels !== null) {
            this.channels = channels;
        }
        return this;
    }

    /**
     * Clone the image
     * @returns {RawImage} The cloned image
     */
    clone() {
        return new RawImage(this.data.slice(), this.width, this.height, this.channels);
    }

    /**
     * Helper method for converting image to have a certain number of channels
     * @param {number} numChannels The number of channels. Must be 1, 3, or 4.
     * @returns {RawImage} `this` to support chaining.
     */
    convert(numChannels) {
        if (this.channels === numChannels) return this; // Already correct number of channels

        switch (numChannels) {
            case 1:
                this.grayscale();
                break;
            case 3:
                this.rgb();
                break;
            case 4:
                this.rgba();
                break;
            default:
                throw new Error(`Conversion failed due to unsupported number of channels: ${this.channels}`);
        }
        return this;
    }

    /**
     * Save the image to the given path.
     * @param {string} path The path to save the image to.
     */
    save(path) {

        if (BROWSER_ENV) {
            const extension = path.split('.').pop().toLowerCase();
            const mime = this._CONTENT_TYPE_MAP[extension] ?? 'image/png';

            // Convert image to canvas
            const canvas = this.toCanvas();

            // Convert the canvas content to a data URL
            const dataURL = canvas.toDataURL(mime);

            // Create an anchor element with the data URL as the href attribute
            const downloadLink = document.createElement('a');
            downloadLink.href = dataURL;

            // Set the download attribute to specify the desired filename for the downloaded image
            downloadLink.download = path;

            // Trigger the download
            downloadLink.click();

            // Clean up: remove the anchor element from the DOM
            downloadLink.remove();

        } else if (!env.useFS) {
            throw new Error('Unable to save the image because filesystem is disabled in this environment.')

        } else {
            const img = this.toSharp();
            img.toFile(path);
        }
    }

    toSharp() {
        if (BROWSER_ENV) {
            throw new Error('toSharp() is only supported in server-side environments.')
        }

        return sharp_ignored_(this.data, {
            raw: {
                width: this.width,
                height: this.height,
                channels: this.channels
            }
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/@xenova/transformers/src/utils/audio.js
/**
 * @file Helper module for audio processing. 
 * 
 * These functions and classes are only used internally, 
 * meaning an end-user shouldn't need to access anything here.
 * 
 * @module utils/audio
 */




/**
 * Helper function to read audio from a path/URL.
 * @param {string|URL} url The path/URL to load the audio from.
 * @param {number} sampling_rate The sampling rate to use when decoding the audio.
 * @returns {Promise<Float32Array>} The decoded audio as a `Float32Array`.
 */
async function read_audio(url, sampling_rate) {
    if (typeof AudioContext === 'undefined') {
        // Running in node or an environment without AudioContext
        throw Error(
            "Unable to load audio from path/URL since `AudioContext` is not available in your environment. " +
            "Instead, audio data should be passed directly to the pipeline/processor. " +
            "For more information and some example code, see https://huggingface.co/docs/transformers.js/guides/node-audio-processing."
        )
    }

    const response = await (await getFile(url)).arrayBuffer();
    const audioCTX = new AudioContext({ sampleRate: sampling_rate });
    if (typeof sampling_rate === 'undefined') {
        console.warn(`No sampling rate provided, using default of ${audioCTX.sampleRate}Hz.`)
    }
    const decoded = await audioCTX.decodeAudioData(response);

    /** @type {Float32Array} */
    let audio;

    // We now replicate HuggingFace's `ffmpeg_read` method:
    if (decoded.numberOfChannels === 2) {
        // When downmixing a stereo audio file to mono using the -ac 1 option in FFmpeg,
        // the audio signal is summed across both channels to create a single mono channel.
        // However, if the audio is at full scale (i.e. the highest possible volume level),
        // the summing of the two channels can cause the audio signal to clip or distort.

        // To prevent this clipping, FFmpeg applies a scaling factor of 1/sqrt(2) (~ 0.707)
        // to the audio signal before summing the two channels. This scaling factor ensures
        // that the combined audio signal will not exceed the maximum possible level, even
        // if both channels are at full scale.

        // After applying this scaling factor, the audio signal from both channels is summed
        // to create a single mono channel. It's worth noting that this scaling factor is
        // only applied when downmixing stereo audio to mono using the -ac 1 option in FFmpeg.
        // If you're using a different downmixing method, or if you're not downmixing the
        // audio at all, this scaling factor may not be needed.
        const SCALING_FACTOR = Math.sqrt(2);

        let left = decoded.getChannelData(0);
        let right = decoded.getChannelData(1);

        audio = new Float32Array(left.length);
        for (let i = 0; i < decoded.length; ++i) {
            audio[i] = SCALING_FACTOR * (left[i] + right[i]) / 2;
        }

    } else {
        // If the audio is not stereo, we can just use the first channel:
        audio = decoded.getChannelData(0);
    }

    return audio;
}

/**
 * Creates a frequency bin conversion matrix used to obtain a mel spectrogram.
 * @param {number} sr Sample rate of the audio waveform.
 * @param {number} n_fft Number of frequencies used to compute the spectrogram (should be the same as in `stft`).
 * @param {number} n_mels Number of mel filters to generate.
 * @returns {number[][]} Projection matrix to go from a spectrogram to a mel spectrogram.
 */
function getMelFilters(sr, n_fft, n_mels = 128) {
    n_mels = Math.floor(n_mels);

    // Initialize the weights
    const mel_size = Math.floor(1 + n_fft / 2);
    const weights = new Array(n_mels);

    // Center freqs of each FFT bin
    const fftfreqs = rfftfreq(n_fft, 1 / sr);

    // 'Center freqs' of mel bands - uniformly spaced between limits
    const min_mel = 0.0;
    const max_mel = 45.245640471924965;
    const mel_range = max_mel - min_mel;
    const mel_scale = mel_range / (n_mels + 1);

    // Fill in the linear scale
    const f_min = 0.0;
    const f_sp = 200.0 / 3;
    const freqs = new Array(n_mels + 2);

    // And now the nonlinear scale
    const min_log_hz = 1000.0; // beginning of log region (Hz)
    const min_log_mel = (min_log_hz - f_min) / f_sp; // same (Mels)
    const logstep = Math.log(6.4) / 27.0; // step size for log region

    const ramps = new Array(freqs.length);
    for (let i = 0; i < freqs.length; ++i) {
        const mel = i * mel_scale + min_mel;
        if (mel >= min_log_mel) {
            freqs[i] = min_log_hz * Math.exp(logstep * (mel - min_log_mel));
        } else {
            freqs[i] = f_min + f_sp * mel;
        }
        ramps[i] = fftfreqs.map(k => freqs[i] - k);
    }

    const fdiffinv = freqs.slice(1).map((v, i) => 1 / (v - freqs[i]));

    for (let i = 0; i < weights.length; ++i) {
        weights[i] = new Array(mel_size);

        const a = fdiffinv[i];
        const b = fdiffinv[i + 1];
        const c = ramps[i];
        const d = ramps[i + 2];

        // Slaney-style mel is scaled to be approx constant energy per channel
        const enorm = 2.0 / (freqs[i + 2] - freqs[i]);

        for (let j = 0; j < weights[i].length; ++j) {
            // lower and upper slopes for all bins
            const lower = -c[j] * a;
            const upper = d[j] * b;
            weights[i][j] = Math.max(0, Math.min(lower, upper)) * enorm;
        }
    }

    return weights;
}

;// CONCATENATED MODULE: ./node_modules/@xenova/transformers/src/processors.js

/**
 * @file Processors are used to prepare non-textual inputs (e.g., image or audio) for a model.
 * 
 * **Example:** Using a `WhisperProcessor` to prepare an audio input for a model.
 * ```javascript
 * import { AutoProcessor, read_audio } from '@xenova/transformers';
 *
 * let processor = await AutoProcessor.from_pretrained('openai/whisper-tiny.en');
 * let audio = await read_audio('https://huggingface.co/datasets/Narsil/asr_dummy/resolve/main/mlk.flac', 16000);
 * let { input_features } = await processor(audio);
 * // Tensor {
 * //   data: Float32Array(240000) [0.4752984642982483, 0.5597258806228638, 0.56434166431427, ...],
 * //   dims: [1, 80, 3000],
 * //   type: 'float32',
 * //   size: 240000,
 * // }
 * ```
 * 
 * @module processors
 */













// Helper functions

/**
 * Converts bounding boxes from center format to corners format.
 * 
 * @param {number[]} arr The coordinate for the center of the box and its width, height dimensions (center_x, center_y, width, height)
 * @returns {number[]} The coodinates for the top-left and bottom-right corners of the box (top_left_x, top_left_y, bottom_right_x, bottom_right_y)
 */
function center_to_corners_format([centerX, centerY, width, height]) {
    return [
        centerX - width / 2,
        centerY - height / 2,
        centerX + width / 2,
        centerY + height / 2
    ];
}

/**
 * Post-processes the outputs of the model (for object detection).
 * @param {Object} outputs The outputs of the model that must be post-processed
 * @param {Tensor} outputs.logits The logits
 * @param {Tensor} outputs.pred_boxes The predicted boxes.
 * @return {Object[]} An array of objects containing the post-processed outputs.
 */
function post_process_object_detection(outputs, threshold = 0.5, target_sizes = null) {
    const out_logits = outputs.logits;
    const out_bbox = outputs.pred_boxes;
    const [batch_size, num_boxes, num_classes] = out_logits.dims;

    if (target_sizes !== null && target_sizes.length !== batch_size) {
        throw Error("Make sure that you pass in as many target sizes as the batch dimension of the logits")
    }
    let toReturn = [];
    for (let i = 0; i < batch_size; ++i) {
        let target_size = target_sizes !== null ? target_sizes[i] : null;
        let info = {
            boxes: [],
            classes: [],
            scores: []
        }
        let logits = out_logits[i];
        let bbox = out_bbox[i];

        for (let j = 0; j < num_boxes; ++j) {
            let logit = logits[j];

            // Get most probable class
            let maxIndex = max(logit.data)[1];

            if (maxIndex === num_classes - 1) {
                // This is the background class, skip it
                continue;
            }

            // Compute softmax over classes
            let probs = softmax(logit.data);

            let score = probs[maxIndex];
            if (score > threshold) {
                // Some class has a high enough probability
                /** @type {number[]} */
                let box = bbox[j].data;

                // convert to [x0, y0, x1, y1] format
                box = center_to_corners_format(box)
                if (target_size !== null) {
                    box = box.map((x, i) => x * target_size[(i + 1) % 2])
                }

                info.boxes.push(box);
                info.classes.push(maxIndex);
                info.scores.push(score);
            }
        }
        toReturn.push(info);
    }
    return toReturn;
}

/**
 * Base class for feature extractors.
 *
 * @extends Callable
 */
class FeatureExtractor extends Callable {
    /**
     * Constructs a new FeatureExtractor instance.
     *
     * @param {Object} config The configuration for the feature extractor.
     */
    constructor(config) {
        super();
        this.config = config
    }
}

/**
 * Feature extractor for image models.
 *
 * @extends FeatureExtractor
 */
class ImageFeatureExtractor extends FeatureExtractor {

    /**
     * Constructs a new ImageFeatureExtractor instance.
     *
     * @param {Object} config The configuration for the feature extractor.
     * @param {number[]} config.image_mean The mean values for image normalization.
     * @param {number[]} config.image_std The standard deviation values for image normalization.
     * @param {boolean} config.do_rescale Whether to rescale the image pixel values to the [0,1] range.
     * @param {number} config.rescale_factor The factor to use for rescaling the image pixel values.
     * @param {boolean} config.do_normalize Whether to normalize the image pixel values.
     * @param {boolean} config.do_resize Whether to resize the image.
     * @param {number} config.resample What method to use for resampling.
     * @param {number} config.size The size to resize the image to.
     */
    constructor(config) {
        super(config);

        this.image_mean = this.config.image_mean;
        this.image_std = this.config.image_std;

        this.resample = this.config.resample ?? 2; // 2 => bilinear
        this.do_rescale = this.config.do_rescale ?? true;
        this.rescale_factor = this.config.rescale_factor ?? (1 / 255);
        this.do_normalize = this.config.do_normalize;

        this.do_resize = this.config.do_resize;
        this.size = this.config.size;

        this.do_center_crop = this.config.do_center_crop;
        this.crop_size = this.config.crop_size;
        this.do_convert_rgb = this.config.do_convert_rgb ?? true;

        this.pad_size = this.config.pad_size;
        this.do_pad = (this.config.do_pad ?? false) && this.pad_size;
    }

    /**
     * Preprocesses the given image.
     *
     * @param {RawImage} image The image to preprocess.
     * @returns {Promise<any>} The preprocessed image as a Tensor.
     */
    async preprocess(image) {

        // First, convert image to RGB if specified in config.
        if (this.do_convert_rgb) {
            image = image.rgb();
        }

        const srcWidth = image.width;   // original width
        const srcHeight = image.height; // original height

        // Next, resize all images
        if (this.do_resize) {
            // TODO:
            // For efficiency reasons, it might be best to merge the resize and center crop operations into one.

            // `this.size` comes in many forms, so we need to handle them all here:
            // 1. `this.size` is an integer, in which case we resize the image to be a square 

            let shortest_edge;
            let longest_edge;

            // Support both formats for backwards compatibility
            if (Number.isInteger(this.size)) {
                shortest_edge = this.size;
                longest_edge = this.config.max_size ?? shortest_edge;

            } else {
                // Extract known properties from `this.size`
                shortest_edge = this.size.shortest_edge;
                longest_edge = this.size.longest_edge;
            }

            // If `longest_edge` and `shortest_edge` are set, maintain aspect ratio and resize to `shortest_edge`
            // while keeping the largest dimension <= `longest_edge`
            if (shortest_edge !== undefined || longest_edge !== undefined) {
                // http://opensourcehacker.com/2011/12/01/calculate-aspect-ratio-conserving-resize-for-images-in-javascript/
                // Try resize so that shortest edge is `this.shortest_edge` (target)
                const shortResizeFactor = shortest_edge === undefined
                    ? 1 // If `shortest_edge` is not set, don't upscale
                    : Math.max(shortest_edge / srcWidth, shortest_edge / srcHeight);

                const newWidth = srcWidth * shortResizeFactor;
                const newHeight = srcHeight * shortResizeFactor;

                // The new width and height might be greater than `this.longest_edge`, so
                // we downscale again to ensure the largest dimension is `this.longest_edge` 
                const longResizeFactor = longest_edge === undefined
                    ? 1 // If `longest_edge` is not set, don't downscale
                    : Math.min(longest_edge / newWidth, longest_edge / newHeight);

                // To avoid certain floating point precision issues, we round to 3 decimal places
                const finalWidth = Math.floor(Number((newWidth * longResizeFactor).toPrecision(3)));
                const finalHeight = Math.floor(Number((newHeight * longResizeFactor).toPrecision(3)));

                // Perform resize
                image = await image.resize(finalWidth, finalHeight, {
                    resample: this.resample,
                });

            } else if (this.size.width !== undefined && this.size.height !== undefined) {
                // If `width` and `height` are set, resize to those dimensions
                image = await image.resize(this.size.width, this.size.height, {
                    resample: this.resample,
                });
            } else {
                throw new Error(`Could not resize image due to unsupported \`this.size\` option in config: ${JSON.stringify(this.size)}`);
            }
        }

        if (this.do_center_crop) {

            let crop_width;
            let crop_height;
            if (Number.isInteger(this.crop_size)) {
                crop_width = this.crop_size;
                crop_height = this.crop_size;
            } else {
                crop_width = this.crop_size.width;
                crop_height = this.crop_size.height;
            }

            image = await image.center_crop(crop_width, crop_height);
        }

        let reshaped_input_size = [image.height, image.width];

        // TODO is it okay to pad before rescaling/normalizing?
        if (this.do_pad) {
            let left = 0;
            let right = this.pad_size.width - image.width;
            let top = 0;
            let bottom = this.pad_size.height - image.height;

            image = await image.pad([left, right, top, bottom]);
        }

        const pixelData = Float32Array.from(image.data);

        if (this.do_rescale) {
            for (let i = 0; i < pixelData.length; ++i) {
                pixelData[i] = this.rescale_factor * pixelData[i];
            }
        }

        if (this.do_normalize) {
            let image_mean = this.image_mean;
            if (!Array.isArray(this.image_mean)) {
                image_mean = new Array(image.channels).fill(image_mean);
            }

            let image_std = this.image_std;
            if (!Array.isArray(this.image_std)) {
                image_std = new Array(image.channels).fill(image_mean);
            }

            if (image_mean.length !== image.channels || image_std.length !== image.channels) {
                throw new Error(`When set to arrays, the length of \`image_mean\` (${image_mean.length}) and \`image_std\` (${image_std.length}) must match the number of channels in the image (${image.channels}).`);
            }

            for (let i = 0; i < pixelData.length; i += image.channels) {
                for (let j = 0; j < image.channels; ++j) {
                    pixelData[i + j] = (pixelData[i + j] - this.image_mean[j]) / this.image_std[j];
                }
            }
        }

        // convert to channel dimension format:
        let imgDims = [image.height, image.width, image.channels];
        let img = new Tensor('float32', pixelData, imgDims);
        let transposed = transpose(img, [2, 0, 1]); // hwc -> chw

        return {
            original_size: [srcHeight, srcWidth],
            reshaped_input_size: reshaped_input_size,
            pixel_values: transposed,
        }
    }

    /**
     * Calls the feature extraction process on an array of image
     * URLs, preprocesses each image, and concatenates the resulting
     * features into a single Tensor.
     * @param {any} images The URL(s) of the image(s) to extract features from.
     * @returns {Promise<Object>} An object containing the concatenated pixel values (and other metadata) of the preprocessed images.
     */
    async _call(images) {
        if (!Array.isArray(images)) {
            images = [images];
        }

        let imageData = await Promise.all(images.map(x => this.preprocess(x)));

        // TODO:

        // Concatenate pixel values
        // TEMP: Add batch dimension so that concat works
        imageData.forEach(x => x.pixel_values.dims = [1, ...x.pixel_values.dims]);
        let pixel_values = cat(imageData.map(x => x.pixel_values));

        return {
            pixel_values: pixel_values,

            // Original sizes of images
            original_sizes: imageData.map(x => x.original_size),

            // Reshaped sizes of images, before padding or cropping
            reshaped_input_sizes: imageData.map(x => x.reshaped_input_size),
        }
    }

}

class ConvNextFeatureExtractor extends ImageFeatureExtractor { }
class ViTFeatureExtractor extends ImageFeatureExtractor { }
class MobileViTFeatureExtractor extends ImageFeatureExtractor { }
class DeiTFeatureExtractor extends ImageFeatureExtractor { }
class BeitFeatureExtractor extends ImageFeatureExtractor { }

/**
 * Detr Feature Extractor.
 *
 * @extends ImageFeatureExtractor
 */
class DetrFeatureExtractor extends ImageFeatureExtractor {
    /**
     * Calls the feature extraction process on an array of image URLs, preprocesses
     * each image, and concatenates the resulting features into a single Tensor.
     * @param {any} urls The URL(s) of the image(s) to extract features from.
     * @returns {Promise<Object>} An object containing the concatenated pixel values of the preprocessed images.
     */
    async _call(urls) {
        let result = await super._call(urls);

        // TODO support differently-sized images, for now assume all images are the same size.
        // TODO support different mask sizes (not just 64x64)
        // Currently, just fill pixel mask with 1s
        let maskSize = [result.pixel_values.dims[0], 64, 64];
        result.pixel_mask = new Tensor(
            'int64',
            // TODO: fix error below
            new BigInt64Array(maskSize.reduce((a, b) => a * b)).fill(1n),
            maskSize
        );

        return result;
    }

    /**
     * Post-processes the outputs of the model (for object detection).
     * @param {Object} outputs The outputs of the model that must be post-processed
     * @param {Tensor} outputs.logits The logits
     * @param {Tensor} outputs.pred_boxes The predicted boxes.
     * @return {Object[]} An array of objects containing the post-processed outputs.
     */

    /** @type {post_process_object_detection} */
    post_process_object_detection(...args) {
        return post_process_object_detection(...args);
    }

    /**
     * Binarize the given masks using `object_mask_threshold`, it returns the associated values of `masks`, `scores` and `labels`.
     * @param {Tensor} class_logits The class logits.
     * @param {Tensor} mask_logits The mask logits.
     * @param {number} object_mask_threshold A number between 0 and 1 used to binarize the masks.
     * @param {number} num_labels The number of labels.
     * @returns {[Tensor[], number[], number[]]} The binarized masks, the scores, and the labels.
     */
    remove_low_and_no_objects(class_logits, mask_logits, object_mask_threshold, num_labels) {

        let mask_probs_item = [];
        let pred_scores_item = [];
        let pred_labels_item = [];

        for (let j = 0; j < class_logits.dims[0]; ++j) {
            let cls = class_logits[j];
            let mask = mask_logits[j];

            let pred_label = max(cls.data)[1];
            if (pred_label === num_labels) {
                // Is the background, so we ignore it
                continue;
            }

            let scores = softmax(cls.data);
            let pred_score = scores[pred_label];
            if (pred_score > object_mask_threshold) {
                mask_probs_item.push(mask);
                pred_scores_item.push(pred_score);
                pred_labels_item.push(pred_label);
            }
        }

        return [mask_probs_item, pred_scores_item, pred_labels_item];

    }

    /**
     * Checks whether the segment is valid or not.
     * @param {Int32Array} mask_labels Labels for each pixel in the mask.
     * @param {Tensor[]} mask_probs Probabilities for each pixel in the masks.
     * @param {number} k The class id of the segment.
     * @param {number} mask_threshold The mask threshold.
     * @param {number} overlap_mask_area_threshold The overlap mask area threshold.
     * @returns {[boolean, number[]]} Whether the segment is valid or not, and the indices of the valid labels.
     */
    check_segment_validity(
        mask_labels,
        mask_probs,
        k,
        mask_threshold = 0.5,
        overlap_mask_area_threshold = 0.8
    ) {
        // mask_k is a 1D array of indices, indicating where the mask is equal to k
        let mask_k = [];
        let mask_k_area = 0;
        let original_area = 0;

        // Compute the area of all the stuff in query k
        for (let i = 0; i < mask_labels.length; ++i) {
            if (mask_labels[i] === k) {
                mask_k.push(i);
                ++mask_k_area;
            }

            if (mask_probs[k].data[i] >= mask_threshold) {
                ++original_area;
            }
        }
        let mask_exists = mask_k_area > 0 && original_area > 0;

        // Eliminate disconnected tiny segments
        if (mask_exists) {
            // Perform additional check
            let area_ratio = mask_k_area / original_area;
            mask_exists = area_ratio > overlap_mask_area_threshold;
        }

        return [mask_exists, mask_k]
    }

    /**
     * Computes the segments.
     * @param {Tensor[]} mask_probs The mask probabilities.
     * @param {number[]} pred_scores The predicted scores.
     * @param {number[]} pred_labels The predicted labels.
     * @param {number} mask_threshold The mask threshold.
     * @param {number} overlap_mask_area_threshold The overlap mask area threshold.
     * @param {Set<number>} label_ids_to_fuse The label ids to fuse.
     * @param {number[]} target_size The target size of the image.
     * @returns {[Tensor, Array<{id: number, label_id: number, score: number}>]} The computed segments.
     */
    compute_segments(
        mask_probs,
        pred_scores,
        pred_labels,
        mask_threshold,
        overlap_mask_area_threshold,
        label_ids_to_fuse = null,
        target_size = null,
    ) {
        let [height, width] = target_size ?? mask_probs[0].dims;

        let segmentation = new Tensor(
            'int32',
            new Int32Array(height * width),
            [height, width]
        );
        let segments = [];

        // 1. If target_size is not null, we need to resize the masks to the target size
        if (target_size !== null) {
            // resize the masks to the target size
            for (let i = 0; i < mask_probs.length; ++i) {
                mask_probs[i] = interpolate(mask_probs[i], target_size, 'bilinear', false);
            }
        }

        // 2. Weigh each mask by its prediction score
        // NOTE: `mask_probs` is updated in-place
        // 
        // Temporary storage for the best label/scores for each pixel ([height, width]):
        let mask_labels = new Int32Array(mask_probs[0].data.length);
        let bestScores = new Float32Array(mask_probs[0].data.length);

        for (let i = 0; i < mask_probs.length; ++i) {
            let score = pred_scores[i];

            for (let j = 0; j < mask_probs[i].data.length; ++j) {
                mask_probs[i].data[j] *= score
                if (mask_probs[i].data[j] > bestScores[j]) {
                    mask_labels[j] = i;
                    bestScores[j] = mask_probs[i].data[j];
                }
            }
        }

        let current_segment_id = 0;

        // let stuff_memory_list = {}
        for (let k = 0; k < pred_labels.length; ++k) {
            let pred_class = pred_labels[k];

            // TODO add `should_fuse`
            // let should_fuse = pred_class in label_ids_to_fuse

            // Check if mask exists and large enough to be a segment
            let [mask_exists, mask_k] = this.check_segment_validity(
                mask_labels,
                mask_probs,
                k,
                mask_threshold,
                overlap_mask_area_threshold
            )

            if (!mask_exists) {
                // Nothing to see here
                continue;
            }

            // TODO
            // if (pred_class in stuff_memory_list) {
            //     current_segment_id = stuff_memory_list[pred_class]
            // } else {
            //     current_segment_id += 1;
            // }
            ++current_segment_id;


            // Add current object segment to final segmentation map
            for (let index of mask_k) {
                segmentation.data[index] = current_segment_id;
            }

            segments.push({
                id: current_segment_id,
                label_id: pred_class,
                // was_fused: should_fuse, TODO
                score: pred_scores[k],
            })

            // TODO
            // if(should_fuse){
            //     stuff_memory_list[pred_class] = current_segment_id
            // }
        }

        return [segmentation, segments];
    }

    /**
     * Post-process the model output to generate the final panoptic segmentation.
     * @param {*} outputs The model output to post process
     * @param {number} [threshold=0.5] The probability score threshold to keep predicted instance masks.
     * @param {number} [mask_threshold=0.5] Threshold to use when turning the predicted masks into binary values.
     * @param {number} [overlap_mask_area_threshold=0.8] The overlap mask area threshold to merge or discard small disconnected parts within each binary instance mask.
     * @param {Set<number>} [label_ids_to_fuse=null] The labels in this state will have all their instances be fused together.
     * @param {number[][]} [target_sizes=null] The target sizes to resize the masks to.
     * @returns {Array<{ segmentation: Tensor, segments_info: Array<{id: number, label_id: number, score: number}>}>}
     */
    post_process_panoptic_segmentation(
        outputs,
        threshold = 0.5,
        mask_threshold = 0.5,
        overlap_mask_area_threshold = 0.8,
        label_ids_to_fuse = null,
        target_sizes = null,
    ) {
        if (label_ids_to_fuse === null) {
            console.warn("`label_ids_to_fuse` unset. No instance will be fused.")
            label_ids_to_fuse = new Set();
        }

        const class_queries_logits = outputs.logits; // [batch_size, num_queries, num_classes+1]
        const masks_queries_logits = outputs.pred_masks; // [batch_size, num_queries, height, width]

        const mask_probs = masks_queries_logits.sigmoid()  // [batch_size, num_queries, height, width]

        let [batch_size, num_queries, num_labels] = class_queries_logits.dims;
        num_labels -= 1; // Remove last class (background)

        if (target_sizes !== null && target_sizes.length !== batch_size) {
            throw Error("Make sure that you pass in as many target sizes as the batch dimension of the logits")
        }

        let toReturn = [];
        for (let i = 0; i < batch_size; ++i) {
            let target_size = target_sizes !== null ? target_sizes[i] : null;

            let class_logits = class_queries_logits[i];
            let mask_logits = mask_probs[i];

            let [mask_probs_item, pred_scores_item, pred_labels_item] = this.remove_low_and_no_objects(class_logits, mask_logits, threshold, num_labels);

            if (pred_labels_item.length === 0) {
                // No mask found
                let [height, width] = target_size ?? mask_logits.dims.slice(-2);

                let segmentation = new Tensor(
                    'int32',
                    new Int32Array(height * width).fill(-1),
                    [height, width]
                )
                toReturn.push({
                    segmentation: segmentation,
                    segments_info: []
                });
                continue;
            }


            // Get segmentation map and segment information of batch item
            let [segmentation, segments] = this.compute_segments(
                mask_probs_item,
                pred_scores_item,
                pred_labels_item,
                mask_threshold,
                overlap_mask_area_threshold,
                label_ids_to_fuse,
                target_size,
            )

            toReturn.push({
                segmentation: segmentation,
                segments_info: segments
            })
        }

        return toReturn;
    }

    post_process_instance_segmentation() {
        // TODO
        throw Error("Not implemented yet");
    }
}

class YolosFeatureExtractor extends ImageFeatureExtractor {
    /** @type {post_process_object_detection} */
    post_process_object_detection(...args) {
        return post_process_object_detection(...args);
    }
}

class SamImageProcessor extends ImageFeatureExtractor {
    async _call(images, input_points) {
        let {
            pixel_values,
            original_sizes,
            reshaped_input_sizes,
        } = await super._call(images);

        let shape = calculateDimensions(input_points);

        if (shape.length === 3) {
            // Correct user's input
            shape = [1, ...shape];
            input_points = [input_points];
        } else if (shape.length !== 4) {
            throw Error("The input_points must be a 4D tensor of shape `batch_size`, `point_batch_size`, `nb_points_per_image`, `2`.")
        }

        // Reshape input points
        for (let i = 0; i < input_points.length; ++i) { // batch_size
            let originalImageSize = original_sizes[i];
            let reshapedImageSize = reshaped_input_sizes[i];

            let resizeFactors = [
                reshapedImageSize[0] / originalImageSize[0],
                reshapedImageSize[1] / originalImageSize[1]
            ]

            for (let j = 0; j < input_points[i].length; ++j) { // point_batch_size
                for (let k = 0; k < input_points[i][j].length; ++k) { // nb_points_per_image
                    for (let w = 0; w < input_points[i][j][k].length; ++w) { // 2
                        input_points[i][j][k][w] *= resizeFactors[w];
                    }
                }
            }
        }

        let input_points_tensor = new Tensor(
            'int64',
            BigInt64Array.from(input_points.flat(Infinity)
                .map(x => BigInt(Math.round(x)))),
            shape
        )

        // TODO: allowed to be floats?
        // let input_points_tensor = new Tensor(
        //     'float32',
        //     Float32Array.from(input_points.flat(Infinity)),
        //     shape
        // )

        return {
            pixel_values,
            original_sizes: original_sizes,
            reshaped_input_sizes: reshaped_input_sizes,
            input_points: input_points_tensor
        }
    }

    /**
     * Remove padding and upscale masks to the original image size.
     * @param {Tensor} masks Batched masks from the mask_decoder in (batch_size, num_channels, height, width) format.
     * @param {number[][]} original_sizes The original sizes of each image before it was resized to the model's expected input shape, in (height, width) format.
     * @param {number[][]} reshaped_input_sizes The size of each image as it is fed to the model, in (height, width) format. Used to remove padding.
     * @param {Object} options Optional parameters for post-processing.
     * @param {number} [options.mask_threshold] The threshold to use for binarizing the masks.
     * @param {boolean} [options.binarize] Whether to binarize the masks.
     * @param {Object} [options.pad_size] The target size the images were padded to before being passed to the model. If `null`, the target size is assumed to be the processor's `pad_size`.
     * @param {number} [options.pad_size.height] The height the images were padded to.
     * @param {number} [options.pad_size.width] The width the images were padded to.
     * @returns {Tensor[]} Batched masks in batch_size, num_channels, height, width) format, where (height, width) is given by original_size.
     */
    post_process_masks(masks, original_sizes, reshaped_input_sizes, {
        mask_threshold = 0.0,
        binarize = true,
        pad_size = null,
    } = {}) {
        // masks: [1, 1, 3, 256, 256]

        let output_masks = [];

        pad_size = pad_size ?? this.pad_size;

        let target_image_size = [pad_size.height, pad_size.width];

        for (let i = 0; i < original_sizes.length; ++i) {
            let original_size = original_sizes[i];
            let reshaped_input_size = reshaped_input_sizes[i];

            let mask = masks[i]; // [b, c, h, w]

            // TODO: improve
            let interpolated_masks = [];
            for (let j = 0; j < mask.dims[0]; ++j) {
                let m = mask[j]; // 3d tensor

                // Upscale mask to padded size
                let interpolated_mask = interpolate(m, target_image_size, 'bilinear', false);

                // Crop mask
                interpolated_mask = interpolated_mask.slice(null, [0, reshaped_input_size[0]], [0, reshaped_input_size[1]]);

                // Downscale mask
                interpolated_mask = interpolate(mask, original_size, 'bilinear', false);

                if (binarize) {
                    interpolated_mask = new Tensor(
                        'bool',
                        Array.from(interpolated_mask.data).map(x => x > mask_threshold),
                        interpolated_mask.dims
                    )
                }

                // add back batch dim for concat
                interpolated_mask.dims = [1, ...interpolated_mask.dims];

                interpolated_masks.push(interpolated_mask);
            }

            let concatenated = cat(interpolated_masks);
            output_masks.push(concatenated);
        }

        return output_masks;

    }
}


class WhisperFeatureExtractor extends FeatureExtractor {

    constructor(config) {
        super(config);

        // Prefer given `mel_filters` from preprocessor_config.json, or calculate them if they don't exist.
        this.config.mel_filters ??= getMelFilters(this.config.sampling_rate, this.config.n_fft, this.config.feature_size);
    }
    /**
     * Calculates the index offset for a given index and window size.
     * @param {number} i The index.
     * @param {number} w The window size.
     * @returns {number} The index offset.
     */
    calcOffset(i, w) {
        return Math.abs((i + w) % (2 * w) - w);
    }

    /**
     * Pads an array with a reflected version of itself on both ends.
     * @param {Float32Array} array The array to pad.
     * @param {number} left The amount of padding to add to the left.
     * @param {number} right The amount of padding to add to the right.
     * @returns {Float32Array} The padded array.
     */
    padReflect(array, left, right) {
        const padded = new Float32Array(array.length + left + right);
        const w = array.length - 1;

        for (let i = 0; i < array.length; ++i) {
            padded[left + i] = array[i];
        }

        for (let i = 1; i <= left; ++i) {
            padded[left - i] = array[this.calcOffset(i, w)];
        }

        for (let i = 1; i <= right; ++i) {
            padded[w + left + i] = array[this.calcOffset(w - i, w)];
        }

        return padded;
    }

    /**
     * Calculates the complex Short-Time Fourier Transform (STFT) of the given framed signal.
     * 
     * @param {number[][]} frames A 2D array representing the signal frames.
     * @param {number[]} window A 1D array representing the window to be applied to the frames.
     * @returns {Object} An object with the following properties:
     * - data: A 1D array representing the complex STFT of the signal.
     * - dims: An array representing the dimensions of the STFT data, i.e. [num_frames, num_fft_bins].
     */
    stft(frames, window) {
        // Calculates the complex Short-Time Fourier Transform (STFT) of the given framed signal.
        // 
        // NOTE: Since the window width is not a power of 2, we must 
        // perform Fast Fourier Transform with chirp-z transform:
        // https://math.stackexchange.com/questions/77118/non-power-of-2-ffts/77156#77156

        // Helper variables
        const fft_size = this.config.n_fft;
        const a = 2 * (fft_size - 1);
        const b = 2 * (2 * fft_size - 1);
        const nextP2 = 2 ** (Math.ceil(Math.log2(b)))
        const num_fft_bins = fft_size + 2;

        // Preallocate array to store output
        // double since we store complex numbers
        const data = new Float32Array(num_fft_bins * frames.length);

        // Define buffers
        // Compute chirp for transform
        const chirp = new Float32Array(b);
        const ichirp = new Float32Array(nextP2);
        const buffer1 = new Float32Array(nextP2);
        const buffer2 = new Float32Array(nextP2);
        const outBuffer = new Float32Array(nextP2);
        const outBuffer2 = new Float32Array(nextP2);
        const outBuffer3 = new Float32Array(nextP2);

        // Compute complex exponentiation
        const theta = -2 * Math.PI / fft_size;
        const baseR = Math.cos(theta);
        const baseI = Math.sin(theta);

        // Precompute helper for chirp-z transform
        for (let i = 0; i < b >> 1; ++i) {
            // Compute complex power:
            const e = (i + 1 - fft_size) ** 2 / 2.0;

            // Compute the modulus and argument of the result
            const result_mod = Math.sqrt(baseR ** 2 + baseI ** 2) ** e;
            const result_arg = e * Math.atan2(baseI, baseR);

            // Convert the result back to rectangular form
            // and assign to chirp and ichirp
            let i2 = 2 * i;
            chirp[i2] = result_mod * Math.cos(result_arg);
            chirp[i2 + 1] = result_mod * Math.sin(result_arg);

            // conjugate
            ichirp[i2] = chirp[i2];
            ichirp[i2 + 1] = - chirp[i2 + 1];
        }
        const slicedChirp = chirp.subarray(a, b);

        // create object to perform Fast Fourier Transforms
        // with `nextP2` complex numbers
        const f = new FFT(nextP2 >> 1);
        // TODO: decide between Float32Array and Float64Array
        f.transform(outBuffer, ichirp);

        for (let i = 0; i < frames.length; ++i) {
            const frame = frames[i];

            for (let j = 0; j < slicedChirp.length; j += 2) {
                const j2 = j + 1
                const j3 = j >> 1;

                const a_real = frame[j3] * window[j3];
                buffer1[j] = a_real * slicedChirp[j];
                buffer1[j2] = a_real * slicedChirp[j2];
            }
            // TODO: decide between Float32Array and Float64Array
            f.transform(outBuffer2, buffer1);

            for (let j = 0; j < outBuffer.length; j += 2) {
                const j2 = j + 1;

                buffer2[j] = outBuffer2[j] * outBuffer[j] - outBuffer2[j2] * outBuffer[j2]
                buffer2[j2] = outBuffer2[j] * outBuffer[j2] + outBuffer2[j2] * outBuffer[j]
            }
            // TODO: decide between Float32Array and Float64Array
            f.inverseTransform(outBuffer3, buffer2)

            const offset = i * num_fft_bins;
            for (let j = 0; j < num_fft_bins; j += 2) {
                const a_real = outBuffer3[j + a];
                const a_imag = outBuffer3[j + a + 1];
                const b_real = slicedChirp[j];
                const b_imag = slicedChirp[j + 1];

                // TODO write as transpose
                const o1 = offset + j;
                data[o1] = a_real * b_real - a_imag * b_imag
                data[o1 + 1] = a_real * b_imag + a_imag * b_real
            }
        }

        return {
            data: data,
            dims: [frames.length, num_fft_bins] // [3001, 402]
        };
    }

    /**
     * Creates an array of frames from a given waveform.
     *
     * @param {Float32Array} waveform The waveform to create frames from.
     * @param {boolean} [center=true] Whether to center the frames on their corresponding positions in the waveform. Defaults to true.
     * @returns {Array} An array of frames.
     */
    fram_wave(waveform, center = true) {
        const frames = [];
        const half_window = Math.floor((this.config.n_fft - 1) / 2) + 1;
        const waveformLength = waveform.length;

        for (let i = 0; i < waveformLength + 1; i += this.config.hop_length) {

            let frame;
            if (center) {

                let frameStart = i > half_window ? i - half_window : 0;
                let frameEnd =
                    i < waveformLength - half_window
                        ? i + half_window
                        : waveformLength;

                frame = waveform.subarray(frameStart, frameEnd)

                if (frameStart === 0) {
                    frame = this.padReflect(
                        frame,
                        -i + half_window,
                        0
                    )

                } else if (frameEnd === waveformLength) {
                    frame = this.padReflect(
                        frame,
                        0,
                        i - waveformLength + half_window
                    )
                }

            } else {
                frame = new Float32Array(this.config.n_fft);
                const frameArray = waveform.subarray(i, i + this.config.n_fft);

                if (frameArray.length < this.config.n_fft) {
                    frame.set(frameArray);
                    frame.fill(0, frameArray.length, this.config.n_fft)
                } else {
                    frame = frameArray;
                }

            }
            frames.push(frame);
        }

        return frames;
    }

    /**
     * Generates a Hanning window of length M.
     *
     * @param {number} M The length of the Hanning window to generate.
     * @returns {*} The generated Hanning window.
     */
    hanning(M) {
        if (M < 1) {
            return [];
        }
        if (M === 1) {
            return [1];
        }
        const denom = M - 1;
        const cos_vals = new Float32Array(denom);
        for (let i = 0; i < denom; ++i) {
            const n = 2 * i - M + 1;
            cos_vals[i] = 0.5 + 0.5 * Math.cos(Math.PI * n / denom);
        }
        return cos_vals;
    }

    /**
     * Computes the log-Mel spectrogram of the provided audio waveform.
     * @param {Float32Array|Float64Array} waveform The audio waveform to process.
     * @returns {{data: Float32Array, dims: number[]}} An object containing the log-Mel spectrogram data as a Float32Array and its dimensions as an array of numbers.
     */
    _extract_fbank_features(waveform) {
        // Compute the log-Mel spectrogram of the provided audio

        const buffer = new Float32Array(this.config.n_samples);
        buffer.set(waveform)

        const window = this.hanning(this.config.n_fft + 1)
        const frames = this.fram_wave(buffer)

        const stft = this.stft(frames, window)

        const stftData = stft.data;
        const d1 = stft.dims[0] - 1; // Ignore last row
        const d2 = stft.dims[1] >> 1; // Only need to store real numbers now

        // compute magnitudes
        // NOTE: Unlike the original implementation, we do not
        // transpose since we perform matrix multiplication later
        const magnitudes = new Float32Array(d1 * d2);
        for (let i = 0; i < d1; ++i) {
            for (let j = 0; j < d2; ++j) {
                // let outOffset = (j * d1 + i); // transpose
                let outOffset = i * d2 + j;
                let inOffset = outOffset << 1; // * 2 since complex
                let magnitude = stftData[inOffset] ** 2 + stftData[inOffset + 1] ** 2
                magnitudes[outOffset] = magnitude;
            }
        }

        const mel_filters = this.config.mel_filters;
        const num_mel_filters = mel_filters.length;

        const mel_spec = new Float32Array(num_mel_filters * d1);
        let mIndex = 0;

        // Perform matrix muliplication:
        // mel_spec = filters @ magnitudes
        //  - filters.shape=(80, 201)
        //  - magnitudes.shape=(201, 3000)
        //  - mel_spec.shape=(80, 3000)
        for (let i = 0; i < num_mel_filters; ++i) {
            const mel_filter = mel_filters[i];

            for (let j = 0; j < d1; ++j) {
                let sum = 0;

                // perform dot product
                for (let k = 0; k < d2; ++k) {
                    sum += mel_filter[k] * magnitudes[j * d2 + k];
                }

                mel_spec[mIndex++] = sum;
            }
        }

        const a_min = 1e-10;
        const log_spec = new Float32Array(mel_spec.length);

        let maxLogSpec = 0;
        for (let i = 0; i < mel_spec.length; ++i) {
            const clipped = Math.max(a_min, mel_spec[i]);
            const log10 = Math.log10(clipped);
            log_spec[i] = log10;
            maxLogSpec = Math.max(log10, maxLogSpec)
        }

        for (let i = 0; i < log_spec.length; ++i) {
            log_spec[i] = Math.max(log_spec[i], maxLogSpec - 8);
            log_spec[i] = (log_spec[i] + 4) / 4;
        }

        return {
            data: log_spec,
            dims: [num_mel_filters, d1]
        };
    }

    /**
     * Asynchronously extracts features from a given audio using the provided configuration.
     * @param {Float32Array|Float64Array} audio The audio data as a Float32Array/Float64Array.
     * @returns {Promise<{ input_features: Tensor }>} A Promise resolving to an object containing the extracted input features as a Tensor.
     */
    async _call(audio) {
        if (!(audio instanceof Float32Array || audio instanceof Float64Array)) {
            throw new Error(
                // @ts-ignore
                `WhisperFeatureExtractor expects input to be a Float32Array or a Float64Array, but got ${audio?.constructor?.name ?? typeof audio} instead.` +
                `If using the feature extractor directly, remember to use \`read_audio(url, sampling_rate)\` to obtain the raw audio data of the file/url.`
            )
        }

        if (audio.length > this.config.n_samples) {
            console.warn(
                "Attempting to extract features for audio longer than 30 seconds. " +
                "If using a pipeline to extract transcript from a long audio clip, " +
                "remember to specify `chunk_length_s` and/or `stride_length_s`."
            );
        }
        let waveform = audio.slice(0, this.config.n_samples);

        let features = this._extract_fbank_features(waveform);

        return {
            input_features: new Tensor('float32',
                features.data,
                [1, ...features.dims]
            )
        };
    }
}

class Wav2Vec2FeatureExtractor extends FeatureExtractor {

    /**
     * @param {Float32Array} input_values 
     * @returns {Float32Array} 
     */
    _zero_mean_unit_var_norm(input_values) {
        // TODO support batch?
        const sum = input_values.reduce((a, b) => a + b, 0);
        const mean = sum / input_values.length;
        const variance = input_values.reduce((a, b) => a + (b - mean) ** 2, 0) / input_values.length;
        return input_values.map(x => (x - mean) / Math.sqrt(variance + 1e-7));
    }

    /**
     * Asynchronously extracts features from a given audio using the provided configuration.
     * @param {Float32Array|Float64Array} audio The audio data as a Float32Array/Float64Array.
     * @returns {Promise<{ input_values: Tensor; attention_mask: Tensor }>} A Promise resolving to an object containing the extracted input features and attention mask as Tensors.
     */
    async _call(audio) {
        // TODO: remove duplication
        if (!(audio instanceof Float32Array || audio instanceof Float64Array)) {
            throw new Error(
                // @ts-ignore
                `Wav2Vec2FeatureExtractor expects input to be a Float32Array or a Float64Array, but got ${audio?.constructor?.name ?? typeof audio} instead.` +
                `If using the feature extractor directly, remember to use \`read_audio(url, sampling_rate)\` to obtain the raw audio data of the file/url.`
            )
        }
        if (audio instanceof Float64Array) {
            audio = new Float32Array(audio);
        }

        let input_values = audio;

        // zero-mean and unit-variance normalization
        if (this.config.do_normalize) {
            input_values = this._zero_mean_unit_var_norm(input_values);
        }

        // TODO: allow user to pass in attention mask
        const shape = [1, input_values.length];
        return {
            input_values: new Tensor('float32', input_values, shape),
            attention_mask: new Tensor('int64', new BigInt64Array(input_values.length).fill(1n), shape)
        };
    }
}

/**
 * Represents a Processor that extracts features from an input.
 * @extends Callable
 */
class Processor extends Callable {
    /**
     * Creates a new Processor with the given feature extractor.
     * @param {FeatureExtractor} feature_extractor The function used to extract features from the input.
     */
    constructor(feature_extractor) {
        super();
        this.feature_extractor = feature_extractor;
        // TODO use tokenizer here?
    }

    /**
     * Calls the feature_extractor function with the given input.
     * @param {any} input The input to extract features from.
     * @returns {Promise<any>} A Promise that resolves with the extracted features.
     */
    async _call(input) {
        return await this.feature_extractor(input);
    }
}

class SamProcessor extends Processor {

    async _call(images, input_points) {
        return await this.feature_extractor(images, input_points);
    }

    /**
     * @borrows SamImageProcessor#post_process_masks as post_process_masks
     */
    post_process_masks(...args) {
        // @ts-ignore
        return this.feature_extractor.post_process_masks(...args);
    }
}

/**
 * Represents a WhisperProcessor that extracts features from an audio input.
 * @extends Processor
 */
class WhisperProcessor extends Processor {
    /**
     * Calls the feature_extractor function with the given audio input.
     * @param {any} audio The audio input to extract features from.
     * @returns {Promise<any>} A Promise that resolves with the extracted features.
     */
    async _call(audio) {
        return await this.feature_extractor(audio)
    }
}


class Wav2Vec2ProcessorWithLM extends Processor {
    /**
     * Calls the feature_extractor function with the given audio input.
     * @param {any} audio The audio input to extract features from.
     * @returns {Promise<any>} A Promise that resolves with the extracted features.
     */
    async _call(audio) {
        return await this.feature_extractor(audio)
    }
}

//////////////////////////////////////////////////
/**
 * @typedef {import('./utils/hub.js').PretrainedOptions} PretrainedOptions
 */
/**
 * Helper class which is used to instantiate pretrained processors with the `from_pretrained` function.
 * The chosen processor class is determined by the type specified in the processor config.
 * 
 * **Example:** Load a processor using `from_pretrained`.
 * ```javascript
 * let processor = await AutoProcessor.from_pretrained('openai/whisper-tiny.en');
 * ```
 * 
 * **Example:** Run an image through a processor.
 * ```javascript
 * let processor = await AutoProcessor.from_pretrained('Xenova/clip-vit-base-patch16');
 * let image = await RawImage.read('https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/football-match.jpg');
 * let image_inputs = await processor(image);
 * // {
 * //   "pixel_values": {
 * //     "dims": [ 1, 3, 224, 224 ],
 * //     "type": "float32",
 * //     "data": Float32Array [ -1.558687686920166, -1.558687686920166, -1.5440893173217773, ... ],
 * //     "size": 150528
 * //   },
 * //   "original_sizes": [
 * //     [ 533, 800 ]
 * //   ],
 * //   "reshaped_input_sizes": [
 * //     [ 224, 224 ]
 * //   ]
 * // }
 * ```
 */
class AutoProcessor {
    static FEATURE_EXTRACTOR_CLASS_MAPPING = {
        WhisperFeatureExtractor,
        ViTFeatureExtractor,
        MobileViTFeatureExtractor,
        ConvNextFeatureExtractor,
        BeitFeatureExtractor,
        DeiTFeatureExtractor,
        DetrFeatureExtractor,
        YolosFeatureExtractor,

        SamImageProcessor,
        Wav2Vec2FeatureExtractor,
    }

    static PROCESSOR_CLASS_MAPPING = {
        WhisperProcessor,
        Wav2Vec2ProcessorWithLM,
        SamProcessor,
    }

    /**
     * Instantiate one of the processor classes of the library from a pretrained model.
     * 
     * The processor class to instantiate is selected based on the `feature_extractor_type` property of the config object
     * (either passed as an argument or loaded from `pretrained_model_name_or_path` if possible)
     * 
     * @param {string} pretrained_model_name_or_path The name or path of the pretrained model. Can be either:
     * - A string, the *model id* of a pretrained processor hosted inside a model repo on huggingface.co.
     *   Valid model ids can be located at the root-level, like `bert-base-uncased`, or namespaced under a
     *   user or organization name, like `dbmdz/bert-base-german-cased`.
     * - A path to a *directory* containing processor files, e.g., `./my_model_directory/`.
     * @param {PretrainedOptions} options Additional options for loading the processor.
     * 
     * @returns {Promise<Processor>} A new instance of the Processor class.
     */
    static async from_pretrained(pretrained_model_name_or_path, {
        progress_callback = null,
        config = null,
        cache_dir = null,
        local_files_only = false,
        revision = 'main',
    } = {}) {

        let preprocessorConfig = config ?? await getModelJSON(pretrained_model_name_or_path, 'preprocessor_config.json', true, {
            progress_callback,
            config,
            cache_dir,
            local_files_only,
            revision,
        })

        // Determine feature extractor class
        // TODO: Ensure backwards compatibility with old configs
        let key = preprocessorConfig.feature_extractor_type ?? preprocessorConfig.image_processor_type;
        let feature_extractor_class = this.FEATURE_EXTRACTOR_CLASS_MAPPING[key];

        if (!feature_extractor_class) {
            if (preprocessorConfig.size !== undefined) {
                // Assume ImageFeatureExtractor
                console.warn('Feature extractor type not specified, assuming ImageFeatureExtractor due to size parameter in config.');
                feature_extractor_class = ImageFeatureExtractor;
            } else {
                throw new Error(`Unknown Feature Extractor type: ${preprocessorConfig.feature_extractor_type}`);
            }
        }

        // If no associated processor class, use default
        let processor_class = this.PROCESSOR_CLASS_MAPPING[preprocessorConfig.processor_class] ?? Processor;

        // Instantiate processor and feature extractor
        let feature_extractor = new feature_extractor_class(preprocessorConfig);
        return new processor_class(feature_extractor);
    }
}
//////////////////////////////////////////////////


;// CONCATENATED MODULE: ./node_modules/@xenova/transformers/src/pipelines.js
/**
 * @file Pipelines provide a high-level, easy to use, API for running machine learning models.
 * 
 * **Example:** Instantiate pipeline using the `pipeline` function.
 * ```javascript
 * import { pipeline } from '@xenova/transformers';
 * 
 * let classifier = await pipeline('sentiment-analysis');
 * let output = await classifier('I love transformers!');
 * // [{'label': 'POSITIVE', 'score': 0.999817686}]
 * ```
 * 
 * @module pipelines
 */












/**
 * Prepare images for further tasks.
 * @param {any[]} images images to prepare.
 * @returns {Promise<any[]>} returns processed images.
 * @private
 */
async function prepareImages(images) {
    if (!Array.isArray(images)) {
        images = [images];
    }

    // Possibly convert any non-images to images
    images = await Promise.all(images.map(x => RawImage.read(x)));
    return images;
}

/**
 * The Pipeline class is the class from which all pipelines inherit.
 * Refer to this class for methods shared across different pipelines.
 * @extends Callable
 */
class Pipeline extends Callable {
    /**
     * Create a new Pipeline.
     * @param {Object} options An object containing the following properties:
     * @param {string} [options.task] The task of the pipeline. Useful for specifying subtasks.
     * @param {PreTrainedModel} [options.model] The model to use.
     * @param {PreTrainedTokenizer} [options.tokenizer=null] The tokenizer to use (if any).
     * @param {Processor} [options.processor=null] The processor to use (if any).
     */
    constructor({ task, model, tokenizer = null, processor = null }) {
        super();
        this.task = task;
        this.model = model;
        this.tokenizer = tokenizer;
        this.processor = processor;
    }

    /**
     * Disposes the model.
     * @returns {Promise<void>} A promise that resolves when the model has been disposed.
     */
    async dispose() {
        await this.model.dispose();
    }

    /**
     * Executes the task associated with the pipeline.
     * @param {any} texts The input texts to be processed.
     * @param {...any} args Additional arguments.
     * @returns {Promise<any>} A promise that resolves to an array containing the inputs and outputs of the task.
     */
    async _call(texts, ...args) {
        // Run tokenization
        let model_inputs = this.tokenizer(texts, {
            padding: true,
            truncation: true
        });

        // Run model
        let outputs = await this.model(model_inputs)

        return [model_inputs, outputs];
    }
}

/**
 * Text classification pipeline using any `ModelForSequenceClassification`.
 *
 * **Example:** Sentiment-analysis w/ `Xenova/distilbert-base-uncased-finetuned-sst-2-english`.
 * ```javascript
 * let classifier = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
 * let output = await classifier('I love transformers!');
 * // [{ label: 'POSITIVE', score: 0.999788761138916 }]
 * ```
 * 
 * **Example:** Multilingual sentiment-analysis w/ `Xenova/bert-base-multilingual-uncased-sentiment` (and return top 5 classes).
 * ```javascript
 * let classifier = await pipeline('sentiment-analysis', 'Xenova/bert-base-multilingual-uncased-sentiment');
 * let output = await classifier('Le meilleur film de tous les temps.', { topk: 5 });
 * // [
 * //   { label: '5 stars', score: 0.9610759615898132 },
 * //   { label: '4 stars', score: 0.03323351591825485 },
 * //   { label: '3 stars', score: 0.0036155181005597115 },
 * //   { label: '1 star', score: 0.0011325967498123646 },
 * //   { label: '2 stars', score: 0.0009423971059732139 }
 * // ]
 * ```
 * 
 * **Example:** Toxic comment classification w/ `Xenova/toxic-bert` (and return all classes).
 * ```javascript
 * let classifier = await pipeline('text-classification', 'Xenova/toxic-bert');
 * let output = await classifier('I hate you!', { topk: null });
 * // [
 * //   { label: 'toxic', score: 0.9593140482902527 },
 * //   { label: 'insult', score: 0.16187334060668945 },
 * //   { label: 'obscene', score: 0.03452680632472038 },
 * //   { label: 'identity_hate', score: 0.0223250575363636 },
 * //   { label: 'threat', score: 0.019197041168808937 },
 * //   { label: 'severe_toxic', score: 0.005651099607348442 }
 * // ]
 * ```
 */
class TextClassificationPipeline extends Pipeline {
    /**
     * Executes the text classification task.
     * @param {any} texts The input texts to be classified.
     * @param {Object} options An optional object containing the following properties:
     * @param {number} [options.topk=1] The number of top predictions to be returned.
     * @returns {Promise<Object[]|Object>} A promise that resolves to an array or object containing the predicted labels and scores.
     */
    async _call(texts, {
        topk = 1
    } = {}) {

        // TODO: Use softmax tensor function
        let function_to_apply =
            this.model.config.problem_type === 'multi_label_classification'
                ? batch => batch.sigmoid().data
                : batch => softmax(batch.data); // single_label_classification (default)

        let [inputs, outputs] = await super._call(texts);

        let id2label = this.model.config.id2label;
        let toReturn = [];
        for (let batch of outputs.logits) {
            let output = function_to_apply(batch);
            let scores = getTopItems(output, topk);

            let vals = scores.map(function (x) {
                return {
                    label: id2label[x[0]],
                    score: x[1],
                }
            });
            if (topk === 1) {
                toReturn.push(...vals);
            } else {
                toReturn.push(vals);
            }
        }

        return Array.isArray(texts) || topk === 1 ? toReturn : toReturn[0];
    }
}


/**
 * Named Entity Recognition pipeline using any `ModelForTokenClassification`.
 * 
 * **Example:** Perform named entity recognition with `Xenova/bert-base-NER`.
 * ```javascript
 * let classifier = await pipeline('token-classification', 'Xenova/bert-base-NER');
 * let output = await classifier('My name is Sarah and I live in London');
 * // [
 * //   { entity: 'B-PER', score: 0.9980202913284302, index: 4, word: 'Sarah' },
 * //   { entity: 'B-LOC', score: 0.9994474053382874, index: 9, word: 'London' }
 * // ]
 * ```
 * 
 * **Example:** Perform named entity recognition with `Xenova/bert-base-NER` (and return all labels).
 * ```javascript
 * let classifier = await pipeline('token-classification', 'Xenova/bert-base-NER');
 * let output = await classifier('Sarah lives in the United States of America', { ignore_labels: [] });
 * // [
 * //   { entity: 'B-PER', score: 0.9966587424278259, index: 1, word: 'Sarah' },
 * //   { entity: 'O', score: 0.9987385869026184, index: 2, word: 'lives' },
 * //   { entity: 'O', score: 0.9990072846412659, index: 3, word: 'in' },
 * //   { entity: 'O', score: 0.9988298416137695, index: 4, word: 'the' },
 * //   { entity: 'B-LOC', score: 0.9995510578155518, index: 5, word: 'United' },
 * //   { entity: 'I-LOC', score: 0.9990395307540894, index: 6, word: 'States' },
 * //   { entity: 'I-LOC', score: 0.9986724853515625, index: 7, word: 'of' },
 * //   { entity: 'I-LOC', score: 0.9975294470787048, index: 8, word: 'America' }
 * // ]
 * ```
 */
class TokenClassificationPipeline extends Pipeline {
    /**
     * Executes the token classification task.
     * @param {any} texts The input texts to be classified.
     * @param {Object} options An optional object containing the following properties:
     * @returns {Promise<Object[]|Object>} A promise that resolves to an array or object containing the predicted labels and scores.
     */
    async _call(texts, {
        ignore_labels = ['O'], // TODO init param?
    } = {}) {

        let isBatched = Array.isArray(texts);

        if (!isBatched) {
            texts = [texts];
        }

        let tokenizer = this.tokenizer;
        let [inputs, outputs] = await super._call(texts);

        let logits = outputs.logits;
        let id2label = this.model.config.id2label;

        let toReturn = [];
        for (let i = 0; i < logits.dims[0]; ++i) {
            let ids = inputs.input_ids[i];
            let batch = logits[i];

            // List of tokens that aren't ignored
            let tokens = [];
            for (let j = 0; j < batch.dims[0]; ++j) {
                let tokenData = batch[j];
                let topScoreIndex = max(tokenData.data)[1];

                let entity = id2label[topScoreIndex];
                if (ignore_labels.includes(entity)) {
                    // We predicted a token that should be ignored. So, we skip it.
                    continue;
                }

                // TODO add option to keep special tokens?
                let word = tokenizer.decode([ids[j].item()], { skip_special_tokens: true });
                if (word === '') {
                    // Was a special token. So, we skip it.
                    continue;
                }

                let scores = softmax(tokenData.data);

                tokens.push({
                    entity: entity,
                    score: scores[topScoreIndex],
                    index: j,
                    word: word,

                    // TODO: null for now, but will add
                    start: null,
                    end: null,
                });
            }
            toReturn.push(tokens);
        }
        return isBatched ? toReturn : toReturn[0];
    }
}

/**
 * @typedef {object} QuestionAnsweringResult
 * @property {string} answer - The answer.
 * @property {number} score - The score.
 */

/**
 * @typedef {Promise<QuestionAnsweringResult|QuestionAnsweringResult[]>} QuestionAnsweringReturnType
 */

/**
 * Question Answering pipeline using any `ModelForQuestionAnswering`.
 * 
 * **Example:** Run question answering with `Xenova/distilbert-base-uncased-distilled-squad`.
 * ```javascript
 * let question = 'Who was Jim Henson?';
 * let context = 'Jim Henson was a nice puppet.';
 * 
 * let answerer = await pipeline('question-answering', 'Xenova/distilbert-base-uncased-distilled-squad');
 * let output = await answerer(question, context);
 * // {
 * //   "answer": "a nice puppet",
 * //   "score": 0.5768911502526741
 * // }
 * ```
 */
class QuestionAnsweringPipeline extends Pipeline {
    /**
     * Executes the question answering task.
     * @param {string|string[]} question The question(s) to be answered.
     * @param {string|string[]} context The context(s) where the answer(s) can be found.
     * @param {Object} options An optional object containing the following properties:
     * @param {number} [options.topk=1] The number of top answer predictions to be returned.
     * @returns {QuestionAnsweringReturnType} A promise that resolves to an array or object
     * containing the predicted answers and scores.
     */
    async _call(question, context, {
        topk = 1
    } = {}) {

        // Run tokenization
        let inputs = this.tokenizer(question, {
            text_pair: context,
            padding: true,
            truncation: true
        });

        let output = await this.model(inputs);

        let toReturn = [];
        for (let j = 0; j < output.start_logits.dims[0]; ++j) {
            let ids = inputs.input_ids[j];
            let sepIndex = ids.indexOf(this.tokenizer.sep_token_id);

            let s1 = Array.from(softmax(output.start_logits[j].data))
                .map((x, i) => [x, i])
                .filter(x => x[1] > sepIndex);
            let e1 = Array.from(softmax(output.end_logits[j].data))
                .map((x, i) => [x, i])
                .filter(x => x[1] > sepIndex);

            let options = product(s1, e1)
                .filter(x => x[0][1] <= x[1][1])
                .map(x => [x[0][1], x[1][1], x[0][0] * x[1][0]])
                .sort((a, b) => b[2] - a[2]);

            for (let k = 0; k < Math.min(options.length, topk); ++k) {
                let [start, end, score] = options[k];

                let answer_tokens = [...ids].slice(start, end + 1)

                let answer = this.tokenizer.decode(answer_tokens, {
                    skip_special_tokens: true,
                });

                // TODO add start and end?
                // NOTE: HF returns character index
                toReturn.push({
                    answer, score
                });
            }
        }

        // Mimic HF's return type based on topk
        return (topk === 1) ? toReturn[0] : toReturn;

    }
}

/**
 * Masked language modeling prediction pipeline using any `ModelWithLMHead`.
 * 
 * **Example:** Perform masked language modelling (a.k.a. "fill-mask") with `Xenova/bert-base-uncased`.
 * ```javascript
 * let unmasker = await pipeline('fill-mask', 'Xenova/bert-base-cased');
 * let output = await unmasker('The goal of life is [MASK].');
 * // [
 * //   { token_str: 'survival', score: 0.06137419492006302, token: 8115, sequence: 'The goal of life is survival.' },
 * //   { token_str: 'love', score: 0.03902450203895569, token: 1567, sequence: 'The goal of life is love.' },
 * //   { token_str: 'happiness', score: 0.03253183513879776, token: 9266, sequence: 'The goal of life is happiness.' },
 * //   { token_str: 'freedom', score: 0.018736306577920914, token: 4438, sequence: 'The goal of life is freedom.' },
 * //   { token_str: 'life', score: 0.01859794743359089, token: 1297, sequence: 'The goal of life is life.' }
 * // ]
 * ```
 * 
 * **Example:** Perform masked language modelling (a.k.a. "fill-mask") with `Xenova/bert-base-cased` (and return top result).
 * ```javascript
 * let unmasker = await pipeline('fill-mask', 'Xenova/bert-base-cased');
 * let output = await unmasker('The Milky Way is a [MASK] galaxy.', { topk: 1 });
 * // [{ token_str: 'spiral', score: 0.6299987435340881, token: 14061, sequence: 'The Milky Way is a spiral galaxy.' }]
 * ```
 */
class FillMaskPipeline extends Pipeline {
    /**
     * Fill the masked token in the text(s) given as inputs.
     * @param {any} texts The masked input texts.
     * @param {Object} options An optional object containing the following properties:
     * @param {number} [options.topk=5] The number of top predictions to be returned.
     * @returns {Promise<Object[]|Object>} A promise that resolves to an array or object containing the predicted tokens and scores.
     */
    async _call(texts, {
        topk = 5
    } = {}) {
        // Run tokenization
        let [inputs, outputs] = await super._call(texts);

        // Determine indices of mask tokens
        // let mask_token_indices = inputs.input_ids.data.map(x => )

        // let logits = reshape(outputs.logits.data, outputs.logits.dims);

        let tokenizer = this.tokenizer;

        let toReturn = [];

        for (let i = 0; i < inputs.input_ids.dims[0]; ++i) {
            let ids = inputs.input_ids[i];
            let mask_token_index = ids.indexOf(this.tokenizer.mask_token_id)

            if (mask_token_index === -1) {
                throw Error(`Mask token (${tokenizer.mask_token}) not found in text.`)
            }
            let logits = outputs.logits[i];
            let itemLogits = logits[mask_token_index];

            let scores = getTopItems(softmax(itemLogits.data), topk);

            toReturn.push(scores.map(x => {
                let sequence = [...ids];
                sequence[mask_token_index] = x[0];

                return {
                    score: x[1],
                    token: x[0],
                    token_str: tokenizer.model.vocab[x[0]],
                    sequence: tokenizer.decode(sequence, { skip_special_tokens: true }),
                }
            }));
        }
        return Array.isArray(texts) ? toReturn : toReturn[0];
    }
}

/**
 * Text2TextGenerationPipeline class for generating text using a model that performs text-to-text generation tasks.
 * 
 * **Example:** Text-to-text generation w/ `Xenova/LaMini-Flan-T5-783M`.
 * ```javascript
 * let generator = await pipeline('text2text-generation', 'Xenova/LaMini-Flan-T5-783M');
 * let output = await generator('how can I become more healthy?', {
 *   max_new_tokens: 100,
 * });
 * // [ 'To become more healthy, you can: 1. Eat a balanced diet with plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats. 2. Stay hydrated by drinking plenty of water. 3. Get enough sleep and manage stress levels. 4. Avoid smoking and excessive alcohol consumption. 5. Regularly exercise and maintain a healthy weight. 6. Practice good hygiene and sanitation. 7. Seek medical attention if you experience any health issues.' ]
 * ```
 */
class Text2TextGenerationPipeline extends Pipeline {
    _key = null;

    /**
     * Fill the masked token in the text(s) given as inputs.
     * @param {string|string[]} texts The text or array of texts to be processed.
     * @param {Object} [options={}] Options for the fill-mask pipeline.
     * @param {number} [options.topk=5] The number of top-k predictions to return.
     * @returns {Promise<any>} An array of objects containing the score, predicted token, predicted token string,
     * and the sequence with the predicted token filled in, or an array of such arrays (one for each input text).
     * If only one input text is given, the output will be an array of objects.
     * @throws {Error} When the mask token is not found in the input text.
     */
    async _call(texts, generate_kwargs = {}) {
        if (!Array.isArray(texts)) {
            texts = [texts];
        }

        // Add global prefix, if present
        if (this.model.config.prefix) {
            texts = texts.map(x => this.model.config.prefix + x)
        }

        // Handle task specific params:
        let task_specific_params = this.model.config.task_specific_params
        if (task_specific_params && task_specific_params[this.task]) {
            // Add prefixes, if present
            if (task_specific_params[this.task].prefix) {
                texts = texts.map(x => task_specific_params[this.task].prefix + x)
            }

            // TODO update generation config
        }

        let tokenizer_options = {
            padding: true,
            truncation: true,
        }
        let input_ids;
        if (this instanceof TranslationPipeline && '_build_translation_inputs' in this.tokenizer) {
            // TODO: move to Translation pipeline?
            // Currently put here to avoid code duplication
            // @ts-ignore
            input_ids = this.tokenizer._build_translation_inputs(texts, tokenizer_options, generate_kwargs).input_ids;

        } else {
            input_ids = this.tokenizer(texts, tokenizer_options).input_ids;
        }

        let outputTokenIds = await this.model.generate(input_ids, generate_kwargs);

        /**
         * @type {any[]}
         */
        let toReturn = this.tokenizer.batch_decode(outputTokenIds, {
            skip_special_tokens: true,
        });
        if (this._key !== null) {
            toReturn = toReturn.map(text => {
                return (this._key === null) ? text : { [this._key]: text }
            })
        }
        return toReturn
    }
}


/**
 * A pipeline for summarization tasks, inheriting from Text2TextGenerationPipeline.
 * 
 * **Example:** Summarization w/ `Xenova/distilbart-cnn-6-6`.
 * ```javascript
 * let text = 'The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, ' +
 *   'and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. ' +
 *   'During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest ' +
 *   'man-made structure in the world, a title it held for 41 years until the Chrysler Building in New ' +
 *   'York City was finished in 1930. It was the first structure to reach a height of 300 metres. Due to ' +
 *   'the addition of a broadcasting aerial at the top of the tower in 1957, it is now taller than the ' +
 *   'Chrysler Building by 5.2 metres (17 ft). Excluding transmitters, the Eiffel Tower is the second ' +
 *   'tallest free-standing structure in France after the Millau Viaduct.';
 * 
 * let generator = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6');
 * let output = await generator(text, {
 *   max_new_tokens: 100,
 * });
 * // [{ summary_text: ' The Eiffel Tower is about the same height as an 81-storey building and the tallest structure in Paris. It is the second tallest free-standing structure in France after the Millau Viaduct.' }]
 * ```
 */
class SummarizationPipeline extends Text2TextGenerationPipeline {
    _key = 'summary_text';
}

/**
 * Translates text from one language to another.
 * 
 * **Example:** Multilingual translation w/ `Xenova/nllb-200-distilled-600M`.
 * 
 * See [here](https://github.com/facebookresearch/flores/blob/main/flores200/README.md#languages-in-flores-200)
 * for the full list of languages and their corresponding codes.
 * 
 * ```javascript
 * let translator = await pipeline('translation', 'Xenova/nllb-200-distilled-600M');
 * let output = await translator('जीवन एक चॉकलेट बॉक्स की तरह है।', {
 *   src_lang: 'hin_Deva', // Hindi
 *   tgt_lang: 'fra_Latn', // French
 * });
 * // [{ translation_text: 'La vie est comme une boîte à chocolat.' }]
 * ```
 * 
 * **Example:** Multilingual translation w/ `Xenova/m2m100_418M`.
 * 
 * See [here](https://huggingface.co/facebook/m2m100_418M#languages-covered)
 * for the full list of languages and their corresponding codes.
 * 
 * ```javascript
 * let translator = await pipeline('translation', 'Xenova/m2m100_418M');
 * let output = await translator('生活就像一盒巧克力。', {
 *   src_lang: 'zh', // Chinese
 *   tgt_lang: 'en', // English
 * });
 * // [{ translation_text: 'Life is like a box of chocolate.' }]
 * ```
 * 
 * **Example:** Multilingual translation w/ `Xenova/mbart-large-50-many-to-many-mmt`.
 * 
 * See [here](https://huggingface.co/facebook/mbart-large-50-many-to-many-mmt#languages-covered)
 * for the full list of languages and their corresponding codes.
 * 
 * ```javascript
 * let translator = await pipeline('translation', 'Xenova/mbart-large-50-many-to-many-mmt');
 * let output = await translator('संयुक्त राष्ट्र के प्रमुख का कहना है कि सीरिया में कोई सैन्य समाधान नहीं है', {
 *   src_lang: 'hi_IN', // Hindi
 *   tgt_lang: 'fr_XX', // French
 * });
 * // [{ translation_text: 'Le chef des Nations affirme qu 'il n 'y a military solution in Syria.' }]
 * ```
 */
class TranslationPipeline extends Text2TextGenerationPipeline {
    _key = 'translation_text';
}

/**
 * Language generation pipeline using any `ModelWithLMHead` or `ModelForCausalLM`.
 * This pipeline predicts the words that will follow a specified text prompt.
 * NOTE: For the full list of generation parameters, see [`GenerationConfig`](./utils/generation#module_utils/generation.GenerationConfig).
 * 
 * **Example:** Text generation with `Xenova/distilgpt2` (default settings).
 * ```javascript
 * let text = 'I enjoy walking with my cute dog,';
 * let classifier = await pipeline('text-generation', 'Xenova/distilgpt2');
 * let output = await classifier(text);
 * // [{ generated_text: "I enjoy walking with my cute dog, and I love to play with the other dogs." }]
 * ```
 * 
 * **Example:** Text generation with `Xenova/distilgpt2` (custom settings).
 * ```javascript
 * let text = 'Once upon a time, there was';
 * let classifier = await pipeline('text-generation', 'Xenova/distilgpt2');
 * let output = await classifier(text, {
 *   temperature: 2,
 *   max_new_tokens: 10,
 *   repetition_penalty: 1.5,
 *   no_repeat_ngram_size: 2,
 *   num_beams: 2,
 *   num_return_sequences: 2,
 * });
 * // [{
 * //   "generated_text": "Once upon a time, there was an abundance of information about the history and activities that"
 * // }, {
 * //   "generated_text": "Once upon a time, there was an abundance of information about the most important and influential"
 * // }]
 * ```
 * 
 * **Example:** Run code generation with `Xenova/codegen-350M-mono`.
 * ```javascript
 * let text = 'def fib(n):';
 * let classifier = await pipeline('text-generation', 'Xenova/codegen-350M-mono');
 * let output = await classifier(text, {
 *   max_new_tokens: 44,
 * });
 * // [{
 * //   generated_text: 'def fib(n):\n' +
 * //     '    if n == 0:\n' +
 * //     '        return 0\n' +
 * //     '    elif n == 1:\n' +
 * //     '        return 1\n' +
 * //     '    else:\n' +
 * //     '        return fib(n-1) + fib(n-2)\n'
 * // }]
 * ```
 */
class TextGenerationPipeline extends Pipeline {
    /**
     * Generates text based on an input prompt.
     * @param {any} texts The input prompt or prompts to generate text from.
     * @param {Object} [generate_kwargs={}] Additional arguments for text generation.
     * @returns {Promise<any>} The generated text or texts.
     */
    async _call(texts, generate_kwargs = {}) {
        let stringInput = typeof texts === 'string' || texts instanceof String;
        if (stringInput) {
            texts = [texts];
        }

        this.tokenizer.padding_side = 'left';
        let inputs = this.tokenizer(texts, {
            padding: true,
            truncation: true,
        });

        let input_ids = inputs.input_ids;
        let attention_mask = inputs.attention_mask;

        let outputTokenIds = await this.model.generate(input_ids, generate_kwargs, null, {
            inputs_attention_mask: attention_mask
        });

        const decoded = this.tokenizer.batch_decode(outputTokenIds, {
            skip_special_tokens: true,
        });
        const toReturn = Array.from({ length: texts.length }, _ => []);
        for (let i = 0; i < decoded.length; ++i) {
            const textIndex = Math.floor(i / outputTokenIds.length * texts.length);

            toReturn[textIndex].push({
                generated_text: decoded[i]
            });
        }
        return (stringInput && toReturn.length === 1) ? toReturn[0] : toReturn;
    }
}

/**
 * NLI-based zero-shot classification pipeline using a `ModelForSequenceClassification`
 * trained on NLI (natural language inference) tasks. Equivalent of `text-classification`
 * pipelines, but these models don't require a hardcoded number of potential classes, they
 * can be chosen at runtime. It usually means it's slower but it is **much** more flexible.
 * 
 * **Example:** Zero shot classification with `Xenova/mobilebert-uncased-mnli`.
 * ```javascript
 * let text = 'Last week I upgraded my iOS version and ever since then my phone has been overheating whenever I use your app.';
 * let labels = [ 'mobile', 'billing', 'website', 'account access' ];
 * let classifier = await pipeline('zero-shot-classification', 'Xenova/mobilebert-uncased-mnli');
 * let output = await classifier(text, labels);
 * // {
 * //   sequence: 'Last week I upgraded my iOS version and ever since then my phone has been overheating whenever I use your app.',
 * //   labels: [ 'mobile', 'website', 'billing', 'account access' ],
 * //   scores: [ 0.5562091040482018, 0.1843621307860853, 0.13942646639336376, 0.12000229877234923 ]
 * // }
 * ```
 * 
 * **Example:** Zero shot classification with `Xenova/nli-deberta-v3-xsmall` (multi-label).
 * ```javascript
 * let text = 'I have a problem with my iphone that needs to be resolved asap!';
 * let labels = [ 'urgent', 'not urgent', 'phone', 'tablet', 'computer' ];
 * let classifier = await pipeline('zero-shot-classification', 'Xenova/nli-deberta-v3-xsmall');
 * let output = await classifier(text, labels, { multi_label: true });
 * // {
 * //   sequence: 'I have a problem with my iphone that needs to be resolved asap!',
 * //   labels: [ 'urgent', 'phone', 'computer', 'tablet', 'not urgent' ],
 * //   scores: [ 0.9958870956360275, 0.9923963400697035, 0.002333537946160235, 0.0015134138567598765, 0.0010699384208377163 ]
 * // }
 * ```
 */
class ZeroShotClassificationPipeline extends Pipeline {

    /**
     * Create a new ZeroShotClassificationPipeline.
     * @param {Object} options An object containing the following properties:
     * @param {string} [options.task] The task of the pipeline. Useful for specifying subtasks.
     * @param {PreTrainedModel} [options.model] The model to use.
     * @param {PreTrainedTokenizer} [options.tokenizer] The tokenizer to use.
     */
    constructor(options) {
        super(options);

        // Use model config to get label2id mapping
        this.label2id = Object.fromEntries(
            Object.entries(this.model.config.label2id).map(
                ([k, v]) => [k.toLowerCase(), v]
            )
        );

        this.entailment_id = this.label2id['entailment'];
        if (this.entailment_id === undefined) {
            console.warn("Could not find 'entailment' in label2id mapping. Using 2 as entailment_id.");
            this.entailment_id = 2;
        }

        this.contradiction_id = this.label2id['contradiction'] ?? this.label2id['not_entailment'];
        if (this.contradiction_id === undefined) {
            console.warn("Could not find 'contradiction' in label2id mapping. Using 0 as contradiction_id.");
            this.contradiction_id = 0;
        }
    }
    /**
     * @param {any[]} texts
     * @param {string[]} candidate_labels
     * @param {Object} options Additional options:
     * @param {string} [options.hypothesis_template="This example is {}."] The template used to turn each
     * candidate label into an NLI-style hypothesis. The candidate label will replace the {} placeholder.
     * @param {boolean} [options.multi_label=false] Whether or not multiple candidate labels can be true.
     * If `false`, the scores are normalized such that the sum of the label likelihoods for each sequence
     * is 1. If `true`, the labels are considered independent and probabilities are normalized for each
     * candidate by doing a softmax of the entailment score vs. the contradiction score.
     * @return {Promise<Object|Object[]>} The prediction(s), as a map (or list of maps) from label to score.
     */
    async _call(texts, candidate_labels, {
        hypothesis_template = "This example is {}.",
        multi_label = false,
    } = {}) {

        let isBatched = Array.isArray(texts);

        if (!isBatched) {
            texts = [texts];
        }
        if (!Array.isArray(candidate_labels)) {
            candidate_labels = [candidate_labels];
        }

        // Insert labels into hypothesis template
        let hypotheses = candidate_labels.map(
            x => hypothesis_template.replace('{}', x)
        );

        // How to perform the softmax over the logits:
        //  - true:  softmax over the entailment vs. contradiction dim for each label independently
        //  - false: softmax the "entailment" logits over all candidate labels
        let softmaxEach = multi_label || candidate_labels.length === 1;

        let toReturn = [];
        for (let premise of texts) {
            let entails_logits = [];

            for (let hypothesis of hypotheses) {
                let inputs = this.tokenizer(premise, {
                    text_pair: hypothesis,
                    padding: true,
                    truncation: true,
                })
                let outputs = await this.model(inputs)

                if (softmaxEach) {
                    entails_logits.push([
                        outputs.logits.data[this.contradiction_id],
                        outputs.logits.data[this.entailment_id]
                    ])
                } else {
                    entails_logits.push(outputs.logits.data[this.entailment_id])
                }
            }

            let scores;
            if (softmaxEach) {
                scores = entails_logits.map(x => softmax(x)[1]);
            } else {
                scores = softmax(entails_logits);
            }

            // Sort by scores (desc) and return scores with indices
            let scores_sorted = scores
                .map((x, i) => [x, i])
                .sort((a, b) => {
                    return b[0] - a[0];
                });

            toReturn.push({
                sequence: premise,
                labels: scores_sorted.map(x => candidate_labels[x[1]]),
                scores: scores_sorted.map(x => x[0]),
            });
        }
        return isBatched ? toReturn : toReturn[0];
    }
}


/**
 * Feature extraction pipeline using no model head. This pipeline extracts the hidden
 * states from the base transformer, which can be used as features in downstream tasks.
 * 
 * **Example:** Run feature extraction with `bert-base-uncased` (without pooling/normalization).
 * ```javascript
 * let extractor = await pipeline('feature-extraction', 'Xenova/bert-base-uncased', { revision: 'default' });
 * let output = await extractor('This is a simple test.');
 * // Tensor {
 * //   type: 'float32',
 * //   data: Float32Array [0.05939924716949463, 0.021655935794115067, ...],
 * //   dims: [1, 8, 768]
 * // }
 * ```
 * 
 * **Example:** Run feature extraction with `bert-base-uncased` (with pooling/normalization).
 * ```javascript
 * let extractor = await pipeline('feature-extraction', 'Xenova/bert-base-uncased', { revision: 'default' });
 * let output = await extractor('This is a simple test.', { pooling: 'mean', normalize: true });
 * // Tensor {
 * //   type: 'float32',
 * //   data: Float32Array [0.03373778983950615, -0.010106077417731285, ...],
 * //   dims: [1, 768]
 * // }
 * ```
 * 
 * **Example:** Calculating embeddings with `sentence-transformers` models.
 * ```javascript
 * let extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
 * let output = await extractor('This is a simple test.', { pooling: 'mean', normalize: true });
 * // Tensor {
 * //   type: 'float32',
 * //   data: Float32Array [0.09094982594251633, -0.014774246141314507, ...],
 * //   dims: [1, 384]
 * // }
 * ```
 */
class FeatureExtractionPipeline extends Pipeline {

    /**
     * Extract the features of the input(s).
     * 
     * @param {string|string[]} texts The input texts
     * @param {Object} options Additional options:
     * @param {string} [options.pooling="none"] The pooling method to use. Can be one of: "none", "mean".
     * @param {boolean} [options.normalize=false] Whether or not to normalize the embeddings in the last dimension.
     * @returns The features computed by the model.
     */
    async _call(texts, {
        pooling = 'none',
        normalize = false,
    } = {}) {
        let [inputs, outputs] = await super._call(texts);

        // TODO: Provide warning to the user that they might be using model which was not exported
        // specifically for feature extraction
        // console.log(this.model.config)
        // console.log(outputs)

        let result = outputs.last_hidden_state ?? outputs.logits;
        if (pooling === 'none') {
            // Skip pooling
        } else if (pooling === 'mean') {
            result = mean_pooling(result, inputs.attention_mask);
        } else {
            throw Error(`Pooling method '${pooling}' not supported.`);
        }

        if (normalize) {
            result = result.normalize(2, -1);
        }

        return result;
    }
}

// TODO
// export class SentenceSimilarityPipeline extends Pipeline {
// }


/**
 * Audio classification pipeline using any `AutoModelForAudioClassification`.
 * This pipeline predicts the class of a raw waveform or an audio file.
 * 
 * **Example:** Perform audio classification.
 * ```javascript
 * let url = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav';
 * let classifier = await pipeline('audio-classification', 'Xenova/wav2vec2-large-xlsr-53-gender-recognition-librispeech');
 * let output = await classifier(url);
 * // [
 * //   { label: 'male', score: 0.9981542229652405 },
 * //   { label: 'female', score: 0.001845747814513743 }
 * // ]
 * ```
 */
class AudioClassificationPipeline extends Pipeline {

    /**
     * Create a new AudioClassificationPipeline.
     * @param {Object} options An object containing the following properties:
     * @param {string} [options.task] The task of the pipeline. Useful for specifying subtasks.
     * @param {PreTrainedModel} [options.model] The model to use.
     * @param {Processor} [options.processor] The processor to use.
     */
    constructor(options) {
        super(options);
    }

    /**
     * Preprocesses the input audio for the AutomaticSpeechRecognitionPipeline.
     * @param {any} audio The audio to be preprocessed.
     * @param {number} sampling_rate The sampling rate of the audio.
     * @returns {Promise<Float32Array>} A promise that resolves to the preprocessed audio data.
     * @private
     */
    async _preprocess(audio, sampling_rate) {
        if (isString(audio)) {
            audio = await read_audio(audio, sampling_rate);
        }

        return audio;
    }

    /**
     * Executes the audio classification task.
     * @param {any} audio The input audio files to be classified.
     * @param {Object} options An optional object containing the following properties:
     * @param {number} [options.topk=5] The number of top predictions to be returned.
     * @returns {Promise<Object[]|Object>} A promise that resolves to an array or object containing the predicted labels and scores.
     */
    async _call(audio, {
        topk = 5
    } = {}) {

        let single = !Array.isArray(audio);
        if (single) {
            // @ts-ignore
            audio = [audio];
        }

        const id2label = this.model.config.id2label;
        const sampling_rate = this.processor.feature_extractor.config.sampling_rate;

        let toReturn = [];
        for (let aud of audio) {
            aud = await this._preprocess(aud, sampling_rate)

            const inputs = await this.processor(aud);
            const output = await this.model(inputs);
            const logits = output.logits[0];

            let scores = getTopItems(softmax(logits.data), topk);

            let vals = scores.map(function (x) {
                return {
                    label: id2label[x[0]],
                    score: x[1],
                }
            });
            if (topk === 1) {
                toReturn.push(...vals);
            } else {
                toReturn.push(vals);
            }
        }
        return !single || topk === 1 ? toReturn : toReturn[0];
    }
}


/**
 * Pipeline that aims at extracting spoken text contained within some audio.
 *
 * **Example:** Transcribe English.
 * ```javascript
 * let url = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav';
 * let transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny.en');
 * let output = await transcriber(url);
 * // { text: " And so my fellow Americans ask not what your country can do for you, ask what you can do for your country." }
 * ```
 * 
 * **Example:** Transcribe English w/ timestamps.
 * ```javascript
 * let url = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav';
 * let transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny.en');
 * let output = await transcriber(url, { return_timestamps: true });
 * // {
 * //   text: " And so my fellow Americans ask not what your country can do for you, ask what you can do for your country."
 * //   chunks: [
 * //     { timestamp: [0, 8],  text: " And so my fellow Americans ask not what your country can do for you" }
 * //     { timestamp: [8, 11], text: " ask what you can do for your country." }
 * //   ]
 * // }
 * ```
 * 
 * **Example:** Transcribe English w/ word-level timestamps.
 * ```javascript
 * let url = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav';
 * let transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny.en', {
 *     revision: 'output_attentions',
 * });
 * let output = await transcriber(url, { return_timestamps: 'word' });
 * // {
 * //   "text": " And so my fellow Americans ask not what your country can do for you ask what you can do for your country.",
 * //   "chunks": [
 * //     { "text": " And", "timestamp": [0, 0.78] },
 * //     { "text": " so", "timestamp": [0.78, 1.06] },
 * //     { "text": " my", "timestamp": [1.06, 1.46] },
 * //     ...
 * //     { "text": " for", "timestamp": [9.72, 9.92] },
 * //     { "text": " your", "timestamp": [9.92, 10.22] },
 * //     { "text": " country.", "timestamp": [10.22, 13.5] }
 * //   ]
 * // }
 * ```
 * 
 * **Example:** Transcribe French.
 * ```javascript
 * let url = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/french-audio.mp3';
 * let transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-small');
 * let output = await transcriber(url, { language: 'french', task: 'transcribe' });
 * // { text: " J'adore, j'aime, je n'aime pas, je déteste." }
 * ```
 * 
 * **Example:** Translate French to English.
 * ```javascript
 * let url = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/french-audio.mp3';
 * let transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-small');
 * let output = await transcriber(url, { language: 'french', task: 'translate' });
 * // { text: " I love, I like, I don't like, I hate." }
 * ```
 * 
 * **Example:** Transcribe/translate audio longer than 30 seconds.
 * ```javascript
 * let url = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/ted_60.wav';
 * let transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny.en');
 * let output = await transcriber(url, { chunk_length_s: 30, stride_length_s: 5 });
 * // { text: " So in college, I was a government major, which means [...] So I'd start off light and I'd bump it up" }
 * ```
 */
class AutomaticSpeechRecognitionPipeline extends Pipeline {

    /**
     * Create a new AutomaticSpeechRecognitionPipeline.
     * @param {Object} options An object containing the following properties:
     * @param {string} [options.task] The task of the pipeline. Useful for specifying subtasks.
     * @param {PreTrainedModel} [options.model] The model to use.
     * @param {PreTrainedTokenizer} [options.tokenizer] The tokenizer to use.
     * @param {Processor} [options.processor] The processor to use.
     */
    constructor(options) {
        super(options);
    }

    /**
     * Preprocesses the input audio for the AutomaticSpeechRecognitionPipeline.
     * @param {any} audio The audio to be preprocessed.
     * @param {number} sampling_rate The sampling rate of the audio.
     * @returns {Promise<Float32Array>} A promise that resolves to the preprocessed audio data.
     * @private
     */
    async _preprocess(audio, sampling_rate) {
        if (isString(audio)) {
            audio = await read_audio(audio, sampling_rate);
        }

        return audio;
    }

    /**
     * @typedef {import('./utils/tensor.js').Tensor} Tensor
     * @typedef {{stride: number[], input_features: Tensor, is_last: boolean, tokens?: number[], token_timestamps?: number[]}} Chunk
     * 
     * @callback ChunkCallback
     * @param {Chunk} chunk The chunk to process.
     */

    /**
     * Asynchronously processes audio and generates text transcription using the model.
     * @param {Float32Array|Float32Array[]} audio The audio to be transcribed. Can be a single Float32Array or an array of Float32Arrays.
     * @param {Object} [kwargs={}] Optional arguments.
     * @param {boolean|'word'} [kwargs.return_timestamps] Whether to return timestamps or not. Default is `false`.
     * @param {number} [kwargs.chunk_length_s] The length of audio chunks to process in seconds. Default is 0 (no chunking).
     * @param {number} [kwargs.stride_length_s] The length of overlap between consecutive audio chunks in seconds. If not provided, defaults to `chunk_length_s / 6`.
     * @param {ChunkCallback} [kwargs.chunk_callback] Callback function to be called with each chunk processed.
     * @param {boolean} [kwargs.force_full_sequences] Whether to force outputting full sequences or not. Default is `false`.
     * @param {string} [kwargs.language] The source language. Default is `null`, meaning it should be auto-detected. Use this to potentially improve performance if the source language is known.
     * @param {string} [kwargs.task] The task to perform. Default is `null`, meaning it should be auto-detected.
     * @param {number[][]} [kwargs.forced_decoder_ids] A list of pairs of integers which indicates a mapping from generation indices to token indices
     * that will be forced before sampling. For example, [[1, 123]] means the second generated token will always be a token of index 123.
     * @returns {Promise<Object>} A Promise that resolves to an object containing the transcription text and optionally timestamps if `return_timestamps` is `true`.
     */
    async _call(audio, kwargs = {}) {
        switch (this.model.config.model_type) {
            case 'whisper':
                return this._call_whisper(audio, kwargs)
            case 'wav2vec2':
                return this._call_wav2vec2(audio, kwargs)
            default:
                throw new Error(`AutomaticSpeechRecognitionPipeline does not support model type '${this.model.config.model_type}'.`)
        }
    }

    /** @private */
    async _call_wav2vec2(audio, kwargs = {}) {
        // TODO use kwargs

        if (kwargs.language) {
            console.warn('`language` parameter is not yet supported for `wav2vec2` models, defaulting to "English".');
        }
        if (kwargs.task) {
            console.warn('`task` parameter is not yet supported for `wav2vec2` models, defaulting to "transcribe".');
        }

        let single = !Array.isArray(audio);
        if (single) {
            // @ts-ignore
            audio = [audio];
        }

        const sampling_rate = this.processor.feature_extractor.config.sampling_rate;

        let toReturn = [];
        for (let aud of audio) {
            aud = await this._preprocess(aud, sampling_rate)

            const inputs = await this.processor(aud);
            const output = await this.model(inputs);
            const logits = output.logits[0];

            const predicted_ids = [];
            for (let item of logits) {
                predicted_ids.push(max(item.data)[1])
            }
            const predicted_sentences = this.tokenizer.decode(predicted_ids)
            toReturn.push({ text: predicted_sentences })
        }
        return single ? toReturn[0] : toReturn;
    }

    /** @private */
    async _call_whisper(audio, kwargs = {}) {
        let return_timestamps = kwargs.return_timestamps ?? false;
        let chunk_length_s = kwargs.chunk_length_s ?? 0;
        let stride_length_s = kwargs.stride_length_s ?? null;
        let chunk_callback = kwargs.chunk_callback ?? null;
        let force_full_sequences = kwargs.force_full_sequences ?? false;

        if (return_timestamps === 'word') {
            kwargs['return_token_timestamps'] = true;
        }

        let language = pop(kwargs, 'language', null);
        let task = pop(kwargs, 'task', null);

        if (language || task || return_timestamps) {
            if (kwargs.forced_decoder_ids) {
                throw new Error("Cannot specify `language`/`task`/`return_timestamps` and `forced_decoder_ids` at the same time.")
            }
            // @ts-ignore
            let decoder_prompt_ids = this.tokenizer.get_decoder_prompt_ids({ language, task, no_timestamps: !return_timestamps })
            if (decoder_prompt_ids.length > 0) {
                kwargs.forced_decoder_ids = decoder_prompt_ids;
            }
        }

        let single = !Array.isArray(audio);
        if (single) {
            // @ts-ignore
            audio = [audio];
        }

        const sampling_rate = this.processor.feature_extractor.config.sampling_rate;
        const time_precision = this.processor.feature_extractor.config.chunk_length / this.model.config.max_source_positions;
        const hop_length = this.processor.feature_extractor.config.hop_length;

        let toReturn = [];
        for (let aud of audio) {
            aud = await this._preprocess(aud, sampling_rate)

            /** @type {Chunk[]} */
            let chunks = [];
            if (chunk_length_s > 0) {
                if (stride_length_s === null) {
                    stride_length_s = chunk_length_s / 6;
                } else if (chunk_length_s <= stride_length_s) {
                    throw Error("`chunk_length_s` must be larger than `stride_length_s`.")
                }

                // TODO support different stride_length_s (for left and right)

                const window = sampling_rate * chunk_length_s;
                const stride = sampling_rate * stride_length_s;
                const jump = window - 2 * stride;
                let offset = 0;

                // Create subarrays of audio with overlaps

                while (offset < aud.length) {
                    let subarr = aud.subarray(offset, offset + window);
                    let feature = await this.processor(subarr);

                    let isFirst = offset === 0;
                    let isLast = offset + jump >= aud.length;
                    chunks.push({
                        stride: [
                            subarr.length,
                            isFirst ? 0 : stride,
                            isLast ? 0 : stride
                        ],
                        input_features: feature.input_features,
                        is_last: isLast
                    })
                    offset += jump;
                }

            } else {
                chunks = [{
                    stride: [aud.length, 0, 0],
                    input_features: (await this.processor(aud)).input_features,
                    is_last: true
                }]
            }

            // Generate for each set of input features
            for (let chunk of chunks) {
                kwargs.num_frames = Math.floor(chunk.stride[0] / hop_length);

                // NOTE: doing sequentially for now
                let data = await this.model.generate(chunk.input_features, kwargs);

                // TODO: Right now we only get top beam
                if (return_timestamps === 'word') {
                    chunk.tokens = data.sequences[0];
                    chunk.token_timestamps = data.token_timestamps.tolist()[0].map(
                        x => round(x, 2)
                    );

                } else {
                    chunk.tokens = data[0];
                }

                // convert stride to seconds
                chunk.stride = chunk.stride.map(x => x / sampling_rate);

                if (chunk_callback !== null) {
                    chunk_callback(chunk)
                }
            }

            // Merge text chunks
            // @ts-ignore
            let [full_text, optional] = this.tokenizer._decode_asr(chunks, {
                time_precision, return_timestamps, force_full_sequences
            });

            toReturn.push({ text: full_text, ...optional })
        }
        return single ? toReturn[0] : toReturn;
    }
}

/**
 * Image To Text pipeline using a `AutoModelForVision2Seq`. This pipeline predicts a caption for a given image.
 * 
 * **Example:** Generate a caption for an image w/ `Xenova/vit-gpt2-image-captioning`.
 * ```javascript
 * let url = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/cats.jpg';
 * let captioner = await pipeline('image-to-text', 'Xenova/vit-gpt2-image-captioning');
 * let output = await captioner(url);
 * // [{ generated_text: 'a cat laying on a couch with another cat' }]
 * ```
 */
class ImageToTextPipeline extends Pipeline {
    /**
     * Create a new ImageToTextPipeline.
     * @param {Object} options An object containing the following properties:
     * @param {string} [options.task] The task of the pipeline. Useful for specifying subtasks.
     * @param {PreTrainedModel} [options.model] The model to use.
     * @param {PreTrainedTokenizer} [options.tokenizer] The tokenizer to use.
     * @param {Processor} [options.processor] The processor to use.
     */
    constructor(options) {
        super(options);
    }

    /**
     * Assign labels to the image(s) passed as inputs.
     * @param {any[]} images The images to be captioned.
     * @param {Object} [generate_kwargs={}] Optional generation arguments.
     * @returns {Promise<Object|Object[]>} A Promise that resolves to an object (or array of objects) containing the generated text(s).
     */
    async _call(images, generate_kwargs = {}) {
        let isBatched = Array.isArray(images);

        images = await prepareImages(images);

        let { pixel_values } = await this.processor(images);

        let toReturn = [];
        for (let batch of pixel_values) {
            batch.dims = [1, ...batch.dims]
            let output = await this.model.generate(batch, generate_kwargs);
            let decoded = this.tokenizer.batch_decode(output, {
                skip_special_tokens: true,
            }).map(x => {
                return { generated_text: x.trim() }
            })
            toReturn.push(decoded);
        }

        return isBatched ? toReturn : toReturn[0];
    }
}

/**
 * Image classification pipeline using any `AutoModelForImageClassification`.
 * This pipeline predicts the class of an image.
 * 
 * **Example:** Classify an image.
 * ```javascript
 * let classifier = await pipeline('image-classification', 'Xenova/vit-base-patch16-224');
 * let url = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/tiger.jpg';
 * let output = await classifier(url);
 * // [
 * //   {label: 'tiger, Panthera tigris', score: 0.632695734500885},
 * // ]
 * ```
 * 
 * **Example:** Classify an image and return top `n` classes.
 * ```javascript
 * let classifier = await pipeline('image-classification', 'Xenova/vit-base-patch16-224');
 * let url = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/tiger.jpg';
 * let output = await classifier(url, { topk: 3 });
 * // [
 * //   { label: 'tiger, Panthera tigris', score: 0.632695734500885 },
 * //   { label: 'tiger cat', score: 0.3634825646877289 },
 * //   { label: 'lion, king of beasts, Panthera leo', score: 0.00045060308184474707 },
 * // ]
 * ```
 * 
 * **Example:** Classify an image and return all classes.
 * ```javascript
 * let classifier = await pipeline('image-classification', 'Xenova/vit-base-patch16-224');
 * let url = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/tiger.jpg';
 * let output = await classifier(url, { topk: 0 });
 * // [
 * //   {label: 'tiger, Panthera tigris', score: 0.632695734500885},
 * //   {label: 'tiger cat', score: 0.3634825646877289},
 * //   {label: 'lion, king of beasts, Panthera leo', score: 0.00045060308184474707},
 * //   {label: 'jaguar, panther, Panthera onca, Felis onca', score: 0.00035465499968267977},
 * //   ...
 * // ]
 * ```
 */
class ImageClassificationPipeline extends Pipeline {
    /**
     * Create a new ImageClassificationPipeline.
     * @param {Object} options An object containing the following properties:
     * @param {string} [options.task] The task of the pipeline. Useful for specifying subtasks.
     * @param {PreTrainedModel} [options.model] The model to use.
     * @param {Processor} [options.processor] The processor to use.
     */
    constructor(options) {
        super(options);
    }

    /**
     * Classify the given images.
     * @param {any} images The images to classify.
     * @param {Object} options The options to use for classification.
     * @param {number} [options.topk=1] The number of top results to return.
     * @returns {Promise<any>} The top classification results for the images.
     */
    async _call(images, {
        topk = 1
    } = {}) {
        let isBatched = Array.isArray(images);
        images = await prepareImages(images);

        let { pixel_values } = await this.processor(images);
        let output = await this.model({ pixel_values });

        let id2label = this.model.config.id2label;
        let toReturn = [];
        for (let batch of output.logits) {
            let scores = getTopItems(softmax(batch.data), topk);

            let vals = scores.map(function (x) {
                return {
                    label: id2label[x[0]],
                    score: x[1],
                }
            });
            if (topk === 1) {
                toReturn.push(...vals);
            } else {
                toReturn.push(vals);
            }
        }

        return isBatched || topk === 1 ? toReturn : toReturn[0];
    }

}

/**
 * Image segmentation pipeline using any `AutoModelForXXXSegmentation`.
 * This pipeline predicts masks of objects and their classes.
 * 
 * **Example:** Perform image segmentation with `Xenova/detr-resnet-50-panoptic`.
 * ```javascript
 * let url = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/cats.jpg';
 * let segmenter = await pipeline('image-segmentation', 'Xenova/detr-resnet-50-panoptic');
 * let output = await segmenter(url);
 * // [
 * //   { label: 'remote', score: 0.9984649419784546, mask: RawImage { ... } },
 * //   { label: 'cat', score: 0.9994316101074219, mask: RawImage { ... } }
 * // ]
 * ```
 */
class ImageSegmentationPipeline extends Pipeline {
    /**
     * Create a new ImageSegmentationPipeline.
     * @param {Object} options An object containing the following properties:
     * @param {string} [options.task] The task of the pipeline. Useful for specifying subtasks.
     * @param {PreTrainedModel} [options.model] The model to use.
     * @param {Processor} [options.processor] The processor to use.
     */
    constructor(options) {
        super(options);

        this.subtasks_mapping = {
            // Mapping of subtasks to their corresponding post-processing function names.
            panoptic: 'post_process_panoptic_segmentation',
            instance: 'post_process_instance_segmentation',
            semantic: 'post_process_semantic_segmentation'
        }
    }

    /**
     * Segment the input images.
     * @param {Array} images The input images.
     * @param {Object} options The options to use for segmentation.
     * @param {number} [options.threshold=0.5] Probability threshold to filter out predicted masks.
     * @param {number} [options.mask_threshold=0.5] Threshold to use when turning the predicted masks into binary values.
     * @param {number} [options.overlap_mask_area_threshold=0.8] Mask overlap threshold to eliminate small, disconnected segments.
     * @param {null|string} [options.subtask=null] Segmentation task to be performed. One of [`panoptic`, `instance`, and `semantic`], depending on model capabilities. If not set, the pipeline will attempt to resolve (in that order).
     * @param {Array} [options.label_ids_to_fuse=null] List of label ids to fuse. If not set, do not fuse any labels.
     * @param {Array} [options.target_sizes=null] List of target sizes for the input images. If not set, use the original image sizes.
     * @returns {Promise<Array>} The annotated segments.
     */
    async _call(images, {
        threshold = 0.5,
        mask_threshold = 0.5,
        overlap_mask_area_threshold = 0.8,
        label_ids_to_fuse = null,
        target_sizes = null,
        subtask = null, // TODO use
    } = {}) {
        let isBatched = Array.isArray(images);

        if (isBatched && images.length !== 1) {
            throw Error("Image segmentation pipeline currently only supports a batch size of 1.");
        }

        images = await prepareImages(images);
        let imageSizes = images.map(x => [x.height, x.width]);

        let { pixel_values, pixel_mask } = await this.processor(images);
        let output = await this.model({ pixel_values, pixel_mask });

        let fn = null;
        if (subtask !== null) {
            fn = this.subtasks_mapping[subtask];
        } else {
            for (let [task, func] of Object.entries(this.subtasks_mapping)) {
                if (func in this.processor.feature_extractor) {
                    fn = this.processor.feature_extractor[func].bind(this.processor.feature_extractor);
                    subtask = task;
                    break;
                }
            }
        }

        // add annotations
        let annotation = [];

        if (subtask === 'panoptic' || subtask === 'instance') {

            let processed = fn(
                output,
                threshold,
                mask_threshold,
                overlap_mask_area_threshold,
                label_ids_to_fuse,
                target_sizes ?? imageSizes, // TODO FIX?
            )[0];

            let segmentation = processed.segmentation;
            let id2label = this.model.config.id2label;

            for (let segment of processed.segments_info) {
                let maskData = new Uint8ClampedArray(segmentation.data.length);
                for (let i = 0; i < segmentation.data.length; ++i) {
                    if (segmentation.data[i] === segment.id) {
                        maskData[i] = 255;
                    }
                }

                let mask = new RawImage(maskData, segmentation.dims[1], segmentation.dims[0], 1)

                annotation.push({
                    score: segment.score,
                    label: id2label[segment.label_id],
                    mask: mask
                })
            }

        } else if (subtask === 'semantic') {
            throw Error(`semantic segmentation not yet supported.`);

        } else {
            throw Error(`Subtask ${subtask} not supported.`);
        }

        return annotation;
    }
}


/**
 * Zero shot image classification pipeline. This pipeline predicts the class of
 * an image when you provide an image and a set of `candidate_labels`.
 * 
 * **Example:** Zero shot image classification w/ `Xenova/clip-vit-base-patch32`.
 * ```javascript
 * let classifier = await pipeline('zero-shot-image-classification', 'Xenova/clip-vit-base-patch32');
 * let url = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/tiger.jpg';
 * let output = await classifier(url, ['tiger', 'horse', 'dog']);
 * // [
 * //   { score: 0.9993917942047119, label: 'tiger' },
 * //   { score: 0.0003519294841680676, label: 'horse' },
 * //   { score: 0.0002562698791734874, label: 'dog' }
 * // ]
 * ```
 */
class ZeroShotImageClassificationPipeline extends Pipeline {

    /**
     * Create a new ZeroShotImageClassificationPipeline.
     * @param {Object} options An object containing the following properties:
     * @param {string} [options.task] The task of the pipeline. Useful for specifying subtasks.
     * @param {PreTrainedModel} [options.model] The model to use.
     * @param {PreTrainedTokenizer} [options.tokenizer] The tokenizer to use.
     * @param {Processor} [options.processor] The processor to use.
     */
    constructor(options) {
        super(options);
    }

    /**
     * Classify the input images with candidate labels using a zero-shot approach.
     * @param {Array} images The input images.
     * @param {string[]} candidate_labels The candidate labels.
     * @param {Object} options The options for the classification.
     * @param {string} [options.hypothesis_template] The hypothesis template to use for zero-shot classification. Default: "This is a photo of {}".
     * @returns {Promise<any>} An array of classifications for each input image or a single classification object if only one input image is provided.
     */
    async _call(images, candidate_labels, {
        hypothesis_template = "This is a photo of {}"
    } = {}) {
        let isBatched = Array.isArray(images);
        images = await prepareImages(images);

        // Insert label into hypothesis template 
        let texts = candidate_labels.map(
            x => hypothesis_template.replace('{}', x)
        );

        // Run tokenization
        let text_inputs = this.tokenizer(texts, {
            padding: true,
            truncation: true
        });

        // Run processor
        let { pixel_values } = await this.processor(images);

        // Run model with both text and pixel inputs
        let output = await this.model({ ...text_inputs, pixel_values });

        // Compare each image with each candidate label
        let toReturn = [];
        for (let batch of output.logits_per_image) {
            // Compute softmax per image
            let probs = softmax(batch.data);

            toReturn.push([...probs].map((x, i) => {
                return {
                    score: x,
                    label: candidate_labels[i]
                }
            }));
        }

        return isBatched ? toReturn : toReturn[0];
    }
}

/**
 * Object detection pipeline using any `AutoModelForObjectDetection`.
 * This pipeline predicts bounding boxes of objects and their classes.
 * 
 * **Example:** Run object-detection with `facebook/detr-resnet-50`.
 * ```javascript
 * let img = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/cats.jpg';
 * 
 * let detector = await pipeline('object-detection', 'Xenova/detr-resnet-50');
 * let output = await detector(img, { threshold: 0.9 });
 * // [{
 * //   "score": 0.9976370930671692,
 * //   "label": "remote",
 * //   "box": { "xmin": 31, "ymin": 68, "xmax": 190, "ymax": 118 }
 * // },
 * // ...
 * // {
 * //   "score": 0.9984092116355896,
 * //   "label": "cat",
 * //   "box": { "xmin": 331, "ymin": 19, "xmax": 649, "ymax": 371 }
 * // }]
 * ```
 */
class ObjectDetectionPipeline extends Pipeline {
    /**
     * Create a new ObjectDetectionPipeline.
     * @param {Object} options An object containing the following properties:
     * @param {string} [options.task] The task of the pipeline. Useful for specifying subtasks.
     * @param {PreTrainedModel} [options.model] The model to use.
     * @param {Processor} [options.processor] The processor to use.
     */
    constructor(options) {
        super(options);
    }

    /**
     * Detect objects (bounding boxes & classes) in the image(s) passed as inputs.
     * @param {any[]} images The input images.
     * @param {Object} options The options for the object detection.
     * @param {number} [options.threshold=0.9] The threshold used to filter boxes by score.
     * @param {boolean} [options.percentage=false] Whether to return the boxes coordinates in percentage (true) or in pixels (false).
     */
    async _call(images, {
        threshold = 0.9,
        percentage = false,
    } = {}) {
        let isBatched = Array.isArray(images);

        if (isBatched && images.length !== 1) {
            throw Error("Object detection pipeline currently only supports a batch size of 1.");
        }
        images = await prepareImages(images);

        let imageSizes = percentage ? null : images.map(x => [x.height, x.width]);

        let { pixel_values, pixel_mask } = await this.processor(images);
        let output = await this.model({ pixel_values, pixel_mask });

        // @ts-ignore
        let processed = this.processor.feature_extractor.post_process_object_detection(output, threshold, imageSizes);

        // Add labels
        let id2label = this.model.config.id2label;

        // Format output
        const result = processed.map(batch => {
            return batch.boxes.map((box, i) => {
                return {
                    score: batch.scores[i],
                    label: id2label[batch.classes[i]],
                    box: this._get_bounding_box(box, !percentage),
                }
            })
        })

        return isBatched ? result : result[0];
    }

    /**
     * Helper function to convert list [xmin, xmax, ymin, ymax] into object { "xmin": xmin, ... }
     * @param {number[]} box The bounding box as a list.
     * @param {boolean} asInteger Whether to cast to integers.
     * @returns {Object} The bounding box as an object.
     * @private
     */
    _get_bounding_box(box, asInteger) {
        if (asInteger) {
            box = box.map(x => x | 0);
        }
        const [xmin, ymin, xmax, ymax] = box;

        return { xmin, ymin, xmax, ymax };
    }
}

const SUPPORTED_TASKS = {
    "text-classification": {
        "tokenizer": AutoTokenizer,
        "pipeline": TextClassificationPipeline,
        "model": AutoModelForSequenceClassification,
        "default": {
            // TODO: replace with original
            // "model": "distilbert-base-uncased-finetuned-sst-2-english",
            "model": "Xenova/distilbert-base-uncased-finetuned-sst-2-english",
        },
        "type": "text",
    },
    "token-classification": {
        "tokenizer": AutoTokenizer,
        "pipeline": TokenClassificationPipeline,
        "model": AutoModelForTokenClassification,
        "default": {
            // TODO: replace with original
            // "model": "Davlan/bert-base-multilingual-cased-ner-hrl",
            "model": "Xenova/bert-base-multilingual-cased-ner-hrl",
        },
        "type": "text",
    },
    "question-answering": {
        "tokenizer": AutoTokenizer,
        "pipeline": QuestionAnsweringPipeline,
        "model": AutoModelForQuestionAnswering,
        "default": {
            // TODO: replace with original
            // "model": "distilbert-base-cased-distilled-squad",
            "model": "Xenova/distilbert-base-cased-distilled-squad",
        },
        "type": "text",
    },

    "fill-mask": {
        "tokenizer": AutoTokenizer,
        "pipeline": FillMaskPipeline,
        "model": AutoModelForMaskedLM,
        "default": {
            // TODO: replace with original
            // "model": "bert-base-uncased",
            "model": "Xenova/bert-base-uncased",
        },
        "type": "text",
    },
    "summarization": {
        "tokenizer": AutoTokenizer,
        "pipeline": SummarizationPipeline,
        "model": AutoModelForSeq2SeqLM,
        "default": {
            // TODO: replace with original
            // "model": "sshleifer/distilbart-cnn-6-6",
            "model": "Xenova/distilbart-cnn-6-6",
        },
        "type": "text",
    },
    "translation": {
        "tokenizer": AutoTokenizer,
        "pipeline": TranslationPipeline,
        "model": AutoModelForSeq2SeqLM,
        "default": {
            // TODO: replace with original
            // "model": "t5-small",
            "model": "Xenova/t5-small",
        },
        "type": "text",
    },
    "text2text-generation": {
        "tokenizer": AutoTokenizer,
        "pipeline": Text2TextGenerationPipeline,
        "model": AutoModelForSeq2SeqLM,
        "default": {
            // TODO: replace with original
            // "model": "google/flan-t5-small",
            "model": "Xenova/flan-t5-small",
        },
        "type": "text",
    },
    "text-generation": {
        "tokenizer": AutoTokenizer,
        "pipeline": TextGenerationPipeline,
        "model": AutoModelForCausalLM,
        "default": {
            // TODO: replace with original
            // "model": "gpt2",
            "model": "Xenova/gpt2",
        },
        "type": "text",
    },
    "zero-shot-classification": {
        "tokenizer": AutoTokenizer,
        "pipeline": ZeroShotClassificationPipeline,
        "model": AutoModelForSequenceClassification,
        "default": {
            // TODO: replace with original
            // "model": "typeform/distilbert-base-uncased-mnli",
            "model": "Xenova/distilbert-base-uncased-mnli",
        },
        "type": "text",
    },
    "audio-classification": {
        "pipeline": AudioClassificationPipeline,
        "model": AutoModelForAudioClassification,
        "processor": AutoProcessor,
        "default": {
            // TODO: replace with original
            // "model": "superb/wav2vec2-base-superb-ks",
            "model": "Xenova/wav2vec2-base-superb-ks",
        },
        "type": "audio",
    },
    "automatic-speech-recognition": {
        "tokenizer": AutoTokenizer,
        "pipeline": AutomaticSpeechRecognitionPipeline,
        "model": [AutoModelForSeq2SeqLM, AutoModelForCTC],
        "processor": AutoProcessor,
        "default": {
            // TODO: replace with original
            // "model": "openai/whisper-tiny.en",
            "model": "Xenova/whisper-tiny.en",
        },
        "type": "multimodal",
    },

    "image-to-text": {
        "tokenizer": AutoTokenizer,
        "pipeline": ImageToTextPipeline,
        "model": AutoModelForVision2Seq,
        "processor": AutoProcessor,
        "default": {
            // TODO: replace with original
            // "model": "nlpconnect/vit-gpt2-image-captioning",
            "model": "Xenova/vit-gpt2-image-captioning",
        },
        "type": "multimodal",
    },

    "image-classification": {
        // no tokenizer
        "pipeline": ImageClassificationPipeline,
        "model": AutoModelForImageClassification,
        "processor": AutoProcessor,
        "default": {
            // TODO: replace with original
            // "model": "google/vit-base-patch16-224",
            "model": "Xenova/vit-base-patch16-224",
        },
        "type": "multimodal",
    },

    "image-segmentation": {
        // no tokenizer
        "pipeline": ImageSegmentationPipeline,
        "model": AutoModelForImageSegmentation,
        "processor": AutoProcessor,
        "default": {
            // TODO: replace with original
            // "model": "facebook/detr-resnet-50-panoptic",
            "model": "Xenova/detr-resnet-50-panoptic",
        },
        "type": "multimodal",
    },

    "zero-shot-image-classification": {
        // no tokenizer
        "tokenizer": AutoTokenizer,
        "pipeline": ZeroShotImageClassificationPipeline,
        "model": AutoModel,
        "processor": AutoProcessor,
        "default": {
            // TODO: replace with original
            // "model": "openai/clip-vit-base-patch32",
            "model": "Xenova/clip-vit-base-patch32",
        },
        "type": "multimodal",
    },

    "object-detection": {
        // no tokenizer
        "pipeline": ObjectDetectionPipeline,
        "model": AutoModelForObjectDetection,
        "processor": AutoProcessor,
        "default": {
            // TODO: replace with original
            // "model": "facebook/detr-resnet-50",
            "model": "Xenova/detr-resnet-50",
        },
        "type": "multimodal",
    },

    // This task serves as a useful interface for dealing with sentence-transformers (https://huggingface.co/sentence-transformers).
    "feature-extraction": {
        "tokenizer": AutoTokenizer,
        "pipeline": FeatureExtractionPipeline,
        "model": AutoModel,
        "default": {
            // TODO: replace with original
            // "model": "sentence-transformers/all-MiniLM-L6-v2",
            "model": "Xenova/all-MiniLM-L6-v2",
        },
        "type": "text",
    },
}


const TASK_ALIASES = {
    "sentiment-analysis": "text-classification",
    "ner": "token-classification",
    "vqa": "visual-question-answering",
    "asr": "automatic-speech-recognition",

    // Add for backwards compatibility
    "embeddings": "feature-extraction",
}

/**
 * @typedef {import('./utils/hub.js').PretrainedOptions} PretrainedOptions
 */

/**
 * Utility factory method to build a [`Pipeline`] object.
 *
 * @param {string} task The task defining which pipeline will be returned. Currently accepted tasks are:
 *  - `"audio-classification"`: will return a `AudioClassificationPipeline`.
 *  - `"automatic-speech-recognition"`: will return a `AutomaticSpeechRecognitionPipeline`.
 *  - `"feature-extraction"`: will return a `FeatureExtractionPipeline`.
 *  - `"fill-mask"`: will return a `FillMaskPipeline`.
 *  - `"image-classification"`: will return a `ImageClassificationPipeline`.
 *  - `"image-segmentation"`: will return a `ImageSegmentationPipeline`.
 *  - `"image-to-text"`: will return a `ImageToTextPipeline`.
 *  - `"object-detection"`: will return a `ObjectDetectionPipeline`.
 *  - `"question-answering"`: will return a `QuestionAnsweringPipeline`.
 *  - `"summarization"`: will return a `SummarizationPipeline`.
 *  - `"text2text-generation"`: will return a `Text2TextGenerationPipeline`.
 *  - `"text-classification"` (alias "sentiment-analysis" available): will return a `TextClassificationPipeline`.
 *  - `"text-generation"`: will return a `TextGenerationPipeline`.
 *  - `"token-classification"` (alias "ner" available): will return a `TokenClassificationPipeline`.
 *  - `"translation"`: will return a `TranslationPipeline`.
 *  - `"translation_xx_to_yy"`: will return a `TranslationPipeline`.
 *  - `"zero-shot-classification"`: will return a `ZeroShotClassificationPipeline`.
 *  - `"zero-shot-image-classification"`: will return a `ZeroShotImageClassificationPipeline`.
 * @param {string} [model=null] The name of the pre-trained model to use. If not specified, the default model for the task will be used.
 * @param {PretrainedOptions} [options] Optional parameters for the pipeline.
 * @returns {Promise<Pipeline>} A Pipeline object for the specified task.
 * @throws {Error} If an unsupported pipeline is requested.
 */
async function pipeline(
    task,
    model = null,
    {
        quantized = true,
        progress_callback = null,
        config = null,
        cache_dir = null,
        local_files_only = false,
        revision = 'main',
    } = {}
) {
    // Helper method to construct pipeline

    // Apply aliases
    task = TASK_ALIASES[task] ?? task;

    // Get pipeline info
    let pipelineInfo = SUPPORTED_TASKS[task.split('_', 1)[0]];
    if (!pipelineInfo) {
        throw Error(`Unsupported pipeline: ${task}. Must be one of [${Object.keys(SUPPORTED_TASKS)}]`)
    }

    // Use model if specified, otherwise, use default
    if (!model) {
        model = pipelineInfo.default.model
        console.log(`No model specified. Using default model: "${model}".`);
    }

    let pretrainedOptions = {
        quantized,
        progress_callback,
        config,
        cache_dir,
        local_files_only,
        revision,
    }

    const classes = new Map([
        ['tokenizer', pipelineInfo.tokenizer],
        ['model', pipelineInfo.model],
        ['processor', pipelineInfo.processor],
    ]);

    // Load model, tokenizer, and processor (if they exist)
    let results = await loadItems(classes, model, pretrainedOptions);
    results.task = task;

    dispatchCallback(progress_callback, {
        'status': 'ready',
        'task': task,
        'model': model,
    });

    let pipelineClass = pipelineInfo.pipeline;
    return new pipelineClass(results);
}


/**
 * Helper function to get applicable model, tokenizer, or processor classes for a given model.
 * @param {Map<string, any>} mapping The mapping of names to classes, arrays of classes, or null.
 * @param {string} model The name of the model to load.
 * @param {PretrainedOptions} pretrainedOptions The options to pass to the `from_pretrained` method.
 * @private
 */
async function loadItems(mapping, model, pretrainedOptions) {

    const result = Object.create(null);

    /**@type {Promise[]} */
    const promises = [];
    for (let [name, cls] of mapping.entries()) {
        if (!cls) continue;

        /**@type {Promise} */
        let promise;
        if (Array.isArray(cls)) {
            promise = new Promise(async (resolve, reject) => {
                let e;
                for (let c of cls) {
                    try {
                        resolve(await c.from_pretrained(model, pretrainedOptions));
                        return;
                    } catch (err) {
                        e = err;
                    }
                }
                reject(e);
            })
        } else {
            promise = cls.from_pretrained(model, pretrainedOptions);
        }

        result[name] = promise;
        promises.push(promise);
    }

    // Wait for all promises to resolve (in parallel)
    await Promise.all(promises);

    // Then assign to result
    for (let [name, promise] of Object.entries(result)) {
        result[name] = await promise;
    }

    return result;
}
;// CONCATENATED MODULE: ./node_modules/@xenova/transformers/src/transformers.js
// @ts-nocheck

/**
 * @file Entry point for the Transformers.js library. Only the exports from this file
 * are available to the end user, and are grouped as follows:
 * 
 * 1. [Pipelines](./pipelines)
 * 2. [Environment variables](./env)
 * 3. [Models](./models)
 * 4. [Tokenizers](./tokenizers)
 * 5. [Processors](./processors)
 * 
 * @module transformers
 */














/***/ })

}]);