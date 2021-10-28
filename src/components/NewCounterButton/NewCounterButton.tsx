import React from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { TState } from '@store/reducer';
import { ActionCreator } from '@store/actions';

type TNewCounterButtonProps = {
  newCounterButtonHandler: () => void
}

const NewCounterButton: React.FC<TNewCounterButtonProps> = (props: TNewCounterButtonProps) => (
  <div className="button-new-wrapper">
    <button className="button" onClick={props.newCounterButtonHandler}>Add a new counter</button>
  </div>
);

const mapDispatchToProps = (dispatch: ThunkDispatch<TState, void, AnyAction>) => ({
  newCounterButtonHandler: () => {
    dispatch(ActionCreator.addCounter());
    dispatch(ActionCreator.increaseStatsAddedCounter());
    dispatch(ActionCreator.updateStatsInUseCounter());
    dispatch(ActionCreator.updateTotalCounter());
  }
});

export default connect(null, mapDispatchToProps)(NewCounterButton);

