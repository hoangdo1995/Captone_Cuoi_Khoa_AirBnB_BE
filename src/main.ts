import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
//tạo chứng chỉ ssl
// const httpsOptions = {

//   key: fs.readFileSync('E:/backendLearn/Captone/AirBnB_BE/airbnb_be/src/secrets/rootCA.key'),
//   cert: fs.readFileSync('E:/backendLearn/Captone/AirBnB_BE/airbnb_be/src/secrets/rootCA.pem'),
// };
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:['http://localhost:3000']
  });
  const config = new DocumentBuilder()
  .setTitle('AirBnB')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document);
  await app.listen(8080);

}
bootstrap();
