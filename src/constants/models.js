/**
 *
 * @param {id} pkey
 * @param {id} brief, desc : String
 * @param {id} skills, playIdeas : String
 * @param {id} brand : table.BRAND
 * @param {id} primaryImage : <img>
 * @param {id} images : [<img>]
 * @param {id} minAge, maxAge : int
 * @param {id} category : table.category
 */
const createToy = ({id, title, brief, description, skills, playIdeas, brand, primaryImage, images, minAge, maxAge, category}) => ({
    id, title, brief, description, skills, playIdeas, brand, primaryImage, images, minAge, maxAge, category
})


const toy1 = createToy({
    id: 1,
    title: 'Pretend Police Play with Police Van',
    brief: 'Learn to be a kids Police Inspector and arrest the criminals in your area',
    description: 'Learn to be a kids Police Inspector and arrest the criminals in your area with your friends with the Police Storage kit with Bang-Bang Sound Gun for kids children. Never let the thief run away from your 24/7 Guard Vehicle Truck. Be on the lookout for the baddies and put them behind the bar with this awesome pretend play police truck car for toddlers and infants play. Long hours of safe and fun playing.',
    skills: "1) Communication Skills - Helps to learn communicate child's thoughts with clarity2) Encourages imagination and creativity as your child imagines different scenarios and different role plays and builds different items3)  Problem Solving and decision Making Skills - Your child is the boss, they decide what to play, how to play and lead the play. 4) Memory Skills - Pretend play is the best way to build your child's play. Children recreate their past experiences. Did they ever see a police officer? Your child will imitate all that they observed while they were there.",
    playIdeas: "Create various scenarios of crimes and save the world from them.",
    brand: 'Toy Shine',
    primaryImage: 'https://static.wixstatic.com/media/c41d1d_927c1703a2364f838c5367a3280f0999~mv2.jpg/v1/fill/w_1024,h_647,al_c,q_85/Toyshine%20Pretend%20Police%20Play%20with%20Police.webp',
    images: ['', '', ''],
    minAge: 3,
    maxAge: 8,
    category: "Pretend Play Sets"
})

const toy2 = createToy({
    id: 2,
    title: 'Wooden Pretend Cooking Set',
    brief: 'Perfect miniature cooking set for your perfect little chef!',
    description: "Perfect miniature cooking set for your perfect little chef! A toy cooking set that mimics the kitchen. Bright and colorful. Finely crafted pot and pan with a lid, plate and bowl, spoon, ladle, and fruits and vegetables can be used as teaching props for nutrition and kitchen safety.",
    skills: '16 piece set builds fine motor and spatial skills. Multiple props spark creativity and innovation.',
    playIdeas: 'Play alone or develop social skills with friends. Let the little one serve up a feast using the kitchen set.',
    brand: 'Shumee',
    primaryImage: "https://static.wixstatic.com/media/c41d1d_c2324edc4ea14b9a97acd30f972127e7~mv2.jpg/v1/fill/w_500,h_500,al_c,q_80/Shumee%20Lil%20Chef's%20Wooden%20Cooking%20Set.webp",
    images: ['', '', ''],
    minAge: 3,
    maxAge: 8,
    category: 'Pretend Play Sets'
})

const toy3 = createToy({
    id: 3,
    title: 'Say Cheese multiplication tables math game',
    brief: 'So you think you know times tables? Say Cheese is a proven system to improve your skills at times tables while playing a game.',
    description: "So you think you know times tables? Say Cheese is a proven system to improve your skills at times tables while playing a game.",
    skills: "Increase Math practice, speed and accuracy with an amazing game play",
    playIdeas: 'ICC (International Cheese Clash) tournament for the top rats is on. The rats are fighting for the delicious cheese cakes at stake. SAY CHEESE at the perfect time and help your rat take home the prize. Grab delicious cheese cakes in this game of skill and speed as you master multiplication facts. Strive to be the top rat as you have hours of addictive fun. The game has been designed to help young learners master multiplication tables, the foundation for higher order math.',
    brand: 'Logic Roots',
    primaryImage: 'https://static.wixstatic.com/media/c41d1d_581edc8f1f8844749f14bb3a922f203c~mv2.jpg/v1/fill/w_1500,h_1000,al_c,q_85/Logic_Roots_Multiplication_Game_Say_Chee.webp',
    images: ['', '', ''],
    minAge: 7,
    maxAge: 9,
    category: 'Language & Math'
})

const toy4 = createToy({
    id: 4,
    title: 'Intro to Engineering',
    brief: 'Welcomes young children to the field of engineering with 25 experiments and building projects in five sections.',
    description: "Welcomes young children to the field of engineering with 25 experiments and building projects in five sections. Children will learn apply their scientific and technical knowledge to design machines and devices. Start by learning some engineering basics with experiments on levers, forces and pulleys. Build simple devices using these basic components.",
    skills: 'Engineering and construction Skills, Helps learn basic Physics Concepts',
    playIdeas: 'Comes with a 48 page guide book and there are 25 different experiments to perform.',
    brand: 'Thames and Kosmos',
    primaryImage: 'https://static.wixstatic.com/media/c41d1d_0ab69d2b3bb74d8b9bf4fb3789969f31~mv2_d_1500_1280_s_2.jpg/v1/fill/w_1500,h_1280,al_c,q_85/Thames%20and%20Kosmos%20Intro%20to%20Engineering%202.webp',
    images: ['', '', ''],
    minAge: 5,
    maxAge: 12,
    category: 'STEM'
})

const toy5 = createToy({
    id: 5,
    title: 'Bead Roller Coaster',
    brief: 'Moving wooden beads on a track is a fun way to learn about colours and shapes.',
    description: 'Moving wooden beads on a track is a fun way to learn about colours and shapes. It is also one of the best ways for your child to build some cognitive skills.',
    skills: 'Develops fine motor skills and logical thinking.',
    playIdeas: '1. Identify the color and move that bead. 2. Time the movement of beads from one place to other. 3. Arrange the beads based on certain number on each side of the twisting rod.',
    brand: 'Mula',
    primaryImage: 'https://static.wixstatic.com/media/c41d1d_f05dd6be381d4f21a91a91ba1a2a93bd~mv2.jpg/v1/fill/w_1005,h_983,al_c,q_85/Mula%20Bead%20Roller%20Coaster.webp',
    images: ['', '', ''],
    minAge: 1,
    maxAge: 6,
    category: 'Infant & Preschool Toys'
})

export const collection = [toy1, toy2, toy3, toy4, toy5];

// const toyn = createToy({
//     id: 1,
//     title,
//     brief,
//     description,
//     skills,
//     playIdeas,
//     brand,
//     primaryImage: '',
//     images: ['', '', ''],
//     minAge,
//     maxAge,
//     category
// })
