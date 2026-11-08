# PathLab

PathLab is a web application that demonstrates the behavior of graph search and shortest-path algorithms on an interactive grid-based map: **BFS, DFS, Dijkstra and A\***.

> **Work in progress.** The grid model is done and tested; the algorithms and the user interface are next.

## Planned features

- Draw walls and pick start and goal cells on a grid
- Watch the search step by step, then see the final path in its own color
- Run, pause, resume and reset, with an adjustable speed
- Compare algorithms by visited cells, path length and path cost
- A clear "No path found" message when the goal cannot be reached

## Progress

- [x] Grid model: cells, walls and bounds checking
- [x] Four-way neighbor search in a fixed order (up, right, down, left)
- [ ] Queue, stack and min-heap
- [ ] BFS, DFS, Dijkstra and A\*
- [ ] Interactive grid and animation
- [ ] Live demo

## Tech stack

TypeScript · React · Vite · Vitest

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm test         # run the unit tests
npm run lint     # check the code style
```

## Project structure

```text
src/grid/    grid types, grid creation and neighbor search
tests/       unit tests
```
