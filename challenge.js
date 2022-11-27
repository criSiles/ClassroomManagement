import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const students = [
  {
    age: 32,
    examScores: [],
    gender: "male",
    name: "Edu",
  },
  {
    age: 18,
    examScores: [],
    gender: "male",
    name: "Miguel",
  },
  {
    age: 45,
    examScores: [],
    gender: "female",
    name: "Marta",
  },
  {
    age: 20,
    examScores: [],
    gender: "female",
    name: "Silvia",
  },
  {
    age: 26,
    examScores: [],
    gender: "female",
    name: "Cristina",
  },
];

const availableMaleNames = [
  "Pepe",
  "Juan",
  "Victor",
  "Leo",
  "Francisco",
  "Carlos",
];

const availableFemaleNames = [
  "Cecilia",
  "Ana",
  "Luisa",
  "Lucía",
  "Isabel",
  "Virginia",
];

const availableGenders = ["male", "female"];

function getNumberFromConsole() {
  const promise = new Promise((resolve, reject) => {
    rl.question("Enter a number: ", (num) => {
      const number = parseInt(num);
      rl.pause();
      isNaN(number)
        ? reject(
            new Error("You didn't entered a number, please enter a number.")
          )
        : resolve(number);
    });
  });

  return promise;
}

function showStudentsInTable(myStudents) {
  console.table(myStudents);
}

function howManyStudents(myStudents) {
  return myStudents.length;
}

function printStudentsNames(myStudents) {
  for (const student of myStudents) {
    console.log(student.name);
  }
}

function deleteLastStundent(myStudents) {
  console.log("The student deleted was", myStudents.pop());
  return myStudents;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min) + min);
}

function deleteRandomStudent(myStudents) {
  myStudents.splice(getRandomInt(0, myStudents.length), 1);

  return myStudents;
}

function getStudentsByGender(myStudents, gender) {
  return myStudents.filter((student) => student.gender === gender);
}

function getFemaleStudents(myStudents) {
  return getStudentsByGender(myStudents, "female");
}

function getNumberGenderStudents(myStudents) {
  console.log(
    "There is/are",
    getStudentsByGender(myStudents, "female").length,
    "female/s student/s and",
    getStudentsByGender(myStudents, "male").length,
    "male/s student/s."
  );
}

function areAllFemales(myStudents) {
  return getFemaleStudents(myStudents).length === myStudents.length;
}

function getStudentsByAge(myStudents) {
  return printStudentsNames(
    myStudents.filter((student) => student.age >= 20 && student.age <= 25)
  );
}

function getStudentByName(myStudents, name) {
  for (const student of myStudents) {
    if (student.name === name) {
      return student;
    }
  }
}

function getNewStudentAge() {
  return getRandomInt(20, 51);
}

function getNewStudentGender() {
  return availableGenders[getRandomInt(0, availableGenders.length)];
}

function getNewStudentName(myGender) {
  let newStudentName = "";
  if (myGender === "male") {
    newStudentName =
      availableMaleNames[getRandomInt(0, availableMaleNames.length)];
  } else {
    newStudentName =
      availableFemaleNames[getRandomInt(0, availableFemaleNames.length)];
  }
  return newStudentName;
}

function addingNewStudents(myStudents) {
  // The gender of the new student is random and it must be chosen before the
  // initialization of the structure.
  let myGender = getNewStudentGender();

  let newStudent = {
    age: getNewStudentAge(),
    examScores: [],
    gender: myGender,
    name: getNewStudentName(myGender),
  };

  myStudents.push(newStudent);
  return myStudents;
}

function getYoungerStudent(myStudents) {
  for (const student of myStudents) {
    if (student.age === Math.min(...getStudentsAges(myStudents))) {
      console.log("The youngest student is", student.name);
    }
  }
}

function getStudentsAges(myStudents) {
  let studentsAges = [];
  for (const student of myStudents) {
    studentsAges.push(student.age);
  }
  return studentsAges;
}

function getAverageAges(myStudents) {
  return (
    getStudentsAges(myStudents).reduce((a, b) => a + b, 0) / myStudents.length
  ).toFixed(2);
}

function getAverageAgesFemale(myStudents) {
  return getAverageAges(getFemaleStudents(myStudents));
}

function addNewCalification(myStudents) {
  for (const student of myStudents) {
    student.examScores.push(getRandomInt(0, 11));
  }
  return myStudents;
}

function sortStudentsArrayByName(myStudents) {
  let studentsNames = [];
  for (const student of students) {
    studentsNames.push(student.name);
  }
  let sortedStudentsNames = studentsNames.sort();

  let sortedStudents = [];
  for (const name of sortedStudentsNames) {
    sortedStudents.push(getStudentByName(myStudents, name));
  }

  return sortedStudents;
}

