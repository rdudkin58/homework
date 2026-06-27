// Задача 1.
// Создайте переменные с корректными именами, чтобы сохранить следующую информацию:
// 1. firstName – имя (строка)
// 2. lastName – фамилия (строка)
// 3. isStudent – является ли учеником курса (булево значение)

const firstName = "Ринат";
const lastName = "Алимов";
const isStudent = false;

// Задача 2.
// 1. Объявите переменную age с числовым значением возраста студента.
// 2. Объявите переменную currentYear и присвойте ей значение текущего года (например, 2025).
// 3. Используя age и currentYear вычислите год рождения студента, запишите результат в переменную birthYear.

const age = 33;
const currentYear = 2026;
const birthYear = currentYear - age;

// Задача 3.
// Выведите в консоли сообщение в таком формате:
// Меня зовут [firstName] [lastName], мне [age] лет. Я ученик/ученица курса: [isStudent].

console.log(
  `Меня зовут ${firstName} ${lastName}, мне ${age} года. Я ученик курса: ${isStudent}.`,
);

// Задача 4.
// Какое значение будет у переменной result?
// let a = '123';
// let b = +'456';
// c = Number('789');
// d = Boolean(0);
// let e = Boolean(' ');
// let result = a + b + c + d + e;

// У переменной result будет значение 123456789falsetrue
