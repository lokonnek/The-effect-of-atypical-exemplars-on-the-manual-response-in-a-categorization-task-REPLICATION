// In this file you can specify the trial data for your experiment


const trial_info = {
    forced_choice: [
        {
            question: "Are you left or right handed?",
            option1: 'right handed',
            option2: 'left handed'
        }
    ]
};


const data = [
// atypical
    {'animal_name': 'Eel', 'correct_category': 'fish', 'wrong_category': 'reptile', 'type': 'atypical'},
    {'animal_name': 'Whale', 'correct_category': 'mammal', 'wrong_category': 'fish',  'type': 'atypical'},
    {'animal_name': 'Sea lion', 'correct_category': 'mammal', 'wrong_category': 'fish',  'type': 'atypical'},
    {'animal_name': 'Penguin', 'correct_category': 'bird', 'wrong_category': 'fish',  'type': 'atypical'},
    {'animal_name': 'Butterfly', 'correct_category': 'insect', 'wrong_category': 'bird',  'type': 'atypical'},
    {'animal_name': 'Bat', 'correct_category': 'mammal', 'wrong_category': 'bird',  'type': 'atypical'},
// typical
    {'animal_name': 'Hawk', 'correct_category': 'bird', 'wrong_category': 'reptile', 'type': 'typical'},
    {'animal_name': 'Dog', 'correct_category': 'mammal', 'wrong_category': 'insect',  'type': 'typical'},
    {'animal_name': 'Horse', 'correct_category': 'mammal', 'wrong_category': 'bird',  'type': 'typical'},
    {'animal_name': 'Shark', 'correct_category': 'fish', 'wrong_category': 'mammal',  'type': 'typical'},
    {'animal_name': 'Alligator', 'correct_category': 'reptile', 'wrong_category': 'mammal',  'type': 'typical'},
    {'animal_name': 'Rabbit', 'correct_category': 'mammal', 'wrong_category': 'reptile',  'type': 'typical'},
    {'animal_name': 'Chameleon', 'correct_category': 'reptile', 'wrong_category': 'insect',  'type': 'typical'},
    {'animal_name': 'Cat', 'correct_category': 'mammal', 'wrong_category': 'reptile',  'type': 'typical'},
    {'animal_name': 'Sparrow', 'correct_category': 'bird', 'wrong_category': 'mammal',  'type': 'typical'},
    {'animal_name': 'Goldfish', 'correct_category': 'fish', 'wrong_category': 'amphibian',  'type': 'typical'},
    {'animal_name': 'Salmon', 'correct_category': 'fish', 'wrong_category': 'mammal',  'type': 'typical'},
    {'animal_name': 'Rattlesnake', 'correct_category': 'reptile', 'wrong_category': 'amphibian',  'type': 'typical'},
    {'animal_name': 'Lion', 'correct_category': 'mammal', 'wrong_category': 'fish',   'type': 'typical'}
];

const trial_data = _.shuffle(data);
const test_trial_data = trial_data.slice(0, 3);
const main_trial_data = trial_data.slice(3, trial_data.length);

