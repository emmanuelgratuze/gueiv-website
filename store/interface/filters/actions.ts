import { BasicAction } from 'store/types'
import { List } from 'immutable'
import {
  OPEN_FILTER_BOX,
  CLOSE_FILTER_BOX,
  APPLY_FILTER,
  APPLY_FILTERS
} from './actionsTypes'
import { ApplyFilterAction, ApplyFiltersActions } from './types'

export const openFilterMenu = (filterId: string): BasicAction => ({
  type: OPEN_FILTER_BOX,
  payload: filterId
})

export const closeFilterMenu = (): BasicAction => ({
  type: CLOSE_FILTER_BOX
})

export const applyFilter = (filterId: string, filterValue: List<string>): ApplyFilterAction => ({
  type: APPLY_FILTER,
  payload: {
    filterId,
    filterValue
  }
})

export const applyFilters = (filters: { [key: string]: unknown }): ApplyFiltersActions => ({
  type: APPLY_FILTERS,
  payload: {
    filters
  }
})

export default {}
