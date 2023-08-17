const soru = document.querySelector("#soru");
const gonder = document.querySelector("#gonder");
const sorualani = document.querySelector(".sorualani")
const secenek = document.getElementsByName("secenek")
// LABEL'LAR
const secenekA = document.getElementById("acıklamaA")
const secenekB = document.getElementById("acıklamaB")
const secenekC = document.getElementById("acıklamaC")
const secenekD = document.getElementById("acıklamaD")

// Puanlama yapabilmek için
let puan=0;
let sira=0;

let sunucudandonen;

var baglanti = new XMLHttpRequest();
baglanti.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        sunucudandonen = JSON.parse(baglanti.responseText)
        sorulariGetir()
    }
    return sunucudandonen;
};
baglanti.open("GET", "data.json", true);
baglanti.send();

function sorulariGetir(){
    secimiTemizle()
    let sıradakiSoru = sunucudandonen.sorular[sira]
    soru.innerHTML = sıradakiSoru.soru;
    secenekA.innerText = sıradakiSoru.secenekA;
    secenekB.innerText = sıradakiSoru.secenekB;
    secenekC.innerText = sıradakiSoru.secenekC;
    secenekD.innerText = sıradakiSoru.secenekD;
}
function secimiTemizle(){
    secenek.forEach( s => s.checked = false);
}

function secimiAl(){
    let secim;
    secenek.forEach( s => {
        if(s.checked == true){
            secim = s.id
        }
    })
    return secim;

}

gonder.addEventListener("click", function() {
    const secilen = secimiAl()

    if(secilen){
        if(secilen === sunucudandonen.sorular[sira].dogruCevap){
            puan++;
            console.log(puan)
        }
    }
    sira++

    if(sira < sunucudandonen.sorular.length){
        sorulariGetir()
    }else{
        sorualani.innerHTML = 
        `
        <h2>Mevcut sorulardan ${puan}/${sunucudandonen.sorular.length} oranında başarı sağladınız.</h2>

        <button id="newButon" onclick="location.reload()">Yeniden Başla</button>
        `
        gonder.style.display = "none"
    }
  });