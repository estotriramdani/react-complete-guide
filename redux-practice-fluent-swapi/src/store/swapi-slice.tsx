import { createSlice } from '@reduxjs/toolkit';
import { ISwapiPeople, ISwapiPeopleResult } from '../interfaces';

const swapiPeopleResultResponse: ISwapiPeopleResult = {
  name: '',
  height: '',
  mass: '',
  hair_color: '',
  skin_color: '',
  eye_color: '',
  birth_year: '',
  gender: '',
  homeworld: '',
  films: [''],
  species: [],
  vehicles: [''],
  starships: [''],
  created: '',
  edited: '',
  url: '',
};

const swapiPeopleResponse = {
  count: 0,
  next: '',
  previous: '',
  results: [swapiPeopleResultResponse],
} as ISwapiPeople;

const swapiSlice = createSlice({
  name: 'swapi',
  initialState: swapiPeopleResponse,
  reducers: {
    setSwapiPeople: (state, action) => {
      state.results = action.payload.results;
      state.count = action.payload.count;
      state.next = action.payload.next;
      state.previous = action.payload.previous;
    },
  },
});

export const swapiActions = swapiSlice.actions;

export default swapiSlice;
