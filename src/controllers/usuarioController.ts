import { Request, Response } from "express";
import { UsuarioModel } from "../models/usuario";
import bcrypt from "bcrypt";

export const createUsuario = async (req: Request, res: Response) => {
    try {
        const {
            nome,
            email,
            senha,
            data_nascimento,
            telefone,
            endereco,
            tipo_sanguineo,
            peso,
            historico_medico
        } = req.body;

        if (!nome || !email || !senha || !data_nascimento || !telefone || !tipo_sanguineo || !peso) {
            return res.status(400).json({ message: "Por favor, preecha todos os campos" });
        }

        const existEmail = await UsuarioModel.findOne({ email });

        if (existEmail) {
            return res.status(400).json({ message: "Email já cadastrado" });
        }

        const today = new Date();
        const birthDate = new Date(data_nascimento);

        const age = today.getFullYear() - birthDate.getFullYear();

        if (age < 16 || age > 69) {
            return res.status(400).json({ message: "A doação de sangue é permitida apenas para pessoas entre 16 e 69 anos." });
        }

        if (peso < 50) {
            return res.status(400).json({ message: "O peso do doador deve ser maior que 50Kg" });
        }

        if (senha.length < 6) {
            return res.status(400).json({ message: "A senha deve conter no mínimo 6 caracteres" });
        }

        const salt = await bcrypt.genSalt(10)
        const passwordEncrypted = await bcrypt.hash(senha, salt)

        const usuario = await UsuarioModel.create({
            nome,
            email,
            senha: passwordEncrypted,
            data_nascimento,
            telefone,
            endereco,
            tipo_sanguineo,
            peso,
            historico_medico
        });

        if (!usuario) {
            return res.status(400).json({ message: "Erro ao cadastrar usuário" });
        }

        return res.status(201).json({ message: "Usuário cadastrado com sucesso" });

    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Erro ao cadastrar usuário" });
    }
}

export const login = async (req: Request, res: Response) => {

    try {

        const {
            email,
            senha
        } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: "Por favor, preecha todos os campos" });
        }

        const usuario = await UsuarioModel.findOne({ email });

        if (!usuario) {
            return res.status(400).json({ message: "Email ou senha inválidos" });
        }

        const isMatchPassword = await bcrypt.compare(senha, usuario.senha);

        if (!isMatchPassword) {
            return res.status(400).json({ message: "Email ou senha inválidos" });
        }

        const userObject = usuario.toObject();

        return res.status(200).json({
            message: "Usuário logado com sucesso",
            usuario: {
                ...userObject,
                senha: undefined
            }
        });


    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Erro ao fazer login" });
    }

}