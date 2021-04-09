// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: magic;
let widget = new ListWidget()


const state = args.widgetParameter?args.widgetParameter:'MA'

const API_URL ="https://api.covidtracking.com/v1/states/"+state+"/current.json";
const API_URL1 = "https://api.covidactnow.org/v2/state/"+state+".json?apiKey=28fc03c709f144348557c91160c68e63"

let req = new Request(API_URL) 
let req1 = new Request(API_URL1)
let json = await req.loadJSON()
let json1 = await req1.loadJSON()


//get the data from the JSON
let todayCases = checkForValueInJSON('positiveIncrease')
let todayDeaths = checkForValueInJSON('deathIncrease')
let recovered = checkForValueInJSON('recovered')
let deaths = checkForValueInJSON('death')
let cases = checkForValueInJSON('positive')
let active = cases - deaths - recovered
let casedensity = checkForValueInJSON1('caseDensity')
let vaccinatedIni = Math.floor(checkForValueInJSON1('vaccinationsInitiatedRatio')*100).toFixed(1)
let vaccinated = Math.floor(checkForValueInJSON1('vaccinationsCompletedRatio')*100).toFixed(1)

const date = new Date()
const header = widget.addText(state+" - "+date.toLocaleDateString()+trend(casedensity))
header.font = Font.boldSystemFont(13) 
header.textColor=Color.white()
header.centerAlignText()
widget.addSpacer(2)


//add items to the widget
//addItem('New cases', todayCases.toString())
addItem('Active | New cases', active+" | "+todayCases)
addItem('Total cases', cases)
addItem('Recovered | Deaths', recovered+" | "+deaths)
//addItem('Recovered', recovered.toString())
addItem('Vaccinated 1st | 2nd', vaccinatedIni+"% | "+vaccinated+"%")

// Finalize widget settings 
widget.setPadding(1,1,1,1)
widget.spacing = 1
widget.backgroundColor=Color.black()
Script.setWidget(widget) 
Script.complete()
widget.presentSmall()

function checkForValueInJSON(item){
  let out = (json[item]==null)?'0':json[item].toString()
  return out
}

function checkForValueInJSON1(item){
  let out = (json1["metrics"][item]==null)?'0':json1["metrics"][item].toString()
  return out
}

function trend(value){
  if(value < 1) return " 🟢";
  if(value < 10 && value > 1) return " 🟡";
  if(value < 25 && value > 10) return " 🟠";
  if(value < 75 && value > 25) return " 🔴";
  return " ☠️"
}
  
function addItem(item,itemValue){
  
  const head = widget.addText(item) 
  head.font = Font.boldSystemFont(11) 
  head.textColor = Color.white()
  head.centerAlignText()
  let val = widget.addText(itemValue)
  val.font=Font.mediumRoundedSystemFont(13)
  val.textColor=Color.lightGray()
  val.centerAlignText()
  
  
}
