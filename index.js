const state = {
  parties: [],
  selectedParty: null,
  loading: false,
  error: null,
};

const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "2501-FTB-ET-WEB-FT";
const BASE = `${API_URL}/${COHORT}`;

async function fetchParties() {
  try {
    state.loading = true;
    render();

    const res = await fetch(`${BASE}/events`);
    const data = await res.json();

    state.parties = data.data;
    state.error = null;
  } catch (err) {
    state.error = err.message;
  } finally {
    state.loading = false;
    render();
  }
}

async function fetchPartyDetails(id) {
  try {
    state.loading = true;
    render();

    const res = await fetch(`${BASE}/events/${id}`);
    const data = await res.json();

    state.selectedParty = data.data;
    state.error = null;
  } catch (err) {
    state.error = err.message;
  } finally {
    state.loading = false;
    render();
  }
}

function PartyList() {
  const ul = document.createElement("ul");
  ul.className = "party-list";

  state.parties.forEach((party) => {
    const li = document.createElement("li");
    li.textContent = party.name;

    // highlight selected party (extension)
    if (state.selectedParty && party.id === state.selectedParty.id) {
      li.classList.add("selected");
    }

    li.addEventListener("click", () => {
      fetchPartyDetails(party.id);
    });

    ul.appendChild(li);
  });

  return ul;
}
