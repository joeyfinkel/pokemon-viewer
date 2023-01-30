import { Flex, Heading, FlexProps, HeadingProps } from '@chakra-ui/react';
import React from 'react';

interface Props {
  gap: FlexProps['gap'];
  headingSize: HeadingProps['size'];
  text: string;
  children: React.ReactNode;
}

export type BaseHeadingProps = Pick<Props, 'gap' | 'headingSize'>;

export const DataWithHeading: React.FC<Props> = ({
  children,
  gap,
  headingSize,
  text,
}) => {
  return (
    <Flex direction='column' gap={gap}>
      <Heading size={headingSize}>{text}</Heading>
      {children}
    </Flex>
  );
};
