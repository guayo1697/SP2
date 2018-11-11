/*-------- VIDEOS ---------*/

// quita o muestra el loading
const loadingVid = (onoff) => {
    const elementVid = document.getElementById('loaderVid');
    if (onoff) {
        elementVid.classList.remove('d-none');
    } else {
        elementVid.classList.add('d-none');
    }
};


// quita el mensaje de error
const removeAlertVid = () => {
    const elementVid = document.getElementById('errorVid');
    elementVid.classList.add('d-none');
};


// para desplegar un mensaje de error
const displayAlertVid = (msg) => {
    const elementVid = document.getElementById('errorVid');
    elementVid.innerHTML = msg;
    elementVid.classList.remove('d-none');
};


// quita el mensaje de success
const removeSuccessVid = () => {
    const elementVid = document.getElementById('successVid');
    elementVid.classList.add('d-none');
};


// para desplegar un mensaje de success
const displaySuccessVid = (msg) => {
    const elementVid = document.getElementById('successVid');
    elementVid.innerHTML = msg;
    elementVid.classList.remove('d-none');
};


// trata de obtener el nombre del input de IMAGENES
const getNameVid = () => {
    const elementVid = document.getElementById('nameVid');
    return elementVid.value;
};

// trata de obtener el url del archivo
const getUrlVid = () => {
    const elementVid = document.getElementById('urlVid');
    return elementVid.textContent;
};

// trata de obtener el archivo del input IMAGENES
const getFileVid = () => {
    const elementVid = document.getElementById('fileTargetVid');
    if (elementVid.files && elementVid.files.length !== 0) {
        const file = elementVid.files[0];
        // por lo general solo funciona con imagenes jpeg las png dan clavos
        // pero si quieren intentar pueden poner
        // file.type.match('image/jpeg') || file.type.match('image/png')
        if (file.type.match('image/jpeg')) {
            return file;
        }
    }
};

// crea un json que manda a python por http para que python lo mande a vuforia VIDEOS
const sendRequestVid = (name, file, url) => {
    loadingImg(true);
    const URL = url;
    // esto va a leer el archivo y pasarlo a base64
    // asi no lo tiene que hacer python
    const reader = new FileReader();
    // cuando termine de cargar el archivo...
    reader.onloadend = () => {
        // aqui ya esta en base64
        let image = reader.result;
        // pero hay que quitarle este prefix data:image/jpeg;base64, que no es necesario
        image = image.substring(23, image.length);
        // vamos a obtener el width de la imagen tambien para que tampoco lo tenga que hacer python
        const img = new Image();
        img.onload = () => {
            const width = img.width;
            // este sera el url de su servidor de python donde van a subir el target
            const url = 'http://localhost:5000/add/';
            // ahora si hacemos el request con toda la info
            axios.post(url, {image: image, name: name, width: width, application_metadata: URL})
                .then((response) => {
                    loadingVid(false);
                    const status = response.data.status;
                    if (status.startsWith('OK')) {
                        displaySuccessVid(status);
                    } else {
                        displayAlertVid(status);
                    }
                })
                .catch((error) => {
                    loadingVid(false);
                    displayAlertVid(error);
                });
        };
        // aqui decimos que lea el width
        img.src = reader.result;
    };
    // decimos que el reader lea el archivo para que ejecute lo de arriba
    reader.readAsDataURL(file);
};

// manda el request a Python de seccion de Imagenes
const addTargetVid = () => {
    // ocultamos los mensajes de error o success
    loadingVid(false);
    removeAlertVid();
    removeSuccessVid();
    // obtiene el nombre y el archivo
    const name = getNameVid();
    const file = getFileVid();
    const url  = getUrlVid();
    // validacion de errores
    if (name && file && url) {
        // aqui es donde ya se envia el request a Python
        sendRequestVid(name, file, url);
    } else if (!name && !file) {
        displayAlertVid('Por favor ingrese un nombre y una imagen jpg para el Target');
    } else if (!name) {
        displayAlertVid('Por favor ingrese un nombre para el Target');
    } else if (!file) {
        displayAlertVid('Por favor ingrese una imagen jpg para el Target');
    } else if (!url)  {
        displayAlertVid('Por favor ingrese una imagen a ser desplegada');
    }
};

