// Per ogni oggetto restituito bisognerà aggiungere una nuova chiave denominata “active” che
// può essere valorizzata con true o false. Genera questo valore in maniera generica. Decidi tu
// come.
//   Per ogni card “contatto” bisognerà sempre mostrare le informazioni
// anagrafiche (name e email obbligatorie, il resto delle informazioni a scelta tua).

// Vorrei che aggiungessi due nuovi campi per ogni oggetto utente: data di nascita e data di conseguimento della patente di guida

// Le date dovranno essere generate in maniera random/casuale ma dovranno essere comprese:
// - tra il 1° gennaio 1952 e il 31 dicembre 2003 per quanto riguarda la data di nascita
// - tra il 1° gennaio 1971 e la data di oggi (o meglio la data del giorno in cui viene aperta la web app) per quanto riguarda la data di conseguimento della patente.
// L’idea è quella di stampare 3 blocchi di utenti:
// 1. il primo blocco di coloro che hanno conseguito la patente da meno di 10 anni
// 2. il secondo blocco formato da coloro che hanno conseguito la patente da meno di 20 anni ma più di 10 anni (da 10 anni e un giorno in poi quindi)
// 3. il resto che sarà definito dal titolo “Patentati da più di 20 anni”.
// Potrebbe capitare che una lista delle 3 o anche 2 siano vuote (casualità) in quel caso mostra un messaggio “Nessun utente trovato che soddisfi i requisiti”.

// [EXTRA] Infine al click su ogni utente in pagina vorremmo mostrare una modal con i dati dell’utente e in più la sua età (non quindi la sua data di nascita, quella non la mostrare ;) ).

let getRandomDate = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const randomDate = new Date(
    Math.floor(Math.random() * (max - min + 1) + min)
  );
  return randomDate;
};

const DATABASE = "https://jsonplaceholder.typicode.com/users";

// parametro birthday
const startBirthday = new Date(1952, 0, 01).getTime();
const endBirthday = new Date(2003, 11, 31).getTime();

// parametro driver licens iss
const startDrive = new Date(1971, 0, 01).getTime();
const endDrive = new Date().getTime();

const lessTenHTMLEl = document.getElementsByClassName("x_less_10");
const _10 = [];
const betwnTenAndTwentyHTMLEl =
  document.getElementsByClassName("more_10_x_less_20");
const _10_20 = [];
const moreTwentyHTMLEl = document.getElementsByClassName("x_more_20");
const _20 = [];

const tenYears = 1000 * 60 * 60 * 24 * 365 * 10;
const twentyYears = 1000 * 60 * 60 * 24 * 365 * 20;
const toDayMS = new Date().getTime();

// active /not active
const activeUsers = [];
const activeWrapperHTMLEl = document.getElementsByClassName("active_true");
const notActiveUsers = [];
const notActiveWrapperHTMLEl = document.getElementsByClassName("active_false");

const newParamethers = fetch(DATABASE)
  .then((res) => (json = res.json()))

  .then((data) => {
    // attribuire active e push in relativo array
    data.map((user) => {
      if (user.username.length <= 8) {
        user["active"] = "true";
        activeUsers.push(user);
      } else {
        user["active"] = "false";
        notActiveUsers.push(user);
      }
      // attribuire birthday
      user["birthday"] = getRandomDate(startBirthday, endBirthday);

      // attribuire driver license
      user["driverLicenseIss"] = getRandomDate(startDrive, endDrive);

      // push di driver license nei 3 array
      if (
        toDayMS - tenYears < user.driverLicenseIss.getTime() &&
        user.driverLicenseIss.getTime() <= toDayMS
      ) {
        _10.push(user);
      } else if (
        toDayMS - twentyYears < user.driverLicenseIss.getTime() &&
        user.driverLicenseIss.getTime() <= toDayMS - tenYears
      ) {
        _10_20.push(user);
      } else {
        _20.push(user);
      }
    });
    // stampare le card active true e false
    activeUsers.map((user) => {
      const activeUsersWrapper = document.createElement("div");
      activeUsersWrapper.classList.add("active_user_card");

      activeWrapperHTMLEl[0].append(activeUsersWrapper);
      activeUsersWrapper.innerHTML = `<h4>${user.name}</h4><ul><li>E-mal: ${user.email}</li><li>City: ${user.address.city}</li><li>Phone: ${user.phone}</li></ul>`;
    });

    notActiveUsers.map((user) => {
      const notActiveUsersWrapper = document.createElement("div");
      notActiveUsersWrapper.classList.add("not_active_user_card");

      notActiveWrapperHTMLEl[0].append(notActiveUsersWrapper);
      notActiveUsersWrapper.innerHTML = `<h4>${user.name}</h4><ul><li>E-mal: ${user.email}</li><li>City: ${user.address.city}</li><li>Phone: ${user.phone}</li></ul>`;
    });

    // stampare le card di driver license
    // stampa meno di 10 anni
    if (_10.length > 0) {
      _10.map((user) => {
        const _10Wrapper = document.createElement("div");
        _10Wrapper.classList.add("driver_less_ten_card");
        lessTenHTMLEl[0].append(_10Wrapper);
        _10Wrapper.innerHTML = `<h4>${
          user.name
        }</h4><ul><li>Driver license: ${user.driverLicenseIss.toDateString()}</li><li>City: ${
          user.address.city
        }</li><li>Phone: ${user.phone}</li></ul>`;
      });
    } else {
      const _10Wrapper = document.createElement("div");
      _10Wrapper.classList.add("driver_less_ten_alert");
      lessTenHTMLEl[0].append(_10Wrapper);
      _10Wrapper.innerHTML = `<h5>Nessun utente trovato che soddisfi i requisiti</h5>`;
    }
    // stampa più di 10 ma meno di 20 anni
    if (_10_20.length > 0) {
      _10_20.map((user) => {
        const _10_20Wrapper = document.createElement("div");
        _10_20Wrapper.classList.add("driver_less_twenty_card");
        betwnTenAndTwentyHTMLEl[0].append(_10_20Wrapper);
        _10_20Wrapper.innerHTML = `<h4>${
          user.name
        }</h4><ul><li>Driver license: ${user.driverLicenseIss.toDateString()}</li><li>City: ${
          user.address.city
        }</li><li>Phone: ${user.phone}</li></ul>`;
      });
    } else {
      const _10_20Wrapper = document.createElement("div");
      _10_20Wrapper.classList.add("driver_less_twenty_alert");
      betwnTenAndTwentyHTMLEl[0].append(_10_20Wrapper);
      _10_20Wrapper.innerHTML = `<h5>Nessun utente trovato che soddisfi i requisiti</h5>`;
    }
    //  stampa + 20 anni
    if (_20.length > 0) {
      _20.map((user) => {
        const _20Wrapper = document.createElement("div");
        _20Wrapper.classList.add("driver_more_twenty_card");
        moreTwentyHTMLEl[0].append(_20Wrapper);
        _20Wrapper.innerHTML = `<h4>${
          user.name
        }</h4><ul><li>Driver license: ${user.driverLicenseIss.toDateString()}</li><li>City: ${
          user.address.city
        }</li><li>Phone: ${user.phone}</li></ul>`;
      });
    } else {
      const _20Wrapper = document.createElement("div");
      _20Wrapper.classList.add("driver_more_twenty_alert");
      moreTwentyHTMLEl[0].append(_20Wrapper);
      _20Wrapper.innerHTML = `<h5>Nessun utente trovato che soddisfi i requisiti</h5>`;
    }
  });
