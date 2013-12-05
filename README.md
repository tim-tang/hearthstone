
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
- Install mongoose fixture cli

    ```
    $ npm install -g mongoose-fixture
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
    $ apiary preview  --path docs/api/apiary.apib  --output docs/api/hearthstone.html
    ```

- Generate JS doc use following command

    ```
    $ grunt doc
    ```

### Generate initial data.

    $ grunt migrate

### Import card by shell script

    $ bin/card-import -u tim -p 123 -H http://localhost:5000 -d fixtures/cards-dump.json 

### Preview API/JS doc on-line

- [Heathstone APIs](http://hearthstone-srv.herokuapp.com/api/hearthstone.html)

- [Hearthstone JSDoc](http://hearthstone-srv.herokuapp.com/)

- [Hearthstone Code Coverage](http://hearthstone-srv.herokuapp.com/coverage.html)

- [Hearthstone Health Check](http://hearthstone-srv.herokuapp.com/health)

### Issue

- [Hearthstone Issues](https://github.com/tim-tang/hearthstone/issues)


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/tim-tang/hearthstone/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

