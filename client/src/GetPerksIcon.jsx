export default function GetPerksIcon({ perk }) {
    let cls = ""; // Use let instead of const
    switch (perk) {
        case "wifi":
            cls = "fa-solid fa-wifi";
            break; // Don't forget to break after each case
        case "parking":
            cls = "fa-solid fa-square-parking";
            break;
        case "kitchen":
            cls = "fa-solid fa-kitchen-set";
            break;
        case "ac":
            cls = "fa-solid fa-fan";
            break;
        case "tv":
            cls = "fa-solid fa-tv";
            break;
        case "hottub":
            cls = "fa-solid fa-hot-tub-person";
            break;
        case "camera":
            cls = "fa-solid fa-video";
            break;
        case "pets":
            cls = "fa-solid fa-shield-dog";
            break;
        case "pool":
            cls = "fa-solid fa-person-swimming";
            break;
        case "spa":
            cls = "fa-solid fa-spa";
            break;
        case "medical":
            cls = "fa-solid fa-kit-medical";
            break;
        case "alarm":
            cls = "fa-regular fa-bell";
            break;

    }
    return (
        <i className={cls}></i>
    );
}
