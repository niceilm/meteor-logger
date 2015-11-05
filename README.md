## install
```
meteor add flynn:logger
```

## use
```
if(Meteor.isServer) {
    $log.log("logging server side something");
} else {
    $log.log("logging client side something");
}

```

inspire angular $logProvider