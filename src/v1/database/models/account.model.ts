import { CreationOptional, DataTypes, Model, NonAttribute, sql } from "@sequelize/core";
import { Attribute, Default, DeletedAt, HasOne, PrimaryKey, Unique } from "@sequelize/core/decorators-legacy";
import { User } from "./user.model";

export class Account extends Model {
    @Attribute(DataTypes.UUID.V4)
    @PrimaryKey
    @Default(sql.uuidV4)
    declare id: CreationOptional<string>;

    @Attribute(DataTypes.STRING)
    @Unique
    declare username: string;

    @Attribute(DataTypes.STRING)
    declare password: string;

    @Attribute(DataTypes.STRING)
    declare token: CreationOptional<string | null>;

    @DeletedAt
    declare deletedAt: Date | null;

    @HasOne(() => User, "accountId")
    declare user: NonAttribute<User>;
}

export class AccountService {
    static async create(params: {
        username: string,
        password: string
    }) {
        return Account.create(params);
    }

    static async readByUsername(username: string) {
        return Account.findOne({
            where: {
                username
            }
        });
    }

    static async updateToken(account: Account, token: string | null) {
        account.token = token;
        return account.save();
    }
}