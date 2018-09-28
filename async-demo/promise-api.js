//const p = Promise.reject(new Error('reason for rejection...')); // new Error для подробностей
//p.catch(err => console.log(err));

const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operaction 1...');
        resolve(1);
    }, 2000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operaction 2...');
        resolve(2);
    }, 2000);
});
                        // .race вернет один
Promise.all([p1, p2])   // метод для вывода всех Promise. возвращает массив значений. запускатеся одновременно
    .then(result => console.log(result));