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
  if (species !== undefined) {
    const [singleSpecie] = animals.filter(singleAnimal => singleAnimal.name === species);
    return singleSpecie.residents.length;;
  }
  const allAnimals = {}
  animals.forEach((animal) => allAnimals[animal.name] = animal.residents.length);
  return allAnimals;
}

function entryCalculator(entrants) {
  if (entrants === 0 || entrants === undefined) {
    return 0;
  }
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
