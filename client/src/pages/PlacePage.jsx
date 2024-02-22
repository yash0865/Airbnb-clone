import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import GetPerksIcon from "../GetPerksIcon";

export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data);
        });
    }, [id]);

    if (!place) return '';



    return (
        <div className="mt-4 bg-gray-100  px-8 pt-8 w-[90%] mx-auto">
            <h1 className="text-3xl">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
            <PlaceGallery place={place} />
            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    Check-in: {place.checkIn}<br />
                    Check-out: {place.checkOut}<br />
                    Max number of guests: {place.maxGuests}

                    <div className="mt-4 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {place.perks.length > 0 && place.perks.map((perk, i) => (
                            <div key={i} className="bg-white px-6 py-2 shadow-md rounded-2xl text-center flex items-center justify-center gap-2">
                                <GetPerksIcon perk={perk} />
                                <p className="text-[16px]">{perk}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <BookingWidget place={place} />
                </div>

            </div>

        </div>
    );
}