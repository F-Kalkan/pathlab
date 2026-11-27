import { Grid } from './components/Grid'
import { parseMap } from './grid/parseMap'

const sampleMap = parseMap(`
        S........#...#.##...
        ..#.............#...
        .....#...#......#...
        ...#....#...#.#...#.
        #..#....#...##...#..
        ...##...#..#...###..
        .#....#.....#.......
        ...#..............#.
        ..#...#.##.#...#..#.
        #....#.......###...G
    `)

function App() {
    return (
        <div>
            <h1>PathLab</h1>
            <p>Rows: {sampleMap.grid.length}, columns: {sampleMap.grid[0].length}</p>
            <Grid grid={sampleMap.grid} start={sampleMap.start} goal={sampleMap.goal} />
        </div>
    )
}


export default App
