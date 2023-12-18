# Very Simple Random

Type safe utility function to return a random number or array item, depending on what is passed in. **Randomness is inclusive.**

## Usage

### Integers

```typescript
import { random } from "vsrandom";

random(10); // number between 1 & 10
random(5, 10); // number between 5 & 10
```

### Floats

```typescript
import { random } from "vsrandom";

random(1.3); // number between 0.1 and 1.3
random(1.1, 3.33); // number between 1.10 and 3.33
```

### Array values

```typescript
import { random } from "vsrandom";

random([1, 2, 3]); // single item from array
random([1, 2, 3], 2); // new array containing n items from original array
```
