import React from 'react';
import { connect } from 'react-redux';

import { TState } from '@store/reducer';

type TStatisticsProps = ReturnType<typeof mapStateToProps>

const Statistics: React.FC<TStatisticsProps> = (props: TStatisticsProps) => (
  <div className="statistics">
    <div className="statistics__item">
      <p className="statistics__item-title">Added</p>
      <output>{props.added}</output>
    </div>
    <div className="statistics__item">
      <p className="statistics__item-title">Removed</p>
      <output>{props.removed}</output>
    </div>
    <div className="statistics__item">
      <p className="statistics__item-title">In use</p>
      <output>{props.inUse}</output>
    </div>
  </div>
);

const mapStateToProps = (state: TState, ownProps: any) => ({
  added: state.counters.added,
  removed: state.counters.removed,
  inUse: state.counters.inUse
});


export default connect(mapStateToProps, null)(Statistics);
