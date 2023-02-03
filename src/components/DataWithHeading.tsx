import {
  Flex,
  FlexProps,
  Heading,
  HeadingProps,
  IconButton,
  IconButtonProps,
} from '@chakra-ui/react';
import React, { forwardRef } from 'react';

interface Props {
  gap: FlexProps['gap'];
  headingSize: HeadingProps['size'];
  text: string;
  children: React.ReactNode;
  icon?: IconButtonProps['as'];
}

export type BaseHeadingProps = Pick<Props, 'gap' | 'headingSize'>;

export const DataWithHeading = forwardRef<HTMLDivElement, Props>(
  ({ children, gap, headingSize, text, icon }, ref) => {
    return (
      <Flex direction='column' gap={gap} ref={ref}>
        {icon ? (
          <Flex justify='space-between' align='center'>
            <Heading size={headingSize}>{text}</Heading>
            <IconButton aria-label='' as={icon} variant='ghost' role='button' />
          </Flex>
        ) : (
          <Heading size={headingSize}>{text}</Heading>
        )}
        {children}
      </Flex>
    );
  }
);