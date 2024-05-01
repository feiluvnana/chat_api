import jwt from "jsonwebtoken";

const tokenSecret = "9d7f635db38a110b871507aafa96d66e96ba441c66fc092004ed496ef8a18e75";
const tokenExpiresIn = "7d";

export class TokenUtils {
	static create(payload: TokenPayload): string {
		return jwt.sign(payload, tokenSecret, {
			expiresIn: tokenExpiresIn
		});
	}

	static verify(token: string): TokenPayload | undefined {
		try {
			return jwt.verify(token, tokenSecret) as TokenPayload;
		} catch (_) {
			return undefined;
		}
	}
}

export interface TokenPayload {
	username: number
}