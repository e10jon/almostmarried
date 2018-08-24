module.exports = {
  'type': 'mysql',
  'host': process.env.DB_HOST || 'localhost',
  'port': 3306,
  'username': process.env.DB_USERNAME || 'root',
  'password': process.env.DB_PASSWORD || 'abc123',
  'database': process.env.DB_NAME || 'almostmarried',
  'synchronize': true,
  'logging': true,
  'entities': [
    'entities/**/*.ts'
  ],
  'migrations': [
    'migrations/**/*.ts'
  ],
  'subscribers': [
    'subscribers/**/*.ts'
  ],
  'cli': {
    'entitiesDir': 'entities',
    'migrationsDir': 'migrations',
    'subscribersDir': 'subscribers'
  }
}