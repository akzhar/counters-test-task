import React from 'react';
import { connect } from 'react-redux';

import { TState } from '@store/reducer';
import Counter from '@components/Counter';

type TCountersStateProps = ReturnType<typeof mapStateToProps>

const Counters: React.FC<TCountersStateProps> = (props: TCountersStateProps) => {

  const { counters } = props;
  const hasCounters = Boolean(counters.length);

  return hasCounters ?
    <ul className="counters">
      {props.counters.map(counter => (
        <Counter key={counter.id} id={counter.id}/>
      ))
      }
    </ul>
    :
    <p style={{textAlign: 'center'}}>There are no counters yet...</p>
};


const mapStateToProps = (state: TState, ownProps: any) => ({
  counters: state.counters.items
});

export default connect(mapStateToProps, null)(Counters);
