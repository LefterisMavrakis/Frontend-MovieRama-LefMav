// import { shallowMount } from '@vue/test-utils'
import useHelper from '@/composables/use-helper'
const {arrayTake} = useHelper()


describe('arrayTake', () => {
  const arrayToTest = [1,2,3,4,5,6]
  test('returns array of the given quantity', () => {
    expect(arrayTake(arrayToTest, 2)).toEqual([1,2])
  })
  
})
