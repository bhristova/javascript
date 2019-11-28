
var fs = require('fs');

const runAlgorithm = (data) => {
    var graph = new Map();
    var dist = [];
    var start = 'A';
    data.forEach(el => {
        if(el.length === 1) {
            start = el;
            pushIntoArray(dist, start, Infinity, 0, null);
        } else {
            el = el.split(' ').sort();
            let elName = [el[1], el[2]].sort();
            graph.set(elName[0]+elName[1], {'dist': el[0], 'used': 0});
            pushIntoArray(dist, el[1], Infinity, 0, null);
            pushIntoArray(dist, el[2], Infinity, 0, null);
        }
    });
    pushIntoArray(dist,start,0, 0);
    dijkstra(graph,dist,start,);
};

const pushIntoArray = (arr, e, distValue, usedValue, prev) => {
    let index = arr.findIndex(el => el.v == e);
    let element = {'v':e, 'dist': distValue, 'used': usedValue, 'prev': prev};
    if(index == -1) {
        arr.push(element);
        return;
    }
    arr.splice(index,1);
    arr.push(element);
}

const getMinDist = (dist) => {
    return dist.reduce((min, el) => el.dist < min.dist ? el : min, dist[0]);
}

const setAsUsed = (graph, el) => {
    let newEl = graph.find(e => e.v === el);
    newEl.used = 1;
}


const getDistSoFar = (graph, el) => {
    let elem = graph.find(e => e.v === el);
    return elem !== null ? elem.dist : null;
}

const getDist = (map, elName) => {
    let elem = map.get(elName);
    return elem.dist;
}

const dijkstra = (c,dist,start) => {
    while(!empty(dist)) {
        let u = getMinDist(dist.filter(el => el.used == 0));
        if(u) {
            setAsUsed(dist,u.v);
            c.forEach((value, key, map) => {
                if(key.includes(u.v)) {
                    let newDist = parseFloat(getDistSoFar(dist, u.v)) + parseFloat(getDist(c, key));
                    let v = key.replace(u.v, '');
                    if (newDist < parseFloat(getDistSoFar(dist, v))) {
                        pushIntoArray(dist, v, newDist, 0, u.v);
                    } 
                }
            });
        }
    }
    printResult(dist, start);    
}

const empty = (dist) => {
    return dist.findIndex(el => el.used === 0) === -1 ? true : false;
}

const printResult = (dist, start) => {
    dist.forEach(el => {
        if(el.v !== start) {
            console.log(`${start} -> ${el.v}: ${el.dist}`);
        }
    });
}

var promisify = (func) => (...arg) => {
    return new Promise((resolve, reject) => {
        func(...arg, (err,data) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(data);
        })
    })
};
const readFileMine = promisify(fs.readFile);
const separateLines = data => data.split('\r\n');


readFileMine('./graph.txt','utf8')
.then(separateLines)
.then(runAlgorithm)
.catch(err => console.error(err))