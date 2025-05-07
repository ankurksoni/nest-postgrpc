import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// To run this test, use one of these commands in your terminal:
// npm test                     - Runs all tests
// npm test app.controller.spec - Runs only this specific test file
// npx jest app.controller.spec - Alternative way to run this specific test

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.sayHello('Ankur')).toEqual({ message: 'Hello, Ankur!' });  });
});
});
