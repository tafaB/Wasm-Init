import kotlinx.coroutines.*
import kotlin.coroutines.CoroutineContext
import kotlin.system.measureTimeMillis

// IO, Main, Defalt
//  => (Netword and deatabse intereacion)
//  => (doing stuff on the Main thread => UI work)
//  => (Heavy computation work)
fun main() {
    runBlocking {
        launch {
            println("Coroutine 1 Begin");
            pauseFun1();
            println("Coroutine 1 End");
        }
        launch {
            println("Coroutine 2 Begin");
            println("Coroutine 2 End");
        }
        for (i in 1..3000000) {
            println("TEST!!!");
        }
    }
    println("END");
}

suspend fun pauseFun1() {
    println("PAUSE 1 BEGIN");
    pauseFun2();
    println("PAUSE 1 END");
}
suspend fun pauseFun2() {
    println("PAUSE 2 BEGIN");
    delay(1000L);
    println("PAUSE 2 END");
}


// previous
suspend fun printHelloWorld() {
    coroutineScope {
        val job1 : Job = this.launch {
            println(">>> Starting Hello");
            repeat(20, { i ->
                delay(100L);
                print("$i ")
            });
            println("\nDone");
        }
        val job2 : Job = this.launch {
            println(">>> Starting World");
            repeat(20, { i ->
                print("$i ")
            });
            println("\nDone");
        }
        delay(1000L);
        println("Hello, $job2");
        job1.cancelAndJoin()
    }
    println("End of CoroutineScope!")
}

suspend fun addAfterSomeTime() {
//    val time = measureTimeMillis {
//        val one = doSomethingUsefulOne();
//        val two = doSomethingUsefulTwo();
//        println("Result : $one + $two = (${one+two})")
//    }
//    println("Time taken: $time") // 2011
    coroutineScope {
        val time = measureTimeMillis {
            val one = async { doSomethingUsefulOne() };
            val two = async { doSomethingUsefulTwo() };
            println("Result : ${one.await()}+${two.await()} = (${one.await() + two.await()})")
        }
        println("Time taken: $time") //1047
    }
}

suspend fun doSomethingUsefulOne(): Int {
    delay(1000L);
    return 13;
}

suspend fun doSomethingUsefulTwo(): Int {
    delay(1000L);
    return 29;
}

suspend fun contextAndDispatcher() {
    coroutineScope {
        val coroutineContext : CoroutineContext = currentCoroutineContext();
        println(coroutineContext[CoroutineName.Key]);
        println(coroutineContext);
        this.launch {
            println("Eduart");
            this.launch {
                delay(1000L);
                println("Bering");
            }
            println("Naime");
        }
        this.launch {
            println("Eljet");
            this.launch {
                println("Tafa");
            }
            println("Pervizi");
        }
        println("Feleminderit!");
    }
}