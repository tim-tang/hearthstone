
      ___ ___                            __   .__       _________  __                           
     /   |   \   ____  _____   _______ _/  |_ |  |__   /   _____/_/  |_   ____    ____    ____  
    /    ~    \_/ __ \ \__  \  \_  __ \\   __\|  |  \  \_____  \ \   __\ /  _ \  /    \ _/ __ \ 
    \    Y    /\  ___/  / __ \_ |  | \/ |  |  |   Y  \ /        \ |  |  (  <_> )|   |  \\  ___/ 
     \___|_  /  \___  >(____  / |__|    |__|  |___|  //_______  / |__|   \____/ |___|  / \___  >
           \/       \/      \/                     \/         \/                     \/      \/ 


[![Build Status](https://travis-ci.org/tim-tang/hearthstone.png?branch=master)](https://travis-ci.org/tim-tang/hearthstone) [![Dependency Status](https://gemnasium.com/tim-tang/hearthstone.png)](https://gemnasium.com/tim-tang/hearthstone)

---

### Preparation

- Install NodeJS

    ```
    $ brew install node
    ```
- Install Riak 

    ```
    $ brew install mongodb
    ```

- Install Node dependency, go to {HEARTHSTONE-HOME}/

    ```
    $ npm install
    ```

- Install grunt-cli

    ```
    $ npm install -g grunt-cli
    ```

### Running Node build|test|jslint|clean

    $ grunt 

### API doc generator

- Install apiary cli

    ```
    $ sudo gem install apiaryio
    ```
- Prewiew api doc, go to {HEARTHSTONE-HOME}/

    ```
    $ apiary preview  --path docs/apiary.apib  --output docs/hearthstone-api.html
    ```

### Preview API doc on-line

- [Heathstone API](http://htmlpreview.github.io/?https://github.com/tim-tang/hearthstone/blob/master/doc/hearthstone-api.html)

### Issue

- [Hearthstone Issues](https://github.com/tim-tang/hearthstone/issues)
