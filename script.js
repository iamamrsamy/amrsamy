/* =========================
   QR CODE
========================= */

const currentURL = window.location.href;


QRCode.toCanvas(

    document.getElementById("qrcode"),

    currentURL,

    {

        width: 220,

        margin: 2,

        color: {

            dark: "#050505",

            light: "#ffffff"

        }

    },

    function(error) {

        if (error) {

            console.error(error);

        }

    }

);



/* =========================
   SAVE CONTACT
========================= */

function saveContact() {

    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Amr Samy
N:Samy;Amr;;;
TITLE:The Magician
TEL;TYPE=CELL:+201115552621
EMAIL:amrsamydxb@gmail.com
URL:${window.location.href}
NOTE:Magician - Entertainer - Illusionist
END:VCARD`;


    const file = new Blob(

        [vcard],

        {
            type: "text/vcard"
        }

    );


    const link =
        document.createElement("a");


    link.href =
        URL.createObjectURL(file);


    link.download =
        "Amr-Samy.vcf";


    document.body.appendChild(link);


    link.click();


    document.body.removeChild(link);


    showMessage();

}



/* =========================
   MESSAGE
========================= */

function showMessage() {

    const message =
        document.getElementById("message");


    message.classList.add("show");


    setTimeout(function() {

        message.classList.remove("show");

    }, 2000);

}