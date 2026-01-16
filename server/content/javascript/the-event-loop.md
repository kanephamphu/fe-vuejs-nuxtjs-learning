# The Event Loop
The mechanism that allows JavaScript to perform non-blocking I/O operations despite being single-threaded.

## Key Components
1. **Call Stack**: LIFO stack tracking where we are in the code.
2. **Web APIs**: Browser features (DOM, setTimeout, fetch) handling async tasks.
3. **Callback Queue**: Functions waiting to be pushed to the stack.
4. **Event Loop**: Monitors the Call Stack and Callback Queue. If the stack is empty, it takes the first event from the queue and pushes it to the stack.

Knowing this explains why \`setTimeout(..., 0)\` doesn't run immediately but waits for the current stack to clear.
