import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import 'dotenv/config'
import axios from 'axios'
import { FilloutQueryParams, FilloutResponseBody } from './types'
import { ServiceAPIResponse } from '../types/service-response'
import { filterResponses } from './utils/filterResponses'

import * as middleware from './middleware'

const PORT = process.env.PORT || 5000
const ENV = process.env.NODE_ENV || 'production'
const API_KEY = process.env.API_KEY

const app: Express = express()

app.use(helmet())

app.use(cors())

app.use(express.json())

app.use(middleware.httpLogger)

axios.defaults.headers.common['Authorization'] =
  `Bearer ${API_KEY}`

app.get('/apiStatus', (req: Request, res: Response) => {
  res.status(200).send('API is healthy 🚀')
})

app.get(
  '/:formId/filteredResponses',
  async (req: Request<{ formId: string }, unknown, unknown, FilloutQueryParams>, res: Response<ServiceAPIResponse<FilloutResponseBody>>, next: NextFunction) => {
    try {
      const { data } = await axios.get<FilloutResponseBody>(`https://api.fillout.com/v1/api/forms/${req.params.formId}/submissions`, { params: req.query })
      const responsesPerPage = data.responses.length / data.pageCount
      const filteredResponses = data.responses.filter((response) =>
        filterResponses(
          response,
          typeof req.query.filters === 'string' ? JSON.parse(req.query.filters) : [],
        ),
      )

      const responseBody: ServiceAPIResponse<FilloutResponseBody> = {
        body: {
          totalResponses: filteredResponses.length,
          pageCount: Math.ceil(filteredResponses.length / responsesPerPage),
          responses: filteredResponses,
        },
        statusCode: 200,
      }

      res.status(responseBody.statusCode).send(responseBody)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Axios error: ', err.message)
        next(err)
      } else {
        console.error('Unexpected error: ', err)
        next(err)
      }
    }
  },
)

// Error middleware

app.use(middleware.errorHandler)

app.use(middleware.notFoundHandler)

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${ENV} environment`)
})

export { app as default, server }
