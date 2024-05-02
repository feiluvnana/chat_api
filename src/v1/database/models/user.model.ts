import { CreationOptional, DataTypes, Model, sql } from "@sequelize/core";
import { DeletedAt, Attribute, PrimaryKey, NotNull, Default } from "@sequelize/core/decorators-legacy";

export class User extends Model {
    @Attribute(DataTypes.UUID.V4)
    @PrimaryKey
    @Default(sql.uuidV4)
    declare id: CreationOptional<string>;

    @Attribute(DataTypes.UUID.V4)
    @NotNull
    declare accountId: string;

    @Attribute(DataTypes.STRING)
    declare displayName: string | null;

    @DeletedAt
    declare deletedAt: Date | null;
}

export class UserService {
    static async readById(id: string) {
        return User.findByPk(id);
    }

    static async readByAccountId(accountId: string) {
        const user = await User.findOne({
            where: {
                accountId
            }
        });

        return user || User.create({
            accountId,
            displayName: null,
            deletedAt: null
        });
    }
}