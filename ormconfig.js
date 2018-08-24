const dirPrefix = process.env.NODE_ENV === 'production' ? `.next/production-server/` : ''
const fileSuffix = process.env.NODE_ENV === 'production' ? 'js' : 'ts'

module.exports = {
  'type': 'mysql',
  'host': process.env.DB_HOST || 'localhost',
  'port': 3306,
  'username': process.env.DB_USERNAME || 'root',
  'password': process.env.DB_PASSWORD || 'abc123',
  'database': process.env.DB_NAME || 'almostmarried',
  'synchronize': true,
  'logging': true,
  'entities': [`${dirPrefix}entities/**/*.${fileSuffix}`],
  'migrations': [`${dirPrefix}migrations/**/*.${fileSuffix}`],
  'subscribers': [`${dirPrefix}subscribers/**/*.${fileSuffix}`],
  'cli': {
    'entitiesDir': `${dirPrefix}entities`,
    'migrationsDir': `${dirPrefix}migrations`,
    'subscribersDir': `${dirPrefix}subscribers`,
  }
}