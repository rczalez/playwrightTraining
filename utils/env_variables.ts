import dotenv from 'dotenv';
import { iEnvVariables } from '../utils/types';
dotenv.config();

class EnvVariable {

  constructor() { }

  public getEnvVariables(): iEnvVariables {
    const envVars: Partial<iEnvVariables> = {
      AUTO_PLAYWRIGHT_DEBUG: process.env.AUTO_PLAYWRIGHT_DEBUG === 'true',
      BASE_URL: process.env.BASE_URL || '',
      BASE_FIRM_NAME: process.env.BASE_FIRM_NAME || '',
      BASE_MEASUREMENT_DATE: process.env.BASE_MEASUREMENT_DATE || '',
      HEADLESS_DEBUG: process.env.HEADLESS_DEBUG === 'true',
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      SCALAR_DASH409A_PASSWORD: process.env.SCALAR_DASH409A_PASSWORD,
      SCALAR_DASH409A_USERNAME: process.env.SCALAR_DASH409A_USERNAME,
      SCALAR_PASSWORD: process.env.SCALAR_PASSWORD,
      SCALAR_USERNAME: process.env.SCALAR_USERNAME,
      SLACK_OAUTH_TOKEN: process.env.SLACK_OAUTH_TOKEN,
      QATOUCH_DOMAIN: process.env.QATOUCH_DOMAIN,
      QATOUCH_API_TOKEN: process.env.QATOUCH_API_TOKEN,
      QATOUCH_PROJECT_KEY: process.env.QATOUCH_PROJECT_KEY,
      QATOUCH_TESTRUN_ID: process.env.QATOUCH_TESTRUN_ID,
    };

    // Check for missing environment variables
    for (const [key, value] of Object.entries(envVars)) {
      if (value === undefined || value === null) {
        throw new Error(`Missing environment variable: ${key}`);
      }
    }

    return envVars as iEnvVariables;
  }

}

export default new EnvVariable();