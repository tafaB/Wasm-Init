use wasm_bindgen::prelude::*;
fn is_prime(n: i32) -> bool {
    if n <= 1 {
        return false;
    }
    for i in 2..n {
        if n % i == 0 {
            return false;
        }
    }
    true
}
#[wasm_bindgen]
pub fn count_primes_rust(n: i32) -> i32 {
    let mut count = 0;
    for i in 2..n {
        if is_prime(i) {
            count += 1;
        }
    }
    count
}
#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