/*-------- IMAGENES ---------*/

// quita o muestra el loading
const loadingImg = (onoff) => {
  const elementImg = document.getElementById('loaderImg');
  if (onoff) {
    elementImg.classList.remove('d-none');
  } else {
    elementImg.classList.add('d-none');
  }
};


// quita el mensaje de error
const removeAlertImg = () => {
  const elementImg = document.getElementById('errorImg');
  elementImg.classList.add('d-none');
};


// para desplegar un mensaje de error
const displayAlertImg = (msg) => {
  const elementImg = document.getElementById('errorImg');
  elementImg.innerHTML = msg;
  elementImg.classList.remove('d-none');
};


// quita el mensaje de success
const removeSuccessImg = () => {
  const elementImg = document.getElementById('successImg');
  elementImg.classList.add('d-none');
};


// para desplegar un mensaje de success
const displaySuccessImg = (msg) => {
  const elementImg = document.getElementById('successImg');
  elementImg.innerHTML = msg;
  elementImg.classList.remove('d-none');
};


// trata de obtener el nombre del input de IMAGENES
const getNameImg = () => {
  const elementImg = document.getElementById('nameImg');
  return elementImg.value;
};

// trata de obtener el url del archivo
const getUrlImg = () => {
    const elementImg = document.getElementById('urlImg');
    return elementImg.textContent;
};

// trata de obtener el archivo del input IMAGENES
const getFileImg = () => {
    const elementImg = document.getElementById('fileTargetImg');
    if (elementImg.files && elementImg.files.length !== 0) {
        const file = elementImg.files[0];
        // por lo general solo funciona con imagenes jpeg las png dan clavos
        // pero si quieren intentar pueden poner
        // file.type.match('image/jpeg') || file.type.match('image/png')
        if (file.type.match('image/jpeg')) {
            return file;
        }
    }
};

// crea un json que manda a python por http para que python lo mande a vuforia VIDEOS
const sendRequestImg = (name, file, url) => {
    loadingImg(true);
    const URL = url;
    // esto va a leer el archivo y pasarlo a base64
    // asi no lo tiene que hacer python
    const reader = new FileReader();
    // cuando termine de cargar el archivo...
    reader.onloadend = () => {
        // aqui ya esta en base64
        let image = reader.result;
        // pero hay que quitarle este prefix data:image/jpeg;base64, que no es necesario
        image = image.substring(23, image.length);
        // vamos a obtener el width de la imagen tambien para que tampoco lo tenga que hacer python
        const img = new Image();
        img.onload = () => {
            const width = img.width;
            // este sera el url de su servidor de python donde van a subir el target
            const url = 'http://localhost:5000/add/';
            // ahora si hacemos el request con toda la info
            axios.post(url, {image: image, name: name, width: width, application_metadata: URL})
                .then((response) => {
                    loadingImg(false);
                    const status = response.data.status;
                    if (status.startsWith('OK')) {
                        displaySuccessImg(status);
                    } else {
                        displayAlertImg(status);
                    }
                })
                .catch((error) => {
                    loadingImg(false);
                    displayAlertImg(error);
                });
        };
        // aqui decimos que lea el width
        img.src = reader.result;
    };
    // decimos que el reader lea el archivo para que ejecute lo de arriba
    reader.readAsDataURL(file);
};

// manda el request a Python de seccion de Imagenes
const addTargetImg = () => {
    // ocultamos los mensajes de error o success
    loadingImg(false);
    removeAlertImg();
    removeSuccessImg();
    // obtiene el nombre y el archivo
    const name = getNameImg();
    const file = getFileImg();
    const url  = getUrlImg();
    // validacion de errores
    if (name && file && url) {
        // aqui es donde ya se envia el request a Python
        sendRequestImg(name, file, url);
    } else if (!name && !file) {
        displayAlertImg('Por favor ingrese un nombre y una imagen jpg para el Target');
    } else if (!name) {
        displayAlertImg('Por favor ingrese un nombre para el Target');
    } else if (!file) {
        displayAlertImg('Por favor ingrese una imagen jpg para el Target');
    } else if (!url)  {
        displayAlertImg('Por favor ingrese una imagen a ser desplegada');
    }
};

