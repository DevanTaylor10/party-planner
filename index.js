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
