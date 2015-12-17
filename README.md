Redux Snapshot Manager
=========

An api to save redux store as snapshots of your app. It can be used with [redux-qa-monitor](https://github.com/inderps/redux-qa-monitor) to share snapshots across network

## What Problem is it trying to solve?

Visit this [link](https://github.com/inderps/redux-qa-monitor)

## What is it made up of?

It is an expressjs based application using [nedb](https://github.com/louischatriot/nedb) as backend database.

## Steps to setup

```shell
  git clone git@github.com:inderps/redux-snapshot-manager.git
  cd redux-snapshot-manager
  npm install
  npm start
```


## Contributing

I love pull requests. If you think you can improve the code or you have a idea of adding more features, 
Just do it and send me pull request


### Features in pipeline

 * Edit or Delete a existing snapshot
 * can make it work with other redux devtools
 * Can make it work with other databases

## License

MIT license; see [LICENSE](./LICENSE.md).

(c) 2015 by Inderpal Singh
