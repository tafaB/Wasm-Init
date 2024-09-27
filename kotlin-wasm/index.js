async function start() {
  const wasm = await WebAssembly.instantiateStreaming(fetch("./composeApp.wasm"));
  const sumIntegers = wasm.instance.exports.sumIntegers;
  const countPrimeKotlin = wasm.instance.exports.countPrimeKotlin;
  console.log("START : ",sumIntegers(34,35));
  window.prime = () => {
    const n = parseInt(document.getElementById("input1").value);
    const kotlinStart = performance.now();
    const kotlinResult = countPrimeKotlin(n);
    const kotlinEnd = performance.now();
    const kotlinTime = kotlinEnd - kotlinStart;
    const jsStart = performance.now();
    const jsResult = countPrimeJavascript(n);
    const jsEnd = performance.now();
    const jsTime = jsEnd - jsStart;
    console.log("Kotlin => ", kotlinResult);
    console.log("JavaScript => ", jsResult);
    document.getElementById("outputKotlin").innerText = kotlinTime.toFixed(2) + " ms";
    document.getElementById("outputJs").innerText = jsTime.toFixed(2) + " ms";
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
