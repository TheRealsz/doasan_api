interface EnvType {
    urlConnect: string | undefined
}

export const env : EnvType = {
    urlConnect: process.env.MONGO_URL
}