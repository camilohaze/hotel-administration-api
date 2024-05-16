/**
 * Token.
 *
 * @export
 * @interface Token
 */
export interface Token {
  token: string;
  expiresInToken: number;
  refreshToken: string;
  expiresInRefreshToken: number;
}
