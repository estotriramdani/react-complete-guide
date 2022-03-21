import {
  DefaultEffects,
  DefaultFontStyles,
  DefaultPalette,
  DefaultSpacing,
  FontSizes,
  FontWeights,
  getTheme,
  IconButton,
  IIconProps,
  IStackItemTokens,
  IStackStyles,
  IStackTokens,
  ITextStyles,
  PrimaryButton,
  ProgressIndicator,
  SearchBox,
  Shimmer,
  ShimmerElementType,
  Stack,
  StackItem,
  Text,
  TextField,
} from '@fluentui/react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import StackHorizontal from '../../components/containers/StackHorizontal';
import { counterActions, ICounterState } from '../../store/counter-slice';

const theme = getTheme();

const stackTokens: IStackTokens = { childrenGap: 10, maxWidth: 600 };

const stackStyles: IStackStyles = {
  root: {
    background: theme.palette.whiteTranslucent40,
    color: DefaultPalette.white,
    minHeight: '100vh',
    padding: DefaultSpacing.l2,
    fontFamily: DefaultFontStyles.superLarge.fontFamily,
  },
};

const textStyles: ITextStyles = {
  root: {
    fontSize: FontSizes.size28,
    color: theme.palette.neutralPrimary,
    fontWeight: FontWeights.bold,
    fontFamily: DefaultFontStyles.superLarge.fontFamily,
  },
};

const stackItemTokens: IStackItemTokens = {
  padding: DefaultSpacing.m,
};

const plusIconProps: IIconProps = { iconName: 'CirclePlus' };
const minusIconProps: IIconProps = { iconName: 'Remove' };

const CounterPage = () => {
  const { value } = useAppSelector<ICounterState>((state) => state.counter);
  const [amount, setAmount] = useState(0);
  const [percent, setPercent] = useState(0);
  const changeAmountHandler = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAmount(+e.currentTarget.value!);
  };
  const dispatch = useAppDispatch();
  const increment = () => {
    dispatch(counterActions.increment());
  };
  const decrement = () => {
    dispatch(counterActions.decrement());
  };
  const incrementByAmount = () => {
    dispatch(counterActions.incrementByAmount(amount));
  };
  useEffect(() => {
    const percentInc = setInterval(() => {
      if (percent > 100) {
        setPercent(0);
      }
      setPercent(percent + 1);
    }, 500);
    return () => clearInterval(percentInc);
  }, [percent]);
  return (
    <Stack
      styles={stackStyles}
      tokens={stackTokens}
      verticalAlign="center"
      horizontalAlign="center"
    >
      <StackHorizontal>
        <IconButton iconProps={minusIconProps} onClick={decrement} />
        <Text variant="xxLarge" styles={textStyles}>
          {value}
        </Text>
        <IconButton iconProps={plusIconProps} onClick={increment} />
      </StackHorizontal>
      <StackHorizontal>
        <TextField type="number" onChange={changeAmountHandler} />
        <PrimaryButton onClick={incrementByAmount}>Change Value</PrimaryButton>
      </StackHorizontal>
      <StackHorizontal>
        <SearchBox placeholder="Search anything, then we'll find for you" />
      </StackHorizontal>
      <StackItem
        tokens={stackItemTokens}
        style={{ borderRadius: DefaultEffects.elevation4 }}
      >
        <Shimmer
          shimmerElements={[
            { type: ShimmerElementType.line, height: 20, width: 200 },
          ]}
        />
        <Shimmer />
      </StackItem>
      <StackHorizontal>
        <ProgressIndicator
          label="Progress"
          description="Description here"
          percentComplete={percent}
        />
      </StackHorizontal>
    </Stack>
  );
};

export default CounterPage;
