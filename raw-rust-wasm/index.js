async function start() {
  const wasm = await WebAssembly.instantiateStreaming(fetch("./main.wasm"));
  const add = wasm.instance.exports.add;
  const sub = wasm.instance.exports.sub;
  const mul = wasm.instance.exports.mul;
  const div = wasm.instance.exports.div;
  const countPrimeRust = wasm.instance.exports.printPrime;
  window.add = () => {
    const a = document.getElementById("input1").value;
    const b = document.getElementById("input2").value;
    document.getElementById("output1").innerText = add(a, b);
  };
  window.sub = () => {
    const a = document.getElementById("input1").value;
    const b = document.getElementById("input2").value;
    document.getElementById("output1").innerText = sub(a, b);
  };
  window.mul = () => {
    const a = document.getElementById("input1").value;
    const b = document.getElementById("input2").value;
    document.getElementById("output1").innerText = mul(a, b);
  };
  window.div = () => {
    const a = document.getElementById("input1").value;
    const b = document.getElementById("input2").value;
    document.getElementById("output1").innerText = div(a, b);
  };
  window.prime = () => {
    const n = parseInt(document.getElementById("input3").value);
    const rustStart = performance.now();
    const rustResult = countPrimeRust(n);
    const rustEnd = performance.now();
    const rustTime = rustEnd - rustStart;
    const jsStart = performance.now();
    const jsResult = countPrimeJavascript(n);
    const jsEnd = performance.now();
    const jsTime = jsEnd - jsStart;
    console.log("Rust => ", rustResult);
    console.log("JavaScript => ", jsResult);
    document.getElementById("output2").innerText = rustTime.toFixed(2) + " ms";
    document.getElementById("output3").innerText = jsTime.toFixed(2) + " ms";
  };
}

function countPrimeJavascript(n) {
  let count = 0;
  for (let i = 0; i < n; i++) {
    if (isPrime(i)) count++;
  }
  return count;
}
function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  let i = 5;
  while (i * i <= n) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
    i += 6;
  }
  return true;
}
start().catch(console.error);
