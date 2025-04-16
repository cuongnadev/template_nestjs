import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProductsModule } from './modules/products/products.module';
import { Product } from './entities/product.entity';
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '040405@Nac',
      database: 'template_nestjs',
      entities: [User, Product],
      synchronize: true,
      retryAttempts: 3,
      retryDelay: 3000,
      extra: {
        connectionLimit: 10,
        connectTimeout: 10000
      }
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
