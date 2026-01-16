## Practice: Timer Cleanup

We want to create a timer that increments a counter every second. Changes to the counter should be logged.
Crucially, when the component is destroyed (simulated here), we must stop the timer to prevent memory leaks.

### Tasks:
1. Import `ref`, `onMounted`, `onUpdated`, `onUnmounted`.
2. Create a `count` ref.
3. In `onMounted`, start a `setInterval` that increments `count`. Store the interval ID.
4. In `onUpdated`, log "Counter updated".
5. In `onUnmounted`, clear the interval using `clearInterval`.
