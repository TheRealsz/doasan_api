import { IUsuarioDocument } from "./usuario";
import moongose, { Date, Document, Schema } from "mongoose";

interface IAgendamento {
    doador_id: IUsuarioDocument['_id'];
    centro_coleta: string;
    data_doacao: Date;
    tipo_sanguineo: string;
}

export interface IAgendamentoDocumento extends IAgendamento, Document { }

const AgendamentoSchema = new Schema<IAgendamento>(
    {
        doador_id: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
        centro_coleta: { type: String, required: true },
        data_doacao: { type: Date, required: true },
        tipo_sanguineo: { type: String, required: true }
    },
    {
        timestamps: true,
    }
)

const AgendamentoModel = moongose.model('Agendamento', AgendamentoSchema);

export { AgendamentoModel, AgendamentoSchema }