#
# Gridderer
#### A React component to split up an image into a grid of seperate images, which can then be posted to persistant memory. 
##### Based on: https://codepen.io/Escu/pen/KVLBYP
---
![Image of Gridderer](./gridderer.png)

```javascript
import { Gridderer } from 'gridderer'

<Gridderer tilesCountX={8} tilesCountY={6} gridOffset={1.005} />
```

---
Using Tsdx, React, Storybook
---

Todos:
- [] Type it!
- [] Fix tests
- [] Write unit test
- [] How can this be integrated into a form?
- [] How can load single low res but then high-res grid sections zoom on hover?
- [] How can it be styled?
- [] How can input, image view, zoom view, all work together?
- [] Currently converts DataImage back to Base64. What about other options?
- [] Pie in the sky, how can we let users free hand draw shapes to grid out?
- [] Github Actions to release to NPM