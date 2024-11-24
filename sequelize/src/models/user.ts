import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../utils/db";
type UserAttributes = {
  id: number;
  username: string;
  name: string;
};

type UserCreationAttributes = Optional<UserAttributes, "id">;

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;
  declare username: string;
  declare name: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "user",
  }
);

export default User;
