import { FilterClauseType, FilloutResponse } from '../types'
import { getMatchingStatus } from './getMatchingStatus'

export function filterResponses(response: FilloutResponse, clauses: FilterClauseType[]): boolean {
    return clauses.every((clause) => response.questions.some((question) => getMatchingStatus(question, clause)))
}