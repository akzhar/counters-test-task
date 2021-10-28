export type TAction = {
  type: string,
  payload?: any
};

export enum ActionTypes {
  ADD_COUNTER = 'add counter',
  REMOVE_COUNTER = 'remove counter',
  INCREASE_COUNTER = 'increase counter',
  DECREASE_COUNTER = 'decrease counter',
  UPDATE_TOTAL_COUNTER = 'update total counter',
  INCREASE_STATS_ADDED_COUNTER = 'increase stats added counter',
  INCREASE_STATS_REMOVED_COUNTER = 'increase stats removed counter',
  UPDATE_STATS_IN_USE_COUNTER = 'update stats in use counter',
  SAVE_INTERVAL_ID = 'save interval id'
}

export const ActionCreator = {
  addCounter: (): TAction => {
    return { type: ActionTypes.ADD_COUNTER }
  },
  removeCounter: (counterId: string): TAction => {
    return { type: ActionTypes.REMOVE_COUNTER, payload: counterId }
  },
  increaseCounter: (counterId: string): TAction => {
    return { type: ActionTypes.INCREASE_COUNTER, payload: counterId }
  },
  decreaseCounter: (counterId: string): TAction => {
    return { type: ActionTypes.DECREASE_COUNTER, payload: counterId }
  },
  updateTotalCounter: (): TAction => {
    return { type: ActionTypes.UPDATE_TOTAL_COUNTER }
  },
  increaseStatsAddedCounter: (): TAction => {
    return { type: ActionTypes.INCREASE_STATS_ADDED_COUNTER }
  },
  increaseStatsRemovedCounter: (): TAction => {
    return { type: ActionTypes.INCREASE_STATS_REMOVED_COUNTER }
  },
  updateStatsInUseCounter: (): TAction => {
    return { type: ActionTypes.UPDATE_STATS_IN_USE_COUNTER }
  },
  saveIntervalId: (counterId: string, intervalId: ReturnType<typeof setInterval>): TAction => {
    return { type: ActionTypes.SAVE_INTERVAL_ID, payload: {counterId, intervalId} }
  }
};
