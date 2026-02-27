import 'dotenv/config';

function pick(name: string, fallback?: string) {
  return process.env[name] ?? fallback;
}

export function mustGet(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is missing in .env`);
  return v;
}

export const appEnv = {
  port: Number.parseInt(pick('PORT', '3002')!, 10) || 3002,
};


//console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
//console.log('POSTGRES_PASSWORD:', process.env.POSTGRES_PASSWORD);
//console.log('DATABASE_URL:', process.env.DATABASE_URL);

export const dbEnv = {
  databaseUrl: pick('DATABASE_URL') ?? pick('POSTGRES_URL'),
 
  host: pick('DB_HOST', pick('POSTGRES_HOST')),
  port: Number(pick('DB_PORT', pick('POSTGRES_PORT', '5432'))),
  username: pick('DB_USERNAME', pick('POSTGRES_USER')),
  password: pick('DB_PASSWORD', pick('POSTGRES_PASSWORD')),
  database: pick('DB_NAME', pick('POSTGRES_DB')),
};
