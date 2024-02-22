import { useEffect, useState } from "react";
import Perks from "../Perks";
import axios from "axios";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [price, setPrice] = useState(100);
    const [imagesLink, setImagesLink] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get("/places/" + id).then(response => {
                const { data } = response;
                setTitle(data.title);
                setAddress(data.address);
                setDescription(data.description);
                setPerks(data.perks);
                setImagesLink(data.photos);
                setCheckIn(data.checkIn);
                setCheckOut(data.checkOut);
                setMaxGuests(data.maxGuests);
                setPrice(data.price);
            })
        }
    }, [id])

    function inputDescription(text) {
        return <p className="text-gray-500 text-sm">{text}</p>;
    }
    function inputHeader(text) {
        return <h2 className="text-2xl mt-4">{text}</h2>;
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function addNewPlace(event) {
        event.preventDefault();
        const placeData = {
            title, address, imagesLink,
            description, perks,
            checkIn, checkOut, maxGuests,
            price,
        };
        if (id) {
            // update existing place
            await axios.put("/places", { id, ...placeData });

        } else {
            //add new place
            await axios.post("/places", placeData);
        }

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={"/account/places"} />;
    }

    return (
        <div>
            <AccountNav />
            <form className="w-[80%] mx-auto py-4" onSubmit={addNewPlace}>
                {preInput(
                    "Title",
                    "Title for your place. should be short and catchy as in advertisement"
                )}
                <input required
                    type="text"
                    value={title}
                    onChange={(ev) => setTitle(ev.target.value)}
                    placeholder="title, for example: My lovely apt"
                />
                {preInput("Address", "Address to this place")}
                <input required
                    type="text"
                    value={address}
                    onChange={(ev) => setAddress(ev.target.value)}
                    placeholder="address"
                />

                {preInput("Photos", "more = better")}

                <PhotosUploader
                    imageLink={imagesLink}
                    setImagesLink={setImagesLink}
                />

                {preInput("Description", "description of the place")}
                <textarea
                    className="desc"
                    value={description}
                    onChange={(ev) => setDescription(ev.target.value)}
                />
                {preInput("Perks", "select all the perks of your place")}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <Perks selected={perks} onChange={setPerks} />
                </div>

                {preInput(
                    "Check in&out times",
                    "add check in and out times, remember to have some time window for cleaning the room between guests"
                )}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input required
                            type="date"
                            value={checkIn}
                            onChange={(ev) => setCheckIn(ev.target.value)}
                            placeholder="14"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input required
                            type="date"
                            value={checkOut}
                            onChange={(ev) => setCheckOut(ev.target.value)}
                            placeholder="11"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input required
                            type="number"
                            min={1}
                            value={maxGuests}
                            onChange={(ev) => setMaxGuests(ev.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                        <input required
                            type="number"
                            value={price}
                            min={100}
                            onChange={(ev) => setPrice(ev.target.value)}
                        />
                    </div>
                </div>
                <button className="primary my-4">{id ? "Update" : "Save"}</button>
            </form>
        </div>
    );
}
