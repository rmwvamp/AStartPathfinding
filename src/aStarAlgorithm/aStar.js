function aStar(startNode, endNode){
    let openSet = [], closedSet = [], path = [], visitedNodes = [];
    openSet.push(startNode);
    while(openSet.length > 0){
        let leastIndex = 0;
        for(let i=0; i<openSet.length; i++){
            if(openSet[i].f < openSet[leastIndex].f){
                leastIndex = i;
            }
        }
    
    
        let currentNode = openSet[leastIndex];
        visitedNodes.push(currentNode);
        if(currentNode === endNode){
            let temp = currentNode;
            path.push(temp);
                temp = temp.parent;
                path.push(temp);
            }
            console.log(path);
            return {path,visitedNodes};
        }

        openSet = openSet.filter(node => node !== currentNode);
        closedSet.push(currentNode);

        let neighbors = currentNode.neighbors;
        for(let i=0; i<neighbors.length; i++){
            let currentNeighborNode = neighbors[i];
            if(!closedSet.includes(currentNeighborNode)){
                let newG = currentNode.g+1;
                let newNeighborAccepted = false;
                if(currentNeighborNode.isObstacle)  continue;
                if(openSet.includes(currentNeighborNode)){
                    if(newG < currentNeighborNode.g){
                        currentNeighborNode.g = newG;
                        newNeighborAccepted = true;
                    }
                }else{  
                    currentNeighborNode.g = newG;
                    newNeighborAccepted = true;
                    openSet.push(currentNeighborNode);
                } 

                if(newNeighborAccepted){
                    currentNeighborNode.h = heuristic(currentNeighborNode, endNode);
                    currentNeighborNode.f = currentNeighborNode.g + currentNeighborNode.h
                    currentNeighborNode.parent = currentNode;
                }

            }
        }
    }
    
    return {path, visitedNodes, error : "No Path Found"};

}

function heuristic(a, b){
    let d = Math.abs(a.x-b.x)+Math.abs(a.y-b.y);
    return d;
}

export default aStar;