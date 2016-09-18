# Blender Elements

Bringing the UI controls from Blender to the web.

Reason: The controls in Blender have advanced features, which are useful.

Initial use-case: Manipulate values inside the Chrome Extension: [Pixi Inspector](https://chrome.google.com/webstore/detail/pixi-inspector/aamddddknhcagpehecnhphigffljadon).
Hypothetical use-cases: Updating the [Three.js Editor](http://threejs.org/editor), an [animation editor](http://www.nodefire.com/) and an alternative for [dat.GUI](https://workshop.chromeexperiments.com/examples/gui/).

## Highlights
- Desktop first
- Build as WebComponents
- Uses Observables

### Desktop first
The focus is on increasing productivity on desktop and taking adantage of things like: hover-state, click-and-drag, rightclick 

### Using webcomponents

Framework agnostic, maybe some React wrappers are needed, but Angular 2 should work out of the box.

## Uses Observables  
Exposes the data as Observable streams. 

# UseCase: Pixi Inspector
- No direct access to the data.
- Update the controls based on the state (a one-way data-flow)
- Lock the controls when editing is in progress

# UseCase: Animation editor
The value depends on the current frame. value of the last keyframe + interpolation. green background when interpolated, yellow when on a keyframe, gray when the value doesn't change.

## Example hierachy
WindowElement
- PanelElement
  - NumberElement

## Idea: Coupled with a data layer
Issue: How to bind data?

Blender uses 2 abstractions: DNA and RNA

DNA is the raw serializable data, think json with types and meta (such as animation) data.
RNA is used to describe the data (mix, max, label, tooltip, key)

### Example markup

<b-menu>
	<b-prop path="renderer.resoluton_x">
