import { Request, Response } from 'express';

export const logger = (req: Request, res: Response, next: Function) => {
  console.log(
    `${req.method}...${req.baseUrl}:`,
    'body:',
    req.body,
    'query:',
    req.query,
    'params:',
    req.params,
  );
  next();
};
