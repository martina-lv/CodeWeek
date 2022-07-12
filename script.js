// Per ogni oggetto restituito bisognerà aggiungere una nuova chiave denominata “active” che
// può essere valorizzata con true o false. Genera questo valore in maniera generica. Decidi tu
// come.
//   Per ogni card “contatto” bisognerà sempre mostrare le informazioni
// anagrafiche (name e email obbligatorie, il resto delle informazioni a scelta tua).

const DATABASE = "https://jsonplaceholder.typicode.com/users";

const activeUsers = [];
const notActiveUsers = [];

const isActive = fetch(DATABASE)
  .then((res) => (json = res.json()))

  .then((data) => {
    data.map((user) => {
      if (user.username.length <= 8) {
        user["active"] = "true";
        activeUsers.push(user);
      } else {
        user["active"] = "false";
        notActiveUsers.push(user);
      }
    });

    activeUsers.map((user) => {
      const activeUsersWrapper = document.createElement("div");
      activeUsersWrapper.classList.add("active_user_card");
      const activeWrapperHTMLEl =
        document.getElementsByClassName("active_true");

      activeWrapperHTMLEl[0].append(activeUsersWrapper);
      activeUsersWrapper.innerHTML = `<h3>${user.name}</h3><ul><li>E-mal: ${user.email}</li><li>City: ${user.address.city}</li><li>Phone: ${user.phone}</li></ul>`;
    });

    notActiveUsers.map((user) => {
      const notActiveUsersWrapper = document.createElement("div");
      notActiveUsersWrapper.classList.add("not_active_user_card");
      const notActiveWrapperHTMLEl =
        document.getElementsByClassName("active_false");

      notActiveWrapperHTMLEl[0].append(notActiveUsersWrapper);
      notActiveUsersWrapper.innerHTML = `<h3>${user.name}</h3><ul><li>E-mal: ${user.email}</li><li>City: ${user.address.city}</li><li>Phone: ${user.phone}</li></ul>`;
    });
  });
