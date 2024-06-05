import { Request, Response } from "express";
import { AgendamentoModel } from "../models/agendamento";
import { UsuarioModel } from "../models/usuario";

export const createAgendamento = async (req: Request, res: Response) => {
    try {

        const usuarioId = req.params.usuarioId;

        if (!usuarioId) {
            return res.status(400).json({ message: "Informe o id do doador" });
        }

        const usuario = await UsuarioModel.findById(usuarioId);

        if (!usuario) {
            return res.status(404).json({ message: "Usuario não encontrado" });
        }

        const { centro_coleta, data_doacao, hora_doacao } = req.body;

        if (!centro_coleta || !data_doacao || !hora_doacao) {
            return res.status(400).json({ message: "Preencha todos os campos" });
        }

        const doacaoDate = new Date(data_doacao.split("/").reverse().join("-"));

        const currentDate = new Date();

        doacaoDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        if (doacaoDate < currentDate) {
            return res.status(400).json({ message: "Data inválida" });
        }

        const [hours, minutes] = hora_doacao.split(":").map(Number);

        doacaoDate.setHours(hours, minutes);
        doacaoDate.setMinutes(doacaoDate.getMinutes() - doacaoDate.getTimezoneOffset());

        await AgendamentoModel.create({
            doador_id: usuarioId,
            centro_coleta,
            data_doacao: doacaoDate.toISOString(),
            tipo_sanguineo: usuario.tipo_sanguineo
        })

        return res.status(201).json({ message: "Agendamento realizado com sucesso" });


    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Erro ao realizar agendamento" });
    }
}