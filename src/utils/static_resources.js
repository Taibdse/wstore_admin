export const getStaticImage = (imageName) => {
    if(process.env.NODE_ENV === 'development') return 'http://localhost:5001/resources/images/' + imageName;
    return '/resources/images/' + imageName;
}