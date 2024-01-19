import { createSlice } from "@reduxjs/toolkit";

interface iProps {
  val: string;
  state: boolean;
  id: number;
}

let data = [
  { val: "Nursary School", state: false, id: 1 },
  { val: "Primay School", state: true, id: 2 },
  { val: "Secondary School.", state: false, id: 3 },
  { val: "Tertary School.", state: false, id: 4 },
  { val: "Kindagartin Schhol.", state: false, id: 5 },
];

const initialState = {
  user: "" || null,
  schoolInfo: {} || null,
  categoryData: data,
  categoryPicked: Array<iProps>,
};

const reduxState = createSlice({
  name: "schoolProject",
  initialState,
  reducers: {
    loginState: (state: any, { payload }) => {
      state.user = payload;
    },

    getSchoolInfo: (state: any, { payload }) => {
      state.schoolInfo = payload;
    },

    logoutState: (state) => {
      state.user = null;
    },
    categoryState: (state) => {
      state.categoryData = data;
    },

    pickedCategory: (state, { payload }) => {
      state.categoryPicked = payload;
    },

    changeCategoryState: (state, { payload }) => {
      let findData: any = state.categoryData.find((el: any) => {
        return el.id === payload.id;
      });
      findData.state = !findData.state;
    },
  },
});

export const {
  loginState,
  logoutState,
  pickedCategory,
  categoryState,
  changeCategoryState,
  getSchoolInfo,
} = reduxState.actions;

export default reduxState.reducer;
