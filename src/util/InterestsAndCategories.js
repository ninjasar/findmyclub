import Networking from "./Networking";

export const interests = {
    "Academic": {
        "Color": "#D0021B",
        "ID": 0,
        "Name": "Academic",
        "categories": [
            "Academic Achievement Program",
            "Departmental",
            "Departmental Clubs",
            "Honors Society"
        ],
        "emoji": "✍️"
    },
    "Community Engagement": {
        "Color": "#F5A623",
        "ID": 1,
        "Name": "Community Engagement",
        "categories": [
            "Service/Volunteer Work",
            "University Programs and Activities",
            "Mentorship",
            "Community Service"
        ],
        "emoji": "👥"
    },
    "Culture": {
        "Color": "#F8E71C",
        "ID": 2,
        "Name": "Culture",
        "categories": [
            "Cultural Groups",
            "Multicultural Groups",
            "Languages",
            "International",
            "Cultural"
        ],
        "emoji": "🗺"
    },
    "Fraternity & Sorority Life": {
        "Color": "#7ED321",
        "ID": 3,
        "Name": "Fraternity & Sorority Life",
        "categories": [
            "Fraternity Life",
            "Sorority Life",
            "Sorority"
        ],
        "emoji": "🏛"
    },
    "Health Professions & Clinical Interest": {
        "Color": "#4A90E2",
        "ID": 5,
        "Name": "Health Professions & Clinical Interest",
        "categories": [
            "Health Professions and Clinical Interests"
        ],
        "emoji": "🏥"
    },
    "Media & Publication": {
        "Color": "#417505",
        "ID": 4,
        "Name": "Media & Publication",
        "categories": [
            "Literary Groups",
            "Student Media",
            "Film + Television",
            "Literary/Publication"
        ],
        "emoji": "🗞"
    },
    "Performance & Arts": {
        "Color": "#10509B",
        "ID": 6,
        "Name": "Performance & Arts",
        "categories": [
            "Dance",
            "Comedy",
            "Improv",
            "Music",
            "Vocal",
            "Fine Arts",
            "Acting",
            "Photography",
            "Architecture"
        ],
        "emoji": "🎭"
    },
    "Politics and Advocacy": {
        "Color": "#8568DD",
        "ID": 7,
        "Name": "Politics and Advocacy",
        "categories": [
            "Political Groups",
            "Activism and Advocacy",
            "Critique and Discussion"
        ],
        "emoji": "💬"
    },
    "Professional Development": {
        "Color": "#5724F2",
        "ID": 8,
        "Name": "Professional Development",
        "categories": [
            "Business",
            "Career-Oriented",
            "Research"
        ],
        "emoji": "🎓"
    },
    "Religion and Spirituality": {
        "Color": "#BD10E0",
        "ID": 9,
        "Name": "Religion and Spirituality",
        "categories": [
            "Religious Groups",
            "Atheist/Agnostic/Non-Belief"
        ],
        "emoji": "💭"
    },
    "Science and Technology": {
        "Color": "#FF7BAC",
        "ID": 10,
        "Name": "Science and Technology",
        "categories": [
            "Computer Science",
            "Biology",
            "Chemistry",
            "Physics",
            "Sustainability",
            "Technology",
            "Engineering",
            "Computers and Technology",
            "Technology"
        ],
        "emoji": "🔬"
    },
    "Self-Identity": {
        "Color": "#DFCEEB",
        "ID": 11,
        "Name": "Self-Identity",
        "categories": [
            "LGBTQ+",
            "Race and Ethnicity",
            "Gender",
            "Humanist",
            "Identity/Cultural"
        ],
        "emoji": "❗️"
    },
    "Social": {
        "Color": "#50E3C2",
        "ID": 12,
        "Name": "Social",
        "categories": [
            "Social"
        ],
        "emoji": "🗣"
    },
    "Sports and Games": {
        "Color": "#3CCED9",
        "ID": 13,
        "Name": "Sports and Games",
        "categories": [
            "Recreational",
            "Varsity Sports",
            "Intramural Sports",
            "Board and Video Games",
            "Role-Play",
            "Club-Sports"
        ],
        "emoji": "👟"
    },
    "Student Governance": {
        "Color": "#0295A0",
        "ID": 14,
        "Name": "Student Governance",
        "categories": [
            "Student Council",
            "Student Government Committees",
            "Business"
        ],
        "emoji": "💼"
    },
    "Students with Different Abilities": {
        "Color": "#8C480B",
        "ID": 15,
        "Name": "Students with Different Abilities",
        "categories": [
            "Learning Disability",
            "Physical Disability",
            "Special Interest"
        ],
        "emoji": "🧠"
    }
};

export const umbrellas = [
    { id: 78809, name: 'Center for Student Life' },
    { id: 106007, name: 'College of Arts & Science' },
    { id: 86331, name: 'College of Dentistry' },
    { id: 171308, name: 'College of Global Public Health' },
    { id: 75591, name: 'Gallatin School of Individualized Study' },
    { id: 89841, name: 'LGBTQ Student Center' },
    { id: 111059, name: 'Liberal Studies' },
    { id: 162994, name: 'NYU Rory Meyers College of Nursing' },
    { id: 89840, name: 'Residential Life & Housing Services' },
    { id: 89838, name: 'School of Engineering' },
    { id: 116946, name: 'School of Professional Studies' },
    { id: 89839, name: 'Silver School of Social Work' },
    { id: 86332, name: 'Stern Undergraduate' },
    { id: 53830, name: 'Student Activities Board' },
    { id: 78810, name: 'Tisch School of the Arts' }, 
];

/** Returns the interest associated with a category name.
* @param {String} categoryName The name of the category.
* @returns {Object} The interest object that comes from the hard-coded json. */
export function getInterestFromCategory(categoryName) {
    if (!categoryName) {
        return undefined;
    }
    const matchingInterests = Object.values(interests).filter((interestObj) => {
        return interestObj.categories.map((cat) => cat.toLowerCase()).includes(categoryName.toLowerCase());
    })
    const interest = matchingInterests[0] || { Name: 'Unknown', id: -1, Color: 'gray' };
    return interest;
}


/** Finds the category by the given ID. 
* @param {String} ID The id of the category you're looking for.
* @returns {Object} Returns a category object. */
export async function getCategoryFromID(ID) {
    const allCats = await Networking.getCategories();
    const filtered = allCats.filter((cat) => cat.ID === ID);
    
    if(filtered.length > 0) return filtered[0];
    else return null;
}