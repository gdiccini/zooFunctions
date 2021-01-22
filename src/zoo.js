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

const { animals, employees } = data;

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
  const employeeObject = employees.find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
  if (employeeObject === undefined) {
    return {};
  }
  return employeeObject;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

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
