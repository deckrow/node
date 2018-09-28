const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground') //подключение к db
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB ...', err));

const courseSchema = new mongoose.Schema({  //создание схемы для заполнения
    name: {     
        type: String, 
        required: true, // валидация в mongodb
        minlength: 5,
        maxlength: 255,
        match: /pattern/ 
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],  // проверка на одно из этих слов
        lowercase: true, //uppercase
        trim: true // удаление символов в начале и конце строки
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(() => {
                    const reult = v && v.length > 0;
                    callback(result);
                },4000);
            },
            messsage: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished }, // проверка на isPublished (если true, то это поле обязательно)
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema); //модель для класса

async function createCourse() { //добавление нового элемента
    const course = new Course({
        name: 'Node.js Course',
        author: 'Mosh',
        tags: ['node', 'backend'],
        isPublished: true
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch(ex) {
        for (field in ex.errors)
            console.log(ex.errors[field]); //ex.errors[field].message (без подробной инфы)
    }    
}

async function getCourses() { //получение данных их бд (можно получить по нужному параметру)
    // eq (equal) равно
    // ne (not equal) не равно
    // gt (greater than) больше чем
    // gte (greater than or equal to) больше чем или равно
    // lt (less than) меньше чем
    // lte (less than or equal to) меньше чем или равно
    // in  в
    // nin (not in) не в
    // or
    // and
    const pageNumber = 2,
          pageSize = 10;

    const courses = await Course
        .find({ author: 'Mosh', isPublished: true })
        //.find({ price: { $gte: 10, $lte: 20 } })
        //.find({ price: { $in: [10, 15, 20] } }) //поиск по 10, 15, 20
        //.find({ author: /^Mosh/}) //регулярное выражение для поиска i - нечувствительное(походу к регистру)
        //.or([ { author: 'Mosh' }, { isPublished: true } ]) //and() работает также
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 }) //сортировка по алфавиту(по имени), 'name'
        .select({ name: 1, tags: 1 }); //выбор нужных параметров, 'name tags'
        //.count() //кол-во доков по параметру

    console.log(courses);
}

async function updateCourses(id) {
    /*(1)const course = await Course.findById(id);
    if (!course) return;

    course.isPublished = true;
    course.author = 'A A';

    const result = await course.save();

    (2)const result = await Course.update({ _id: id }, {
        $set: { 
            author: 'Mosh',
            isPublished: false
        }
    });*/
    //(3)
    const result = await Course.findByIdAndUpdate(id, {
        $set: { 
            author: 'Mosh',
            isPublished: false
        }
    }, { new: true });

    console.log(resutl);
}

async function deleteCourses(id) {
    //const result = await Course.deleteOne({ _id: id }); //deleteMany
    const result = await Course.findByIdAndRemove(id);
    console.log(result);
}

deleteCourses('asdfasdf');
