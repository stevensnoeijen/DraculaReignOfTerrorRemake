<template>
  <slot name="default" :viewport="viewport" />
</template>

<script lang="ts" setup>
import * as PIXI from 'pixi.js';
import { getCurrentInstance, onMounted, onUnmounted, PropType } from 'vue';
import {
  IAnimateOptions,
  IBounceOptions,
  IClampOptions,
  IClampZoomOptions,
  IDecelerateOptions,
  IDragOptions,
  IFollowOptions,
  IMouseEdgesOptions,
  IPinchOptions,
  ISnapOptions,
  IWheelOptions,
  Viewport,
} from 'pixi-viewport';
import { DisplayObject } from '@pixi/display';

import { isAnyPropertySet, omitUndefined } from '../utils';

import { PixiViewportInstance } from './types';
import { EVENTS } from './constants';

const instance = getCurrentInstance();

type PluginProperty<Options> = {
  options?: Options;
};

type SnapProperty = PluginProperty<ISnapOptions> & {
  x: number;
  y: number;
};

type FollowProperty = PluginProperty<IFollowOptions> & {
  target: DisplayObject;
};

// prop types, if required and defaults adopted from pixi-viewport code
/**
 * The optional loader parameters.
 *
 * @see https://github.com/davidfig/pixi-viewport/blob/master/src/Viewport.ts
 * for all properties
 */
