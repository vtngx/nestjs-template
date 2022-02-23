import { envConfig } from './helpers/env.helpers';
import { MongooseModule } from '@nestjs/mongoose';

export const DatabaseModule = MongooseModule.forRoot(
  envConfig.CLOUD_DB ||
    `${envConfig?.MONGO_URI || 'mongodb://localhost:27017'}/${
      envConfig.DATABASE_NAME
    }${envConfig?.MONGO_AUTH === 'true' ? '?authSource=admin' : ''}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);
