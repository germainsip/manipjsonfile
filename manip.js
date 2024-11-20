import data from './Abonnement-RRN.json' with {type: "json"};
import fs from 'fs';

const U = data.features.filter((item) => { item.properties.portee == 'U' })

let data2 = data.features
    
let data3 = data2.filter((feat) => feat.properties.portee == 'U')

data.features = data3

console.log(data)

fs.writeFile('Abonnement-RRN-U.json', JSON.stringify(data), 'utf8', () => {console.log('ooops')});