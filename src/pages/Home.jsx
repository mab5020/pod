import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";

function Home() {
    const [data, setData] = useState(null);
    const [input, setInput] = useState("");
    const [token, setToken] = useState(null);
    const clientID = "839b5db9e97a47cfa7eb8a0322d6fb1a";
    const clientSecret = "141ea9c7788340beaa44416991043237";

    const fetchToken = async () => {
        try {
            const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    "Authorization": 'Basic ' + btoa(clientID + ':' + clientSecret)
                }
            })
            console.log(response.data);

            console.log(response.data.access_token);
            setToken(response.data.access_token);

        } catch (error) {
            console.log("error: ", error);
        }
    }
    function handleEnter(e){
        if (e.key === "Enter") {
            searchPod(e);
        }
    }
    const searchPod = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`https://api.spotify.com/v1/search?q=${input}&type=show`,
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                })
            // console.log(response);

            if (!response.data) {
                throw "Cannot get the data";
            }
            setData(response.data.shows.items);

        } catch (error) {
            console.log("Error", error);
        }
    }


    useEffect(() => {
        fetchToken();
    }, [])

    return <div className="home-container flex flex-col items-center">
        <div className="w-3/5 flex flex-col justify-center items-center mt-[10%]">
            <h1 className="text-[40px] font-semibold"><span className="text-green-600">Pod</span><span>Fans</span></h1>
            <div className="w-3/5 flex flex-inline rounded-full border-2 border-green-600">
                <input onKeyUp={(e)=>handleEnter(e)} className="px-2 py-2 w-full outline-none" onChange={(e) => setInput(e.target.value)} value={input} placeholder="What's on your mind?" type="text" /><button className="px-2 py-2 cursor-pointer" onClick={(e) => searchPod(e)}><i className="fa fa-search" aria-hidden="true"></i></button>
            </div>
        </div>
        {
            data && <div className="w-4/5 mb-2">
                <h2 className="text-[30px] font-semibold text-gray-600">Recommendations...</h2>
                <div className="flex flex-row overflow-auto">
                    {
                        data.map((item, index)=>{
                            return <div key={index} className="m-2">
                                <Card key={index} img={item.images[0].url} title={item.name} description={item.publisher} link={item.external_urls.spotify} />
                            </div>
                        })
                    }
                </div>

            </div>
        }
    </div>
}

export default Home;