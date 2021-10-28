import { ActionTypes, TAction } from '@store/actions';

const N = 4; // какждый N счетчик без кнопок `+` и `-`, увеличивает значение на 1 каждую сек

export interface ICounter {
  _id: string;
  _value: number;
  _isAuto: boolean;
  _intervalId: ReturnType<typeof setInterval> | undefined;
  readonly id: string;
  readonly value: number;
  readonly isAuto: boolean;
  increment: () => void;
  decrement: () => void;
  stopAutoIncrement: () => void;
}

export type TCountersState = {
  items: ICounter[], // массив счетчиков
  added: number, // кол-во добавленных счетчиков
  removed: number, // кол-во удаленных счетчиков
  inUse: number, // кол-во счетчиков на странице
  total: number // сумма значений всех счетчиков на странице
};

type TCounterConstructorParams = {
  initialValue: number,
  isAuto: boolean
}

interface ICounterConstructor {
  new (params: TCounterConstructorParams): ICounter;
}

function factory(constructor: ICounterConstructor, params: TCounterConstructorParams) {
  return new constructor(params);
}

class Counter implements ICounter {
  _id: string;
  _value: number;
  _isAuto: boolean;
  _intervalId: ReturnType<typeof setInterval> | undefined;

  constructor({initialValue = 0, isAuto = false}: TCounterConstructorParams) {
    this._id = String(Number(new Date()));
    this._value = initialValue;
    this._isAuto = isAuto;
    this._intervalId = undefined;
  }

  get id() {
    return this._id;
  }

  get value() {
    return this._value;
  }

  get isAuto() {
    return this._isAuto;
  }

  increment() {
    this._value++;
  }

  decrement() {
    this._value--;
  }

  stopAutoIncrement() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
    }
  }
}

const initialCountersState: TCountersState = {
  items: [],
  added: 0,
  removed: 0,
  inUse: 0,
  total: 0
};

const reducerCounters = (state: TCountersState = initialCountersState, action: TAction) => {
  switch (action.type) {
    case ActionTypes.ADD_COUNTER: {
      const initialValue = state.total;
      const isAuto = (state.added + 1) % N === 0;
      const newCounter = factory(Counter, { initialValue, isAuto });
      return {...state, items: [...state.items, newCounter]};
    }
    case ActionTypes.REMOVE_COUNTER: {
      const counterId = action.payload;
      const counter = state.items.find(counter => counter._id === counterId);
      counter?.stopAutoIncrement();
      return {...state, items: state.items.filter(counter => counter._id !== counterId)};
    }
    case ActionTypes.INCREASE_COUNTER: {
      const counterId = action.payload;
      const counter = state.items.find(counter => counter._id === counterId);
      counter?.increment();
      return {...state, items: state.items};
    }
    case ActionTypes.DECREASE_COUNTER: {
      const counterId = action.payload;
      const counter = state.items.find(counter => counter._id === counterId);
      counter?.decrement();
      return {...state, items: state.items};
    }
    case ActionTypes.UPDATE_TOTAL_COUNTER: {
      return {...state, total: state.items.reduce((sum, counter) => { return sum + counter.value }, 0)};
    }
    case ActionTypes.INCREASE_STATS_ADDED_COUNTER: {
      return {...state, added: state.added + 1};
    }
    case ActionTypes.INCREASE_STATS_REMOVED_COUNTER: {
      return {...state, removed: state.removed + 1};
    }
    case ActionTypes.UPDATE_STATS_IN_USE_COUNTER: {
      return {...state, inUse: state.items.length};
    }
    case ActionTypes.SAVE_INTERVAL_ID: {
      const {counterId, intervalId} = action.payload;
      const counter = state.items.find(counter => counter._id === counterId);
      if (counter) {
        counter._intervalId = intervalId;
      }
      return {...state, items: state.items};
    }
    default:
      return {...state};
  }
};

export default reducerCounters;
