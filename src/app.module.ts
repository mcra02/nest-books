import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './app.gateway';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({ envFilePath: '.env' }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: './src/Schema.graphql',
      context: Request => {
        return { ...Request };
      }
    }),
    AuthorModule,
    BookModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [AppGateway],
  exports: [AppGateway]
})
export class AppModule {}
