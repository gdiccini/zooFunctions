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

// INÍCIO das Funções auxiliares animalMap

// Função que ordena os arrays quando necessário
function sortedOrNot(options, specie, animalsNames, speciesOnRegions) {
  const animalObj = {};
  if (options.sorted === true) {
    animalObj[specie.name] = animalsNames.sort();
  } else {
    animalObj[specie.name] = animalsNames;
  }
  speciesOnRegions[specie.location].push(animalObj);
}

// Função quando nenhum argumento é passado
function noArgument() {
  const speciesOnRegions = { NE: [], NW: [], SE: [], SW: [] };
  animals.forEach((animal) => {
    speciesOnRegions[animal.location].push(animal.name);
  });
  return speciesOnRegions;
}

// Função quando há includeNames: true
function mapWithNames(options) {
  const speciesOnRegions = { NE: [], NW: [], SE: [], SW: [] };
  animals.forEach((specie) => {
    const animalsNames = [];
    specie.residents.forEach((animal) => {
      animalsNames.push(animal.name);
    });
    sortedOrNot(options, specie, animalsNames, speciesOnRegions);
  });
  return speciesOnRegions;
}

// Função quando há includeNames: true && ( sex:'female' || sex:'male' )
function mapWithNamesAndSex(options) {
  const speciesOnRegions = { NE: [], NW: [], SE: [], SW: [] };
  animals.forEach((specie) => {
    const animalsNames = [];
    specie.residents.forEach((animal) => {
      if (animal.sex === options.sex) {
        animalsNames.push(animal.name);
      }
    });
    sortedOrNot(options, specie, animalsNames, speciesOnRegions);
  });
  return speciesOnRegions;
}
// FIM das funções auxiliares da fn animalMap

function animalMap(options) {
  if (options === undefined) {
    return noArgument();
  } else if (options.includeNames !== undefined && options.sex !== undefined) {
    return mapWithNamesAndSex(options);
  } else if (options.includeNames !== undefined) {
    return mapWithNames(options);
  }
  return noArgument();
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
  const employeesInfoArray = employees.map(current => [
    current.id,
    current.firstName,
    current.lastName,
    current.responsibleFor,
  ],
  );
  // Transforms de current.responsibleFor codes into animals names;
  employeesInfoArray.forEach((employee, index1) => {
    employee[3].forEach((animalCode, index2) => {
      animals.forEach((animal) => {
        if (animalCode === animal.id) {
          employeesInfoArray[index1][3][index2] = animal.name;
        }
      });
    });
  });
  // crian um objeto com o retorno esperado dependendo de idOrName
  const resp = {};
  employeesInfoArray.forEach((current) => {
    if (idOrName === undefined) {
      resp[`${current[1]} ${current[2]}`] = current[3];
    } else if (idOrName === current[0] || idOrName === current[1] || idOrName === current[2]) {
      resp[`${current[1]} ${current[2]}`] = current[3];
    }
  });
  return resp;
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
