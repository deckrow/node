const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');
const t = require('../../genres-demo/models/user');

describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it('shuold return a positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it('shuold return 0 if input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Den');
        expect(result).toMatch(/Den/); //expect(result).toContain('Den');
    });
});

describe('getCurrencies', () => {
    it('should return suporten currencies', () => {
        const result = lib.getCurrencies();
        
        //to general
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        //to specific
        expect(result[0]).toBe('USD');
        expect(result[1]).toBe('AUD');
        expect(result[2]).toBe('EUR');
        expect(result.length).toBe(3);

        //Proper way
        expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');

        //Ideal way
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
    });
});

describe('getProduct', () => {
    it('should return the product with the given id', () => {
        const result = lib.getProduct(1);
        //expect(result).toEqual({ id: 1, price: 10 }); // должно быть точь в точь
        expect(result).toMatchObject({ id: 1, price: 10 }); // должны быть похожы только выбранные объекты
        expect(result).toHaveProperty('id', 1); // проверка на одно значение
    });
});

describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        //null, undefined, NaN, '', 0, false
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(a => {
            expect(() => { lib.registerUser(a) }).toThrow(); // если проверка ошибки то заносим в ф-цию
        });
    });

    it('should return a user object if valid username is passed', () => {
        const result = lib.registerUser('den');
        expect(result).toMatchObject({ username: 'den' });
        expect(result.id).toBeGreaterThan(0);
    });
});

describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points', () => {
        db.getCustomerSync = function(customerId) { 
            console.log('Fake reading customer...');
            return { id: customerId, points: 20 };
        }
        
        const order = { customerId: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {
        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
        
        // db.getCustomerSync = function(customerId) { // тоже самое что и сверху
        //     return { email: 'a' }
        // }

        mail.send = jest.fn(); // подобие отправки
        
        // let mailSend = false;
        // mail.send = function(email, message) { // mock function (12.16-18), если невозможно в реале отправить что-то на почту. мы просто генерируем подобие этого
        //     mailSend = true;
        // }
        
        lib.notifyCustomer({ customerId: 1 });

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/); // проверка аргументов
        // expect(mailSend).toBe(true);
    });
});