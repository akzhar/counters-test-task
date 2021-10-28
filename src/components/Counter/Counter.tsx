import React, { useEffect } from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { TState } from '@store/reducer';
import { ActionCreator } from '@store/actions';

const ONE_SECOND = 1000; // ms

type TCounterOwnProps = {
  id: string
}

type TCounterProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & TCounterOwnProps

const Counter: React.FC<TCounterProps> = (props: TCounterProps) => {

  const {
    id,
    value,
    isAuto,
    incrementCounter,
    decrementCounter,
    removeCounter,
    saveIntervalId
  } = props;

  function runAutoIncrement() {
    const intervalId = setInterval(() => {
      incrementCounter(id);
    }, ONE_SECOND);
    saveIntervalId(id, intervalId);
  }

  const incrementBtnHandler = () => incrementCounter(id);

  const decrementBtnHandler = () => decrementCounter(id);

  const removeBtnHandler = () => removeCounter(id);

  useEffect(() => {
    if (isAuto) {
      runAutoIncrement();
    }
  }, [])

  return (
    <li className="counters__item counter">
      <div className="counter__data">
        <b>Value:</b>
        <output>{value}</output>
        <b>Id:</b><span>{id}</span>
      </div>
      <div className="counter__wrapper">
        {
          !isAuto
          &&
          <>
            <button className="button counter__button-increment" onClick={incrementBtnHandler}>+ 1</button>
            <button className="button counter__button-decrement" onClick={decrementBtnHandler}>- 1</button>
          </>
        }
        <button className="button counter__button-remove" onClick={removeBtnHandler}>Remove</button>
      </div>
    </li>
  )
};

const mapStateToProps = (state: TState, ownProps: TCounterOwnProps) => {
  const counter = state.counters.items.find(counter => counter.id === ownProps.id);
  return { isAuto: counter?.isAuto, value: counter?.value };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<TState, void, AnyAction>) => ({
  removeCounter: (counterId: string) => {
    dispatch(ActionCreator.removeCounter(counterId));
    dispatch(ActionCreator.increaseStatsRemovedCounter());
    dispatch(ActionCreator.updateStatsInUseCounter());
    dispatch(ActionCreator.updateTotalCounter());
  },
  incrementCounter: (counterId: string) => {
    dispatch(ActionCreator.increaseCounter(counterId));
    dispatch(ActionCreator.updateTotalCounter());
  },
  decrementCounter: (counterId: string) => {
    dispatch(ActionCreator.decreaseCounter(counterId));
    dispatch(ActionCreator.updateTotalCounter());
  },
  saveIntervalId: (counterId: string, intervalId: ReturnType<typeof setInterval>) => {
    dispatch(ActionCreator.saveIntervalId(counterId, intervalId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
