import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { morganMiddleware } from './morgan.config';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as chalk from 'chalk';
import * as figlet from 'figlet';

const portHttp = process.env.HTTP_PORT;
const portWs = process.env.WS_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Books API')
    .setDescription('The bookd API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/swagger', app, document);

  app.enableCors();
  app.use(morganMiddleware);
  await app.listen(portHttp);

  await figlet('                NEST', function(err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log('');
    console.log(
      chalk.blue(
        '    --------------------------------------------------------'
      )
    );
    console.log(chalk.bold.red(data));
    console.log(
      chalk.yellow('    🎯 🐢 REST API Server is running on ') +
        chalk.italic.green(`http://0.0.0.0:${portHttp}/api/swagger 🐢 🎯 `)
    );
    console.log('');
    console.log(
      chalk.yellow('    🎯 🐢 WS Server is running on ') +
        chalk.italic.green(`ws://0.0.0.0:${portWs}/api/swagger 🐢 🎯 `)
    );
    console.log('');
    console.log(
      chalk.yellow('    🎯 🐢 GRAPHQL API Server is running on ') +
        chalk.italic.green(`http://0.0.0.0:${portHttp}/graphql 🐢 🎯 `)
    );
    console.log(
      chalk.blue(
        '    --------------------------------------------------------'
      )
    );
  });
}
bootstrap();
