//I made this, don't steal it and stuff
function newGame () {
var toReturn = {
	global: {
		version: 0.06,
		killSavesBelow: 0.05,
		playerGathering: "",
		playerModifier: 1,
		structuresQueue: [],
		timeLeftOnCraft: 0,
		crafting: "",
		timeLeftOnTrap: -1,
		world: 1,
		gridArray: [],
		mapGridArray: [],
		mapsOwnedArray: [],
		currentMapId: "",
		lastClearedCell: -1,
		lastClearedMapCell: -1,
		pauseFight: true,
		soldierHealth: 0,
		soldierHealthMax: 0,
		soldierHealthRemaining: 0,
		soldierCurrentAttack: 0,
		soldierCurrentBlock: 0,
		fighting: false,
		health: 50,
		attack: 6,
		block: 0,
		autoBattle: false,
		autoCraftModifier: 0,
		autoSave: true,
		start: new Date().getTime(),
		time: 0,
		lastFightUpdate: "",
		battleCounter: 0,
		firing: false,
		mapsActive: false,
		preMapsActive: false,
		switchToMaps: false,
		switchToWorld: false,
		lookingAtMap: "",
		mapsOwned: 0,
		totalMapsEarned: 0,
		mapFragments: 0,
		tab: "All",
		prestigeValueMod: 17000,
		prestigeCostMod: 8000,
		buyAmt: 1,
		numTab: 1,
		menu: {
			structures: true,
			jobs: false,
			upgrades: false
		},
		messages: {
			Story: true,
			Loot: true,
			Unlocks: true,
			Combat: true,
			Notices: true
		},
		getEnemyAttack: function (level, name) {
			var world = getCurrentMapObject();
			world = (game.global.mapsActive) ? world.level : game.global.world;
			level += ((world - 1) * 100);
			level /= 2;
			var amt = Math.floor((4 * Math.pow(1.045, level)) * game.badGuys[name].attack);
			return amt;
		},
		getEnemyHealth: function (level, name) {
			var world = getCurrentMapObject();
			world = (game.global.mapsActive) ? world.level : game.global.world;
			level += ((world - 1) * 100);
			var amt = Math.floor((25 * Math.pow(1.022, level)) * game.badGuys[name].health);
			return amt;
		}
	},
	
	//SETTINGS*******
	//SETTINGS	
	settings: {
		speed: 10,
		speedTemp: 0,
		slowdown: false,
		barAnimation: true
	},
	
	//RESOURCES******
	//RESOURCES
	resources: {
		food: {
			owned: 0,
			max: 500
		},
		wood: {
			owned: 0,
			max: 500
		},
		metal: {
			owned: 0,
			max: 500
		},
		trimps: {
			owned: 0,
			max: 10,
			working: 0,
			speed: 5,
			employed: 0,
			soldiers: 0,
			maxSoldiers: 1,
			potency: 0.0085
		},
		science: {
			owned: 0,
			max: -1
		},
		gems: {
			owned: 0,
			max: -1
		}
	},
	
	//EQUIPMENT******
	//EQUIPMENT
	equipment: {
		Shield: {
			locked: 1,
			tooltip: "A big, wooden shield. Adds $health$ health to each soldier per level.",
			modifier: 1,
			level: 0,
			cost: {
				wood: [10, 1.2]
			},
			health: 1,
			prestige: 1
		},
		Dagger: {
			locked: 1,
			tooltip: "Better than nothing. Adds $attack$ attack to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [25, 1.13]
			},
			attack: 1,
			prestige: 1
		},
		Boots: {
			locked: 1,
			tooltip: "At least their feet will be safe. Adds $health$ health to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [35, 1.13]
			},
			health: 3,
			prestige: 1
		},
		Mace: {
			locked: 1,
			tooltip: "It's kind of heavy for your Trimps, but they'll manage. Adds $attack$ attack to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [120, 1.1]
			},
			attack: 7,
			prestige: 1
		},
		Helmet: {
			locked: 1,
			tooltip: "Provides a decent amount of protection to the Trimps' heads, adding $health$ health to each soldier per level.",
			modifier: 1,
			level: 0,
			cost: {
				metal: [170, 1.1]
			},
			health: 20,
			prestige: 1
		},
		Polearm: {
			locked: 1,
			tooltip: "This thing is big and pointy. It adds $attack$ attack to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [960, 1.1]
			},
			attack: 55,
			prestige: 1
		},
		Pants: {
			locked: 1,
			tooltip: "Pants designed specificially for the little Trimps! Adds $health$ health to each soldier per level.",
			modifier: 1,
			level: 0,
			cost: {
				metal: [1140, 1.1]
			},
			health: 140,
			prestige: 1
		},
		Battleaxe: {
			locked: 1,
			tooltip: "This weapon is pretty intimidating, but your Trimps think they can handle it. Adds $attack$ attack to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [4200, 1.1]
			},
			attack: 425,
			prestige: 1
		},
		Shoulderguards: {
			locked: 1,
			tooltip: "These shoulderguards will help keep your Trimps' necks and shoulders safe, and they look cool too. Adds $health$ health to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [5700, 1.1]
			},
			health: 980,
			prestige: 1
		},
		Greatsword: {
			locked: 1,
			tooltip: "This sword looks sweet. Seriously, if you could see it you'd think it looked sweet. Trust me. Adds $attack$ attack to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [30000, 1.1]
			},
			attack: 3150,
			prestige: 1
		},
		Breastplate: {
			locked: 1,
			tooltip: "Some real, heavy duty armor. Everyone looks badass in heavy duty armor. Adds $health$ health to each soldier per level",
			modifier: 1,
			level: 0,
			cost: {
				metal: [54000, 1.1]
			},
			health: 7000,
			prestige: 1
		}
	},
	//BADGUYS*****
	//BADGUYS
	badGuys: {
		Squimp: {
			location: "all",
			attack: 1,
			health: 1,
			fast: true
		},
		Elephimp: {
			location: "all",
			attack: 0.9,
			health: 1.3,
			fast: false
		},
		Turtlimp: {
			location: "all",
			attack: 0.9,
			health: 1.3,
			fast: false
		},
		Penguimp: {
			location: "all",
			attack: 1.3,
			health: 0.7,
			fast: false
		},
		Snimp: {
			location: "all",
			attack: 1.1,
			health: 0.8,
			fast: true
		},
		Gorillimp: {
			location: "all",
			attack: 0.9,
			health: 1.1,
			fast: true
		},
		Shrimp: {
			location: "sea",
			attack: 0.8,
			health: 0.9,
			fast: true
		}
	},
	
	
		//MAPCONFIG
	//mapConfig
	mapConfig: {
		names: {
			prefix: ["Whispering", "Sandy", "Little", "Big", "Rancid", "Tired", "Laughing", "Weeping", "Windy", "Terrible", "Nasty", "Dirty", "Red", "Black", "Singing", "Fiery", "Rocky"],
			suffix: ["Creek", "Coast", "Mill", "Swamp", "Forest", "Mountain", "Pass", "Way", "Plains", "Beach", "Hill", "Gorge", "Valley", "Road", "Turn", "Lift", "Peak", "Canyon", "Plateau", "Camp", "Crag", "Crater", "Flats", "Oaks"]
		},
		sizeBase: 50,
		sizeRange: 25,
		difficultyBase: 1.4,
		difficultyRange: 0.5,
		lootBase: 1.3,
		lootRange: 0.3
	},
	
	
	//MAPUNLOCKS
	mapUnlocks: {
		Supershield: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Shield!",
			level: "last",
			icon: "book",
			last: 1,
			fire: function () {
				unlockUpgrade("Supershield");
			}
		},
		Dagadder: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Dagger!",
			level: "last",
			icon: "book",
			last: 1,
			fire: function () {
				unlockUpgrade("Dagadder");
			}
		},
		Bootboost: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Boots!",
			level: "last",
			icon: "book",
			last: 1,
			fire: function () {
				unlockUpgrade("Bootboost");
			}
		},
		Megamace: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Mace!",
			level: "last",
			icon: "book",
			last: 2,
			fire: function () {
				unlockUpgrade("Megamace");
			}
		},
		Hellishmet: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Helmet!",
			level: "last",
			icon: "book",
			last: 2,
			fire: function () {
				unlockUpgrade("Hellishmet");
			}
		},		
		Polierarm: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Polearm!",
			level: "last",
			icon: "book",
			last: 3,
			fire: function () {
				unlockUpgrade("Polierarm");
			}
		},
		Pantastic: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Pants!",
			level: "last",
			icon: "book",
			last: 3,
			fire: function () {
				unlockUpgrade("Pantastic");
			}
		},
		Axeidic: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Battleaxe!",
			level: "last",
			icon: "book",
			last: 4,
			fire: function () {
				unlockUpgrade("Axeidic");
			}
		},
		Smoldershoulder: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Shoulderguards!",
			level: "last",
			icon: "book",
			last: 5,
			fire: function () {
				unlockUpgrade("Smoldershoulder");
			}
		},
		Greatersword: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Greatsword!",
			level: "last",
			icon: "book",
			last: 5,
			fire: function () {
				unlockUpgrade("Greatersword");
			}
		},
		Bestplate: {
			world: -1,
			message: "You found a book that will teach you how to upgrade your Breastplate!",
			level: "last",
			icon: "book",
			last: 5,
			fire: function () {
				unlockUpgrade("Bestplate");
			}
		},
		Mansion: {
			world: 6,
			message: "You found plans for a Mansion! Your Trimps will be pretty stoked",
			level: "last",
			icon: "home",
			canRunOnce: true,
			fire: function () {
				unlockStructure("Mansion");
			}
		},
		Hotel: {
			world: 10,
			message: "You found plans for a hotel! (A decent hotel, too)",
			level: "last",
			icon: "home",
			canRunOnce: true,
			fire: function () {
				unlockStructure("Hotel");
			}
		},
		UberHotel: {
			world: 15,
			message: "You found a book that will teach you how to improve your hotels!",
			level: "last",
			icon: "book",
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("UberHotel");
			}
		},
		Resort: {
			world: 20,
			message: "You found plans for a huge resort!",
			level: "last",
			icon: "home",
			canRunOnce: true,
			fire: function () {
				unlockStructure("Resort");
			}
		},
		UberResort: {
			world: 25,
			message: "You found a book that will teach you how to improve your resorts!",
			level: "last",
			icon: "book",
			canRunOnce: true,
			fire: function () {
				unlockUpgrade("UberResort");
			}
		},
		gems: {
			world: -1,
			level: [0, 15],
			icon: "certificate",
			repeat: 6,
			fire: function (level) {
				var amt = rewardResource("gems", 0.008, level, true);
				message("<span class='glyphicon glyphicon-certificate'></span>You found " + prettify(amt) + " gems! Terrific!", "Loot");
			}
		},
		metal: {
			world: -1,
			level: [0, 5],
			icon: "fire",
			repeat: 6,
			fire: function (level) {
				var amt = rewardResource("metal", 1, level, true);
				message("<span class='glyphicon glyphicon-fire'></span>You just found " + prettify(amt) + " bars of metal! Convenient!", "Loot");
			},
		},
	},
	//WORLDUNLOCKS******
	//WORLDUNLOCKS
	//if you put a function in here as fire, you won't have anything unlocked, the name is just for funsies
	//-1 is all worlds, -2 is even world numbers, -3 is odd world numbers, -5 is every 5th world
	//min is inclusive, max is exclusive. too lazy to fix
	//More important stuff should be towards the top in case of bailouts
	worldUnlocks: {
		Shield: {
			message: "You found plans for a shield! It even tells you how to upgrade it, if you have enough wood. That was nice of that bad guy.",
			world: 1,
			level: 4,
			icon: "question-sign"		
		},
		Boots: {
			message: "You found plans for Boots! Swell!",
			world: 1,
			level: 49,
			icon: "question-sign"
		},
		Dagger: {
			message: "You found plans for a Dagger! Fancy!",
			world: 1,
			level: 19,
			icon: "question-sign"
		},
		Mace: {
			message: "You found plans for a mace!",
			world: 2,
			level: 19,
			icon: "question-sign"
		},
		Helmet: {
			message: "You found plans for a helmet!",
			world: 2,
			level: 49,
			icon: "question-sign"
		},
		Polearm: {
			message: "You found plans for a Polearm!",
			world: 3,
			level: 19,
			icon: "question-sign"
		},
		Pants: {
			message: "You found plans for Pants!",
			world: 3,
			level: 49,
			icon: "question-sign"
		},
		Battleaxe: {
			message: "You found plans for a Battleaxe!",
			world: 4,
			level: 19,
			icon: "question-sign"
		},
		Shoulderguards: {
			message: "You found plans for Shoulderguards!",
			world: 4,
			level: 49,
			icon: "question-sign"
		},
		Greatsword: {
			message: "You found plans for a Greatsword!",
			world: 5,
			level: 19,
			icon: "question-sign"
		},
		Breastplate: {
			message: "You found plans for a Breastplate!",
			world: 5,
			level: 49,
			icon: "question-sign"
		},
		
		//Non Equipment
		Bloodlust: {
			message: "You found an ancient book titled Bloodlust. You should look at it or something.",
			world: 1,
			level: 9,
			icon: "book",
			fire: function() {
				unlockUpgrade("Bloodlust");
			}
		},
		Efficiency: {
			message: "Hey, this book might be for you!",
			world: -2,
			level: 9,
			icon: "book",
			fire: function() {
				unlockUpgrade("Efficiency");
			}
		},
		Gym: {
			message: "Hey look, plans for a new Gym!",
			world: 2,
			level: 4,
			icon: "home",
			fire: function() {
				unlockStructure("Gym");
				document.getElementById("blockDiv").style.visibility = "visible";
			}
		},
		TrainTacular: {
			message: "This book is for your Trainers!",
			world: -5,
			level: 9,
			icon: "book",
			fire: function () {
				unlockUpgrade("TrainTacular");
			}
		},
		Potency: {
			message: "Also known as the Trimpma Sutra, this book will help your Trimps make more Trimps",
			world: -5,
			level: 29,
			icon: "book",
			fire: function () {
				unlockUpgrade("Potency");
			}
		},
		//19 is for Boots
		Miner: {
			message: "You found an ancient book about mining. With some research you should be able to teach the Trimps to mine!",
			world: 1,
			level: 29,
			icon: "book",
			fire: function () {
				unlockUpgrade("Miners");
			}
		},
		Blockmaster: {
			message: "You found a book discussing tactics for better blocking!",
			world: 3,
			level: 29,
			icon: "book",
			fire: function () {
				unlockUpgrade("Blockmaster");
			}
		},
		Trainer: {
			message: "You found an book about proper physical training!",
			world: 3,
			level: 3, 
			icon: "book",
			fire: function () {
				unlockUpgrade("Trainers");
			}		
		},
		Scientist: {
			message: "You found a book about Einstrimp!",
			world: 1,
			level: 39,
			icon: "book",
			fire: function () {
				unlockUpgrade("Scientists");
			}
		},
		Speedscience: {
			message: "You found a book called Speedscience! What do you think it could possibly do?!",
			world: -2,
			level: 39,
			icon: "book",
			fire: function () {
				unlockUpgrade("Speedscience");
			}
		},
		//49 is for weapon
		Speedfarming:{
			message: "You found a book called Speedfarming! It looks delicious!",
			world: -1,
			level: 79,
			icon: "book",
			fire: function () {
				unlockUpgrade("Speedfarming");
			}
		},
		Speedlumber: {
			message: "You found a book called Speedlumber! It looks long.",
			world: -1,
			level: 69,
			icon: "book",
			fire: function () {
				unlockUpgrade("Speedlumber");
			}
		},
		Speedminer: {
			message: "You found a book called Speedminer! Hopefully the name will be more creative at some point.",
			world: -1,
			level: 59,
			icon: "book",
			fire: function() {
				unlockUpgrade("Speedminer");
			}
		},
		Foreman: {
			message: "You found a crafting foreman! He will build structures automatically for you!",
			world: -1,
			level: 89,
			icon: "user",
			fire: function () {
				game.global.autoCraftModifier += 0.5;
				document.getElementById("foremenCount").innerHTML = (game.global.autoCraftModifier * 2) + " Foremen";
			}
			
		},
		Coordination: {
			message: "You find an ancient book titled Coordination. Exciting.",
			world: -1,
			level: 99,
			icon: "book",
			fire: function() {
				unlockUpgrade("Coordination");
			}
		},
		
		
		//Multiples
		Map: {
			world: -1,
			startAt: 6,
			level: [0, 20],
			repeat: 20,
			icon: "th",
			fire: function() {
				createMap();
			}
		},
		fiveTrimpMax: {
			world: -1,
			level: [10, 20],
			icon: "gift",
			repeat: 45,
			fire: function () {
				game.resources.trimps.max += 5;
				message("<span class='glyphicon glyphicon-gift'></span>You have cleared enough land to support 5 more Trimps!", "Loot");
			}
		},
		fruit: {
			world: -1,
			level: [0, 4],
			icon: "apple",
			repeat: 9,
			fire: function (level) {
				var amt = rewardResource("food", 1, level);
				message("<span class='glyphicon glyphicon-apple'></span>That guy just left " + prettify(amt) + " food on the ground! Sweet!", "Loot");
			}
		},
		groundLumber: {
			world: -1,
			level: [0, 2],
			icon: "tree-deciduous",
			repeat: 8,
			fire: function (level) {
				var amt = rewardResource("wood", 1, level);
				message("<span class='glyphicon glyphicon-tree-deciduous'></span>You just found " + prettify(amt) + " wood! That's pretty neat!", "Loot");
			}
		},
		freeMetals: {
			world: -1,
			level: [3, 5],
			icon: "fire",
			repeat: 6,
			fire: function (level) {
				var amt = rewardResource("metal", 0.5, level);
				message("<span class='glyphicon glyphicon-fire'></span>You just found " + prettify(amt) + " bars of metal! Convenient!", "Loot");
			}
		}
	},

	//STRUCTURES
	//STRUCTURES
	structures: {
		Trap: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 5,
			tooltip: "Each Trap allows you to catch one thing",
			cost: {
				food: 10,
				wood: 10
			},
			first: function () {
				document.getElementById("trimps").style.visibility = "visible";
			}
		},
		Hut: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 10,
			tooltip: "Has room for 3 more lovely Trimps",
			cost: {
				food: function () {
					return Math.floor(125 * Math.pow(1.22, game.structures.Hut.purchased));
				},
				wood: function () {
					return Math.floor(75 * Math.pow(1.22, game.structures.Hut.purchased));
				}
			},
			increase: {
				what: "trimps.max",
				by: 3
			}
		},
		Barn: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 10,
			tooltip: "Increases your maximum food by 50%",
			cost: {
				food: function () {
					return Math.floor(50 * Math.pow(1.3, game.structures.Barn.purchased));
				},
				wood: function () {
					return Math.floor(75 * Math.pow(1.3, game.structures.Barn.purchased));
				}
			},
			increase: {
				what: "food.max.mult",
				by: 1.5
			}
		},
		Shed: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 10,
			tooltip: "Increases your maximum wood by 50%",
			cost: {
				wood: function () {
					return Math.floor(150 * Math.pow(1.3, game.structures.Shed.purchased));
				}
			},
			increase: {
				what: "wood.max.mult",
				by: 1.5
			}
		},
		Forge: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 10,
			tooltip: "Increases your maximum metal by 50%",
			cost: {
				metal: function () {
					return Math.floor(100 * Math.pow(1.3, game.structures.Forge.purchased));
				}
			},
			increase: {
				what: "metal.max.mult",
				by: 1.5
			}
		},
		Gym: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 20,
			tooltip: "A building where your Trimps can work out. Each Gym increases the amount of damage each trimp can block by $incby$.",
			cost: {
				wood: function () {
					return Math.floor(400 * Math.pow(1.15, game.structures.Gym.purchased));
				}
			},
			increase: {
			what: "global.block",
			by: 4
			}
		},
		House: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 20,
			tooltip: "A better house for your Trimps! Each house supports up to 5 more Trimps.",
			cost: {
				food: function () {
					return Math.floor(2750 * Math.pow(1.2, game.structures.House.purchased));
				},
				wood: function () {
					return Math.floor(4500 * Math.pow(1.2, game.structures.House.purchased));
				},
				metal: function () {
					return Math.floor(500 * Math.pow(1.2, game.structures.House.purchased));
				}
			},
			increase: {
				what: "trimps.max",
				by: 5
			}
		},
		Mansion: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 60,
			tooltip: "A pretty sick mansion for your Trimps to live in. Each Mansion supports up to 10 more Trimps.",
			cost: {
				gems: function () {
					return Math.floor(5 * Math.pow(1.2, game.structures.Mansion.purchased));
				},
				wood: function () {
					return Math.floor(30000 * Math.pow(1.2, game.structures.Mansion.purchased));
				},
				metal: function () {
					return Math.floor(4000 * Math.pow(1.2, game.structures.Mansion.purchased));
				}
			},
			increase: {
				what: "trimps.max",
				by: 10
			}
		},
		Hotel: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 120,
			tooltip: "A fancy hotel for many Trimps to live in. Complete with room service and a mini bar. Supports $incby$ Trimps.",
			cost: {
				gems: function () {
					return Math.floor(20 * Math.pow(1.2, game.structures.Hotel.purchased));
				},
				wood: function () {
					return Math.floor(120000 * Math.pow(1.2, game.structures.Hotel.purchased));
				},
				metal: function () {
					return Math.floor(50000 * Math.pow(1.2, game.structures.Hotel.purchased));
				},
				food: function () {
					return Math.floor(100000 * Math.pow(1.2, game.structures.Hotel.purchased));
				}
			},
			increase: {
				what: "trimps.max",
				by: 40
			}
		},
		Resort: {
			locked: 1,
			owned: 0,
			purchased: 0,
			craftTime: 240,
			tooltip: "A huge resort for your Trimps to live in. Sucks for the ones still stuck in huts. Supports $incby$ Trimps.",
			cost: {
				gems: function () {
					return Math.floor(200 * Math.pow(1.2, game.structures.Resort.purchased));
				},
				wood: function () {
					return Math.floor(1200000 * Math.pow(1.2, game.structures.Resort.purchased));
				},
				metal: function () {
					return Math.floor(500000 * Math.pow(1.2, game.structures.Resort.purchased));
				},
				food: function () {
					return Math.floor(1000000 * Math.pow(1.2, game.structures.Resort.purchased));
				}
			},
			increase: {
				what: "trimps.max",
				by: 500
			}
		},
	},

	//JOBS******
	//JOBS
	jobs: {
		Farmer: {
			locked: 1,
			owned: 0,
			tooltip: "Train one of your Trimps in the ancient art of farming.",
			cost: {
				food: [5, 1.005]
			},
			increase: "food",
			modifier: 0.5
		},
		Lumberjack: {
			locked: 1,
			owned: 0,
			tooltip: "Show a Trimp how to cut one of those weird trees down.",
			cost: {
				food: [5, 1.005]
			},
			increase: "wood",
			modifier: 0.5
		},
		Miner: {
			locked: 1,
			owned: 0,
			tooltip: "Send your misbehaving Trimps to the mines for some therapeutic work.",
			cost: {
				food: [20, 1.005],
				wood: [20, 1.005],
				metal: [15, 1.005]
			},
			increase: "metal",
			modifier: 0.5
		},
		Scientist: {
			locked: 1,
			owned: 0,
			tooltip: "It takes some patience, but you can teach these Trimps to do some research for you.",
			cost: {
				food: [100, 1.005]
			},
			increase: "science",
			modifier: 0.25
		},
		Trainer: {
			locked: 1,
			owned: 0,
			tooltip: "Each trainer will increase the amount your soldiers can block by $modifier$%",
			cost: {
				food: [750, 1.005]
			},
			increase: "custom",
			modifier: 20
		}
		

	},
	
	//UPGRADES*****
	//UPGRADES
	upgrades: {
		Battle: {
			locked: 1,
			tooltip: "Figure out how to teach these Trimps to kill some bad guys",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 10
				}
			},
			fire: function () {
				document.getElementById("battleContainer").style.visibility = "visible";
				buildGrid();
				drawGrid();
				game.global.BattleClock = -1;
				document.getElementById('metal').style.visibility = "visible";
			}
		},
		Bloodlust: {
			locked: 1,
			tooltip: "This book will teach your Trimps to Battle on their own.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 60,
					food: 150
				}
			},
			fire: function () {
				game.global.autoBattle = true;
				document.getElementById("pauseFight").style.visibility = "visible";
			}
		},
		Coordination: {
			locked: 1,
			tooltip: "This book will teach your soldiers how to utilize the buddy system. Fighting will now require twice as many Trimps, but attack and health will be doubled.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: [450, 1.2],
					food: [1000, 1.2],
					wood: [1000, 1.2],
					metal: [500, 1.2]
				}
			},
			fire: function () {
				game.resources.trimps.maxSoldiers *= 2;
			}
		},
		Miners: {
			locked: 1,
			tooltip: "You really don't like reading books, but it seems better than mining yourself.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 30,
					wood: 30,
					metal: 30
				}
			},
			fire: function () {
				unlockJob("Miner");
			}
		},
		Trainers: {
			locked: 1,
			tooltip: "This book holds all of the secrets of upper management. Train your Trimps to train other Trimps.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 500,
					food: 1000
				}
			},
			fire: function () {
				unlockJob("Trainer");
			}
		},
		Scientists: {
			locked: 1,
			tooltip: "You really don't believe it, but that book indicates that Trimps can be smart. Better read it and find out how.",
			done: 0,
			allowed: 0,
			cost: {
				resources: {
					science: 45,
					food: 100
				}
			},
			fire: function () {
				unlockJob("Scientist");
			}			
		},
		Speedlumber: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to cut wood twice as fast!",
			done: 0,
			cost: {
				resources: {
					science: [200, 1.2],
					wood: [1000, 1.2]
				}
			},
			fire: function () {
				game.jobs.Lumberjack.modifier = (game.jobs.Lumberjack.modifier * 2);
			}			
		},
		Speedfarming: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to farm twice as fast!",
			done: 0,
			cost: {
				resources: {
					science: [200, 1.8],
					food: [1000, 1.8]
				}
			},
			fire: function () {
				game.jobs.Farmer.modifier = (game.jobs.Farmer.modifier * 2);
			}			
		},
		Speedminer: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to mine twice as fast!",
			done: 0,
			cost: {
				resources: {
					science: [200, 1.8],
					metal: [500, 1.8]
				}
			},
			fire: function () {
				game.jobs.Miner.modifier = (game.jobs.Miner.modifier * 2);
			}			
		},
		Speedscience: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trimps how to science things twice as fast!",
			done: 0,
			cost: {
				resources: {
					science: [750, 1.8]
				}
			},
			fire: function () {
				game.jobs.Scientist.modifier = (game.jobs.Scientist.modifier * 2);
			}			
		},
		Efficiency: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach you how to be twice as productive in everything you do! Hurray!",
			done: 0,
			cost: {
				resources: {
					science: [450, 1.2],
					food: [1200, 1.2],
					wood: [3000, 1.2],
					metal: [600, 1.2]
				}
			},
			fire: function () {
				game.global.playerModifier *= 2;
			}			
		},
		Potency: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your trimps how to be twice as efficient at making baby Trimps!",
			done: 0,
			cost: {
				resources: {
					science: [1000, 1.5],
					wood: [30000, 1.5],
				}
			},
			fire: function () {
				game.resources.trimps.potency *= 2;
			}
		},
		UberHotel: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will increase the space gained from each Hotel by 2x",
			done: 0,
			cost: {
				resources: {
					science: [3000, 1.3],
					food: [200000, 1.3],
					metal: [100000, 1.3]
				}
			},
			fire: function () {
				game.resources.trimps.max += ((game.structures.Hotel.owned * 2) * game.structures.Hotel.increase.by);
				game.structures.Hotel.increase.by *= 2;
			}
		},
		UberResort: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will increase the space gained from each Resort by 2x",
			done: 0,
			cost: {
				resources: {
					science: [30000, 1.3],
					food: [2000000, 1.3],
					metal: [1000000, 1.3]
				}
			},
			fire: function () {
				game.resources.trimps.max += ((game.structures.Resort.owned * 2) * game.structures.Resort.increase.by);
				game.structures.Resort.increase.by *= 2;
			}
		},
		
		
		
		
		//Equipment upgrades
		Blockmaster: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will increase the block gained from each Gym by 3x",
			done: 0,
			cost: {
				resources: {
					science: [750, 1.3],
					food: [2000, 1.3],
					metal: [1000, 1.3]
				}
			},
			fire: function () {
				game.global.block *= 3;
				game.structures.Gym.increase.by *= 3;
			}
		},
		TrainTacular: {
			locked: 1,
			allowed: 0,
			tooltip: "This book will teach your Trainers how to be twice as good at their jobs!",
			done: 0,
			cost: {
				resources: {
					science: [1000, 1.7],
					food: [2000, 1.7],
					wood: [3000, 1.7],
					metal: [2000, 1.7]
				}
			},
			fire: function () {
				game.jobs.Trainer.modifier *= 2;
			}
		},
		Supershield: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your shield. This will destroy your old shield and vastly increase the cost of further upgrades, but will vastly increase the amount of health given.",
			done: 0,
			cost: {
				resources: {
					science: [1200, 1.7],
					gems: [20, 3]
				}
			},
			fire: function () {
				prestigeEquipment("Shield");
			}
		},
		Dagadder: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your dagger. This will destroy your old dagger and vastly increase the cost of further upgrades, but will vastly increase the amount of attack given.",
			done: 0,
			cost: {
				resources: {
					science: [1250, 1.7],
					gems: [25, 3]
				}
			},
			fire: function () {
				prestigeEquipment("Dagger");
			}
		},
		Bootboost: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your boots. This will destroy your old boots and vastly increase the cost of further upgrades, but will vastly increase the amount of health given.",
			done: 0,
			cost: {
				resources: {
					science: [1300, 1.7],
					gems: [30, 3]
				}
			},
			fire: function () {
				prestigeEquipment("Boots");
			}
		},
		Megamace: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your mace. This will destroy your old mace and vastly increase the cost of further upgrades, but will vastly increase the amount of attack given.",
			done: 0,
			cost: {
				resources: {
					science: [1400, 1.7],
					gems: [40, 3]
				}
			},
			fire: function () {
				prestigeEquipment("Mace");
			}
		},
		Hellishmet: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your helmet. This will destroy your old helmet and vastly increase the cost of further upgrades, but will vastly increase the amount of health given.",
			done: 0,
			cost: {
				resources: {
					science: [1450, 1.7],
					gems: [45, 3]
				}
			},
			fire: function () {
				prestigeEquipment("Helmet");
			}
		},
		Polierarm: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your polearm. This will destroy your old polearm and vastly increase the cost of further upgrades, but will vastly increase the amount of attack given.",
			done: 0,
			cost: {
				resources: {
					science: [1550, 1.7],
					gems: [55, 3]
				}
			},
			fire: function () {
				prestigeEquipment("Polearm");
			}
		},
		Pantastic: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your pants. This will destroy your old pants and vastly increase the cost of further upgrades, but will vastly increase the amount of health given.",
			done: 0,
			cost: {
				resources: {
					science: [1600, 1.7],
					gems: [60, 3]
				}
			},
			fire: function () {
				prestigeEquipment("Pants");
			}
		},
		Axeidic: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your axe. This will destroy your old axe and vastly increase the cost of further upgrades, but will vastly increase the amount of attack given.",
			done: 0,
			cost: {
				resources: {
					science: [1700, 1.7],
					gems: [70, 3]
				}
			},
			fire: function () {
				prestigeEquipment("Battleaxe");
			}
		},
		Smoldershoulder: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your shoulderguards. This will destroy your old shoulderguards and vastly increase the cost of further upgrades, but will vastly increase the amount of health given.",
			done: 0,
			cost: {
				resources: {
					science: [1750, 1.7],
					gems: [80, 3]
				}
			},
			fire: function () {
				prestigeEquipment("Shoulderguards");
			}
		},
		Greatersword: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your greatsword. This will destroy your old greatsword and vastly increase the cost of further upgrades, but will vastly increase the amount of attack given.",
			done: 0,
			cost: {
				resources: {
					science: [1850, 1.7],
					gems: [85, 3]
				}
			},
			fire: function () {
				prestigeEquipment("Greatsword");
			}
		},
		Bestplate: {
			locked: 1,
			allowed: 0,
			tooltip: "Researching this will prestige your breastplate. This will destroy your old breastplate and vastly increase the cost of further upgrades, but will vastly increase the amount of health given.",
			done: 0,
			cost: {
				resources: {
					science: [1900, 1.7],
					gems: [90, 3]
				}
			},
			fire: function () {
				prestigeEquipment("Breastplate");
			}
		}
	},

	//TRIGGERS****
	//TRIGGERS
	triggers: {
		Trap: {
			done: 0,
			message: "Maybe there's something meaty and delicious here to Trap",
			cost: {
				resources: {
					food: 5,
					wood: 5
				}
			},
			fire: function () {
				document.getElementById("buyCol").style.visibility = "visible";
				unlockStructure("Trap");
			}
		},
		wood: {
			done: 0,
			message: "You'll need some wood to build stuff...",
			cost: {
				resources: {
					food: 5
				}
			},
			fire: function () {
				document.getElementById("wood").style.visibility = "visible";
			}
		},
		Barn: {
			done: 0,
			message: "The food stores are getting pretty full, maybe you should start thinking about a Barn",
			cost: {
				resources: {
					food: 350
				}
			},
			fire: function () {
				unlockStructure("Barn");
			}
		},
		Shed: {
			done: 0,
			message: "A nice Shed would allow you to keep more wood on hand",
			cost: {
				resources: {
					wood: 350
				}
			},
			fire: function () {
				unlockStructure("Shed");
			}
		},
		Forge: {
			done: 0,
			message: "A nice Forge would allow you to store more metal.",
			cost: {
				resources: {
					metal: 350
				}
			},
			fire: function () {
				unlockStructure("Forge");
			}
		},
		jobs: {
			done: 0,
			message: "There's a weird impish little creature in the trap. A Trimp, you decide to call it. Since you're so creative, you could probably train this Trimp to help out.",
			cost: {
				resources: {
					trimps: 1
				}
			},
			fire: function () {
				document.getElementById("tabJobs").style.visibility = "visible";
				document.getElementById("trimpTitle").innerHTML = "Trimps";
				document.getElementById("empHide").style.visibility = "visible";
				unlockJob("Farmer");
				document.getElementById("jobsTitleDiv").style.display = "block";
				game.global.menu.jobs = true;
			}
		},
		Lumberjack: {
			done: 0,
			cost: {
				jobs: {
					Farmer: 1
				}
			},
			fire: function () {
				unlockJob("Lumberjack");
			}
		},
		upgrades: {
			done: 0,
			message: "Time to figure this planet out",
			cost: {
				resources: {
					trimps: 2,
					food: 15
				}
			},
			fire: function () {
				document.getElementById("tabUpgrades").style.visibility = "visible";
				document.getElementById("science").style.visibility = "visible";
				document.getElementById("upgradesTitleDiv").style.display = "block";
				game.global.menu.upgrades = true;
			}
		},
		Battle: {
			done: 0,
			once: function() {document.getElementById("upgradesTitleSpan").innerHTML = "Upgrades";},
			message: "War... what is it good for? Exploration, or something.",
			cost: {
				resources: {
					science: 1
				}
			},
			fire: function () {
				unlockUpgrade('Battle');
				document.getElementById("upgradesTitleSpan").innerHTML = "Upgrades";
			}
		},
		Hut: {
			done: 0,
			message: "Doesn't seem like all of these little guys will fit in your ship",
			cost: {
				resources: {
					trimps: 8
				}
			},
			fire: function () {
				unlockStructure('Hut');
			}
		},
		House: {
			done: 0,
			message: "It's starting to get pretty crowded up in here. Maybe you should start building some better housing.",
			cost: {
				resources: {
					trimps: 75
				}
			},
			fire: function () {
				unlockStructure('House');
			}
		},
		breeding: {
			done: 0,
			message: "Apparently the Trimps breed if they're not working. Doesn't look pleasant.",
			cost: {
				special: function () {
					return (game.resources.trimps.owned - game.resources.trimps.employed >= 2) ? true : false;
				}
			},
			fire: function () {
				document.getElementById("unempHide").style.visibility = "visible";
			}
		},
		firstMap: {
			done: 0,
			message: "You just found your first map! Travel to your map chamber to check it out!",
			cost: {
				special: function () {
					return (game.global.mapsOwned > 0) ? true : false;
				}
			},
			fire: function () {
				document.getElementById("mapsBtn").style.visibility = "visible";
				document.getElementById("gems").style.visibility = "visible";
			}
		
		}
	}
};
return toReturn;
}
var game = newGame();