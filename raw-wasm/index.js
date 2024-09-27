async function start() {
  const wasm = await WebAssembly.instantiateStreaming(fetch("./hello.wasm"));
  const val = wasm.instance.exports.hello(34,35);
  console.log(val);
}
start().catch(console.error);
