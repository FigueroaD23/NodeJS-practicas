import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, lowercase: true },
    authentication: {
        password: { type: String, required: true, select: false, },
        salt: { type: String, select: false, },
        sessionToken: { type: String, select: false, },
    }
}, { timestamps: true });

export const UserModel = mongoose.model('User', userSchema);

export const getAllUsers = () => UserModel.find();
export const getUsersByEmail = (email: string) => UserModel.findOne({ email });
export const getUsersBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': { sessionToken } });
export const getUserById = (id: string) => UserModel.findById(id);
//La ventaja de utilizar Model.create es que es más conciso y puedes crear varios documentos en una sola llamada.
export const createUser = (values: Record<string, unknown>) => UserModel.create(values);
//La ventaja de utilizar new Model(values).save() es que puede ser útil si deseas realizar operaciones adicionales en la instancia antes de guardar el documento.
//export const createUserAlt = (values: Record<string, unknown>) => new UserModel(values).save();
//updateOne actualiza los documentos sin devolver el documento original
/* export const updateUser = (id: string, values: Record<string, any>) => {
    return UserModel.updateOne({ _id: id },{ $set: { ...values } },);
} */
//findByIdAndUpdate actualiza los documentos y devuelve el documento original antes de la actualización
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, { $set: { ...values } });
//return UserModel.findByIdAndUpdate(id,values);
/* Si solo necesitas eliminar un documento y obtener su contenido, puedes usar findOneAndDelete (opciones adicionales, como sort, projection).
Si deseas eliminar múltiples documentos sin obtener su contenido, remove puede ser más apropiado.*/
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete({ _id: id });

