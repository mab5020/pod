import React from "react";

function Card(props){
    return <div className={`w-48 overflow-hidden shadow-lg ${props.theme ? " bg-stone-800 border border-stone-800" :  "bg-white border border-gray-400"} rounded-lg`}>
        <img className="w-full object-cover" width={100} height={100} src={props.img} alt="Card Image" />
        <div className={`${props.theme ? "text-white" : "text-black"}`}>
            <h1 className="ml-2 text-lg font-semibold">{props.title.length > 12 ? `${props.title.slice(0,9)}...`: props.title}</h1>
            <p className="ml-2">{props.description.length > 19 ? `${props.description.slice(0,16)}...`: props.description}</p>
            <button className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded-lg m-2 hover:bg-blue-600 transition"><a href={props.link}>Listen...</a></button>
        </div>
    </div>
}

export default Card;