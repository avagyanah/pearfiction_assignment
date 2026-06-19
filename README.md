# PearFiction Assignment

A browser-based slot machine game built with PixiJS v8 and TypeScript.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Play%20Now-brightgreen?style=for-the-badge)](https://avagyanah.github.io/pearfiction_assignment/)

## Features

- Preloader screen with percentage text and a progress bar (bar is beyond requirement)
- 5x3 reel grid with symbol sprites
- Spin button with randomized reel positions on each tap
- Win calculation across 7 paylines with a full paytable
- Win results displayed as multiline text below the spin button
- Colored win line graphics drawn over the winning payline symbols (beyond requirement)
- Responsive layout for both landscape and portrait screens

## Getting Started

```bash
npm install
npm start       # dev server at http://localhost:8080
npm run build   # production bundle
npm test        # run math engine unit tests
```

## Architecture

The project follows a simple MVC structure:

- **Model** (`src/game/model/`) - pure TypeScript, zero PixiJS imports. Owns all slot logic: reel bands, payline evaluation, win calculation. Fully unit-testable in isolation.
- **View** (`src/game/view/`) - PixiJS scenes, components, and a responsive Grid layout system.
- **Commands** (`src/game/commands/`) - thin functions that connect events to model changes.
- **Services** (`src/services.ts`) - service locator providing shared access to renderer, ticker, stage, and model.

Communication between layers is event-driven via `eventemitter3`. Commands listen for events like `spin_tap` and `load_complete`, update the model, and the model emits `positions_update` and `result_update` for the view to react to. This keeps model and view fully decoupled.

All static game data (reelset, paytable, paylines) lives in `src/game/model/slot_manifest.json` as the single source of truth.

## Asset Loading

`Loader` (`src/loader.ts`) loads assets one by one with a small delay between each, purely to make the preloader progress visible. Loading all assets at once with a single `Assets.load()` call works correctly but completes too fast for the preloader screen to appear. The bulk loading approach is kept in the same file as a commented block for reference.

## Tooling

Webpack is used as the bundler with separate dev and prod configs. ESLint and Prettier handle code style, and Husky runs them as a pre-commit hook to keep the codebase consistent.

## Responsive Design

Resizing is handled in two layers. `Stage` (`src/game/view/stage.ts`) listens to `window.resize` and computes the game div dimensions, clamping the aspect ratio so the layout stays playable on both landscape and portrait screens.

Centering and scaling of individual elements is delegated to `Grid` (`src/libs/grid/`), a layout library written by me a while ago. There are alternatives like `@pixi/layout`, but Grid is significantly faster and simpler for this use case. Each scene defines a grid config with proportional cell bounds, and `Grid.rebuild()` positions and scales its children to fit whenever the stage resizes.

## Math Engine

`MathEngine` (`src/game/model/mathEngine.ts`) is responsible for all math. It takes an `IManifest` in its constructor and exposes a single `calculate(positions): IWinResult` method. It is pure TypeScript with no external dependencies, making it straightforward to unit test.

`SlotMachineModel` instantiates `MathEngine` and delegates the calculation to it. After each spin it calls `engine.calculate()`, stores the result, and emits the `result_update` event for the view to react to.

Paylines are stored as 3×5 binary matrices. On each spin:

1. Build a `screen[row][col]` tile matrix from the 5 reel band positions.
2. For each payline, collect the one symbol per column where the matrix is `1`.
3. Count consecutive matches from the left-most column.
4. Record a win if count ≥ 3, looking up the payout in the paytable.

## Note on Requirement Example

Note: Example 3 (positions `5,14,9,9,16`), the requirement document for this example contains a typo, col 0, row 2, is shown as `lv1` but based on band 1 at index 7 (position 5 + row 2) is `hv4`. So wins should be calculated based on only payline 6.

    Band 1: "hv2", "lv3", "lv3", "hv1", "hv1", "lv1", "hv1", "hv4", "lv1", "hv3", "hv2", "hv3", "lv4", "hv4", "lv1", "hv2", "lv4", "lv1", "lv3", "hv2"

    Positions: 5, 14, 9, 9, 16
    Screen:                             Screen
        lv1 hv1 lv1 hv1 hv1                 lv1 hv1 lv1 hv1 hv1
        hv1 lv1 hv3 lv1 lv2                 hv1 lv1 hv3 lv1 lv2
       |lv1| lv2 lv1 hv1 hv4      =>       |hv4| lv2 lv1 hv1 hv4
    Total wins: 10                      Total wins: 5
        - payline 6, lv1 x4, 5              - payline 6, lv1 x4, 5
        - payline 7, lv1 x4, 5
