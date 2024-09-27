# COROUTINES IN KOTLIN

------
They are not lke threads in C, where two actions are really happening simultaneously, but we _"jump"_  from 
one action to the other

Suspending a coroutine does not block the underlying thread, but allows other coroutines to run and use the
underlying thread for their code. 

 - new coroutines can only be launched in a specific
 CoroutineScope which delimits the lifetime of the coroutine

------

## BASICS
### runBlocking
```kotlin
    expect fun <T> runBlocking(
        context: CoroutineContext = EmptyCoroutineContext,
        block: suspend CoroutineScope.() -> T
    ): T
```
 - Runs a new coroutine and blocks the current thread until its completion.
 - Creates a CoroutineScope

### launch
```kotlin
    fun CoroutineScope.launch(
        context: CoroutineContext = EmptyCoroutineContext, 
        start: CoroutineStart = CoroutineStart.DEFAULT, 
        block: suspend CoroutineScope.() -> Unit
    ): Job
```
 - Creates a coroutine / "the mini thread"
 - immediatelly returns the *Job* and contniues with the other actions on the thread/ not the coroutine created
 - By default, the coroutine is immediately scheduled for execution.
    - The summary of coroutine start options is:
        - **DEFAULT** immediately schedules the coroutine for execution according to its context.
        - **LAZY** delays the moment of the initial dispatch until the result of the coroutine is needed.
        - **ATOMIC** prevents the coroutine from being cancelled before it starts, ensuring that its code will start executing in any case.
        - **UNDISPATCHED** immediately executes the coroutine until its first suspension point in the current thread.

### async
- Conceptually, it is just like **launch**
   ⮕ The difference is that **launch** returns a *Job* and does not carry any resulting value, while **async**
   returns a *Deferred* — a light-weight non-blocking future that represents a promise to provide a result later.
  - Deferred : it is a Job with a result.
  - await() :  The result of the deferred is available when it is completed and can be retrieved by await method, 
  which throws an exception if the deferred had failed.
     ```kotlin
        interface Deferred<out T> : Job
        // ...
        abstract suspend fun await(): T
     ```

### | Scope builder

-----
It is possible to declare your own scope using the **coroutineScope** builder. It creates a coroutine scope
and does not complete until all launched children complete.

!= from **runBlocking** as it does not block the parent thread,
but it is suspending the coroutine from which it is being called(still blocking in a sence)
=> This is why coroutineScope is suspend funciton:
```kotlin
    suspend fun <R> coroutineScope(block: suspend CoroutineScope.() -> R): R
```

-----

### | Cancelation

The **launch** function returns a **Job** that can be used to cancel the running coroutine.

## Coroutine context and dispatchers
Coroutines always execute in some context represented by a value of the **CoroutineContext** type.
<br/> The main elements are the **Job** of the coroutine, and its **dispatcher**.
 - **Coroutine Dispatcher** : Internally, a coroutine context is represented as a combination of key-value pairs, 
   where each key is a *CoroutineContext.Key* and each value is an element implementing the *CoroutineContext.Element* interface.
   You can retrieve elements from the context using their keys.
 - **Coroutine Dispatcher** : determines what thread or threads the corresponding coroutine uses for its execution. 