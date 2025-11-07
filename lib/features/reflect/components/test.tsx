// ReflectRecordButton.tsx
import React, { useEffect } from "react";

import { type AccessibilityProps, Pressable, type ViewStyle } from "react-native";

import Animated, {
  Easing,
  createAnimatedComponent,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from "react-native-svg";

const AnimatedCircle = createAnimatedComponent(Circle);

type Props = {
  recording?: boolean;
  size?: number; // overall size (px). Default 72
  onPress?: () => void;
  onLongPress?: () => void;
  style?: ViewStyle;
  colors?: {
    brand?: string; // '#6750FF'
    brandWeak?: string; // '#ECEBFF'
    ring?: string; // '#8B7CFF'
    textInverse?: string; // '#FFFFFF'
  };
} & AccessibilityProps;

export function ReflectRecordButton({
  recording = false,
  size = 72,
  onPress,
  onLongPress,
  style,
  colors,
  accessibilityLabel = "Record journal",
  accessibilityHint = "Starts a new voice entry",
}: Props) {
  const c = {
    brand: colors?.brand ?? "#6750FF",
    brandWeak: colors?.brandWeak ?? "#ECEBFF",
    ring: colors?.ring ?? "#8B7CFF",
    textInverse: colors?.textInverse ?? "#FFFFFF",
  };

  const rOuter = size * 0.444; // ring radius (≈32 when size=72)
  const rBtn = size * 0.389; // button radius (≈28 when size=72)
  const center = size / 2;

  // Pulse animation (scale + fade) when recording
  const pulse = useSharedValue(0);
  useEffect(() => {
    if (recording) {
      pulse.value = withRepeat(
        withTiming(1, { duration: 1200, easing: Easing.out(Easing.ease) }),
        -1,
        false
      );
    } else {
      pulse.value = 0;
    }
  }, [recording, pulse]);

  const pulseStyle = useAnimatedStyle(() => {
    // Map 0..1 to scale 1..1.2 and opacity .6 -> 0
    const scale = 1 + 0.2 * pulse.value;
    const opacity = 0.6 * (1 - pulse.value);
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  // Mic glyph path (centered for a 72x72 layout; scales with viewBox)
  const micPath =
    "M36 21c-3.866 0-7 3.134-7 7v8c0 3.866 3.134 7 7 7s7-3.134 7-7v-8c0-3.866-3.134-7-7-7zm-1 25.6v-2.86a11.5 11.5 0 0 1-9-11.24h2a9.5 9.5 0 0 0 19 0h2a11.5 11.5 0 0 1-9 11.24v2.86h5.25v2H29.75v-2H35z";

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      style={style}
      hitSlop={8}
    >
      {/* Wrap the SVG in a relative container so the pulse can scale from center */}
      <Svg width={size} height={size} viewBox="0 0 72 72">
        <Defs>
          <LinearGradient id="ringGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={c.ring} stopOpacity={0.9} />
            <Stop offset="100%" stopColor={c.brand} stopOpacity={0.6} />
          </LinearGradient>
        </Defs>

        {/* Pulse halo (animated only when recording) */}
        {recording ? (
          <AnimatedCircle
            cx={center}
            cy={center}
            r={size * 0.4} // ~29 when size=72
            fill={c.brand}
            style={pulseStyle as any}
          />
        ) : null}

        {/* Outer gradient ring */}
        <Circle
          cx={center}
          cy={center}
          r={rOuter}
          stroke="url(#ringGrad)"
          strokeWidth={size * 0.0486} // ≈3.5 at 72
          fill="none"
        />

        {/* Button body */}
        <Circle cx={center} cy={center} r={rBtn} fill={recording ? c.brand : c.brandWeak} />

        {/* Mic glyph */}
        <Path d={micPath} fill={recording ? c.textInverse : c.brand} />
      </Svg>
    </Pressable>
  );
}
