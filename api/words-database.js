const wordsDatabase = {
  en: {
    animals: [
      { main: "cat", decoy: "dog" }, { main: "elephant", decoy: "rhinoceros" }, { main: "shark", decoy: "whale" },
      { main: "lion", decoy: "tiger" }, { main: "eagle", decoy: "falcon" }, { main: "penguin", decoy: "seal" },
      { main: "horse", decoy: "cow" }, { main: "rabbit", decoy: "hamster" }, { main: "snake", decoy: "worm" },
      { main: "bear", decoy: "gorilla" }, { main: "wolf", decoy: "coyote" }, { main: "monkey", decoy: "lemur" },
      { main: "crocodile", decoy: "lizard" }, { main: "butterfly", decoy: "dragonfly" }, { main: "bee", decoy: "ant" },
      { main: "spider", decoy: "scorpion" }, { main: "owl", decoy: "bat" }, { main: "kangaroo", decoy: "koala" },
      { main: "octopus", decoy: "jellyfish" }, { main: "peacock", decoy: "turkey" }, { main: "camel", decoy: "llama" },
      { main: "squirrel", decoy: "chipmunk" }, { main: "pigeon", decoy: "dove" }, { main: "lobster", decoy: "crab" },
      { main: "frog", decoy: "toad" }, { main: "giraffe", decoy: "okapi" }, { main: "zebra", decoy: "donkey" },
      { main: "hippopotamus", decoy: "walrus" }, { main: "cheetah", decoy: "leopard" }, { main: "panda", decoy: "raccoon" },
      { main: "polar bear", decoy: "grizzly bear" }, { main: "flamingo", decoy: "crane" }, { main: "ostrich", decoy: "emu" },
      { main: "turtle", decoy: "tortoise" }, { main: "goldfish", decoy: "koi" }, { main: "parakeet", decoy: "canary" },
      { main: "hedgehog", decoy: "porcupine" }, { main: "ferret", decoy: "weasel" }, { main: "chinchilla", decoy: "guinea pig" },
      { main: "iguana", decoy: "chameleon" }, { main: "salamander", decoy: "newt" }, { main: "starfish", decoy: "sea urchin" },
      { main: "seahorse", decoy: "pipefish" }, { main: "mantis", decoy: "grasshopper" }, { main: "ladybug", decoy: "beetle" },
      { main: "mosquito", decoy: "gnat" }, { main: "moth", decoy: "butterfly" }, { main: "firefly", decoy: "glowworm" },
      { main: "cricket", decoy: "cicada" }, { main: "cockroach", decoy: "termite" }, { main: "deer", decoy: "elk" },
      { main: "moose", decoy: "caribou" }, { main: "bison", decoy: "buffalo" }, { main: "antelope", decoy: "gazelle" },
      { main: "fox", decoy: "jackal" }, { main: "lynx", decoy: "bobcat" }, { main: "panther", decoy: "jaguar" },
      { main: "hyena", decoy: "dingo" }, { main: "badger", decoy: "wolverine" }, { main: "otter", decoy: "beaver" },
      { main: "mole", decoy: "vole" }, { main: "rat", decoy: "mouse" }, { main: "hamster", decoy: "gerbil" },
      { main: "parrot", decoy: "macaw" }, { main: "hummingbird", decoy: "kingfisher" }, { main: "woodpecker", decoy: "nuthatch" },
      { main: "robin", decoy: "sparrow" }, { main: "cardinal", decoy: "bluejay" }, { main: "crow", decoy: "raven" },
      { main: "seagull", decoy: "pelican" }, { main: "albatross", decoy: "petrel" }, { main: "swan", decoy: "goose" },
      { main: "duck", decoy: "mallard" }, { main: "stork", decoy: "heron" }, { main: "vulture", decoy: "condor" }
    ],
    
    vehicles: [
      { main: "Ferrari", decoy: "Porsche" }, { main: "BMW", decoy: "Audi" }, { main: "Mercedes", decoy: "Lexus" },
      { main: "Toyota", decoy: "Nissan" }, { main: "Ford", decoy: "Dodge" }, { main: "Tesla", decoy: "Polestar" },
      { main: "Lamborghini", decoy: "McLaren" }, { main: "Chevrolet", decoy: "GMC" }, { main: "Honda", decoy: "Acura" },
      { main: "Volkswagen", decoy: "Škoda" }, { main: "Volvo", decoy: "Saab" }, { main: "Jaguar", decoy: "Land Rover" },
      { main: "Bentley", decoy: "Rolls-Royce" }, { main: "Maserati", decoy: "Alfa Romeo" }, { main: "Bugatti", decoy: "Koenigsegg" },
      { main: "motorcycle", decoy: "scooter" }, { main: "bicycle", decoy: "tricycle" }, { main: "bus", decoy: "tram" },
      { main: "airplane", decoy: "helicopter" }, { main: "train", decoy: "subway" }, { main: "sailboat", decoy: "yacht" },
      { main: "cruise ship", decoy: "ferry" }, { main: "truck", decoy: "van" }, { main: "ambulance", decoy: "fire truck" },
      { main: "taxi", decoy: "Uber" }, { main: "skateboard", decoy: "rollerblades" }, { main: "jet ski", decoy: "speedboat" },
      { main: "rocket", decoy: "spaceship" }, { main: "hot air balloon", decoy: "blimp" }, { main: "glider", decoy: "hang glider" },
      { main: "canoe", decoy: "kayak" }, { main: "raft", decoy: "pontoon" }, { main: "submarine", decoy: "torpedo" },
      { main: "tractor", decoy: "bulldozer" }, { main: "excavator", decoy: "backhoe" }, { main: "crane", decoy: "forklift" },
      { main: "golf cart", decoy: "ATV" }, { main: "snowmobile", decoy: "sled" }, { main: "RV", decoy: "trailer" },
      { main: "pickup truck", decoy: "SUV" }, { main: "convertible", decoy: "coupe" }, { main: "sedan", decoy: "hatchback" },
      { main: "minivan", decoy: "station wagon" }, { main: "limousine", decoy: "town car" }, { main: "jeep", decoy: "off-road vehicle" }
    ],

    food: [
      { main: "pizza", decoy: "calzone" }, { main: "hamburger", decoy: "sandwich" }, { main: "sushi", decoy: "poke bowl" },
      { main: "cake", decoy: "muffin" }, { main: "ice cream", decoy: "milkshake" }, { main: "coffee", decoy: "energy drink" },
      { main: "beer", decoy: "cider" }, { main: "apple", decoy: "orange" }, { main: "banana", decoy: "plantain" },
      { main: "chocolate", decoy: "fudge" }, { main: "rice", decoy: "quinoa" }, { main: "chicken", decoy: "duck" },
      { main: "steak", decoy: "pork chop" }, { main: "pasta", decoy: "risotto" }, { main: "bread", decoy: "bagel" },
      { main: "cheese", decoy: "butter" }, { main: "yogurt", decoy: "pudding" }, { main: "salad", decoy: "coleslaw" },
      { main: "soup", decoy: "stew" }, { main: "popcorn", decoy: "chips" }, { main: "pancakes", decoy: "waffles" },
      { main: "donut", decoy: "croissant" }, { main: "taco", decoy: "burrito" }, { main: "spaghetti", decoy: "lasagna" },
      { main: "wine", decoy: "champagne" }, { main: "whiskey", decoy: "bourbon" }, { main: "vodka", decoy: "gin" },
      { main: "salmon", decoy: "tuna" }, { main: "shrimp", decoy: "prawns" }, { main: "oyster", decoy: "clam" },
      { main: "caviar", decoy: "roe" }, { main: "truffle", decoy: "mushroom" }, { main: "lobster roll", decoy: "crab cake" },
      { main: "ramen", decoy: "pho" }, { main: "curry", decoy: "stir-fry" }, { main: "tempura", decoy: "fried chicken" },
      { main: "kimchi", decoy: "sauerkraut" }, { main: "hummus", decoy: "guacamole" }, { main: "baguette", decoy: "focaccia" },
      { main: "pretzel", decoy: "breadstick" }, { main: "scone", decoy: "biscuit" }, { main: "tiramisu", decoy: "panna cotta" },
      { main: "macarons", decoy: "cookies" }, { main: "flan", decoy: "crème brûlée" }, { main: "cheesecake", decoy: "key lime pie" },
      { main: "gelato", decoy: "sorbet" }, { main: "smoothie", decoy: "frappé" }, { main: "latte", decoy: "cappuccino" },
      { main: "espresso", decoy: "americano" }, { main: "matcha", decoy: "green tea" }, { main: "chai", decoy: "herbal tea" }
    ],

    technology: [
      { main: "iPhone", decoy: "iPad" }, { main: "Samsung", decoy: "LG" }, { main: "PlayStation", decoy: "Nintendo" },
      { main: "Xbox", decoy: "Steam Deck" }, { main: "Facebook", decoy: "Twitter" }, { main: "Instagram", decoy: "Snapchat" },
      { main: "Google", decoy: "Yahoo" }, { main: "Windows", decoy: "Linux" }, { main: "Netflix", decoy: "Hulu" },
      { main: "YouTube", decoy: "Vimeo" }, { main: "laptop", decoy: "tablet" }, { main: "desktop", decoy: "server" },
      { main: "printer", decoy: "scanner" }, { main: "headphones", decoy: "speakers" }, { main: "smartwatch", decoy: "fitness tracker" },
      { main: "drone", decoy: "RC plane" }, { main: "camera", decoy: "camcorder" }, { main: "Bluetooth", decoy: "WiFi" },
      { main: "USB", decoy: "HDMI" }, { main: "Amazon", decoy: "eBay" }, { main: "Spotify", decoy: "Apple Music" },
      { main: "Zoom", decoy: "Skype" }, { main: "Teams", decoy: "Slack" }, { main: "Discord", decoy: "TeamSpeak" },
      { main: "Chrome", decoy: "Firefox" }, { main: "Safari", decoy: "Edge" }, { main: "Android", decoy: "iOS" },
      { main: "WhatsApp", decoy: "Telegram" }, { main: "Signal", decoy: "Messenger" }, { main: "TikTok", decoy: "Reels" },
      { main: "LinkedIn", decoy: "Indeed" }, { main: "Uber", decoy: "Lyft" }, { main: "Airbnb", decoy: "VRBO" },
      { main: "PayPal", decoy: "Venmo" }, { main: "Bitcoin", decoy: "Ethereum" }, { main: "Dropbox", decoy: "Google Drive" },
      { main: "OneDrive", decoy: "iCloud" }, { main: "Adobe", decoy: "Canva" }, { main: "Photoshop", decoy: "GIMP" },
      { main: "Microsoft", decoy: "Apple" }, { main: "Intel", decoy: "AMD" }, { main: "NVIDIA", decoy: "Radeon" },
      { main: "GitHub", decoy: "GitLab" }, { main: "Stack Overflow", decoy: "Reddit" }, { main: "Wikipedia", decoy: "Britannica" }
    ],

    colors: [
      { main: "red", decoy: "orange" }, { main: "blue", decoy: "purple" }, { main: "green", decoy: "yellow" },
      { main: "black", decoy: "white" }, { main: "pink", decoy: "magenta" }, { main: "brown", decoy: "tan" },
      { main: "gray", decoy: "silver" }, { main: "gold", decoy: "bronze" }, { main: "navy", decoy: "royal blue" },
      { main: "crimson", decoy: "scarlet" }, { main: "turquoise", decoy: "teal" }, { main: "lime", decoy: "mint" },
      { main: "violet", decoy: "lavender" }, { main: "maroon", decoy: "burgundy" }, { main: "coral", decoy: "salmon" },
      { main: "indigo", decoy: "cobalt" }, { main: "emerald", decoy: "jade" }, { main: "amber", decoy: "honey" },
      { main: "ivory", decoy: "cream" }, { main: "charcoal", decoy: "slate" }, { main: "beige", decoy: "khaki" },
      { main: "olive", decoy: "sage" }, { main: "plum", decoy: "wine" }, { main: "rust", decoy: "copper" },
      { main: "aqua", decoy: "cyan" }, { main: "fuchsia", decoy: "hot pink" }, { main: "peach", decoy: "apricot" }
    ],

    music_genres: [
      { main: "rock", decoy: "metal" }, { main: "pop", decoy: "dance" }, { main: "jazz", decoy: "blues" },
      { main: "hip hop", decoy: "rap" }, { main: "country", decoy: "folk" }, { main: "classical", decoy: "baroque" },
      { main: "reggae", decoy: "ska" }, { main: "punk", decoy: "grunge" }, { main: "electronic", decoy: "techno" },
      { main: "house", decoy: "trance" }, { main: "dubstep", decoy: "drum and bass" }, { main: "gospel", decoy: "soul" },
      { main: "R&B", decoy: "funk" }, { main: "indie", decoy: "alternative" }, { main: "ambient", decoy: "new age" },
      { main: "bossanova", decoy: "samba" }, { main: "flamenco", decoy: "tango" }, { main: "opera", decoy: "musical" },
      { main: "bluegrass", decoy: "honky-tonk" }, { main: "heavy metal", decoy: "death metal" }, { main: "trip hop", decoy: "downtempo" }
    ],

    instruments: [
      { main: "guitar", decoy: "bass" }, { main: "piano", decoy: "keyboard" }, { main: "drums", decoy: "percussion" },
      { main: "violin", decoy: "viola" }, { main: "cello", decoy: "double bass" }, { main: "flute", decoy: "piccolo" },
      { main: "clarinet", decoy: "oboe" }, { main: "saxophone", decoy: "trumpet" }, { main: "trombone", decoy: "tuba" },
      { main: "harp", decoy: "lyre" }, { main: "banjo", decoy: "mandolin" }, { main: "harmonica", decoy: "accordion" },
      { main: "xylophone", decoy: "marimba" }, { main: "tambourine", decoy: "castanets" }, { main: "organ", decoy: "harpsichord" },
      { main: "synthesizer", decoy: "sampler" }, { main: "french horn", decoy: "cornet" }, { main: "bagpipes", decoy: "didgeridoo" }
    ],

    countries: [
      { main: "France", decoy: "Spain" }, { main: "Germany", decoy: "Austria" }, { main: "Italy", decoy: "Greece" },
      { main: "Japan", decoy: "China" }, { main: "Brazil", decoy: "Argentina" }, { main: "Canada", decoy: "USA" },
      { main: "Australia", decoy: "New Zealand" }, { main: "India", decoy: "Pakistan" }, { main: "Russia", decoy: "Ukraine" },
      { main: "Egypt", decoy: "Morocco" }, { main: "Sweden", decoy: "Norway" }, { main: "Portugal", decoy: "Ireland" },
      { main: "Thailand", decoy: "Vietnam" }, { main: "Mexico", decoy: "Peru" }, { main: "Turkey", decoy: "Iran" },
      { main: "South Korea", decoy: "North Korea" }, { main: "Poland", decoy: "Czech Republic" }, { main: "Denmark", decoy: "Finland" },
      { main: "Netherlands", decoy: "Belgium" }, { main: "Switzerland", decoy: "Luxembourg" }, { main: "Israel", decoy: "Jordan" },
      { main: "Chile", decoy: "Uruguay" }, { main: "Venezuela", decoy: "Colombia" }, { main: "Nigeria", decoy: "Ghana" },
      { main: "Kenya", decoy: "Tanzania" }, { main: "South Africa", decoy: "Zimbabwe" }, { main: "Cuba", decoy: "Jamaica" }
    ],

    weather: [
      { main: "sunny", decoy: "bright" }, { main: "rainy", decoy: "drizzling" }, { main: "snowy", decoy: "blizzard" },
      { main: "cloudy", decoy: "overcast" }, { main: "windy", decoy: "breezy" }, { main: "foggy", decoy: "misty" },
      { main: "stormy", decoy: "thundering" }, { main: "humid", decoy: "muggy" }, { main: "dry", decoy: "arid" },
      { main: "hot", decoy: "warm" }, { main: "cold", decoy: "chilly" }, { main: "freezing", decoy: "arctic" },
      { main: "tornado", decoy: "hurricane" }, { main: "hail", decoy: "sleet" }, { main: "lightning", decoy: "thunder" }
    ],

    body_parts: [
      { main: "head", decoy: "skull" }, { main: "eye", decoy: "pupil" }, { main: "nose", decoy: "nostril" },
      { main: "mouth", decoy: "lips" }, { main: "ear", decoy: "earlobe" }, { main: "neck", decoy: "throat" },
      { main: "shoulder", decoy: "collarbone" }, { main: "arm", decoy: "forearm" }, { main: "elbow", decoy: "wrist" },
      { main: "hand", decoy: "palm" }, { main: "finger", decoy: "thumb" }, { main: "chest", decoy: "ribcage" },
      { main: "back", decoy: "spine" }, { main: "stomach", decoy: "abdomen" }, { main: "waist", decoy: "hip" },
      { main: "leg", decoy: "thigh" }, { main: "knee", decoy: "shin" }, { main: "ankle", decoy: "heel" },
      { main: "foot", decoy: "toe" }, { main: "brain", decoy: "mind" }, { main: "heart", decoy: "pulse" }
    ],

    emotions: [
      { main: "happy", decoy: "joyful" }, { main: "sad", decoy: "melancholy" }, { main: "angry", decoy: "furious" },
      { main: "excited", decoy: "thrilled" }, { main: "nervous", decoy: "anxious" }, { main: "calm", decoy: "peaceful" },
      { main: "confused", decoy: "puzzled" }, { main: "surprised", decoy: "shocked" }, { main: "proud", decoy: "confident" },
      { main: "embarrassed", decoy: "ashamed" }, { main: "jealous", decoy: "envious" }, { main: "grateful", decoy: "thankful" },
      { main: "lonely", decoy: "isolated" }, { main: "frustrated", decoy: "annoyed" }, { main: "hopeful", decoy: "optimistic" },
      { main: "disappointed", decoy: "let down" }, { main: "curious", decoy: "interested" }, { main: "bored", decoy: "uninterested" }
    ],

    // Continuing with existing categories but expanded...
    sports: [
      { main: "football", decoy: "soccer" }, { main: "basketball", decoy: "netball" }, { main: "tennis", decoy: "squash" },
      { main: "golf", decoy: "croquet" }, { main: "swimming", decoy: "water polo" }, { main: "skiing", decoy: "ice skating" },
      { main: "boxing", decoy: "kickboxing" }, { main: "cycling", decoy: "spinning" }, { main: "baseball", decoy: "cricket" },
      { main: "hockey", decoy: "lacrosse" }, { main: "volleyball", decoy: "beach volleyball" }, { main: "running", decoy: "jogging" },
      { main: "surfing", decoy: "windsurfing" }, { main: "bowling", decoy: "billiards" }, { main: "archery", decoy: "darts" },
      { main: "karate", decoy: "taekwondo" }, { main: "yoga", decoy: "pilates" }, { main: "chess", decoy: "checkers" },
      { main: "fishing", decoy: "hunting" }, { main: "climbing", decoy: "bouldering" }, { main: "wrestling", decoy: "judo" },
      { main: "fencing", decoy: "sword fighting" }, { main: "badminton", decoy: "ping pong" }, { main: "polo", decoy: "equestrian" },
      { main: "sailing", decoy: "rowing" }, { main: "triathlon", decoy: "marathon" }, { main: "weightlifting", decoy: "powerlifting" },
      { main: "gymnastics", decoy: "acrobatics" }, { main: "figure skating", decoy: "speed skating" }, { main: "snowboarding", decoy: "sledding" }
    ],

    movies: [
      { main: "Star Wars", decoy: "Dune" }, { main: "Harry Potter", decoy: "Percy Jackson" }, { main: "Batman", decoy: "Spider-Man" },
      { main: "Titanic", decoy: "The Notebook" }, { main: "The Godfather", decoy: "Scarface" }, { main: "Jurassic Park", decoy: "Godzilla" },
      { main: "Marvel", decoy: "DC" }, { main: "Pixar", decoy: "Disney" }, { main: "James Bond", decoy: "Mission Impossible" },
      { main: "The Matrix", decoy: "Inception" }, { main: "Frozen", decoy: "Moana" }, { main: "Shrek", decoy: "Madagascar" },
      { main: "Pirates of the Caribbean", decoy: "The Mummy" }, { main: "Indiana Jones", decoy: "Lara Croft" }, { main: "Terminator", decoy: "RoboCop" },
      { main: "Alien", decoy: "Predator" }, { main: "Rocky", decoy: "Creed" }, { main: "Fast & Furious", decoy: "Need for Speed" },
      { main: "Toy Story", decoy: "Cars" }, { main: "The Lion King", decoy: "The Jungle Book" }, { main: "Avatar", decoy: "Pandora" },
      { main: "Lord of the Rings", decoy: "Game of Thrones" }, { main: "Superman", decoy: "Captain America" }, { main: "Iron Man", decoy: "Thor" },
      { main: "Wonder Woman", decoy: "Captain Marvel" }, { main: "Guardians of the Galaxy", decoy: "Suicide Squad" }, { main: "Black Panther", decoy: "Aquaman" }
    ],

    places: [
      { main: "Paris", decoy: "London" }, { main: "New York", decoy: "Chicago" }, { main: "beach", decoy: "lake" },
      { main: "mountain", decoy: "volcano" }, { main: "restaurant", decoy: "bar" }, { main: "hospital", decoy: "pharmacy" },
      { main: "school", decoy: "library" }, { main: "airport", decoy: "bus station" }, { main: "hotel", decoy: "resort" },
      { main: "museum", decoy: "zoo" }, { main: "park", decoy: "garden" }, { main: "mall", decoy: "market" },
      { main: "gym", decoy: "spa" }, { main: "church", decoy: "temple" }, { main: "castle", decoy: "palace" },
      { main: "desert", decoy: "tundra" }, { main: "forest", decoy: "jungle" }, { main: "island", decoy: "peninsula" },
      { main: "stadium", decoy: "arena" }, { main: "theater", decoy: "cinema" }, { main: "office", decoy: "cubicle" },
      { main: "factory", decoy: "warehouse" }, { main: "bank", decoy: "credit union" }, { main: "post office", decoy: "shipping center" },
      { main: "bakery", decoy: "deli" }, { main: "garage", decoy: "parking lot" }, { main: "subway", decoy: "tunnel" }
    ],

    professions: [
      { main: "doctor", decoy: "nurse" }, { main: "teacher", decoy: "professor" }, { main: "police officer", decoy: "security guard" },
      { main: "firefighter", decoy: "paramedic" }, { main: "lawyer", decoy: "judge" }, { main: "chef", decoy: "baker" },
      { main: "pilot", decoy: "flight attendant" }, { main: "engineer", decoy: "architect" }, { main: "actor", decoy: "director" },
      { main: "singer", decoy: "dancer" }, { main: "writer", decoy: "journalist" }, { main: "photographer", decoy: "videographer" },
      { main: "dentist", decoy: "orthodontist" }, { main: "accountant", decoy: "banker" }, { main: "mechanic", decoy: "electrician" },
      { main: "farmer", decoy: "gardener" }, { main: "soldier", decoy: "marine" }, { main: "scientist", decoy: "researcher" },
      { main: "artist", decoy: "sculptor" }, { main: "programmer", decoy: "web designer" }, { main: "librarian", decoy: "curator" },
      { main: "veterinarian", decoy: "zoologist" }, { main: "pharmacist", decoy: "chemist" }, { main: "therapist", decoy: "counselor" },
      { main: "translator", decoy: "interpreter" }, { main: "real estate agent", decoy: "property manager" }, { main: "barber", decoy: "hairstylist" }
    ],

    clothing: [
      { main: "shirt", decoy: "blouse" }, { main: "pants", decoy: "shorts" }, { main: "dress", decoy: "skirt" },
      { main: "shoes", decoy: "boots" }, { main: "hat", decoy: "cap" }, { main: "jacket", decoy: "coat" },
      { main: "socks", decoy: "stockings" }, { main: "gloves", decoy: "mittens" }, { main: "suit", decoy: "tuxedo" },
      { main: "sweater", decoy: "hoodie" }, { main: "jeans", decoy: "leggings" }, { main: "sneakers", decoy: "sandals" },
      { main: "tie", decoy: "bow tie" }, { main: "belt", decoy: "suspenders" }, { main: "scarf", decoy: "shawl" },
      { main: "underwear", decoy: "lingerie" }, { main: "pajamas", decoy: "nightgown" }, { main: "swimsuit", decoy: "wetsuit" },
      { main: "raincoat", decoy: "windbreaker" }, { main: "uniform", decoy: "costume" }, { main: "vest", decoy: "waistcoat" },
      { main: "cardigan", decoy: "pullover" }, { main: "blazer", decoy: "sport coat" }, { main: "polo", decoy: "henley" },
      { main: "overalls", decoy: "jumpsuit" }, { main: "kimono", decoy: "robe" }, { main: "poncho", decoy: "cape" }
    ]
  },

  fr: {
    animals: [
      { main: "chat", decoy: "chien" }, { main: "éléphant", decoy: "rhinocéros" }, { main: "requin", decoy: "baleine" },
      { main: "lion", decoy: "tigre" }, { main: "aigle", decoy: "faucon" }, { main: "pingouin", decoy: "phoque" },
      { main: "cheval", decoy: "vache" }, { main: "lapin", decoy: "hamster" }, { main: "serpent", decoy: "ver" },
      { main: "ours", decoy: "gorille" }, { main: "loup", decoy: "coyote" }, { main: "singe", decoy: "lémurien" },
      { main: "crocodile", decoy: "lézard" }, { main: "papillon", decoy: "libellule" }, { main: "abeille", decoy: "fourmi" },
      { main: "araignée", decoy: "scorpion" }, { main: "hibou", decoy: "chauve-souris" }, { main: "kangourou", decoy: "koala" },
      { main: "pieuvre", decoy: "méduse" }, { main: "paon", decoy: "dindon" }, { main: "chameau", decoy: "lama" },
      { main: "écureuil", decoy: "tamia" }, { main: "pigeon", decoy: "colombe" }, { main: "homard", decoy: "crabe" },
      { main: "grenouille", decoy: "crapaud" }, { main: "girafe", decoy: "okapi" }, { main: "zèbre", decoy: "âne" },
      { main: "hippopotame", decoy: "morse" }, { main: "guépard", decoy: "léopard" }, { main: "panda", decoy: "raton laveur" },
      { main: "ours polaire", decoy: "ours brun" }, { main: "flamant rose", decoy: "grue" }, { main: "autruche", decoy: "émeu" },
      { main: "tortue", decoy: "tortue terrestre" }, { main: "poisson rouge", decoy: "carpe koï" }, { main: "perruche", decoy: "canari" },
      { main: "hérisson", decoy: "porc-épic" }, { main: "furet", decoy: "belette" }, { main: "chinchilla", decoy: "cochon d'Inde" },
      { main: "iguane", decoy: "caméléon" }, { main: "salamandre", decoy: "triton" }, { main: "étoile de mer", decoy: "oursin" },
      { main: "hippocampe", decoy: "poisson-pipe" }, { main: "mante religieuse", decoy: "sauterelle" }, { main: "coccinelle", decoy: "scarabée" },
      { main: "moustique", decoy: "moucheron" }, { main: "papillon de nuit", decoy: "papillon" }, { main: "luciole", decoy: "ver luisant" },
      { main: "grillon", decoy: "cigale" }, { main: "cafard", decoy: "termite" }, { main: "cerf", decoy: "élan" },
      { main: "orignal", decoy: "caribou" }, { main: "bison", decoy: "buffle" }, { main: "antilope", decoy: "gazelle" },
      { main: "renard", decoy: "chacal" }, { main: "lynx", decoy: "chat sauvage" }, { main: "panthère", decoy: "jaguar" },
      { main: "hyène", decoy: "dingo" }, { main: "blaireau", decoy: "carcajou" }, { main: "loutre", decoy: "castor" }
    ],

    vehicles: [
      { main: "Ferrari", decoy: "Porsche" }, { main: "BMW", decoy: "Audi" }, { main: "Mercedes", decoy: "Lexus" },
      { main: "Renault", decoy: "Citroën" }, { main: "Peugeot", decoy: "Opel" }, { main: "Tesla", decoy: "Lucid" },
      { main: "Lamborghini", decoy: "McLaren" }, { main: "Toyota", decoy: "Nissan" }, { main: "Honda", decoy: "Mazda" },
      { main: "Volkswagen", decoy: "Škoda" }, { main: "Volvo", decoy: "Saab" }, { main: "Jaguar", decoy: "Land Rover" },
      { main: "Bentley", decoy: "Rolls-Royce" }, { main: "Maserati", decoy: "Alfa Romeo" }, { main: "Bugatti", decoy: "Koenigsegg" },
      { main: "moto", decoy: "scooter" }, { main: "vélo", decoy: "tricycle" }, { main: "bus", decoy: "tramway" },
      { main: "avion", decoy: "hélicoptère" }, { main: "train", decoy: "métro" }, { main: "voilier", decoy: "yacht" },
      { main: "paquebot", decoy: "ferry" }, { main: "camion", decoy: "camionnette" }, { main: "ambulance", decoy: "pompiers" },
      { main: "taxi", decoy: "VTC" }, { main: "skateboard", decoy: "rollers" }, { main: "jet ski", decoy: "hors-bord" },
      { main: "fusée", decoy: "vaisseau spatial" }, { main: "montgolfière", decoy: "dirigeable" }, { main: "planeur", decoy: "deltaplane" },
      { main: "canoë", decoy: "kayak" }, { main: "radeau", decoy: "ponton" }, { main: "sous-marin", decoy: "torpille" },
      { main: "tracteur", decoy: "bulldozer" }, { main: "pelleteuse", decoy: "rétrocaveuse" }, { main: "grue", decoy: "chariot élévateur" }
    ],

    food: [
      { main: "pizza", decoy: "focaccia" }, { main: "hamburger", decoy: "sandwich" }, { main: "sushi", decoy: "maki" },
      { main: "gâteau", decoy: "cupcake" }, { main: "glace", decoy: "milk-shake" }, { main: "café", decoy: "cappuccino" },
      { main: "bière", decoy: "cidre" }, { main: "pomme", decoy: "orange" }, { main: "banane", decoy: "mangue" },
      { main: "chocolat", decoy: "praline" }, { main: "riz", decoy: "quinoa" }, { main: "poulet", decoy: "canard" },
      { main: "steak", decoy: "côtelette" }, { main: "pâtes", decoy: "gnocchi" }, { main: "pain", decoy: "brioche" },
      { main: "fromage", decoy: "beurre" }, { main: "yaourt", decoy: "fromage blanc" }, { main: "salade", decoy: "taboulé" },
      { main: "soupe", decoy: "potage" }, { main: "popcorn", decoy: "chips" }, { main: "crêpe", decoy: "gaufre" },
      { main: "croissant", decoy: "pain aux raisins" }, { main: "couscous", decoy: "tajine" }, { main: "cassoulet", decoy: "choucroute" },
      { main: "vin", decoy: "champagne" }, { main: "whisky", decoy: "bourbon" }, { main: "vodka", decoy: "gin" },
      { main: "saumon", decoy: "thon" }, { main: "crevette", decoy: "langoustine" }, { main: "huître", decoy: "palourde" },
      { main: "caviar", decoy: "œufs de poisson" }, { main: "truffe", decoy: "champignon" }, { main: "ramen", decoy: "pho" },
      { main: "curry", decoy: "sauté" }, { main: "tempura", decoy: "poulet frit" }, { main: "kimchi", decoy: "choucroute" },
      { main: "houmous", decoy: "guacamole" }, { main: "baguette", decoy: "focaccia" }, { main: "bretzel", decoy: "gressin" }
    ],

    // Continue with other French categories following the same pattern...
    technology: [
      { main: "iPhone", decoy: "iPad" }, { main: "Samsung", decoy: "Huawei" }, { main: "PlayStation", decoy: "Switch" },
      { main: "Xbox", decoy: "Stadia" }, { main: "Facebook", decoy: "LinkedIn" }, { main: "Instagram", decoy: "Pinterest" },
      { main: "Google", decoy: "Qwant" }, { main: "Windows", decoy: "Ubuntu" }, { main: "Netflix", decoy: "Prime Video" },
      { main: "YouTube", decoy: "Dailymotion" }, { main: "ordinateur portable", decoy: "tablette" }, { main: "PC fixe", decoy: "serveur" },
      { main: "imprimante", decoy: "photocopieuse" }, { main: "casque", decoy: "enceintes" }, { main: "montre connectée", decoy: "bracelet fitness" },
      { main: "drone", decoy: "avion télécommandé" }, { main: "appareil photo", decoy: "caméscope" }, { main: "Bluetooth", decoy: "NFC" },
      { main: "USB", decoy: "Thunderbolt" }, { main: "Amazon", decoy: "Cdiscount" }, { main: "Spotify", decoy: "Deezer" },
      { main: "Zoom", decoy: "Skype" }, { main: "Teams", decoy: "Slack" }, { main: "Discord", decoy: "TeamSpeak" }
    ],

    colors: [
      { main: "rouge", decoy: "orange" }, { main: "bleu", decoy: "violet" }, { main: "vert", decoy: "jaune" },
      { main: "noir", decoy: "blanc" }, { main: "rose", decoy: "magenta" }, { main: "marron", decoy: "beige" },
      { main: "gris", decoy: "argent" }, { main: "or", decoy: "bronze" }, { main: "marine", decoy: "bleu roi" },
      { main: "cramoisi", decoy: "écarlate" }, { main: "turquoise", decoy: "sarcelle" }, { main: "citron vert", decoy: "menthe" }
    ],

    sports: [
      { main: "football", decoy: "futsal" }, { main: "basketball", decoy: "handball" }, { main: "tennis", decoy: "padel" },
      { main: "golf", decoy: "croquet" }, { main: "natation", decoy: "plongée" }, { main: "ski", decoy: "patinage" },
      { main: "boxe", decoy: "MMA" }, { main: "cyclisme", decoy: "BMX" }, { main: "rugby", decoy: "football américain" },
      { main: "hockey", decoy: "roller hockey" }, { main: "volleyball", decoy: "beach-volley" }, { main: "course", decoy: "marche" },
      { main: "surf", decoy: "kitesurf" }, { main: "bowling", decoy: "pétanque" }, { main: "tir à l'arc", decoy: "fléchettes" },
      { main: "karaté", decoy: "judo" }, { main: "yoga", decoy: "stretching" }, { main: "échecs", decoy: "dames" },
      { main: "pêche", decoy: "chasse" }, { main: "escalade", decoy: "alpinisme" }, { main: "lutte", decoy: "judo" },
      { main: "escrime", decoy: "combat à l'épée" }, { main: "badminton", decoy: "ping-pong" }, { main: "polo", decoy: "équitation" }
    ],

    countries: [
      { main: "France", decoy: "Espagne" }, { main: "Allemagne", decoy: "Autriche" }, { main: "Italie", decoy: "Grèce" },
      { main: "Japon", decoy: "Chine" }, { main: "Brésil", decoy: "Argentine" }, { main: "Canada", decoy: "États-Unis" },
      { main: "Australie", decoy: "Nouvelle-Zélande" }, { main: "Inde", decoy: "Pakistan" }, { main: "Russie", decoy: "Ukraine" },
      { main: "Égypte", decoy: "Maroc" }, { main: "Suède", decoy: "Norvège" }, { main: "Portugal", decoy: "Irlande" },
      { main: "Thaïlande", decoy: "Vietnam" }, { main: "Mexique", decoy: "Pérou" }, { main: "Turquie", decoy: "Iran" }
    ],

    movies: [
      { main: "Star Wars", decoy: "Dune" }, { main: "Harry Potter", decoy: "Percy Jackson" }, { main: "Batman", decoy: "Iron Man" },
      { main: "Titanic", decoy: "Pearl Harbor" }, { main: "Le Parrain", decoy: "Les Affranchis" }, { main: "Jurassic Park", decoy: "Godzilla" },
      { main: "Marvel", decoy: "DC" }, { main: "Pixar", decoy: "Illumination" }, { main: "James Bond", decoy: "Jason Bourne" },
      { main: "Matrix", decoy: "Minority Report" }, { main: "La Reine des Neiges", decoy: "Vaiana" }, { main: "Shrek", decoy: "L'Âge de Glace" },
      { main: "Pirates des Caraïbes", decoy: "La Momie" }, { main: "Indiana Jones", decoy: "Benjamin Gates" }, { main: "Terminator", decoy: "I, Robot" },
      { main: "Alien", decoy: "Predator" }, { main: "Rocky", decoy: "Million Dollar Baby" }, { main: "Taxi", decoy: "Transporteur" },
      { main: "Astérix", decoy: "Lucky Luke" }, { main: "Les Intouchables", decoy: "Qu'est-ce qu'on a fait au Bon Dieu" }
    ],

    places: [
      { main: "Paris", decoy: "Londres" }, { main: "New York", decoy: "Boston" }, { main: "plage", decoy: "lac" },
      { main: "montagne", decoy: "volcan" }, { main: "restaurant", decoy: "brasserie" }, { main: "hôpital", decoy: "clinique" },
      { main: "école", decoy: "collège" }, { main: "aéroport", decoy: "gare routière" }, { main: "hôtel", decoy: "camping" },
      { main: "musée", decoy: "aquarium" }, { main: "parc", decoy: "jardin" }, { main: "centre commercial", decoy: "marché" },
      { main: "salle de sport", decoy: "piscine" }, { main: "église", decoy: "cathédrale" }, { main: "château", decoy: "manoir" },
      { main: "désert", decoy: "savane" }, { main: "forêt", decoy: "bois" }, { main: "île", decoy: "archipel" },
      { main: "stade", decoy: "vélodrome" }, { main: "théâtre", decoy: "opéra" }
    ],

    professions: [
      { main: "médecin", decoy: "infirmier" }, { main: "professeur", decoy: "instituteur" }, { main: "policier", decoy: "gendarme" },
      { main: "pompier", decoy: "urgentiste" }, { main: "avocat", decoy: "notaire" }, { main: "chef cuisinier", decoy: "pâtissier" },
      { main: "pilote", decoy: "steward" }, { main: "ingénieur", decoy: "technicien" }, { main: "acteur", decoy: "réalisateur" },
      { main: "chanteur", decoy: "musicien" }, { main: "écrivain", decoy: "journaliste" }, { main: "photographe", decoy: "caméraman" },
      { main: "dentiste", decoy: "orthodontiste" }, { main: "comptable", decoy: "banquier" }, { main: "mécanicien", decoy: "carrossier" },
      { main: "agriculteur", decoy: "viticulteur" }, { main: "militaire", decoy: "légionnaire" }, { main: "chercheur", decoy: "laborantin" },
      { main: "peintre", decoy: "sculpteur" }, { main: "développeur", decoy: "webmaster" }
    ],

    clothing: [
      { main: "chemise", decoy: "polo" }, { main: "pantalon", decoy: "bermuda" }, { main: "robe", decoy: "jupe" },
      { main: "chaussures", decoy: "baskets" }, { main: "chapeau", decoy: "casquette" }, { main: "veste", decoy: "blouson" },
      { main: "chaussettes", decoy: "collants" }, { main: "gants", decoy: "moufles" }, { main: "costume", decoy: "smoking" },
      { main: "pull", decoy: "sweat" }, { main: "jean", decoy: "jogging" }, { main: "bottes", decoy: "bottines" },
      { main: "cravate", decoy: "nœud papillon" }, { main: "ceinture", decoy: "bretelles" }, { main: "écharpe", decoy: "foulard" },
      { main: "sous-vêtements", decoy: "caleçon" }, { main: "pyjama", decoy: "nuisette" }, { main: "maillot de bain", decoy: "bikini" },
      { main: "imperméable", decoy: "ciré" }, { main: "uniforme", decoy: "blouse" }
    ]
  }
};

module.exports = wordsDatabase;