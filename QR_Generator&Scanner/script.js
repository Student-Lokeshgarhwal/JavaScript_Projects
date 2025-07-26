let input = document.getElementById("inputText")
let generateBtn = document.getElementById("generateBtn")
let img = document.getElementById("generateImg")


let flag = true;

generateBtn.addEventListener("click", async () => {
    let inputValue = input.value
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${inputValue}`
    // img.classList.remove("qr-code")
    if (!img.classList.contains("qr-codeActive")) {
        img.classList.add("qr-codeActive")
    }

})

input.addEventListener("click", () => { })

let form = document.querySelector("form");
let fileInp = document.getElementById("chooseFile");
let contentInfo = document.getElementById("contentInfo");
let contentPara = document.getElementById("contentPara");
let QRImg = document.querySelector(".QRImg");
let formContent = document.querySelector(".formData");
let formText = form.querySelector("p")
let scannerInfo = document.querySelector(".scannerInfo")
let closeBtn = document.getElementById("close")
let copyTextBtn = document.getElementById("copyText")

fileInp.addEventListener("change", (e) => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("file", file)
    formText.innerText = "Scanning...";
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: formData
    }).then(res => res.json()).then(result => {
        formText.innerText = "Scanning...";
        formContent.classList.add("formDataHide");
        QRImg.classList.remove("QRImg");
        QRImg.classList.add("QRImgActive");
        QRImg.src = URL.createObjectURL(file)
        contentPara.innerText = result[0].symbol[0].data;
        scannerInfo.classList.remove("scannerInfo");
        if (!scannerInfo.classList.contains("scannerInfoActive")) {
            scannerInfo.classList.add("scannerInfoActive");
        }
        console.log(result)
    })
})

form.addEventListener("click", () => {
    if (contentPara.innerText == "" || contentPara.innerText == "Data Shows Here...") {
        fileInp.click()
    }
});

contentInfo.addEventListener("click", () => { contentPara.classList.remove("copied") })

closeBtn.addEventListener("click", () => {
    formContent.classList.remove("formDataHide");
    QRImg.classList.remove("QRImgActive");
    QRImg.classList.add("QRImg");
    contentPara.classList.remove("copied")
    contentPara.innerText = "Data Shows Here...";
    scannerInfo.classList.remove("scannerInfoActive");
    formText.innerText = "Upload QR Code to Scan Again";

})

copyTextBtn.addEventListener("click", () => {
    if (contentPara.innerText != "Data Shows Here...") {
        scanData = contentPara.innerText
        console.log(scanData)
        let res = navigator.clipboard.writeText(scanData)
        res.then(() => {
            console.log(res)
        }).catch((err) => { console.log(err) })
        contentPara.classList.add("copied")
    }
})