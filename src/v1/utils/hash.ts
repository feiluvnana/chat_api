import { compareSync, hashSync } from "bcrypt";

const saltRounds = 10;

export class HashUtils {
	static hash(plain: string) {
		return hashSync(plain, saltRounds);
	}

	static compare(plain: string, hash: string) {
		return compareSync(plain, hash);
	}
}