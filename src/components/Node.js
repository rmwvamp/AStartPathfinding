import React from "react";
import "./Node.css";
const Node = ({ isStartNode, isEndNode, row, col, isObstacle}) => {
    const classes = isStartNode ? "start-node" : isObstacle ? "is-obstacle" : isEndNode ? "end-node" : "";
    return (
        <div className = {`node ${classes}`} id = {`node-${row}-${col}`}>
        </div>
    );
}

export default Node; 