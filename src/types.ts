export enum QuestionTypeEnum {
    Address = 'Address',
    AudioRecording = 'AudioRecording',
    Calcom = 'Calcom',
    Calendly = 'Calendly',
    Captcha = 'Captcha',
    Checkbox = 'Checkbox',
    Checkboxes = 'Checkboxes',
    ColorPicker = 'ColorPicker',
    CurrencyInput = 'CurrencyInput',
    DatePicker = 'DatePicker',
    DateRange = 'DateRange',
    DateTimePicker = 'DateTimePicker',
    Dropdown = 'Dropdown',
    EmailInput = 'EmailInput',
    FileUpload = 'FileUpload',
    ImagePicker = 'ImagePicker',
    LocationCoordinates = 'LocationCoordinates',
    LongAnswer = 'LongAnswer',
    Matrix = 'Matrix',
    MultiSelect = 'MultiSelect',
    MultipleChoice = 'MultipleChoice',
    NumberInput = 'NumberInput',
    OpinionScale = 'OpinionScale',
    Password = 'Password',
    Payment = 'Payment',
    PhoneNumber = 'PhoneNumber',
    Ranking = 'Ranking',
    RecordPicker = 'RecordPicker',
    ShortAnswer = 'ShortAnswer',
    Signature = 'Signature',
    Slider = 'Slider',
    StarRating = 'StarRating',
    Switch = 'Switch',
    TimePicker = 'TimePicker',
    URLInput = 'URLInput',
}

export enum CalculationTypeEnum {
    number = 'number',
    text = 'text',
}

export enum ConditionTypeEnum {
    Equals = 'equals',
    DoesNotEqual = 'does_not_equal',
    GreaterThan = 'greater_than',
    LessThan = 'less_than',
}

export enum QueryStatusEnum {
    InProgress = 'in_progress',
    Finished = 'finished',
}

export enum SortTypeEnum {
    Asc = 'asc',
    Desc = 'desc',
}

export interface FilterClauseType {
    id: string;
    condition: ConditionTypeEnum;
    value: number | string;
}

export interface FilloutQueryParams {
    limit?: number;
    afterDate?: string;
    beforeDate?: string;
    offset?: number;
    status?: QueryStatusEnum;
    includeEditLink?: boolean;
    sort?: SortTypeEnum;
    filters?: FilterClauseType[];
}

export interface Question {
    id: string;
    name: string;
    type: QuestionTypeEnum;
    value: string;
}

export interface Calculation {
    id: string;
    name: string;
    type: QuestionTypeEnum,
    value: string;
}

export interface UrlParameter {
    id: string;
    name: string;
    value: string;
}

export interface FilloutResponse {
    questions: Question[];
    calculations: Calculation[];
    urlParameters: UrlParameter[];
    quiz?: {
        score: number;
        maxScore: number;
    };
    submissionId: string;
    submissionTime: Date;
}

export interface FilloutResponseBody {
    responses: FilloutResponse[];
    totalResponses: number;
    pageCount: number;
}
