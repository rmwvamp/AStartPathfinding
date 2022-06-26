import React, { useState, useEffect } from "react";
import aStar from "../aStarAlgorithm/aStar";
import Node from "./Node";
import "./PathFind.css";
const rows = 10;
const cols = 20;
const startNodeIdx = [0,0];
const endNodeIdx = [rows - 1, cols - 1];
const PathFind = () => {
  const [Grid, setGrid] = useState([]);
  const [Path, setPath] = useState([]);
  const [VisitedNodes, setVisitedNodes] = useState([]);

  // similar to componentDidMount
  useEffect(() => {
    
    const grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
      grid[i] = new Array(cols);
    }
    // spot constructor
    function Spot(i, j) {
      this.x = i;
      this.y = j;
      this.isStartNode = this.x === startNodeIdx[0] && this.y === startNodeIdx[1];
      this.isEndNode = this.x === endNodeIdx[0] && this.y === endNodeIdx[1];
      this.edgeCost = 0;// actual cost
      this.heuristicCost = 0;// heuristic cost
      this.totalCost = 0;// (heuristic cost +actual cost)
      this.neighbors = [];
      this.parent = undefined;
      this.isObstacle = false;
      if(Math.random(1) < 0.150 && !this.isStartNode && !this.isEndNode){// you can play with the probability to make more obstacles
        this.isObstacle = true;
      }
      this.addNeighbors = function (grid){
        let i = this.x, j = this.y;
        if(i > 0)  this.neighbors.push(grid[i-1][j]);// left neighbor
        if(i < rows-1)  this.neighbors.push(grid[i+1][j])// right neighbor
        if(j > 0)  this.neighbors.push(grid[i][j-1])// upside neighbor
        if(j < cols-1)  this.neighbors.push(grid[i][j+1])// downside neighbor 
      }
    }
    const createSpot = (grid) => {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          grid[i][j] = new Spot(i, j);
        }
      }
    };

    createSpot(grid);
    setGrid(grid);
    makeNeighborForAll(grid);
    const startNode = grid[startNodeIdx[0]][startNodeIdx[1]];
    const endNode = grid[endNodeIdx[0]][endNodeIdx[1]];
    let path = aStar(startNode, endNode);
    setPath(path.path);
    setVisitedNodes(path.visitedNodes);
  }, []);

  const makeNeighborForAll = (grid) => {
    for(let i = 0; i < rows; i++){
      for(let j = 0; j < cols; j++){
        grid[i][j].addNeighbors(grid);
      } 
    }  
  }
  
  
  // grid with node
  const gridWithNode = (
    <div>
      {Grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="grid-row">
            {row.map((col, colIndex) => {
              const { isStartNode, isEndNode, isObstacle} = col;
              return (
                <Node
                  key={colIndex}
                  isStartNode={isStartNode}
                  isEndNode={isEndNode}
                  row = {rowIndex}
                  col = {colIndex}
                  isObstacle = {isObstacle}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );

  const visualizeShortestPath = (shortestPathNodes) => {
    for(let i=0; i<shortestPathNodes.length; i++){
      setTimeout(()=>{
        const node = shortestPathNodes[i];
        console.log(node);
        document.getElementById(`node-${node.x}-${node.y}`).className = "node node-shortest-path";
      }, i*10);
    }
  }
  const visualisePath = () => {
    for(let i=0; i<=VisitedNodes.length; i++){
      if(i === VisitedNodes.length){
        setTimeout(()=>{
          visualizeShortestPath(Path);
        }, i*20);
      }else{
        setTimeout(()=>{
          const node = VisitedNodes[i];
          console.log(node);
          document.getElementById(`node-${node.x}-${node.y}`).className = "node node-visited";
        },20*i);
        
      }
    }
    
  }
  console.log(Path);
  return (
    <div className="Wrapper">
      <button onClick={visualisePath}>Visualise Path</button>
      {gridWithNode}
    </div>
  );
};

export default PathFind;
