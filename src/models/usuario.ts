import moongose, { Document, Schema } from "mongoose";

interface IUsuario {
    nome: string;
    email: string;
    senha: string;
    data_nascimento: string;
    telefone: string;
    endereco: string | null;
    tipo_sanguineo: string;
    peso: number;
    historico_medico: string | null;
}

export interface IUsuarioDocument extends IUsuario, Document { }

const UsuarioSchema = new Schema<IUsuario>(
    {
        nome: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        senha: { type: String, required: true },
        data_nascimento: { type: String, required: true },
        telefone: { type: String, required: true },
        endereco: { type: String, required: false },
        tipo_sanguineo: { type: String, required: true },
        peso: { type: Number, required: true },
        historico_medico: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

const UsuarioModel = moongose.model('Usuario', UsuarioSchema);

export { UsuarioModel, UsuarioSchema }
