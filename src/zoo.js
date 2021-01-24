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
  if (!entrants) {
    return 0;
  }
  const ages = Object.keys(entrants);
  const quantity = Object.values(entrants);
  const constAgesAndQuantity = [];
  ages.forEach((age, index) => constAgesAndQuantity.push([age, quantity[index]]));
  let sum = 0;

  constAgesAndQuantity.forEach((curr) => {
    if (curr[0] === 'Adult') {
      const price = prices.Adult;
      sum += curr[1] * price;
    } else if (curr[0] === 'Senior') {
      sum += curr[1] * prices.Senior;
    } else if (curr[0] === 'Child') {
      sum += curr[1] * prices.Child;
    }
  }, 0);
  return sum;
}

function animalMap(options) {

}

function schedule(dayName) {
  const openingHours = Object.entries(hours);
  const scheduleObject = {};
  const scheduleObjArray = [];

  openingHours.forEach((day, index) => {
    const dayOfWeek = {};
    dayOfWeek[day[0]] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
    scheduleObjArray.push(dayOfWeek);
    scheduleObject[day[0]] = dayOfWeek[day[0]];
  });

  scheduleObject.Monday = 'CLOSED';
  scheduleObjArray[6] = { Monday: 'CLOSED' };
  openingHours.forEach((day, index) => day.push(scheduleObjArray[index]));
  const singleDay = openingHours.find(element => element[0] === dayName);

  if (dayName === undefined) {
    return scheduleObject;
  }
  return singleDay[2];
}

function oldestFromFirstSpecies(id) {
  const firstAnimal = employees.find(emp => emp.id === id).responsibleFor[0];
  const allFromSpecies = animals.find(animal => animal.id === firstAnimal).residents;
  return allFromSpecies.reduce((result, curr) => {
    if (curr.age > result[2]) {
      result[0] = curr.name;
      result[1] = curr.sex;
      result[2] = curr.age;
      return result;
    }
    return result;
  }, ['', '', 0]);
}

function increasePrices(percentage) {
  const { Adult, Senior, Child } = prices;
  const percent = 1 + (percentage / 100);
  data.prices.Adult = (Math.round(Adult * 100 * percent)) / 100;
  data.prices.Senior = (Math.round(Senior * 100 * percent)) / 100;
  data.prices.Child = (Math.round(Child * 100 * percent)) / 100;
}

function employeeCoverage(idOrName) {
  const namesAndCoverageCode = {};
  employees.forEach((worker) => {
    const empName = `${worker.firstName} ${worker.lastName}`;
    const animalsCodes = worker.responsibleFor;
    const animalsNames = [];
    animalsCodes.forEach((code, index) => {
      animals.forEach((animal) => {
        const animalName = animal.name;
        if (animal.id === code) {
          animalsNames.push(animalName);
        }
      });
    });
    namesAndCoverageCode[empName] = animalsNames;
  });
  return namesAndCoverageCode;
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
