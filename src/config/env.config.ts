export const EnvConfiguration = () => ({
    enviroment: process.env.NODE_ENV || "dev",
    mongodb: process.env.MONGODB,
    port: parseInt(process.env.PORT) || 3000,
    defaultLimit: +process.env.DEFAULT_LIMIT || 5
})