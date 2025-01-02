# solid-react-calendar
A solid react calendar that is stable and good looking

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
