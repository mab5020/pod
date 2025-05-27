import React from "react";

function Card(props){
    return <div className="w-48 overflow-hidden shadow-lg bg-white border border-gray-200 rounded-lg">
        <img className="w-full object-cover" width={100} height={100} src={props.img} alt="Card Image" />
        <div className="">
            <h1 className="ml-2 text-lg font-semibold text-gray-800">{props.title.length > 12 ? `${props.title.slice(0,9)}...`: props.title}</h1>
            <p className="text-gray-600 ml-2">{props.description.length > 19 ? `${props.description.slice(0,16)}...`: props.description}</p>
            <button className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg m-2 hover:bg-blue-600 transition"><a href={props.link}>Listen...</a></button>
        </div>
    </div>
}

export default Card;