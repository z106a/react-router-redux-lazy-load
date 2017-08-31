import PropTypes from 'prop-types';
import { isArray } from 'lodash'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/observable/zip'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/fromPromise'
import React, { Component } from 'react';
import createReducer from '../reducers/index'


const moduleDefaultExport = module => module.default || module;

function esModule(module, forceArray) {
    if (isArray(module)) {
        return module.map(moduleDefaultExport);
    }
    const defaulted = moduleDefaultExport(module);
    return forceArray ? [defaulted] : defaulted
}

function createAsyncReducers(store, reducers) {
    return Object.assign(store.asyncReducers, reducers.reduce((acc, reducer) => {
        acc[reducer._name] = reducer;
        return acc;
        }, {})
    );
}

export default function asyncRoute(getComponent, getReducers) {
    return class AsyncComponent extends Component {
        static contextTypes = {
            store: PropTypes.shape({
                dispatch: PropTypes.func.isRequired,
                asyncReducers: PropTypes.object.isRequired,
                subscribe: PropTypes.func.isRequired
            })
        };

        static Component = null;
        static ReducersLoaded = false;

        state = { Component: AsyncComponent.Component,  ReducersLoaded: AsyncComponent.ReducersLoaded };

        componentWillMount(){
            const { Component, ReducersLoaded } = this.state;
            const shouldLoadReducers = !ReducersLoaded && getReducers;
            if (!Component || shouldLoadReducers) {
                this._componentWillUnmountSubject = new Subject();
                const streams = [
                  Component ?
                      Observable.of(Component).takeUntil(this._componentWillUnmountSubject) :
                      Observable.fromPromise(getComponent())
                          .map(esModule)
                          .map(Component => {
                            AsyncComponent.Component = Component;
                            return Component
                          })
                          .takeUntil(this._componentWillUnmountSubject)

                ];


                if (shouldLoadReducers) {
                    streams.push(
                        Observable.fromPromise(getReducers())
                            .map(module => esModule(module, true))
                            .map(reducers => createAsyncReducers(this.context.store, reducers))
                    );
                }

                Observable.zip(...streams)
                    .takeUntil(this._componentWillUnmountSubject)
                    .subscribe(([Component, asyncReducers]) => {
                        this.context.store.replaceReducer(createReducer(asyncReducers));
                        AsyncComponent.ReducersLoaded = true;
                        console.log(this.context.store.getState());
                        if (this._mounted) {
                            this.setState({Component})
                        } else {
                            this.state.Component = Component
                        }
                        this._componentWillUnmountSubject.unsubscribe()
                    })
            }
        }

        componentDidMount() {
            this._mounted = true;
        }

        componentWillUnmount() {
            if (this._componentWillUnmountSubject && !this._componentWillUnmountSubject.closed) {
                this._componentWillUnmountSubject.next()
                this._componentWillUnmountSubject.unsubscribe()
            }
        }

        render() {
            const { Component } = this.state;
            return Component ? <Component {...this.props} /> : null;
        }
    }
}
