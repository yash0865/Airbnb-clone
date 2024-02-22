export default function Perks({ selected, onChange }) {
    function handleCbClick(ev) {
        const { checked, name } = ev.target;
        if (checked) {
            onChange([...selected, name]);
        } else {
            onChange([...selected.filter(selectedName => selectedName !== name)]);
        }
    }


    // <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
    //             <input type="checkbox" checked={selected.includes('entrance')} name="entrance" onChange={handleCbClick} />
    //             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
    //                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    //             </svg>
    //             <span>Private entrance</span>
    //         </label>
    return (
        <>
            <label className="flex gap-3 items-center justify-start border-2 shadow-lg w-full px-6 py-2 rounded-2xl">
                <input className="w-8" type="checkbox" name="parking" checked={selected.includes('parking')} onChange={handleCbClick} />
                <i class="fa-solid fa-square-parking "></i>
                <span>Parking</span>
            </label>
            <label className="flex gap-3 items-center justify-start border-2 shadow-lg w-full px-6 py-2 rounded-2xl">
                <input className="w-8" type="checkbox" name="wifi" checked={selected.includes('wifi')} onChange={handleCbClick} />
                <i class="fa-solid fa-wifi"></i>
                <span>Wifi</span>
            </label>
            <label className="flex gap-3 items-center justify-start border-2 shadow-lg w-full px-6 py-2 rounded-2xl">
                <input className="w-8" type="checkbox" name="kitchen" checked={selected.includes('kitchen')} onChange={handleCbClick} />
                <i class="fa-solid fa-kitchen-set"></i>
                <span>Kitchen</span>
            </label>
            <label className="flex gap-3 items-center justify-start border-2 shadow-lg w-full px-6 py-2 rounded-2xl">
                <input className="w-8" type="checkbox" name="ac" checked={selected.includes('ac')} onChange={handleCbClick} />
                <i class="fa-solid fa-fan"></i>
                <span>Air conditioner</span>
            </label>
            <label className="flex gap-3 items-center justify-start border-2 shadow-lg w-full px-6 py-2 rounded-2xl">
                <input className="w-8" type="checkbox" name="tv" checked={selected.includes('tv')} onChange={handleCbClick} />
                <i class="fa-solid fa-tv"></i>
                <span>TV</span>
            </label>
            <label className="flex gap-3 items-center justify-start border-2 shadow-lg w-full px-6 py-2 rounded-2xl">
                <input className="w-8" type="checkbox" name="hottub" checked={selected.includes('hottub')} onChange={handleCbClick} />
                <i class="fa-solid fa-hot-tub-person"></i>
                <span>Hot tub</span>
            </label>
            <label className="flex gap-3 items-center justify-start border-2 shadow-lg w-full px-6 py-2 rounded-2xl">
                <input className="w-8" type="checkbox" name="camera" checked={selected.includes('camera')} onChange={handleCbClick} />
                <i class="fa-solid fa-video"></i>
                <span>Security cameras</span>
            </label>
            <label className="flex gap-3 items-center justify-start border-2 shadow-lg w-full px-6 py-2 rounded-2xl">
                <input className="w-8" type="checkbox" name="pets" checked={selected.includes('pets')} onChange={handleCbClick} />
                <i class="fa-solid fa-shield-dog"></i>
                <span>Pets allowed</span>
            </label>
            <label className="flex gap-3 items-center justify-start border-2 shadow-lg w-full px-6 py-2 rounded-2xl">
                <input className="w-8" type="checkbox" name="pool" checked={selected.includes('pool')} onChange={handleCbClick} />
                <i class="fa-solid fa-person-swimming"></i>
                <span>Swimming pool</span>
            </label>
            <label className="flex gap-3 items-center justify-start border-2 shadow-lg w-full px-6 py-2 rounded-2xl">
                <input className="w-8" type="checkbox" name="spa" checked={selected.includes('spa')} onChange={handleCbClick} />
                <i class="fa-solid fa-spa"></i>
                <span>Spa services</span>
            </label>
            <label className="flex gap-3 items-center justify-start border-2 shadow-lg w-full px-6 py-2 rounded-2xl">
                <input className="w-8" type="checkbox" name="medical" checked={selected.includes('medical')} onChange={handleCbClick} />
                <i class="fa-solid fa-kit-medical"></i>
                <span>Medical kit</span>
            </label>
            <label className="flex gap-3 items-center justify-start border-2 shadow-lg w-full px-6 py-2 rounded-2xl">
                <input className="w-8" type="checkbox" name="alarm" checked={selected.includes('alarm')} onChange={handleCbClick} />
                <i class="fa-regular fa-bell"></i>
                <span>Fire alarm</span>
            </label>
        </>
    );
}