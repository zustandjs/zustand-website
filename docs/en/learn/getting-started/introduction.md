---
title: Introduction
description: How to use Zustand
nav: 1
---

![Logo Zustand](./bear.jpg)

A small, fast, and scalable bearbones state management solution.
Zustand has a comfy API based on hooks.
It isn't boilerplatey or opinionated,
but has enough convention to be explicit and flux-like.

Don't disregard it because it's cute, it has claws!
Lots of time was spent to deal with common pitfalls,
like the dreaded [zombie child problem],
[React concurrency], and [context loss]
between mixed renderers.
It may be the one state manager in the React space that gets all of these right.

You can try a live demo [here](https://codesandbox.io/s/dazzling-moon-itop4).

[zombie child problem]: https://react-redux.js.org/api/hooks#stale-props-and-zombie-children
[react concurrency]: https://github.com/bvaughn/rfcs/blob/useMutableSource/text/0000-use-mutable-source.md
[context loss]: https://github.com/facebook/react/issues/13332

## Installation

Zustand is available as a package on NPM for use:

```bash
# NPM
npm install zustand
# Or, use any package manager of your choice.
```

## First create a store

The `create` function creates a store and returns a React hook
that you can use to access it.

Your store can contain both state and actions.
State holds your data, while actions are functions that update it.

```js
import { create } from 'zustand'

const useBear = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}))
```

In this example, `bears` is the state, and `increasePopulation`,
`removeAllBears`, and `updateBears` are the actions.

The `set` function shallowly merges updates into the existing state
by default, so you only need to provide the properties you want to update.
When an update depends on the previous state,
pass a function to `set`, as shown in `increasePopulation`.

## Then bind your components, and that's it!

You can use the store hook in your React components
without wrapping them in a provider.

A selector is a function that picks the part of the store
your component needs. By default, Zustand uses `Object.is`
to compare the previous and next selector results
and triggers a re-render when the selected value changes.

```jsx
function BearCounter() {
  const bears = useBear((state) => state.bears)
  return <h1>{bears} bears around here...</h1>
}

function Controls() {
  const increasePopulation = useBear((state) => state.increasePopulation)
  const removeAllBears = useBear((state) => state.removeAllBears)

  return (
    <>
      <button onClick={increasePopulation}>one up</button>
      <button onClick={removeAllBears}>reset</button>
    </>
  )
}

export default function App() {
  return (
    <>
      <BearCounter />
      <Controls />
    </>
  )
}
```

Both components use the same store.
When you click the `one up` button, `increasePopulation`
updates the bear population, and `BearCounter` displays the new value.
Clicking `reset` sets the population back to zero.

Since `Controls` only selects actions, changes to `bears`
do not cause it to re-render through its store subscriptions.
