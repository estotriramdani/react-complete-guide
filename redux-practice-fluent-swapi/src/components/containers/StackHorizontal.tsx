import {
  DefaultEffects,
  DefaultPalette,
  DefaultSpacing,
  Depths,
  Stack,
} from '@fluentui/react';

interface Props {
  children: React.ReactNode;
}

export default function StackHorizontal(props: Props) {
  return (
    <Stack
      horizontal
      styles={{
        root: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: DefaultSpacing.m,
          boxShadow: Depths.depth8,
          borderRadius: DefaultEffects.roundedCorner2,
          padding: DefaultSpacing.m,
          backgroundColor: DefaultPalette.white,
        },
      }}
    >
      {props.children}
    </Stack>
  );
}
