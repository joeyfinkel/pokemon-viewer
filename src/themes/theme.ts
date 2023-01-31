import { extendTheme } from '@chakra-ui/react';
import { tagTheme } from './tag';

export const theme = extendTheme({
  components: { Tag: tagTheme },
});
