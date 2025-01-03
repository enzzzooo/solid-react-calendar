# solid-react-calendar
###### A solid react calendar that is stable and good looking

<img width="282" alt="Screenshot 2025-01-03 at 2 53 51 PM" src="https://github.com/user-attachments/assets/78d6f853-38c0-43c3-a4f1-11b1a0cb549d" />
<img width="145" alt="Screenshot 2025-01-03 at 3 06 21 PM" src="https://github.com/user-attachments/assets/20581aa0-378c-4b3f-976a-c0bd4627dd43" />

# Usage
```javascript
'use client'

import DatePicker from "solid-react-calendar";
import { useActionState } from "react";

export default function page(){
  const [formState, formAction] = useActionState(veryAmazingAction, {});

  return (
    <form action={formAction>
      <input type="text" name="stringInput" required />
      <DatePicker />
      <button>Submit</button>
    </form>
)}
```
