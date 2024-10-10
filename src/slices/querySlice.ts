import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { OptionType } from '../loadOptions';
import { PropsValue } from 'chakra-react-select';

type Query = {
  query: PropsValue<OptionType>;
};

const initialState: Query = {
  query: null,
};

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    fetchQuery(state, action: PayloadAction<AxiosResponse<Query>>) {
      //   state.query = action.payload.data.query;
    },
  },
});

export const { fetchQuery } = querySlice.actions;
export default querySlice.reducer;
