# PathLab

PathLab is a web application that demonstrates the behavior of graph search and shortest-path algorithms on an interactive grid-based map: **BFS, DFS, Dijkstra and A\***.

> **Work In Progress.** All four algorithms are done and tested, along with one function that checks the input and runs the chosen algorithm, and the playback logic behind run, pause, resume and reset. The user interface comes next.

## Planned Features

- Draw walls and pick start and goal cells on a grid
- Watch the search step by step, then see the final path in its own color
- Run, pause, resume and reset, with an adjustable speed
- Compare algorithms by visited cells, path length and path cost
- A clear "No path found" message when the goal cannot be reached

## Progress

- [x] Grid model: cells, walls and bounds checking
- [x] Four-way neighbor search in a fixed order (up, right, down, left)
- [x] Queue and stack
- [x] Min-heap
- [x] BFS and DFS
- [x] Dijkstra and A\*
- [x] One entry point that checks the input and runs the chosen algorithm
- [x] Playback state: run, pause, resume and reset
- [ ] Interactive grid editor
- [ ] Controls, speed and results panel
- [ ] Documentation and screenshots
- [ ] Live demo and v1.0.0 release

## Tech Stack

TypeScript · React · Vite · Vitest · GitHub Actions

## Getting Started

```bash
npm install
npm run dev      # start the dev server
npm test         # run the unit tests
npm run lint     # check the code style
```

## Project Structure

```text
src/grid/        grid types, map parsing, neighbor search and path rebuilding
src/structures/  queue, stack and min-heap
src/algorithms/  search algorithms and the function that runs them
src/playback/    playback state for run, pause, resume and reset
tests/           unit tests
```

## License

MIT
