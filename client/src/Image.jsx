export default function Image({ src, ...rest }) {
    // src = src && src.includes('https://')
    //     ? src
    //     : 'http://localhost:3000/' + src;
    return (
        <>
            <img className="" {...rest} src={src} alt={''} />
        </>
    );
}