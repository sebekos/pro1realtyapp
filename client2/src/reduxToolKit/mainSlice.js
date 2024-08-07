import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  agents: [],
  agentsLoading: false,
  agentError: null,
};

export const getAgents = createAsyncThunk("main/getAgents", async () => {
  const agents = await axios
    .get("/api/team")
    .then((data) => data?.data || [])
    .catch((err) => {
      console.log(err);
      return [];
    });
  return agents;
});

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setAgentsLoading: (state, action) => {
      state.agentsLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAgents.pending, (state, action) => {
      state.agentsLoading = true;
    });
    builder.addCase(getAgents.fulfilled, (state, action) => {
      state.agents = action.payload;
      state.agentsLoading = false;
    });
    builder.addCase(getAgents.rejected, (state, action) => {
      state.agents = [];
      state.agentsLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setAgentsLoading } = counterSlice.actions;

export default counterSlice.reducer;
