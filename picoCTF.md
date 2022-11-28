# picoCTF
## Some Assembly Required 2

This challenge is a cross between Web and Binary Exploitation. It deals with obfuscated JavaScript code that interacts with WebAssembly. 

We are presented with a fairly simple website. It has a single textbox and a submit button where we can verify the correctness of our flag. Looking at the source code, clicking the submit button leads to a method called `onButtonPress()`.

```html
<button onclick="onButtonPress()">Submit</button>
```

However, the attached JavaScript file that has `onButtonPress()` is obfuscated:

```js
function onButtonPress() {
    const _0x50ea62 = _0x5c00;
    let _0x5f4170 = document[_0x50ea62(0xd8)](_0x50ea62(0xda))[_0x50ea62(0xc5)];
    for (let _0x19d3ca = 0x0; _0x19d3ca < _0x5f4170['length']; _0x19d3ca++) {
        exports[_0x50ea62(0xc4)](_0x5f4170[_0x50ea62(0xd1)](_0x19d3ca), _0x19d3ca);
    }
    exports['copy_char'](0x0, _0x5f4170[_0x50ea62(0xd7)]),
    exports[_0x50ea62(0xca)]() == 0x1 ? document['getElementById'](_0x50ea62(0xd3))[_0x50ea62(0xd0)] = _0x50ea62(0xce) : document[_0x50ea62(0xd8)](_0x50ea62(0xd3))['innerHTML'] = _0x50ea62(0xd5);
}
```

However, it's evident that this code is iterating through each character in the textbox (reference to `getElementById` and `length`) and passing it into some function called `copy_char`. 

Looking at the WASM code, we are presented with the function `copy_char`

```wasm
(func $copy_char (;3;) (export "copy_char") (param $var0 i32) (param $var1 i32)
    (local $var2 i32)
    (local $var3 i32)
    (local $var4 i32)
    (local $var5 i32)
    (local $var6 i32)
    (local $var7 i32)
    (local $var8 i32)
    (local $var9 i32)
    (local $var10 i32)
    global.get $global0
    local.set $var2
    i32.const 16
    local.set $var3
    local.get $var2
    local.get $var3
    i32.sub
    local.set $var4
    local.get $var4
    local.get $var0
    i32.store offset=12
    local.get $var4
    local.get $var1
    i32.store offset=8
    local.get $var4
    i32.load offset=12
    local.set $var5
    block $label0
      local.get $var5
      i32.eqz
      br_if $label0
      local.get $var4
      i32.load offset=12
      local.set $var6
      i32.const 8
      local.set $var7
      local.get $var6
      local.get $var7
      i32.xor
      local.set $var8
      local.get $var4
      local.get $var8
      i32.store offset=12
    end $label0
    local.get $var4
    i32.load offset=12
    local.set $var9
    local.get $var4
    i32.load offset=8
    local.set $var10
    local.get $var10
    local.get $var9
    i32.store8 offset=1072
    return
  )
```
and a random string variable:

```wasm
(data (i32.const 1024) "xakgK\5cNs>n;jl90;9:mjn9m<0n9::0::881<00?>u\00\00")
```

Going step-by-step in the `copy_char` function, we see that it takes the character in `$var0`, `XOR`'s it with `8`, and puts it in `$var1`:

```wasm
i32.const 8
local.set $var7
local.get $var6
local.get $var7
i32.xor
```

`XOR` ing the string `"xakgK\5cNs>n;jl90;9:mjn9m<0n9::0::881<00?>u\00\00"` with `8` yields: 
```
picoC\rkF{6f3bd18312ebf1e48f12282200948876}\x08\x08
```

which is our flag!


