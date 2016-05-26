const cousines = require('./cousines')

const texts = {
  'hi_postcode': [
    // "Hi [NAME] I’m hungryhouse BOT, simply type in your postcode and I’ll search for the best takeaways in your area now!",
    // "Hi [NAME] I’m hungryhouse. There’s a whole selection of great restaurants at your fingertips, type in your postcode to begin:",
    // "Hi [NAME] I’m hungryhouse BOT. Here to help your hunger! Simply type in your postcode and I’ll suggest some great food.",
    // "Hello [NAME]! I’m hungryhouse, give me your postcode and let me find you something tasty.",
    // "Pleasure to meet you [NAME], simply type in your postcode to start",
    // "Hi [NAME]! Type in your postcode to see all the best restaurants near you or alternatively tell me which cuisine you’re in the mood for!",

    "Hello, give me your postcode to find out what’s near you!",
    "Hello there, please tell me your postcode to see all the takeaways near you.",
    "Hi, I’m hungryhouse BOT, simply type in your postcode and I’ll find the best takeaways in your area!"
  ],
  'hi_cousine': [
    "Good day [NAME] what are you hungry for?",
    "Nice to meet you [NAME] what are you hungry for today?",
    "Hey [NAME]! What are you in the mood for today, sushi, indian, chinese?",

  ],
  'ask_postcode': [
    // "I’ve got what you need! Give me a postcode and I’ll search the best restaurants in your area now!",
    // "Hungry? I’ve got a solution for that, type in your postcode:",
    // "I have a few suggestions! What’s your postcode?",
    // "I have a suggestion! What’s your postcode?",
    // "Let me help you with that! Please give me a valid postcode and we’ll see what we can find",

    "Give me your postcode to find out what’s near you!",
    "Please tell me your postcode to see all the takeaways near you.",
    "Simply type in your postcode and I’ll find the best takeaways in your area!"
  ],

  'ask_cousine': [
    // "Got something specific in mind? Type which cuisine you’d like such as [X] or [Y]",
    // "Top tip: You can search by cuisine e.g. [X] or [Y]!",
    // "Which do you prefer [NAME] – [X] or [Y]?",
    // "What are you in the mood for [X] [Y] or [Z]? You name it, we have it!",
    // "I’m having sushi. Why not try [X] or [Y]?",
    // "How about [X] or [Y]?",
    // "Why not try a great [X]?",
    // "Try [X] or even some [Y] for something special!",
    // "I’ve got just the thing for that! What do you fancy?",

    "What type of cuisine are you in the mood for?",
    "Got it, what would you like to eat today?"

  ],

  'postcode_error': [
    "I’m afraid that’s not a valid postcode. Please try again",
    "I’m afraid no results matched this Postcode. Please try again",
    // "Oh dear… you must be Hangry! Let’s get you something to eat, please give me a valid UK postcode.",
    // "I’m in a bad mood when I’m hungry too. Give me a postcode and I’ll sort you out!",

  ],

  'search_cousine': [
    "Great choice! Let’s see what we have:",
    "Sounds good, here’s what’s available:",
    "Tasty! Here’s what matches your search:",
  ],

  'search_postcode': [
    // "Searching for [ALL RESTAURANTS] in: [POSTCODE]",
    "Thanks, here’s what’s on offer in [POSTCODE]:",
    "Great! Ok this is what’s near you:",
    "Here are you results for [POSTCODE]:",
    "Here’s what [POSTCODE] has to offer:",
    "Sample the local delights of [POSTCODE] now:",

  ],

  'again': [
      "Found something to your liking? Should we search again?",
      "Looking for something else? Shall we try again?",
      "If this doesn’t suit your fancy let's try another search?"

    // "Found something to your liking?  If not let’s try again for something new",
    // "Almost there! Make your selection and food will be at your door soon!",
    // "Having trouble? Why not contact one of our hungry heroes available 24/7 on 0800 612 33 33 or on live chat at hungryhouse.co.uk for support!",
    // "If this doesn’t suit your fancy, why not try searching with a different filter?",
    // "If this isn’t what you were looking for, why not search for something a little more specific",
    // "Don’t delay, help is at hand, type in cuisine type for more specific results.",

  ],

  'are_you': [
    "Interesting question… I’ll think about it. In the meantime why don’t you think about what food you fancy.",
  ],

  'search': [
    "Have a look at whouse restaurants: [URL]"
  ],

  'err': [
    'Sorry, we haven\'t found anything matching your search please try again...'
  ],

  'maybe': [
    'How about [COUSINE]?'
  ]

}

const getRandomItem = arr => arr[Math.random() * arr.length | 0]
const normilize = (params, key) => ('object' === typeof params ? params[key] : params) || ''

module.exports = {
  getRandomCousine: () => getRandomItem(cousines),
  getFromSection: (section, params) =>
    getRandomItem(texts[section])
      .replace('[NAME]', normilize(params, 'name'))
      .replace('[POSTCODE]', normilize(params, 'postcode'))
      .replace('[URL]', normilize(params, 'url'))
      .replace('[COUSINE]', normilize(params, 'cousine'))
      .replace('[X]', getRandomItem(cousines))
      .replace('[Y]', getRandomItem(cousines))
      .replace('[Z]', getRandomItem(cousines))
}
