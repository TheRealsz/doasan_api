import multer, { StorageEngine } from 'multer';
import path from 'path';
import { Request } from 'express';

interface MulterFile extends Express.Multer.File {
}

// Configuração do multer
const storage: StorageEngine = multer.diskStorage({
    // Destination é o local onde os arquivos serão salvos
    destination: function (req: Request, file: MulterFile, cb: (error: Error | null, destination: string) => void) {
        cb(null, path.join('uploads/'));
    },
    // Filename é o nome do arquivo que será salvo
    filename: function (req: Request, file: MulterFile, cb: (error: Error | null, filename: string) => void) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

export default upload;