export async function fetchImages(type, count) {
    const apiUrls = {
        random: `https://picsum.photos/v2/list?limit=${count}`,
        dogs: `https://dog.ceo/api/breeds/image/random/${count}`,
        cats: `https://api.thecatapi.com/v1/images/search?limit=${count}`,
    };

    const url = apiUrls[type];
    const response = await fetch(url);
    const data = await response.json();

    if (type === 'random') {
        return data.map((img) => img.download_url);
    } else if (type === 'dogs' || type === 'cats') {
        return data.map((img) => img.url);
    }

    return [];
}
