import React, { ComponentProps, FC } from 'react';
import { styled } from '@storybook/theming';
import { transparentize } from 'polished';
import { typography, color } from './shared/styles';
import { Icon, IconType } from './Icon';
import { TooltipNote } from './tooltip/TooltipNote';
import WithTooltip from './tooltip/WithTooltip';

interface ButtonActionProps {
  icon: IconType;
  children?: string;
  isActive?: boolean;
  tooltip?: string;
}

interface ButtonStylingProps {
  isActive?: boolean;
}

const StyledButton = styled.button<ButtonStylingProps>`
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  gap: 6px;
  align-items: center;
  overflow: hidden;
  padding: 7px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: all 150ms ease-out;
  vertical-align: top;
  white-space: nowrap;
  user-select: none;
  opacity: 1;
  margin: 0;
  background-color: transparent;
  font-size: ${typography.size.s2}px;
  line-height: 14px;
  font-weight: ${typography.weight.regular};
  color: ${color.mediumdark};

  ${(props) =>
    props.isActive &&
    `
      background-color: ${transparentize(0.93, color.secondary)};
      color: ${color.secondary};
    `}

  &:hover {
    color: ${color.secondary};
    background-color: ${transparentize(0.86, color.secondary)};
  }
`;

export const ButtonAction: FC<ButtonActionProps & ComponentProps<typeof InsideButtonAction>> = ({
  children,
  icon,
  isActive = false,
  tooltip,
  ...rest
}) => {
  if (tooltip)
    return (
      <WithTooltip tooltip={<TooltipNote note={tooltip} />} hasChrome={false} tagName="span">
        <InsideButtonAction icon={icon} isActive={isActive} {...rest}>
          {children}
        </InsideButtonAction>
      </WithTooltip>
    );
  return (
    <InsideButtonAction icon={icon} isActive={isActive} {...rest}>
      {children}
    </InsideButtonAction>
  );
};

const InsideButtonAction: FC<ButtonActionProps & ComponentProps<typeof StyledButton>> = ({
  children,
  icon,
  isActive = false,
  tooltip,
  ...rest
}) => (
  <StyledButton isActive={isActive} {...rest}>
    {icon && <Icon icon={icon} />}
    {children}
  </StyledButton>
);
