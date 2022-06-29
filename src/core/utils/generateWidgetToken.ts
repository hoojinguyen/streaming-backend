
import * as jwt from 'jsonwebtoken'

export default function generateWidgetToken(accountId: string, email: string): string {
  return jwt.sign(
    {
      widgetId: accountId,
      email,
    },
    `${process.env.JSON_WEB_TOKEN_SECRET}`,
  )
}