/*------- TEXTO ----------*/
// quita o muestra el loading
const loadingTxt = (onoff) => {
    const elementTxt = document.getElementById('loaderTxt');
    if (onoff) {
        elementTxt.classList.remove('d-none');
    } else {
        elementTxt.classList.add('d-none');
    }
};


// quita el mensaje de error
const removeAlertTxt = () => {
    const elementTxt = document.getElementById('errorTxt');
    elementTxt.classList.add('d-none');
};


// para desplegar un mensaje de error
const displayAlertTxt = (msg) => {
    const elementTxt = document.getElementById('errorTxt');
    elementTxt.innerHTML = msg;
    elementTxt.classList.remove('d-none');
};


// quita el mensaje de success
const removeSuccessTxt = () => {
    const elementTxt = document.getElementById('successTxt');
    elementTxt.classList.add('d-none');
};


// para desplegar un mensaje de success
const displaySuccess = (msg) => {
    const elementTxt = document.getElementById('successTxt');
    elementTxt.innerHTML = msg;
    elementTxt.classList.remove('d-none');
};

// trata de obtener el nombre del input de TEXTO
const getNameTxt = () => {
    const elementTxt = document.getElementById('nameTxt');
    return elementTxt.value;
};

// trata de obtener el texto
const getText = () => {
    const elementTxt = document.getElementById('text');
    return elementTxt.textContent;
};


// trata de obtener el archivo del input TEXTO
const getFileTxt = () => {
    const elementTxt = document.getElementById('fileTargetTxt');
    if (elementTxt.files && elementTxt.files.length !== 0) {
        const file = elementTxt.files[0];
        // por lo general solo funciona con imagenes jpeg las png dan clavos
        // pero si quieren intentar pueden poner
        // file.type.match('image/jpeg') || file.type.match('image/png')
        if (file.type.match('image/jpeg')) {
            return file;
        }
    }
};


// crea un json que manda a python por http para que python lo mande a vuforia VIDEOS
const sendRequestText = (name, file, text) => {
    loadingTxt(true);
    const URL = text;
    // esto va a leer el archivo y pasarlo a base64
    // asi no lo tiene que hacer python
    const reader = new FileReader();
    // cuando termine de cargar el archivo...
    reader.onloadend = () => {
        // aqui ya esta en base64
        let image = reader.result;
        // pero hay que quitarle este prefix data:image/jpeg;base64, que no es necesario
        image = image.substring(23, image.length);
        // vamos a obtener el width de la imagen tambien para que tampoco lo tenga que hacer python
        const img = new Image();
        img.onload = () => {
            const width = img.width;
            // este sera el url de su servidor de python donde van a subir el target
            const url = 'http://localhost:5001/add/';
            // ahora si hacemos el request con toda la info
            axios.post(url, {image: image, name: name, width: width, application_metadata: URL})
                .then((response) => {
                    loadingTxt(false);
                    const status = response.data.status;
                    if (status.startsWith('OK')) {
                        displaySuccess(status);
                    } else {
                        displayAlertTxt(status);
                    }
                })
                .catch((error) => {
                    loadingTxt(false);
                    displayAlertTxt(error);
                });
        };
        // aqui decimos que lea el width
        img.src = reader.result;
    };
    // decimos que el reader lea el archivo para que ejecute lo de arriba
    reader.readAsDataURL(file);
};

// manda el request a Python
const addTargetTxt = () => {
    // ocultamos los mensajes de error o success
    loadingTxt(false);
    removeAlertTxt();
    removeSuccessTxt();
    // obtiene el nombre y el archivo
    const name = getNameTxt();
    const file = getFileTxt();
    const txt  = getText();
    // validacion de errores
    if (name && file && txt) {
        // aqui es donde ya se envia el request a Python
        sendRequestText(name, file, txt);
        name.value = "";
        txt.setContent = "";
    } else if (!name && !file) {
        displayAlertTxt('Por favor ingrese un nombre y una imagen jpg para el Target');
    } else if (!name) {
        displayAlertTxt('Por favor ingrese un nombre para el Target');
    } else if (!file) {
        displayAlertTxt('Por favor ingrese una imagen jpg para el Target');
    } else if (!txt)  {
        displayAlertTxt('Por favor ingrese una imagen a ser desplegada');
    }
};