const props = defineProps({
  /**
   * @type {number}
   * @default {@link window#innerWidth}
   */
  screenWidth: {
    type: Number,
    required: false,
    default: undefined,
  },

  /**
   * @type {number}
   * @default {@link window#innerHeight}
   */
  screenHeight: {
    type: Number,
    required: false,
    default: undefined,
  },

  /**
   * @type {number}
   * @default 0
   */
  worldWidth: {
    type: Number as PropType<Number | null>,
    required: false,
    default: undefined,
  },

  /**
   * @type {number}
   * @default 0
   */
  worldHeight: {
    type: Number as PropType<Number | null>,
    required: false,
    default: undefined,
  },

  /**
   * @type {number}
   * @description
   * Number of pixels to move to trigger an input event
   * (e.g., drag, pinch) or disable a clicked event
   * @default 5
   */
  threshold: {
    type: Number,
    required: false,
    default: undefined,
  },

  /**
   * @type {boolean}
   * @description
   * Whether the 'wheel' event is set to passive
   * (note: if false, e.preventDefault() will be called when wheel
   * is used over the viewport)
   * @default true
   */
  passiveWheel: {
    type: Boolean,
    required: false,
    default: undefined,
  },

  /**
   * @type {boolean}
   * @description
   * Whether to stopPropagation of events that impact the viewport
   * (except wheel events, see {@link #passiveWheel})
   * @default false
   */
  stopPropagation: {
    type: Boolean,
    required: false,
    default: undefined,
  },

  /**
   * @type {PIXI.Rectangle | null}
   * @description
   * Change the default hitArea from world size to a new value
   * @default null
   */
  forceHitArea: {
    type: PIXI.Rectangle as PropType<PIXI.Rectangle | null>,
    required: false,
    default: undefined,
  },

  /**
   * @type {boolean}
   * @description
   * Set this if you want to manually call update() function on each frame
   * @default false
   */
  noTicker: {
    type: Boolean,
    required: false,
    default: undefined,
  },

  /**
   * @type {PIXI.InteractionManager | null}
   * @description
   * InteractionManager, available from instantiated
   * `WebGLRenderer/CanvasRenderer.plugins.interaction`
   * It's used to calculate pointer postion relative
   * to canvas location on screen
   * @default null
   */
  interaction: {
    type: PIXI.InteractionManager as PropType<PIXI.InteractionManager | null>,
    required: false,
    default: undefined,
  },

  /**
   * @type {boolean}
   * @description
   * Remove oncontextmenu=() => {} from the divWheel element
   * @default false
   */
  disableOnContextMenu: {
    type: Boolean,
    required: false,
    default: undefined,
  },

  /**
   * @type {HTMLElement}
   * @description
   * div to attach the wheel event
   * @default document.body
   */
  divWheel: {
    type: HTMLElement,
    required: false,
    default: undefined,
  },

  /**
   * @type {PIXI.Ticker}
   * @description
   * Use this PIXI.ticker for updates
   * @default PIXI.Ticker.shared
   */
  ticker: {
    type: PIXI.Ticker,
    required: false,
    default: undefined,
  },

  /**
   * @type {@link PluginProperty<IDragOptions>}
   * @description
   * Enable one-finger touch to drag
   *
   * NOTE: if you expect users to use right-click dragging,
   * you should enable `viewport.options.disableOnContextMenu`
   * to avoid the context menu popping up on each right-click drag.
   *
   * @property {IDragOptions} [options]
   * @property {string} [options.direction=all]
   * direction to drag
   * @property {boolean} [options.pressDrag=true]
   * whether click to drag is active
   * @property {boolean} [options.wheel=true]
   * use wheel to scroll in direction (unless wheel plugin is active)
   * @property {number} [options.wheelScroll=1]
   * number of pixels to scroll with each wheel spin
   * @property {boolean} [options.reverse]
   * reverse the direction of the wheel scroll
   * @property {(boolean|string)} [options.clampWheel=false]
   * clamp wheel(to avoid weird bounce with mouse wheel)
   * @property {string} [options.underflow=center]
   * where to place world if too small for screen
   * @property {number} [options.factor=1]
   * factor to multiply drag to increase the speed of movement
   * @property {string} [options.mouseButtons=all]
   * changes which mouse buttons trigger drag, use: 'all', 'left',
   * 'right' 'middle', or some combination, like, 'middle-right';
   * you may want to set viewport.options.disableOnContextMenu
   * if you want to use right-click dragging
   * @property {string[]} [options.keyToPress=null] - array containing
   * {@link key|https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code}
   * codes of keys that can be
   * pressed for the drag to be triggered, e.g.: ['ShiftLeft', 'ShiftRight'}.
   * @property {boolean} [options.ignoreKeyToPressOnTouch=false]
   * ignore keyToPress for touch events
   * @property {number} [options.lineHeight=20]
   * scaling factor for non-DOM_DELTA_PIXEL scrolling events
   */
  drag: {
    type: Object as PropType<PluginProperty<IDragOptions>>,
    required: false,
    default: undefined,
  },

  /**
   * @type {@link PluginProperty<IClampOptions>}
   * @description
   * Clamp to world boundaries or other provided boundaries
   * There are three ways to clamp:
   * 1. direction: 'all' = the world is clamped to its world boundaries,
   *    ie, you cannot drag any part of offscreen direction: 'x' | 'y' =
   *    only the x or y direction is clamped to its world boundary
   * 2. left, right, top, bottom = true | number = the world is clamped
   *    to the world's pixel location for each side;
   *    if any of these are set to true,
   *    then the location is set to the boundary
   *    [0, viewport.worldWidth/viewport.worldHeight],
   *    eg: to allow the world to be completely dragged offscreen,
   *    set [-viewport.worldWidth, -viewport.worldHeight,
   *    viewport.worldWidth * 2, viewport.worldHeight * 2]
   *
   * Underflow determines what happens when the world is
   * smaller than the viewport
   * 1. none = the world is clamped but there is no special behavior
   * 2. center = the world is centered on the viewport
   * 3. combination of top/bottom/center and left/right/center
   *    (case insensitive) = the world is stuck to the appropriate boundaries
   *
   * NOTES:
   *   clamp is disabled if called with no options; use { direction: 'all' }
   *   for all edge clamping screenWidth, screenHeight, worldWidth,
   *   and worldHeight needs to be set for this to work properly
   *
   * @property {IClampOptions} [options]
   * @property {(number|boolean)} [options.left=false] - clamp left; true = 0
   * @property {(number|boolean)} [options.right=false]
   * clamp right; true = viewport.worldWidth
   * @property {(number|boolean)} [options.top=false] - clamp top; true = 0
   * @property {(number|boolean)} [options.bottom=false]
   * clamp bottom; true = viewport.worldHeight
   * @property {string} [options.direction]
   * (all, x, or y) using clamps of
   * [0, viewport.worldWidth/viewport.worldHeight];
   *  replaces left/right/top/bottom if set
   * @property {string} [options.underflow=center]
   * where to place world if too small for screen (e.g., top-right, center,
   * none, bottomLeft)
   */
  clamp: {
    type: Object as PropType<PluginProperty<IClampOptions>>,
    required: false,
    default: undefined,
  },

  /**
   * @type {@link PluginProperty<IDecelerateOptions>}
   * @description
   * Decelerate after a move
   *
   * NOTE: this fires 'moved' event during deceleration
   *
   * @property {IDecelerateOptions} [options]
   * @property {number} [options.friction=0.95]
   * percent to decelerate after movement
   * @property {number} [options.bounce=0.8]
   * percent to decelerate when past boundaries (only applicable when
   * viewport.bounce() is active)
   * @property {number} [options.minSpeed=0.01]
   * minimum velocity before stopping/reversing acceleration
   */
  decelerate: {
    type: Object as PropType<PluginProperty<IDecelerateOptions>>,
    required: false,
    default: undefined,
  },

  /**
   * @type {@link PluginProperty<IBounceOptions>}
   * @description
   * Bounce on borders
   * NOTES:
   *    screenWidth, screenHeight, worldWidth, and worldHeight needs to be set
   *    for this to work properlyfires 'moved', 'bounce-x-start',
   *    'bounce-y-start', 'bounce-x-end', and 'bounce-y-end' events
   *
   * @property {IBounceOptions} [options]
   * @property {string} [options.sides=all]
   * all, horizontal, vertical, or combination of top, bottom, right, left
   *  (e.g., 'top-bottom-right')
   * @property {number} [options.friction=0.5]
   * friction to apply to decelerate if active
   * @property {number} [options.time=150] - time in ms to finish bounce
   * @property {object} [options.bounceBox]
   * use this bounceBox instead of
   * (0, 0, viewport.worldWidth, viewport.worldHeight)
   * @property {number} [options.bounceBox.x=0]
   * @property {number} [options.bounceBox.y=0]
   * @property {number} [options.bounceBox.width=viewport.worldWidth]
   * @property {number} [options.bounceBox.height=viewport.worldHeight]
   * @property {string|function} [options.ease=easeInOutSine]
   * ease function or name (see http://easings.net/ for supported names)
   * @property {string} [options.underflow=center]
   * (top/bottom/center and left/right/center, or center)
   *  where to place world if too small for screen
   */
  bounce: {
    type: Object as PropType<PluginProperty<IBounceOptions>>,
    required: false,
    default: undefined,
  },

  /**
   * @type {@link PluginProperty<IPinchOptions>}
   * @description
   * Enable pinch to zoom and two-finger touch to drag
   *
   * @property {IPinchOptions} [options]
   * @property {boolean} [options.noDrag] - disable two-finger dragging
   * @property {number} [options.percent=1] - percent to modify pinch speed
   * @property {number} [options.factor=1]
   * factor to multiply two-finger drag to increase the speed of movement
   * @property {PIXI.Point} [options.center]
   * place this point at center during zoom instead of center of two fingers
   * @property {('all'|'x'|'y')} [options.axis=all] - axis to zoom
   */
  pinch: {
    type: Object as PropType<PluginProperty<IPinchOptions>>,
    required: false,
    default: undefined,
  },

  /**
   * @type {@link SnapProperty}
   * @description
   * Snap to a point
   *
   * @property {number} x
   * @property {number} y
   * @property {ISnapOptions} [options]
   * @property {boolean} [options.topLeft]
   * snap to the top-left of viewport instead of center
   * @property {number} [options.friction=0.8]
   * friction/frame to apply if decelerate is active
   * @property {number} [options.time=1000]
   * time in ms to snap
   * @property {string|function} [options.ease=easeInOutSine]
   * ease function or name (see http://easings.net/ for supported names)
   * @property {boolean} [options.interrupt=true]
   * pause snapping with any user input on the viewport
   * @property {boolean} [options.removeOnComplete]
   * removes this plugin after snapping is complete
   * @property {boolean} [options.removeOnInterrupt]
   * removes this plugin if interrupted by any user input
   * @property {boolean} [options.forceStart]
   * starts the snap immediately regardless of whether the viewport is at
   * the desired location
   */
  snap: {
    type: Object as PropType<SnapProperty>,
    required: false,
    default: undefined,
  },

  /**
   * @type {@link FollowProperty}
   * @description
   * Follow a target
   *
   * NOTES:
   *    uses the (x, y) as the center to follow; for PIXI.Sprite
   *    to work properly, use sprite.anchor.set(0.5)
   *    options.acceleration is not perfect as it doesn't
   *    know the velocity of the target. It adds acceleration
   *    to the start of movement and deceleration to the end of movement
   *    when the target is stopped.
   *    To cancel the follow, use: `viewport.plugins.remove('follow')`
   *
   * @fires 'moved' event
   *
   * @property {PIXI.DisplayObject} target to follow
   * @property {IFollowOptions} [options]
   * @property {number} [options.speed=0]
   * to follow in pixels/frame (0=teleport to location)
   * @property {number} [options.acceleration]
   * set acceleration to accelerate and decelerate at this rate; speed
   *   cannot be 0 to use acceleration
   * @property {number} [options.radius]
   * radius (in world coordinates) of center circle where movement is allowed
   *   without moving the viewport
   */
  follow: {
    type: Object as PropType<FollowProperty>,
    required: false,
    default: undefined,
  },

  /**
   * @type {@link PluginProperty<IWheelOptions>}
   * @default {}
   * @description
   * Zoom using mouse wheel
   *
   * NOTE: the default event listener for 'wheel' event is document.body.
   * Use `Viewport.divWheel` to change this default
   *
   * @property {IWheelOptions} [options]
   * @property {number} [options.percent=0.1] - percent to scroll with each spin
   * @property {number} [options.smooth] - smooth the zooming by providing
   * the number of framesto zoom between wheel spins
   * @property {boolean} [options.interrupt=true] - stop smoothing with any
   * user input on the viewport
   * @property {boolean} [options.reverse] - reverse the direction of the scroll
   * @property {PIXI.Point} [options.center] - place this point at center
   * during zoom instead of current mouse position
   * @property {number} [options.lineHeight=20] - scaling factor for
   * non-DOM_DELTA_PIXEL scrolling events
   * @property {('all'|'x'|'y')} [options.axis=all] - axis to zoom
   */
  wheel: {
    type: Object as PropType<PluginProperty<IWheelOptions>>,
    required: false,
    default: undefined,
  },

  /**
   * @type {@link PluginProperty<IAnimateOptions>}
   * @default {}
   * @description
   * Animate the position and/or scale of the viewport
   * To set the zoom level, use: (1) scale, (2) scaleX and scaleY,
   * or (3) width and/or height
   *
   * @property {object} options
   * @property {number} [options.time=1000] - time to animate
   * @property {PIXI.Point} [options.position=viewport.center]
   * position to move viewport
   * @property {number} [options.width]
   * desired viewport width in world pixels (use instead of scale;
   *  aspect ratio is maintained if height is not provided)
   * @property {number} [options.height]
   * desired viewport height in world pixels (use instead of scale;
   *  aspect ratio is maintained if width is not provided)
   * @property {number} [options.scale]
   * scale to change zoom (scale.x = scale.y)
   * @property {number} [options.scaleX]
   * independently change zoom in x-direction
   * @property {number} [options.scaleY]
   * independently change zoom in y-direction
   * @property {(function|string)} [options.ease=linear]
   * easing function to use
   * @property {function} [options.callbackOnComplete]
   * @property {boolean} [options.removeOnInterrupt]
   * removes this plugin if interrupted by any user input
   */
  animate: {
    type: Object as PropType<PluginProperty<IAnimateOptions>>,
    required: false,
    default: undefined,
  },

  /**
   * @type {@link PluginProperty<IClampZoomOptions>}
   * @default {}
   * @description
   * Enable clamping of zoom to constraints
   *
   * The minWidth/Height settings are how small the world can get
   * (as it would appear on the screen) before clamping.
   * The maxWidth/maxHeight is how larger the world can scale
   * (as it would appear on the screen) before clamping.
   *
   * For example, if you have a world size of 1000 x 1000
   * and a screen size of 100 x 100, if you setminWidth/Height = 100
   * then the world will not be able to zoom smaller than the screen size
   * (ie, zooming out so it appears smaller than the screen).
   * Similarly, if you set maxWidth/Height = 100 the world will not
   * be able to zoom larger than the screen size
   * (ie, zooming in so it appears larger than the screen).
   *
   * @property {object} [options]
   * @property {number} [options.minWidth] - minimum width
   * @property {number} [options.minHeight] - minimum height
   * @property {number} [options.maxWidth] - maximum width
   * @property {number} [options.maxHeight] - maximum height
   * @property {number} [options.minScale] - minimum scale
   * @property {number} [options.maxScale] - minimum scale
   */
  clampZoom: {
    type: Object as PropType<PluginProperty<IClampZoomOptions>>,
    required: false,
    default: undefined,
  },

  /**
   * @type {@link PluginProperty<IMouseEdgesOptions>}
   * @default {}
   * @description
   * Scroll viewport when mouse hovers near one of the edges
   * or radius-distance from center of screen.
   *
   * NOTES: fires 'moved' event; there's a known bug where the mouseEdges
   *  does not work properly with "windowed" viewports
   *
   * @property {IMouseEdgesOptions} [options]
   * @property {number} [options.radius]
   * distance from center of screen in screen pixels
   * @property {number} [options.distance]
   * distance from all sides in screen pixels
   * @property {number} [options.top]
   * alternatively, set top distance (leave unset for no top scroll)
   * @property {number} [options.bottom]
   * alternatively, set bottom distance (leave unset for no top scroll)
   * @property {number} [options.left]
   * alternatively, set left distance (leave unset for no top scroll)
   * @property {number} [options.right]
   * alternatively, set right distance (leave unset for no top scroll)
   * @property {number} [options.speed=8]
   * speed in pixels/frame to scroll viewport
   * @property {boolean} [options.reverse]
   * reverse direction of scroll
   * @property {boolean} [options.noDecelerate]
   * don't use decelerate plugin even if it's installed
   * @property {boolean} [options.linear]
   * if using radius, use linear movement (+/- 1, +/- 1) instead of angled
   * movement (Math.cos(angle from center), Math.sin(angle from center))
   * @property {boolean} [options.allowButtons]
   * allows plugin to continue working even when there's a mousedown event
   */
  mouseEdges: {
    type: Object as PropType<PluginProperty<IMouseEdgesOptions>>,
    required: false,
    default: undefined,
  },
});

