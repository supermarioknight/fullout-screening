import { ConditionTypeEnum, Question, FilterClauseType } from '../types'

export function getMatchingStatus(question: Question, clause: FilterClauseType): boolean {
  if (question.id === clause.id) {
    switch (clause.condition) {
      case ConditionTypeEnum.DoesNotEqual:
        return question.value.toString() !== clause.value.toString()
      case ConditionTypeEnum.Equals:
        return question.value.toString() === clause.value.toString()
      case ConditionTypeEnum.GreaterThan:
        return parseFloat(question.value.toString()) > parseFloat(clause.value.toString())
      case ConditionTypeEnum.LessThan:
        return parseFloat(question.value.toString()) < parseFloat(clause.value.toString())
    }
  }
  return false
}
