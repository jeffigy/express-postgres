import Note from "./note";
import User from "./user";

User.hasMany(Note);
Note.belongsTo(User);
Note.sync({ alter: true });
User.sync({ alter: true });

export { Note, User };
