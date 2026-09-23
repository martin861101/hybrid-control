import { configFromEnv, createApp } from './server.js'

const config = configFromEnv(process.env)
const port = Number(process.env.PORT || 3001)
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT')
createApp(config).listen(port, '0.0.0.0', () => console.log(`Hybrid API listening on port ${port}`))