function getAverageScores(myStudents) {
  let scoresStudents = [];
  for (const student of myStudents) {
    let totalScore = 0;
    for (const score of student.examScores) {
      totalScore = totalScore + score;
    }
    scoresStudents.push(totalScore / student.examScores.length);
  }
  return scoresStudents;
}

function getMaxValueInArray(myArray) {
  let maxValue = 0;
  for (const value of myArray) {
    if (value > maxValue) {
      maxValue = value;
    }
  }
  return maxValue;
}

function bestGradesStudent(myStudents) {
  let scoresStudents = [];
  for (const student of myStudents) {
    let totalScore = 0;
    for (const score of student.examScores) {
      totalScore = totalScore + score;
    }
    scoresStudents.push(totalScore);
  }
  let myStudent = myStudents[scoresStudents.indexOf(getMaxValueInArray(scoresStudents))];
  console.log("The student with best grades is", myStudent.name);
  return myStudent;
}

function bestAverageScore(myStudents) {
  let averageScoreStudent = getAverageScores(myStudents);
  let myStudent = myStudents[averageScoreStudent.indexOf(getMaxValueInArray(averageScoreStudent))];
  console.log("The student with best average score is", myStudent.name, "and his average is", getMaxValueInArray(averageScoreStudent))
  return myStudent;
}

function addOnePointToScores(myStudents) {
  for (const student of myStudents) {
    student.examScores = student.examScores.map((x) =>
      x + 1 <= 10 ? x + 1 : 10
    );
    student.examScores.length == 0 ? student.examScores.push(10) : null;
  }
  return myStudents;
}

async function main() {
  let numberMenu;
  do {
    try {
      console.log(
        "\n Menu: Write a number to see the content you want.\n\n \
       1) Show all students in table format.\n \
       2) Show on the console the number of students in class.\n \
       3) Show all student names on the console.\n \
       4) Remove the last student from the class.\n \
       5) Randomly remove a student from the class.\n \
       6) Show on the console all the data of the female students.\n \
       7) Show on the console the number of male and female students in the class.\n \
       8) Display true or false on the console if all the students in the class are females.\n \
       9) Show on the console the names of the students who are between 20 and 25 years old.\n \
       10) Add a new student with the following data: Random name, random age between 20-50, random gender and empty grades.\n \
       11) Show on the console the name of the youngest person in the class.\n \
       12) Show the average age of all students in the class on the console.\n \
       13) Show on the console the average age of the females students in the class.\n \
       14) Add new note to students.\n \
       15) Sort the array of students alphabetically by name.\n \
       16) Show the student in the class with the best grades on the console.\n \
       17) Show on the console the highest average grade of the class and the name of the student to which it belongs.\n \
       18) Add an extra point to each existing grade from all students.\n\n \
      "
      );

      numberMenu = await getNumberFromConsole();

      switch (numberMenu) {
        case 1:
          showStudentsInTable(students);
          break;
        case 2:
          console.log("There are", howManyStudents(students), "students.");
          break;
        case 3:
          console.log("The students names are: \n");
          printStudentsNames(students);
          break;
        case 4:
          console.log(
            "Last student in the list removed, the current students are: ",
            deleteLastStundent(students)
          );
          break;
        case 5:
          console.log(
            "Random student removed, the current students now are: ",
            deleteRandomStudent(students)
          );
          break;
        case 6:
          console.log("List of female students: ", getFemaleStudents(students));
          break;
        case 7:
          getNumberGenderStudents(students);
          break;
        case 8:
          console.log("Are all the students female?", areAllFemales(students));
          break;
        case 9:
          console.log("The students with age between 20-25 are: ");
          getStudentsByAge(students);
          break;
        case 10:
          console.log(
            "The new student is the last element in the list",
            addingNewStudents(students)
          );
          break;
        case 11:
          getYoungerStudent(students);
          break;
        case 12:
          console.log(
            "The average age of the students is",
            getAverageAges(students),
            "years old."
          );
          break;
        case 13:
          console.log(
            "The average age of female students is",
            getAverageAgesFemale(students),
            "years old."
          );
          break;
        case 14:
          console.log(
            "Each student has a new calification:",
            addNewCalification(students)
          );
          break;
        case 15:
          console.log(sortStudentsArrayByName(students));
          break;
        case 16:
          (bestGradesStudent(students));
          break;
        case 17:
          (bestAverageScore(students));
          break;
        case 18:
          console.log("The final scores are:", addOnePointToScores(students));
          break;
      }
    } catch (err) {
      console.log(err.message);
    }
  } while (numberMenu !== 0);
  rl.close();
}

main();
