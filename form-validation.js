window.onload = function () {
  console.log("DOM ready!");
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("form submitted!");
    const dateNaissance = document.getElementById("dateNaissance").value;
    const dateNaissanceDate = new Date(dateNaissance);
    const dateNaissanceTimestamp = dateNaissanceDate.getTime();
    const prenom = document.getElementById("prenom").value;
    const adresse = document.getElementById("adresse").value;
    const email = document.getElementById("email").value;

    const nowTimestamp = Date.now();

    if (dateNaissanceTimestamp >= nowTimestamp) {
      alert("La date de naissance n'est pas compatible !");
    }

    var myModal = new bootstrap.Modal(document.getElementById("myModal"));
    myModal.show();
    document.querySelector(".modal-body").innerHTML =
      '<img src="https://maps.googleapis.com/maps/api/staticmap?markers=Paris&zoom=14&size=400x300&scale=2&key=VOTRE_CLE_API"/>';

    const modalBody = myModal._element.querySelector(".modal-body");
    modalBody.innerHTML = `<p>Vous êtes ${prenom} ${nom} et vous habitez :</p>
                      <p>${adresse}</p>
                      <img src="https://maps.googleapis.com/maps/api/staticmap?markers=${adresse}&zoom=14&size=400x300&scale=2&key=VOTRE_CLE_API"/>`;
    if (
      nom.length < 5 ||
      prenom.length < 5 ||
      email.length < 5 ||
      adresse.length < 5
    ) {
      alert("Les champs texte doivent avoir au moins 5 caractères.");
      return false;
    }
    return true;
  });
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
