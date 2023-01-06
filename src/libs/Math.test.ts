import { Math } from "./Math";

describe('Testing Math library', () => {
     it('Should sum two numbers correctly', () => {
          const response = Math.sum(5, 10);
          expect(response).toBe(15)
     });
     
     it('Should subtract two numbers correctly', () => {
          const response = Math.sub(100, 10);
          expect(response).toBe(90)
     });
     
     it('Should divide two numbers correctly', () => {
          const response = Math.div(10, 2);
          expect(response).toBe(5)
     
          const response2 = Math.div(3, 0);
          expect(response2).toBe(false)
     });
     
     it('Should multiply two numbers correctly', () => {
          const response = Math.mut(5, 10);
          expect(response).toBe(50)
     });
})

