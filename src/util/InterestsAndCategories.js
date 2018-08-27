import Networking from "./Networking";

export const interests = {
    "Academic": {
        ID: 0,
        Name: "Academic",
        emoji: '✍️',
        categories: ['Academic Achievement Program', 'Departmental', 'Departmental Clubs','Honors Society']
    },
    "Community Engagement": {
        ID: 1,
        Name: "Community Engagement",
        emoji: '👥',
        categories: ['Service/Volunteer Work','University Programs and Activities','Mentorship',
                    'Community Service']
    },
    "Culture": {
        ID: 2,
        Name: "Culture",
        emoji: '🗺',
        categories: ['Cultural Groups','Multicultural Groups','Languages','International','Cultural']
    },
    "Fraternity & Sorority Life": {
        ID: 3,
        Name: "Fraternity & Sorority Life",
        emoji: '🏛',
        categories: ['Fraternity Life', 'Sorority Life','Sorority']
    },
    "Media & Publication": {
        ID: 4,
        Name: "Media & Publication",
        emoji: '🗞',
        categories: ['Literary Groups','Student Media','Film + Television','Literary/Publication']
    },
    "Health Professions & Clinical Interest": {
        ID: 5,
        Name: "Health Professions & Clinical Interest",
        emoji: '🏥',
        categories: ['Health Professions and Clinical Interests']
    },
    "Performance & Arts": {
        ID: 6,
        Name: "Performance & Arts",
        emoji: '🎭',
        categories: ['Dance','Comedy','Improv','Music','Vocal','Fine Arts','Acting',
        'Photography','Architecture']
    },
    "Politics and Advocacy": {
        ID: 7,
        Name: "Politics and Advocacy",
        emoji: '💬',
        categories: ['Political Groups','Activism and Advocacy','Critique and Discussion']
    },
    "Professional Development": {
        ID: 8,
        Name: "Professional Development",
        emoji: '🎓',
        categories: ['Business','Career-Oriented','Research']
    },
    "Religion and Spirituality": {
        ID: 9,
        Name: "Religion and Spirituality",
        emoji: '💭',
        categories: ['Religious Groups', 'Atheist/Agnostic/Non-Belief']
    },
    "Science and Technology": {
        ID: 10,
        Name: "Science and Technology",
        emoji: '🔬',
        categories: ['Computer Science','Biology','Chemistry','Physics','Sustainability',
        'Technology', 'Engineering', 'Computers and Technology', 'Technology']
    },
    "Self-Identity": {
        ID: 11,
        Name: "Self-Identity",
        emoji: '❗️',
        categories: ['LGBTQ+', 'Race and Ethnicity', 'Gender', 'Humanist','Identity/Cultural']
    },
    "Social": {
        ID: 12,
        Name: "Social",
        emoji: '🗣',
        categories: ['Social']
    },
    "Sports and Games": {
        ID: 13,
        Name: "Sports and Games",
        emoji: '👟',
        categories: ['Recreational','Varsity Sports','Intramural Sports','Board and Video Games',
        'Role-Play','Club-Sports']
    },
    "Student Governance": {
        ID: 14,
        Name: "Student Governance",
        emoji: '💼',
        categories: ['Student Council','Student Government Committees','Business']
    },
    "Students with Different Abiilities": {
        ID: 15,
        Name: "Students with Different Abiilities",
        emoji: '🧠',
        categories: ['Learning Disability', 'Physical Disability','Special Interest']
    }
}

export const umbrellas = [
    {
        id: 106007,
        name: 'College of Arts & Science',
    },
    {
        id: 106007,
        name: 'College of Arts & Science',
    },
    {
        id: 106007,
        name: 'College of Arts & Science',
    },
];

/** Returns the interest associated with a category name.
* @param {String} categoryName The name of the category.
* @returns {Object} The interest object that comes from the hard-coded json. */
export function getInterestFromCategory(categoryName) {
    const matchingInterests = Object.values(interests).filter((interestObj) => {
        return interestObj.categories.map((cat) => cat.toLowerCase()).includes(categoryName.toLowerCase());
    })
    return matchingInterests[0] || { name: 'Unknown', id: -1 };
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