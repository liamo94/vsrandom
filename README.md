# Very Simple Random

Type safe utility function to return a random number or array item, depending on what is passed in. **Randomness is inclusive.**

## Installation

```sh
npm install vsrandom
```

## Usage

### Integers


```ts
import { random } from "vsrandom";

random(); // number between 0 & 1 (same behaviour as `Math.random()`)
random(10); // number between 1 & 10
random(5, 10); // number between 5 & 10
```

### Floats

```ts
import { random } from "vsrandom";

random(1.3); // number between 1 and 1.3
random(1.1, 3.33); // number between 1.10 and 3.33
```

### Array values

```ts
import { random } from "vsrandom";

random([1, 2, 3]); // single item from array
random([1, 2, 3], 2); // new array containing n items from original array
```

#### Example: Lottery numbers

```ts
import { random } from "vsrandom";

// Generate 5 unique lottery numbers between 1 and 50
const numbers = Array.from({ length: 50 }, (_, i) => i + 1);
const lotteryNumbers = random(numbers, 5);
// Example result: [23, 7, 41, 12, 35]
```
