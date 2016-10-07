
## 2 okt 2016

Using the WebComponents adds a complication, it is missing an unmount/cleanup step.
The webcomponent.js polyfill is a disapointment, it uses deprecated api's and nothing worked out of the box and its travis build are failing for some time :-(

Not so sure about Typescript either, the autocompletion is really nice, but the errors and warnings are hit and miss.
Started with a types.d.ts as which sillences the Typescript errors on javascript code that is working perfectly fine (in Chrome / ES2015).
The dynamicly generated Components don't have any autocompletion, library users don't benefit from types in any way at this moment. 

I should decouple logic from the NumberElement for reuse in the slider element. 
Stuff like value, value$, min, soft-min, max, soft-max, disabled, soft-disabled 

Started doubting Rx again, mainly because due to a limitation in the webcomponent api (no destructor hook) i'm unable to (un)subscribe to some internal observables.
It also adds to the download size and i'm not sure how to make it an optional dependancy.
Adding some local state and delegated event handlers will come a long way.

Conclusions:

SkateJS uses this polyfill: https://github.com/WebReflection/document-register-element let try that first.
Can also switch to React or Vue 2, but i'd prefer the framework agnostic + wrappers approach. 
ShadowDOM is nice, but is not really required for my purpose. I'll try out css-modules or namespace my css manually.

Export value$ as a ReplaySubject when window/Rx/BlenderElements.Observable and window/Rx/BlenderElements.Subject are available.

 
## 7 okt 2016

Typescript remains a mixed bag, it caught some issues, it also made it some javascript patterns harder, which required adding additional if statements to confince Typescript it was fine.
Implemented number input using vanilla.js size now down to 12KB, much improved browser compatibility.
