const _ = require('lodash')

function output(input){
	console.log(input)
}

function newNavi(name, {body, soul, mind}){
	/**Stats only because fuck.**/
	return {
		name,
		mind, body, soul,
		hp: body*3,
		folder: mind*2,
	}
}

function doRoll(pool_size, difficulty){
	let rolls=[]
	let hits=0
	for(let i=0;i<pool_size;i++){
		let roll = _.random(1,6)
		if(roll > difficulty){
			rolls.push(`${roll} ✔️ `)
			hits++
		}else{
			rolls.push(`${roll} ❌`)
		}
	}
	return {rolls, hits}
}

function getActions(navi, targets){
	/**actions**/
	//Swap Locations
	//Use Chip
	//Mind Attack
	//Body Attack
	//Soul Attack
	//Full Defend (Stone Body. 1 Damage Max Taken)
	let rollStat = _.sample([
		navi.body*2,
		navi.mind*2,
		navi.soul*2
	])
	let filteredTargets = _.without(targets,navi)
	let target = _.sample(filteredTargets)
	let roll = doRoll(rollStat, 4)
	let action = "attacks"

	return {navi, target, action, roll}
}

let navis=[
	newNavi('Phu King', {body: 3, soul: 2, mind: 1}),
	newNavi('Beepo', {body: 1, soul: 2, mind: 3}),
]

console.log(navis.reduce((acc, navi)=>`${acc} [${navi.name} ${navi.hp}]`,''))
console.log('- - -')
const refreshActions = (navis)=>navis.map((navi)=>getActions(navi, navis))
let actions=refreshActions(navis)
let winner=null

while(true){
	let resolutions = {}
	actions.forEach((action)=>{
		console.log(`${action.navi.name} ${action.action} ${action.target.name} for ${action.roll.hits}. [${action.roll.rolls}]`)
		let targetId=_.indexOf(navis,action.target)
		if(resolutions[targetId]){
			resolutions[targetId].push(action)
		}else{
			resolutions[targetId]=[action]
		}
	})
	if(resolutions){
		_.forEach(resolutions,(resActs, key)=>{
			resActs.forEach((resAct)=>{
				if(resAct.action==="attacks"){
					navis[key].hp = navis[key].hp - resAct.roll.hits
				}
			})
		})
	}
	console.log(navis.reduce((acc, navi)=>`${acc} [${navi.name} ${navi.hp}]`,''))
	console.log('- - -')
	navis = navis.filter((n)=>n.hp>0)

	if(navis.length > 1){
		actions=refreshActions(navis)
	}else if(navis.length > 0){
		console.log(`${navis[0].name} wins!`)
		break;
	}else{
		console.log('Its a tie!')
		break;
	}
}


/**
 * Gameplay loop is that the navis bonk each other like Chao in Chao Fight.
 * Sometimes they'll use chips instead of a random roll
 *
 * Players can customize their PET so that NetNavis prefer certain rolls, chips, dodging, and parrying
 * Movement does not require rolling. 
 * Highest Body Stat goes first
 *
 * StraightForward Chips : Everything in Starter
 * StraightForward NCPs : Stat+1, Cust+3, HP+4, RedundantArray, GoFirst(NCP Specific to this)
 *
 * Chips might have elements in the form of Color
 * Control allows having Elemental attacks
 *
 * NetNavis are mechanically Indie Navis
 *
 * Map looks like this
 * [X][X][Y][Y]
 *
 * Close [ ][X][Y][ ]
 * Near  [ ][X][ ][Y]
 * Far   [X][ ][ ][Y]
 *
 * TODO Rename and retheme Navis to be simpler. BattleProgs? SnuggleBugs? DigiLife? Antigen?
 **/
