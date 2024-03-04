import { getMatchingStatus } from '../getMatchingStatus'
import { ConditionTypeEnum, QuestionTypeEnum, Question, FilterClauseType } from '../../types'

describe('getMatchingStatus', () => {
    const question: Question = {
        id: '1',
        name: 'Sample Question',
        type: QuestionTypeEnum.ShortAnswer,
        value: '42',
    }

    it('should return false if question ID does not match clause ID', () => {
        const clause: FilterClauseType = {
            id: '2',
            condition: ConditionTypeEnum.Equals,
            value: '42',
        }
        expect(getMatchingStatus(question, clause)).toBe(false)
    })

    it('should return true when condition is Equals and values match', () => {
        const clause: FilterClauseType = {
            id: '1',
            condition: ConditionTypeEnum.Equals,
            value: '42',
        }
        expect(getMatchingStatus(question, clause)).toBe(true)
    })

    it('should return false when condition is Equals and values do not match', () => {
        const clause: FilterClauseType = {
            id: '1',
            condition: ConditionTypeEnum.Equals,
            value: '100',
        }
        expect(getMatchingStatus(question, clause)).toBe(false)
    })

    it('should return true when condition is DoesNotEqual and values do not match', () => {
        const clause: FilterClauseType = {
            id: '1',
            condition: ConditionTypeEnum.DoesNotEqual,
            value: '100',
        }
        expect(getMatchingStatus(question, clause)).toBe(true)
    })

    it('should return false when condition is DoesNotEqual and values match', () => {
        const clause: FilterClauseType = {
            id: '1',
            condition: ConditionTypeEnum.DoesNotEqual,
            value: '42',
        }
        expect(getMatchingStatus(question, clause)).toBe(false)
    })

    it('should return true when condition is GreaterThan and question value is greater', () => {
        const clause: FilterClauseType = {
            id: '1',
            condition: ConditionTypeEnum.GreaterThan,
            value: '40',
        }
        expect(getMatchingStatus(question, clause)).toBe(true)
    })

    it('should return false when condition is GreaterThan and question value is less or equal', () => {
        const clause: FilterClauseType = {
            id: '1',
            condition: ConditionTypeEnum.GreaterThan,
            value: '42',
        }
        expect(getMatchingStatus(question, clause)).toBe(false)
    })

    it('should return true when condition is LessThan and question value is less', () => {
        const clause: FilterClauseType = {
            id: '1',
            condition: ConditionTypeEnum.LessThan,
            value: '50',
        }
        expect(getMatchingStatus(question, clause)).toBe(true)
    })

    it('should return false when condition is LessThan and question value is greater or equal', () => {
        const clause: FilterClauseType = {
            id: '1',
            condition: ConditionTypeEnum.LessThan,
            value: '42',
        }
        expect(getMatchingStatus(question, clause)).toBe(false)
    })
})
