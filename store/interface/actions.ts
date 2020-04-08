import { BrandColorsKeys } from 'themes/theme'
import { SET_BRANDS_COLORS } from './actionsTypes'
import { BasicAction } from '../types'

export const setBrandsColors = (brandsColors: { [key: string]: BrandColorsKeys }): BasicAction => ({
  type: SET_BRANDS_COLORS,
  payload: brandsColors
})

export default {}
