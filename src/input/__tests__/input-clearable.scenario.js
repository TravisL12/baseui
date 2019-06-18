/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulInput} from '../index.js';
import {Block} from '../../block/index.js';

export const name = 'input-clearable';

export const component = () => {
  return (
    <Block display="flex">
      <Block flex="1" marginRight="scale100">
        <StatefulInput initialState={{value: 'something'}} clearable />
      </Block>
      <Block flex="1" marginLeft="scale100">
        <StatefulInput initialState={{value: 'something'}} clearable />
      </Block>
    </Block>
  );
};
