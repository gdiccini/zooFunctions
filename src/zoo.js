/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const data = require('./data');

const { animals, employees, hours, prices } = data;

function animalsByIds(...ids) {
  const arrayOfAnimals = [];
  ids.forEach((id) => {
    animals.filter(animal => (animal.id === id ? arrayOfAnimals.push(animal) : undefined));
  });
  return arrayOfAnimals;
}

function animalsOlderThan(animal, age) {
  const [species] = animals.filter(singleAnimal => singleAnimal.name === animal);
  const arrayOfSingleAnimals = species.residents;
  return arrayOfSingleAnimals.every(singleAnimal => singleAnimal.age >= age);
}

function employeeByName(employeeName) {
  const employeeObject = employees.find((employee) => {
    if (employee.firstName === employeeName || employee.lastName === employeeName) {
      return true;
    }
    return undefined;
  });
  if (employeeObject === undefined) {
    return {};
  }
  return employeeObject;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  const employeeManagers = employees.map((employee => employee.managers));
  const array2 = [];
  employeeManagers.forEach(array => array2.push(...array));
  const trueOrFalse = array2.find(element => element === id);
  if (trueOrFalse === undefined) {
    return false;
  }
  return true;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}


function animalCount(species) {
  const [singleSpecie] = animals.filter(singleAnimal => singleAnimal.name === species);
  const allAnimals = {};
  animals.forEach((animal) => {
    allAnimals[animal.name] = animal.residents.length;
  });
  if (species !== undefined) {
    const pop = singleSpecie.residents.length;
    return pop;
  }
  return allAnimals;
}

function entryCalculator(entrants) {
}

function animalMap(options) {
}

function schedule(dayName) {
  const openingHours = Object.entries(hours);
  return openingHours;
//   const scheduleObject = {};
//   const scheduleObjArray = [];

//   openingHours.forEach((day, index) => {
//     const dayOfWeek = {};
//     dayOfWeek[day[0]] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
//     scheduleObjArray.push(dayOfWeek);
//     scheduleObject[day[0]] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
//   });

//   scheduleObject.Monday = 'CLOSED';
//   scheduleObjArray[6] = { Monday: 'CLOSED' };
//   openingHours.forEach((day, index) => day.push(scheduleObjArray[index]));
//   const singleDay = openingHours.find(element => element[0] === dayName);

//   if (dayName === undefined) {
//     return scheduleObject;
//   }
//   return singleDay[2];
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

// function increasePrices(percentage) {
//   const { Adult, Senior, Child } = prices;
//   data.prices.Adult = parseFloat((Adult * ((1 + percentage / 100) + 0.005)).toFixed(2));
//   data.prices.Senior = parseFloat((Senior * ((1 + percentage / 100) + 0.005)).toFixed(2));
//   data.prices.Child = parseFloat((Child * ((1 + percentage / 100) + 0.005)).toFixed(2));
// }

function employeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
