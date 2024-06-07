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

export const getAgendamentosQuantity = async (req: Request, res: Response) => {
    try {

        const { data_inicial, data_final } = req.body;

        if (!data_inicial || !data_final) {
            return res.status(400).json({ message: "Informe a data inicial e final" });
        }

        const initialDate = new Date(data_inicial.split("/").reverse().join("-"));
        const finalDate = new Date(data_final.split("/").reverse().join("-"));


        const schedulingQuantityPerBloodType = {
            "A+": 0,
            "A-": 0,
            "B+": 0,
            "B-": 0,
            "AB+": 0,
            "AB-": 0,
            "O+": 0,
            "O-": 0
        }

        const agendamentos = await AgendamentoModel.find({
            data_doacao: {
                $gte: initialDate.toISOString(),
                $lte: finalDate.toISOString()
            }
        });

        if (!agendamentos) {
            return res.status(404).json({ message: "Nenhum agendamento encontrado" });
        }

        agendamentos.forEach(agendamento => {
            const bloodType = agendamento.tipo_sanguineo as keyof typeof schedulingQuantityPerBloodType;
            if (bloodType in schedulingQuantityPerBloodType) {
                schedulingQuantityPerBloodType[bloodType]++;
            }
        });

        return res.status(200).json(schedulingQuantityPerBloodType);

    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Erro ao buscar agendamentos" });
    }
}