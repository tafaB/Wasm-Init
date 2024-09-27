# WebAssembly
  - a simple machine model and executable format
    => it is designed to be portable, compact, and executable at/near native speed

  - as a programming language it is composed of two formats that represent the same 
    structures in different ways:
      1. the **.wat** (Web Assembly Text) text format = a human-readable form ≈ LISP
      2. the **.wasm** binary format which is intended for consumption by virtual machines
  - ## Memory:
    - WebAssembly has a linear memory model that is a contiguous array of bytes
    - the memory is divided into pages, each page is 64KB
    - the memory is accessible by the `memory` object in the WebAssembly module
    - the memory is shared between the host and the WebAssembly module
    - the memory is resizable
    - the memory is garbage collected
