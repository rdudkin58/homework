"use strict";
// Задание 1.
// Дан массив пользователей:
// const users = [
//   { name: 'Alex', age: 24, isAdmin: false },
//   { name: 'Bob', age: 13, isAdmin: false },
//   { name: 'John', age: 31, isAdmin: true },
//   { name: 'Jane', age: 20, isAdmin: false },
//]
// Добавьте в конец массива двух пользователей:
// { name: 'Ann', age: 19, isAdmin: false },
// { name: 'Jack', age: 43, isAdmin: true }

const users = [
  { name: "Alex", age: 24, isAdmin: false },
  { name: "Bob", age: 13, isAdmin: false },
  { name: "John", age: 31, isAdmin: true },
  { name: "Jane", age: 20, isAdmin: false },
];

users[4] = { name: "Ann", age: 19, isAdmin: false };
users.push({ name: "Jack", age: 43, isAdmin: true });

console.log(users);

// Задание 2.
// Используя массив пользователей users из предыдущего задания, напишите функцию getUserAverageAge(users), которая возвращает средний возраст пользователей.

const getUserAverageAge = (users) => {
  let UserAverageAge = 0;

  // for (let i = 0; i < users.length; i++) UserAverageAge += users[i].age;
  // return UserAverageAge / users.length;

  users.forEach((age, index) => {
    UserAverageAge += users[index].age;
  });
  return UserAverageAge / users.length;
};

console.log(getUserAverageAge(users));

// Задание 3.
// Используя массив пользователей users из предыдущего задания, напишите функцию getAllAdmins(users), которая возвращает массив всех администраторов.

const getAllAdmins = (users) => {
  const allAdmins = [];
  users.forEach((isAdmin, index, users) => {
    if (users[index].isAdmin) allAdmins.push(users[index]);
  });
  return allAdmins;
};

console.log(getAllAdmins(users));

// Задание 4.
// Напишите функцию first(arr, n), которая возвращает первые n элементов массива. Если n == 0, возвращается пустой массив [], если n == undefined, то возвращается массив с первым элементом.

const first = (arr, n) => {
  const nArray = [];
  switch (true) {
    case n > arr.length:
      console.error(`n=${n} не может быть больше длины массива: ${arr.length}`);
      return;
    case n == 0:
      return nArray;
    case n == undefined:
      nArray.push(arr[1]);
      return nArray;
    default:
      for (let i = 0; i < n; i++) nArray.push(arr[i]);
      return nArray;
  }
};

console.log(first(users, 7));
