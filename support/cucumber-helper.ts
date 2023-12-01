// import { DataTable, setDefaultTimeout } from '@cucumber/cucumber'
// setDefaultTimeout(60 * 1000)

export class CucumberHelpers {
    /**
 * Extracts the data from a single-column Cucumber DataTable and returns it as an `Array<string>`
 *
 * @param table
 */
static itemsFrom(table: DataTable): string[] {
    return table.raw().map(row => row[0])
}
}