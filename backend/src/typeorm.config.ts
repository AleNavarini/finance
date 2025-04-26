import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    url: configService.get<string>('POSTGRES_URL_NON_POOLING'),
    synchronize: false, // Set to false in production to prevent schema changes
    autoLoadEntities: true, // Automatically load entities from feature modules
    ssl: {
      rejectUnauthorized: false, // Required for Supabase hosted databases
    },
    extra: {
      // Connection pooling settings optimized for serverless
      max: 10, // Maximum number of connections
      idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
    },
  }),
};
