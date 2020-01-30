// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Creates pAequor object 
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    // Changes one random base in DNA to another random one:
    mutate() {
      const randElement = Math.floor(Math.random() * this.dna.length);
      switch (dna[randElement]) {
        case 'A':
          const newBasesA = ['T', 'C', 'G'];
          dna[randElement] = newBasesA[Math.floor(Math.random() * 3)];
          break;
        case 'T':
          const newBasesT = ['A', 'C', 'G'];
          dna[randElement] = newBasesT[Math.floor(Math.random() * 3)];
          break;
        case 'C':
          const newBasesC = ['T', 'A', 'G'];
          dna[randElement] = newBasesC[Math.floor(Math.random() * 3)];
          break;
        case 'G':
          const newBasesG = ['T', 'C', 'A'];
          dna[randElement] = newBasesG[Math.floor(Math.random() * 3)];
          break;
      }
    },
    // Compares DNA with another organism, counts percentage of identical bases in the same locations. Doesn't return anything, prints a string.
    compadeDNA(pAequor) {
      let similaritiesNum = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          similaritiesNum++;
        }
      }
      const percentageSim = (100 * similaritiesNum / this.dna.length).toFixed(2);
      console.log(`Specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${percentageSim}% DNA in common.`);
    },
    // If > 60% of DNA consists of bases 'C' or 'G' the organism will likely survive.
    willLikelySurvive() {
      const cOrG = this.dna.filter(el => el === "C" || el === "G");
      return cOrG.length / this.dna.length >= 0.6;
    }
  }
};

const survivors = [];
let id = 1;

while (survivors.length < 30) {
  let newOrg = pAequorFactory(id, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    survivors.push(newOrg);
  }
  id++;
}

console.log(survivors);

/*
const first = pAequorFactory(1, mockUpStrand());
console.log(first.dna);
first.mutate();
console.log(first.dna);

const second = pAequorFactory(2, mockUpStrand());
console.log(second.dna);

first.compadeDNA(second);
console.log(first.willLikelySurvive());
console.log(second.willLikelySurvive());
*/