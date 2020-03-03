const _ = require("lodash");

const evenlyDistributePopulation = (
  dividedLands,
  populationPerClusterOfLands
) => {
  const maxPopulationPerLand = populationPerClusterOfLands / 6;
  const minPopulationPerLand = maxPopulationPerLand / 5;

  const populatedDividedLands = dividedLands.map(cluster => {
    let populationPool = populationPerClusterOfLands;

    return cluster.map((land, index) => {
      if (index === cluster.length - 1) {
        land.population = populationPool;
        land.type = "Capital";
      } else {
        const populationNumber = _.random(
          minPopulationPerLand,
          maxPopulationPerLand
        );

        land.population = populationNumber;
        land.type = "Regular";
        populationPool = populationPool - populationNumber;
      }
      return land;
    });
  });
  return populatedDividedLands;
};

module.exports = {
  evenlyDistributePopulation
};
