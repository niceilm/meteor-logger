## install
```
meteor add flynn:logger
```

## use
```
if(Meteor.isServer) {
    logger.log("logging server side something");
} else {
    logger.log("logging client side something");
}
```