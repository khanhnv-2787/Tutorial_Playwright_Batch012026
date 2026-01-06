class Counter {
	count: number = 0;

	increment(): void {
		this.count += 1;

		console.log("Incremented count to ", this.count);
	}

	decrement(): void {
		this.count -= 1;

		console.log("Decremented count to ", this.count);
	}

	reset(): void {
		this.count = 0;
		console.log("Counter reset", this.count);
	}

}

const counter = new Counter();
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
counter.reset();
