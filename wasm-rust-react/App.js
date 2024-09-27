import assert from 'assert';
import React, { useEffect, useState } from 'react';
import init, { add, count_primes_rust } from "wasm-lib";
import rustIcon from './icons/rust.svg';
import jsIcon from './icons/logo-javascript.svg';

function isPrime(num) {
  if (num < 2) {
    return false;
  }
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}
function count_primes_js(n) {
  let count = 0;
  for (let i = 2; i < n; i++) {
    if (isPrime(i)) {
      count++;
    }
  }
  return count;
}

function App() {
  const [ans, setAns] = useState(0);
  const [rustRes, setRustRes] = useState("");
  const [jsRes, setJsRes] = useState("");

  useEffect(() => {
    init().then(() => {
    }).catch(console.error);
  }, [])

  const calc = () => {
    const num1 = document.getElementById("num1").value;
    const num2 = document.getElementById("num2").value;
    setAns(add(num1, num2));
  }

  const compPrimeChecking = () => {
    const num3 = document.getElementById("num3").value;
    const start = performance.now();
    const a = count_primes_rust(num3);
    const end = performance.now();
    setRustRes(end - start);

    const startJs = performance.now();
    const b = count_primes_js(num3);
    const endJs = performance.now();
    setJsRes(endJs - startJs);

    assert.equal(a, b);
  }

  return (
    <div className="">
      <h1 className="text-4xl text-center">WebAssembly from me</h1>
      <hr className="my-10" />
      <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl">1. ADDITION</h1>

      <div className="join m-10">
        <input id="num1" type="number" className="input input-bordered join-item" placeholder="Enter First Number" />
        <input id="num2" type="number" className="input input-bordered join-item" placeholder="Enter Second Number" />
        <p className='bg-primary flex items-center justify-center text-primary-content w-20'>{ans}</p>
        <button className="btn join-item rounded-r-full" onClick={calc}>Check</button>
      </div>

    </div>

    <hr className="my-10" />
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl">2. PRIME NUMBER CHECKING</h1>

      <div className="join m-10">
        <input id="num3" type="number" className="input input-bordered join-item" placeholder="Enter Unitl Which Prime Numbers to be Calculated" />
        <button className="btn join-item rounded-r-full" onClick={compPrimeChecking}>Check</button>
      </div>

      <div className="stats bg-primary text-primary-content">
        <div className="stat">
          <div className="stat-title">
            <img src={rustIcon} alt="rustIcon" className='w-20 h-20' />
          </div>
          <div className="stat-value">{rustRes}</div>
        </div>
        <div className="stat">
          <div className="stat-title">
            <img src={jsIcon} alt="jsIcon" className='w-20 h-20' />
          </div>
          <div className="stat-value">{jsRes}</div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
