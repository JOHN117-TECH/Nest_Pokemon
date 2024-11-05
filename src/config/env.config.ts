export const EnvConfiguration = () => ({
    enviroment: process.env.NODE_ENV || "dev",
    mongodb: process.env.MONGODB || "mongodb://localhost:27017/nest-pokemon",
    port: parseInt(process.env.PORT_DEV) || 3000,
    defaultLimit: +process.env.DEFAULT_LIMIT || 5
})