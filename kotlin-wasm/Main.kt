package wasm.project.demo

import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.window.ComposeViewport
import kotlinx.browser.document

@OptIn(ExperimentalJsExport::class)
@JsExport
fun sumIntegers(a:Int, b:Int):Int {
    return a+b;
}

fun isPrime(n: Int): Boolean {
    if (n<=1) return false;
    if (n<=3) return true;
    if (n%2==0 || n%3==0) return false;
    var i=5;
    while (i*i<=n) {
        if (n%i==0 || n%(i+2) == 0) return false;
        i+=6;
    }
    return true;
}

@OptIn(ExperimentalJsExport::class)
@JsExport
fun countPrimeKotlin(n:Int):Int {
    var count = 0;
    for (i in 0..<n) {
        if (isPrime(i)) {
            count++;
        }
    }
    return count;
}


//@OptIn(ExperimentalComposeUiApi::class)
fun main() {
//    ComposeViewport(document.body!!) {
//        App()
//    }
}
