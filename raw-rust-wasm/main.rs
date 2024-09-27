// COUNT PRIME
fn is_prime(n: i32) -> bool {
    if n <= 1 {
        return false;
    }
    if n <= 3 {
        return true;
    }
    if n % 2 == 0 || n % 3 == 0 {
        return false;
    }
    let mut i = 5;
    while i * i <= n {
        if n % i == 0 || n % (i + 2) == 0 {
            return false;
        }
        i += 6;
    }
    return true;
}
#[no_mangle]
pub extern "C" fn printPrime(n: i32) -> i32{
    let mut ans : i32 = 0;
    for i in 0..n {
        if is_prime(i) { ans+=1; }
    }
    return ans;
}
// CALCULATOR
#[no_mangle]
pub extern "C" fn add(a: i32, b: i32) -> i32 {
    return a + b;
}
#[no_mangle]
pub extern "C" fn sub(a: i32, b: i32) -> i32 {
    return a - b;
}
#[no_mangle]
pub extern "C" fn mul(a: i32, b: i32) -> i32 {
    return a * b;
}
#[no_mangle]
pub extern "C" fn div(a: i32, b: i32) -> i32 {
    return a / b;
}
fn main() {}
