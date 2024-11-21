import data from './geojson/Abonnement-RRN.json' with {type: "json"};
import fs from 'fs';



// reduction du nombre de coordonnées sur la carte - smart simplify
function smartCoordinateReducer(geojson){

    console.log('trying to reduce coordinates number for dir map - smart version')
   
    let totalBefore = 0;
    let totalAfter = 0;

    geojson.features.map(feature => {

        const coef = 300 // divise le nombre de coordonnées gardées
        const geoType = feature.geometry.type // type LineString ou MultiLineString

        if(geoType === 'LineString') {

            const size = feature.geometry.coordinates.length
            totalBefore += size;
            let reducedCoords = [] // coordonnées intermédiaire gardées selon coef appliqué

            for(let i=0; i<size; i+=coef){
                reducedCoords.push(feature.geometry.coordinates[i])
            }
            if(size%coef != 0){
                reducedCoords.push(feature.geometry.coordinates[size - 1])
            }
            feature.geometry.coordinates = reducedCoords
            totalAfter += reducedCoords.length;
        }

        else if(geoType === 'MultiLineString') {

            let flatCoords = []

            feature.geometry.coordinates.forEach(coords => {

                const size = coords.length
                totalBefore += size;
                let reducedCoords = [] // coordonnées intermédiaire gardées selon coef appliqué

                for(let i=0; i<size; i+=coef){
                    reducedCoords.push(coords[i])
                }
                if(size%coef != 0){
                    reducedCoords.push(coords[size - 1])
                }
                totalAfter += reducedCoords.length;
                flatCoords = [ ...flatCoords, reducedCoords ]
            })

            feature.geometry.coordinates = flatCoords
        }

        return feature         
    })

    console.log('DIR MAP - nombre total de coordonnées avant:', totalBefore, ' / après: ',totalAfter)
    return geojson
}



let data2 = data.features
    
let U = data2.filter((feat) => feat.properties.portee == 'U')
let featCleaned = data2.filter((feat) => feat.properties.portee == 'D' || feat.properties == 'U')

data.features = featCleaned

let test = smartCoordinateReducer(data)

console.log(test)

//console.log(data)

fs.writeFile('out/Abonnement-RRN-clean2.geojson', JSON.stringify(test), 'utf8', () => {console.log('traitement terminé')});