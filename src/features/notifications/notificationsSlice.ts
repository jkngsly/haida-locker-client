
import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "@app/createAppSlice"

export interface NotificationsState {
  dings: Ding[]
}

const initialState: NotificationsState = {
  dings: []
}

interface Ding { 
    icon?: string
    text?: string
    actionText?: string
    actionCallback?: () => {}
    seen: boolean
}

export const notificationsSlice = createAppSlice({
  name: "notifications",
  initialState,
  reducers: create => ({
    ding: create.reducer(
      (state, action: PayloadAction<Ding>) => {
        state.dings.push(action.payload)
      },
    ),
  }),

  selectors: {
    selectDings: notifications => notifications.dings,
  },
})

export const { ding } =
notificationsSlice.actions

export const { selectDings } = notificationsSlice.selectors