const viewport = isAnyPropertySet(props)
  ? new Viewport(omitUndefined(props))
  : new Viewport();

const PLUGINS = [
  'drag',
  'clamp',
  'decelerate',
  'bounce',
  'pinch',
  'snap',
  'follow',
  'wheel',
  'animate',
  'clampZoom',
  'mouseEdges',
] as const;

for (const plugin of PLUGINS) {
  if (props[plugin] != null) {
    const options =
      typeof props[plugin]! === 'object' ? props[plugin]!.options : undefined;
    if (plugin === 'snap') {
      const prop = props[plugin]!;
      viewport.snap(prop.x, prop.y, options as ISnapOptions);
    } else if (plugin === 'follow') {
      const prop = props[plugin]!;
      viewport.follow(prop.target, options as IFollowOptions);
    } else {
      // @ts-ignore
      viewport[plugin](options);
    }
  }
}

/**
 * Events that are emitted from the viewport.
 *
 * @see https://github.com/davidfig/pixi-viewport/blob/master/src/Viewport.ts#L1217-L1365
 * for all events.
 */
const emits = defineEmits<{
  /**
   * Fires after a mouse or touch click
   * @event Viewport#clicked
   * @type {object}
   * @property {PIXI.Point} screen
   * @property {PIXI.Point} world
   * @property {Viewport} viewport
   */
  (
    event: 'clicked',
    object: { screen: PIXI.Point; world: PIXI.Point; viewport: Viewport }
  ): void;

  /**
   * Fires when a drag starts
   * @event Viewport#drag-start
   * @type {object}
   * @property {PIXI.Point} screen
   * @property {PIXI.Point} world
   * @property {Viewport} viewport
   */
  (
    event: 'drag-start',
    object: { screen: PIXI.Point; world: PIXI.Point; viewport: Viewport }
  ): void;

  /**
   * Fires when a drag ends
   * @event Viewport#drag-end
   * @type {object}
   * @property {PIXI.Point} screen
   * @property {PIXI.Point} world
   * @property {Viewport} viewport
   */
  (
    event: 'drag-end',
    object: { screen: PIXI.Point; world: PIXI.Point; viewport: Viewport }
  ): void;

  /**
   * Fires when a pinch starts
   * @event Viewport#pinch-start
   * @type {Viewport}
   */
  (event: 'drag-end', viewport: Viewport): void;

  /**
   * Fires when a pinch end
   * @event Viewport#pinch-end
   * @type {Viewport}
   */
  (event: 'pinch-end', viewport: Viewport): void;

  /**
   * Fires when a snap starts
   * @event Viewport#snap-start
   * @type {Viewport}
   */
  (event: 'snap-start', viewport: Viewport): void;

  /**
   * Fires when a snap ends
   * @event Viewport#snap-end
   * @type {Viewport}
   */
  (event: 'snap-end', viewport: Viewport): void;

  /**
   * Fires when a snap-zoom starts
   * @event Viewport#snap-zoom-start
   * @type {Viewport}
   */
  (event: 'snap-zoom-start', viewport: Viewport): void;

  /**
   * Fires when a snap-zoom ends
   * @event Viewport#snap-zoom-end
   * @type {Viewport}
   */
  (event: 'snap-zoom-end', viewport: Viewport): void;

  /**
   * Fires when a bounce starts in the x direction
   * @event Viewport#bounce-x-start
   * @type {Viewport}
   */
  (event: 'bounce-x-start', viewport: Viewport): void;

  /**
   * Fires when a bounce ends in the x direction
   * @event Viewport#bounce-x-end
   * @type {Viewport}
   */
  (event: 'bounce-x-end', viewport: Viewport): void;

  /**
   * Fires when a bounce starts in the y direction
   * @event Viewport#bounce-y-start
   * @type {Viewport}
   */
  (event: 'bounce-y-start', viewport: Viewport): void;

  /**
   * Fires when a bounce ends in the y direction
   * @event Viewport#bounce-y-end
   * @type {Viewport}
   */
  (event: 'bounce-y-end', viewport: Viewport): void;

  /**
   * Fires when for a mouse wheel event
   * @event Viewport#wheel
   * @type {object}
   * @property {object} wheel
   * @property {number} wheel.dx
   * @property {number} wheel.dy
   * @property {number} wheel.dz
   * @property {Viewport} viewport
   */
  (
    event: 'wheel',
    args: { wheel: { dx: number; dy: number; dz: number }; viewport: Viewport }
  ): void;

  /**
   * Fires when a wheel-scroll occurs
   * @event Viewport#wheel-scroll
   * @type {Viewport}
   */
  (event: 'wheel-scroll', viewport: Viewport): void;

  /**
   * Fires when a mouse-edge starts to scroll
   * @event Viewport#mouse-edge-start
   * @type {Viewport}
   */
  (event: 'mouse-edge-start', viewport: Viewport): void;

  /**
   * Fires when the mouse-edge scrolling ends
   * @event Viewport#mouse-edge-end
   * @type {Viewport}
   */
  (event: 'mouse-edge-end', viewport: Viewport): void;

  /**
   * Fires when viewport moves through UI interaction, deceleration, ensureVisible, or follow
   * @event Viewport#moved
   * @type {object}
   * @property {Viewport} viewport
   * @property {string} type - (drag, snap, pinch, follow, bounce-x, bounce-y,
   *  clamp-x, clamp-y, decelerate, mouse-edges, wheel, ensureVisible)
   */
  (
    event: 'moved',
    object: {
      viewport: Viewport;
      type:
        | 'drag'
        | 'snap'
        | 'pinch'
        | 'follow'
        | 'bounce-x'
        | 'bounce-y'
        | 'clamp-x'
        | 'clamp-y'
        | 'decelerate'
        | 'mouse-edges'
        | 'wheel'
        | 'ensureVisible';
    }
  ): void;

  /**
   * Fires when viewport moves through UI interaction,
   * deceleration, ensureVisible, or follow
   *
   * @event Viewport#zoomed
   * @type {object}
   * @property {Viewport} viewport
   * @property {string} type
   * (drag-zoom, pinch, wheel, clamp-zoom, ensureVisible)
   */
  (
    event: 'zoomed',
    object: {
      viewport: Viewport;
      type: 'drag-zoom' | 'pinch' | 'wheel' | 'clamp-zoom' | 'ensureVisible';
    }
  ): void;

  /**
   * Fires when viewport stops moving
   * @event Viewport#moved-end
   * @type {Viewport}
   */
  (event: 'moved-end', viewport: Viewport): void;

  /**
   * Fires when viewport stops zooming
   * @event Viewport#zoomed-end
   * @type {Viewport}
   */
  (event: 'zoomed-end', viewport: Viewport): void;

  /**
   * Fires at the end of an update frame
   * @event Viewport#frame-end
   * @type {Viewport}
   */
  (event: 'frame-end', viewport: Viewport): void;
}>();

const application = instance?.parent?.exposed?.application as PIXI.Application;
if (application == null) {
  throw new Error('pixi-viewport must be used inside pixi-application');
}

onMounted(() => {
  EVENTS.forEach((event) =>
    viewport.addListener(event, (args) => emits(event, args))
  );

  // @ts-ignore
  application.stage.addChild(viewport);
});

onUnmounted(() => {
  // @ts-ignore
  application.stage.removeChild(viewport);

  // TODO: cleanup listeners
});

defineExpose<PixiViewportInstance>({
  viewport,
});
</script>
