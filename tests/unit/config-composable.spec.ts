// import { shallowMount } from '@vue/test-utils'
import useConfig from '@/composables/use-config'
const {getApiKey, getPostersBase} = useConfig()


describe('getApiKey', () => {
  const apiKey = 'bc50218d91157b1ba4f142ef7baaa6a0'
  test('returns api key', () => {
    expect(getApiKey()).toBe(apiKey)
  })
})
describe('getPostersBase', () => {
  const posterPathBase = 'https://image.tmdb.org/t/p/original'
  test('returns tmdb posters base path key', () => {
    expect(getPostersBase()).toBe(posterPathBase)
  })
})
