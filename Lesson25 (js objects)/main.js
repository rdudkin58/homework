// Задача 1.
// Создайте объект person с несколькими свойствами, содержащими информацию о вас. Затем выведите значения этих свойств в консоль.

const person = {
  firstName: "Ринат",
  secondName: "Алимов",
  age: 33,
  hometown: "Пенза",
  isProgrammer: false,
};
console.log(person);

// Задача 2.
// Создайте функцию isEmpty, которая проверяет является ли переданный объект пустым. Если объект пуст - верните true, в противном случае false.

const obj = {};
function isEmpty(objectName) {
  for (const key in objectName) return false;
  return true;
  //  console.log(Object.keys(objectName).length);
  //  if (Object.keys(objectName).length === 0) return true;
  //  else return false;
}
if (isEmpty(obj)) console.log("Объект пустой");
else console.log("Объект не пустой");

// Задача 3.
// Создайте объект task с несколькими свойствами: title, description, isCompleted.
// Напишите функцию cloneAndModify(object, modifications), которая с помощью оператора spread создает копию объекта и применяет изменения из объекта modifications.
// Затем с помощью цикла for in выведите все свойства полученного объекта.

const task = {
  title: "Задача",
  description: "Создать модифицированный объект",
  isCompleted: true,
};

const newTask = {
  title_: "Подзадача",
  description_: "Модификация",
};

function cloneAndModify(object, modifications) {
  let clonedObject = { ...object, ...modifications };
  return clonedObject;
}

const newObject = cloneAndModify(task, newTask);
for (const key in newObject) console.log(newObject[key]);

// Задача 4.
// Создайте функцию callAllMethods, которая принимает объект и вызывает все его методы.

// Пример использования:
// const myObject = {
//     method1() {
//         console.log('Метод 1 вызван');
//     },
//     method2() {
//         console.log('Метод 2 вызван');
//     },
//     property: 'Это не метод'
// };
// callAllMethods(myObject);

const myObject = {
  method1() {
    console.log("Метод 1 вызван");
  },
  method2() {
    console.log("Метод 2 вызван");
  },
  property: "Это не метод",
};

const callAllMethods = (object) => {
  for (const key in object)
    if (typeof object[key] === "function") object[key]();
};

callAllMethods(myObject);
