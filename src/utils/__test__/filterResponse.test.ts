import { filterResponses } from '../filterResponses'
import { ConditionTypeEnum, QuestionTypeEnum, FilloutResponse, FilterClauseType } from '../../types'

describe('filterResponses', () => {
    const response: FilloutResponse = {
        questions: [
            { id: '1', name: 'Question 1', type: QuestionTypeEnum.ShortAnswer, value: 'Yes' },
            { id: '2', name: 'Question 2', type: QuestionTypeEnum.NumberInput, value: '50' },
        ],
        calculations: [],
        urlParameters: [],
        submissionId: 'abc123',
        submissionTime: new Date(),
    }

    it('should return true for response without filters', () => {
        const clauses: FilterClauseType[] = []
        expect(filterResponses(response, clauses)).toBe(true)
    })

    it('should return true for response with matching single filter', () => {
        const clauses: FilterClauseType[] = [
            { id: '1', condition: ConditionTypeEnum.Equals, value: 'Yes' },
        ]
        expect(filterResponses(response, clauses)).toBe(true)
    })

    it('should return false for response with non-matching single filter', () => {
        const clauses: FilterClauseType[] = [
            { id: '1', condition: ConditionTypeEnum.Equals, value: 'No' },
        ]
        expect(filterResponses(response, clauses)).toBe(false)
    })

    it('should return true for response with multiple matching filters', () => {
        const clauses: FilterClauseType[] = [
            { id: '1', condition: ConditionTypeEnum.Equals, value: 'Yes' },
            { id: '2', condition: ConditionTypeEnum.GreaterThan, value: '10' },
        ]
        expect(filterResponses(response, clauses)).toBe(true)
    })

    it('should return false for response with at least one non-matching filter', () => {
        const clauses: FilterClauseType[] = [
            { id: '1', condition: ConditionTypeEnum.Equals, value: 'Yes' },
            { id: '2', condition: ConditionTypeEnum.LessThan, value: '10' },
        ]
        expect(filterResponses(response, clauses)).toBe(false)
    })

    it('should return false for response with multiple non-matching filters', () => {
        const clauses: FilterClauseType[] = [
            { id: '1', condition: ConditionTypeEnum.DoesNotEqual, value: 'Yes' },
            { id: '2', condition: ConditionTypeEnum.LessThan, value: '10' },
        ]
        expect(filterResponses(response, clauses)).toBe(false)
    })
})
