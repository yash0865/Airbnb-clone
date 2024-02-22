import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then((respnose) => {
            let { data } = respnose;
            setPlaces([...data, ...data, ...data]);

        })
    }, [])

    if (places.length === 0) {
        return (
            <div className="mx-auto mt-36 text-2xl">
                No places as of now
            </div>
        )
    }
    return (
        <div className="grid gap-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
            {places.length > 0 && places.map(place => (
                <Link className="" to={'/place/' + place._id}>
                    <div className="bg-gray-500 mb-2 rounded-2xl flex hover:opacity-80">
                        {place.photos?.[0] && (
                            <img className="rounded-2xl object-cover aspect-square" src={place.photos[0]} alt="" />
                        )}
                    </div>
                    <h2 className="truncate font-semibold">{place.title}</h2>
                    <h3 className="text-sm text-gray-500 truncate">{place.address}</h3>
                    <div className="mt-1 ">
                        <span className="font-semibold">₹{place.price.toLocaleString("en-IN") + "/night"}</span>
                    </div>
                </Link>
            ))}
        </div>
    )
}