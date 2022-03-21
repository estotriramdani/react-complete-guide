import {
  DefaultFontStyles,
  DefaultPalette,
  DefaultSpacing,
  getFocusStyle,
  getTheme,
  Icon,
  IStackItemStyles,
  IStackItemTokens,
  IStackStyles,
  IStackTokens,
  ITheme,
  Label,
  List,
  mergeStyleSets,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Shimmer,
  Spinner,
  SpinnerSize,
  Stack,
  StackItem,
  Text,
} from '@fluentui/react';

import { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { BASE_URL_SWAPI } from '../../configs';
import { ISwapiPeople } from '../../interfaces';
import { fetchPeopleData } from '../../store/swapi-actions';
import { IUIState, uiActions } from '../../store/ui-slice';

const stackTokens: IStackTokens = {
  childrenGap: DefaultSpacing.m,
  padding: DefaultSpacing.m,
};

const stackStyles: IStackStyles = {
  root: {
    margin: 'auto',
    maxWidth: 600,
  },
};

const stackItemButtonGroupTokens: IStackItemTokens = {};

const stackItemButtonGroupStyles: IStackItemStyles = {
  root: {
    display: 'flex',
    gap: DefaultSpacing.m,
  },
};
const theme: ITheme = getTheme();
const { palette, semanticColors, fonts } = theme;
const classNames = mergeStyleSets({
  itemCell: [
    getFocusStyle(theme, { inset: -1 }),
    {
      minHeight: 54,
      padding: 10,
      boxSizing: 'border-box',
      borderBottom: `1px solid ${semanticColors.bodyBackground}`,
      display: 'flex',
      selectors: {
        '&:hover': { background: DefaultPalette.neutralLight },
      },
    },
  ],
  itemImage: {
    flexShrink: 0,
  },
  itemContent: {
    marginLeft: 10,
    overflow: 'hidden',
    flexGrow: 1,
  },
  itemName: [
    fonts.xLarge,
    {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  ],
  itemIndex: {
    fontSize: fonts.small.fontSize,
    color: palette.neutralTertiary,
    marginBottom: 10,
  },
  chevron: {
    alignSelf: 'center',
    marginLeft: 10,
    color: palette.neutralTertiary,
    fontSize: fonts.large.fontSize,
    flexShrink: 0,
  },
});

const onRenderCell = (item: any, index: number | undefined): ReactNode => {
  return (
    <div className={classNames.itemCell} data-is-focusable={true}>
      <div className={classNames.itemContent}>
        <div className={classNames.itemName}>{item.name}</div>
        <div className={classNames.itemIndex}>{`Item ${index}`}</div>
        <div>Birth year{item.birth_year}</div>
      </div>
      <Icon className={classNames.chevron} iconName={'ChevronRight'} />
    </div>
  );
};

export default function SwapiPage() {
  const ui = useAppSelector<IUIState>((state) => state.ui);
  const swapi = useAppSelector<ISwapiPeople>((state) => state.swapi);

  const dispatch = useAppDispatch();

  const changeDataHandler = (url: string) => {
    dispatch(uiActions.setLoading(true));
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
    dispatch(fetchPeopleData(url));
  };

  useEffect(() => {
    dispatch(fetchPeopleData(`${BASE_URL_SWAPI}/people/`));
  }, [dispatch]);

  return (
    <Stack tokens={stackTokens} styles={stackStyles}>
      {ui.error && (
        <MessageBar role="status" messageBarType={MessageBarType.error}>
          {ui.error}
        </MessageBar>
      )}
      {ui.isLoading && (
        <Stack
          horizontal={true}
          verticalAlign="center"
          tokens={{
            childrenGap: 20,
          }}
        >
          <Spinner size={SpinnerSize.small} />
          <Label>Fetching data...</Label>
        </Stack>
      )}

      <StackItem
        tokens={stackItemButtonGroupTokens}
        styles={stackItemButtonGroupStyles}
      >
        <Text
          styles={{
            root: {
              fontSize: DefaultFontStyles.xLarge.fontSize,
            },
          }}
        >
          SWAPI People
        </Text>
      </StackItem>
      {ui.isLoading && (
        <Stack tokens={{ childrenGap: 10 }}>
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <Shimmer
                key={index}
                width="100%"
                styles={{ shimmerWrapper: { height: 100 } }}
              />
            ))}
        </Stack>
      )}
      <Stack>
        {!ui.isLoading && swapi.results.length > 1 && (
          <List items={swapi.results} onRenderCell={onRenderCell} />
        )}
      </Stack>
      <Stack tokens={{ childrenGap: 10 }} horizontal>
        <PrimaryButton
          disabled={!swapi.previous}
          onClick={() => changeDataHandler(swapi.previous)}
        >
          Previous
        </PrimaryButton>
        <PrimaryButton
          disabled={!swapi.next}
          onClick={() => changeDataHandler(swapi.next)}
        >
          Next
        </PrimaryButton>
      </Stack>
    </Stack>
  );
}
