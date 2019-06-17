/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {STATE_CHANGE_TYPE} from './constants.js';
import type {
  StatefulContainerPropsT,
  StateT,
  StateReducerT,
  StateTypeT,
} from './types.js';

const defaultStateReducer: StateReducerT = (type, nextState) => nextState;

class StatefulContainer<T: EventTarget> extends React.Component<
  StatefulContainerPropsT<T>,
  StateT,
> {
  static defaultProps = {
    initialState: {},
    stateReducer: defaultStateReducer,
    onChange: () => {},
    onClear: () => {},
  };

  state: StateT = {
    value: '',
    ...this.props.initialState,
  };

  onChange = (e: SyntheticInputEvent<T>) => {
    this.internalSetState(STATE_CHANGE_TYPE.change, e);
    this.props.onChange(e);
  };

  onClear = (e: SyntheticInputEvent<T>) => {
    this.internalSetState(STATE_CHANGE_TYPE.clear, e);
    this.props.onClear(e);
  };

  internalSetState = <T: EventTarget>(
    type: StateTypeT,
    e: SyntheticInputEvent<T>,
  ) => {
    let nextState = {};
    if (type === STATE_CHANGE_TYPE.change) {
      nextState = {value: e.target.value};
    } else if (type === STATE_CHANGE_TYPE.clear) {
      nextState = {value: ''};
    }
    const newState = this.props.stateReducer(type, nextState, this.state);
    this.setState(newState);
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const {children, initialState, stateReducer, ...restProps} = this.props;
    const {onChange, onClear} = this;
    return children({
      ...restProps,
      ...this.state,
      onChange,
      onClear,
    });
  }
}

export default StatefulContainer;
