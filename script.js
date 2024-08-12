const COHORT = "2407-FTB-ET-WEB-FT";
const apiURL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  parties: [],
};

const partyList = document.querySelector("#party-list");
const addPartyForm = document.querySelector("#addParty");
addPartyForm.addEventListener("submit", addParty);

async function render() {
  await getParties();
  renderParties();
}
render();

async function getParties() {
  try {
    const response = await fetch(apiURL);
    const json = await response.json();
    state.parties = json.data;
  } catch (error) {
    console.log(error);
  }
}

async function addParty(event) {
  event.preventDefault();

  await createParty(
    addPartyForm.name.value,
    addPartyForm.date.value,
    addPartyForm.time.value,
    addPartyForm.location.value,
    addPartyForm.description.value
  );
}

async function createParty(name, date, time, location, description) {
  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        date,
        time,
        location,
        description,
      }),
    });

    if (response.ok) {
      render();
    } else {
      console.error("fail!");
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateParties(id, name, date, time, location, description) {
  try {
    const response = await fetch(`${apiURL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        date,
        time,
        location,
        description,
      }),
    });

    if (!response.ok) {
      console.error("fail!");
    }
  } catch (error) {
    console.log(error);
  }
}
