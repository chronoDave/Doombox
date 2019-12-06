# @doombox/react

## Scripts
- `start`: Start React on `localhost:5000`
- `build`: Build client to `doombox-electron/client`

## Code Style
### General
Doombox uses a programming style inspired by [Brad Frost's Atomic Design](http://atomicdesign.bradfrost.com/chapter-2/). The folder structure (within `src`) can be described as followed:

<b>Components</b>

The smallest building block of the application
 - Never imports other components, with exception of framework specific components (such as Material-UI)
 - Should be small in size
 - Grouped by its type
 - Shares a single stylesheet within its type group

<b>Hooks</b>

React hooks. See [Introducing Hooks - React](https://reactjs.org/docs/hooks-intro.html) for more details

<b>Lib</b>

Non-react code, doesn't render anything.
 - Usually a class
 - Does not import React

<b>Modules</b>

Collection of components
 - Never imports other modules, with exception of private (not exported, denoted by `<module>.private`) modules within it's type group
 - Grouped by its type
 - Shares a single stylesheet within it's type group
 - Often small in size; can be split into private parts

<b>Providers</b>

React context providers. See [Context - React](https://reactjs.org/docs/context.html) for more details

<b>Utils</b>

Various utilities, such as constants (`const`), context object (`context`) and functions (`index`)
