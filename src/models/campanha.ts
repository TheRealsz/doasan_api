import moongose, { Document, Schema } from "mongoose";
import { IUsuarioDocument } from "./usuario";

interface ICampanha {
    usuario_id: IUsuarioDocument['_id'];
    descricao: string;
    img: string;
}

export interface ICampanhaDocument extends ICampanha, Document { }

const CampanhaSchema = new Schema<ICampanha>(
    {
        usuario_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
        descricao: { type: String, required: true },
        img: { type: String }
    },
    {
        timestamps: true,
    }
);

const CampanhaModel = moongose.model('Campanha', CampanhaSchema);

export { CampanhaModel, CampanhaSchema }