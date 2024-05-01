import { CreationOptional, DataTypes, Model } from "@sequelize/core";
import { Attribute, AutoIncrement, Index, NotNull, PrimaryKey, Table, Unique } from "@sequelize/core/decorators-legacy";

@Table({
    name: {
        singular: "account",
        plural: "accounts"
    },
    timestamps: true,
    deletedAt: true
})
export class Account extends Model {
    @Attribute(DataTypes.STRING(20))
    @PrimaryKey()
    declare username: string;

    @Attribute(DataTypes.STRING)
    declare password: string;

    @Attribute(DataTypes.STRING)
    declare token: CreationOptional<string>;
}

export class AccountService {
    static async create(params: {
        username: string,
        password: string
    }) {
        return Account.create(params);
    }

    static async readByUsername(username: string) {
        return Account.findByPk(username);
    }

    static async updateToken(account: Account, token: string) {
        account.token = token;
        return account.save();
    }
}