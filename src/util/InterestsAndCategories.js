import Networking from "./Networking";

/** Returns the interest associated with a category name.
* @param {String} categoryName The name of the category.
* @returns {Object} The interest object that comes from the hard-coded json. */
export function getInterestFromCategory(categoryName) {
    const matchingInterest = Object.values(interests).filter((interestObj) => {
        return interestObj.categories.map((cat) => cat.toLowerCase()).includes(categoryName.toLowerCase());
    })[0] || {};

    return { 
        interest: matchingInterest.Name,
        interestID: matchingInterest.ID,
        interestColor: matchingInterest.color,
    } || { interest: 'Unknown', interestID: -1, interestColor: 'magenta' };
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

export const interests = {
    "Academic": {
        ID: 0,
        color: 'pink',
        Name: "Academic",
        emoji: '✍️',
        categories: ['Academic Achievement Program', 'Departmental', 'Departmental Clubs','Honors Society']
    },
    "Community Engagement": {
        ID: 1,
        color: 'cyan',
        Name: "Community Engagement",
        emoji: '👥',
        categories: ['Service/Volunteer Work','University Programs and Activities','Mentorship',
                    'Community Service']
    },
    "Culture": {
        ID: 2,
        color: 'green',
        Name: "Culture",
        emoji: '🗺',
        categories: ['Cultural Groups','Multicultural Groups','Languages','International','Cultural']
    },
    "Fraternity & Sorority Life": {
        ID: 3,
        color: 'indigo',
        Name: "Fraternity & Sorority Life",
        emoji: '🏛',
        categories: ['Fraternity Life', 'Sorority Life','Sorority']
    },
    "Media & Publication": {
        ID: 4,
        color: 'grey',
        Name: "Media & Publication",
        emoji: '🗞',
        categories: ['Literary Groups','Student Media','Film + Television','Literary/Publication']
    },
    "Health Professions & Clinical Interest": {
        ID: 5,
        color: 'darkred',
        Name: "Health Professions & Clinical Interest",
        emoji: '🏥',
        categories: ['Health Professions and Clinical Interests']
    },
    "Performance & Arts": {
        ID: 6,
        color: 'darkblue',
        Name: "Performance & Arts",
        emoji: '🎭',
        categories: ['Dance','Comedy','Improv','Music','Vocal','Fine Arts','Acting',
        'Photography','Architecture']
    },
    "Politics and Advocacy": {
        ID: 7,
        color: 'antiquewhite',
        Name: "Politics and Advocacy",
        emoji: '💬',
        categories: ['Political Groups','Activism and Advocacy','Critique and Discussion']
    },
    "Professional Development": {
        ID: 8,
        color: 'aquamarine',
        Name: "Professional Development",
        emoji: '🎓',
        categories: ['Business','Career-Oriented','Research']
    },
    "Religion and Spirituality": {
        ID: 9,
        color: 'tomato',
        Name: "Religion and Spirituality",
        emoji: '💭',
        categories: ['Religious Groups', 'Atheist/Agnostic/Non-Belief']
    },
    "Science and Technology": {
        ID: 10,
        color: 'purple',
        Name: "Science and Technology",
        emoji: '🔬',
        categories: ['Computer Science','Biology','Chemistry','Physics','Sustainability',
        'Technology', 'Engineering', 'Computers and Technology', 'Technology']
    },
    "Self-Identity": {
        ID: 11,
        color: 'black',
        Name: "Self-Identity",
        emoji: '❗️',
        categories: ['LGBTQ+', 'Race and Ethnicity', 'Gender', 'Humanist','Identity/Cultural']
    },
    "Social": {
        ID: 12,
        color: 'cornflowerblue',
        Name: "Social",
        emoji: '🗣',
        categories: ['Social']
    },
    "Sports and Games": {
        ID: 13,
        color: 'crimson',
        Name: "Sports and Games",
        emoji: '👟',
        categories: ['Recreational','Varsity Sports','Intramural Sports','Board and Video Games',
        'Role-Play','Club-Sports']
    },
    "Student Governance": {
        ID: 14,
        color: 'pink',
        Name: "Student Governance",
        emoji: '💼',
        categories: ['Student Council','Student Government Committees','Business']
    },
    "Students with Different Abiilities": {
        ID: 15,
        color: 'gold',
        Name: "Students with Different Abiilities",
        emoji: '🧠',
        categories: ['Learning Disability', 'Physical Disability','Special Interest']
    }
}
