import { Request, Response } from "express";
import { UsuarioModel } from "../models/usuario";
import { CampanhaModel } from "../models/campanha";

export const createCampanha = async (req: Request, res: Response) => {
    try {

        const { usuarioId } = req.params;

        if (!usuarioId) {
            return res.status(400).json({ message: "Informe o id do usuário" });
        }

        const usuario = await UsuarioModel.findById(usuarioId);

        if (!usuario || usuario.role !== "admin") {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        const file = req.file

        const {
            descricao
        } = req.body

        if (!descricao) {
            return res.status(400).json({ message: "Preencha todos os campos" });
        }

        await CampanhaModel.create({
            usuario_id: usuarioId,
            descricao,
            img: file?.path
        })

        return res.status(201).json({ message: "Campanha criada com sucesso" });

    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Erro ao criar campanha" });
    }
}

export const getCampanhas = async (req: Request, res: Response) => {
    try {

        const campanhas = await CampanhaModel.find().populate('usuario_id', 'nome');

        campanhas.forEach(campanha => {
            campanha.img = campanha.img.replace("uploads\\", "uploads/")
            campanha.img = `http://localhost:3001/${campanha.img}`
        })

        campanhas.sort((a, b) => {
            return new Date((b as any).createdAt).getTime() - new Date((a as any).createdAt).getTime()
        })

        return res.status(200).json(campanhas);

    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Erro ao buscar campanhas" });
    }
}