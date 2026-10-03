const learnerName: string = 'Asha';
const completedLessons: number = 3;
const readyToBuild: boolean = true;

function introduce(name: string, lessons: number): string {
  return `${name} has completed ${lessons} lessons.`;
}

console.log(introduce(learnerName, completedLessons));
console.log(`Ready for the capstone: ${readyToBuild}`);
