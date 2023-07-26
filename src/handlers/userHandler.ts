import UserModel  from "../models/user";

export interface IUser {
    nombre: string;
    telefono: number;
}

export const postUser = async (req: any, res: any) => {
    const data: IUser = req.body;

    try {
        // Crear una nueva instancia del modelo User con los datos recibidos
        const newUser = new UserModel(data);

        // Guardar el nuevo usuario en la base de datos
        await newUser.save();

        // Responder con el nuevo usuario que ha sido guardado
        res.status(200).json(newUser);
    } catch (error) {
        // Si ocurre un error, enviar una respuesta de error con el mensaje del error
        res.status(400).send({ error: error.message });
    }
};