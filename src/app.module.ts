import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProductsModule } from './modules/products/products.module';
import { Product } from './entities/product.entity';
import { configDotenv } from 'dotenv';
configDotenv()
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Product],
      synchronize: true,
      retryAttempts: 3,
      retryDelay: 3000,
      ssl: true,
      extra: {
        connectionLimit: 10,
        connectTimeout: 10000,
        ssl: {
          rejectUnauthorized: false
        }
      },
      logging: true
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
