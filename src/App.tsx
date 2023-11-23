import { type CSSObject, Global } from "@emotion/react";
import {
  createAppTheme,
  createAppStylesBaseline,
  type AnimatorGeneralProviderSettings,
  AnimatorGeneralProvider,
  type BleepsProviderSettings,
  BleepsProvider,
  GridLines,
  Dots,
  MovingLines,
  Animator,
  useBleeps,
  BleepsOnAnimator,
  Animated,
  FrameSVGCorners,
  Text,
  aa,
  aaVisibility,
} from "@arwes/react";

const theme = createAppTheme();
const stylesBaseline = createAppStylesBaseline(theme);

const animatorsSettings: AnimatorGeneralProviderSettings = {
  // Durations in seconds.
  duration: {
    enter: 0.2,
    exit: 0.2,
    stagger: 0.04,
  },
};

const bleepsSettings: BleepsProviderSettings = {
  // Shared global audio settings.
  master: {
    volume: 0.9,
  },
  bleeps: {
    // A transition bleep sound to play when the user enters the app.
    intro: {
      sources: [
        {
          src: "/intro.mp3",
          type: "audio/mpeg",
        },
      ],
    },
    // An interactive bleep sound to play when user clicks.
    click: {
      sources: [
        {
          src: "/click.mp3",
          type: "audio/mpeg",
        },
      ],
    },
  },
};

const Background = (): React.ReactElement => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: theme.colors.primary.bg(1),
      }}
    >
      <GridLines lineColor={theme.colors.primary.deco(0)} />
      <Dots color={theme.colors.primary.deco(1)} />
      <MovingLines lineColor={theme.colors.primary.deco(2)} />
    </div>
  );
};

const Card = (): React.ReactElement => {
  const bleeps = useBleeps();

  return (
    <Animator merge combine manager="stagger">
      {/* Play the intro bleep when card appears. */}
      <BleepsOnAnimator transitions={{ entering: "intro" }} continuous />

      <Animated
        className="card"
        style={{
          position: "relative",
          display: "block",
          maxWidth: "300px",
          margin: theme.space([4, "auto"]),
          padding: theme.space(8),
          textAlign: "center",
        }}
        // Effects for entering and exiting animation transitions.
        animated={[aaVisibility(), aa("y", "2rem", 0)]}
        // Play bleep when the card is clicked.
        onClick={() => bleeps.click?.play()}
      >
        {/* Frame decoration and shape colors defined by CSS. */}
        <style>{`
          .card .arwes-react-frames-framesvg [data-name=bg] {
            color: ${theme.colors.primary.deco(1)};
          }
          .card .arwes-react-frames-framesvg [data-name=line] {
            color: ${theme.colors.primary.main(4)};
          }
        `}</style>

        <Animator>
          <FrameSVGCorners strokeWidth={2} />
        </Animator>

        <Animator>
          <Text as="h1">Arwes Project</Text>
          <button>Hello World</button>
        </Animator>

        <Animator>
          <Text>Futuristic science fiction user interface web framework.</Text>
        </Animator>
      </Animated>
    </Animator>
  );
};

export default function App() {
  return (
    <>
      <Global styles={stylesBaseline as Record<string, CSSObject>} />
      <AnimatorGeneralProvider {...animatorsSettings}>
        <BleepsProvider {...bleepsSettings}>
          <Animator combine manager="stagger" active={true}>
            <Background />
            <Card />
          </Animator>
        </BleepsProvider>
      </AnimatorGeneralProvider>
    </>
  );
}
