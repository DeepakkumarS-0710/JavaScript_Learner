const learnerName = 'Asha';
const completedLessons = 3;
const readyToBuild = true;
function introduce(name, lessons) {
    return `${name} has completed ${lessons} lessons.`;
}
console.log(introduce(learnerName, completedLessons));
console.log(`Ready for the capstone: ${readyToBuild}`);
