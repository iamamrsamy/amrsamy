/* =========================================
   QR CODE
========================================= */

const qrCanvas =
    document.getElementById("qrcode");


const pageURL =
    window.location.href;


QRCode.toCanvas(

    qrCanvas,

    pageURL,

    {

        width: 205,

        margin: 1,

        errorCorrectionLevel: "H",

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



/* =========================================
   SAVE CONTACT
========================================= */

function saveContact() {


    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Amr Samy
N:Samy;Amr;;;
TITLE:The Magician
TEL;TYPE=CELL:+201115552621
EMAIL:amrsamydxb@gmail.com
URL:${pageURL}
NOTE:Magician - Entertainer - Illusionist
ADR;TYPE=WORK:;;Dubai;;;United Arab Emirates
END:VCARD`;


    const blob =
        new Blob(

            [vcard],

            {
                type:
                    "text/vcard;charset=utf-8"
            }

        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "Amr-Samy.vcf";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    URL.revokeObjectURL(url);


    showToast();

}



/* =========================================
   TOAST
========================================= */

function showToast() {


    const toast =
        document.getElementById("toast");


    toast.classList.add("show");


    setTimeout(

        function() {

            toast.classList.remove("show");

        },

        2200

    );

}
