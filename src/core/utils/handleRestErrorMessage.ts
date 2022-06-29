import { Response, Request } from 'express';
import { ERROR } from '../../constants/index';

export function handleRestErrorMessage(
  req: Request,
  res: Response,
  errorMessage: string
) {
  if (errorMessage) {
    res.status(400).json({ error: errorMessage });
  } else {
    res.status(500).json({
      error: ERROR.SERVICE.UNKNOWN,
    });
  }
}
