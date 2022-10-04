import { Request, Response, NextFunction } from 'express'
import { RateLimiterMemory } from 'rate-limiter-flexible'

const rateLimiter = new RateLimiterMemory({
  points: 6,
  duration: 1
})

const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
  rateLimiter
    .consume(req.ip, 2)
    .then(() => {
      next()
    })
    .catch(() => {
      res.status(429).send('Too Many Requests')
    })
}

export default rateLimiterMiddleware
