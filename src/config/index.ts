import 'dotenv/config';

export const config = {
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  secret: process.env.SECRET,
  email: process.env.EMAIL,
  emailPass: process.env.EMAIL_PASS,
  domain: process.env.DOMAIN,
};
