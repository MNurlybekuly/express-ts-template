import { Request, Response, NextFunction } from 'express'
import { RateLimiterMemory } from 'rate-limiter-flexible'

const rateLimiter = new RateLimiterMemory({
  points: 10,
  duration: 1
})

const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  rateLimiter
    .consume(req.ip, 1)
    .then(() => {
      next()
    })
    .catch(() => {
      res.status(429).send('Too Many Requests')
    })
}

export default rateLimiterMiddleware
