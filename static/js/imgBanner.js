// Creamos array con las imagenes que se mostraran en el banner
const images = [];
images.push({ ruta: 'banner0.jpg', alt: 'descripcion imagen 1' });
images.push({ ruta: 'banner2.jpeg', alt: 'descripcion imagen 2' });
images.push({ ruta: 'banner3.jpg', alt: 'descripcion imagen 3' });
images.push({ ruta: 'banner4.jpg', alt: 'descripcion imagen 4' });

// Ejecutamos la función pasandole un array de imagenes
showImagesBanner(images);

/**
 * Esta función recibe un array de imagenes
 * @param {*} images 
 */
function showImagesBanner(images) {
    const banner = document.getElementById('banner');
    let show = '';

    for (let i = 0; i < images.length; i++) {
        show += `<img src="../static/img/${images[i].ruta}" alt="${images[i].alt}" />`;
    }

    banner.innerHTML = show;
}