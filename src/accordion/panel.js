/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {LocaleContext} from '../locale/index.js';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';
import PlusIcon from '../icon/plus.js';
import CheckIndeterminateIcon from '../icon/check-indeterminate.js';
import {
  PanelContainer as StyledPanelContainer,
  Header as StyledHeader,
  Content as StyledContent,
  ToggleIcon as StyledToggleIcon,
} from './styled-components.js';

import type {PanelPropsT, SharedStylePropsArgT} from './types.js';

class Panel extends React.Component<PanelPropsT> {
  static defaultProps = {
    disabled: false,
    expanded: false,
    onChange: () => {},
    onClick: () => {},
    onKeyDown: () => {},
    title: '',
  };

  onClick = (e: Event) => {
    const {disabled, expanded, onChange, onClick} = this.props;
    if (disabled) {
      return;
    }
    typeof onChange === 'function' && onChange({expanded: !expanded});
    typeof onClick === 'function' && onClick(e);
    return;
  };

  onKeyDown = (e: KeyboardEvent) => {
    const {disabled, expanded, onChange, onKeyDown} = this.props;
    if (disabled) {
      return;
    }
    // toggle on Enter or Space button pressed
    if (e.key === 'Enter' || e.which === 32) {
      typeof onChange === 'function' && onChange({expanded: !expanded});
    }
    typeof onKeyDown === 'function' && onKeyDown(e);
    return;
  };

  getSharedProps(): SharedStylePropsArgT {
    const {disabled, expanded} = this.props;
    return {
      $disabled: disabled,
      $expanded: expanded,
    };
  }

  render() {
    const {expanded, disabled, overrides = {}, children, title} = this.props;
    const sharedProps = this.getSharedProps();
    const {
      PanelContainer: PanelContainerOverride,
      Header: HeaderOverride,
      Content: ContentOverride,
      ToggleIcon: ToggleIconOverride,
    } = overrides;

    const [PanelContainer, panelContainerProps] = getOverrides(
      PanelContainerOverride,
      StyledPanelContainer,
    );
    const [Header, headerProps] = getOverrides(HeaderOverride, StyledHeader);
    const [Content, contentProps] = getOverrides(
      ContentOverride,
      StyledContent,
    );
    const [ToggleIcon, toggleIconProps] = getOverrides(
      ToggleIconOverride,
      StyledToggleIcon,
    );

    const toggleIconOverrides = mergeOverrides(
      {Svg: ToggleIcon},
      // $FlowFixMe
      {Svg: ToggleIconOverride},
    );

    const ToggleIconComponent = expanded ? CheckIndeterminateIcon : PlusIcon;
    return (
      <LocaleContext.Consumer>
        {locale => (
          <PanelContainer {...sharedProps} {...panelContainerProps}>
            <Header
              tabIndex={0}
              role="button"
              aria-expanded={expanded}
              aria-disabled={disabled || null}
              {...sharedProps}
              {...headerProps}
              onClick={this.onClick}
              onKeyDown={this.onKeyDown}
            >
              {title}
              <ToggleIconComponent
                size={16}
                title={
                  expanded ? locale.accordion.collapse : locale.accordion.expand
                }
                {...sharedProps}
                {...toggleIconProps}
                // $FlowFixMe
                overrides={toggleIconOverrides}
              />
            </Header>
            <Content {...sharedProps} {...contentProps}>
              {expanded ? children : null}
            </Content>
          </PanelContainer>
        )}
      </LocaleContext.Consumer>
    );
  }
}

export default Panel;
