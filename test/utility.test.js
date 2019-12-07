import assert from 'assert'
import { assert as chaiAssertion } from 'chai'
import { deepMergeParameter } from '../source/utility/mergeProperty.js'

suite('Deep merge arguments lists', () => {
  const argumentList1 = [
      {
        data: { v2: 'v2' },
      },
    ],
    argumentList2 = [
      {
        data: { v1: 'x' },
      },
    ]
  let merged = deepMergeParameter(
    [{ data: { v1: 'v1' } }], // overriding argument list.
    // default value array
    argumentList1,
    // default value array
    argumentList2,
  )

  test('merged argument list must create a new argument list with merged values, but not overriden', () => {
    chaiAssertion.deepEqual(merged, [{ data: { v1: 'v1', v2: 'v2' } }], `• Arguments were not merged properly.`)
  })
})
